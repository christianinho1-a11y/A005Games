// Question data: levels, prompts, code snippets, and answer choices.
const questions = [
  {
    level: 1,
    prompt: "You see a locked door. hasKey = true.",
    code: "if (hasKey == true) {\n  goThroughDoor();\n}",
    choices: [
      {
        text: "Go through the door.",
        correct: true,
        explanation: "hasKey is true, so the condition runs and you go through the door."
      },
      {
        text: "Go look for a key.",
        correct: false,
        explanation: "You already have the key, so you should go through the door."
      }
    ]
  },
  {
    level: 1,
    prompt: "Your flashlight is on. batteryLevel = 20.",
    code: "if (batteryLevel > 0) {\n  keepLightOn();\n}",
    choices: [
      {
        text: "Keep the light on.",
        correct: true,
        explanation: "20 is greater than 0, so the light stays on."
      },
      {
        text: "Turn the light off immediately.",
        correct: false,
        explanation: "The condition is true, so you can keep it on for now."
      }
    ]
  },
  {
    level: 1,
    prompt: "A bridge can only hold weight <= 100. yourWeight = 95.",
    code: "if (yourWeight <= 100) {\n  crossBridge();\n}",
    choices: [
      {
        text: "Cross the bridge.",
        correct: true,
        explanation: "95 is less than or equal to 100, so crossing is safe."
      },
      {
        text: "Find another path.",
        correct: false,
        explanation: "The condition is true, so you can cross safely."
      }
    ]
  },
  {
    level: 2,
    prompt: "A guard checks your badge. hasBadge = false.",
    code: "if (hasBadge == true) {\n  enterLab();\n} else {\n  stayOutside();\n}",
    choices: [
      {
        text: "Enter the lab.",
        correct: false,
        explanation: "hasBadge is false, so you should stay outside."
      },
      {
        text: "Stay outside.",
        correct: true,
        explanation: "The condition is false, so the else branch runs."
      }
    ]
  },
  {
    level: 2,
    prompt: "A terminal requires a passcode. hasPasscode = true.",
    code: "if (hasPasscode == true) {\n  unlockTerminal();\n} else {\n  searchForClue();\n}",
    choices: [
      {
        text: "Unlock the terminal.",
        correct: true,
        explanation: "hasPasscode is true, so unlockTerminal() runs."
      },
      {
        text: "Search for a clue.",
        correct: false,
        explanation: "You already have the passcode, so unlock the terminal."
      }
    ]
  },
  {
    level: 2,
    prompt: "You have to choose a path. isBridgeStable = false.",
    code: "if (isBridgeStable == true) {\n  crossBridge();\n} else {\n  takeTunnel();\n}",
    choices: [
      {
        text: "Cross the bridge.",
        correct: false,
        explanation: "The bridge is not stable, so you should take the tunnel."
      },
      {
        text: "Take the tunnel.",
        correct: true,
        explanation: "isBridgeStable is false, so the else branch runs."
      }
    ]
  },
  {
    level: 3,
    prompt: "Power status check. powerOn = true, backupOn = false.",
    code: "if (powerOn == true) {\n  openGate();\n} else if (backupOn == true) {\n  startBackup();\n} else {\n  waitOutside();\n}",
    choices: [
      {
        text: "Open the gate.",
        correct: true,
        explanation: "powerOn is true, so the first branch runs."
      },
      {
        text: "Start backup.",
        correct: false,
        explanation: "The first condition is already true, so backup is not used."
      },
      {
        text: "Wait outside.",
        correct: false,
        explanation: "powerOn is true, so you can open the gate."
      }
    ]
  },
  {
    level: 3,
    prompt: "Enemy scan. hasShield = false, hasEnergy = true.",
    code: "if (hasShield == true) {\n  chargeForward();\n} else if (hasEnergy == true) {\n  useEnergyBlast();\n} else {\n  hide();\n}",
    choices: [
      {
        text: "Charge forward.",
        correct: false,
        explanation: "You do not have a shield, so you should not charge."
      },
      {
        text: "Use energy blast.",
        correct: true,
        explanation: "hasShield is false but hasEnergy is true, so useEnergyBlast()."
      },
      {
        text: "Hide.",
        correct: false,
        explanation: "You still have energy, so use the energy blast."
      }
    ]
  },
  {
    level: 3,
    prompt: "Security doors. codeMatch = false, override = false.",
    code: "if (codeMatch == true) {\n  openDoor();\n} else if (override == true) {\n  forceOpen();\n} else {\n  triggerAlarm();\n}",
    choices: [
      {
        text: "Open the door normally.",
        correct: false,
        explanation: "codeMatch is false, so the door won't open normally."
      },
      {
        text: "Force the door open.",
        correct: false,
        explanation: "override is also false, so you cannot force it."
      },
      {
        text: "Trigger the alarm.",
        correct: true,
        explanation: "Both conditions are false, so the else branch runs."
      }
    ]
  }
];

