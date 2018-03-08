import React from 'react'
import styled from 'styled-components'

export default ({ content, footer }) => (
  <Card>
    <CardContent>{content}</CardContent>
    <CardFooter>{footer}</CardFooter>
  </Card>
)

const Card = styled.div`
  border: 1px solid #e5e5e5;
  margin-bottom: 0.75rem;
  border-radius: 0.25rem;
`

const CardContent = styled.div`
  padding: 1.25rem;
`

const CardFooter = styled.div`
  padding: 0.75rem 1.25rem;
  font-size: 0.8rem;
  font-weight: 300;
  border-top: 1px solid #e5e5e5;
  background-color: #f5f5f5;
`
