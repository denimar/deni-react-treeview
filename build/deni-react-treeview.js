(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["TreeView"] = factory();
	else
		root["TreeView"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "build/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(24);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(14);
var isBuffer = __webpack_require__(37);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),
/* 3 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

if (process.env.NODE_ENV === 'production') {
  module.exports = __webpack_require__(20);
} else {
  module.exports = __webpack_require__(21);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyFunction = __webpack_require__(4);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(2);
var normalizeHeaderName = __webpack_require__(39);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(15);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(15);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyObject = {};

if (process.env.NODE_ENV !== 'production') {
  Object.freeze(emptyObject);
}

module.exports = emptyObject;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (process.env.NODE_ENV !== 'production') {
  var invariant = __webpack_require__(6);
  var warning = __webpack_require__(8);
  var ReactPropTypesSecret = __webpack_require__(9);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _deniReactTreeview = __webpack_require__(34);

var _axios = __webpack_require__(35);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  loadingSetup: function loadingSetup(treeview) {
    //by props.url
    if (treeview.props.url || treeview.props.json || treeview.props.lazyLoad) {
      if (treeview.props.autoLoad) {
        treeview.api.load();
      }
    } else {
      //by props.items
      if (treeview.props.items) {
        treeview.api.loadData(treeview.props.items);
      }
    }
  },
  setTheme: function setTheme(treeview, newTheme) {
    //theme
    var theme = newTheme || 'classic';
    __webpack_require__(54)("./" + newTheme + '-theme.scss');

    treeview.setState({
      theme: newTheme
    });
  },
  load: function load(item) {
    var self = this;
    return new Promise(function (success, reject) {

      if (self.props.url || self.props.json) {
        var urlToLoad = self.props.url || self.props.json;
        if (self.props.lazyLoad) {
          var currentItem = item || self.state.rootItem || _deniReactTreeview.ROOT_ITEM;
          urlToLoad += '?lazyLoad=true&item=' + JSON.stringify(currentItem);
        }

        _axios2.default.get(urlToLoad).then(function (res) {
          self.api.loadData(res.data, item);
          success(res.data);
        });
      } else if (self.props.lazyLoad) {
        reject('TODO: under construction');
      } else {
        var msg = 'To use load function you must define lazyLoad:true or a valid url.';
        console.error(msg);
        reject(msg);
      }
    });
  },


  //
  // item is a optional param that when it is set data must be an array (children)
  //
  loadData: function loadData(data, item) {

    //onBeforeLoad event
    if (this.props.onBeforeLoad) {
      this.props.onBeforeLoad(item);
    }

    //
    var dataToLoad = data || [];

    //
    if (item) {
      //
      if (dataToLoad instanceof Array) {
        item.children = dataToLoad;
      } else {
        throw new Error('When item param is set the data must be an array.');
      }
    } else {
      this.setState({
        rootItem: _resolveRootItem(dataToLoad)
      });
    }

    //onAfterLoad event
    if (this.props.onAfterLoad) {
      this.props.onAfterLoad(this.state.rootItem, item);
    }
  }
};

function _resolveRootItem(items) {
  var rootItem = _deniReactTreeview.ROOT_ITEM;

  if (items) {
    if (items instanceof Array) {
      rootItem.children = items;
    } else if (items instanceof Object) {
      rootItem = items;
    } else {
      throw new Error('Parameter "items" adjusted in a wrong way.');
    }
    return rootItem;
  }
  return null;
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(2);
var settle = __webpack_require__(40);
var buildURL = __webpack_require__(42);
var parseHeaders = __webpack_require__(43);
var isURLSameOrigin = __webpack_require__(44);
var createError = __webpack_require__(16);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(45);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if (process.env.NODE_ENV !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(46);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(41);

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(22);

var _deniReactTreeviewItem = __webpack_require__(25);

var _deniReactTreeviewItem2 = _interopRequireDefault(_deniReactTreeviewItem);

var _deniReactTreeview = __webpack_require__(13);

var _deniReactTreeview2 = _interopRequireDefault(_deniReactTreeview);

var _deniReactTreeview3 = __webpack_require__(75);

var _deniReactTreeview4 = _interopRequireDefault(_deniReactTreeview3);

var _deniReactTreeview5 = __webpack_require__(79);

var _deniReactTreeview6 = _interopRequireDefault(_deniReactTreeview5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DeniReactTreeView = function (_React$Component) {
  _inherits(DeniReactTreeView, _React$Component);

  function DeniReactTreeView(props) {
    _classCallCheck(this, DeniReactTreeView);

    var _this = _possibleConstructorReturn(this, (DeniReactTreeView.__proto__ || Object.getPrototypeOf(DeniReactTreeView)).call(this, props));

    _this.state = {
      theme: props.theme
    };
    return _this;
  }

  _createClass(DeniReactTreeView, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.api = (0, _deniReactTreeview6.default)(this);
      _deniReactTreeview2.default.setTheme(this, this.props.theme);
      _deniReactTreeview2.default.loadingSetup(this);
    }
  }, {
    key: 'render',
    value: function render() {
      var self = this;
      var domTreeviewItem = _react2.default.createElement(_deniReactTreeviewItem2.default, { root: true, treeview: self, level: 0, item: this.state.rootItem });
      var children = this.state.rootItem && this.state.rootItem.children;
      if (children && children.length === 0) {
        if (this.props.items && this.props.items.length > 0) {
          children = this.props.items;
        }
      }

      return children !== undefined ? _react2.default.createElement(
        'div',
        { className: 'deni-react-treeview-container unselectable ' + self.state.theme },
        domTreeviewItem,
        _createComponentsChildren(self, domTreeviewItem, 1, children)
      ) : _react2.default.createElement('div', { className: 'deni-react-treeview-container unselectable' });
    }
  }]);

  return DeniReactTreeView;
}(_react2.default.Component);

//DeniReactTreeView.propTypes = treeviewProps.propTypes;


DeniReactTreeView.defaultProps = _deniReactTreeview4.default.defaultProps;

function _createComponentsChildren(treeview, parent, level, children) {
  return _react2.default.createElement(
    'div',
    null,
    parent.props.item && parent.props.item.expanded && children && children.length ? children.map(function (child) {
      var domTreeviewItem = _react2.default.createElement(_deniReactTreeviewItem2.default, { treeview: treeview, parent: parent, level: level, key: child.id, item: child });
      return _react2.default.createElement(
        'div',
        { key: child.id },
        domTreeviewItem,
        _createComponentsChildren(treeview, domTreeviewItem, level + 1, child.children)
      );
    }) : undefined
  );
}

exports.default = DeniReactTreeView;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.2.0
 * react.production.min.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var m=__webpack_require__(7),n=__webpack_require__(11),p=__webpack_require__(4),q="function"===typeof Symbol&&Symbol["for"],r=q?Symbol["for"]("react.element"):60103,t=q?Symbol["for"]("react.call"):60104,u=q?Symbol["for"]("react.return"):60105,v=q?Symbol["for"]("react.portal"):60106,w=q?Symbol["for"]("react.fragment"):60107,x="function"===typeof Symbol&&Symbol.iterator;
function y(a){for(var b=arguments.length-1,e="Minified React error #"+a+"; visit http://facebook.github.io/react/docs/error-decoder.html?invariant\x3d"+a,c=0;c<b;c++)e+="\x26args[]\x3d"+encodeURIComponent(arguments[c+1]);b=Error(e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings.");b.name="Invariant Violation";b.framesToPop=1;throw b;}
var z={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}};function A(a,b,e){this.props=a;this.context=b;this.refs=n;this.updater=e||z}A.prototype.isReactComponent={};A.prototype.setState=function(a,b){"object"!==typeof a&&"function"!==typeof a&&null!=a?y("85"):void 0;this.updater.enqueueSetState(this,a,b,"setState")};A.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate")};
function B(a,b,e){this.props=a;this.context=b;this.refs=n;this.updater=e||z}function C(){}C.prototype=A.prototype;var D=B.prototype=new C;D.constructor=B;m(D,A.prototype);D.isPureReactComponent=!0;function E(a,b,e){this.props=a;this.context=b;this.refs=n;this.updater=e||z}var F=E.prototype=new C;F.constructor=E;m(F,A.prototype);F.unstable_isAsyncReactComponent=!0;F.render=function(){return this.props.children};var G={current:null},H=Object.prototype.hasOwnProperty,I={key:!0,ref:!0,__self:!0,__source:!0};
function J(a,b,e){var c,d={},g=null,k=null;if(null!=b)for(c in void 0!==b.ref&&(k=b.ref),void 0!==b.key&&(g=""+b.key),b)H.call(b,c)&&!I.hasOwnProperty(c)&&(d[c]=b[c]);var f=arguments.length-2;if(1===f)d.children=e;else if(1<f){for(var h=Array(f),l=0;l<f;l++)h[l]=arguments[l+2];d.children=h}if(a&&a.defaultProps)for(c in f=a.defaultProps,f)void 0===d[c]&&(d[c]=f[c]);return{$$typeof:r,type:a,key:g,ref:k,props:d,_owner:G.current}}function K(a){return"object"===typeof a&&null!==a&&a.$$typeof===r}
function escape(a){var b={"\x3d":"\x3d0",":":"\x3d2"};return"$"+(""+a).replace(/[=:]/g,function(a){return b[a]})}var L=/\/+/g,M=[];function N(a,b,e,c){if(M.length){var d=M.pop();d.result=a;d.keyPrefix=b;d.func=e;d.context=c;d.count=0;return d}return{result:a,keyPrefix:b,func:e,context:c,count:0}}function O(a){a.result=null;a.keyPrefix=null;a.func=null;a.context=null;a.count=0;10>M.length&&M.push(a)}
function P(a,b,e,c){var d=typeof a;if("undefined"===d||"boolean"===d)a=null;var g=!1;if(null===a)g=!0;else switch(d){case "string":case "number":g=!0;break;case "object":switch(a.$$typeof){case r:case t:case u:case v:g=!0}}if(g)return e(c,a,""===b?"."+Q(a,0):b),1;g=0;b=""===b?".":b+":";if(Array.isArray(a))for(var k=0;k<a.length;k++){d=a[k];var f=b+Q(d,k);g+=P(d,f,e,c)}else if(null===a||"undefined"===typeof a?f=null:(f=x&&a[x]||a["@@iterator"],f="function"===typeof f?f:null),"function"===typeof f)for(a=
f.call(a),k=0;!(d=a.next()).done;)d=d.value,f=b+Q(d,k++),g+=P(d,f,e,c);else"object"===d&&(e=""+a,y("31","[object Object]"===e?"object with keys {"+Object.keys(a).join(", ")+"}":e,""));return g}function Q(a,b){return"object"===typeof a&&null!==a&&null!=a.key?escape(a.key):b.toString(36)}function R(a,b){a.func.call(a.context,b,a.count++)}
function S(a,b,e){var c=a.result,d=a.keyPrefix;a=a.func.call(a.context,b,a.count++);Array.isArray(a)?T(a,c,e,p.thatReturnsArgument):null!=a&&(K(a)&&(b=d+(!a.key||b&&b.key===a.key?"":(""+a.key).replace(L,"$\x26/")+"/")+e,a={$$typeof:r,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}),c.push(a))}function T(a,b,e,c,d){var g="";null!=e&&(g=(""+e).replace(L,"$\x26/")+"/");b=N(b,g,c,d);null==a||P(a,"",S,b);O(b)}
var U={Children:{map:function(a,b,e){if(null==a)return a;var c=[];T(a,c,null,b,e);return c},forEach:function(a,b,e){if(null==a)return a;b=N(null,null,b,e);null==a||P(a,"",R,b);O(b)},count:function(a){return null==a?0:P(a,"",p.thatReturnsNull,null)},toArray:function(a){var b=[];T(a,b,null,p.thatReturnsArgument);return b},only:function(a){K(a)?void 0:y("143");return a}},Component:A,PureComponent:B,unstable_AsyncComponent:E,Fragment:w,createElement:J,cloneElement:function(a,b,e){var c=m({},a.props),
d=a.key,g=a.ref,k=a._owner;if(null!=b){void 0!==b.ref&&(g=b.ref,k=G.current);void 0!==b.key&&(d=""+b.key);if(a.type&&a.type.defaultProps)var f=a.type.defaultProps;for(h in b)H.call(b,h)&&!I.hasOwnProperty(h)&&(c[h]=void 0===b[h]&&void 0!==f?f[h]:b[h])}var h=arguments.length-2;if(1===h)c.children=e;else if(1<h){f=Array(h);for(var l=0;l<h;l++)f[l]=arguments[l+2];c.children=f}return{$$typeof:r,type:a.type,key:d,ref:g,props:c,_owner:k}},createFactory:function(a){var b=J.bind(null,a);b.type=a;return b},
isValidElement:K,version:"16.2.0",__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{ReactCurrentOwner:G,assign:m}},V=Object.freeze({default:U}),W=V&&U||V;module.exports=W["default"]?W["default"]:W;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/** @license React v16.2.0
 * react.development.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (process.env.NODE_ENV !== "production") {
  (function() {
'use strict';

var _assign = __webpack_require__(7);
var emptyObject = __webpack_require__(11);
var invariant = __webpack_require__(6);
var warning = __webpack_require__(8);
var emptyFunction = __webpack_require__(4);
var checkPropTypes = __webpack_require__(12);

// TODO: this is special because it gets imported during build.

var ReactVersion = '16.2.0';

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol['for'];

var REACT_ELEMENT_TYPE = hasSymbol ? Symbol['for']('react.element') : 0xeac7;
var REACT_CALL_TYPE = hasSymbol ? Symbol['for']('react.call') : 0xeac8;
var REACT_RETURN_TYPE = hasSymbol ? Symbol['for']('react.return') : 0xeac9;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol['for']('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol['for']('react.fragment') : 0xeacb;

var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator';

function getIteratorFn(maybeIterable) {
  if (maybeIterable === null || typeof maybeIterable === 'undefined') {
    return null;
  }
  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
  if (typeof maybeIterator === 'function') {
    return maybeIterator;
  }
  return null;
}

/**
 * WARNING: DO NOT manually require this module.
 * This is a replacement for `invariant(...)` used by the error code system
 * and will _only_ be required by the corresponding babel pass.
 * It always throws.
 */

/**
 * Forked from fbjs/warning:
 * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
 *
 * Only change is we use console.warn instead of console.error,
 * and do nothing when 'console' is not supported.
 * This really simplifies the code.
 * ---
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var lowPriorityWarning = function () {};

{
  var printWarning = function (format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.warn(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  lowPriorityWarning = function (condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }
    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

var lowPriorityWarning$1 = lowPriorityWarning;

var didWarnStateUpdateForUnmountedComponent = {};

function warnNoop(publicInstance, callerName) {
  {
    var constructor = publicInstance.constructor;
    var componentName = constructor && (constructor.displayName || constructor.name) || 'ReactClass';
    var warningKey = componentName + '.' + callerName;
    if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
      return;
    }
    warning(false, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op.\n\nPlease check the code for the %s component.', callerName, callerName, componentName);
    didWarnStateUpdateForUnmountedComponent[warningKey] = true;
  }
}

/**
 * This is the abstract API for an update queue.
 */
var ReactNoopUpdateQueue = {
  /**
   * Checks whether or not this composite component is mounted.
   * @param {ReactClass} publicInstance The instance we want to test.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function (publicInstance) {
    return false;
  },

  /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {?function} callback Called after component is updated.
   * @param {?string} callerName name of the calling function in the public API.
   * @internal
   */
  enqueueForceUpdate: function (publicInstance, callback, callerName) {
    warnNoop(publicInstance, 'forceUpdate');
  },

  /**
   * Replaces all of the state. Always use this or `setState` to mutate state.
   * You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} completeState Next state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} callerName name of the calling function in the public API.
   * @internal
   */
  enqueueReplaceState: function (publicInstance, completeState, callback, callerName) {
    warnNoop(publicInstance, 'replaceState');
  },

  /**
   * Sets a subset of the state. This only exists because _pendingState is
   * internal. This provides a merging strategy that is not available to deep
   * properties which is confusing. TODO: Expose pendingState or don't use it
   * during the merge.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} partialState Next partial state to be merged with state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} Name of the calling function in the public API.
   * @internal
   */
  enqueueSetState: function (publicInstance, partialState, callback, callerName) {
    warnNoop(publicInstance, 'setState');
  }
};

/**
 * Base class helpers for the updating state of a component.
 */
function Component(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

Component.prototype.isReactComponent = {};

/**
 * Sets a subset of the state. Always use this to mutate
 * state. You should treat `this.state` as immutable.
 *
 * There is no guarantee that `this.state` will be immediately updated, so
 * accessing `this.state` after calling this method may return the old value.
 *
 * There is no guarantee that calls to `setState` will run synchronously,
 * as they may eventually be batched together.  You can provide an optional
 * callback that will be executed when the call to setState is actually
 * completed.
 *
 * When a function is provided to setState, it will be called at some point in
 * the future (not synchronously). It will be called with the up to date
 * component arguments (state, props, context). These values can be different
 * from this.* because your function may be called after receiveProps but before
 * shouldComponentUpdate, and this new state, props, and context will not yet be
 * assigned to this.
 *
 * @param {object|function} partialState Next partial state or function to
 *        produce next partial state to be merged with current state.
 * @param {?function} callback Called after state is updated.
 * @final
 * @protected
 */
Component.prototype.setState = function (partialState, callback) {
  !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : void 0;
  this.updater.enqueueSetState(this, partialState, callback, 'setState');
};

/**
 * Forces an update. This should only be invoked when it is known with
 * certainty that we are **not** in a DOM transaction.
 *
 * You may want to call this when you know that some deeper aspect of the
 * component's state has changed but `setState` was not called.
 *
 * This will not invoke `shouldComponentUpdate`, but it will invoke
 * `componentWillUpdate` and `componentDidUpdate`.
 *
 * @param {?function} callback Called after update is complete.
 * @final
 * @protected
 */
Component.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
};

/**
 * Deprecated APIs. These APIs used to exist on classic React classes but since
 * we would like to deprecate them, we're not going to move them over to this
 * modern base class. Instead, we define a getter that warns if it's accessed.
 */
{
  var deprecatedAPIs = {
    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
  };
  var defineDeprecationWarning = function (methodName, info) {
    Object.defineProperty(Component.prototype, methodName, {
      get: function () {
        lowPriorityWarning$1(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);
        return undefined;
      }
    });
  };
  for (var fnName in deprecatedAPIs) {
    if (deprecatedAPIs.hasOwnProperty(fnName)) {
      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
    }
  }
}

/**
 * Base class helpers for the updating state of a component.
 */
function PureComponent(props, context, updater) {
  // Duplicated from Component.
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

function ComponentDummy() {}
ComponentDummy.prototype = Component.prototype;
var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
pureComponentPrototype.constructor = PureComponent;
// Avoid an extra prototype jump for these methods.
_assign(pureComponentPrototype, Component.prototype);
pureComponentPrototype.isPureReactComponent = true;

function AsyncComponent(props, context, updater) {
  // Duplicated from Component.
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

var asyncComponentPrototype = AsyncComponent.prototype = new ComponentDummy();
asyncComponentPrototype.constructor = AsyncComponent;
// Avoid an extra prototype jump for these methods.
_assign(asyncComponentPrototype, Component.prototype);
asyncComponentPrototype.unstable_isAsyncReactComponent = true;
asyncComponentPrototype.render = function () {
  return this.props.children;
};

/**
 * Keeps track of the current owner.
 *
 * The current owner is the component who should own any components that are
 * currently being constructed.
 */
var ReactCurrentOwner = {
  /**
   * @internal
   * @type {ReactComponent}
   */
  current: null
};

var hasOwnProperty = Object.prototype.hasOwnProperty;

var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};

var specialPropKeyWarningShown;
var specialPropRefWarningShown;

function hasValidRef(config) {
  {
    if (hasOwnProperty.call(config, 'ref')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.ref !== undefined;
}

function hasValidKey(config) {
  {
    if (hasOwnProperty.call(config, 'key')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.key !== undefined;
}

function defineKeyPropWarningGetter(props, displayName) {
  var warnAboutAccessingKey = function () {
    if (!specialPropKeyWarningShown) {
      specialPropKeyWarningShown = true;
      warning(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
    }
  };
  warnAboutAccessingKey.isReactWarning = true;
  Object.defineProperty(props, 'key', {
    get: warnAboutAccessingKey,
    configurable: true
  });
}

function defineRefPropWarningGetter(props, displayName) {
  var warnAboutAccessingRef = function () {
    if (!specialPropRefWarningShown) {
      specialPropRefWarningShown = true;
      warning(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
    }
  };
  warnAboutAccessingRef.isReactWarning = true;
  Object.defineProperty(props, 'ref', {
    get: warnAboutAccessingRef,
    configurable: true
  });
}

/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, no instanceof check
 * will work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} key
 * @param {string|object} ref
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @param {*} owner
 * @param {*} props
 * @internal
 */
var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allow us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,

    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,

    // Record the component responsible for creating this element.
    _owner: owner
  };

  {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {};

    // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.
    Object.defineProperty(element._store, 'validated', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: false
    });
    // self and source are DEV only properties.
    Object.defineProperty(element, '_self', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: self
    });
    // Two elements created in two different places should be considered
    // equal for testing purposes and therefore we hide it from enumeration.
    Object.defineProperty(element, '_source', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: source
    });
    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};

/**
 * Create and return a new ReactElement of the given type.
 * See https://reactjs.org/docs/react-api.html#createelement
 */
function createElement(type, config, children) {
  var propName;

  // Reserved names are extracted
  var props = {};

  var key = null;
  var ref = null;
  var self = null;
  var source = null;

  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // Remaining properties are added to a new props object
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    {
      if (Object.freeze) {
        Object.freeze(childArray);
      }
    }
    props.children = childArray;
  }

  // Resolve default props
  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  {
    if (key || ref) {
      if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE) {
        var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
        if (key) {
          defineKeyPropWarningGetter(props, displayName);
        }
        if (ref) {
          defineRefPropWarningGetter(props, displayName);
        }
      }
    }
  }
  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
}

/**
 * Return a function that produces ReactElements of a given type.
 * See https://reactjs.org/docs/react-api.html#createfactory
 */


function cloneAndReplaceKey(oldElement, newKey) {
  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

  return newElement;
}

/**
 * Clone and return a new ReactElement using element as the starting point.
 * See https://reactjs.org/docs/react-api.html#cloneelement
 */
function cloneElement(element, config, children) {
  var propName;

  // Original props are copied
  var props = _assign({}, element.props);

  // Reserved names are extracted
  var key = element.key;
  var ref = element.ref;
  // Self is preserved since the owner is preserved.
  var self = element._self;
  // Source is preserved since cloneElement is unlikely to be targeted by a
  // transpiler, and the original source is probably a better indicator of the
  // true owner.
  var source = element._source;

  // Owner will be preserved, unless ref is overridden
  var owner = element._owner;

  if (config != null) {
    if (hasValidRef(config)) {
      // Silently steal the ref from the parent.
      ref = config.ref;
      owner = ReactCurrentOwner.current;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    // Remaining properties override existing props
    var defaultProps;
    if (element.type && element.type.defaultProps) {
      defaultProps = element.type.defaultProps;
    }
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        if (config[propName] === undefined && defaultProps !== undefined) {
          // Resolve default props
          props[propName] = defaultProps[propName];
        } else {
          props[propName] = config[propName];
        }
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  return ReactElement(element.type, key, ref, self, source, owner, props);
}

/**
 * Verifies the object is a ReactElement.
 * See https://reactjs.org/docs/react-api.html#isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a valid component.
 * @final
 */
function isValidElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}

var ReactDebugCurrentFrame = {};

{
  // Component that is being worked on
  ReactDebugCurrentFrame.getCurrentStack = null;

  ReactDebugCurrentFrame.getStackAddendum = function () {
    var impl = ReactDebugCurrentFrame.getCurrentStack;
    if (impl) {
      return impl();
    }
    return null;
  };
}

var SEPARATOR = '.';
var SUBSEPARATOR = ':';

/**
 * Escape and wrap key so it is safe to use as a reactid
 *
 * @param {string} key to be escaped.
 * @return {string} the escaped key.
 */
function escape(key) {
  var escapeRegex = /[=:]/g;
  var escaperLookup = {
    '=': '=0',
    ':': '=2'
  };
  var escapedString = ('' + key).replace(escapeRegex, function (match) {
    return escaperLookup[match];
  });

  return '$' + escapedString;
}

/**
 * TODO: Test that a single child and an array with one item have the same key
 * pattern.
 */

var didWarnAboutMaps = false;

var userProvidedKeyEscapeRegex = /\/+/g;
function escapeUserProvidedKey(text) {
  return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
}

var POOL_SIZE = 10;
var traverseContextPool = [];
function getPooledTraverseContext(mapResult, keyPrefix, mapFunction, mapContext) {
  if (traverseContextPool.length) {
    var traverseContext = traverseContextPool.pop();
    traverseContext.result = mapResult;
    traverseContext.keyPrefix = keyPrefix;
    traverseContext.func = mapFunction;
    traverseContext.context = mapContext;
    traverseContext.count = 0;
    return traverseContext;
  } else {
    return {
      result: mapResult,
      keyPrefix: keyPrefix,
      func: mapFunction,
      context: mapContext,
      count: 0
    };
  }
}

function releaseTraverseContext(traverseContext) {
  traverseContext.result = null;
  traverseContext.keyPrefix = null;
  traverseContext.func = null;
  traverseContext.context = null;
  traverseContext.count = 0;
  if (traverseContextPool.length < POOL_SIZE) {
    traverseContextPool.push(traverseContext);
  }
}

/**
 * @param {?*} children Children tree container.
 * @param {!string} nameSoFar Name of the key path so far.
 * @param {!function} callback Callback to invoke with each child found.
 * @param {?*} traverseContext Used to pass information throughout the traversal
 * process.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
  var type = typeof children;

  if (type === 'undefined' || type === 'boolean') {
    // All of the above are perceived as null.
    children = null;
  }

  var invokeCallback = false;

  if (children === null) {
    invokeCallback = true;
  } else {
    switch (type) {
      case 'string':
      case 'number':
        invokeCallback = true;
        break;
      case 'object':
        switch (children.$$typeof) {
          case REACT_ELEMENT_TYPE:
          case REACT_CALL_TYPE:
          case REACT_RETURN_TYPE:
          case REACT_PORTAL_TYPE:
            invokeCallback = true;
        }
    }
  }

  if (invokeCallback) {
    callback(traverseContext, children,
    // If it's the only child, treat the name as if it was wrapped in an array
    // so that it's consistent if the number of children grows.
    nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
    return 1;
  }

  var child;
  var nextName;
  var subtreeCount = 0; // Count of children found in the current subtree.
  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      nextName = nextNamePrefix + getComponentKey(child, i);
      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
    }
  } else {
    var iteratorFn = getIteratorFn(children);
    if (typeof iteratorFn === 'function') {
      {
        // Warn about using Maps as children
        if (iteratorFn === children.entries) {
          warning(didWarnAboutMaps, 'Using Maps as children is unsupported and will likely yield ' + 'unexpected results. Convert it to a sequence/iterable of keyed ' + 'ReactElements instead.%s', ReactDebugCurrentFrame.getStackAddendum());
          didWarnAboutMaps = true;
        }
      }

      var iterator = iteratorFn.call(children);
      var step;
      var ii = 0;
      while (!(step = iterator.next()).done) {
        child = step.value;
        nextName = nextNamePrefix + getComponentKey(child, ii++);
        subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
      }
    } else if (type === 'object') {
      var addendum = '';
      {
        addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + ReactDebugCurrentFrame.getStackAddendum();
      }
      var childrenString = '' + children;
      invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum);
    }
  }

  return subtreeCount;
}

/**
 * Traverses children that are typically specified as `props.children`, but
 * might also be specified through attributes:
 *
 * - `traverseAllChildren(this.props.children, ...)`
 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
 *
 * The `traverseContext` is an optional argument that is passed through the
 * entire traversal. It can be used to store accumulations or anything else that
 * the callback might find relevant.
 *
 * @param {?*} children Children tree object.
 * @param {!function} callback To invoke upon traversing each child.
 * @param {?*} traverseContext Context for traversal.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildren(children, callback, traverseContext) {
  if (children == null) {
    return 0;
  }

  return traverseAllChildrenImpl(children, '', callback, traverseContext);
}

/**
 * Generate a key string that identifies a component within a set.
 *
 * @param {*} component A component that could contain a manual key.
 * @param {number} index Index that is used if a manual key is not provided.
 * @return {string}
 */
function getComponentKey(component, index) {
  // Do some typechecking here since we call this blindly. We want to ensure
  // that we don't block potential future ES APIs.
  if (typeof component === 'object' && component !== null && component.key != null) {
    // Explicit key
    return escape(component.key);
  }
  // Implicit key determined by the index in the set
  return index.toString(36);
}

function forEachSingleChild(bookKeeping, child, name) {
  var func = bookKeeping.func,
      context = bookKeeping.context;

  func.call(context, child, bookKeeping.count++);
}

/**
 * Iterates through children that are typically specified as `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#react.children.foreach
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} forEachFunc
 * @param {*} forEachContext Context for forEachContext.
 */
function forEachChildren(children, forEachFunc, forEachContext) {
  if (children == null) {
    return children;
  }
  var traverseContext = getPooledTraverseContext(null, null, forEachFunc, forEachContext);
  traverseAllChildren(children, forEachSingleChild, traverseContext);
  releaseTraverseContext(traverseContext);
}

function mapSingleChildIntoContext(bookKeeping, child, childKey) {
  var result = bookKeeping.result,
      keyPrefix = bookKeeping.keyPrefix,
      func = bookKeeping.func,
      context = bookKeeping.context;


  var mappedChild = func.call(context, child, bookKeeping.count++);
  if (Array.isArray(mappedChild)) {
    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
  } else if (mappedChild != null) {
    if (isValidElement(mappedChild)) {
      mappedChild = cloneAndReplaceKey(mappedChild,
      // Keep both the (mapped) and old keys if they differ, just as
      // traverseAllChildren used to do for objects as children
      keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
    }
    result.push(mappedChild);
  }
}

function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
  var escapedPrefix = '';
  if (prefix != null) {
    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
  }
  var traverseContext = getPooledTraverseContext(array, escapedPrefix, func, context);
  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
  releaseTraverseContext(traverseContext);
}

/**
 * Maps children that are typically specified as `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#react.children.map
 *
 * The provided mapFunction(child, key, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} func The map function.
 * @param {*} context Context for mapFunction.
 * @return {object} Object containing the ordered map of results.
 */
function mapChildren(children, func, context) {
  if (children == null) {
    return children;
  }
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
  return result;
}

/**
 * Count the number of children that are typically specified as
 * `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#react.children.count
 *
 * @param {?*} children Children tree container.
 * @return {number} The number of children.
 */
function countChildren(children, context) {
  return traverseAllChildren(children, emptyFunction.thatReturnsNull, null);
}

/**
 * Flatten a children object (typically specified as `props.children`) and
 * return an array with appropriately re-keyed children.
 *
 * See https://reactjs.org/docs/react-api.html#react.children.toarray
 */
function toArray(children) {
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
  return result;
}

/**
 * Returns the first child in a collection of children and verifies that there
 * is only one child in the collection.
 *
 * See https://reactjs.org/docs/react-api.html#react.children.only
 *
 * The current implementation of this function assumes that a single child gets
 * passed without a wrapper, but the purpose of this helper function is to
 * abstract away the particular structure of children.
 *
 * @param {?object} children Child collection structure.
 * @return {ReactElement} The first and only `ReactElement` contained in the
 * structure.
 */
function onlyChild(children) {
  !isValidElement(children) ? invariant(false, 'React.Children.only expected to receive a single React element child.') : void 0;
  return children;
}

var describeComponentFrame = function (name, source, ownerName) {
  return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
};

function getComponentName(fiber) {
  var type = fiber.type;

  if (typeof type === 'string') {
    return type;
  }
  if (typeof type === 'function') {
    return type.displayName || type.name;
  }
  return null;
}

/**
 * ReactElementValidator provides a wrapper around a element factory
 * which validates the props passed to the element. This is intended to be
 * used only in DEV and could be replaced by a static type checker for languages
 * that support it.
 */

{
  var currentlyValidatingElement = null;

  var propTypesMisspellWarningShown = false;

  var getDisplayName = function (element) {
    if (element == null) {
      return '#empty';
    } else if (typeof element === 'string' || typeof element === 'number') {
      return '#text';
    } else if (typeof element.type === 'string') {
      return element.type;
    } else if (element.type === REACT_FRAGMENT_TYPE) {
      return 'React.Fragment';
    } else {
      return element.type.displayName || element.type.name || 'Unknown';
    }
  };

  var getStackAddendum = function () {
    var stack = '';
    if (currentlyValidatingElement) {
      var name = getDisplayName(currentlyValidatingElement);
      var owner = currentlyValidatingElement._owner;
      stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName(owner));
    }
    stack += ReactDebugCurrentFrame.getStackAddendum() || '';
    return stack;
  };

  var VALID_FRAGMENT_PROPS = new Map([['children', true], ['key', true]]);
}

function getDeclarationErrorAddendum() {
  if (ReactCurrentOwner.current) {
    var name = getComponentName(ReactCurrentOwner.current);
    if (name) {
      return '\n\nCheck the render method of `' + name + '`.';
    }
  }
  return '';
}

function getSourceInfoErrorAddendum(elementProps) {
  if (elementProps !== null && elementProps !== undefined && elementProps.__source !== undefined) {
    var source = elementProps.__source;
    var fileName = source.fileName.replace(/^.*[\\\/]/, '');
    var lineNumber = source.lineNumber;
    return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
  }
  return '';
}

/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */
var ownerHasKeyUseWarning = {};

function getCurrentComponentErrorInfo(parentType) {
  var info = getDeclarationErrorAddendum();

  if (!info) {
    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
    if (parentName) {
      info = '\n\nCheck the top-level render call using <' + parentName + '>.';
    }
  }
  return info;
}

/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */
function validateExplicitKey(element, parentType) {
  if (!element._store || element._store.validated || element.key != null) {
    return;
  }
  element._store.validated = true;

  var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
  if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
    return;
  }
  ownerHasKeyUseWarning[currentComponentErrorInfo] = true;

  // Usually the current owner is the offender, but if it accepts children as a
  // property, it may be the creator of the child that's responsible for
  // assigning it a key.
  var childOwner = '';
  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
    // Give the component that originally created this child.
    childOwner = ' It was passed a child from ' + getComponentName(element._owner) + '.';
  }

  currentlyValidatingElement = element;
  {
    warning(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.%s', currentComponentErrorInfo, childOwner, getStackAddendum());
  }
  currentlyValidatingElement = null;
}

