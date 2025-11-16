// Simple Tic-Tac-Toe using vanilla JS

const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("statusText");
const resetBtn = document.getElementById("resetBtn");

let currentPlayer = "X";
let boardState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

// All possible winning combinations (index positions)
const winningCombinations = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonals
    [2, 4, 6]
];

// Handle a cell click
function handleCellClick(e) {
    const cell = e.target;
    const index = cell.getAttribute("data-index");

    // If already filled or game over, ignore click
    if (boardState[index] !== "" || !gameActive) return;

    // Set the move
    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;

    // Check game status (win or draw)
    checkResult();
}

// Check for win or draw
function checkResult() {
    let roundWon = false;

    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (
            boardState[a] &&
            boardState[a] === boardState[b] &&
            boardState[a] === boardState[c]
        ) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `🎉 Player ${currentPlayer} wins!`;
        gameActive = false;
        disableBoard();
        return;
    }

    // Check for draw: no empty spots left
    if (!boardState.includes("")) {
        statusText.textContent = "🤝 It's a draw!";
        gameActive = false;
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

// Disable clicks after game ends
function disableBoard() {
    cells.forEach(cell => cell.classList.add("disabled"));
}

// Reset game state
function resetGame() {
    currentPlayer = "X";
    boardState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("disabled");
    });
}

// Attach event listeners
cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetBtn.addEventListener("click", resetGame);