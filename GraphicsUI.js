function drawGrid()
{
    let columnLabelAlphabet = ['A','B','C','D','E','F','G','H','I','J'];
    let grid = document.createElement("table");
    let tableHeader = document.createElement("thead");
    let tableBody = document.createElement("tbody");
    let columnLabelRow = document.createElement("tr");
    let emptyCell = document.createElement("td");
    columnLabelRow.appendChild(emptyCell);

    for (let i = 0; i < 10; i++)
    {
        let columnHeader = document.createElement("th");
        let columnLabel = document.createElement("label");
        columnLabel.textContent = columnLabelAlphabet[i];
        columnHeader.appendChild(columnLabel);
        columnLabelRow.appendChild(columnHeader);
        let row = document.createElement("tr");

        for (let j = 0; j < 10; j++)
        {
            if (j == 0)
            {
                let headerTile = document.createElement("th");
                headerTile.textContent = ((i+1).toString());
                row.appendChild(headerTile);
            }
            else
            {
                let tile = document.createElement("td");
                row.appendChild(tile);
            }
        }

        grid.appendChild(row);
    }

    tableHeader.appendChild(columnLabelRow);
    grid.appendChild(tableHeader);

    return grid;
}

document.getElementById("top").appendChild(drawGrid());