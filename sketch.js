//Ameer Jamal PSUT 20180381

//making 2d array for board values and initializing them to start out empty
let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];
//defining height and width of board
let w; // = width / 3; we will use the division by 3 for equal board line distribution
let h; // = height / 3;

//ai is x human is o
let ai = 'X';
let human = 'O';
let currentPlayer = human;
let startIndex = 0;

function setup() {
 var myCanvas =  createCanvas(500, 500);//Canvas size
  //division for proper line distrubution
  w = width / 3; 
  h = height / 3;
 //  bestMove(); //to make X start first ON DEFUALT remove comment
     
 //to put the canvas in a div and center it with css
  myCanvas.parent("canvasDiv");
  
}
//function allowing the AI to start first
function starter() {
if(startIndex==0)  
    bestMove(); //to make X start first remove comment
  else if(startIndex==1) {
  let errorP = createP('');
 errorP.html('Ai has already Started'); 
}
  startIndex++;
}
//helper function for checkWinner where it sees if the cummulative X's OR O's add up to 3 
function equals3(a, b, c) {
  return a == b && b == c && a != '';
}

function checkWinner() {
  let winner = null;

  // horizontal checking going through each row
  for (let i = 0; i < 3; i++) {
    //we are using i as the winner becouse whichever i is in the first postion
    //and matchs the next three postions will mean they are a winner
    //this i is going through rows
    if (equals3(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0];
    }
  }

  // Vertical checking going through each column
  for (let i = 0; i < 3; i++) {
    //we are using i as the winner becouse whichever i is in the first postion
    //and matchs the next three postions will mean they are a winner
    //this i is going through columns
    if (equals3(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
    }
  }

  // Diagonal checking going through all the diagonals
  if (equals3(board[0][0], board[1][1], board[2][2])) {
    //we are starting from the first corner on the right and checking through the middle
    winner = board[0][0];
  }
  if (   //we are starting from the second corner on the left and checking through the middle
    equals3(board[2][0], board[1][1], board[0][2])) {
    winner = board[2][0];
  }

  //calculation of how many open spots are available to know when to stop checking 
  //and know its a tie
  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == '') {
        openSpots++;
      }
    }
  }

  //if there is no winner and no more spots that means the game is a tie 
  //else return the winner we found above
  if (winner == null && openSpots == 0) {
    return 'tie';
  } else {
    return winner;
  }
}

function mousePressed() {
  if (currentPlayer == human) {
    // Human make turn where is he clicking? 
    let i = floor(mouseX / w);
    let j = floor(mouseY / h);
    // If valid turn (which is they click in the board and in a valid empty box)
    if (board[i][j] == '') {
      //then draw the human O and make the current player AI 
      //and call its bestmove() minimax function
      board[i][j] = human;
      currentPlayer = ai;
      //we add start index so they cant play AI starts first after starting 
      startIndex++;
      bestMove();
    }
  }
}

//the drawing of the board
function draw() {
  
  background(166,192,210);
  strokeWeight(10);

  //lines that make up the board
  line(w, 0, w, height);
  line(w * 2, 0, w * 2, height);
  line(0, h, width, h);
  line(0, h * 2, width, h * 2);
//draw line in a for loop for columns and rows
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      let x = w * i + w / 2;
      let y = h * j + h / 2;
      let spot = board[i][j];
      textSize(32);
      let r = w / 4;
      //draw circle for human
      if (spot == human) {
        noFill();
        ellipse(x, y, r * 2);
      }
     //draw X for ai (this is drawing a line from corner to corner)
      else if (spot == ai) {
        line(x - r, y - r, x + r, y + r);
        line(x + r, y - r, x - r, y + r);
      }
    }
  }

  //check if anyone has one on each move
  let result = checkWinner();
  //still no winner here
  if (result != null) {
    noLoop();
    //to create a paragraph for p
    let resultP = createP('');
    resultP.style('font-size', '32pt');
   //the checkwinner() function returns a tie so it prints its a TIE on screen
    if (result == 'tie') {
      resultP.html('It\'s a Tie!');
    } else {//A player has one , so it prints who has won
      resultP.html(`${result} wins!`);
    }
  }
}
