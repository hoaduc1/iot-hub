const logIn = require('./log-in');
const signUp = require('./sign-up');
const getUser = require('./get-user');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { verifySignUp } = require("./middlewares");
const database = require("./db/database");
const controller = require("./controllers/user.controller");
const { authJwt } = require("./middlewares");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Keep-AIive');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('x-powered-by', 'Django'); // Purposely misleading
  next();
});

database.database_init();

app.get('/', (req, res) => {
  res.writeHead(200, {});
  res.write(JSON.stringify({
    name: 'Co-bee services', 
    version: '2.0'
  }));
  res.end();
})/

app.post('/log-in', logIn.logIn);

app.post('/sign-up', 
  [
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted
  ],
  signUp.signUp 
  );

app.get('/get-user', getUser.getUser);

app.get("/api/test/all", controller.allAccess);

app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

app.get("/api/test/mod",
  [authJwt.verifyToken, authJwt.isModerator],
  controller.moderatorBoard
);

app.get(
  "/api/test/admin",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.adminBoard
);

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

