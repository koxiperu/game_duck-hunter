const theDuck = document.querySelector("#duck");
var up = 10;
var left = 10;
var scoreDuck = 0;
var scoreHunter = 0;
var matchCount = 0;
var emptyName = true;
var moveTimer;
var roundTimer;
var stepTimer;
var count=0;
document.querySelector("#again").style.display="none";
document.querySelector("#result").style.display="none";
document.querySelector("#again").addEventListener("click", reset);

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
  reset();
  document.querySelector("#playerDuck h2").innerText = "";
  document.querySelector("#playerHunter h2").innerText = "";
  document.querySelector("#playerDuck p").innerText = "score";
  document.querySelector("#playerHunter p").innerText = "score";
  inputNames();
  
}

function reset(){
  document.querySelector("#playerHunter").style.display="flex";
  document.querySelector("#playerDuck").style.display="flex";
  document.querySelector("#again").style.display="none";
  document.querySelector("#result").style.display="none";
  theDuck.style.border = "2px solid green";
  scoreDuck = 0;
  scoreHunter = 0;
  document.querySelector("#playerHunter p").innerText = scoreHunter;
  document.querySelector("#playerDuck p").innerText = scoreDuck;
  up = 10;
  left = 10;
  theDuck.style.top = up + "%";
  theDuck.style.left = left + "%";
}

//Starts the first ROUND and
//Restart  round of game (ONE of FIVE)
function startRound() {
  enablePlayers();
  if (emptyName) {
      moveDuckRandom(true);     
    } else {
      document.addEventListener("keydown", moveDuck);
    };
  } 

function checkWinner() {
  if (scoreDuck > scoreHunter) {
    alert("Game over! Duck win  " + scoreDuck + ":" + scoreHunter + "!");
    document.querySelector("#playerHunter").style.display="none";
    document.querySelector("#playerDuck").style.display="none";
    document.querySelector("#again").style.display="block";
    document.querySelector("#result").style.display="flex";
    document.querySelector("#result h2").innerText = scoreDuck+" : "+scoreHunter;
    document.querySelector("#result p").innerText = "Duck win!";
  } else if (scoreDuck < scoreHunter) {
    alert("Game over! Hunter win  " + scoreDuck + ":" + scoreHunter + "!");
    document.querySelector("#playerHunter").style.display="none";
    document.querySelector("#playerDuck").style.display="none";
    document.querySelector("#again").style.display="block";
    document.querySelector("#result").style.display="flex";
    document.querySelector("#result h2").innerText = scoreDuck+" : "+scoreHunter;
    document.querySelector("#result p").innerText = "Hunter win!";
  };
};

function moveDuckRandom(move) {
  if (move) {
    let randomStep = Math.floor(Math.random() * 4);
    let randomLength=Math.floor(Math.random()*10)+1;
    count=0;
    console.log(randomStep);
    console.log(randomLength);
    if (randomStep == 0) {
      const wrapperFunction = () => moveDuckUp(randomLength);
        stepTimer=setInterval(wrapperFunction,100);
    };
     
    if (randomStep == 1) {
      const wrapperFunction = () => moveDuckRight(randomLength);
        stepTimer=setInterval(wrapperFunction,100);
    };

    if (randomStep == 2) {
      const wrapperFunction = () => moveDuckDown(randomLength);
        stepTimer=setInterval(wrapperFunction,100);
    };

    if (randomStep == 3) {
      const wrapperFunction = () => moveDuckLeft(randomLength);
        stepTimer=setInterval(wrapperFunction,100);
    };
  }else {
    clearInterval(stepTimer);
    clearTimeout(moveTimer);
    disablePlayers();
  }  
}


function moveDuck(event) {
  switch (event.code) {
    case "ArrowDown":
      moveDuckDown(0);
      break;
    case "ArrowUp":
      moveDuckUp(0);
      break;
    case "ArrowLeft":
      moveDuckLeft(0);
      break;
    case "ArrowRight":
      moveDuckRight(0);
      break;
  }
}



function moveDuckLeft(quantity) {
  if (left > 0) {
    left = left - 1;
  } else {
    left = 90;
  };
  duck.style.left = left + "%";
  if (quantity!=0) {
    count++;
    console.log("randomLength = "+quantity);
    console.log("count (left)= "+count);
    if (count >= quantity) {
      clearInterval(stepTimer);
      moveDuckRandom(true);
    };
  };
  
}
function moveDuckRight(quantity) {
  if (left < 90) {
    left = left + 1;
  } else {
    left = 0;
  }
  duck.style.left = left + "%";
  if (quantity!=0) {
    count++;
    console.log("randomLength = "+quantity);
    console.log("count (right)= "+count);
    if (count >= quantity) {
      clearInterval(stepTimer);
      moveDuckRandom(true);
    }
  }
  
}
function moveDuckDown(quantity) {
  if (up < 90) {
    up = up + 1;
  } else {
    up = 0;
  }
  duck.style.top = up + "%";
  if (quantity!=0) {
    count++;
    console.log("randomLength = "+quantity);
    console.log("count (down)= "+count);
    if (count >= quantity) {
      clearInterval(stepTimer);
      moveDuckRandom(true);
    }
  }  
}
function moveDuckUp(quantity) {
  if (up > 0) {
    up = up - 1;
  } else {
    up = 90;
  }
  duck.style.top = up + "%";
  if (quantity!=0) {
    count++;
    console.log("randomLength = "+quantity);
    console.log("count (up)= "+count);
    if (count >= quantity) {
      clearInterval(stepTimer);
      moveDuckRandom(true);
    }
  }
  
}


// Function for Hunter victory
function kill() {
  theDuck.style.border = "2px solid red";
  scoreHunter = scoreHunter + 1;
  document.querySelector("#playerHunter p").innerText = scoreHunter;
  matchCount = scoreDuck + scoreHunter;  
  moveDuckRandom(false);
  alert("Duck killed");
  if ((matchCount == 5) || (scoreDuck == 3) || (scoreHunter == 3)) {
    checkWinner();
  };
  
}

// Duck Victory functions. disables input and enables alert
function duckVictory() {
  theDuck.style.border = "2px solid green";
  scoreDuck = scoreDuck + 1;
  document.querySelector("#playerDuck p").innerText = scoreDuck;
  matchCount = scoreDuck + scoreHunter;
  moveDuckRandom(false);
  alert("Hunter lost");
  if ((matchCount == 5) || (scoreDuck == 3) || (scoreHunter == 3)) {
    checkWinner();
  };
}

// Disable and enable player inputs
function disablePlayers() {
  up = 10;
  left = 10;
  theDuck.style.top = up + "%";
  theDuck.style.left = left + "%";
  theDuck.removeEventListener("click", kill);
  document.removeEventListener("keydown", moveDuck);
  clearTimeout(roundTimer);
  clearTimeout(moveTimer);
  clearInterval(stepTimer);
}

function enablePlayers() {
  theDuck.addEventListener("click", kill);
  count=0;
  up = 10;
  left = 10;
  theDuck.style.top = up + "%";
  theDuck.style.left = left + "%";
  theDuck.style.border = "2px solid green";
  roundTimer = setTimeout(duckVictory, 5000);
}