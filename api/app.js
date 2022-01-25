var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
var { graphqlHTTP } = require('express-graphql');
var phonebook = require('./graphql/phonebook')

var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/', indexRouter);

app.use('/graphql', graphqlHTTP({
    schema: phonebook.schema,
    rootValue: phonebook.solution,
    graphiql: true,
}));

module.exports = app;
