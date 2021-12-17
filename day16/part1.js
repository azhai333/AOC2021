const fs = require('fs');

let input = fs.readFileSync('./input.txt', {encoding: 'utf8'}).split('').map(val => parseInt(val, 16).toString(2).padStart(4, "0")).join('').split('')

var gIndex = 0
var versionTotal = 0
var subpackets = []
class packetDecoder {
    constructor() {
        this.length = 0
        this.n = 0
        this.value = ''
        this.subIndex;
    }

    packet(index) {
        let version = parseInt(getBit(gIndex, 3), 2)
        versionTotal += version
        let typeID = parseInt(getBit(gIndex, 3), 2)
    
        if (typeID == 4) {
            this.value = ''
            do {
                gIndex++
                this.value += getBit(gIndex, 4)
            } while (input[gIndex-5] == 1) 
        } else {
            if (input[gIndex] == 0) {
                gIndex++
                this.length = parseInt(getBit(gIndex, 15), 2)
                this.length += gIndex
                while (gIndex < this.length) {
                    subpackets.push(new packetDecoder)
                    this.subIndex = subpackets.length - 1
                    console.log(parseInt(subpackets[this.subIndex].packet(gIndex), 2))
                }
            } else {
                gIndex++
                this.length = parseInt(getBit(gIndex, 11), 2)
                this.n = 0
                while (this.n < this.length) {
                    subpackets.push(new packetDecoder)
                    this.subIndex = subpackets.length - 1
                    console.log(parseInt(subpackets[this.subIndex].packet(gIndex), 2))
                    this.n++
                }
            }
        }
        return this.value
    }
}

function getBit(index, length) {
    let code = ''
    for (var i=index; i<index+length; i++) {
        code += input[i]
    }
    gIndex += length
    return code
}

main = new packetDecoder

main.packet(0)
console.log(versionTotal)
