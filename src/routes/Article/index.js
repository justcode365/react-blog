import React, { Component } from 'react'
import { Edit2, Trash2 } from 'react-feather'
import './Article.css'
import { Consumer } from '..'

class Article extends Component {
  render() {
    const { user = {} } = this.props

    return (
      <div className="Article">
        <section className="Article-banner">
          <h1>Hello</h1>

          <div style={{ display: 'flex' }}>
            <img
              width={30}
              height={30}
              src={user.image || process.env.PUBLIC_URL + '/img/unknow.png'}
              alt="avatar"
              style={{ marginRight: 5 }}
            />
            <div>
              <a style={{ color: '#fff' }} href={'@' + user.username}>
                {user.username}
              </a>
              <p style={{ color: '#bbb', fontSize: '.8rem', margin: 0 }}>
                {new Date(user.createdAt).toDateString()}
              </p>
            </div>
            <button>
              <Edit2 />
              Edit Article
            </button>
            <button>
              <Trash2 />
              Delete Article
            </button>
          </div>
        </section>
      </div>
    )
  }
}

export default () => <Consumer>{context => <Article {...context} />}</Consumer>
