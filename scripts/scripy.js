    const theDuck = document.querySelector("#duck");
      var up = 10;
      var left = 10;
      var scoreDuck = 0;
      var scoreHunter = 0;
      var matchCount = 0;
      var myTimer;
      var emptyName=true;
      let moveTimer = setInterval(moveDuckRandom, 200);
      clearInterval(moveTimer);

      moveDuckRandom();
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
        document.querySelector("#duck").style.border="0 solid red";
        matchCount=scoreDuck+scoreHunter;
        if ((matchCount<5)&&(scoreDuck!=3)&&(scoreHunter!=3)) {
          console.log(emptyName);
          if(emptyName) {
            console.log(1);
            moveTimer = setInterval(moveDuckRandom, 200);
          } else {
            console.log(2);
            enablePlayers();
          myTimer = setTimeout(duckVictory, 3000);
          theDuck.style.backgroundColor = "green";
          up = 10;
          left = 10;
          theDuck.style.top = up+"%";
          theDuck.style.left = left+"%";
          }         
          
        } else {
          checkWinner();          
        }
      }
      function checkWinner() {
        if (scoreDuck > scoreHunter) {
            alert("Game over! Duck win!");
          } else if (scoreDuck < scoreHunter) {
            alert("Game over! Hunter win!");
          };
          scoreDuck = 0;
          scoreHunter = 0;
          document.querySelector("#playerHunter p").innerText = scoreHunter;
          document.querySelector("#playerDuck p").innerText = scoreDuck;
        };

      function moveDuck(event) {
        switch(event.code){
            case "ArrowDown" :
                moveDuckDown();
                break;

            case "ArrowUp" :
                moveDuckUp();
                break;

            case "ArrowLeft" :
                moveDuckLeft();
                break;

            case "ArrowRight" :
                moveDuckRight();
                break;
        }
      }

      function moveDuckRandom(){
        console.log("MErde");
        for (let i=0; i<100;i++) {
          console.log(i);
          let changeUp=Math.round(Math.random());
          let changeLeft=Math.round(Math.random());
          console.log(changeUp,changeLeft);
          if (changeUp==0){changeUp=-1};
          if (changeLeft==0){changeLeft=-1};
          duck.style.left=left+changeLeft+"%";
          duck.style.top=up+changeUp+"%";
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

      // Function for Hunter victory
      function kill() {
        theDuck.style.backgroundColor = "red";
        disablePlayers();
        alert("Hunter wins!");
        scoreHunter = scoreHunter + 1;
        console.log(scoreHunter);
        document.querySelector("#duck").style.border="2px solid red";
        document.querySelector("#playerHunter p").innerText = scoreHunter;
        clearTimeout(myTimer);
      }
      // Duck Victory functions. disables input and enables alert
      function duckVictory() {
        alert("Duck wins!");
        disablePlayers();
        theDuck.style.backgroundColor = "green";
        scoreDuck = scoreDuck + 1;
        document.querySelector("#playerDuck p").innerText = scoreDuck;
        clearTimeout(myTimer);
      }
      // Disable and enable player inputs
      function disablePlayers() {
        theDuck.removeEventListener("click", kill);
        document.removeEventListener("keydown", moveDuck);
      }

      function enablePlayers() {
        theDuck.addEventListener("click", kill);
        document.addEventListener("keydown", moveDuck);
      }

      //names of players
      function inputNames() {
        const nameDuck = prompt("The first player (the duck) is ...");
        document.querySelector("#playerDuck h2").innerText = nameDuck;
        const nameHunter = prompt("The second player (the Hunter) is ...");
        if(nameDuck==""){
            console.log(nameDuck);           
          }else{
          emptyName=false;
          console.log("2 players");
        }
        document.querySelector("#playerHunter h2").innerText = nameHunter;
        document.querySelector("#playerHunter p").innerText = 0;
        document.querySelector("#playerDuck p").innerText = 0;
      }