//building 10x10 Array for Attack Board
//Logic for Array: 0=no ship, 1=ship, 2=hit ship

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

attackShip() //function for attacking ships to the Array
function attackShip(){
    var inputRow = window.prompt("Enter the row you would like to attack: ");
    var inputColoumn = window.prompt("Enter the coloumn you would like to attack: ");
    let a = 0
    let b = 0
    inputRow = a
    inputColoumn = b

    if(attackBoard[a][b]=1) //attackBoard cannot be used and im not sure why
    {
      console.log("Hit!")
      attackBoard[a][b]=2
    }
    else(console.log("Miss!"))
}

scanArray() //gets current value for specific array position
function scanArray(){
let temp = 0

}