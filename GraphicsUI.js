let p1Ships = [];
let p2Ships = [];

//Builds the UI.
function createUI()
{
    document.getElementById("p1View").appendChild(drawGrid("p1HomeBoard", "homeBoard"));
    document.getElementById("p1View").appendChild(drawGrid("p1AttackBoard", "attackBoard"));

    document.getElementById("p2View").appendChild(drawGrid("p2HomeBoard", "homeBoard"));
    document.getElementById("p2View").appendChild(drawGrid("p2AttackBoard", "attackBoard"));

    testShip = document.createElement("div");
    testShip.setAttribute("id", "testShip");
    testShip.setAttribute("class", "twoTileShip");
    document.getElementById("p1View").appendChild(testShip);

    moveShip("testShip", "C04p1HomeBoard", false);
}

//Creates a table element with a given id and class and populates it with 11 rows 
//and 11 cells per row.
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
    console.log(tile);
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
    console.log(tile);
}

function parseTileScroll(tile)
{

}

//Takes in the id of the visual ship element, the destination tile id, and a boolean representing 
//if the ship is vertical, and moves the ship element over the destination tile.
function moveShip(id, tile, isVertical)
{
    var tileRect = document.getElementById(tile).getBoundingClientRect();

    document.getElementById(id).style.position = "absolute";
    document.getElementById(id).style.top = tileRect.top - 2;
    document.getElementById(id).style.left = tileRect.left - 2;
    document.getElementById(id).style.zIndex = 100;
}

function setShipProperties(id, opacity, color)
{


}

function setTileState(tile, isHit)
{

}

//Displays one of the four windows: p1View, p2View, gameOver, and shipNumPick.
function switchWindow(id)
{
    if (id == "p1View")
    {
        document.getElementById("p2View").style.display = "none";
        document.getElementById("gameOver").style.display = "none";
        document.getElementById("shipNumPick").style.display = "none";
        document.getElementById("p1View").style.display = "revert";
    }
    else if (id == "p2View")
    {
        document.getElementById("p1View").style.display = "none";
        document.getElementById("gameOver").style.display = "none";
        document.getElementById("shipNumPick").style.display = "none";
        document.getElementById("p2View").style.display = "revert";
    }
    else if (id == "gameOver")
    {
        document.getElementById("p1View").style.display = "none";
        document.getElementById("p2View").style.display = "none";
        document.getElementById("shipNumPick").style.display = "none";
        document.getElementById("gameOver").style.display = "revert";
    }
    else if (id == "shipNumPick")
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

function setGameOverText(text)
{

}

function selectShipNumber(numShips)
{

}

createUI();
switchWindow("p1View");