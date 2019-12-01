let fs = require("fs")
let _ = require("lodash/fp")

let input = fs.readFileSync("./input.txt", {encoding: 'utf-8'})
moduleArr = input.split("\n")

function calcFuel(mass) {
	let fuel = Math.floor(mass / 3) -2
	if(_.gte(Math.floor(fuel / 3) - 2, 0)) {
		fuel += calcFuel(fuel)
	}
	return fuel
}

let amount = _.flow([
	_.dropRight(1), // need this cause there is a trailing lf
	_.map(module => {
		return calcFuel(module)
	}),
	_.reduce((sum, module) => {
		return sum + module	
	}, 0)
])(moduleArr)

console.log(`The answer is: ${amount}`)
