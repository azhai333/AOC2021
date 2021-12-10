const fs = require('fs');

let input = fs.readFileSync('./input.txt', {encoding: 'utf8'}).split('\n').map(arr => arr.split('')).sort(function (a, b) {
    return b.length - a.length;
});

var errorScores = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137
}

var total = 0
var brackets = []
for (var i=0; i<input.length; i++) {
    brackets = []
    for (var j=0; j<input[i].length; j++) {
        if (input[i][j] == "[" || input[i][j] == "(" || input[i][j] == "{" || input[i][j] == "<") {
            brackets.push(input[i][j]);
        } else if (input[i][j] == "]" && brackets[brackets.length-1] == "[") {
            brackets.pop()
        } else if (input[i][j] == ")" && brackets[brackets.length-1] == "(") {
            brackets.pop()
        } else if (input[i][j] == "}" && brackets[brackets.length-1] == "{") {
            brackets.pop()
        } else if (input[i][j] == ">" && brackets[brackets.length-1] == "<") {
            brackets.pop()
        } else {
            total += errorScores[input[i][j]]
            break
        }
    }
}

console.log(total)