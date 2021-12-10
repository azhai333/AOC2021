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

var risk = 0
for (var i=1; i<input.length; i++) {
    for (var j=1; j<input[i].length; j++) {
        if (input[i][j] < input[i][j+1] && input[i][j] < input[i][j-1] && input[i][j] < input[i+1][j] && input[i][j] < input[i-1][j]) {
           risk += input[i][j]+1
        }
    }
}
console.log(risk)