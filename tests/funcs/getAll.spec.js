const axios = require('axios')
const redis = require('ioredis')

const fixture = require('../worldometer-countries-fixture')
const getAll = require('../../funcs/getAll')

jest.mock('ioredis')
jest.mock('axios')
redis.set = jest.fn()

describe('getAll API', () => {
  beforeEach(() => {
    axios.get.mockClear()
    redis.set.mockClear()
  })
  it('scrapes for data', async () => {
    axios.get.mockResolvedValue({ data: fixture, status: 200 })

    const result = await getAll([], redis)
    const { updated, ...rest } = result

    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(redis.set).toHaveBeenCalledTimes(1)
    expect(rest).toMatchSnapshot()
    expect(result).toMatchObject({
      cases: 399093,
      deaths: 17365,
      recovered: 103748,
    })
  })

  it('handles empty response from worldometer', async () => {
    axios.get.mockResolvedValue({ data: '', status: 200 })

    const result = await getAll([], redis)
    const { updated, ...rest } = result

    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(redis.set).toHaveBeenCalledTimes(1)
    expect(rest).toMatchSnapshot()
    expect(Object.keys(result)).toEqual(['updated'])
  })
})
