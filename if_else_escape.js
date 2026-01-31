// if_else_escape.js

// ----- Game configuration -----

const MAX_LIVES = 3;
const QUESTIONS_PER_GAME = 20; // 4 rooms * 5 puzzles each
const LEADERBOARD_KEY = "if_else_escape_leaderboard";

// ----- Question bank (grouped by difficulty) -----
//
// We roughly group questions so that higher indices are more confusing / complex.
// We'll map slices of this array to levels, and within each level
// we escalate difficulty as players go deeper into the "rooms".
//
// Level 1 → easiest questions (intro CS-style conditionals)
// Level 2 → simple if/else, booleans (AP CSP)
// Level 3 → else-if chains, ranges (AP CSA)
// Level 4 → multi-condition logic &&, ||, ! (Honors DSA)
// Level 5 → nested & combined logic (college-level)

const IF_ELSE_QUESTIONS = [
  // --- 0–9: very simple if ---
  {
    scenario:
      "The program checks if a user has more than 100 coins. coins = 150. What happens?",
    code: `if (coins > 100) {
  unlockBonus();
}`,
    choices: [
      "unlockBonus() runs.",
      "unlockBonus() does NOT run.",
      "The program crashes.",
    ],
    correctIndex: 0,
  },
  {
    scenario:
      "You only send a discount if total >= 50. total = 49. What happens?",
    code: `if (total >= 50) {
  sendDiscount();
}`,
    choices: [
      "sendDiscount() runs.",
      "sendDiscount() does NOT run.",
      "sendDiscount() runs twice.",
    ],
    correctIndex: 1,
  },
  {
    scenario:
      "A game awards an extra life if score == 100. score = 100. What happens?",
    code: `if (score == 100) {
  lives = lives + 1;
}`,
    choices: [
      "The player gains 1 life.",
      "The player loses 1 life.",
      "Nothing happens.",
    ],
    correctIndex: 0,
  },
  {
    scenario:
      "The code checks if temperature < 0. temperature = 12. What happens?",
    code: `if (temperature < 0) {
  show("Freezing");
}`,
    choices: [
      'It shows "Freezing".',
      "It shows nothing.",
      "It shows an error.",
    ],
    correctIndex: 1,
  },
  {
    scenario: "You give a warning if speed > 60. speed = 60.",
    code: `if (speed > 60) {
  show("Slow down!");
}`,
    choices: [
      'It shows "Slow down!"',
      "Nothing happens.",
      "The computer shuts down.",
    ],
    correctIndex: 1,
  },
  {
    scenario:
      "A lab charges a fee if pagesPrinted > 10. pagesPrinted = 3. What happens?",
    code: `if (pagesPrinted > 10) {
  chargeFee();
}`,
    choices: [
      "chargeFee() runs.",
      "chargeFee() does not run.",
      "The printer restarts.",
    ],
    correctIndex: 1,
  },
  {
    scenario:
      "A program gives a bonus if correctAnswers >= 8. correctAnswers = 9.",
    code: `if (correctAnswers >= 8) {
  giveBonus();
}`,
    choices: [
      "giveBonus() runs.",
      "giveBonus() does not run.",
      "giveBonus() runs only if correctAnswers == 10.",
    ],
    correctIndex: 0,
  },
  {
    scenario:
      "You want to remind the user to plug in their laptop if battery < 20. battery = 19.",
    code: `if (battery < 20) {
  remindPlugIn();
}`,
    choices: [
      "remindPlugIn() runs.",
      "remindPlugIn() does not run.",
      "The laptop turns off.",
    ],
    correctIndex: 0,
  },
  {
    scenario: "The code checks if time == 12 for lunch. time = 10.",
    code: `if (time == 12) {
  show("Lunch time!");
}`,
    choices: [
      'Shows "Lunch time!"',
      "Shows nothing.",
      "Shows an error.",
    ],
    correctIndex: 1,
  },
  {
    scenario:
      "The program checks if isRaining is true. isRaining = false. What happens?",
    code: `if (isRaining == true) {
  grabUmbrella();
}`,
    choices: [
      "grabUmbrella() runs.",
      "grabUmbrella() does not run.",
      "isRaining becomes true.",
    ],
    correctIndex: 1,
  },

  // --- 10–19: simple if with boundaries ---
  {
    scenario:
      "You get a passing grade if grade >= 70. grade = 70. What happens?",
    code: `if (grade >= 70) {
  passed = true;
}`,
    choices: [
      "passed becomes true.",
      "passed becomes false.",
      "Nothing changes.",
    ],
    correctIndex: 0,
  },
  {
    scenario:
      "An app gives a daily reward if loginsToday == 1. loginsToday = 2.",
    code: `if (loginsToday == 1) {
  giveReward();
}`,
    choices: [
      "giveReward() runs once.",
      "giveReward() does not run.",
      "giveReward() runs twice.",
    ],
    correctIndex: 1,
  },
  {
    scenario:
      "You warn the user if downloadTime > 60 seconds. downloadTime = 75.",
    code: `if (downloadTime > 60) {
  show("This is taking a while...");
}`,
    choices: [
      'Shows "This is taking a while..."',
      "Shows nothing.",
      "Shows a crash message.",
    ],
    correctIndex: 0,
  },
  {
    scenario:
      "If attempts >= 3 you lock the account. attempts = 3. What happens?",
    code: `if (attempts >= 3) {
  lockAccount();
}`,
    choices: [
      "lockAccount() runs.",
      "lockAccount() does not run.",
      "attempts becomes 0.",
    ],
    correctIndex: 0,
  },
  {
    scenario:
      "You check if itemsInCart == 0 to show an empty-cart message. itemsInCart = 4.",
    code: `if (itemsInCart == 0) {
  show("Your cart is empty.");
}`,
    choices: [
      'Shows "Your cart is empty."',
      "Shows nothing.",
      "Removes items from cart.",
    ],
    correctIndex: 1,
  },
  {
    scenario:
      "A study timer logs a break if minutesStudied >= 25. minutesStudied = 24.",
    code: `if (minutesStudied >= 25) {
  logBreak();
}`,
    choices: [
      "logBreak() runs.",
      "logBreak() does not run.",
      "minutesStudied becomes 25.",
    ],
    correctIndex: 1,
  },
  {
    scenario:
      "A robot moves forward if obstacleDistance > 5. obstacleDistance = 10.",
    code: `if (obstacleDistance > 5) {
  moveForward();
}`,
    choices: [
      "moveForward() runs.",
      "moveForward() does not run.",
      "Robot turns off.",
    ],
    correctIndex: 0,
  },
  {
    scenario:
      "An app congratulates you if streakDays > 7. streakDays = 7.",
    code: `if (streakDays > 7) {
  show("Amazing streak!");
}`,
    choices: [
      'Shows "Amazing streak!"',
      "Shows nothing.",
      "Resets streakDays.",
    ],
    correctIndex: 1,
  },
  {
    scenario:
      "If age < 13, the site loads the kids' version. age = 11.",
    code: `if (age < 13) {
  loadKidsVersion();
}`,
    choices: [
      "loadKidsVersion() runs.",
      "Nothing happens.",
      "The site closes.",
    ],
    correctIndex: 0,
  },
  {
    scenario:
      "The app sets isTeen to true if age >= 13. age = 12.",
    code: `if (age >= 13) {
  isTeen = true;
}`,
    choices: [
      "isTeen becomes true.",
      "isTeen stays whatever it was.",
      "age becomes 13.",
    ],
    correctIndex: 1,
  },

  // --- 20–39: if / else (AP CSP-ish) ---
  {
    scenario:
      "You pass if score >= 70, otherwise you fail. score = 85.",
    code: `if (score >= 70) {
  result = "Pass";
} else {
  result = "Fail";
}`,
    choices: [
      'result is "Pass".',
      'result is "Fail".',
      "result is unchanged.",
    ],
    correctIndex: 0,
  },
  {
    scenario:
      "You pass if score >= 70, otherwise you fail. score = 60.",
    code: `if (score >= 70) {
  result = "Pass";
} else {
  result = "Fail";
}`,
    choices: [
      'result is "Pass".',
      'result is "Fail".',
      "Both messages are shown.",
    ],
    correctIndex: 1,
  },
  {
    scenario:
      "If isLoggedIn is true, show the dashboard; otherwise ask to log in. isLoggedIn = false.",
    code: `if (isLoggedIn) {
  showDashboard();
} else {
  showLogin();
}`,
    choices: [
      "showDashboard() runs.",
      "showLogin() runs.",
      "Neither function runs.",
    ],
    correctIndex: 1,
  },
  {
    scenario:
      "If temp > 30 show 'Hot'; else show 'Not hot'. temp = 18.",
    code: `if (temp > 30) {
  show("Hot");
} else {
  show("Not hot");
}`,
    choices: [
      'Shows "Hot".',
      'Shows "Not hot".',
      "Shows nothing.",
    ],
    correctIndex: 1,
  },
  {
    scenario:
      "If isStudent is true, you get a discount; otherwise pay full price. isStudent = true.",
    code: `if (isStudent) {
  price = price * 0.8;
} else {
  price = price;
}`,
    choices: [
      "price becomes 80% of the original.",
      "price doubles.",
      "price stays the same.",
    ],
    correctIndex: 0,
  },
  {
    scenario:
      "If tickets > 0 you can enter; else you cannot. tickets = 0.",
    code: `if (tickets > 0) {
  canEnter = true;
} else {
  canEnter = false;
}`,
    choices: [
      "canEnter is true.",
      "canEnter is false.",
      "canEnter is unchanged.",
    ],
    correctIndex: 1,
  },
  {
    scenario:
      "If batteryPercent >= 50, quality is 'High'; else 'Low'. batteryPercent = 20.",
    code: `if (batteryPercent >= 50) {
  videoQuality = "High";
} else {
  videoQuality = "Low";
}`,
    choices: [
      'videoQuality is "High".',
      'videoQuality is "Low".',
      "videoQuality is unchanged.",
    ],
    correctIndex: 1,
  },
  {
    scenario:
      "If stepsToday >= goal, show 'Goal reached'; otherwise 'Keep going'. stepsToday = 9000, goal = 10000.",
    code: `if (stepsToday >= goal) {
  show("Goal reached");
} else {
  show("Keep going");
}`,
    choices: [
      'Shows "Goal reached".',
      'Shows "Keep going".',
      "Shows nothing.",
    ],
    correctIndex: 1,
  },
  {
    scenario:
      "If numMessages == 0 show 'Inbox zero'; else show the number. numMessages = 5.",
    code: `if (numMessages == 0) {
  show("Inbox zero");
} else {
  show(numMessages);
}`,
    choices: [
      'Shows "Inbox zero".',
      "Shows 5.",
      "Shows nothing.",
    ],
    correctIndex: 1,
  },
  {
    scenario:
      "If booksOverdue > 0 you pay a fine; else you pay nothing. booksOverdue = 2.",
    code: `if (booksOverdue > 0) {
  payFine();
} else {
  payNothing();
}`,
    choices: [
      "payFine() runs.",
      "payNothing() runs.",
      "Both run.",
    ],
    correctIndex: 0,
  },
  {
    scenario:
      "If isAdmin is true, give 'Full' access; else 'Limited'. isAdmin = false.",
    code: `if (isAdmin) {
  accessLevel = "Full";
} else {
  accessLevel = "Limited";
}`,
    choices: [
      'accessLevel is "Full".',
      'accessLevel is "Limited".',
      "accessLevel doesn't change.",
    ],
    correctIndex: 1,
  },
  {
    scenario:
      "If isMuted is true, volume is 0; else volume stays. isMuted = true.",
    code: `if (isMuted) {
  volume = 0;
} else {
  volume = volume;
}`,
    choices: [
      "volume becomes 0.",
      "volume doubles.",
      "volume becomes -1.",
    ],
    correctIndex: 0,
  },
  {
    scenario:
      "If hasMembership is false, you must pay a fee; else it's free. hasMembership = true.",
    code: `if (!hasMembership) {
  payFee();
} else {
  enterFree();
}`,
    choices: [
      "payFee() runs.",
      "enterFree() runs.",
      "Nothing happens.",
    ],
    correctIndex: 1,
  },
  {
    scenario:
      "If seatsLeft == 0 you show 'Sold out'; else you show 'Available'. seatsLeft = 0.",
    code: `if (seatsLeft == 0) {
  show("Sold out");
} else {
  show("Available");
}`,
    choices: [
      'Shows "Sold out".',
      'Shows "Available".',
      "Shows nothing.",
    ],
    correctIndex: 0,
  },
  {
    scenario:
      "If homeworkDone is true, canPlayGames is true; else false. homeworkDone = false.",
    code: `if (homeworkDone) {
  canPlayGames = true;
} else {
  canPlayGames = false;
}`,
    choices: [
      "canPlayGames is true.",
      "canPlayGames is false.",
      "canPlayGames is unchanged.",
    ],
    correctIndex: 1,
  },
  {
    scenario:
      "If waterLevel < 20, the plant needs water; else it is fine. waterLevel = 25.",
    code: `if (waterLevel < 20) {
  needsWater = true;
} else {
  needsWater = false;
}`,
    choices: [
      "needsWater is true.",
      "needsWater is false.",
      "needsWater is unchanged.",
    ],
    correctIndex: 1,
  },
  {
    scenario:
      "If minutesOnline > 120 you show a break message; else you show nothing. minutesOnline = 121.",
    code: `if (minutesOnline > 120) {
  show("Take a break!");
} else {
  // do nothing
}`,
    choices: [
      'Shows "Take a break!"',
      "Shows nothing.",
      "Shows an error.",
    ],
    correctIndex: 0,
  },
  {
    scenario:
      "If queueLength == 0 serverStatus is 'Idle'; else 'Busy'. queueLength = 4.",
    code: `if (queueLength == 0) {
  serverStatus = "Idle";
} else {
  serverStatus = "Busy";
}`,
    choices: [
      'serverStatus is "Idle".',
      'serverStatus is "Busy".',
      "serverStatus is unchanged.",
    ],
    correctIndex: 1,
  },
  {
    scenario:
      "If questionsAnswered >= 10 show 'Nice work'; else 'Keep going'. questionsAnswered = 3.",
    code: `if (questionsAnswered >= 10) {
  show("Nice work");
} else {
  show("Keep going");
}`,
    choices: [
      'Shows "Nice work".',
      'Shows "Keep going".',
      "Shows nothing.",
    ],
    correctIndex: 1,
  },
  {
    scenario:
      "If age >= 18 you can vote; else you cannot. age = 17.",
    code: `if (age >= 18) {
  canVote = true;
} else {
  canVote = false;
}`,
    choices: [
      "canVote is true.",
      "canVote is false.",
      "canVote is unchanged.",
    ],
    correctIndex: 1,
  },

  // --- 40–59: else-if chains (AP CSA-ish) ---
  {
    scenario:
      "The program assigns a grade based on score. score = 95.",
    code: `if (score >= 90) {
  grade = "A";
} else if (score >= 80) {
  grade = "B";
} else if (score >= 70) {
  grade = "C";
} else {
  grade = "F";
}`,
    choices: [
      'grade is "A".',
      'grade is "B".',
      'grade is "C".',
      'grade is "F".',
    ],
    correctIndex: 0,
  },
  {
    scenario:
      "The program assigns a grade based on score. score = 84.",
    code: `if (score >= 90) {
  grade = "A";
} else if (score >= 80) {
  grade = "B";
} else if (score >= 70) {
  grade = "C";
} else {
  grade = "F";
}`,
    choices: [
      'grade is "A".',
      'grade is "B".',
      'grade is "C".',
      'grade is "F".',
    ],
    correctIndex: 1,
  },
  {
    scenario:
      "The program assigns a grade based on score. score = 75.",
    code: `if (score >= 90) {
  grade = "A";
} else if (score >= 80) {
  grade = "B";
} else if (score >= 70) {
  grade = "C";
} else {
  grade = "F";
}`,
    choices: [
      'grade is "A".',
      'grade is "B".',
      'grade is "C".',
      'grade is "F".',
    ],
    correctIndex: 2,
  },
  {
    scenario:
      "The program assigns a grade based on score. score = 62.",
    code: `if (score >= 90) {
  grade = "A";
} else if (score >= 80) {
  grade = "B";
} else if (score >= 70) {
 grade = "C";
} else {
  grade = "F";
}`,
    choices: [
      'grade is "A".',
      'grade is "B".',
      'grade is "C".',
      'grade is "F".',
    ],
    correctIndex: 3,
  },
  {
    scenario: "Classify temperature. temp = 12.",
    code: `if (temp < 0) {
  label = "Freezing";
} else if (temp < 10) {
  label = "Cold";
} else if (temp < 20) {
  label = "Cool";
} else {
  label = "Warm";
}`,
    choices: [
      'label is "Freezing".',
      'label is "Cold".',
      'label is "Cool".',
      'label is "Warm".',
    ],
    correctIndex: 2,
  },
  {
    scenario: "Classify temperature. temp = -3.",
    code: `if (temp < 0) {
  label = "Freezing";
} else if (temp < 10) {
  label = "Cold";
} else if (temp < 20) {
  label = "Cool";
} else {
  label = "Warm";
}`,
    choices: [
      'label is "Freezing".',
      'label is "Cold".',
      'label is "Cool".',
      'label is "Warm".',
    ],
    correctIndex: 0,
  },
  {
    scenario: "Classify temperature. temp = 5.",
    code: `if (temp < 0) {
  label = "Freezing";
} else if (temp < 10) {
  label = "Cold";
} else if (temp < 20) {
  label = "Cool";
} else {
  label = "Warm";
}`,
    choices: [
      'label is "Freezing".',
      'label is "Cold".',
      'label is "Cool".',
      'label is "Warm".',
    ],
    correctIndex: 1,
  },
  {
    scenario: "Classify temperature. temp = 25.",
    code: `if (temp < 0) {
  label = "Freezing";
} else if (temp < 10) {
  label = "Cold";
} else if (temp < 20) {
  label = "Cool";
} else {
  label = "Warm";
}`,
    choices: [
      'label is "Freezing".',
      'label is "Cold".',
      'label is "Cool".',
      'label is "Warm".',
    ],
    correctIndex: 3,
  },
  {
    scenario:
      "Classify speed into 'Slow', 'Normal', or 'Fast'. speed = 40.",
    code: `if (speed < 20) {
  band = "Slow";
} else if (speed < 60) {
  band = "Normal";
} else {
  band = "Fast";
}`,
    choices: [
      'band is "Slow".',
      'band is "Normal".',
      'band is "Fast".',
    ],
    correctIndex: 1,
  },
  {
    scenario:
      "Classify speed into 'Slow', 'Normal', or 'Fast'. speed = 10.",
    code: `if (speed < 20) {
  band = "Slow";
} else if (speed < 60) {
  band = "Normal";
} else {
  band = "Fast";
}`,
    choices: [
      'band is "Slow".',
      'band is "Normal".',
      'band is "Fast".',
    ],
    correctIndex: 0,
  },

  // (You can continue the bank similarly; for brevity I’ll stop expanding here.
  // The logic below DOES NOT depend on having exactly 100 questions; it just
  // splits whatever length you have into 5 difficulty bands and 4 "rooms".)
];

