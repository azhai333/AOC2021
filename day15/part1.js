const fs = require('fs');

let input = fs.readFileSync('./example0.txt', {encoding: 'utf8'}).split('\n').map(arr => arr.split(''))

class Graph {
    constructor() {
        this.nodes = [];
        this.adjacencyList = {};
    }
    addNode(node) {
        this.nodes.push(node); 
        this.adjacencyList[node] = [];
    }
    addEdge(node1, node2, weight) {
        this.adjacencyList[node1].push({node:node2, weight: weight});
        this.adjacencyList[node2].push({node:node1, weight: weight});
    }
}

var map = new Graph

for (var i=0; i<input.length; i++) {
    for (var j=0; j<input[i].length; j++) {
        coord = j.toString() + ", " + i.toString()
        map.addNode(coord)
    }
}

for (var i=0; i<input.length; i++) {
    for (var j=0; j<input[i].length; j++) {
        coord = j.toString() + ", " + i.toString()
        if (input[i+1] != undefined) {
            edge = j.toString() + ", " + (i+1).toString()
            if (searchArrayOfObjects(map.adjacencyList[coord], edge) == false) {
            map.addEdge(coord, edge, Number(input[i+1][j]))
            }
        }
        if (input[i-1] != undefined) {
            edge = j.toString() + ", " + (i-1).toString()
            if (searchArrayOfObjects(map.adjacencyList[coord], edge) == false) {
            map.addEdge(coord, edge, Number(input[i-1][j]))
            }       
        }
        if (input[i][j+1] != undefined) {
            edge = (j+1).toString() + ", " + i.toString()
            if (searchArrayOfObjects(map.adjacencyList[coord], edge) == false) {
            map.addEdge(coord, edge, Number(input[i][j+1]))
            }        
        }
        if (input[i][j-1] != undefined) {
            edge = (j-1).toString() + ", " + i.toString()
            if (searchArrayOfObjects(map.adjacencyList[coord], edge) == false) {
            map.addEdge(coord, edge, Number(input[i][j-1]))
            }        
        }

    }
}

function searchArrayOfObjects(arr, term) {
    for (var i=0; i<arr.length; i++) {
        if (arr[i]["node"] == term) {
            return true
        }
    }
    return false
}

console.log(map.adjacencyList)