const fs = require('fs');

let input = fs.readFileSync('./example0.txt', {encoding: 'utf8'}).split('\n\n').map(x => x.split('\n'))

input[0] = input[0].map(val => val.split(',').map(val => Number(val)))
var yMax = input[0].sort((a, b) => a[1] - b[1])[input[0].length - 1][1]
var xMax = input[0].sort((a, b) => a[0] - b[0])[input[0].length - 1][0]


function fold(coord, axis, line, i) {
    var overlap = false
    if (axis == 'y' && input[0][i][1] >= line) {
        var flipped = [coord[0], yMax - coord[1]]
    } else if (axis == 'x' && input[0][i][0] >= line) {
        var flipped = [xMax - coord[0], coord[1]]
    } else {
        return coord
    }
    
    for (var i=0; i<input[0].length; i++) {
        if (arrayEquals(input[0][i], flipped)) {
            overlap = true
        }
    }
    if (overlap == false) {
        return flipped
    } else {
        return
    }
}

for (var h=0; h<1; h++) {
    var axis = input[1][h].substr(input[1][h].indexOf("=") - 1, 1)
    var line = Number(input[1][h].substr(input[1][h].indexOf("=") + 1, input[1][h].length - input[1][h].indexOf("=")))
    for (var i=0; i<input[0].length; i++) {
        input[0][i] = fold(input[0][i], axis, line, i)
        if (input[0][i] == undefined) {
            input[0].splice(i, 1)
            i--
        }
    }
}

console.log(input[0].length)

function arrayEquals(a, b) {
    return (
      Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index])
    );
  }