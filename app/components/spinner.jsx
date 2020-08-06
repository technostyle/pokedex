import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Fade from '@material-ui/core/Fade'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'

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
