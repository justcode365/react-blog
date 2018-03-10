import React from 'react'
import styled from 'styled-components'

export default ({ children, ...props }) => <Form {...props}>{children}</Form>

const Form = styled.form`
  header {
    text-align: center;
    margin-bottom: 20px;
  }

  input[type='text'],
  input[type='password'],
  input[type='email'],
  textarea {
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 5px;
    height: 50px;
    width: 100%;
    padding: 5px 20px;
    color: #55595c;
    font-size: 20px;
  }

  input[type='text']::placeholder,
  input[type='password']::placeholder,
  input[type='email']::placeholder,
  textarea::placeholder {
    color: #999;
  }

  textarea {
    height: 200px;
    resize: vertical;
  }

  input[type='text']:focus,
  textarea {
    border-color: #66afe9;
    outline: none;
  }
`
