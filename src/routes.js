import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Users from './components/landing'
import UserPostDetails from './components/posts'
import PostDetail from './components/post-detail'

const Routes = () => {
  return (
    <Route>
      <Switch>
        <Route exact path="/" component={Users} />
        <Route exact path="/user/:userId" component={UserPostDetails} />
        <Route exact path="/post/:id" component={PostDetail} />
      </Switch>
    </Route>
  )
}

export default Routes
