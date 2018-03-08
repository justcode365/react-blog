import React from 'react'
import { Edit2, Trash2 } from 'react-feather'
import styled from 'styled-components'

export default ({ article, user }) => (
  <Banner>
    <h1 className="container">{article.title}</h1>

    <UserInfo className="container">
      <img src={article.author.image || process.env.PUBLIC_URL + '/img/unknow.png'} alt="avatar" />
      <div style={{ marginRight: 10 }}>
        <a style={{ color: '#fff' }} href={'@' + user.username}>
          {article.author.username}
        </a>
        <p>{new Date(article.updatedAt).toDateString()}</p>
      </div>
      <Button>
        <Edit2 size={16} />
        Edit Article
      </Button>
      <DangerButton>
        <Trash2 size={16} />
        Delete Article
      </DangerButton>
    </UserInfo>
  </Banner>
)

const Banner = styled.section`
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
  border-color: #b85c5c;
  color: #b85c5c;

  &:hover {
    color: #fff;
    background-color: #b85c5c;
    border-color: #b85c5c;
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
