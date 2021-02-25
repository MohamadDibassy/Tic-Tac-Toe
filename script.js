const spaces = []; //data derived from state
const O_TEXT = "0";
const X_TEXT = "X";
let currentPlayer = O_TEXT;

const boxes = Array.from(document.getElementsByClassName("box")); //manipulate the DOM
const playText = document.getElementById("playText"); //manipulate the DOM
const restartBtn = document.getElementById("restartBtn"); //manipulate the DOM
const header__turn = document.getElementById("header__turn"); //manipulate the DOM

b0 = document.getElementById("0"); //manipulate the DOM
b1 = document.getElementById("1"); //manipulate the DOM
b2 = document.getElementById("2"); //manipulate the DOM
b3 = document.getElementById("3"); //manipulate the DOM
b4 = document.getElementById("4"); //manipulate the DOM
b5 = document.getElementById("5"); //manipulate the DOM
b6 = document.getElementById("6"); //manipulate the DOM
b7 = document.getElementById("7"); //manipulate the DOM
b8 = document.getElementById("8"); //manipulate the DOM

function selectwinnerBoxes(box1, box2, box3) {
  //manipulate the DOM
  box1.classList.add("board__tile--winner");
  box2.classList.add("board__tile--winner");
  box3.classList.add("board__tile--winner");
}

const drawBoard = () => {
  //manipulate the DOM
  boxes.forEach((box, index) => {
    let stylestring = "";
    if (index < 3) {
      stylestring += `border-bottom: 3px solid var(--purple);`;
    }
    if (index % 3 === 0) {
      stylestring += `border-right: 3px solid var(--purple);`;
    }
    if (index % 3 === 2) {
      stylestring += `border-left: 3px solid var(--purple);`;
    }
    if (index > 5) {
      stylestring += `border-top: 3px solid var(--purple);`;
    }
    box.style = stylestring;
    box.addEventListener("click", boxClicked);
  });
};

restartBtn.addEventListener("click", restart); //manipulate the DOM
drawBoard(); ////manipulate the DOM

const boxClicked = e => {
  //mutate state of application
  const id = e.target.id;
  if (!spaces[id]) {
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;
    header__turn.innerHTML = `${currentPlayer}'s turn`;

    if (playerHasWon()) {
      playText.innerHTML = `${currentPlayer} has won!`;
      return;
    }
    currentPlayer = currentPlayer === O_TEXT ? X_TEXT : O_TEXT;
  }
};

const playerHasWon = () => {
  //mutate state of application
  if (
    spaces[2] == currentPlayer &&
    spaces[4] == currentPlayer &&
    spaces[6] == currentPlayer
  ) {
    selectwinnerBoxes(b2, b4, b6);
    console.log(`${currentPlayer} wins diagonally on the right.`);
    return true;
  }
  if (spaces[0] === currentPlayer) {
    if (spaces[1] === currentPlayer && spaces[2] === currentPlayer) {
      selectwinnerBoxes(b0, b1, b2);
      console.log(`${currentPlayer} wins up top.`);
      return true;
    }
    if (spaces[3] === currentPlayer && spaces[6] === currentPlayer) {
      selectwinnerBoxes(b0, b3, b6);
      console.log(`${currentPlayer} wins on the left.`);
      return true;
    }
    if (spaces[4] === currentPlayer && spaces[8] === currentPlayer) {
      selectwinnerBoxes(b0, b4, b8);
      console.log(`${currentPlayer} wins diagonally on the left.`);
      return true;
    }
  }
  if (spaces[8] === currentPlayer) {
    if (spaces[2] === currentPlayer && spaces[5] === currentPlayer) {
      selectwinnerBoxes(b8, b2, b5);
      console.log(`${currentPlayer} wins on the right.`);
      return true;
    }
    if (spaces[6] === currentPlayer && spaces[7] === currentPlayer) {
      selectwinnerBoxes(b8, b6, b7);
      console.log(`${currentPlayer} wins on the bottom.`);
      return true;
    }
  }
  if (spaces[4] === currentPlayer) {
    if (spaces[3] === currentPlayer && spaces[5] === currentPlayer) {
      selectwinnerBoxes(b4, b3, b5);
      console.log(`${currentPlayer} wins horizontally in the middle.`);
      return true;
    }
    if (spaces[1] === currentPlayer && spaces[7] === currentPlayer) {
      selectwinnerBoxes(b4, b1, b7);
      console.log(`${currentPlayer} wins vertically in the middle.`);
      return true;
    }
  }
};

const restart = () => {
  //mutate state of application
  spaces.forEach((space, index) => {
    console.log("hellp");
    spaces[index] = null;
  });
  boxes.forEach(box => {
    box.innerHTML = "";
    box.classList.remove("board__tile--winner");
  });
  playText.innerHTML = `Let's Play!`;
  currentPlayer = O_TEXT;
};

restart(); ////mutate state of application
