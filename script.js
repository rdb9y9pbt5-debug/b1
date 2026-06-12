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
  ["knownMeaning", "Known meaning"],
  ["unsureMeaning", "Kind of known meaning"],
  ["unknownMeaning", "Unknown meaning"],
  ["unratedMeaning", "Unrated meaning"]
];

const ARTICLE_FILTERS = [
  ["allArticle", "All nouns"],
  ["knownArticles", "Known article"],
  ["unknownArticles", "Unknown article"],
  ["unratedArticles", "Unrated article"],
  ["articleGap", "Article gap"]
];

const els = {
  lockScreen: document.querySelector("#lockScreen"),
  lockForm: document.querySelector("#lockForm"),
  passwordInput: document.querySelector("#passwordInput"),
  lockError: document.querySelector("#lockError"),
  profileScreen: document.querySelector("#profileScreen"),
  profileGrid: document.querySelector("#profileGrid"),
  appShell: document.querySelector("#appShell"),
  dashboardScreen: document.querySelector("#dashboardScreen"),
  dashboardWelcome: document.querySelector("#dashboardWelcome"),
  dashboardWordsLearned: document.querySelector("#dashboardWordsLearned"),
  dashboardWordsTotal: document.querySelector("#dashboardWordsTotal"),
  dashboardArticlesLearned: document.querySelector("#dashboardArticlesLearned"),
  dashboardNounsTotal: document.querySelector("#dashboardNounsTotal"),
  controlPanel: document.querySelector("#controlPanel"),
  searchPanel: document.querySelector("#searchPanel"),
  statsGrid: document.querySelector("#statsGrid"),
  studyStage: document.querySelector("#studyStage"),
  actionBar: document.querySelector("#actionBar"),
  deckStatus: document.querySelector("#deckStatus"),
  currentProfileLabel: document.querySelector("#currentProfileLabel"),
  modeSelect: document.querySelector("#modeSelect"),
  filterSelect: document.querySelector("#filterSelect"),
  startSelect: document.querySelector("#startSelect"),
  orderSelect: document.querySelector("#orderSelect"),
  wordSearchInput: document.querySelector("#wordSearchInput"),
  searchResults: document.querySelector("#searchResults"),
  csvInput: document.querySelector("#csvInput"),
  homeButton: document.querySelector("#homeButton"),
  switchProfile: document.querySelector("#switchProfile"),
  lockApp: document.querySelector("#lockApp"),
  resetProgress: document.querySelector("#resetProgress"),
  statWordsLearned: document.querySelector("#statWordsLearned"),
  statWordsTotal: document.querySelector("#statWordsTotal"),
  statArticlesLearned: document.querySelector("#statArticlesLearned"),
  statNounsTotal: document.querySelector("#statNounsTotal"),
  statMeaningKnown: document.querySelector("#statMeaningKnown"),
  statMeaningUnsure: document.querySelector("#statMeaningUnsure"),
  statMeaningUnknown: document.querySelector("#statMeaningUnknown"),
  statMeaningUnrated: document.querySelector("#statMeaningUnrated"),
  statArticleKnown: document.querySelector("#statArticleKnown"),
  statArticleUnknown: document.querySelector("#statArticleUnknown"),
  statArticleUnrated: document.querySelector("#statArticleUnrated"),
  statArticleGap: document.querySelector("#statArticleGap"),
  cardCounter: document.querySelector("#cardCounter"),
  cardMode: document.querySelector("#cardMode"),
  promptLabel: document.querySelector("#promptLabel"),
  questionText: document.querySelector("#questionText"),
  articleGuess: document.querySelector("#articleGuess"),
  articleQuiz: document.querySelector("#articleQuiz"),
  articleQuizOptions: document.querySelector("#articleQuizOptions"),
  articleQuizResult: document.querySelector("#articleQuizResult"),
  answerPanel: document.querySelector("#answerPanel"),
  answerArticle: document.querySelector("#answerArticle"),
  answerMeaning: document.querySelector("#answerMeaning"),
  answerExample: document.querySelector("#answerExample"),
  emptyState: document.querySelector("#emptyState"),
  previousCard: document.querySelector("#previousCard"),
  nextCard: document.querySelector("#nextCard"),
  showAnswer: document.querySelector("#showAnswer"),
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
let currentView = "dashboard";

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
    store.profiles.mineko.progress = normalizeMeaningProgress(store.profiles.mineko.progress);
    store.profiles.mineko.articleProgress = normalizeArticleProgress(store.profiles.mineko.articleProgress);
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
    progress: normalizeMeaningProgress(data?.progress || {}),
    articleProgress: normalizeArticleProgress(data?.articleProgress || {}),
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

function normalizeMeaningProgress(savedProgress) {
  return Object.fromEntries(
    Object.entries(savedProgress).map(([cardId, entry]) => [
      cardId,
      {
        ...entry,
        meaningStatus: normalizeMeaningStatus(entry.meaningStatus || entry.rating)
      }
    ])
  );
}

function normalizeArticleProgress(savedProgress) {
  return Object.fromEntries(
    Object.entries(savedProgress).map(([cardId, entry]) => [
      cardId,
      {
        ...entry,
        articleStatus: normalizeArticleStatus(entry.articleStatus || entry.rating)
      }
    ])
  );
}

function normalizeMeaningStatus(value) {
  if (value === "know" || value === "known" || value === "meaningOnly") return "known";
  if (value === "unsure") return "unsure";
  if (value === "dontKnow" || value === "unknown") return "unknown";
  return "unrated";
}

function normalizeArticleStatus(value) {
  if (value === "known") return "known";
  if (value === "kindOf" || value === "unsure" || value === "unknown") return "unknown";
  return "unrated";
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
  showDashboard();
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

function showDashboard() {
  currentView = "dashboard";
  renderDashboard();
  els.dashboardScreen.classList.remove("hidden");
  els.controlPanel.classList.add("hidden");
  els.searchPanel.classList.add("hidden");
  els.statsGrid.classList.add("hidden");
  els.studyStage.classList.add("hidden");
  els.actionBar.classList.add("hidden");
}

function showStudyView(options = {}) {
  currentView = "study";
  els.dashboardScreen.classList.add("hidden");
  els.controlPanel.classList.toggle("hidden", options.hideControls === true);
  els.searchPanel.classList.remove("hidden");
  els.statsGrid.classList.remove("hidden");
  els.studyStage.classList.remove("hidden");
  els.actionBar.classList.remove("hidden");
  if (options.focusSearch) {
    window.setTimeout(() => els.wordSearchInput.focus(), 0);
  }
  if (options.openStats) {
    document.querySelector(".detailed-stats")?.setAttribute("open", "");
  } else {
    document.querySelector(".detailed-stats")?.removeAttribute("open");
  }
}

function renderDashboard() {
  if (!currentProfileId) return;
  const profile = getCurrentProfile();
  const articleSummary = getArticleSummary();
  els.dashboardWelcome.textContent = `Welcome back, ${profile.name}`;
  els.dashboardWordsLearned.textContent = getWordsLearnedCount();
  els.dashboardWordsTotal.textContent = cards.length;
  els.dashboardArticlesLearned.textContent = articleSummary.known;
  els.dashboardNounsTotal.textContent = articleSummary.nouns;
}

function handleDashboardAction(action) {
  const routes = {
    continue: { mode: "de-en", filter: "all" },
    articles: { mode: "article", filter: "allArticle" },
    "unknown-meanings": { mode: "de-en", filter: "unknownMeaning" },
    "unknown-articles": { mode: "article", filter: "unknownArticles" },
    search: { mode: "de-en", filter: "all", focusSearch: true },
    statistics: { mode: els.modeSelect.value, filter: els.filterSelect.value, openStats: true }
  };
  const route = routes[action];
  if (!route) return;

  els.modeSelect.value = route.mode;
  updateFilterOptions();
  els.filterSelect.value = getValidFilterValue(route.filter);
  els.startSelect.value = "all";
  currentIndex = 0;
  randomSessionKey = "";
  randomSessionIds = [];
  saveSettings();
  applyModeAndFilter();
  showStudyView({ focusSearch: route.focusSearch, openStats: route.openStats });
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
      const status = normalizeMeaningStatus(entry.meaningStatus || entry.rating);
      if (status === "known") total.known += 1;
      if (status === "unsure") total.unsure += 1;
      if (status === "unknown") total.unknown += 1;
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

  els.dashboardScreen.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-dashboard-action]");
    if (!button) return;
    handleDashboardAction(button.dataset.dashboardAction);
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

  els.homeButton.addEventListener("click", showDashboard);

  els.ratingButtons.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-rating]");
    if (!button || !visibleCards[currentIndex]) return;
    rateCard(button.dataset.rating);
  });

  els.articleGuess.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-article]");
    if (!button || !visibleCards[currentIndex] || articleQuizAnswered) return;
    answerArticleQuiz(button.dataset.article);
  });

  els.articleQuizOptions.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-quiz-article]");
    if (!button || !visibleCards[currentIndex] || articleQuizAnswered) return;
    answerArticleQuiz(button.dataset.quizArticle);
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
    const meaningStatus = getMeaningStatus(card);
    const articleStatus = getArticleStatus(card);
    if (mode === "article-quiz" || mode === "article") {
      if (!card.isNoun) return false;
      if (filter === "knownArticles" && articleStatus !== "known") return false;
      if (filter === "unknownArticles" && articleStatus !== "unknown") return false;
      if (filter === "unratedArticles" && articleStatus !== "unrated") return false;
      if (filter === "articleGap" && !(meaningStatus === "known" && articleStatus !== "known")) return false;
      return true;
    }
    if (filter === "knownMeaning" && meaningStatus !== "known") return false;
    if (filter === "unsureMeaning" && meaningStatus !== "unsure") return false;
    if (filter === "unknownMeaning" && meaningStatus !== "unknown") return false;
    if (filter === "unratedMeaning" && meaningStatus !== "unrated") return false;
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
  els.showAnswer.classList.toggle("hidden", mode === "article-quiz" || mode === "article" || !card || answerShown);
  els.ratingButtons.classList.toggle("hidden", mode === "article-quiz" || mode === "article" || !card || !answerShown);
  els.answerPanel.classList.toggle("hidden", mode === "article-quiz" || mode === "article" || !card || !answerShown);
  els.articleGuess.classList.toggle("hidden", mode === "article-quiz" || !card || mode !== "article" || articleQuizAnswered);
  els.articleQuiz.classList.toggle("hidden", mode !== "article-quiz" || !card || articleQuizAnswered);
  els.ratingButtons.classList.toggle("article-rating-mode", mode === "article");
  updateRatingButtonLabels(mode);

  if (!card) {
    els.promptLabel.textContent = "No cards";
    els.articleQuizResult.classList.add("hidden");
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
  renderArticleResult(card);
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
  if (els.modeSelect.value === "article") {
    rateArticleCard(rating);
    return;
  }
  progress[card.id] = {
    meaningStatus: normalizeMeaningStatus(rating),
    updatedAt: new Date().toISOString()
  };
  recordStudyHistory("flashcard", card, normalizeMeaningStatus(rating));
  saveProgress();

  if (visibleCards.length > 1) {
    currentIndex = (currentIndex + 1) % visibleCards.length;
  }

  applyModeAndFilter();
}

