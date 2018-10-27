import React from 'react';
import TreeView from '../../../../../src/deni-react-treeview/deni-react-treeview';
import './Events.scss'

class Events extends React.Component {

    url = "https://denifakedata.herokuapp.com/tree/countries"

    logEvents(eventName) {
        let consoleElem = document.getElementById('console');
        var d = new Date();
        consoleElem.value = d.toLocaleTimeString() + ' : ' + eventName + '\n' + consoleElem.value;
        console.log('here')
    }

    render() {

        return (
            <div className="example-container">
                <TreeView
                    json={this.url}
                    onBeforeLoad={this.logEvents.bind(this, 'onBeforeLoad')}
                    onAfterLoad={this.logEvents.bind(this, 'onAfterLoad')}
                    onExpanded={this.logEvents.bind(this, 'onExpanded')}
                    onColapsed={this.logEvents.bind(this, 'onColapsed')}
                    onSelectItem={this.logEvents.bind(this, 'onSelectItem')}
                    onCheckItem={this.logEvents.bind(this, 'onCheckItem')}
                />,
                <textarea id="console" />
            </div>
        )

    }

}

export default Events
