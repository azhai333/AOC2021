const fs = require('fs');

let input = fs.readFileSync('./input.txt', {encoding: 'utf8'}).split('\n').map(n => n.split(''))

zCount = 0
gamma = ""
epsilon = ""

for (var i=0; i<input[0].length; i++) {
    zCount = 0
    for (var j=0; j<input.length; j++) {
        if (input[j][i] == "0") {
            zCount++
        }
    }

    if (zCount > input.length/2) {
        gamma += "0"
        epsilon += "1"
    } else {
        gamma += "1"
        epsilon += "0"
    }
}

part1 = parseInt(gamma, 2) * parseInt(epsilon, 2)

console.log(part1)