const CSV_URL = "vocabulary.csv";
const APP_PASSWORD = "b1";
const UNLOCK_STORAGE_KEY = "goethe-b1-flashcards-unlocked-v1";
const STORAGE_KEY = "goethe-b1-flashcards-progress-v1";
const ARTICLE_STORAGE_KEY = "goethe-b1-article-quiz-progress-v1";
const PROFILE_STORAGE_KEY = "goethe-b1-profile-store-v1";
const PROFILE_STORE_VERSION = 1;

const DEFAULT_PROFILES = [
  { id: "mineko", name: "Mineko", emoji: "⭐" },
  { id: "sami", name: "Sami", emoji: "🎹" },
  { id: "mai", name: "Mai", emoji: "🌸" },
  { id: "ziad", name: "Ziad", emoji: "☕" }
];

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
  profileScreen: document.querySelector("#profileScreen"),
  profileGrid: document.querySelector("#profileGrid"),
  appShell: document.querySelector("#appShell"),
  deckStatus: document.querySelector("#deckStatus"),
  currentProfileLabel: document.querySelector("#currentProfileLabel"),
  modeSelect: document.querySelector("#modeSelect"),
  filterSelect: document.querySelector("#filterSelect"),
  startSelect: document.querySelector("#startSelect"),
  orderSelect: document.querySelector("#orderSelect"),
  wordSearchInput: document.querySelector("#wordSearchInput"),
  searchResults: document.querySelector("#searchResults"),
  csvInput: document.querySelector("#csvInput"),
  switchProfile: document.querySelector("#switchProfile"),
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
  previousCard: document.querySelector("#previousCard"),
  nextCard: document.querySelector("#nextCard"),
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
let profileStore = null;
let currentProfileId = "";
let searchResults = [];
let randomSessionKey = "";
let randomSessionIds = [];

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
  profileStore = loadProfileStore();
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
  if (profileStore.currentProfile) {
    selectProfile(profileStore.currentProfile);
  } else {
    showProfileScreen();
  }
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

function loadProfileStore() {
  const emptyStore = createProfileStore();
  let stored = null;
  try {
    stored = JSON.parse(localStorage.getItem(PROFILE_STORAGE_KEY));
  } catch {
    stored = null;
  }

  const store = {
    ...emptyStore,
    ...(stored || {}),
    profiles: {
      ...emptyStore.profiles,
      ...(stored?.profiles || {})
    }
  };

  DEFAULT_PROFILES.forEach((profile) => {
    store.profiles[profile.id] = normalizeProfileData(store.profiles[profile.id], profile);
  });

  if (!store.migratedLegacyProgress) {
    const legacyProgress = readStorageObject(STORAGE_KEY);
    const legacyArticleProgress = readStorageObject(ARTICLE_STORAGE_KEY);
    const hasLegacyData = Object.keys(legacyProgress).length > 0 || Object.keys(legacyArticleProgress).length > 0;
    store.profiles.mineko.progress = {
      ...legacyProgress,
      ...store.profiles.mineko.progress
    };
    store.profiles.mineko.articleProgress = {
      ...legacyArticleProgress,
      ...store.profiles.mineko.articleProgress
    };
    if (hasLegacyData) store.currentProfile = store.currentProfile || "mineko";
    store.migratedLegacyProgress = true;
  }

  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(store));
  return store;
}

function createProfileStore() {
  return {
    version: PROFILE_STORE_VERSION,
    currentProfile: "",
    migratedLegacyProgress: false,
    profiles: DEFAULT_PROFILES.reduce((profiles, profile) => {
      profiles[profile.id] = normalizeProfileData(null, profile);
      return profiles;
    }, {})
  };
}

