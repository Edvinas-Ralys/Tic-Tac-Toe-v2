let gameBoard = [
  [``, ``, ``],
  [``, ``, ``],
  [``, ``, ``],
];
const makePlayer = (type, name, marker, markerCount) => {
  return { type, type, name, marker, markerCount };
};
const playerOne = makePlayer(`Human`, `Edvinas`, `O`, 0);

const checkForWinner = () => {
  let winnerO = false;
  let winnerX = false;
  const markerO = `O`;
  const markerX = `X`;
  //Checks rows one by one for winner
  for (let i = 0; i < 3; i++) {
    let markersO = 0;
    let markersX = 0;
    gameBoard[i].forEach((item) => {
      item == `O` && markersO++;
      item == `X` && markersX++;
    });
    if (markersO == 3) {
      winnerO = true;
    } else if (markersX == 3) {
      winnerX = true;
    }
  }
  if (winnerO == true) {
    return markerO;
  } else if (winnerX == true) {
    return markerX;
  } else {
    //If there are no row winners - checks columns for winner
    for (let i = 0; i < 3; i++) {
      let markersO = 0;
      let markersX = 0;
      gameBoard.forEach((item) => {
        item[i] == `O` && markersO++;
        item[i] == `X` && markersX++;
        if (markersO == 3) {
          winnerO = true;
        }
        if (markersX == 3) {
          winnerX = true;
        }
      });
    }
  }
  if (winnerO == true) {
    return markerO;
  } else if (winnerX == true) {
    return markerX;
  } else {
    //If there are no colmun winner - checks diags for winner
    let markersO = 0;
    let markersX = 0;
    for (let i = 0; i < 3; i++) {
      gameBoard[i][i] == `O` && markersO++;
      gameBoard[i][i] == `X` && markersX++;
    }
    if (markersO != 3 && markersX != 3) {
      markersO = 0;
      markersX = 0;
      for (let i = 0; i < 3; i++) {
        gameBoard[i][2 - i] == `O` && markersO++;
        gameBoard[i][2 - i] == `X` && markersX++;
      }
    }
    if (markersO == 3) {
      winnerO = true;
    }
    if (markersX == 3) {
      winnerX = true;
    }
  }
  winnerO == true ? winnerO : winnerX == true ? winnerX : null;
  if (winnerO == true) {
    return markerO;
  } else if (winnerX == true) {
    return markerX;
  }
};

const placeMarker = (row, column, player) => {
  gameBoard.map((item, index) => {
    if (index == row) {
      item.splice(column, 1, player.marker);
    }
  });
  if (checkForWinner() == `O`) {
    console.log(`O won`);
  } else if (checkForWinner() == `X`) {
    console.log(`X won`);
  }
};

placeMarker(0, 0, playerOne);
placeMarker(1, 1, playerOne);
placeMarker(2, 2, playerOne);
console.log(gameBoard);

//Game board dispaly
const gameDisplay = document.querySelector(`.game-display`);
for (let i = 0; i < 9; i++) {
  const square = document.createElement(`div`);
  if (i < 3) {
    square.setAttribute(`data-row`, 0);
  } else if (i > 2 && i < 6) {
    square.setAttribute(`data-row`, 1);
  } else {
    square.setAttribute(`data-row`, 2);
  }
  if (i == 0 || i == 3 || i == 6) {
    square.setAttribute(`data-col`, 0);
  } else if (i == 1 || i == 4 || i == 7) {
    square.setAttribute(`data-col`, 1);
  } else {
    square.setAttribute(`data-col`, 2);
  }
  square.classList.add(`square`);
  gameDisplay.appendChild(square);
}
