const fs = require('fs');
var _ = require('lodash');

let input = fs.readFileSync('./input.txt', {encoding: 'utf8'}).split('\n').map(line => line.split(" -> ").map(pos => pos.split(",").map(coord => Number(coord))))

var intersects = {}
for (i=0; i<input.length; i++) {
    for (j=i+1; j<input.length; j++) {
        if (input[i][0][0] == input[i][1][0] || input[i][0][1] == input[i][1][1]) {
            x1 = _.range(Math.min(input[i][0][0], input[i][1][0]), Math.max(input[i][0][0], input[i][1][0]) + 1)
            y1 = _.range(Math.min(input[i][0][1], input[i][1][1]), Math.max(input[i][0][1], input[i][1][1]) + 1)
            if (input[j][0][0] == input[j][1][0] || input[j][0][1] == input[j][1][1]) {
                x2 = _.range(Math.min(input[j][0][0], input[j][1][0]), Math.max(input[j][0][0], input[j][1][0]) + 1)
                y2 = _.range(Math.min(input[j][0][1], input[j][1][1]), Math.max(input[j][0][1], input[j][1][1]) + 1)

                xIntersect = x1.filter(element => x2.includes(element))
                yIntersect = y1.filter(element => y2.includes(element))

                if (xIntersect.length > 0 && yIntersect.length > 0) {
                    if (xIntersect.length >= yIntersect.length) {
                        locateIntersects(xIntersect)
                    } else {
                        locateIntersects(yIntersect)
                    }
                }
            }
        }
    }
}

var total = 0
for (const x in intersects) {
    for (i=0; i<intersects[x].length; i++) {
        total++
    }
}
console.log(total)

function locateIntersects(arr) {
    for (k=0; k<arr.length; k++) {
        if (arr == xIntersect) {
            index1 = k
            index2 = 0
        } else {
            index1 = 0
            index2 = k
        }
        if (intersects[xIntersect[index1]] == undefined) {
            intersects[xIntersect[index1]] = [yIntersect[index2]]
        } else if (intersects[xIntersect[index1]].includes(yIntersect[index2]) == false) {
            intersects[xIntersect[index1]].push(yIntersect[index2])            
        }
    }
}