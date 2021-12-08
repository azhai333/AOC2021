const fs = require('fs');

input = fs.readFileSync('./input.txt', {encoding: 'utf8'}).split('\n').map(arr => arr.split(' | ').map(code => code.split(" ")))

var total = 0
for (var i=0; i<input.length; i++) {
    var j = 0
    var numbers = {}
    var twoLetters = []
    var zeroNine = []
    var letter = null
    while (Object.keys(numbers).length != 10) {
        if (input[i][0][j].length == 2) {
            numbers[input[i][0][j].split('').sort().join('')] = '1'
            twoLetters = input[i][0][j].split("")
        } else if (input[i][0][j].length == 3) {
            numbers[input[i][0][j].split('').sort().join('')] = '7'
        } else if (input[i][0][j].length == 4) {
            numbers[input[i][0][j].split('').sort().join('')] = '4'
            if (twoLetters.length > 0) {
                zeroNine = input[i][0][j].split("")
                zeroNine = zeroNine.filter(letter => !twoLetters.includes(letter))
            }
        } else if (input[i][0][j].length == 5) {
            if (input[i][0][j].includes(twoLetters[0]) && input[i][0][j].includes(twoLetters[1])) {
                numbers[input[i][0][j].split('').sort().join('')] = '3'
            } else if (input[i][0][j].includes(letter) && twoLetters.length > 0 && letter != null) {
                numbers[input[i][0][j].split('').sort().join('')] = '5'
            } else if (!input[i][0][j].includes(letter) && letter != null) {
                numbers[input[i][0][j].split('').sort().join('')] = '2'
            }
        } else if (input[i][0][j].length == 6) {
            if (input[i][0][j].includes(twoLetters[0]) && input[i][0][j].includes(twoLetters[1]) && input[i][0][j].includes(zeroNine[0]) && input[i][0][j].includes(zeroNine[1])) {
                numbers[input[i][0][j].split('').sort().join('')] = '9'
            } else if ((!input[i][0][j].includes(twoLetters[0]) || !input[i][0][j].includes(twoLetters[1])) && (input[i][0][j].includes(zeroNine[0]) && input[i][0][j].includes(zeroNine[1]))) {
                numbers[input[i][0][j].split('').sort().join('')] = '6'
                if (input[i][0][j].includes(twoLetters[0])) {
                    letter = twoLetters[0]
                } else {
                    letter = twoLetters[1]
                }
            } else if (twoLetters.length > 0 && zeroNine.length > 0) {
                numbers[input[i][0][j].split('').sort().join('')] = '0'
            }
        } else if (input[i][0][j].length == 7) {
            numbers[input[i][0][j].split('').sort().join('')] = '8'
        }

        if (j == 9) {
            j = 0
        } else {
            j++
        }
    }
    value = ""
    for (var j=0; j<input[i][1].length; j++) {
        value += numbers[input[i][1][j].split('').sort().join('')]
    }
    total += parseInt(value)
}

console.log(total)