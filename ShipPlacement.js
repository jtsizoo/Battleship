let numShips = 5;
let shipsRemaining = 0;
let nextShip = {};
let isP2 = false;
const PREVIEW_OPACITY = .5;
let shipList = [];


//Call when the user chooses how many ships to play with.
//Starts the ship placement phase of the game, beginning with player 1.
function initializeShipPlacement(_numShips){
    //set the instruction text for each player
    setInstruction("Player 1, place your ships!", 1);
    setInstruction("Player 2, place your ships!", 2);

    switchWindow("p1View");
    gameState = "p1Place";
    isP2 = false;
    numShips = _numShips;
    shipsRemaining = numShips;
    nextShip = initializeShip(shipsRemaining);
    shipList = p1Ships;
}

//Helper function to begin placing ships for player 2.
//Is called internally. Do not call from GraphicsUI.js
function initializeP2Placement(){
    isP2 = true;
    gameState = "p2Place";
    shipList = p2Ships;
    switchWindow("p2View");
    shipsRemaining = numShips;
    nextShip = initializeShip(shipsRemaining);
}

//Call when the user hovers over one of their own cells.
//Will render a preview of the next ship to place. Red if invalid, Gray if valid.
function hoverCell(cell){
    nextShip.topLeft = cell;
    moveShip(getShipID(nextShip.length), cell, nextShip.isVertical);

    if(isShipValid(nextShip)){
        setShipProperties(getShipID(nextShip.length), PREVIEW_OPACITY, "");//setting the color to "" makes it the default color from Battleship.css
    }else{
        //invalid placement, make ship red
        setShipProperties(getShipID(nextShip.length), PREVIEW_OPACITY, "red");
    }
}

//Call when the user clicks the rotate ship button
//Will rotate the ship between horizontal and vertical
function rotateShip(){
    nextShip.isVertical = !nextShip.isVertical;
    moveShip(getShipID(nextShip.length), nextShip.topLeft, nextShip.isVertical);
}

//Call when the user clicks a cell on their own board. 
//Will attempt to place a ship, add it to the ships list if valid, 
//and move to the next stage of the game if no more ships need placed.
function attemptShipPlace(cell){
    nextShip.topLeft = cell;
    moveShip(getShipID(nextShip.length), cell, nextShip.isVertical);

    if(isShipValid(nextShip)){
        placeShip(nextShip);
        shipsRemaining--;
        if(shipsRemaining == 0){
            if(isP2){//Time to start the main game

                //hide the rotate ship buttons
                hideElement("p1RotateButton");
                hideElement("p2RotateButton");

                //initialize the main (attacking) stage of the game
                initializeGame();

                gameState = "p1Turn";
                updateTransitionText("Player 1, get ready to make a guess. Player 2, get out of here!");
                switchWindow("transition");
                updateTransitionTarget("p1View");
            }else{
                initializeP2Placement();
            }
        }else{
            startCell = nextShip.topLeft;
            nextShip = initializeShip(shipsRemaining);
            nextShip.topLeft = startCell;
            moveShip(getShipID(nextShip.length), startCell, nextShip.isVertical);
        }
    }
}

//helper method to place the ship and update the ship list.
function placeShip(ship){
    shipList.push(ship);
    //set the ship to be the default color and opaque
    setShipProperties(getShipID(nextShip.length), 1, "");//
}

//Helper function to determine if a ship placement is valid.
function isShipValid(ship){
    //if the ship goes off the bottom of the board
    let rowNum = parseInt(ship.topLeft.substr(1, 2));
    if(ship.isVertical && ship.length-1 + rowNum > 10){
        return false;
    }
    //if the ship goes off the right of the board
    let columnNum = ship.topLeft.charCodeAt(0) - "a".charCodeAt(0) + 1; //1 indexed column number
    if(!ship.isVertical && ship.length-1 + columnNum > 10){
        return false;
    }

    let a = [rowNum, columnNum]; //start point of ship
    let b = [];
    if(ship.isVertical){
        b = [rowNum + ship.length-1, columnNum];
    }else{
        b = [rowNum, columnNum + ship.length-1]; //endpoint of ship
    }

    //check if the ship collides with any existing ships
    for (const gridShip of shipList) {
        let gridRow = parseInt(gridShip.topLeft.substr(1, 2));
        let gridCol = gridShip.topLeft.charCodeAt(0) - "a".charCodeAt(0) + 1;

        let c = [gridRow, gridCol]; //start point of ship
        let d = [];
        if(gridShip.isVertical){
            d = [gridRow + gridShip.length-1, gridCol];
        }else{
            d = [gridRow, gridCol + gridShip.length-1]; //endpoint of ship
        }

        //check if ships collide.
        if(b[0] >= c[0] && d[0] >= a[0] && //check if y coords overlap
           b[1] >= c[1] && d[1] >= a[1]){  //check if x coords overlap
               return false;
        }
    }

    return true;
}

//creates a ship object with the given length and returns it
function initializeShip(_length){
    ship = {
        length: _length,
        topLeft: "a01",
        isVertical: false
    };

    if(isP2){
        ship.topLeft += "p2HomeBoard";
    }else{
        ship.topLeft += "p1HomeBoard";
    }

    return ship;
    //moveShip(ship.length, ship.topLeft, ship.isVertical);
    //setShipProperties(ship.length, PREVIEW_OPACITY, "gray");
}

//Create test functions to test ShipPlacement without the other files.
function initializeTestFunctions(){
    moveShip = function(id, cell, vert){
        console.log(id, cell, vert);
    }

    setShipProperties = function(id, op, co){
        console.log(id, op, co);
    }

    switchWindow = function(id){
        console.log("switching to",id);
    }

    p1Ships = [];
    p2Ships = [];
    gameState = "";
}

//get the ID of the ship with the given length.
function getShipID(length){
    if(isP2){
        return "p2-"+length+"TileShip";
    }else{
        return "p1-"+length+"TileShip";
    }
}

