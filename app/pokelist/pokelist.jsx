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
import { useWindowSize } from '../hooks/window-size'

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1
  }
}))

const FormRow = ({ row, onCardClick, cols }) => {
  return (
    <React.Fragment>
      {row.map(({ name, avatar, types, baseExperience, height, weight }, idx) => (
        <Grid key={idx} item xs={12 / cols}>
          <Pokecard name={name} avatar={avatar} types={types} baseExperience={baseExperience} height={height} weight={weight} onCardClick={onCardClick}/>
        </Grid>
      ))}
    </React.Fragment>
  )
}

const getCols = width => {
  if (width < 360) {
    return 1
  }

  if (width < 720) {
    return 2
  }

  if (width < 1024) {
    return 3
  }

  return 4
}
export const Pokelist = observer(() => {
  const store = useStore()

  const [isInfoModalOpen, setInfoModalOpen] = useState(false)
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const windowSize = useWindowSize()

  const onCardClick = (name) => {
    setInfoModalOpen(true)
    setSelectedPokemon(name)
  }
  const onInfoModalClose = () => {
    setInfoModalOpen(false)
    setSelectedPokemon(null)
  }

  const classes = useStyles()

  const cols = getCols(windowSize.width)
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
                  <FormRow row={row} onCardClick={onCardClick} cols={cols}/>
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
