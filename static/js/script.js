function ageInDays() {
  var birthday = prompt("What year are you born my friend?");
  var ageInDayss = (2020 - birthday) * 365;
  console.log(ageInDayss);
  var h1 = document.createElement("h1");
  var textAnswer = document.createTextNode(
    "You are " + ageInDayss + " days old"
  );
  h1.setAttribute("id", "h1element");
  h1.appendChild(textAnswer);
  document.getElementById("resultFlexBox").appendChild(h1);
}

function reset() {
  document.getElementById("h1element").remove();
}

// Challenge : Cat generator

function catGererator() {
  var image = document.createElement("img");
  var div = document.getElementById("flex-cat-gen");
  image.src =
    "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";
  image.style = "width:150; height:150";

  div.appendChild(image);
}

// Challenge 3 : Rock, Paper, Scissors

function rpgGame(yourChoice) {
  var humanChoice, botChoice;
  humanChoice = yourChoice.id;
  botChoice = getAutoNumber(randToRpsInt());
  console.log(botChoice);
  result = decideWinner(humanChoice, botChoice); //[0,1] human lost| bot win
  console.log(result);
  message = finalMessage(result);
  console.log(message);
  rpsFrontEnd(humanChoice, botChoice, message);
}

function randToRpsInt() {
  return Math.floor(Math.random() * 3);
}

function getAutoNumber(number) {
  return ["rock", "paper", "scissors"][number];
}

function decideWinner(yourChoice, computerChoice) {
  var rpsDatabase = {
    rock: { scissors: 1, rock: 0.5, paper: 0 },
    paper: { rock: 1, paper: 0.5, scissors: 0 },
    scissors: { paper: 1, scissors: 0.5, rock: 0 },
  };
  var yourScore = rpsDatabase[yourChoice][computerChoice];
  var computerScore = rpsDatabase[computerChoice][yourChoice];

  return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]) {
  if (yourScore === 0) {
    return { message: "you lost", color: "red" };
  } else if (yourScore === 0.5) {
    return { message: "you tied!", color: "yellow" };
  } else {
    return { message: "you win", color: "green" };
  }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
  var imageDatabase = {
    rock: document.getElementById("rock").src,
    paper: document.getElementById("paper").src,
    scissors: document.getElementById("scissors").src,
  };

  //remove all image source when we click an image
  document.getElementById("rock").remove();
  document.getElementById("paper").remove();
  document.getElementById("scissors").remove();

  //create div for showing img and massege
  var humandiv = document.createElement("div");
  var botDiv = document.createElement("div");
  var messagediv = document.createElement("div");

  humandiv.innerHTML =
    "<img src='" +
    imageDatabase[humanImageChoice] +
    "' height=150 width=150 style='box-shadow:0px 10px 50px rgba(37,50,233,1)'/>";
  botDiv.innerHTML =
    "<img src='" +
    imageDatabase[botImageChoice] +
    "' height=150 width=150 style='box-shadow:0px 10px 50px rgba(243,38,24,1)'/>";
  messagediv.innerHTML =
    "<h1 style='color:" +
    finalMessage["color"] +
    "; font-size:60px; padding=30px;'>" +
    finalMessage["message"] +
    "</h1>";
  document.getElementById("flex-box-rps-div").appendChild(humandiv);
  document.getElementById("flex-box-rps-div").appendChild(messagediv);
  document.getElementById("flex-box-rps-div").appendChild(botDiv);
}

// Challenge 4 : Change the color of all button

var allButton = document.getElementsByTagName("button");
// console.log(allButton);

var copyAllButton = [];
for (let i = 0; i < allButton.length; i++) {
  copyAllButton.push(allButton[i].classList[1]);
}
// console.log(copyAllButton);

function buttonColorChange(buttonThingy) {
  // console.log(buttonThingy.value);

  if (buttonThingy.value === "red") {
    buttonsRed();
  } else if (buttonThingy.value === "green") {
    buttonsGreen();
  } else if (buttonThingy.value === "reset") {
    buttonsReset();
  } else if (buttonThingy.value === "random") {
    randomColors();
  }
}

function buttonsRed() {
  for (let i = 0; i < allButton.length; i++) {
    allButton[i].classList.remove(allButton[i].classList[1]);
    allButton[i].classList.add("btn-danger");
  }
}

function buttonsGreen() {
  for (let i = 0; i < allButton.length; i++) {
    allButton[i].classList.remove(allButton[i].classList[1]);
    allButton[i].classList.add("btn-success");
  }
}

function buttonsReset() {
  for (let i = 0; i < allButton.length; i++) {
    allButton[i].classList.remove(allButton[i].classList[1]);
    allButton[i].classList.add(copyAllButton[i]);
  }
}

function randomColors() {
  var choices = ["btn-primary", "btn-success", "btn-warning", "btn-danger"];
  for (let i = 0; i < allButton.length; i++) {
    var randomNumber = Math.floor(Math.random() * 4);
    allButton[i].classList.remove(allButton[i].classList[1]);
    allButton[i].classList.add(choices[randomNumber]);
  }
}

// Challenge 5 : Black Jack ***********************************************************************************************

let blackJackGame = {
  you: { scoreSpan: "#your-blackjack-result", div: "#your-box", score: 0 },
  dealer: {
    scoreSpan: "#dealer-blackjack-result",
    div: "#dealer-box",
    score: 0,
  },
  card: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"],
  cardsMap: {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    J: 10,
    Q: 10,
    K: 10,
    A: [1, 11],
  },
  wins: 0,
  losses: 0,
  drews: 0,
  isStand: false,
  turnsOver: false,
};
const YOU = blackJackGame["you"];
const DEALER = blackJackGame["dealer"];

