import React from 'react'
import { useLocalStore } from 'mobx-react'
import { PokemonRepository } from 'repositories/pokemon-repository'

const storeContext = React.createContext(null)

const createStore = () => ({
  isLoading: false,
  pokelist: [],
  setPokelist (pokelist) { this.pokelist = pokelist },
  page: 0,
  // TODO: rename count
  pageCount: 0,
  rowsPerPage: 10,
  filters: {},
  setPage (page) {
    this.page = page
    this.fetchPokelist()
  },

  get maxPage () {
    return this.pageCount && Math.ceil(this.pageCount / this.rowsPerPage)
  },

  get backButtonDisabled () {
    return this.isLoading || (this.page === 0)
  },

  get nextButtonDisabled () {
    return this.isLoading || (this.page + 1 >= this.maxPage)
  },

  // TODO: add to init method in order to set loading
  async fetchPageCount () {
    if (this.filters?.searchText || this.filters?.types?.length) {
      this.pageCount = PokemonRepository.getCount()
    } else {
      this.pageCount = await PokemonRepository.getPokemonsCount()
    }
  },
  setRowsPerPage (rowsPerPage) { this.rowsPerPage = rowsPerPage; this.fetchPokelist() },

  // TODO: pokelistPar
  get getParams () {
    return {
      limit: this.rowsPerPage,
      offset: this.page * this.rowsPerPage,
      filters: this.filters
    }
  },

  async fetchPokelist () {
    this.isLoading = true
    const pokemons = await PokemonRepository.getPokemons(this.getParams)
    this.setPokelist(pokemons)
    this.fetchPageCount()
    this.isLoading = false
  },

  async setFilters (filters) {
    this.filters = filters
    this.setPage(0)
    await this.fetchPokelist()
  }
})

export const StoreProvider = ({ children }) => {
  const store = useLocalStore(createStore)
  return <storeContext.Provider value={store}>{children}</storeContext.Provider>
}

export const useStore = () => {
  const store = React.useContext(storeContext)
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.')
  }
  return store
}
