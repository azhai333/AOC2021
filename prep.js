const request = require('request');
var fs = require('fs');
var dir = './';
const prompt = require('prompt-sync')();
const axios = require("axios");
const cheerio = require("cheerio");

var fileCount

fileCount = fs.readdirSync(dir, (err, files) => {
    fileCount = files.length - 1;
    return fileCount
  });

var fileTotal = fileCount.length - 3

dir = dir + "day" + fileTotal
console.log(dir)
 if (!fs.existsSync(dir)){
       fs.mkdirSync(dir);
    }


var splitMode = prompt("split by comma or line? ")

if (splitMode == "comma") {
    var content = "const fs = require('fs');\n\nlet input = fs.readFileSync('./input.txt', {encoding: 'utf8'}).split(',')"
} else {
    var content = "const fs = require('fs');\n\nlet input = fs.readFileSync('./input.txt', {encoding: 'utf8'}).split('\\n')"
}

for (let i = 1; i <= 2; i++) {
    dirTemp = dir + "/part" + i + ".js"

    fs.writeFile(dirTemp, content, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
   }); 
}

//Download input
let file = fs.createWriteStream(dir + "/input.txt");

request({
    url: 'https://adventofcode.com/2021/day/' + fileTotal + '/input',
    method: "GET",
    headers: {
        "cookie": "" //Insert session cookie here
    }
    },
    (error, response, body)=>{
        console.log(response.headers)
    }
).pipe(file)

//Prepare examples
var scrapeData = []
axios
  .get("https://adventofcode.com/2021/day/" + fileTotal)
  .then((response) => {
    const html = response.data;

    const $ = cheerio.load(html);

    $('pre').each(function (i, e) {
        if ($(this).prev().text().indexOf("example") != -1) {
            scrapeData.push($(this).text())
        }
    });
    dirBase = dir + "/example"
    for (let i = 0; i < scrapeData.length; i++) {
        dir = dirBase + i + ".txt"
        fs.writeFile(dir, scrapeData[i], function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
       }); 
    }
    
  })
  .catch((error) => {
    console.log(error);
  });
