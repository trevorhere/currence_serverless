const createStatus = require('../../functions/status/createStatus')
const createStatusEvent = require('../utils/createStatusEvent')

jest.mock('../../data/User', () => jest.requireActual('../../__mocks__/User'))
jest.mock('../../data/Status', () => jest.requireActual('../../__mocks__/Status'))

test('createStatus runs', () => {

    let run = async() => {
        createStatus(createStatusEvent).then(
            res => {
                console.log('res: ', res);
                expect(res).toBeDefined;
            }
        ).catch(e => {
            console.log(e)
        })

    }

    run();

    expect(run).toBeCalled
})