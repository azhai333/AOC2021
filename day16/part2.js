const fs = require('fs');

let input = fs.readFileSync('./input.txt', {encoding: 'utf8'}).split('').map(val => parseInt(val, 16).toString(2).padStart(4, "0")).join('').split('')

var gIndex = 0
var gLayers = 0
var subpackets = {}
class packetDecoder {
    constructor(value) {
        this.length = 0
        this.n = 0
        this.value = ''
        this.subIndex;
        this.layer = value
    }

    packet() {
        let version = parseInt(getBit(gIndex, 3), 2)
        let typeID = parseInt(getBit(gIndex, 3), 2)

        if (typeID == 4) {
            this.value = ''
            do {
                gIndex++
                this.value += getBit(gIndex, 4)
            } while (input[gIndex-5] == 1) 
            subpackets[this.layer] = parseInt(this.value, 2)
        } else if (!isNaN(typeID)) {
            if (input[gIndex] == 0) {
                gIndex++
                this.length = parseInt(getBit(gIndex, 15), 2)
                this.length += gIndex

                this.layer = gLayers
                while (gIndex < this.length) {
                    gLayers++
                    if (subpackets[this.layer] == undefined) {
                        subpackets[this.layer] = [gLayers.toString(10)]
                    } else {
                        subpackets[this.layer].push(gLayers.toString(10))
                    }
                    this[gLayers] = new packetDecoder(gLayers)
                    parseInt(this[gLayers].packet(gIndex), 2)
            }
            } else {
                gIndex++
                this.length = parseInt(getBit(gIndex, 11), 2)
                this.n = 0

                this.layer = gLayers
                while (this.n < this.length) {
                    gLayers++
                    if (subpackets[this.layer] == undefined) {
                        subpackets[this.layer] = [gLayers.toString(10)]
                    } else {
                        subpackets[this.layer].push(gLayers.toString(10))
                    }
                    this[gLayers] = new packetDecoder(gLayers)
                    parseInt(this[gLayers].packet(gIndex), 2)
                    this.n++
                }
            }
            subpackets[this.layer] = accessObject(subpackets[this.layer])
            if (typeID == 0) {
                subpackets[this.layer] = subpackets[this.layer].reduce((a, b) => a + b)
            } else if (typeID == 1) {
                subpackets[this.layer] = subpackets[this.layer].reduce((a, b) => a * b)
            } else if (typeID == 2) {
                subpackets[this.layer] = Math.min(...subpackets[this.layer])
            } else if (typeID == 3) {
                subpackets[this.layer] = Math.max(...subpackets[this.layer])
            } else if (typeID == 5) {
                if (subpackets[this.layer][0] > subpackets[this.layer][1]) {
                    subpackets[this.layer] = 1
                } else {
                    subpackets[this.layer] = 0
                }
            } else if (typeID == 6) {
                if (subpackets[this.layer][0] < subpackets[this.layer][1]) {
                    subpackets[this.layer] = 1
                } else {
                    subpackets[this.layer] = 0
                }            
            } else if (typeID == 7) {
                if (subpackets[this.layer][0] == subpackets[this.layer][1]) {
                    subpackets[this.layer] = 1
                } else {
                    subpackets[this.layer] = 0
                }            
            }
            this.value = subpackets[this.layer]
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

function accessObject(arr) {
    for (var i=0; i<arr.length; i++) {
        arr[i] = subpackets[arr[i]]
    }
    return arr
}

main = new packetDecoder(0)
console.log(main.packet())