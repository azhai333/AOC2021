const fs = require('fs');

let input = fs.readFileSync('./input.txt', {encoding: 'utf8'}).split('\n').map(n => Number(n))

count = 0
for (var i=1; i<input.length; i++) {
    if (input[i] + input[i+1] + input[i+2] > input[i-1] + input[i] + input[i+1]) {
        count++
    }
}
console.log(count)