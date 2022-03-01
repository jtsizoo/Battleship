/*Outline for necessary AI components...
 *
 *	Placing ships...
 *	-Using a looping function to iterate through total number of ships selected
 *	-For each random ship placement...
 *		-Generate 2 random numbers, one corresponding to a column value and the other corresponding to a row value, record this as ship location
 *			-Ex. can use JS function Math.floor(Math.random() * 10) -> this would generate a random integer from 0 to 9
 *		-Check to see if this is a valid location (using previous groups existing functionality)
 *		-For horizontal/vertical orientation -> can just go by whether one of the randomly generated numbers is even (H) or odd (V)
 *		-Check to see if this orientation will result in a valid location...
 *		-Will continue this process until the ship is placed in a valid location.
 *		-Exit the loop when all ships are placed.
 *
 *	Easy (fires randomly ever turn)...
 *	-Generate 2 random numbers using previously described method
 *	-Check to see if this is a valid place to fire (i.e. can't have a hit there already or have previously tried at this spot)
 *	-Hit
 *
 *	Medium (fires randomly until it hits a ship, then fires orthogonally in adjacent spaces until finds other hits or ship is sunk))...
 *	-Starts the same way as easy...
 *		-Generate 2 random numbers using previously described method
 *		-Check to see if this is a valid place to fire, if it is then fire
 *		-Continue until a hit occurs.
 *	-Once a hit occurs...
 *		-For next turns, mazewalk around the hit location (i.e. look up, then look right, then look down, then look left) using recursion.
 *		-Continue until hit occurs, continually for each successive turn, until the ship in question is sunk.
 *		-Then go back to easy mode (firing randomly)
 *
 *	Hard (knows where all ships are a lands a hit every turn)...
 *	-Access other player's placedGrid
 *	-Cycle through where ships are located and just hits until the ships are sunk
 *	-Should probably put in a check to ensure a hit ship is sunk until moving on to next ship (this would be the most efficient/skilled AI version of a player)
 *
 * /
