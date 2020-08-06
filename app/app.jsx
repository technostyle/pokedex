import React, { useState, useEffect } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'

import { Title } from './title'
import { FilterBar } from './filter-bar'
import { Pokelist } from './pokelist'
import { Pagination } from './pagination'
import { PokemonHandler } from 'data-handler'
import { StoreProvider, useStore } from './store'
import { observer } from 'mobx-react-lite'

export const App = observer(() => {
  const store = useStore()

  useEffect(() => {
    const fetchPokelist = async () => {
      const pokelistResponse = await PokemonHandler.getPokemons({ limit: 10, offset: 10 })
      store.setPokelist(pokelistResponse)
    }

    fetchPokelist()
  }, [])

  return (<>
    <CssBaseline />
    <Container maxWidth="lg">
      <Title text="Pokedex"/>
      <FilterBar />
      <Pokelist pokelist={store.pokelist}/>
      <Pagination />
    </Container>
  </>
  )
})
