const fs = require('fs');

let input = fs.readFileSync('./input.txt', {encoding: 'utf8'}).split('\n')

horizontal = 0
depth = 0
for (var i=0; i<input.length; i++) {
    forward = input[i].indexOf("forward")
    down = input[i].indexOf("down")
    up = input[i].indexOf("up")

    if (forward != -1) {
       horizontal += Number(input[i].substr(forward + 8, 1))
    } else if (down != -1) {
        depth += Number(input[i].substr(down + 5, 1))
    } else if (up != -1) {
        depth -= Number(input[i].substr(up + 3, 1))
    }
}

console.log(depth*horizontal)