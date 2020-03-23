
jest.mock('../../data/User', () => jest.requireActual('../../__mocks__/User'))
jest.mock('../../data/Status', () => jest.requireActual('../../__mocks__/Status'))

const signin = require('../../functions/auth/signin')
const signup = require('../../functions/auth/signup')

const signinEvent = require('../utils/signinEvent')
const signupEvent = require('../utils/signupEvent')

it('signin runs', async () => {
    let res = await signin.signin(signinEvent)
    expect(res).toBeDefined;
})

it('signup runs', async () => {
        let res = await signup.signup(signupEvent)
        console.log('res: ', res)
        expect(res).toBeDefined;
})