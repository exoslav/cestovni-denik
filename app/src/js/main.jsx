import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import Header from './Layouts/Header.jsx'

let app = document.getElementById('app')

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Header}>
      <indexRoute></indexRoute>
    </Route>
  </Router>,
  app)
