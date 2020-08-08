import { prop } from 'utils'
import { mapPokemonFromServerToClient } from 'utils/mappers'
import { asyncDebounce } from '../../utils/async-debounce'

const FILTER_DEBOUNCE_TIME = 300

export class PokemonRepository {
  constructor (pokemonService) {
    this.service = pokemonService
    this.allPokemonNames = []
    this.storeAllPokemonNames()
    this.count = 0
  }

  storeAllPokemonNames = async () => {
    try {
      const count = this.service.getPokemonsCount()
      const allPokemons = await this.service.getPokemons({ limit: count, offset: 0 })
      this.allPokemonNames = allPokemons.map(prop('name'))
    } catch (e) {
      throw new Error(e)
    }
  }

  getCount () {
    return this.count
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

  getPokemons = async ({ filters, limit, offset }) => {
    if (filters && filters.searchText) {
      return await this.getPokemonsFilteredBySubstring(filters.searchText, limit, offset)
    }

    try {
      const rawPokemonsNames = await this.service.getPokemonNames({ limit, offset })
      const pokemonNames = rawPokemonsNames.map(prop('name'))
      return this.getPokemonsByNames(pokemonNames)
    } catch (e) {
      throw new Error(e)
    }
  }

  getPokemonNamesBySubstring = (substring, limit, offset) => {
    const substr = substring.toLowerCase()
    const filteredByName = this.allPokemonNames.filter(name => name.includes(substr))
    this.count = filteredByName.length
    return filteredByName.slice(offset, offset + limit)
  }

  getPokemonsFilteredBySubstring = asyncDebounce(async (substring, limit, offset) => {
    const pokemonNames = this.getPokemonNamesBySubstring(substring, limit, offset)
    return await this.getPokemonsByNames(pokemonNames)
  }, FILTER_DEBOUNCE_TIME);
}
