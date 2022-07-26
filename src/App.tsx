import React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { store } from './app/store'
import { Colorscheme } from './colorscheme'
import Todo from './components/Todo'

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={Colorscheme}>
        <Todo></Todo>
      </ThemeProvider>
    </Provider>
  )
}

export default App
