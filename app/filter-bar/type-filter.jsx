import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import ListItemText from '@material-ui/core/ListItemText'
import Select from '@material-ui/core/Select'
import Checkbox from '@material-ui/core/Checkbox'
import { prop } from 'utils'
import { pokemonService } from '../services/pokemon-service'
import { observer } from 'mobx-react-lite'
import { useStore } from 'store'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300
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

export const TypeFilter = observer(() => {
  const classes = useStyles()
  const [types, setTypes] = useState([])
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
    store.setFilters({ ...store.filters, types: event.target.value })
  }

  return (
    <div>
      <FormControl className={classes.formControl}>
        <Select
          disabled={store.isLoading}
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<Input />}
          renderValue={(selected) => `Selected ${selected.length}`}
          MenuProps={MenuProps}
        >
          {types.map((type) => (
            <MenuItem key={type} value={type}>
              <Checkbox checked={personName.indexOf(type) > -1} />
              <ListItemText primary={type} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
})
