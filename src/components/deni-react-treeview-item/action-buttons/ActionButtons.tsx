import React from 'react'
import './ActionButtons.scss'
import { ActionButtonsProps } from './ActionButtonsProps';

class ActionButtons extends React.Component<ActionButtonsProps> {

  constructor(props) {
    super(props)
  }

  onClick(item, actionButton) {
    debugger
    console.log(this.props.onActionButtonClick)
    alert('sdjçflsjdflkdsjflçkdsj')
  }

  render() {
    const actionButtons: JSX.Element[] = this.props.buttons.map((actionButton, index) => {
      return (
        <span
          key={index}
          className="action-button"
          onClick={ this.props.onActionButtonClick ? this.props.onActionButtonClick.bind(this, this.props.item, actionButton) : undefined}
          // onClick={ this.onClick }
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