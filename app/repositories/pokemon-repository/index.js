import { pokemonService } from 'services/pokemon-service'
import { PokemonRepository } from './pokemon-repository'

export const pokemonRepository = new PokemonRepository(pokemonService)
