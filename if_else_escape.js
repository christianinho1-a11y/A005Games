// if_else_escape.js

// ----- Game settings -----

const MAX_LIVES = 3;
const TOTAL_QUESTIONS_PER_GAME = 50; // up to 50 per run
const LEADERBOARD_KEY = "if_else_escape_leaderboard";

// ----- Question bank (100 questions) -----
// (Same as last version – 100 conditionals questions)

const IF_ELSE_QUESTIONS = [
  // 1: simple if
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
  // 2
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
  // 3
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
  // 4
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
  // 5
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
  // 6
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
  // 7
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
  // 8
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
  // 9
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
  // 10
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

  // 11–100 are the same as in the previous file you have.
  // To keep this message from being 100+ printed questions long again,
  // you can re-use the rest of the IF_ELSE_QUESTIONS array from the last
  // version I gave you WITHOUT changes.
  //
  // *** IMPORTANT FOR YOU ***
  // In your actual file, keep ALL 100 question objects exactly as before.
  // Only the logic below this array changes.
];

// ----- State -----

let currentQuestionIndex = 0; // index (0..49) in the current game's questionOrder
let questionOrder = []; // array of indices into IF_ELSE_QUESTIONS
let currentScore = 0;
let currentPlayerName = "";
let hasAnsweredCurrent = false;
let gameFinished = false;
let scoreSavedForThisGame = false;
let livesLeft = MAX_LIVES;
let selectedLevel = 1;
let pointsPerQuestion = 1;

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
    li.textContent = "No scores saved yet.";
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

// Fisher–Yates shuffle
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function generateQuestionOrder() {
  const indices = [...Array(IF_ELSE_QUESTIONS.length).keys()]; // 0..N-1
  shuffleArray(indices);
  questionOrder = indices.slice(0, TOTAL_QUESTIONS_PER_GAME);
}

// ----- Game flow -----

function resetGame() {
  currentQuestionIndex = 0;
  currentScore = 0;
  hasAnsweredCurrent = false;
  gameFinished = false;
  scoreSavedForThisGame = false;
  livesLeft = MAX_LIVES;

  generateQuestionOrder();
  $("scoreDisplay").textContent = "0";
  renderLives();

  $("gameOver").hidden = true;
  $("gameArea").hidden = false;
  $("nextQuestionBtn").disabled = true;
}

function startGame() {
  const nameInput = $("playerName");
  const levelSelect = $("levelSelect");

  const enteredName = nameInput.value.trim();
  if (!enteredName) {
    alert("Please enter your name to start.");
    nameInput.focus();
    return;
  }

  const levelValue = parseInt(levelSelect.value, 10) || 1;
  selectedLevel = Math.min(Math.max(levelValue, 1), 5);
  pointsPerQuestion = selectedLevel; // Level N = N points

  currentPlayerName = enteredName;
  resetGame();
  loadQuestion();
}

function loadQuestion() {
  const qIndex = questionOrder[currentQuestionIndex];
  const q = IF_ELSE_QUESTIONS[qIndex];

  if (!q) {
    endGame();
    return;
  }

  const questionNumber = currentQuestionIndex + 1; // 1..50

  const levelInfo = $("levelInfo");
  levelInfo.textContent = `Level ${selectedLevel} – Question ${questionNumber} / ${TOTAL_QUESTIONS_PER_GAME} (worth ${pointsPerQuestion} pts each)`;

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
      endGame();
      return;
    }
  }

  $("nextQuestionBtn").disabled = false;
}

function goToNextQuestion() {
  if (!hasAnsweredCurrent || gameFinished) return;

  currentQuestionIndex += 1;

  if (
    currentQuestionIndex >= questionOrder.length ||
    currentQuestionIndex >= TOTAL_QUESTIONS_PER_GAME
  ) {
    endGame();
  } else {
    loadQuestion();
  }
}

function endGame() {
  gameFinished = true;
  $("gameArea").hidden = true;
  $("gameOver").hidden = false;
  $("finalPlayerName").textContent = currentPlayerName || "Anonymous";
  $("finalScore").textContent = String(currentScore);
  scoreSavedForThisGame = false;
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

  if (startBtn) startBtn.addEventListener("click", startGame);
  if (nextBtn) nextBtn.addEventListener("click", goToNextQuestion);
  if (saveBtn) saveBtn.addEventListener("click", saveCurrentScore);
  if (playAgainBtn)
    playAgainBtn.addEventListener("click", () => {
      resetGame();
      loadQuestion();
    });
  if (clearBtn) clearBtn.addEventListener("click", clearLeaderboard);
  if (openLeaderboardBtn)
    openLeaderboardBtn.addEventListener("click", scrollToLeaderboard);
});

