import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import menu from './menu'
import bindingToLocalJson from './binding-to-local-json'
import bindingToRemoteJson from './binding-to-remote-json'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'

class Examples extends React.Component {

  constructor(props) {
    super(props);
    this.state = {currentMenuItem: menu.items[0]};
  }

  onMenuItemClick(menuItem) {
    this.setState({currentMenuItem: menuItem});
    window.location = window.location.pathname + '#' + menuItem.path
  }

  render() {
    let self = this;

    return (
      <div className="examples-container">
        <div className="title"></div>
        <div className="menu-and-body">
          <div className="menu">
            {
              menu.items.map(function(menuItem) {
                return (
                  <div className="menu-item" onClick={self.onMenuItemClick.bind(self, menuItem)}>
                    {menuItem.text}
                  </div>
                )
              })
            }
          </div>
          <div id="example-body" className="body">
            <Router history={hashHistory}>

              <Route path='/' component={bindingToLocalJson} />
              <Route path='/remote' component={bindingToRemoteJson} />

            </Router>
          </div>
        </div>
      </div>
    )
  }

}

ReactDOM.render(
  <Examples />,
  document.getElementById('root')
);
