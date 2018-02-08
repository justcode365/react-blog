import React from 'react'
import './style.css'

export default ({ post }) => (
  <section className="article">
    <img src="https://static.productionready.io/images/smiley-cyrus.jpg" alt=""/>
    <a href="">{post.author.username}</a>
    <p className='date'>{new Date(post.createdAt).toDateString()}</p>
    <h2>{post.title}</h2>
    <p>{post.description}</p>
    <a href="">Read more...</a>
  </section>
)
