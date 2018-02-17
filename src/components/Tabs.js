import React from 'react'
import './Tabs.css'

export default ({ tabs, activeIndex, onClick }) => (
  <ul className="Tabs">
    {tabs.map((tab, i) => (
      <li
        onClick={() => onClick(i)}
        key={i}
        style={{
          color: i === activeIndex ? 'var(--main-color)' : '#aaa',
          borderBottom: i === activeIndex ? '2px solid var(--main-color)' : 'none'
        }}
      >
        {tab}
      </li>
    ))}
  </ul>
)
