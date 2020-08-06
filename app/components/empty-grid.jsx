import React from 'react'
import Grid from '@material-ui/core/Grid'

export const EmptyGrid = ({ title }) => (
  <Grid container item xs={12} spacing={3}>
    <Grid item xs={4}/>
    <Grid item xs={4}>
      <h1>{title}</h1>
    </Grid>
    <Grid item xs={4}/>
  </Grid>
)