/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */
function validateChildKeys(node, parentType) {
  if (typeof node !== 'object') {
    return;
  }
  if (Array.isArray(node)) {
    for (var i = 0; i < node.length; i++) {
      var child = node[i];
      if (isValidElement(child)) {
        validateExplicitKey(child, parentType);
      }
    }
  } else if (isValidElement(node)) {
    // This element was passed in a valid location.
    if (node._store) {
      node._store.validated = true;
    }
  } else if (node) {
    var iteratorFn = getIteratorFn(node);
    if (typeof iteratorFn === 'function') {
      // Entry iterators used to provide implicit keys,
      // but now we print a separate warning for them later.
      if (iteratorFn !== node.entries) {
        var iterator = iteratorFn.call(node);
        var step;
        while (!(step = iterator.next()).done) {
          if (isValidElement(step.value)) {
            validateExplicitKey(step.value, parentType);
          }
        }
      }
    }
  }
}

/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */
function validatePropTypes(element) {
  var componentClass = element.type;
  if (typeof componentClass !== 'function') {
    return;
  }
  var name = componentClass.displayName || componentClass.name;
  var propTypes = componentClass.propTypes;
  if (propTypes) {
    currentlyValidatingElement = element;
    checkPropTypes(propTypes, element.props, 'prop', name, getStackAddendum);
    currentlyValidatingElement = null;
  } else if (componentClass.PropTypes !== undefined && !propTypesMisspellWarningShown) {
    propTypesMisspellWarningShown = true;
    warning(false, 'Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', name || 'Unknown');
  }
  if (typeof componentClass.getDefaultProps === 'function') {
    warning(componentClass.getDefaultProps.isReactClassApproved, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
  }
}

/**
 * Given a fragment, validate that it can only be provided with fragment props
 * @param {ReactElement} fragment
 */
function validateFragmentProps(fragment) {
  currentlyValidatingElement = fragment;

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.keys(fragment.props)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;

      if (!VALID_FRAGMENT_PROPS.has(key)) {
        warning(false, 'Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.%s', key, getStackAddendum());
        break;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  if (fragment.ref !== null) {
    warning(false, 'Invalid attribute `ref` supplied to `React.Fragment`.%s', getStackAddendum());
  }

  currentlyValidatingElement = null;
}

function createElementWithValidation(type, props, children) {
  var validType = typeof type === 'string' || typeof type === 'function' || typeof type === 'symbol' || typeof type === 'number';
  // We warn in this case but don't throw. We expect the element creation to
  // succeed and there will likely be errors in render.
  if (!validType) {
    var info = '';
    if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
      info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
    }

    var sourceInfo = getSourceInfoErrorAddendum(props);
    if (sourceInfo) {
      info += sourceInfo;
    } else {
      info += getDeclarationErrorAddendum();
    }

    info += getStackAddendum() || '';

    warning(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', type == null ? type : typeof type, info);
  }

  var element = createElement.apply(this, arguments);

  // The result can be nullish if a mock or a custom function is used.
  // TODO: Drop this when these are no longer allowed as the type argument.
  if (element == null) {
    return element;
  }

  // Skip key warning if the type isn't valid since our key validation logic
  // doesn't expect a non-string/function type and can throw confusing errors.
  // We don't want exception behavior to differ between dev and prod.
  // (Rendering will throw with a helpful message and as soon as the type is
  // fixed, the key warnings will appear.)
  if (validType) {
    for (var i = 2; i < arguments.length; i++) {
      validateChildKeys(arguments[i], type);
    }
  }

  if (typeof type === 'symbol' && type === REACT_FRAGMENT_TYPE) {
    validateFragmentProps(element);
  } else {
    validatePropTypes(element);
  }

  return element;
}

function createFactoryWithValidation(type) {
  var validatedFactory = createElementWithValidation.bind(null, type);
  // Legacy hook TODO: Warn if this is accessed
  validatedFactory.type = type;

  {
    Object.defineProperty(validatedFactory, 'type', {
      enumerable: false,
      get: function () {
        lowPriorityWarning$1(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');
        Object.defineProperty(this, 'type', {
          value: type
        });
        return type;
      }
    });
  }

  return validatedFactory;
}

function cloneElementWithValidation(element, props, children) {
  var newElement = cloneElement.apply(this, arguments);
  for (var i = 2; i < arguments.length; i++) {
    validateChildKeys(arguments[i], newElement.type);
  }
  validatePropTypes(newElement);
  return newElement;
}

var React = {
  Children: {
    map: mapChildren,
    forEach: forEachChildren,
    count: countChildren,
    toArray: toArray,
    only: onlyChild
  },

  Component: Component,
  PureComponent: PureComponent,
  unstable_AsyncComponent: AsyncComponent,

  Fragment: REACT_FRAGMENT_TYPE,

  createElement: createElementWithValidation,
  cloneElement: cloneElementWithValidation,
  createFactory: createFactoryWithValidation,
  isValidElement: isValidElement,

  version: ReactVersion,

  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
    ReactCurrentOwner: ReactCurrentOwner,
    // Used by renderers to avoid bundling object-assign twice in UMD bundles:
    assign: _assign
  }
};

{
  _assign(React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, {
    // These should not be included in production.
    ReactDebugCurrentFrame: ReactDebugCurrentFrame,
    // Shim for React DOM 16.0.0 which still destructured (but not used) this.
    // TODO: remove in React 17.0.
    ReactComponentTreeHook: {}
  });
}



var React$2 = Object.freeze({
	default: React
});

var React$3 = ( React$2 && React ) || React$2;

// TODO: decide on the top-level export form.
// This is hacky but makes it work with both Rollup and Jest.
var react = React$3['default'] ? React$3['default'] : React$3;

module.exports = react;
  })();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(23);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js??ref--2-1!../../node_modules/sass-loader/lib/loader.js??ref--2-2!./deni-react-treeview.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js??ref--2-1!../../node_modules/sass-loader/lib/loader.js??ref--2-2!./deni-react-treeview.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".deni-react-treeview-container {\n  font-family: tahoma,arial;\n  font-size: 12px;\n  padding: 0px;\n  overflow-x: auto;\n  overflow-y: auto;\n  border: solid 1px;\n  border-color: #a5c7e3;\n  width: 250px;\n  height: 350px;\n  background-color: #fafafa; }\n  .deni-react-treeview-container * {\n    box-sizing: border-box; }\n    .deni-react-treeview-container *.unselectable {\n      -webkit-touch-callout: none;\n      /* iOS Safari */\n      -webkit-user-select: none;\n      /* Chrome/Safari/Opera */\n      -khtml-user-select: none;\n      /* Konqueror */\n      -moz-user-select: none;\n      /* Firefox */\n      -ms-user-select: none;\n      /* Internet Explorer/Edge */\n      user-select: none;\n      /* Non-prefixed version, currently\n                                  not supported by any browser */ }\n", ""]);