function updateStats() {
  const meaning = cards.reduce(
    (total, card) => {
      total[getMeaningStatus(card)] += 1;
      return total;
    },
    { known: 0, unsure: 0, unknown: 0, unrated: 0 }
  );

  const articles = getArticleSummary();

  els.statMeaningKnown.textContent = meaning.known;
  els.statMeaningUnsure.textContent = meaning.unsure;
  els.statMeaningUnknown.textContent = meaning.unknown;
  els.statMeaningUnrated.textContent = meaning.unrated;
  els.statArticleKnown.textContent = articles.known;
  els.statArticleUnknown.textContent = articles.unknown;
  els.statArticleUnrated.textContent = articles.unrated;
  els.statArticleGap.textContent = articles.gap;
  els.statArticlesLearned.textContent = articles.known;
  els.statNounsTotal.textContent = articles.nouns;
  els.statWordsLearned.textContent = getWordsLearnedCount();
  els.statWordsTotal.textContent = cards.length;
  if (currentView === "dashboard") renderDashboard();
}

function renderArticleResult(card) {
  const mode = els.modeSelect.value;
  if (!["article", "article-quiz"].includes(mode) || !card) {
    els.articleQuizResult.classList.add("hidden");
    return;
  }

  const fullAnswer = `${card.article} ${card.word}`;
  const isCorrect = selectedQuizArticle === card.article;
  els.articleQuizResult.innerHTML = isCorrect
    ? `
      <span class="quiz-result-label">✅ Correct</span>
      <span class="quiz-result-answer">${escapeHtml(fullAnswer)}</span>
      <span class="quiz-result-meaning">${escapeHtml(card.english)}</span>
    `
    : `
      <span class="quiz-result-label">❌ Wrong</span>
      <span class="quiz-result-correction">Correct answer:</span>
      <span class="quiz-result-answer">${escapeHtml(fullAnswer)}</span>
      <span class="quiz-result-meaning">${escapeHtml(card.english)}</span>
    `;
  els.articleQuizResult.classList.toggle("hidden", !articleQuizAnswered);
  els.articleQuizResult.classList.toggle("success", articleQuizAnswered && isCorrect);
  els.articleQuizResult.classList.toggle("error", articleQuizAnswered && !isCorrect);

  els.articleGuess.querySelectorAll("button").forEach((button) => {
    const article = button.dataset.article;
    button.disabled = articleQuizAnswered;
    button.classList.toggle("selected", selectedQuizArticle === article);
    button.classList.toggle("correct", articleQuizAnswered && article === card.article);
    button.classList.toggle("incorrect", articleQuizAnswered && selectedQuizArticle === article && article !== card.article);
  });

  els.articleQuizOptions.querySelectorAll("button").forEach((button) => {
    const article = button.dataset.quizArticle;
    button.disabled = articleQuizAnswered;
    button.classList.toggle("selected", selectedQuizArticle === article);
    button.classList.toggle("correct", articleQuizAnswered && article === card.article);
    button.classList.toggle("incorrect", articleQuizAnswered && selectedQuizArticle === article && article !== card.article);
  });
}

