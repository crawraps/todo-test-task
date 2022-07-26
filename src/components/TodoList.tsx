import React from 'react'
import styled from 'styled-components'
import { useAppSelector } from '../app/hooks'
import { TodoItem as TodoItemType, TodoMode } from '../app/reducer'
import TodoItem from './TodoItem'

interface TodoListProps {
  list: TodoItemType[]
}

export default function TodoList({
  list,
  ...props
}: TodoListProps): JSX.Element {
  const mode: TodoMode = useAppSelector(state => state.todo.mode)

  const noItemsText = React.useMemo(() => {
    if (mode === 'completed') return `Haven't finished anything yet?`
    return `There is nothing here... yet.`
  }, [mode])

  const items = React.useMemo(() => {
    if (list.length) {
      return list.map(item => <TodoItem item={item} key={item.id} />)
    } else {
      return <NoItems>{noItemsText}</NoItems>
    }
  }, [list])

  return <List>{items}</List>
}

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  letter-spacing: 0.3px;
  font-weight: 400;
  color: ${props => props.theme.text};
`

const NoItems = styled.li`
  text-align: center;
  padding: 1.4em 0;
`
