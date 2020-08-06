import { pickBy, identity } from 'lodash'

export class PokemonRepository {
  constructor (pokemonService) {
    this.service = pokemonService
  }

  getPokemonsCount = async () => {
    try {
      return this.service.getPokemonsCount()
    } catch (e) {
      throw new Error(e)
    }
  }

  // TODO: refactor
  getPokemons = async ({ limit, offset }) => {
    let response = { results: [], count: 0 }
    // filtering empty values
    const params = pickBy({ limit, offset }, identity)
    try {
      response = this.service.getPokemons(params)
    } catch (e) {
      throw new Error(e)
    }

    return response
  }
}
