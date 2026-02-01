<?php
// admin.php — CS & IT Games Admin Panel (password protected)
session_start();

// Change this if you ever want a new code
const ADMIN_CODE = 'A005';

// --- Handle login form submission ---
$loginError = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['admin_code'])) {
    $entered = trim($_POST['admin_code'] ?? '');
    if ($entered === ADMIN_CODE) {
        $_SESSION['cs_games_admin_logged_in'] = true;
        // Redirect to clear POST and avoid resubmission warning
        header('Location: admin.php');
        exit;
    } else {
        $loginError = 'Incorrect code. Try again.';
    }
}

// --- Handle logout request ---
if (isset($_GET['logout'])) {
    unset($_SESSION['cs_games_admin_logged_in']);
    session_destroy();
    header('Location: admin.php');
    exit;
}

$loggedIn = !empty($_SESSION['cs_games_admin_logged_in']);
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Admin Panel – CS & IT Games</title>
  <link rel="stylesheet" href="style.css" />
  <!-- This JS only runs registry & leaderboard logic (no login JS now) -->
  <script defer src="admin.js"></script>
</head>
<body class="cs-body">
  <a href="index.html" class="back-link">← Back to Home</a>

  <main class="page-wrap">
    <header class="page-header">
      <div>
        <h1 class="page-title">// Admin Panel</h1>
        <p class="page-subtitle">
          Manage games &amp; leaderboards
          <span class="tag">Teacher Only</span>
        </p>
      </div>

      <?php if ($loggedIn): ?>
        <form method="get" action="admin.php">
          <button type="submit" name="logout" value="1" class="btn btn-outline">
            Logout
          </button>
        </form>
      <?php endif; ?>
    </header>

    <?php if (!$loggedIn): ?>
      <!-- ===========================
           LOGIN VIEW (ONLY THIS SHOWS UNTIL PASSWORD IS CORRECT)
           ============================ -->
      <section class="layout-grid">
        <section class="card card-main" style="max-width: 480px; margin-inline: auto;">
          <header class="card-header">
            <h2 class="card-title">Admin Login</h2>
            <p class="card-subtitle">
              Enter the admin code to access teacher tools.
            </p>
          </header>

          <div class="sub-card">
            <form method="post" action="admin.php" class="form-row stacked">
              <label for="adminCodeInput" class="sub-card-title" style="margin-bottom: 0.5rem;">
                Admin Code
              </label>
              <input
                type="password"
                id="adminCodeInput"
                name="admin_code"
                class="input"
                placeholder="Enter admin code"
                required
              />

              <?php if ($loginError !== ''): ?>
                <p class="sub-card-meta" style="color:#f97373; margin-top:0.5rem;">
                  <?php echo htmlspecialchars($loginError); ?>
                </p>
              <?php endif; ?>

              <p class="sub-card-meta small" style="margin-top:0.75rem;">
                Hint: classroom-only admin code. (You set this as <strong>A005</strong>.)
              </p>

              <button type="submit" class="btn" style="margin-top:1rem;">
                Login
              </button>
            </form>
          </div>
        </section>
      </section>

    <?php else: ?>
      <!-- ===========================
           FULL ADMIN DASHBOARD (ONLY AFTER SUCCESSFUL LOGIN)
           ============================ -->
      <section class="layout-grid">
        <!-- LEFT COLUMN: Game registry + file creator -->
        <section class="card card-main">
          <header class="card-header">
            <h2 class="card-title">Games Registry</h2>
            <p class="card-subtitle">
              Add, view, and remove games. Clear leaderboards. Generate files on WAMP.
            </p>
          </header>

          <!-- Register existing game (for leaderboard control & category) -->
          <div class="sub-card">
            <h3 class="sub-card-title">Register Existing Game</h3>
            <div class="form-row stacked">
              <label for="gameNameInput">Display Name</label>
              <input
                id="gameNameInput"
                type="text"
                class="input"
                placeholder="e.g. If / Else Escape Room"
              />

              <label for="gameFileInput">HTML File Name</label>
              <input
                id="gameFileInput"
                type="text"
                class="input"
                placeholder="e.g. if_else_escape.html"
              />

              <label for="gameCategorySelect">Category</label>
              <select id="gameCategorySelect" class="input">
                <option value="cs">Computer Science</option>
                <option value="it">Information Technology</option>
                <option value="cyber">Cyber Security</option>
              </select>

              <p class="sub-card-meta small">
                The admin panel auto-generates a
                <strong>leaderboard key</strong> from the file name.<br />
                Example: <code>if_else_escape.html → if_else_escape_leaderboard</code><br />
                Use that key in the game’s JS when you set up its leaderboard.
              </p>

              <button id="addGameBtn" class="btn">Register Game</button>
            </div>
          </div>

          <!-- Create new HTML + JS files on WAMP via PHP -->
          <div class="sub-card">
            <h3 class="sub-card-title">Create New Game Files (WAMP)</h3>
            <p class="sub-card-meta small">
              This uses <code>save_game.php</code> on your WAMP server to create
              a new HTML + JS file in this folder. Use carefully.
            </p>

            <form
              action="save_game.php"
              method="post"
              class="form-row stacked"
              target="_blank"
            >
              <label for="newGameName">Game Name (for your reference)</label>
              <input
                id="newGameName"
                name="game_name"
                type="text"
                class="input"
                placeholder="e.g. Boolean Battle"
                required
              />

              <label for="newHtmlFile">HTML File Name</label>
              <input
                id="newHtmlFile"
                name="html_file"
                type="text"
                class="input"
                placeholder="e.g. boolean_battle.html"
                required
              />

              <label for="newJsFile">JS File Name</label>
              <input
                id="newJsFile"
                name="js_file"
                type="text"
                class="input"
                placeholder="e.g. boolean_battle.js"
                required
              />

              <label for="htmlCodeArea">HTML Code</label>
              <textarea
                id="htmlCodeArea"
                name="html_code"
                class="input"
                rows="8"
                placeholder="Paste full HTML here"
                required
              ></textarea>

              <label for="jsCodeArea">JS Code</label>
              <textarea
                id="jsCodeArea"
                name="js_code"
                class="input"
                rows="8"
                placeholder="Paste full JavaScript here"
                required
              ></textarea>

              <p class="sub-card-meta small">
                After submitting, files will be written into this folder on your
                WAMP server. You can then register the game above so its
                leaderboard can be managed here.
              </p>

              <button type="submit" class="btn">
                Create Files on Server
              </button>
            </form>
          </div>

          <!-- List of registered games -->
          <div class="sub-card">
            <h3 class="sub-card-title">Registered Games</h3>
            <ul id="gameList" class="info-list">
              <!-- Filled by admin.js -->
            </ul>

            <button id="clearAllLbBtn" class="btn btn-small btn-danger">
              Clear All Leaderboards in Registry
            </button>
          </div>
        </section>

        <!-- RIGHT COLUMN: Notes -->
        <aside class="sidebar">
          <section class="card">
            <header class="card-header">
              <h2 class="card-title">How This Works</h2>
            </header>
            <ul class="info-list">
              <li>
                <strong>Protected:</strong> This entire admin dashboard is only
                rendered after entering the correct code (<code>A005</code>).
              </li>
              <li>
                <strong>Registry:</strong> Each game is stored in
                <code>localStorage</code> on this browser as metadata
                (name/file/category/leaderboardKey).
              </li>
              <li>
                <strong>Leaderboards:</strong> Each game gets a
                <code>leaderboardKey</code>. Your game JS should use the same
                key when saving scores.
              </li>
              <li>
                <strong>File Creator:</strong> The “Create New Game Files”
                section posts to <code>save_game.php</code> (PHP) which writes
                the HTML + JS files into this folder on your WAMP server.
              </li>
              <li>
                <strong>Tip:</strong> Don't put an obvious link to this page on
                student menus. Just bookmark <code>admin.php</code> for
                yourself.
              </li>
            </ul>
          </section>
        </aside>
      </section>
    <?php endif; ?>
  </main>
</body>
</html>

