import React from 'react';
import TreeView from '../../../../src/deni-react-treeview/deni-react-treeview';

class Example extends React.Component {

    constructor() {
        super();
        this.state = {
            eventLog: []
        }
    }

    onCheckItem(item) {
        let date = new Date();
        this.setState({
            eventLog: this.state.eventLog.concat([date.toLocaleTimeString() + ' : onCheckItem (' + item.text + ', State: ' + item.state + ')'])
        });
    }

    render() {
        return (
            <div>
                <TreeView
                    ref="treeview"
                    json="https://denifakedata.herokuapp.com/tree/countries"
                    showCheckbox={ true }
                    onCheckItem={ this.onCheckItem.bind(this) }
                />
                <div>
                    {
                        this.state.eventLog.map(logItem => {
                            return <div>{ logItem }</div>;
                        })
                    }
                </div>
            </div>
        )
    }

}

export default Example;