function normalizeProfileData(data, profile) {
  return {
    id: profile.id,
    name: data?.name || profile.name,
    emoji: data?.emoji || profile.emoji,
    decks: data?.decks || {},
    progress: data?.progress || {},
    articleProgress: data?.articleProgress || {},
    settings: {
      mode: data?.settings?.mode || "de-en",
      filter: data?.settings?.filter || "all",
      start: data?.settings?.start || "all",
      order: data?.settings?.order || "alphabetical"
    },
    history: Array.isArray(data?.history) ? data.history : [],
    lastStudyDate: data?.lastStudyDate || ""
  };
}

function readStorageObject(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || {};
  } catch {
    return {};
  }
}

function saveProfileStore() {
  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profileStore));
}

function showProfileScreen() {
  currentProfileId = "";
  progress = {};
  articleProgress = {};
  els.appShell.classList.add("locked");
  els.profileScreen.classList.remove("hidden");
  renderProfileCards();
}

function selectProfile(profileId) {
  const profile = profileStore.profiles[profileId];
  if (!profile) return;
  currentProfileId = profileId;
  profileStore.currentProfile = profileId;
  progress = profile.progress;
  articleProgress = profile.articleProgress;
  applyProfileSettings(profile.settings);
  saveProfileStore();
  els.currentProfileLabel.textContent = `${profile.emoji} ${profile.name}`;
  els.profileScreen.classList.add("hidden");
  els.appShell.classList.remove("locked");
  updateFilterOptions();
  currentIndex = 0;
  applyModeAndFilter();
}

function getCurrentProfile() {
  return profileStore.profiles[currentProfileId || profileStore.currentProfile || "mineko"];
}

function applyProfileSettings(settings) {
  els.modeSelect.value = settings.mode || "de-en";
  updateFilterOptions();
  els.filterSelect.value = getValidFilterValue(settings.filter || "all");
  els.startSelect.value = settings.start || "all";
  els.orderSelect.value = settings.order || "alphabetical";
}

function saveSettings() {
  if (!currentProfileId) return;
  const profile = getCurrentProfile();
  profile.settings = {
    mode: els.modeSelect.value,
    filter: els.filterSelect.value,
    start: els.startSelect.value,
    order: els.orderSelect.value
  };
  saveProfileStore();
}

function renderProfileCards() {
  els.profileGrid.replaceChildren(
    ...DEFAULT_PROFILES.map((profileInfo) => {
      const profile = profileStore.profiles[profileInfo.id];
      const stats = getProfileDashboardStats(profile);
      const button = document.createElement("button");
      button.className = "profile-card";
      button.type = "button";
      button.dataset.profileId = profile.id;
      button.innerHTML = `
        <span class="profile-emoji" aria-hidden="true">${profile.emoji}</span>
        <span class="profile-name">${profile.name}</span>
        <span class="profile-last">${stats.lastStudyDate}</span>
        <span class="profile-stat"><strong>${stats.total}</strong> words</span>
        <span class="profile-stat"><strong>${stats.known}</strong> known</span>
        <span class="profile-stat"><strong>${stats.unsure}</strong> unsure</span>
        <span class="profile-stat"><strong>${stats.unknown}</strong> unknown</span>
        <span class="profile-stat"><strong>${stats.mastered}</strong> mastered</span>
      `;
      return button;
    })
  );
}

function getProfileDashboardStats(profile) {
  const counts = Object.values(profile.progress || {}).reduce(
    (total, entry) => {
      if (entry.rating === "know") total.known += 1;
      if (entry.rating === "unsure") total.unsure += 1;
      if (entry.rating === "dontKnow") total.unknown += 1;
      return total;
    },
    { known: 0, unsure: 0, unknown: 0 }
  );
  const mastered = cards.length ? `${Math.round((counts.known / cards.length) * 100)}%` : "0%";
  return {
    total: cards.length,
    known: counts.known,
    unsure: counts.unsure,
    unknown: counts.unknown,
    mastered,
    lastStudyDate: profile.lastStudyDate ? `Last: ${formatDate(profile.lastStudyDate)}` : "Not studied yet"
  };
}

function formatDate(value) {
  return new Date(value).toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" });
}

