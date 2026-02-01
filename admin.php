<?php
session_start();

const ADMIN_CODE = 'A005';

// Handle login submission
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['admin_code'])) {
    if (trim($_POST['admin_code']) === ADMIN_CODE) {
        $_SESSION['admin_logged_in'] = true;
        header('Location: admin.php');
        exit;
    } else {
        header('Location: admin.html?error=1');
        exit;
    }
}

// Block direct access if not logged in
if (empty($_SESSION['admin_logged_in'])) {
    header('Location: admin.html');
    exit;
}

// Logout
if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: admin.html');
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Admin Panel</title>
  <link rel="stylesheet" href="style.css" />
  <script defer src="admin.js"></script>
</head>
<body class="cs-body">
  <a href="index.html" class="back-link">← Back to Home</a>

  <main class="page-wrap">
    <header class="page-header">
      <h1 class="page-title">// Admin Panel</h1>
      <form method="get">
        <button name="logout" class="btn btn-outline">Logout</button>
      </form>
    </header>

    <!-- ADMIN CONTENT -->
    <section class="layout-grid">
      <section class="card card-main">
        <header class="card-header">
          <h2 class="card-title">Game Management</h2>
          <p class="card-subtitle">Create games, manage leaderboards</p>
        </header>

        <div class="sub-card">
          <h3 class="sub-card-title">Register Game</h3>
          <input id="gameNameInput" class="input" placeholder="Game Name" />
          <input id="gameFileInput" class="input" placeholder="HTML File (example.html)" />
          <select id="gameCategorySelect" class="input">
            <option value="cs">Computer Science</option>
            <option value="it">Information Technology</option>
            <option value="cyber">Cyber Security</option>
          </select>
          <button id="addGameBtn" class="btn">Register Game</button>
        </div>

        <div class="sub-card">
          <h3 class="sub-card-title">Registered Games</h3>
          <ul id="gameList" class="info-list"></ul>
          <button id="clearAllLbBtn" class="btn btn-danger btn-small">
            Clear All Leaderboards
          </button>
        </div>
      </section>
    </section>
  </main>
</body>
</html>


