import React, { useEffect } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'

import { Header } from 'components/header'
import { FilterBar } from './containers/filter-bar'
import { Pokelist } from './containers/pokelist'
import { Pagination } from './containers/pagination'
import { useStore } from './store'
import { observer } from 'mobx-react-lite'
import { TypeTagsSelect } from './containers/filter-bar/type-tags-select'

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
      <TypeTagsSelect/>
      <Pokelist />
      <Pagination />
    </Container>
  </>
  )
})