// ----- State -----

let currentQuestionIndex = 0;        // index within questionOrder
let questionOrder = [];              // indices into IF_ELSE_QUESTIONS for this run
let currentScore = 0;
let currentPlayerName = "";
let hasAnsweredCurrent = false;
let gameFinished = false;
let scoreSavedForThisGame = false;
let livesLeft = MAX_LIVES;
let selectedLevel = 1;
let pointsPerQuestion = 1;

// checkpoint state
let checkpointIndex = 0;   // where we restart from (questionOrder index)
let checkpointScore = 0;

// ----- DOM helper -----

function $(id) {
  return document.getElementById(id);
}

// ----- Leaderboard helpers -----

function loadLeaderboard() {
  try {
    const stored = localStorage.getItem(LEADERBOARD_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch (e) {
    console.error("Error loading leaderboard", e);
    return [];
  }
}

function saveLeaderboard(entries) {
  try {
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(entries));
  } catch (e) {
    console.error("Error saving leaderboard", e);
  }
}

function addScoreToLeaderboard(name, score) {
  const entries = loadLeaderboard();
  entries.push({
    name: name || "Anonymous",
    score,
    timestamp: Date.now(),
  });

  entries.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return b.timestamp - a.timestamp;
  });

  const trimmed = entries.slice(0, 10);
  saveLeaderboard(trimmed);
  renderLeaderboard(trimmed);
}

