import React from 'react';
import TreeView from '../../../../src/deni-react-treeview/deni-react-treeview';

class Example extends React.Component {

  dataLoad() {
    this.refs.treeview.api.load();
  }

  render() {
  	return (
      <div>
        <button onClick={this.dataLoad.bind(this)}>Click to Load</button>
        <TreeView
          ref="treeview"
          autoLoad={ false }
          json="https://denifakedata.herokuapp.com/tree/countries"
        />
      </div>
    )
  }

}

export default Example;
