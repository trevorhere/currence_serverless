
const jwt = require("jsonwebtoken");
const secret = process.env.TOKEN_SECRET;

const auth = () => {
  console.log("error x");

  return {
    before: async handler => {
      console.log('fix auth event: ')
      let token = handler.event?.queryStringParameters?.token;
      if(!token){
        token = handler.event.pathParameters.token
      }
      console.log('token: ', token)
      jwt.verify(token, secret, (error, decoded) => {
        if (error) {
          console.log("error x", error);
          throw new Error(error.message);
        } else {
          decoded;
          console.log('decoded', decoded);
          // handler.event.authenticated = decoded;
          return decoded;
        }
      });
    },
    onError: handler => {
      console.log('error: ', handler.error.message)
      return Promise.resolve({
        statusCode: 401,
        body: JSON.stringify({ error: handler.error.message })
      });
    }
  };
};

export { auth };

