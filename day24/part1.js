const fs = require('fs');
const prompt = require('prompt-sync')();

let input = fs.readFileSync('./input.txt', {encoding: 'utf8'}).split('\n')

var inp = {}
var n = 0

start = 11111111111111

while (start < 99999999999999) {
    start = start.toString()
    number = start.split('')
    output = alu(number)

    if (output == 0) {
        console.log(start)
    }

   do {
    Number(start)
    start++
    start = start.toString()
   } while (start.indexOf('0') != -1)
   console.log((Number(start)/99999999999999)*100)
}

function alu(number) {
    for (var i=0; i<input.length; i++) {
        if (input[i].indexOf('inp') != -1) {
            varName = input[i].substr(4, 1)
            inp[varName] = Number(number[n])
            n++
        } else if (input[i].indexOf('mul') != -1) {
            varName = input[i].substr(4, 1)
            if (isNaN(Number(input[i].substr(6, input[i].length-6)))) {
                mulValue = inp[input[i].substr(6, input[i].length-6)]
            } else {
                mulValue = Number(input[i].substr(6, input[i].length-6))
            }      
            if (inp[varName] == undefined) {
                inp[varName] = 0
            }  
            inp[varName] *= mulValue
        }  else if (input[i].indexOf('div') != -1) {
            varName = input[i].substr(4, 1)
            if (isNaN(Number(input[i].substr(6, input[i].length-6)))) {
                divValue = inp[input[i].substr(6, input[i].length-6)]
            } else {
                divValue = Number(input[i].substr(6, input[i].length-6))
            }
            if (inp[varName] == undefined) {
                inp[varName] = 0
            }
            inp[varName] = Math.floor(inp[varName] / divValue)
        } else if (input[i].indexOf('add') != -1) {
            varName = input[i].substr(4, 1)
            if (isNaN(Number(input[i].substr(6, input[i].length-6)))) {
                addValue = inp[input[i].substr(6, input[i].length-6)]
            } else {
                addValue = Number(input[i].substr(6, input[i].length-6))
            }        
            if (inp[varName] == undefined) {
                inp[varName] = 0
            }
            inp[varName] += addValue
        } else if (input[i].indexOf('mod') != -1) {
            varName = input[i].substr(4, 1)
            if (isNaN(Number(input[i].substr(6, input[i].length-6)))) {
                modValue = inp[input[i].substr(6, input[i].length-6)]
            } else {
                modValue = Number(input[i].substr(6, input[i].length-6))
            } 
            if (inp[varName] == undefined) {
                inp[varName] = 0
            }      
            inp[varName] = inp[varName] % modValue
        } else if (input[i].indexOf('eql') != -1) {
            varName = input[i].substr(4, 1)
            if (isNaN(Number(input[i].substr(6, input[i].length-6)))) {
                eqlValue = inp[input[i].substr(6, input[i].length-6)]
            } else {
                eqlValue = Number(input[i].substr(6, input[i].length-6))
            }
            if (inp[varName] == undefined) {
                inp[varName] = 0
            }
            if (eqlValue == inp[varName]) {
                inp[varName] = 1  
            } else {
                inp[varName] = 0  
            }
        }
    }
    return inp['z']
}

console.log(inp)