const getFollowing = require('../../functions/following/index')
const getFollowingEvent = require('../utils/getFollowingEvent')

jest.mock('../../data/User', () => jest.requireActual('../../__mocks__/User'))
jest.mock('../../data/Status', () => jest.requireActual('../../__mocks__/Status'))

test('getFollowing runs', () => {

    let run = async() => {
        getFollowing.getFollowers(getFollowingEvent).then(
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