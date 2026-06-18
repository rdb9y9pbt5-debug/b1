const CSV_URL = "vocabulary.csv";
const NOUN_VERB_CSV_URL = "nomen_verb_verbindungen.csv";
const MEANING_MATCH_CSV_URL = "meaning_match_items.csv";
const PREPOSITIONS_CSV_URL = "prepositions.csv";
const RECENT_VOCABULARY_WORD_BUFFER = 100;
const WRONG_VOCABULARY_WAIT_BUFFER = 20;
const MEANING_MATCH_RECENT_BUFFER = 60;
const WRONG_MEANING_MATCH_WAIT_BUFFER = 20;
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
const ACHIEVEMENTS = [
  {
    id: "first-correct-answer",
    icon: "✅",
    name: "First Correct Answer",
    description: "Answer any quiz question correctly.",
    reward: 5,
    scope: "profile",
    metric: "correctAnswers",
    target: 1
  },
  {
    id: "first-100-coins",
    icon: "🪙",
    name: "First 100 Coins",
    description: "Reach 100 total coins.",
    reward: 10,
    scope: "profile",
    metric: "coins",
    target: 100
  },
  {
    id: "five-hundred-coins",
    icon: "💰",
    name: "500 Coins",
    description: "Reach 500 total coins.",
    reward: 0,
    scope: "profile",
    metric: "coins",
    target: 500
  },
  {
    id: "one-thousand-coins",
    icon: "🏦",
    name: "1000 Coins",
    description: "Reach 1000 total coins.",
    reward: 0,
    scope: "profile",
    metric: "coins",
    target: 1000
  },
  {
    id: "ten-day-streak",
    icon: "🔥",
    name: "10-Day Streak",
    description: "Reach a 10-day streak.",
    reward: 25,
    scope: "profile",
    metric: "streak",
    target: 10
  },
  {
    id: "thirty-day-streak",
    icon: "🔥",
    name: "30-Day Streak",
    description: "Reach a 30-day streak.",
    reward: 0,
    scope: "profile",
    metric: "streak",
    target: 30
  },
  {
    id: "hundred-day-streak",
    icon: "🔥",
    name: "100-Day Streak",
    description: "Reach a 100-day streak.",
    reward: 0,
    scope: "profile",
    metric: "streak",
    target: 100
  },
  {
    id: "ten-articles-mastered",
    icon: "🏷",
    name: "10 Articles Mastered",
    description: "Master 10 article nouns.",
    reward: 0,
    scope: "profile",
    metric: "articlesMastered",
    target: 10
  },
  {
    id: "hundred-articles-mastered",
    icon: "🏷",
    name: "100 Articles Mastered",
    description: "Master 100 article nouns.",
    reward: 25,
    scope: "profile",
    metric: "articlesMastered",
    target: 100
  },
  {
    id: "five-hundred-articles-mastered",
    icon: "🏷",
    name: "500 Articles Mastered",
    description: "Master 500 article nouns.",
    reward: 0,
    scope: "profile",
    metric: "articlesMastered",
    target: 500
  },
  {
    id: "family-home",
    icon: "🏠",
    name: "Family Home",
    description: "Reach 500 family coins together.",
    reward: 0,
    scope: "family",
    metric: "familyCoins",
    target: 500
  },
  {
    id: "family-1000-coins",
    icon: "🚗",
    name: "Two-Car Family",
    description: "Reach 1000 family coins together.",
    reward: 0,
    scope: "family",
    metric: "familyCoins",
    target: 1000
  },
  {
    id: "family-business",
    icon: "🏦",
    name: "Family Business",
    description: "Reach 2000 family coins together.",
    reward: 0,
    scope: "family",
    metric: "familyCoins",
    target: 2000
  },
  {
    id: "noun-verb-explorer",
    icon: "🔗",
    name: "Noun-Verb Explorer",
    description: "Answer 20 Noun-Verb questions correctly.",
    reward: 20,
    scope: "profile",
    metric: "nounVerbCorrect",
    target: 20
  },
  {
    id: "noun-verb-scholar",
    icon: "🔗",
    name: "Noun-Verb Scholar",
    description: "Answer 100 Noun-Verb questions correctly.",
    reward: 0,
    scope: "profile",
    metric: "nounVerbCorrect",
    target: 100
  },
  {
    id: "test-personal-achievement",
    icon: "🏆",
    name: "Test Personal Achievement",
    description: "Temporary test badge for the current profile only.",
    reward: 1,
    scope: "profile",
    testOnly: true
  },
  {
    id: "test-family-achievement",
    icon: "🏡",
    name: "Test Family Achievement",
    description: "Temporary test badge shared by the whole family.",
    reward: 0,
    scope: "family",
    testOnly: true
  }
];
const DAILY_CHALLENGES = [
  {
    id: "article-apprentice",
    icon: "🏷",
    name: "Article Apprentice",
    description: "Answer 20 article questions.",
    metric: "articleQuestions",
    goal: 20,
    reward: 10
  },
  {
    id: "article-expert",
    icon: "🏷",
    name: "Article Expert",
    description: "Answer 50 article questions.",
    metric: "articleQuestions",
    goal: 50,
    reward: 25
  },
  {
    id: "accuracy-challenge",
    icon: "🎯",
    name: "Accuracy Challenge",
    description: "Get 10 article questions correct.",
    metric: "correctArticleAnswers",
    goal: 10,
    reward: 15
  },
  {
    id: "consistency-challenge",
    icon: "🔥",
    name: "Consistency Challenge",
    description: "Answer 30 article questions.",
    metric: "articleQuestions",
    goal: 30,
    reward: 15
  },
  {
    id: "quick-practice",
    icon: "⚡",
    name: "Quick Practice",
    description: "Answer 15 article questions.",
    metric: "articleQuestions",
    goal: 15,
    reward: 8
  },
  {
    id: "marathon-challenge",
    icon: "🏆",
    name: "Marathon Challenge",
    description: "Answer 75 article questions.",
    metric: "articleQuestions",
    goal: 75,
    reward: 40
  }
];
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

const MEANING_MATCH_TEMPLATES = [
  {
    id: "neutral-she",
    type: "infinitive",
    english: (meaning) => `She needs to ${meaning.base} today.`,
    german: ({ phrase }) => `Sie muss heute ${phrase}.`
  },
  {
    id: "neutral-we",
    type: "infinitive",
    english: (meaning) => `We have to ${meaning.base} soon.`,
    german: ({ phrase }) => `Wir müssen bald ${phrase}.`
  },
  {
    id: "future-they",
    type: "infinitive",
    english: (meaning) => `They will ${meaning.base} next week.`,
    german: ({ phrase }) => `Sie werden nächste Woche ${phrase}.`
  },
  {
    id: "school-question",
    type: "infinitive",
    context: "school",
    english: (meaning) => `Can you ${meaning.base} after class?`,
    german: ({ phrase }) => `Kannst du nach dem Unterricht ${phrase}?`
  },
  {
    id: "work-team",
    type: "infinitive",
    context: "work",
    english: (meaning) => `At work, the team has to ${meaning.base}.`,
    german: ({ phrase }) => `Bei der Arbeit muss das Team ${phrase}.`
  },
  {
    id: "family-plan",
    type: "infinitive",
    context: "family",
    english: (meaning) => `My family wants to ${meaning.base} this weekend.`,
    german: ({ phrase }) => `Meine Familie möchte am Wochenende ${phrase}.`
  },
  {
    id: "question-why",
    type: "infinitive",
    english: (meaning) => `Why do you want to ${meaning.base}?`,
    german: ({ phrase }) => `Warum willst du ${phrase}?`
  },
  {
    id: "everyday-plan",
    type: "infinitive",
    english: (meaning) => `I want to ${meaning.base}.`,
    german: ({ phrase }) => `Ich möchte ${phrase}.`
  },
  {
    id: "past-she-yesterday",
    type: "perfect",
    english: (meaning) => `She ${meaning.past} yesterday.`,
    german: ({ aux, phrase }) => `Sie ${aux.she} gestern ${phrase}.`
  },
  {
    id: "past-work",
    type: "perfect",
    english: (meaning) => `We ${meaning.past} after the meeting.`,
    german: ({ aux, phrase }) => `Wir ${aux.we} nach der Besprechung ${phrase}.`
  },
  {
    id: "past-school",
    type: "perfect",
    english: (meaning) => `He ${meaning.past} on the way to school.`,
    german: ({ aux, phrase }) => `Er ${aux.he} auf dem Weg zur Schule ${phrase}.`
  },
  {
    id: "question-perfect",
    type: "perfect",
    english: (meaning) => `Did they ${meaning.base} yet?`,
    german: ({ aux, phrase }) => `${capitalizeFirst(aux.they)} sie schon ${phrase}?`
  },
  {
    id: "past-lena",
    type: "perfect",
    english: (meaning) => `Lena ${meaning.past} this morning.`,
    german: ({ aux, phrase }) => `Lena ${aux.she} heute Morgen ${phrase}.`
  }
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
  achievementCollectionScreen: document.querySelector("#achievementCollectionScreen"),
  coinChallengesScreen: document.querySelector("#coinChallengesScreen"),
  dashboardAvatar: document.querySelector("#dashboardAvatar"),
  dashboardWelcome: document.querySelector("#dashboardWelcome"),
  dashboardWordNew: document.querySelector("#dashboardWordNew"),
  dashboardWordLearned: document.querySelector("#dashboardWordLearned"),
  dashboardWordMastered: document.querySelector("#dashboardWordMastered"),
  dashboardArticleNew: document.querySelector("#dashboardArticleNew"),
  dashboardArticleLearned: document.querySelector("#dashboardArticleLearned"),
  dashboardArticleMastered: document.querySelector("#dashboardArticleMastered"),
  dashboardNounVerbNew: document.querySelector("#dashboardNounVerbNew"),
  dashboardNounVerbLearned: document.querySelector("#dashboardNounVerbLearned"),
  dashboardNounVerbMastered: document.querySelector("#dashboardNounVerbMastered"),
  dashboardPrepositionNew: document.querySelector("#dashboardPrepositionNew"),
  dashboardPrepositionLearned: document.querySelector("#dashboardPrepositionLearned"),
  dashboardPrepositionMastered: document.querySelector("#dashboardPrepositionMastered"),
  recentAchievements: document.querySelector("#recentAchievements"),
  nextAchievements: document.querySelector("#nextAchievements"),
  achievementsGrid: document.querySelector("#achievementsGrid"),
  challengeArticleProgressBar: document.querySelector("#challengeArticleProgressBar"),
  challengeArticleProgressLabel: document.querySelector("#challengeArticleProgressLabel"),
  challengeVocabularyProgressBar: document.querySelector("#challengeVocabularyProgressBar"),
  challengeVocabularyProgressLabel: document.querySelector("#challengeVocabularyProgressLabel"),
  challengeNounVerbProgressBar: document.querySelector("#challengeNounVerbProgressBar"),
  challengeNounVerbProgressLabel: document.querySelector("#challengeNounVerbProgressLabel"),
  challengeMeaningMatchProgressBar: document.querySelector("#challengeMeaningMatchProgressBar"),
  challengeMeaningMatchProgressLabel: document.querySelector("#challengeMeaningMatchProgressLabel"),
  challengePrepositionProgressBar: document.querySelector("#challengePrepositionProgressBar"),
  challengePrepositionProgressLabel: document.querySelector("#challengePrepositionProgressLabel"),
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
  challengeDescription: document.querySelector("#challengeDescription"),
  challengeStatus: document.querySelector("#challengeStatus"),
  challengeProgressFill: document.querySelector("#challengeProgressFill"),
  streakCurrent: document.querySelector("#streakCurrent"),
  streakBest: document.querySelector("#streakBest"),
  leaderboardList: document.querySelector("#leaderboardList"),
  controlPanel: document.querySelector("#controlPanel"),
  searchPanel: document.querySelector("#searchPanel"),
  statsGrid: document.querySelector("#statsGrid"),
  studyStage: document.querySelector("#studyStage"),
  studyChallengeBack: document.querySelector("#studyChallengeBack"),
  nounVerbStage: document.querySelector("#nounVerbStage"),
  nounVerbChallengeBack: document.querySelector("#nounVerbChallengeBack"),
  nounVerbCounter: document.querySelector("#nounVerbCounter"),
  nounVerbTitle: document.querySelector("#nounVerbTitle"),
  vocabularyReviewDebug: document.querySelector("#vocabularyReviewDebug"),
  nounVerbInstruction: document.querySelector("#nounVerbInstruction"),
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
  testPersonalAchievement: document.querySelector("#testPersonalAchievement"),
  testFamilyAchievement: document.querySelector("#testFamilyAchievement"),
  debugCurrentProfile: document.querySelector("#debugCurrentProfile"),
  debugPersonalAchievements: document.querySelector("#debugPersonalAchievements"),
  debugFamilyAchievements: document.querySelector("#debugFamilyAchievements"),
  debugAchievementSource: document.querySelector("#debugAchievementSource"),
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
let meaningMatchItems = [];
let prepositionItems = [];
let visibleNounVerbPairs = [];
let visibleMeaningMatchPairs = [];
let visiblePrepositionItems = [];
let visibleVocabularyReviewCards = [];
let currentIndex = 0;
let nounVerbCurrentIndex = 0;
let meaningMatchCurrentIndex = 0;
let prepositionCurrentIndex = 0;
let vocabularyReviewCurrentIndex = 0;
let answerShown = false;
let selectedArticle = "";
let articleQuizAnswered = false;
let selectedQuizArticle = "";
let nounVerbQuizState = {
  currentQuestionId: "",
  selectedAnswer: "",
  hasAnswered: false,
  currentChoices: []
};
let meaningMatchQuizState = {
  currentQuestionId: "",
  selectedIndex: -1,
  hasAnswered: false,
  currentPrompt: "",
  currentTemplateId: "",
  currentChoices: []
};
let prepositionQuizState = {
  currentQuestionId: "",
  selectedAnswer: "",
  hasAnswered: false,
  currentChoices: []
};
let vocabularyReviewQuizState = {
  currentQuestionId: "",
  selectedAnswer: "",
  hasAnswered: false,
  currentChoices: []
};
let recentNounVerbQuestionIds = [];
let recentNounVerbNouns = [];
let recentMeaningMatchItems = [];
let recentMeaningMatchTemplateIds = [];
let recentVocabularyWords = [];
let meaningMatchGeneratedItems = new Map();
let progress = {};
let vocabularyProgress = {};
let articleProgress = {};
let nounVerbProgress = {};
let meaningMatchProgress = {};
let prepositionProgress = {};
let profileStore = null;
let checkingAchievements = false;
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
  try {
    const response = await fetch(MEANING_MATCH_CSV_URL, { cache: "no-store" });
    if (!response.ok) throw new Error("Meaning Match file was not found.");
    const csv = await response.text();
    meaningMatchItems = normalizeMeaningMatchItems(parseCsv(csv));
  } catch (error) {
    console.warn("Could not load curated Meaning Match items.", error);
    meaningMatchItems = [];
  }
  try {
    const response = await fetch(PREPOSITIONS_CSV_URL, { cache: "no-store" });
    if (!response.ok) throw new Error("Prepositions file was not found.");
    const csv = await response.text();
    prepositionItems = normalizePrepositionItems(parseCsv(csv));
  } catch (error) {
    console.warn("Could not load preposition questions.", error);
    prepositionItems = [];
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
  store.familyAchievementsUnlocked = normalizeAchievementList(store.familyAchievementsUnlocked);
  promoteFamilyAchievements(store);

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
    familyAchievementsUnlocked: [],
    profiles: DEFAULT_PROFILES.reduce((profiles, profile) => {
      profiles[profile.id] = normalizeProfileData(null, profile);
      return profiles;
    }, {})
  };
}