function bindEvents() {
  if (els.appShell.dataset.bound === "true") return;
  els.appShell.dataset.bound = "true";
  els.profileGrid.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-profile-id]");
    if (!button) return;
    selectProfile(button.dataset.profileId);
  });

  els.modeSelect.addEventListener("change", () => {
    currentIndex = 0;
    updateFilterOptions();
    saveSettings();
    applyModeAndFilter();
  });

  els.filterSelect.addEventListener("change", () => {
    currentIndex = 0;
    saveSettings();
    applyModeAndFilter();
  });

  els.startSelect.addEventListener("change", () => {
    currentIndex = 0;
    saveSettings();
    applyModeAndFilter();
  });

  els.orderSelect.addEventListener("change", () => {
    currentIndex = 0;
    randomSessionKey = "";
    randomSessionIds = [];
    saveSettings();
    applyModeAndFilter();
  });

  els.wordSearchInput.addEventListener("input", updateSearchResults);

  els.searchResults.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-card-id]");
    if (!button) return;
    openSearchResult(button.dataset.cardId);
  });

  els.showAnswer.addEventListener("click", revealAnswer);

  els.previousCard.addEventListener("click", () => moveCard(-1));
  els.nextCard.addEventListener("click", () => moveCard(1));

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

  els.switchProfile.addEventListener("click", showProfileScreen);

  els.lockApp.addEventListener("click", () => {
    localStorage.removeItem(UNLOCK_STORAGE_KEY);
    window.location.reload();
  });

  els.resetProgress.addEventListener("click", () => {
    const profile = getCurrentProfile();
    if (!window.confirm(`Reset saved progress for ${profile.name}?`)) return;
    progress = {};
    articleProgress = {};
    profile.history = [];
    profile.lastStudyDate = "";
    saveProgress();
    saveArticleProgress();
    saveProfileStore();
    currentIndex = 0;
    applyModeAndFilter();
  });

  if (els.csvInput) {
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
  const order = els.orderSelect.value;

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

  visibleCards = applyStudyOrder(applyStartLetter(filteredCards, startLetter), order);
  currentIndex = clamp(currentIndex, 0, Math.max(visibleCards.length - 1, 0));
  answerShown = false;
  selectedArticle = "";
  articleQuizAnswered = false;
  selectedQuizArticle = "";
  updateStats();
  renderCard();
}

function updateSearchResults() {
  const query = els.wordSearchInput.value.trim();
  if (!query) {
    searchResults = [];
    els.searchResults.classList.add("hidden");
    els.searchResults.replaceChildren();
    return;
  }

  const normalizedQuery = normalizeSearchValue(query);
  searchResults = cards
    .filter((card) => normalizeSearchValue(card.word).includes(normalizedQuery))
    .sort((first, second) => getSortKey(first.word).localeCompare(getSortKey(second.word), "de"))
    .slice(0, 40);

  renderSearchResults(query);
}

function renderSearchResults(query) {
  els.searchResults.classList.remove("hidden");
  if (!searchResults.length) {
    els.searchResults.replaceChildren(createSearchEmptyMessage(query));
    return;
  }

  els.searchResults.replaceChildren(
    ...searchResults.map((card) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "search-result";
      button.dataset.cardId = card.id;
      button.innerHTML = `
        <span class="search-result-word">${formatGermanWord(card)}</span>
        <span class="search-result-english">${escapeHtml(card.english)}</span>
        <span class="search-result-example">${escapeHtml(card.example || "")}</span>
      `;
      return button;
    })
  );
}

function createSearchEmptyMessage(query) {
  const message = document.createElement("p");
  message.className = "search-empty";
  message.textContent = `No German words found for "${query}".`;
  return message;
}

