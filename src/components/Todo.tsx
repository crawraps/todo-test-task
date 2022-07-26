import React, { KeyboardEvent } from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { addItem, TodoItem, TodoMode } from '../app/reducer'
import Input from './Input'
import TodoFooter from './TodoFooter'
import TodoList from './TodoList'

export default function Todo(): JSX.Element {
  const dispatch = useAppDispatch()
  const mode: TodoMode = useAppSelector(state => state.todo.mode)
  const list: TodoItem[] = useAppSelector(state => state.todo.list)

  const inputEnterHandler = (value: string) => {
    if (!value) return
    dispatch(addItem(value))
  }

  const computedList = React.useMemo(() => {
    switch (mode) {
      case 'all':
        return list
      case 'active':
        return list.filter(item => !item.completed)
      case 'completed':
        return list.filter(item => item.completed)
    }
  }, [list, mode])

  return (
    <Container>
      <Label>Todo list</Label>
      <Content>
        <Input onEnter={inputEnterHandler} placeholder='What should I do...' />
        <TodoList list={computedList} />
        <TodoFooter />
      </Content>
    </Container>
  )
}

const Container = styled.div`
  margin: auto;
  width: 500px;
  display: flex;
  flex-direction: column;
`
const Content = styled.div`
  box-shadow: ${props => props.theme.shadows[1]};
  background-color: ${props => props.theme.background};
  border-radius: ${props => props.theme.radius};
  overflow: hidden;
`
const Label = styled.h1`
  width: 100%;
  text-align: center;
`
