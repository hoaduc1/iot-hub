const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require('uuid');
// const User = require('./db/models/user.model');
const db = require("./db/models");
const User = db.user;
// const Role = db.role;



module.exports.logIn = async (req, res) => {
    // console.log(req.body.password);
    var user = null;
    try {
      user = await User.findOne({username: req.body.username})
      .populate("roles", "-__v")
      .exec();
    } 
    catch (e) {
      res.status(500).send({ message: e });
      return;
    } 
    
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }

    var privKey = fs.readFileSync('./jwt-cert/jwt.key');
    var payload = {
        iss: 'db-iot',
        sub: 'O=dbiot.io,E=' + user.email,
        aud: user.email,
        jti: uuidv4(),
        exp: Math.floor(Date.now() / 1000) + 3600,
        iat: Math.floor(Date.now() / 1000),
        uid: user.id,
        version: 1,
        name: user.name,
        email: user.email,
        phone: user.phone,
        postalCode: user.postalCode,
        photoUrl: user.photoUrl,
    };
    var token = jwt.sign(payload, privKey, {algorithm: 'ES256'});

    var authorities = [];

    for (let i = 0; i < user.roles.length; i++) {
      authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
    }
    res.writeHead(200, {});
    res.write(JSON.stringify({
      msgCode: 10700,
      msgResp: {
        uid: user.id,
        roles: authorities,
        token: token
      }
    }));
    res.end();
}