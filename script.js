const CSV_URL = "vocabulary.csv";
const APP_PASSWORD = "b1";
const UNLOCK_STORAGE_KEY = "goethe-b1-flashcards-unlocked-v1";
const STORAGE_KEY = "goethe-b1-flashcards-progress-v1";
const ARTICLE_STORAGE_KEY = "goethe-b1-article-quiz-progress-v1";

const STANDARD_FILTERS = [
  ["all", "All words"],
  ["nouns", "Nouns only"],
  ["meaningOnly", "Meaning known, article unknown"],
  ["unsure", "Unsure words only"],
  ["dontKnow", "Don't Know words only"]
];

const ARTICLE_FILTERS = [
  ["allArticle", "All noun articles"],
  ["knownArticles", "Known articles"],
  ["kindOfArticles", "Kind of known articles"],
  ["unknownArticles", "Unknown articles"],
  ["unratedArticles", "Unrated articles"]
];

const els = {
  lockScreen: document.querySelector("#lockScreen"),
  lockForm: document.querySelector("#lockForm"),
  passwordInput: document.querySelector("#passwordInput"),
  lockError: document.querySelector("#lockError"),
  appShell: document.querySelector("#appShell"),
  deckStatus: document.querySelector("#deckStatus"),
  modeSelect: document.querySelector("#modeSelect"),
  filterSelect: document.querySelector("#filterSelect"),
  startSelect: document.querySelector("#startSelect"),
  csvInput: document.querySelector("#csvInput"),
  lockApp: document.querySelector("#lockApp"),
  resetProgress: document.querySelector("#resetProgress"),
  statTotalLabel: document.querySelector("#statTotalLabel"),
  statKnowLabel: document.querySelector("#statKnowLabel"),
  statUnsureLabel: document.querySelector("#statUnsureLabel"),
  statMeaningOnlyLabel: document.querySelector("#statMeaningOnlyLabel"),
  statDontKnowLabel: document.querySelector("#statDontKnowLabel"),
  statCompletedLabel: document.querySelector("#statCompletedLabel"),
  statTotal: document.querySelector("#statTotal"),
  statKnow: document.querySelector("#statKnow"),
  statUnsure: document.querySelector("#statUnsure"),
  statMeaningOnly: document.querySelector("#statMeaningOnly"),
  statDontKnow: document.querySelector("#statDontKnow"),
  statCompleted: document.querySelector("#statCompleted"),
  cardCounter: document.querySelector("#cardCounter"),
  cardMode: document.querySelector("#cardMode"),
  promptLabel: document.querySelector("#promptLabel"),
  questionText: document.querySelector("#questionText"),
  articleGuess: document.querySelector("#articleGuess"),
  articleQuiz: document.querySelector("#articleQuiz"),
  articleQuizOptions: document.querySelector("#articleQuizOptions"),
  articleQuizResult: document.querySelector("#articleQuizResult"),
  articleRatingButtons: document.querySelector("#articleRatingButtons"),
  answerPanel: document.querySelector("#answerPanel"),
  answerArticle: document.querySelector("#answerArticle"),
  answerMeaning: document.querySelector("#answerMeaning"),
  answerExample: document.querySelector("#answerExample"),
  emptyState: document.querySelector("#emptyState"),
  showAnswer: document.querySelector("#showAnswer"),
  meaningOnlyButton: document.querySelector("#meaningOnlyButton"),
  ratingButtons: document.querySelector("#ratingButtons")
};

let cards = [];
let visibleCards = [];
let currentIndex = 0;
let answerShown = false;
let selectedArticle = "";
let articleQuizAnswered = false;
let selectedQuizArticle = "";
let progress = {};
let articleProgress = {};

document.addEventListener("DOMContentLoaded", init);

async function init() {
  bindLockEvents();
  if (!isUnlocked()) {
    els.passwordInput.focus();
    return;
  }
  await unlockApp();
}

async function unlockApp() {
  els.lockScreen.classList.add("hidden");
  els.appShell.classList.remove("locked");
  progress = loadProgress();
  articleProgress = loadArticleProgress();
  bindEvents();
  try {
    const response = await fetch(CSV_URL, { cache: "no-store" });
    if (!response.ok) throw new Error("Vocabulary file was not found.");
    const csv = await response.text();
    cards = normalizeCards(parseCsv(csv));
    els.deckStatus.textContent = `${cards.length} cards loaded from ${CSV_URL}`;
  } catch (error) {
    els.deckStatus.textContent = "Could not load vocabulary.csv. Use a local web server or upload a CSV.";
    cards = [];
  }
  updateFilterOptions();
  applyModeAndFilter();
}

