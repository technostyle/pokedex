import { httpService } from '../http-service'
import { PokemonService } from './pokemon-service'

export const pokemonService = new PokemonService(httpService)