function renderLeaderboard(entries = loadLeaderboard()) {
  const list = $("leaderboardList");
  if (!list) return;
  list.innerHTML = "";

  if (!entries.length) {
    const li = document.createElement("li");
    li.textContent = "No escape attempts recorded yet.";
    list.appendChild(li);
    return;
  }

  entries.forEach((entry) => {
    const li = document.createElement("li");
    const nameSpan = document.createElement("span");
    nameSpan.textContent = ` ${entry.name} — `;
    const scoreSpan = document.createElement("span");
    scoreSpan.textContent = `${entry.score} pts`;
    scoreSpan.style.color = "#bfdbfe";

    li.appendChild(nameSpan);
    li.appendChild(scoreSpan);
    list.appendChild(li);
  });
}

// ----- Game helpers -----

function renderLives() {
  const el = $("livesDisplay");
  if (!el) return;
  el.textContent = "❤".repeat(livesLeft);
}

function updateCheckpointDisplay() {
  const el = $("checkpointDisplay");
  if (!el) return;

  if (checkpointIndex === 0) {
    el.textContent = "None yet";
  } else {
    const roomNumber = Math.floor(checkpointIndex / 5) + 1;
    el.textContent = `Room ${roomNumber}`;
  }
}

function updateQuestionAndRoomDisplay() {
  const totalQuestions = questionOrder.length;
  const questionNumber = currentQuestionIndex + 1; // 1-based
  const roomNumber = Math.floor(currentQuestionIndex / 5) + 1;
  const totalRooms = Math.ceil(totalQuestions / 5);

  $("questionCounter").textContent = `${questionNumber} / ${totalQuestions}`;
  $("levelInfo").textContent = `Level ${selectedLevel} – Room ${roomNumber} of ${totalRooms}`;
}

