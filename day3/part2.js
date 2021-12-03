const fs = require('fs');

let input = fs.readFileSync('./input.txt', {encoding: 'utf8'}).split('\n').map(n => n.split(''))
let input2 = fs.readFileSync('./input.txt', {encoding: 'utf8'}).split('\n').map(n => n.split(''))

function rating(array, type) {
    for (var i=0; i<array[0].length; i++) {
        zCount = 0
        for (var j=0; j<array.length; j++) {
            if (array[j][i] == "0") {
                zCount++
            }
        }
        if (zCount > array.length/2) {
            if (type == "O") {
                search = "0"
            } else {
                search = "1"
            }
        } else {
            if (type == "O") {
                search = "1"
            } else {
                search = "0"
            }
        }
        for (var j=0; j<array.length; j++) {
            if (array[j][i] != search) {
                array.splice(j, 1)
                j--
            }
        }
        if (array.length == 1) {
            break
        }
    }
    return array[0].join("")
}

oxygen = rating(input, "O")
co2 = rating(input2, "co2")

part2 = parseInt(oxygen, 2) * parseInt(co2, 2)

console.log(part2)