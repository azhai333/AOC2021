const fs = require('fs');

var xMinTarg = 155
var xMaxTarg = 215

var yMinTarg = -132
var yMaxTarg = -72

function calcTarg(minTarg, maxTarg) {
    var val = 0
    var targ = 0
    while (val < minTarg) {
        if (targ + val < maxTarg) {
            targ++
            val += targ
        } else {
            break
        }
    }
    return targ
}

yMin = 0

function probe(pos) {
    var xMin = calcTarg(xMinTarg, xMaxTarg)
    var heights = []
    var xPos = 0
    var yPos = 0
    var hit = 0
    while (true) {
        xPos += xMin
        yPos += pos

        heights.push(yPos)
        if (xPos >= xMinTarg && xPos <= xMaxTarg && yPos >= yMinTarg && yPos <= yMaxTarg) {
            if (yPos == yMinTarg) {
                return [heights.sort((a, b) => b - a)[0], 2]
            }
            hit = 1
            break
        } else if (xPos > xMaxTarg || yPos < yMinTarg || (xPos < xMinTarg && yPos < yMinTarg)) {
            break
        }
        if (xMin > 0) {
            xMin--
        }
        pos--
    }
    return [heights.sort((a, b) => b - a)[0], hit]
}

var inRange = true
while (true) {
    if (probe(yMin)[1] == 1) {
        maxHeight = probe(yMin)[0]
    } else if (probe(yMin)[1] == 2) {
        maxHeight = probe(yMin)[0]
        break
    }
    yMin++
}
console.log(maxHeight)