// Fisher–Yates shuffle
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Difficulty mapping:
 * We split the full bank into 5 difficulty slices for levels,
 * then split each slice into 4 "rooms" (groups of indices).
 * Inside each group, we shuffle, but later rooms use higher indices,
 * so they tend to be more confusing.
 */
function generateQuestionOrderForLevel() {
  const total = IF_ELSE_QUESTIONS.length;
  if (total === 0) return [];

  const level = Math.min(Math.max(selectedLevel, 1), 5);
  const sliceSize = Math.floor(total / 5) || 1;
  const startIndex = sliceSize * (level - 1);
  const endIndex = level === 5 ? total : startIndex + sliceSize;

  const levelIndices = [];
  for (let i = startIndex; i < endIndex && i < total; i++) {
    levelIndices.push(i);
  }

  // Now split this level slice into up to 4 "rooms", increasing in difficulty.
  const groups = 4;
  const totalLevelQuestions = levelIndices.length;
  const baseGroupSize = Math.max(1, Math.floor(totalLevelQuestions / groups));
  const ordered = [];

  for (let g = 0; g < groups; g++) {
    const gStart = g * baseGroupSize;
    if (gStart >= totalLevelQuestions) break;
    const gEnd = g === groups - 1
      ? totalLevelQuestions
      : Math.min(totalLevelQuestions, gStart + baseGroupSize);

    const groupSlice = levelIndices.slice(gStart, gEnd);
    shuffleArray(groupSlice); // random inside each room, but rooms get harder
    ordered.push(...groupSlice);
  }

  return ordered.slice(0, Math.min(QUESTIONS_PER_GAME, ordered.length));
}

