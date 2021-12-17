var subpackets = {
    '1': ['2', '3'],
    '2': ['3', '4'],
    '3': 3,
    '4': 4
}

function accessObject(arr) {
    for (var i=0; i<arr.length; i++) {
        var accessor = arr[i]
        while (typeof accessor == "string") {
            accessor = subpackets[accessor]
        }
        arr[i] = accessor
    }
    return arr
}

console.log(accessObject(subpackets[1]))