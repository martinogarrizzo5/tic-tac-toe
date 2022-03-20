"use strict";
// check single column
function checkColumn(grid, colIndex, sign) {
    for (let i = 0; i < grid.length; i++) {
        if (grid[i][colIndex] !== sign) {
            return false;
        }
    }
    return true;
}
// check single row
function checkRow(grid, rowIndex, sign) {
    for (let i = 0; i < grid.length; i++) {
        if (grid[rowIndex][i] !== sign) {
            return false;
        }
    }
    return true;
}
// check right diagonal
function checkRightDiagonal(grid, sign) {
    let i = 0;
    let j = grid.length - 1;
    while (i < grid.length && j >= 0) {
        if (grid[i][j] !== sign) {
            return false;
        }
        i += 1;
        j -= 1;
    }
    return true;
}
// check left diagonal
function checkLeftDiagonal(grid, sign) {
    let i = 0;
    let j = 0;
    while (i < grid.length && j < grid.length) {
        if (grid[i][j] !== sign) {
            return false;
        }
        i += 1;
        j += 1;
    }
    return true;
}
// check all diagonals
function checkDiagonals(grid, sign) {
    return checkLeftDiagonal(grid, sign) || checkRightDiagonal(grid, sign);
}
// check all rows and columns
function checkRowsAndColumns(grid, sign) {
    for (let i = 0; i < grid.length; i++) {
        if (checkColumn(grid, i, sign) || checkRow(grid, i, sign)) {
            return true;
        }
    }
    return false;
}
// check entire grid
function checkGrid(grid, sign) {
    return checkRowsAndColumns(grid, sign) || checkDiagonals(grid, sign);
}