// exports


/***/ }),
/* 24 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(26);

var _deniReactTreeviewItem = __webpack_require__(28);

var _deniReactTreeviewItem2 = _interopRequireDefault(_deniReactTreeviewItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//import treeviewItemProps from './deni-react-treeview-item.props'

var DeniReactTreeViewItem = function (_React$Component) {
  _inherits(DeniReactTreeViewItem, _React$Component);

  function DeniReactTreeViewItem(props) {
    _classCallCheck(this, DeniReactTreeViewItem);

    return _possibleConstructorReturn(this, (DeniReactTreeViewItem.__proto__ || Object.getPrototypeOf(DeniReactTreeViewItem)).call(this, props));
  }

  _createClass(DeniReactTreeViewItem, [{
    key: 'render',
    value: function render() {
      var self = this;
      var treeview = this.props.treeview;
      var item = this.props.item;
      var level = this.props.level;
      var selectRow = treeview.props.selectRow;

      var marginLeft = 5;
      var marginLeftItems = level === 0 ? 0 : treeview.props.showRoot ? level * treeview.props.marginItems : (level - 1) * treeview.props.marginItems;
      var style = {
        paddingLeft: marginLeft + marginLeftItems + 'px'
      };
      if (!treeview.props.showRoot && this.props.root) {
        style.display = 'none';
      }

      return _react2.default.createElement(
        'div',
        { style: style, className: _deniReactTreeviewItem2.default.getClassItem(treeview, item, level, selectRow), onMouseDown: _deniReactTreeviewItem2.default.treeviewItemContainerMouseDown.bind(this, this.props.treeview, selectRow), onDoubleClick: _deniReactTreeviewItem2.default.treeviewItemContainerDoubleClick.bind(this, _deniReactTreeviewItem2.default, this.props.treeview, selectRow) },
        _react2.default.createElement('div', { className: _deniReactTreeviewItem2.default.getClassExpandButton(treeview, this, item), onMouseDown: _deniReactTreeviewItem2.default.treeviewItemExpandButtonMouseDown.bind(this, this.props.treeview, item) }),
        _react2.default.createElement('div', { className: _deniReactTreeviewItem2.default.getClassCheckbox(treeview, item), onMouseDown: _deniReactTreeviewItem2.default.treeviewItemCheckboxMouseDown.bind(this, _deniReactTreeviewItem2.default, this.props.treeview, item) }),
        _react2.default.createElement(
          'div',
          { className: _deniReactTreeviewItem2.default.getClassIconAndText(treeview, item, selectRow) },
          _react2.default.createElement('div', { className: _deniReactTreeviewItem2.default.getClassIcon(treeview, item) }),
          _react2.default.createElement(
            'div',
            { className: 'text' },
            _react2.default.createElement(
              'span',
              { className: 'text-inner' },
              _deniReactTreeviewItem2.default.getInnerText(treeview, item)
            )
          )
        )
      );
    }
  }]);

  return DeniReactTreeViewItem;
}(_react2.default.Component);

//DeniReactTreeViewItem.propTypes = treeviewItemProps.propTypes;
//DeniReactTreeViewItem.defaultProps = treeviewItemProps.defaultProps;

exports.default = DeniReactTreeViewItem;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(27);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js??ref--2-1!../../node_modules/sass-loader/lib/loader.js??ref--2-2!./deni-react-treeview-item.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js??ref--2-1!../../node_modules/sass-loader/lib/loader.js??ref--2-2!./deni-react-treeview-item.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".deni-react-treeview-container.classic {\n  border-color: #a5c7e3; }\n  .deni-react-treeview-container.classic .deni-react-treeview-item-container.classic {\n    color: #245075 !important;\n    border-color: #76aad5 !important; }\n    .deni-react-treeview-container.classic .deni-react-treeview-item-container.classic:hover.select-row {\n      background-color: #ebf3f9; }\n    .deni-react-treeview-container.classic .deni-react-treeview-item-container.classic:hover:not(.select-row) {\n      background-color: transparent; }\n    .deni-react-treeview-container.classic .deni-react-treeview-item-container.classic.selected {\n      background: #ebf3f9;\n      /* Old browsers */\n      background: -moz-linear-gradient(top, #ebf3f9 0%, #9DC2E1 100%);\n      /* FF3.6-15 */\n      background: -webkit-linear-gradient(top, #ebf3f9 0%, #9DC2E1 100%);\n      /* Chrome10-25,Safari5.1-6 */\n      background: linear-gradient(to bottom, #ebf3f9 0%, #9DC2E1 100%);\n      /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */\n      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=$selection-background-start-color, endColorstr=$end-color,GradientType=0 );\n      /* IE6-9 */\n      outline-color: #c4daed !important; }\n    .deni-react-treeview-container.classic .deni-react-treeview-item-container.classic .checkbox {\n      border-color: #adcce6 !important; }\n      .deni-react-treeview-container.classic .deni-react-treeview-item-container.classic .checkbox.selected {\n        border-color: #7eafd7 !important; }\n    .deni-react-treeview-container.classic .deni-react-treeview-item-container.classic .expand-button {\n      color: #245075 !important; }\n    .deni-react-treeview-container.classic .deni-react-treeview-item-container.classic .icon-and-text:hover.select-row {\n      background-color: transparent; }\n    .deni-react-treeview-container.classic .deni-react-treeview-item-container.classic .icon-and-text:hover:not(.select-row) {\n      background-color: #ebf3f9; }\n    .deni-react-treeview-container.classic .deni-react-treeview-item-container.classic .icon-and-text.select-row {\n      border: 0;\n      padding: 1px; }\n    .deni-react-treeview-container.classic .deni-react-treeview-item-container.classic .icon-and-text.selected {\n      background: #ebf3f9;\n      /* Old browsers */\n      background: -moz-linear-gradient(top, #ebf3f9 0%, #9DC2E1 100%);\n      /* FF3.6-15 */\n      background: -webkit-linear-gradient(top, #ebf3f9 0%, #9DC2E1 100%);\n      /* Chrome10-25,Safari5.1-6 */\n      background: linear-gradient(to bottom, #ebf3f9 0%, #9DC2E1 100%);\n      /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */\n      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=$selection-background-start-color, endColorstr=$end-color,GradientType=0 );\n      /* IE6-9 */ }\n    .deni-react-treeview-container.classic .deni-react-treeview-item-container.classic .icon-and-text .icon {\n      background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAARlJREFUeNqsUz1PwzAUPDtOUASpYKkQVWcQA/+DhbLA32CoKAMSTAwgFsQfQWLoX4GRDFXGIiqiyk4e7wUWmg8phJPOtvzunc6WrYgIXaD06KKhij0eD2uqUxBeDC9OmcNKCYd7ujm7ryodXz5ong6UPpqcP9+O76y1vwS+7yOOY1jr0OttlQyiaB0n148TAyK9XFqkaboiSTEYDNnkDUkyKxkkiSQkzQbwsiyHcBXz+Tv6/W1m+QiSEDT1igTO5RBWYbH4rNwPw/AnQU5ek0EdCj33SgLjHEHYzoAkgfmHBDmZuktsQqHPvxN0MyCbbWjtIQjWWhlIj/QqtT+6QrSz+6ef9DF7VTwFzE2madnu5K2prt/5S4ABADcIlSf6Ag8YAAAAAElFTkSuQmCC\"); }\n      .deni-react-treeview-container.classic .deni-react-treeview-item-container.classic .icon-and-text .icon.isleaf {\n        background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACjElEQVR42o2SW0hUURSG/32OhnhAqJDCzF6kN0lLGtJCtLQyKIMotRjBy1sqVEZS9mKZBdKFHBJpJEKD0urBvAchhqY5kp6MHkRlMhpHR2fOHuZybu3KxhEr+/fL3g/rWx9rL4Kl1La+ta0XwiNUTVf9sgJF0yB5FVCfAqt9Lnx8yt7Ph4Qc6btVtIigkN+XJ28s9MTeHQLPETipF3aXB7NOJ2wLXnyamYVlwgq/jN5Fj+9QX3WhZxXg8ethmpMSzwA666rDxSBOKsHhViBa7XC5ndgWuRH1PSP9XlnJZJDFFYBHXe/p6bQEIanoGTZECJDhh98jg6gc5ue+oqwkBXlp8TB3WfBiYLx3yuYwiqbS6QDA3DVEjWk7BZ7n8Kc09IzAEBsFm+RG6+BndFsmhsdMxYkBwIO2d7QwI1HIrmgH0XmEMo7MA5qiQ9PZQF0SrDNOpBq2YPPWcLT0i+KYqTQuALjzvJeePZr8V4Nf0fHF4cD49DzKHnaKo7Uly4Cqpg568WS6kH21GxpREIZQEKKxEo4ZaXDJfrgWJBwwxGBPfDTONbxigOJlQLm5jVYaD65hAHgUP77ZKY5fbxI/BAPOm9vpTWOGkH2lExzHIKwrYYcnPNQwnhnpkKjGukciddcm5N9tFkdNJasBaxnouo5J2wKOVTaKYjDggrmDVhvThVOX2S9wPOu8tGnk5+zAMRPqk7HfEI2kuEjk32tmvxAEKK1rpTUFh9c00JjBFDPIYgYrAAW3W2hdcZaQU9GGdWwJOMIFCnRNxY+X5FaxLyEK6ckxOFPzdCUg90YjbbyUK+A/Mk89yCyvFwfvBy1SbF6VLWF7TIRPUdV/FRNNh6qowsDHyaG5l9d2fwfyXD4gAGnljAAAAABJRU5ErkJggg==\"); }\n      .deni-react-treeview-container.classic .deni-react-treeview-item-container.classic .icon-and-text .icon.expanded {\n        background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAZpJREFUeNqkU0tLQkEUPjN3ShAzF66CaNGiaNEviFpLgbSpXf2ACIqgFkELaVFhtAratQ8qokU/oFVbMQtJvWpWGvYwtet9TWfu1QorvOGBb84M5/WdOTOEcw7tCKHBlT8sMIhr4BfLGXC4BrALM8QUoveHG9oPQ/NhwVCQbOjp0C5F6zDiwE7Aed/p5tKWruufTlY8bkqliqVN8wvH6wvhydWd5UYdkYCqqgaKotQTCEewnJuDBSqVmshOrWhKgCJVqeHcKtiGKdqTgGIOQmwGum7AxVUKinXKzX1/1y5Xp6g8gpe8iBxuGZhcKjyXQZIkmBkfczS62YnRQCKX75/b3t8QDNhD8QX83V5Ipe7Bybug2Pt5NJ7A4nEqGOQKT+Bzu0HTDNB1syUYYxCJy0kwzIRogb0rKjAiQVXXHLVQrqqvsZtsFu8hbyXwe73WeMQtO5GonJGxuiyeC+Oa4fF5PEirw9nbx9FdxtN5eMwkzcgRnoeCa9DVM/CvH/R2l+axkz3clQguOFjw1f+FUzEQCqJG2v3OHwIMAOW1JPnAAAJxAAAAAElFTkSuQmCC\"); }\n\n.deni-react-treeview-item-container {\n  align-items: center;\n  display: flex;\n  height: 22px;\n  margin-top: 2px;\n  margin-bottom: 3px;\n  width: 100%; }\n  .deni-react-treeview-item-container * {\n    box-sizing: border-box; }\n    .deni-react-treeview-item-container *.unselectable {\n      -webkit-touch-callout: none;\n      /* iOS Safari */\n      -webkit-user-select: none;\n      /* Chrome/Safari/Opera */\n      -khtml-user-select: none;\n      /* Konqueror */\n      -moz-user-select: none;\n      /* Firefox */\n      -ms-user-select: none;\n      /* Internet Explorer/Edge */\n      user-select: none;\n      /* Non-prefixed version, currently\n                                  not supported by any browser */ }\n  .deni-react-treeview-item-container.hidden {\n    display: none; }\n  .deni-react-treeview-item-container:hover.select-row {\n    border-style: dotted;\n    border-width: 1px;\n    border-color: silver;\n    background-color: transparent;\n    cursor: pointer;\n    border-left: 0;\n    border-right: 0;\n    z-index: 1; }\n    .deni-react-treeview-item-container:hover.select-row.selected {\n      border-top: 0;\n      border-bottom: 0; }\n  .deni-react-treeview-item-container:hover .action-button {\n    visibility: visible;\n    opacity: 1; }\n  .deni-react-treeview-item-container.selected {\n    outline: solid 1px;\n    outline-color: #ebf3f9;\n    z-index: 2; }\n  .deni-react-treeview-item-container .expand-button {\n    width: 18px;\n    height: 16px;\n    color: #245075;\n    font-size: 22px;\n    padding-top: 0px;\n    cursor: pointer;\n    text-align: center;\n    align-items: center;\n    display: none;\n    flex-direction: row;\n    font-family: courier new;\n    font-weight: bold; }\n    .deni-react-treeview-item-container .expand-button.hasChild {\n      display: flex; }\n    .deni-react-treeview-item-container .expand-button.expanded {\n      font-size: 24px; }\n      .deni-react-treeview-item-container .expand-button.expanded:before {\n        content: '-'; }\n    .deni-react-treeview-item-container .expand-button.colapsed:before {\n      content: '+'; }\n    .deni-react-treeview-item-container .expand-button.loading {\n      background-image: url(\"data:image/gif;base64,R0lGODlhEAAQALMMAKqooJGOhp2bk7e1rZ2bkre1rJCPhqqon8PBudDOxXd1bISCef///wAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFAAAMACwAAAAAEAAQAAAET5DJyYyhmAZ7sxQEs1nMsmACGJKmSaVEOLXnK1PuBADepCiMg/DQ+/2GRI8RKOxJfpTCIJNIYArS6aRajWYZCASDa41Ow+Fx2YMWOyfpTAQAIfkEBQAADAAsAAAAABAAEAAABE6QyckEoZgKe7MEQMUxhoEd6FFdQWlOqTq15SlT9VQM3rQsjMKO5/n9hANixgjc9SQ/CgKRUSgw0ynFapVmGYkEg3v1gsPibg8tfk7CnggAIfkEBQAADAAsAAAAABAAEAAABE2QycnOoZjaA/IsRWV1goCBoMiUJTW8A0XMBPZmM4Ug3hQEjN2uZygahDyP0RBMEpmTRCKzWGCkUkq1SsFOFQrG1tr9gsPc3jnco4A9EQAh+QQFAAAMACwAAAAAEAAQAAAETpDJyUqhmFqbJ0LMIA7McWDfF5LmAVApOLUvLFMmlSTdJAiM3a73+wl5HYKSEET2lBSFIhMIYKRSimFriGIZiwWD2/WCw+Jt7xxeU9qZCAAh+QQFAAAMACwAAAAAEAAQAAAETZDJyRCimFqbZ0rVxgwF9n3hSJbeSQ2rCWIkpSjddBzMfee7nQ/XCfJ+OQYAQFksMgQBxumkEKLSCfVpMDCugqyW2w18xZmuwZycdDsRACH5BAUAAAwALAAAAAAQABAAAARNkMnJUqKYWpunUtXGIAj2feFIlt5JrWybkdSydNNQMLaND7pC79YBFnY+HENHMRgyhwPGaQhQotGm00oQMLBSLYPQ9QIASrLAq5x0OxEAIfkEBQAADAAsAAAAABAAEAAABE2QycmUopham+da1cYkCfZ94UiW3kmtbJuRlGF0E4Iwto3rut6tA9wFAjiJjkIgZAYDTLNJgUIpgqyAcTgwCuACJssAdL3gpLmbpLAzEQA7\");\n      background-repeat: no-repeat; }\n      .deni-react-treeview-item-container .expand-button.loading:before {\n        content: ' '; }\n    .deni-react-treeview-item-container .expand-button:hover {\n      color: #282d3e; }\n  .deni-react-treeview-item-container .checkbox {\n    width: 14px;\n    height: 14px;\n    border: solid 1px;\n    border-color: #adcce6;\n    border-radius: 2px;\n    display: inline-table;\n    cursor: pointer;\n    margin-right: 3px; }\n    .deni-react-treeview-item-container .checkbox.hidden {\n      display: none; }\n    .deni-react-treeview-item-container .checkbox.checked {\n      background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACcUlEQVQ4jZVR30tTcRw99/u9P5x36s1fA5d1lZWYpTdfCtRtiQmbmflWgTF78qnsL7D9BfPFBymSwEgjKE3QCKYPRmWml0TIDF1mc0NzVzc3NnW3hzBERul5/HDO+ZzP+TA4CrohE4Z08JSXBcr7eMrdY48glghDRq/JTtksFmB5y4+Pa1MyOayeMrT9krlGtpmrYUwzwH68Bpl8uv1QCbgHrCJyYodTrsf32AIAQGeSAAgOlYAlrOdW6XXwHIuoHkFZdjk+rargCNf5X4P0RwZXaXaJvdKk4GdiCeXZlQhEg5j5NeujhLr/nNAFBQQKGKhog7onzugxSoQhHlfZTYSTGnINeRA5I57NvQBL2NbJJlUj6ILHIhVNO07W9eSkHZtGNzz7ivM0WZxSrpiDLYRRnHEK71cmEN2Jdk42qWMAwIJB++2yFhg4AZflWvTO9bfPPvwiiZzhcX56nuuqpQGBnWVYMkrgj6xgKqj6KEPde0sIGMDIi1hLrGJzN4Q759tgL6xyUUJHW8+1YIckIPIiOMJj6NswKKHN7xontb8p0QgplNAu2s1WxPUY4noMtkIbiiUZFaaz2MA6ThiK4PWNYUHzud9emejbXzLFEF77awPy5vamYjNbEUcca7tBVORUIIwN5KeZ4A8HMPR1WB1v+HDj4JcoAOiv9IFQvSZHtiNKdUEVCGWwmgwik8+CgYjo/fwU28mEw/fkRyClAQDEXyYGYo6YPB+aV6zmGmQJmcgTTPAujmFBW3R7HeN9B8Upceb56R7nmzp9cL1f717q1OtGrNP/4jOphhcGK+8LVLgrUF6jhDaP1HvVVDwA+A0rr9F+/wY4EQAAAABJRU5ErkJggg==\");\n      background-size: 10px 10px;\n      background-color: transparent;\n      background-repeat: no-repeat;\n      background-position: center; }\n    .deni-react-treeview-item-container .checkbox.undetermined {\n      background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAA4SURBVChTY3iDF4Ckf/z5gRVBpZ9/e44VQaWvvr969cNVTBIqfeTlEawIKr3n2R6siB7SOMGbNwBflQU0aOd8igAAAABJRU5ErkJggg==\");\n      background-size: 10px 10px;\n      background-color: transparent;\n      background-repeat: no-repeat;\n      background-position: center; }\n    .deni-react-treeview-item-container .checkbox.selected {\n      border-color: #629ecf;\n      background-color: white; }\n  .deni-react-treeview-item-container .icon-and-text {\n    display: flex;\n    align-items: center;\n    padding-left: 5px;\n    padding-right: 5px;\n    border-radius: 3px;\n    cursor: pointer;\n    height: 22px; }\n    .deni-react-treeview-item-container .icon-and-text.select-row {\n      flex: 1;\n      justify-content: space-around; }\n      .deni-react-treeview-item-container .icon-and-text.select-row:hover {\n        border-width: 0px;\n        padding-left: 5px; }\n    .deni-react-treeview-item-container .icon-and-text:hover {\n      border-style: dotted;\n      border-width: 1px;\n      border-color: silver;\n      background-color: transparent;\n      padding-left: calc(5px - 1px); }\n    .deni-react-treeview-item-container .icon-and-text.selected {\n      border: 1px solid;\n      border-color: #95bddf;\n      padding-left: calc(5px - 1px);\n      background: #ebf3f9;\n      /* Old browsers */\n      background: -moz-linear-gradient(top, #ebf3f9 0%, #9DC2E1 100%);\n      /* FF3.6-15 */\n      background: -webkit-linear-gradient(top, #ebf3f9 0%, #9DC2E1 100%);\n      /* Chrome10-25,Safari5.1-6 */\n      background: linear-gradient(to bottom, #ebf3f9 0%, #9DC2E1 100%);\n      /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */\n      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=$selection-background-start-color, endColorstr=$end-color,GradientType=0 );\n      /* IE6-9 */ }\n    .deni-react-treeview-item-container .icon-and-text .icon {\n      width: 16px;\n      height: 16px;\n      display: inline-block;\n      background-repeat: no-repeat;\n      margin-right: 5px;\n      background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAARlJREFUeNqsUz1PwzAUPDtOUASpYKkQVWcQA/+DhbLA32CoKAMSTAwgFsQfQWLoX4GRDFXGIiqiyk4e7wUWmg8phJPOtvzunc6WrYgIXaD06KKhij0eD2uqUxBeDC9OmcNKCYd7ujm7ryodXz5ong6UPpqcP9+O76y1vwS+7yOOY1jr0OttlQyiaB0n148TAyK9XFqkaboiSTEYDNnkDUkyKxkkiSQkzQbwsiyHcBXz+Tv6/W1m+QiSEDT1igTO5RBWYbH4rNwPw/AnQU5ek0EdCj33SgLjHEHYzoAkgfmHBDmZuktsQqHPvxN0MyCbbWjtIQjWWhlIj/QqtT+6QrSz+6ef9DF7VTwFzE2madnu5K2prt/5S4ABADcIlSf6Ag8YAAAAAElFTkSuQmCC\"); }\n      .deni-react-treeview-item-container .icon-and-text .icon.hidden {\n        display: none; }\n      .deni-react-treeview-item-container .icon-and-text .icon.isleaf {\n        background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACjElEQVR42o2SW0hUURSG/32OhnhAqJDCzF6kN0lLGtJCtLQyKIMotRjBy1sqVEZS9mKZBdKFHBJpJEKD0urBvAchhqY5kp6MHkRlMhpHR2fOHuZybu3KxhEr+/fL3g/rWx9rL4Kl1La+ta0XwiNUTVf9sgJF0yB5FVCfAqt9Lnx8yt7Ph4Qc6btVtIigkN+XJ28s9MTeHQLPETipF3aXB7NOJ2wLXnyamYVlwgq/jN5Fj+9QX3WhZxXg8ethmpMSzwA666rDxSBOKsHhViBa7XC5ndgWuRH1PSP9XlnJZJDFFYBHXe/p6bQEIanoGTZECJDhh98jg6gc5ue+oqwkBXlp8TB3WfBiYLx3yuYwiqbS6QDA3DVEjWk7BZ7n8Kc09IzAEBsFm+RG6+BndFsmhsdMxYkBwIO2d7QwI1HIrmgH0XmEMo7MA5qiQ9PZQF0SrDNOpBq2YPPWcLT0i+KYqTQuALjzvJeePZr8V4Nf0fHF4cD49DzKHnaKo7Uly4Cqpg568WS6kH21GxpREIZQEKKxEo4ZaXDJfrgWJBwwxGBPfDTONbxigOJlQLm5jVYaD65hAHgUP77ZKY5fbxI/BAPOm9vpTWOGkH2lExzHIKwrYYcnPNQwnhnpkKjGukciddcm5N9tFkdNJasBaxnouo5J2wKOVTaKYjDggrmDVhvThVOX2S9wPOu8tGnk5+zAMRPqk7HfEI2kuEjk32tmvxAEKK1rpTUFh9c00JjBFDPIYgYrAAW3W2hdcZaQU9GGdWwJOMIFCnRNxY+X5FaxLyEK6ckxOFPzdCUg90YjbbyUK+A/Mk89yCyvFwfvBy1SbF6VLWF7TIRPUdV/FRNNh6qowsDHyaG5l9d2fwfyXD4gAGnljAAAAABJRU5ErkJggg==\"); }\n      .deni-react-treeview-item-container .icon-and-text .icon.expanded {\n        background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAZpJREFUeNqkU0tLQkEUPjN3ShAzF66CaNGiaNEviFpLgbSpXf2ACIqgFkELaVFhtAratQ8qokU/oFVbMQtJvWpWGvYwtet9TWfu1QorvOGBb84M5/WdOTOEcw7tCKHBlT8sMIhr4BfLGXC4BrALM8QUoveHG9oPQ/NhwVCQbOjp0C5F6zDiwE7Aed/p5tKWruufTlY8bkqliqVN8wvH6wvhydWd5UYdkYCqqgaKotQTCEewnJuDBSqVmshOrWhKgCJVqeHcKtiGKdqTgGIOQmwGum7AxVUKinXKzX1/1y5Xp6g8gpe8iBxuGZhcKjyXQZIkmBkfczS62YnRQCKX75/b3t8QDNhD8QX83V5Ipe7Bybug2Pt5NJ7A4nEqGOQKT+Bzu0HTDNB1syUYYxCJy0kwzIRogb0rKjAiQVXXHLVQrqqvsZtsFu8hbyXwe73WeMQtO5GonJGxuiyeC+Oa4fF5PEirw9nbx9FdxtN5eMwkzcgRnoeCa9DVM/CvH/R2l+axkz3clQguOFjw1f+FUzEQCqJG2v3OHwIMAOW1JPnAAAJxAAAAAElFTkSuQmCC\"); }\n    .deni-react-treeview-item-container .icon-and-text .text {\n      display: inline-block;\n      height: 22px;\n      align-items: center;\n      display: flex;\n      flex: 1;\n      justify-content: flex-start; }\n      .deni-react-treeview-item-container .icon-and-text .text .text-inner {\n        white-space: nowrap;\n        flex: 1;\n        height: 22px;\n        align-items: center;\n        flex-direction: row;\n        display: flex; }\n", ""]);

// exports


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _deniReactTreeviewItem = __webpack_require__(29);

var _actionButtons = __webpack_require__(30);

var _actionButtons2 = _interopRequireDefault(_actionButtons);

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  getClassItem: function getClassItem(treeview, item, level, selectRow) {
    var classNames = ['deni-react-treeview-item-container'];

    classNames.push('unselectable');

    if (item.root === true && treeview.props.showRoot === false) {
      classNames.push('hidden');
    } else {
      classNames.push(treeview.state.theme);
      classNames.push('level-' + level);

      if (selectRow) {
        classNames.push('select-row');
        if (this.isSelected(treeview, item)) {
          classNames.push('selected');
        }
      }
    }

    return classNames.join(' ');
  },
  getClassIcon: function getClassIcon(treeview, item) {
    var classNames = ['icon'];

    if (treeview.props.showIcon) {
      if (item.isLeaf && !(item.children && item.children.length > 0)) {
        //when it has children, so is no longer has to be leaf
        classNames.push('isleaf');
      }

      if (item.expanded) {
        classNames.push('expanded');
      }
    } else {
      classNames.push('hidden');
    }

    return classNames.join(' ');
  },
  getClassExpandButton: function getClassExpandButton(treeview, treeviewItem, item) {
    var classNames = ['expand-button'];

    if (item.children && item.children.length > 0 || treeview.props.lazyLoad) {
      classNames.push('hasChild');

      if (item.expanded) {
        classNames.push('expanded');
      } else {
        classNames.push('colapsed');
      }
    }

    if (treeviewItem.state && treeviewItem.state.loading) {
      classNames.push('loading');
    }

    if (this.isSelected(treeview, item)) {
      classNames.push('selected');
    }

    return classNames.join(' ');
  },
  getClassCheckbox: function getClassCheckbox(treeview, item) {
    var classNames = ['checkbox'];

    if (treeview.props.showCheckbox) {
      if (item.state === _deniReactTreeviewItem.CHECKBOX_STATE.CHECKED) {
        classNames.push('checked');
      } else if (item.state === _deniReactTreeviewItem.CHECKBOX_STATE.UNDETERMINED) {
        classNames.push('undetermined');
      }

      if (this.isSelected(treeview, item)) {
        classNames.push('selected');
      }
    } else {
      classNames.push('hidden');
    }

    return classNames.join(' ');
  },
  getClassIconAndText: function getClassIconAndText(treeview, item, selectRow) {
    var classNames = ['icon-and-text'];

    if (selectRow) {
      classNames.push('select-row');
    }

    if (!selectRow && this.isSelected(treeview, item)) {
      classNames.push('selected');
    }

    return classNames.join(' ');
  },
  getInnerText: function getInnerText(treeview, item) {
    if (treeview.props.actionButtons) {
      return _react2.default.createElement(_actionButtons2.default, { item: item, buttons: treeview.props.actionButtons, onActionButtonClick: treeview.props.onActionButtonClick.bind(this) });
    } else {
      if (treeview.props.onRenderItem) {
        return treeview.props.onRenderItem(item, treeview);
      } else {
        return item.text;
      }
    }
  },
  isUndetermined: function isUndetermined(item) {
    return item.state === _deniReactTreeviewItem.CHECKBOX_STATE.UNDETERMINED;
  },
  isSelected: function isSelected(treeview, item) {
    return treeview.state.selectedItem === item;
  },
  treeviewItemContainerDoubleClick: function treeviewItemContainerDoubleClick(helper, treeview, selectRow, event) {
    var canContinue = selectRow;

    if (!canContinue) {
      var target = event.target;
      canContinue = target.classList.contains('icon-and-text') || target.classList.contains('icon') || target.classList.contains('text-inner') || target.classList.contains('text');
    }

    if (canContinue) {
      var item = this.props.item;
      if (item.isLeaf) {
        //TODO: Create a event here
      } else {
        helper.treeviewItemExpandButtonMouseDown.apply(this, treeview, item);
      }
    }
  },
  treeviewItemContainerMouseDown: function treeviewItemContainerMouseDown(treeview, selectRow, event) {
    var self = this;

    if (treeview.state.selectedItem !== self.props.item) {
      var target = event.target;
      var finishRoutine = function finishRoutine() {
        treeview.setState({
          selectedItem: self.props.item
        });
      };

      if (selectRow) {
        finishRoutine();
      } else {
        if (target.classList.contains('icon-and-text') || target.classList.contains('icon') || target.classList.contains('text-inner') || target.classList.contains('text') || target.classList.contains('action-buttons-container-text')) {
          finishRoutine();
        }
      }

      if (treeview.props.onSelectItem) {
        treeview.props.onSelectItem(self.props.item);
      }
    }
  },
  treeviewItemExpandButtonMouseDown: function treeviewItemExpandButtonMouseDown(treeview, item) {
    var self = this;
    var conclusion = function conclusion() {
      item.expanded = !item.expanded;
      treeview.setState({
        loading: false,
        selectedItem: item
      });
      self.setState({
        loading: false
      });
    };
    var resolveEventOnColapsed = function resolveEventOnColapsed() {
      if (treeview.props.onColapsed) {
        treeview.props.onColapsed(item);
      }
    };
    var resolveEventOnExpanded = function resolveEventOnExpanded() {
      if (treeview.props.onExpanded) {
        treeview.props.onExpanded(item);
      }
    };

    if (item.expanded) {
      conclusion();
      resolveEventOnColapsed();
    } else {
      if (treeview.props.lazyLoad) {
        self.setState({ loading: true });

        if (treeview.props.lazyLoad && treeview.props.onLazyLoad) {
          treeview.props.onLazyLoad(item, function (children) {
            treeview.api.loadData(children, item);
            conclusion();
          });
        } else {
          treeview.api.load(item).then(function () {
            conclusion();
          });
        }
      } else {
        conclusion();
      }

      resolveEventOnExpanded();
    }
  },
  treeviewItemCheckboxMouseDown: function treeviewItemCheckboxMouseDown(helper, treeview, item) {
    var treeviewItem = this;

    if (_isChecked(item)) {
      helper.uncheckNode(treeviewItem, item);
    } else {
      helper.checkNode(treeviewItem, item);
    }

    treeview.setState({
      selectedItem: item
    });
  },


  //
  checkNode: function checkNode(treeviewItem, item) {
    item.state = _deniReactTreeviewItem.CHECKBOX_STATE.CHECKED;
    _refreshCheckboxStateChildren(item);
    _refreshCheckboxStateParents(treeviewItem);
  },


  //
  uncheckNode: function uncheckNode(treeviewItem, item) {
    item.state = _deniReactTreeviewItem.CHECKBOX_STATE.UNCHECKED;
    _refreshCheckboxStateChildren(item);
    _refreshCheckboxStateParents(treeviewItem);
  }
};

