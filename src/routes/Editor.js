import React, { Component } from 'react'
import { Consumer } from '../App'
import Form from 'components/Form'
import Button from 'components/Button'
import { SignWrapper } from './SignUp'
import { Redirect, Route } from 'react-router-dom'

export default ({ match }) => (
  <div>
    <Route path={`${match.url}/:title`} component={Editor} />
    <Route exact path={match.url} component={Editor} />
  </div>
)

class Editor extends Component {
  state = { title: '', description: '', body: '', tagList: [], redirectUrl: '' }

  componentDidMount() {
    const { params } = this.props.match
    if (params.title) {
      fetch(`${process.env.REACT_APP_API}/articles/${params.title}`)
        .then(res => res.json())
        .then(data => {
          const { title, description, body, tagList } = data.article
          this.setState({ title, description, body, tagList })
        })
    }
  }

  handleSubmit = async e => {
    e.preventDefault()
    const { title, description, body, tagList } = this.state
    const article = { title, description, body, tagList }

    const url = 'https://conduit.productionready.io/api/articles'
    const options = {
      method: 'post',
      headers: {
        authorization: localStorage.getItem('token'),
        'content-type': 'application/json'
      },
      body: JSON.stringify({ article })
    }

    try {
      const res = await fetch(url, options)
      const info = await res.json()
      if (info.errors) {
        this.setState({ error: 'email or password is invalid' })
        return
      }

      this.setState({ redirectUrl: info.article.slug })
    } catch (err) {
      console.error(err)
    }
  }

  handleChange = event => {
    const { name, value } = event.target
    if (name === 'tagList') {
      this.setState({ [name]: value.split(' ') })
    } else {
      this.setState({ [name]: value })
    }
  }

  render() {
    const { title, description, body, tagList, redirectUrl } = this.state

    if (redirectUrl) return <Redirect to={`/article/${redirectUrl}`} />

    return (
      <SignWrapper>
        <Form onSubmit={this.handleSubmit}>
          <p>
            <input
              type="text"
              placeholder="Article Title"
              name="title"
              value={title}
              onChange={this.handleChange}
            />
          </p>

          <p>
            <input
              type="text"
              placeholder="What's this article about?"
              name="description"
              value={description}
              onChange={this.handleChange}
            />
          </p>

          <p>
            <textarea
              placeholder="Write your article (in markdown)"
              name="body"
              value={body}
              onChange={this.handleChange}
            />
          </p>

          <p>
            <input
              type="text"
              placeholder="Enter tags"
              name="tagList"
              value={tagList.join(' ')}
              onChange={this.handleChange}
            />
          </p>

          <p>
            <Button size="big" type="submit">
              Publish Article
            </Button>
          </p>
        </Form>
      </SignWrapper>
    )
  }
}