function promoteFamilyAchievements(store) {
  if (!store?.profiles) return store;
  const familyIds = new Set(getFamilyAchievementIds(store));
  store.familyAchievementsUnlocked = Array.from(familyIds);
  return store;
}

function getFamilyAchievementIds(store = profileStore) {
  if (!store) return [];
  const familyIds = new Set(normalizeAchievementList(store.familyAchievementsUnlocked));
  const familyAchievementIds = new Set(ACHIEVEMENTS
    .filter((achievement) => achievement.scope === "family")
    .map((achievement) => achievement.id));
  Object.values(store.profiles).forEach((profile) => {
    normalizeAchievementList(profile?.achievementsUnlocked).forEach((achievementId) => {
      if (familyAchievementIds.has(achievementId)) familyIds.add(achievementId);
    });
  });
  return Array.from(familyIds);
}

function getPersonalAchievementIds(profile) {
  const personalAchievementIds = new Set(ACHIEVEMENTS
    .filter((achievement) => achievement.scope !== "family")
    .map((achievement) => achievement.id));
  return normalizeAchievementList(profile?.achievementsUnlocked)
    .filter((achievementId) => personalAchievementIds.has(achievementId));
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
    achievementsUnlocked: normalizeAchievementList(data?.achievementsUnlocked || data?.achievements),
    decks: data?.decks || {},
    progress: normalizeMeaningProgress(data?.progress || {}),
    vocabularyProgress: normalizeVocabularyProgress(data?.vocabularyProgress || {}),
    articleProgress: normalizeArticleProgress(data?.articleProgress || {}),
    nounVerbProgress: normalizeNounVerbProgress(data?.nounVerbProgress || {}),
    meaningMatchProgress: normalizeNounVerbProgress(data?.meaningMatchProgress || {}),
    prepositionProgress: normalizeNounVerbProgress(data?.prepositionProgress || {}),
    recentMeaningMatchItems: normalizeRecentItemList(data?.recentMeaningMatchItems, MEANING_MATCH_RECENT_BUFFER),
    vocabularyReviewStats: normalizeVocabularyReviewStats(data?.vocabularyReviewStats),
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

function normalizeVocabularyProgress(savedProgress) {
  return Object.fromEntries(
    Object.entries(savedProgress || {}).map(([cardId, entry]) => {
      const correctCount = normalizeCounter(entry.correctCount);
      const wrongCount = normalizeCounter(entry.wrongCount);
      return [
        cardId,
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
          status: normalizeVocabularyMasteryStatus(entry.status, { correctCount })
        }
      ];
    })
  );
}

function normalizeVocabularyMasteryStatus(value, counts = {}) {
  const status = String(value || "").toLowerCase();
  const correctCount = normalizeCounter(counts.correctCount);
  if (status === "mastered" || correctCount >= 3) return "mastered";
  if (status === "learned" || correctCount >= 1) return "learned";
  return "new";
}

