import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  button: {
    margin: theme.spacing(2)
  },
  placeholder: {
    height: 40
  }
}))

export const Spinner = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.placeholder}>
        <CircularProgress />
      </div>
    </div>
  )
}