//
function _getActionButtonByName(buttonName) {
  switch (buttonName) {
    case 'trash':
      return '';
    default:

  }
  if (buttonName === 'trash') {} else

    // (<FaTrashO size="15" color='#ff6666' />),
    // (<FaEdit size="15" color='#006699' />)

    here;
}

//
function _isChecked(item) {
  return item.state === _deniReactTreeviewItem.CHECKBOX_STATE.CHECKED;
}

//
function _isUnchecked(item) {
  return item.state === _deniReactTreeviewItem.CHECKBOX_STATE.UNCHECKED;
}

///
function _refreshCheckboxStateChildren(item) {
  if (item.children) {
    item.children.forEach(function (child) {
      child.state = item.state;
      _refreshCheckboxStateChildren(child);
    });
  }
}

function _allItemsAreChecked(items) {
  for (var index = 0; index < items.length; index++) {
    var item = items[index];

    if (!_isChecked(item)) {
      return false;
    }
  }
  return true;
}

function _allItemsAreUnchecked(items) {
  for (var index = 0; index < items.length; index++) {
    var item = items[index];

    if (!_isUnchecked(item)) {
      return false;
    }
  }
  return true;
}

function _refreshCheckboxStateParents(treeviewItem) {
  var parentTreeviewItem = treeviewItem.props.parent;
  if (parentTreeviewItem) {
    var siblingItems = parentTreeviewItem.props.item.children;
    var allSiblingsAreChecked = _allItemsAreChecked(siblingItems);

    //
    if (allSiblingsAreChecked) {
      parentTreeviewItem.props.item.state = _deniReactTreeviewItem.CHECKBOX_STATE.CHECKED;
    } else {
      var allSiblingsAreUnchecked = _allItemsAreUnchecked(siblingItems);
      if (allSiblingsAreUnchecked) {
        parentTreeviewItem.props.item.state = _deniReactTreeviewItem.CHECKBOX_STATE.UNCHECKED;
      } else {
        parentTreeviewItem.props.item.state = _deniReactTreeviewItem.CHECKBOX_STATE.UNDETERMINED;
      }
    }

    _refreshCheckboxStateParents(parentTreeviewItem);
  }
}

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {

  CHECKBOX_STATE: {
    CHECKED: 1,
    UNCHECKED: 2,
    UNDETERMINED: 3
  }

};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionButtons = __webpack_require__(31);

var _actionButtons2 = _interopRequireDefault(_actionButtons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _actionButtons2.default;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(32);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ActionButtons = function (_React$Component) {
  _inherits(ActionButtons, _React$Component);

  function ActionButtons(props) {
    _classCallCheck(this, ActionButtons);

    return _possibleConstructorReturn(this, (ActionButtons.__proto__ || Object.getPrototypeOf(ActionButtons)).call(this, props));
  }

  _createClass(ActionButtons, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var actionButtons = [];
      this.props.buttons.map(function (actionButton) {
        actionButtons.push(_react2.default.createElement(
          'span',
          { className: 'action-button', onClick: _this2.props.onActionButtonClick.bind(_this2, _this2.props.item, actionButton) },
          actionButton
        ));
      });

      return _react2.default.createElement(
        'div',
        { className: 'action-buttons-container' },
        _react2.default.createElement(
          'span',
          { className: 'action-buttons-container-text' },
          this.props.item.text
        ),
        actionButtons
      );
    }
  }]);

  return ActionButtons;
}(_react2.default.Component);

exports.default = ActionButtons;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(33);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--2-1!../../../node_modules/sass-loader/lib/loader.js??ref--2-2!./action-buttons.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js??ref--2-1!../../../node_modules/sass-loader/lib/loader.js??ref--2-2!./action-buttons.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".action-buttons-container {\n  display: flex;\n  flex: 1;\n  justify-content: space-around; }\n  .action-buttons-container .action-buttons-container-text {\n    flex: 1;\n    justify-content: space-around; }\n  .action-buttons-container .action-button {\n    margin-right: 5px;\n    cursor: pointer;\n    opacity: 0.3;\n    visibility: hidden; }\n", ""]);

// exports


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {

  ROOT_ITEM: {
    id: -1,
    text: 'root',
    expanded: true,
    root: true
  }

};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(36);

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);
var bind = __webpack_require__(14);
var Axios = __webpack_require__(38);
var defaults = __webpack_require__(10);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(18);
axios.CancelToken = __webpack_require__(52);
axios.isCancel = __webpack_require__(17);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(53);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),
/* 37 */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(10);
var utils = __webpack_require__(2);
var InterceptorManager = __webpack_require__(47);
var dispatchRequest = __webpack_require__(48);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);
  config.method = config.method.toLowerCase();

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(16);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      }

      if (!utils.isArray(val)) {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);
