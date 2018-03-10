import styled, { css } from 'styled-components'

export default styled.button`
  border: none;
  color: #fff;
  padding: ${props => (props.size === 'big' ? '15px 23px' : '8px 16px')};
  border-radius: 5px;
  font-size: 18px;
  background-color: var(--green);
  cursor: pointer;

  &:hover {
    background-color: #449d44;
  }

  ${props =>
    props.danger &&
    css`
      background-color: #fff;
      color: var(--red);
      border: 1px solid var(--red);

      &:hover {
        background-color: var(--red);
        color: #fff;
      }
    `};
`
