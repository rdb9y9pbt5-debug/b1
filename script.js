const CSV_URL = "vocabulary.csv";
const NOUN_VERB_CSV_URL = "nomen_verb_verbindungen.csv";
const APP_PASSWORD = "b1";
const UNLOCK_STORAGE_KEY = "goethe-b1-flashcards-unlocked-v1";
const STORAGE_KEY = "goethe-b1-flashcards-progress-v1";
const ARTICLE_STORAGE_KEY = "goethe-b1-article-quiz-progress-v1";
const PROFILE_STORAGE_KEY = "goethe-b1-profile-store-v1";
const PROFILE_STORE_VERSION = 1;
const SUPABASE_URL = "https://fpbgaaswsgfdlydaoids.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_LcLGhSMEDZnMnqMw8xvkAw_a6JPQsgH";
const SUPABASE_SYNC_TABLE = "family_progress";
const FAMILY_SYNC_ID = "zaghrout";

const DEFAULT_PROFILES = [
  { id: "mineko", name: "Mineko", emoji: "⭐", avatar: "mineko.png" },
  { id: "sami", name: "Sami", emoji: "🚀", avatar: "sami.png" },
  { id: "mai", name: "Mai", emoji: "🌸", avatar: "mai.png" },
  { id: "ziad", name: "Ziad", emoji: "📚", avatar: "ziad.png" }
];

const LEADERBOARD_PROFILE_IDS = ["mineko", "sami", "mai"];
const DAILY_CHALLENGE_GOAL = 20;
const DAILY_CHALLENGE_REWARD = 10;
const STREAK_ACTIVITY_GOAL = 10;
const LEVEL_UP_BONUS = 25;
const FAMILY_MILESTONES = [
  { coins: 500, reward: "" },
  { coins: 1000, reward: "" },
  { coins: 2000, reward: "" },
  { coins: 5000, reward: "" },
  { coins: 10000, reward: "" }
];
const FAMILY_WEALTH_LEVELS = [
  { min: 0, next: 100, icon: "🏚️", name: "Broke Family" },
  { min: 100, next: 250, icon: "🛒", name: "Corner Shop" },
  { min: 250, next: 500, icon: "🏠", name: "Family Home" },
  { min: 500, next: 1000, icon: "🏡", name: "Comfortable Living" },
  { min: 1000, next: 2000, icon: "🚗", name: "Two-Car Family" },
  { min: 2000, next: 4000, icon: "🏦", name: "Family Business" },
  { min: 4000, next: 8000, icon: "🏢", name: "Small Empire" },
  { min: 8000, next: 15000, icon: "🏰", name: "Language Dynasty" },
  { min: 15000, next: null, icon: "🌎", name: "Global Conglomerate" }
];
const COIN_LEVELS = [
  { min: 0, next: 50, icon: "🪙", name: "Coin Pouch" },
  { min: 50, next: 150, icon: "👛", name: "Wallet" },
  { min: 150, next: 300, icon: "🐷", name: "Piggy Bank" },
  { min: 300, next: 500, icon: "💰", name: "Treasure Chest" },
  { min: 500, next: 800, icon: "🏧", name: "ATM" },
  { min: 800, next: 1200, icon: "🏦", name: "Bank" },
  { min: 1200, next: 1600, icon: "🏛️", name: "Bill Gates" },
  { min: 1600, next: 2500, icon: "💎", name: "Jeff Bezos" },
  { min: 2500, next: null, icon: "👑", name: "Elon Musk" }
];

const STANDARD_FILTERS = [
  ["all", "All words"],
  ["knownMeaning", "Known meaning"],
  ["unsureMeaning", "Kind of known meaning"],
  ["unknownMeaning", "Unknown meaning"],
  ["unratedMeaning", "Unrated meaning"]
];

const ARTICLE_FILTERS = [
  ["smartArticle", "Smart Review"],
  ["newArticles", "New"],
  ["learnedArticles", "Learned"],
  ["masteredArticles", "Mastered"],
  ["wrongRecently", "Wrong Recently"]
];

const els = {
  lockScreen: document.querySelector("#lockScreen"),
  lockForm: document.querySelector("#lockForm"),
  passwordInput: document.querySelector("#passwordInput"),
  lockError: document.querySelector("#lockError"),
  profileScreen: document.querySelector("#profileScreen"),
  profileGrid: document.querySelector("#profileGrid"),
  profileDebug: document.querySelector("#profileDebug"),
  familyWealthCoins: document.querySelector("#familyWealthCoins"),
  familyWealthLevel: document.querySelector("#familyWealthLevel"),
  familyNextLevelName: document.querySelector("#familyNextLevelName"),
  familyGoalCoins: document.querySelector("#familyGoalCoins"),
  familyGoalRemaining: document.querySelector("#familyGoalRemaining"),
  familyWealthProgressFill: document.querySelector("#familyWealthProgressFill"),
  familyWealthProgressText: document.querySelector("#familyWealthProgressText"),
  appShell: document.querySelector("#appShell"),
  dashboardScreen: document.querySelector("#dashboardScreen"),
  coinChallengesScreen: document.querySelector("#coinChallengesScreen"),
  dashboardAvatar: document.querySelector("#dashboardAvatar"),
  dashboardWelcome: document.querySelector("#dashboardWelcome"),
  dashboardWordsLearned: document.querySelector("#dashboardWordsLearned"),
  dashboardWordsTotal: document.querySelector("#dashboardWordsTotal"),
  dashboardArticleNew: document.querySelector("#dashboardArticleNew"),
  dashboardArticleLearned: document.querySelector("#dashboardArticleLearned"),
  dashboardArticleMastered: document.querySelector("#dashboardArticleMastered"),
  dashboardNounVerbNew: document.querySelector("#dashboardNounVerbNew"),
  dashboardNounVerbLearned: document.querySelector("#dashboardNounVerbLearned"),
  dashboardNounVerbMastered: document.querySelector("#dashboardNounVerbMastered"),
  challengeArticleNew: document.querySelector("#challengeArticleNew"),
  challengeArticleLearned: document.querySelector("#challengeArticleLearned"),
  challengeArticleMastered: document.querySelector("#challengeArticleMastered"),
  challengeNounVerbNew: document.querySelector("#challengeNounVerbNew"),
  challengeNounVerbLearned: document.querySelector("#challengeNounVerbLearned"),
  challengeNounVerbMastered: document.querySelector("#challengeNounVerbMastered"),
  levelIcon: document.querySelector("#levelIcon"),
  levelName: document.querySelector("#levelName"),
  levelProfileName: document.querySelector("#levelProfileName"),
  levelCoins: document.querySelector("#levelCoins"),
  levelProgressFill: document.querySelector("#levelProgressFill"),
  levelProgressText: document.querySelector("#levelProgressText"),
  dashboardFamilyLevel: document.querySelector("#dashboardFamilyLevel"),
  dashboardFamilyCoins: document.querySelector("#dashboardFamilyCoins"),
  dashboardFamilyProgressFill: document.querySelector("#dashboardFamilyProgressFill"),
  dashboardFamilyProgressText: document.querySelector("#dashboardFamilyProgressText"),
  levelCelebration: document.querySelector("#levelCelebration"),
  levelCelebrationTitle: document.querySelector("#levelCelebrationTitle"),
  levelCelebrationProfile: document.querySelector("#levelCelebrationProfile"),
  levelCelebrationLevel: document.querySelector("#levelCelebrationLevel"),
  levelCelebrationBonus: document.querySelector("#levelCelebrationBonus"),
  levelCelebrationClose: document.querySelector("#levelCelebrationClose"),
  challengeTitle: document.querySelector("#challengeTitle"),
  challengeReward: document.querySelector("#challengeReward"),
  challengeStatus: document.querySelector("#challengeStatus"),
  challengeProgressFill: document.querySelector("#challengeProgressFill"),
  streakCurrent: document.querySelector("#streakCurrent"),
  streakBest: document.querySelector("#streakBest"),
  leaderboardList: document.querySelector("#leaderboardList"),
  controlPanel: document.querySelector("#controlPanel"),
  searchPanel: document.querySelector("#searchPanel"),
  statsGrid: document.querySelector("#statsGrid"),
  studyStage: document.querySelector("#studyStage"),
  nounVerbStage: document.querySelector("#nounVerbStage"),
  nounVerbCounter: document.querySelector("#nounVerbCounter"),
  nounVerbPrompt: document.querySelector("#nounVerbPrompt"),
  nounVerbOptions: document.querySelector("#nounVerbOptions"),
  nounVerbResult: document.querySelector("#nounVerbResult"),
  nounVerbEmptyState: document.querySelector("#nounVerbEmptyState"),
  nounVerbNext: document.querySelector("#nounVerbNext"),
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
  settingsToggle: document.querySelector("#settingsToggle"),
  settingsPanel: document.querySelector("#settingsPanel"),
  lockApp: document.querySelector("#lockApp"),
  resetProgress: document.querySelector("#resetProgress"),
  restartVocabularyPosition: document.querySelector("#restartVocabularyPosition"),
  restartArticlePosition: document.querySelector("#restartArticlePosition"),
  statWordsLearned: document.querySelector("#statWordsLearned"),
  statWordsTotal: document.querySelector("#statWordsTotal"),
  statArticlesLearned: document.querySelector("#statArticlesLearned"),
  statNounsTotal: document.querySelector("#statNounsTotal"),
  statMeaningKnown: document.querySelector("#statMeaningKnown"),
  statMeaningUnsure: document.querySelector("#statMeaningUnsure"),
  statMeaningUnknown: document.querySelector("#statMeaningUnknown"),
  statMeaningUnrated: document.querySelector("#statMeaningUnrated"),
  statArticleNew: document.querySelector("#statArticleNew"),
  statArticleLearned: document.querySelector("#statArticleLearned"),
  statArticleMastered: document.querySelector("#statArticleMastered"),
  statArticleGap: document.querySelector("#statArticleGap"),
  cardCounter: document.querySelector("#cardCounter"),
  flashcard: document.querySelector("#flashcard"),
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
let nounVerbPairs = [];
let visibleNounVerbPairs = [];
let currentIndex = 0;
let nounVerbCurrentIndex = 0;
let answerShown = false;
let selectedArticle = "";
let articleQuizAnswered = false;
let selectedQuizArticle = "";
let nounVerbAnswered = false;
let selectedNounVerbVerb = "";
let nounVerbChoices = [];
let progress = {};
let articleProgress = {};
let nounVerbProgress = {};
let profileStore = null;
let currentProfileId = "";
let searchResults = [];
let randomSessionKey = "";
let randomSessionIds = [];
let currentView = "dashboard";
let syncEnabled = false;
let applyingRemoteStore = false;
let cloudSaveTimer = 0;
let cloudPullTimer = 0;

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
  await initializeFamilySync();
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
  try {
    const response = await fetch(NOUN_VERB_CSV_URL, { cache: "no-store" });
    if (!response.ok) throw new Error("Noun-verb file was not found.");
    const csv = await response.text();
    nounVerbPairs = normalizeNounVerbPairs(parseCsv(csv));
  } catch (error) {
    console.warn("Could not load noun-verb pairs.", error);
    nounVerbPairs = [];
  }
  if (profileStore.currentProfile) {
    selectProfile(profileStore.currentProfile);
  } else {
    showProfileScreen();
  }
}

