const board = Array(9).fill(null);
let currentPlayer = "X";
let gameOver = false;

const statusDisplay = document.getElementById("status");
const cells = document.querySelectorAll(".cell");

function handleClick(e) {
  const index = e.target.getAttribute("data-index");

  if (board[index] || gameOver) return;

  board[index] = currentPlayer;

  const img = document.createElement("img");
  img.src = currentPlayer === "X" ? "images/x.png" : "images/o.png";
  e.target.appendChild(img);

  if (checkWinner()) {
    statusDisplay.textContent = `${currentPlayer} wins!`;
    gameOver = true;
    return;
  }

  if (board.every((cell) => cell)) {
    statusDisplay.textContent = "It's a draw!";
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], // row 1
    [3, 4, 5], // row 2
    [6, 7, 8], // row 3
    [0, 3, 6], // col 1
    [1, 4, 7], // col 2
    [2, 5, 8], // col 3
    [0, 4, 8], // diag 1
    [2, 4, 6], // diag 2
  ];

  for (let i = 0; i < winPatterns.length; i++) {
    const [a, b, c] = winPatterns[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      showWinningLine(i);
      return true;
    }
  }
  return false;
}

function showWinningLine(index) {
  const line = document.getElementById("winning-line");

  const lineStyles = [
    { top: "50px", left: "5px", rotate: "0deg" }, // row 1
    { top: "150px", left: "5px", rotate: "0deg" }, // row 2
    { top: "255px", left: "5px", rotate: "0deg" }, // row 3
    { top: "5px", left: "52px", rotate: "90deg" }, // col 1
    { top: "5px", left: "155px", rotate: "90deg" }, // col 2
    { top: "5px", left: "258px", rotate: "90deg" }, // col 3
    { top: "50px", left: "50px", rotate: "45deg" }, // diag 1
    { top: "255px", left: "50px", rotate: "-45deg" }, // diag 2
  ];

  const style = lineStyles[index];
  line.style.top = style.top;
  line.style.left = style.left;
  line.style.transform = `rotate(${style.rotate}) scaleX(1)`;
}

function resetGame() {
  board.fill(null);
  cells.forEach((cell) => {
    cell.innerHTML = "";
  });
  currentPlayer = "X";
  gameOver = false;
  statusDisplay.textContent = "X's turn";

  const line = document.getElementById("winning-line");
  line.style.transform = "scaleX(0)";
}

cells.forEach((cell) => cell.addEventListener("click", handleClick));

resetGame(); // initialize
