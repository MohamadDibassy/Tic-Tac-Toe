const spaces = [];
const rootDomNode = document.body;

const O_TEXT = "0";
const X_TEXT = "X";

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

const boxClicked = (e) => {
  //mutate state of application
  const id = e.target.id;
  if (!spaces[id]) {
    const currentPlayer = currentPlayerFromState(spaces);
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;
    header__turn.innerHTML = `${currentPlayer}'s turn`;

    if (playerHasWon()) {
      playText.innerHTML = `${currentPlayer} has won!`;
      alert(`Game Finished! Winning Player: ${currentPlayer}`);
      restart();
       return;
    }
  }
};

// This function calculates the current player from `boxes`. Since we know that
// players will alternate taking moves, we can deduce who the current player is
// from the number of "X"s and "O"s in `boxes`.

function currentPlayerFromState(spaces) {
  const numXs = spaces.filter((b) => b === X_TEXT).length;
  const numOs = spaces.filter((b) => b === O_TEXT).length;
  console.log(numXs < numOs ? X_TEXT : O_TEXT, "currentPlayer");
  console.log(spaces, "spaces");
  console.log(numXs, "numXs Length");
  console.log(numOs, "numOs Length");
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
    document.getElementById("2").classList.add("board__tile--winner"); //manipulate the DOM
    document.getElementById("4").classList.add("board__tile--winner"); //manipulate the DOM
    document.getElementById("6").classList.add("board__tile--winner"); //manipulate the DOM
    console.log(`${currentPlayer} wins diagonally on the right.`);
    return true;
  }
  if (spaces[0] === currentPlayer) {
    if (spaces[1] === currentPlayer && spaces[2] === currentPlayer) {
      document.getElementById("0").classList.add("board__tile--winner"); //manipulate the DOM
      document.getElementById("1").classList.add("board__tile--winner"); //manipulate the DOM
      document.getElementById("2").classList.add("board__tile--winner"); //manipulate the DOM
      console.log(`${currentPlayer} wins up top.`);
      return true;
    }
    if (spaces[3] === currentPlayer && spaces[6] === currentPlayer) {
      document.getElementById("0").classList.add("board__tile--winner"); //manipulate the DOM
      document.getElementById("3").classList.add("board__tile--winner"); //manipulate the DOM
      document.getElementById("6").classList.add("board__tile--winner"); //manipulate the DOM
      console.log(`${currentPlayer} wins on the left.`);
      return true;
    }
    if (spaces[4] === currentPlayer && spaces[8] === currentPlayer) {
      document.getElementById("0").classList.add("board__tile--winner"); //manipulate the DOM
      document.getElementById("4").classList.add("board__tile--winner"); //manipulate the DOM
      document.getElementById("8").classList.add("board__tile--winner"); //manipulate the DOM
      console.log(`${currentPlayer} wins diagonally on the left.`);
      return true;
    }
  }
  if (spaces[8] === currentPlayer) {
    if (spaces[2] === currentPlayer && spaces[5] === currentPlayer) {
      document.getElementById("8").classList.add("board__tile--winner"); //manipulate the DOM
      document.getElementById("2").classList.add("board__tile--winner"); //manipulate the DOM
      document.getElementById("5").classList.add("board__tile--winner"); //manipulate the DOM
      console.log(`${currentPlayer} wins on the right.`);
      return true;
    }
    if (spaces[6] === currentPlayer && spaces[7] === currentPlayer) {
      document.getElementById("8").classList.add("board__tile--winner"); //manipulate the DOM
      document.getElementById("6").classList.add("board__tile--winner"); //manipulate the DOM
      document.getElementById("7").classList.add("board__tile--winner"); //manipulate the DOM
      console.log(`${currentPlayer} wins on the bottom.`);
      return true;
    }
  }
  if (spaces[4] === currentPlayer) {
    if (spaces[3] === currentPlayer && spaces[5] === currentPlayer) {
      document.getElementById("4").classList.add("board__tile--winner"); //manipulate the DOM
      document.getElementById("3").classList.add("board__tile--winner"); //manipulate the DOM
      document.getElementById("5").classList.add("board__tile--winner"); //manipulate the DOM
      console.log(`${currentPlayer} wins horizontally in the middle.`);
      return true;
    }
    if (spaces[1] === currentPlayer && spaces[7] === currentPlayer) {
      document.getElementById("4").classList.add("board__tile--winner"); //manipulate the DOM
      document.getElementById("1").classList.add("board__tile--winner"); //manipulate the DOM
      document.getElementById("7").classList.add("board__tile--winner"); //manipulate the DOM
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
