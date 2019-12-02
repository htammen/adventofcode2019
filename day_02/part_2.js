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

let result = 0;
let input = fs.readFileSync("./input.txt", { encoding: "utf-8" });
let inputArr = input.split(",");
inputArr = _.map(elem => Number.parseInt(elem))(inputArr);

let noun, verb;
for (noun = 0; noun < 100; noun++) {
  for (verb = 0; verb < 100; verb++) {
    let localInputArr = _.cloneDeep(inputArr);
    localInputArr[1] = noun;
    localInputArr[2] = verb;
    result = runProcedure(0, localInputArr);
    console.log(`noun: ${noun}, verb: ${verb}, result: ${result}`);
    if (result === 19690720) {
      break;
    }
  }
  if (result === 19690720) {
    break;
  }
}
console.log(`noun: ${noun}, verb: ${verb}`);
let answer = 100 * noun + verb;
console.log(`The answer is ${answer}`);
