import React from 'react';
import TreeView from '../../../../../src/deni-react-treeview/deni-react-treeview';
require('./LoadWithSetState.scss');


class LoadWithSetState extends React.Component {

  constructor(props) {
    super(props)
    this.state = {fruitsAndVegetables: []}
  }

  componentDidMount() {
    this.setState({
      fruitsAndVegetables: [
        {
          id: 100,
          text: 'Fruits',
          children: [
            {
              id: 101,
              text: 'Orange',
              isLeaf: true
            },
            {
              id: 102,
              text: 'Banana',
              isLeaf: true
            }
          ]
        },
        {
          id: 200,
          text: 'Vegetables',
          children: [
            {
              id: 201,
              text: 'Carrot',
              isLeaf: true
            },
            {
              id: 202,
              text: 'Tomato',
              isLeaf: true
            }
          ]
        }
      ]
    })
  }

  render() {

    return (
      <div>
        <TreeView
          ref="treeview"
          items={ this.state.fruitsAndVegetables }
          selectRow={true}
          showRoot={false}
        />
      </div>
    )

  }

}

export default LoadWithSetState;
