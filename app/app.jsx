import React, { useEffect } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'

import { Title } from './title'
import { FilterBar } from './filter-bar'
import { Pokelist } from './pokelist'
import { Pagination } from './pagination'
import { useStore } from './store'
import { observer } from 'mobx-react-lite'
import { Spinner } from './components/spinner'

export const App = observer(() => {
  const store = useStore()
  useEffect(store.fetchPokelist, [])

  return (<>
    <CssBaseline />
    <Container maxWidth="lg">
      <Title text="Pokedex"/>
      <FilterBar />
      <Pokelist pokelist={store.pokelist} isLoading={store.isLoading}/>
      <Pagination />

    </Container>
  </>
  )
})
