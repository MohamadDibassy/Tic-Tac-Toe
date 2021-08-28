// Test for `currentPlayerFromState` works properly.

function test_currentPlayerFromState_openingMove() {
  const spaces = [];
  const initialMove = currentPlayerFromState(spaces);
  const expectedInitialMove = O_TEXT;
  console.assert(initialMove === expectedInitialMove);
}

function test_currentPlayerFromState_secondMove() {
  const spaces = [O_TEXT];
  const initialMove = currentPlayerFromState(spaces);
  const expectedInitialMove = X_TEXT;
  console.assert(initialMove === expectedInitialMove);
}

function test_currentPlayerFromState_thirdMove() {
  const spaces = [O_TEXT, X_TEXT];
  const initialMove = currentPlayerFromState(spaces);
  const expectedInitialMove = O_TEXT;
  console.assert(initialMove === expectedInitialMove);
}

function test_currentPlayerFromState_thirdMoveMiddle() {
  let spaces = [];
  spaces[8] = O_TEXT;
  spaces[4] = X_TEXT;
  const initialMove = currentPlayerFromState(spaces);
  const expectedInitialMove = O_TEXT;
  console.assert(initialMove === expectedInitialMove);
}

function test_currentPlayerFromState_fourthMove() {
  const spaces = [O_TEXT, X_TEXT, O_TEXT];
  const initialMove = currentPlayerFromState(spaces);
  const expectedInitialMove = X_TEXT;
  console.assert(initialMove === expectedInitialMove);
}

function test_currentPlayerFromState_fifthMove() {
  const spaces = [O_TEXT, X_TEXT, O_TEXT, X_TEXT];
  const initialMove = currentPlayerFromState(spaces);
  const expectedInitialMove = O_TEXT;
  console.assert(initialMove === expectedInitialMove);
}

function test_currentPlayerFromState_sixthMove() {
  const spaces = [O_TEXT, X_TEXT, O_TEXT, X_TEXT, O_TEXT];
  const initialMove = currentPlayerFromState(spaces);
  const expectedInitialMove = X_TEXT;
  console.assert(initialMove === expectedInitialMove);
}

function test_currentPlayerFromState_seventhMove() {
  const spaces = [O_TEXT, X_TEXT, O_TEXT, X_TEXT, O_TEXT, X_TEXT];
  const initialMove = currentPlayerFromState(spaces);
  const expectedInitialMove = O_TEXT;
  console.assert(initialMove === expectedInitialMove);
}

function test_currentPlayerFromState_eigthMove() {
  const spaces = [O_TEXT, X_TEXT, O_TEXT, X_TEXT, O_TEXT, X_TEXT, O_TEXT];
  const initialMove = currentPlayerFromState(spaces);
  const expectedInitialMove = X_TEXT;
  console.assert(initialMove === expectedInitialMove);
}

function test_currentPlayerFromState_ninthMove() {
  const spaces = [
    O_TEXT,
    X_TEXT,
    O_TEXT,
    X_TEXT,
    O_TEXT,
    X_TEXT,
    O_TEXT,
    X_TEXT,
  ];
  const initialMove = currentPlayerFromState(spaces);
  const expectedInitialMove = O_TEXT;
  console.assert(initialMove === expectedInitialMove);
}

function runTests() {
  test_currentPlayerFromState_openingMove();
  test_currentPlayerFromState_secondMove();
  test_currentPlayerFromState_thirdMove();
  test_currentPlayerFromState_thirdMoveMiddle();
  test_currentPlayerFromState_fourthMove();
  test_currentPlayerFromState_fifthMove();
  test_currentPlayerFromState_sixthMove();
  test_currentPlayerFromState_seventhMove();
  test_currentPlayerFromState_eigthMove();
  test_currentPlayerFromState_ninthMove();
}

runTests();

// Test for `PlayerHasWon` works properly.

function test_correctPlayerHasWon_xPlayer() {
  let spaces = [];
  spaces[8] = O_TEXT;
  spaces[2] = X_TEXT;
  spaces[1] = O_TEXT;
  spaces[4] = X_TEXT;
  spaces[3] = O_TEXT;
  spaces[6] = X_TEXT;
  //call player has won?
  playerHasWon();
  playText.innerHTML;
  const winningPlayer = "X has won!";
  const expectedWinningPlayer = playText.innerHTML;
  console.assert(winningPlayer === expectedWinningPlayer);
}
