import React from 'react';
import TreeView from '../src/deni-react-treeview/deni-react-treeview';

class Example extends React.Component{

  render() {

    return (
      <TreeView url="http://fakedata-denimarm.rhcloud.com/data?type=countries" lazyLoad={true}></TreeView>
    );

  }

}

export default Example;