// Leaderboard storage key and helpers.
const leaderboardKey = "ifElseEscapeLeaderboard";

const setupPanel = document.querySelector("#setup-panel");
const gamePanel = document.querySelector("#game-panel");
const summaryPanel = document.querySelector("#summary-panel");
const leaderboardPanel = document.querySelector("#leaderboard-panel");

const playerNameInput = document.querySelector("#player-name");
const startButton = document.querySelector("#start-game");
const nameError = document.querySelector("#name-error");

const playerDisplay = document.querySelector("#player-display");
const levelDisplay = document.querySelector("#level-display");
const questionDisplay = document.querySelector("#question-display");
const scoreDisplay = document.querySelector("#score-display");
const storyBox = document.querySelector("#story-box");
const codeBlock = document.querySelector("#code-block");
const choicesContainer = document.querySelector("#choices");
const feedback = document.querySelector("#feedback");
const nextButton = document.querySelector("#next-button");

const summaryPlayer = document.querySelector("#summary-player");
const summaryScore = document.querySelector("#summary-score");
const saveScoreButton = document.querySelector("#save-score");
const playAgainButton = document.querySelector("#play-again");
const saveMessage = document.querySelector("#save-message");

const leaderboardToggle = document.querySelector("#leaderboard-toggle");
const leaderboardClose = document.querySelector("#leaderboard-close");
const leaderboardList = document.querySelector("#leaderboard-list");

const levelLabels = {
  1: "Level 1 - Single IF",
  2: "Level 2 - IF / ELSE",
  3: "Level 3 - Nested IF / ELSE IF"
};

let playerName = "";
let currentLevelIndex = 0;
let currentQuestionIndex = 0;
let score = 0;

// Handle player name input and start the game.
startButton.addEventListener("click", () => {
  const nameValue = playerNameInput.value.trim();
  if (!nameValue) {
    nameError.textContent = "Please enter your name before starting.";
    return;
  }

  playerName = nameValue;
  nameError.textContent = "";
  score = 0;
  currentLevelIndex = 0;
  currentQuestionIndex = 0;

  setupPanel.classList.add("hidden");
  gamePanel.classList.remove("hidden");
  summaryPanel.classList.add("hidden");
  saveMessage.textContent = "";
  saveMessage.classList.remove("success");

  playerDisplay.textContent = playerName;
  scoreDisplay.textContent = score;

  renderQuestion();
});

// Render the current question and choices.
function renderQuestion() {
  nextButton.classList.add("hidden");
  feedback.textContent = "";
  choicesContainer.innerHTML = "";

  const level = currentLevel();
  const levelQuestions = questionsForLevel(level);
  const question = levelQuestions[currentQuestionIndex];

  levelDisplay.textContent = levelLabels[level];
  levelDisplay.className = `level-badge level-${level}`;
  questionDisplay.textContent = `${currentQuestionIndex + 1} / ${levelQuestions.length}`;

  storyBox.textContent = question.prompt;
  codeBlock.textContent = question.code;

  question.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = choice.text;
    button.addEventListener("click", () => handleChoice(choice));
    choicesContainer.appendChild(button);
  });
}

