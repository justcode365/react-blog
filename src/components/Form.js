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
    height: 100px;
  }

  input[type='text']:focus,
  textarea {
    border-color: #66afe9;
    outline: none;
  }

  input[type='submit'] {
    border: none;
    color: #fff;
    padding: 15px 23px;
    border-radius: 5px;
    font-size: 18px;
    background-color: var(--green);
    cursor: pointer;
  }

  input[type='submit']:hover {
    background-color: #449d44;
  }

  input.danger[type='submit'] {
    background-color: #fff;
    color: var(--red);
    border: 1px solid var(--red);
  }

  input.danger[type='submit']:hover {
    background-color: var(--red);
    color: #fff;
  }

  .form-error {
    display: list-item;
    margin-left: 20px;
    color: var(--red);
    font-weight: bold;
  }
`
