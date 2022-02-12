let p1Ships = [];
let p2Ships = [];
let gameState = "numShipSelection";


let currentWindow = "shipNumPick";
let transitionTarget = "p1View";

//Builds the UI taking in the number of ships as a parameter.
function createUI(numberOfShips)
{
    //Builds div where p1 boards are displayed.
    let p1Boards = document.createElement("div");
    p1Boards.appendChild(drawGrid("p1HomeBoard", "homeBoard"));
    p1Boards.appendChild(drawGrid("p1AttackBoard", "attackBoard"));
    document.getElementById("p1View").insertBefore(p1Boards, document.getElementById("p1RotateButton"));

    //Builds div where p1 ships that have yet to be placed are displayed.
    let p1ShipsToPlace = document.createElement("div");
    p1ShipsToPlace.appendChild(drawShips(numberOfShips, "p1"));
    document.getElementById("p1View").appendChild(p1ShipsToPlace);

    //Builds div where p2 boards are displayed.
    let p2Boards = document.createElement("div");
    p2Boards.appendChild(drawGrid("p2HomeBoard", "homeBoard"));
    p2Boards.appendChild(drawGrid("p2AttackBoard", "attackBoard"));
    document.getElementById("p2View").insertBefore(p2Boards, document.getElementById("p2RotateButton"));

    //Builds div where p2 ships that have yet to be placed are displayed.
    let p2ShipsToPlace = document.createElement("div");
    p2ShipsToPlace.appendChild(drawShips(numberOfShips, "p2"));
    document.getElementById("p2View").appendChild(p2ShipsToPlace);

    initializeShipPlacement(numberOfShips);
}

//Creates a table element with a given id and class (class should be homeBoard or attackBoard)
//and populates it with 11 rows and 11 cells per row.
function drawGrid(gridId, gridClass)
{
    let columnLabelAlphabet = ['a','b','c','d','e','f','g','h','i','j'];
    
    //Creates a table and specifies its header and body.
    let grid = document.createElement("table");
    let tableHeader = document.createElement("thead");
    let tableBody = document.createElement("tbody");

    //Creates a row and label for the grid title.
    let gridTitleRow = document.createElement("tr");
    let gridTitleCell = document.createElement("th");
    let gridTitleLabel = document.createElement("label");
    if (gridClass == "homeBoard")
    {
        gridTitleLabel.textContent = "Home Board";
    }
    else if (gridClass == "attackBoard")
    {
        gridTitleLabel.textContent = "Attack Board";
    }
    gridTitleCell.appendChild(gridTitleLabel);
    gridTitleCell.setAttribute("colspan", 11);
    gridTitleRow.appendChild(gridTitleCell);

    //Creates a row for the column labels.
    let columnLabelRow = document.createElement("tr");
    let emptyCell = document.createElement("td");
    columnLabelRow.appendChild(emptyCell);

    //Creates 10 more rows, populates each row with 10 cells, and labels rows and columns.
    for (let i = 0; i < 10; i++)
    {
        //Labels each column A-J.
        let columnHeader = document.createElement("th");
        let columnLabel = document.createElement("label");
        columnLabel.textContent = columnLabelAlphabet[i];
        columnHeader.appendChild(columnLabel);
        columnLabelRow.appendChild(columnHeader);

        //Creates a row.
        let row = document.createElement("tr");

        for (let j = 0; j < 11; j++)
        {
            //Labels the first cell of the row 1-10 and adds empty cells to the rest.
            if (j == 0)
            {
                let headerTile = document.createElement("th");
                headerTile.textContent = ((i+1).toString());
                row.appendChild(headerTile);
            }
            else
            {
                //Creates a cell and gives it a unique id based on its coordinates and gridName.
                //First three characters are the coordinates (i.e A01, C08, E10, etc.), and the
                //rest of the id is the gridName.
                let tile = document.createElement("td");
                let tileId;

                if (i == 9) 
                {
                    tileId = [ columnLabelAlphabet[j-1], ((i+1).toString()), gridId ].join('');
                }
                else
                {
                    tileId = [ columnLabelAlphabet[j-1], '0', ((i+1).toString()), gridId ].join('');
                }

                tile.setAttribute("id", tileId);
                tile.addEventListener('click', function() { parseTileClick(tileId); }, false);
                tile.addEventListener('mouseover', function() { parseTileHover(tileId); }, false);
                row.appendChild(tile);
            }
        }

        //Appends each row to the table body.
        tableBody.appendChild(row);
    }

    tableHeader.appendChild(gridTitleRow);
    tableHeader.appendChild(columnLabelRow);
    grid.appendChild(tableHeader);
    grid.appendChild(tableBody);
    grid.setAttribute("id", gridId);
    grid.setAttribute("class", gridClass);

    return grid;
}

