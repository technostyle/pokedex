import React from 'react'
import { useLocalStore } from 'mobx-react'
import { PokemonRepository } from 'repositories/pokemon-repository'
import { FilterRepository } from 'repositories/filter-repository'

const storeContext = React.createContext(null)

const createStore = () => ({
  isLoading: false,
  pokelist: [],
  setPokelist (pokelist) { this.pokelist = pokelist },
  page: 0,
  pageCount: 500,
  rowsPerPage: 10,
  setPage (page) {
    this.page = page
    this.fetchPokelist()
  },
  // TODO: add to init method in order to set loading
  async fetchPageCount (pageCount) {
    this.pageCount = await PokemonRepository.getPokemonsCount()
  },
  setRowsPerPage (rowsPerPage) { this.rowsPerPage = rowsPerPage; this.fetchPokelist() },
  get getParams () {
    return {
      limit: this.rowsPerPage,
      offset: this.page * this.rowsPerPage
    }
  },

  async fetchPokelist () {
    this.isLoading = true
    const pokemons = await PokemonRepository.getPokemons(this.getParams)
    this.setPokelist(pokemons)
    this.isLoading = false
  },

  async filterPokemonsBySubstring (searchText) {
    this.isLoading = true
    this.pokelist = await FilterRepository.getPokemonsFilteredBySubstring(searchText)
    this.isLoading = false
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
