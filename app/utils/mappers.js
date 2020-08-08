import { get } from 'lodash'
import { prop } from './collections'

export const mapPokemonFromServerToClient = pokemon => ({
  name: get(pokemon, 'data.name'),
  avatar: get(pokemon, 'data.sprites.front_default'),
  types: get(pokemon, 'data.types', []).map(prop('type.name')),
  // TODO rewrite eslint rule
  /* eslint-disable-next-line */
  abilities: get(pokemon, 'data.abilities', []).map(({is_hidden, ability}) => ({
    /* eslint-disable-next-line */
    hidden: `hidden: ${is_hidden ? 'yes' : 'no'}`,
    name: get(ability, 'name')
  })),
  species: get(pokemon, 'data.species.name'),
  /* eslint-disable-next-line */
  stats: get(pokemon, 'data.stats', []).map(({ base_stat, effort, stat }) => ({
    name: stat.name,
    baseStat: base_stat,
    effort
  })),
  baseExperience: get(pokemon, 'data.base_experience'),
  height: get(pokemon, 'data.height'),
  weight: get(pokemon, 'data.weight')
})
