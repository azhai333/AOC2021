const fs = require('fs');

let input = fs.readFileSync('./input.txt', {encoding: 'utf8'}).split('\n').map(arr => arr.split('').map(val => Number(val))).map(test => {
    test.push(9)
    test.splice(0, 0, 9)
    return test
 })

input.splice(0, 0, input[0])
input[0] = input[0].map(val => {return val = 9})
input.push(input[0])
input[input.length-1] = input[input.length-1].map(val => {return val = 9})

var basins = []
function basin(x, y) { 
    if (input[y][x] != 9 && visited[y][x] == false) {
        size++
        visited[y][x] = true
        if (input[y+1] != undefined) {
            basin(x, y+1)
        }
        if (input[y-1] != undefined) {
            basin(x, y-1)
        }
        if (input[y][x+1] != undefined) {
            basin(x+1, y)
        }
        if (input[y][x-1] != undefined) {
            basin(x-1, y)
        }
    }
}

for (var i=1; i<input.length-1; i++) {
    for (var j=1; j<input[i].length-1; j++) {
        var size = 0
        var visited = {}
        for (var k=0; k<input.length; k++) {
            visited[k] = {}
            for (var l=0; l<input[k].length; l++) {
                visited[k][l] = false
            }
        }
        if (input[i][j] < input[i][j+1] && input[i][j] < input[i][j-1] && input[i][j] < input[i+1][j] && input[i][j] < input[i-1][j]) {
            basin(j, i)
            basins.push(size)
        }
    }
}

basins = basins.sort((a, b) => b - a)
part2 = basins[0] * basins[1] * basins[2]
console.log(part2)