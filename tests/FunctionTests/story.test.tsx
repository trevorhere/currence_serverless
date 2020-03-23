const getStory = require('../../functions/story/index')
const storyEvent = require('../utils/storyEvent')
jest.mock('../../data/User', () => jest.requireActual('../../__mocks__/User'))
jest.mock('../../data/Status', () => jest.requireActual('../../__mocks__/Status'))

test('getStory runs', async () => {
    let res = await getStory.getStory(storyEvent)
    expect(res).toBeDefined;

})