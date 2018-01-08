import React from 'react';
import TreeView from '../../../../../src/deni-react-treeview/deni-react-treeview';
require('./RootNodeTests.scss')


class RootNodeTests extends React.Component {

  render() {

    return (
      <div>
        <TreeView
          ref="treeview"
          url="https://denimar.github.io/static-data/budget-category.json"
          selectRow={true}
          showRoot={false}
        />
      </div>
    )

  }

}

export default RootNodeTests;
