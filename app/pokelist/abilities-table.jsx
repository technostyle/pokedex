import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

// TODO: AbilitiesList
export const AbilitiesTable = ({ pokemon }) => {
  const abilities = pokemon?.abilities || []

  return (
    <List>
      {
        abilities.map(({ name, hidden }) => (
          <ListItem key={name}>
            <ListItemText
              primary={name}
              secondary={hidden}
            />
          </ListItem>
        ))
      }
    </List>
  )
}
