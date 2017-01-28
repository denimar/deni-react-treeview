import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Redirect, hashHistory, applyRouterMiddleware } from 'react-router'
import menuItems from './menu-items'

import App from './components/App'
import Example from './components/Example'
import NotMatch from './components/NotMatch'

const useExtraProps = {
  renderRouteComponent: (child) => {
    if (child.props.route.jsfiddle) {
      return React.cloneElement(child, {
        jsfiddle: child.props.route.jsfiddle,
        description: child.props.route.description
      })
    } else {
      return child;
    }
  }
}

ReactDOM.render(
  <Router history={hashHistory} render={applyRouterMiddleware(useExtraProps)}>
    <Redirect from="/" to="json" />
    <Route path="/" component={App} >
      {menuItems.items.map((menuItem) => (
        <Route key={menuItem.id} path={menuItem.route} component={Example} jsfiddle={menuItem.jsfiddle} description={menuItem.description} />
      ))}
      <Route path="*" component={NotMatch} />
    </Route>
  </Router>,
  document.getElementById('root')
);
