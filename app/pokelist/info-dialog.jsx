import React from 'react'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import Typography from '@material-ui/core/Typography'
import { observer } from 'mobx-react-lite'
import { useStore } from 'store'
import { flow } from 'lodash'
import { equals, prop } from '../utils'

export const InfoDialog = observer(({ open, onClose, pokemonName }) => {
  const store = useStore()
  const pokelist = store.pokelist
  const pokemon = pokelist.find(flow(prop('name'), equals(pokemonName)))

  return (
    <div>
      <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
        <Typography variant="subtitle1">Selected</Typography>
        <DialogTitle id="simple-dialog-title">{pokemonName}</DialogTitle>
        {pokemon && <div> {`species : ${pokemon.species}`} </div>}
        {pokemon && <div> {`height : ${pokemon.height}`} </div>}
        {pokemon && <div> {`weight : ${pokemon.weight}`} </div>}
        {pokemon && <div> {pokemon.abilities.map(ability => <div key={ability}> {`ability: ${ability}`} </div>)} </div>}
        {pokemon && <div> {pokemon.avatar} </div>}
        {pokemon && <div> {pokemon.type} </div>}
        <div> {pokelist.length} </div>
      </Dialog>
    </div>
  )
})
