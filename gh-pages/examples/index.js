import React from 'react'
import ReactDOM from 'react-dom'

import { HashRouter, Route, Redirect, IndexRedirect, hashHistory, applyRouterMiddleware } from 'react-router-dom'
import menuItems from './menu-items'

import App from './components/App'
import Example from './components/Example'
import NotMatch from './components/NotMatch'

const ExampleContainer = (component, files) => {
    return (
        <Example component={component} files={ files } />
    );
}

const appChildren = [];
menuItems.items.map(menuItem => {
    return menuItem.children.map(child => {
        appChildren.push(
            <Route
                key={ child.id }
                path={ '/' + child.route }
                component={ ExampleContainer.bind(this, child.component, child.files) }
            >
            </Route>
        );
    });
})

appChildren.push(
    <Route exact path="/" render={() => (
        <Redirect to="/local-json" />
    )} />
);

ReactDOM.render(
    <HashRouter>
        <Route path="/" component={() => (<App children={ appChildren } />)}></Route>
    </HashRouter>,
    document.getElementById('root')
);
