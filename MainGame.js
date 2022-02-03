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

let p1Ships = [ship1, ship2, ship3];
createCoordinateArray(p1Ships);
printCoordinateArray(p1Ships);

guessCell("c6", p1Ships); 

//scans all components of the ship array to determine whether a guess is a hit or a miss
function guessCell(cell, shipArray) { 
    let hit = false;
    for (let i = 0; i < shipArray.length; i++) {
        for (let j = 0; j < shipArray[i].length; j++) {
            if (shipArray[i].coordinateArray[j] == cell) {
                hit = true;
                console.log("\nHit!");
            }
        }
    }
    if (hit == false)
    {
        console.log("\nMiss!");
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
