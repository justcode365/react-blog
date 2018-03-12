import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'utils/react-simple-router'
import Button from 'components/Button'
import { Trash2 } from 'react-feather'
import { Consumer } from '../../App'

export default class Comment extends Component {
  state = { text: '' }

  handleChange = e => {
    this.setState({ text: e.target.value })
  }

  handlePost = () => {
    const { text } = this.state
    this.setState({ text: '' })
    this.props.addComment(text)
  }

  render() {
    const { comments, deleteComment } = this.props
    return (
      <Consumer>
        {({ user }) => (
          <section style={{ width: '60%', margin: '60px auto' }}>
            {localStorage.getItem('token') ? (
              <Card>
                <CardContent>
                  <textarea
                    style={{ width: '100%', border: 'none' }}
                    placeholder="Write a comment..."
                    onChange={this.handleChange}
                  />
                </CardContent>
                <CardFooter>
                  <img alt="logo" src={user.image} />
                  <PostButton onClick={this.handlePost}>Post Comment</PostButton>
                </CardFooter>
              </Card>
            ) : (
              <p>
                <Link to="/signin" style={{ color: 'var(--green)' }}>
                  Sign in
                </Link>{' '}
                or{' '}
                <Link to="/signup" style={{ color: 'var(--green)' }}>
                  Sign up{' '}
                </Link>
                to add comments on this article.
              </p>
            )}

            {comments.map((comment, index) => (
              <Card key={comment.id}>
                <CardContent>
                  <p style={{ margin: 0, wordBreak: 'break-all' }}>{comment.body}</p>
                </CardContent>
                <CardFooter>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Link to={`/@${comment.author.username}`} style={{ height: 24 }}>
                      <img alt="logo" src={comment.author.image} />
                    </Link>

                    <Link to={`/@${comment.author.username}`} style={{ color: 'var(--green)' }}>
                      {comment.author.username}
                    </Link>

                    <span style={{ marginLeft: 10, color: '#bbb', fontSize: '.8rem' }}>
                      {new Date(comment.updatedAt).toDateString()}
                    </span>
                  </div>
                  {user.username === comment.author.username && (
                    <Trash2
                      onClick={() => deleteComment(comment.id)}
                      style={{ color: '#ccc', cursor: 'pointer' }}
                      size={16}
                    />
                  )}
                </CardFooter>
              </Card>
            ))}
          </section>
        )}
      </Consumer>
    )
  }
}

const Card = styled.div`
  border: 1px solid #e5e5e5;
  margin-bottom: 0.75rem;
  border-radius: 0.25rem;
`

const CardContent = styled.div`
  padding: 1.25rem;
`

const CardFooter = styled.div`
  padding: 0.75rem 1.25rem;
  font-size: 0.8rem;
  font-weight: 300;
  border-top: 1px solid #e5e5e5;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    border-radius: 50%;
    margin-right: 5px;
    width: 24px;
    height: 24px;
  }
`

const PostButton = Button.extend`
  padding: 4px 10px;
  font-size: 10px;
`