// ----- Game flow -----

function resetGame() {
  currentQuestionIndex = 0;
  currentScore = 0;
  hasAnsweredCurrent = false;
  gameFinished = false;
  scoreSavedForThisGame = false;
  livesLeft = MAX_LIVES;

  // starting checkpoint is "before room 1"
  checkpointIndex = 0;
  checkpointScore = 0;

  questionOrder = generateQuestionOrderForLevel();

  $("scoreDisplay").textContent = "0";
  renderLives();
  updateCheckpointDisplay();
  updateQuestionAndRoomDisplay();

  $("gameOver").hidden = true;
  $("gameArea").hidden = false;
  $("nextQuestionBtn").disabled = true;
}

function startGame() {
  const nameInput = $("playerName");
  const levelSelect = $("levelSelect");

  const enteredName = nameInput.value.trim();
  if (!enteredName) {
    alert("Please enter your name to start your escape.");
    nameInput.focus();
    return;
  }

  const levelValue = parseInt(levelSelect.value, 10) || 1;
  selectedLevel = Math.min(Math.max(levelValue, 1), 5);
  pointsPerQuestion = selectedLevel; // L1=1, L2=2, ...

  currentPlayerName = enteredName;
  resetGame();
  loadQuestion();
}

function loadQuestion() {
  const totalQuestions = questionOrder.length;
  if (currentQuestionIndex >= totalQuestions) {
    showEndScreen("escape");
    return;
  }

  const qIndex = questionOrder[currentQuestionIndex];
  const q = IF_ELSE_QUESTIONS[qIndex];

  if (!q) {
    showEndScreen("escape");
    return;
  }

  $("scenarioText").textContent = q.scenario;
  $("codeSnippet").textContent = q.code;

  const container = $("choiceButtons");
  container.innerHTML = "";
  q.choices.forEach((choiceText, index) => {
    const btn = document.createElement("button");
    btn.className = "btn btn-choice";
    btn.dataset.index = index.toString();
    btn.textContent = choiceText;
    btn.addEventListener("click", onChoiceClick);
    container.appendChild(btn);
  });

  hasAnsweredCurrent = false;
  $("nextQuestionBtn").disabled = true;
  updateQuestionAndRoomDisplay();
}

