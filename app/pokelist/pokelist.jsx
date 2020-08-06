import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { arrayPartition } from 'utils'
import { Pokecard } from './pokecard'
import { useStore } from '../store'
import { observer } from 'mobx-react-lite'
import { Spinner } from '../components/spinner'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  }
}))

const FormRow = ({ row }) => {
  const classes = useStyles()

  return (
    <React.Fragment>
      {row.map(({ name, avatar, type }, idx) => (<Grid key={idx} item xs={4}>
        <Pokecard name={name} avatar={avatar} type={type}/>
      </Grid>
      ))}
    </React.Fragment>
  )
}

export const Pokelist = ({ pokelist, isLoading }) => {
  const classes = useStyles()

  const cols = 3
  const rowsList = arrayPartition(pokelist, cols)

  return (
    <div className={classes.root}>
      {
        isLoading
          ? <Spinner/>
          : <Grid container spacing={1}>
            {/* TODO: make proper idx */}
            {rowsList.map((row, idx) => (
              <Grid key={idx} container item xs={12} spacing={3}>
                <FormRow row={row}/>
              </Grid>
            ))}
          </Grid>
      }
    </div>
  )
}
