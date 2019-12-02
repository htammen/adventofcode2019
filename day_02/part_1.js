let fs = require("fs");
let _ = require("lodash/fp");

function runProcedure(startPosition, inputArr) {
  const operation = inputArr[startPosition];
  if (operation !== 99) {
    let result;
    switch (operation) {
      case 1:
        result =
          inputArr[inputArr[startPosition + 1]] +
          inputArr[inputArr[startPosition + 2]];
        break;
      case 2:
        result =
          inputArr[inputArr[startPosition + 1]] *
          inputArr[inputArr[startPosition + 2]];
        break;
    }
    inputArr[inputArr[startPosition + 3]] = result;
    return runProcedure(startPosition + 4, inputArr);
  } else {
    return inputArr[0];
  }
}

let input = fs.readFileSync("./input.txt", { encoding: "utf-8" });
let inputArr = input.split(",");
inputArr = _.map(elem => Number.parseInt(elem))(inputArr);
inputArr[1] = 12;
inputArr[2] = 2;

result = runProcedure(0, inputArr);
console.log(`The answer is ${result}`);
