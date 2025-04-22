const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

module.exports = app;

/* Do not change the following line! It is required for testing and allowing
*  the frontend application to interact as planned with the api server
*/

app.use(bodyParser.json()); // this one parses incoming JSON requests
// This middleware is used to parse incoming requests with urlencoded payloads
// For example, form submissions
app.use(express.json());

/**
 * Parsing incoming requests with URL-encoded payloads refers to the process of taking data sent from clients
 * such as an HTML form in the application/x-www-form-urlencoded format and converting it into a format that can be easily processed by the server.
 * This is typically done using middleware that can handle URL-encoded data, such as the body-parser middleware in Express.js.
 * The extended:true basically enables the parsing of deeply nested objects 
 *   */ 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.text()); // this one parses incoming text requests
app.use(cors()); // this one enables CORS for all routes
// using cors() middleware applies the cors globaly to all routes and modifies server responses by adding CORS- related headers 
// the headers are such that 
// Access-Control-Allow-Origin: * (allows requests from any origin)
// This middleware is used to parse incoming requests with JSON payloads
// by default setting app.use(cors()) allows all origins, methods, and headers: Access-Control-Allow-Origin: *, Access-Control-Allow-Methods: *, Access-Control-Allow-Headers: *.
// you can also specify specific origins, methods, and headers to allow by passing options to the cors() function.
const PORT = process.env.PORT || 4001;

// Add middleware for handling CORS requests from index.html


// Add middware for parsing request bodies here:


// Mount your existing apiRouter below at the '/api' path.
const apiRouter = require('./server/api');
app.use('/api', apiRouter);



// This conditional is here for testing purposes:
// if module.parent is not defined, this means that the server file is being run directly via node server.js
// If module.parent is defined, it means that the server file is being required by another module (e.g., for testing purposes)
// In this case, we want to start the server only if the file is being run directly
if (!module.parent) { 
  // Add your code to start the server listening at PORT below:
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
