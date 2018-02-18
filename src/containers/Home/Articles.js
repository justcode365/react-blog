import styled from 'styled-components'

export default styled.section`
  display: flex;
  margin-top: 30px;
  max-width: 1000px;
  align-items: flex-start;
  margin: var(--center);
  padding: var(--container-padding);

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
`