var transformData = __webpack_require__(49);
var isCancel = __webpack_require__(17);
var defaults = __webpack_require__(10);
var isAbsoluteURL = __webpack_require__(50);
var combineURLs = __webpack_require__(51);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(18);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./base-theme.scss": 55,
	"./classic-theme.scss": 57,
	"./green-theme.scss": 59,
	"./icons-theme.scss": 61,
	"./metro-theme.scss": 63,
	"./moonlight-theme.scss": 65,
	"./orange-theme.scss": 67,
	"./purple-theme.scss": 69,
	"./red-theme.scss": 71,
	"./silver-theme.scss": 73
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 54;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(56);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js??ref--2-1!../../node_modules/sass-loader/lib/loader.js??ref--2-2!./base-theme.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js??ref--2-1!../../node_modules/sass-loader/lib/loader.js??ref--2-2!./base-theme.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(58);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js??ref--2-1!../../node_modules/sass-loader/lib/loader.js??ref--2-2!./classic-theme.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js??ref--2-1!../../node_modules/sass-loader/lib/loader.js??ref--2-2!./classic-theme.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".deni-react-treeview-container.classic {\n  border-color: #a5c7e3; }\n  .deni-react-treeview-container.classic .deni-react-treeview-item-container.classic {\n    color: #245075 !important;\n    border-color: #76aad5 !important; }\n    .deni-react-treeview-container.classic .deni-react-treeview-item-container.classic:hover.select-row {\n      background-color: #ebf3f9; }\n    .deni-react-treeview-container.classic .deni-react-treeview-item-container.classic:hover:not(.select-row) {\n      background-color: transparent; }\n    .deni-react-treeview-container.classic .deni-react-treeview-item-container.classic.selected {\n      background: #ebf3f9;\n      /* Old browsers */\n      background: -moz-linear-gradient(top, #ebf3f9 0%, #9DC2E1 100%);\n      /* FF3.6-15 */\n      background: -webkit-linear-gradient(top, #ebf3f9 0%, #9DC2E1 100%);\n      /* Chrome10-25,Safari5.1-6 */\n      background: linear-gradient(to bottom, #ebf3f9 0%, #9DC2E1 100%);\n      /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */\n      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=$selection-background-start-color, endColorstr=$end-color,GradientType=0 );\n      /* IE6-9 */\n      outline-color: #c4daed !important; }\n    .deni-react-treeview-container.classic .deni-react-treeview-item-container.classic .checkbox {\n      border-color: #adcce6 !important; }\n      .deni-react-treeview-container.classic .deni-react-treeview-item-container.classic .checkbox.selected {\n        border-color: #7eafd7 !important; }\n    .deni-react-treeview-container.classic .deni-react-treeview-item-container.classic .expand-button {\n      color: #245075 !important; }\n    .deni-react-treeview-container.classic .deni-react-treeview-item-container.classic .icon-and-text:hover.select-row {\n      background-color: transparent; }\n    .deni-react-treeview-container.classic .deni-react-treeview-item-container.classic .icon-and-text:hover:not(.select-row) {\n      background-color: #ebf3f9; }\n    .deni-react-treeview-container.classic .deni-react-treeview-item-container.classic .icon-and-text.select-row {\n      border: 0;\n      padding: 1px; }\n    .deni-react-treeview-container.classic .deni-react-treeview-item-container.classic .icon-and-text.selected {\n      background: #ebf3f9;\n      /* Old browsers */\n      background: -moz-linear-gradient(top, #ebf3f9 0%, #9DC2E1 100%);\n      /* FF3.6-15 */\n      background: -webkit-linear-gradient(top, #ebf3f9 0%, #9DC2E1 100%);\n      /* Chrome10-25,Safari5.1-6 */\n      background: linear-gradient(to bottom, #ebf3f9 0%, #9DC2E1 100%);\n      /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */\n      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=$selection-background-start-color, endColorstr=$end-color,GradientType=0 );\n      /* IE6-9 */ }\n    .deni-react-treeview-container.classic .deni-react-treeview-item-container.classic .icon-and-text .icon {\n      background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAARlJREFUeNqsUz1PwzAUPDtOUASpYKkQVWcQA/+DhbLA32CoKAMSTAwgFsQfQWLoX4GRDFXGIiqiyk4e7wUWmg8phJPOtvzunc6WrYgIXaD06KKhij0eD2uqUxBeDC9OmcNKCYd7ujm7ryodXz5ong6UPpqcP9+O76y1vwS+7yOOY1jr0OttlQyiaB0n148TAyK9XFqkaboiSTEYDNnkDUkyKxkkiSQkzQbwsiyHcBXz+Tv6/W1m+QiSEDT1igTO5RBWYbH4rNwPw/AnQU5ek0EdCj33SgLjHEHYzoAkgfmHBDmZuktsQqHPvxN0MyCbbWjtIQjWWhlIj/QqtT+6QrSz+6ef9DF7VTwFzE2madnu5K2prt/5S4ABADcIlSf6Ag8YAAAAAElFTkSuQmCC\"); }\n      .deni-react-treeview-container.classic .deni-react-treeview-item-container.classic .icon-and-text .icon.isleaf {\n        background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACjElEQVR42o2SW0hUURSG/32OhnhAqJDCzF6kN0lLGtJCtLQyKIMotRjBy1sqVEZS9mKZBdKFHBJpJEKD0urBvAchhqY5kp6MHkRlMhpHR2fOHuZybu3KxhEr+/fL3g/rWx9rL4Kl1La+ta0XwiNUTVf9sgJF0yB5FVCfAqt9Lnx8yt7Ph4Qc6btVtIigkN+XJ28s9MTeHQLPETipF3aXB7NOJ2wLXnyamYVlwgq/jN5Fj+9QX3WhZxXg8ethmpMSzwA666rDxSBOKsHhViBa7XC5ndgWuRH1PSP9XlnJZJDFFYBHXe/p6bQEIanoGTZECJDhh98jg6gc5ue+oqwkBXlp8TB3WfBiYLx3yuYwiqbS6QDA3DVEjWk7BZ7n8Kc09IzAEBsFm+RG6+BndFsmhsdMxYkBwIO2d7QwI1HIrmgH0XmEMo7MA5qiQ9PZQF0SrDNOpBq2YPPWcLT0i+KYqTQuALjzvJeePZr8V4Nf0fHF4cD49DzKHnaKo7Uly4Cqpg568WS6kH21GxpREIZQEKKxEo4ZaXDJfrgWJBwwxGBPfDTONbxigOJlQLm5jVYaD65hAHgUP77ZKY5fbxI/BAPOm9vpTWOGkH2lExzHIKwrYYcnPNQwnhnpkKjGukciddcm5N9tFkdNJasBaxnouo5J2wKOVTaKYjDggrmDVhvThVOX2S9wPOu8tGnk5+zAMRPqk7HfEI2kuEjk32tmvxAEKK1rpTUFh9c00JjBFDPIYgYrAAW3W2hdcZaQU9GGdWwJOMIFCnRNxY+X5FaxLyEK6ckxOFPzdCUg90YjbbyUK+A/Mk89yCyvFwfvBy1SbF6VLWF7TIRPUdV/FRNNh6qowsDHyaG5l9d2fwfyXD4gAGnljAAAAABJRU5ErkJggg==\"); }\n      .deni-react-treeview-container.classic .deni-react-treeview-item-container.classic .icon-and-text .icon.expanded {\n        background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAZpJREFUeNqkU0tLQkEUPjN3ShAzF66CaNGiaNEviFpLgbSpXf2ACIqgFkELaVFhtAratQ8qokU/oFVbMQtJvWpWGvYwtet9TWfu1QorvOGBb84M5/WdOTOEcw7tCKHBlT8sMIhr4BfLGXC4BrALM8QUoveHG9oPQ/NhwVCQbOjp0C5F6zDiwE7Aed/p5tKWruufTlY8bkqliqVN8wvH6wvhydWd5UYdkYCqqgaKotQTCEewnJuDBSqVmshOrWhKgCJVqeHcKtiGKdqTgGIOQmwGum7AxVUKinXKzX1/1y5Xp6g8gpe8iBxuGZhcKjyXQZIkmBkfczS62YnRQCKX75/b3t8QDNhD8QX83V5Ipe7Bybug2Pt5NJ7A4nEqGOQKT+Bzu0HTDNB1syUYYxCJy0kwzIRogb0rKjAiQVXXHLVQrqqvsZtsFu8hbyXwe73WeMQtO5GonJGxuiyeC+Oa4fF5PEirw9nbx9FdxtN5eMwkzcgRnoeCa9DVM/CvH/R2l+axkz3clQguOFjw1f+FUzEQCqJG2v3OHwIMAOW1JPnAAAJxAAAAAElFTkSuQmCC\"); }\n", ""]);

// exports


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(60);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js??ref--2-1!../../node_modules/sass-loader/lib/loader.js??ref--2-2!./green-theme.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js??ref--2-1!../../node_modules/sass-loader/lib/loader.js??ref--2-2!./green-theme.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".deni-react-treeview-container.green {\n  border-color: #a4e4dd; }\n  .deni-react-treeview-container.green .deni-react-treeview-item-container.green {\n    color: #23766c !important;\n    border-color: #75d6cb !important; }\n    .deni-react-treeview-container.green .deni-react-treeview-item-container.green:hover.select-row {\n      background-color: #ebf9f7; }\n    .deni-react-treeview-container.green .deni-react-treeview-item-container.green:hover:not(.select-row) {\n      background-color: transparent; }\n    .deni-react-treeview-container.green .deni-react-treeview-item-container.green.selected {\n      background: #ebf9f7;\n      /* Old browsers */\n      background: -moz-linear-gradient(top, #ebf9f7 0%, #9ce2da 100%);\n      /* FF3.6-15 */\n      background: -webkit-linear-gradient(top, #ebf9f7 0%, #9ce2da 100%);\n      /* Chrome10-25,Safari5.1-6 */\n      background: linear-gradient(to bottom, #ebf9f7 0%, #9ce2da 100%);\n      /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */\n      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=$selection-background-start-color, endColorstr=$end-color,GradientType=0 );\n      /* IE6-9 */\n      outline-color: #c3eee9 !important; }\n    .deni-react-treeview-container.green .deni-react-treeview-item-container.green .checkbox {\n      border-color: #ace7e0 !important; }\n      .deni-react-treeview-container.green .deni-react-treeview-item-container.green .checkbox.selected {\n        border-color: #7cd9ce !important; }\n    .deni-react-treeview-container.green .deni-react-treeview-item-container.green .expand-button {\n      color: #23766c !important; }\n    .deni-react-treeview-container.green .deni-react-treeview-item-container.green .icon-and-text:hover.select-row {\n      background-color: transparent; }\n    .deni-react-treeview-container.green .deni-react-treeview-item-container.green .icon-and-text:hover:not(.select-row) {\n      background-color: #ebf9f7; }\n    .deni-react-treeview-container.green .deni-react-treeview-item-container.green .icon-and-text.select-row {\n      border: 0;\n      padding: 1px; }\n    .deni-react-treeview-container.green .deni-react-treeview-item-container.green .icon-and-text.selected {\n      background: #ebf9f7;\n      /* Old browsers */\n      background: -moz-linear-gradient(top, #ebf9f7 0%, #9ce2da 100%);\n      /* FF3.6-15 */\n      background: -webkit-linear-gradient(top, #ebf9f7 0%, #9ce2da 100%);\n      /* Chrome10-25,Safari5.1-6 */\n      background: linear-gradient(to bottom, #ebf9f7 0%, #9ce2da 100%);\n      /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */\n      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=$selection-background-start-color, endColorstr=$end-color,GradientType=0 );\n      /* IE6-9 */ }\n    .deni-react-treeview-container.green .deni-react-treeview-item-container.green .icon-and-text .icon {\n      background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAAAl2cEFnAAAAEAAAABAAXMatwwAAAWxJREFUOMuNk7tKA0EYhb/VFcFSKx8gKbSys9XgE6UPJLV5DA2oYGFhJVb2NjYGRBAVtPAWcbMz8x+LnV0TEzEHlmEu55vzz+wkwFyt1Qz8Ur/TXQf6gAET85VqraamqdZqCtgGloA0fvNAMupPAU6e7ibA1+1d6nD2X7IUYOAdxJG52O493HDd3p0A1+Gq3+luARcV4NXl3GWfHO33xha3/y77vISkAC8+52i/N3XHv1SH836nu1klADh8vAUgyBDgJJwFvMTQDCFOn+9prKyWnJ0U4C2ewSB4kggIEk4ij4Cib2TB8xHXAysxwRCAD+8QwiS8ijaX4czwMrxEbsYg+BKQpADvVQKHSUV8K8oYVgmKVHKO7AfA2DW+uhzFiRBNzoww0pcPfFkYB/hhcYhlEo0YLNZfWhQCmVnpzxJgrdZqXs18fz9/5AFwnAALwAbQAJZn9H8Bl8BZ+TASYDHCZlEAcsAnkmb0TNc3NFIRbjU1Sg4AAAAldEVYdGNyZWF0ZS1kYXRlADIwMDktMTEtMTVUMTY6MDg6NDEtMDc6MDAkruHgAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDEwLTAyLTE2VDE5OjQ4OjUzLTA3OjAwUejsLAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxMC0wMS0xMVQwOToxODoyOC0wNzowMJqAOpsAAAA1dEVYdExpY2Vuc2UAaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbGljZW5zZXMvTEdQTC8yLjEvO8G0GAAAACV0RVh0bW9kaWZ5LWRhdGUAMjAwOS0xMS0xNVQxNjowODo0MS0wNzowMHsfl9QAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAADXRFWHRTb3VyY2UATnV2b2xhrE818QAAADR0RVh0U291cmNlX1VSTABodHRwOi8vd3d3Lmljb24ta2luZy5jb20vcHJvamVjdHMvbnV2b2xhL3Y9tFIAAAAASUVORK5CYII=\"); }\n      .deni-react-treeview-container.green .deni-react-treeview-item-container.green .icon-and-text .icon.isleaf {\n        background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACjElEQVR42o2SW0hUURSG/32OhnhAqJDCzF6kN0lLGtJCtLQyKIMotRjBy1sqVEZS9mKZBdKFHBJpJEKD0urBvAchhqY5kp6MHkRlMhpHR2fOHuZybu3KxhEr+/fL3g/rWx9rL4Kl1La+ta0XwiNUTVf9sgJF0yB5FVCfAqt9Lnx8yt7Ph4Qc6btVtIigkN+XJ28s9MTeHQLPETipF3aXB7NOJ2wLXnyamYVlwgq/jN5Fj+9QX3WhZxXg8ethmpMSzwA666rDxSBOKsHhViBa7XC5ndgWuRH1PSP9XlnJZJDFFYBHXe/p6bQEIanoGTZECJDhh98jg6gc5ue+oqwkBXlp8TB3WfBiYLx3yuYwiqbS6QDA3DVEjWk7BZ7n8Kc09IzAEBsFm+RG6+BndFsmhsdMxYkBwIO2d7QwI1HIrmgH0XmEMo7MA5qiQ9PZQF0SrDNOpBq2YPPWcLT0i+KYqTQuALjzvJeePZr8V4Nf0fHF4cD49DzKHnaKo7Uly4Cqpg568WS6kH21GxpREIZQEKKxEo4ZaXDJfrgWJBwwxGBPfDTONbxigOJlQLm5jVYaD65hAHgUP77ZKY5fbxI/BAPOm9vpTWOGkH2lExzHIKwrYYcnPNQwnhnpkKjGukciddcm5N9tFkdNJasBaxnouo5J2wKOVTaKYjDggrmDVhvThVOX2S9wPOu8tGnk5+zAMRPqk7HfEI2kuEjk32tmvxAEKK1rpTUFh9c00JjBFDPIYgYrAAW3W2hdcZaQU9GGdWwJOMIFCnRNxY+X5FaxLyEK6ckxOFPzdCUg90YjbbyUK+A/Mk89yCyvFwfvBy1SbF6VLWF7TIRPUdV/FRNNh6qowsDHyaG5l9d2fwfyXD4gAGnljAAAAABJRU5ErkJggg==\"); }\n      .deni-react-treeview-container.green .deni-react-treeview-item-container.green .icon-and-text .icon.expanded {\n        background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAAAl2cEFnAAAAEAAAABAAXMatwwAAAbxJREFUOMuN0r1qVEEYBuAn8QRBwcJY6AVsoyDYWFoYy1yAkE68AQ0EbLbYUlitvQBFrYIsWgTR+BPttPCXtdGIBqMx2WyM7jlnPos9izFq4gvDFDPvz/fODGG4Vp8sbUK70TyENnJboVafjNfdlT9WrT4ZOI5dyLADQ5v5GbxZ6/wh3JqqG+f2dqkyWCsLEJVF4GlnSWuq/pvoOM/bjeYYHmMdkcFK0ZOnZGR4GMx8/uDJdOtfI9+G7qv22Y/Xb1zK4Gve65+WvF3vejLdcuXsOXuykX92N36+cQEvMugUv4p+2V0Bz1a/KiJJEfIIZYRbi++NjR7YqHM4g+X8B3j//Zv5mzPOnDqtWxbKSPKUlBFKoZeSTpG7evmydqM5jfnfEiys9l+jTw55JRAoI1kvC92qcLzDvarE3GLvuy93Hjg5MaFT5NIG1xQhBClpXb02cH+ETxksrCxbmp0zSBOi32mEopq/jCT18o3u91FksDQ7Z9+JY46O7rdWFgIpUrVXAtW9yv0xdqv+zcFaffK5/0S70byIJj4ghjCCIxjD3m34XdzFQxSDBIN9ZyW2FUr0BmQYioj/Tf9X/ARABRLKQS2ItQAAACV0RVh0Y3JlYXRlLWRhdGUAMjAwOS0xMS0xNVQxNjowODo0MS0wNzowMCSu4eAAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTAtMDItMTZUMTk6NDg6NTMtMDc6MDBR6OwsAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDEwLTAxLTExVDA5OjE4OjMwLTA3OjAwZcV0YgAAADV0RVh0TGljZW5zZQBodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9saWNlbnNlcy9MR1BMLzIuMS87wbQYAAAAJXRFWHRtb2RpZnktZGF0ZQAyMDA5LTExLTE1VDE2OjA4OjQxLTA3OjAwex+X1AAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAANdEVYdFNvdXJjZQBOdXZvbGGsTzXxAAAANHRFWHRTb3VyY2VfVVJMAGh0dHA6Ly93d3cuaWNvbi1raW5nLmNvbS9wcm9qZWN0cy9udXZvbGEvdj20UgAAAABJRU5ErkJggg==\"); }\n", ""]);

// exports


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(62);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js??ref--2-1!../../node_modules/sass-loader/lib/loader.js??ref--2-2!./icons-theme.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js??ref--2-1!../../node_modules/sass-loader/lib/loader.js??ref--2-2!./icons-theme.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(64);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js??ref--2-1!../../node_modules/sass-loader/lib/loader.js??ref--2-2!./metro-theme.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js??ref--2-1!../../node_modules/sass-loader/lib/loader.js??ref--2-2!./metro-theme.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".deni-react-treeview-container.metro {\n  background-color: #32394d !important;\n  border-color: #b7bed1; }\n  .deni-react-treeview-container.metro .deni-react-treeview-item-container.metro {\n    color: #d8e6f3 !important; }\n    .deni-react-treeview-container.metro .deni-react-treeview-item-container.metro:hover {\n      background-color: transparent !important; }\n    .deni-react-treeview-container.metro .deni-react-treeview-item-container.metro.selected {\n      background: #3373a8;\n      /* Old browsers */\n      background: -moz-linear-gradient(top, #3373a8 0%, #1b3d59 100%);\n      /* FF3.6-15 */\n      background: -webkit-linear-gradient(top, #3373a8 0%, #1b3d59 100%);\n      /* Chrome10-25,Safari5.1-6 */\n      background: linear-gradient(to bottom, #3373a8 0%, #1b3d59 100%);\n      /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */\n      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=$selection-background-start-color, endColorstr=$end-color,GradientType=0 );\n      /* IE6-9 */\n      outline-color: #89b6db !important; }\n    .deni-react-treeview-container.metro .deni-react-treeview-item-container.metro .checkbox {\n      border-color: #adcce6 !important; }\n      .deni-react-treeview-container.metro .deni-react-treeview-item-container.metro .checkbox.selected {\n        border-color: #629ecf !important;\n        background-color: transparent; }\n    .deni-react-treeview-container.metro .deni-react-treeview-item-container.metro .expand-button {\n      color: #d8e6f3 !important; }\n    .deni-react-treeview-container.metro .deni-react-treeview-item-container.metro .icon-and-text:hover {\n      background-color: transparent !important; }\n    .deni-react-treeview-container.metro .deni-react-treeview-item-container.metro .icon-and-text.selected {\n      background: #478dc7;\n      /* Old browsers */\n      background: -moz-linear-gradient(top, #478dc7 0%, #275880 100%);\n      /* FF3.6-15 */\n      background: -webkit-linear-gradient(top, #478dc7 0%, #275880 100%);\n      /* Chrome10-25,Safari5.1-6 */\n      background: linear-gradient(to bottom, #478dc7 0%, #275880 100%);\n      /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */\n      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=$selection-background-start-color, endColorstr=$end-color,GradientType=0 );\n      /* IE6-9 */\n      border-color: #95bddf; }\n    .deni-react-treeview-container.metro .deni-react-treeview-item-container.metro .icon-and-text .icon {\n      background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAJdnBBZwAAABAAAAAQAFzGrcMAAADvSURBVCjPfdGxSgNREIXhb80Wgk1AQVArX0AQkrcQW9k8Qcr0dlb2Qp7AysbSxsZ0GhtLGzshaJEmbhJ277Vw3RATPN1wfn6GmST6P8nZ6cbt7zDq3t8YK5eILC6SxdaFPY0lQxYv6+FAx19bSo4oEb26roFOv7X/1DdKmfjwsLLcod3z2BheyeIg9uL69KKTlIktbwiCUqlQiIaO4DhlglxS16VSaW4KzRqIolJQKBWCQg5SvlaAUDkqIMdEpCqCICgWwMyPJVZVEBDMzZCOui/9LYOVO0y9u3s2Tmxra2uufeXYY6KhacfmWmDq8xuQL5PixDBZGgAAACV0RVh0Y3JlYXRlLWRhdGUAMjAwOS0xMS0xNVQxNjowODo0MS0wNzowMCSu4eAAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTAtMDItMjBUMjM6MjQ6NDctMDc6MDDdsZPxAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDEwLTAxLTExVDA5OjE4OjMyLTA3OjAw8lplSwAAADV0RVh0TGljZW5zZQBodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9saWNlbnNlcy9MR1BMLzIuMS87wbQYAAAAJXRFWHRtb2RpZnktZGF0ZQAyMDA5LTExLTE1VDE2OjA4OjQxLTA3OjAwex+X1AAAAA10RVh0U291cmNlAE51dm9sYaxPNfEAAAA0dEVYdFNvdXJjZV9VUkwAaHR0cDovL3d3dy5pY29uLWtpbmcuY29tL3Byb2plY3RzL251dm9sYS92PbRSAAAAAElFTkSuQmCC\"); }\n      .deni-react-treeview-container.metro .deni-react-treeview-item-container.metro .icon-and-text .icon.isleaf {\n        background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACjElEQVR42o2SW0hUURSG/32OhnhAqJDCzF6kN0lLGtJCtLQyKIMotRjBy1sqVEZS9mKZBdKFHBJpJEKD0urBvAchhqY5kp6MHkRlMhpHR2fOHuZybu3KxhEr+/fL3g/rWx9rL4Kl1La+ta0XwiNUTVf9sgJF0yB5FVCfAqt9Lnx8yt7Ph4Qc6btVtIigkN+XJ28s9MTeHQLPETipF3aXB7NOJ2wLXnyamYVlwgq/jN5Fj+9QX3WhZxXg8ethmpMSzwA666rDxSBOKsHhViBa7XC5ndgWuRH1PSP9XlnJZJDFFYBHXe/p6bQEIanoGTZECJDhh98jg6gc5ue+oqwkBXlp8TB3WfBiYLx3yuYwiqbS6QDA3DVEjWk7BZ7n8Kc09IzAEBsFm+RG6+BndFsmhsdMxYkBwIO2d7QwI1HIrmgH0XmEMo7MA5qiQ9PZQF0SrDNOpBq2YPPWcLT0i+KYqTQuALjzvJeePZr8V4Nf0fHF4cD49DzKHnaKo7Uly4Cqpg568WS6kH21GxpREIZQEKKxEo4ZaXDJfrgWJBwwxGBPfDTONbxigOJlQLm5jVYaD65hAHgUP77ZKY5fbxI/BAPOm9vpTWOGkH2lExzHIKwrYYcnPNQwnhnpkKjGukciddcm5N9tFkdNJasBaxnouo5J2wKOVTaKYjDggrmDVhvThVOX2S9wPOu8tGnk5+zAMRPqk7HfEI2kuEjk32tmvxAEKK1rpTUFh9c00JjBFDPIYgYrAAW3W2hdcZaQU9GGdWwJOMIFCnRNxY+X5FaxLyEK6ckxOFPzdCUg90YjbbyUK+A/Mk89yCyvFwfvBy1SbF6VLWF7TIRPUdV/FRNNh6qowsDHyaG5l9d2fwfyXD4gAGnljAAAAABJRU5ErkJggg==\"); }\n      .deni-react-treeview-container.metro .deni-react-treeview-item-container.metro .icon-and-text .icon.expanded {\n        background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAJdnBBZwAAABAAAAAQAFzGrcMAAAEZSURBVCjPfdExS8NQEMDx/2vfIEKhoIu6+QlcGpz9Ag4ukn6CIrh3dnVyMJ9AFx0cFFwKHTIItggKhZZSFBVS6lAkSSvmvXNItNaAd9NxvzsOTgn/h9rdLlx8F8Na44yxmDnhyixcqRywSlGYpXLl8AevUM3t0jAFBIUw4CQDVa+yduupoRjlSp0EDdzR+3Ogv9881RCmS+lRZ3EO7B01+xoiAF6AJwwWg6XFRmqcDLwRsMMEi8FgSYg5x2+DhhgYwa+25YMJcN+hoyHinZAtYgRLgmARrvDbPNLVMCKgRIwg2Cw/0/kHXjWMKbHJNAMpeub4ki4hoR7W8NZp5L8U0OIGUSzh4FDOgT7XDCgoipRZZiEHQgKJ4AsJ/pBiuU0XWgAAACV0RVh0Y3JlYXRlLWRhdGUAMjAwOS0xMS0xNVQxNjowODo0MS0wNzowMCSu4eAAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTAtMDItMTZUMTk6NDg6NTMtMDc6MDBR6OwsAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDEwLTAxLTExVDA5OjE4OjMwLTA3OjAwZcV0YgAAADV0RVh0TGljZW5zZQBodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9saWNlbnNlcy9MR1BMLzIuMS87wbQYAAAAJXRFWHRtb2RpZnktZGF0ZQAyMDA5LTExLTE1VDE2OjA4OjQxLTA3OjAwex+X1AAAAA10RVh0U291cmNlAE51dm9sYaxPNfEAAAA0dEVYdFNvdXJjZV9VUkwAaHR0cDovL3d3dy5pY29uLWtpbmcuY29tL3Byb2plY3RzL251dm9sYS92PbRSAAAAAElFTkSuQmCC\"); }\n", ""]);

