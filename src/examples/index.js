import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Redirect, IndexRedirect, hashHistory, applyRouterMiddleware } from 'react-router-dom'
import menuItems from './menu-items'

import App from './components/App'
import Example from './components/Example'
import NotMatch from './components/NotMatch'

// const useExtraProps = () => ({
//   renderRouteComponent: (child, routeComponentProps) => {
//     if (child.props.route.jsfiddle) {
//         return React.cloneElement(child, {
//           jsfiddle: child.props.route.jsfiddle,
//           description: child.props.route.description
//         });
//     } else {
//       return child;
//     }
//   }
// });

const appChildren = [];
menuItems.items.map(menuItem => {
  return menuItem.children.map(child => {
    appChildren.push(
      <Route
        key={child.id}
        path={'/' + child.route}
        component={ () => {
          return child.component ? (<child.component />) : (<Example jsfiddle={child.jsfiddle} description={child.description} />);
        }}
      >
      </Route>
    );
  });
})


ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route path="/" component={() => (<App children={ appChildren } />)}></Route>
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);
