const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// Create a new Express application (web server)
const app = express();

// const clientID = 'c39df3182a7eba954ad3'
// const clientSecret = '9e5fcd95d176de1a37fc440eea9a1c0f'
// const xappToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsImV4cCI6MTUzMTc1MTE2NCwiaWF0IjoxNTMxMTQ2MzY0LCJhdWQiOiI1YjNlZjQyZTEzOWIyMTEzOGM2YTcyMTEiLCJpc3MiOiJHcmF2aXR5IiwianRpIjoiNWI0MzcwN2MwMmRlNjEwMDIyMjMzNmZkIn0.d7Q59zoc22gLyZHnzkWRchMf6yNvXOzJHpu0mimOzGM';


// Static hosting for built files
app.use("/", express.static("./build/"));

app.use('/public', express.static("public"));

app.use(bodyParser.urlencoded({
  extended: false
}));


// Set the port based on the environment variable (PORT=8080 node server.js)
// and fallback to 4567
const PORT = process.env.PORT || 4567;

// Your routes go here.

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