const unfollow = require('../../functions/unfollow/index')
const unfollowEvent = require('../utils/unfollowEvent')

jest.mock('../../data/User', () => jest.requireActual('../../__mocks__/User'))
jest.mock('../../data/Status', () => jest.requireActual('../../__mocks__/Status'))

test('unfollow runs', () => {

    let cb = async (f) => {
        await console.log('f: ', f);
    }

    let run = async() => {
        unfollow.unfollow(unfollowEvent, cb).then(
            res => {
                console.log('res: ', res);
                expect(res).toBeDefined;
            }
        ).catch(e => {
            console.log(e)
        })

    }
    run();
    expect(run).toBeCalled
})