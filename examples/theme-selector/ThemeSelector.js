import React from 'react'
import './ThemeSelector.scss'

class ThemeSelector extends React.Component {

  constructor(props) {
    super(props);
  }

  OnChange() {
    if (this.props.OnChange) {
      this.props.OnChange(this.refs.selectElem.value);
    }
  }

  render() {

    return (
      <div className="theme-selector-container" onChange={this.OnChange.bind(this)}>
        <label>
    			<b>Theme :</b>
    			<select ref="selectElem" autoFocus>
    			  <option value="classic">Classic</option>
    				<option value="metro">Metro</option>
    				<option value="moonlight">Moonlight</option>
    				<option value="purple">Purple</option>
    				<option value="green">Green</option>
    			  <option value="orange">Orange</option>
    			  <option value="red">Red</option>
    			  <option value="silver">Silver</option>
    			</select>
    		</label>
      </div>
    )

  }

}

export default ThemeSelector;
