
jest.mock('../../data/User', () => jest.requireActual('../../__mocks__/User'))
jest.mock('../../data/Status', () => jest.requireActual('../../__mocks__/Status'))

const signin = require('../../functions/auth/signin')
const signup = require('../../functions/auth/signup')

const signinEvent = require('../utils/signinEvent')
const signupEvent = require('../utils/signupEvent')

it('signin runs', () => {
    try{

    let run = async() => {
        signin(signinEvent, null).then(
            res => {
                expect(res).toBeDefined;
            }
        ).catch(e => {
            console.log(e)
        })
    }

    run();

    expect(run).toBeCalled

    } catch(e){
        console.log(e)
    }
})

it('signup runs', () => {
    try{
    let run = async() => {
        signup(signupEvent, null).then(
            res => {
                expect(res).toBeDefined;
            }
        ).catch(e => {
            console.log(e)
        })
    }

    run();

    expect(run).toBeCalled
} catch(e){
    console.log(e)
}
})