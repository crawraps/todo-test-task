import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from './app/store'
import App from './App'
import userEvent from '@testing-library/user-event'
import { debug } from 'console'

const renderWithRedux = (component: JSX.Element) => ({
  ...render(<Provider store={store}>{component}</Provider>),
  store,
})

describe('Initial state', () => {
  beforeEach(() => renderWithRedux(<App />))

  it('empty input', () => {
    const input = screen.getByRole('textbox')
    expect(input).toHaveValue('')
  })

  it('no todos placeholder', () => {
    const allBtn = screen.getByText('all')
    const activeBtn = screen.getByText('active')
    const completedBtn = screen.getByText('completed')

    const firstText = /there is nothing here/i
    const secondText = /finished yet/i

    expect(screen.getByText(firstText)).toBeInTheDocument()

    userEvent.click(allBtn)
    expect(screen.getByText(firstText)).toBeInTheDocument()

    userEvent.click(activeBtn)
    expect(screen.getByText(firstText)).toBeInTheDocument()

    debug()

    userEvent.click(completedBtn)
    debug()
    expect(screen.getByText(secondText)).toBeInTheDocument()
  })
})
