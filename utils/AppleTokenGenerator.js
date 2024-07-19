const jwt = require("jsonwebtoken");
const fs = require('fs');
require("dotenv").config();

// Token Generator
const makeToken = () => {
  const now = Math.floor(Date.now() / 1000);  
  const alg = "ES256";
  const header = {
    alg: alg,
    kid: process.env.APPLE_WEATHERKIT_KID,
    id: `${process.env.APPLE_TEAM_ID}.${process.env.APPLE_SERVICE_ID}`
  };

  const payload = {
    iss: process.env.APPLE_TEAM_ID,
    exp: now + 15777000,
    iat: now,
    sub: process.env.APPLE_SERVICE_ID,
  };

  try {
    privateKey = fs.readFileSync("keys/AuthKey_PJGQ55QP6P.p8");
    return jwt.sign(payload, privateKey, { header });
  } catch(err) {
    console.error(err);
  }
};

module.exports = makeToken;
