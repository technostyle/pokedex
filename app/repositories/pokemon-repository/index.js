import { PokemonService } from 'services'
import { PokemonRepository as PokemonRepositoryFabric } from './pokemon-repository'

export const PokemonRepository = new PokemonRepositoryFabric(PokemonService)
