
// Rules Board
const ruleBtn = document.querySelector(".rule-btn");
const rulePage = document.querySelector(".rulesgameBoard");
const closeIcon = document.querySelector(".closeIcon");

ruleBtn.addEventListener("click", () => {

  if (rulePage.style.visibility != "visible") {
    rulePage.style.visibility = "visible";
  }
});

closeIcon.addEventListener("click", () => {
  rulePage.style.visibility = "hidden";
})

//Game
const choiceBtn = document.querySelectorAll(".choice-btn");
const gameSide = document.querySelector(".game");
const decisionSide = document.querySelector(".gameDecision");
const decision = document.querySelector(".winner-decision");
const playBtn = document.querySelector(".play-again");
let score = document.querySelector(".scoreNum");
let winnerDeklaration = document.querySelector(".winner-deklaration");
let playerResult = document.querySelector(".player-btn");
let houseResult = document.querySelector(".house-btn");
let playerChoice;

function btnBeats(btn, beatsBtn) {
  this.btn = btn;
  this.beatsBtn = beatsBtn;
}

const winOptions = [
  new btnBeats("scissors", "paper lizard"),
  new btnBeats("paper", "rock spock"),
  new btnBeats("rock", "lizard scissors"),
  new btnBeats("lizard", "spock paper"),
  new btnBeats("spock", "scissors rock")
];

function chooseBtn(who, choice) {

  if(who == houseResult){
    houseResult.classList.toggle("animation2");
  }

  if(who.innerHTML.includes("choice-btn result")){
    who.innerHTML = "";
  } else {
    who.innerHTML = '\n   <div class="choice-btn result" data-choice =' + choice + ' >\n\n <img src="images/icon-' + choice + '.svg" alt="' + choice + '" class="result">  </div>\n  ';
  }

}

function changeSide() {
  if (gameSide.style.display != "none") {
    gameSide.style.display = "none";
    decisionSide.style.display = "grid";
  } else {
    gameSide.style.display = "grid";
    decisionSide.style.display = "none";
  }
}

function houseDecision() {
  return choiceBtn[Math.floor(winOptions.length * Math.random())].dataset.choice;
}

function findWinner(playerChoice, houseChoice) {

  let winRateOfPlayer = winOptions.find(button => button.btn == playerChoice);

  if (winRateOfPlayer.beatsBtn.includes(houseChoice)) {
    winnerDeklaration.innerHTML = "You win";
    setTimeout(() => {
      pointWinner(playerResult);
      score.innerHTML = updateScore("up");
      saveScore();
    }, 3000);
  } else if (winRateOfPlayer.btn == houseChoice) {
    winnerDeklaration.innerHTML = "draw";
  } else {
    winnerDeklaration.innerHTML = "You lose";
    setTimeout(() => {
    pointWinner(houseResult);
    score.innerHTML = updateScore("down");
    saveScore();
  }, 3000);
  }
}

function pointWinner(winner) {
  winner.firstElementChild.classList.toggle("win");
}

function updateScore(updown){
  let scoreCount = Number(score.innerHTML);

  if(updown == "up") {;
    return String(scoreCount +1);
  } else if(updown == "down"){
    if(scoreCount !== 0){
      return String(scoreCount-1);
    } else {
      return String(0);
    }
  }
}

function saveScore(){
  sessionStorage.setItem("score", score.innerHTML);
}

function playAgain() {
  changeSide();
  chooseBtn(playerResult, playerChoice);
  chooseBtn(houseResult, houseDecision());
  toggleAni1();
  toggleAni2();

  if(playerResult.classList.contains("win")) {
    pointWinner(playerResult);
  } else if (houseResult.classList.contains("win")){
    pointWinner(houseResult);
  }
}

function toggleAni1() {
  houseResult.classList.toggle("animation1");
}

function toggleAni2() {
  decision.classList.toggle("active");
}

choiceBtn.forEach(button => button.addEventListener("click", () => {
  playerChoice = button.dataset.choice;

  //Change Side with Player Choice
  chooseBtn(playerResult, playerChoice);
  changeSide();

  //House Choice added
  setTimeout(() => toggleAni1(), 1000);
  setTimeout(() => chooseBtn(houseResult, houseDecision()), 2000);

  //Find Winner
  setTimeout(() => toggleAni2(),3000);
  findWinner(playerChoice, houseDecision());

}))

playBtn.addEventListener("click", () => {
  playAgain();
})

//Maintain Score
window.onload = function setScore() {

  if(sessionStorage.getItem("score") == null) {
    sessionStorage.setItem("score", score.innerHTML);
  }
  score.innerHTML = sessionStorage.getItem("score");
}
