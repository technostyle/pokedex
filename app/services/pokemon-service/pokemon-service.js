import { get } from 'lodash'
import { REQUEST_URL } from 'api/constants'
import { request } from 'api/http'
import { prop } from 'utils'

export class PokemonService {
  constructor (httpService) {
    this.httpService = httpService
  }

  getPokemonsCount = async () => {
    try {
      const pokemonsResponse = await this.httpService.get(`${REQUEST_URL}/pokemon`)
      return get(pokemonsResponse, 'data.count', 0)
    } catch (e) {
      throw new Error(e)
    }
  }

  // TODO: rename limitOffset to params
  getPokemonNames = async (limitOffset) => {
    try {
      const pokemonsResponse = await this.httpService.get(`${REQUEST_URL}/pokemon`, limitOffset)
      return get(pokemonsResponse, 'data.results', [])
    } catch (e) {
      throw new Error(e)
    }
  }

  getFullPokemonInfo = async (name) => {
    try {
      return await request.get(`${REQUEST_URL}/pokemon/${name}`)
    } catch (e) {
      throw new Error(e)
    }
  }

  getPokemonTypes = async () => {
    let pokemonTypes, pokemonTypesCount
    // TODO: move api logic to pokemon-repository
    try {
      const pokemonsResponse = await this.httpService.get(`${REQUEST_URL}/type`)
      pokemonTypesCount = get(pokemonsResponse, 'data.count', 0)
      pokemonTypes = get(pokemonsResponse, 'data.results', [])
    } catch (e) {
      throw new Error(e)
    }

    return { pokemonTypes, pokemonTypesCount }
  }

  // TODO: move api logic to pokemon-repository
  getPokemonNamesByType = async (type) => {
    try {
      const typeResponse = await this.httpService.get(`${REQUEST_URL}/type/${type}`)
      return get(typeResponse, 'data.pokemon', []).map(prop('pokemon.name'))
    } catch (e) {
      throw new Error(e)
    }
  }
}
