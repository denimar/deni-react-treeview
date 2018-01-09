import React from 'react'
import './Example.scss'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs';

class Example extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fileName: '',
      sourceContent: ''
    }
  }

  exampleFileClick(ref, fileName) {
    let elem = this.refs[ref];

    if (elem) {
      elem.parentElement.querySelectorAll('.example-file').forEach(item => {
        item.classList.remove('selected');
      });
      elem.classList.add('selected');

      this._loadFile(fileName, textContent => {
        this.setState({
          fileName: fileName,
          sourceContent: textContent
        });
      });
    }  
  }

  render() {
    let files = this.props.files || [];

    if (files.length > 0 && this.state.fileName === '') {
      setTimeout(() => {
          this.exampleFileClick('example-file0', files[0]);
      }, 10);
    }

    return (
      <div className="example-container">
        <div className="example-component">
          {
            <this.props.component />
          }
        </div>
        <div className="example-files">
          <div className="example-file-chooser">
            {
              files.length > 0 ? (
                files.map((fileName, index) => {
                  return (
                    <div
                      key={ index }
                      ref={ 'example-file' + index }
                      className="example-file"
                      onClick={ this.exampleFileClick.bind(this, 'example-file' + index, fileName) }
                    >
                      { this._extractFileName(fileName) }
                    </div>
                  )
                })
              ) : null
            }
          </div>
          {
            files.length > 0 ? (
              <SyntaxHighlighter className="example-source" language='javascript' style={ docco }>
                {
                  this._getFileName(this.state.sourceContent)
                }
              </SyntaxHighlighter>
            ) : null
          }
        </div>
      </div>
    )

  }

  _getFileName(filePath) {
    filePath = filePath.replace('src/deni-react-treeview/deni-react-treeview', 'deni-react-treeview');
    while (filePath.indexOf('../') !== -1) {
      filePath = filePath.replace('../', '');
    }
    return filePath;
  }

  _loadFile(fileName, callback) {

      var xobj = new XMLHttpRequest();
      xobj.overrideMimeType("text/plain");
      xobj.open('GET', fileName, true);
      xobj.onreadystatechange = function() {
          if (xobj.readyState == 4 && xobj.status == "200") {

              // .open will NOT return a value but simply returns undefined in async mode so use a callback
              callback(xobj.responseText);

          }
      }
      xobj.send(null);
  }

  _extractFileName(filePath) {
    let filePathArray = filePath.split('/');
    if (filePathArray.length > 0) {
      return filePathArray[filePathArray.length - 1];
    }
    return '';
  }

}

export default Example
