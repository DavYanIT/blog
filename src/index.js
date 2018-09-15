const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const expressSession = require('express-session');
const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(expressSession({secret: 'test secret', saveUninitialized: false, resave: false}));
app.use(express.static(__dirname + '/public'));

require('./routes')(app);

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'));

app.listen(3000, function () {
  console.log('Blog app listening on port 3000!')
})
