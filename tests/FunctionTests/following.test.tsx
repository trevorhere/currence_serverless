const getFollowing = require('../../functions/following/index')
const getFollowingEvent = require('../utils/getFollowingEvent')

jest.mock('../../data/User', () => jest.requireActual('../../__mocks__/User'))
jest.mock('../../data/Status', () => jest.requireActual('../../__mocks__/Status'))

test('getFollowing runs', async () => {

        let res = await getFollowing.getFollowing(getFollowingEvent)
        expect(res).toBeDefined;

});