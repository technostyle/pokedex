import { get } from 'lodash'
import { REQUEST_URL } from 'api/constants'
import { request } from 'api/http'
import { prop } from 'utils'

export class PokemonService {
  // TODO: this.httpService ?
  constructor () {
  }

  getPokemons = async (limitOffset) => {
    let pokemonsRawList
    try {
      pokemonsRawList = await request.get(`${REQUEST_URL}/pokemon`, limitOffset)
      pokemonsRawList = get(pokemonsRawList, 'data.results', [])
    } catch (e) {
      throw new Error(e)
    }

    return await this.getPokemonForm(pokemonsRawList)
  }

  getPokemonForm = async (pokemonsRawList) => {
    const promiseCreator = ({ name }) => request.get(`${REQUEST_URL}/pokemon-form/${name}`)
    const promises = pokemonsRawList.map(promiseCreator)

    try {
      return (await Promise.all(promises))
        // TODO stick maps
        .map(prop('data'))
        .map(item => ({ avatar: get(item, 'sprites.front_default'), type: get(item, 'version_group.name'), id: get(item, 'id'), name: get(item, 'name') }))
    } catch (e) {
      throw new Error(e)
    }
  }
}
