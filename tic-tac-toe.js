"use strict";
let grid = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
];
let freeCells = grid.length * grid.length; // number of free cells
let lastPlayerMove = [-1, -1];
let isGameOver = false;
let winningPlayer = "";
const gridHTML = '<div class="grid"><div class="grid__col"></div><div class="grid__col"></div><div class="grid__col"></div><div class="grid__col"></div><div class="grid__col"></div><div class="grid__col"></div><div class="grid__col"></div><div class="grid__col"></div><div class="grid__col"></div></div>';
const buttonHTML = '<button class="btn" id="game-btn" onclick="startGame()">Play Now</button>';
const playAgainButton = '<button class="btn" id="play-again-button" onclick="playAgain()">Play Again</button>';
const gridCells = document.getElementsByClassName("grid__col"); // get grid cells reference
const container = document.getElementById("game-container");
// start with the button on the screen
container.innerHTML = buttonHTML;
const button = document.getElementById("game-btn");
function startGame() {
    container.innerHTML = gridHTML;
    // add click listener to each grid cell
    for (let i = 0; i < gridCells.length; i++) {
        gridCells[i].addEventListener("click", function () {
            if (!isGameOver) {
                //////////////// player move
                const rowIndex = Math.floor(i / 3);
                const colIndex = i % 3;
                if (grid[rowIndex][colIndex] == "") {
                    grid[rowIndex][colIndex] = "X";
                    lastPlayerMove = [rowIndex, colIndex];
                    freeCells--;
                    // update html grid adding sign to cell when clicked
                    gridCells[i].innerHTML = '<div class="cross"></div>';
                    const isXWinner = checkGrid(grid, "X");
                    if (isXWinner) {
                        isGameOver = true;
                        winningPlayer = "X";
                        endGame();
                        return;
                    }
                    ////////////// computer move
                    if (freeCells >= 1) {
                        const move = nextMove(grid, "O", "X", lastPlayerMove);
                        grid[move[0]][move[1]] = "O";
                        freeCells--;
                        // update html grid adding sign to cell when clicked
                        gridCells[move[0] * 3 + move[1]].innerHTML =
                            '<div class="circle"></div>';
                    }
                    console.table(grid);
                    const isOWinner = checkGrid(grid, "O");
                    if (isOWinner) {
                        isGameOver = true;
                        winningPlayer = "O";
                        endGame();
                        return;
                    }
                }
                if (freeCells <= 0) {
                    endGame();
                }
            }
        });
    }
}
function endGame() {
    const UserWinText = "You won!";
    const UserLostText = "Game over";
    const UserTieText = "No winner";
    if (isGameOver) {
        container.innerHTML += `<div class="game-over"><h3 class="title">${winningPlayer === "X" ? UserWinText : UserLostText}</h3>${playAgainButton}</div>"`;
    }
    else {
        container.innerHTML += `<div class="game-over"><h3 class="title">${UserTieText}</h3>${playAgainButton}</div>`;
    }
}
function playAgain() {
    isGameOver = false;
    freeCells = grid.length * grid.length;
    grid = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ];
    startGame();
}
