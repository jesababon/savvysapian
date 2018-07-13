const express = require('express');
const path = require('path');
// const fetch = require('node-fetch');
const bodyParser = require('body-parser');
// Create a new Express application (web server)
const app = express();

// const clientID = 'c39df3182a7eba954ad3'
// const clientSecret = '9e5fcd95d176de1a37fc440eea9a1c0f'
// const traverson = require('traverson');
// const JsonHalAdapter = require('traverson-hal'); //plugin adds support for hypertext application language
// const xappToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsImV4cCI6MTUzMTc1MTE2NCwiaWF0IjoxNTMxMTQ2MzY0LCJhdWQiOiI1YjNlZjQyZTEzOWIyMTEzOGM2YTcyMTEiLCJpc3MiOiJHcmF2aXR5IiwianRpIjoiNWI0MzcwN2MwMmRlNjEwMDIyMjMzNmZkIn0.d7Q59zoc22gLyZHnzkWRchMf6yNvXOzJHpu0mimOzGM';
// traverson.registerMediaType(JsonHalAdapter.mediaType, JsonHalAdapter);
// const url = traverson.from('https://api.artsy.net/api').jsonHal();


// const axios = require('axios');
// const xml2js = require('xml2js');

// const fs = require('fs');
// fs.readFile(__dirname + '/foo.xml', function (err, data) {
//   parser.parseString(data, function (err, result) {
//     // console.dir(result);
//     // console.log('Done');
//   });
// });

// Static hosting for built files
app.use("/", express.static("./build/static"));

app.use('/public', express.static("public"));

const jsonParser = bodyParser.json();
app.use(jsonParser);

// app.get('/arts.json', (request, response) => {
//     fetch(url, {
//         headers: {
//             'X-Xapp-Token': xappToken,
//             'Accept': 'application/vnd.artsy-v2+json'
//         }
//     })
//       .then(function (response) {
//         console.log('http response', response); // initial response from server
//         return response.json(); // returns json from response after response has been read
//       })
//       .then(function (jsonData) {
//         // chaining promise
//         console.log(jsonData);
//       });
// })

// Set the port based on the environment variable (PORT=8080 node server.js)
// and fallback to 4567
const PORT = process.env.PORT || 4567;
// Your routes go here.  @#*$^@%^@^%O^@

//Celest help with XML
// const XML_URL = 'http://www.nyartbeat.com/list/event_juststarted.en.xml'
// const parser = new xml2js.Parser();

// axios.get(XML_URL)
//   .then(function (response) {
//     parser.parseString(response.data, function (err, result) {
//       for (const value in result) {
//         const event = result[value];
//         for (const value in event) {
//           const art_events = event[value];
//         //   console.log(art_events);
          
//           return response.art_events;
//         }
//       }
//     })
//   })

// app.get('/events', (request, response) => {
//     getSrc().then(function (response){
//         return response.data
//     })
// })

// app.post('/events', function(rquest, response, next){
    // console.log(request.body);
// });

// In production, any request that doesn't match a previous route
// should send the front-end application, which will handle the route.
if (process.env.NODE_ENV == "production") {
    app.get("/*", function (request, response) {
        response.sendFile(path.join(__dirname, "build", "index.html"));
    });
}

// Start the web server listening on the provided port.
app.listen(PORT, () => {
    console.log(`Express web server listening on port ${PORT}`);
});