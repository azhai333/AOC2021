const fs = require('fs');

var xMinTarg = 155
var xMaxTarg = 215

var yMinTarg = -132
var yMaxTarg = -72
function calcMin(minTarg, maxTarg) {
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

function calcTarg(val, minTarg) {
    var targ = val
    while (val < minTarg) {
        targ--
        val += targ
        if (val > minTarg) {
            break
        }
    }
    return val
}

function probe(xStart, yStart, strict) {
    var heights = []
    var xPos = 0
    var yPos = 0
    var fin = false
    var hit = false
    while (true) {
        xPos += xStart
        yPos += yStart

        heights.push(yPos)
        //console.log(xPos, yPos)
        if (xPos >= xMinTarg && xPos <= xMaxTarg && yPos >= yMinTarg && yPos <= yMaxTarg) {
            if (yPos <= yMinTarg || strict == false) {
                fin = true
            } else {
                hit = true
            }
            break
        } else if (xPos > xMaxTarg || yPos < yMinTarg || (xPos < xMinTarg && yPos < yMinTarg)) {
            break
        }
        if (xStart > 0) {
            xStart--
        }
        yStart--
    }
    return [yPos, fin, hit]
}
var count = 0
var xMin = calcMin(xMinTarg, xMaxTarg)
function calcVelocities() {
    locMin = calcTarg(xMin, xMinTarg)
    console.log(locMin)
    yMin = -1
    done = false
    while (true) {
        if (probe(xMin, yMin, false)[1] == true) {
            break
        } else if (yMin < yMinTarg) {
            done = true
            break
        } else {
            yMin--
        }
    }
    if (done == true) {
        return
    }
    while (true) {
        if (probe(xMin, yMin, false)[1] == false) {
            yMin++
            break
        } else {
            yMin--
        }
    }

    while (true) {
        if (probe(xMin, yMin, true)[1] == true || yMin > 1000) {
            console.log(xMin, yMin, probe(xMin, yMin)[0])
            yMin--
            break
        } else if (probe(xMin, yMin, true)[2] == true) {
            count++
        }
        yMin++
    }
}

for (var i=xMin; i<=Math.ceil(xMaxTarg/2); i++) {
    calcVelocities()
    xMin++
}
//console.log(probe(21, 2))
count += (Math.abs(xMaxTarg - xMinTarg)+1) * (Math.abs(yMaxTarg - yMinTarg)+1)
console.log(count)