import React, { Component } from 'react'
import { Edit2, Trash2 } from 'react-feather'
import styled from 'styled-components'
import { Link, Redirect } from 'react-router-dom'

export default class Banner extends Component {
  state = { redirectUrl: '' }

  handleDelete = async () => {
    const res = await fetch(`${process.env.REACT_APP_API}/articles/${this.props.article.slug}`, {
      method: 'delete',
      headers: { authorization: localStorage.getItem('token') }
    })

    if (res.status === 200) {
      this.setState({ redirectUrl: '/' })
    }
  }

  handleEdit = () => {
    this.setState({ redirectUrl: `/editor/${this.props.article.slug}` })
  }

  render() {
    const { article, user } = this.props
    const { redirectUrl } = this.state
    if (redirectUrl) return <Redirect to={redirectUrl} />

    return (
      <BannerWrapper>
        <h1 className="container">{article.title}</h1>

        <UserInfo className="container">
          <img
            src={article.author.image || process.env.PUBLIC_URL + '/img/unknow.png'}
            alt="avatar"
          />
          <div style={{ marginRight: 10 }}>
            <Link to={'@' + user.username} style={{ color: '#fff' }}>
              {article.author.username}
            </Link>
            <p>{new Date(article.updatedAt).toDateString()}</p>
          </div>
          <Button onClick={this.handleEdit}>
            <Edit2 size={16} />
            Edit Article
          </Button>
          <DangerButton onClick={this.handleDelete}>
            <Trash2 size={16} />
            Delete Article
          </DangerButton>
        </UserInfo>
      </BannerWrapper>
    )
  }
}

const BannerWrapper = styled.section`
  background-color: #333;
  padding: 30px 80px;

  h1 {
    font-size: 40px;
    color: #fff;
    margin-bottom: 30px;
  }
`

const Button = styled.button`
  background-color: transparent;
  color: #ccc;
  border: 1px solid #ccc;
  border-radius: 0.2rem;
  display: flex;
  align-items: center;
  height: 30px;
  font-weight: normal;
  cursor: pointer;
  margin-left: 5px;

  &:hover {
    color: #fff;
    background-color: #ccc;
    border-color: #ccc;
  }

  svg {
    margin-right: 3px;
  }
`

const DangerButton = Button.extend`
  border-color: var(--red);
  color: var(--red);

  &:hover {
    color: #fff;
    background-color: var(--red);
    border-color: var(--red);
  }
`

const UserInfo = styled.div`
  display: flex;
  align-items: center;

  img {
    margin-right: 5px;
    width: 30px;
    height: 30px;
  }

  p {
    color: #bbb;
    font-size: 0.6rem;
    margin: 0;
    font-weight: 300;
    line-height: 1rem;
  }
`
