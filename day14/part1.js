const fs = require('fs');
const lodash = require('lodash');

var start = Date.now()

var key = {}
var letters = {}
let input = fs.readFileSync('./input.txt', {encoding: 'utf8'}).split('\n\n').map(arr => arr.split('\n'))
input[1] = input[1].map(val => val.split(' -> ')).map(arr => {
    key[arr[0]] = [arr[1], 0]
})

for (var i=0; i<input[0][0].length; i++) {
     if (letters[input[0][0][i]] == undefined) {
         letters[input[0][0][i]] = 1
     } else {
        letters[input[0][0][i]]++
     }
     if (input[0][0][i+1] != undefined) {
     pair = input[0][0][i].concat(input[0][0][i+1])
     key[pair][1]++
     }     
 }

 for (var i=0; i<40; i++) {
    var keyTmp = lodash.cloneDeep(key)
    for (const pair in key) {
        if (key[pair][1] > 0) {
            var pair1 = pair[0].concat(key[pair][0])
            var pair2 = key[pair][0].concat(pair[1])

            keyTmp[pair1][1] += key[pair][1]
            keyTmp[pair2][1] += key[pair][1]
            keyTmp[pair][1] -= key[pair][1]

            if (letters[key[pair][0]] == undefined) {
                letters[key[pair][0]] = key[pair][1]
            } else {
                letters[key[pair][0]] += key[pair][1]
            }
        }
    }
    key = lodash.cloneDeep(keyTmp)
}
letterArray = []
for (const letter in letters) {
    letterArray.push(letters[letter])
}
letterArray = letterArray.sort((a, b) => a - b)
final = letterArray[letterArray.length - 1] - letterArray[0]
console.log(final)
console.log(Date.now() - start)