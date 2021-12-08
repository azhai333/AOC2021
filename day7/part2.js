const fs = require('fs');

let input = fs.readFileSync('./example0.txt', {encoding: 'utf8'}).split(',').map(arr => Number(arr))
let mean = Math.floor(input.reduce((a, b) => a + b)/input.length)

total = Math.round(input.map(arr => Math.abs(arr-mean)*((Math.abs(arr-mean))+1)/2).reduce((a, b) => a + b))

console.log(total) 