function answerArticleQuiz(article) {
  const card = visibleCards[currentIndex];
  if (!card) return;
  selectedQuizArticle = article;
  articleQuizAnswered = true;
  const status = article === card.article ? "known" : "unknown";
  console.log("Article button clicked", {
    selectedArticle: article,
    correctArticle: card.article,
    isCorrect: status === "known"
  });
  articleProgress[card.id] = {
    articleStatus: status,
    updatedAt: new Date().toISOString()
  };
  recordStudyHistory("article-quiz", card, status);
  saveArticleProgress();
  updateStats();
  renderCard();
}

function rateArticleCard(rating) {
  const card = visibleCards[currentIndex];
  articleProgress[card.id] = {
    articleStatus: normalizeArticleStatus(rating),
    updatedAt: new Date().toISOString()
  };
  recordStudyHistory(els.modeSelect.value === "article" ? "article-practice" : "article-quiz", card, normalizeArticleStatus(rating));
  saveArticleProgress();

  if (visibleCards.length > 1) {
    currentIndex = (currentIndex + 1) % visibleCards.length;
  }

  applyModeAndFilter();
}

function getArticleReviewLists() {
  return cards.reduce(
    (lists, card) => {
      if (!card.isNoun) return lists;
      const rating = getArticleStatus(card);
      if (rating === "known") lists.known.push(card);
      else if (rating === "unknown") lists.unknown.push(card);
      else lists.unrated.push(card);
      return lists;
    },
    { known: [], unknown: [], unrated: [] }
  );
}

