import { pickBy, identity } from 'lodash'

export class PokemonHandler {
  constructor (pokemonService) {
    this.service = pokemonService
  }

  // TODO: refactor
  getPokemons = async ({ limit, offset }) => {
    let pokemons
    const params = pickBy({ limit, offset }, identity)
    try {
      pokemons = this.service.getPokemons(params)
    } catch (e) {
      throw new Error(e)
    }

    return pokemons
  }
}
