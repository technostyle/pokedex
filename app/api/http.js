import axios from 'axios'

export const get = async (url, params) => {
  return await axios.get(url, { params })
}

export const request = { get }
