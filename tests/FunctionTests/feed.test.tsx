const getFeed = require('../../functions/feed/index')
const feedEvent = require('../utils/feedEvent')
jest.mock('../../data/User', () => jest.requireActual('../../__mocks__/User'))
jest.mock('../../data/Status', () => jest.requireActual('../../__mocks__/Status'))

test('getFeed runs', async () => {

    let res = await getFeed.getFeed(feedEvent)
    expect(res).toBeDefined;
    // expect(res.length).toBeGreaterThan(0);

})