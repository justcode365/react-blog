import styled from 'styled-components'

export default styled.section.attrs({ className: 'container' })`
  width: 600px;
  h1 {
    text-align: center;
  }

  .update {
    display: flex;
    justify-content: flex-end;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
  }
`