async function initializeFamilySync() {
  try {
    const remoteStore = await fetchProfileStoreFromCloud();

    if (remoteStore) {
      applyRemoteProfileStore(remoteStore);
    } else {
      await saveProfileStoreToCloudNow();
    }

    syncEnabled = true;
    startFamilySyncPolling();
  } catch (error) {
    syncEnabled = false;
    console.warn("Family sync unavailable. Using this device only.", error);
  }
}

function startFamilySyncPolling() {
  window.clearInterval(cloudPullTimer);
  cloudPullTimer = window.setInterval(async () => {
    if (applyingRemoteStore) return;
    const remoteStore = await fetchProfileStoreFromCloud();
    if (remoteStore) applyRemoteProfileStore(remoteStore);
  }, 5000);

  document.addEventListener("visibilitychange", async () => {
    if (document.visibilityState !== "visible" || applyingRemoteStore) return;
    const remoteStore = await fetchProfileStoreFromCloud();
    if (remoteStore) applyRemoteProfileStore(remoteStore);
  });
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
  store.familyLevelsReached = normalizeFamilyLevelsReached(store.familyLevelsReached, store.profiles);

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
    familyLevelsReached: [],
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
    emoji: profile.emoji,
    avatar: data?.avatar || profile.avatar,
    coins: normalizeCoinCount(data?.coins),
    levelBonusesAwarded: normalizeLevelBonuses(data?.levelBonusesAwarded, data?.coins),
    dailyChallenge: normalizeDailyChallenge(data?.dailyChallenge),
    streak: normalizeStreak(data?.streak),
    decks: data?.decks || {},
    progress: normalizeMeaningProgress(data?.progress || {}),
    articleProgress: normalizeArticleProgress(data?.articleProgress || {}),
    nounVerbProgress: normalizeNounVerbProgress(data?.nounVerbProgress || {}),
    positions: normalizePositions(data?.positions),
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

function normalizePositions(value = {}) {
  return {
    vocabulary: normalizePosition(value.vocabulary),
    article: normalizePosition(value.article),
    nounVerb: normalizePosition(value.nounVerb)
  };
}

function normalizePosition(value) {
  const position = Number(value);
  return Number.isFinite(position) && position > 0 ? Math.floor(position) : 0;
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
    Object.entries(savedProgress).map(([cardId, entry]) => {
      const articleCorrectCount = normalizeCounter(entry.articleCorrectCount);
      const articleWrongCount = normalizeCounter(entry.articleWrongCount);
      return [
        cardId,
        {
          ...entry,
          articleCorrectCount,
          articleWrongCount,
          articleLastAnsweredAt: typeof entry.articleLastAnsweredAt === "string"
            ? entry.articleLastAnsweredAt
            : typeof entry.updatedAt === "string" ? entry.updatedAt : "",
          articleLastWrongAt: typeof entry.articleLastWrongAt === "string"
            ? entry.articleLastWrongAt
            : articleWrongCount > 0 && typeof entry.updatedAt === "string" ? entry.updatedAt : "",
          articleStatus: normalizeArticleStatus(entry.articleStatus || entry.rating, { articleCorrectCount })
        }
      ];
    })
  );
}

function normalizeNounVerbProgress(savedProgress) {
  return Object.fromEntries(
    Object.entries(savedProgress).map(([pairId, entry]) => {
      const correctCount = normalizeCounter(entry.correctCount);
      const wrongCount = normalizeCounter(entry.wrongCount);
      return [
        pairId,
        {
          ...entry,
          correctCount,
          wrongCount,
          lastAnsweredAt: typeof entry.lastAnsweredAt === "string"
            ? entry.lastAnsweredAt
            : typeof entry.updatedAt === "string" ? entry.updatedAt : "",
          lastWrongAt: typeof entry.lastWrongAt === "string"
            ? entry.lastWrongAt
            : wrongCount > 0 && typeof entry.updatedAt === "string" ? entry.updatedAt : "",
          status: normalizeNounVerbStatus(entry.status, { correctCount })
        }
      ];
    })
  );
}

function normalizeMeaningStatus(value) {
  if (value === "know" || value === "known" || value === "meaningOnly") return "known";
  if (value === "unsure") return "unsure";
  if (value === "dontKnow" || value === "unknown") return "unknown";
  return "unrated";
}

function normalizeArticleStatus(value, entry = {}) {
  const correctCount = normalizeCounter(entry.articleCorrectCount);
  if (value === "mastered" || correctCount >= 3) return "mastered";
  if (value === "learned" || value === "known" || correctCount >= 1) return "learned";
  return "new";
}

function normalizeNounVerbStatus(value, entry = {}) {
  const correctCount = normalizeCounter(entry.correctCount);
  if (value === "mastered" || correctCount >= 3) return "mastered";
  if (value === "learned" || correctCount >= 1) return "learned";
  return "new";
}

function normalizeCoinCount(value) {
  const coins = Number(value);
  return Number.isFinite(coins) && coins > 0 ? Math.floor(coins) : 0;
}

function normalizeDailyChallenge(value) {
  return {
    date: typeof value?.date === "string" ? value.date : getTodayKey(),
    articleQuestions: normalizeCounter(value?.articleQuestions),
    completed: Boolean(value?.completed)
  };
}

function normalizeStreak(value) {
  return {
    current: normalizeCounter(value?.current),
    best: normalizeCounter(value?.best),
    lastQualifiedDate: typeof value?.lastQualifiedDate === "string" ? value.lastQualifiedDate : "",
    activityDate: typeof value?.activityDate === "string" ? value.activityDate : getTodayKey(),
    articleQuestions: normalizeCounter(value?.articleQuestions),
    vocabularyCards: normalizeCounter(value?.vocabularyCards)
  };
}