// exports


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(66);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js??ref--2-1!../../node_modules/sass-loader/lib/loader.js??ref--2-2!./moonlight-theme.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js??ref--2-1!../../node_modules/sass-loader/lib/loader.js??ref--2-2!./moonlight-theme.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".deni-react-treeview-container.moonlight {\n  background-color: #404040 !important;\n  border-color: #c4c4c4; }\n  .deni-react-treeview-container.moonlight .deni-react-treeview-item-container.moonlight {\n    color: #d8e6f3 !important; }\n    .deni-react-treeview-container.moonlight .deni-react-treeview-item-container.moonlight:hover {\n      background-color: transparent !important; }\n    .deni-react-treeview-container.moonlight .deni-react-treeview-item-container.moonlight.selected {\n      background: #fbc656;\n      /* Old browsers */\n      background: -moz-linear-gradient(top, #fbc656 0%, #E59E06 100%);\n      /* FF3.6-15 */\n      background: -webkit-linear-gradient(top, #fbc656 0%, #E59E06 100%);\n      /* Chrome10-25,Safari5.1-6 */\n      background: linear-gradient(to bottom, #fbc656 0%, #E59E06 100%);\n      /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */\n      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=$selection-background-start-color, endColorstr=$end-color,GradientType=0 );\n      /* IE6-9 */\n      outline-color: #89b6db !important;\n      color: black !important; }\n    .deni-react-treeview-container.moonlight .deni-react-treeview-item-container.moonlight .checkbox {\n      border-color: white !important; }\n      .deni-react-treeview-container.moonlight .deni-react-treeview-item-container.moonlight .checkbox.selected {\n        background-color: transparent; }\n    .deni-react-treeview-container.moonlight .deni-react-treeview-item-container.moonlight .expand-button {\n      color: #d8e6f3 !important; }\n    .deni-react-treeview-container.moonlight .deni-react-treeview-item-container.moonlight .icon-and-text:hover {\n      background-color: transparent !important; }\n    .deni-react-treeview-container.moonlight .deni-react-treeview-item-container.moonlight .icon-and-text.selected {\n      background: #fbc656;\n      /* Old browsers */\n      background: -moz-linear-gradient(top, #fbc656 0%, #E59E06 100%);\n      /* FF3.6-15 */\n      background: -webkit-linear-gradient(top, #fbc656 0%, #E59E06 100%);\n      /* Chrome10-25,Safari5.1-6 */\n      background: linear-gradient(to bottom, #fbc656 0%, #E59E06 100%);\n      /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */\n      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=$selection-background-start-color, endColorstr=$end-color,GradientType=0 );\n      /* IE6-9 */\n      border-color: #95bddf;\n      color: #0c1a27; }\n    .deni-react-treeview-container.moonlight .deni-react-treeview-item-container.moonlight .icon-and-text .icon {\n      background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAJdnBBZwAAABAAAAAQAFzGrcMAAADvSURBVCjPfdGxSgNREIXhb80Wgk1AQVArX0AQkrcQW9k8Qcr0dlb2Qp7AysbSxsZ0GhtLGzshaJEmbhJ277Vw3RATPN1wfn6GmST6P8nZ6cbt7zDq3t8YK5eILC6SxdaFPY0lQxYv6+FAx19bSo4oEb26roFOv7X/1DdKmfjwsLLcod3z2BheyeIg9uL69KKTlIktbwiCUqlQiIaO4DhlglxS16VSaW4KzRqIolJQKBWCQg5SvlaAUDkqIMdEpCqCICgWwMyPJVZVEBDMzZCOui/9LYOVO0y9u3s2Tmxra2uufeXYY6KhacfmWmDq8xuQL5PixDBZGgAAACV0RVh0Y3JlYXRlLWRhdGUAMjAwOS0xMS0xNVQxNjowODo0MS0wNzowMCSu4eAAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTAtMDItMjBUMjM6MjQ6NDctMDc6MDDdsZPxAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDEwLTAxLTExVDA5OjE4OjMyLTA3OjAw8lplSwAAADV0RVh0TGljZW5zZQBodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9saWNlbnNlcy9MR1BMLzIuMS87wbQYAAAAJXRFWHRtb2RpZnktZGF0ZQAyMDA5LTExLTE1VDE2OjA4OjQxLTA3OjAwex+X1AAAAA10RVh0U291cmNlAE51dm9sYaxPNfEAAAA0dEVYdFNvdXJjZV9VUkwAaHR0cDovL3d3dy5pY29uLWtpbmcuY29tL3Byb2plY3RzL251dm9sYS92PbRSAAAAAElFTkSuQmCC\"); }\n      .deni-react-treeview-container.moonlight .deni-react-treeview-item-container.moonlight .icon-and-text .icon.isleaf {\n        background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACjElEQVR42o2SW0hUURSG/32OhnhAqJDCzF6kN0lLGtJCtLQyKIMotRjBy1sqVEZS9mKZBdKFHBJpJEKD0urBvAchhqY5kp6MHkRlMhpHR2fOHuZybu3KxhEr+/fL3g/rWx9rL4Kl1La+ta0XwiNUTVf9sgJF0yB5FVCfAqt9Lnx8yt7Ph4Qc6btVtIigkN+XJ28s9MTeHQLPETipF3aXB7NOJ2wLXnyamYVlwgq/jN5Fj+9QX3WhZxXg8ethmpMSzwA666rDxSBOKsHhViBa7XC5ndgWuRH1PSP9XlnJZJDFFYBHXe/p6bQEIanoGTZECJDhh98jg6gc5ue+oqwkBXlp8TB3WfBiYLx3yuYwiqbS6QDA3DVEjWk7BZ7n8Kc09IzAEBsFm+RG6+BndFsmhsdMxYkBwIO2d7QwI1HIrmgH0XmEMo7MA5qiQ9PZQF0SrDNOpBq2YPPWcLT0i+KYqTQuALjzvJeePZr8V4Nf0fHF4cD49DzKHnaKo7Uly4Cqpg568WS6kH21GxpREIZQEKKxEo4ZaXDJfrgWJBwwxGBPfDTONbxigOJlQLm5jVYaD65hAHgUP77ZKY5fbxI/BAPOm9vpTWOGkH2lExzHIKwrYYcnPNQwnhnpkKjGukciddcm5N9tFkdNJasBaxnouo5J2wKOVTaKYjDggrmDVhvThVOX2S9wPOu8tGnk5+zAMRPqk7HfEI2kuEjk32tmvxAEKK1rpTUFh9c00JjBFDPIYgYrAAW3W2hdcZaQU9GGdWwJOMIFCnRNxY+X5FaxLyEK6ckxOFPzdCUg90YjbbyUK+A/Mk89yCyvFwfvBy1SbF6VLWF7TIRPUdV/FRNNh6qowsDHyaG5l9d2fwfyXD4gAGnljAAAAABJRU5ErkJggg==\"); }\n      .deni-react-treeview-container.moonlight .deni-react-treeview-item-container.moonlight .icon-and-text .icon.expanded {\n        background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAJdnBBZwAAABAAAAAQAFzGrcMAAAEZSURBVCjPfdExS8NQEMDx/2vfIEKhoIu6+QlcGpz9Ag4ukn6CIrh3dnVyMJ9AFx0cFFwKHTIItggKhZZSFBVS6lAkSSvmvXNItNaAd9NxvzsOTgn/h9rdLlx8F8Na44yxmDnhyixcqRywSlGYpXLl8AevUM3t0jAFBIUw4CQDVa+yduupoRjlSp0EDdzR+3Ogv9881RCmS+lRZ3EO7B01+xoiAF6AJwwWg6XFRmqcDLwRsMMEi8FgSYg5x2+DhhgYwa+25YMJcN+hoyHinZAtYgRLgmARrvDbPNLVMCKgRIwg2Cw/0/kHXjWMKbHJNAMpeub4ki4hoR7W8NZp5L8U0OIGUSzh4FDOgT7XDCgoipRZZiEHQgKJ4AsJ/pBiuU0XWgAAACV0RVh0Y3JlYXRlLWRhdGUAMjAwOS0xMS0xNVQxNjowODo0MS0wNzowMCSu4eAAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTAtMDItMTZUMTk6NDg6NTMtMDc6MDBR6OwsAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDEwLTAxLTExVDA5OjE4OjMwLTA3OjAwZcV0YgAAADV0RVh0TGljZW5zZQBodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9saWNlbnNlcy9MR1BMLzIuMS87wbQYAAAAJXRFWHRtb2RpZnktZGF0ZQAyMDA5LTExLTE1VDE2OjA4OjQxLTA3OjAwex+X1AAAAA10RVh0U291cmNlAE51dm9sYaxPNfEAAAA0dEVYdFNvdXJjZV9VUkwAaHR0cDovL3d3dy5pY29uLWtpbmcuY29tL3Byb2plY3RzL251dm9sYS92PbRSAAAAAElFTkSuQmCC\"); }\n", ""]);

// exports


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(68);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js??ref--2-1!../../node_modules/sass-loader/lib/loader.js??ref--2-2!./orange-theme.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js??ref--2-1!../../node_modules/sass-loader/lib/loader.js??ref--2-2!./orange-theme.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".deni-react-treeview-container.orange {\n  border-color: #ffd68a; }\n  .deni-react-treeview-container.orange .deni-react-treeview-item-container.orange {\n    color: #9a6300 !important;\n    border-color: #ffc04d !important; }\n    .deni-react-treeview-container.orange .deni-react-treeview-item-container.orange:hover.select-row {\n      background-color: #fff6e6; }\n    .deni-react-treeview-container.orange .deni-react-treeview-item-container.orange:hover:not(.select-row) {\n      background-color: transparent; }\n    .deni-react-treeview-container.orange .deni-react-treeview-item-container.orange.selected {\n      background: #fff6e6;\n      /* Old browsers */\n      background: -moz-linear-gradient(top, #fff6e6 0%, #ffd280 100%);\n      /* FF3.6-15 */\n      background: -webkit-linear-gradient(top, #fff6e6 0%, #ffd280 100%);\n      /* Chrome10-25,Safari5.1-6 */\n      background: linear-gradient(to bottom, #fff6e6 0%, #ffd280 100%);\n      /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */\n      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=$selection-background-start-color, endColorstr=$end-color,GradientType=0 );\n      /* IE6-9 */\n      outline-color: #ffe4b3 !important; }\n    .deni-react-treeview-container.orange .deni-react-treeview-item-container.orange .checkbox {\n      border-color: #ffd994 !important; }\n      .deni-react-treeview-container.orange .deni-react-treeview-item-container.orange .checkbox.selected {\n        border-color: #ffc457 !important; }\n    .deni-react-treeview-container.orange .deni-react-treeview-item-container.orange .expand-button {\n      color: #9a6300 !important; }\n    .deni-react-treeview-container.orange .deni-react-treeview-item-container.orange .icon-and-text:hover.select-row {\n      background-color: transparent; }\n    .deni-react-treeview-container.orange .deni-react-treeview-item-container.orange .icon-and-text:hover:not(.select-row) {\n      background-color: #fff6e6; }\n    .deni-react-treeview-container.orange .deni-react-treeview-item-container.orange .icon-and-text.select-row {\n      border: 0;\n      padding: 1px; }\n    .deni-react-treeview-container.orange .deni-react-treeview-item-container.orange .icon-and-text.selected {\n      background: #fff6e6;\n      /* Old browsers */\n      background: -moz-linear-gradient(top, #fff6e6 0%, #ffd280 100%);\n      /* FF3.6-15 */\n      background: -webkit-linear-gradient(top, #fff6e6 0%, #ffd280 100%);\n      /* Chrome10-25,Safari5.1-6 */\n      background: linear-gradient(to bottom, #fff6e6 0%, #ffd280 100%);\n      /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */\n      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=$selection-background-start-color, endColorstr=$end-color,GradientType=0 );\n      /* IE6-9 */ }\n    .deni-react-treeview-container.orange .deni-react-treeview-item-container.orange .icon-and-text .icon {\n      background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAAAl2cEFnAAAAEAAAABAAXMatwwAAAUhJREFUOMuVkzFPwkAYhp9DjIkLif4Lndhc1TjD0NG/xeYGkyGxLGwEFxddXEg0Ji5uaAgYLEe59hy+Hkepxvomby7N5X3u7derAiphQMKWml2OgRcgheL+WmGAtXpWcBhggTNgH6hm3gHUZr4KwNt9AdzozAipDf5qJoDFRHZtCqoi63OfRmdWbExt1OxyCtx5wHwM70/02i3KKAwYOogAvsb02q0fT/wVQm3Y7HLiGwC83sqaGnESi1cajJZXe7iC+qXjXKwbrGehKhI2WdjoPCyew2LqAIcZ4EMeo4mcYlPfwmiBOZDRfuigBBBlAD31ABP7QBIXW+TuQZQR52MJuzm4QGog2Wi03AYsP8k1sakPODtwsoJV5PJaAUdhwKj09/M38hq4UcAuUAfOgYOS+QXwCAzcj6GAvQxWRgkQA0ZZa//bPqdvnGDV3fmRiIwAAAAldEVYdGNyZWF0ZS1kYXRlADIwMDktMTEtMTVUMTY6MDg6NDEtMDc6MDAkruHgAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDEwLTAyLTIwVDIzOjI0OjQ3LTA3OjAw3bGT8QAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxMC0wMS0xMVQwOToxODozMi0wNzowMPJaZUsAAAA1dEVYdExpY2Vuc2UAaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbGljZW5zZXMvTEdQTC8yLjEvO8G0GAAAACV0RVh0bW9kaWZ5LWRhdGUAMjAwOS0xMS0xNVQxNjowODo0MS0wNzowMHsfl9QAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAADXRFWHRTb3VyY2UATnV2b2xhrE818QAAADR0RVh0U291cmNlX1VSTABodHRwOi8vd3d3Lmljb24ta2luZy5jb20vcHJvamVjdHMvbnV2b2xhL3Y9tFIAAAAASUVORK5CYII=\"); }\n      .deni-react-treeview-container.orange .deni-react-treeview-item-container.orange .icon-and-text .icon.isleaf {\n        background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACjElEQVR42o2SW0hUURSG/32OhnhAqJDCzF6kN0lLGtJCtLQyKIMotRjBy1sqVEZS9mKZBdKFHBJpJEKD0urBvAchhqY5kp6MHkRlMhpHR2fOHuZybu3KxhEr+/fL3g/rWx9rL4Kl1La+ta0XwiNUTVf9sgJF0yB5FVCfAqt9Lnx8yt7Ph4Qc6btVtIigkN+XJ28s9MTeHQLPETipF3aXB7NOJ2wLXnyamYVlwgq/jN5Fj+9QX3WhZxXg8ethmpMSzwA666rDxSBOKsHhViBa7XC5ndgWuRH1PSP9XlnJZJDFFYBHXe/p6bQEIanoGTZECJDhh98jg6gc5ue+oqwkBXlp8TB3WfBiYLx3yuYwiqbS6QDA3DVEjWk7BZ7n8Kc09IzAEBsFm+RG6+BndFsmhsdMxYkBwIO2d7QwI1HIrmgH0XmEMo7MA5qiQ9PZQF0SrDNOpBq2YPPWcLT0i+KYqTQuALjzvJeePZr8V4Nf0fHF4cD49DzKHnaKo7Uly4Cqpg568WS6kH21GxpREIZQEKKxEo4ZaXDJfrgWJBwwxGBPfDTONbxigOJlQLm5jVYaD65hAHgUP77ZKY5fbxI/BAPOm9vpTWOGkH2lExzHIKwrYYcnPNQwnhnpkKjGukciddcm5N9tFkdNJasBaxnouo5J2wKOVTaKYjDggrmDVhvThVOX2S9wPOu8tGnk5+zAMRPqk7HfEI2kuEjk32tmvxAEKK1rpTUFh9c00JjBFDPIYgYrAAW3W2hdcZaQU9GGdWwJOMIFCnRNxY+X5FaxLyEK6ckxOFPzdCUg90YjbbyUK+A/Mk89yCyvFwfvBy1SbF6VLWF7TIRPUdV/FRNNh6qowsDHyaG5l9d2fwfyXD4gAGnljAAAAABJRU5ErkJggg==\"); }\n      .deni-react-treeview-container.orange .deni-react-treeview-item-container.orange .icon-and-text .icon.expanded {\n        background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAAAl2cEFnAAAAEAAAABAAXMatwwAAAZNJREFUOMul0z9rU1EcxvFParVIt74HB/8g+AIkQ8fgJt2TxamLL0NQB11cksWpg0YkY8EaxSIqRWnB6KJRKTWJWmvTpPePw7m3aW1tBR+4/O7lnOf7POfALWCsWhL7Q5WGs3iHbYdovFoSl28tHLBUXK40TGMRQ6RIsjkCgNXX++wBWpw/qlUADDfCV5pQGAvzwxP7m+1p1UcaAL86xEOOnQj73sypNdsHnrlaMg+vVl29/dKdDLA22tFpqTXbytfuc3Lq77c3W7yBlQDY7I0WPr8I89NzomE4TjwkiVi6y7nLuzHnA6CfAbrv1ZZi5Suz9L8HU25OIqItNntqcw9VGupo72nwo/c1gLZ2mfMWSWSwHZsYrOfpH/E4A3QMfnbde0t55lIAZiZxBkgTSUrtwUKe/gxr4/Ct11VvGaWnSXjPq2fPVmR3ehPRONRbzJxm8tRFBus7iaFFsgOot+Tpi5iEAs5US5b9oyoNN3EdX5AWcBwXMI2pI/wbeISniPIG+ZzIYIcpFn6sndsopGnqf/QbDPTQm7MpVhcAAAAldEVYdGNyZWF0ZS1kYXRlADIwMDktMTEtMTVUMTY6MDg6NDEtMDc6MDAkruHgAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDEwLTAyLTE2VDE5OjQ4OjUzLTA3OjAwUejsLAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxMC0wMS0xMVQwOToxODozMC0wNzowMGXFdGIAAAA1dEVYdExpY2Vuc2UAaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbGljZW5zZXMvTEdQTC8yLjEvO8G0GAAAACV0RVh0bW9kaWZ5LWRhdGUAMjAwOS0xMS0xNVQxNjowODo0MS0wNzowMHsfl9QAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAADXRFWHRTb3VyY2UATnV2b2xhrE818QAAADR0RVh0U291cmNlX1VSTABodHRwOi8vd3d3Lmljb24ta2luZy5jb20vcHJvamVjdHMvbnV2b2xhL3Y9tFIAAAAASUVORK5CYII=\"); }\n", ""]);