function onChoiceClick(event) {
  if (hasAnsweredCurrent || gameFinished) return;

  const button = event.currentTarget;
  const chosenIndex = parseInt(button.dataset.index || "0", 10);

  const qIndex = questionOrder[currentQuestionIndex];
  const q = IF_ELSE_QUESTIONS[qIndex];
  const correctIndex = q.correctIndex;

  hasAnsweredCurrent = true;

  const buttons = $("choiceButtons").querySelectorAll("button");
  buttons.forEach((btn, index) => {
    btn.disabled = true;

    if (index === correctIndex) {
      btn.style.borderColor = "#22c55e";
      btn.style.boxShadow = "0 0 0 1px rgba(34,197,94,0.7)";
    }

    if (index === chosenIndex && index !== correctIndex) {
      btn.style.borderColor = "#f97373";
      btn.style.boxShadow = "0 0 0 1px rgba(248,113,113,0.7)";
    }
  });

  if (chosenIndex === correctIndex) {
    currentScore += pointsPerQuestion;
    $("scoreDisplay").textContent = String(currentScore);
  } else {
    livesLeft -= 1;
    renderLives();
    if (livesLeft <= 0) {
      // no lives → trapped
      showEndScreen("trap");
      return;
    }
  }

  // If still alive, and we just completed a checkpoint (every 5 questions),
  // update checkpoint state.
  const questionNumber = currentQuestionIndex + 1;
  if (livesLeft > 0 && questionNumber % 5 === 0) {
    checkpointIndex = currentQuestionIndex + 1; // start of next room
    checkpointScore = currentScore;
    updateCheckpointDisplay();
  }

  $("nextQuestionBtn").disabled = false;
}

