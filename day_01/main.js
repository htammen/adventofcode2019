let fs = require("fs")
let _ = require("lodash/fp")

let input = fs.readFileSync("./input.txt", {encoding: 'utf-8'})
moduleArr = input.split("\n")

let amount = _.flow([
	_.dropRight(1), // need this cause there is a trailing lf
	_.map(module => {
		return Math.floor(module / 3)-2
	}),
	_.reduce((sum, module) => {
		return sum + module	
	}, 0)
])(moduleArr)

console.log(`The answer is: ${amount}`)
