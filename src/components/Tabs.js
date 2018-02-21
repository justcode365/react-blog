import React from 'react'
import './Tabs.css'

export default ({ tabs, activeTabIndex, fetchArticles }) => (
  <ul className="Tabs">
    {tabs.map((tab, i) => (
      <li
        onClick={() => fetchArticles(tab, 0)}
        key={i}
        className={activeTabIndex === i ? 'active' : ''}
      >
        {tab}
      </li>
    ))}
  </ul>
)
