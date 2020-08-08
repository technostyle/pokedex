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
    const init = async () => { await store.init() }
    init()
  }, [])

  return (<>
    <CssBaseline />
    <Container maxWidth="lg">
      <Header text="Pokedex"/>
      <FilterBar />
      <Pokelist />
      <Pagination />
    </Container>
  </>
  )
})