function bindLockEvents() {
  els.lockForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (els.passwordInput.value === APP_PASSWORD) {
      localStorage.setItem(UNLOCK_STORAGE_KEY, "true");
      els.lockError.classList.add("hidden");
      await unlockApp();
      return;
    }
    els.lockError.classList.remove("hidden");
    els.passwordInput.select();
  });
}

function isUnlocked() {
  return localStorage.getItem(UNLOCK_STORAGE_KEY) === "true";
}

function bindEvents() {
  if (els.appShell.dataset.bound === "true") return;
  els.appShell.dataset.bound = "true";
  els.modeSelect.addEventListener("change", () => {
    currentIndex = 0;
    updateFilterOptions();
    applyModeAndFilter();
  });

  els.filterSelect.addEventListener("change", () => {
    currentIndex = 0;
    applyModeAndFilter();
  });

  els.startSelect.addEventListener("change", () => {
    currentIndex = 0;
    applyModeAndFilter();
  });

  els.showAnswer.addEventListener("click", revealAnswer);

  els.ratingButtons.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-rating]");
    if (!button || !visibleCards[currentIndex]) return;
    rateCard(button.dataset.rating);
  });

  els.articleGuess.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-article]");
    if (!button) return;
    selectedArticle = button.dataset.article;
    els.articleGuess.querySelectorAll("button").forEach((item) => {
      item.classList.toggle("selected", item === button);
    });
  });

  els.articleQuizOptions.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-quiz-article]");
    if (!button || !visibleCards[currentIndex] || articleQuizAnswered) return;
    answerArticleQuiz(button.dataset.quizArticle);
  });

  els.articleRatingButtons.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-article-rating]");
    if (!button || !visibleCards[currentIndex]) return;
    rateArticleCard(button.dataset.articleRating);
  });

  els.lockApp.addEventListener("click", () => {
    localStorage.removeItem(UNLOCK_STORAGE_KEY);
    window.location.reload();
  });

  els.resetProgress.addEventListener("click", () => {
    if (!window.confirm("Reset all saved progress for this deck?")) return;
    progress = {};
    articleProgress = {};
    saveProgress();
    saveArticleProgress();
    currentIndex = 0;
    applyModeAndFilter();
  });

  els.csvInput.addEventListener("change", async (event) => {
    const [file] = event.target.files;
    if (!file) return;
    const csv = await file.text();
    cards = normalizeCards(parseCsv(csv));
    els.deckStatus.textContent = `${cards.length} cards loaded from ${file.name}`;
    currentIndex = 0;
    updateFilterOptions();
    applyModeAndFilter();
  });
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"' && inQuotes && next === '"') {
      cell += '"';
      i += 1;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      row.push(cell);
      cell = "";
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(cell);
      if (row.some((value) => value.trim() !== "")) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }

  row.push(cell);
  if (row.some((value) => value.trim() !== "")) rows.push(row);

  const headers = rows.shift()?.map((header) => header.trim().toLowerCase()) || [];
  return rows.map((values) => {
    const entry = {};
    headers.forEach((header, index) => {
      entry[header] = (values[index] || "").trim();
    });
    return entry;
  });
}

function normalizeCards(rows) {
  return rows
    .filter((row) => row.word && row.english)
    .map((row, index) => ({
      id: slugify(`${row.article || "none"}-${row.word}-${row.english}`) || `card-${index}`,
      word: row.word,
      article: row.article.toLowerCase(),
      english: row.english,
      example: row.example || "",
      isNoun: ["der", "die", "das"].includes(row.article.toLowerCase())
    }));
}

function applyModeAndFilter() {
  const mode = els.modeSelect.value;
  const filter = els.filterSelect.value;
  const startLetter = els.startSelect.value;

  const filteredCards = cards.filter((card) => {
    const rating = progress[card.id]?.rating;
    const articleRating = articleProgress[card.id]?.rating;
    if (mode === "article-quiz") {
      if (!card.isNoun) return false;
      if (filter === "knownArticles" && articleRating !== "known") return false;
      if (filter === "kindOfArticles" && articleRating !== "kindOf") return false;
      if (filter === "unknownArticles" && articleRating !== "unknown") return false;
      if (filter === "unratedArticles" && articleRating) return false;
      return true;
    }
    if (mode === "article" && !card.isNoun) return false;
    if (filter === "nouns" && !card.isNoun) return false;
    if (filter === "meaningOnly" && rating !== "meaningOnly") return false;
    if (filter === "unsure" && rating !== "unsure") return false;
    if (filter === "dontKnow" && rating !== "dontKnow") return false;
    return true;
  });

  visibleCards = applyStartLetter(filteredCards, startLetter);
  currentIndex = clamp(currentIndex, 0, Math.max(visibleCards.length - 1, 0));
  answerShown = false;
  selectedArticle = "";
  articleQuizAnswered = false;
  selectedQuizArticle = "";
  updateStats();
  renderCard();
}

