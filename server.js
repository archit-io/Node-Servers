const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring'); //provides utilities for parsing and formatting URL query strings
const figlet = require('figlet')

const server = http.createServer((req, res) => { //http module's method for creating a node server
  const page = url.parse(req.url).pathname; //url.parse module will parse the url from request
  const params = querystring.parse(url.parse(req.url).query); //queries from the url are extracted
  console.log(page);
  //conditions for different pathnames
  if (page == '/') { 
    fs.readFile('index.html', function(err, data) { //if the / path is requested index.html file will be read
      res.writeHead(200, {'Content-Type': 'text/html'}); //response head is written specifying the response type as text or HTML
      res.write(data); //data is written to the response body
      res.end(); //response is ended
    });
  }
  else if (page == '/otherpage') {
    fs.readFile('otherpage.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else if (page == '/otherotherpage') {
    fs.readFile('otherotherpage.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }

  //here a path other than that returning a page is hit by the fetch function on the client js file; this will return a JSON response rather than an HTML page
  else if (page == '/api') { 
    if('student' in params){ //checks the url for existance of the parameter named: student
      if(params['student']== 'archit'){ //checks the value of the parameter
        res.writeHead(200, {'Content-Type': 'application/json'}); //response head is written specifying the response type as json
        const objToJson = {
          name: "archit",
          status: "awesome",
          currentOccupation: "coder"
        }
        res.end(JSON.stringify(objToJson)); //object created above is converted to json
      }//student = leon
      else if(params['student'] != 'leon'){
        res.writeHead(200, {'Content-Type': 'application/json'});
        const objToJson = {
          name: "unknown",
          status: "unknown",
          currentOccupation: "unknown"
        }
        res.end(JSON.stringify(objToJson));
      }//student != leon
    }//student if
  }//else if

  //other page requests are handled below
  else if (page == '/css/style.css'){
    fs.readFile('css/style.css', function(err, data) {
      res.write(data);
      res.end();
    });
  }else if (page == '/js/main.js'){
    fs.readFile('js/main.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  }else{//if a page or request to route not mentioned above is found belwo will be executed
    figlet('404!!', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8001);
