import React from 'react'
import ReactDOM from 'react-dom'
import 'mobx-react-lite/batchingForReactDom'
import 'fontsource-roboto'
import { App } from './app'
import { StoreProvider } from './store'

ReactDOM.render(<StoreProvider><App/></StoreProvider>, document.getElementById('root'))
