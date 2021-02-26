import React from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

/***
 * for show all post in card view
 */
export default function Post({ post }) {
  return (
    <Card style={{ margin: '2rem 2rem 0 0', width: '15rem' }}>
      <Card.Body>
        <Link to={`/post/${post.id}/${post.userId}`}>
          <Card.Text>{post.title ?? ''}</Card.Text>
        </Link>
      </Card.Body>
    </Card>
  )
}
