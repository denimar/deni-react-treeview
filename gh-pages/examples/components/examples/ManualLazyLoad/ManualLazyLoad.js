import React from 'react'
import TreeView from '../../../../../src/deni-react-treeview/deni-react-treeview'

class ManualLazyLoad extends React.Component {

  constructor(props) {
    super(props)
    this.state = {newId: 1000};
  }

  onLazyLoad(item, callbackFunction) {
    let self = this;    
    callbackFunction([
      {
        "id": self.state.newId + 1,
        "text": "Antarctica",
        "isLeaf": true
      },
      {
        "id": self.state.newId + 2,
        "text": "Bouvet Island",
        "isLeaf": true
      }
    ]);
    self.setState({newId: self.state.newId + 2});
  }

  render() {
    return (
      <div className="body">
        <TreeView url="https://fakedata-denimarm.rhcloud.com/data?type=countries" lazyLoad={true} onLazyLoad={this.onLazyLoad.bind(this)} />
      </div>
    )
  }

}

export default ManualLazyLoad;
