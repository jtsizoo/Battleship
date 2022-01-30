//building 10x10 Array for Attack Board
    var x = 10
    var y = 10
    var attackBoard = new Array()

    for (i = 0; i < x; i++) {
        attackBoard[i] = new Array()
        for (j = 0; j < y; j++) {
            attackBoard[i][j] = 0;
        }
    }
    console.log(attackBoard);


//Logic for Array: 0=no ship, 1=ship, 2=hit ship

//function for attacking ships to the Array
attackShip()
function attackShip(){
var inputRow = window.prompt("Enter the row you would like to attack: ");
var inputColoumn = window.prompt("Enter the coloumn you would like to attack: ");
inputRow = a
inputColoumn = b
let a = 0
let b = 0
if(attackBoard[a][b]=1)
{
    console.log("Hit!")
    attackBoard[a][b]=2
}
else(console.log("Miss!"))
}
