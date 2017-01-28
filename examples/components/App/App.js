import React from 'react'
import './App.scss'
import menuItems from '../../menu-items'
import { Link } from 'react-router'

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const self = this;

    return (
      <div className="examples-container">
        <div className="title">DeniReactTreeview - Examples</div>
        <div className="menu-and-body">
          <div className="menu">
            {
              menuItems.items.map(function(menuItem) {
                return (
                  <div key={menuItem.id} className="menu-item"><Link activeClassName="active" to={`/${menuItem.route}`}>{menuItem.title}</Link></div>
                )
              })
            }
          </div>
          {this.props.children}
        </div>
      </div>
    )

  }

}

export default App
