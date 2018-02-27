import React from 'react'
import './Tabs.css'

const Tabs = ({ children, activeKey }) => <ul className="Tabs">{children}</ul>

const Tab = ({ children, active }) => <li className={active ? 'active' : ''}>{children}</li>

export default Tabs

export { Tab }
