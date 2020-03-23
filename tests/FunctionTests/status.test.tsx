const createStatus = require('../../functions/status/createStatus')
const createStatusEvent = require('../utils/createStatusEvent')

jest.mock('../../data/User', () => jest.requireActual('../../__mocks__/User'))
jest.mock('../../data/Status', () => jest.requireActual('../../__mocks__/Status'))

test('createStatus runs', async () => {

    let res = await createStatus.createStatus(createStatusEvent)
    expect(res).toBeDefined;

})