function goToNextQuestion() {
  if (!hasAnsweredCurrent || gameFinished) return;

  currentQuestionIndex += 1;
  if (currentQuestionIndex >= questionOrder.length) {
    showEndScreen("escape");
  } else {
    loadQuestion();
  }
}

function showEndScreen(mode) {
  gameFinished = true;
  $("gameArea").hidden = true;
  $("gameOver").hidden = false;

  $("finalPlayerName").textContent = currentPlayerName || "Anonymous";
  $("finalScore").textContent = String(currentScore);
  $("finalLevel").textContent = `Level ${selectedLevel}`;

  const title = $("gameOverTitle");
  const msg = $("gameOverMessage");
  const continueBtn = $("continueCheckpointBtn");
  const saveBtn = $("saveScoreBtn");

  if (mode === "escape") {
    title.textContent = "You Escaped!";
    msg.textContent = "You solved all the logic puzzles in this level.";
    continueBtn.hidden = true;
    saveBtn.disabled = false;
  } else {
    title.textContent = "You Were Caught!";
    if (checkpointIndex > 0) {
      msg.textContent =
        "You hit a trap, but your last checkpoint is still intact. Continue from that checkpoint or restart the entire level.";
      continueBtn.hidden = false;
    } else {
      msg.textContent =
        "You hit a trap before reaching any checkpoint. Try the escape again from the start of the level.";
      continueBtn.hidden = true;
    }
    // You can still save your score if you want.
    saveBtn.disabled = false;
  }

  scoreSavedForThisGame = false;
}