const hitSound = new Audio("static/sounds/swish.m4a");
const winSound = new Audio("static/sounds/cash.mp3");
const lossSound = new Audio("static/sounds/aww.mp3");

document
  .querySelector("#blackjack-hit-button")
  .addEventListener("click", blackjackhit);
document
  .querySelector("#blackjack-deal-button")
  .addEventListener("click", blackjackdeal);
document
  .querySelector("#blackjack-stand-button")
  .addEventListener("click", blackjackstand);

function blackjackhit() {
  // alert("Ouch! You just clicked me");
  if (blackJackGame["isStand"] === false) {
    var card = randomCard();
    console.log(card);
    showCard(card, YOU);
    updateScore(card, YOU);
    showScore(YOU);
    console.log(YOU["score"]);
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function blackjackstand() {
  blackJackGame["isStand"] = true;
  while (DEALER["score"] < 16 && blackJackGame["isStand"] === true) {
    let card = randomCard();
    showCard(card, DEALER);
    updateScore(card, DEALER);
    showScore(DEALER);
    await sleep(1000);
  }

  // if (DEALER["score"] > 15) {
  blackJackGame["turnsOver"] = true;
  // console.log(blackJackGame["turnsOver"]);
  let winner = computeWinner();
  showResult(winner);

  // }
}
//Removing image with deal button

function blackjackdeal() {
  if (blackJackGame["turnsOver"] === true) {
    blackJackGame["isStand"] = false;

    var yourImage = document.querySelector("#your-box").querySelectorAll("img");
    // console.log(yourImage);
    // yourImage[0].remove();
    for (let i = 0; i < yourImage.length; i++) {
      yourImage[i].remove();
    }

    var dealerImage = document
      .querySelector("#dealer-box")
      .querySelectorAll("img");
    for (let i = 0; i < dealerImage.length; i++) {
      dealerImage[i].remove();
    }

    YOU["score"] = 0;
    DEALER["score"] = 0;

    document.querySelector("#your-blackjack-result").textContent = 0;
    document.querySelector("#your-blackjack-result").style.color = "white";
    document.querySelector("#dealer-blackjack-result").textContent = 0;
    document.querySelector("#dealer-blackjack-result").style.color = "white";
    document.querySelector("#blackjack-result").textContent = "Let's play";
    document.querySelector("#blackjack-result").style.color = "black";
    blackJackGame["turnsOver"] = false;
  }
}
//loop through for random card

function randomCard() {
  var randomIndex = Math.floor(Math.random() * 13);
  return blackJackGame["card"][randomIndex];
}

//Showing Card
function showCard(card, activePlayer) {
  if (activePlayer["score"] <= 21) {
    var cardImage = document.createElement("img");
    cardImage.src = `static/images/${card}.png`;

    document.querySelector(activePlayer["div"]).appendChild(cardImage);
    hitSound.play();
  }
}

//Update Score

function updateScore(card, activePlayer) {
  if (card === "A") {
    //If adding 11 keeps me below 21, add 11. Otherwise add 1
    if (activePlayer["score"] + blackJackGame["cardsMap"][card][1] <= 21) {
      activePlayer["score"] += blackJackGame["cardsMap"][card][1];
    } else {
      activePlayer["score"] += blackJackGame["cardsMap"][card][0];
    }
  } else {
    activePlayer["score"] += blackJackGame["cardsMap"][card];
  }
}

//Show Score
function showScore(activePlayer) {
  if (activePlayer["score"] >= 21) {
    document.querySelector(activePlayer["scoreSpan"]).textContent = "BUST!";
    document.querySelector(activePlayer["scoreSpan"]).style.color = "red";
  } else {
    document.querySelector(activePlayer["scoreSpan"]).textContent =
      activePlayer["score"];
  }
}

//Compute winner and return who just won

function computeWinner() {
  let winner;
  if (YOU["score"] <= 21) {
    //Condition: higher score than dealer or when dealer bust but you are 21 or under
    if (YOU["score"] > DEALER["score"] || DEALER["score"] > 21) {
      // console.log("You won!");
      blackJackGame["wins"]++;
      winner = YOU;
    } else if (YOU["score"] < DEALER["score"]) {
      // console.log("you lose");
      blackJackGame["losses"]++;
      winner = DEALER;
    } else if (YOU["score"] === DEALER["score"]) {
      // console.log("draw");
      blackJackGame["drews"]++;
    }
  }
  //When you bust but computer doesn't
  else if (YOU["score"] > 21 && DEALER["score"] <= 21) {
    // console.log("you lose!");
    blackJackGame["losses"]++;

    winner = DEALER;
  } else if (YOU["score"] > 21 && DEALER["score"] > 21) {
    // console.log("you draw");
    blackJackGame["drews"]++;
  }
  // console.log("winner is" + winner);
  console.log(blackJackGame);
  return winner;
}

function showResult(winner) {
  let message, messageColor;
  if (blackJackGame["turnsOver"] === true) {
    if (winner == YOU) {
      document.querySelector("#wins").textContent = blackJackGame["wins"];
      message = "You Win";
      messageColor = "Green";
      winSound.play();
    } else if (winner == DEALER) {
      document.querySelector("#losses").textContent = blackJackGame["losses"];

      message = "You loss";
      messageColor = "red";
      lossSound.play();
    } else {
      document.querySelector("#drews").textContent = blackJackGame["drews"];

      message = "You Drew!";
      messageColor = "black";
    }
    document.querySelector("#blackjack-result").textContent = message;
    document.querySelector("#blackjack-result").style.color = messageColor;
  }
}
