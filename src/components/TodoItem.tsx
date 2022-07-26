import React from 'react'
import styled from 'styled-components'
import { useAppDispatch } from '../app/hooks'
import { TodoItem as TodoItemType, toggleItem } from '../app/reducer'

interface TodoItemProps {
  item: TodoItemType
}

function TodoItem({ item, ...props }: TodoItemProps): JSX.Element {
  const dispatch = useAppDispatch()

  const clickHandler = React.useCallback(() => {
    dispatch(toggleItem(item.id))
  }, [item])

  return (
    <Item onClick={clickHandler} {...props}>
      <DoneButton isDone={item.completed} />
      <Label isDone={item.completed}>{item.label}</Label>
    </Item>
  )
}

export default React.memo(TodoItem)

const Item = styled.li`
  display: flex;
  align-items: center;
  padding: 0.8em 0.3em;
  transition: all 0.2s ease-in;
  font-size: 1.2em;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.text}10;
  }
`
const Label = styled.span<StyledProps>`
  margin-left: 0.3em;

  ${props =>
    props.isDone
      ? `
    opacity: 0.6;
    text-decoration: line-through;  
  `
      : ''}
`
const DoneButton = styled.button<StyledProps>`
  border-radius: 50%;
  width: 1em;
  height: 1em;
  margin: 0 0.5em;
  background-color: ${props =>
    props.isDone ? props.theme.primary : 'transparent'};
  border: 1px solid ${props => props.theme.text}36;
  cursor: pointer;
`
interface StyledProps {
  isDone: boolean
}
