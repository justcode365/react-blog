import React from 'react'
import Like from '../Like'
import { Link } from 'react-router-dom'
import './style.css'

export default ({ post }) => (
  <section className="article">
    <div>
      <img src={post.author.image} alt="avatar" />
      <div className="username">
        <Link to={'@' + post.author.username}>{post.author.username}</Link>
        <p className="date">{new Date(post.createdAt).toDateString()}</p>
      </div>
      <Like />
    </div>
    <a href="">
      <h2>{post.title}</h2>
      <p>{post.description}</p>
    </a>
    <div>
      <a href="">Read more...</a>
      <div className="tagList">
        {post.tagList.map((tag, i) => <span key={i}>{tag}</span>)}
      </div>
    </div>
  </section>
)
