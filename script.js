const squares = document.querySelectorAll(".box");
const board = document.querySelector(".boxes");
const message = document.querySelector(".message");
const x_score = document.querySelector(".x_score");
const o_score = document.querySelector(".o_score");
const draw_score = document.querySelector(".draw_score");
const btnReset = document.querySelector(".btn-again");

const winningNumbers = [
  [1, 2, 3],
  [1, 5, 9],
  [4, 5, 6],
  [1, 4, 7],
  [3, 5, 7],
  [7, 8, 9],
  [2, 5, 8],
  [3, 6, 9],
];

const player_numbers = {
  x: [],
  o: [],
};

const score = {
  x: 0,
  o: 0,
  draw: 0,
};

let currentPlayer = "x";

squares.forEach((square) => {
  square.addEventListener("click", function () {
    const dataNumber = this.getAttribute("data-number");
    const number = parseInt(dataNumber);

    if (square.innerText !== "") {
      return;
    }

    playerMove(square, number);
  });
});

function playerMove(square, number) {
  square.innerText = currentPlayer;
  player_numbers[currentPlayer].push(number);

  if (arrayMatch(player_numbers[currentPlayer])) {
    board.classList.add("disable");
    message.innerText = `${currentPlayer} wins!`;
    score[currentPlayer]++;
  } else if (isDraw()) {
    score.draw++;
    message.innerText = "Draw!";
  } else {
    currentPlayer = currentPlayer === "x" ? "o" : "x";
  }

  displayScore();
}

function arrayMatch(playerNumbers) {
  const isMatch = winningNumbers.some((arrayNums) => {
    return arrayNums.every((num) => playerNumbers.includes(num));
  });
  return isMatch;
}

function isDraw() {
  const drawResult = [...squares].every((square) => square.innerText !== "");

  return drawResult;
}

function displayScore() {
  x_score.innerText = score.x;
  o_score.innerText = score.o;
  draw_score.innerText = score.draw;
}

btnReset.addEventListener("click", function () {
  squares.forEach((square) => (square.innerText = ""));
  player_numbers.x = [];
  player_numbers.o = [];
  currentPlayer = "x";
  board.classList.remove("disable");
  message.innerText = "";
});
