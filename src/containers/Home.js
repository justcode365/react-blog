import React, { Component, Fragment } from "react";
import Item from "components/Item";
import { connect } from "react-redux";
import styled from "styled-components";

const Banner = styled.section`
  padding: 15px 0;
  background-color: #888;
  text-align: center;
  color: #fff;

  h1 {
    text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);
    font-size: 40px;
  }

  h4 {
    font-weight: normal;
  }
`;

const Blog = styled.div.attrs({
  className: "container"
})`
  display: flex;
  margin-top: 30px;
  max-width: 1000px;
  align-items: flex-start;

  main {
    width: 75%;
    margin-right: 30px;
  }

  aside {
    padding: 10px;
    width: 25%;
    background-color: #f3f3f3;
    border-radius: 5px;
  }

  aside p {
    margin-top: 5px;
    margin-bottom: 5px;
  }

  aside a {
    background-color: #818a91;
    margin-right: 10px;
    display: inline-block;
    border-radius: 15px;
    color: #fff;
    margin-top: 5px;
    padding: 5px 8px;
  }
`;
class Home extends Component {
  state = { tags: [], articles: [], articlesCount: 0, page_no: 0 };

  async componentDidMount() {
    // 并行请求
    const [tagsResponse, articlesPromise] = await Promise.all([
      fetch(`${process.env.REACT_APP_API}/tags`),
      fetch(`${process.env.REACT_APP_API}/articles?limit=5&offset=0`)
    ]);

    const { tags } = await tagsResponse.json();
    const { articles, articlesCount } = await articlesPromise.json();
    this.setState({ tags, articles, articlesCount });
  }

  setPage = async index => {
    const { page_no } = this.state;
    const res = await fetch(
      `${process.env.REACT_APP_API}/articles?limit=5&offset=${page_no +
        index * 10}`
    );

    const { articles, articlesCount } = await res.json();
    this.setState({ articles, articlesCount, page_no: page_no + index });
  };

  getTagArticles = async tag => {
    const res = await fetch(
      `${process.env.REACT_APP_API}/articles?tag=${tag}&limit=5&offset=0`
    );
    const { articles, articlesCount } = await res.json();
    this.setState({ articles, articlesCount, page_no: 0 });
  };

  render() {
    const { tags, articles, articlesCount, page_no } = this.state;

    return (
      <Fragment>
        <Banner>
          <h1>React Blog</h1>
          <h3>A place to share your knowledge.</h3>
        </Banner>

        <Blog>
          <main>
            <h3>
              <a href="#">Global Feed</a>
            </h3>
            {articles.map((post, i) => <Item key={i} post={post} />)}
            <p>
              <a
                href=""
                onClick={e => {
                  e.preventDefault();
                  this.setPage(-1);
                }}
              >
                {"<"}
              </a>
              {page_no + 1}
              <a
                href=""
                onClick={e => {
                  e.preventDefault();
                  this.setPage(+1);
                }}
              >
                {">"}
              </a>
              共 {articlesCount}
            </p>
          </main>
          <aside>
            <p>Popular Tags</p>
            {tags.map(tag => (
              <a
                href=""
                key={tag}
                onClick={e => {
                  e.preventDefault();
                  this.getTagArticles(tag);
                }}
              >
                {tag}
              </a>
            ))}
          </aside>
        </Blog>
      </Fragment>
    );
  }
}

export default connect(state => state)(Home);
