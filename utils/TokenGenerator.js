const jwt = require("jsonwebtoken");
const fs = require('fs');
require("dotenv").config();

const makeUserToken = (userId) => {
    const now = Math.floor(Date.now() / 1000);  
    const alg = "RS256";
    const header = {
        alg: alg,
        id: 'COHORT24WEBAPPID'
      };
    const payload = {
        exp: now + 15777000,
        iat: now,
        uid: userId
    }
    try {
        privateKey = fs.readFileSync("keys/cohort24pkcs.key");
        return jwt.sign(payload, privateKey, { header });
      } catch(err) {
        console.error(err);
      }
}

module.exports = makeUserToken;