let _ = require("lodash/fp");

const input = "158126-624574"

let range = _.range(Number.parseInt(input.split("-")[0]), Number.parseInt(input.split("-")[1])+1)
console.log(`${range[0]}, ${_.last(range)}`)

//range = [111111, 223450, 123789, 123345]
const possiblePasswords = range.filter(num => {
    const digits = Number(num).toString().split("").map(s => Number.parseInt(s))
    // filter digits that don't increase or are equal ot the one before
    const checkNotDecrease = digits.filter((digi, idx, digits) => {
        return digi < digits[idx-1]
    })
    if(checkNotDecrease.length > 0) return false

    const checkTwoAdjecentAreTheSame = digits.filter((digi, idx, digits) => {
        return digi === digits[idx-1]
    })
    return checkTwoAdjecentAreTheSame.length > 0
})

console.log(possiblePasswords)

console.log(`The answer is ${possiblePasswords.length}`)