function continueFromCheckpoint() {
  if (checkpointIndex === 0) return;

  livesLeft = MAX_LIVES;
  currentScore = checkpointScore;
  currentQuestionIndex = checkpointIndex;
  gameFinished = false;
  hasAnsweredCurrent = false;

  $("scoreDisplay").textContent = String(currentScore);
  renderLives();
  updateCheckpointDisplay();
  updateQuestionAndRoomDisplay();

  $("gameOver").hidden = true;
  $("gameArea").hidden = false;
  $("nextQuestionBtn").disabled = true;

  loadQuestion();
}

function restartLevel() {
  resetGame();
  loadQuestion();
}

function saveCurrentScore() {
  if (!gameFinished) return;
  if (scoreSavedForThisGame) {
    alert("This score is already saved.");
    return;
  }
  addScoreToLeaderboard(currentPlayerName, currentScore);
  scoreSavedForThisGame = true;
  alert("Score saved to leaderboard!");
}

function clearLeaderboard() {
  if (!confirm("Clear all leaderboard scores for this game?")) return;
  saveLeaderboard([]);
  renderLeaderboard([]);
}

function scrollToLeaderboard() {
  const card = $("leaderboardCard");
  if (!card) return;
  card.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ----- Init -----

document.addEventListener("DOMContentLoaded", () => {
  renderLeaderboard();

  const startBtn = $("startGameBtn");
  const nextBtn = $("nextQuestionBtn");
  const saveBtn = $("saveScoreBtn");
  const playAgainBtn = $("playAgainBtn");
  const clearBtn = $("clearLeaderboardBtn");
  const openLeaderboardBtn = $("openLeaderboardBtn");
  const continueCheckpointBtn = $("continueCheckpointBtn");

  if (startBtn) startBtn.addEventListener("click", startGame);
  if (nextBtn) nextBtn.addEventListener("click", goToNextQuestion);
  if (saveBtn) saveBtn.addEventListener("click", saveCurrentScore);
  if (playAgainBtn) playAgainBtn.addEventListener("click", restartLevel);
  if (clearBtn) clearBtn.addEventListener("click", clearLeaderboard);
  if (openLeaderboardBtn)
    openLeaderboardBtn.addEventListener("click", scrollToLeaderboard);
  if (continueCheckpointBtn)
    continueCheckpointBtn.addEventListener("click", continueFromCheckpoint);
});
