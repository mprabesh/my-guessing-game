/* 
Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".
In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/
class Game {
  constructor() {
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = 0;
  }
}

Game.prototype.difference = function () {
  return Math.abs(this.playersGuess - this.winningNumber);
};
Game.prototype.isLower = function () {
  return this.playersGuess < this.winningNumber ? true : false;
};
Game.prototype.playersGuessSubmission = function (myGuessNum) {
  if (myGuessNum < 1 || myGuessNum > 100 || isNaN(myGuessNum)) {
    throw `That is an invalid guess.`;
  } else {
    this.playersGuess = myGuessNum;
    return this.checkGuess();
  }
};
Game.prototype.checkGuess = function () {
  let gameResult = "";
  if (this.playersGuess === this.winningNumber) {
    gameResult = "You Win!";
  } else if (this.pastGuesses.includes(this.playersGuess)) {
    gameResult = "You have already guessed that number.";
  } else {
    this.pastGuesses.push(this.playersGuess);
    if (this.pastGuesses.length === 5) {
      gameResult = "You Lose.";
    } else {
      if (this.difference() < 10) {
        gameResult = "You're burning up!";
      } else if (this.difference() < 25) {
        gameResult = "You're lukewarm.";
      } else if (this.difference() < 50) {
        gameResult = "You're a bit chilly.";
      } else {
        gameResult = "You're ice cold!";
      }
    }
  }
  return gameResult;
};

Game.prototype.provideHint = function () {
  let hintArray = [];
  hintArray.push(this.winningNumber);
  hintArray.push(generateWinningNumber());
  hintArray.push(generateWinningNumber());
  return shuffle(hintArray);
};

function newGame() {
  return new Game();
}

function generateWinningNumber() {
  return Math.floor(Math.random() * 100 + 1);
}

function shuffle(myArr) {
  let length = myArr.length;
  let temp, randomIndex;
  while (length) {
    randomIndex = Math.floor(Math.random() * length--);
    temp = myArr[length];
    myArr[length] = myArr[randomIndex];
    myArr[randomIndex] = temp;
  }
  return myArr;
}
