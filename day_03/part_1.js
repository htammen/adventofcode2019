let fs = require("fs");
let _ = require("lodash/fp");

function createDetailArray(arr) {
  return _.reduce((acc, elem) => {
    let dirElem = [elem[0], elem.substring(1)];
    let mappedElem =
      dirElem[0] === "R" || dirElem[0] === "L"
        ? { x: dirElem[1] * (dirElem[0] === "R" ? 1 : -1) }
        : { y: dirElem[1] * (dirElem[0] === "U" ? 1 : -1) };
    acc.push(mappedElem);
    return acc;
  }, [])(arr);
}

function createCompleteArray(arr) {
  return _.reduce(
    (acc, elem) => {
      const direction = elem.x ? "x" : "y";
      const constantParam = elem.x ? "y" : "x";
      const stepMultiplicator = _.gt(0)(elem[direction]) ? 1 : -1;
      const arrTimes = _.times(param => {
        let retVal = {};
        retVal[direction] =
          _.last(acc)[direction] + (param + 1) * stepMultiplicator;
        retVal[constantParam] = _.last(acc)[constantParam];
        return retVal;
      })(Math.abs(elem[direction]));
      return _.concat(acc)(arrTimes);
    },
    [{ x: 0, y: 0 }]
  )(arr);
}

function myIntersect(arr1, arr2) {
  let intersectArr = [];
  //let allreadyHandledX = []
  let maxX = _.last(arr1).x;
  let lastXValue = arr1[0].x;
  for (var i = 0; i < arr1.length; i++) {
    console.log(`${arr1[i].x}, max: ${maxX}`);
    for (var j = 0; j < arr2.length; j++) {
      if (arr2[j].x > arr1[i].x) {
        break;
      } else {
        if (arr2[j].x === arr1[i].x && arr2[j].y === arr1[i].y) {
          intersectArr.push(arr1[i]);
        }
      }
    }
    if (arr1[i].x > lastXValue) {
      arr2 = _.remove(obj => {
        return obj.x <= lastXValue;
      })(arr2);
      lastXValue = arr1[i].x;
    }
  }
  return intersectArr;
}

let input = fs.readFileSync("./input.txt", { encoding: "utf-8" });
// =159
//input = `R75,D30,R83,U83,L12,D49,R71,U7,L72
//U62,R66,U55,R34,D71,R55,D58,R83`;
// =135
//input = `R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R5
//U98,R91,D20,R16,D67,R40,U7,R15,U6,R7`;
// = 6
//input = `R8,U5,L5,D3
//U7,R6,D4,L4`;

let inputArr = input.split("\n");
let result = Number.MAX_SAFE_INTEGER;

inputArr = inputArr.map(elem => elem.split(","));
let arr1 = createDetailArray(inputArr[0]);
let arr2 = createDetailArray(inputArr[1]);

arr1Complete = _.sortBy(["x"])(_.drop(1)(createCompleteArray(arr1)));
arr2Complete = _.sortBy(["x"])(_.drop(1)(createCompleteArray(arr2)));

let resultArr = myIntersect(arr1Complete, arr2Complete); // _.intersectionWith(_.isEqual)(arr1Complete, arr2Complete);
console.log(resultArr);

resultArr.forEach(element => {
  result = Math.min(result, Math.abs(element.x) + Math.abs(element.y));
});

console.log(`The answer is ${result}`);
