// Define the Player class
class Player {
    constructor(symbol) {
        this.symbol = symbol;
    }
}

// Define the Board class
class Board {
    constructor() {
        this.cells = Array(9).fill(null);
    }

    // Method to check if the board is full
    isFull() {
        return this.cells.every(cell => cell !== null);
    }

    // Method to check if a player has won
    isWinner(symbol) {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]              // Diagonals
        ];

        return winningCombos.some(combo => {
            return combo.every(index => this.cells[index] === symbol);
        });
    }

    // Method to make a move
    makeMove(index, symbol) {
        if (this.cells[index] === null) {
            this.cells[index] = symbol;
            return true; // Move successful
        }
        return false; // Move unsuccessful
    }
}

// Define the Game class
class Game {
    constructor() {
        this.board = new Board();
        this.players = [new Player('🐼'), new Player('🦔')]; // Update symbols
        this.currentPlayerIndex = 0;
        this.gameOver = false;
    }

    // Method to handle a player's move
    playMove(index) {
        if (!this.gameOver && this.board.makeMove(index, this.currentPlayer.symbol)) {
            // Check for a winner
            if (this.board.isWinner(this.currentPlayer.symbol)) {
                this.gameOver = true;
                showMessage(`Player ${this.currentPlayer.symbol} wins!`);
            } else if (this.board.isFull()) {
                this.gameOver = true;
                showMessage("It's a draw!");
            } else {
                // Switch to the next player
                this.currentPlayerIndex = (this.currentPlayerIndex + 1) % 2;
            }
        }
        updateBoard();
    }

    // Getter method to get the current player
    get currentPlayer() {
        return this.players[this.currentPlayerIndex];
    }
}

// Create a new game instance
const game = new Game();

// Function to reset the game
function resetGame() {
    game.board = new Board();
    game.gameOver = false;
    updateBoard();
    showMessage('');
}

// Function to display messages
function showMessage(message) {
    document.getElementById("message").textContent = message;
}

// Function to update the game board
function updateBoard() {
    const boardElement = document.getElementById("board");
    boardElement.innerHTML = '';

    game.board.cells.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.textContent = cell || '';
        if (cell === '🐼') { // Update symbols
            cellElement.classList.add('x');
        } else if (cell === '🦔') { // Update symbols
            cellElement.classList.add('o');
        }
        cellElement.addEventListener('click', () => {
            if (!cell && !game.gameOver) {
                game.playMove(index);
            }
        });
        boardElement.appendChild(cellElement);
    });
}


// Initialize the game board
updateBoard();
