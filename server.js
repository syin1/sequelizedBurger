// load dependencies
var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var routes = require('./controllers/burgers_controller.js');

var PORT = process.env.PORT || 8080;

var app = express();

// serve static content for the app from the "public" directory in the application directory
app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(routes);

// start our server so that it can begin listening to client requests
app.listen(PORT, function() {
  // log (server-side) when our server has started
  console.log('Server listening on: http://localhost:' + PORT);
});
