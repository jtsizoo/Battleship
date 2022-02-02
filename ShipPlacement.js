let numShips = 5;
let nextShip = {};

//Call when the user hovers over one of their own cells.
//Will render a preview of the next ship to place. Red if invalid, Gray if valid.
function hoverCell(cell){}

//Call when the user scrolls
//Will rotate the ship between horizontal and vertical
function rotateShip(){}

//Call when the user clicks a cell on their own board. 
//Will attempt to place a ship, add it to the ships list if valid, 
//and move to the next stage of the game if no more ships need placed.
function attemptShipPlace(cell){}

//helper method to place the ship, update the ship list, and decrement the remaining ships.
function placeShip(){}

//Helper method to render a preview of the ship being placed
function renderShipPreview(){}

//Helper function to determine if a ship placement is valid.
function isShipValid(){}