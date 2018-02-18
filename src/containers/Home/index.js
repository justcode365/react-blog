import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Banner from './Banner'
import Articles from './Articles'
import Tabs from 'components/Tabs'
import Item from 'components/shared/Item'
import { fetchTags, fetchArticles } from 'actions/article'
import { fetchUser } from 'actions/user'

class Home extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    // dispatchArr = [dispatch(fetchTags()), dispatch(fetchArticles())]
    Promise.all([
      dispatch(fetchTags()),
      dispatch(fetchArticles()),
      localStorage.getItem('token') && dispatch(fetchUser())
    ])
  }

  render() {
    const { tags, items, tabs, activeTabIndex, count, page_no } = this.props.article
    console.warn(11111)

    return (
      <Fragment>
        <Banner />
        <Articles>
          <main>
            <Tabs onClick={this.changeTab} tabs={tabs} activeIndex={activeTabIndex} />
            {items.map((post, i) => <Item key={i} post={post} />)}
            <p>
              <a
                href=""
                onClick={e => {
                  e.preventDefault()
                  this.setPage(-1)
                }}
              >
                {'<'}
              </a>
              {page_no + 1}
              <a
                href=""
                onClick={e => {
                  e.preventDefault()
                  this.setPage(+1)
                }}
              >
                {'>'}
              </a>
              共 {count}
            </p>
          </main>
          <aside>
            <p>Popular Tags</p>
            {tags.map(tag => (
              <a
                href=""
                key={tag}
                onClick={e => {
                  e.preventDefault()
                  this.getTagArticles(tag)
                }}
              >
                {tag}
              </a>
            ))}
          </aside>
        </Articles>
      </Fragment>
    )
  }
}

export default connect(state => state)(Home)
