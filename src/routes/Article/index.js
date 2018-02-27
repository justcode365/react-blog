import React, { Component, Fragment } from 'react'
import { Edit2, Trash2 } from 'react-feather'
import './Article.css'
import { Consumer } from 'routes'
import Comment from './Comment'
import Card from './Card'

class Article extends Component {
  state = { article: { tagList: [], author: {} }, comments: [] }

  componentDidMount() {
    this.fetchArticle()
  }

  fetchArticle = async () => {
    const { match } = this.props
    const [articlePromise, commentsPromise] = await Promise.all([
      fetch(`${process.env.REACT_APP_API}/articles/${match.params.title}`),
      fetch(`${process.env.REACT_APP_API}/articles/${match.params.title}/comments`)
    ])

    const { article } = await articlePromise.json()
    const { comments } = await commentsPromise.json()
    this.setState({ article, comments })
  }
  render() {
    const { user = {}, linkClick } = this.props
    const { article, comments } = this.state

    return (
      <div className="Article">
        <section className="Article-banner">
          <h1 className="container">{article.title}</h1>

          <div className="Article-userinfo container">
            <img
              src={article.author.image || process.env.PUBLIC_URL + '/img/unknow.png'}
              alt="avatar"
            />
            <div style={{ marginRight: 10 }}>
              <a style={{ color: '#fff' }} href={'@' + user.username}>
                {article.author.username}
              </a>
              <p>{new Date(article.updatedAt).toDateString()}</p>
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

        <section className="container">
          <h1> {article.body}</h1>
          <div className="Item-tags ">
            {article.tagList.map((tag, i) => <span key={i}>{tag}</span>)}
          </div>

          <hr />
        </section>

        <section style={{ width: '50%', margin: '0 auto' }}>
          {localStorage.getItem('token') ? (
            <Card
              content={<textarea />}
              footer={
                <p style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
                  <img
                    src={article.author.image}
                    width={24}
                    style={{ borderRadius: '50%', marginRight: 5 }}
                  />

                  <button style={{ marginLeft: 10, color: '#bbb', fontSize: '.8rem' }}>
                    Post Comment
                  </button>
                </p>
              }
            />
          ) : (
            <p>
              <a href="/signin" onClick={linkClick}>
                Sign in
              </a>{' '}
              or{' '}
              <a href="/signup" onClick={linkClick}>
                sign up
              </a>{' '}
              to add comments on this article.
            </p>
          )}

          {comments.map(comment => (
            <Card
              key={comment.id}
              content={<p style={{ margin: 0 }}>{comment.body}</p>}
              footer={
                <p style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
                  <img
                    src={comment.author.image}
                    width={24}
                    style={{ borderRadius: '50%', marginRight: 5 }}
                  />
                  <a href={`/@${comment.author.username}`} style={{ color: 'var(--green)' }}>
                    {comment.author.username}
                  </a>
                  <span style={{ marginLeft: 10, color: '#bbb', fontSize: '.8rem' }}>
                    {new Date(article.updatedAt).toDateString()}
                  </span>
                </p>
              }
            />
          ))}
        </section>
      </div>
    )
  }
}

export default ({ match }) => (
  <Consumer>{context => <Article {...context} match={match} />}</Consumer>
)
