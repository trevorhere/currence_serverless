const follow = require('../../functions/follow/index')
const followEvent = require('../utils/followEvent')

jest.mock('../../data/User', () => jest.requireActual('../../__mocks__/User'))
jest.mock('../../data/Status', () => jest.requireActual('../../__mocks__/Status'))

test('follow runs', async () => {

    let res = await follow.follow(followEvent)
    expect(res).toBeDefined;
})