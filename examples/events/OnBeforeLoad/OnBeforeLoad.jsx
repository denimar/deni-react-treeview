import React from 'react';
import TreeView from '../../../../src/deni-react-treeview/deni-react-treeview';

class Example extends React.Component {

  constructor() {
    super();
    this.state = {
      eventLog: []
    }
  }

  dataLoad() {
    this.refs.treeview.api.load();
  }

  onBeforeLoad(data, item) {
    let date = new Date();
    this.setState({
      eventLog: this.state.eventLog.concat([date.toLocaleTimeString() + ' : onBeforeLoad (' + data.length + ' items)'])
    });
  }

  render() {
  	return (
      <div>
        <button onClick={this.dataLoad.bind(this)}>Click to Load</button>
        <TreeView
          ref="treeview"
          autoLoad={ false }
          lazyLoad={ true }
          json="https://denifakedata.herokuapp.com/tree/countries"
          onBeforeLoad={ this.onBeforeLoad.bind(this) }
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
