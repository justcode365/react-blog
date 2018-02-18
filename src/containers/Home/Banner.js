import React from 'react'
import styled from 'styled-components'

const Banner = styled.section`
  padding: 15px 0;
  background-color: var(--main-color);
  text-align: center;
  color: #fff;

  h1 {
    text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);
    font-size: 50px;
    margin: 0 auto;
  }

  h4 {
    font-weight: 100;
    font-size: 1.5rem;
  }
`
export default () => (
  <Banner>
    <h1>conduit</h1>
    <h3>A place to share your knowledge.</h3>
  </Banner>
)
