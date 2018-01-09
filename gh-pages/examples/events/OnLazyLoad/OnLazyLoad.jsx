import React from 'react';
import TreeView from '../../../../src/deni-react-treeview/deni-react-treeview';

class Example extends React.Component {

  onLazyLoad(item, loadChildrenFn) {
    loadChildrenFn([
      {
        text: 'Country 01',
        isLeaf: true
      },
      {
        text: 'Country 02',
        isLeaf: true
      }
    ]);
  }

  render() {
  	return (
      <div>
        <TreeView
          ref="treeview"
          json="https://denifakedata.herokuapp.com/tree/countries"
          lazyLoad={ true }
          onLazyLoad={ this.onLazyLoad.bind(this) }
        />
      </div>
    )
  }

}

export default Example;
