import React, { Component, Fragment } from 'react'
import { Consumer } from '../App'
import Articles from 'components/Articles'
import { Settings } from 'react-feather'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'

class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
      articles: [],
      articlesCount: 0,
      activeTab: 'My Articles',
      page_no: 0,
      redirect: false
    }
  }

  componentDidMount() {
    console.log('User mount')
    const { activeTab } = this.state
    this.fetchArticles(activeTab)
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      !prevProps.match.path.includes('favorites') &&
      this.props.match.path.includes('favorites')
    ) {
      this.fetchArticles('Favorited Articles')
    }
  }

  fetchArticles = async (tagname, page_no = 0) => {
    let queryName = 'author'

    if (tagname === 'Favorited Articles') {
      queryName = 'favorited'
    }
    const { params: { user: username } } = this.props.match

    const url = `${process.env.REACT_APP_API}/articles?${queryName}=${username}&limit=5&offset=0`
    const res = await fetch(url)
    const { articles, articlesCount } = await res.json()
    this.setState({ articles, articlesCount, page_no, activeTab: tagname })
  }

  render() {
    const { articles, activeTab, articlesCount, page_no, redirect } = this.state
    const { user = {}, match } = this.props

    if (redirect) return <Redirect to="/settings" />

    return (
      <Fragment>
        <Section>
          <img src={user.image} alt="" />
          <h2>{user.username}</h2>
          <p style={{ color: '#aaa' }}>{user.bio}</p>
          <div className="container">
            {user.username === match.params.user ? (
              <button onClick={() => this.setState({ redirect: true })}>
                <Settings size="14" style={{ marginRight: 5 }} /> Edit Profile Settings
              </button>
            ) : (
              <button> + Follow {user.username}</button>
            )}
          </div>
        </Section>

        <section style={{ maxWidth: 800, margin: '0 auto' }}>
          <ul className="tabs">
            <li className={activeTab === 'My Articles' ? 'active' : ''}>
              <a>My Articles</a>
            </li>
            <li className={activeTab === 'Favorited Articles' ? 'active' : ''}>
              <a>Favorited Articles</a>
            </li>
          </ul>

          <Articles articles={articles} articlesCount={articlesCount} page_no={page_no} />
        </section>
      </Fragment>
    )
  }
}

const Section = styled.section`
  background-color: #f3f3f3;
  text-align: center;
  padding: 30px 100px 20px;
  margin-bottom: 30px;

  img {
    width: 100px;
    border-radius: 50%;
  }

  button {
    float: right;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  button:hover {
    background-color: #ccc;
  }

  div {
    max-width: 800px;
    overflow: hidden; /* BFC */
  }

  button {
    border: 1px solid #999;
    background-color: transparent;
    color: #999;
    height: 30px;
    line-height: 30px;
    border-radius: 3px;
    padding: 0 10px;
  }
`

export default ({ match }) => <Consumer>{context => <User {...context} match={match} />}</Consumer>
