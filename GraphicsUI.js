function drawGrid()
{
    let columnLabelAlphabet = ['A','B','C','D','E','F','G','H','I','J'];
    let grid = document.createElement("table");
    let tableHeader = document.createElement("thead");
    let columnLabelRow = document.createElement("tr");
    for (let i = 0; i < 10; i++)
    {
        let columnHeader = document.createElement("th");
        let columnLabel = document.createElement("label");
        columnLabel.textContent = columnLabelAlphabet[i];
        columnHeader.appendChild(columnLabel);
        columnLabelRow.appendChild(columnHeader);
    }
    tableHeader.appendChild(columnLabelRow);
    grid.appendChild(tableHeader);

    return grid;
}

document.getElementById("top").appendChild(drawGrid());