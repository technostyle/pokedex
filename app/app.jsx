import React, { useEffect } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'

import { Header } from 'components/header'
import { FilterBar } from './filter-bar'
import { Pokelist } from './pokelist'
import { Pagination } from './pagination'
import { useStore } from './store'
import { observer } from 'mobx-react-lite'

export const App = observer(() => {
  const store = useStore()
  useEffect(() => {
    const fetchPokelist = async () => await store.fetchPokelist()
    // const fetchPageCount = async () => await store.fetchPageCount()
    // TODO: name it on init or something
    fetchPokelist()
    // fetchPageCount()
  }, [])

  return (<>
    <CssBaseline />
    <Container maxWidth="lg">
      <Header text="Pokedex"/>
      <FilterBar />
      <Pokelist pokelist={store.pokelist} isLoading={store.isLoading}/>
      <Pagination />
    </Container>
  </>
  )
})
