import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { arrayPartition } from 'utils'
import { Pokecard } from './pokecard'
import { Spinner } from '../components/spinner'
import { InfoDialog } from './info-dialog'
import { EmptyGrid } from '../components/empty-grid'
import { useStore } from '../store'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  }
}))

const FormRow = ({ row, onCardClick }) => {
  return (
    <React.Fragment>
      {row.map(({ name, avatar, types, baseExperience, height, weight }, idx) => (
        <Grid key={idx} item xs={4}>
          <Pokecard name={name} avatar={avatar} types={types} baseExperience={baseExperience} height={height} weight={weight} onCardClick={onCardClick}/>
        </Grid>
      ))}
    </React.Fragment>
  )
}

export const Pokelist = observer(() => {
  const store = useStore()

  const [isInfoModalOpen, setInfoModalOpen] = useState(false)
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const onCardClick = (name) => {
    setInfoModalOpen(true)
    setSelectedPokemon(name)
  }
  const onInfoModalClose = () => {
    setInfoModalOpen(false)
    setSelectedPokemon(null)
  }

  const classes = useStyles()

  const cols = 3
  const rowsList = arrayPartition(store.pokelist, cols)

  return (
    <div className={classes.root}>
      {
        store.isLoading
          ? <Spinner/>
          : <Grid container spacing={1}>
            {/* TODO: make proper idx */}
            {rowsList.length
              ? rowsList.map((row, idx) => (
                <Grid key={idx} container item xs={12} spacing={3}>
                  <FormRow row={row} onCardClick={onCardClick}/>
                </Grid>
              ))
              : <EmptyGrid title='No Pokemons'/>
            }
            <InfoDialog open={isInfoModalOpen} onClose={onInfoModalClose} pokemonName={selectedPokemon}/>
          </Grid>
      }
    </div>
  )
})
