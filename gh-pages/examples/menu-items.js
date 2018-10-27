import React from 'react'

import UnderDevelopment from './components/UnderDevelopment'

import BindToLocalJson from './binding/BindToLocalJson'
import BindToRemoteJson from './binding/BindToRemoteJson'
import BindToRemoteJsonLazyLoad from './binding/BindToRemoteJsonLazyLoad'
import BindToJavaScriptObject from './binding/BindToJavaScriptObject'

import PredefinedThemes from './theming/PredefinedThemes'
import ThemeCustomization from './theming/ThemeCustomization'

import AutoLoadFalse from './options/AutoLoadFalse'
import MarginItems from './options/MarginItems'
import SelectRow from './options/SelectRow'
import ShowCheckBox from './options/ShowCheckBox'
import ShowIconFalse from './options/ShowIconFalse'
import ShowRootTrue from './options/ShowRootTrue'
import ThemeIqualMetro from './options/ThemeIqualMetro'
import ActionButtons from './options/ActionButtons'

import ApiTests from './api/ApiTests'
import AddItem from './api/AddItem'
import RemoveItem from './api/RemoveItem'
import SelectItem from './api/SelectItem'

import OnRenderItem from './events/OnRenderItem'
import OnBeforeLoad from './events/OnBeforeLoad'
import OnAfterLoad from './events/OnAfterLoad'
import OnSelectItem from './events/OnSelectItem'
import OnExpanded from './events/OnExpanded'
import OnColapsed from './events/OnColapsed'
import OnLazyLoad from './events/OnLazyLoad'
import OnCheckItem from './events/OnCheckItem'

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
                    "component": BindToLocalJson,
                    "files": [
                        "binding/BindToLocalJson/BindToLocalJson.jsx",
                        "data/countries-by-continents.json"
                    ],
                },
                {
                    "id": 103,
                    "route": "remote-json",
                    "title": "to a remote JSON",
                    "component": BindToRemoteJson,
                    "files": [
                        "binding/BindToRemoteJson/BindToRemoteJson.jsx"
                    ],
                },
                {
                    "id": 104,
                    "route": "lazy-load",
                    "title": "to a remote JSON (Lazy Load)",
                    "component": BindToRemoteJsonLazyLoad,
                    "files": [
                        "binding/BindToRemoteJsonLazyLoad/BindToRemoteJsonLazyLoad.jsx"
                    ]
                },
                {
                    "id": 105,
                    "route": "javascript",
                    "title": "Binding to a Javascript object",
                    "component": BindToJavaScriptObject,
                    "files": [
                        "binding/BindToJavaScriptObject/BindToJavaScriptObject.jsx"
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
                    "component": PredefinedThemes,
                    "files": [
                        "theming/PredefinedThemes/PredefinedThemes.jsx",
                        "theming/PredefinedThemes/PredefinedThemes.scss"
                    ]
                },
                {
                    "id": 202,
                    "route": "theme-customization",
                    "title": "Theme Customization",
                    "component": ThemeCustomization,
                    "files": [
                        "theming/ThemeCustomization/ThemeCustomization.jsx",
                        "theming/ThemeCustomization/ThemeCustomization.scss"
                    ]
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
                    "component": AutoLoadFalse,
                    "files": [
                        "options/AutoLoadFalse/AutoLoadFalse.jsx"
                    ]
                },
                {
                    "id": 402,
                    "route": "lazyload",
                    "title": "lazyLoad = true",
                    "component": BindToRemoteJsonLazyLoad,
                    "files": [
                        "binding/BindToRemoteJsonLazyLoad/BindToRemoteJsonLazyLoad.jsx"
                    ]
                },
                {
                    "id": 403,
                    "route": "marginitems",
                    "title": "marginItems = 80",
                    "component": MarginItems,
                    "files": [
                        "options/MarginItems/MarginItems.jsx"
                    ]
                },
                {
                    "id": 404,
                    "route": "selectrow",
                    "title": "selectRow = true",
                    "component": SelectRow,
                    "files": [
                        "options/SelectRow/SelectRow.jsx"
                    ]
                },
                {
                    "id": 405,
                    "route": "showcheckbox",
                    "title": "showCheckbox = true",
                    "component": ShowCheckBox,
                    "files": [
                        "options/ShowCheckBox/ShowCheckBox.jsx"
                    ]
                },
                {
                    "id": 406,
                    "route": "showicon",
                    "title": "showIcon = false",
                    "component": ShowIconFalse,
                    "files": [
                        "options/ShowIconFalse/ShowIconFalse.jsx"
                    ]
                },
                {
                    "id": 407,
                    "route": "showroot",
                    "title": "showRoot = true",
                    "component": ShowRootTrue,
                    "files": [
                        "options/ShowRootTrue/ShowRootTrue.jsx"
                    ]
                },
                {
                    "id": 408,
                    "route": "theme",
                    "title": "Theme = \"metro\"",
                    "component": ThemeIqualMetro,
                    "files": [
                        "options/ThemeIqualMetro/ThemeIqualMetro.jsx"
                    ]
                },
                {
                    "id": 410,
                    "route": "actionbuttons",
                    "title": "actionButtons",
                    "component": ActionButtons,
                    "files": [
                        "options/ActionButtons/ActionButtons.jsx"
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
                    "title": "addItem(text, isLeaf, parentNode)",
                    "component": AddItem,
                    "files": [
                        "api/AddItem/AddItem.jsx"
                    ]
                },
                {
                    "id": 502,
                    "route": "removeitem",
                    "title": "removeItem(id)",
                    "component": RemoveItem,
                    "files": [
                        "api/RemoveItem/RemoveItem.jsx"
                    ]
                },
                {
                    "id": 503,
                    "route": "findfolder",
                    "title": "findFolder(folderToFind)",
                    "component": UnderDevelopment,
                    "files": []
                },
                {
                    "id": 504,
                    "route": "findnode",
                    "title": "findNode(nodeToFind)",
                    "component": UnderDevelopment,
                    "files": []
                },
                {
                    "id": 505,
                    "route": "finditem",
                    "title": "findItem(itemToFind)",
                    "component": UnderDevelopment,
                    "files": []
                },
                {
                    "id": 506,
                    "route": "getitems",
                    "title": "getItems()",
                    "component": UnderDevelopment,
                    "files": []
                },
                {
                    "id": 507,
                    "route": "getparentnode",
                    "title": "getParentNode(item)",
                    "component": UnderDevelopment,
                    "files": []
                },
                {
                    "id": 508,
                    "route": "getrootitem",
                    "title": "getRootItem()",
                    "component": UnderDevelopment,
                    "files": []
                },
                {
                    "id": 509,
                    "route": "getselecteditem",
                    "title": "getSelectedItem()",
                    "component": UnderDevelopment,
                    "files": []
                },
                {
                    "id": 510,
                    "route": "load",
                    "title": "load()",
                    "component": UnderDevelopment,
                    "files": []
                },
                {
                    "id": 511,
                    "route": "loaddata",
                    "title": "loadData(data)",
                    "component": UnderDevelopment,
                    "files": []
                },
                {
                    "id": 512,
                    "route": "selectitem",
                    "title": "selectItem(item)",
                    "component": SelectItem,
                    "files": []
                },
                {
                    "id": 513,
                    "route": "settheme",
                    "title": "setTheme(newTheme)",
                    "component": UnderDevelopment,
                    "files": []
                }
            ]
        },
        {
            "id": 6,
            "title": "Events",
            "children": [
                {
                    "id": 601,
                    "route": "onrenderitem",
                    "title": "onRenderItem",
                    "component": OnRenderItem,
                    "files": [
                        "events/OnRenderItem/OnRenderItem.jsx",
                        "events/OnRenderItem/OnRenderItem.scss"
                    ]
                },
                {
                    "id": 602,
                    "route": "onbeforeLoad",
                    "title": "onBeforeLoad",
                    "component": OnBeforeLoad,
                    "files": [
                        "events/OnBeforeLoad/OnBeforeLoad.jsx",
                    ]
                },
                {
                    "id": 603,
                    "route": "onafterLoad",
                    "title": "onAfterLoad",
                    "component": OnAfterLoad,
                    "files": [
                        "events/OnAfterLoad/OnAfterLoad.jsx",
                    ]
                },
                {
                    "id": 604,
                    "route": "onselectItem",
                    "title": "onSelectItem",
                    "component": OnSelectItem,
                    "files": [
                        "events/OnSelectItem/OnSelectItem.jsx",
                    ]
                },
                {
                    "id": 605,
                    "route": "onexpanded",
                    "title": "onExpanded",
                    "component": OnExpanded,
                    "files": [
                        "events/OnExpanded/OnExpanded.jsx",
                    ]
                },
                {
                    "id": 606,
                    "route": "oncolapsed",
                    "title": "onColapsed",
                    "component": OnColapsed,
                    "files": [
                        "events/OnColapsed/OnColapsed.jsx",
                    ]
                },
                {
                    "id": 607,
                    "route": "onlazyLoad",
                    "title": "onLazyLoad (Manual Lazy Load)",
                    "component": OnLazyLoad,
                    "files": [
                        "events/OnLazyLoad/OnLazyLoad.jsx",
                    ]
                },
                {
                    "id": 608,
                    "route": "oncheckItem",
                    "title": "onCheckItem",
                    "component": OnCheckItem,
                    "files": [
                        "events/OnCheckItem/OnCheckItem.jsx",
                    ]
                }
            ]
        },
    ]
}