function normalizeRecentItemList(value = [], limit = 60) {
  if (!Array.isArray(value)) return [];
  const seen = new Set();
  return value
    .map(String)
    .filter((item) => {
      if (!item || seen.has(item)) return false;
      seen.add(item);
      return true;
    })
    .slice(0, limit);
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

function normalizeVocabularyReviewStats(value = {}) {
  return {
    answered: normalizeCounter(value?.answered),
    correct: normalizeCounter(value?.correct),
    incorrect: normalizeCounter(value?.incorrect),
    updatedAt: typeof value?.updatedAt === "string" ? value.updatedAt : ""
  };
}

function mergeVocabularyReviewStats(localStats = {}, remoteStats = {}) {
  const local = normalizeVocabularyReviewStats(localStats);
  const remote = normalizeVocabularyReviewStats(remoteStats);
  return {
    answered: Math.max(local.answered, remote.answered),
    correct: Math.max(local.correct, remote.correct),
    incorrect: Math.max(local.incorrect, remote.incorrect),
    updatedAt: latestString(local.updatedAt, remote.updatedAt)
  };
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
  const date = typeof value?.date === "string" ? value.date : getTodayKey();
  return {
    date,
    challengeId: typeof value?.challengeId === "string" ? value.challengeId : "",
    articleQuestions: normalizeCounter(value?.articleQuestions),
    correctArticleAnswers: normalizeCounter(value?.correctArticleAnswers),
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

function normalizeAchievementList(value) {
  return Array.from(new Set((Array.isArray(value) ? value : []).map(String).filter(Boolean)));
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
  promoteFamilyAchievements(profileStore);
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
  promoteFamilyAchievements(profileStore);
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
    vocabularyProgress = profileStore.profiles[currentProfileId].vocabularyProgress;
    articleProgress = profileStore.profiles[currentProfileId].articleProgress;
    nounVerbProgress = profileStore.profiles[currentProfileId].nounVerbProgress;
    meaningMatchProgress = profileStore.profiles[currentProfileId].meaningMatchProgress;
    prepositionProgress = profileStore.profiles[currentProfileId].prepositionProgress;
    recentMeaningMatchItems = normalizeRecentItemList(profileStore.profiles[currentProfileId].recentMeaningMatchItems, MEANING_MATCH_RECENT_BUFFER);
  }
  applyingRemoteStore = false;
  promoteFamilyAchievements(profileStore);
  refreshVisibleProfileState();
  renderAchievementDebugPanel();
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
  baseStore.familyAchievementsUnlocked = Array.from(
    new Set([
      ...(Array.isArray(localStore?.familyAchievementsUnlocked) ? localStore.familyAchievementsUnlocked : []),
      ...(Array.isArray(remoteStore?.familyAchievementsUnlocked) ? remoteStore.familyAchievementsUnlocked : [])
    ].map(String))
  );
  baseStore.migratedLegacyProgress = Boolean(localStore?.migratedLegacyProgress || remoteStore?.migratedLegacyProgress);
  return promoteFamilyAchievements(baseStore);
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
      vocabularyProgress: mergeProgressEntries(local.vocabularyProgress, remote.vocabularyProgress),
      articleProgress: mergeProgressEntries(local.articleProgress, remote.articleProgress),
      nounVerbProgress: mergeProgressEntries(local.nounVerbProgress, remote.nounVerbProgress),
      meaningMatchProgress: mergeProgressEntries(local.meaningMatchProgress, remote.meaningMatchProgress),
      prepositionProgress: mergeProgressEntries(local.prepositionProgress, remote.prepositionProgress),
      recentMeaningMatchItems: mergeRecentItemLists(local.recentMeaningMatchItems, remote.recentMeaningMatchItems, MEANING_MATCH_RECENT_BUFFER),
      vocabularyReviewStats: mergeVocabularyReviewStats(local.vocabularyReviewStats, remote.vocabularyReviewStats),
      positions: {
        vocabulary: Math.max(normalizePosition(local.positions?.vocabulary), normalizePosition(remote.positions?.vocabulary)),
        article: Math.max(normalizePosition(local.positions?.article), normalizePosition(remote.positions?.article)),
        nounVerb: Math.max(normalizePosition(local.positions?.nounVerb), normalizePosition(remote.positions?.nounVerb))
      },
      levelBonusesAwarded: Array.from(new Set([...(local.levelBonusesAwarded || []), ...(remote.levelBonusesAwarded || [])])),
      achievementsUnlocked: Array.from(new Set([...(local.achievementsUnlocked || []), ...(remote.achievementsUnlocked || [])])),
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

function mergeRecentItemLists(localItems = [], remoteItems = [], limit = 60) {
  return normalizeRecentItemList([...(localItems || []), ...(remoteItems || [])], limit);
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
    challengeId: localChallenge?.challengeId || remoteChallenge?.challengeId || getDailyChallengeForDate(localDate || remoteDate || getTodayKey()).id,
    articleQuestions: Math.max(normalizeCounter(localChallenge?.articleQuestions), normalizeCounter(remoteChallenge?.articleQuestions)),
    correctArticleAnswers: Math.max(normalizeCounter(localChallenge?.correctArticleAnswers), normalizeCounter(remoteChallenge?.correctArticleAnswers)),
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
  } else if (currentView === "achievements") {
    renderAchievementCollection();
  } else if (currentView === "coin-challenges") {
    renderCoinChallenges();
  } else if (currentView === "noun-verb") {
    renderNounVerbQuiz();
  } else if (currentView === "meaning-match") {
    renderMeaningMatchQuiz();
  } else if (currentView === "prepositions") {
    renderPrepositionQuiz();
  } else if (currentView === "vocabulary-review") {
    renderVocabularyReviewQuiz();
  } else {
    updateStats();
    renderCard();
  }
}

function showProfileScreen() {
  currentProfileId = "";
  progress = {};
  vocabularyProgress = {};
  articleProgress = {};
  nounVerbProgress = {};
  meaningMatchProgress = {};
  prepositionProgress = {};
  recentMeaningMatchItems = [];
  els.appShell.classList.remove("clean-article-practice");
  els.appShell.classList.remove("clean-quiz-mode");
  els.appShell.classList.remove("meaning-match-mode");
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
  vocabularyProgress = profile.vocabularyProgress;
  articleProgress = profile.articleProgress;
  nounVerbProgress = profile.nounVerbProgress;
  meaningMatchProgress = profile.meaningMatchProgress;
  prepositionProgress = profile.prepositionProgress;
  recentMeaningMatchItems = normalizeRecentItemList(profile.recentMeaningMatchItems, MEANING_MATCH_RECENT_BUFFER);
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
  els.appShell.classList.remove("clean-article-practice");
  els.appShell.classList.remove("clean-quiz-mode");
  els.appShell.classList.remove("meaning-match-mode");
  setChallengeBackButtons(false, false);
  renderDashboard();
  els.dashboardScreen.classList.remove("hidden");
  els.achievementCollectionScreen.classList.add("hidden");
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
  els.appShell.classList.remove("clean-article-practice");
  els.appShell.classList.remove("clean-quiz-mode");
  els.appShell.classList.remove("meaning-match-mode");
  setChallengeBackButtons(false, false);
  renderCoinChallenges();
  els.dashboardScreen.classList.add("hidden");
  els.achievementCollectionScreen.classList.add("hidden");
  els.coinChallengesScreen.classList.remove("hidden");
  els.controlPanel.classList.add("hidden");
  els.searchPanel.classList.add("hidden");
  els.statsGrid.classList.add("hidden");
  els.studyStage.classList.add("hidden");
  els.nounVerbStage.classList.add("hidden");
  els.actionBar.classList.add("hidden");
}

function showAchievementCollection() {
  currentView = "achievements";
  els.appShell.classList.remove("clean-article-practice");
  els.appShell.classList.remove("clean-quiz-mode");
  els.appShell.classList.remove("meaning-match-mode");
  setChallengeBackButtons(false, false);
  renderAchievementCollection();
  els.dashboardScreen.classList.add("hidden");
  els.achievementCollectionScreen.classList.remove("hidden");
  els.coinChallengesScreen.classList.add("hidden");
  els.controlPanel.classList.add("hidden");
  els.searchPanel.classList.add("hidden");
  els.statsGrid.classList.add("hidden");
  els.studyStage.classList.add("hidden");
  els.nounVerbStage.classList.add("hidden");
  els.actionBar.classList.add("hidden");
}

function showStudyView(options = {}) {
  currentView = "study";
  const cleanArticlePractice = els.modeSelect.value === "article" && !options.focusSearch && !options.openStats;
  setChallengeBackButtons(cleanArticlePractice, false);
  els.dashboardScreen.classList.add("hidden");
  els.achievementCollectionScreen.classList.add("hidden");
  els.coinChallengesScreen.classList.add("hidden");
  els.nounVerbStage.classList.add("hidden");
  els.appShell.classList.toggle("clean-article-practice", cleanArticlePractice);
  els.appShell.classList.toggle("clean-quiz-mode", cleanArticlePractice);
  els.appShell.classList.remove("meaning-match-mode");
  els.controlPanel.classList.toggle("hidden", options.hideControls === true || cleanArticlePractice);
  els.searchPanel.classList.toggle("hidden", cleanArticlePractice);
  els.statsGrid.classList.toggle("hidden", cleanArticlePractice);
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
  setChallengeBackButtons(false, true);
  els.appShell.classList.remove("clean-article-practice");
  els.appShell.classList.add("clean-quiz-mode");
  els.appShell.classList.remove("meaning-match-mode");
  els.dashboardScreen.classList.add("hidden");
  els.achievementCollectionScreen.classList.add("hidden");
  els.coinChallengesScreen.classList.add("hidden");
  els.controlPanel.classList.add("hidden");
  els.searchPanel.classList.add("hidden");
  els.statsGrid.classList.add("hidden");
  els.studyStage.classList.add("hidden");
  els.actionBar.classList.remove("hidden");
  els.nounVerbStage.classList.remove("hidden");
  applyNounVerbSmartOrder();
  resumeNounVerbPosition();
  generateNounVerbQuestion("open quiz", nounVerbCurrentIndex);
  renderNounVerbQuiz();
}

function showVocabularyReviewQuiz() {
  currentView = "vocabulary-review";
  setChallengeBackButtons(false, true);
  els.appShell.classList.remove("clean-article-practice");
  els.appShell.classList.add("clean-quiz-mode");
  els.appShell.classList.remove("meaning-match-mode");
  els.dashboardScreen.classList.add("hidden");
  els.achievementCollectionScreen.classList.add("hidden");
  els.coinChallengesScreen.classList.add("hidden");
  els.controlPanel.classList.add("hidden");
  els.searchPanel.classList.add("hidden");
  els.statsGrid.classList.add("hidden");
  els.studyStage.classList.add("hidden");
  els.actionBar.classList.remove("hidden");
  els.nounVerbStage.classList.remove("hidden");
  applyVocabularyReviewOrder();
  generateVocabularyReviewQuestion("open quiz", vocabularyReviewCurrentIndex);
  renderVocabularyReviewQuiz();
}

function showMeaningMatchQuiz() {
  currentView = "meaning-match";
  setChallengeBackButtons(false, true);
  els.appShell.classList.remove("clean-article-practice");
  els.appShell.classList.add("clean-quiz-mode");
  els.appShell.classList.add("meaning-match-mode");
  els.dashboardScreen.classList.add("hidden");
  els.achievementCollectionScreen.classList.add("hidden");
  els.coinChallengesScreen.classList.add("hidden");
  els.controlPanel.classList.add("hidden");
  els.searchPanel.classList.add("hidden");
  els.statsGrid.classList.add("hidden");
  els.studyStage.classList.add("hidden");
  els.actionBar.classList.remove("hidden");
  els.nounVerbStage.classList.remove("hidden");
  applyMeaningMatchSmartOrder();
  generateMeaningMatchQuestion("open quiz", meaningMatchCurrentIndex);
  renderMeaningMatchQuiz();
}

function showPrepositionQuiz() {
  currentView = "prepositions";
  setChallengeBackButtons(false, true);
  els.appShell.classList.remove("clean-article-practice");
  els.appShell.classList.add("clean-quiz-mode");
  els.appShell.classList.remove("meaning-match-mode");
  els.dashboardScreen.classList.add("hidden");
  els.achievementCollectionScreen.classList.add("hidden");
  els.coinChallengesScreen.classList.add("hidden");
  els.controlPanel.classList.add("hidden");
  els.searchPanel.classList.add("hidden");
  els.statsGrid.classList.add("hidden");
  els.studyStage.classList.add("hidden");
  els.actionBar.classList.remove("hidden");
  els.nounVerbStage.classList.remove("hidden");
  applyPrepositionOrder();
  generatePrepositionQuestion("open quiz", prepositionCurrentIndex);
  renderPrepositionQuiz();
}

function setChallengeBackButtons(showStudyButton, showNounVerbButton) {
  els.studyChallengeBack.classList.toggle("hidden", !showStudyButton);
  els.nounVerbChallengeBack.classList.toggle("hidden", !showNounVerbButton);
}

function returnToCoinChallenges(event) {
  event?.preventDefault();
  saveCurrentPosition();
  closeSettingsMenu();
  showCoinChallenges();
}

function renderDashboard() {
  if (!currentProfileId) return;
  const profile = getCurrentProfile();
  prepareProfileDailyState(profile);
  checkAchievements("dashboard");
  const wordSummary = getWordLearningSummary();
  const articleSummary = getArticleSummary();
  const meaningMatchSummary = getMeaningMatchSummary();
  const prepositionSummary = getPrepositionSummary();
  const level = getCoinLevel(profile.coins);
  const levelPercent = getLevelProgressPercent(profile.coins, level);
  const familySummary = getFamilyWealthSummary();
  const challenge = profile.dailyChallenge;
  const streak = getDisplayStreak(profile);
  profile.positions = normalizePositions(profile.positions);
  els.dashboardWelcome.textContent = `Welcome back, ${profile.name}`;
  els.dashboardWordNew.textContent = wordSummary.new;
  els.dashboardWordLearned.textContent = wordSummary.learned;
  els.dashboardWordMastered.textContent = wordSummary.mastered;
  els.dashboardArticleNew.textContent = articleSummary.new;
  els.dashboardArticleLearned.textContent = articleSummary.learned;
  els.dashboardArticleMastered.textContent = articleSummary.mastered;
  els.dashboardNounVerbNew.textContent = meaningMatchSummary.new;
  els.dashboardNounVerbLearned.textContent = meaningMatchSummary.learned;
  els.dashboardNounVerbMastered.textContent = meaningMatchSummary.mastered;
  els.dashboardPrepositionNew.textContent = prepositionSummary.new;
  els.dashboardPrepositionLearned.textContent = prepositionSummary.learned;
  els.dashboardPrepositionMastered.textContent = prepositionSummary.mastered;
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
  const dailyChallenge = getDailyChallengeForDate(challenge.date);
  const challengeProgress = getDailyChallengeProgress(challenge, dailyChallenge);
  els.challengeTitle.classList.toggle("challenge-complete", challenge.completed);
  els.challengeTitle.textContent = challenge.completed
    ? "🎉 Daily Challenge Complete!"
    : `${dailyChallenge.icon} ${dailyChallenge.name}`;
  els.challengeDescription.textContent = challenge.completed
    ? `${dailyChallenge.icon} ${dailyChallenge.name}`
    : dailyChallenge.description;
  els.challengeReward.textContent = challenge.completed
    ? `Reward: 🪙 +${dailyChallenge.reward} Coins Earned`
    : `Reward: 🪙 +${dailyChallenge.reward} Coins`;
  els.challengeStatus.textContent = `${challengeProgress.current} / ${dailyChallenge.goal}`;
  els.challengeProgressFill.style.width = `${Math.min((challengeProgress.current / dailyChallenge.goal) * 100, 100)}%`;
  els.streakCurrent.textContent = `${streak.current} ${streak.current === 1 ? "Day" : "Days"}`;
  els.streakBest.textContent = `Best: ${streak.best} days`;
  renderAvatar(els.dashboardAvatar, profile);
  renderCoinLeaderboard();
  renderAchievements();
  saveProfileStore();
}

function renderCoinChallenges() {
  const articleSummary = getArticleSummary();
  const nounVerbSummary = getNounVerbSummary();
  const meaningMatchSummary = getMeaningMatchSummary();
  const prepositionSummary = getPrepositionSummary();
  const wordSummary = getWordLearningSummary();
  renderChallengeProgress(els.challengeArticleProgressBar, els.challengeArticleProgressLabel, articleSummary);
  renderChallengeProgress(els.challengeVocabularyProgressBar, els.challengeVocabularyProgressLabel, wordSummary);
  renderChallengeProgress(els.challengeMeaningMatchProgressBar, els.challengeMeaningMatchProgressLabel, meaningMatchSummary);
  renderChallengeProgress(els.challengeNounVerbProgressBar, els.challengeNounVerbProgressLabel, nounVerbSummary);
  renderChallengeProgress(els.challengePrepositionProgressBar, els.challengePrepositionProgressLabel, prepositionSummary);
}

function renderChallengeProgress(barEl, labelEl, summary) {
  if (!barEl || !labelEl) return;
  const safeSummary = {
    new: normalizeCounter(summary?.new),
    learned: normalizeCounter(summary?.learned),
    mastered: normalizeCounter(summary?.mastered)
  };
  const total = safeSummary.new + safeSummary.learned + safeSummary.mastered;
  const learnedPercent = total ? Math.round((safeSummary.learned / total) * 100) : 0;
  const masteredPercent = total ? Math.round((safeSummary.mastered / total) * 100) : 0;
  const newPercent = Math.max(0, 100 - learnedPercent - masteredPercent);

  barEl.replaceChildren(
    createProgressSegment("progress-new", newPercent, "New"),
    createProgressSegment("progress-learned", learnedPercent, "Learned"),
    createProgressSegment("progress-mastered", masteredPercent, "Mastered")
  );
  labelEl.textContent = total
    ? `Learned ${learnedPercent}% · Mastered ${masteredPercent}%`
    : "No questions loaded yet";
  barEl.setAttribute(
    "aria-label",
    `New ${newPercent}%, learned ${learnedPercent}%, mastered ${masteredPercent}%`
  );
}

function createProgressSegment(className, percent, label) {
  const segment = document.createElement("span");
  segment.className = className;
  segment.style.width = `${percent}%`;
  segment.title = `${label}: ${percent}%`;
  return segment;
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

function renderAchievements() {
  if (!profileStore || !currentProfileId) return;
  renderDashboardAchievements(getAchievementStates());
}

function renderAchievementCollection() {
  if (!els.achievementsGrid || !profileStore || !currentProfileId) return;
  const achievementStates = getAchievementStates();
  els.achievementsGrid.replaceChildren(
    ...achievementStates.map(({ achievement, unlocked, progress }) => createAchievementCard(achievement, unlocked, progress))
  );
}

function getAchievementStates() {
  promoteFamilyAchievements(profileStore);
  const profile = getCurrentProfile();
  const profileUnlocked = new Set(getPersonalAchievementIds(profile));
  const familyUnlocked = new Set(getFamilyAchievementIds(profileStore));
  return ACHIEVEMENTS.map((achievement) => {
    const storedUnlocked = achievement.scope === "family"
      ? familyUnlocked.has(achievement.id)
      : profileUnlocked.has(achievement.id);
    const progress = getAchievementProgress(achievement, profile);
    const unlocked = storedUnlocked || progress.isComplete;
    return { achievement, unlocked, progress };
  });
}

function renderDashboardAchievements(achievementStates) {
  if (!els.recentAchievements || !els.nextAchievements) return;
  const recentAchievements = getRecentlyEarnedAchievements(achievementStates);
  const nextGoals = getNextGoalAchievements(achievementStates);

  els.recentAchievements.replaceChildren(
    ...(recentAchievements.length
      ? recentAchievements.map(({ achievement, unlocked, progress }) => createAchievementCard(achievement, unlocked, progress, { compact: true }))
      : [createEmptyAchievementCard("No achievements earned yet.")]
    )
  );

  els.nextAchievements.replaceChildren(
    ...(nextGoals.length
      ? nextGoals.map(({ achievement, unlocked, progress }) => createAchievementCard(achievement, unlocked, progress, { compact: true }))
      : [createEmptyAchievementCard("All current goals unlocked.")]
    )
  );
}

function createAchievementCard(achievement, unlocked, progress, options = {}) {
  const badge = document.createElement("article");
  badge.className = "achievement-badge";
  badge.classList.toggle("compact", options.compact === true);
  badge.classList.toggle("unlocked", unlocked);
  badge.classList.toggle("locked", !unlocked);
  badge.replaceChildren(
    createTextElement("span", "achievement-icon", unlocked ? `✓ ${achievement.icon}` : achievement.icon || "🔒"),
    createAchievementBody(achievement, unlocked, progress)
  );
  return badge;
}

function createEmptyAchievementCard(message) {
  const badge = document.createElement("article");
  badge.className = "achievement-badge compact locked";
  badge.replaceChildren(
    createTextElement("span", "achievement-icon", "○"),
    createTextElement("small", "", message)
  );
  return badge;
}

function getRecentlyEarnedAchievements(achievementStates) {
  const profile = getCurrentProfile();
  const personalOrder = getPersonalAchievementIds(profile);
  const familyOrder = getFamilyAchievementIds(profileStore);
  const recentIds = [...personalOrder, ...familyOrder].slice(-6).reverse();
  return recentIds
    .map((achievementId) => achievementStates.find(({ achievement, unlocked }) => achievement.id === achievementId && unlocked))
    .filter(Boolean)
    .filter(({ achievement }, index, list) => list.findIndex((item) => item.achievement.id === achievement.id) === index)
    .slice(0, 2);
}

function getNextGoalAchievements(achievementStates) {
  const lockedGoals = achievementStates
    .filter(({ achievement, unlocked, progress }) => !achievement.testOnly && !unlocked && progress.target > 0);
  const preferredGoals = [
    getClosestAchievementByMetric(lockedGoals, ["coins"]),
    getClosestAchievementByMetric(lockedGoals, ["familyCoins"]),
    getClosestAchievementByMetric(lockedGoals, ["articlesMastered", "nounVerbCorrect", "streak", "correctAnswers"])
  ].filter(Boolean);
  const fallbackGoals = lockedGoals
    .sort(compareAchievementProgress)
    .filter((goal) => !preferredGoals.some((preferred) => preferred.achievement.id === goal.achievement.id));
  return [...preferredGoals, ...fallbackGoals].slice(0, 2);
}

function getClosestAchievementByMetric(achievementStates, metrics) {
  return achievementStates
    .filter(({ achievement }) => metrics.includes(achievement.metric))
    .sort(compareAchievementProgress)[0] || null;
}

function compareAchievementProgress(first, second) {
  const firstRemaining = first.progress.target - first.progress.current;
  const secondRemaining = second.progress.target - second.progress.current;
  return firstRemaining - secondRemaining || second.progress.percent - first.progress.percent;
}

function createAchievementBody(achievement, unlocked, progress) {
  const body = document.createElement("div");
  const rewardText = achievement.reward > 0
    ? `Reward: +${achievement.reward} coins`
    : "Family achievement";
  const children = [
    createTextElement("strong", "", achievement.name),
    createTextElement("span", "", achievement.description),
    createTextElement("small", "achievement-progress-text", progress.target > 0 ? `${progress.current} / ${progress.target}` : unlocked ? "Unlocked" : "Locked")
  ];
  if (progress.target > 0) children.push(createProgressBar(progress.percent));
  children.push(createTextElement("small", "", unlocked ? `Unlocked · ${rewardText}` : rewardText));
  body.replaceChildren(...children);
  return body;
}

function createProgressBar(percent) {
  const track = document.createElement("span");
  const fill = document.createElement("span");
  track.className = "achievement-progress";
  fill.style.width = `${clamp(percent, 0, 100)}%`;
  track.append(fill);
  return track;
}

function getAchievementProgress(achievement, profile = getCurrentProfile()) {
  const target = normalizeCounter(achievement.target);
  const current = getAchievementCurrentValue(achievement, profile);
  return {
    current: target > 0 ? Math.min(current, target) : current,
    raw: current,
    target,
    percent: target > 0 ? Math.min((current / target) * 100, 100) : 0,
    isComplete: target > 0 ? current >= target : false
  };
}

function getAchievementCurrentValue(achievement, profile = getCurrentProfile()) {
  if (achievement.metric === "correctAnswers") return hasAnyCorrectQuizAnswer(profile) ? 1 : 0;
  if (achievement.metric === "coins") return normalizeCoinCount(profile?.coins);
  if (achievement.metric === "streak") return normalizeCounter(profile?.streak?.current);
  if (achievement.metric === "articlesMastered") return getArticleSummary().mastered;
  if (achievement.metric === "nounVerbCorrect") return getNounVerbCorrectAnswerCount(profile);
  if (achievement.metric === "familyCoins") return getFamilyCoinTotal(profileStore.profiles);
  return 0;
}

function renderAchievementDebugPanel() {
  if (!els.debugCurrentProfile || !profileStore) return;
  promoteFamilyAchievements(profileStore);
  const profile = currentProfileId ? getCurrentProfile() : null;
  const personalAchievements = profile
    ? getPersonalAchievementIds(profile)
    : [];
  const familyAchievements = getFamilyAchievementIds(profileStore);

  els.debugCurrentProfile.textContent = profile?.name || "None";
  els.debugPersonalAchievements.textContent = formatDebugAchievementList(personalAchievements);
  els.debugFamilyAchievements.textContent = formatDebugAchievementList(familyAchievements);
  els.debugAchievementSource.textContent = hasCloudSyncConfig()
    ? "Firebase/Supabase + Local Storage"
    : "Local Storage";
}

function formatDebugAchievementList(achievementIds) {
  if (!achievementIds.length) return "None";
  return achievementIds
    .map((id) => getAchievementById(id)?.name || id)
    .join(", ");
}

function hasCloudSyncConfig() {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY && SUPABASE_SYNC_TABLE);
}

function getAchievementById(achievementId) {
  return ACHIEVEMENTS.find((achievement) => achievement.id === achievementId) || null;
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
  const todayChallenge = getDailyChallengeForDate(today);
  profile.dailyChallenge = normalizeDailyChallenge(profile.dailyChallenge);
  profile.streak = normalizeStreak(profile.streak);

  if (profile.dailyChallenge.date !== today || profile.dailyChallenge.challengeId !== todayChallenge.id) {
    profile.dailyChallenge = {
      date: today,
      challengeId: todayChallenge.id,
      articleQuestions: 0,
      correctArticleAnswers: 0,
      completed: false
    };
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
  if (action === "achievements") {
    showAchievementCollection();
    return;
  }

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
  if (action === "meaning-match") {
    showMeaningMatchQuiz();
    return;
  }
  if (action === "prepositions") {
    showPrepositionQuiz();
    return;
  }
  if (action === "vocabulary-review") {
    showVocabularyReviewQuiz();
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
  if (currentView === "vocabulary-review") return;
  if (currentView === "meaning-match") return;
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

  els.previousCard.addEventListener("click", () => {
    if (currentView === "noun-verb") {
      moveNounVerbCard(-1);
      return;
    }
    if (currentView === "meaning-match") {
      moveMeaningMatchCard(-1);
      return;
    }
    if (currentView === "prepositions") {
      movePrepositionCard(-1);
      return;
    }
    if (currentView === "vocabulary-review") {
      moveVocabularyReviewCard(-1);
      return;
    }
    moveCard(-1);
  });
  els.nextCard.addEventListener("click", () => {
    if (currentView === "noun-verb") {
      moveNounVerbCard(1);
      return;
    }
    if (currentView === "meaning-match") {
      moveMeaningMatchCard(1);
      return;
    }
    if (currentView === "prepositions") {
      movePrepositionCard(1);
      return;
    }
    if (currentView === "vocabulary-review") {
      moveVocabularyReviewCard(1);
      return;
    }
    moveCard(1);
  });

  els.homeButton.addEventListener("click", () => {
    saveCurrentPosition();
    closeSettingsMenu();
    showDashboard();
  });

  els.studyChallengeBack.addEventListener("click", returnToCoinChallenges);
  els.nounVerbChallengeBack.addEventListener("click", returnToCoinChallenges);

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
    const prepositionButton = event.target.closest("button[data-preposition-choice]");
    if (prepositionButton) {
      console.log("Preposition answer button clicked", {
        currentView,
        selectedAnswer: prepositionButton.dataset.prepositionChoice,
        currentQuestionId: prepositionQuizState.currentQuestionId
      });
      if (prepositionQuizState.hasAnswered) return;
      answerPrepositionQuiz(prepositionButton.dataset.prepositionChoice);
      return;
    }

    const button = event.target.closest("button[data-verb]");
    if (currentView === "vocabulary-review") {
      const vocabularyReviewButton = event.target.closest("button[data-vocabulary-choice]");
      if (!vocabularyReviewButton || vocabularyReviewQuizState.hasAnswered) return;
      answerVocabularyReviewQuiz(vocabularyReviewButton.dataset.vocabularyChoice);
      return;
    }
    if (currentView === "meaning-match") {
      const meaningMatchButton = event.target.closest("button[data-meaning-choice]");
      if (!meaningMatchButton || meaningMatchQuizState.hasAnswered) return;
      answerMeaningMatchQuiz(Number(meaningMatchButton.dataset.meaningChoice));
      return;
    }
    if (!button || nounVerbQuizState.hasAnswered) return;
    answerNounVerbQuiz(button.dataset.verb);
  });

  els.nounVerbNext.addEventListener("click", () => {
    if (currentView === "meaning-match") {
      moveMeaningMatchCard(1);
      return;
    }
    if (currentView === "vocabulary-review") {
      moveVocabularyReviewCard(1);
      return;
    }
    if (currentView === "prepositions") {
      movePrepositionCard(1);
      return;
    }
    moveNounVerbCard(1);
  });

  els.switchProfile.addEventListener("click", () => {
    saveCurrentPosition();
    closeSettingsMenu();
    showProfileScreen();
  });

  els.settingsToggle.addEventListener("click", () => {
    const isOpen = !els.settingsPanel.classList.contains("hidden");
    els.settingsPanel.classList.toggle("hidden", isOpen);
    els.settingsToggle.setAttribute("aria-expanded", String(!isOpen));
    if (isOpen) return;
    renderAchievementDebugPanel();
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
    meaningMatchProgress = {};
    profile.history = [];
    profile.lastStudyDate = "";
    saveProgress();
    saveArticleProgress();
    saveNounVerbProgress();
    saveMeaningMatchProgress();
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

  els.testPersonalAchievement.addEventListener("click", async () => {
    await testPersonalAchievement();
  });

  els.testFamilyAchievement.addEventListener("click", async () => {
    await testFamilyAchievement();
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

function normalizeMeaningMatchItems(rows) {
  const seen = new Set();
  return rows
    .filter((row) => row.id && row.phrase && row.englishsentence && row.correctgermansentence && row.wronggermansentence)
    .map((row, index) => ({
      id: slugify(row.id) || `meaning-match-${index}`,
      phrase: row.phrase.trim(),
      english: row.englishmeaning || "",
      englishMeaning: row.englishmeaning || "",
      englishSentence: row.englishsentence.trim(),
      correctGermanSentence: row.correctgermansentence.trim(),
      wrongGermanSentence: row.wronggermansentence.trim(),
      example: row.example || "",
      templateId: "curated"
    }))
    .filter((item) => {
      if (!isMeaningMatchCuratedItemValid(item)) return false;
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
}

function isMeaningMatchCuratedItemValid(item) {
  if (!item.englishSentence || !item.correctGermanSentence || !item.wrongGermanSentence) return false;
  if (item.correctGermanSentence === item.wrongGermanSentence) return false;
  return true;
}

function normalizePrepositionItems(rows) {
  const seen = new Set();
  return rows
    .filter((row) => row.id && row.sentence && row.correct && row.wrong1 && row.wrong2 && row.wrong3)
    .map((row, index) => ({
      id: slugify(row.id) || `preposition-${index}`,
      sentence: row.sentence.trim(),
      correct: row.correct.trim(),
      wrong1: row.wrong1.trim(),
      wrong2: row.wrong2.trim(),
      wrong3: row.wrong3.trim()
    }))
    .filter((item) => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
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

function escapeRegExp(value) {
  return String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
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
  recordDailyActivity("article", { isCorrect });
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
  checkAchievements("coins");
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

function showDailyChallengeComplete(challenge) {
  els.levelCelebrationTitle.textContent = "🎉 Daily Challenge Complete!";
  els.levelCelebrationProfile.textContent = "Challenge:";
  els.levelCelebrationLevel.textContent = `${challenge.icon} ${challenge.name}`;
  els.levelCelebrationBonus.textContent = `Reward: 🪙 +${challenge.reward} Coins`;
  els.levelCelebrationBonus.classList.remove("hidden");
  els.levelCelebration.classList.remove("hidden");
}

function checkAchievements(reason = "") {
  if (!profileStore || !currentProfileId || checkingAchievements) return;
  checkingAchievements = true;
  try {
    const profile = getCurrentProfile();
    profile.achievementsUnlocked = normalizeAchievementList(profile.achievementsUnlocked);
    promoteFamilyAchievements(profileStore);
    const familyAchievementIds = getFamilyAchievementIds(profileStore);

    ACHIEVEMENTS.forEach((achievement) => {
      const isUnlocked = achievement.scope === "family"
        ? familyAchievementIds.includes(achievement.id)
        : profile.achievementsUnlocked.includes(achievement.id);
      if (isUnlocked || !isAchievementConditionMet(achievement, profile)) return;
      unlockAchievement(achievement, profile, reason);
    });
  } finally {
    checkingAchievements = false;
  }
}

function isAchievementConditionMet(achievement, profile) {
  if (achievement.testOnly) return false;
  return getAchievementProgress(achievement, profile).isComplete;
}

function hasAnyCorrectQuizAnswer(profile) {
  return Object.values(profile.articleProgress || {}).some((entry) => normalizeCounter(entry.articleCorrectCount) > 0)
    || Object.values(profile.nounVerbProgress || {}).some((entry) => normalizeCounter(entry.correctCount) > 0)
    || Object.values(profile.meaningMatchProgress || {}).some((entry) => normalizeCounter(entry.correctCount) > 0);
}

function getNounVerbCorrectAnswerCount(profile) {
  return Object.values(profile.nounVerbProgress || {}).reduce((total, entry) => {
    return total + normalizeCounter(entry.correctCount);
  }, 0);
}

function unlockAchievement(achievement, profile, reason = "") {
  if (achievement.scope === "family") {
    profileStore.familyAchievementsUnlocked.push(achievement.id);
    showAchievementCelebration(achievement);
    return;
  }

  profile.achievementsUnlocked.push(achievement.id);
  if (achievement.reward > 0) {
    profile.coins = normalizeCoinCount(profile.coins) + achievement.reward;
    awardLevelBonusIfNeeded(profile);
    celebrateFamilyLevelIfNeeded();
  }
  showAchievementCelebration(achievement);
  if (reason !== "coins") checkAchievements("achievement-reward");
}

function showAchievementCelebration(achievement) {
  els.levelCelebrationTitle.textContent = "🎉 Achievement Unlocked!";
  els.levelCelebrationProfile.textContent = achievement.scope === "family" ? "Family achievement:" : "Achievement:";
  els.levelCelebrationLevel.textContent = `${achievement.icon} ${achievement.name}`;
  if (achievement.reward > 0) {
    els.levelCelebrationBonus.textContent = `+${achievement.reward} Bonus ${achievement.reward === 1 ? "Coin" : "Coins"}`;
    els.levelCelebrationBonus.classList.remove("hidden");
  } else {
    els.levelCelebrationBonus.textContent = "Celebration only";
    els.levelCelebrationBonus.classList.remove("hidden");
  }
  els.levelCelebration.classList.remove("hidden");
}

async function testPersonalAchievement() {
  if (!currentProfileId) return;
  const achievement = getAchievementById("test-personal-achievement");
  const profile = getCurrentProfile();
  if (!achievement || !profile) return;
  profile.achievementsUnlocked = normalizeAchievementList(profile.achievementsUnlocked);
  if (!profile.achievementsUnlocked.includes(achievement.id)) {
    profile.achievementsUnlocked.push(achievement.id);
    profile.coins = normalizeCoinCount(profile.coins) + achievement.reward;
    showAchievementCelebration(achievement);
  } else {
    showAchievementCelebration(achievement);
  }
  awardLevelBonusIfNeeded(profile);
  celebrateFamilyLevelIfNeeded();
  saveProfileStore();
  await saveProfileStoreToCloudNow();
  renderAchievements();
  if (currentView === "achievements") renderAchievementCollection();
  renderCoinLeaderboard();
  renderAchievementDebugPanel();
}

async function testFamilyAchievement() {
  const achievement = getAchievementById("test-family-achievement");
  if (!achievement || !profileStore) return;
  profileStore.familyAchievementsUnlocked = normalizeAchievementList(profileStore.familyAchievementsUnlocked);
  if (!profileStore.familyAchievementsUnlocked.includes(achievement.id)) {
    profileStore.familyAchievementsUnlocked.push(achievement.id);
  }
  Object.values(profileStore.profiles || {}).forEach((profile) => {
    profile.achievementsUnlocked = normalizeAchievementList(profile.achievementsUnlocked);
    if (!profile.achievementsUnlocked.includes(achievement.id)) {
      profile.achievementsUnlocked.push(achievement.id);
    }
  });
  promoteFamilyAchievements(profileStore);
  showAchievementCelebration(achievement);
  saveProfileStore();
  await saveProfileStoreToCloudNow();
  renderAchievements();
  if (currentView === "achievements") renderAchievementCollection();
  renderAchievementDebugPanel();
}

function recordDailyActivity(type, details = {}) {
  if (!currentProfileId) return;
  const profile = getCurrentProfile();
  prepareProfileDailyState(profile);

  if (type === "article") {
    const dailyChallenge = getDailyChallengeForDate(profile.dailyChallenge.date);
    profile.dailyChallenge.articleQuestions += 1;
    if (details.isCorrect) profile.dailyChallenge.correctArticleAnswers += 1;
    profile.streak.articleQuestions += 1;
    const challengeProgress = getDailyChallengeProgress(profile.dailyChallenge, dailyChallenge);
    if (!profile.dailyChallenge.completed && challengeProgress.raw >= dailyChallenge.goal) {
      profile.dailyChallenge.completed = true;
      awardCoins(dailyChallenge.reward);
      showDailyChallengeComplete(dailyChallenge);
    }
  }

  if (type === "vocabulary") {
    profile.streak.vocabularyCards += 1;
  }

  updateStreakQualification(profile);
  checkAchievements("daily-activity");
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

function getVocabularyProgressEntry(card) {
  const entry = vocabularyProgress[card.id] || {};
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
    status: normalizeVocabularyMasteryStatus(entry.status, { correctCount })
  };
}

function getVocabularyMasteryStatus(card) {
  return getVocabularyProgressEntry(card).status;
}

function getVocabularyLastAnsweredMs(card) {
  const lastAnswered = Date.parse(getVocabularyProgressEntry(card).lastAnsweredAt);
  return Number.isFinite(lastAnswered) ? lastAnswered : 0;
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

function getWordLearningSummary() {
  return cards.reduce(
    (total, card) => {
      total[getVocabularyMasteryStatus(card)] += 1;
      return total;
    },
    { new: 0, learned: 0, mastered: 0 }
  );
}

function getWordsLearnedCount() {
  return cards.filter((card) => {
    const meaningKnown = getMeaningStatus(card) === "known";
    const articleKnown = !card.isNoun || ["learned", "mastered"].includes(getArticleStatus(card));
    return meaningKnown && articleKnown;
  }).length;
}

function resetNounVerbQuizState() {
  nounVerbQuizState = {
    currentQuestionId: "",
    selectedAnswer: "",
    hasAnswered: false,
    currentChoices: []
  };
}

function getCurrentNounVerbPair() {
  if (!nounVerbQuizState.currentQuestionId) return null;
  return visibleNounVerbPairs.find((pair) => pair.id === nounVerbQuizState.currentQuestionId) || null;
}

function generateNounVerbQuestion(reason, targetIndex = nounVerbCurrentIndex) {
  if (!visibleNounVerbPairs.length) {
    resetNounVerbQuizState();
    console.log("Noun-verb question generated", {
      currentQuestionId: "",
      reason,
      availableQuestions: 0
    });
    return;
  }

  nounVerbCurrentIndex = clamp(targetIndex, 0, visibleNounVerbPairs.length - 1);
  const pair = visibleNounVerbPairs[nounVerbCurrentIndex];
  nounVerbQuizState = {
    currentQuestionId: pair.id,
    selectedAnswer: "",
    hasAnswered: false,
    currentChoices: buildNounVerbChoices(pair)
  };
  rememberNounVerbQuestion(pair);
  console.log("Noun-verb question generated", {
    currentQuestionId: pair.id,
    noun: pair.noun,
    reason,
    phrase: pair.phrase
  });
}

function renderNounVerbQuiz() {
  const pair = getCurrentNounVerbPair();
  const hasPair = Boolean(pair);
  if (hasPair) {
    nounVerbCurrentIndex = visibleNounVerbPairs.findIndex((item) => item.id === pair.id);
  }
  els.nounVerbTitle.textContent = "Noun-Verb Pairs";
  els.vocabularyReviewDebug.classList.add("hidden");
  els.nounVerbInstruction.textContent = "Choose the verb";
  els.nounVerbStage.classList.toggle("noun-verb-result-visible", nounVerbQuizState.hasAnswered);
  els.showAnswer.classList.add("hidden");
  els.ratingButtons.classList.add("hidden");
  els.previousCard.disabled = visibleNounVerbPairs.length < 2;
  els.nextCard.disabled = visibleNounVerbPairs.length < 2;
  els.nounVerbEmptyState.classList.toggle("hidden", hasPair);
  els.nounVerbPrompt.classList.toggle("hidden", !hasPair);
  els.nounVerbOptions.classList.toggle("hidden", !hasPair);
  els.nounVerbResult.classList.add("hidden");
  els.nounVerbNext.classList.add("hidden");
  els.nounVerbEmptyState.querySelector("h2").textContent = "No noun-verb pairs available";
  els.nounVerbEmptyState.querySelector("p").textContent = "Make sure nomen_verb_verbindungen.csv is uploaded.";
  els.nounVerbCounter.textContent = hasPair
    ? `Card ${nounVerbCurrentIndex + 1} of ${visibleNounVerbPairs.length}`
    : "0 / 0";
  if (!pair) {
    els.nounVerbPrompt.textContent = "No noun-verb pairs";
    els.nounVerbOptions.replaceChildren();
    return;
  }

  els.nounVerbPrompt.textContent = buildNounVerbPrompt(pair);
  els.nounVerbOptions.replaceChildren(
    ...nounVerbQuizState.currentChoices.map((verb) => {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.verb = verb;
      button.textContent = verb;
      button.disabled = nounVerbQuizState.hasAnswered;
      button.classList.toggle("correct", nounVerbQuizState.hasAnswered && verb === pair.verb);
      button.classList.toggle(
        "incorrect",
        nounVerbQuizState.hasAnswered && verb === nounVerbQuizState.selectedAnswer && verb !== pair.verb
      );
      return button;
    })
  );

  if (nounVerbQuizState.hasAnswered) renderNounVerbResult(pair);
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
  const pair = getCurrentNounVerbPair();
  if (!pair || nounVerbQuizState.hasAnswered) return;
  const isCorrect = verb === pair.verb;
  nounVerbQuizState.selectedAnswer = verb;
  nounVerbQuizState.hasAnswered = true;
  console.log("Noun-verb answer clicked", {
    currentQuestionId: pair.id,
    selectedAnswer: verb,
    correctAnswer: pair.verb,
    isCorrect
  });
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
  const isCorrect = nounVerbQuizState.selectedAnswer === pair.verb;
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
    button.classList.toggle("incorrect", verb === nounVerbQuizState.selectedAnswer && verb !== pair.verb);
  });
  els.nounVerbNext.classList.add("hidden");
}

function resetVocabularyReviewQuizState() {
  vocabularyReviewQuizState = {
    currentQuestionId: "",
    selectedAnswer: "",
    hasAnswered: false,
    currentChoices: []
  };
}

function getVocabularyReviewCards() {
  return cards;
}

function getCurrentVocabularyReviewCard() {
  if (!vocabularyReviewQuizState.currentQuestionId) return null;
  return visibleVocabularyReviewCards.find((card) => card.id === vocabularyReviewQuizState.currentQuestionId) || null;
}

function applyVocabularyReviewOrder() {
  const currentQuestionId = vocabularyReviewQuizState.currentQuestionId;
  visibleVocabularyReviewCards = applyVocabularyReviewPriorityOrder(getVocabularyReviewCards());
  const currentQuestionIndex = visibleVocabularyReviewCards.findIndex((card) => card.id === currentQuestionId);
  vocabularyReviewCurrentIndex = currentQuestionIndex >= 0
    ? currentQuestionIndex
    : clamp(vocabularyReviewCurrentIndex, 0, Math.max(visibleVocabularyReviewCards.length - 1, 0));
}

function applyVocabularyReviewPriorityOrder(cardList) {
  const recentWordKeys = new Set(recentVocabularyWords);
  const freshCards = cardList.filter((card) => !recentWordKeys.has(getVocabularyReviewWordKey(card)));
  const repeatCards = cardList.filter((card) => recentWordKeys.has(getVocabularyReviewWordKey(card)));
  return [...sortVocabularyReviewCandidates(freshCards), ...sortVocabularyReviewCandidates(repeatCards)];
}

function generateVocabularyReviewQuestion(reason, targetIndex = vocabularyReviewCurrentIndex) {
  if (!visibleVocabularyReviewCards.length) {
    resetVocabularyReviewQuizState();
    console.log("Vocabulary Review question generated", {
      currentQuestionId: "",
      reason,
      availableQuestions: 0
    });
    return;
  }

  vocabularyReviewCurrentIndex = clamp(targetIndex, 0, visibleVocabularyReviewCards.length - 1);
  const card = visibleVocabularyReviewCards[vocabularyReviewCurrentIndex];
  vocabularyReviewQuizState = {
    currentQuestionId: card.id,
    selectedAnswer: "",
    hasAnswered: false,
    currentChoices: buildVocabularyReviewChoices(card)
  };
  rememberVocabularyReviewWord(card);
  console.log("Vocabulary Review question generated", {
    currentQuestionId: card.id,
    reason,
    word: card.word,
    recentVocabularyWords: [...recentVocabularyWords]
  });
}

function renderVocabularyReviewQuiz() {
  const card = getCurrentVocabularyReviewCard();
  const hasCard = Boolean(card);
  if (hasCard) {
    vocabularyReviewCurrentIndex = visibleVocabularyReviewCards.findIndex((item) => item.id === card.id);
  }
  els.nounVerbTitle.textContent = "Vocabulary Review";
  els.vocabularyReviewDebug.classList.remove("hidden");
  els.vocabularyReviewDebug.textContent = `Vocabulary Review Pool: ${cards.length} words · Recent Buffer: ${RECENT_VOCABULARY_WORD_BUFFER} words`;
  els.nounVerbInstruction.textContent = "Choose the English meaning";
  els.nounVerbStage.classList.toggle("noun-verb-result-visible", vocabularyReviewQuizState.hasAnswered);
  els.showAnswer.classList.add("hidden");
  els.ratingButtons.classList.add("hidden");
  els.previousCard.disabled = visibleVocabularyReviewCards.length < 2;
  els.nextCard.disabled = visibleVocabularyReviewCards.length < 2;
  els.nounVerbEmptyState.classList.toggle("hidden", hasCard);
  els.nounVerbPrompt.classList.toggle("hidden", !hasCard);
  els.nounVerbOptions.classList.toggle("hidden", !hasCard);
  els.nounVerbResult.classList.add("hidden");
  els.nounVerbNext.classList.add("hidden");
  els.nounVerbCounter.textContent = hasCard
    ? `Card ${vocabularyReviewCurrentIndex + 1} of ${visibleVocabularyReviewCards.length}`
    : "0 / 0";
  if (!card) {
    els.nounVerbPrompt.textContent = "No vocabulary words";
    els.nounVerbEmptyState.querySelector("h2").textContent = "No vocabulary words available";
    els.nounVerbEmptyState.querySelector("p").textContent = "Make sure vocabulary.csv is uploaded.";
    els.nounVerbOptions.replaceChildren();
    return;
  }

  els.nounVerbPrompt.textContent = card.word;
  els.nounVerbOptions.replaceChildren(
    ...vocabularyReviewQuizState.currentChoices.map((choice, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.vocabularyChoice = choice;
      button.textContent = `${String.fromCharCode(65 + index)}) ${choice}`;
      button.disabled = vocabularyReviewQuizState.hasAnswered;
      button.classList.toggle("correct", vocabularyReviewQuizState.hasAnswered && choice === card.english);
      button.classList.toggle(
        "incorrect",
        vocabularyReviewQuizState.hasAnswered && choice === vocabularyReviewQuizState.selectedAnswer && choice !== card.english
      );
      return button;
    })
  );

  if (vocabularyReviewQuizState.hasAnswered) renderVocabularyReviewResult(card);
}

function buildVocabularyReviewChoices(card) {
  const wrongChoices = shuffleCards(
    Array.from(new Set(cards
      .map((item) => item.english)
      .filter((english) => english && english !== card.english)))
  ).slice(0, 3);
  return shuffleCards([card.english, ...wrongChoices]);
}

function answerVocabularyReviewQuiz(selectedAnswer) {
  const card = getCurrentVocabularyReviewCard();
  if (!card || vocabularyReviewQuizState.hasAnswered) return;
  const isCorrect = selectedAnswer === card.english;
  vocabularyReviewQuizState.selectedAnswer = selectedAnswer;
  vocabularyReviewQuizState.hasAnswered = true;
  updateVocabularyReviewStats(isCorrect);
  if (isCorrect) {
    awardCoins(1);
  }
  updateVocabularyMasteryProgress(card, isCorrect);
  recordStudyHistory("vocabulary-review", card, isCorrect ? "correct" : "wrong");
  recordDailyActivity("vocabulary");
  saveVocabularyProgress();
  renderVocabularyReviewQuiz();
  renderCoinChallenges();
}

function updateVocabularyMasteryProgress(card, isCorrect) {
  const previous = getVocabularyProgressEntry(card);
  const now = new Date().toISOString();
  const correctCount = previous.correctCount + (isCorrect ? 1 : 0);
  const wrongCount = previous.wrongCount + (isCorrect ? 0 : 1);
  const status = isCorrect
    ? correctCount >= 3 ? "mastered" : "learned"
    : previous.status;

  vocabularyProgress[card.id] = {
    ...previous,
    correctCount,
    wrongCount,
    lastAnsweredAt: now,
    lastWrongAt: isCorrect ? previous.lastWrongAt || "" : now,
    status,
    updatedAt: now
  };
}

function updateVocabularyReviewStats(isCorrect) {
  const profile = getCurrentProfile();
  profile.vocabularyReviewStats = normalizeVocabularyReviewStats(profile.vocabularyReviewStats);
  profile.vocabularyReviewStats.answered += 1;
  profile.vocabularyReviewStats[isCorrect ? "correct" : "incorrect"] += 1;
  profile.vocabularyReviewStats.updatedAt = new Date().toISOString();
}

function renderVocabularyReviewResult(card) {
  const isCorrect = vocabularyReviewQuizState.selectedAnswer === card.english;
  els.nounVerbResult.classList.remove("hidden", "success", "error");
  els.nounVerbResult.classList.add(isCorrect ? "success" : "error");
  els.nounVerbResult.innerHTML = `
    <span class="quiz-result-label">${isCorrect ? "✅ Correct" : "❌ Wrong"}</span>
    ${isCorrect ? "" : "<span class=\"quiz-result-correction\">Correct answer:</span>"}
    <span class="quiz-result-answer">${escapeHtml(card.english)}</span>
    <span class="quiz-result-meaning"><strong>German:</strong> ${escapeHtml(card.article ? `${card.article} ${card.word}` : card.word)}</span>
    ${isCorrect ? "<span class=\"quiz-result-reward\"><strong>Reward:</strong> 🪙 +1 Coin</span>" : ""}
  `;
  els.nounVerbOptions.querySelectorAll("button").forEach((button) => {
    const answer = button.dataset.vocabularyChoice;
    button.disabled = true;
    button.classList.toggle("correct", answer === card.english);
    button.classList.toggle("incorrect", answer === vocabularyReviewQuizState.selectedAnswer && answer !== card.english);
  });
  els.nounVerbNext.classList.add("hidden");
}

function moveVocabularyReviewCard(direction) {
  applyVocabularyReviewOrder();
  if (!visibleVocabularyReviewCards.length) {
    generateVocabularyReviewQuestion(direction > 0 ? "next/skip" : "previous", 0);
    renderVocabularyReviewQuiz();
    return;
  }
  vocabularyReviewCurrentIndex = direction > 0
    ? getNextVocabularyReviewIndex()
    : (vocabularyReviewCurrentIndex - 1 + visibleVocabularyReviewCards.length) % visibleVocabularyReviewCards.length;
  generateVocabularyReviewQuestion(direction > 0 ? "next/skip" : "previous", vocabularyReviewCurrentIndex);
  renderVocabularyReviewQuiz();
}

function getNextVocabularyReviewIndex() {
  if (visibleVocabularyReviewCards.length < 2) return vocabularyReviewCurrentIndex;
  const currentId = vocabularyReviewQuizState.currentQuestionId || visibleVocabularyReviewCards[vocabularyReviewCurrentIndex]?.id || "";
  const currentWordKey = getVocabularyReviewWordKey(visibleVocabularyReviewCards[vocabularyReviewCurrentIndex]);
  const recentWordKeys = new Set(recentVocabularyWords);
  const wrongWaitKeys = new Set(recentVocabularyWords.slice(0, WRONG_VOCABULARY_WAIT_BUFFER));
  const candidates = visibleVocabularyReviewCards
    .map((card, index) => ({ card, index }))
    .filter(({ card }) => card.id !== currentId && getVocabularyReviewWordKey(card) !== currentWordKey);

  const freshCandidates = candidates.filter(({ card }) => !recentWordKeys.has(getVocabularyReviewWordKey(card)));
  const outsideWrongWaitCandidates = candidates.filter(({ card }) => !wrongWaitKeys.has(getVocabularyReviewWordKey(card)));
  const selectedIndex = pickVocabularyReviewCandidateIndex(freshCandidates)
    ?? pickVocabularyReviewCandidateIndex(outsideWrongWaitCandidates)
    ?? pickVocabularyReviewCandidateIndex(candidates)
    ?? vocabularyReviewCurrentIndex;

  const selectedCard = visibleVocabularyReviewCards[selectedIndex];
  console.log("Vocabulary Review item selected", {
    selectedItemId: selectedCard?.id || "",
    word: selectedCard?.word || "",
    recentVocabularyWords: [...recentVocabularyWords],
    reasonSelected: freshCandidates.some(({ index }) => index === selectedIndex)
      ? "selected outside recentVocabularyWords"
      : "recent repeat allowed because no fresh candidate was available"
  });
  return selectedIndex;
}

function pickVocabularyReviewCandidateIndex(candidates) {
  if (!candidates.length) return null;
  const ordered = sortVocabularyReviewCandidates(candidates.map(({ card }) => card));
  const selectedCard = ordered[0];
  return candidates.find(({ card }) => card.id === selectedCard?.id)?.index ?? null;
}

function sortVocabularyReviewCandidates(cardList) {
  const newCards = [];
  const learned = [];
  const mastered = [];

  cardList.forEach((card) => {
    const status = getVocabularyMasteryStatus(card);
    if (status === "mastered") mastered.push(card);
    else if (status === "learned") learned.push(card);
    else newCards.push(card);
  });

  const randomizedNewCards = shuffleCards(newCards);
  const randomizedLearned = shuffleCards(learned)
    .sort((first, second) => getVocabularyProgressEntry(first).correctCount - getVocabularyProgressEntry(second).correctCount);
  const randomizedMastered = shuffleCards(mastered)
    .sort((first, second) => getVocabularyLastAnsweredMs(first) - getVocabularyLastAnsweredMs(second));

  const occasionalMastered = randomizedMastered.filter((_, index) => index % 6 === 0);
  return [...randomizedNewCards, ...randomizedLearned, ...occasionalMastered, ...randomizedMastered.filter((_, index) => index % 6 !== 0)];
}

function rememberVocabularyReviewWord(card) {
  const wordKey = getVocabularyReviewWordKey(card);
  if (!wordKey) return;
  recentVocabularyWords = [
    wordKey,
    ...recentVocabularyWords.filter((key) => key !== wordKey)
  ].slice(0, RECENT_VOCABULARY_WORD_BUFFER);
}

function getVocabularyReviewWordKey(card) {
  return card?.word ? getSortKey(card.word) : "";
}

function moveNounVerbCard(direction) {
  if (!visibleNounVerbPairs.length) return;
  if (direction > 0) applyNounVerbSmartOrder();
  const nextIndex = direction > 0
    ? getNextNounVerbIndex()
    : (nounVerbCurrentIndex - 1 + visibleNounVerbPairs.length) % visibleNounVerbPairs.length;
  console.log("Noun-verb Next clicked", {
    direction,
    fromQuestionId: nounVerbQuizState.currentQuestionId,
    hasAnswered: nounVerbQuizState.hasAnswered,
    nextIndex
  });
  generateNounVerbQuestion(direction > 0 ? "next/skip" : "previous", nextIndex);
  saveNounVerbPosition();
  renderNounVerbQuiz();
}

function applyNounVerbSmartOrder() {
  const currentQuestionId = nounVerbQuizState.currentQuestionId;
  visibleNounVerbPairs = applyNounVerbPriorityOrder(nounVerbPairs);
  const currentQuestionIndex = visibleNounVerbPairs.findIndex((pair) => pair.id === currentQuestionId);
  nounVerbCurrentIndex = currentQuestionIndex >= 0
    ? currentQuestionIndex
    : clamp(nounVerbCurrentIndex, 0, Math.max(visibleNounVerbPairs.length - 1, 0));
}

function resetMeaningMatchQuizState() {
  meaningMatchQuizState = {
    currentQuestionId: "",
    selectedIndex: -1,
    hasAnswered: false,
    currentPrompt: "",
    currentTemplateId: "",
    currentChoices: []
  };
}

function getCurrentMeaningMatchPair() {
  if (!meaningMatchQuizState.currentQuestionId) return null;
  return visibleMeaningMatchPairs.find((pair) => pair.id === meaningMatchQuizState.currentQuestionId) || null;
}

function generateMeaningMatchQuestion(reason, targetIndex = meaningMatchCurrentIndex) {
  if (!visibleMeaningMatchPairs.length) {
    resetMeaningMatchQuizState();
    console.log("Meaning Match question generated", {
      currentQuestionId: "",
      reason,
      availableQuestions: 0
    });
    return;
  }

  meaningMatchCurrentIndex = clamp(targetIndex, 0, visibleMeaningMatchPairs.length - 1);
  const pair = visibleMeaningMatchPairs[meaningMatchCurrentIndex];
  const questionData = buildMeaningMatchQuestionData(pair);
  meaningMatchQuizState = {
    currentQuestionId: pair.id,
    selectedIndex: -1,
    hasAnswered: false,
    currentPrompt: questionData.prompt,
    currentTemplateId: questionData.templateId,
    currentChoices: questionData.choices
  };
  rememberMeaningMatchQuestion(pair);
  rememberMeaningMatchTemplate(questionData.templateId);
  console.log("Meaning Match question generated", {
    selectedItemId: pair.id,
    reason,
    phrase: pair.phrase,
    templateId: questionData.templateId,
    recentMeaningMatchItems: [...recentMeaningMatchItems]
  });
}

function renderMeaningMatchQuiz() {
  const pair = getCurrentMeaningMatchPair();
  const hasPair = Boolean(pair);
  if (hasPair) {
    meaningMatchCurrentIndex = visibleMeaningMatchPairs.findIndex((item) => item.id === pair.id);
  }
  els.nounVerbTitle.textContent = "Meaning Match";
  els.vocabularyReviewDebug.classList.remove("hidden");
  els.vocabularyReviewDebug.textContent = `Meaning Match Pool: ${meaningMatchItems.filter(isMeaningMatchEligiblePair).length} · Recent History: ${recentMeaningMatchItems.length} / ${MEANING_MATCH_RECENT_BUFFER}`;
  els.nounVerbInstruction.textContent = "Choose the better German sentence";
  els.nounVerbStage.classList.toggle("noun-verb-result-visible", meaningMatchQuizState.hasAnswered);
  els.showAnswer.classList.add("hidden");
  els.ratingButtons.classList.add("hidden");
  els.previousCard.disabled = visibleMeaningMatchPairs.length < 2;
  els.nextCard.disabled = visibleMeaningMatchPairs.length < 2;
  els.nounVerbEmptyState.classList.toggle("hidden", hasPair);
  els.nounVerbPrompt.classList.toggle("hidden", !hasPair);
  els.nounVerbOptions.classList.toggle("hidden", !hasPair);
  els.nounVerbResult.classList.add("hidden");
  els.nounVerbNext.classList.add("hidden");
  els.nounVerbEmptyState.querySelector("h2").textContent = "No meaning match questions";
  els.nounVerbEmptyState.querySelector("p").textContent = "Make sure meaning_match_items.csv is uploaded.";
  els.nounVerbCounter.textContent = hasPair
    ? `Card ${meaningMatchCurrentIndex + 1} of ${visibleMeaningMatchPairs.length}`
    : "0 / 0";
  if (!pair) {
    els.nounVerbPrompt.textContent = "No meaning match questions";
    els.nounVerbOptions.replaceChildren();
    return;
  }

  els.nounVerbPrompt.textContent = meaningMatchQuizState.currentPrompt || buildMeaningMatchEnglishPrompt(pair);
  els.nounVerbOptions.replaceChildren(
    ...meaningMatchQuizState.currentChoices.map((choice, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.meaningChoice = String(index);
      button.textContent = `${index === 0 ? "A" : "B"}) ${choice.sentence}`;
      button.disabled = meaningMatchQuizState.hasAnswered;
      button.classList.toggle("correct", meaningMatchQuizState.hasAnswered && choice.isCorrect);
      button.classList.toggle(
        "incorrect",
        meaningMatchQuizState.hasAnswered && index === meaningMatchQuizState.selectedIndex && !choice.isCorrect
      );
      return button;
    })
  );

  if (meaningMatchQuizState.hasAnswered) renderMeaningMatchResult(pair);
}

function buildMeaningMatchEnglishPrompt(pair) {
  return pair?.englishSentence || "";
}

function getMeaningMatchMeaning(pair) {
  return String(pair.englishMeaning || pair.english || pair.phrase || "")
    .split(";")[0]
    .replace(/^to\s+/i, "")
    .trim() || pair.phrase;
}

function buildMeaningMatchQuestionData(pair) {
  if (!isMeaningMatchEligiblePair(pair)) {
    return {
      prompt: "",
      templateId: "",
      choices: []
    };
  }
  return {
    prompt: pair.englishSentence,
    templateId: pair.templateId || "curated",
    choices: shuffleCards([
      { sentence: pair.correctGermanSentence, isCorrect: true },
      { sentence: pair.wrongGermanSentence, isCorrect: false }
    ])
  };
}

function buildMeaningMatchChoices(pair) {
  return buildMeaningMatchQuestionData(pair).choices;
}

function getMeaningMatchCorrectSentence(pair) {
  return pair?.correctGermanSentence || "";
}

function getMeaningMatchWrongVerb(pair, template = null) {
  const sameNounVerbs = getMeaningMatchVerbsForNoun(pair.noun);
  const verbs = Array.from(new Set(nounVerbPairs
    .map((item) => item.verb)
    .filter((verb) => {
      if (!verb || verb === pair.verb || sameNounVerbs.has(verb.toLowerCase())) return false;
      if (template?.type === "perfect" && !hasReliableGermanParticiple(verb)) return false;
      return true;
    })))
    .sort((first, second) => first.localeCompare(second, "de"));
  if (!verbs.length) return "";
  return verbs[getStableHash(pair.id || pair.phrase || pair.verb) % verbs.length];
}

function buildMeaningMatchWrongSentence(pair, wrongVerb, correctSentence) {
  if (pair?.wrongGermanSentence) return pair.wrongGermanSentence;
  const escapedVerb = escapeRegExp(pair.verb);
  const verbPattern = new RegExp(escapedVerb, "i");
  if (verbPattern.test(correctSentence)) return correctSentence.replace(verbPattern, wrongVerb);
  return "";
}

function buildMeaningMatchWrongPhrase(pair, wrongVerb) {
  const escapedVerb = escapeRegExp(pair.verb);
  const verbPattern = new RegExp(escapedVerb, "i");
  return getMeaningMatchCleanPhrase(pair).replace(verbPattern, wrongVerb);
}

function getMeaningMatchCleanPhrase(pair) {
  return String(pair.phrase || "")
    .replace(/[.!?]+$/g, "")
    .trim();
}

function getMeaningMatchGeneratedItem(pair) {
  if (!pair?.id) return null;
  if (meaningMatchGeneratedItems.has(pair.id)) return meaningMatchGeneratedItems.get(pair.id);
  const generatedItem = createMeaningMatchGeneratedItem(pair);
  meaningMatchGeneratedItems.set(pair.id, generatedItem);
  return generatedItem;
}

function createMeaningMatchGeneratedItem(pair) {
  if (!isMeaningMatchMeaningSafe(pair)) return null;
  const template = getMeaningMatchTemplate(pair);
  if (!template) return null;
  const meaning = getMeaningMatchMeaningForms(pair);
  const correctPhrase = getMeaningMatchCleanPhrase(pair);
  const wrongVerb = getMeaningMatchWrongVerb(pair, template);
  if (!wrongVerb) return null;
  const wrongPhrase = buildMeaningMatchWrongPhrase(pair, wrongVerb);
  if (!wrongPhrase || wrongPhrase === correctPhrase) return null;
  const correctGermanSentence = buildMeaningMatchSentence(template, pair.verb, correctPhrase);
  const wrongGermanSentence = buildMeaningMatchSentence(template, wrongVerb, wrongPhrase);
  const englishSentence = template.english(meaning);
  if (!isMeaningMatchSentenceQualitySafe(englishSentence, correctGermanSentence, wrongGermanSentence)) return null;
  return {
    phrase: pair.phrase,
    englishSentence,
    correctGermanSentence,
    wrongGermanSentence,
    templateId: template.id
  };
}

function buildMeaningMatchSentence(template, verb, phrase) {
  if (template.type !== "perfect") return template.german({ phrase });
  const aux = getGermanPerfectAuxiliaryForms(verb);
  return template.german({
    aux,
    phrase: buildMeaningMatchPerfectPhrase(phrase, verb)
  });
}

function getMeaningMatchMeaningForms(pair) {
  const base = getMeaningMatchMeaning(pair);
  return {
    base,
    past: getEnglishPastMeaning(base)
  };
}

function getEnglishPastMeaning(meaning) {
  const words = String(meaning || "").trim().split(/\s+/);
  const verb = words.shift() || "";
  const rest = words.length ? ` ${words.join(" ")}` : "";
  const irregular = {
    be: "was",
    become: "became",
    bring: "brought",
    catch: "caught",
    cancel: "canceled",
    come: "came",
    contribute: "contributed",
    do: "did",
    file: "filed",
    feel: "felt",
    find: "found",
    get: "got",
    give: "gave",
    go: "went",
    have: "had",
    hold: "held",
    keep: "kept",
    lay: "laid",
    lead: "led",
    make: "made",
    meet: "met",
    pay: "paid",
    put: "put",
    raise: "raised",
    reach: "reached",
    say: "said",
    see: "saw",
    set: "set",
    spend: "spent",
    submit: "submitted",
    apologize: "apologized",
    take: "took",
    win: "won"
  };
  return `${irregular[verb.toLowerCase()] || regularEnglishPast(verb)}${rest}`;
}

function regularEnglishPast(verb) {
  if (!verb) return "";
  if (/e$/i.test(verb)) return `${verb}d`;
  if (/[^aeiou]y$/i.test(verb)) return `${verb.slice(0, -1)}ied`;
  if (/([bcdfghjklmnpqrstvwxyz])$/i.test(verb) && /[aeiou][bcdfghjklmnpqrstvwxyz]$/i.test(verb)) return `${verb}${verb.slice(-1)}ed`;
  return `${verb}ed`;
}

function capitalizeFirst(value) {
  const text = String(value || "");
  return text ? `${text.charAt(0).toUpperCase()}${text.slice(1)}` : "";
}

function buildMeaningMatchPerfectPhrase(phrase, verb) {
  const escapedVerb = escapeRegExp(verb);
  return phrase.replace(new RegExp(`${escapedVerb}$`, "i"), getGermanParticiple(verb));
}

function getGermanPerfectAuxiliaryForms(verb) {
  const seinVerbs = new Set(["bleiben", "fahren", "fallen", "fliehen", "gehen", "gelangen", "geraten", "kommen", "laufen", "passieren", "reisen", "springen", "steigen", "sterben", "treten", "wachsen", "werden"]);
  const isSein = seinVerbs.has(String(verb || "").toLowerCase());
  return isSein
    ? { he: "ist", she: "ist", we: "sind", they: "sind" }
    : { he: "hat", she: "hat", we: "haben", they: "haben" };
}

function getGermanParticiple(verb) {
  const normalized = String(verb || "").toLowerCase();
  const participles = {
    abgeben: "abgegeben",
    ablegen: "abgelegt",
    ableisten: "abgeleistet",
    aufnehmen: "aufgenommen",
    aufstellen: "aufgestellt",
    auslösen: "ausgelöst",
    ausüben: "ausgeübt",
    befolgen: "befolgt",
    bekommen: "bekommen",
    bringen: "gebracht",
    erheben: "erhoben",
    erstatten: "erstattet",
    finden: "gefunden",
    geben: "gegeben",
    gewinnen: "gewonnen",
    halten: "gehalten",
    hegen: "gehegt",
    kündigen: "gekündigt",
    legen: "gelegt",
    leisten: "geleistet",
    machen: "gemacht",
    nehmen: "genommen",
    spenden: "gespendet",
    stellen: "gestellt",
    treffen: "getroffen",
    treten: "getreten",
    üben: "geübt",
    verbringen: "verbracht"
  };
  if (participles[normalized]) return participles[normalized];
  if (/ieren$/.test(normalized)) return normalized.replace(/ieren$/, "iert");
  if (/^(be|emp|ent|er|ge|miss|ver|zer)/.test(normalized)) return `${normalized.replace(/en$/, "")}t`;
  return `ge${normalized.replace(/en$/, "")}t`;
}

function hasReliableGermanParticiple(verb) {
  const normalized = String(verb || "").toLowerCase();
  const knownParticiples = new Set([
    "abgeben", "ablegen", "ableisten", "aufnehmen", "aufstellen", "auslösen", "ausüben",
    "befolgen", "bekommen", "bringen", "erheben", "erstatten", "finden", "geben",
    "gewinnen", "halten", "hegen", "kündigen", "legen", "leisten", "machen", "nehmen",
    "spenden", "stellen", "treffen", "treten", "üben", "verbringen"
  ]);
  if (knownParticiples.has(normalized)) return true;
  if (/ieren$/.test(normalized)) return true;
  return false;
}

function getMeaningMatchTemplate(pair) {
  const recentTemplates = new Set(recentMeaningMatchTemplateIds);
  const compatibleTemplates = MEANING_MATCH_TEMPLATES.filter((template) => isMeaningMatchTemplateCompatible(template, pair));
  const freshTemplates = compatibleTemplates.filter((template) => !recentTemplates.has(template.id));
  const candidates = freshTemplates.length ? freshTemplates : compatibleTemplates;
  if (!candidates.length) return null;
  return candidates[getStableHash(`${pair.id || pair.phrase}::${recentMeaningMatchTemplateIds.join("|")}`) % candidates.length];
}

function isMeaningMatchTemplateCompatible(template, pair) {
  if (template.context && !isMeaningMatchContextCompatible(template.context, pair)) return false;
  if (template.type !== "perfect") return true;
  return canBuildMeaningMatchPerfect(pair) && hasReliableGermanParticiple(pair.verb);
}

function canBuildMeaningMatchPerfect(pair) {
  const phrase = getMeaningMatchCleanPhrase(pair);
  return Boolean(pair?.verb && new RegExp(`${escapeRegExp(pair.verb)}$`, "i").test(phrase));
}

function isMeaningMatchContextCompatible(context, pair) {
  const base = getMeaningMatchMeaning(pair).toLowerCase();
  if (context === "work") {
    return /\b(application|inquiry|order|arrangement|agreement|offer|speech|deposit|police report|claim|contribution|confession|remark|selection|authority|instruction|answer)\b/.test(base);
  }
  if (context === "school") {
    return /\b(answer|question|speech|claim|contribution|selection|decision|action|remark|inquiry|application)\b/.test(base);
  }
  if (context === "family") {
    return /\b(dinner|bath|evening|goodbye|selection|decision|arrangement|help|deposit|appointment|conversation)\b/.test(base);
  }
  return true;
}

function isMeaningMatchMeaningSafe(pair) {
  const meaning = getMeaningMatchMeaning(pair).toLowerCase();
  if (!meaning || meaning.length < 3) return false;
  if (/^(be|being)\b/.test(meaning)) return false;
  if (/\b(on|of|from|to|for|with|against|about|at|in)$/i.test(meaning)) return false;
  if (/\bsomeone\b|\bsomething\b|\bsomebody\b|\bone's\b/.test(meaning)) return false;
  return true;
}

function isMeaningMatchSentenceQualitySafe(englishSentence, correctGermanSentence, wrongGermanSentence) {
  const sentence = englishSentence.toLowerCase();
  const blockedPhrases = [
    "make confusion",
    "do an application",
    "do a application",
    "cause an application",
    "make an accident",
    "take a decision"
  ];
  if (blockedPhrases.some((phrase) => sentence.includes(phrase))) return false;
  if (!correctGermanSentence || !wrongGermanSentence || correctGermanSentence === wrongGermanSentence) return false;
  return true;
}

function rememberMeaningMatchTemplate(templateId) {
  if (!templateId) return;
  recentMeaningMatchTemplateIds = [
    templateId,
    ...recentMeaningMatchTemplateIds.filter((id) => id !== templateId)
  ].slice(0, 3);
}

function isMeaningMatchEligiblePair(pair) {
  return isMeaningMatchCuratedItemValid(pair);
}

function doesPhraseContainVerb(phrase, verb) {
  return new RegExp(`(^|\\s)${escapeRegExp(verb)}($|\\s|[.!?])`, "i").test(phrase);
}

function getMeaningMatchVerbsForNoun(noun) {
  const nounKey = getSortKey(noun || "");
  return new Set(nounVerbPairs
    .filter((item) => getSortKey(item.noun || "") === nounKey)
    .map((item) => item.verb.toLowerCase())
    .filter(Boolean));
}

function answerMeaningMatchQuiz(choiceIndex) {
  const pair = getCurrentMeaningMatchPair();
  if (!pair || meaningMatchQuizState.hasAnswered) return;
  const choice = meaningMatchQuizState.currentChoices[choiceIndex];
  if (!choice) return;
  meaningMatchQuizState.selectedIndex = choiceIndex;
  meaningMatchQuizState.hasAnswered = true;
  const isCorrect = Boolean(choice.isCorrect);
  updateMeaningMatchLearningProgress(pair, isCorrect);
  if (isCorrect) awardCoins(2);
  recordStudyHistory("meaning-match", pair, isCorrect ? "correct" : "wrong");
  saveMeaningMatchProgress();
  renderMeaningMatchQuiz();
  renderCoinChallenges();
}

function renderMeaningMatchResult(pair) {
  const choice = meaningMatchQuizState.currentChoices[meaningMatchQuizState.selectedIndex];
  const isCorrect = Boolean(choice?.isCorrect);
  const correctChoice = meaningMatchQuizState.currentChoices.find((item) => item.isCorrect);
  const correctSentence = correctChoice?.sentence || getMeaningMatchCorrectSentence(pair);
  els.nounVerbResult.classList.remove("hidden", "success", "error");
  els.nounVerbResult.classList.add(isCorrect ? "success" : "error");
  els.nounVerbResult.innerHTML = isCorrect
    ? `
      <span class="quiz-result-label">✅ Correct</span>
      <span class="quiz-result-meaning">${escapeHtml(getMeaningMatchMeaning(pair))}</span>
      <span class="quiz-result-answer">${escapeHtml(pair.phrase)}</span>
      <span class="quiz-result-meaning"><strong>Example:</strong> ${escapeHtml(correctSentence)}</span>
      <span class="quiz-result-reward"><strong>Reward:</strong> 🪙🪙 +2 Coins</span>
    `
    : `
      <span class="quiz-result-label">❌ Wrong</span>
      <span class="quiz-result-correction">Correct answer:</span>
      <span class="quiz-result-answer">${escapeHtml(correctSentence)}</span>
      <span class="quiz-result-meaning"><strong>Meaning:</strong> ${escapeHtml(getMeaningMatchMeaning(pair))}</span>
    `;
  els.nounVerbOptions.querySelectorAll("button").forEach((button) => {
    const index = Number(button.dataset.meaningChoice);
    const option = meaningMatchQuizState.currentChoices[index];
    button.disabled = true;
    button.classList.toggle("correct", Boolean(option?.isCorrect));
    button.classList.toggle("incorrect", index === meaningMatchQuizState.selectedIndex && !option?.isCorrect);
  });
  els.nounVerbNext.classList.add("hidden");
}

function moveMeaningMatchCard(direction) {
  if (!visibleMeaningMatchPairs.length) return;
  if (direction > 0) applyMeaningMatchSmartOrder();
  const nextIndex = direction > 0
    ? getNextMeaningMatchIndex()
    : (meaningMatchCurrentIndex - 1 + visibleMeaningMatchPairs.length) % visibleMeaningMatchPairs.length;
  console.log("Meaning Match Next clicked", {
    direction,
    fromQuestionId: meaningMatchQuizState.currentQuestionId,
    nextIndex,
    recentMeaningMatchItems: [...recentMeaningMatchItems]
  });
  generateMeaningMatchQuestion(direction > 0 ? "next/skip" : "previous", nextIndex);
  renderMeaningMatchQuiz();
}

function resetPrepositionQuizState() {
  prepositionQuizState = {
    currentQuestionId: "",
    selectedAnswer: "",
    hasAnswered: false,
    currentChoices: []
  };
}

function getCurrentPrepositionItem() {
  if (!prepositionQuizState.currentQuestionId) return null;
  return visiblePrepositionItems.find((item) => item.id === prepositionQuizState.currentQuestionId) || null;
}

function applyPrepositionOrder() {
  const currentQuestionId = prepositionQuizState.currentQuestionId;
  visiblePrepositionItems = applyPrepositionPriorityOrder(prepositionItems);
  const currentQuestionIndex = visiblePrepositionItems.findIndex((item) => item.id === currentQuestionId);
  prepositionCurrentIndex = currentQuestionIndex >= 0
    ? currentQuestionIndex
    : clamp(prepositionCurrentIndex, 0, Math.max(visiblePrepositionItems.length - 1, 0));
}

function applyPrepositionPriorityOrder(itemList) {
  const newItems = [];
  const learned = [];
  const mastered = [];

  itemList.forEach((item) => {
    const status = getPrepositionStatus(item);
    if (status === "mastered") mastered.push(item);
    else if (status === "learned") learned.push(item);
    else newItems.push(item);
  });

  const randomizedNewItems = shuffleCards(newItems);
  const randomizedLearned = shuffleCards(learned)
    .sort((first, second) => getPrepositionProgressEntry(first).correctCount - getPrepositionProgressEntry(second).correctCount);
  const randomizedMastered = shuffleCards(mastered)
    .sort((first, second) => getPrepositionLastAnsweredMs(first) - getPrepositionLastAnsweredMs(second));
  const occasionalMastered = randomizedMastered.filter((_, index) => index % 6 === 0);
  return [...randomizedNewItems, ...randomizedLearned, ...occasionalMastered, ...randomizedMastered.filter((_, index) => index % 6 !== 0)];
}

function generatePrepositionQuestion(reason, targetIndex = prepositionCurrentIndex) {
  if (!visiblePrepositionItems.length) {
    resetPrepositionQuizState();
    console.log("Preposition question generated", {
      currentQuestionId: "",
      reason,
      availableQuestions: 0
    });
    return;
  }

  prepositionCurrentIndex = clamp(targetIndex, 0, visiblePrepositionItems.length - 1);
  const item = visiblePrepositionItems[prepositionCurrentIndex];
  prepositionQuizState = {
    currentQuestionId: item.id,
    selectedAnswer: "",
    hasAnswered: false,
    currentChoices: shuffleCards([item.correct, item.wrong1, item.wrong2, item.wrong3])
  };
  console.log("Preposition question generated", {
    currentQuestionId: item.id,
    reason,
    sentence: item.sentence
  });
}

function renderPrepositionQuiz() {
  const item = getCurrentPrepositionItem();
  const hasItem = Boolean(item);
  if (hasItem) {
    prepositionCurrentIndex = visiblePrepositionItems.findIndex((entry) => entry.id === item.id);
  }
  els.nounVerbTitle.textContent = "Preposition Master";
  els.vocabularyReviewDebug.classList.add("hidden");
  els.nounVerbInstruction.textContent = "Choose the preposition";
  els.nounVerbStage.classList.toggle("noun-verb-result-visible", prepositionQuizState.hasAnswered);
  els.showAnswer.classList.add("hidden");
  els.ratingButtons.classList.add("hidden");
  els.previousCard.disabled = visiblePrepositionItems.length < 2;
  els.nextCard.disabled = visiblePrepositionItems.length < 2;
  els.nounVerbEmptyState.classList.toggle("hidden", hasItem);
  els.nounVerbPrompt.classList.toggle("hidden", !hasItem);
  els.nounVerbOptions.classList.toggle("hidden", !hasItem);
  els.nounVerbResult.classList.add("hidden");
  els.nounVerbNext.classList.add("hidden");
  els.nounVerbEmptyState.querySelector("h2").textContent = "No preposition questions";
  els.nounVerbEmptyState.querySelector("p").textContent = "Make sure prepositions.csv is uploaded.";
  els.nounVerbCounter.textContent = hasItem
    ? `Card ${prepositionCurrentIndex + 1} of ${visiblePrepositionItems.length}`
    : "0 / 0";
  if (!item) {
    els.nounVerbPrompt.textContent = "No preposition questions";
    els.nounVerbOptions.replaceChildren();
    return;
  }

  els.nounVerbPrompt.textContent = item.sentence;
  els.nounVerbOptions.replaceChildren(
    ...prepositionQuizState.currentChoices.map((choice, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.prepositionChoice = choice;
      button.textContent = `${String.fromCharCode(65 + index)}) ${choice}`;
      button.disabled = prepositionQuizState.hasAnswered;
      button.classList.toggle("correct", prepositionQuizState.hasAnswered && choice === item.correct);
      button.classList.toggle(
        "incorrect",
        prepositionQuizState.hasAnswered && choice === prepositionQuizState.selectedAnswer && choice !== item.correct
      );
      return button;
    })
  );

  if (prepositionQuizState.hasAnswered) renderPrepositionResult(item);
}

function normalizePrepositionAnswer(value) {
  return String(value || "").trim().toLowerCase();
}

function answerPrepositionQuiz(selectedAnswer) {
  const item = getCurrentPrepositionItem();
  if (!item) return;
  if (prepositionQuizState.hasAnswered) {
    console.log("Preposition answer ignored because question is already answered", {
      currentQuestionId: item.id,
      selectedAnswer,
      correctAnswer: item.correct
    });
    return;
  }

  const normalizedSelected = normalizePrepositionAnswer(selectedAnswer);
  const normalizedCorrect = normalizePrepositionAnswer(item.correct);
  const isCorrect = normalizedSelected === normalizedCorrect;
  prepositionQuizState.selectedAnswer = selectedAnswer;
  prepositionQuizState.hasAnswered = true;

  const progressEntry = updatePrepositionLearningProgress(item, isCorrect);
  let coinsAwarded = 0;
  if (isCorrect) {
    awardCoins(2);
    coinsAwarded = 2;
  }

  console.log("Preposition answer handled", {
    currentQuestionId: item.id,
    selectedAnswer,
    correctAnswer: item.correct,
    isCorrect,
    coinsAwarded,
    progressUpdated: true,
    progress: progressEntry
  });

  recordStudyHistory("prepositions", item, isCorrect ? "correct" : "wrong");
  savePrepositionProgress();
  renderPrepositionQuiz();
  renderCoinChallenges();
  if (currentView === "dashboard") renderDashboard();
}

function renderPrepositionResult(item) {
  const isCorrect = normalizePrepositionAnswer(prepositionQuizState.selectedAnswer) === normalizePrepositionAnswer(item.correct);
  const fullSentence = item.sentence.replace("_____", item.correct);
  els.nounVerbResult.classList.remove("hidden", "success", "error");
  els.nounVerbResult.classList.add(isCorrect ? "success" : "error");
  els.nounVerbResult.innerHTML = `
    <span class="quiz-result-label">${isCorrect ? "✅ Correct" : "❌ Wrong"}</span>
    ${isCorrect ? "" : "<span class=\"quiz-result-correction\">Correct answer:</span>"}
    <span class="quiz-result-answer">${escapeHtml(fullSentence)}</span>
    ${isCorrect ? "<span class=\"quiz-result-reward\"><strong>Reward:</strong> 🪙🪙 +2 Coins</span>" : ""}
  `;
  els.nounVerbOptions.querySelectorAll("button").forEach((button) => {
    const answer = button.dataset.prepositionChoice;
    button.disabled = true;
    button.classList.toggle("correct", answer === item.correct);
    button.classList.toggle("incorrect", answer === prepositionQuizState.selectedAnswer && answer !== item.correct);
  });
  els.nounVerbNext.classList.remove("hidden");
}

function movePrepositionCard(direction) {
  if (!visiblePrepositionItems.length) return;
  if (direction > 0) applyPrepositionOrder();
  prepositionCurrentIndex = direction > 0
    ? (prepositionCurrentIndex + 1) % visiblePrepositionItems.length
    : (prepositionCurrentIndex - 1 + visiblePrepositionItems.length) % visiblePrepositionItems.length;
  generatePrepositionQuestion(direction > 0 ? "next/skip" : "previous", prepositionCurrentIndex);
  renderPrepositionQuiz();
}

function applyMeaningMatchSmartOrder() {
  const currentQuestionId = meaningMatchQuizState.currentQuestionId;
  visibleMeaningMatchPairs = applyMeaningMatchPriorityOrder(meaningMatchItems);
  const currentQuestionIndex = visibleMeaningMatchPairs.findIndex((pair) => pair.id === currentQuestionId);
  meaningMatchCurrentIndex = currentQuestionIndex >= 0
    ? currentQuestionIndex
    : clamp(meaningMatchCurrentIndex, 0, Math.max(visibleMeaningMatchPairs.length - 1, 0));
}

function getNextMeaningMatchIndex() {
  if (visibleMeaningMatchPairs.length < 2) return meaningMatchCurrentIndex;
  const recentItems = new Set(recentMeaningMatchItems);
  const wrongWaitItems = new Set(recentMeaningMatchItems.slice(0, WRONG_MEANING_MATCH_WAIT_BUFFER));
  const currentId = visibleMeaningMatchPairs[meaningMatchCurrentIndex]?.id;
  const candidates = visibleMeaningMatchPairs
    .map((pair, index) => ({ pair, index }))
    .filter(({ pair }) => pair.id !== currentId);
  const freshCandidates = candidates.filter(({ pair }) => !recentItems.has(pair.id));
  const outsideWrongWaitCandidates = candidates.filter(({ pair }) => !wrongWaitItems.has(pair.id));

  const selectedIndex = pickMeaningMatchCandidateIndex(freshCandidates)
    ?? pickMeaningMatchCandidateIndex(outsideWrongWaitCandidates, { preferOldestRecent: true })
    ?? pickMeaningMatchCandidateIndex(candidates)
    ?? meaningMatchCurrentIndex;
  const selectedPair = visibleMeaningMatchPairs[selectedIndex];
  console.log("Meaning Match item selected", {
    selectedItemId: selectedPair?.id || "",
    phrase: selectedPair?.phrase || "",
    recentMeaningMatchItems: [...recentMeaningMatchItems],
    reasonSelected: freshCandidates.some(({ index }) => index === selectedIndex)
      ? "selected outside recentMeaningMatchItems"
      : "recent repeat allowed because no fresh candidate was available"
  });
  return selectedIndex;
}

function pickMeaningMatchCandidateIndex(candidates, options = {}) {
  if (!candidates.length) return null;
  if (options.preferOldestRecent) {
    const oldestAge = Math.max(...candidates.map(({ pair }) => getMeaningMatchRecentAge(pair.id)));
    const oldestCandidates = candidates.filter(({ pair }) => getMeaningMatchRecentAge(pair.id) === oldestAge);
    return pickMeaningMatchCandidateIndex(oldestCandidates);
  }
  const bestRank = Math.min(...candidates.map(({ pair }) => getMeaningMatchPriorityRank(pair)));
  const bestCandidates = candidates.filter(({ pair }) => getMeaningMatchPriorityRank(pair) === bestRank);
  const weightedCandidates = shuffleCards(bestCandidates)
    .sort((first, second) => getMeaningMatchRecentAge(second.pair.id) - getMeaningMatchRecentAge(first.pair.id));
  return weightedCandidates[0]?.index ?? null;
}

function getMeaningMatchRecentAge(pairId) {
  const index = recentMeaningMatchItems.indexOf(pairId);
  return index === -1 ? recentMeaningMatchItems.length + 1 : index;
}

function rememberMeaningMatchQuestion(pairOrId) {
  const pairId = typeof pairOrId === "string" ? pairOrId : pairOrId?.id || "";
  if (!pairId) return;
  recentMeaningMatchItems = [
    pairId,
    ...recentMeaningMatchItems.filter((id) => id !== pairId)
  ].slice(0, MEANING_MATCH_RECENT_BUFFER);
  saveMeaningMatchRecentItems();
}

function getNextNounVerbIndex() {
  if (visibleNounVerbPairs.length < 2) return nounVerbCurrentIndex;
  const recentIds = new Set(recentNounVerbQuestionIds);
  const recentNouns = new Set(recentNounVerbNouns);
  const veryRecentIds = new Set(recentNounVerbQuestionIds.slice(0, 5));
  const currentId = visibleNounVerbPairs[nounVerbCurrentIndex]?.id;
  const currentNoun = getNounVerbNounKey(visibleNounVerbPairs[nounVerbCurrentIndex]);
  const candidates = visibleNounVerbPairs
    .map((pair, index) => ({ pair, index }))
    .filter(({ pair }) => pair.id !== currentId);

  const freshQuestionAndNoun = candidates.filter(({ pair }) => {
    const nounKey = getNounVerbNounKey(pair);
    return !recentIds.has(pair.id) && nounKey !== currentNoun && !recentNouns.has(nounKey);
  });
  const freshQuestion = candidates.filter(({ pair }) => !recentIds.has(pair.id));
  const notVeryRecent = candidates.filter(({ pair }) => !veryRecentIds.has(pair.id));
  const sameNounButNotCurrent = candidates.filter(({ pair }) => getNounVerbNounKey(pair) !== currentNoun);

  return pickNounVerbCandidateIndex(freshQuestionAndNoun)
    ?? pickNounVerbCandidateIndex(freshQuestion)
    ?? pickNounVerbCandidateIndex(notVeryRecent)
    ?? pickNounVerbCandidateIndex(sameNounButNotCurrent)
    ?? pickNounVerbCandidateIndex(candidates)
    ?? nounVerbCurrentIndex;
}

function pickNounVerbCandidateIndex(candidates) {
  if (!candidates.length) return null;
  const bestRank = Math.min(...candidates.map(({ pair }) => getNounVerbPriorityRank(pair)));
  const bestCandidates = candidates.filter(({ pair }) => getNounVerbPriorityRank(pair) === bestRank);
  const weightedCandidates = shuffleCards(bestCandidates)
    .sort((first, second) => getNounVerbRecentAge(second.pair.id) - getNounVerbRecentAge(first.pair.id));
  return weightedCandidates[0]?.index ?? null;
}

function getNounVerbRecentAge(pairId) {
  const index = recentNounVerbQuestionIds.indexOf(pairId);
  return index === -1 ? recentNounVerbQuestionIds.length + 1 : index;
}

function getNounVerbNounKey(pair) {
  return getSortKey(pair?.noun || "");
}

function rememberNounVerbQuestion(pairOrId) {
  const pair = typeof pairOrId === "string"
    ? nounVerbPairs.find((item) => item.id === pairOrId)
    : pairOrId;
  const pairId = pair?.id || "";
  if (!pairId) return;
  const nounKey = getNounVerbNounKey(pair);
  recentNounVerbQuestionIds = [
    pairId,
    ...recentNounVerbQuestionIds.filter((id) => id !== pairId)
  ].slice(0, 10);
  if (nounKey) {
    recentNounVerbNouns = [
      nounKey,
      ...recentNounVerbNouns.filter((noun) => noun !== nounKey)
    ].slice(0, 10);
  }
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
  const randomizedNewPairs = shuffleCards(newPairs);
  const randomizedLearned = shuffleCards(learned).sort((first, second) => getNounVerbProgressEntry(first).correctCount - getNounVerbProgressEntry(second).correctCount);
  const randomizedMastered = shuffleCards(mastered).sort((first, second) => getNounVerbLastAnsweredMs(first) - getNounVerbLastAnsweredMs(second));

  const mainReview = [...wrongRecent, ...randomizedNewPairs, ...randomizedLearned];
  if (!mainReview.length) return randomizedMastered;
  return [...mainReview, ...randomizedMastered.filter((_, index) => index % 6 === 0)];
}

function getNounVerbPriorityRank(pair) {
  if (isNounVerbWrongRecently(pair)) return 0;
  const status = getNounVerbStatus(pair);
  if (status === "new") return 1;
  if (status === "learned") return 2;
  return 3;
}

function getMeaningMatchPriorityRank(pair) {
  const status = getMeaningMatchStatus(pair);
  if (status === "new") return 0;
  if (status === "learned") return 1;
  return 2;
}

function applyMeaningMatchPriorityOrder(pairList) {
  const eligiblePairs = pairList.filter(isMeaningMatchEligiblePair);
  const recentItems = new Set(recentMeaningMatchItems);
  const freshPairs = eligiblePairs.filter((pair) => !recentItems.has(pair.id));
  const repeatPairs = eligiblePairs.filter((pair) => recentItems.has(pair.id));
  return [
    ...sortMeaningMatchCandidates(freshPairs),
    ...sortMeaningMatchCandidates(repeatPairs)
  ];
}

function sortMeaningMatchCandidates(pairList) {
  const newPairs = [];
  const learned = [];
  const mastered = [];

  pairList.forEach((pair) => {
    const status = getMeaningMatchStatus(pair);
    if (status === "new") newPairs.push(pair);
    else if (status === "learned") learned.push(pair);
    else mastered.push(pair);
  });

  const randomizedNewPairs = shuffleCards(newPairs);
  const randomizedLearned = shuffleCards(learned).sort((first, second) => getMeaningMatchProgressEntry(first).correctCount - getMeaningMatchProgressEntry(second).correctCount);
  const randomizedMastered = shuffleCards(mastered).sort((first, second) => getMeaningMatchLastAnsweredMs(first) - getMeaningMatchLastAnsweredMs(second));
  const mainReview = [...randomizedNewPairs, ...randomizedLearned];
  if (!mainReview.length) return randomizedMastered;
  return [...mainReview, ...randomizedMastered.filter((_, index) => index % 6 === 0)];
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

function updatePrepositionLearningProgress(item, isCorrect) {
  const previous = getPrepositionProgressEntry(item);
  const now = new Date().toISOString();
  const correctCount = previous.correctCount + (isCorrect ? 1 : 0);
  const wrongCount = previous.wrongCount + (isCorrect ? 0 : 1);
  const status = isCorrect
    ? correctCount >= 3 ? "mastered" : "learned"
    : previous.status;

  prepositionProgress[item.id] = {
    ...previous,
    correctCount,
    wrongCount,
    lastAnsweredAt: now,
    lastWrongAt: isCorrect ? previous.lastWrongAt || "" : now,
    status,
    updatedAt: now
  };

  return prepositionProgress[item.id];
}

function getPrepositionProgressEntry(item) {
  const entry = prepositionProgress[item.id] || {};
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

function getPrepositionStatus(item) {
  return getPrepositionProgressEntry(item).status;
}

function getPrepositionLastAnsweredMs(item) {
  const lastAnswered = Date.parse(getPrepositionProgressEntry(item).lastAnsweredAt);
  return Number.isFinite(lastAnswered) ? lastAnswered : 0;
}

function getPrepositionSummary() {
  return prepositionItems.reduce(
    (total, item) => {
      total[getPrepositionStatus(item)] += 1;
      return total;
    },
    { new: 0, learned: 0, mastered: 0 }
  );
}

function updateMeaningMatchLearningProgress(pair, isCorrect) {
  const previous = getMeaningMatchProgressEntry(pair);
  const now = new Date().toISOString();
  const correctCount = previous.correctCount + (isCorrect ? 1 : 0);
  const wrongCount = previous.wrongCount + (isCorrect ? 0 : 1);
  const status = isCorrect
    ? correctCount >= 3 ? "mastered" : "learned"
    : previous.status;

  meaningMatchProgress[pair.id] = {
    ...previous,
    correctCount,
    wrongCount,
    lastAnsweredAt: now,
    lastWrongAt: isCorrect ? previous.lastWrongAt || "" : now,
    status,
    updatedAt: now
  };
}

function getMeaningMatchProgressEntry(pair) {
  const entry = meaningMatchProgress[pair.id] || {};
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

function getMeaningMatchStatus(pair) {
  return getMeaningMatchProgressEntry(pair).status;
}

function getMeaningMatchLastAnsweredMs(pair) {
  const lastAnswered = Date.parse(getMeaningMatchProgressEntry(pair).lastAnsweredAt);
  return Number.isFinite(lastAnswered) ? lastAnswered : 0;
}

function getMeaningMatchLastWrongMs(pair) {
  const lastWrong = Date.parse(getMeaningMatchProgressEntry(pair).lastWrongAt);
  return Number.isFinite(lastWrong) ? lastWrong : 0;
}

function isMeaningMatchWrongRecently(pair) {
  const entry = getMeaningMatchProgressEntry(pair);
  if (!entry.wrongCount || entry.status === "mastered") return false;
  const lastWrong = getMeaningMatchLastWrongMs(pair);
  if (!lastWrong) return false;
  const sevenDays = 7 * 24 * 60 * 60 * 1000;
  return Date.now() - lastWrong <= sevenDays;
}

function getMeaningMatchSummary() {
  return meaningMatchItems.filter(isMeaningMatchEligiblePair).reduce(
    (total, pair) => {
      total[getMeaningMatchStatus(pair)] += 1;
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

function loadVocabularyProgress() {
  return getCurrentProfile()?.vocabularyProgress || {};
}

function saveVocabularyProgress() {
  if (!currentProfileId) return;
  getCurrentProfile().vocabularyProgress = vocabularyProgress;
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

function loadMeaningMatchProgress() {
  return getCurrentProfile()?.meaningMatchProgress || {};
}

function saveMeaningMatchProgress() {
  if (!currentProfileId) return;
  getCurrentProfile().meaningMatchProgress = meaningMatchProgress;
  saveProfileStore();
}

function savePrepositionProgress() {
  if (!currentProfileId) return;
  getCurrentProfile().prepositionProgress = prepositionProgress;
  saveProfileStore();
}

function saveMeaningMatchRecentItems() {
  if (!currentProfileId) return;
  getCurrentProfile().recentMeaningMatchItems = normalizeRecentItemList(recentMeaningMatchItems, MEANING_MATCH_RECENT_BUFFER);
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

function getDailyChallengeForDate(date = getTodayKey()) {
  const index = getStableDailyChallengeIndex(date);
  return DAILY_CHALLENGES[index] || DAILY_CHALLENGES[0];
}

function getStableDailyChallengeIndex(date) {
  const key = String(date || getTodayKey());
  if (DAILY_CHALLENGES.length < 2) return getRawDailyChallengeIndex(key);
  const baseIndex = getRawDailyChallengeIndex(key);
  const previousIndex = getAdjustedPreviousDailyChallengeIndex(key);
  if (baseIndex !== previousIndex) return baseIndex;
  return (baseIndex + 1) % DAILY_CHALLENGES.length;
}

function getAdjustedPreviousDailyChallengeIndex(dateKey) {
  const previousDate = shiftDateKey(dateKey, -1);
  const previousBaseIndex = getRawDailyChallengeIndex(previousDate);
  const previousPreviousIndex = getRawDailyChallengeIndex(shiftDateKey(previousDate, -1));
  return previousBaseIndex === previousPreviousIndex
    ? (previousBaseIndex + 1) % DAILY_CHALLENGES.length
    : previousBaseIndex;
}

function getRawDailyChallengeIndex(dateKey) {
  return getStableHash(dateKey) % DAILY_CHALLENGES.length;
}

function getStableHash(key) {
  let hash = 0;
  for (let index = 0; index < key.length; index += 1) {
    hash = (hash * 31 + key.charCodeAt(index)) >>> 0;
  }
  return hash;
}

function shiftDateKey(dateKey, days) {
  const date = parseDateKey(dateKey);
  if (!date) return String(dateKey || "");
  date.setDate(date.getDate() + days);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getDailyChallengeProgress(progress, challenge = getDailyChallengeForDate(progress?.date)) {
  const current = challenge.metric === "correctArticleAnswers"
    ? normalizeCounter(progress?.correctArticleAnswers)
    : normalizeCounter(progress?.articleQuestions);
  return {
    current: Math.min(current, challenge.goal),
    raw: current
  };
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
