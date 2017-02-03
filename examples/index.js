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
    <Route path="/" component={App} >
      {
        menuItems.items.map(menuItem => {
          return menuItem.children.map(children => {
            return (
              <Route
                key={children.id}
                path={children.route}
                component={children.component || Example}
                jsfiddle={children.jsfiddle}
                description={children.description} >
              </Route>
            );
          });
        })
      }

      <Route path="*" component={NotMatch} />
    </Route>
  </Router>,
  document.getElementById('root')
);
