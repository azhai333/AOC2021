const fs = require('fs');
const _ = require('lodash')

let input = fs.readFileSync('./input.txt', {encoding: 'utf8'}).split('\n\n')

input[0] = input[0].split('')
input[1] = input[1].split('\n').map(str => str.split(''))

for (var h=0; h<50; h++) {
    input[1] = prep(input[1])
    image = []
    for (var i=1; i<input[1].length-1; i++) {
        image.push([])
        for (var j=1; j<input[1][i].length-1; j++) {
            index = getValue()
            image[i-1].push(input[0][index])
        }
    }
    input[1] = _.cloneDeep(image)
}


console.log(image.flat().filter(x => x === '#').length)

function prep(image) {
    if (h % 2 == 0) {
        padding = '.'
    } else {
        padding = '#'
    }
    image = image.map(arr => arr.join(''))
    image = image.map(str => {
        str = str.padStart(str.length+2, padding)
        str = str.padEnd(str.length+2, padding)
        str = str.split('')
        return str
    })
    image.splice(0, 0, image[0])
    image[0] = image[0].map(val => {return val = padding})
    image.splice(0, 0, image[0])
    image.push(image[0])
    image.push(image[0])
    return image
}

function getValue() {
    number = ''
    if (input[1][i-1][j-1] == '.') {
        number += '0'
    } else {
        number += '1'
    }
    if (input[1][i-1][j] == '.') {
        number += '0'
    } else {
        number += '1'
    }
    if (input[1][i-1][j+1] == '.') {
        number += '0'
    } else {
        number += '1'
    }
    if (input[1][i][j-1] == '.') {
        number += '0'
    } else {
        number += '1'
    }
    if (input[1][i][j] == '.') {
        number += '0'
    } else {
        number += '1'
    }
    if (input[1][i][j+1] == '.') {
        number += '0'
    } else {
        number += '1'
    }
    if (input[1][i+1][j-1] == '.') {
        number += '0'
    } else {
        number += '1'
    }
    if (input[1][i+1][j] == '.') {
        number += '0'
    } else {
        number += '1'
    }
    if (input[1][i+1][j+1] == '.') {
        number += '0'
    } else {
        number += '1'
    }
    return parseInt(number, 2)
}