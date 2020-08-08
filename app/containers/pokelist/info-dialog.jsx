import React from 'react'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import { observer } from 'mobx-react-lite'
import { useStore } from 'store'
import { flow } from 'lodash'
import { equals, prop } from '../../utils'
import { InfoTable } from './info-dialog-table'
import { AbilitiesList } from './abilities-list'

export const InfoDialog = observer(({ open, onClose, pokemonName }) => {
  const store = useStore()
  const pokelist = store.pokelist
  if (!pokelist) {
    return null
  }
  const pokemon = pokelist.find(flow(prop('name'), equals(pokemonName)))

  return (
    <div>
      <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">{pokemonName}</DialogTitle>
        {pokemon && <AbilitiesList pokemon={pokemon}/> }
        {pokemon && <InfoTable pokemon={pokemon}/>}
      </Dialog>
    </div>
  )
})
