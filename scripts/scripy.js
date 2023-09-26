const theDuck = document.querySelector("#duck");
var up = 10;
var left = 10;
var scoreDuck = 0;
var scoreHunter = 0;
var matchCount = 0;
var myTimer;
var emptyName = true;
var moveTimer;
var stepTimer;
var move = true;

//names of players
function inputNames() {
  const nameDuck = prompt("The first player (the duck) is ...");
  const nameHunter = prompt("The second player (the Hunter) is ...");
  if (nameDuck == "") {
    document.querySelector("#playerDuck h2").innerText = "computer";
  } else {
    document.querySelector("#playerDuck h2").innerText = nameDuck;
    emptyName = false;
  }
  document.querySelector("#playerHunter h2").innerText = nameHunter;
  document.querySelector("#playerHunter p").innerText = 0;
  document.querySelector("#playerDuck p").innerText = 0;
}

document.querySelector("#newgame").addEventListener("click", newGame);
document.querySelector("#startRound").addEventListener("click", startRound);

//New Game - with new players
function newGame() {
  document.querySelector("#playerDuck h2").innerText = "";
  document.querySelector("#playerHunter h2").innerText = "";
  document.querySelector("#playerDuck p").innerText = "score";
  document.querySelector("#playerHunter p").innerText = "score";
  inputNames();
}

//Starts the first ROUND and
//Restart  round of game (ONE of FIVE)
function startRound() {
  up = 10;
  left = 10;
  theDuck.style.top = up + "%";
  theDuck.style.left = left + "%";
  theDuck.style.border = "2px solid green";
  clearInterval(moveTimer);
  matchCount = scoreDuck + scoreHunter;
  if ((matchCount < 5) && (scoreDuck != 3) && (scoreHunter != 3)) {
    if (emptyName) {
      theDuck.addEventListener("click", paintBorderRed);
      myTimer = setTimeout(duckVictory, 5000);
      moveTimer = setInterval(moveDuckRandom, 500);
    } else {
      enablePlayers();
      myTimer = setTimeout(duckVictory, 5000);
    };
  } else {
    checkWinner();
  };
}
function checkWinner() {
  if (scoreDuck > scoreHunter) {
    alert("Game over! Duck win  " + scoreDuck + ":" + scoreHunter + "!");
  } else if (scoreDuck < scoreHunter) {
    alert("Game over! Hunter win  " + scoreDuck + ":" + scoreHunter + "!");
  };
  scoreDuck = 0;
  scoreHunter = 0;
  document.querySelector("#playerHunter p").innerText = scoreHunter;
  document.querySelector("#playerDuck p").innerText = scoreDuck;
  clearInterval(moveTimer);
  up = 10;
  left = 10;
  theDuck.style.top = up + "%";
  theDuck.style.left = left + "%";
};

function moveDuckRandom() {
  let randomStep = Math.floor(Math.random() * 4);
  let randomLength=Math.floor(Math.random()*10);
  if (randomStep == 0) {
    for (let i=0;i<randomLength;i++) {
      moveDuckUp();
    }   
  };
  if (randomStep == 1) {
    for (let i=0;i<randomLength;i++) {
      moveDuckRight();
    }
  };
  if (randomStep == 2) {
    for (let i=0;i<randomLength;i++) {
      moveDuckDown();
    }
  };
  if (randomStep == 3) {
    for (let i=0;i<randomLength;i++) {
      moveDuckLeft();
    }
  };
}


function moveDuck(event) {
  switch (event.code) {
    case "ArrowDown":
      moveDuckDown();
      break;

    case "ArrowUp":
      moveDuckUp();
      break;

    case "ArrowLeft":
      moveDuckLeft();
      break;

    case "ArrowRight":
      moveDuckRight();
      break;
  }
}



function moveDuckLeft() {
  if (left > 0) {
    left = left - 1;
  } else {
    left = 90;
  }
  duck.style.left = left + "%";
}
function moveDuckRight() {
  if (left < 90) {
    left = left + 1;
  } else {
    left = 0;
  }
  duck.style.left = left + "%";
}
function moveDuckDown() {
  if (up < 90) {
    up = up + 1;
  } else {
    up = 0;
  }
  duck.style.top = up + "%";
}
function moveDuckUp() {
  if (up > 0) {
    up = up - 1;
  } else {
    up = 90;
  }
  duck.style.top = up + "%";
}

function paintBorderRed() {
  theDuck.style.border = "2px solid red";
  kill();
}
// Function for Hunter victory
function kill() {
  scoreHunter = scoreHunter + 1;
  document.querySelector("#playerHunter p").innerText = scoreHunter;
  matchCount = scoreDuck + scoreHunter;
  if ((matchCount == 5) || (scoreDuck == 3) || (scoreHunter == 3)) {
    checkWinner();
  } else {
    disablePlayers();
    alert("Duck killed");

  }
}
// Duck Victory functions. disables input and enables alert
function duckVictory() {
  theDuck.style.border = "2px solid green";
  scoreDuck = scoreDuck + 1;
  document.querySelector("#playerDuck p").innerText = scoreDuck;
  matchCount = scoreDuck + scoreHunter;
  if ((matchCount == 5) || (scoreDuck == 3) || (scoreHunter == 3)) {
    checkWinner();
  } else {
    disablePlayers();
    alert("Hunter lost");

  }
}
// Disable and enable player inputs
function disablePlayers() {
  up = 10;
  left = 10;
  theDuck.style.top = up + "%";
  theDuck.style.left = left + "%";
  theDuck.removeEventListener("click", kill);
  document.removeEventListener("keydown", moveDuck);
  clearInterval(moveTimer);
  clearInterval(stepTimer);
  clearTimeout(myTimer);
}

function enablePlayers() {
  theDuck.addEventListener("click", paintBorderRed);
  document.addEventListener("keydown", moveDuck);
  up = 10;
  left = 10;
  theDuck.style.top = up + "%";
  theDuck.style.left = left + "%";
}