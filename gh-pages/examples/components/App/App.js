import React from 'react'
import './App.scss'
import menuItems from '../../menu-items'
import { NavLink } from 'react-router-dom'

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const self = this;

    return (
      <div className="examples-container">
        <div className="title">deni-react-treeview - Examples</div>
        <div className="menu-and-body">
          <div className="menu">
            {
              menuItems.items.map(menuItem => {
                const childrenItems = menuItem.children.map(children => 
                  <div key={ children.id } className="menu-item child"><NavLink activeClassName="active" to={`/${ children.route }`}>{children.title}</NavLink></div>
                )

                return (
                  <div key={menuItem.id}>
                    <div className="menu-item">{ menuItem.title }</div>
                    { childrenItems }
                  </div>
                )
              })
            }
          </div>
          <div className="body-container">
            {
              this.props.children
            }
          </div>
        </div>
      </div>
    )

  }

}

export default App
