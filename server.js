const http = require('http') //this node module is meant to handle http requests
const fs = require('fs') //this node module is meant to manipulate file system

http.createServer((req,res) => {
    fs.readFile('index.html', (err,data) => { //read an html file through fs module & then callback
        res.writeHead(200, {'Content-Type': 'text/html'}) //writing the head of the response
        res.write(data) //writing the data of the response
        res.end() //ending the response
    })    
}).listen(3000) //use the listen method of the http module to listen on port 3000