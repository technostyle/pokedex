import { pickBy, identity } from 'lodash'
import { prop } from 'utils'

export class FilterRepository {
  constructor (pokemonService) {
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
}