// exports


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(70);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js??ref--2-1!../../node_modules/sass-loader/lib/loader.js??ref--2-2!./purple-theme.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js??ref--2-1!../../node_modules/sass-loader/lib/loader.js??ref--2-2!./purple-theme.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".deni-react-treeview-container.purple {\n  border-color: #ff8aff; }\n  .deni-react-treeview-container.purple .deni-react-treeview-item-container.purple {\n    color: #9a009a !important;\n    border-color: #ff4dff !important; }\n    .deni-react-treeview-container.purple .deni-react-treeview-item-container.purple:hover.select-row {\n      background-color: #ffe6ff; }\n    .deni-react-treeview-container.purple .deni-react-treeview-item-container.purple:hover:not(.select-row) {\n      background-color: transparent; }\n    .deni-react-treeview-container.purple .deni-react-treeview-item-container.purple.selected {\n      background: #ffe6ff;\n      /* Old browsers */\n      background: -moz-linear-gradient(top, #ffe6ff 0%, #ff80ff 100%);\n      /* FF3.6-15 */\n      background: -webkit-linear-gradient(top, #ffe6ff 0%, #ff80ff 100%);\n      /* Chrome10-25,Safari5.1-6 */\n      background: linear-gradient(to bottom, #ffe6ff 0%, #ff80ff 100%);\n      /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */\n      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=$selection-background-start-color, endColorstr=$end-color,GradientType=0 );\n      /* IE6-9 */\n      outline-color: #ffb3ff !important; }\n    .deni-react-treeview-container.purple .deni-react-treeview-item-container.purple .checkbox {\n      border-color: #ff94ff !important; }\n      .deni-react-treeview-container.purple .deni-react-treeview-item-container.purple .checkbox.selected {\n        border-color: #ff57ff !important; }\n    .deni-react-treeview-container.purple .deni-react-treeview-item-container.purple .expand-button {\n      color: #9a009a !important; }\n    .deni-react-treeview-container.purple .deni-react-treeview-item-container.purple .icon-and-text:hover.select-row {\n      background-color: transparent; }\n    .deni-react-treeview-container.purple .deni-react-treeview-item-container.purple .icon-and-text:hover:not(.select-row) {\n      background-color: #ffe6ff; }\n    .deni-react-treeview-container.purple .deni-react-treeview-item-container.purple .icon-and-text.select-row {\n      border: 0;\n      padding: 1px; }\n    .deni-react-treeview-container.purple .deni-react-treeview-item-container.purple .icon-and-text.selected {\n      background: #ffe6ff;\n      /* Old browsers */\n      background: -moz-linear-gradient(top, #ffe6ff 0%, #ff80ff 100%);\n      /* FF3.6-15 */\n      background: -webkit-linear-gradient(top, #ffe6ff 0%, #ff80ff 100%);\n      /* Chrome10-25,Safari5.1-6 */\n      background: linear-gradient(to bottom, #ffe6ff 0%, #ff80ff 100%);\n      /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */\n      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=$selection-background-start-color, endColorstr=$end-color,GradientType=0 );\n      /* IE6-9 */ }\n    .deni-react-treeview-container.purple .deni-react-treeview-item-container.purple .icon-and-text .icon {\n      background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAAAl2cEFnAAAAEAAAABAAXMatwwAAAXpJREFUOMuNk79uFDEQhz9fFiElHUj7DkBxoktLEDVvsF2KeyC0da6JFEXKE0RRijRUEJGKIgVFpFP+cSR367VnhsLeheSC2J80msKaz78Zjx0wqspaeKTpbPIG+A4osHLeqypr+3URV6IqawO2gHWgyLEGuL/rC4CLU78C/vR1G8Yc/s9ZAeB/KgCm4EYpnx8vE+SxxpxNZ5N3wEkPuL8Ubs4Duzv7DFFV1kcdpABY3ii7O/tP3/gvjTmaziabBcDiKg35x+cGAI2GCcTW0GBEb2gAVePb3h2vPm50mA8JcJkAza3iRgkgIeXoE0yCIa0RFkYz1w7wsgBo8hD9XFE1TMHkD0CCId5QgeiN5rYHuOTgOjuYK5YBEnIbPt3cuwjJxYM96IiLK8EyPLWRe88zkWjEILT3+hDQ3iXiMjvpWpBoYDl3YIuI7x00DnhdlfXZ8PfrN3IPOHDAM+At8B54MbB+CXwBDruP4YDnGTZEArRAdGY2sOZp/QaJqg76kpduogAAACV0RVh0Y3JlYXRlLWRhdGUAMjAwOS0xMS0xNVQxNjowODo0MS0wNzowMCSu4eAAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTAtMDItMjBUMjM6MjQ6NDctMDc6MDDdsZPxAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDEwLTAxLTExVDA5OjE4OjMzLTA3OjAwVC1u/wAAADV0RVh0TGljZW5zZQBodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9saWNlbnNlcy9MR1BMLzIuMS87wbQYAAAAJXRFWHRtb2RpZnktZGF0ZQAyMDA5LTExLTE1VDE2OjA4OjQxLTA3OjAwex+X1AAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAANdEVYdFNvdXJjZQBOdXZvbGGsTzXxAAAANHRFWHRTb3VyY2VfVVJMAGh0dHA6Ly93d3cuaWNvbi1raW5nLmNvbS9wcm9qZWN0cy9udXZvbGEvdj20UgAAAABJRU5ErkJggg==\"); }\n      .deni-react-treeview-container.purple .deni-react-treeview-item-container.purple .icon-and-text .icon.isleaf {\n        background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACjElEQVR42o2SW0hUURSG/32OhnhAqJDCzF6kN0lLGtJCtLQyKIMotRjBy1sqVEZS9mKZBdKFHBJpJEKD0urBvAchhqY5kp6MHkRlMhpHR2fOHuZybu3KxhEr+/fL3g/rWx9rL4Kl1La+ta0XwiNUTVf9sgJF0yB5FVCfAqt9Lnx8yt7Ph4Qc6btVtIigkN+XJ28s9MTeHQLPETipF3aXB7NOJ2wLXnyamYVlwgq/jN5Fj+9QX3WhZxXg8ethmpMSzwA666rDxSBOKsHhViBa7XC5ndgWuRH1PSP9XlnJZJDFFYBHXe/p6bQEIanoGTZECJDhh98jg6gc5ue+oqwkBXlp8TB3WfBiYLx3yuYwiqbS6QDA3DVEjWk7BZ7n8Kc09IzAEBsFm+RG6+BndFsmhsdMxYkBwIO2d7QwI1HIrmgH0XmEMo7MA5qiQ9PZQF0SrDNOpBq2YPPWcLT0i+KYqTQuALjzvJeePZr8V4Nf0fHF4cD49DzKHnaKo7Uly4Cqpg568WS6kH21GxpREIZQEKKxEo4ZaXDJfrgWJBwwxGBPfDTONbxigOJlQLm5jVYaD65hAHgUP77ZKY5fbxI/BAPOm9vpTWOGkH2lExzHIKwrYYcnPNQwnhnpkKjGukciddcm5N9tFkdNJasBaxnouo5J2wKOVTaKYjDggrmDVhvThVOX2S9wPOu8tGnk5+zAMRPqk7HfEI2kuEjk32tmvxAEKK1rpTUFh9c00JjBFDPIYgYrAAW3W2hdcZaQU9GGdWwJOMIFCnRNxY+X5FaxLyEK6ckxOFPzdCUg90YjbbyUK+A/Mk89yCyvFwfvBy1SbF6VLWF7TIRPUdV/FRNNh6qowsDHyaG5l9d2fwfyXD4gAGnljAAAAABJRU5ErkJggg==\"); }\n      .deni-react-treeview-container.purple .deni-react-treeview-item-container.purple .icon-and-text .icon.expanded {\n        background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAAAl2cEFnAAAAEAAAABAAXMatwwAAAcVJREFUOMulkz9rFFEUxX+zTBCTRmTxA1hYRBTyGVKo/a69qKUELIQtrRYCKpZiIYJpzBSxEmUDixqSwjTC7oI2rpIQlnEz7L/ZmXnvXou3k0RXE8HTHHjv3XPOvZfnAYVSsWr5DUFYuQh8ATKOgV8qVu3y6tL0TZlGEFYWgS0gBRSQCR8KAHRa6VT98uoSlFk/KZUPYMZOVAW8guOd7YSpZL+migH1AUZdi2RQmHHvPr8eUW+v/LHnUrG6DrCTNu5u9l488QHiH3LwYP9rRr29wv2ndzh9pvDX4d0rP34INJ1AdLiEvdbI8acEmykqIJkiFlqvhly4OntU57IPkPRcgqht+DgIuHXzNklPEOuKrVHUgrEZ40h4+eYZQVhZA777AOPICXR7IbmgGMVmimQg4pIYTUiHc7n7N+Cda2FfGAz7NEZvuX7lBnFk0cnGbaqous2ICmsfnufum0DHB+j2OzTjmnMfiCsGZBL9oAVNjrq/B4wP0IxrXJq9xvmFcyR9gdxRFAQ3C6M041ruvgXMAXjAfKlYbfCPCMLKI+ABsAuoB8wAC8AicPaE+gFQBzYAkyfI+dRE7DhY3Mcy+YGnqvwPfgIS/ACI7unyYgAAACV0RVh0Y3JlYXRlLWRhdGUAMjAwOS0xMS0xNVQxNjowODo0MS0wNzowMCSu4eAAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTAtMDItMTZUMTk6NDg6NTMtMDc6MDBR6OwsAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDEwLTAxLTExVDA5OjE4OjMwLTA3OjAwZcV0YgAAADV0RVh0TGljZW5zZQBodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9saWNlbnNlcy9MR1BMLzIuMS87wbQYAAAAJXRFWHRtb2RpZnktZGF0ZQAyMDA5LTExLTE1VDE2OjA4OjQxLTA3OjAwex+X1AAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAANdEVYdFNvdXJjZQBOdXZvbGGsTzXxAAAANHRFWHRTb3VyY2VfVVJMAGh0dHA6Ly93d3cuaWNvbi1raW5nLmNvbS9wcm9qZWN0cy9udXZvbGEvdj20UgAAAABJRU5ErkJggg==\"); }\n", ""]);

// exports


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(72);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js??ref--2-1!../../node_modules/sass-loader/lib/loader.js??ref--2-2!./red-theme.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js??ref--2-1!../../node_modules/sass-loader/lib/loader.js??ref--2-2!./red-theme.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".deni-react-treeview-container.red {\n  border-color: #ff8a8a; }\n  .deni-react-treeview-container.red .deni-react-treeview-item-container.red {\n    color: #9a0000 !important;\n    border-color: #ff4d4d !important; }\n    .deni-react-treeview-container.red .deni-react-treeview-item-container.red:hover.select-row {\n      background-color: #ffe6e6; }\n    .deni-react-treeview-container.red .deni-react-treeview-item-container.red:hover:not(.select-row) {\n      background-color: transparent; }\n    .deni-react-treeview-container.red .deni-react-treeview-item-container.red.selected {\n      background: #ffe6e6;\n      /* Old browsers */\n      background: -moz-linear-gradient(top, #ffe6e6 0%, #ff8080 100%);\n      /* FF3.6-15 */\n      background: -webkit-linear-gradient(top, #ffe6e6 0%, #ff8080 100%);\n      /* Chrome10-25,Safari5.1-6 */\n      background: linear-gradient(to bottom, #ffe6e6 0%, #ff8080 100%);\n      /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */\n      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=$selection-background-start-color, endColorstr=$end-color,GradientType=0 );\n      /* IE6-9 */\n      outline-color: #ffb3b3 !important; }\n    .deni-react-treeview-container.red .deni-react-treeview-item-container.red .checkbox {\n      border-color: #ff9494 !important; }\n      .deni-react-treeview-container.red .deni-react-treeview-item-container.red .checkbox.selected {\n        border-color: #ff5757 !important; }\n    .deni-react-treeview-container.red .deni-react-treeview-item-container.red .expand-button {\n      color: #9a0000 !important; }\n    .deni-react-treeview-container.red .deni-react-treeview-item-container.red .icon-and-text:hover.select-row {\n      background-color: transparent; }\n    .deni-react-treeview-container.red .deni-react-treeview-item-container.red .icon-and-text:hover:not(.select-row) {\n      background-color: #ffe6e6; }\n    .deni-react-treeview-container.red .deni-react-treeview-item-container.red .icon-and-text.select-row {\n      border: 0;\n      padding: 1px; }\n    .deni-react-treeview-container.red .deni-react-treeview-item-container.red .icon-and-text.selected {\n      background: #ffe6e6;\n      /* Old browsers */\n      background: -moz-linear-gradient(top, #ffe6e6 0%, #ff8080 100%);\n      /* FF3.6-15 */\n      background: -webkit-linear-gradient(top, #ffe6e6 0%, #ff8080 100%);\n      /* Chrome10-25,Safari5.1-6 */\n      background: linear-gradient(to bottom, #ffe6e6 0%, #ff8080 100%);\n      /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */\n      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=$selection-background-start-color, endColorstr=$end-color,GradientType=0 );\n      /* IE6-9 */ }\n    .deni-react-treeview-container.red .deni-react-treeview-item-container.red .icon-and-text .icon {\n      background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAAAl2cEFnAAAAEAAAABAAXMatwwAAAWJJREFUOMuVkz1Ow0AQhT+bICSKLaD0DaCiowXEEVKhnCsHcCqaHCCKaKBFNKlSp4oTJ46i+Ge9QzG2CTGI8KSRtZp9377Rrj3AD40pOVAvSa6BKeCAVr9RaIy4zaZVoTEC3APnQKeqE8Db93cA7Pt7C/w0m0EQjP9K1gGQOAZAnMPzfcQ58tFIIYcKgkkvSe6AtwbgoohyOmXY73OMQmNeaogC5nOG/f7PJ/6mIHjpJcmtjhBFABSvr9osS7AWyXMoCiRNkSwD58gGA8663Rrz2IwAIKsV+H7LTFl+rbdbZL2uAZcKWCwAcHEMzmnVKbIM8ly/1iJpqvtUno6wXGqC9VrNImqyFrJMTz9I8e0dNNcYRYhz2rFWN1dmrEWqBG3AZsP+KIg0BqxVQAWWooDdrvanHnAVGjM5/v6aF/kMDD3gFLgBHoCLI/074AMY1z+GB5xVsGNUAjlgPRH5b/pv+gRoTwXgH8kELwAAACV0RVh0Y3JlYXRlLWRhdGUAMjAwOS0xMS0xNVQxNjowODo0MS0wNzowMCSu4eAAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTAtMDItMjBUMjM6MjQ6NDctMDc6MDDdsZPxAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDEwLTAxLTExVDA5OjE4OjMxLTA3OjAww7J/1gAAADV0RVh0TGljZW5zZQBodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9saWNlbnNlcy9MR1BMLzIuMS87wbQYAAAAJXRFWHRtb2RpZnktZGF0ZQAyMDA5LTExLTE1VDE2OjA4OjQxLTA3OjAwex+X1AAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAANdEVYdFNvdXJjZQBOdXZvbGGsTzXxAAAANHRFWHRTb3VyY2VfVVJMAGh0dHA6Ly93d3cuaWNvbi1raW5nLmNvbS9wcm9qZWN0cy9udXZvbGEvdj20UgAAAABJRU5ErkJggg==\"); }\n      .deni-react-treeview-container.red .deni-react-treeview-item-container.red .icon-and-text .icon.isleaf {\n        background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACjElEQVR42o2SW0hUURSG/32OhnhAqJDCzF6kN0lLGtJCtLQyKIMotRjBy1sqVEZS9mKZBdKFHBJpJEKD0urBvAchhqY5kp6MHkRlMhpHR2fOHuZybu3KxhEr+/fL3g/rWx9rL4Kl1La+ta0XwiNUTVf9sgJF0yB5FVCfAqt9Lnx8yt7Ph4Qc6btVtIigkN+XJ28s9MTeHQLPETipF3aXB7NOJ2wLXnyamYVlwgq/jN5Fj+9QX3WhZxXg8ethmpMSzwA666rDxSBOKsHhViBa7XC5ndgWuRH1PSP9XlnJZJDFFYBHXe/p6bQEIanoGTZECJDhh98jg6gc5ue+oqwkBXlp8TB3WfBiYLx3yuYwiqbS6QDA3DVEjWk7BZ7n8Kc09IzAEBsFm+RG6+BndFsmhsdMxYkBwIO2d7QwI1HIrmgH0XmEMo7MA5qiQ9PZQF0SrDNOpBq2YPPWcLT0i+KYqTQuALjzvJeePZr8V4Nf0fHF4cD49DzKHnaKo7Uly4Cqpg568WS6kH21GxpREIZQEKKxEo4ZaXDJfrgWJBwwxGBPfDTONbxigOJlQLm5jVYaD65hAHgUP77ZKY5fbxI/BAPOm9vpTWOGkH2lExzHIKwrYYcnPNQwnhnpkKjGukciddcm5N9tFkdNJasBaxnouo5J2wKOVTaKYjDggrmDVhvThVOX2S9wPOu8tGnk5+zAMRPqk7HfEI2kuEjk32tmvxAEKK1rpTUFh9c00JjBFDPIYgYrAAW3W2hdcZaQU9GGdWwJOMIFCnRNxY+X5FaxLyEK6ckxOFPzdCUg90YjbbyUK+A/Mk89yCyvFwfvBy1SbF6VLWF7TIRPUdV/FRNNh6qowsDHyaG5l9d2fwfyXD4gAGnljAAAAABJRU5ErkJggg==\"); }\n      .deni-react-treeview-container.red .deni-react-treeview-item-container.red .icon-and-text .icon.expanded {\n        background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAAAl2cEFnAAAAEAAAABAAXMatwwAAAb5JREFUOMulkz9rFEEYxn8rm7vCRYgfQ0GwTB3YLsSPIDamCFf4PTRwVQQLhSCENBeQKw4SRBGTKkHINYYLKFgkudvb3BD3Zt+Z12JuY/Q0EXyad/4wz/N7h5kIuNFMEsdvahhzF/gMlFyhuJkkbqnTmd5J04OGMfPADmABBfyk/jQAcN3u1PmlTgfSdOs6qhhAjQkzVYgiUEV2d5ki+5XqO6DBYDBArSWq1QAYt1qs9Xp/7LmZJFsAn0SevCiK5zGAPz0NAIA7PGSt1+Px+jrR7OxfL281TZ8B3UCQZRcbsr8f6t4eWIt6D2UJIow3NqgtLFz2uRcIJgbu6IjX5+c8Wl5G8xwVAWvBOVQELQp0OOTl5iYNY1rA10AwHAKQn5yEVs7OQAS1NqR7j4owdo6Z0ahK/wK8CwT9PsVgwBtrebi4iGZZQBeBsgxj71Hg1fZ2lf4ROI4Bsn6ftrUA+DwH7ycXIhf4iFCoXk5/D0gM0LaWB/U6t+bm0NEoGHgf3sWEREVoW1ul7wA3ASLgTjNJDvhHNYxZAZ4C3wCNgBngPjAP3L7mvAHeAh8AqQiqWp+YXSVH+FhSLUSqyv/oB6MeAo7+cQ+tAAAAJXRFWHRjcmVhdGUtZGF0ZQAyMDA5LTExLTE1VDE2OjA4OjQxLTA3OjAwJK7h4AAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxMC0wMi0xNlQxOTo0ODo1My0wNzowMFHo7CwAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTAtMDEtMTFUMDk6MTg6MzEtMDc6MDDDsn/WAAAANXRFWHRMaWNlbnNlAGh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL2xpY2Vuc2VzL0xHUEwvMi4xLzvBtBgAAAAldEVYdG1vZGlmeS1kYXRlADIwMDktMTEtMTVUMTY6MDg6NDEtMDc6MDB7H5fUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA10RVh0U291cmNlAE51dm9sYaxPNfEAAAA0dEVYdFNvdXJjZV9VUkwAaHR0cDovL3d3dy5pY29uLWtpbmcuY29tL3Byb2plY3RzL251dm9sYS92PbRSAAAAAElFTkSuQmCC\"); }\n", ""]);

