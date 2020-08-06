import { prop } from 'utils'
import { mapPokemonFromServerToClient } from 'utils/mappers'

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

  getPokemonsByNames = async (names) => {
    try {
      const promises = names.map(this.service.getFullPokemonInfo)
      const rawPokemons = await Promise.all(promises)
      return rawPokemons.map(mapPokemonFromServerToClient)
    } catch (e) {
      throw new Error(e)
    }
  }

  getPokemons = async ({ limit, offset }) => {
    try {
      const rawPokemonsNames = await this.service.getPokemonNames({ limit, offset })
      const pokemonNames = rawPokemonsNames.map(prop('name'))
      return this.getPokemonsByNames(pokemonNames)
    } catch (e) {
      throw new Error(e)
    }
  }
}
