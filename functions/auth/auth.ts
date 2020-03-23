const jwt = require("jsonwebtoken");
const secret = process.env.TOKEN_SECRET;

const auth = () => {
  return {
    before: handler => {
      const token = handler.event.queryStringParameters.token;
      jwt.verify(token, secret, (error, decoded) => {
        if (error) {
          console.log("error x", error);
          throw new Error(error.message);
        } else {
          decoded;
          // console.log('decoded', decoded);
          // handler.event.authenticated = decoded;
          return decoded;
        }
      });
    },
    onError: handler => {
      return Promise.resolve({
        statusCode: 401,
        body: JSON.stringify({ error: handler.error.message })
      });
    }
  };
};

export { auth };

