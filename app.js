let gameBoard = [
  [``, ``, ``],
  [``, ``, ``],
  [``, ``, ``],
];
const makePlayer = (type, name, marker, markerCount) => {
  return { type, type, name, marker, markerCount };
};
let playerOne;
let playerTwo;

const body = document.querySelector(`body`);
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

// placeMarker(0, 0, playerOne);
// placeMarker(1, 1, playerOne);
// placeMarker(2, 2, playerOne);
// console.log(gameBoard);

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
const displayMarkerO = `<svg class = 'game-marker' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>`;
const displayMarkerX = `<svg class = 'game-marker' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z" /></svg>`;
const squares = gameDisplay.querySelectorAll(`.square`);
squares.forEach((item) => {
  item.addEventListener(`click`, () => {
    //First move
    if (item.innerHTML == ``) {
      if (playerOne.markerCount == 0 && playerTwo.markerCount == 0) {
        if (playerOne.marker == `O`) {
          item.innerHTML = displayMarkerO;
          playerOne.markerCount++;
          placeMarker(item.dataset.row, item.dataset.col, playerOne);
          console.log(`Player ONE`);
          return `placed`
        } else if (playerTwo.marker == `O`) {
          item.innerHTML = displayMarkerO;
          playerTwo.markerCount++;
          placeMarker(item.dataset.row, item.dataset.col, playerTwo);
          console.log(`Player TWO`);
          return `placed`
        }
      }
      if (
        playerOne.markerCount != 0 &&
        playerTwo.markerCount != 0 &&
        playerOne.markerCount == playerTwo.markerCount
      ) {
        if ((playerOne.marker = `O`)) {
          item.innerHTML = displayMarkerO;
          playerOne.markerCount++;
          placeMarker(item.dataset.row, item.dataset.col, playerOne);
          console.log(`Player ONE`);
          return `placed`
        } else if (playerTwo.marker == `O`) {
          item.innerHTML = displayMarkerO;
          playerTwo.markerCount++;
          placeMarker(item.dataset.row, item.dataset.col, playerTwo);
          console.log(`Player TWO`);
          return `placed`
        }
      }
      if (
        playerOne.marker == `X` &&
        playerOne.markerCount < playerTwo.markerCount
      ) {
        item.innerHTML = displayMarkerX;
        playerOne.markerCount++;
        placeMarker(item.dataset.row, item.dataset.col, playerOne);
        console.log(`Player ONE`);
      } else if (
        playerTwo.marker == `X` &&
        playerTwo.markerCount < playerOne.markerCount
      ) {
        item.innerHTML = displayMarkerX;
        playerTwo.markerCount++;
        placeMarker(item.dataset.row, item.dataset.col, playerTwo);
        console.log(`Player TWO`);
      }
    }
  });
});

//Dialog open on page load
const dialogWindow = document.querySelector(`dialog`);
window.addEventListener(`load`, () => {
  dialogWindow.showModal();
});

//Settings button
const settings = document.querySelector(`.settings-marker-cog`);
settings.addEventListener(`click`, () => {
  dialogWindow.showModal();
});

//Player ONE
const playerOneType = dialogWindow.querySelector(`.player-one-type`);
const playerOneName = dialogWindow.querySelector(`.player-one-name`);
const playerOneMarkers = document.getElementsByName(`first-player-select`);

//Player TWO
const playerTwoType = dialogWindow.querySelector(`.player-two-type`);
const playerTwoName = dialogWindow.querySelector(`.player-two-name`);
const playerTwoMarkers = document.getElementsByName(`second-player-select`);

//Selects marker
const playerMarker = (markerSelect) => {
  let selectedMarker = ``;
  for (let i = 0; i < markerSelect.length; i++) {
    if (markerSelect[i].checked == true) {
      selectedMarker = markerSelect[i].value;
    }
  }
  return selectedMarker;
};

//Dialog close in start
const startButton = document.querySelector(`.start-button`);
startButton.addEventListener(`click`, () => {
  dialogWindow.close();
  playerOne = makePlayer(
    playerOneType.value,
    playerOneName.value,
    playerMarker(playerOneMarkers),
    0
  );
  playerTwo = makePlayer(
    playerTwoType.value,
    playerTwoName.value,
    playerMarker(playerTwoMarkers),
    0
  );
  console.log(playerOne);
  console.log(playerTwo);
});
