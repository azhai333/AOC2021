const fs = require('fs');

let squareTmp = fs.readFileSync('./input.txt', {encoding: 'utf8'}).split('\n\n')

console.log(squareTmp)