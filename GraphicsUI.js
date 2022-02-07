let p1Ships = [];
let p2Ships = [];

//Builds the UI.
function createUI()
{
    //Builds div where p1 boards are displayed.
    let p1Boards = document.createElement("div");
    p1Boards.appendChild(drawGrid("p1HomeBoard", "homeBoard"));
    p1Boards.appendChild(drawGrid("p1AttackBoard", "attackBoard"));
    document.getElementById("p1View").appendChild(p1Boards);

    //Builds div where p1 ships that have yet to be placed are displayed.
    let p1ShipsToPlace = document.createElement("div");
    //[insert code here]
    document.getElementById("p1View").appendChild(p1ShipsToPlace);

    //Builds div where p2 boards are displayed.
    let p2Boards = document.createElement("div");
    p2Boards.appendChild(drawGrid("p2HomeBoard", "homeBoard"));
    p2Boards.appendChild(drawGrid("p2AttackBoard", "attackBoard"));
    document.getElementById("p2View").appendChild(p2Boards);

    //Builds div where p2 ships that have yet to be placed are displayed.
    let p2ShipsToPlace = document.createElement("div");
    //[insert code here]
    document.getElementById("p1View").appendChild(p2ShipsToPlace);
}

//Creates a table element with a given id and class (class should be homeBoard or attackBoard)
//and populates it with 11 rows and 11 cells per row.
function drawGrid(gridId, gridClass)
{
    let columnLabelAlphabet = ['A','B','C','D','E','F','G','H','I','J'];
    
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

//this fucntion will draw the ship being placed onto grid for whichever player whos turn it is 
function drawShipPlacement(shipPosition)
{

}

function parseTileClick(tile)
{
    
}


//this fucntion will draw the ship being placed onto grid for whichever player whose turn it is 
//arguments are for the grid depending on the player, the player, and the 

function drawShipPlacement(grid,isP2,){
    

    //rotates the ship when user scrolls
    document.addEventListener("scroll",rotateShip);

    //when a user clicks on a grid will place the ship
    document.addEventListener("click",placeShip);
    

function parseTileHover(tile)
{
    
}

function parseTileScroll(tile)
{

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
}

//Sets the opacity and color of a given ship.
function setShipProperties(shipId, opacity, color)
{


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
    if (windowId == "p1View")
    {
        document.getElementById("p2View").style.display = "none";
        document.getElementById("gameOver").style.display = "none";
        document.getElementById("shipNumPick").style.display = "none";
        document.getElementById("p1View").style.display = "revert";
    }
    else if (windowId == "p2View")
    {
        document.getElementById("p1View").style.display = "none";
        document.getElementById("gameOver").style.display = "none";
        document.getElementById("shipNumPick").style.display = "none";
        document.getElementById("p2View").style.display = "revert";
    }
    else if (windowId == "gameOver")
    {
        document.getElementById("p1View").style.display = "none";
        document.getElementById("p2View").style.display = "none";
        document.getElementById("shipNumPick").style.display = "none";
        document.getElementById("gameOver").style.display = "revert";
    }
    else if (windowId == "shipNumPick")
    {
        document.getElementById("p1View").style.display = "none";
        document.getElementById("p2View").style.display = "none";
        document.getElementById("gameOver").style.display = "none";
        document.getElementById("shipNumPick").style.display = "revert";
    }
}

function updateCountdownText(text)
{

}

//Sets the text displayed in the gameOver window.
function setGameOverText(text)
{
    let gameOverTextLabel = document.createElement("label");
    gameOverTextLabel.textContent = text;
    document.getElementById("gameOver").appendChild(gameOverTextLabel);
}

function selectShipNumber(numShips)
{

}

createUI();
switchWindow("p1View");