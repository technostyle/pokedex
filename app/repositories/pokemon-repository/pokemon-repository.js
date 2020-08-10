import { flatten, uniq } from 'lodash'
import { prop } from 'utils/collections'
import { mapPokemonFromServerToClient } from 'utils/mappers'
import { asyncDebounce } from 'utils/async-debounce'

const FILTER_DEBOUNCE_TIME = 300

export class PokemonRepository {
  constructor (pokemonService) {
    this.service = pokemonService
    this.allPokemonNames = []
    this.count = 0
  }

  init = async () => {
    await this.storeAllPokemonNames()
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

  getPageCount = () => {
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
    const pokemonNames = await this.getPokemonNames({ filters, limit, offset })
    return await this.getPokemonsByNames(pokemonNames)
  }

  getFilteredPokemonNames = asyncDebounce(async (filters) => {
    let pokemonNames = this.allPokemonNames

    if (filters?.types?.length) {
      pokemonNames = await this.getPokemonNamesByTypes(filters.types)
    }

    if (filters?.searchText) {
      pokemonNames = pokemonNames.filter(name => name.includes(filters.searchText.toLowerCase()))
    }

    return pokemonNames
  }, FILTER_DEBOUNCE_TIME)

  getPokemonNames = async ({ filters, limit, offset }) => {
    let pokemonNames = this.allPokemonNames

    if (filters?.types?.length || filters?.searchText) {
      pokemonNames = await this.getFilteredPokemonNames(filters)
    }

    this.count = pokemonNames.length
    return pokemonNames.slice(offset, offset + limit)
  }
}
