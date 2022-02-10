let turn = 0;

//send to discord all the functions that will need to be called
//explain 3d array
//creating ship objects for testing functionality
const ship1 = {
    topLeft: "a01",
    isVertical: false,
    length: 1
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
let p2Ships = [ship4, ship5, ship6];

createCoordinateArray(p1Ships);
createCoordinateArray(p2Ships);

let p1GuessedBoard = createEmptyBoard();
let p2GuessedBoard = createEmptyBoard();

arrPlayerShips = [p1Ships, p2Ships];
arrGuessedBoard = [p1GuessedBoard, p2GuessedBoard];

guessCell("bo1", arrPlayerShips[turn]);

//scans all components of the ship array to determine whether a guess is a hit or a miss
//TODO---change hit/miss to call setTileState(tileID, hit/miss)
function guessCell(cell, shipArray) { 
    let isHit = false;
    for (let i = 0; i < shipArray.length; i++) {
        for (let j = 0; j < shipArray[i].length; j++) {
            if (shipArray[i].coordinateArray[j] == cell) {
                isHit = true;
                updateGuessedBoard(cell, isHit);
                //console.log("Hit!");
            }
        }
    }
    if (isHit == false) {
        updateGuessedBoard(cell, isHit);
        //console.log("Miss!"); 
    }
    switchTurns();
}

function updateGuessedBoard(cell, isHit) {
    let board = arrGuessedBoard[turn];

    let row = cell[2] - 1;
    let column = 0;

    let char = 'a'; //converts the letter column of 'cell' coordinate into an int
    while (char != cell[0]) {
        char = nextChar(char);
        column++;
    }
    if (board[row][column] != 0) { //0 = not guessed
        if (isHit) {
            board[row][column] = 1; //hit = 1
        }
        else {
            board[row][column] = 2; //miss = 2
        }    
    }
}

function switchTurns() {
    if (turn == 0) {
        turn = 1;
    }
    else {
        turn = 0;
    }
}

function wait(ms) { //TODO updatecountdowntext()
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
 }

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
        shipArray[m].coordinateArray[0] = shipArray[m].topLeft;
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

//pass in a player's ship array and this will print the coordinates each ship occupies
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
