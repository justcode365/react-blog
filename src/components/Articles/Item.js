import React from 'react'
import { Heart } from 'react-feather'
import './Item.css'

export default ({ post }) => <div>hello</div>

const a = ({ post }) => (
  <h1>
    {({ linkClick }) => (
      <section className="Item">
        <div className="Item-info">
          <img src={post.author.image || process.env.PUBLIC_URL + '/img/unknow.png'} alt="avatar" />
          <div className="Item-user">
            <a href={'@' + post.author.username} onClick={linkClick}>
              {post.author.username}
            </a>
            <p>{new Date(post.createdAt).toDateString()}</p>
          </div>
          <button className={`Articles-like ${post.favorited ? 'liked' : ''}`}>
            <Heart size={12} />
            {post.favoritesCount}
          </button>
        </div>

        <a className="Item-content" href={'/article/' + post.slug} onClick={linkClick}>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
        </a>
        <div className="Item-link">
          <a href={'/article/' + post.slug} onClick={linkClick}>
            Read more...
          </a>
          <div className="Item-tags">
            {post.tagList.map((tag, i) => <span key={i}>{tag}</span>)}
          </div>
        </div>
      </section>
    )}
  </h1>
)
