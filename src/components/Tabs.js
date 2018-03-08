import React from 'react'
import styled from 'styled-components'

export default ({ children }) => <Tabs>{children}</Tabs>

const Tabs = styled.ul`
  margin: 0;
  margin-bottom: -1px;
  padding: 0;
`

export const Tab = styled.li`
  a {
    padding: 10px 20px;
    display: inline-block;
    cursor: pointer;
    color: ${props => (props.active ? 'var(--green)' : '#aaa')};
    border-bottom: ${props => (props.active ? '2px solid var(--green)' : 'none')};
  }

  a:hover {
    color: #555;
  }
`
