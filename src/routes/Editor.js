import React, { Component } from 'react'
import { Consumer } from '../App'
import Form from 'components/Form'
import Button from 'components/Button'
import { SignWrapper } from './SignUp'
import { Redirect } from 'react-router-dom'

export default class Editor extends Component {
  state = { title: '', description: '', body: '', tagList: [], redirectUrl: '' }

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
