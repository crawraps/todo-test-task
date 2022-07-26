import React, { InputHTMLAttributes, KeyboardEvent } from 'react'
import styled from 'styled-components'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  initialValue?: string
  onEnter: (value: string) => void
}

export default function Input({
  initialValue = '',
  onEnter,
  ...props
}: InputProps): JSX.Element {
  const onEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return

    onEnter(event.target.value)
    event.target.value = ''
  }

  return <StyledInput type='text' {...props} onKeyUp={onEnterHandler} />
}

const StyledInput = styled.input`
  width: 100%;
  padding: 0.5em 0.3em;
  box-sizing: border-box;
  border: none;
  background-color: ${props => props.theme.background};
  box-shadow: ${props => props.theme.shadows[0]};
  font-family: Roboto;
  font-weight: 400;
  font-size: 16px;

  &::placeholder {
    font-style: italic;
    font-weight: 300;
  }
`
