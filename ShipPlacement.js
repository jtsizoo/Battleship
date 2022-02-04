let numShips = 5;
let shipsRemaining = 0;
let nextShip = {};
let isP2 = false;
shipList = [];

//Call when the user chooses how many ships to play with.
//Starts the ship placement phase of the game, beginning with player 1.
function initializeShipPlacement(_numShips){
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
    gameState = "p2Place";
    switchWindow("p2view");
    shipsRemaining = numShips;
    nextShip = initializeShip(shipsRemaining);
}

//Call when the user hovers over one of their own cells.
//Will render a preview of the next ship to place. Red if invalid, Gray if valid.
function hoverCell(cell){
    nextShip.topLeft = cell;
    moveShip(nextShip.length, cell, nextShip.isVertical);
}

//Call when the user scrolls
//Will rotate the ship between horizontal and vertical
function rotateShip(){
    nextShip.isVertical = !nextShip.isVertical;
    moveShip(nextShip.length, cell, nextShip.isVertical);
}

//Call when the user clicks a cell on their own board. 
//Will attempt to place a ship, add it to the ships list if valid, 
//and move to the next stage of the game if no more ships need placed.
function attemptShipPlace(cell){
    moveShip(nextShip.length, cell, nextShip.isVertical);

    if(isShipValid(nextShip)){
        placeShip(nextShip);
        shipsRemaining--;
        if(shipsRemaining == 0){
            if(isP2){
                gameState = "p1Turn";
                switchWindow("countdown");
                //TODO call countdown function
                switchWindow("p1view");
            }else{
                initializeP2Placement();
            }
        }else{
            nextShip = initializeShip(shipsRemaining);
        }
    }
}

//helper method to place the ship and update the ship list.
function placeShip(){
    p1Ships.push(nextShip);
    //set the ship to be gray and opaque
    setShipProperties(nextShip.length, 1, "gray");
}

//Helper function to determine if a ship placement is valid.
function isShipValid(){}

function initializeShip(_length){
    return {
        length = _length,
        topLeft = "a1",
        isVertical = false
    };
}