const fs = require('fs');
var Jimp = require('jimp');

let input = fs.readFileSync('./input.txt', {encoding: 'utf8'}).split('\n\n').map(x => x.split('\n'))
input[0] = input[0].map(val => val.split(',').map(val => Number(val)))

function fold(coord, axis, line, i) {
    var overlap = false
    if (axis == 'y' && input[0][i][1] >= line) {
        var flipped = [coord[0], coord[1] - ((coord[1]-line)*2)]
    } else if (axis == 'x' && input[0][i][0] >= line) {
        var flipped = [coord[0] - ((coord[0]-line)*2), coord[1]]
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

for (var h=0; h<input[1].length; h++) {
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

function arrayEquals(a, b) {
    return (
      Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index])
    );
}

yMax = input[0].sort((a, b) => a[1] - b[1])[input[0].length - 1][1] + 3
xMax = input[0].sort((a, b) => a[0] - b[0])[input[0].length - 1][0] + 3

new Jimp(xMax, yMax, (err, image) => {
    for (var i=0; i<input[0].length; i++) {
        image.setPixelColor(Jimp.rgbaToInt(255, 255, 255, 255), input[0][i][0] + 1, input[0][i][1] + 1)
    }
    image.write("final1.jpg")
});