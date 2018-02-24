import React from 'react'
import './Tabs.css'

const Tabs = ({ children }) => <ul className="Tabs">{children}</ul>

const Tab = ({ children, active }) => <li className={active ? 'active' : ''}>{children}</li>

export default Tabs

export { Tab }

// export default ({ tabs, activeTabIndex, fetchArticles }) => (
//         <a
//           href="/"
//           className={activeTabIndex === i ? 'active' : ''}
//           onClick={() => fetchArticles(tab, 0)}
//         >
//           {tab}
//         </a>
