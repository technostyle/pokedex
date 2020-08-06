import React from 'react'
import { useLocalStore } from 'mobx-react'
import { PokemonRepository } from 'repositories/pokemon-repository' // 6.x or mobx-react-lite@1.4.0

const storeContext = React.createContext(null)

const createStore = () => ({
  isLoading: false,
  pokelist: [],
  setPokelist (pokelist) { this.pokelist = pokelist },
  page: 1,
  pageCount: 500,
  rowsPerPage: 10,
  setPage (page) {
    this.page = page
    this.fetchPokelist()
  },
  setPageCount (pageCount) {
    this.pageCount = pageCount
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
    const response = await PokemonRepository.getPokemons(this.getParams)
    const { pokemons, pokemonsCount } = response
    this.setPokelist(pokemons)
    this.setPageCount(pokemonsCount)
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
    // this is especially useful in TypeScript so you don't need to be checking for null all the time
    throw new Error('useStore must be used within a StoreProvider.')
  }
  return store
}
