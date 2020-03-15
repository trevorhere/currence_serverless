
const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhh';


const auth = () => {
    return ({
        before: (handler,next) => {

            const {token} = JSON.parse(handler.event.body);
            jwt.verify(token, secret, (error, decoded) => {
                if(error){
                    console.log('error', error);
                    return handler.callback(null, {
                        statusCode: 401,
                        body: JSON.stringify({error: error.message})
                    })
                } else {
                    console.log('decoded', decoded);
                    // handler.event.authenticated = decoded;
                    return next();
                }
            })
        }
    })
}

export {
    auth
}
