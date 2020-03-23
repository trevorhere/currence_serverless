const jwt = require('jsonwebtoken');

process.env.TOKEN_SECRET = "PragueOkaikweiTeriPetrolulAwful"
process.env.AWS_REGION = "us-east-1"
process.env.TOKEN = jwt.sign({alias:"x"}, "PragueOkaikweiTeriPetrolulAwful", {
  expiresIn: '1h'
})


module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};