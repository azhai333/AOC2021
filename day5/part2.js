const fs = require('fs');
var _ = require('lodash');

let input = fs.readFileSync('./input.txt', {encoding: 'utf8'}).split('\n').map(line => line.split(" -> ").map(pos => pos.split(",").map(coord => Number(coord))))

var intersects = {}
for (i=0; i<input.length; i++) {
    if (input[i][0][0] <= input[i][1][0]) {
        x1 = _.range(input[i][0][0], input[i][1][0] + 1)
    } else {
        x1 = _.range(input[i][0][0], input[i][1][0] - 1)
    }

    if (input[i][0][1] <= input[i][1][1]) {
        y1 = _.range(input[i][0][1], input[i][1][1] + 1)
    } else {
        y1 = _.range(input[i][0][1], input[i][1][1] - 1)
    }
    for (j=i+1; j<input.length; j++) {
        if (input[j][0][0] <= input[j][1][0]) {
            x2 = _.range(input[j][0][0], input[j][1][0] + 1)
        } else {
            x2 = _.range(input[j][0][0], input[j][1][0] - 1)
        }

        if (input[j][0][1] <= input[j][1][1]) {
            y2 = _.range(input[j][0][1], input[j][1][1] + 1)
        } else {
            y2 = _.range(input[j][0][1], input[j][1][1] - 1)
        }

        xIntersect = x1.filter(element => x2.includes(element))
        yIntersect = y1.filter(element => y2.includes(element))

        if (xIntersect.length > 0 && yIntersect.length > 0) {
            if ((input[i][0][0] == input[i][1][0] || input[i][0][1] == input[i][1][1]) && (input[j][0][0] == input[j][1][0] || input[j][0][1] == input[j][1][1])) {
                if (xIntersect.length >= yIntersect.length) {
                    locateIntersects(xIntersect)
                } else {
                    locateIntersects(yIntersect)
                }
            } else {
               var points = []
                if (x1.length == 1) {
                    diagonals(x2, x1, y2, y1)
                } else if (x2.length == 1) {
                    diagonals(x1, x2, y1, y2)
                }  else if (y1.length == 1) {
                    diagonals(y2, y1, x2, x1)
                }  else if (y2.length == 1) {
                    diagonals(y1, y2, x1, x2)
                } else if (xIntersect.length <= yIntersect.length) {
                    for (k=0; k<xIntersect.length; k++) {
                        index1 = x1.indexOf(xIntersect[k])
                        index2 = x2.indexOf(xIntersect[k])

                        if (y1[index1] == y2[index2]) {
                            points.push([xIntersect[k], y2[index2]])
                        }
                    }
                } else {
                    for (k=0; k<yIntersect.length; k++) {
                        index1 = y1.indexOf(yIntersect[k])
                        index2 = y2.indexOf(yIntersect[k])

                        if (x1[index1] == x2[index2]) {
                            points.push([x2[index2], yIntersect[k]])
                        }
                    }
                }

                if (points.length > 0) {
                    for (k=0; k<points.length; k++) {
                        if (intersects[points[k][0]] == undefined) {
                            intersects[points[k][0]] = [points[k][1]]
                        } else if (intersects[points[k][0]].includes(points[k][1]) == false) {
                            intersects[points[k][0]].push(points[k][1])
                        }
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

function diagonals(coord1, coord2, coord3, coord4) {
    index = coord1.indexOf(coord2[0])
    check = coord3[index]
    if (coord4.indexOf(check) !== -1) {
        if (coord1 == y1 || coord1 == y2) {
            points.push([check, coord2[0]])
        } else {
            points.push([coord2[0], check])
        }
    }
}