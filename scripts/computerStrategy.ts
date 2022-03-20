function nextMove(
  grid: string[][],
  sign: string,
  opponentSign: string,
  lastEnemyMove: number[]
) {
  let movePosition = [-1, -1];

  //1) Win
  movePosition = findWinningPos(grid, sign);
  if (isValidPos(grid, movePosition)) return movePosition;

  // 2) Block
  movePosition = findWinningPos(grid, opponentSign);
  if (isValidPos(grid, movePosition)) return movePosition;

  // 3) Fork
  movePosition = findDoubleRowOpportunity(grid, sign, opponentSign);
  if (isValidPos(grid, movePosition)) return movePosition;

  // 4) Block Opponent Fork
  movePosition = findDoubleRowOpportunity(grid, opponentSign, sign);
  if (isValidPos(grid, movePosition)) return movePosition;

  // 5) Center
  movePosition = centerMove(grid);
  if (isValidPos(grid, movePosition)) return movePosition;

  // 6) Opposite Corner
  movePosition = findOppositeCorner(grid, lastEnemyMove);
  if (isValidPos(grid, movePosition)) return movePosition;

  // 7) Free Corner
  movePosition = findFreeCorner(grid);
  if (isValidPos(grid, movePosition)) return movePosition;

  // 8) Free Side
  movePosition = findFreeSide(grid);
  if (isValidPos(grid, movePosition)) return movePosition;

  return movePosition;
}

function isValidPos(grid: string[][], pos: number[]) {
  let isValid = false;
  if (
    pos[0] < grid.length &&
    pos[0] >= 0 &&
    pos[1] < grid.length &&
    pos[1] >= 0
  ) {
    isValid = true;
  }

  return isValid;
}

// 1) Win: If the player has two in a row, they can place a third to get three in a row.
// 2) Block: If the opponent has two in a row, the player must play
// the third themselves to block the opponent.
function findWinningPos(grid: string[][], sign: string) {
  // check rows
  for (let i = 0; i < grid.length; i++) {
    let signsCount = 0;
    let gap = [i, 0];
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === sign) {
        signsCount++;
      } else {
        gap[1] = j;
      }
    }
    if (signsCount === grid.length - 1) {
      if (grid[gap[0]][gap[1]] === "") {
        return gap;
      }
    }
  }

  // check cols
  for (let i = 0; i < grid.length; i++) {
    let signsCount = 0;
    let gap = [0, i];
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[j][i] == sign) {
        signsCount++;
      } else {
        gap[0] = j;
      }
    }
    if (signsCount === grid[i].length - 1) {
      if (grid[gap[0]][gap[1]] === "") {
        return gap;
      }
    }
  }

  return [-1, -1];
}

// 3) Fork: Cause a scenario where the player has two ways to win (two non-blocked lines of 2).
// 4) Blocking an opponent's fork: If there is only one possible fork for the opponent,
// the player should block it.
function findDoubleRowOpportunity(
  grid: string[][],
  sign: string,
  opponentSign: string
) {
  let pos = [-1, -1];

  // compute row cols count
  const rows: any[] = Array.from({ length: 3 }, () => ({ X: 0, O: 0, "": 0 }));
  const cols: any[] = Array.from({ length: 3 }, () => ({ X: 0, O: 0, "": 0 }));
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      rows[i][grid[i][j]]++;
      cols[j][grid[i][j]]++;
    }
  }

  // try to find double win opportunity
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      if (grid[i][j] === "") {
        if (rows[i][sign] >= 1 && rows[i][opponentSign] == 0) {
          if (cols[j][sign] >= 1 && cols[j][opponentSign] == 0) {
            pos = [i, j];
            break;
          }
        }
      }
    }
  }

  return pos;
}

// 5) Center: A player marks the center. (If it is the first move of the game,
// playing a corner move gives the second player more opportunities to make a
// mistake and may therefore be the better choice; however,
// it makes no difference between perfect players.)
function centerMove(grid: string[][]) {
  let pos = [-1, -1];

  const center = Math.floor(grid.length / 2);
  if (grid[center][center] == "") {
    pos = [center, center];
  }

  return pos;
}

// 6) Opposite corner: If the opponent is in the corner, the player plays the opposite corner.
function findOppositeCorner(grid: string[][], enemyMove: number[]) {
  let cornerPos = [-1, -1];

  if (enemyMove[0] == 0) {
    cornerPos[0] = grid.length - 1;
  } else if (enemyMove[0] == grid.length - 1) {
    cornerPos[0] = 0;
  }

  if (enemyMove[1] == 0) {
    cornerPos[1] = grid.length - 1;
  } else if (enemyMove[1] == grid.length - 1) {
    cornerPos[1] = 0;
  }

  // invalidate cornerPos if x or y are invalid or cell already occupied
  if (
    cornerPos[0] === -1 ||
    cornerPos[1] === -1 ||
    grid[cornerPos[0]][cornerPos[1]] !== ""
  ) {
    cornerPos = [-1, -1];
  }

  return cornerPos;
}

// 7) Empty corner: The player plays in a corner square.
function findFreeCorner(grid: string[][]) {
  const corners = [
    [0, 0],
    [grid.length - 1, grid.length - 1],
    [0, grid.length - 1],
    [grid.length - 1, 0],
  ];

  let pos = [-1, -1];
  for (let corner of corners) {
    if (grid[corner[0]][corner[1]] === "") {
      pos = corner;
      break;
    }
  }

  return pos;
}

// 8) Empty side: The player plays in any of the four sides.
function findFreeSide(grid: string[][]) {
  let pos = [-1, -1];

  let i = 0;
  while (i < grid.length && pos[0] == -1) {
    // check upper side
    if (grid[0][i] === "") {
      pos = [0, i];
    }
    // check left side
    else if (grid[i][0] === "") {
      pos = [i, 0];
    }
    // check right side
    else if (grid[i][grid.length - 1] === "") {
      pos = [i, grid.length - 1];
    }
    // check bottom side
    else if (grid[grid.length - 1][i] === "") {
      pos = [grid.length - 1, i];
    }

    i++;
  }

  return pos;
}