function renderCard() {
  const card = visibleCards[currentIndex];
  const mode = els.modeSelect.value;
  const modeText = getModeText(mode);

  els.cardMode.textContent = modeText;
  els.cardCounter.textContent = visibleCards.length ? `${currentIndex + 1} / ${visibleCards.length}` : "0 / 0";
  els.emptyState.classList.toggle("hidden", Boolean(card));
  els.showAnswer.disabled = !card;
  els.showAnswer.classList.toggle("hidden", mode === "article-quiz" || !card || answerShown);
  els.ratingButtons.classList.toggle("hidden", mode === "article-quiz" || !card || !answerShown);
  els.answerPanel.classList.toggle("hidden", mode === "article-quiz" || !card || !answerShown);
  els.articleGuess.classList.toggle("hidden", mode === "article-quiz" || !card || mode !== "article" || answerShown);
  els.articleQuiz.classList.toggle("hidden", mode !== "article-quiz" || !card);
  els.meaningOnlyButton.classList.toggle("hidden", !card?.isNoun);
  els.ratingButtons.classList.toggle("noun-card", Boolean(card?.isNoun));

  if (!card) {
    els.promptLabel.textContent = "No cards";
    els.questionText.textContent = "Nothing to study";
    return;
  }

  if (mode === "en-de") {
    els.promptLabel.textContent = "English";
    els.questionText.textContent = card.english;
  } else if (mode === "article-quiz") {
    els.promptLabel.textContent = "Choose der, die, or das";
    els.questionText.textContent = card.word;
  } else if (mode === "article") {
    els.promptLabel.textContent = "Choose the article";
    els.questionText.textContent = card.word;
  } else {
    els.promptLabel.textContent = "German";
    els.questionText.textContent = card.word;
  }

  els.answerArticle.textContent = card.article || "none";
  els.answerMeaning.textContent = mode === "en-de" ? `${card.article ? `${card.article} ` : ""}${card.word}` : card.english;
  els.answerExample.textContent = buildExampleText(card);
  els.articleGuess.querySelectorAll("button").forEach((button) => button.classList.remove("selected"));
  renderArticleQuiz(card);
}

function revealAnswer() {
  if (!visibleCards[currentIndex]) return;
  answerShown = true;
  renderCard();
}

function rateCard(rating) {
  const card = visibleCards[currentIndex];
  progress[card.id] = {
    rating,
    updatedAt: new Date().toISOString()
  };
  saveProgress();

  if (visibleCards.length > 1) {
    currentIndex = (currentIndex + 1) % visibleCards.length;
  }

  applyModeAndFilter();
}

function updateStats() {
  if (els.modeSelect.value === "article-quiz") {
    updateArticleStats();
    return;
  }

  els.statTotalLabel.textContent = "Total";
  els.statKnowLabel.textContent = "Know";
  els.statUnsureLabel.textContent = "Unsure";
  els.statMeaningOnlyLabel.textContent = "Article Gap";
  els.statDontKnowLabel.textContent = "Don't Know";
  els.statCompletedLabel.textContent = "Done";

  const counts = cards.reduce(
    (total, card) => {
      const rating = progress[card.id]?.rating;
      if (rating === "know") total.know += 1;
      if (rating === "unsure") total.unsure += 1;
      if (rating === "meaningOnly") total.meaningOnly += 1;
      if (rating === "dontKnow") total.dontKnow += 1;
      return total;
    },
    { know: 0, unsure: 0, meaningOnly: 0, dontKnow: 0 }
  );

  const completed = counts.know + counts.unsure + counts.meaningOnly + counts.dontKnow;
  els.statTotal.textContent = cards.length;
  els.statKnow.textContent = counts.know;
  els.statUnsure.textContent = counts.unsure;
  els.statMeaningOnly.textContent = counts.meaningOnly;
  els.statDontKnow.textContent = counts.dontKnow;
  els.statCompleted.textContent = cards.length ? `${Math.round((completed / cards.length) * 100)}%` : "0%";
}

