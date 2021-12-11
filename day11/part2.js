const fs = require('fs');

let input = fs.readFileSync('./input.txt', {encoding: 'utf8'}).split('\n').map(arr => arr.split('').map(val => Number(val)))

var flashed = {}
var total = 0
var end = false
function flash(x, y) {
    if (input[y][x] < 9) {
        input[y][x]++ 
    } else {
        flashed[x][y] = true
        input[y][x] = 0
        total++
        if (input[y+1] != undefined) {
            if (flashed[x][y+1] == false) {
                flash(x, y+1)
            }
            if (input[y+1][x+1] != undefined && flashed[x+1][y+1] == false) {
                flash(x+1, y+1) 
            }
            if (input[y+1][x-1] != undefined && flashed[x-1][y+1] == false) {
                flash(x-1, y+1) 
            }
        }
        if (input[y-1] != undefined) {
            if (flashed[x][y-1] == false) {
                flash(x, y-1)
            }
            if (input[y-1][x+1] != undefined && flashed[x+1][y-1] == false) {
                flash(x+1, y-1) 
            }
            if (input[y-1][x-1] != undefined && flashed[x-1][y-1] == false) {
                flash(x-1, y-1) 
            }
        }
        if (input[y][x+1] != undefined && flashed[x+1][y] == false) {
            flash(x+1, y) 
        }
        if (input[y][x-1] != undefined && flashed[x-1][y] == false) {
            flash(x-1, y) 
        }
    }
}

var h = 0
while (end == false) { 
    for (var i=0; i<input.length; i++) {
        flashed[i] = {}
        for (var j=0; j<input[i].length; j++) {
            flashed[i][j] = false
        }
    }
    for (var i=0; i<input.length; i++) {
        for (var j=0; j<input[i].length; j++) {
            if (flashed[j][i] == false) {
            flash(j, i)
            }
        }
    }
    end = true
    for (var i=0; i<input.length; i++) {
        if (input[i].includes(1) || input[i].includes(2) || input[i].includes(3) || input[i].includes(4) || input[i].includes(5) || input[i].includes(6) || input[i].includes(7) || input[i].includes(8) || input[i].includes(9)) {
            end = false
        }
    }
    h++
}

console.log(h)