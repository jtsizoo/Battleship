let p1Ships = [];
let p2Ships = [];
//creates a table element and populates it with 11 rows and 11 cells per row
function drawGrid()
{
    let columnLabelAlphabet = ['A','B','C','D','E','F','G','H','I','J'];
    
    //Creates a table and specifies its header and body.
    let grid = document.createElement("table");
    let tableHeader = document.createElement("thead");
    let tableBody = document.createElement("tbody");

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
                //Creates a cell and gives it a unique id based on its coordinates.
                let tile = document.createElement("td");
                tile.setAttribute("id", [columnLabelAlphabet[j-1],((i+1).toString())].join(''));
                row.appendChild(tile);
            }
        }

        //Appends each row to the table body.
        tableBody.appendChild(row);
    }

    tableHeader.appendChild(columnLabelRow);
    grid.appendChild(tableHeader);
    grid.appendChild(tableBody);

    return grid;
}

document.getElementById("top").appendChild(drawGrid());



//this fucntion will draw the ship being placed onto grid for whichever player whos turn it is 
function drawShipPlacement(shipPosition){

}

function parseTileClick(tile){}

function parseTileHover(tile){}

function parseTileScroll(tile){}

function moveShip(id, tile, isVertical){}

function setShipProperties(id, opacity, color){}

function setTileState(tile, isHit){}

function switchWindow(id){}

function updateCountdownText(text){}

function setGameOverText(text){}

function selectShipNumber(numShips){}