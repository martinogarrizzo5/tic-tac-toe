// check single column
function checkColumn(grid: string[][], colIndex: number, sign: string) {
  for (let i = 0; i < grid.length; i++) {
    if (grid[i][colIndex] !== sign) {
      return false;
    }
  }
  return true;
}

// check single row
function checkRow(grid: string[][], rowIndex: number, sign: string) {
  for (let i = 0; i < grid.length; i++) {
    if (grid[rowIndex][i] !== sign) {
      return false;
    }
  }
  return true;
}

// check right diagonal
function checkRightDiagonal(grid: string[][], sign: string) {
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
function checkLeftDiagonal(grid: string[][], sign: string) {
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
function checkDiagonals(grid: string[][], sign: string) {
  return checkLeftDiagonal(grid, sign) || checkRightDiagonal(grid, sign);
}

// check all rows and columns
function checkRowsAndColumns(grid: string[][], sign: string) {
  for (let i = 0; i < grid.length; i++) {
    if (checkColumn(grid, i, sign) || checkRow(grid, i, sign)) {
      return true;
    }
  }
  return false;
}

// check entire grid
function checkGrid(grid: string[][], sign: string) {
  return checkRowsAndColumns(grid, sign) || checkDiagonals(grid, sign);
}