//Creates the inventory box containing the ships to be placed. Takes in an int representing the 
//number of ships to draw (should be between 1 and 5) and a string representing which player the 
//ships belong to (should be "p1" or "p2").
function drawShips(numberOfShips, player)
{
    let shipInventoryBox = document.createElement("div");
    shipInventoryBox.setAttribute("class", "shipInventoryBox");

    let shipBox = document.createElement("div");
    shipBox.setAttribute("class", "shipBox");

    let shipInventoryBoxHeading = document.createElement("div");
    shipInventoryBoxHeading.setAttribute("class", "shipInventoryBoxHeading");
    let shipInventoryBoxLabel = document.createElement("label");
    shipInventoryBoxLabel.textContent = "Ship Inventory";
    shipInventoryBoxLabel.setAttribute("class", "shipInventoryBoxLabel");
    shipInventoryBoxHeading.appendChild(shipInventoryBoxLabel);
    
    for (let i = 0; i < numberOfShips; i++)
    {
        let ship = document.createElement("div");
        let shipClass = "";
        let shipId = "";
        
        switch (i)
        {
            case 0:
                shipClass = "oneTileShip";
                shipId = [player, "1TileShip"].join("-");
                break;
            case 1:
                shipClass = "twoTileShip";
                shipId = [player, "2TileShip"].join("-");
                break;
            case 2:
                shipClass = "threeTileShip";
                shipId = [player, "3TileShip"].join("-");
                break;
            case 3:
                shipClass = "fourTileShip";
                shipId = [player, "4TileShip"].join("-");
                break;
            case 4:
                shipClass = "fiveTileShip";
                shipId = [player, "5TileShip"].join("-");
                break;
        }

        ship.setAttribute("class", shipClass);
        ship.setAttribute("id", shipId);
        ship.style.pointerEvents = "none";
        shipBox.appendChild(ship);
    }

    shipInventoryBox.appendChild(shipInventoryBoxHeading);
    shipInventoryBox.appendChild(shipBox);

    return (shipInventoryBox);
}

function parseTileClick(tile)
{
    if(gameState == "p1Place" && tile.substring(3) == "p1HomeBoard"){
        attemptShipPlace(tile)
    }
    else if(gameState == "p2Place" && tile.substring(3) == "p2HomeBoard"){
        attemptShipPlace(tile)
    }
    else if(gameState == "p1Turn" && tile.substring(3) == "p1AttackBoard"){
        guessCell(tile)
    }
    else if(gameState == "p2Turn" && tile.substring(3) == "p2AttackBoard"){
        guessCell(tile)
    }
    else{
        console.log("Incorrect Game State for clicking")
    }
}


// this function will call the rotate button in the index html file
// arguments: 
// which player is playing, game state = ship rotate 
function rotateShipButton(){
    //check the game state and the player that is playing
    //ie if the player is in the placement stage
    let button = document.getElementById("rotateButton");
    if(gameState == "numShipSelection"){
    button.style.visibility = "visible";
    button.addEventListener("click",rotateShip);
    } else{
    button.style.visibility = "hidden";
    // dont need this if we're hiding it from the view
    //button.onclick(window.alert("Cannot place any more ships!"));
    }
}

function parseTileHover(tile)
{
    if(gameState == "p1Place" && tile.substring(3) == "p1HomeBoard"){
        hoverCell(tile)
    }
    else if(gameState == "p2Place" && tile.substring(3) == "p2HomeBoard"){
        hoverCell(tile)
    }
}


//Takes in the id of the visual ship element, the destination tile id, and a boolean representing 
//if the ship is vertical, and moves the ship element over the destination tile.
function moveShip(shipId, tileId, isVertical)
{
    var tileRect = document.getElementById(tileId).getBoundingClientRect();

    document.getElementById(shipId).style.position = "absolute";
    document.getElementById(shipId).style.top = tileRect.top - 2;
    document.getElementById(shipId).style.left = tileRect.left - 2;
    document.getElementById(shipId).style.zIndex = 100;

    //set pivot point to top left cell
    let length = parseInt(shipId[3]);
    let xPivotPercent = 100/(2*length);
    document.getElementById(shipId).style.transformOrigin = xPivotPercent+"% 50%";
    if(isVertical){
        document.getElementById(shipId).style.transform = "rotate(90deg)";
    }else{
        document.getElementById(shipId).style.transform = "rotate(0deg)";
    }
}

//Sets the opacity and color of a given ship.
function setShipProperties(shipId, opacity, color)
{
    document.getElementById(shipId).style.opacity = opacity;
    document.getElementById(shipId).style.backgroundColor = color;
}

//[WIP] Takes in a tileId and a boolean reapresenting if that tile has been hit and changes the tile's
//appearance accordingly.
function setTileState(tileId, isHit)
{
    if (isHit == true)
    {
        if (tileId.substring(5) == "HomeBoard")
        {
            document.getElementById(tileId).style.backgroundColor = "#90b3be";
        }
        else if (tileId.substring(5) == "AttackBoard")
        {
            document.getElementById(tileId).style.backgroundColor = "#db8080";
        }
    }
    else
    {
        if (tileId.substring(5) == "HomeBoard")
        {
            document.getElementById(tileId).style.backgroundColor = "#add8e6";
        }
        else if (tileId.substring(5) == "AttackBoard")
        {
            document.getElementById(tileId).style.backgroundColor = "#ff9595";
        }
    }
}

//Displays one of the four windows: p1View, p2View, gameOver, and shipNumPick.
function switchWindow(windowId)
{
    document.getElementById(currentWindow).style.display = "none";
    document.getElementById(windowId).style.display = "inline";
    currentWindow = windowId;
}

//Set the text in the transition section of the page.
function updateTransitionText(text)
{
    document.getElementById("transitionText").textContent = text;
}

function updateTransitionTarget(windowId){
    transitionTarget = windowId;
}

function handleTransition(){
    switchWindow(transitionTarget);
}

//Sets the text displayed in the gameOver window.
function setGameOverText(text)
{
    let gameOverTextLabel = document.createElement("label");
    gameOverTextLabel.textContent = text;
    document.getElementById("gameOver").appendChild(gameOverTextLabel);
}

function hideElement(id){
    document.getElementById(id).style.display = "none";
}
