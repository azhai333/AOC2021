const fs = require('fs');

let input = fs.readFileSync('./input.txt', {encoding: 'utf8'}).split('\n').map(arr => arr.split(' | ').map(code => code.split(" ")))

var count = 0
for (var i=0; i<input.length; i++) {
    for (var j=0; j<input[i][1].length; j++) {
        if (input[i][1][j].length == 2 || input[i][1][j].length == 3 || input[i][1][j].length == 4 ||input[i][1][j].length == 7) {
            count++
        }
    }
}

console.log(count)