// if_else_escape.js

// ----- Question bank -----
// Each question tests understanding of if / else logic.
// Correct answer is given by correctIndex.

const IF_ELSE_QUESTIONS = [
  {
    level: 1,
    label: "Single if",
    scenario:
      "A bridge can only hold weight <= 100. yourWeight = 95. What does the code do?",
    code: `if (yourWeight <= 100) {
  crossBridge();
}`,
    choices: ["Cross the bridge.", "Don't cross the bridge."],
    correctIndex: 0,
  },
  {
    level: 1,
    label: "Single if",
    scenario:
      "You only get extra credit if score > 90. Your score is 72. What happens?",
    code: `if (score > 90) {
  giveExtraCredit();
}`,
    choices: ["You get extra credit.", "You do NOT get extra credit."],
    correctIndex: 1,
  },
  {
    level: 2,
    label: "If / else",
    scenario:
      "You are checking if a user is old enough to drive. age = 15. What runs?",
    code: `if (age >= 16) {
  allowDriving();
} else {
  denyDriving();
}`,
    choices: [
      "allowDriving() runs.",
      "denyDriving() runs.",
      "Both functions run.",
    ],
    correctIndex: 1,
  },
  {
    level: 2,
    label: "If / else",
    scenario:
      "You pass a quiz if score >= 70. score = 92. What does the code do?",
    code: `if (score >= 70) {
  show("You passed!");
} else {
  show("Try again.");
}`,
    choices: [
      `Shows "You passed!"`,
      `Shows "Try again."`,
      "Shows both messages.",
    ],
    correctIndex: 0,
  },
  {
    level: 3,
    label: "Else if chain",
    scenario:
      "You are classifying grades. score = 83. Which message appears?",
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
      'grade is set to "A".',
      'grade is set to "B".',
      'grade is set to "C".',
      'grade is set to "F".',
    ],
    correctIndex: 1,
  },
];

// ----- State -----

let currentQuestionIndex = 0;
let currentScore = 0;
let currentPlayerName = "";
let hasAnsweredCurrent = false;
let gameFinished = false;
let scoreSavedForThisGame = false;

// ----- DOM helpers -----

function $(id) {
  return document.getElementById(id);
}

// ----- Leaderboard helpers -----

const LEADERBOARD_KEY = "if_else_escape_leaderboard";

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

  // Sort by score desc, then most recent first
  entries.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return b.timestamp - a.timestamp;
  });

  // Keep top 10
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

  entries.forEach((entry, index) => {
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

// ----- Game flow -----

function resetGame() {
  currentQuestionIndex = 0;
  currentScore = 0;
  hasAnsweredCurrent = false;
  gameFinished = false;
  scoreSavedForThisGame = false;

  $("scoreDisplay").textContent = "0";
  $("gameOver").hidden = true;
  $("gameArea").hidden = false;
  $("nextQuestionBtn").disabled = true;
}

function startGame() {
  const nameInput = $("playerName");
  const enteredName = nameInput.value.trim();
  if (!enteredName) {
    alert("Please enter your name to start.");
    nameInput.focus();
    return;
  }

  currentPlayerName = enteredName;
  resetGame();
  loadQuestion();
}

function loadQuestion() {
  const q = IF_ELSE_QUESTIONS[currentQuestionIndex];
  if (!q) {
    // No question found – end the game
    endGame();
    return;
  }

  const levelInfo = $("levelInfo");
  const total = IF_ELSE_QUESTIONS.length;
  levelInfo.textContent = `Level ${q.level} – ${q.label} – Question ${
    currentQuestionIndex + 1
  } / ${total}`;

  $("scenarioText").textContent = q.scenario;
  $("codeSnippet").textContent = q.code;

  // Build choice buttons
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
  const q = IF_ELSE_QUESTIONS[currentQuestionIndex];
  const correctIndex = q.correctIndex;

  hasAnsweredCurrent = true;

  // Mark buttons
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

  // Scoring
  if (chosenIndex === correctIndex) {
    currentScore += 1;
    $("scoreDisplay").textContent = String(currentScore);
  }

  $("nextQuestionBtn").disabled = false;
}

function goToNextQuestion() {
  if (!hasAnsweredCurrent) return;

  currentQuestionIndex += 1;
  if (currentQuestionIndex >= IF_ELSE_QUESTIONS.length) {
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



// Scroll to leaderboard on the page
function scrollToLeaderboard() {
  const card = $("leaderboardCard");
  if (!card) return;
  card.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ----- Init -----

document.addEventListener("DOMContentLoaded", () => {
  // render leaderboard on load
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

