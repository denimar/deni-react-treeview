import React from 'react';
import TreeView from '../../../../../src/deni-react-treeview/deni-react-treeview';

class LazyLoad extends React.Component {

  render() {

    return (
      <div className="body">
        <TreeView url="https://fakedata-denimarm.rhcloud.com/data?type=countries" lazyLoad={true} />
      </div>
    )

  }

}

export default LazyLoad;
