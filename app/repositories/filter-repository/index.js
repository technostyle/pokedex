import { PokemonService } from 'services'
import { PokemonRepository } from 'repositories/pokemon-repository'
import { FilterRepository as FilterRepositoryFabric } from './filter-repository'

export const FilterRepository = new FilterRepositoryFabric(PokemonRepository, PokemonService)
