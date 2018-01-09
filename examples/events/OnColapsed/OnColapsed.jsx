import React from 'react';
import TreeView from '../../../../src/deni-react-treeview/deni-react-treeview';

class Example extends React.Component {

  constructor() {
    super();
    this.state = {
      eventLog: []
    }
  }

  onColapsed(item) {
    let date = new Date();
    this.setState({
      eventLog: this.state.eventLog.concat([date.toLocaleTimeString() + ' : onColapsed (' + item.text + ')'])
    });
  }

  render() {
  	return (
      <div>
        <TreeView
          ref="treeview"
          json="https://denifakedata.herokuapp.com/tree/countries"
          onColapsed={ this.onColapsed.bind(this) }
        />
        <div>
          {
            this.state.eventLog.map(logItem => {
              return <div>{ logItem }</div>;
            })
          }
        </div>
      </div>
    )
  }

}

export default Example;
