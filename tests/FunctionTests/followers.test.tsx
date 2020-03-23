const getFollowers = require('../../functions/followers/index')
const getFollowersEvent = require('../utils/getFollowersEvent')

jest.mock('../../data/User', () => jest.requireActual('../../__mocks__/User'))
jest.mock('../../data/Status', () => jest.requireActual('../../__mocks__/Status'))

test('geteFollowers runs', () => {

    let run = async() => {
        getFollowers.getFollowers(getFollowersEvent).then(
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