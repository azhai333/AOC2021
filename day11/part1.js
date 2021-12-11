const fs = require('fs');

let input = fs.readFileSync('./input.txt', {encoding: 'utf8'}).split('\n').map(arr => arr.split('').map(val => Number(val)))

var flashed = {}
var total = 0
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

for (var h=0; h<100; h++) { 
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
}

console.log(total)