import React from 'react'
import styled from 'styled-components'

export default ({ children }) => <Tabs>{children}</Tabs>

const Tabs = styled.ul`
  margin: 0;
  margin-bottom: -1px;
  padding: 0;

  a {
    padding: 10px 20px;
    display: inline-block;
    cursor: pointer;
    color: #aaa;
    border-bottom: none;
  }

  a:hover {
    color: #555;
  }

  .active a {
    color: var(--green);
    border-bottom: 2px solid var(--green);
  }
`
