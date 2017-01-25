import React from 'react';
import TreeView from '../src/deni-react-treeview/deni-react-treeview';
import ThemeSelector from './theme-selector/ThemeSelector';

class Example extends React.Component{

  constructor(props) {
    super(props);
  }

  onChangeTheme(newTheme) {
    this.refs.treeview.setTheme(newTheme);
  }

  render() {

    return (
      <div>
        <ThemeSelector OnChange={this.onChangeTheme.bind(this)} />
        <TreeView ref="treeview" url="https://denimar.github.io/static-data/countries.json"></TreeView>
      </div>
    );
  }

}

export default Example;
