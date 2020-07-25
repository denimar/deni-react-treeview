# deni-react-treeview
A modern, themable and configurable treeview for React


[live examples](https://deni-react-treeview.vercel.app/)


![alt text](https://denimar.github.io/deni-react-treeview/images/deni-react-treeview.png)


TODO: In the future I will implement the tests, Cloud CI.

## Installing with NPM

npm install deni-react-treeview --save

## Usage

Added to your react component
```html
    <TreeView url="https://denifakedata.herokuapp.com/tree/countries" /> 
```
For more details: [examples](https://deni-react-treeview.vercel.app/)

## API
[documentation](https://denimar.github.io/deni-react-treeview/api.html)

## Features
* Cross-Browser.
* Binding to a JSON (locally, remotely and lazy-load)
* Predefined Themes
* Theme Customization
* Events
* Checkboxes
* And so on...

## Properties
* autoLoad ```(boolean)```
* lazyLoad ```(boolean)```
* marginItems ```(integer)```
* selectRow ```(boolean)```
* showCheckbox ```(boolean)```
* showIcon ```(boolean)```
* showRoot ```(boolean)```
* theme ```(string)```

## Events
* OnRenderItem
* onBeforeLoad
* onAfterLoad
* onSelectItem
* onExpanded
* onColapsed
* onLazyLoad
* onCheckItem

#### json example

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

## Author

[Denimar de Moraes](http://github.com/denimar) (denimar@gmail.com) is a full-stack developper at Feracode, Florianópolis, Santa Catarina, Brazil.

[<img src="https://raw.githubusercontent.com/denimar/denibudget/master/linkedin-profile.png">](https://www.linkedin.com/in/denimar-moraes/?locale=en_US)

--------------

<script src="https://platform.linkedin.com/in.js" type="text/javascript">lang: en_US</script>
<script type="IN/Share" data-url="https://www.linkedin.com/in/denimar-moraes"></script>