function normalizeCounter(value) {
  const count = Number(value);
  return Number.isFinite(count) && count > 0 ? Math.floor(count) : 0;
}

function normalizeLevelBonuses(savedLevels, coinValue) {
  if (Array.isArray(savedLevels)) return savedLevels.map(String);
  const coins = normalizeCoinCount(coinValue);
  return COIN_LEVELS
    .filter((level) => level.min > 0 && coins >= level.min)
    .map((level) => getLevelId(level));
}

function normalizeFamilyLevelsReached(savedLevels, profiles) {
  if (Array.isArray(savedLevels)) return savedLevels.map(String);
  const familyCoins = getFamilyCoinTotal(profiles);
  return FAMILY_WEALTH_LEVELS
    .filter((level) => level.min > 0 && familyCoins >= level.min)
    .map((level) => getFamilyLevelId(level));
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
  scheduleCloudSave();
}

function scheduleCloudSave() {
  if (!syncEnabled || applyingRemoteStore) return;
  window.clearTimeout(cloudSaveTimer);
  cloudSaveTimer = window.setTimeout(() => {
    saveProfileStoreToCloudNow();
  }, 450);
}

async function saveProfileStoreToCloudNow() {
  if (!profileStore) return;
  try {
    const response = await fetch(`${getSupabaseRowUrl()}?on_conflict=id`, {
      method: "POST",
      headers: getSupabaseHeaders({ prefer: "resolution=merge-duplicates,return=minimal" }),
      body: JSON.stringify({
        id: FAMILY_SYNC_ID,
        profile_store: sanitizeProfileStoreForSync(profileStore),
        updated_at: new Date().toISOString()
      })
    });
    if (!response.ok) throw new Error(`Supabase save failed: ${response.status}`);
  } catch (error) {
    console.warn("Could not sync family progress. Local progress is still saved.", error);
  }
}

async function fetchProfileStoreFromCloud() {
  try {
    const response = await fetch(`${getSupabaseRowUrl()}?id=eq.${encodeURIComponent(FAMILY_SYNC_ID)}&select=profile_store&limit=1`, {
      headers: getSupabaseHeaders()
    });
    if (!response.ok) throw new Error(`Supabase load failed: ${response.status}`);
    const rows = await response.json();
    return rows?.[0]?.profile_store || null;
  } catch (error) {
    console.warn("Could not load shared family progress.", error);
    return null;
  }
}

function getSupabaseRowUrl() {
  return `${SUPABASE_URL}/rest/v1/${SUPABASE_SYNC_TABLE}`;
}

function getSupabaseHeaders(options = {}) {
  const headers = {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    "Content-Type": "application/json"
  };
  if (options.prefer) headers.Prefer = options.prefer;
  return headers;
}

function applyRemoteProfileStore(remoteStore) {
  if (!remoteStore?.profiles) return;
  const mergedStore = mergeProfileStores(profileStore, remoteStore);
  applyingRemoteStore = true;
  profileStore = mergedStore;
  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profileStore));
  if (currentProfileId && profileStore.profiles[currentProfileId]) {
    progress = profileStore.profiles[currentProfileId].progress;
    articleProgress = profileStore.profiles[currentProfileId].articleProgress;
    nounVerbProgress = profileStore.profiles[currentProfileId].nounVerbProgress;
  }
  applyingRemoteStore = false;
  refreshVisibleProfileState();
}

function mergeProfileStores(localStore, remoteStore) {
  const baseStore = {
    ...createProfileStore(),
    ...(localStore || {}),
    ...(remoteStore || {}),
    profiles: {}
  };

  DEFAULT_PROFILES.forEach((profile) => {
    const localProfile = localStore?.profiles?.[profile.id];
    const remoteProfile = remoteStore?.profiles?.[profile.id];
    baseStore.profiles[profile.id] = mergeProfileData(localProfile, remoteProfile, profile);
  });

  baseStore.currentProfile = localStore?.currentProfile || remoteStore?.currentProfile || "";
  baseStore.familyLevelsReached = Array.from(
    new Set([
      ...(Array.isArray(localStore?.familyLevelsReached) ? localStore.familyLevelsReached : []),
      ...(Array.isArray(remoteStore?.familyLevelsReached) ? remoteStore.familyLevelsReached : [])
    ].map(String))
  );
  baseStore.migratedLegacyProgress = Boolean(localStore?.migratedLegacyProgress || remoteStore?.migratedLegacyProgress);
  return baseStore;
}

function mergeProfileData(localProfile, remoteProfile, defaultProfile) {
  const local = normalizeProfileData(localProfile, defaultProfile);
  const remote = normalizeProfileData(remoteProfile, defaultProfile);
  return normalizeProfileData(
    {
      ...local,
      ...remote,
      coins: Math.max(normalizeCoinCount(local.coins), normalizeCoinCount(remote.coins)),
      dailyChallenge: pickLatestDailyChallenge(local.dailyChallenge, remote.dailyChallenge),
      streak: pickBestStreak(local.streak, remote.streak),
      progress: mergeProgressEntries(local.progress, remote.progress),
      articleProgress: mergeProgressEntries(local.articleProgress, remote.articleProgress),
      nounVerbProgress: mergeProgressEntries(local.nounVerbProgress, remote.nounVerbProgress),
      positions: {
        vocabulary: Math.max(normalizePosition(local.positions?.vocabulary), normalizePosition(remote.positions?.vocabulary)),
        article: Math.max(normalizePosition(local.positions?.article), normalizePosition(remote.positions?.article)),
        nounVerb: Math.max(normalizePosition(local.positions?.nounVerb), normalizePosition(remote.positions?.nounVerb))
      },
      levelBonusesAwarded: Array.from(new Set([...(local.levelBonusesAwarded || []), ...(remote.levelBonusesAwarded || [])])),
      history: mergeHistory(local.history, remote.history),
      lastStudyDate: latestString(local.lastStudyDate, remote.lastStudyDate),
      settings: remote.settings || local.settings
    },
    defaultProfile
  );
}

function mergeProgressEntries(localEntries = {}, remoteEntries = {}) {
  const merged = { ...localEntries };
  Object.entries(remoteEntries || {}).forEach(([cardId, remoteEntry]) => {
    const localEntry = merged[cardId];
    merged[cardId] = latestString(localEntry?.updatedAt, remoteEntry?.updatedAt) === localEntry?.updatedAt
      ? localEntry
      : remoteEntry;
  });
  return merged;
}

function mergeHistory(localHistory = [], remoteHistory = []) {
  const byKey = new Map();
  [...localHistory, ...remoteHistory].forEach((entry) => {
    if (!entry?.studiedAt || !entry?.cardId) return;
    byKey.set(`${entry.studiedAt}-${entry.cardId}-${entry.type}`, entry);
  });
  return [...byKey.values()]
    .sort((first, second) => String(second.studiedAt).localeCompare(String(first.studiedAt)))
    .slice(0, 200);
}

function pickLatestDailyChallenge(localChallenge, remoteChallenge) {
  const localDate = localChallenge?.date || "";
  const remoteDate = remoteChallenge?.date || "";
  if (localDate > remoteDate) return localChallenge;
  if (remoteDate > localDate) return remoteChallenge;
  return {
    date: localDate || remoteDate || getTodayKey(),
    articleQuestions: Math.max(normalizeCounter(localChallenge?.articleQuestions), normalizeCounter(remoteChallenge?.articleQuestions)),
    completed: Boolean(localChallenge?.completed || remoteChallenge?.completed)
  };
}

function pickBestStreak(localStreak, remoteStreak) {
  return {
    activityDate: latestString(localStreak?.activityDate, remoteStreak?.activityDate) || getTodayKey(),
    lastQualifiedDate: latestString(localStreak?.lastQualifiedDate, remoteStreak?.lastQualifiedDate),
    current: Math.max(normalizeCounter(localStreak?.current), normalizeCounter(remoteStreak?.current)),
    best: Math.max(normalizeCounter(localStreak?.best), normalizeCounter(remoteStreak?.best)),
    articleQuestions: Math.max(normalizeCounter(localStreak?.articleQuestions), normalizeCounter(remoteStreak?.articleQuestions)),
    vocabularyCards: Math.max(normalizeCounter(localStreak?.vocabularyCards), normalizeCounter(remoteStreak?.vocabularyCards))
  };
}

function latestString(first = "", second = "") {
  return String(first || "") >= String(second || "") ? first || "" : second || "";
}

function sanitizeProfileStoreForSync(store) {
  return JSON.parse(JSON.stringify(store));
}

