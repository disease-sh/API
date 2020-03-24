const axios = require('axios')
const redis = require('ioredis')

const fixture = require('../worldometer-states-fixture')
const getStates = require('../../funcs/getStates')

jest.mock('ioredis')
jest.mock('axios')
redis.set = jest.fn()

describe('getStatesAPI API', () => {
  beforeEach(() => {
    axios.get.mockClear()
    redis.set.mockClear()
  })

  it('scrapes for states data', async () => {
    axios.get.mockResolvedValue({ data: fixture, status: 200 })

    const result = await getStates([], redis)
    // Filter out 'updated', since this will always change between runs.
    const { updated, ...rest } = result

    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(redis.set).toHaveBeenCalledTimes(1)
    expect(result).toHaveLength(53)
    expect(rest).toMatchSnapshot()
  })
})
