const fs = require('fs');
const _ = require('lodash');

let input = fs.readFileSync('./input.txt', {encoding: 'utf8'}).split('\n').map(val => val.split(''))

function east() {
    for (var i=input.length-1; i>=0; i--) {
        for (var j=input[i].length-1; j>=0; j--) {
            if (input[i][j] == '>') {
                if (input[i][j+1] == '.') {
                    tmp[i][j+1] = '>'
                    tmp[i][j] = '.'
                    change = true
                } else if (input[i][j+1] == undefined && input[i][0] == '.') {
                    tmp[i][0] = '>'
                    tmp[i][j] = '.'
                    change = true
                }
            }
        }
    }
}

function south() {
    for (var i=input.length-1; i>=0; i--) {
        for (var j=input[i].length-1; j>=0; j--) {
            if (tmp[i][j] == 'v') {
                if (tmp[i+1] != undefined && tmp[i+1][j] == '.') {
                    input[i+1][j] = 'v'
                    input[i][j] = '.'
                    change = true
                } else if (tmp[i+1] == undefined && tmp[0][j] == '.') {
                    input[0][j] = 'v'
                    input[i][j] = '.'
                    change = true
                }
            }
        }
    }
}

var change = true
var steps = 0
var tmp
while (change == true) {
    change = false
    tmp = _.cloneDeep(input)
    east()
    input = _.cloneDeep(tmp)
    south()
    steps++
}

console.log(steps)