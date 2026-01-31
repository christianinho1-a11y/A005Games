// admin.js

const GAME_REGISTRY_KEY = "cs_games_registry";

let games = [];

function $(id) {
  return document.getElementById(id);
}

// ---- Registry helpers ----

function loadRegistry() {
  try {
    const stored = localStorage.getItem(GAME_REGISTRY_KEY);
    if (!stored) {
      games = [];
      return;
    }
    const parsed = JSON.parse(stored);
    games = Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error("Error loading game registry", e);
    games = [];
  }
}

function saveRegistry() {
  try {
    localStorage.setItem(GAME_REGISTRY_KEY, JSON.stringify(games));
  } catch (e) {
    console.error("Error saving game registry", e);
  }
}

function makeGameIdFromFile(fileName) {
  const noExt = fileName.replace(/\.[^.]+$/, "");
  return noExt.toLowerCase().replace(/[^a-z0-9]+/g, "_");
}

function renderGameList() {
  const list = $("gameList");
  if (!list) return; // We're probably on the login view only

  list.innerHTML = "";

  if (!games.length) {
    const li = document.createElement("li");
    li.textContent = "No games registered yet. Add one above.";
    list.appendChild(li);
    return;
  }

  games.forEach((game) => {
    const li = document.createElement("li");
    li.className = "game-list-item";

    const title = document.createElement("div");
    title.style.fontWeight = "600";
    title.textContent = game.name;

    const meta = document.createElement("div");
    meta.className = "sub-card-meta small";
    meta.innerHTML = `
      File: <code>${game.file}</code><br />
      Category: <strong>${game.category.toUpperCase()}</strong><br />
      Leaderboard key: <code>${game.leaderboardKey}</code>
    `;

    const btnRow = document.createElement("div");
    btnRow.className = "button-row";
    btnRow.style.marginTop = "0.5rem";

    const clearBtn = document.createElement("button");
    clearBtn.className = "btn btn-small";
    clearBtn.textContent = "Clear Leaderboard";
    clearBtn.addEventListener("click", () => clearLeaderboardForGame(game.id));

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-small btn-danger";
    deleteBtn.textContent = "Delete Game from Registry";
    deleteBtn.addEventListener("click", () => deleteGame(game.id));

    btnRow.appendChild(clearBtn);
    btnRow.appendChild(deleteBtn);

    li.appendChild(title);
    li.appendChild(meta);
    li.appendChild(btnRow);

    list.appendChild(li);
  });
}

// ---- Leaderboard actions ----

function clearLeaderboardForGame(gameId) {
  const game = games.find((g) => g.id === gameId);
  if (!game) return;

  const confirmMsg = `Clear leaderboard for "${game.name}"? This removes all scores stored under key:\n\n${game.leaderboardKey}`;
  if (!confirm(confirmMsg)) return;

  try {
    localStorage.removeItem(game.leaderboardKey);
    alert(`Leaderboard cleared for "${game.name}".`);
  } catch (e) {
    console.error("Error clearing leaderboard", e);
    alert("Error clearing leaderboard. Check console for details.");
  }
}

function clearAllLeaderboards() {
  if (!games.length) {
    alert("No games in registry.");
    return;
  }

  const confirmMsg =
    "Clear ALL leaderboards for all registered games?\n\nThis will remove scores for every leaderboard key listed in this admin panel.";
  if (!confirm(confirmMsg)) return;

  let clearedCount = 0;

  games.forEach((game) => {
    try {
      localStorage.removeItem(game.leaderboardKey);
      clearedCount += 1;
    } catch (e) {
      console.error("Error clearing leaderboard for", game, e);
    }
  });

  alert(`Cleared ${clearedCount} leaderboard(s) for registered games.`);
}

// ---- Game add / delete ----

function addGameFromForm() {
  const nameInput = $("gameNameInput");
  const fileInput = $("gameFileInput");
  const categorySelect = $("gameCategorySelect");

  if (!nameInput || !fileInput || !categorySelect) return; // on login view

  const name = (nameInput.value || "").trim();
  const fileName = (fileInput.value || "").trim();
  const category = (categorySelect.value || "cs").trim();

  if (!name || !fileName) {
    alert("Please enter both a display name and an HTML file name.");
    return;
  }

  if (!fileName.toLowerCase().endsWith(".html")) {
    const proceed = confirm(
      "File name does not end with .html. Are you sure this is correct?"
    );
    if (!proceed) return;
  }

  const id = makeGameIdFromFile(fileName);
  const leaderboardKey = `${id}_leaderboard`;

  if (games.some((g) => g.id === id)) {
    const overwrite = confirm(
      `A game with ID "${id}" already exists. Overwrite its info?`
    );
    if (!overwrite) return;

    games = games.map((g) =>
      g.id === id ? { ...g, name, file: fileName, category, leaderboardKey } : g
    );
  } else {
    games.push({
      id,
      name,
      file: fileName,
      category,
      leaderboardKey,
    });
  }

  saveRegistry();
  renderGameList();

  alert(
    `Game saved.\n\nID: ${id}\nLeaderboard key: ${leaderboardKey}\n\nUse this key in your game’s JS for storing scores.`
  );

  nameInput.value = "";
  fileInput.value = "";
}

function deleteGame(gameId) {
  const game = games.find((g) => g.id === gameId);
  if (!game) return;

  const confirmMsg = `Remove "${game.name}" from the registry?\n\n(This does NOT delete the HTML/JS files. It only removes the metadata and admin controls.)`;
  if (!confirm(confirmMsg)) return;

  games = games.filter((g) => g.id !== gameId);
  saveRegistry();
  renderGameList();
}

// ---- Init ----

document.addEventListener("DOMContentLoaded", () => {
  // If we're on the login-only view, there will be no admin controls, so this will safely no-op
  loadRegistry();
  renderGameList();

  const addGameBtn = $("addGameBtn");
  const clearAllLbBtn = $("clearAllLbBtn");

  if (addGameBtn) addGameBtn.addEventListener("click", addGameFromForm);
  if (clearAllLbBtn)
    clearAllLbBtn.addEventListener("click", clearAllLeaderboards);
});

