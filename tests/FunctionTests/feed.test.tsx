const getFeed = require('../../functions/feed/index')
const feedEvent = require('../utils/feedEvent')
jest.mock('../../data/User', () => jest.requireActual('../../__mocks__/User'))
jest.mock('../../data/Status', () => jest.requireActual('../../__mocks__/Status'))



test('getFeed runs', () => {

    let cb = async (f) => {
        await console.log('f: ', f);
    }

    let feed = async() => {
        await getFeed.getFeed(feedEvent, cb).then(
            res => {
                console.log('res: ', res);
                expect(res).toBeDefined;
                expect(res.length).toBeGreaterThan(0);

            }
        ).catch(e => {
            console.log(e)
        })

    }

    feed();

    expect(feed).toBeCalled
})