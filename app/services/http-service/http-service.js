import axios from 'axios'

export class HttpService {
  get = async (url, params) => {
    return await axios.get(url, { params })
  }
}
