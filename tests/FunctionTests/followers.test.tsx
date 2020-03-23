const getFollowers = require('../../functions/followers/index')
const getFollowersEvent = require('../utils/getFollowersEvent')

jest.mock('../../data/User', () => jest.requireActual('../../__mocks__/User'))
jest.mock('../../data/Status', () => jest.requireActual('../../__mocks__/Status'))

test('geteFollowers runs', async () => {

    let res = await getFollowers.getFollowers(getFollowersEvent)
    expect(res).toBeDefined;
    
})