function refreshVisibleProfileState() {
  if (!profileStore) return;
  if (!currentProfileId) {
    renderProfileCards();
    return;
  }
  const profile = getCurrentProfile();
  els.currentProfileLabel.textContent = `${profile.emoji} ${profile.name}`;
  if (currentView === "dashboard") {
    renderDashboard();
  } else if (currentView === "coin-challenges") {
    renderCoinChallenges();
  } else if (currentView === "noun-verb") {
    applyNounVerbSmartOrder();
    renderNounVerbQuiz();
  } else {
    updateStats();
    renderCard();
  }
}

function showProfileScreen() {
  currentProfileId = "";
  progress = {};
  articleProgress = {};
  nounVerbProgress = {};
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
  nounVerbProgress = profile.nounVerbProgress;
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
  els.coinChallengesScreen.classList.add("hidden");
  els.controlPanel.classList.add("hidden");
  els.searchPanel.classList.add("hidden");
  els.statsGrid.classList.add("hidden");
  els.studyStage.classList.add("hidden");
  els.nounVerbStage.classList.add("hidden");
  els.actionBar.classList.add("hidden");
}

function showCoinChallenges() {
  currentView = "coin-challenges";
  renderCoinChallenges();
  els.dashboardScreen.classList.add("hidden");
  els.coinChallengesScreen.classList.remove("hidden");
  els.controlPanel.classList.add("hidden");
  els.searchPanel.classList.add("hidden");
  els.statsGrid.classList.add("hidden");
  els.studyStage.classList.add("hidden");
  els.nounVerbStage.classList.add("hidden");
  els.actionBar.classList.add("hidden");
}

