import { isEmpty, flatten, uniq } from 'lodash'
import { prop } from 'utils'
import { mapPokemonFromServerToClient } from 'utils/mappers'
import { asyncDebounce } from 'utils/async-debounce'

const FILTER_DEBOUNCE_TIME = 300

export class PokemonRepository {
  constructor (pokemonService) {
    this.service = pokemonService
    this.allPokemonNames = []
    this.filteredPokemonNames = []
    this.storeAllPokemonNames()
    this.count = 0
  }

  getPokemonNamesByTypes = async (types) => {
    const promises = types.map(this.service.getPokemonNamesByType)
    const pokemonNamesCollections = await Promise.all(promises)
    return uniq(flatten(pokemonNamesCollections))
  }

  storeAllPokemonNames = async () => {
    try {
      const count = await this.service.getPokemonsCount()
      const allPokemons = await this.service.getPokemonNames({ limit: count, offset: 0 })
      this.allPokemonNames = allPokemons.map(prop('name'))
    } catch (e) {
      throw new Error(e)
    }
  }

  getCount () {
    return this.count
  }

  async getPageCount () {
    if (this.filters?.searchText || this.filters?.types?.length) {
      return this.count
    } else {
      return await this.getPokemonsCount()
    }
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
    this.filters = filters

    if (!isEmpty(filters)) {
      return await this.getFilteredPokemons(filters, limit, offset)
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
    const filteredByName = this.filteredPokemonNames.filter(name => name.includes(substr))
    this.count = filteredByName.length
    return filteredByName.slice(offset, offset + limit)
  }

  getFilteredPokemons = asyncDebounce(async (filters, limit, offset) => {
    this.filteredPokemonNames = this.allPokemonNames
    const { searchText, types } = filters
    if (types?.length) {
      const pokemonNamesByTypes = await this.getPokemonNamesByTypes(types)
      this.filteredPokemonNames = pokemonNamesByTypes
      this.count = pokemonNamesByTypes.length
    }

    const pokemonNames = this.getPokemonNamesBySubstring(searchText, limit, offset)
    return await this.getPokemonsByNames(pokemonNames)
  }, FILTER_DEBOUNCE_TIME);
}
