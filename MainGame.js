let turn = 0; //p1 turn is represented by a 0, p2 turn is represented by a 1
//create guessed boards, hit or miss
//make array of 0's, 1's, 2's, no repeat guesses

//send to discord all the functions that will need to be called
//explain 3d array
//creating ship objects for testing functionality
const ship1 = {
    topLeft: "a1",
    vertical: false,
    length: 1
}

const ship2 = {
    topLeft: "c4",
    vertical: true,
    length: 5
}

const ship3 = {
    topLeft: "f6",
    vertical: true,
    length: 3
}

const ship4 = {
    topLeft: "a1",
    vertical: false,
    length: 2
}

const ship5 = {
    topLeft: "e3",
    vertical: true,
    length: 4
}

const ship6 = {
    topLeft: "f5",
    vertical: false,
    length: 3
}

let p1Ships = [ship1, ship2, ship3];
let p2Ships = [ship4, ship5, ship6];

arr = [p1Ships, p2Ships];

createCoordinateArray(p1Ships);
createCoordinateArray(p2Ships);

printCoordinateArray(p2Ships);

guessCell("c6", arr[turn]); 
guessCell("c6", arr[turn]); 

//scans all components of the ship array to determine whether a guess is a hit or a miss
//TODO---change hit/miss to call setTileState(tileID, hit/miss)
function guessCell(cell, shipArray) { 
    let hit = false;
    for (let i = 0; i < shipArray.length; i++) {
        for (let j = 0; j < shipArray[i].length; j++) {
            if (shipArray[i].coordinateArray[j] == cell) {
                hit = true;
                console.log("\nHit!"); //need to change
            }
        }
    }
    if (hit == false) {
        console.log("\nMiss!"); //need to change
    }
    switchTurns();
    //wait(10000);
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

//takes a player's ship array and turns the information of top left, orientation, and length for each ship into board coordinates
function createCoordinateArray(shipArray) {
    for (let m = 0; m < shipArray.length; m++) {
        shipArray[m].coordinateArray = [];
        shipArray[m].coordinateArray[0] = shipArray[m].topLeft;
        if (shipArray[m].vertical == false) {
            for (i = 1; i < shipArray[m].length; i++) {
                shipArray[m].coordinateArray[i] = nextChar(shipArray[m].coordinateArray[i-1][0]) + shipArray[m].topLeft[1];
            }
        }
        else if (shipArray[m].vertical == true) {
            for (i = 1; i < shipArray[m].length; i++) {
                shipArray[m].coordinateArray[i] = shipArray[m].topLeft[0] + nextChar(shipArray[m].coordinateArray[i-1][1]);
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
