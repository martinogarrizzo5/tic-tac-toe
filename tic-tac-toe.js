"use strict";
var grid = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
];
var freeCells = grid.length * grid.length; // number of free cells
var isGameOver = false;
var winnerPlayer = "";
var gridHTML = '<div class="grid"><div class="grid__col"></div><div class="grid__col"></div><div class="grid__col"></div><div class="grid__col"></div><div class="grid__col"></div><div class="grid__col"></div><div class="grid__col"></div><div class="grid__col"></div><div class="grid__col"></div></div>';
var buttonHTML = '<button class="btn" id="game-btn">Challenge The Death</button>';
var gridCells = document.getElementsByClassName("grid__col"); // get grid cells reference
var container = document.getElementById("game-container");
// start with the button on the screen
container.innerHTML = buttonHTML;
var button = document.getElementById("game-btn");
button === null || button === void 0 ? void 0 : button.addEventListener("click", function () {
    startGame();
});
function startGame() {
    container.innerHTML = gridHTML;
    var _loop_1 = function (i) {
        gridCells[i].addEventListener("click", function () {
            if (!isGameOver) {
                //////////////// player move
                // update js grid
                var rowIndex = Math.floor(i / 3);
                var colIndex = i % 3;
                if (grid[rowIndex][colIndex] == "") {
                    grid[rowIndex][colIndex] = "X";
                    freeCells--;
                    // update html grid adding sign to cell when clicked
                    gridCells[i].innerHTML = '<div class="cross"></div>';
                    var isXWinner = checkGrid(grid, "X");
                    if (isXWinner) {
                        console.log("X is the Winner");
                        isGameOver = true;
                        winnerPlayer = "X";
                        endGame();
                        return;
                    }
                    ////////////// computer move
                    var randomRowIndex = void 0;
                    var randomColIndex = void 0;
                    if (freeCells >= 1) {
                        do {
                            randomRowIndex = Math.floor(Math.random() * 3); // random number between 0 and 2
                            randomColIndex = Math.floor(Math.random() * 3);
                        } while (grid[randomRowIndex][randomColIndex] !== "");
                        grid[randomRowIndex][randomColIndex] = "O";
                        freeCells--;
                        // update html grid adding sign to cell when clicked
                        gridCells[randomRowIndex * 3 + randomColIndex].innerHTML = '<div class="circle"></div>';
                    }
                    console.table(grid);
                    var isOWinner = checkGrid(grid, "O");
                    if (isOWinner) {
                        console.log("O is the winner!");
                        isGameOver = true;
                        winnerPlayer = "O";
                        endGame();
                        return;
                    }
                }
                console.log("free cells: ", freeCells);
                if (freeCells <= 0) {
                    endGame();
                }
            }
        });
    };
    // add click listener to each grid cell
    for (var i = 0; i < gridCells.length; i++) {
        _loop_1(i);
    }
}
function endGame() {
    var UserWinText = "You won, you escaped death";
    var UserLostText = "Lost in the darkness";
    var UserTieText = "Death is waiting for you!";
    if (isGameOver) {
        container.innerHTML += "<div class=\"game-over\"><h3 class=\"title\">" + (winnerPlayer === "X" ? UserWinText : UserLostText) + "</h3><button class=\"btn\" id=\"play-again-button\">Play Again</button></div>";
    }
    else {
        container.innerHTML += "<div class=\"game-over\"><h3 class=\"title\">" + UserTieText + "</h3><button class=\"btn\" id=\"play-again-button\">Play Again</button></div>";
    }
    var playAgainButton = document.getElementById("play-again-button");
    playAgainButton === null || playAgainButton === void 0 ? void 0 : playAgainButton.addEventListener("click", function () {
        isGameOver = false;
        freeCells = grid.length * grid.length;
        grid = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
        ];
        startGame();
    });
}
