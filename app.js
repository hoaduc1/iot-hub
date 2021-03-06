const logIn = require('./log-in');
const signUp = require('./sign-up');
const getUser = require('./get-user');
const productsManager = require('./products-manager');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const { verifySignUp } = require("./middlewares");
const initRoles = require("./db/init-roles");
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

app.get("/api/test-all", controller.allAccess);

app.get("/test-user", [authJwt.verifyToken], controller.userBoard);

app.get("/test-mod",
  [authJwt.verifyToken, authJwt.isModerator],
  controller.moderatorBoard
);

app.get("/test-admin",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.adminBoard
);

/* List all Product */
app.get('/product-list', productsManager.productsList);

/* Add new Product */
app.post('/add-product', 
  [authJwt.verifyToken, authJwt.isAdmin], 
  productsManager.addProduct
);

/* Update product */
app.post('/update-product' , 
  [authJwt.verifyToken, authJwt.isAdmin],
  productsManager.updateProduct
);

/* Delete product */
app.delete('/delete-product',
  [authJwt.verifyToken, authJwt.isAdmin],
  productsManager.deleteProduct
);

async function main() {
  await mongoose.connect('mongodb://localhost:27017/iot-hub');
  console.log("Successfully connect to MongoDB.");
  initRoles.initial()

  const port = 3000;
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
}

main();



