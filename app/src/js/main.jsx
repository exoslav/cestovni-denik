import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import Layout from './Pages/Layout.jsx'
import AboutUs from './Pages/AboutUs.jsx'
import Homepage from './Pages/Homepage.jsx'
import OurStories from './Pages/OurStories.jsx'
import OurStoriesDetail from './Pages/OurStoriesDetail.jsx'

import TodoApp from './Pages/TodoApp.jsx'

let app = document.getElementById('app')

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Homepage}></IndexRoute>
      <Route path="o-nas" component={AboutUs}></Route>
      <Route path="nase-pribehy" component={OurStories}></Route>
      <Route path="nase-pribehy/:story" component={OurStoriesDetail}></Route>
    </Route>
  </Router>,
  app)

let todoApp = document.getElementById('todo-app')

ReactDOM.render(
  <TodoApp></TodoApp>,
  todoApp)
