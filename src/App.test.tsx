import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from './app/store'
import App from './App'
import { debug } from 'console'
import userEvent from '@testing-library/user-event'

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

  it('todos placeholder', () => {
    const allBtn = screen.getByText('all')
    const activeBtn = screen.getByText('active')
    const completedBtn = screen.getByText('completed')

    const firstText = /there is nothing here/i
    const secondText = /finished anything/i

    expect(screen.getByText(firstText)).toBeInTheDocument()

    fireEvent.click(allBtn)
    expect(screen.getByText(firstText)).toBeInTheDocument()

    fireEvent.click(activeBtn)
    expect(screen.getByText(firstText)).toBeInTheDocument()

    fireEvent.click(completedBtn)
    expect(screen.getByText(secondText)).toBeInTheDocument()
  })

  it('initial items left', () => {
    expect(screen.getByText(/0 items left/i)).toBeInTheDocument()
  })
})

describe('Adding todos', () => {
  beforeEach(() => renderWithRedux(<App />))

  it('Input empty string', () => {
    const input = screen.getByRole('textbox')
    fireEvent.keyUp(input, { key: 'Enter', code: 13 })

    expect(screen.getByText(/finished anything/i)).toBeInTheDocument()
  })

  it('Add one element', () => {
    const input = screen.getByRole('textbox')

    expect(input).toHaveValue('')
    fireEvent.input(input, {
      target: { value: 'aaa' },
    })
    expect(input).toHaveValue('aaa')

    fireEvent.keyUp(input, { key: 'Enter', code: 13 })
    expect(input).toHaveValue('')

    expect(screen.getByText(/1 items left/i)).toBeInTheDocument()
  })

  it('Add second element', () => {
    const input = screen.getByRole('textbox')
    fireEvent.input(input, {
      target: { value: 'ooo' },
    })
    expect(input).toHaveValue('ooo')

    fireEvent.keyUp(input, { key: 'Ctrl', code: 17 })
    expect(input).toHaveValue('ooo')

    fireEvent.keyUp(input, { key: 'Enter', code: 13 })
    expect(input).toHaveValue('')

    expect(screen.getByText(/2 items left/i)).toBeInTheDocument()
  })

  it('do one element', () => {
    fireEvent.click(screen.getByText('all'))
    fireEvent.click(screen.getByText('aaa'))

    expect(screen.getByText(/1 items left/i)).toBeInTheDocument()
    expect(screen.getByText('aaa')).toBeInTheDocument()
    expect(screen.getByText('ooo')).toBeInTheDocument()

    fireEvent.click(screen.getByText('active'))
    expect(screen.queryByText('aaa')).toBeNull()
    expect(screen.getByText('ooo')).toBeInTheDocument()

    fireEvent.click(screen.getByText('completed'))
    expect(screen.queryByText('ooo')).toBeNull()
    expect(screen.getByText('aaa')).toBeInTheDocument()
  })

  it('clear completed', () => {
    fireEvent.click(screen.getByText('Clear completed'))

    expect(screen.getByText(/finished anything/i)).toBeInTheDocument()

    fireEvent.click(screen.getByText('active'))
    expect(screen.getByText('ooo')).toBeInTheDocument()

    fireEvent.click(screen.getByText('all'))
    expect(screen.getByText('ooo')).toBeInTheDocument()
  })
})
