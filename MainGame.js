//this file controls the flow of the main game
//the turn of the player is controlled by a turn index
//if the index = 0, it's p1's turn
//if the index = 1, it's p2's turn
//the turn index is also used to access a 3D array, where the first array contains two 10x10 boards (a 2D array)

let turn = 0; //game starts on p1's turn, p1 = 0

let p1Hits = 0; //each player starts with 0 hits
let p2Hits = 0;

let maxHits = 0; //max number of hits possible is used to track how close players are to winning the game

let p1GuessedBoard = createEmptyBoard(); //two empty boards are created and stored in an array
let p2GuessedBoard = createEmptyBoard(); //the default board is filled with 0's, indicating that a position hasn't been guessed
arrGuessedBoard = [p1GuessedBoard, p2GuessedBoard];

//creating ship objects for testing functionality
/*const ship1 = {
    topLeft: "a01",
    isVertical: false,
    length: 2
}

const ship2 = {
    topLeft: "c04",
    isVertical: true,
    length: 5
}

const ship3 = {
    topLeft: "f06",
    isVertical: true,
    length: 3
}

const ship4 = {
    topLeft: "a01",
    isVertical: false,
    length: 2
}

const ship5 = {
    topLeft: "e07",
    isVertical: true,
    length: 4
}

const ship6 = {
    topLeft: "f05",
    isVertical: false,
    length: 3
}

let p1Ships = [ship1, ship2, ship3];
let p2Ships = [ship4, ship5, ship6];*/

//createCoordinateArray(p1Ships);
//createCoordinateArray(p2Ships);

//initializes the game according to the player's ship number and placement
function initializeGame() {
    for (i = 1; i <= numShips; i++) {
        maxHits = maxHits + i;
    }

    createCoordinateArray(p1Ships);
    createCoordinateArray(p2Ships);

    setInstruction("Player 1: Take a guess", 1);
    setInstruction("Player 2: Take a guess", 2);
}

//scans all components of the ship array to determine whether a guess is a hit or a miss
function guessCell(cell) { 
    cell = cell.substr(0, 3);
    if (turn == 0) {
        shipArray = p2Ships;
    }
    else if (turn == 1) {
        shipArray = p1Ships;
    }
    if (isGuessed(cell)) {
        return;
    }
    let isHit = false;
    for (let i = 0; i < shipArray.length; i++) {
        for (let j = 0; j < shipArray[i].length; j++) {
            if (shipArray[i].coordinateArray[j] == cell) {
                isHit = true;
                updateHitCounter();
                updateGuessedBoard(cell, isHit);
                callSetTileState(cell, isHit);
                if (isOver()) {
                    endGame();
                    return;
                }
                //console.log("Hit!");
            }
        }
    }
    if (isHit == false) {
        updateGuessedBoard(cell, isHit);
        callSetTileState(cell, isHit);
        //console.log("Miss!"); 
    }
    switchTurns();
}

//checks whether or not a cell has been guessed
function isGuessed(cell) {
    let board = arrGuessedBoard[turn];

    let row = parseInt(cell[1] + cell[2]) - 1;
    let column = 0;

    let char = 'a'; //converts the letter column of 'cell' coordinate into an int
    while (char != cell[0]) {
        char = nextChar(char);
        column++;
    }
    if (board[row][column] == 0) {
        return false;
    }
    else {
        return true;
    }
}

//updates the opponent's board
//default = 0, hit = 1, miss = 2
function updateGuessedBoard(cell, isHit) {
    let board = arrGuessedBoard[turn];

    let row = parseInt(cell[1] + cell[2]) - 1;
    let column = 0;

    let char = 'a'; //converts the letter column of 'cell' coordinate into an int
    while (char != cell[0]) {
        char = nextChar(char);
        column++;
    }
    if (board[row][column] == 0) { //0 = not guessed, this if statement filters out repeat guesses
        if (isHit) {
            board[row][column] = 1; //hit = 1
        }
        else {
            board[row][column] = 2; //miss = 2
        }    
    }
}

//creates a tileID that is passed to GraphicsUI.js through setTileState
function callSetTileState(cell, isHit) {
    if (turn == 0) {
        let tileID_1 = cell + 'p1AttackBoard';
        let tileID_2 = cell + 'p2HomeBoard';
        setTileState(tileID_1, isHit);
        setTileState(tileID_2, isHit);
    }
    else if (turn == 1) {
        let tileID_1 = cell + 'p1HomeBoard';
        let tileID_2 = cell + 'p2AttackBoard';
        setTileState(tileID_1, isHit);
        setTileState(tileID_2, isHit);
    }
}

//switches the turn index and updates the game state
function switchTurns() {
    if (turn == 0) {
        turn = 1;
        gameState = "p2Turn";
        switchWindow("transition");
        updateTransitionTarget("p2View");
    }
    else {
        turn = 0;
        gameState = "p1Turn";
        switchWindow("transition");
        updateTransitionTarget("p1View");
    }
}

//updates the total number of hits a player has
function updateHitCounter() {
    if (turn == 0) {
        p1Hits++;
    }
    else if (turn == 1) {
        p2Hits++;
    }
}

//checks if the game is over
function isOver() {
    if (p1Hits == maxHits || p2Hits == maxHits) {
        return true;
    }
    else {
        return false;
    }
}

//ends the game
function endGame() {
    gameState = "end";
    if (turn == 0) {
        setGameOverText("Player 1 Wins!");
        switchWindow("gameOver");
    }
    else if (turn == 1) {
        setGameOverText("Player 2 Wins!");
        switchWindow("gameOver");
    }
}

//stalls code execution for a certain number of ms
function wait(ms) { 
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
 }

 //creates an empty 2D array that will contain information about the opponent's board
 function createEmptyBoard() {
     let board = [];
     for (let i = 0; i < 10; i++) {
         board[i] = [];
         for (let j = 0; j < 10; j++) {
             board[i][j] = 0;
         }
     }
     return board;
 }

//takes a player's ship array and turns the information of top left, orientation, and length for each ship into board coordinates
function createCoordinateArray(shipArray) {
    for (let m = 0; m < shipArray.length; m++) {
        shipArray[m].coordinateArray = [];
        shipArray[m].coordinateArray[0] = shipArray[m].topLeft.substr(0, 3);
        if (shipArray[m].isVertical == false) {
            for (i = 1; i < shipArray[m].length; i++) {
                shipArray[m].coordinateArray[i] = nextChar(shipArray[m].coordinateArray[i-1][0]) + shipArray[m].topLeft[1] + shipArray[m].topLeft[2];
            }
        }
        else if (shipArray[m].isVertical == true) {
            for (i = 1; i < shipArray[m].length; i++) {
                if (shipArray[m].coordinateArray[i-1][2] == 9) {
                    shipArray[m].coordinateArray[i] = shipArray[m].topLeft[0] + 1 + 0;
                }
                else {
                    shipArray[m].coordinateArray[i] = shipArray[m].topLeft[0] + shipArray[m].topLeft[1] + nextChar(shipArray[m].coordinateArray[i-1][2]);
                }
            }
        }
    }
}

//pass in a player's ship array and this will print the coordinates each ship occupies, used for testing functionality
function printCoordinateArray(shipArray) { 
    for (let i = 0; i < shipArray.length; i++) {
        console.log("SHIP OF LENGTH " + shipArray[i].length + " COORDINATES");
        for (let j = 0; j < shipArray[i].length; j++) {
            console.log(shipArray[i].coordinateArray[j]);
        }
    }
}

//increments a character, used for creating coordinate arrays
function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
}
