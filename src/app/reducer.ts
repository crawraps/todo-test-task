import { AnyAction } from '@reduxjs/toolkit'

export type TodoItem = {
  id: number
  label: string
  completed: boolean
}

export type TodoMode = 'all' | 'active' | 'completed'

export interface DefaultState {
  list: TodoItem[]
  mode: TodoMode
}

const defaultState: DefaultState = {
  list: [],
  mode: 'all',
}

export const todo = (state = defaultState, action: AnyAction) => {
  switch (action.type) {
    case 'addItem':
      return { ...state, list: [...state.list, action.payload] }
    case 'removeItems':
      return {
        ...state,
        list: state.list.filter(item => !action.payload.includes(item.id)),
      }
    case 'toggleItem':
      const newList = state.list.map(item => {
        let newItem = { ...item }
        if (item.id === action.payload) {
          newItem.completed = !item.completed
        }
        return newItem
      })

      return { ...state, list: newList }
    case 'setMode':
      return { ...state, mode: action.payload }
    default:
      return state
  }
}

export function addItem(label: string) {
  return {
    type: 'addItem',
    payload: {
      label,
      completed: false,
      id: Date.now(),
    },
  }
}

export function removeItems(...ids: number[]) {
  return {
    type: 'removeItems',
    payload: ids,
  }
}

export function toggleItem(id: number) {
  return {
    type: 'toggleItem',
    payload: id,
  }
}

export function setMode(mode: TodoMode) {
  return {
    type: 'setMode',
    payload: mode,
  }
}
