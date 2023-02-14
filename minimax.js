//Ameer Jamal PSUT 20180381

function bestMove() {
  // AI to make its turn
  //defining vars
  let bestScore = -Infinity;
  let move;
  let evaluationP = createP('');
  evaluationP.style('font-size', '16pt');

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // Is the spot available?
      if (board[i][j] == '') {
        //if yes put the AI answer in that spot
        board[i][j] = ai;
        //make the score dependent on the minmax evaluation
        let score = minimax(board, 0, false);
        evaluationP.html("the Evaluation is "+ score);
        //make sure no postion is selected before the start of the evaluation
        board[i][j] = '';
        //take best score and save the AI's postion to that box
        if (score > bestScore) {
          bestScore = score;
          move = { i, j };
        }
      }
    }
  }
  //finally after all scores have been checked 
  //by minmax move the AI to that board postion 
  //and put X in that spot and
  //make the next player the human
  board[move.i][move.j] = ai;
  currentPlayer = human;
}

//score system for minmax to know whats a good and whats a bad move
//if its a 10 then x wins
//if its a -10 the o wins
//if its a 0 then its a tie
let scores = {
  X: 10,
  O: -10,
  tie: 0
};

function minimax(board, depth, isMaximizing) {
  //start off by checking if there is a winner in the current state of the board
  // else return the score calculated by function
  let result = checkWinner();
  if (result !== null) {
    return scores[result];
  }

  if (isMaximizing) {//for maximizing player
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (board[i][j] == '') {
          board[i][j] = ai;
          //recursivly call the minimax function increasing its depth
          //and setting isMaxmizing to false to enter the else statment (running minimizing)
          let score = minimax(board, depth + 1, false);
          board[i][j] = '';
          //take the bestscore to be the max between the current and bestscore
          bestScore = max(score, bestScore);
        }
      }
    }
    return bestScore;
  } else { //for minimizing player
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (board[i][j] == '') {
          //play optimally as the human to see 
          // how they would play to use in your advantage
          board[i][j] = human;
          let score = minimax(board, depth + 1, true);
          board[i][j] = '';
          //take the min score between score and best
          //which assumes the human played optimally 
          bestScore = min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
}
