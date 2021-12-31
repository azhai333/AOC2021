const fs = require('fs');

p1Score = 0
p1Pos = 4
p2Score = 0
p2Pos = 9
n = 1
dice = 0
p1Turn = true

var p1Wins = 0
var p2Wins = 0

function round(dice, p1Score, p2Score, p1Pos, p2Pos, multiplier, p1Turn) {
    if (p1Turn == true) {
        p1Pos += dice
        if (p1Pos % 10 != 0) {
            p1Pos -= Math.floor(p1Pos/10)*10
        } else {
            p1Pos = 10
        }
        p1Score += p1Pos
        if (p1Score >= 21) {
            p1Wins += multiplier
            return
        }
    } else {
        p2Pos += dice
        if (p2Pos % 10 != 0) {
            p2Pos -= Math.floor(p2Pos/10)*10
        } else {
            p2Pos = 10
        }
        p2Score += p2Pos
        if (p2Score >= 21) {
            p2Wins += multiplier
            return
        }
    }
    p1Turn = !p1Turn
    round(3, p1Score, p2Score, p1Pos, p2Pos, multiplier, p1Turn)
    round(4, p1Score, p2Score, p1Pos, p2Pos, multiplier*3, p1Turn)
    round(5, p1Score, p2Score, p1Pos, p2Pos, multiplier*6, p1Turn)
    round(6, p1Score, p2Score, p1Pos, p2Pos, multiplier*7, p1Turn)
    round(7, p1Score, p2Score, p1Pos, p2Pos, multiplier*6, p1Turn)
    round(8, p1Score, p2Score, p1Pos, p2Pos, multiplier*3, p1Turn)
    round(9, p1Score, p2Score, p1Pos, p2Pos, multiplier, p1Turn)
}

round(3, p1Score, p2Score, p1Pos, p2Pos, 1, p1Turn)
round(4, p1Score, p2Score, p1Pos, p2Pos, 3, p1Turn)
round(5, p1Score, p2Score, p1Pos, p2Pos, 6, p1Turn)
round(6, p1Score, p2Score, p1Pos, p2Pos, 7, p1Turn)
round(7, p1Score, p2Score, p1Pos, p2Pos, 6, p1Turn)
round(8, p1Score, p2Score, p1Pos, p2Pos, 3, p1Turn)
round(9, p1Score, p2Score, p1Pos, p2Pos, 1, p1Turn)

console.log(p2Wins)