function buildExampleText(card) {
  if (els.modeSelect.value !== "article" || !selectedArticle) return card.example || "-";
  const marker = selectedArticle === card.article ? "Correct" : `Your guess: ${selectedArticle}`;
  return `${marker}. ${card.example || ""}`.trim();
}

function getMeaningStatus(card) {
  const entry = progress[card.id];
  return normalizeMeaningStatus(entry?.meaningStatus || entry?.rating);
}

function getArticleStatus(card) {
  const entry = articleProgress[card.id];
  return normalizeArticleStatus(entry?.articleStatus || entry?.rating);
}

function getArticleSummary() {
  return cards.reduce(
    (total, card) => {
      if (!card.isNoun) return total;
      total.nouns += 1;
      total[getArticleStatus(card)] += 1;
      if (getMeaningStatus(card) === "known" && getArticleStatus(card) !== "known") total.gap += 1;
      return total;
    },
    { known: 0, unknown: 0, unrated: 0, gap: 0, nouns: 0 }
  );
}

function getWordsLearnedCount() {
  return cards.filter((card) => {
    const meaningKnown = getMeaningStatus(card) === "known";
    const articleKnown = !card.isNoun || getArticleStatus(card) === "known";
    return meaningKnown && articleKnown;
  }).length;
}

function updateRatingButtonLabels(mode) {
  const labels = mode === "article"
    ? [
      ["known", "I know the article", false],
      ["unknown", "I don’t know the article", false],
      ["unknown", "", true]
    ]
    : [
      ["known", "I know the meaning", false],
      ["unsure", "I kind of know the meaning", false],
      ["unknown", "I don’t know the meaning", false]
    ];

  els.ratingButtons.querySelectorAll("button[data-rating]").forEach((button, index) => {
    const [value, label, hidden] = labels[index];
    button.dataset.rating = value;
    button.textContent = label;
    button.classList.toggle("hidden", hidden);
  });
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
  const isArticleQuiz = els.modeSelect.value === "article-quiz" || els.modeSelect.value === "article";
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
  const options = els.modeSelect.value === "article-quiz" || els.modeSelect.value === "article" ? ARTICLE_FILTERS : STANDARD_FILTERS;
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
