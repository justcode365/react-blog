import React from 'react'
import Like from '../Like'
import './style.css'

export default ({ post }) => (
  <section className="article">
    <div>
      <img src={post.author.image} alt="avatar" />
      <div className="username">
        <a href="">{post.author.username}</a>
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
