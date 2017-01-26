import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import menu from './menu'
import bindingToLocalJson from './binding-to-local-json'
import bindingToRemoteJson from './binding-to-remote-json'
import bindingToJavascriptObject from './binding-to-javascript-object'
import themeCustomization from './theme-customization'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'
import Prism from 'prismjs'
import {
  PrismCode
} from "react-prism/lib";

class Examples extends React.Component {

  constructor(props) {
    super(props);
    this.state = {currentMenuItem: menu.items[0]};
  }

  onMenuItemClick(menuItem) {
    this.setState({currentMenuItem: menuItem});
    window.location = window.location.pathname + '#' + menuItem.path
  }

  getClassMenuItem(menuItem) {
    let className = 'menu-item';

    if (window.location.hash === '#' + menuItem.path) {
      className += ' active';
    }

    return className;
  }

  render() {
    let self = this;

    return (
      <div className="examples-container">
        <div className="title">DeniReactTreeview - Examples</div>
        <div className="menu-and-body">
          <div className="menu">
            {
              menu.items.map(function(menuItem) {
                return (
                  <div key={menuItem.id} className={self.getClassMenuItem(menuItem)} onClick={self.onMenuItemClick.bind(self, menuItem)}>{menuItem.text}</div>
                )
              })
            }
          </div>
          <div id="example-body" className="body">

            <div className="treeview-container">
              <Router history={hashHistory}>
                <Route path='/' component={bindingToLocalJson} />
                <Route path='/remote' component={bindingToRemoteJson} />
                <Route path='/javascript' component={bindingToJavascriptObject} />
                <Route path='/theme-customization' component={themeCustomization} />
              </Router>
            </div>
            <div className="code-view-container">
              <div className="code-view">
                <div className="code-view-title">{this.state.currentMenuItem.language} :</div>
                <pre className={'language-' + this.state.currentMenuItem.language}>
                  <PrismCode className={'language-' + this.state.currentMenuItem.language}>
                    {this.state.currentMenuItem.code}
                  </PrismCode>
                </pre>
              </div>
            </div>

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
