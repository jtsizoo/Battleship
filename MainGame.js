//this file controls the flow of the main game
//the turn of the player is controlled by a turn index
//if the index = 0, it's p1's turn
//if the index = 1, it's p2's turn
//the turn index is also used to access a 3D array, where the first array contains two 10x10 boards (a 2D array)

let turn = 0; //game starts on p1's turn, p1 = 0

let p1Hits = 0; //each player starts with 0 hits
let p2Hits = 0;

let maxHits = 0; //max number of hits possible is used to track how close players are to winning the game

let targetShip = 0; //tracking variable for Medium AI
let targetLoci = ""; //tracking variable for Medium AI

let p1GuessedBoard = createEmptyBoard(); //two empty boards are created and stored in an array
let p2GuessedBoard = createEmptyBoard(); //the default board is filled with 0's, indicating that a position hasn't been guessed
arrGuessedBoard = [p1GuessedBoard, p2GuessedBoard]; //arrGuessedBoard is an array containing both of the empty player boards
//this array is accessed using arrGuessedBoard[turn], so the functions below don't have to specify which player's board they'd like to access

//initializes the game according to the player's ship number and placement
function initializeGame() {
    for (i = 1; i <= numShips; i++) {
        maxHits = maxHits + i;
    }

    createCoordinateArray(p1Ships);
    createCoordinateArray(p2Ships);

    setInstruction("Player 1, take a guess!", 1);
    setInstruction("Player 2, take a guess!", 2);
}


//scans all components of the ship array to determine whether a guess is a hit or a miss
function guessCell(cell) {
    cell = cell.substr(0, 3); //cell = "e04", for example
    if (turn == 0) { //if it's p1's turn, we are scanning p2's ships, and vice versa
        shipArray = p2Ships;
    }
    else if (turn == 1) {
        shipArray = p1Ships;
    }
    if (isGuessed(cell)) { //controls repeat guesses, the turn isn't switched until the player guesses a new cell
        return;
    }
    let isHit = false;
    for (let i = 0; i < shipArray.length; i++) {
        for (let j = 0; j < shipArray[i].length; j++) {
            if (shipArray[i].coordinateArray[j] == cell) { //if a cell guessed is a hit, we update the hit counter, update the board the player is attacking logically and visually, update transition text accordingly, check if the game is over
                
                //targetShip = shipArray[i].length; //update tracking variables for medium AI
                //targetLoci = cell;
                
                isHit = true;
                updateHitCounter();
                updateGuessedBoard(cell, isHit, shipArray[i]);
                callSetTileState(cell, isHit);
                let isSunk = checkSunk(shipArray[i]);
                if (turn == 0) {
                    if(isSunk) {
                        updateTransitionText("Sunk!\nPlayer 1, look away! It's Player 2's turn!");
                    }
                    else {
                        updateTransitionText("Hit!\nPlayer 1, look away! It's Player 2's turn!");
                    }
                }
                else if (turn == 1) {
                    if(isSunk) {
                        updateTransitionText("Sunk!\nPlayer 2, look away! It's Player 1's turn!");
                    }
                    else {
                        updateTransitionText("Hit!\nPlayer 2, look away! It's Player 1's turn!");
                    }
                }
                if (isOver()) {
                    endGame();
                    return;
                }
                //console.log("Hit!");
            }
        }
    }
    if (isHit == false) { //if the guess is a miss, we update the guessed board, set the tile state to a miss, and update transition text accordingly
        updateGuessedBoard(cell, isHit, shipArray[i]);
        callSetTileState(cell, isHit);
        if (turn == 0) {
            updateTransitionText("Miss!\nPlayer 1, look away! It's Player 2's turn!");
        }
        else if (turn == 1) {
            updateTransitionText("Miss!\nPlayer 2, look away! It's Player 1's turn!");
        }
        //console.log("Miss!");
    }
    switchTurns(); //switch turns at the end of each guess
}

function guessCells(cells) {
    let isHit = false;
    let isSunk = false;
    if (turn == 0) { //if it's p1's turn, we are scanning p2's ships, and vice versa
        shipArray = p2Ships;
        p1SpecShot--;
    }
    else if (turn == 1) {
        shipArray = p1Ships;
        p2SpecShot--;
    }
    //console.log(cells)
    for (let i = 0; i < cells.length; i++) {
        let cell = cells[i].substring(0, 3); //cell = "e04", for example
        //console.log(cell)
        if (isGuessed(cell)) { //controls repeat guesses, the turn isn't switched until the player guesses a new cell
            continue;
        }

        for (let i = 0; i < shipArray.length; i++) {
            for (let j = 0; j < shipArray[i].length; j++) {
                if (shipArray[i].coordinateArray[j] == cell) { //if a cell guessed is a hit, we update the hit counter, update the board the player is attacking logically and visually, update transition text accordingly, check if the game is over
                    isHit = true;
                    updateHitCounter();
                    updateGuessedBoard(cell, true, shipArray[i]);
                    callSetTileState(cell, true);
                    if (checkSunk(shipArray[i])) {
                        isSunk = true;
                    }
                } else {
                    updateGuessedBoard(cell, false, shipArray[i]);
                    callSetTileState(cell, false);
                }
            }
        }
    }
    if (isHit) {
        if (turn == 0) {
            if(isSunk) {
                updateTransitionText("Sunk!\nPlayer 1, look away! It's Player 2's turn!");
            }
            else {
                updateTransitionText("Hit!\nPlayer 1, look away! It's Player 2's turn!");
            }
        }
        else if (turn == 1) {
            if(isSunk) {
                updateTransitionText("Sunk!\nPlayer 2, look away! It's Player 1's turn!");
            }
            else {
                updateTransitionText("Hit!\nPlayer 2, look away! It's Player 1's turn!");
            }
        }
        if (isOver()) {
            endGame();
            return;
        }
    } else {
        if (turn == 0) {
            updateTransitionText("Miss!\nPlayer 1, look away! It's Player 2's turn!");
        }
        else if (turn == 1) {
            updateTransitionText("Miss!\nPlayer 2, look away! It's Player 1's turn!");
        }
    }
    fireSpecShot = false
    switchTurns(); //switch turns at the end of each guess
}

function checkSunk(ship) {
    let count = 0;
    let guessedBoard =  arrGuessedBoard[turn];

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if(guessedBoard[i][j] == ship.length) {
                count++;
            }
            if(count == ship.length) {
                targetShip = 0; //deallocate targetShip to aid mediumAI
                return true;
            }
        }
    }
    return false;
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
//default = 0, hit = ship number, miss = -1
function updateGuessedBoard(cell, isHit, ship) {
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
            board[row][column] = ship.length; //hit = ship Number (between 1 and 5)
        }
        else {
            board[row][column] = -1; //miss = -1
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

//switches the turn index, updates the game state, and calls some graphics functions that changes the screen's visuals
function switchTurns() {
    if (turn == 0) {
        turn = 1;
        gameState = "p2Turn";
        switchWindow("transition");
        updateTransitionTarget("p2View");

        // AI shots here
        if (opponent == "AI") {
            //tile = "e01p2AttackBoard";
            tile = selectMode();
            document.getElementById(tile).click();
        }
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

//stalls code execution for a certain number of ms (not used currently)
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

 //helper to sink ships
 function createCoordinateBoard() {
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

//increments a character, used for creating coordinate arrays by concactenating strings
function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
}
