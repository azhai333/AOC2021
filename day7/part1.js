const fs = require('fs');

let input = fs.readFileSync('./input.txt', {encoding: 'utf8'}).split(',').sort((a, b) => a - b)
total = input.map(arr => Math.abs(arr-input[(input.length/2)])).reduce((a, b) => a + b)

console.log(total)