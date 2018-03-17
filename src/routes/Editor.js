import React, { Component } from 'react'
import Form from 'components/Form'
import Button from 'components/Button'
import { SignWrapper } from './SignUp'
import { Redirect, Route } from 'utils/react-simple-router'

export default ({ match }) => (
  <div>
    <Route path={`${match.url}/:slug`} component={Editor} />
    <Route exact path={match.url} component={Editor} />
  </div>
)

class Editor extends Component {
  state = { title: '', description: '', body: '', tagList: [], redirectUrl: '', errors: null }

  componentDidMount() {
    const { slug } = this.props.match.params
    if (slug) {
      fetch(`${window.API}/articles/${slug}`)
        .then(res => res.json())
        .then(data => {
          const { title, description, body, tagList } = data.article
          this.setState({ title, description, body, tagList })
        })
    }
  }

  handleSubmit = async e => {
    e.preventDefault()
    const { slug } = this.props.match.params
    const { title, description, body, tagList } = this.state
    const article = { title, description, body, tagList }

    const url = `${window.API}/articles${slug ? '/' + slug : ''}`
    const options = {
      method: slug ? 'put' : 'post',
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
        this.setState({ errors: info.errors })
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
    const { title, description, body, tagList, redirectUrl, errors } = this.state

    if (redirectUrl) return <Redirect to={`/article/${redirectUrl}`} />

    return (
      <SignWrapper>
        <Form onSubmit={this.handleSubmit}>
          {errors && (
            <ul style={{ color: 'var(--red)', fontWeight: 'bold' }}>
              {Object.keys(errors).map((key, i) => (
                <li key={i}>
                  {key} {errors[key].join(', ')}
                </li>
              ))}
            </ul>
          )}
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
