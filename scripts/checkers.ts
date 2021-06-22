// check single column
function checkColumn(grid: any, colIndex: any, sign: any) {
    for (let i = 0; i < grid.length; i++) {
        if (grid[i][colIndex] !== sign) {
            return false;
        }
    }
    return true;
}

// check single row
function checkRow(grid: any, rowIndex: any, sign: any) {
    for (let i = 0; i < grid.length; i++) {
        if (grid[rowIndex][i] !== sign) {
            return false;
        }
    }
    return true;
}

// check right diagonal
function checkRightDiagonal(grid: any, sign: any) {
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
function checkLeftDiagonal(grid: any, sign: any) {
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
function checkDiagonals(grid: any, sign: any) {
    return checkLeftDiagonal(grid, sign) || checkRightDiagonal(grid, sign);
}

// check all rows and columns
function checkRowsAndColumns(grid: any, sign: any) {
    for (let i = 0; i < grid.length; i++) {
        if (checkColumn(grid, i, sign) || checkRow(grid, i, sign)) {
            return true;
        }
    }
    return false;
}

// check entire grid
function checkGrid(grid: any, sign: any) {
    return checkRowsAndColumns(grid, sign) || checkDiagonals(grid, sign);
}
