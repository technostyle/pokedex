import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'

import { Title } from './title'
import { SearchBar } from './search-bar'
import { Pokelist } from './pokelist'
import { Pagination } from './pagination'

export const App = () => (<>
  <CssBaseline />
  <Container maxWidth="md">
    <Title text="Pokedex"/>
    <SearchBar />
    <Pokelist />
    <Pagination />
  </Container>
</>)
