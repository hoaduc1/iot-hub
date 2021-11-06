const logIn = require('./log-in');
const signUp = require('./sign-up');
const getUser = require('./get-user');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var Database = require('./db/database.js');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Keep-AIive');
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('x-powered-by', 'Django'); // Purposely misleading
    next();
  });
const port = 3000;

app.get('/', (req, res) => {
    res.writeHead(200, {});
    res.write(JSON.stringify({
        name: 'Co-bee services', 
        version: '2.0'
    }));
    res.end();
})/

app.post('/log-in', logIn.logIn);
app.post('/sign-up', signUp.signUp);
app.get('/get-user', getUser.getUser);



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});