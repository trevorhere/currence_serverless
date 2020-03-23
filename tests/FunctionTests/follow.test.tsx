const follow = require('../../functions/follow/index')
const followEvent = require('../utils/followEvent')

jest.mock('../../data/User', () => jest.requireActual('../../__mocks__/User'))
jest.mock('../../data/Status', () => jest.requireActual('../../__mocks__/Status'))

test('follow runs', () => {

    let cb = async (f) => {
        await console.log('f: ', f);
    }

    let run = async() => {
        follow.follow(followEvent, cb).then(
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