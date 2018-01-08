import React from 'react'

import BindToLocalJson from './BindToLocalJson'
import BindToRemoteJson from './BindToRemoteJson'
import BindToRemoteJsonLazyLoad from './BindToRemoteJsonLazyLoad'
import BindToJavaScriptObject from './BindToJavaScriptObject'
import PredefinedThemes from './PredefinedThemes'
import ThemeCustomization from './ThemeCustomization'
import AutoLoadFalse from './AutoLoadFalse'
import MarginItems from './MarginItems'
import SelectRow from './SelectRow'
import ShowCheckBox from './ShowCheckBox'
import ShowIconFalse from './ShowIconFalse'
import ShowRootTrue from './ShowRootTrue'
import ThemeIqualMetro from './ThemeIqualMetro'
import ActionButtons from './ActionButtons'
import OnRenderItem from './OnRenderItem'
import ApiTests from './api/ApiTests'
import AddItem from './api/AddItem'
import RemoveItem from './api/RemoveItem'

module.exports = {
  items: [
    {
      "id": 1,
      "title": "Binding",
      "children": [
        {
          "id": 102,
          "route": "local-json",
          "title": "to a local JSON",
          "description": "Binding to a JSON file, which might comes locally or remotelly.",
          "component": BindToLocalJson,
          "files": [
            "BindToLocalJson/BindToLocalJson.jsx",
            "data/countries-by-continents.json"
          ],
        },
        {
          "id": 103,
          "route": "remote-json",
          "title": "to a remote JSON",
          "description": "to a remote JSON",
          "component": BindToRemoteJson,
          "files": [
            "BindToRemoteJson/BindToRemoteJson.jsx"
          ],
        },
        {
          "id": 104,
          "route": "lazy-load",
          "title": "to a remote JSON (Lazy Load)",
          "description": "to a remote JSON (Lazy Load) dfdsjflkdsjf dlsfjk",
          "component": BindToRemoteJsonLazyLoad,
          "files": [
            "BindToRemoteJsonLazyLoad/BindToRemoteJsonLazyLoad.jsx"
          ]
        },
        {
          "id": 105,
          "route": "javascript",
          "title": "Binding to a Javascript object",
          "description": "Binding to a Javascript object",
          "component": BindToJavaScriptObject,
          "files": [
            "BindToJavaScriptObject/BindToJavaScriptObject.jsx"
          ]
        }
      ]
    },
    {
      "id": 2,
      "title": "Theming",
      "children": [
        {
          "id": 201,
          "route": "predefined-themes",
          "title": "Predefined Themes",
          "description": "Predefined Themes lçdsfklj lksdjlkjflksdj sdlkfjasd",
          "component": PredefinedThemes,
          "files": [
            "PredefinedThemes/PredefinedThemes.jsx",
            "PredefinedThemes/PredefinedThemes.scss"
          ]
        },
        {
          "id": 202,
          "route": "theme-customization",
          "title": "Theme Customization",
          "description": "Theme Customization lçdsfklj lksdjlkjflksdj sdlkfjasd",
          "component": ThemeCustomization,
          "files": [
            "ThemeCustomization/ThemeCustomization.jsx",
            "ThemeCustomization/ThemeCustomization.scss"
          ]
        }
      ]
    },
    {
      "id": 3,
      "title": "Events",
      "children": [
        {
          "id": 301,
          "title": "Events Example",
          "jsfiddle": "gbdyyjoc",
          "description": "Events Example todo... finish it",
          "route": "events"
        }
      ]
    },
    {
      "id": 4,
      "title": "Options",
      "children": [
        {
          "id": 401,
          "route": "autoload",
          "title": "autoLoad = false",
          "description": "TODO: implement this example",
          "component": AutoLoadFalse,
          "files": [
            "AutoLoadFalse/AutoLoadFalse.jsx"
          ]
        },
        {
          "id": 402,
          "route": "lazyload",
          "title": "manual lazyLoad (LazyLoad = true)",
          "description": "TODO: implement this example",
        },
        {
          "id": 403,
          "route": "marginitems",
          "title": "marginItems = 80",
          "description": "TODO: implement this example",
          "component": MarginItems,
          "files": [
            "MarginItems/MarginItems.jsx"
          ]
        },
        {
          "id": 404,
          "route": "selectrow",
          "title": "selectRow = true",
          "description": "TODO: implement this example",
          "component": SelectRow,
          "files": [
            "SelectRow/SelectRow.jsx"
          ]
        },
        {
          "id": 405,
          "route": "showcheckbox",
          "title": "showCheckbox = true",
          "description": "...",
          "component": ShowCheckBox,
          "files": [
            "ShowCheckBox/ShowCheckBox.jsx"
          ]
        },
        {
          "id": 406,
          "route": "showicon",
          "title": "showIcon = false",
          "description": "TODO: implement this example",
          "component": ShowIconFalse,
          "files": [
            "ShowIconFalse/ShowIconFalse.jsx"
          ]
        },
        {
          "id": 407,
          "route": "showroot",
          "title": "showRoot = true",
          "description": "TODO: implement this example",
          "component": ShowRootTrue,
          "files": [
            "ShowRootTrue/ShowRootTrue.jsx"
          ]
        },
        {
          "id": 408,
          "route": "theme",
          "title": "Theme = \"metro\"",
          "description": "...",
          "component": ThemeIqualMetro,
          "files": [
            "ThemeIqualMetro/ThemeIqualMetro.jsx"
          ]
        },
        {
          "id": 409,
          "route": "onrenderitem",
          "title": "onRenderItem",
          "description": "...",
          "component": OnRenderItem,
          "files": [
            "OnRenderItem/OnRenderItem.jsx",
            "OnRenderItem/OnRenderItem.scss"
          ]
        },
        {
          "id": 410,
          "route": "actionbuttons",
          "title": "Action Buttons",
          "description": "...",
          "component": ActionButtons,
          "files": [
            "ActionButtons/ActionButtons.jsx"
          ]
        }
      ]
    },
    {
      "id": 5,
      "title": "API",
      "children": [
        {
          "id": 501,
          "route": "additem",
          "title": "Add Item",
          "description": "TODO: implement this example",
          "component": AddItem,
          "files": [
            "api/AddItem/AddItem.jsx"
          ]
        },
        {
          "id": 502,
          "route": "removeitem",
          "title": "Remove Item",
          "description": "TODO: implement this example",
          "component": RemoveItem,
          "files": [
            "api/RemoveItem/RemoveItem.jsx"
          ]
        }
      ]
    }
  ]
}
