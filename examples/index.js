import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import menu from './menu'

class Examples extends React.Component {

  constructor(props) {
    super(props);
    this.state = {currentMenuItem: menu.items[0]};
  }

  componentDidMount() {
    _selectMenuItem(this, this.state.currentMenuItem);
  }

  onMenuItemClick(menuItem) {
    _selectMenuItem(this, menuItem);
  }

  getClassMenuItem(menuItem) {
    let className = 'menu-item';

    if (menuItem === this.state.currentMenuItem) {
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

          		<div id="example-preview-title"></div>
          		<iframe id="example-preview-iframe" src="" allowFullScreen="allowfullscreen" frameBorder="0"></iframe>

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

function _selectMenuItem(self, menuItem) {
  self.setState({currentMenuItem: menuItem});
  let elemTitle = document.getElementById('example-preview-title');
  elemTitle.innerHTML = menuItem.description;
  let elemFrame = document.getElementById('example-preview-iframe');
  elemFrame.src = 'https://jsfiddle.net/denimar/' + menuItem.jsfiddle + '/embedded/result,html,js,css,resources/dark';
}
