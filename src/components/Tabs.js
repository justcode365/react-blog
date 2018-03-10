import React from 'react'
import styled from 'styled-components'

const Tabs = styled.ul`
  list-style: none;
  margin: 0;
  margin-bottom: -1px;
  padding: 0;
  display: flex;
`

export default ({ children, activeKey }) => (
  <Tabs>
    {React.Children.map(children, (child, index) => {
      if (child === null) return null

      return React.cloneElement(child, { active: activeKey === child.key })
    })}
  </Tabs>
)

export const Tab = styled.li`
  a {
    padding: 10px 20px;
    display: inline-block;
    cursor: pointer;
    color: ${props => (props.active ? 'var(--green)' : '#aaa')};
    border-bottom: ${props => (props.active ? '2px solid var(--green)' : 'none')};
  }

  a:hover {
    color: #478c47;
  }
`
