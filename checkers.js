// controllo singola colonna
function checkColumn(grid, colIndex, sign) {
    for (let j = 0; j < grid.length; j++) {
        if (grid[j][colIndex] !== sign) {
            return false;
        }
    }
    return true;
}

// controllo singola riga
function checkRow(grid, rowIndex, sign) {
    for (let j = 0; j < grid.length; j++) {
        if (grid[rowIndex][j] !== sign) {
            return false;
        }
    }
    return true;
}

// controllo entrambe le diagonali
function checkRigthDiagonal(grid, sign) {
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

// controllo l'intera griglia
function checkGrid(grid, sign) {
    let isWin = false;

    for (let i = 0; i < grid.length; i++) {
        isWin = checkColumn(grid, i, sign) || checkRow(grid, i, sign);

        if (isWin) {
            return true;
        }
    }

    return checkRigthDiagonal(grid, sign) || checkLeftDiagonal(grid, sign);
}
