import React, { Component } from 'react'
import styled, { css } from 'styled-components'

const inputStyle = css`
  border: 1px solid #ccc;
  border-radius: 5px;
  height: 40px;
  width: 100%;
  padding: 5px 20px;
  color: #55595c;

  font-size: 20px;
  &:focus {
    border-color: #66afe9;
    outline: none;
  }
`

const Input = styled.input`
  ${inputStyle};
`

const T = styled.textarea`
  ${inputStyle};
  height: 150px;
`
export const TextArea = props => <T {...props} />

export default props => <Input type="text" {...props} />
