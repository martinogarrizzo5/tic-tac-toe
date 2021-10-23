let grid = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
];
let freeCells = grid.length * grid.length; // number of free cells
let isGameOver: boolean = false;
let winnerPlayer: string = "";
const gridHTML =
    '<div class="grid"><div class="grid__col"></div><div class="grid__col"></div><div class="grid__col"></div><div class="grid__col"></div><div class="grid__col"></div><div class="grid__col"></div><div class="grid__col"></div><div class="grid__col"></div><div class="grid__col"></div></div>';
const buttonHTML =
    '<button class="btn" id="game-btn">Challenge The Death</button>';

const gridCells = document.getElementsByClassName("grid__col"); // get grid cells reference
const container = document.getElementById("game-container");

// start with the button on the screen
container!.innerHTML = buttonHTML;
const button = document.getElementById("game-btn");

button?.addEventListener("click", () => {
    startGame();
});

function startGame() {
    container!.innerHTML = gridHTML;

    // add click listener to each grid cell
    for (let i = 0; i < gridCells.length; i++) {
        gridCells[i].addEventListener("click", function () {
            if (!isGameOver) {
                //////////////// player move
                // update js grid
                const rowIndex = Math.floor(i / 3);
                const colIndex = i % 3;

                if (grid[rowIndex][colIndex] == "") {
                    grid[rowIndex][colIndex] = "X";
                    freeCells--;

                    // update html grid adding sign to cell when clicked
                    gridCells[i].innerHTML = '<div class="cross"></div>';

                    const isXWinner = checkGrid(grid, "X");

                    if (isXWinner) {
                        console.log("X is the Winner");
                        isGameOver = true;
                        winnerPlayer = "X";
                        endGame();
                        return;
                    }

                    ////////////// computer move
                    let randomRowIndex;
                    let randomColIndex;

                    if (freeCells >= 1) {
                        do {
                            randomRowIndex = Math.floor(Math.random() * 3); // random number between 0 and 2
                            randomColIndex = Math.floor(Math.random() * 3);
                        } while (grid[randomRowIndex][randomColIndex] !== "");

                        grid[randomRowIndex][randomColIndex] = "O";
                        freeCells--;

                        // update html grid adding sign to cell when clicked
                        gridCells[
                            randomRowIndex * 3 + randomColIndex
                        ].innerHTML = '<div class="circle"></div>';
                    }

                    console.table(grid);

                    const isOWinner = checkGrid(grid, "O");

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
    }
}

function endGame() {
    const UserWinText = "You won!";
    const UserLostText = "Game over";
    const UserTieText = "No winner";

    if (isGameOver) {
        container!.innerHTML += `<div class="game-over"><h3 class="title">${
            winnerPlayer === "X" ? UserWinText : UserLostText
        }</h3><button class="btn" id="play-again-button">Play Again</button></div>`;
    } else {
        container!.innerHTML += `<div class="game-over"><h3 class="title">${UserTieText}</h3><button class="btn" id="play-again-button">Play Again</button></div>`;
    }
    const playAgainButton = document.getElementById("play-again-button");

    playAgainButton?.addEventListener("click", () => {
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
