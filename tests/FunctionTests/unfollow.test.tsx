const unfollow = require('../../functions/unfollow/index')
const unfollowEvent = require('../utils/unfollowEvent')

jest.mock('../../data/User', () => jest.requireActual('../../__mocks__/User'))
jest.mock('../../data/Status', () => jest.requireActual('../../__mocks__/Status'))

test('unfollow runs',  async () => {
    let res = await unfollow.unfollow(unfollowEvent)
    expect(res).toBeDefined;
})