function openSearchResult(cardId) {
  const card = cards.find((item) => item.id === cardId);
  if (!card) return;

  els.wordSearchInput.value = "";
  searchResults = [];
  els.searchResults.classList.add("hidden");
  els.searchResults.replaceChildren();

  els.modeSelect.value = "de-en";
  updateFilterOptions();
  els.filterSelect.value = "all";
  els.startSelect.value = "all";
  els.orderSelect.value = "alphabetical";
  applyModeAndFilter();

  const index = visibleCards.findIndex((item) => item.id === card.id);
  if (index !== -1) {
    currentIndex = index;
    answerShown = false;
    selectedArticle = "";
    articleQuizAnswered = false;
    selectedQuizArticle = "";
    renderCard();
  }
}

function normalizeSearchValue(value) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "");
}

function formatGermanWord(card) {
  const word = escapeHtml(card.word);
  return card.article ? `${escapeHtml(card.article)} ${word}` : word;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderCard() {
  const card = visibleCards[currentIndex];
  const mode = els.modeSelect.value;
  const modeText = getModeText(mode);

  els.cardMode.textContent = modeText;
  els.cardCounter.textContent = visibleCards.length ? `Card ${currentIndex + 1} of ${visibleCards.length}` : "Card 0 of 0";
  els.emptyState.classList.toggle("hidden", Boolean(card));
  els.previousCard.disabled = visibleCards.length < 2;
  els.nextCard.disabled = visibleCards.length < 2;
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

function moveCard(direction) {
  if (!visibleCards.length) return;
  currentIndex = (currentIndex + direction + visibleCards.length) % visibleCards.length;
  answerShown = false;
  selectedArticle = "";
  articleQuizAnswered = false;
  selectedQuizArticle = "";
  renderCard();
}

function rateCard(rating) {
  const card = visibleCards[currentIndex];
  progress[card.id] = {
    rating,
    updatedAt: new Date().toISOString()
  };
  recordStudyHistory("flashcard", card, rating);
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
  recordStudyHistory("article-quiz", card, rating);
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
  const sortedCards = [...cardList].sort((first, second) => getSortKey(first.word).localeCompare(getSortKey(second.word), "de"));
  if (startLetter === "all") return sortedCards;
  const startIndex = sortedCards.findIndex((card) => getSortLetter(card.word) >= startLetter);
  return startIndex === -1 ? [] : sortedCards.slice(startIndex);
}

function applyStudyOrder(cardList, order) {
  if (order !== "random") return cardList;

  const sessionKey = [
    currentProfileId,
    els.modeSelect.value,
    els.filterSelect.value,
    els.startSelect.value,
    cardList.map((card) => card.id).join("|")
  ].join("::");

  if (sessionKey !== randomSessionKey) {
    randomSessionKey = sessionKey;
    randomSessionIds = shuffleCards(cardList).map((card) => card.id);
  }

  const cardsById = new Map(cardList.map((card) => [card.id, card]));
  return randomSessionIds.map((id) => cardsById.get(id)).filter(Boolean);
}

function shuffleCards(cardList) {
  const shuffled = [...cardList];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
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

function getValidFilterValue(value) {
  const options = els.modeSelect.value === "article-quiz" ? ARTICLE_FILTERS : STANDARD_FILTERS;
  const allowedValues = options.map(([optionValue]) => optionValue);
  return allowedValues.includes(value) ? value : options[0][0];
}

function recordStudyHistory(type, card, rating) {
  if (!currentProfileId) return;
  const profile = getCurrentProfile();
  const now = new Date().toISOString();
  profile.lastStudyDate = now;
  profile.history = [
    {
      type,
      cardId: card.id,
      word: card.word,
      rating,
      studiedAt: now,
      mode: els.modeSelect.value
    },
    ...(profile.history || [])
  ].slice(0, 200);
}

function loadProgress() {
  return getCurrentProfile()?.progress || {};
}

function saveProgress() {
  if (!currentProfileId) return;
  getCurrentProfile().progress = progress;
  saveProfileStore();
}

function loadArticleProgress() {
  return getCurrentProfile()?.articleProgress || {};
}

function saveArticleProgress() {
  if (!currentProfileId) return;
  getCurrentProfile().articleProgress = articleProgress;
  saveProfileStore();
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
