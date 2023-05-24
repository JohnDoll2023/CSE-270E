/*
* John Doll
* simple http server
* cse270e
* 01/07/2023
*/

var http = require("http");

// sends back html accoriding to the url
function sendHTML(res, status, html) {
    res.writeHead(status, { "Content-Type": "text/html" });
    res.write("<!DOCTYPE html><html lang='en'><head><meta charset='utf-8'><title>Dolljm</title></head><body><h1>");
    res.write(html);
    res.write("</h1></body></html>");
    res.end();
}

// sends back JSON array of 10 random numbers
function sendJSON(res, status) {
    // for loop to store 10 random numbers in json
    var json = {};  
    for (var i = 0; i < 10; i++) {
        json[i] = Math.floor(Math.random() * 100);
    }
    res.writeHead(status, { "Content-Type": "application/json" });
    res.write(JSON.stringify(json));
    res.end();
}


var server = http.createServer(function(request, response) {
    // send time to console log
    console.log(new Date());
    // send remote address to console log
    console.log(request.connection.remoteAddress);
    // send URL of the request to console log
    console.log(request.url);

    // if statements to determine what html to show based on url
    if (request.url == "/") {
        sendHTML(response, 200, "John Doll");
    } else if (request.url == "/aboutNode") {
        sendHTML(response, 200, "NodeJS is a server side language. NodeJS was created by Ryan Dahl.");
    } else if (request.url == "/images") {
        sendHTML(response, 200, "<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Cc.logo.circle.svg/1200px-Cc.logo.circle.svg.png' width='200' alt='Creative commons logo'><br><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Aaron_Swartz_and_Lawrence_Lessig.jpg/1200px-Aaron_Swartz_and_Lawrence_Lessig.jpg' width='200' alt='Aaron Swartz and Lawrence Lessig'><br><img src='https://upload.wikimedia.org/wikipedia/commons/e/e1/Creative_commons_license_spectrum.svg' width='200' alt='Creative commons license spectrum'>");
    } else if (request.url == "/json") {
        sendJSON(response, 200);
    } else {
        // throw 404 error
        response.writeHead(404, { "Content-Type": "text/plain" });
    }
    response.end();
})

// handle client error
server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

// listen on port 8010
server.listen(8010);

console.log("server started running");