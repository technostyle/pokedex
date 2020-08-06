import { PokemonService } from 'services'
import { PokemonHandler as PokemonHandlerFabric } from './pokemon-handler'

export const PokemonHandler = new PokemonHandlerFabric(PokemonService)
