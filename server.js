const express = require('express');
const path = require('path');
// const fetch = require('node-fetch');
// const cors = require('cors');
const bodyParser = require('body-parser');
// Create a new Express application (web server)
const app = express();

// Static hosting for built files
app.use("/", express.static("./build/"));

const jsonParser = bodyParser.json();
app.use(jsonParser);

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*"); //My frontend APP domain
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

// app.use(cors({
//   'allowedHeaders': ['sessionId', 'Content-Type'],
//   'exposedHeaders': ['sessionId'],
//   'origin': '*',
//   'methods': 'GET',
//   'preflightContinue': false
// }));

// require('./router/index')(app);
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