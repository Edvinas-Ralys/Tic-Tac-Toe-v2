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
const displayMarkerO = `<svg class = 'game-marker O' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>`;
const displayMarkerX = `<svg class = 'game-marker X' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z" /></svg>`;
const sideO = `<svg class = 'side-screen' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>`;
const sideX = `<svg class = 'side-screen' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z" /></svg>`;
const squares = gameDisplay.querySelectorAll(`.square`);

//Display winning squares
const dispalyWinnigSquares = () =>{
  squares.forEach(item=>{
    console.log(item.innerHTML)
    console.log(item.classList.contains(`game-marker O`))

    if(item.innerText == displayMarkerO ||item.innerHTML == displayMarkerX ){
      console.log(`square`)
      item.style.backgroundColor = `black`
    }
  })
}




squares.forEach((item) => {
  item.addEventListener(`click`, () => {
    console.log(gameBoard)

    if(checkForWinner() != `X` && checkForWinner() != `O`){
    if (item.innerHTML == ``) {
      if (playerOne.markerCount == 0 && playerTwo.markerCount == 0) {
        if (playerOne.marker == `O`) {
          item.innerHTML = displayMarkerO;
          playerOne.markerCount++;
          placeMarker(item.dataset.row, item.dataset.col, playerOne);
          return
        } else if (playerTwo.marker == `O`) {
          item.innerHTML = displayMarkerO;
          playerTwo.markerCount++;
          placeMarker(item.dataset.row, item.dataset.col, playerTwo);
          return
        }
      }
      if (
        playerOne.markerCount != 0 &&
        playerTwo.markerCount != 0 &&
        playerOne.markerCount == playerTwo.markerCount
      ) {
        if ((playerOne.marker == `O`)) {
          item.innerHTML = displayMarkerO;
          playerOne.markerCount++;
          placeMarker(item.dataset.row, item.dataset.col, playerOne);
          if(checkForWinner() == `X` || checkForWinner() == `O`){
            console.log(`WE DO HAVE A WINNER`)
            dispalyWinnigSquares()
          }
          return
        } else if (playerTwo.marker == `O`) {
          item.innerHTML = displayMarkerO;
          playerTwo.markerCount++;
          placeMarker(item.dataset.row, item.dataset.col, playerTwo);
          if(checkForWinner() == `X` || checkForWinner() == `O`){
            console.log(`WE DO HAVE A WINNER`)
            dispalyWinnigSquares()
          }
          return
        }
      }
      if (
        playerOne.marker == `X` &&
        playerOne.markerCount < playerTwo.markerCount
      ) {
        item.innerHTML = displayMarkerX;
        playerOne.markerCount++;
        placeMarker(item.dataset.row, item.dataset.col, playerOne);
        if(checkForWinner() == `X` || checkForWinner() == `O`){
          console.log(`WE DO HAVE A WINNER`)
          dispalyWinnigSquares()
        }
      } else if (
        playerTwo.marker == `X` &&
        playerTwo.markerCount < playerOne.markerCount
      ) {
        item.innerHTML = displayMarkerX;
        playerTwo.markerCount++;
        placeMarker(item.dataset.row, item.dataset.col, playerTwo);
        if(checkForWinner() == `X` || checkForWinner() == `O`){
          console.log(`WE DO HAVE A WINNER`)
          dispalyWinnigSquares()
        }
      }
    }
  }
  });
})





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
      markerSelect[i].classList.add(`marker-selected`)
    }
  }
  return selectedMarker;
};

