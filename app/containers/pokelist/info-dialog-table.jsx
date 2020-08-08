import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles({
  table: {
    minWidth: 500
  }
})

export const InfoTable = ({ pokemon }) => {
  const classes = useStyles()

  const rows = pokemon?.stats || []
  return (
    <TableContainer component={Paper}>
      {/* <Table className={classes.table} aria-label="simple table"> */}
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Stat</TableCell>
            <TableCell align="left">Base stat</TableCell>
            <TableCell align="left">Effort</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(({ name, baseStat, effort }) => (
            <TableRow key={name}>
              <TableCell component="th" scope="row">{name}</TableCell>
              <TableCell align="left">{baseStat}</TableCell>
              <TableCell align="left">{effort}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
