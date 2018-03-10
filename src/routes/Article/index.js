import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Remarkable from 'remarkable'
import { Consumer } from '../../App'
import Card from './Card'
import Banner from './Banner'
import styled from 'styled-components'

// import Comment from './Comment'

const md = new Remarkable()

const Tags = styled.div`
  & > span {
    display: inline-block;
    padding: 1px 6px;
    font-size: 12px;
    margin-left: 5px;
    border-radius: 20px;
    border: 1px solid #ccc;
    color: #aaa;
  }
`

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
    const { user } = this.props
    const { article, comments } = this.state

    if (!article) return <h1 style={{ textAlign: 'center' }}>Not Found Article</h1>

    return (
      <div>
        <Banner article={article} user={user} />

        <section className="container">
          <div
            className="container"
            dangerouslySetInnerHTML={{ __html: md.render(article.body) }}
          />
          {/* <h1> {article.body}</h1> */}
          <Tags>{article.tagList.map((tag, i) => <span key={i}>{tag}</span>)}</Tags>

          <hr />
        </section>

        <section style={{ width: '50%', margin: '0 auto' }}>
          {user.token ? (
            <Card
              content={<textarea placeholder="Write a comment..." />}
              footer={
                <p style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
                  <img
                    alt="logo"
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
              <Link to="/signin">Sign in</Link> or <Link to="/signup">Sign up</Link> to add comments
              on this article.
            </p>
          )}

          {comments.map(comment => (
            <Card
              key={comment.id}
              content={<p style={{ margin: 0, wordBreak: 'break-all' }}>{comment.body}</p>}
              footer={
                <p style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
                  <img
                    alt="logo"
                    src={comment.author.image}
                    width={24}
                    style={{ borderRadius: '50%', marginRight: 5 }}
                  />

                  <Link to={`/@${comment.author.username}`} style={{ color: 'var(--green)' }}>
                    {comment.author.username}
                  </Link>

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
