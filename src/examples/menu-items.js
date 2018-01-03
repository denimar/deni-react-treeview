import React from 'react'
//import Theming from './components/examples/Theming'
//import LazyLoad from './components/examples/LazyLoad'
//import Events from './components/examples/Events'
//import AutoLoad from './components/examples/AutoLoad'
//import ManualLazyLoad from './components/examples/ManualLazyLoad'
import LazyLoad from './components/examples/LazyLoad'
import LoadWithSetState from './components/examples/LoadWithSetState'

module.exports = {
    items: [
        {
            "id": 1,
            "title": "Binding",
            "jsfiddle": "tc8Lovb7",
            "route": "binding",
            "children": [
                {
                    "id": 102,
                    "title": "to a JSON",
                    "description": "Binding to a JSON file, which might comes locally or remotelly.",
                    "jsfiddle": "tc8Lovb7",
                    "route": "json"
                }, {
                    "id": 103,
                    "title": "to a remote JSON (Lazy Load)",
                    "description": "to a remote JSON (Lazy Load) dfdsjflkdsjf dlsfjk",
                    //"component": LazyLoad,
                    "jsfiddle": "o7npugrt",
                    "route": "lazy-load"
                }, {
                    "id": 104,
                    "title": "Binding to a Javascript object",
                    "description": "Binding to a Javascript object",
                    "jsfiddle": "7mox9ne3",
                    "route": "javascript"
                }
            ]
        }, {
            "id": 2,
            "title": "Theming",
            "route": "theming",
            "jsfiddle": "tc8Lovb7",
            "children": [
                {
                    "id": 201,
                    "title": "Predefined Themes",
                    "jsfiddle": "xgcmnk5q",
                    "description": "Predefined Themes lçdsfklj lksdjlkjflksdj sdlkfjasd",
                    "route": "predefined-themes"
                }, {
                    "id": 202,
                    "title": "Theme Customization",
                    "jsfiddle": "p89c2ryy",
                    "description": "Theme Customization lçdsfklj lksdjlkjflksdj sdlkfjasd",
                    "route": "theme-customization"
                }
            ]
        }, {
            "id": 3,
            "title": "Events",
            "route": "events",
            "jsfiddle": "tc8Lovb7",
            "children": [
                {
                    "id": 301,
                    "title": "Events Example",
                    "jsfiddle": "gbdyyjoc",
                    "description": 'Events Example todo... finish it',
                    "route": "events"
                }
            ]
        }, {
            "id": 4,
            "title": "Options",
            "route": "options",
            "jsfiddle": "tc8Lovb7",
            "children": [
                {
                    "id": 401,
                    "title": "autoLoad = false",
                    "jsfiddle": "yynzedks",
                    "description": 'TODO: implement this example',
                    "route": "autoload"
                }, {
                    "id": 402,
                    "title": "manual lazyLoad",
                    "jsfiddle": "qp72drx0",
                    "description": 'TODO: implement this example',
                    //"component": Theming,
                    "route": "lazyload"
                }, {
                    "id": 403,
                    "title": "marginItems",
                    "jsfiddle": "tc8Lovb7",
                    "description": 'TODO: implement this example',
                    "route": "marginitems"
                }, {
                    "id": 404,
                    "title": "selectRow",
                    "jsfiddle": "tc8Lovb7",
                    "description": 'TODO: implement this example',
                    "route": "selectrow"
                }, {
                    "id": 405,
                    "title": "showCheckbox",
                    "jsfiddle": "tc8Lovb7",
                    "description": '...',
                    "route": "showcheckbox"
                }, {
                    "id": 406,
                    "title": "showIcon",
                    "description": 'TODO: implement this example',
                    "route": "showicon"
                }, {
                    "id": 407,
                    "title": "showRoot",
                    "jsfiddle": "tc8Lovb7",
                    "description": 'TODO: implement this example',
                    "route": "showroot"
                }, {
                    "id": 408,
                    "title": "theme",
                    "jsfiddle": "xgcmnk5q",
                    "description": '...',
                    "route": "theme"
                }, {
                    "id": 997,
                    "title": "Lazy Load",
                    "component": LazyLoad,
                    "description": "Lazy load items",
                    "route": "lazy"
                }, {
                    "id": 998,
                    "title": "Testing API",
                    "component": ApiTests,
                    "description": "Testing API",
                    "route": "apitests"
                }, {
                    "id": 999,
                    "title": "Testing Load with SetState",
                    "component": LoadWithSetState,
                    "description": "Testing Load with Set State",
                    "route": "setstate"
                }
            ]
        }
    ]
}
