const fs = require('fs');

let input = fs.readFileSync('./input.txt', {encoding: 'utf8'}).split('\n').map(arr => arr.split('')).sort(function (a, b) {
    return b.length - a.length;
});

var errorScores = {
    "(": 1,
    "[": 2,
    "{": 3,
    "<": 4
}

var scores = []
for (var i=0; i<input.length; i++) {
    var brackets = []
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
            brackets = []
            break
        }
    }
    var total = 0
    if (brackets.length > 0) {
        for (var j=brackets.length-1; j>=0; j--) {
            total = total*5+errorScores[brackets[j]]
        }
        scores.push(total)
    }
}

scores = scores.sort((a, b) => a - b)
console.log(scores[((scores.length-1)/2)])

