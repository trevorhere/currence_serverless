const getStory = require('../../functions/story/index')
const storyEvent = require('../utils/storyEvent')
jest.mock('../../data/User', () => jest.requireActual('../../__mocks__/User'))
jest.mock('../../data/Status', () => jest.requireActual('../../__mocks__/Status'))

test('getStory runs', () => {

    let cb = async (f) => {
        await console.log('f: ', f);
    }

    let feed = async() => {
        getStory.getStory(storyEvent, cb).then(
            res => {
                // console.log('res: ', res);
                expect(res).toBeDefined;

            }
        ).catch(e => {
            console.log(e)
        })

    }

    feed();

    expect(feed).toBeCalled
})