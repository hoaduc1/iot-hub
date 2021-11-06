const fs = require('fs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

module.exports.getUser = async (req, res) => {
    var token = req.header('Authorization');
    if (token) {
      token = token.replace('Bearer ', '');
    }
    
    var cert = fs.readFileSync('./jwt-cert/jwt.crt');
    let decoded = {};
    try {
      decoded = jwt.verify(token, cert);
    }
    catch (e) {
      res.writeHead(401, {});
      res.write(JSON.stringify({
        msgCode: 10301,
        msgResp: 'Unauthorized'
      }));
      res.end();
      return;
    }

    var user = {

    };

    res.writeHead(200, {});
    res.write(JSON.stringify({
      msgCode: 10700,
      msgResp: user
    }));
    res.end();
}