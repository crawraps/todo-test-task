import React from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { removeItems, setMode, TodoItem, TodoMode } from '../app/reducer'

export default function TodoFooter(): JSX.Element {
  const dispatch = useAppDispatch()
  const list: TodoItem[] = useAppSelector(state => state.todo.list)
  const mode: TodoMode = useAppSelector(state => state.todo.mode)

  const leftItems = React.useMemo(
    () => list.filter(item => !item.completed).length,
    [list]
  )

  const clearCompleted = React.useCallback(() => {
    dispatch(
      removeItems(...list.filter(item => item.completed).map(item => item.id))
    )
  }, [list])

  return (
    <Container>
      <span>{leftItems} items left</span>
      <Buttons>
        <RadioButton mode={mode} buttonMode='all' />
        <RadioButton mode={mode} buttonMode='active' />
        <RadioButton mode={mode} buttonMode='completed' />
      </Buttons>
      <ClearButton onClick={clearCompleted}>Clear completed</ClearButton>
    </Container>
  )
}

function RadioButton({
  mode,
  buttonMode,
}: {
  mode: TodoMode
  buttonMode: TodoMode
}): JSX.Element {
  const dispatch = useAppDispatch()
  const changeMode = React.useCallback(() => {
    dispatch(setMode(buttonMode))
  }, [buttonMode])

  return (
    <Radio onClick={changeMode} isActive={mode === buttonMode}>
      {buttonMode}
    </Radio>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  padding: 0.5em 1em;
  color: ${props => props.theme.text};
  font-weight: 300;
`
const Buttons = styled.div`
  display: flex;
`
const Radio = styled.button<RadioProps>`
  border: none;
  background-color: ${props =>
    props.isActive ? props.theme.primary : 'transparent'};
  color: ${props => (props.isActive ? 'white' : props.theme.text)};
  border-radius: ${props => props.theme.radius};
  margin: 0 4px;
  cursor: pointer;

  &:hover {
    background-color: ${props =>
      props.isActive ? props.theme.primary : `${props.theme.primary}44`};
  }

  &::first-letter {
    text-transform: uppercase;
  }
`
const ClearButton = styled.button`
  border: none;
  background-color: transparent;
  color: ${props => props.theme.text};
  border-radius: ${props => props.theme.radius};
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.primary};
    color: white;
  }
`

interface RadioProps {
  isActive: boolean
}
