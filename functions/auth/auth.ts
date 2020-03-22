const jwt = require('jsonwebtoken');
const secret = process.env.TOKEN_SECRET;


const auth = () => {
    return ({
        before: (handler,next) => {

            const token = handler.event.queryStringParameters.token;
            jwt.verify(token, secret, (error, decoded) => {
                if(error){
                    console.log('error x', error);
                    throw new Error(error.message);
                } else {
                    console.log('decoded', decoded);
                    // handler.event.authenticated = decoded;
                    return next();
                }
            })
        },
        onError: (handler) => {
            console.log('throwing error: ', handler.error);
            return handler.callback(null, {
                statusCode: 401,
                body: JSON.stringify({error: handler.error.message})
            })
        }
    })
}

export {
    auth
}
