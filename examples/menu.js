import React from 'react'

import {default as bindingToLocalJsonText} from "raw!./texts/binding-to-local-json.text";
import {default as bindingToRemoteJsonText} from "raw!./texts/binding-to-remote-json.text";
import {default as bindingToJavaScriptObjectText} from "raw!./texts/binding-to-javascript-object.text";
import {default as themeCustomization} from "raw!./texts/theme-customization.text";

module.exports = {
  items: [
    {
      "id": 1,
      "text": "Binding to local JSON",
      "path": "/",
      "code": bindingToLocalJsonText,
      "language": "javascript"
    },
    {
      "id": 2,
      "text": "Binding to remote JSON",
      "path": "/remote",
      "code": bindingToRemoteJsonText,
      "language": "javascript"
    },
    {
      "id": 3,
      "text": "Binding to Javascript object",
      "path": "/javascript",
      "code": bindingToJavaScriptObjectText,
      "language": "javascript"
    },
    {
      "id": 4,
      "text": "Theme Customization",
      "path": "/theming",
      "code": themeCustomization,
      "language": "scss"
    }
  ]
}
