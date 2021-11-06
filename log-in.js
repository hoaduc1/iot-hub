const fs = require('fs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

module.exports.logIn = async (req, res) => {
    console.log(req.body);

    var user = {
        name: "hoa van duc",
        email: "hoaduc@gmail.com",
        phone: "0374609345",
        postalCode: "123456",
        photoUrl: "url"   
    };

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
    
    res.writeHead(200, {});
    res.write(JSON.stringify({
      msgCode: 10700,
      msgResp: {
        token: token
      }
    }));
    res.end();
}