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
    scissors: { paper: 1, scissors: 0.5, rock: 0 }
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
    scissors: document.getElementById("scissors").src
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
console.log(allButton);

var copyAllButton = [];
for (let i = 0; i < allButton.length; i++) {
  copyAllButton.push(allButton[i].classList[1]);
}
console.log(copyAllButton);

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
