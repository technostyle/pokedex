import { get } from 'lodash'
import { prop } from 'utils'

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

  getPokemons = async ({ limit, offset }) => {
    try {
      const rawPokemonsNames = await this.service.getPokemonNames({ limit, offset })
      const pokemonNames = rawPokemonsNames.map(prop('name'))
      const promises = pokemonNames.map(this.service.getFullPokemonInfo)
      const rawPokemons = await Promise.all(promises)
      return rawPokemons.map(pokemon => ({
        name: get(pokemon, 'data.name'),
        avatar: get(pokemon, 'data.sprites.front_default'),
        types: get(pokemon, 'data.types', []).map(prop('type.name'))
      }))
    } catch (e) {
      throw new Error(e)
    }
  }
}
