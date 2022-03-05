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
let orient = "up"; //variables for medium AI
let offset = 1;

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

//uses global variables of targetShip and targetLoci in Maingame.js to decide next cell to guess
function mediumAI() {
    if (p2Hits == 0 || targetShip == 0) { //accounts for nothing being hit or no current ship being targeted
        easyAI();
    }
    else { //call guess4d() if a hit occurs and targetShip is nonzero
        let nextCell = guess4d(); 
        while (isGuessed(nextCell)) { //check if cell placement valid
            nextCell = guess4d(); //if not, call generateCell until a valid location is found
        }
        cell = cell + "p2AttackBoard";
        return cell;
        //guessCell(cell); //call guessCell to update the p2's attackboard 
    }
}

//the guess4d function is called to find the next orthoganol position available to place
//a ship. if the boundary is exceeded, reset the orientation and offset, and recursively call until 
//a cell tile is generated. 
function guess4d(orient = "up", offset = 1) {
    let nextCell;
    let col = targetLoci[0]; // i.e. "a";
    let row = targetLoci[1] + targetLoci[2]; //i.e."01"

    //ex b02 --> b01
    if (orient == "up") {

        if (row != "10") { //convert the row string to an integer
            row = charToInt(targetLoci[1]) + charToInt(targetLoci[2]);
        }
        else {
            row = 10;
        }
        if ((row - offset) >= 0) { //if upper bounds of board not exceeded
            row = row - offset;
            if (row < 10) //if input only one digit, pad a zero and convert row to string
            {
                row = '0' + row;
            }
            nextCell = col + row; //create the new cell
            offset++; //update the offset
            //console.log(nextCell);
            return nextCell;

        }
        else { // reached border, change orientation and reset offset
            guess4d("right", 1);
        }
    }

    //ex b02--> c02
    if (orient == "right") { //increase the column
        col = getNextChar(col, offset);
        row = targetLoci[1] + targetLoci[2];
        if (col <= 'j') { //check does not exceed right boundary
            nextCell = col + row; //create the new cell
            offset++;
            //console.log(nextCell);
            return nextCell;
        }
        else {
            guess4d("down", 1);
        }
    }

    //ex b02--> b03
    if (orient == "down") { //increase the row
        col = targetLoci[0];
        row = targetLoci[1] + targetLoci[2];

        if (row != "10") { //convert the  row into a string
            row = charToInt(targetLoci[1]) + charToInt(targetLoci[2]);
        }
        else {
            row = 10;
        }

        if ((row + offset) <= 10) { //if lower bounds not exceeded
            row = row + offset;
            if (row < 10) {
                row = '0' + row;
            }
            nextCell = col + row;
            offset++;
            //console.log(nextCell);
            return nextCell;
        }
        else {
            guess4d("left", 1);
        }
    }

    //ex b02--> a02
    if (orient == "left") {
        col = getPrevChar(col, offset); //decrease the column

        if (col >= 'a') { //check if within left boundary of board
            nextCell = col + row; //create new cell  
            offset++; //update offset
            //console.log(nextCell);
            return nextCell;
        }
        else {
            ;
            guess4d("up", 1);
        }
    }
}

//helper to get next column
function getNextChar(col, offset) {
    //convert column to corresponding number between 1-10, add 1 to increment
    col = col.charCodeAt(0) - 97 + offset;
    //convert column back into its corresponding character string     
    col = String.fromCharCode(col + 97);
    return col;
}


//helper to get previous column, same as getNextchar except subtract the offset
function getPrevChar(col, offset) {
    col = col.charCodeAt(0) - 97 - offset;
    col = String.fromCharCode(col + 97);
    return col;
}

//convert character number to integer. 
function charToInt(char) {
    return char.charCodeAt(0) - 48;
}

//Hard AI and helpers============================================================================
