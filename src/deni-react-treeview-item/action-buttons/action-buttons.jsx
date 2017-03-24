import React from 'react'
import './action-buttons.scss'

class ActionButtons extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {

    let actionButtons = [];
    this.props.buttons.map((button) => {
      actionButtons.push((
        <span className="action-button" >
          {button}
        </span>
      ));
    })

    return (
      <div className="action-buttons-container">
        <span className="action-buttons-container-text">{this.props.item.text}</span>
        {actionButtons}
      </div>
    )
  }

}

export default ActionButtons;
