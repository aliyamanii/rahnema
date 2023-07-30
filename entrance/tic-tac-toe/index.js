// ! DO NOT ADD ANY NEW VARIABLE
// ! YOU CAN ADD FUNCTIONS IF YOU NEED TO
// ! EDIT ALL TODOs AND INTEGRATE FUNCTIONALITIES

const X = "X";
const O = "O";
const N = 5;
const WINNER_O = "OW";
const WINNER_X = "XW";
const TIE = "XO";
const getInitialBoard = () =>
  Array(N)
    .fill("")
    .map((v) => [...Array(N).fill("")]);

const initialTurn = X;

const blocks = Array.from(document.getElementsByClassName("block"));
const turnDisplay = document.getElementById("turn");
const winnerDisplay = document.getElementById("winner");

let board = getInitialBoard();
let turn = initialTurn;

const canFillBlock = (row, col) => {
  return board[row][col] === "";
};

const fillBlock = (block, row, col) => {
  block.textContent = turn;
  board[row][col] = turn;
};

const toggleTurn = () => {
  turn = turn === X ? O : X;
  turnDisplay.textContent = turn;
};

const announceResult = (type) => {
  switch (type) {
    case WINNER_X:
      winnerDisplay.textContent = "X wins!";
      break;
    case WINNER_O:
      winnerDisplay.textContent = "O wins!";
      break;
    case TIE:
      winnerDisplay.textContent = "It's a tie!";
      break;
  }
  winnerDisplay.classList.remove("hide");
};

const isTied = () => {
  const n_playedRounds = board.flat().filter((cell) => cell !== "").length;
  return n_playedRounds === N * N;
};

const getWinner = () => {
  // Check rows
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < N - 3; col++) {
      if (
        board[row][col] !== "" &&
        board[row][col] === board[row][col + 1] &&
        board[row][col] === board[row][col + 2] &&
        board[row][col] === board[row][col + 3]
      ) {
        return {
          hasWinner: true,
          winner: board[row][col],
        };
      }
    }
  }

  // Check columns
  for (let col = 0; col < N; col++) {
    for (let row = 0; row < N - 3; row++) {
      if (
        board[row][col] !== "" &&
        board[row][col] === board[row + 1][col] &&
        board[row][col] === board[row + 2][col] &&
        board[row][col] === board[row + 3][col]
      ) {
        return {
          hasWinner: true,
          winner: board[row][col],
        };
      }
    }
  }

  // Check diagonals (top left to bottom right)
  for (let row = 0; row < N - 3; row++) {
    for (let col = 0; col < N - 3; col++) {
      if (
        board[row][col] !== "" &&
        board[row][col] === board[row + 1][col + 1] &&
        board[row][col] === board[row + 2][col + 2] &&
        board[row][col] === board[row + 3][col + 3]
      ) {
        return {
          hasWinner: true,
          winner: board[row][col],
        };
      }
    }
  }

  // Check diagonals (top right to bottom left)
  for (let row = 0; row < N - 3; row++) {
    for (let col = N - 1; col >= 3; col--) {
      if (
        board[row][col] !== "" &&
        board[row][col] === board[row + 1][col - 1] &&
        board[row][col] === board[row + 2][col - 2] &&
        board[row][col] === board[row + 3][col - 3]
      ) {
        return {
          hasWinner: true,
          winner: board[row][col],
        };
      }
    }
  }

  return {
    hasWinner: false,
    winner: null,
  };
};

const handleBlockClick = (block, row, col) => {
  if (canFillBlock(row, col)) {
    fillBlock(block, row, col);
    const { hasWinner, winner } = getWinner();
    if (hasWinner) {
      announceResult(winner === X ? WINNER_X : WINNER_O);
      setTimeout(resetBoard, 2000);
      return;
    }
    if (isTied()) {
      announceResult(TIE);
      setTimeout(resetBoard, 2000);
      return;
    }
    toggleTurn();
  }
};

const resetBoard = () => {
  board = getInitialBoard();
  turn = initialTurn;
  blocks.forEach((block) => {
    block.textContent = "";
  });
  turnDisplay.textContent = initialTurn;
  winnerDisplay.classList.add("hide");
};

// DO NOT DELETE THIS CODE BLOCK
blocks.forEach((block, index) => {
  const row = Math.floor(index / N);
  const col = index % N;
  block.addEventListener("click", () => handleBlockClick(block, row, col));
});
