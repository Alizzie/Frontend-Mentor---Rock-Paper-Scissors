
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
let playerBtnImg = document.querySelector("img.result");
let houseResult = document.querySelector(".house-btn");

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

function playerBtn(choice) {
  playerResult.setAttribute("data-choice", choice);
  playerBtnImg.src = "images/icon-" + choice + ".svg";
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
  return houseChoice = choiceBtn[Math.floor(winOptions.length * Math.random())].dataset.choice;
}

function toggleAni1() {
  houseResult.classList.toggle("animation1");
}

function houseBtn(choice) {
  let addClasses = ["choice-btn", "result", "animation2"];
  for (let i = 0; i < addClasses.length; i++) {
    houseResult.classList.toggle(addClasses[i]);
  }

  if (houseResult.getAttribute("data-choice") == null) {

    houseResult.setAttribute("data-choice", choice);
    houseResult.innerHTML = '\n   <div class="result circle">\n\n <img src="images/icon-' + choice + '.svg" alt="' + choice + '" class="result">  </div>\n  ';
  } else {
    houseResult.removeAttribute("data-choice");
    houseResult.innerHTML = "<div class='result circle house-choose'></div>";
  }
}

function toggleAni2() {
  decision.classList.toggle("active");
}

function findWinner(playerChoice, houseChoice) {

  let winRateOfPlayer = winOptions.find(button => button.btn == playerChoice);

  if (winRateOfPlayer.beatsBtn.includes(houseChoice)) {
    winnerDeklaration.innerHTML = "You win";
    setTimeout(() => {
      score.innerHTML = updateScore("up");
      saveScore();
    }, 3000);
  } else if (winRateOfPlayer.btn == houseChoice) {
    winnerDeklaration.innerHTML = "draw";
  } else {
    winnerDeklaration.innerHTML = "You lose";
    setTimeout(() => {
    score.innerHTML = updateScore("down");
    saveScore();
  }, 3000);
  }
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
  toggleAni1();
  toggleAni2();
  houseBtn();
}

choiceBtn.forEach(button => button.addEventListener("click", () => {
  let playerChoice = button.dataset.choice;

  //Change Side with Player Choice
  playerBtn(playerChoice);
  changeSide();

  //House Choice added
  let houseChoice = houseDecision();
  setTimeout(() => toggleAni1(), 1000);
  setTimeout(() => houseBtn(houseChoice), 2000);

  //Find Winner
  setTimeout(() => toggleAni2(),3000);
  findWinner(playerChoice, houseChoice);

  //Update Score
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
