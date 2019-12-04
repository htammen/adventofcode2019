let fs = require("fs");
let _ = require("lodash/fp");

function createDetailArray(arr) {
    return _.reduce((acc, elem) => {
        let dirElem = [elem[0], elem.substring(1)]
        let mappedElem = (dirElem[0]==="R" || dirElem[0]==="L") ? 
                {x: dirElem[1] * (dirElem[0] === "R" ? 1 : -1)} :
                {y: dirElem[1] * (dirElem[0] === "U" ? 1 : -1)}
        acc.push(mappedElem)
        return acc
    },[])(arr)
}

function createCompleteArray(arr) {
    return _.reduce((acc, elem) => {
        const direction = (elem.x ? "x" : "y")
        const constantParam = (elem.x ? "y" : "x")
        const arrTimes = _.times((param) => {
            let retVal = {}
            retVal[direction] = _.last(acc)[direction]+param
            retVal[constantParam] = _.last(acc)[constantParam]
            return retVal
        })(elem[direction])
        return _.concat(acc)(arrTimes)
    }, [{x:0,y:0}])(arr)
}

let input = fs.readFileSync("./input.txt", { encoding: "utf-8" });
let inputArr = input.split("\n");
let result = 0

inputArr = inputArr.map(elem => elem.split(","))
let arr1 = createDetailArray(inputArr[0])
let arr2 = createDetailArray(inputArr[1])

arr1Complete = createCompleteArray(arr1)
arr2Complete = createCompleteArray(arr2)

let resultArr = _.intersection(arr1Complete, arr2Complete)
console.log(resultArr)

console.log(`The answer is ${result}`);
