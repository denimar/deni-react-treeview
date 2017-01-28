import React from 'react'

class Example extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="body">
          <div className="example-preview-title">
            {this.props.description}
          </div>
          <div className="example-preview-container">
            <iframe className="example-preview-iframe" src={`https://jsfiddle.net/denimar/${this.props.jsfiddle}/embedded/result,html,js,css,resources`} allowFullScreen="allowfullscreen" frameBorder="0"></iframe>
          </div>
      </div>
    )
  }
}

export default Example
