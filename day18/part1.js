const fs = require('fs');
const _ = require('lodash')

let input = fs.readFileSync('./input.txt', {encoding: 'utf8'}).split('\n').map(arr => JSON.parse(arr))

var sum = input[0]
var n = 0
var count = 0
var val = []
for (var i=1; i<input.length; i++) {
    sumTmp = []
    sumTmp.push(sum)
    sumTmp.push(input[i])
    
    while (containsExplode(sumTmp) == 5 || containsSplit(sumTmp) == true) {
        while (containsExplode(sumTmp) == 5) {
            n = 0
            index = findDepth(sumTmp, 0)
            count = 0
            val = []
            sumTmp = explode()
        }
        var found = false
        sumTmp = split(sumTmp) 
    }
    sum = _.cloneDeep(sumTmp)
}

console.log(magnitude(sum))

function findDepth(arr, depth) {
    depth++
    for (var i=0; i<arr.length; i++) {
        if (depth == 5) {
            val.push(count)
            break
        } else if (Array.isArray(arr[i])) {
            findDepth(arr[i], depth)
        } else {
            count++
        }
    }
    return val[0]
}

function explode() {
    explodeTmp = sumTmp.flat(Infinity)
    if (explodeTmp[index-1] != undefined) {
        explodeTmp[index-1] = explodeTmp[index-1] + explodeTmp[index]
    }
    if (explodeTmp[index+2] != undefined) {
        explodeTmp[index+2] = explodeTmp[index+1] + explodeTmp[index+2]
        explodeTmp.splice(index+1, 1)
    }
    explodeTmp[index] = -1
    return reconstruct(sumTmp)
}

function reconstruct(arr) {
    for (var i=0; i<arr.length; i++) {
        if (Array.isArray(arr[i])) {
            arr[i] = reconstruct(arr[i])
        } else {
            if (explodeTmp[n] == arr[i]) {
            } else if (explodeTmp[n] == -1) {
                arr = 0
            } else {
                arr[i] = explodeTmp[n]
            }
            n++
        }
    }
    return arr
}

function split(arr) {
    for (var i=0; i<arr.length; i++) {
        if (Array.isArray(arr[i])) {
            arr[i] = split(arr[i])
        } else {
            if (arr[i] >= 10 && found == false) {
                arr[i] = [Math.floor(arr[i]/2), Math.ceil(arr[i]/2)]
                found = true
            }
        }
    }
    return arr
}

function containsSplit(arr) {
    arr = arr.flat(Infinity)
    for (var i=0; i<arr.length; i++) {
        if (arr[i] >= 10) {
            return true
        }
    }
    return false
}

function magnitude(arr) {
    if (Array.isArray(arr[0])) {
        arr[0] = magnitude(arr[0])
    } 
    if (Array.isArray(arr[1])) {
       arr[1] = magnitude(arr[1])
    } 
    if (!Array.isArray(arr[0]) && !Array.isArray(arr[1])) {
        arr = arr[0]*3 + arr[1]*2
    }
    return arr
}

function containsExplode(value) {
    return Array.isArray(value) ? 
      1 + Math.max(...value.map(containsExplode)) :
      0;
}