//Radio button selection animation
//Prevents from picking the same marker
const firstO = document.querySelector(`.first-o`)
const firstX = document.querySelector(`.first-x`)
const secondO = document.querySelector(`.second-o`)
const secondX = document.querySelector(`.second-x`)
const firstOInp = document.querySelector(`#marker-select-o`)
const firstXInp = document.querySelector(`#marker-select-x`)
const secondOInp = document.querySelector(`#marker-select-o-second`)
const secondXInp = document.querySelector(`#marker-select-x-second`)
firstO.addEventListener(`click`, ()=>{
  firstO.classList.add(`marker-selected`)
  firstX.classList.remove(`marker-selected`)
  secondX.classList.add(`marker-selected`)
  secondO.classList.remove(`marker-selected`)
  secondXInp.checked = true;
})
firstX.addEventListener(`click`, ()=>{
  firstX.classList.add(`marker-selected`)
  firstO.classList.remove(`marker-selected`)
  secondO.classList.add(`marker-selected`)
  secondX.classList.remove(`marker-selected`)
  secondOInp.checked = true
})
secondO.addEventListener(`click`, ()=>{
  secondO.classList.add(`marker-selected`)
  secondX.classList.remove(`marker-selected`)
  firstX.classList.add(`marker-selected`)
  firstO.classList.remove(`marker-selected`)
  firstXInp.checked = true
})
secondX.addEventListener(`click`, ()=>{
  secondX.classList.add(`marker-selected`);
  secondO.classList.remove(`marker-selected`);
  firstO.classList.add(`marker-selected`)
  firstX.classList.remove(`marker-selected`)
  firstOInp.checked = true
})



const firstPlayerDisplay = document.querySelector(`.playerone`);
const secondPlayerDisplay = document.querySelector(`.playertwo`)
const displayPlayers = (playerDisplay, playerNumber) =>{
const playerName = playerDisplay.querySelector(`.name`)
playerName.innerHTML = playerNumber.name

const playerMarkerDisplay = playerDisplay.querySelector(`.marker`)
console.log(playerDisplay)
console.log(playerMarkerDisplay)
if(playerNumber.marker == `O`){
console.log(`player is O`)
  playerMarkerDisplay.innerHTML = sideO
}
else if( playerNumber.marker == `X`){
  playerMarkerDisplay.innerHTML = sideX
}
}


//Initial dispaly of player turn
const displayCurrentTurn = () =>{
  if(playerOne.markerCount == 0 && playerTwo.markerCount == 0){
    if(playerOne.marker == `O`){
      firstPlayerDisplay.classList.add(`active-one`)
    }
    else if(playerTwo.marker == `O`){
      secondPlayerDisplay.classList.add(`active-two`)
    }
  }
}

//Switch display on turn
const clickedSquareClr = `rgba(30, 47, 54, 0.603)`
squares.forEach(item =>{
  item.addEventListener(`click`, ()=>{
    if(checkForWinner() != `X` && checkForWinner() != `O`){
    if(firstPlayerDisplay.classList.contains(`active-one`)){
      firstPlayerDisplay.classList.remove(`active-one`)
      secondPlayerDisplay.classList.add(`active-two`)
      item.style.backgroundColor = clickedSquareClr
    }
    else if(secondPlayerDisplay.classList.contains(`active-two`)){
      secondPlayerDisplay.classList.remove(`active-two`),
      firstPlayerDisplay.classList.add(`active-one`)
      item.style.backgroundColor = clickedSquareClr
    }
  }
  if(checkForWinner() == `X` || checkForWinner() == `O`){
    if(firstPlayerDisplay.classList.contains(`active-one`)){
      firstPlayerDisplay.classList.remove(`active-one`)
      firstPlayerDisplay.classList.add(`winner-one`)
      item.style.backgroundColor = clickedSquareClr
    }else if(secondPlayerDisplay.classList.contains(`active-two`) ){
    secondPlayerDisplay.classList.remove(`active-two`),
    secondPlayerDisplay.classList.add(`winner-two`)
    item.style.backgroundColor = clickedSquareClr
  }
}})
})

const resetButton = document.querySelector(`.reset-game`);
resetButton.addEventListener(`click`, ()=>{
  resetButton.classList.add(`reset-game-focus`)
})


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
  displayPlayers(firstPlayerDisplay, playerOne),
  displayPlayers(secondPlayerDisplay, playerTwo)
  displayCurrentTurn()
  console.log(playerOne);
  console.log(playerTwo);
});