function showStudyView(options = {}) {
  currentView = "study";
  els.dashboardScreen.classList.add("hidden");
  els.coinChallengesScreen.classList.add("hidden");
  els.nounVerbStage.classList.add("hidden");
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

function showNounVerbQuiz() {
  currentView = "noun-verb";
  els.dashboardScreen.classList.add("hidden");
  els.coinChallengesScreen.classList.add("hidden");
  els.controlPanel.classList.add("hidden");
  els.searchPanel.classList.add("hidden");
  els.statsGrid.classList.add("hidden");
  els.studyStage.classList.add("hidden");
  els.actionBar.classList.add("hidden");
  els.nounVerbStage.classList.remove("hidden");
  applyNounVerbSmartOrder();
  resumeNounVerbPosition();
  renderNounVerbQuiz();
}

function renderDashboard() {
  if (!currentProfileId) return;
  const profile = getCurrentProfile();
  prepareProfileDailyState(profile);
  const articleSummary = getArticleSummary();
  const nounVerbSummary = getNounVerbSummary();
  const level = getCoinLevel(profile.coins);
  const levelPercent = getLevelProgressPercent(profile.coins, level);
  const familySummary = getFamilyWealthSummary();
  const challenge = profile.dailyChallenge;
  const streak = getDisplayStreak(profile);
  profile.positions = normalizePositions(profile.positions);
  els.dashboardWelcome.textContent = `Welcome back, ${profile.name}`;
  els.dashboardWordsLearned.textContent = getWordsLearnedCount();
  els.dashboardWordsTotal.textContent = cards.length;
  els.dashboardArticleNew.textContent = articleSummary.new;
  els.dashboardArticleLearned.textContent = articleSummary.learned;
  els.dashboardArticleMastered.textContent = articleSummary.mastered;
  els.dashboardNounVerbNew.textContent = nounVerbSummary.new;
  els.dashboardNounVerbLearned.textContent = nounVerbSummary.learned;
  els.dashboardNounVerbMastered.textContent = nounVerbSummary.mastered;
  els.levelIcon.textContent = level.icon;
  els.levelName.textContent = level.name;
  els.levelProfileName.textContent = `${profile.name}'s`;
  els.levelCoins.textContent = normalizeCoinCount(profile.coins);
  els.levelProgressFill.style.width = `${levelPercent}%`;
  els.levelProgressText.textContent = level.next
    ? `${normalizeCoinCount(profile.coins)} / ${level.next} coins to next level`
    : "Max level reached";
  els.dashboardFamilyLevel.textContent = `${familySummary.level.icon} ${familySummary.level.name}`;
  els.dashboardFamilyCoins.textContent = familySummary.totalCoins;
  els.dashboardFamilyProgressFill.style.width = `${familySummary.progressPercent}%`;
  els.dashboardFamilyProgressText.textContent = familySummary.nextLevel.next
    ? `${familySummary.totalCoins} / ${familySummary.nextLevel.next} toward ${familySummary.nextFamilyLevel.icon} ${familySummary.nextFamilyLevel.name}`
    : "Max family level reached";
  els.challengeTitle.textContent = challenge.completed ? "✅ Complete" : "🎯 Today's Challenge";
  els.challengeReward.textContent = challenge.completed ? "+10 Coins Earned" : `Reward: +${DAILY_CHALLENGE_REWARD} coins`;
  els.challengeStatus.textContent = challenge.completed
    ? `${DAILY_CHALLENGE_GOAL} / ${DAILY_CHALLENGE_GOAL}`
    : `${Math.min(challenge.articleQuestions, DAILY_CHALLENGE_GOAL)} / ${DAILY_CHALLENGE_GOAL}`;
  els.challengeProgressFill.style.width = `${Math.min((challenge.articleQuestions / DAILY_CHALLENGE_GOAL) * 100, 100)}%`;
  els.streakCurrent.textContent = `${streak.current} ${streak.current === 1 ? "Day" : "Days"}`;
  els.streakBest.textContent = `Best: ${streak.best} days`;
  renderAvatar(els.dashboardAvatar, profile);
  renderCoinLeaderboard();
  saveProfileStore();
}

function renderCoinChallenges() {
  const articleSummary = getArticleSummary();
  const nounVerbSummary = getNounVerbSummary();
  els.challengeArticleNew.textContent = articleSummary.new;
  els.challengeArticleLearned.textContent = articleSummary.learned;
  els.challengeArticleMastered.textContent = articleSummary.mastered;
  els.challengeNounVerbNew.textContent = nounVerbSummary.new;
  els.challengeNounVerbLearned.textContent = nounVerbSummary.learned;
  els.challengeNounVerbMastered.textContent = nounVerbSummary.mastered;
}

function renderCoinLeaderboard() {
  const medals = ["🥇", "🥈", "🥉"];
  const rows = LEADERBOARD_PROFILE_IDS
    .map((profileId) => profileStore.profiles[profileId])
    .filter(Boolean)
    .sort((first, second) => normalizeCoinCount(second.coins) - normalizeCoinCount(first.coins));

  els.leaderboardList.replaceChildren(
    ...rows.map((profile, index) => {
      const row = document.createElement("div");
      const level = getCoinLevel(profile.coins);
      row.className = "leaderboard-row";
      row.classList.toggle("current", profile.id === currentProfileId);
      row.replaceChildren(
        createTextElement("span", "leaderboard-rank", medals[index] || ""),
        createAvatarElement(profile, "leaderboard-avatar"),
        createLeaderboardProfile(profile, level),
        createTextElement("strong", "", `${normalizeCoinCount(profile.coins)} coins`)
      );
      return row;
    })
  );
}

function createTextElement(tagName, className, text) {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  element.textContent = text;
  return element;
}

function createLeaderboardProfile(profile, level) {
  const container = document.createElement("span");
  container.className = "leaderboard-profile";
  container.append(
    createTextElement("span", "leaderboard-name", profile.name),
    createTextElement("span", "leaderboard-level", `${level.icon} ${level.name}`)
  );
  return container;
}

function createAvatarElement(profile, extraClass = "") {
  const container = document.createElement("span");
  container.className = ["avatar-wrap", extraClass].filter(Boolean).join(" ");
  renderAvatar(container, profile);
  return container;
}

function renderAvatar(container, profile) {
  if (!container || !profile) return;
  container.replaceChildren();
  container.classList.remove("avatar-fallback");

  if (!profile.avatar) {
    container.textContent = profile.emoji;
    container.classList.add("avatar-fallback");
    return;
  }

  const image = document.createElement("img");
  image.src = profile.avatar;
  image.alt = "";
  image.width = 48;
  image.height = 48;
  image.addEventListener(
    "error",
    () => {
      container.replaceChildren(document.createTextNode(profile.emoji));
      container.classList.add("avatar-fallback");
    },
    { once: true }
  );
  container.appendChild(image);
}

function getCoinLevel(coinsValue) {
  const coins = normalizeCoinCount(coinsValue);
  return [...COIN_LEVELS].reverse().find((level) => coins >= level.min) || COIN_LEVELS[0];
}

function getLevelId(level) {
  return `coins-${level.min}`;
}

function getFamilyLevelId(level) {
  return `family-${level.min}`;
}

function getLevelProgressPercent(coinsValue, level) {
  const coins = normalizeCoinCount(coinsValue);
  if (!level.next) return 100;
  return Math.min(((coins - level.min) / (level.next - level.min)) * 100, 100);
}

function formatResumePosition(position, total) {
  if (!total) return 0;
  return Math.min(normalizePosition(position) + 1, total);
}

function prepareProfileDailyState(profile) {
  const today = getTodayKey();
  profile.dailyChallenge = normalizeDailyChallenge(profile.dailyChallenge);
  profile.streak = normalizeStreak(profile.streak);

  if (profile.dailyChallenge.date !== today) {
    profile.dailyChallenge = { date: today, articleQuestions: 0, completed: false };
  }

  if (profile.streak.activityDate !== today) {
    profile.streak.activityDate = today;
    profile.streak.articleQuestions = 0;
    profile.streak.vocabularyCards = 0;
  }

  if (profile.streak.lastQualifiedDate && getDayDistance(profile.streak.lastQualifiedDate, today) > 1) {
    profile.streak.current = 0;
  }
}

function getDisplayStreak(profile) {
  prepareProfileDailyState(profile);
  return {
    current: normalizeCounter(profile.streak.current),
    best: normalizeCounter(profile.streak.best)
  };
}

function handleDashboardAction(action) {
  if (action === "restart-vocabulary") {
    if (!confirmAndResetSavedPosition("vocabulary")) return;
    openStudyRoute({ mode: "de-en", filter: "all", resume: false });
    return;
  }

  if (action === "restart-articles") {
    if (!confirmAndResetSavedPosition("article")) return;
    openStudyRoute({ mode: "article", filter: "smartArticle", resume: false });
    return;
  }

  const routes = {
    continue: { mode: "de-en", filter: "all", resume: true },
    articles: { mode: "article", filter: "smartArticle", resume: true },
    "earn-coins": "coin-challenges",
    "unknown-meanings": { mode: "de-en", filter: "unknownMeaning" },
    "unknown-articles": { mode: "article", filter: "newArticles" },
    search: { mode: "de-en", filter: "all", focusSearch: true },
    statistics: { mode: els.modeSelect.value, filter: els.filterSelect.value, openStats: true }
  };
  const route = routes[action];
  if (!route) return;
  if (route === "coin-challenges") {
    showCoinChallenges();
    return;
  }
  openStudyRoute(route);
}

function handleChallengeAction(action) {
  const routes = {
    articles: { mode: "article", filter: "smartArticle", resume: true }
  };
  if (action === "noun-verb") {
    showNounVerbQuiz();
    return;
  }
  const route = routes[action];
  if (!route) return;
  openStudyRoute(route);
}

function openStudyRoute(route) {
  els.modeSelect.value = route.mode;
  updateFilterOptions();
  els.filterSelect.value = getValidFilterValue(route.filter);
  els.startSelect.value = "all";
  randomSessionKey = "";
  randomSessionIds = [];
  saveSettings();
  applyModeAndFilter();
  if (route.resume) {
    resumeSavedPosition();
  } else {
    currentIndex = 0;
    saveCurrentPosition();
  }
  renderCard();
  showStudyView({ focusSearch: route.focusSearch, openStats: route.openStats });
}

function getPositionKey(mode = els.modeSelect.value) {
  if (mode === "article" || mode === "article-quiz") return "article";
  return "vocabulary";
}

function getSavedPosition(key = getPositionKey()) {
  const profile = getCurrentProfile();
  profile.positions = normalizePositions(profile.positions);
  return normalizePosition(profile.positions[key]);
}

function resumeSavedPosition() {
  if (!visibleCards.length) {
    currentIndex = 0;
    return;
  }
  currentIndex = clamp(getSavedPosition(), 0, visibleCards.length - 1);
}

function resumeNounVerbPosition() {
  if (!visibleNounVerbPairs.length) {
    nounVerbCurrentIndex = 0;
    return;
  }
  nounVerbCurrentIndex = clamp(getSavedPosition("nounVerb"), 0, visibleNounVerbPairs.length - 1);
}

function saveCurrentPosition() {
  if (currentView === "noun-verb") {
    saveNounVerbPosition();
    return;
  }
  if (!currentProfileId) return;
  const profile = getCurrentProfile();
  profile.positions = normalizePositions(profile.positions);
  profile.positions[getPositionKey()] = clamp(currentIndex, 0, Math.max(visibleCards.length - 1, 0));
  saveProfileStore();
}

function saveNounVerbPosition() {
  if (!currentProfileId) return;
  const profile = getCurrentProfile();
  profile.positions = normalizePositions(profile.positions);
  profile.positions.nounVerb = clamp(nounVerbCurrentIndex, 0, Math.max(visibleNounVerbPairs.length - 1, 0));
  saveProfileStore();
}

function resetSavedPosition(key = getPositionKey()) {
  if (!currentProfileId) return;
  const profile = getCurrentProfile();
  profile.positions = normalizePositions(profile.positions);
  profile.positions[key] = 0;
  saveProfileStore();
  if (currentView === "dashboard") renderDashboard();
}

function confirmAndResetSavedPosition(key) {
  const profile = getCurrentProfile();
  const label = key === "article" ? "article" : "vocabulary";
  if (!window.confirm(`Restart ${profile.name}'s ${label} position from the beginning? This will not erase progress or coins.`)) return false;
  resetSavedPosition(key);
  return true;
}

function renderProfileCards() {
  renderFamilyWealth();
  const profileCards = DEFAULT_PROFILES.map((profileInfo) => {
    const profile = profileStore.profiles[profileInfo.id];
    const level = getCoinLevel(profile.coins);
    const button = document.createElement("button");
    button.className = "profile-card";
    button.type = "button";
    button.dataset.profileId = profile.id;
    button.replaceChildren(
      createAvatarElement(profile, "profile-avatar"),
      createTextElement("span", "profile-name", profile.name),
      createTextElement("span", "profile-level", `${level.icon} ${level.name}`),
      createTextElement("span", "profile-coins", `${normalizeCoinCount(profile.coins)} Coins`)
    );
    return button;
  });
  els.profileGrid.replaceChildren(
    ...profileCards
  );
  els.profileDebug.textContent = `Profiles loaded: ${profileCards.length}`;
}

function renderFamilyWealth() {
  const summary = getFamilyWealthSummary();
  els.familyWealthLevel.textContent = `${summary.level.icon} ${summary.level.name}`;
  els.familyWealthCoins.textContent = summary.totalCoins;
  els.familyNextLevelName.textContent = summary.nextLevel.next
    ? `${summary.nextFamilyLevel.icon} ${summary.nextFamilyLevel.name}`
    : "Max Family Level";
  els.familyGoalCoins.textContent = summary.nextLevel.next ? `${summary.nextLevel.next} Coins` : "Max Family Level";
  els.familyGoalRemaining.textContent = summary.remaining;
  els.familyWealthProgressFill.style.width = `${summary.progressPercent}%`;
  els.familyWealthProgressText.textContent = summary.nextLevel.next
    ? `${summary.totalCoins} / ${summary.nextLevel.next}`
    : "Max family level reached";
}

function getFamilyWealthSummary() {
  const totalCoins = getFamilyCoinTotal(profileStore.profiles);
  const level = getFamilyWealthLevel(totalCoins);
  const nextGoal = FAMILY_MILESTONES.find((milestone) => totalCoins < milestone.coins)
    || FAMILY_MILESTONES[FAMILY_MILESTONES.length - 1];
  const nextLevel = level.next ? level : { ...level, next: null };
  const nextFamilyLevel = FAMILY_WEALTH_LEVELS.find((item) => item.min === level.next) || level;
  const nextTarget = nextLevel.next || nextGoal.coins;
  const remaining = Math.max(nextTarget - totalCoins, 0);
  const progressPercent = nextTarget ? Math.min((totalCoins / nextTarget) * 100, 100) : 100;
  return { totalCoins, level, nextGoal, nextLevel, nextFamilyLevel, remaining, progressPercent };
}

function getFamilyCoinTotal(profiles) {
  return DEFAULT_PROFILES.reduce((total, profileInfo) => {
    const profile = profiles?.[profileInfo.id];
    return total + normalizeCoinCount(profile?.coins);
  }, 0);
}

function getFamilyWealthLevel(coinsValue) {
  const coins = normalizeCoinCount(coinsValue);
  return [...FAMILY_WEALTH_LEVELS].reverse().find((level) => coins >= level.min) || FAMILY_WEALTH_LEVELS[0];
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

  els.coinChallengesScreen.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-challenge-action]");
    if (!button) return;
    handleChallengeAction(button.dataset.challengeAction);
  });

  els.modeSelect.addEventListener("change", () => {
    updateFilterOptions();
    saveSettings();
    applyModeAndFilter();
    resumeSavedPosition();
    renderCard();
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

  els.homeButton.addEventListener("click", () => {
    saveCurrentPosition();
    closeSettingsMenu();
    showDashboard();
  });

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

  els.nounVerbOptions.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-verb]");
    if (!button || nounVerbAnswered) return;
    answerNounVerbQuiz(button.dataset.verb);
  });

  els.nounVerbNext.addEventListener("click", moveNounVerbNext);

  els.switchProfile.addEventListener("click", () => {
    saveCurrentPosition();
    closeSettingsMenu();
    showProfileScreen();
  });

  els.settingsToggle.addEventListener("click", () => {
    const isOpen = !els.settingsPanel.classList.contains("hidden");
    els.settingsPanel.classList.toggle("hidden", isOpen);
    els.settingsToggle.setAttribute("aria-expanded", String(!isOpen));
  });

  document.addEventListener("click", (event) => {
    if (event.target.closest(".settings-menu")) return;
    closeSettingsMenu();
  });

  els.lockApp.addEventListener("click", () => {
    closeSettingsMenu();
    localStorage.removeItem(UNLOCK_STORAGE_KEY);
    window.location.reload();
  });

  els.resetProgress.addEventListener("click", () => {
    closeSettingsMenu();
    const profile = getCurrentProfile();
    if (!window.confirm(`Reset saved progress for ${profile.name}?`)) return;
    progress = {};
    articleProgress = {};
    nounVerbProgress = {};
    profile.history = [];
    profile.lastStudyDate = "";
    saveProgress();
    saveArticleProgress();
    saveNounVerbProgress();
    saveProfileStore();
    currentIndex = 0;
    applyModeAndFilter();
  });

  els.restartVocabularyPosition.addEventListener("click", () => {
    closeSettingsMenu();
    confirmAndResetSavedPosition("vocabulary");
  });

  els.restartArticlePosition.addEventListener("click", () => {
    closeSettingsMenu();
    confirmAndResetSavedPosition("article");
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

  els.levelCelebrationClose.addEventListener("click", () => {
    els.levelCelebration.classList.add("hidden");
  });
}

function closeSettingsMenu() {
  els.settingsPanel.classList.add("hidden");
  els.settingsToggle.setAttribute("aria-expanded", "false");
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

function normalizeNounVerbPairs(rows) {
  const seen = new Set();
  return rows
    .filter((row) => row.noun && row.verb && row.phrase)
    .map((row, index) => {
      const phrase = row.phrase.trim();
      const verb = row.verb.trim();
      const id = slugify(`${row.noun}-${row.article || "none"}-${phrase}-${verb}`) || `noun-verb-${index}`;
      return {
        id,
        noun: row.noun.trim(),
        article: (row.article || "").trim().toLowerCase(),
        verb,
        phrase,
        english: row.english || "",
        example: row.example || "",
        category: row.category || "review"
      };
    })
    .filter((pair) => {
      const key = `${pair.phrase.toLowerCase()}::${pair.verb.toLowerCase()}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
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
      if (filter === "newArticles" && articleStatus !== "new") return false;
      if (filter === "learnedArticles" && articleStatus !== "learned") return false;
      if (filter === "masteredArticles" && articleStatus !== "mastered") return false;
      if (filter === "wrongRecently" && !isWrongRecently(card)) return false;
      return true;
    }
    if (filter === "knownMeaning" && meaningStatus !== "known") return false;
    if (filter === "unsureMeaning" && meaningStatus !== "unsure") return false;
    if (filter === "unknownMeaning" && meaningStatus !== "unknown") return false;
    if (filter === "unratedMeaning" && meaningStatus !== "unrated") return false;
    return true;
  });

  const startedCards = applyStartLetter(filteredCards, startLetter);
  visibleCards = (mode === "article-quiz" || mode === "article") && filter === "smartArticle"
    ? applySmartArticleOrder(startedCards)
    : applyStudyOrder(startedCards, order);
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
  saveCurrentPosition();
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
  recordDailyActivity("vocabulary");
  saveProgress();

  if (visibleCards.length > 1) {
    currentIndex = (currentIndex + 1) % visibleCards.length;
  }

  applyModeAndFilter();
  saveCurrentPosition();
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
  els.statArticleNew.textContent = articles.new;
  els.statArticleLearned.textContent = articles.learned;
  els.statArticleMastered.textContent = articles.mastered;
  els.statArticleGap.textContent = articles.gap;
  els.statArticlesLearned.textContent = articles.mastered;
  els.statNounsTotal.textContent = articles.nouns;
  els.statWordsLearned.textContent = getWordsLearnedCount();
  els.statWordsTotal.textContent = cards.length;
  if (currentView === "dashboard") renderDashboard();
  if (currentView === "coin-challenges") renderCoinChallenges();
}

function renderArticleResult(card) {
  const mode = els.modeSelect.value;
  if (!["article", "article-quiz"].includes(mode) || !card) {
    els.articleQuizResult.classList.add("hidden");
    els.flashcard.classList.remove("quiz-result-visible");
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
  els.flashcard.classList.toggle("quiz-result-visible", articleQuizAnswered);

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
  const isCorrect = article === card.article;
  updateArticleLearningProgress(card, isCorrect);
  console.log("Article button clicked", {
    selectedArticle: article,
    correctArticle: card.article,
    isCorrect
  });
  if (isCorrect) {
    awardCoins(1);
  }
  recordDailyActivity("article");
  recordStudyHistory("article-quiz", card, isCorrect ? "correct" : "wrong");
  saveArticleProgress();
  saveCurrentPosition();
  updateStats();
  renderCard();
}

function updateArticleLearningProgress(card, isCorrect) {
  const previous = getArticleProgressEntry(card);
  const now = new Date().toISOString();
  const articleCorrectCount = previous.articleCorrectCount + (isCorrect ? 1 : 0);
  const articleWrongCount = previous.articleWrongCount + (isCorrect ? 0 : 1);
  let articleStatus = previous.articleStatus;

  if (isCorrect) {
    articleStatus = articleCorrectCount >= 3 ? "mastered" : "learned";
  } else if (articleStatus === "mastered") {
    articleStatus = "learned";
  } else if (articleStatus !== "learned") {
    articleStatus = "new";
  }

  articleProgress[card.id] = {
    ...previous,
    articleCorrectCount,
    articleWrongCount,
    articleLastAnsweredAt: now,
    articleLastWrongAt: isCorrect ? previous.articleLastWrongAt || "" : now,
    articleStatus,
    updatedAt: now
  };

  return articleStatus;
}

function awardCoins(amount) {
  if (!currentProfileId) return;
  const profile = getCurrentProfile();
  profile.coins = normalizeCoinCount(profile.coins) + normalizeCounter(amount);
  awardLevelBonusIfNeeded(profile);
  celebrateFamilyLevelIfNeeded();
  saveProfileStore();
}

function awardLevelBonusIfNeeded(profile) {
  profile.levelBonusesAwarded = normalizeLevelBonuses(profile.levelBonusesAwarded, 0);
  const reachedLevel = [...COIN_LEVELS]
    .reverse()
    .find((level) => level.min > 0 && normalizeCoinCount(profile.coins) >= level.min);

  if (!reachedLevel) return;

  const levelId = getLevelId(reachedLevel);
  if (profile.levelBonusesAwarded.includes(levelId)) return;

  profile.levelBonusesAwarded.push(levelId);
  profile.coins = normalizeCoinCount(profile.coins) + LEVEL_UP_BONUS;
  showLevelCelebration(profile, reachedLevel);
}

function showLevelCelebration(profile, level) {
  els.levelCelebrationTitle.textContent = "🎉 Congratulations!";
  els.levelCelebrationProfile.textContent = `${profile.name} reached:`;
  els.levelCelebrationLevel.textContent = `${level.icon} ${level.name}`;
  els.levelCelebrationBonus.textContent = `+${LEVEL_UP_BONUS} bonus coins`;
  els.levelCelebrationBonus.classList.remove("hidden");
  els.levelCelebration.classList.remove("hidden");
}

function celebrateFamilyLevelIfNeeded() {
  profileStore.familyLevelsReached = normalizeFamilyLevelsReached(profileStore.familyLevelsReached, profileStore.profiles);
  const familyLevel = getFamilyWealthLevel(getFamilyCoinTotal(profileStore.profiles));
  if (familyLevel.min === 0) return;

  const levelId = getFamilyLevelId(familyLevel);
  if (profileStore.familyLevelsReached.includes(levelId)) return;

  profileStore.familyLevelsReached.push(levelId);
  showFamilyLevelCelebration(familyLevel);
}

function showFamilyLevelCelebration(level) {
  els.levelCelebrationTitle.textContent = "🎉 Family Wealth Level Up!";
  els.levelCelebrationProfile.textContent = "The Zaghrout Family reached:";
  els.levelCelebrationLevel.textContent = `${level.icon} ${level.name}`;
  els.levelCelebrationBonus.textContent = "";
  els.levelCelebrationBonus.classList.add("hidden");
  els.levelCelebration.classList.remove("hidden");
}

function recordDailyActivity(type) {
  if (!currentProfileId) return;
  const profile = getCurrentProfile();
  prepareProfileDailyState(profile);

  if (type === "article") {
    profile.dailyChallenge.articleQuestions += 1;
    profile.streak.articleQuestions += 1;
    if (!profile.dailyChallenge.completed && profile.dailyChallenge.articleQuestions >= DAILY_CHALLENGE_GOAL) {
      profile.dailyChallenge.completed = true;
      awardCoins(DAILY_CHALLENGE_REWARD);
    }
  }

  if (type === "vocabulary") {
    profile.streak.vocabularyCards += 1;
  }

  updateStreakQualification(profile);
  saveProfileStore();
}

function updateStreakQualification(profile) {
  const today = getTodayKey();
  const qualifiesToday = profile.streak.articleQuestions >= STREAK_ACTIVITY_GOAL
    || profile.streak.vocabularyCards >= STREAK_ACTIVITY_GOAL;

  if (!qualifiesToday || profile.streak.lastQualifiedDate === today) return;

  const distance = profile.streak.lastQualifiedDate ? getDayDistance(profile.streak.lastQualifiedDate, today) : null;
  profile.streak.current = distance === 1 ? normalizeCounter(profile.streak.current) + 1 : 1;
  profile.streak.best = Math.max(normalizeCounter(profile.streak.best), profile.streak.current);
  profile.streak.lastQualifiedDate = today;
}

function rateArticleCard(rating) {
  const card = visibleCards[currentIndex];
  const previous = getArticleProgressEntry(card);
  articleProgress[card.id] = {
    ...previous,
    articleStatus: normalizeArticleStatus(rating, previous),
    updatedAt: new Date().toISOString()
  };
  recordStudyHistory(els.modeSelect.value === "article" ? "article-practice" : "article-quiz", card, getArticleStatus(card));
  saveArticleProgress();

  if (visibleCards.length > 1) {
    currentIndex = (currentIndex + 1) % visibleCards.length;
  }

  applyModeAndFilter();
  saveCurrentPosition();
}

function getArticleReviewLists() {
  return cards.reduce(
    (lists, card) => {
      if (!card.isNoun) return lists;
      const rating = getArticleStatus(card);
      if (rating === "mastered") lists.mastered.push(card);
      else if (rating === "learned") lists.learned.push(card);
      else lists.new.push(card);
      return lists;
    },
    { new: [], learned: [], mastered: [] }
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

function getArticleProgressEntry(card) {
  const entry = articleProgress[card.id] || {};
  const articleCorrectCount = normalizeCounter(entry.articleCorrectCount);
  const articleWrongCount = normalizeCounter(entry.articleWrongCount);
  return {
    ...entry,
    articleCorrectCount,
    articleWrongCount,
    articleLastAnsweredAt: typeof entry.articleLastAnsweredAt === "string"
      ? entry.articleLastAnsweredAt
      : typeof entry.updatedAt === "string" ? entry.updatedAt : "",
    articleLastWrongAt: typeof entry.articleLastWrongAt === "string"
      ? entry.articleLastWrongAt
      : articleWrongCount > 0 && typeof entry.updatedAt === "string" ? entry.updatedAt : "",
    articleStatus: normalizeArticleStatus(entry.articleStatus || entry.rating, { articleCorrectCount })
  };
}

function getArticleStatus(card) {
  return getArticleProgressEntry(card).articleStatus;
}

function getArticleLastAnsweredMs(card) {
  const lastAnswered = Date.parse(getArticleProgressEntry(card).articleLastAnsweredAt);
  return Number.isFinite(lastAnswered) ? lastAnswered : 0;
}

function getArticleLastWrongMs(card) {
  const lastWrong = Date.parse(getArticleProgressEntry(card).articleLastWrongAt);
  return Number.isFinite(lastWrong) ? lastWrong : 0;
}

function isWrongRecently(card) {
  const entry = getArticleProgressEntry(card);
  if (!entry.articleWrongCount || entry.articleStatus === "mastered") return false;
  const lastAnswered = getArticleLastWrongMs(card);
  if (!lastAnswered) return false;
  const sevenDays = 7 * 24 * 60 * 60 * 1000;
  return Date.now() - lastAnswered <= sevenDays;
}

function getArticleSummary() {
  return cards.reduce(
    (total, card) => {
      if (!card.isNoun) return total;
      total.nouns += 1;
      total[getArticleStatus(card)] += 1;
      if (isWrongRecently(card)) total.wrongRecently += 1;
      if (getMeaningStatus(card) === "known" && getArticleStatus(card) !== "mastered") total.gap += 1;
      return total;
    },
    { new: 0, learned: 0, mastered: 0, wrongRecently: 0, gap: 0, nouns: 0 }
  );
}

function getWordsLearnedCount() {
  return cards.filter((card) => {
    const meaningKnown = getMeaningStatus(card) === "known";
    const articleKnown = !card.isNoun || ["learned", "mastered"].includes(getArticleStatus(card));
    return meaningKnown && articleKnown;
  }).length;
}

function renderNounVerbQuiz() {
  const pair = visibleNounVerbPairs[nounVerbCurrentIndex];
  const hasPair = Boolean(pair);
  els.nounVerbEmptyState.classList.toggle("hidden", hasPair);
  els.nounVerbPrompt.classList.toggle("hidden", !hasPair);
  els.nounVerbOptions.classList.toggle("hidden", !hasPair);
  els.nounVerbResult.classList.add("hidden");
  els.nounVerbNext.classList.add("hidden");
  els.nounVerbCounter.textContent = hasPair
    ? `Card ${nounVerbCurrentIndex + 1} of ${visibleNounVerbPairs.length}`
    : "0 / 0";
  if (!pair) {
    els.nounVerbPrompt.textContent = "No noun-verb pairs";
    els.nounVerbOptions.replaceChildren();
    return;
  }

  if (!nounVerbChoices.length || !nounVerbChoices.includes(pair.verb)) {
    nounVerbChoices = buildNounVerbChoices(pair);
  }

  els.nounVerbPrompt.textContent = buildNounVerbPrompt(pair);
  els.nounVerbOptions.replaceChildren(
    ...nounVerbChoices.map((verb) => {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.verb = verb;
      button.textContent = verb;
      button.disabled = nounVerbAnswered;
      button.classList.toggle("correct", nounVerbAnswered && verb === pair.verb);
      button.classList.toggle("incorrect", nounVerbAnswered && verb === selectedNounVerbVerb && verb !== pair.verb);
      return button;
    })
  );

  if (nounVerbAnswered) renderNounVerbResult(pair);
}

function buildNounVerbPrompt(pair) {
  const index = pair.phrase.toLowerCase().indexOf(pair.verb.toLowerCase());
  if (index >= 0) {
    return `${pair.phrase.slice(0, index)}_____${pair.phrase.slice(index + pair.verb.length)}`;
  }
  return `${pair.phrase} _____`;
}

function buildNounVerbChoices(pair) {
  const wrongChoices = shuffleCards(
    Array.from(new Set(nounVerbPairs.map((item) => item.verb).filter((verb) => verb && verb !== pair.verb)))
  ).slice(0, 3);
  return shuffleCards([pair.verb, ...wrongChoices]);
}

function answerNounVerbQuiz(verb) {
  const pair = visibleNounVerbPairs[nounVerbCurrentIndex];
  if (!pair || nounVerbAnswered) return;
  selectedNounVerbVerb = verb;
  nounVerbAnswered = true;
  const isCorrect = verb === pair.verb;
  updateNounVerbLearningProgress(pair, isCorrect);
  if (isCorrect) awardCoins(2);
  recordStudyHistory("noun-verb", pair, isCorrect ? "correct" : "wrong");
  saveNounVerbProgress();
  saveNounVerbPosition();
  renderNounVerbQuiz();
  renderCoinChallenges();
  if (currentView === "dashboard") renderDashboard();
}

function renderNounVerbResult(pair) {
  const isCorrect = selectedNounVerbVerb === pair.verb;
  els.nounVerbResult.classList.remove("hidden", "success", "error");
  els.nounVerbResult.classList.add(isCorrect ? "success" : "error");
  els.nounVerbResult.innerHTML = `
    <span class="quiz-result-label">${isCorrect ? "✅ Correct" : "❌ Wrong"}</span>
    ${isCorrect ? "" : "<span class=\"quiz-result-correction\">Correct answer:</span>"}
    <span class="quiz-result-answer">${escapeHtml(pair.phrase)}</span>
    <span class="quiz-result-meaning"><strong>English:</strong> ${escapeHtml(pair.english || "-")}</span>
    <span class="quiz-result-meaning"><strong>Example:</strong> ${escapeHtml(pair.example || "-")}</span>
    ${isCorrect ? "<span class=\"quiz-result-reward\"><strong>Reward:</strong> 🪙🪙 +2 Coins</span>" : ""}
  `;
  els.nounVerbOptions.querySelectorAll("button").forEach((button) => {
    const verb = button.dataset.verb;
    button.disabled = true;
    button.classList.toggle("correct", verb === pair.verb);
    button.classList.toggle("incorrect", verb === selectedNounVerbVerb && verb !== pair.verb);
  });
  els.nounVerbNext.classList.remove("hidden");
}

function moveNounVerbNext() {
  if (!visibleNounVerbPairs.length) return;
  nounVerbCurrentIndex = (nounVerbCurrentIndex + 1) % visibleNounVerbPairs.length;
  nounVerbAnswered = false;
  selectedNounVerbVerb = "";
  nounVerbChoices = [];
  saveNounVerbPosition();
  renderNounVerbQuiz();
}

function applyNounVerbSmartOrder() {
  visibleNounVerbPairs = applyNounVerbPriorityOrder(nounVerbPairs);
  nounVerbCurrentIndex = clamp(nounVerbCurrentIndex, 0, Math.max(visibleNounVerbPairs.length - 1, 0));
  nounVerbAnswered = false;
  selectedNounVerbVerb = "";
  nounVerbChoices = [];
}

function applyNounVerbPriorityOrder(pairList) {
  const wrongRecent = [];
  const newPairs = [];
  const learned = [];
  const mastered = [];

  pairList.forEach((pair) => {
    const status = getNounVerbStatus(pair);
    if (isNounVerbWrongRecently(pair)) wrongRecent.push(pair);
    else if (status === "new") newPairs.push(pair);
    else if (status === "learned") learned.push(pair);
    else mastered.push(pair);
  });

  wrongRecent.sort((first, second) => getNounVerbLastWrongMs(second) - getNounVerbLastWrongMs(first));
  newPairs.sort(compareNounVerbPairs);
  learned.sort((first, second) => getNounVerbProgressEntry(first).correctCount - getNounVerbProgressEntry(second).correctCount || compareNounVerbPairs(first, second));
  mastered.sort((first, second) => getNounVerbLastAnsweredMs(first) - getNounVerbLastAnsweredMs(second) || compareNounVerbPairs(first, second));

  const mainReview = [...wrongRecent, ...newPairs, ...learned];
  if (!mainReview.length) return mastered;
  return [...mainReview, ...mastered.filter((_, index) => index % 6 === 0)];
}

function compareNounVerbPairs(first, second) {
  return getSortKey(first.noun).localeCompare(getSortKey(second.noun), "de") || first.phrase.localeCompare(second.phrase, "de");
}

function updateNounVerbLearningProgress(pair, isCorrect) {
  const previous = getNounVerbProgressEntry(pair);
  const now = new Date().toISOString();
  const correctCount = previous.correctCount + (isCorrect ? 1 : 0);
  const wrongCount = previous.wrongCount + (isCorrect ? 0 : 1);
  const status = isCorrect
    ? correctCount >= 3 ? "mastered" : "learned"
    : previous.status;

  nounVerbProgress[pair.id] = {
    ...previous,
    correctCount,
    wrongCount,
    lastAnsweredAt: now,
    lastWrongAt: isCorrect ? previous.lastWrongAt || "" : now,
    status,
    updatedAt: now
  };
}

function getNounVerbProgressEntry(pair) {
  const entry = nounVerbProgress[pair.id] || {};
  const correctCount = normalizeCounter(entry.correctCount);
  const wrongCount = normalizeCounter(entry.wrongCount);
  return {
    ...entry,
    correctCount,
    wrongCount,
    lastAnsweredAt: typeof entry.lastAnsweredAt === "string"
      ? entry.lastAnsweredAt
      : typeof entry.updatedAt === "string" ? entry.updatedAt : "",
    lastWrongAt: typeof entry.lastWrongAt === "string"
      ? entry.lastWrongAt
      : wrongCount > 0 && typeof entry.updatedAt === "string" ? entry.updatedAt : "",
    status: normalizeNounVerbStatus(entry.status, { correctCount })
  };
}

function getNounVerbStatus(pair) {
  return getNounVerbProgressEntry(pair).status;
}

function getNounVerbLastAnsweredMs(pair) {
  const lastAnswered = Date.parse(getNounVerbProgressEntry(pair).lastAnsweredAt);
  return Number.isFinite(lastAnswered) ? lastAnswered : 0;
}

function getNounVerbLastWrongMs(pair) {
  const lastWrong = Date.parse(getNounVerbProgressEntry(pair).lastWrongAt);
  return Number.isFinite(lastWrong) ? lastWrong : 0;
}

function isNounVerbWrongRecently(pair) {
  const entry = getNounVerbProgressEntry(pair);
  if (!entry.wrongCount || entry.status === "mastered") return false;
  const lastWrong = getNounVerbLastWrongMs(pair);
  if (!lastWrong) return false;
  const sevenDays = 7 * 24 * 60 * 60 * 1000;
  return Date.now() - lastWrong <= sevenDays;
}

function getNounVerbSummary() {
  return nounVerbPairs.reduce(
    (total, pair) => {
      total[getNounVerbStatus(pair)] += 1;
      return total;
    },
    { new: 0, learned: 0, mastered: 0 }
  );
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

function applySmartArticleOrder(cardList) {
  const wrongRecent = [];
  const newCards = [];
  const learned = [];
  const mastered = [];

  cardList.forEach((card) => {
    const status = getArticleStatus(card);
    if (isWrongRecently(card)) wrongRecent.push(card);
    else if (status === "new") newCards.push(card);
    else if (status === "learned") learned.push(card);
    else mastered.push(card);
  });

  wrongRecent.sort((first, second) => getArticleLastWrongMs(second) - getArticleLastWrongMs(first));
  newCards.sort(compareCardsByGerman);
  learned.sort((first, second) => {
    const firstProgress = getArticleProgressEntry(first);
    const secondProgress = getArticleProgressEntry(second);
    return firstProgress.articleCorrectCount - secondProgress.articleCorrectCount || compareCardsByGerman(first, second);
  });
  mastered.sort((first, second) => getArticleLastAnsweredMs(first) - getArticleLastAnsweredMs(second) || compareCardsByGerman(first, second));

  const mainReview = [...wrongRecent, ...newCards, ...learned];
  if (!mainReview.length) return mastered;

  const occasionalMastered = mastered.filter((_, index) => index % 6 === 0);
  return [...mainReview, ...occasionalMastered];
}

function compareCardsByGerman(first, second) {
  return getSortKey(first.word).localeCompare(getSortKey(second.word), "de");
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
      word: card.word || card.phrase || card.noun || "",
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

function loadNounVerbProgress() {
  return getCurrentProfile()?.nounVerbProgress || {};
}

function saveNounVerbProgress() {
  if (!currentProfileId) return;
  getCurrentProfile().nounVerbProgress = nounVerbProgress;
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

function getTodayKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getDayDistance(fromDate, toDate) {
  const from = parseDateKey(fromDate);
  const to = parseDateKey(toDate);
  if (!from || !to) return 0;
  return Math.round((to.getTime() - from.getTime()) / 86400000);
}

function parseDateKey(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value || "");
  if (!match) return null;
  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
