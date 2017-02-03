import React from 'react';
import TreeView from '../../../../src/deni-react-treeview/deni-react-treeview';
import ThemeSelector from './ThemeSelector';
import './Theming.scss'

class Theming extends React.Component{

  constructor(props) {
    super(props);
  }

  onChangeTheme(newTheme) {
    this.refs.treeview.api.setTheme(newTheme);
  }

  render() {

    return (
      <div className="body">
        <ThemeSelector OnChange={this.onChangeTheme.bind(this)} />
        <TreeView ref="treeview" url="https://denimar.github.io/static-data/countries.json"></TreeView>
      </div>
    );
  }

}

export default Theming;
