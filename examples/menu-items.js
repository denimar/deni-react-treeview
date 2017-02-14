import React from 'react'
import Theming from './components/examples/Theming'
import LazyLoad from './components/examples/LazyLoad'

module.exports = {
    items: [
        {
            "id": 1,
            "title": "Binding",
            "jsfiddle": "tc8Lovb7",
            "route": "binding",
            "children": [
                {
                    "id": 101,
                    "title": "to a local JSON",
                    "description": "Binding to a JSON file, which might comes locally or remotelly.",
                    "jsfiddle": "tc8Lovb7",
                    "route": "local-json"
                }, {
                    "id": 102,
                    "title": "to a remote JSON",
                    "description": "Binding to a JSON file, which might comes locally or remotelly.",
                    "jsfiddle": "tc8Lovb7",
                    "route": "remote-json"
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
                    "title": "autoLoad",
                    "jsfiddle": "yynzedks",
                    "description": 'bla bla bla',
                    "route": "autoload"
                }, {
                    "id": 402,
                    "title": "lazyLoad",
                    "jsfiddle": "o7npugrt",
                    "description": 'bla bla bla',
                    //"component": Theming,
                    "route": "lazyload"
                }, {
                    "id": 403,
                    "title": "marginItems",
                    "jsfiddle": "tc8Lovb7",
                    "description": 'bla bla bla',
                    "route": "marginitems"
                }, {
                    "id": 404,
                    "title": "selectRow",
                    "jsfiddle": "tc8Lovb7",
                    "description": 'bla bla bla',
                    "route": "selectrow"
                }, {
                    "id": 405,
                    "title": "showCheckbox",
                    "jsfiddle": "tc8Lovb7",
                    "description": 'bla bla bla',
                    "route": "showcheckbox"
                }, {
                    "id": 406,
                    "title": "showIcon",
                    "jsfiddle": "tc8Lovb7",
                    "description": 'bla bla bla',
                    "route": "showicon"
                }, {
                    "id": 407,
                    "title": "showRoot",
                    "jsfiddle": "tc8Lovb7",
                    "description": 'bla bla bla',
                    "route": "showroot"
                }, {
                    "id": 408,
                    "title": "theme",
                    "jsfiddle": "xgcmnk5q",
                    "description": 'bla bla bla',
                    "route": "theme"
                }
            ]
        }
    ]
}
