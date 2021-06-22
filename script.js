const spaces = [];
const rootDomNode = document.body;

const O_TEXT = "0";
const X_TEXT = "X";

function selectwinnerBoxes(box1, box2, box3) {
  //manipulate the DOM
  box1.classList.add("board__tile--winner");
  box2.classList.add("board__tile--winner");
  box3.classList.add("board__tile--winner");
}

// In fact, each time you call drawBoard, I would delete all of the existing DOM nodes
// and re-create everything from scratch.
// This isn’t very efficient, but for a small program like this, it actually works very well.

const drawBoard = (rootDomNode, spaces) => {
  rootDomNode.innerHTML = `
    <div class="container">
      <h1 id="playText">Let's Play</h1>
      <h2 id="header__turn"></h2>
      <button id="restartBtn">Restart</button>
      <div id="gameboard">
        <div class="box" id="0"></div>
        <div class="box" id="1"></div>
        <div class="box" id="2"></div>
        <div class="box" id="3"></div>
        <div class="box" id="4"></div>
        <div class="box" id="5"></div>
        <div class="box" id="6"></div>
        <div class="box" id="7"></div>
        <div class="box" id="8"></div>
      </div>
    </div>
    `;

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

  restartBtn.addEventListener("click", restart);
};

const boxClicked = e => {
  //mutate state of application
  const id = e.target.id;
  if (!spaces[id]) {
    const currentPlayer = currentPlayerFromState(spaces);
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;
    header__turn.innerHTML = `${currentPlayer}'s turn`;

    if (playerHasWon()) {
      playText.innerHTML = `${currentPlayer} has won!`;
      return;
    }
  }
};

// // This function calculates the current player from `boxes`. Since we know that
// // players will alternate taking moves, we can deduce who the current player is
// // from the number of "X"s and "O"s in `boxes`.

function currentPlayerFromState(spaces) {
  const numOs = spaces.filter(b => b === O_TEXT).length;
  const numXs = spaces.filter(b => b === X_TEXT).length;
  return numXs < numOs ? X_TEXT : O_TEXT;
}

const playerHasWon = () => {
  //mutate state of application
  const currentPlayer = currentPlayerFromState(spaces);

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
  spaces.forEach((space, index) => {
    spaces[index] = null;
  });
  drawBoard(rootDomNode, spaces);
};

//mutate state of application

drawBoard(rootDomNode, spaces);

//const mapStateToProps = (state = state => ({
//spaces: state.spaces
//}));
//export default connect(mapStateToProps)();
