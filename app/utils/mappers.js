import { get } from 'lodash'
import { prop } from './collections'

export const mapPokemonFromServerToClient = pokemon => ({
  name: get(pokemon, 'data.name'),
  avatar: get(pokemon, 'data.sprites.front_default'),
  types: get(pokemon, 'data.types', []).map(prop('type.name')),
  abilities: get(pokemon, 'data.abilities', []).map(prop('ability.name')),
  species: get(pokemon, 'data.species.name'),
  /* eslint-disable-next-line */
  stats: get(pokemon, 'data.stats', []).map(({ base_stat, effort, stat }) => ({
    name: stat.name,
    base_stat,
    effort
  })),
  height: get(pokemon, 'data.height'),
  weight: get(pokemon, 'data.weight')
})