// Handle answer selection, scoring, and feedback.
function handleChoice(choice) {
  const buttons = choicesContainer.querySelectorAll("button");
  buttons.forEach((button) => {
    button.disabled = true;
  });

  if (choice.correct) {
    score += 1;
    scoreDisplay.textContent = score;
    feedback.className = "feedback correct";
    feedback.innerHTML = `<strong>Correct!</strong> ${choice.explanation}`;
  } else {
    feedback.className = "feedback incorrect";
    feedback.innerHTML = `<strong>Not quite.</strong> ${choice.explanation}`;
  }

  if (isLastQuestionInLevel() && !isLastLevel()) {
    feedback.innerHTML += `<p class="level-complete">Level ${currentLevel()} complete!</p>`;
  }

  nextButton.textContent = nextButtonLabel();
  nextButton.classList.remove("hidden");
}

// Move to the next question or level.
nextButton.addEventListener("click", () => {
  if (isLastQuestionInLevel()) {
    if (isLastLevel()) {
      showSummary();
      return;
    }

    currentLevelIndex += 1;
    currentQuestionIndex = 0;
  } else {
    currentQuestionIndex += 1;
  }

  renderQuestion();
});

// Show the game over summary panel.
function showSummary() {
  gamePanel.classList.add("hidden");
  summaryPanel.classList.remove("hidden");
  summaryPlayer.textContent = playerName;
  summaryScore.textContent = score;
}

// Save the score to the leaderboard in localStorage.
saveScoreButton.addEventListener("click", () => {
  const leaderboard = getLeaderboard();
  leaderboard.push({ name: playerName, score });

  leaderboard.sort((a, b) => b.score - a.score);
  const trimmed = leaderboard.slice(0, 10);

  localStorage.setItem(leaderboardKey, JSON.stringify(trimmed));
  renderLeaderboard();
  saveMessage.textContent = "Score saved to the leaderboard!";
  saveMessage.classList.add("success");
});

// Reset the game so a player can play again.
playAgainButton.addEventListener("click", () => {
  setupPanel.classList.remove("hidden");
  gamePanel.classList.add("hidden");
  summaryPanel.classList.add("hidden");
  playerNameInput.value = playerName;
  nameError.textContent = "";
  saveMessage.textContent = "";
  saveMessage.classList.remove("success");
});

// Toggle leaderboard visibility.
leaderboardToggle.addEventListener("click", () => {
  leaderboardPanel.classList.toggle("hidden");
});

leaderboardClose.addEventListener("click", () => {
  leaderboardPanel.classList.add("hidden");
});

// Load leaderboard on page load.
renderLeaderboard();

function questionsForLevel(level) {
  return questions.filter((question) => question.level === level);
}

function currentLevel() {
  return [1, 2, 3][currentLevelIndex];
}

function isLastQuestionInLevel() {
  return currentQuestionIndex + 1 >= questionsForLevel(currentLevel()).length;
}

function isLastLevel() {
  return currentLevelIndex >= 2;
}

function nextButtonLabel() {
  if (isLastQuestionInLevel() && !isLastLevel()) {
    return `Start ${levelLabels[currentLevel() + 1]}`;
  }
  return "Next Question";
}

// Read the leaderboard from localStorage or return an empty list.
function getLeaderboard() {
  const stored = localStorage.getItem(leaderboardKey);
  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(stored);
  } catch (error) {
    return [];
  }
}

// Render the leaderboard list in the panel.
function renderLeaderboard() {
  const entries = getLeaderboard();
  leaderboardList.innerHTML = "";

  if (entries.length === 0) {
    const empty = document.createElement("li");
    empty.textContent = "No scores yet. Finish the game to add one!";
    leaderboardList.appendChild(empty);
    return;
  }

  entries.forEach((entry, index) => {
    const item = document.createElement("li");
    item.textContent = `#${index + 1} ${entry.name} — ${entry.score}`;
    leaderboardList.appendChild(item);
  });
}
