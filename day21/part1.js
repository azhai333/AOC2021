const fs = require('fs');

p1Score = 0
p1Pos = 4
p2Score = 0
p2Pos = 9
n = 1
dice = 0
while (p1Score < 1000 || p2Score < 1000) {
    p1Pos += n + n+1 + n+2
    if (p1Pos % 10 != 0) {
        p1Pos -= Math.floor(p1Pos/10)*10
    } else {
        p1Pos = 10
    }
    p1Score += p1Pos
    n += 3
    if (p1Score >= 1000) {
        console.log(p2Score * (n-1))
        break
    }
    p2Pos += n + n+1 + n+2
    if (p2Pos % 10 != 0) {
        p2Pos -= Math.floor(p2Pos/10)*10
    } else {
        p2Pos = 10
    }
    p2Score += p2Pos
    n += 3
}