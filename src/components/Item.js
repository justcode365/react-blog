import React from 'react'
import Like from './Like'
import { Link } from 'react-router-dom'
import './Item.css'

export default ({ post }) => (
  <section className="Item">
    <div>
      <img src={post.author.image} alt="avatar" />
      <div className="username">
        <Link to={'@' + post.author.username}>{post.author.username}</Link>
        <p className="date">{new Date(post.createdAt).toDateString()}</p>
      </div>
      <Like liked={post.favorited} count={post.favoritesCount} />
    </div>
    <Link to={'/article/' + post.slug}>
      <h2>{post.title}</h2>
      <p>{post.description}</p>
    </Link>
    <div>
      <Link to={'/article/' + post.slug}>Read more...</Link>
      <div className="tagList">{post.tagList.map((tag, i) => <span key={i}>{tag}</span>)}</div>
    </div>
  </section>
)
