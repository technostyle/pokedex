import { get } from 'lodash'
import { prop } from './collections'

/* eslint-disable camelcase */
export const mapPokemonFromServerToClient = pokemon => ({
  name: get(pokemon, 'data.name'),
  avatar: get(pokemon, 'data.sprites.front_default'),
  types: get(pokemon, 'data.types', []).map(prop('type.name')),
  abilities: get(pokemon, 'data.abilities', []).map(({ is_hidden, ability }) => ({
    hidden: `${is_hidden ? 'hidden' : ''}`,
    name: get(ability, 'name')
  })),
  species: get(pokemon, 'data.species.name'),
  stats: get(pokemon, 'data.stats', []).map(({ base_stat, effort, stat }) => ({
    name: stat.name,
    baseStat: base_stat,
    effort
  })),
  baseExperience: get(pokemon, 'data.base_experience'),
  height: get(pokemon, 'data.height'),
  weight: get(pokemon, 'data.weight')
})
/* eslint-enable camelcase */
