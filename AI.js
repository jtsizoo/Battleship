/*Outline for necessary AI components...
 *
 *	Placing ships...
 *	-Using a looping function to iterate through total number of ships selected
 *	-For each random ship placement...
 *		-Generate 2 random numbers, one corresponding to a column value and the other corresponding to a row value, record this as ship location
 *			-Ex. can use JS function Math.floor(Math.random() * 10) -> this would generate a random integer from 0 to 9
 *		-Check to see if this is a valid location (using previous groups existing functionality)
 *		-For horizontal/vertical orientation -> can just go by whether one of the randomly generated numbers is even (H) or odd (V)
 *		-Check to see if this orientation will result in a valid location...
 *		-Will continue this process until the ship is placed in a valid location.
 *		-Exit the loop when all ships are placed.
 *
 *	Easy (fires randomly ever turn)...
 *	-Generate 2 random numbers using previously described method
 *	-Check to see if this is a valid place to fire (i.e. can't have a hit there already or have previously tried at this spot)
 *	-Hit
 *
 *	Medium (fires randomly until it hits a ship, then fires orthogonally in adjacent spaces until finds other hits or ship is sunk))...
 *	-Starts the same way as easy...
 *		-Generate 2 random numbers using previously described method
 *		-Check to see if this is a valid place to fire, if it is then fire
 *		-Continue until a hit occurs.
 *	-Once a hit occurs...
 *		-For next turns, mazewalk around the hit location (i.e. look up, then look right, then look down, then look left) using recursion.
 *		-Continue until hit occurs, continually for each successive turn, until the ship in question is sunk.
 *		-Then go back to easy mode (firing randomly)
 *
 *	Hard (knows where all ships are a lands a hit every turn)...
 *	-Access other player's placedGrid
 *	-Cycle through where ships are located and just hits until the ships are sunk
 *	-Should probably put in a check to ensure a hit ship is sunk until moving on to next ship (this would be the most efficient/skilled AI version of a player)
 *
 */

function selectMode() {
    if (difficulty == "Easy") {
        return easyAI();
    }
    if (difficulty == "Medium") {
        return mediumAI();
    }
    if (difficulty == "Hard") {
        //return hardAI();
    }
}

//Placement helpers==================================================================
function randomBool() { //generate a bool to assist ship orientation placement 
    return Math.random() < 0.5;
}

//generates a new valid ship and auto places by calling attemptShipPlace
function autoShip(length) {
    //let shipsRemaining = 4;
    //initialize a ship
    let cell = generateCell();
    let orient = randomBool();
    let ship = initializeShip(length, cell, orient);

    while(isShipValid(ship) == false) //check if it is a valid ship
    {
        cell = generateCell();
        ship = initializeShip(length, cell, orient);
    }

    return ship;
}

//Easy AI and helpers============================================================================

function easyAI() {
    let cell = generateCell(); //call generateCell to get a random cell placement

    while (isGuessed(cell)) { //check if cell placement valid
        cell = generateCell(); //if not, call generateCell until a valid location is found
    }
    cell = cell + "p2AttackBoard";
    return cell; 
}

//calls randomInt twice to generate two random numbers, converts one number
//into a corresponding column (A-J) and the other into a number string, i.e. a01.
function generateCell() {
    //generate the row, i.e. "01"
    let row = randomInt();
    if (row < 10) {
        row = '0' + row.toString();
    }

    //generate the column by adding the ascii character 'a' and converting the result to a char string.
    const col = String.fromCharCode(randomInt() + 97); //lowercase alphabet begins at ASCII 97

    //create the string for the cell, i.e. "a01"
    const cell = col + row.toString();
    return cell;
}

//generates number between 1 and 10
function randomInt(min = 1, max = 10) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//Medium AI and helpers============================================================================

//uses global variables of targetShip, adjacentSpaces in MainGame.js to decide next cell to guess
function mediumAI() {
    if (targetShip == 0 && (adjacentSpaces === undefined || adjacentSpaces.length == 0)) {
        return easyAI();
    }
    else {
        // array of orthogonally adjacent spaces around target ship
        let nextCell = adjacentSpaces.pop();
        nextCell += "p2AttackBoard";
        return nextCell;
    }
}

// Build  
function buildAdjacentSpaces(targetShip, cell) {
    let col = cell[0]; //-'a';
    let row = cell[1] + cell[2];
    let loci;
    const shipLength = targetShip; //get the length of ship

    //convert row and columns into integers
    let mRow = parseInt(cell[1] + cell[2]);
    let mCol = cell.charCodeAt(0) - "a".charCodeAt(0) + 1;

    // check up direction, ex b02 --> b01
    for (let i = mRow; i > 0; i--) {
        loci = getCell(i, col);
        if (!isGuessed(loci)) {
            adjacentSpaces.push(loci);
        }
    }

    // check down direction ex b02--> b03
    for (let i = mRow + 1; i < (mRow + shipLength) && i <= 10; i++) {
        loci = getCell(i, col);
        if (!isGuessed(loci)) {
            adjacentSpaces.push(loci);
        }
    }

    //check right direction ex b02--> c02
    let nc = col;
    for (let j = mCol + 1; j < (mCol + shipLength); j++) {
        nc = nextChar(nc);
        loci = nc + row;
        if (!isGuessed(loci)) {
            adjacentSpaces.push(loci);
        }
    }

    //check left direction, ex b02--> a02
    nc = 'a';
    for (let j = 1; j < mCol; j++) {
        nc = nextChar(nc);
        loci = nc + row;
        if (!isGuessed(loci)) {
            adjacentSpaces.push(loci);
        }
    }
}

function getCell(row, col) {
    let sLoc = "";
    if (row < 10) {
        sLoc = col + '0' + row;
    } else {
        sLoc = col + row;
    }
    return sLoc;
}

//Hard AI and helpers============================================================================
