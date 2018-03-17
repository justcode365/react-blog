import React, { Component } from 'react'
import Remarkable from 'remarkable'
import Banner from './Banner'
import styled from 'styled-components'
import Comments from './Comments'

const md = new Remarkable()

export default class Article extends Component {
  state = { article: { tagList: [], author: {} }, comments: [] }

  componentDidMount() {
    this.fetchArticle()
  }

  fetchArticle = async () => {
    const { match } = this.props
    const [articlePromise, commentsPromise] = await Promise.all([
      fetch(`${window.API}/articles/${match.params.title}`),
      fetch(`${window.API}/articles/${match.params.title}/comments`)
    ])

    const { article } = await articlePromise.json()
    const { comments } = await commentsPromise.json()
    this.setState({ article, comments })
  }

  addComment = async text => {
    const { title } = this.props.match.params

    const res = await fetch(`${window.API}/articles/${title}/comments`, {
      method: 'post',
      headers: { authorization: localStorage.getItem('token'), 'content-type': 'application/json' },
      body: JSON.stringify({ comment: { body: text } })
    })

    const { comment } = await res.json()
    this.setState(prevState => ({ comments: [comment, ...prevState.comments] }))
  }

  deleteComment = async id => {
    const { title } = this.props.match.params

    const res = await fetch(`${window.API}/articles/${title}/comments/${id}`, {
      method: 'delete',
      headers: { authorization: localStorage.getItem('token') }
    })

    if (res.status === 200) {
      this.setState(prevState => {
        return { comments: [...prevState.comments].filter(comment => comment.id !== id) }
      })
    }
  }

  render() {
    const { article, comments } = this.state

    if (!article) return <h1 style={{ textAlign: 'center' }}>Not Found Article</h1>

    return (
      <div>
        <Banner article={article} />

        <section className="container">
          <div
            className="container"
            dangerouslySetInnerHTML={{ __html: md.render(article.body) }}
          />

          <Tags>{article.tagList.map((tag, i) => <span key={i}>{tag}</span>)}</Tags>

          <hr style={{ border: '.5px solid #eaeaea' }} />

          <Comments
            comments={comments}
            article={article}
            deleteComment={this.deleteComment}
            addComment={this.addComment}
          />
        </section>
      </div>
    )
  }
}

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
