import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Chip from '@material-ui/core/Chip'
import { useStore } from '../store'
import { pokemonService } from '../services/pokemon-service'
import { prop } from '../utils'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: 2
  },
  noLabel: {
    marginTop: theme.spacing(3)
  }
}))

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

function getStyles (name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  }
}

export const TypeTagsSelect = observer(() => {
  const classes = useStyles()
  const [types, setTypes] = useState([])

  const theme = useTheme()
  const [personName, setPersonName] = React.useState([])

  const store = useStore()

  useEffect(() => {
    const fetchPokemonTypes = async () => {
      const { pokemonTypes } = await pokemonService.getPokemonTypes()
      setTypes((pokemonTypes || []).map(prop('name')))
    }

    fetchPokemonTypes()
  }, [])

  const handleChange = (event) => {
    setPersonName(event.target.value)
  }

  const onDeleteType = (value) => {
    setPersonName(personName.filter(item => item !== value))
  }

  useEffect(() => {
    store.setFilters({ ...store.filters, types: personName })
  }, [personName])

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-chip-label">Select types</InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  className={classes.chip}
                  variant='outlined'
                  color='primary'
                  onDelete={() => onDeleteType(value)}
                  onMouseDown={event => event.stopPropagation()}
                />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {types.map((name) => (
            <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
})
