import { debounce } from 'lodash'
import { prop } from 'utils'
import { asyncDebounce } from '../../utils/async-debounce'

const FILTER_DEBOUNCE_TIME = 300

export class FilterRepository {
  constructor (pokemonRepository, pokemonService) {
    this.repository = pokemonRepository
    this.service = pokemonService
    this.allPokemonNames = []
    this.storeAllPokemonNames()
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

  getPokemonNamesBySubstring = substring => {
    const substr = substring.toLowerCase()
    return this.allPokemonNames.filter(name => name.includes(substr))
  }

  getPokemonsFilteredBySubstring = asyncDebounce(async (substring) => {
    const pokemonNames = this.getPokemonNamesBySubstring(substring)
    return await this.repository.getPokemonsByNames(pokemonNames)
  }, FILTER_DEBOUNCE_TIME);
}