function renderArticleQuiz(card) {
  if (els.modeSelect.value !== "article-quiz" || !card) return;

  const fullAnswer = `${card.article} ${card.word}`;
  const isCorrect = selectedQuizArticle === card.article;
  els.articleQuizResult.textContent = isCorrect
    ? `Correct: ${fullAnswer}`
    : `Not quite. Correct answer: ${fullAnswer}`;
  els.articleQuizResult.classList.toggle("hidden", !articleQuizAnswered);
  els.articleQuizResult.classList.toggle("success", articleQuizAnswered && isCorrect);
  els.articleQuizResult.classList.toggle("error", articleQuizAnswered && !isCorrect);
  els.articleRatingButtons.classList.toggle("hidden", !articleQuizAnswered);

  els.articleQuizOptions.querySelectorAll("button").forEach((button) => {
    const article = button.dataset.quizArticle;
    button.disabled = articleQuizAnswered;
    button.classList.toggle("selected", selectedQuizArticle === article);
    button.classList.toggle("correct", articleQuizAnswered && article === card.article);
    button.classList.toggle("incorrect", articleQuizAnswered && selectedQuizArticle === article && article !== card.article);
  });
}

function answerArticleQuiz(article) {
  selectedQuizArticle = article;
  articleQuizAnswered = true;
  renderCard();
}

function rateArticleCard(rating) {
  const card = visibleCards[currentIndex];
  articleProgress[card.id] = {
    rating,
    updatedAt: new Date().toISOString()
  };
  saveArticleProgress();

  if (visibleCards.length > 1) {
    currentIndex = (currentIndex + 1) % visibleCards.length;
  }

  applyModeAndFilter();
}

function updateArticleStats() {
  const reviewLists = getArticleReviewLists();
  const totalNouns = cards.filter((card) => card.isNoun).length;
  const rated = reviewLists.known.length + reviewLists.kindOf.length + reviewLists.unknown.length;

  els.statTotalLabel.textContent = "Noun Cards";
  els.statKnowLabel.textContent = "Known";
  els.statUnsureLabel.textContent = "Kind Of";
  els.statMeaningOnlyLabel.textContent = "Unknown";
  els.statDontKnowLabel.textContent = "Unrated";
  els.statCompletedLabel.textContent = "Done";

  els.statTotal.textContent = totalNouns;
  els.statKnow.textContent = reviewLists.known.length;
  els.statUnsure.textContent = reviewLists.kindOf.length;
  els.statMeaningOnly.textContent = reviewLists.unknown.length;
  els.statDontKnow.textContent = reviewLists.unrated.length;
  els.statCompleted.textContent = totalNouns ? `${Math.round((rated / totalNouns) * 100)}%` : "0%";
}

function getArticleReviewLists() {
  return cards.reduce(
    (lists, card) => {
      if (!card.isNoun) return lists;
      const rating = articleProgress[card.id]?.rating;
      if (rating === "known") lists.known.push(card);
      else if (rating === "kindOf") lists.kindOf.push(card);
      else if (rating === "unknown") lists.unknown.push(card);
      else lists.unrated.push(card);
      return lists;
    },
    { known: [], kindOf: [], unknown: [], unrated: [] }
  );
}

function buildExampleText(card) {
  if (els.modeSelect.value !== "article" || !selectedArticle) return card.example || "-";
  const marker = selectedArticle === card.article ? "Correct" : `Your guess: ${selectedArticle}`;
  return `${marker}. ${card.example || ""}`.trim();
}

function getModeText(mode) {
  if (mode === "article-quiz") return "Article Quiz";
  if (mode === "article") return "Article Practice";
  if (mode === "en-de") return "English -> German";
  return "German -> English";
}

function applyStartLetter(cardList, startLetter) {
  if (startLetter === "all") return cardList;
  const sortedCards = [...cardList].sort((first, second) => getSortKey(first.word).localeCompare(getSortKey(second.word), "de"));
  const startIndex = sortedCards.findIndex((card) => getSortLetter(card.word) >= startLetter);
  return startIndex === -1 ? [] : sortedCards.slice(startIndex);
}

function getSortLetter(word) {
  return getSortKey(word)
    .charAt(0)
    .toUpperCase();
}

function getSortKey(word) {
  return word
    .trim()
    .replace(/^sich(?:\s+etwas)?\s+/i, "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/^[^a-zA-Z]+/, "")
    .toLowerCase();
}

function updateFilterOptions() {
  const isArticleQuiz = els.modeSelect.value === "article-quiz";
  const options = isArticleQuiz ? ARTICLE_FILTERS : STANDARD_FILTERS;
  const allowedValues = options.map(([value]) => value);
  const currentValue = els.filterSelect.value;

  els.filterSelect.replaceChildren(
    ...options.map(([value, label]) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = label;
      return option;
    })
  );

  els.filterSelect.value = allowedValues.includes(currentValue) ? currentValue : options[0][0];
}

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function loadArticleProgress() {
  try {
    return JSON.parse(localStorage.getItem(ARTICLE_STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveArticleProgress() {
  localStorage.setItem(ARTICLE_STORAGE_KEY, JSON.stringify(articleProgress));
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