// exports


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(74);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js??ref--2-1!../../node_modules/sass-loader/lib/loader.js??ref--2-2!./silver-theme.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js??ref--2-1!../../node_modules/sass-loader/lib/loader.js??ref--2-2!./silver-theme.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".deni-react-treeview-container.silver {\n  border-color: #c4c4c4; }\n  .deni-react-treeview-container.silver .deni-react-treeview-item-container.silver {\n    color: #4c4c4c !important;\n    border-color: #a6a6a6 !important; }\n    .deni-react-treeview-container.silver .deni-react-treeview-item-container.silver:hover.select-row {\n      background-color: #f2f2f2; }\n    .deni-react-treeview-container.silver .deni-react-treeview-item-container.silver:hover:not(.select-row) {\n      background-color: transparent; }\n    .deni-react-treeview-container.silver .deni-react-treeview-item-container.silver.selected {\n      background: #f2f2f2;\n      /* Old browsers */\n      background: -moz-linear-gradient(top, #f2f2f2 0%, #bfbfbf 100%);\n      /* FF3.6-15 */\n      background: -webkit-linear-gradient(top, #f2f2f2 0%, #bfbfbf 100%);\n      /* Chrome10-25,Safari5.1-6 */\n      background: linear-gradient(to bottom, #f2f2f2 0%, #bfbfbf 100%);\n      /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */\n      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=$selection-background-start-color, endColorstr=$end-color,GradientType=0 );\n      /* IE6-9 */\n      outline-color: #d9d9d9 !important; }\n    .deni-react-treeview-container.silver .deni-react-treeview-item-container.silver .checkbox {\n      border-color: #c9c9c9 !important; }\n      .deni-react-treeview-container.silver .deni-react-treeview-item-container.silver .checkbox.selected {\n        border-color: #ababab !important; }\n    .deni-react-treeview-container.silver .deni-react-treeview-item-container.silver .expand-button {\n      color: #4c4c4c !important; }\n    .deni-react-treeview-container.silver .deni-react-treeview-item-container.silver .icon-and-text:hover.select-row {\n      background-color: transparent; }\n    .deni-react-treeview-container.silver .deni-react-treeview-item-container.silver .icon-and-text:hover:not(.select-row) {\n      background-color: #f2f2f2; }\n    .deni-react-treeview-container.silver .deni-react-treeview-item-container.silver .icon-and-text.select-row {\n      border: 0;\n      padding: 1px; }\n    .deni-react-treeview-container.silver .deni-react-treeview-item-container.silver .icon-and-text.selected {\n      background: #f2f2f2;\n      /* Old browsers */\n      background: -moz-linear-gradient(top, #f2f2f2 0%, #bfbfbf 100%);\n      /* FF3.6-15 */\n      background: -webkit-linear-gradient(top, #f2f2f2 0%, #bfbfbf 100%);\n      /* Chrome10-25,Safari5.1-6 */\n      background: linear-gradient(to bottom, #f2f2f2 0%, #bfbfbf 100%);\n      /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */\n      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=$selection-background-start-color, endColorstr=$end-color,GradientType=0 );\n      /* IE6-9 */ }\n    .deni-react-treeview-container.silver .deni-react-treeview-item-container.silver .icon-and-text .icon {\n      background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAJdnBBZwAAABAAAAAQAFzGrcMAAADvSURBVCjPfdGxSgNREIXhb80Wgk1AQVArX0AQkrcQW9k8Qcr0dlb2Qp7AysbSxsZ0GhtLGzshaJEmbhJ277Vw3RATPN1wfn6GmST6P8nZ6cbt7zDq3t8YK5eILC6SxdaFPY0lQxYv6+FAx19bSo4oEb26roFOv7X/1DdKmfjwsLLcod3z2BheyeIg9uL69KKTlIktbwiCUqlQiIaO4DhlglxS16VSaW4KzRqIolJQKBWCQg5SvlaAUDkqIMdEpCqCICgWwMyPJVZVEBDMzZCOui/9LYOVO0y9u3s2Tmxra2uufeXYY6KhacfmWmDq8xuQL5PixDBZGgAAACV0RVh0Y3JlYXRlLWRhdGUAMjAwOS0xMS0xNVQxNjowODo0MS0wNzowMCSu4eAAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTAtMDItMjBUMjM6MjQ6NDctMDc6MDDdsZPxAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDEwLTAxLTExVDA5OjE4OjMyLTA3OjAw8lplSwAAADV0RVh0TGljZW5zZQBodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9saWNlbnNlcy9MR1BMLzIuMS87wbQYAAAAJXRFWHRtb2RpZnktZGF0ZQAyMDA5LTExLTE1VDE2OjA4OjQxLTA3OjAwex+X1AAAAA10RVh0U291cmNlAE51dm9sYaxPNfEAAAA0dEVYdFNvdXJjZV9VUkwAaHR0cDovL3d3dy5pY29uLWtpbmcuY29tL3Byb2plY3RzL251dm9sYS92PbRSAAAAAElFTkSuQmCC\"); }\n      .deni-react-treeview-container.silver .deni-react-treeview-item-container.silver .icon-and-text .icon.isleaf {\n        background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACjElEQVR42o2SW0hUURSG/32OhnhAqJDCzF6kN0lLGtJCtLQyKIMotRjBy1sqVEZS9mKZBdKFHBJpJEKD0urBvAchhqY5kp6MHkRlMhpHR2fOHuZybu3KxhEr+/fL3g/rWx9rL4Kl1La+ta0XwiNUTVf9sgJF0yB5FVCfAqt9Lnx8yt7Ph4Qc6btVtIigkN+XJ28s9MTeHQLPETipF3aXB7NOJ2wLXnyamYVlwgq/jN5Fj+9QX3WhZxXg8ethmpMSzwA666rDxSBOKsHhViBa7XC5ndgWuRH1PSP9XlnJZJDFFYBHXe/p6bQEIanoGTZECJDhh98jg6gc5ue+oqwkBXlp8TB3WfBiYLx3yuYwiqbS6QDA3DVEjWk7BZ7n8Kc09IzAEBsFm+RG6+BndFsmhsdMxYkBwIO2d7QwI1HIrmgH0XmEMo7MA5qiQ9PZQF0SrDNOpBq2YPPWcLT0i+KYqTQuALjzvJeePZr8V4Nf0fHF4cD49DzKHnaKo7Uly4Cqpg568WS6kH21GxpREIZQEKKxEo4ZaXDJfrgWJBwwxGBPfDTONbxigOJlQLm5jVYaD65hAHgUP77ZKY5fbxI/BAPOm9vpTWOGkH2lExzHIKwrYYcnPNQwnhnpkKjGukciddcm5N9tFkdNJasBaxnouo5J2wKOVTaKYjDggrmDVhvThVOX2S9wPOu8tGnk5+zAMRPqk7HfEI2kuEjk32tmvxAEKK1rpTUFh9c00JjBFDPIYgYrAAW3W2hdcZaQU9GGdWwJOMIFCnRNxY+X5FaxLyEK6ckxOFPzdCUg90YjbbyUK+A/Mk89yCyvFwfvBy1SbF6VLWF7TIRPUdV/FRNNh6qowsDHyaG5l9d2fwfyXD4gAGnljAAAAABJRU5ErkJggg==\"); }\n      .deni-react-treeview-container.silver .deni-react-treeview-item-container.silver .icon-and-text .icon.expanded {\n        background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAJdnBBZwAAABAAAAAQAFzGrcMAAAEZSURBVCjPfdExS8NQEMDx/2vfIEKhoIu6+QlcGpz9Ag4ukn6CIrh3dnVyMJ9AFx0cFFwKHTIItggKhZZSFBVS6lAkSSvmvXNItNaAd9NxvzsOTgn/h9rdLlx8F8Na44yxmDnhyixcqRywSlGYpXLl8AevUM3t0jAFBIUw4CQDVa+yduupoRjlSp0EDdzR+3Ogv9881RCmS+lRZ3EO7B01+xoiAF6AJwwWg6XFRmqcDLwRsMMEi8FgSYg5x2+DhhgYwa+25YMJcN+hoyHinZAtYgRLgmARrvDbPNLVMCKgRIwg2Cw/0/kHXjWMKbHJNAMpeub4ki4hoR7W8NZp5L8U0OIGUSzh4FDOgT7XDCgoipRZZiEHQgKJ4AsJ/pBiuU0XWgAAACV0RVh0Y3JlYXRlLWRhdGUAMjAwOS0xMS0xNVQxNjowODo0MS0wNzowMCSu4eAAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTAtMDItMTZUMTk6NDg6NTMtMDc6MDBR6OwsAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDEwLTAxLTExVDA5OjE4OjMwLTA3OjAwZcV0YgAAADV0RVh0TGljZW5zZQBodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9saWNlbnNlcy9MR1BMLzIuMS87wbQYAAAAJXRFWHRtb2RpZnktZGF0ZQAyMDA5LTExLTE1VDE2OjA4OjQxLTA3OjAwex+X1AAAAA10RVh0U291cmNlAE51dm9sYaxPNfEAAAA0dEVYdFNvdXJjZV9VUkwAaHR0cDovL3d3dy5pY29uLWtpbmcuY29tL3Byb2plY3RzL251dm9sYS92PbRSAAAAAElFTkSuQmCC\"); }\n", ""]);

// exports


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _propTypes = __webpack_require__(76);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {

  propTypes: {
    autoLoad: _propTypes2.default.bool,
    items: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object]),
    lazyLoad: _propTypes2.default.bool,
    marginItems: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
    onAfterLoad: _propTypes2.default.func,
    onBeforeLoad: _propTypes2.default.func,
    onRenderItem: _propTypes2.default.func,
    onSelectItem: _propTypes2.default.func,
    selectRow: _propTypes2.default.bool,
    showCheckbox: _propTypes2.default.bool,
    showIcon: _propTypes2.default.bool,
    showRoot: _propTypes2.default.bool,
    theme: _propTypes2.default.string,
    url: _propTypes2.default.string
  },

  defaultProps: {
    autoLoad: true,
    lazyLoad: false,
    marginItems: 30,
    selectRow: false,
    showCheckbox: false,
    showIcon: true,
    showRoot: false,
    theme: 'classic'
  }
};

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(77)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(78)();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(4);
var invariant = __webpack_require__(6);
var warning = __webpack_require__(8);
var assign = __webpack_require__(7);

var ReactPropTypesSecret = __webpack_require__(9);
var checkPropTypes = __webpack_require__(12);

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(
          false,
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(4);
var invariant = __webpack_require__(6);
var ReactPropTypesSecret = __webpack_require__(9);

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _deniReactTreeviewApi = __webpack_require__(80);

var _deniReactTreeviewApi2 = _interopRequireDefault(_deniReactTreeviewApi);

var _deniReactTreeview = __webpack_require__(13);

var _deniReactTreeview2 = _interopRequireDefault(_deniReactTreeview);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (scope) {

  return {

    //
    //
    //
    addItem: function addItem(text, isLeaf, parentNode) {
      return _deniReactTreeviewApi2.default.addItem(scope, text, isLeaf, parentNode);
    },

    //
    // folderToFind can be passed as a "id" or as a "object" ex:
    //
    //  treeviewEl.api.findFolder(456) //456 is a id value or
    //  treeviewEl.api.findFolder({name: 'Brazil'}) //it will searches for the first folder that match the passed data and leaf is not true
    //
    findFolder: function findFolder(folderToFind) {
      return _deniReactTreeviewApi2.default.findFolder(scope, folderToFind);
    },

    //
    // folderToFind can be passed as a "id" or as a "object" ex:
    //
    //  treeviewEl.api.findFolder(456) //456 is a id value or
    //  treeviewEl.api.findFolder({name: 'Brazil'}) //it will searches for the first folder that match the passed data and leaf is not true
    //
    findNode: function findNode(nodeToFind) {
      return _deniReactTreeviewApi2.default.findNode(scope, nodeToFind);
    },

    //
    // itemToFind can be passed as a "id" or as a "object" ex:
    //
    //  treeviewEl.api.findItem(357) //357 is a id value or
    //  treeviewEl.api.findItem({name: 'Dog'}) //it will searches for the first item that match the passed data and leaf is true
    //
    findItem: function findItem(itemToFind) {
      return _deniReactTreeviewApi2.default.findItem(scope, itemToFind);
    },

    //
    //
    //
    getItems: function getItems() {
      return _deniReactTreeviewApi2.default.getItems(scope);
    },

    //
    //
    //
    getParentNode: function getParentNode(item) {
      return _deniReactTreeviewApi2.default.getParentNode(scope, item);
    },

    //
    //
    //
    getRootItem: function getRootItem() {
      return _deniReactTreeviewApi2.default.getRootItem(scope);
    },

    //
    //
    //
    getSelectedItem: function getSelectedItem() {
      return _deniReactTreeviewApi2.default.getSelectedItem(scope);
    },

    //
    //
    //
    load: _deniReactTreeview2.default.load.bind(scope),

    //
    //
    //
    loadData: _deniReactTreeview2.default.loadData.bind(scope),

    //
    //
    //
    removeItem: function removeItem(id) {
      _deniReactTreeviewApi2.default.removeItem(scope, id);
    },

    //
    // itemToFind can be passed as a "id" or as a "object" ex:
    //
    //  treeviewEl.api.selectItem(357) //357 is a id value or
    //  treeviewEl.api.selectItem({name: 'Dog'}) //it will searches for the first item that match the passed data and leaf is true
    //
    selectItem: function selectItem(itemToFind) {
      _deniReactTreeviewApi2.default.selectItem(scope, itemToFind);
    },

    //
    //
    //
    setTheme: function setTheme(newTheme) {
      _deniReactTreeview2.default.setTheme(scope, newTheme);
    }

  };
};

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = {

  addItem: function addItem(scope, text, isLeaf, parentNode) {
    var parent = parentNode || scope.state.selectedItem || scope.state.rootItem;
    if (!parent) {
      throw new Error('You must specify a parent node!');
    }
    var newItem = {
      text: text,
      children: [],
      isLeaf: false
    };
    parent.children = parent.children || [];
    parent.children.push(newItem);
    parent.expanded = true;
    _selectNode(scope, newItem);

    return newItem;
  },

  findFolder: function findFolder(scope, folderToFind) {
    var dataToFind = _normalizeDataToFind(folderToFind);
    var keys = Object.keys(dataToFind);
    var node = _findNode(scope.state.rootItem.children, dataToFind, keys);
    if (!node) {
      throw new Error('Folder not found!');
    } else {
      return node;
    }
  },

  findItem: function findItem(scope, itemToFind) {
    var dataToFind = _normalizeDataToFind(itemToFind);
    dataToFind['isLeaf'] = true;
    var keys = Object.keys(dataToFind);
    var node = _findNode(scope.state.rootItem.children, dataToFind, keys);
    if (!node) {
      throw new Error('Item not found!');
    } else {
      return node;
    }
  },

  findNode: function findNode(scope, nodeToFind) {
    var dataToFind = _normalizeDataToFind(nodeToFind);
    var keys = Object.keys(dataToFind);
    var node = _findNode(scope.state.rootItem.children, dataToFind, keys);
    if (!node) {
      throw new Error('Folder not found!');
    } else {
      return node;
    }
  },

  getItems: function getItems(scope) {
    return scope.state.rootItem.children || [];
  },

  getParentNode: function getParentNode(scope, item) {
    var currentItem = item || scope.state.selectedItem;
    return _getParentItem(scope, currentItem);
  },

  getRootItem: function getRootItem(scope) {
    return scope.state.rootItem;
  },

  getSelectedItem: function getSelectedItem(scope) {
    return scope.state.selectedItem;
  },

  removeItem: function removeItem(scope, id) {
    //let node = _findNode(scope.s.rootItem.children, dataToFind, keys);
    //let nodeTobeRemoved = _findNode
    //console.log('removing... ' + id)
    var node = scope.api.findNode(id);
    var parentNode = _getParentItem(scope, node);
    var childIndex = parentNode.children.findIndex(function (child) {
      return child.id === node.id;
    });

    parentNode.children.splice(childIndex, 1);
    scope.forceUpdate();

    // if (parentNode.children.length === 0) {
    //   scope.api.selectItem(parentNode)
    // } else {
    //   let newIndex = childIndex - 1;
    //   if (newIndex < 0) {
    //     newIndex = 0;
    //   }
    //   scope.api.selectItem(parentNode.children[newIndex]);
    // }
  },

  selectItem: function selectItem(scope, itemToFind) {
    var item = scope.api.findNode(itemToFind);
    if (item) {
      _selectNode(scope, item);
    } else {
      throw new Error('Item not found.');
    }
  }

  //
};function _findNode(children, dataToFind, keys) {
  for (var index = 0; index < children.length; index++) {
    var child = children[index];
    var allFieldsAreEqual = true;

    for (var index2 = 0; index2 < keys.length; index2++) {
      var key = keys[index2];

      if (child[key] !== dataToFind[key]) {
        allFieldsAreEqual = false;
      }
    }

    if (allFieldsAreEqual) {
      return child;
    }

    if (child.children) {
      var searchInChildren = _findNode(child.children, dataToFind, keys);
      if (searchInChildren) {
        return searchInChildren;
      }
    }
  }
  return null;
}

//
function _getParentItems(scope, item) {
  var parents = [];
  var currentItem = item;
  while (true) {
    currentItem = _getParentItem(scope, currentItem);
    if (currentItem) {
      if (currentItem.root && !scope.props.showRoot) {
        break;
      } else {
        parents.push(currentItem);
      }
    } else {
      break;
    }
  }
  return parents;
}

//
function _getParentItem(scope, item, parentItem) {
  var parent = parentItem || scope.state.rootItem;
  var itemsToFind = parent.children;
  for (var index = 0; index < itemsToFind.length; index++) {
    var itemToFind = itemsToFind[index];
    if (itemToFind.id === item.id) {
      return parent;
    }
    if (itemToFind.children) {
      var parent2 = _getParentItem(scope, item, itemToFind);
      if (parent2) {
        return parent2;
      }
    }
  }
  // if (item.parent === scope.state.rootItem.id) {
  //   if (scope.props.showRoot) {
  //     return scope.state.rootItem;
  //   } else {
  //     return undefined;
  //   }
  // } else {
  //   let parentItem = vm.findFolder(scope, item.parent);
  //   return parentItem;
  // }
}

//
function _normalizeDataToFind(dataToFind) {
  var normalizedData = {};
  if (typeof dataToFind === 'number' || typeof dataToFind === 'string') {
    normalizedData['id'] = dataToFind;
  } else if ((typeof dataToFind === 'undefined' ? 'undefined' : _typeof(dataToFind)) === 'object') {
    normalizedData = dataToFind;
  } else {
    throw new Error('Parameter set in a wrong way.');
  }
  return normalizedData;
}

//
function _selectNode(scope, item) {
  var parentItems = _getParentItems(scope, item);
  parentItems.forEach(function (parent) {
    if (!parent.expanded) {
      parent.expanded = true;
    }
  });
  scope.setState({
    selectedItem: item
  });
}

/***/ })
/******/ ]);
});