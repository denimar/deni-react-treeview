import React from 'react';
import TreeView from '../../../../src/deni-react-treeview/deni-react-treeview';

class Example extends React.Component {

  addItemAndSubItem() {
    let api = this.refs.treeview.api;
    api.selectItem(218); //id=218, text=Brazil
  }

  render() {
  	return (
      <div>
        <button onClick={ this.addItemAndSubItem.bind(this) }>Click to select the country Brazil</button>
        <TreeView
          ref="treeview"
          json="https://denifakedata.herokuapp.com/tree/countries"
        />
      </div>
    )
  }

}

export default Example;

let fruitsAndVegetables = [
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