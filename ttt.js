const board = document.getElementById("board");
const status = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let cells = [];
let currentPlayer = "X";
let gameActive = true;

function createBoard() {
  board.innerHTML = "";
  cells = [];
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", () => handleClick(i));
    board.appendChild(cell);
    cells.push(cell);
  }
}

function handleClick(index) {
  if (!gameActive || cells[index].textContent !== "") return;
  cells[index].textContent = currentPlayer;
  if (checkWin()) {
    status.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    confetti({
    particleCount: 150,

    spread: 90,

    origin: {
        y: 0.6
    },

    colors: [
        "#ff4f9a",
        "#ff84c1",
        "#ffd6ea",
        "#ffffff",
        "#ffc0cb"
    ]
});
  } else if (cells.every(cell => cell.textContent !== "")) {
    status.textContent = "It's a draw!";
    gameActive = false;
    cells.forEach(cell => cell.classList.add("draw-glow"));
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin() {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]          
  ];
  return winPatterns.some(pattern => {
    const [a,b,c] = pattern;
    return cells[a].textContent &&
           cells[a].textContent === cells[b].textContent &&
           cells[a].textContent === cells[c].textContent;
  });
}


function resetGame() {
  currentPlayer = "X";
  gameActive = true;
  status.textContent = "Player X's turn";
  createBoard();
}

restartBtn.addEventListener("click", resetGame);
createBoard();