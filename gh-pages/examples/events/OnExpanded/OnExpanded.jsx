import React from 'react';
import TreeView from '../../../../src/deni-react-treeview/deni-react-treeview';

class Example extends React.Component {

  constructor() {
    super();
    this.state = {
      eventLog: []
    }
  }

  onExpanded(item) {
    let date = new Date();
    this.setState({
      eventLog: this.state.eventLog.concat([date.toLocaleTimeString() + ' : onExpanded (' + item.text + ')'])
    });
  }

  render() {
  	return (
      <div>
        <TreeView
          ref="treeview"
          json="https://denifakedata.herokuapp.com/tree/countries"
          onExpanded={ this.onExpanded.bind(this) }
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
