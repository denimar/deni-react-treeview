import './ActionButtons.scss'
import { ActionButtonsProps } from './ActionButtonsProps';
import React from 'react'

class ActionButtons extends React.Component<ActionButtonsProps> {

  render() {
    return (
      <div className="action-buttons-container">
        dfddfdfgsfgsd
      </div>
    )
  }

}

export default ActionButtons;

/*
class ActionButtons extends React.Component<ActionButtonsProps> {

  constructor(props) {
    super(props)
  }

  render() {

    const actionButtons: JSX.Element[] = this.props.buttons.map((actionButton, index) => {
      return (
        <span
          key={index}
          className="action-button"
          onClick={ this.props.onActionButtonClick ? this.props.onActionButtonClick.bind(this, this.props.item, actionButton) : undefined}
        >
          {actionButton}
        </span>
      );
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
*/