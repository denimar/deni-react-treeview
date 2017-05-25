import React from 'react'

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
                    "description": "Binding to a remote JSON loading it lazily, waiting for the time when I expand a item to make a request to the server and load its children",
                    "jsfiddle": "o7npugrt",
                    "route": "lazy-load"
                }, {
                    "id": 104,
                    "title": "Binding to a Javascript object",
                    "description": "Binding to a Javascript object as a variable",
                    "jsfiddle": "7mox9ne3",
                    "route": "javascript"
                }, {
                    "id": 105,
                    "title": "Binding by .setState()",
                    "description": "Binding to a Javascript object which will be loaded using the setState method.",
                    "jsfiddle": "ybbrpx0u",
                    "route": "setstate"
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
                    "description": "Setting a predefined themes to our treeview",
                    "route": "predefined-themes"
                }, {
                    "id": 202,
                    "title": "Theme Customization",
                    "jsfiddle": "p89c2ryy",
                    "description": "Customizing our treeview and making it looks like our app",
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
                    "description": 'Showing the exactly time when the eventa are fired',
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
                    "description": 'Setting the autoLoad property to false and wait for a click on the button to load',
                    "route": "autoload"
                }, {
                    "id": 402,
                    "title": "manual lazyLoad (lazyLoad = true)",
                    "jsfiddle": "qp72drx0",
                    "description": 'Setting the lazyLoad property to true and implementing the "onLazyLoad" event which is fired when I expand a item in order to load its children',
                    "route": "lazyload"
                }, {
                    "id": 403,
                    "title": "marginItems = 80",
                    "jsfiddle": "uL3quq3t",
                    "description": 'Setting the marginItems property to "80" to see how it is shown',
                    "route": "marginitems"
                }, {
                    "id": 404,
                    "title": "selectRow = true",
                    "jsfiddle": "gr2e4h3L",
                    "description": 'Setting the selectRow property to true to see how it is shown',
                    "route": "selectrow"
                }, {
                    "id": 405,
                    "title": "showCheckbox = true",
                    "jsfiddle": "yddaym83",
                    "description": 'Setting the showCheckbox property to true to see how it is shown',
                    "route": "showcheckbox"
                }, {
                    "id": 406,
                    "title": "showIcon = false",
                    "jsfiddle": "jp3rLpa5",
                    "description": 'Setting the showIcon property to false to see how it is shown',
                    "route": "showicon"
                }, {
                    "id": 407,
                    "title": "showRoot = true",
                    "jsfiddle": "tzbdwh4e",
                    "description": 'Setting the showRoot property to "true" to see how it is shown',
                    "route": "showroot"
                }, {
                    "id": 408,
                    "title": "theme = metro",
                    "jsfiddle": "ftdLw6po",
                    "description": 'Setting the theme property to "metro" to see how it is shown',
                    "route": "theme"
                },
                // {
                //     "id": 999,
                //     "title": "tests - Manual Lazy Load",
                //     "jsfiddle": "xgcmnk5q",
                //     "component": ManualLazyLoad,
                //     "description": "Manual Lazy Load",
                //     "route": "eventstesting"
                // }
            ]
        }
    ]
}
