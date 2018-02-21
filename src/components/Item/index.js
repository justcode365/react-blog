import React from 'react'
import unknow from './unknow.jpg'
import Like from './Like'
import './Item.css'

export default ({ post }) => (
  <section className="Item">
    <div className="Item-info">
      <img src={post.author.image || unknow} alt="avatar" />
      <div className="Item-user">
        <a href={'@' + post.author.username}>{post.author.username}</a>
        <p>{new Date(post.createdAt).toDateString()}</p>
      </div>
      <Like liked={post.favorited} count={post.favoritesCount} />
    </div>

    <a className="Item-content" href={'/article/' + post.slug}>
      <h2>{post.title}</h2>
      <p>{post.description}</p>
    </a>
    <div>
      <a href={'/article/' + post.slug}>Read more...</a>
      <div className="Item-tags">{post.tagList.map((tag, i) => <span key={i}>{tag}</span>)}</div>
    </div>
  </section>
)
