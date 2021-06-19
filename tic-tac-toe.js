const grid = [
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1],
];

const gridCells = document.getElementsByClassName("col");

for (let i = 0; i < gridCells.length; i++) {
    gridCells[i].addEventListener("click", function clickEvent() {
        gridCells[i].innerHTML = '<div class="cross"></div>'; // inserisce contenuto = croce
        grid[parseInt(i / 3)][parseInt(i % 3)] = "X"; // imposto la x sulla griglia
        console.table(grid);
        console.log(checkGrid(grid, "X"));
    });
}
