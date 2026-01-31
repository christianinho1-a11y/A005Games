// if_else_escape.js

// ----- Game settings -----

const MAX_LIVES = 3;
const TOTAL_QUESTIONS_PER_GAME = 50; // 5 levels * 10 questions per level
const LEADERBOARD_KEY = "if_else_escape_leaderboard";

// ----- Question bank (100 questions) -----
//
// Each question tests understanding of if / else logic.
// correctIndex is the index of the correct choice in choices[].

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
      'It shows nothing.',
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

  // 11: simple if (boundary & equality)
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
  // 12
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
  // 13
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
  // 14
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
  // 15
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
  // 16
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
  // 17
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
  // 18
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
  // 19
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
  // 20
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

  // 21: if / else
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
  // 22
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
  // 23
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
  // 24
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
  // 25
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
  // 26
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
  // 27
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
  // 28
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
  // 29
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
  // 30
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

  // 31: if / else with flags
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
  // 32
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
  // 33
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
  // 34
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
  // 35
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
  // 36
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
  // 37
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
  // 38
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
  // 39
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
  // 40
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

  // 41: else-if chains (grades, ranges)
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
  // 42
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
  // 43
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
  // 44
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
  // 45
  {
    scenario:
      "Classify temperature. temp = 12.",
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
  // 46
  {
    scenario:
      "Classify temperature. temp = -3.",
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
  // 47
  {
    scenario:
      "Classify temperature. temp = 5.",
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
  // 48
  {
    scenario:
      "Classify temperature. temp = 25.",
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
  // 49
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
  // 50
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

  // 51: ranges & else-if
  {
    scenario:
      "Classify age group. age = 14.",
    code: `if (age < 13) {
  group = "Child";
} else if (age < 18) {
  group = "Teen";
} else {
  group = "Adult";
}`,
    choices: [
      'group is "Child".',
      'group is "Teen".',
      'group is "Adult".',
    ],
    correctIndex: 1,
  },
  // 52
  {
    scenario:
      "Classify age group. age = 7.",
    code: `if (age < 13) {
  group = "Child";
} else if (age < 18) {
  group = "Teen";
} else {
  group = "Adult";
}`,
    choices: [
      'group is "Child".',
      'group is "Teen".',
      'group is "Adult".',
    ],
    correctIndex: 0,
  },
  // 53
  {
    scenario:
      "Classify age group. age = 19.",
    code: `if (age < 13) {
  group = "Child";
} else if (age < 18) {
  group = "Teen";
} else {
  group = "Adult";
}`,
    choices: [
      'group is "Child".',
      'group is "Teen".',
      'group is "Adult".',
    ],
    correctIndex: 2,
  },
  // 54
  {
    scenario:
      "The code checks testScore and prints a message. testScore = 70.",
    code: `if (testScore >= 90) {
  print("Excellent");
} else if (testScore >= 70) {
  print("Good");
} else {
  print("Needs work");
}`,
    choices: [
      'Prints "Excellent".',
      'Prints "Good".',
      'Prints "Needs work".',
    ],
    correctIndex: 1,
  },
  // 55
  {
    scenario:
      "The code checks testScore and prints a message. testScore = 65.",
    code: `if (testScore >= 90) {
  print("Excellent");
} else if (testScore >= 70) {
  print("Good");
} else {
  print("Needs work");
}`,
    choices: [
      'Prints "Excellent".',
      'Prints "Good".',
      'Prints "Needs work".',
    ],
    correctIndex: 2,
  },
  // 56
  {
    scenario:
      "Shipping cost depends on weight. weight = 0.5.",
    code: `if (weight <= 1) {
  shipping = 5;
} else if (weight <= 5) {
  shipping = 10;
} else {
  shipping = 20;
}`,
    choices: ["shipping = 5", "shipping = 10", "shipping = 20"],
    correctIndex: 0,
  },
  // 57
  {
    scenario:
      "Shipping cost depends on weight. weight = 3.",
    code: `if (weight <= 1) {
  shipping = 5;
} else if (weight <= 5) {
  shipping = 10;
} else {
  shipping = 20;
}`,
    choices: ["shipping = 5", "shipping = 10", "shipping = 20"],
    correctIndex: 1,
  },
  // 58
  {
    scenario:
      "Shipping cost depends on weight. weight = 8.",
    code: `if (weight <= 1) {
  shipping = 5;
} else if (weight <= 5) {
  shipping = 10;
} else {
  shipping = 20;
}`,
    choices: ["shipping = 5", "shipping = 10", "shipping = 20"],
    correctIndex: 2,
  },
  // 59
  {
    scenario:
      "Classify examStatus. missingAssignments = 0 and average >= 60. average = 75.",
    code: `if (missingAssignments > 0) {
  examStatus = "Not allowed";
} else if (average >= 70) {
  examStatus = "Ready";
} else {
  examStatus = "At risk";
}`,
    choices: [
      'examStatus is "Not allowed".',
      'examStatus is "Ready".',
      'examStatus is "At risk".',
    ],
    correctIndex: 1,
  },
  // 60
  {
    scenario:
      "Classify examStatus. missingAssignments = 2 and average = 95.",
    code: `if (missingAssignments > 0) {
  examStatus = "Not allowed";
} else if (average >= 70) {
  examStatus = "Ready";
} else {
  examStatus = "At risk";
}`,
    choices: [
      'examStatus is "Not allowed".',
      'examStatus is "Ready".',
      'examStatus is "At risk".',
    ],
    correctIndex: 0,
  },

  // 61: logical AND / OR
  {
    scenario:
      "You can ride the roller coaster if height >= 48 AND age >= 12. height = 50, age = 10.",
    code: `if (height >= 48 && age >= 12) {
  canRide = true;
} else {
  canRide = false;
}`,
    choices: [
      "canRide is true.",
      "canRide is false.",
      "canRide is unchanged.",
    ],
    correctIndex: 1,
  },
  // 62
  {
    scenario:
      "You can ride the roller coaster if height >= 48 AND age >= 12. height = 50, age = 13.",
    code: `if (height >= 48 && age >= 12) {
  canRide = true;
} else {
  canRide = false;
}`,
    choices: [
      "canRide is true.",
      "canRide is false.",
      "canRide is unchanged.",
    ],
    correctIndex: 0,
  },
  // 63
  {
    scenario:
      "You get free shipping if isMember is true OR total >= 100. isMember = false, total = 120.",
    code: `if (isMember || total >= 100) {
  freeShipping = true;
} else {
  freeShipping = false;
}`,
    choices: [
      "freeShipping is true.",
      "freeShipping is false.",
      "freeShipping is unchanged.",
    ],
    correctIndex: 0,
  },
  // 64
  {
    scenario:
      "You get free shipping if isMember is true OR total >= 100. isMember = false, total = 50.",
    code: `if (isMember || total >= 100) {
  freeShipping = true;
} else {
  freeShipping = false;
}`,
    choices: [
      "freeShipping is true.",
      "freeShipping is false.",
      "freeShipping is unchanged.",
    ],
    correctIndex: 1,
  },
  // 65
  {
    scenario:
      "You can enter the lab if hasGoggles AND hasBadge. hasGoggles = true, hasBadge = false.",
    code: `if (hasGoggles && hasBadge) {
  canEnterLab = true;
} else {
  canEnterLab = false;
}`,
    choices: [
      "canEnterLab is true.",
      "canEnterLab is false.",
      "canEnterLab is unchanged.",
    ],
    correctIndex: 1,
  },
  // 66
  {
    scenario:
      "The phone is in 'Do Not Disturb' if isSleeping OR inMeeting. isSleeping = false, inMeeting = true.",
    code: `if (isSleeping || inMeeting) {
  doNotDisturb = true;
} else {
  doNotDisturb = false;
}`,
    choices: [
      "doNotDisturb is true.",
      "doNotDisturb is false.",
      "doNotDisturb is unchanged.",
    ],
    correctIndex: 0,
  },
  // 67
  {
    scenario:
      "The phone is in 'Do Not Disturb' if isSleeping OR inMeeting. isSleeping = false, inMeeting = false.",
    code: `if (isSleeping || inMeeting) {
  doNotDisturb = true;
} else {
  doNotDisturb = false;
}`,
    choices: [
      "doNotDisturb is true.",
      "doNotDisturb is false.",
      "doNotDisturb is unchanged.",
    ],
    correctIndex: 1,
  },
  // 68
  {
    scenario:
      "A player can use a special move if energy >= 50 AND hasPowerUp. energy = 80, hasPowerUp = false.",
    code: `if (energy >= 50 && hasPowerUp) {
  useSpecial();
} else {
  basicMove();
}`,
    choices: [
      "useSpecial() runs.",
      "basicMove() runs.",
      "Neither runs.",
    ],
    correctIndex: 1,
  },
  // 69
  {
    scenario:
      "A player can use a special move if energy >= 50 AND hasPowerUp. energy = 30, hasPowerUp = true.",
    code: `if (energy >= 50 && hasPowerUp) {
  useSpecial();
} else {
  basicMove();
}`,
    choices: [
      "useSpecial() runs.",
      "basicMove() runs.",
      "Neither runs.",
    ],
    correctIndex: 1,
  },
  // 70
  {
    scenario:
      "A player can use a special move if energy >= 50 AND hasPowerUp. energy = 80, hasPowerUp = true.",
    code: `if (energy >= 50 && hasPowerUp) {
  useSpecial();
} else {
  basicMove();
}`,
    choices: [
      "useSpecial() runs.",
      "basicMove() runs.",
      "Neither runs.",
    ],
    correctIndex: 0,
  },

  // 71: NOT and combos
  {
    scenario:
      "The system only runs backup if NOT isWeekend. isWeekend = true.",
    code: `if (!isWeekend) {
  runBackup();
} else {
  skipBackup();
}`,
    choices: [
      "runBackup() runs.",
      "skipBackup() runs.",
      "Neither runs.",
    ],
    correctIndex: 1,
  },
  // 72
  {
    scenario:
      "The system only runs backup if NOT isWeekend. isWeekend = false.",
    code: `if (!isWeekend) {
  runBackup();
} else {
  skipBackup();
}`,
    choices: [
      "runBackup() runs.",
      "skipBackup() runs.",
      "Neither runs.",
    ],
    correctIndex: 0,
  },
  // 73
  {
    scenario:
      "The alarm rings if !isMuted AND volume > 0. isMuted = true, volume = 100.",
    code: `if (!isMuted && volume > 0) {
  ringAlarm();
} else {
  // silent
}`,
    choices: [
      "ringAlarm() runs.",
      "Nothing happens.",
      "Volume becomes 0.",
    ],
    correctIndex: 1,
  },
  // 74
  {
    scenario:
      "The alarm rings if !isMuted AND volume > 0. isMuted = false, volume = 0.",
    code: `if (!isMuted && volume > 0) {
  ringAlarm();
} else {
  // silent
}`,
    choices: [
      "ringAlarm() runs.",
      "Nothing happens.",
      "Volume becomes 100.",
    ],
    correctIndex: 1,
  },
  // 75
  {
    scenario:
      "The alarm rings if !isMuted AND volume > 0. isMuted = false, volume = 50.",
    code: `if (!isMuted && volume > 0) {
  ringAlarm();
} else {
  // silent
}`,
    choices: [
      "ringAlarm() runs.",
      "Nothing happens.",
      "Volume becomes 0.",
    ],
    correctIndex: 0,
  },
  // 76
  {
    scenario:
      "You can submit homework if isSubmitted == false AND beforeDeadline == true. isSubmitted = false, beforeDeadline = true.",
    code: `if (!isSubmitted && beforeDeadline) {
  submit();
} else {
  lockSubmission();
}`,
    choices: [
      "submit() runs.",
      "lockSubmission() runs.",
      "Neither runs.",
    ],
    correctIndex: 0,
  },
  // 77
  {
    scenario:
      "You can submit homework if isSubmitted == false AND beforeDeadline == true. isSubmitted = true, beforeDeadline = true.",
    code: `if (!isSubmitted && beforeDeadline) {
  submit();
} else {
  lockSubmission();
}`,
    choices: [
      "submit() runs.",
      "lockSubmission() runs.",
      "Neither runs.",
    ],
    correctIndex: 1,
  },
  // 78
  {
    scenario:
      "You can submit homework if isSubmitted == false AND beforeDeadline == true. isSubmitted = false, beforeDeadline = false.",
    code: `if (!isSubmitted && beforeDeadline) {
  submit();
} else {
  lockSubmission();
}`,
    choices: [
      "submit() runs.",
      "lockSubmission() runs.",
      "Neither runs.",
    ],
    correctIndex: 1,
  },
  // 79
  {
    scenario:
      "A message shows if NOT (isOnline OR isAway). isOnline = false, isAway = false.",
    code: `if (!(isOnline || isAway)) {
  show("User is offline");
} else {
  // do nothing
}`,
    choices: [
      'Shows "User is offline".',
      "Shows nothing.",
      "Shows an error.",
    ],
    correctIndex: 0,
  },
  // 80
  {
    scenario:
      "A message shows if NOT (isOnline OR isAway). isOnline = true, isAway = false.",
    code: `if (!(isOnline || isAway)) {
  show("User is offline");
} else {
  // do nothing
}`,
    choices: [
      'Shows "User is offline".',
      "Shows nothing.",
      "Shows an error.",
    ],
    correctIndex: 1,
  },

  // 81: nested-ish decision flavor
  {
    scenario:
      "If hasTicket is true, then you also check if seatNumber > 0. hasTicket = true, seatNumber = 15.",
    code: `if (hasTicket) {
  if (seatNumber > 0) {
    canSit = true;
  }
}`,
    choices: [
      "canSit becomes true.",
      "canSit becomes false.",
      "seatNumber becomes 0.",
    ],
    correctIndex: 0,
  },
  // 82
  {
    scenario:
      "If hasTicket is true, then you also check if seatNumber > 0. hasTicket = false, seatNumber = 15.",
    code: `if (hasTicket) {
  if (seatNumber > 0) {
    canSit = true;
  }
}`,
    choices: [
      "canSit becomes true.",
      "Inner if never runs.",
      "seatNumber becomes 0.",
    ],
    correctIndex: 1,
  },
  // 83
  {
    scenario:
      "If loggedIn is true, you show the dashboard; otherwise login page. loggedIn = true.",
    code: `if (loggedIn) {
  showDashboard();
} else {
  showLoginPage();
}`,
    choices: [
      "showDashboard() runs.",
      "showLoginPage() runs.",
      "Both run.",
    ],
    correctIndex: 0,
  },
  // 84
  {
    scenario:
      "If loggedIn is true, you show the dashboard; otherwise login page. loggedIn = false.",
    code: `if (loggedIn) {
  showDashboard();
} else {
  showLoginPage();
}`,
    choices: [
      "showDashboard() runs.",
      "showLoginPage() runs.",
      "Both run.",
    ],
    correctIndex: 1,
  },
  // 85
  {
    scenario:
      "The program checks if clicks > 0; if not, shows a hint. clicks = 0.",
    code: `if (clicks > 0) {
  show("Nice job!");
} else {
  show("Try clicking the button.");
}`,
    choices: [
      'Shows "Nice job!".',
      'Shows "Try clicking the button."',
      "Shows nothing.",
    ],
    correctIndex: 1,
  },
  // 86
  {
    scenario:
      "The program checks if clicks > 0; if not, shows a hint. clicks = 3.",
    code: `if (clicks > 0) {
  show("Nice job!");
} else {
  show("Try clicking the button.");
}`,
    choices: [
      'Shows "Nice job!".',
      'Shows "Try clicking the button."',
      "Shows nothing.",
    ],
    correctIndex: 0,
  },
  // 87
  {
    scenario:
      "If score >= 100 OR hasCheatCode, you win instantly. score = 80, hasCheatCode = true.",
    code: `if (score >= 100 || hasCheatCode) {
  winGame();
} else {
  keepPlaying();
}`,
    choices: [
      "winGame() runs.",
      "keepPlaying() runs.",
      "Neither runs.",
    ],
    correctIndex: 0,
  },
  // 88
  {
    scenario:
      "If score >= 100 OR hasCheatCode, you win instantly. score = 80, hasCheatCode = false.",
    code: `if (score >= 100 || hasCheatCode) {
  winGame();
} else {
  keepPlaying();
}`,
    choices: [
      "winGame() runs.",
      "keepPlaying() runs.",
      "Neither runs.",
    ],
    correctIndex: 1,
  },
  // 89
  {
    scenario:
      "If passwordLength >= 8 AND hasSymbol, password is strong. passwordLength = 10, hasSymbol = false.",
    code: `if (passwordLength >= 8 && hasSymbol) {
  strength = "Strong";
} else {
  strength = "Weak";
}`,
    choices: [
      'strength is "Strong".',
      'strength is "Weak".',
      "strength is unchanged.",
    ],
    correctIndex: 1,
  },
  // 90
  {
    scenario:
      "If passwordLength >= 8 AND hasSymbol, password is strong. passwordLength = 10, hasSymbol = true.",
    code: `if (passwordLength >= 8 && hasSymbol) {
  strength = "Strong";
} else {
  strength = "Weak";
}`,
    choices: [
      'strength is "Strong".',
      'strength is "Weak".',
      "strength is unchanged.",
    ],
    correctIndex: 0,
  },

  // 91–100: misc conditionals
  {
    scenario:
      "If day == 'Saturday' OR day == 'Sunday', it is weekend. day = 'Saturday'.",
    code: `if (day == "Saturday" || day == "Sunday") {
  isWeekend = true;
} else {
  isWeekend = false;
}`,
    choices: [
      "isWeekend is true.",
      "isWeekend is false.",
      "isWeekend is unchanged.",
    ],
    correctIndex: 0,
  },
  {
    scenario:
      "If day == 'Saturday' OR day == 'Sunday', it is weekend. day = 'Wednesday'.",
    code: `if (day == "Saturday" || day == "Sunday") {
  isWeekend = true;
} else {
  isWeekend = false;
}`,
    choices: [
      "isWeekend is true.",
      "isWeekend is false.",
      "isWeekend is unchanged.",
    ],
    correctIndex: 1,
  },
  {
    scenario:
      "If score < 50, status is 'Fail'; else if score < 70, 'OK'; else 'Great'. score = 55.",
    code: `if (score < 50) {
  status = "Fail";
} else if (score < 70) {
  status = "OK";
} else {
  status = "Great";
}`,
    choices: [
      'status is "Fail".',
      'status is "OK".',
      'status is "Great".',
    ],
    correctIndex: 1,
  },
  {
    scenario:
      "If score < 50, status is 'Fail'; else if score < 70, 'OK'; else 'Great'. score = 45.",
    code: `if (score < 50) {
  status = "Fail";
} else if (score < 70) {
  status = "OK";
} else {
  status = "Great";
}`,
    choices: [
      'status is "Fail".',
      'status is "OK".',
      'status is "Great".',
    ],
    correctIndex: 0,
  },
  {
    scenario:
      "If score < 50, status is 'Fail'; else if score < 70, 'OK'; else 'Great'. score = 90.",
    code: `if (score < 50) {
  status = "Fail";
} else if (score < 70) {
  status = "OK";
} else {
  status = "Great";
}`,
    choices: [
      'status is "Fail".',
      'status is "OK".',
      'status is "Great".',
    ],
    correctIndex: 2,
  },
  {
    scenario:
      "If attendance >= 90 AND average >= 80 you earn honors. attendance = 92, average = 79.",
    code: `if (attendance >= 90 && average >= 80) {
  honors = true;
} else {
  honors = false;
}`,
    choices: [
      "honors is true.",
      "honors is false.",
      "honors is unchanged.",
    ],
    correctIndex: 1,
  },
  {
    scenario:
      "If attendance >= 90 AND average >= 80 you earn honors. attendance = 95, average = 88.",
    code: `if (attendance >= 90 && average >= 80) {
  honors = true;
} else {
  honors = false;
}`,
    choices: [
      "honors is true.",
      "honors is false.",
      "honors is unchanged.",
    ],
    correctIndex: 0,
  },
  {
    scenario:
      "If rainChance > 0.5 AND hasUmbrella is false, show 'Buy umbrella'. rainChance = 0.8, hasUmbrella = false.",
    code: `if (rainChance > 0.5 && !hasUmbrella) {
  show("Buy umbrella");
} else {
  show("You're fine");
}`,
    choices: [
      'Shows "Buy umbrella".',
      `Shows "You're fine".`,
      "Shows nothing.",
    ],
    correctIndex: 0,
  },
  {
    scenario:
      "If rainChance > 0.5 AND hasUmbrella is false, show 'Buy umbrella'. rainChance = 0.3, hasUmbrella = false.",
    code: `if (rainChance > 0.5 && !hasUmbrella) {
  show("Buy umbrella");
} else {
  show("You're fine");
}`,
    choices: [
      'Shows "Buy umbrella".',
      `Shows "You're fine".`,
      "Shows nothing.",
    ],
    correctIndex: 1,
  },
  {
    scenario:
      "If rainChance > 0.5 AND hasUmbrella is false, show 'Buy umbrella'. rainChance = 0.9, hasUmbrella = true.",
    code: `if (rainChance > 0.5 && !hasUmbrella) {
  show("Buy umbrella");
} else {
  show("You're fine");
}`,
    choices: [
      'Shows "Buy umbrella".',
      `Shows "You're fine".`,
      "Shows nothing.",
    ],
    correctIndex: 1,
  },
];

// ----- State -----

let currentQuestionIndex = 0; // index in the current game's order (0..49)
let questionOrder = []; // array of indices into IF_ELSE_QUESTIONS
let currentScore = 0;
let currentPlayerName = "";
let hasAnsweredCurrent = false;
let gameFinished = false;
let scoreSavedForThisGame = false;
let livesLeft = MAX_LIVES;

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

// Fisher-Yates shuffle
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function generateQuestionOrder() {
  const indices = [...Array(IF_ELSE_QUESTIONS.length).keys()]; // 0..99
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
  const qIndex = questionOrder[currentQuestionIndex];
  const q = IF_ELSE_QUESTIONS[qIndex];

  if (!q) {
    endGame();
    return;
  }

  const questionNumber = currentQuestionIndex + 1; // 1..50
  const level = Math.min(
    5,
    1 + Math.floor(currentQuestionIndex / 10) // 0-9 -> L1, 10-19 -> L2, etc.
  );

  const levelInfo = $("levelInfo");
  levelInfo.textContent = `Level ${level} – Question ${questionNumber} / ${TOTAL_QUESTIONS_PER_GAME}`;

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
    currentScore += 1;
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


