import React from 'react'
import styled from 'styled-components'

export default styled.div`
  background-color: red;
  display: inline-block;
  height: 15px;
  margin: 0 10px;
  position: relative;
  top: 6px;
  transform: rotate(-45deg);
  width: 15px;

  :before,
  :after {
    content: '';
    background-color: red;
    border-radius: 50%;
    height: 15px;
    position: absolute;
    width: 15px;
  }

  :before {
    top: -9px;
    left: 0;
  }

  :after {
    left: 9px;
    top: 0;
  }
`
