const isFollowing = require('../../functions/util/isFollowing')
const isFollowingEvent = require('../utils/isFollowingEvent')

jest.mock('../../data/User', () => jest.requireActual('../../__mocks__/User'))
jest.mock('../../data/Status', () => jest.requireActual('../../__mocks__/Status'))

test('isFollowing runs', () => {

    let run = async() => {
        isFollowing(isFollowingEvent).then(
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