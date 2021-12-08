const fs = require('fs');

var fishStates = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0, 
    6: 0,
    7: 0, 
    8: 0
}

fs.readFileSync('./input.txt', {encoding: 'utf8'}).split(',').map(arr => fishStates[arr]++)
var newFish = 0
for (var i=0; i<256; i++) {
    for (const fish in fishStates) {
        if (fish == 0 && fishStates[fish] > 0) {
            newFish = fishStates[0]
            initialZero = fishStates[0]
        } 
        if (fish != "8") {
            fishStates[fish] = fishStates[Number(fish)+1]
        } else {
            fishStates[8] -= fishStates[7]
        }
    }
    if (newFish > 0) {
        fishStates[6] += initialZero
        fishStates[8] += newFish
    }
    newFish = 0
}

var total = 0
for (const fish in fishStates) {
    total += fishStates[fish]
}

console.log(total)