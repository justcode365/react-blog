import React, { Component } from 'react'
import { Edit2, Trash2 } from 'react-feather'
import './Article.css'
import { Consumer } from '..'
import Comment from './Comment'

class Article extends Component {
  render() {
    const { user = {} } = this.props

    return (
      <div className="Article">
        <section className="Article-banner">
          <h1>Hello</h1>

          <div className="Article-userinfo">
            <img src={user.image || process.env.PUBLIC_URL + '/img/unknow.png'} alt="avatar" />
            <div style={{ marginRight: 10 }}>
              <a style={{ color: '#fff' }} href={'@' + user.username}>
                {user.username}
              </a>
              <p>{new Date(user.createdAt).toDateString()}</p>
            </div>
            <button>
              <Edit2 size={16} />
              Edit Article
            </button>
            <button className="danger">
              <Trash2 size={16} />
              Delete Article
            </button>
          </div>
        </section>

        <section>body</section>

        <hr />

        <Comment />
      </div>
    )
  }
}

export default () => <Consumer>{context => <Article {...context} />}</Consumer>
