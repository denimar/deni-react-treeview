# deni-react-treeview
A modern, themable and configurable treeview for React

[site](https://denimar.github.io/deni-react-treeview/), [examples](https://denimar.github.io/deni-react-treeview/examples)

## Install

```sh
npm install deni-react-treeview
```

## Usage

Added to your react component
```html
  <TreeView json="https://denimar.github.io/static-data/countries.json" showCheckbox={true} 
  </TreeView>
```

## API
[documentation](https://denimar.github.io/deni-react-treeview/api.html)

## Features
Cross-Browser.
Binding to a JSON (locally, remotely and lazy-load)
Predefined Themes
Theme Customization
Events
Checkboxes
And so on...

## Properties
autoLoad
lazyLoad
marginItems
selectRow
showCheckbox
showIcon
showRoot
theme

#### dataSouce

```javascript
[
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
```

## License

[MIT.](https://raw.githubusercontent.com/denimar/deni-react-treeview/master/LICENSE-MIT)
