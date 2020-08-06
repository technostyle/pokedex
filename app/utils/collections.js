import { get, groupBy, values } from 'lodash'

export const prop = (key, defaultValue) => obj => get(obj, key, defaultValue)
export const equals = to => value => value === to

export const arrayPartition = (array, n) => {
  let index = 0
  const result = groupBy(array, () => Math.floor(index++ / n))
  return values(result)
}
