const isFollowing = require('../../functions/util/isFollowing')
const isFollowingEvent = require('../utils/isFollowingEvent')

jest.mock('../../data/User', () => jest.requireActual('../../__mocks__/User'))
jest.mock('../../data/Status', () => jest.requireActual('../../__mocks__/Status'))

test('isFollowing runs', async () => {
        let res = await isFollowing.isFollowing(isFollowingEvent)
        expect(res).toBeDefined;
})