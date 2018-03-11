import React, { Component, Fragment } from 'react'
import ItemList from 'components/ItemList'
import Tabs, { Tab } from 'components/Tabs'
import { Link } from 'react-router-dom'
import Banner from './Banner'

export default class Profile extends Component {
  state = { articles: [], articlesCount: 0, activeTab: 'My Articles', page_no: 0 }

  componentDidMount() {
    const { location } = this.props
    let tabname = 'author'

    if (location.pathname.includes('favorites')) {
      tabname = 'favorited'
    }

    this.fetchArticle(tabname)
  }

  fetchArticle = async tabname => {
    const { user } = this.props.match.params
    const res = await fetch(
      `${process.env.REACT_APP_API}/articles?${tabname}=${user}&limit=10&offset=0`
    )
    const activeTab = tabname === 'author' ? 'My Articles' : 'Favorited Articles'

    const { articles, articlesCount } = await res.json()
    this.setState({ articles, articlesCount, page_no: 0, activeTab })
    window.scrollTo(0, 0)
  }

  render() {
    const { articles, activeTab, articlesCount, page_no } = this.state
    const { match } = this.props
    return (
      <Fragment>
        <Banner username={match.params.user} />

        <section style={{ maxWidth: 800, margin: '0 auto' }}>
          <Tabs activeKey={activeTab}>
            <Tab key="My Articles">
              <Link to={match.url} onClick={() => this.fetchArticle('author')}>
                My Articles
              </Link>
            </Tab>
            <Tab key="Favorited Articles">
              <Link to={match.url + '/favorites'} onClick={() => this.fetchArticle('favorited')}>
                Favorited Articles
              </Link>
            </Tab>
          </Tabs>

          <ItemList articles={articles} articlesCount={articlesCount} page_no={page_no} />
        </section>
      </Fragment>
    )
  }
}
