/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var popmotion = __webpack_require__(1),
	    UIref = window.ui;
	
	window.ui = window.popmotion = popmotion;
	
	/*
	    If noConflict is run, the original reference to window.UI is
	    restored and Popmotion is loaded to window.Popmotion
	*/
	window.ui.noConflict = function () {
	    window.ui = UIref;
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var popmotion = __webpack_require__(2);
	
	/*
	    Add optional custom value type support
	*/
	popmotion.addValueType({
	    alpha: __webpack_require__(3),
	    angle: __webpack_require__(4),
	    px: __webpack_require__(5),
	    hsl: __webpack_require__(6),
	    rgb: __webpack_require__(7),
	    hex: __webpack_require__(8),
	    color: __webpack_require__(9),
	    positions: __webpack_require__(10),
	    dimensions: __webpack_require__(11),
	    scale: __webpack_require__(12),
	    shadow: __webpack_require__(13),
	    complex: __webpack_require__(14)
	});
	
	/*
	    Predefined roles
	*/
	
	popmotion.attr = __webpack_require__(15);
	popmotion.css = __webpack_require__(16);
	popmotion.svg = __webpack_require__(17);
	popmotion.drawPath = __webpack_require__(18);
	
	module.exports = popmotion;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var valueTypeManager = __webpack_require__(19),
	    _select = __webpack_require__(20),
	    Popmotion = {
	
	    Actor: __webpack_require__(21),
	
	    Input: __webpack_require__(22),
	
	    Iterator: __webpack_require__(23),
	
	    Process: __webpack_require__(24),
	
	    Easing: __webpack_require__(26),
	
	    Role: __webpack_require__(25),
	
	    Action: __webpack_require__(27),
	    Tween: __webpack_require__(28),
	    Simulate: __webpack_require__(29),
	    Track: __webpack_require__(30),
	
	    /*
	        Create an Iterator of Actors with selected dom elements
	    */
	    select: function select(selector) {
	        var _this = this;
	
	        var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	        var selection = _select(selector),
	            actors = [];
	
	        selection.forEach(function (element) {
	            opts.element = element;
	            actors.push(new _this.Actor(opts));
	        });
	
	        return new this.Iterator(actors);
	    },
	
	    addValueType: function addValueType() {
	        valueTypeManager.extend.apply(valueTypeManager, arguments);
	        return this;
	    },
	
	    calc: __webpack_require__(31)
	};
	
	module.exports = Popmotion;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = {
	    defaultProps: {
	        min: 0,
	        max: 1
	    }
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = {
	    defaultProps: {
	        unit: 'deg'
	    }
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = {
	    defaultProps: {
	        unit: 'px'
	    }
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var createDelimited = __webpack_require__(32),
	    getColorValues = __webpack_require__(33),
	    functionCreate = __webpack_require__(34),
	    defaultProps = __webpack_require__(35),
	    terms = __webpack_require__(36).hsl;
	
	module.exports = {
	
	    defaultProps: {
	        Hue: {
	            min: 0,
	            max: 360
	        },
	        Saturation: defaultProps.percent,
	        Lightness: defaultProps.percent,
	        Alpha: defaultProps.opacity
	    },
	
	    test: function test(value) {
	        return value && value.indexOf('hsl') > -1;
	    },
	
	    split: function split(value) {
	        return getColorValues(value, terms);
	    },
	
	    combine: function combine(values) {
	        return functionCreate(createDelimited(values, terms, ', ', 2), 'hsla');
	    }
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var createDelimited = __webpack_require__(32),
	    getColorValues = __webpack_require__(33),
	    functionCreate = __webpack_require__(34),
	    defaultProps = __webpack_require__(35),
	    colorDefaults = defaultProps.color,
	    terms = __webpack_require__(36).colors;
	
	module.exports = {
	
	    defaultProps: {
	        Red: colorDefaults,
	        Green: colorDefaults,
	        Blue: colorDefaults,
	        Alpha: defaultProps.opacity
	    },
	
	    test: function test(value) {
	        return value && value.indexOf('rgb') > -1;
	    },
	
	    split: function split(value) {
	        return getColorValues(value, terms);
	    },
	
	    combine: function combine(values) {
	        return functionCreate(createDelimited(values, terms, ', ', 2), 'rgba');
	    }
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var rgb = __webpack_require__(7);
	
	module.exports = {
	
	    defaultProps: rgb.defaultProps,
	
	    test: function test(value) {
	        return value && value.indexOf('#') > -1;
	    },
	
	    split: function split(value) {
	        var r, g, b;
	
	        // If we have 6 characters, ie #FF0000
	        if (value.length > 4) {
	            r = value.substr(1, 2);
	            g = value.substr(3, 2);
	            b = value.substr(5, 2);
	
	            // Or we have 3 characters, ie #F00
	        } else {
	            r = value.substr(1, 1);
	            g = value.substr(2, 1);
	            b = value.substr(3, 1);
	            r += r;
	            g += g;
	            b += b;
	        }
	
	        return {
	            Red: parseInt(r, 16),
	            Green: parseInt(g, 16),
	            Blue: parseInt(b, 16),
	            Alpha: 1
	        };
	    },
	
	    combine: function combine(values) {
	        return rgb.combine(values);
	    }
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(37),
	    rgb = __webpack_require__(7),
	    hsl = __webpack_require__(6),
	    hex = __webpack_require__(8),
	    supported = [rgb, hsl, hex],
	    numSupported = 3,
	    runSupported = function runSupported(method, value) {
	    for (var i = 0; i < numSupported; i++) {
	        if (supported[i].test(value)) {
	            return supported[i][method](value);
	        }
	    }
	};
	
	module.exports = {
	
	    defaultProps: utils.merge(rgb.defaultProps, hsl.defaultProps),
	
	    test: function test(value) {
	        return rgb.test(value) || hex.test(value) || hsl.test(value);
	    },
	
	    split: function split(value) {
	        return runSupported('split', value);
	    },
	
	    combine: function combine(values) {
	        return values.Red !== undefined ? rgb.combine(values) : hsl.combine(values);
	    }
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var createDelimited = __webpack_require__(32),
	    pxDefaults = __webpack_require__(5).defaultProps,
	    splitSpaceDelimited = __webpack_require__(38),
	    terms = __webpack_require__(36).positions;
	
	module.exports = {
	
	    defaultProps: pxDefaults,
	
	    /*
	        Split positions in format "X Y Z"
	        
	        @param [string]: Position values
	            "20% 30% 0" -> {20%, 30%, 0}
	            "20% 30%" -> {20%, 30%}
	            "20%" -> {20%, 20%}
	    */
	    split: function split(value) {
	        var positions = splitSpaceDelimited(value),
	            numPositions = positions.length,
	            splitValue = {
	            X: positions[0],
	            Y: numPositions > 1 ? positions[1] : positions[0]
	        };
	
	        if (numPositions > 2) {
	            splitValue.Z = positions[2];
	        }
	
	        return splitValue;
	    },
	
	    combine: function combine(values) {
	        return createDelimited(values, terms, ' ');
	    }
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var terms = __webpack_require__(36).dimensions,
	    pxDefaults = __webpack_require__(5).defaultProps,
	    createDelimited = __webpack_require__(32),
	    splitSpaceDelimited = __webpack_require__(38);
	
	module.exports = {
	
	    defaultProps: pxDefaults,
	
	    /*
	        Split dimensions in format "Top Right Bottom Left"
	        
	        @param [string]: Dimension values
	            "20px 0 30px 40px" -> {20px, 0, 30px, 40px}
	            "20px 0 30px" -> {20px, 0, 30px, 0}
	            "20px 0" -> {20px, 0, 20px, 0}
	            "20px" -> {20px, 20px, 20px, 20px}
	        
	        @return [object]: Object with T/R/B/L metrics
	    */
	    split: function split(value) {
	        var dimensions = splitSpaceDelimited(value),
	            numDimensions = dimensions.length,
	            jumpBack = numDimensions !== 1 ? 2 : 1,
	            i = 0,
	            j = 0,
	            splitValue = {};
	
	        for (; i < 4; i++) {
	            splitValue[terms[i]] = dimensions[j];
	
	            // Jump back (to start) counter if we've reached the end of our values
	            j++;
	            j = j === numDimensions ? j - jumpBack : j;
	        }
	
	        return splitValue;
	    },
	
	    combine: function combine(values) {
	        return createDelimited(values, terms, ' ');
	    }
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = {
	    defaultProps: {
	        init: 1
	    }
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var color = __webpack_require__(9),
	    utils = __webpack_require__(37),
	    pxDefaults = __webpack_require__(5).defaultProps,
	    terms = __webpack_require__(36).shadow,
	    splitSpaceDelimited = __webpack_require__(38),
	    createDelimited = __webpack_require__(32),
	    shadowTerms = terms.slice(0, 4);
	
	module.exports = {
	
	    defaultProps: utils.merge(color.defaultProps, {
	        X: pxDefaults,
	        Y: pxDefaults,
	        Radius: pxDefaults,
	        Spread: pxDefaults
	    }),
	
	    /*
	        Split shadow properties "X Y Radius Spread Color"
	        
	        @param [string]: Shadow property
	        @return [object]
	    */
	    split: function split(value) {
	        var bits = splitSpaceDelimited(value),
	            numBits = bits.length,
	            hasReachedColor = false,
	            colorProp = '',
	            thisBit,
	            i = 0,
	            splitValue = {};
	
	        for (; i < numBits; i++) {
	            thisBit = bits[i];
	
	            // If we've reached the color property, append to color string
	            if (hasReachedColor || color.test(thisBit)) {
	                hasReachedColor = true;
	                colorProp += thisBit;
	            } else {
	                splitValue[terms[i]] = thisBit;
	            }
	        }
	
	        return utils.merge(splitValue, color.split(colorProp));
	    },
	
	    combine: function combine(values) {
	        return createDelimited(values, shadowTerms, ' ') + color.combine(values);
	    }
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(37),
	    each = utils.each,
	    floatRegex = /(-)?(\d[\d\.]*)/g,
	    generateToken = function generateToken(key) {
	    return '${' + key + '}';
	};
	
	module.exports = {
	    test: function test(value) {
	        var matches = value.match(floatRegex);
	        return utils.isArray(matches) && matches.length > 1;
	    },
	
	    template: function template(value) {
	        var counter = 0;
	        return value.replace(floatRegex, function () {
	            return generateToken(counter++);
	        });
	    },
	
	    split: function split(value) {
	        var splitValue = {},
	            matches = value.match(floatRegex),
	            numMatches = matches.length;
	
	        for (var i = 0; i < numMatches; i++) {
	            splitValue[i] = matches[i];
	        }
	
	        return splitValue;
	    },
	
	    combine: function combine(values, template) {
	        var combinedValue = template;
	
	        each(values, function (key, value) {
	            combinedValue = combinedValue.replace(generateToken(key), value);
	        });
	
	        return combinedValue;
	    }
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Role = __webpack_require__(25);
	var each = __webpack_require__(37).each;
	
	var attrRole = new Role({
	    update: function update(state) {
	        var actor = this;
	
	        each(state, function (key, value) {
	            attrRole.set(actor.element, key, value);
	        });
	    },
	
	    get: function get(element, key) {
	        return element.getAttribute(key);
	    },
	
	    set: function set(element, key, value) {
	        element.setAttribute(key, value);
	    }
	});
	
	module.exports = attrRole;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Role = __webpack_require__(25);
	var build = __webpack_require__(39);
	var each = __webpack_require__(37).each;
	
	var prefixes = ['Webkit', 'Moz', 'O', 'ms', ''];
	var numPrefixes = prefixes.length;
	var propertyNameCache = {};
	var testElement = document.createElement('div');
	
	/*
	    Test style property for prefixed version
	    
	    @param [string]: Style property
	    @return [string]: Cached property name
	*/
	var testPrefix = function testPrefix(key) {
	    if (propertyNameCache[key] === false) {
	        return false;
	    } else {
	        propertyNameCache[key] = false;
	    }
	
	    for (var i = 0; i < numPrefixes; i++) {
	        var prefix = prefixes[i],
	            prefixed = prefix === '' ? key : prefix + key.charAt(0).toUpperCase() + key.slice(1);
	
	        if (prefixed in testElement.style) {
	            propertyNameCache[key] = prefixed;
	        }
	    }
	
	    return propertyNameCache[key];
	};
	
	var cssRole = new Role({
	    _map: __webpack_require__(40),
	    _typeMap: __webpack_require__(41),
	
	    init: function init() {
	        this._cssCache = {};
	    },
	
	    update: function update(state) {
	        var actor = this;
	
	        each(build(state, actor._cssCache), function (key, value) {
	            cssRole.set(actor.element, key, value);
	        });
	    },
	
	    get: function get(element, key) {
	        key = propertyNameCache[key] || testPrefix(key);
	
	        if (key) {
	            return window.getComputedStyle(element, null)[key];
	        }
	    },
	
	    set: function set(element, key, value) {
	        key = propertyNameCache[key] || testPrefix(key);
	
	        if (key) {
	            element.style[key] = value;
	        }
	    }
	
	});
	
	module.exports = cssRole;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Role = __webpack_require__(25),
	    attrRole = __webpack_require__(15),
	    build = __webpack_require__(42),
	    each = __webpack_require__(37).each;
	
	module.exports = new Role({
	    name: 'svg',
	
	    _map: __webpack_require__(40),
	    _typeMap: __webpack_require__(43),
	
	    start: function start() {
	        var boundingBox = this.element.getBBox(),
	            values = this.values,
	
	        // TODO: Support px
	        transformOriginX = values.transformOriginX ? values.transformOriginX.current : 50,
	            transformOriginY = values.transformOriginY ? values.transformOriginY.current : 50,
	            origin = {
	            x: boundingBox.width * (transformOriginX / 100) + boundingBox.x,
	            y: boundingBox.height * (transformOriginY / 100) + boundingBox.y
	        };
	
	        this.svgOrigin = origin;
	    },
	
	    update: function update(state) {
	        var actor = this;
	        each(build(state, this.svgOrigin), function (key, value) {
	            attrRole.set(actor.element, key, value);
	        });
	    }
	
	});

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Role = __webpack_require__(25);
	var attrRole = __webpack_require__(15);
	var each = __webpack_require__(37).each;
	
	/*
	    Convert percentage to pixels
	    
	    @param [number]: Percentage of total length
	    @param [number]: Total length
	*/
	var percentToPixels = function percentToPixels(percentage, length) {
	    return parseFloat(percentage) / 100 * length + 'px';
	};
	
	/*
	    Create styles
	    
	    @param [object]: SVG Path properties
	    @param [object]: Length of path
	    @returns [object]: Key/value pairs of valid CSS properties
	*/
	var createStyles = function createStyles(props, length) {
	    var hasDashArray = false,
	        dashArrayStyles = {
	        length: 0,
	        spacing: length + 'px'
	    },
	        styles = {};
	
	    each(props, function (key, value) {
	        key = SVGDrawPath._map[key] || key;
	
	        switch (key) {
	            case 'length':
	            case 'spacing':
	                hasDashArray = true;
	                dashArrayStyles[key] = percentToPixels(value, length);
	                break;
	            case 'offset':
	                styles['stroke-dashoffset'] = percentToPixels(-value, length);
	                break;
	            default:
	                styles[key] = value;
	        }
	    });
	
	    if (hasDashArray) {
	        styles['stroke-dasharray'] = dashArrayStyles.length + ' ' + dashArrayStyles.spacing;
	    }
	
	    return styles;
	};
	
	/*
	    Draw Path role
	*/
	var SVGDrawPath = new Role({
	    _map: __webpack_require__(44),
	
	    _typeMap: {
	        stroke: 'color',
	        d: 'complex'
	    },
	
	    init: function init() {
	        this.pathLength = this.element.getTotalLength();
	    },
	
	    /*
	        Update `path` styles and if `element` is present, set
	        x, y and rotation
	    */
	    update: function update(state) {
	        attrRole.update.call(this, createStyles(state, this.pathLength));
	    }
	});
	
	module.exports = SVGDrawPath;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var ModManager = __webpack_require__(45),
	    valueTypeManager = new ModManager();
	
	valueTypeManager.defaultProps = function (type, key) {
	    var valueType = this[type],
	        defaultProps = valueType.defaultProps ? valueType.defaultProps[key] || valueType.defaultProps : {};
	
	    return defaultProps;
	};
	
	valueTypeManager.test = function (value) {
	    var type = false;
	
	    this.each(function (key, mod) {
	        if (mod.test && mod.test(value)) {
	            type = key;
	        }
	    });
	
	    return type;
	};
	
	module.exports = valueTypeManager;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/*
	    Create an ActorCollection based on a selection of DOM nodes
	
	    @param [string || NodeList || jQuery object]:
	        If string, treated as selector.
	        If not, treated as preexisting NodeList || jQuery object.
	*/
	'use strict';
	
	module.exports = function (selector) {
	    var nodes = typeof selector === 'string' ? document.querySelectorAll(selector) : selector,
	        elements = [];
	
	    // If jQuery selection, get array of Elements
	    if (nodes.get) {
	        elements = nodes.get();
	
	        // Or convert NodeList to array
	    } else if (nodes.length) {
	        elements = [].slice.call(nodes);
	
	        // Or if it's just an Element, put into array
	    } else {
	        elements.push(nodes);
	    }
	
	    return elements;
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var Process = __webpack_require__(24),
	    Queue = __webpack_require__(46),
	    utils = __webpack_require__(37),
	    update = __webpack_require__(47),
	    valueOps = __webpack_require__(48),
	    select = __webpack_require__(20),
	
	/*
	    Role imports
	*/
	defaultRole = __webpack_require__(49),
	    cssRole = __webpack_require__(16),
	    svgRole = __webpack_require__(17),
	    drawPathRole = __webpack_require__(18),
	    Action = __webpack_require__(27),
	    each = utils.each;
	
	var Actor = (function () {
	
	    /*
	        @param [object]
	    */
	
	    function Actor() {
	        var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	        _classCallCheck(this, Actor);
	
	        var props = utils.isString(opts) ? { element: opts } : opts;
	
	        this.values = {};
	        this.state = { values: {} };
	        this.queue = new Queue();
	        this.process = new Process(this, update);
	        this.activeActions = {};
	        this.numActive = 0;
	        this.actionCounter = 0;
	        this.activeValues = [];
	        this.activeParents = [];
	
	        // Get actual elements if this is a selector
	        if (utils.isString(props.element)) {
	            props.element = select(props.element)[0];
	        }
	
	        this.assignRoles(props.element, props.as, true);
	        this.set(props);
	        this.initRoles();
	    }
	
	    /*
	        Set Actor properties and values
	         @param [object]
	        @returns [Actor]
	    */
	
	    Actor.prototype.set = function set(opts) {
	        var _this = this;
	
	        each(opts, function (key, value) {
	            if (key !== 'values' && key !== 'action') {
	                _this[key] = value;
	            }
	        });
	
	        if (opts && opts.values) {
	            this.values = valueOps.process(this.values, opts.values, opts, 'current', this);
	        }
	
	        // Check all active actions for any that can be removed
	        each(this.activeActions, function (id, action) {
	            var actionIsActive = false;
	
	            each(_this.values, function (key, value) {
	                actionIsActive = value.action === action ? true : actionIsActive;
	            });
	
	            if (!actionIsActive) {
	                _this.unbindAction(id);
	            }
	        });
	
	        return this;
	    };
	
	    /*
	        Bind Action-specific controls to Actor
	         @returns [Controls]
	    */
	
	    Actor.prototype.controls = function controls(action) {
	        var Controls = action.getControls();
	        return new Controls(this, action.getPlayable());
	    };
	
	    /*
	        Start a new Action
	         @param [Action || number]
	        @param [Input || event] (optional)
	        @param [boolean] (optional): defined `true` if we surpress making new queue
	        @returns [Controls]
	    */
	
	    Actor.prototype.start = function start(toSet, input) {
	        var actionExists = utils.isNum(toSet),
	            action = actionExists ? this.getAction(toSet) : toSet.getPlayable(),
	            opts = action.getSet(),
	            surpressQueueClear = arguments[arguments.length - 1] === false;
	
	        opts.action = action;
	
	        this.set(opts);
	
	        if (input) {
	            action.bindInput(input);
	        }
	
	        if (!surpressQueueClear) {
	            this.queue.clear();
	        }
	
	        // Fire all Role onStarts if not already active
	        if (!this.isActive) {
	            var numRoles = this.roles.length;
	            for (var i = 0; i < numRoles; i++) {
	                var role = this.roles[i];
	                if (role.start) {
	                    role.start.call(this);
	                }
	            }
	        }
	
	        // Fire new action onStart
	        if (!action.isActive && action.onStart) {
	            action.onStart.call(this);
	        }
	
	        this.activate();
	
	        if (!actionExists) {
	            var Controls = action.getControls();
	            return new Controls(this, action, true);
	        }
	    };
	
	    /*
	        Pause all active Actions
	         @param [int] (optional)
	        @returns [Actor]
	    */
	
	    Actor.prototype.pause = function pause() {
	        this.isActive = false;
	        each(this.activeActions, function (id, action) {
	            return action.deactivate();
	        });
	        this.process.stop();
	        return this;
	    };
	
	    /*
	        Resume all active Actions
	         @param [int] (optional)
	        @returns [Actor];
	    */
	
	    Actor.prototype.resume = function resume() {
	        this.isActive = true;
	        each(this.activeActions, function (id, action) {
	            return action.activate();
	        });
	        this.process.start();
	        return this;
	    };
	
	    /*
	        Stop all active Actions
	         @param [int] (optional)
	        @returns [Actor]
	    */
	
	    Actor.prototype.stop = function stop() {
	        this.activeActions = {};
	        this.pause();
	        return this;
	    };
	
	    /*
	        Toggle all active Actions
	         @param [int] (optional)
	        @returns [Actor]
	    */
	
	    Actor.prototype.toggle = function toggle() {
	        return this.isActive ? this.pause() : this.resume();
	    };
	
	    /*
	        Syncs `element` with current properties
	         @returns [Actor]
	    */
	
	    Actor.prototype.sync = function sync() {
	        return this.start(new Action({ values: this.values }));
	    };
	
	    /*
	        Add a new Action to the queue
	    */
	
	    Actor.prototype.then = function then() {
	        this.queue.add.apply(this.queue, arguments);
	        return this;
	    };
	
	    /*
	        Execute next in queue
	    */
	
	    Actor.prototype.next = function next() {
	        var next = this.queue.next();
	
	        if (next) {
	            if (utils.isFunc(next[0])) {
	                next[0]();
	                this.next();
	                // Or this is an action
	            } else {
	                next.push(false);
	                this.start.apply(this, next);
	            }
	        } else {
	            this.stop();
	        }
	
	        return this;
	    };
	
	    /*
	        Assign Roles based on element and manually provided props
	         @param [object]: Element
	        @param [Role || array]
	        @param [boolean] (optional)
	    */
	
	    Actor.prototype.assignRoles = function assignRoles(element, manualRoles, surpressInit) {
	        // All Actors get a default Role that handles user callbacks
	        this.roles = [defaultRole];
	
	        // Auto-assign if no manually-set Roles
	        if (!manualRoles && element) {
	            this.autoAssignRoles(element);
	
	            // Or manually set if provided
	        } else if (manualRoles) {
	            if (utils.isArray(manualRoles)) {
	                this.roles.push.apply(this.roles, manualRoles);
	            } else {
	                this.roles.push(manualRoles);
	            }
	        }
	
	        if (!surpressInit) {
	            this.initRoles();
	        }
	    };
	
	    /*
	        Automatically assign Roles based on element, designed
	        to be extended
	         @param [object]: Element
	    */
	
	    Actor.prototype.autoAssignRoles = function autoAssignRoles(element) {
	        // Add CSS role if HTMLElement
	        if (element instanceof HTMLElement) {
	            this.roles.push(cssRole);
	
	            // Add SVG role if SVG element
	        } else if (element instanceof SVGElement) {
	            this.roles.push(svgRole);
	
	            // Add Draw Path role if path element
	            if (element.tagName === 'path') {
	                this.roles.push(drawPathRole);
	            }
	        }
	    };
	
	    /*
	        Fire init callbacks
	    */
	
	    Actor.prototype.initRoles = function initRoles() {
	        var _this2 = this;
	
	        // Fire init callback
	        this.roles.forEach(function (role) {
	            if (role.init) {
	                role.init.call(_this2);
	            }
	        });
	    };
	
	    Actor.prototype.activate = function activate() {
	        if (!this.isActive) {
	            this.isActive = true;
	            this.firstFrame = true;
	            this.process.start();
	        }
	    };
	
	    /*
	        Bind Action and return its table id
	         @param [Action]
	        @returns [int]
	    */
	
	    Actor.prototype.bindAction = function bindAction(action, id) {
	        if (id === undefined) {
	            id = this.actionCounter++;
	        }
	
	        if (!this.hasAction(id)) {
	            this.activeActions[id] = action;
	            this.numActive++;
	        }
	
	        return id;
	    };
	
	    Actor.prototype.unbindAction = function unbindAction(id) {
	        this.numActive--;
	        delete this.activeActions[id];
	
	        if (!this.numActive) {
	            this.stop();
	        }
	    };
	
	    Actor.prototype.getAction = function getAction(id) {
	        return this.activeActions[id];
	    };
	
	    Actor.prototype.hasAction = function hasAction(id) {
	        return this.getAction(id) !== undefined;
	    };
	
	    /*
	        Update processing order
	        
	        @param [string]
	        @param [boolean]
	        @param [boolean]
	    */
	
	    Actor.prototype.updateOrder = function updateOrder(key, moveToBack, hasChildren) {
	        var order = !hasChildren ? this.activeValues : this.activeParents,
	            position = order.indexOf(key);
	
	        // If key isn't list or moveToBack is set to true, add key
	        if (position === -1 || moveToBack) {
	            order.push(key);
	
	            // If key already exists, remove
	            if (position > -1) {
	                order.splice(position, 1);
	            }
	        }
	    };
	
	    _createClass(Actor, [{
	        key: 'isActive',
	
	        // [boolean]: Is this Actor active?
	        get: function get() {
	            return this._isActive;
	        },
	
	        // Set hasChanged to true is this is now active
	        set: function set(status) {
	            if (status === true) {
	                this.hasChanged = status;
	            }
	
	            this._isActive = status;
	        }
	    }]);
	
	    return Actor;
	})();
	
	module.exports = Actor;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/*
	    Input controller
	*/
	'use strict';
	
	var calc = __webpack_require__(31),
	    utils = __webpack_require__(37),
	    History = __webpack_require__(50),
	
	/*
	    Input constructor
	    
	        Syntax
	            newInput(name, value[, poll])
	                @param [string]: Name of to track
	                @param [number]: Initial value
	                @param [function] (optional): Function to poll Input data
	                
	            newInput(props[, poll])
	                @param [object]: Object of values
	                @param [function] (optional): Function to poll Input data
	     @return [Input]
	*/
	Input = function Input() {
	    var pollPos = arguments.length - 1;
	
	    this.current = {};
	    this.offset = {};
	    this.velocity = {};
	    this.history = new History();
	    this.update(arguments[0], arguments[1]);
	
	    if (utils.isFunc(arguments[pollPos])) {
	        this.poll = arguments[pollPos];
	    }
	};
	
	Input.prototype = {
	
	    // [number]: Number of frames of inactivity before velocity is turned to 0
	    maxInactiveFrames: 2,
	
	    // [number]: Number of frames input hasn't been updated
	    inactiveFrames: 0,
	
	    /*
	        Get latest input values
	        
	        @param [string] (optional): Name of specific property to return
	        @return [object || number]: Latest input values or, if specified, single value
	    */
	    get: function get(prop) {
	        var latest = this.history.get(),
	            val = prop !== undefined ? latest[prop] : latest;
	
	        return val;
	    },
	
	    /*
	        Update the input values
	        
	        Syntax
	            input.update(name, value)
	                @param [string]: Name of to track
	                @param [number]: Initial value
	                
	            input.update(props)
	                @param [object]: Object of values
	                
	        @return [Input]
	    */
	    update: function update(arg0, arg1) {
	        var values = {};
	
	        if (utils.isNum(arg1)) {
	            values[arg0] = arg1;
	        } else {
	            values = arg0;
	        }
	
	        this.history.add(utils.merge(this.current, values));
	
	        return this;
	    },
	
	    /*
	        Check for input movement and update pointer object's properties
	        
	        @param [number]: Timestamp of frame
	        @return [Input]
	    */
	    onFrame: function onFrame(timestamp) {
	        var latest, hasChanged;
	
	        // Check provided timestamp against lastFrame timestamp and return input has already been updated
	        if (timestamp === this.lastFrame) {
	            return;
	        }
	
	        latest = this.poll ? this.poll() : this.history.get();
	        hasChanged = utils.hasChanged(this.current, latest);
	
	        // If input has changed between frames 
	        if (hasChanged) {
	            this.velocity = calc.offset(this.current, latest);
	            this.current = latest;
	            this.inactiveFrames = 0;
	
	            // Or it hasn't moved and our frame limit has been reached
	        } else if (this.inactiveFrames >= this.maxInactiveFrames) {
	            this.velocity = calc.offset(this.current, this.current);
	
	            // Or input hasn't changed
	        } else {
	            this.inactiveFrames++;
	        }
	
	        this.lastFrame = timestamp;
	
	        return this;
	    }
	};
	
	module.exports = Input;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var Actor = __webpack_require__(21),
	    Tween = __webpack_require__(28),
	    utils = __webpack_require__(37);
	
	var DEFAULT_STAGGER_EASE = 'linear';
	
	function generateCallback(method) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	    }
	
	    return utils.isString(method) ? function (member) {
	        return member[method].apply(member, args);
	    } : method;
	}
	
	var Iterator = (function () {
	    function Iterator(members) {
	        _classCallCheck(this, Iterator);
	
	        this.clear();
	
	        if (members) {
	            this.add(members);
	        }
	
	        this._stagger = new Actor();
	    }
	
	    Iterator.prototype.add = function add(members) {
	        this.members = this.members.concat(members);
	        return this;
	    };
	
	    Iterator.prototype.clear = function clear() {
	        this.members = [];
	        return this;
	    };
	
	    Iterator.prototype.each = function each(method) {
	        for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	            args[_key2 - 1] = arguments[_key2];
	        }
	
	        var callback = generateCallback.apply(undefined, [method].concat(args));
	        this.members.forEach(callback);
	        return this;
	    };
	
	    Iterator.prototype.eachIntoNew = function eachIntoNew(method) {
	        for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	            args[_key3 - 1] = arguments[_key3];
	        }
	
	        var callback = generateCallback.apply(undefined, [method].concat(args)),
	            newIterator = new Iterator();
	
	        this.members.forEach(function (member) {
	            return newIterator.add(callback(member));
	        });
	
	        return newIterator;
	    };
	
	    Iterator.prototype.stagger = function stagger(method, props) {
	        var _this = this;
	
	        for (var _len4 = arguments.length, args = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
	            args[_key4 - 2] = arguments[_key4];
	        }
	
	        var numMembers = this.members.length,
	            propsIsInterval = utils.isNum(props),
	            interval = propsIsInterval ? props : props.interval,
	            staggerProps = {},
	            i = -1,
	            callback = generateCallback.apply(undefined, [method].concat(args));
	
	        staggerProps.values = {
	            i: {
	                current: 0,
	                duration: interval * numMembers,
	                ease: propsIsInterval ? DEFAULT_STAGGER_EASE : props.ease || DEFAULT_STAGGER_EASE,
	                round: true,
	                to: numMembers - 1
	            }
	        };
	
	        staggerProps.onUpdate = function (output) {
	            var newIndex = output.i,
	                gapIndex = i + 1;
	
	            // If our new index is only one more than the previous index, fire immedietly
	            if (newIndex === i + 1) {
	                callback(_this.members[gapIndex], gapIndex);
	
	                // Or loop through the distance to fire all indecies. Increase delay.
	            } else {
	                for (; gapIndex <= newIndex; gapIndex++) {
	                    callback(_this.members[gapIndex], gapIndex);
	                }
	            }
	
	            i = newIndex;
	        };
	
	        this._stagger.start(new Tween(staggerProps));
	
	        return this;
	    };
	
	    return Iterator;
	})();
	
	module.exports = Iterator;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var manager = __webpack_require__(56),
	
	/*
	    Process constructor
	    
	    Syntax
	        var process = new Process(scope, callback);
	        var process = new Process(callback);
	*/
	Process = function Process(scope, callback) {
	    var hasScope = callback !== undefined;
	
	    this.callback = hasScope ? callback : scope;
	    this.scope = hasScope ? scope : this;
	    this.id = manager.register();
	
	    // [boolean]: Is this process currently active?
	    this.isActive = false;
	};
	
	Process.prototype = {
	    /*
	        Fire callback
	        
	        @param [timestamp]: Timestamp of currently-executed frame
	        @param [number]: Time since last frame
	    */
	    fire: function fire(timestamp, elapsed) {
	        this.callback.call(this.scope, timestamp, elapsed);
	
	        // If we're running at an interval, deactivate again
	        if (this.isInterval) {
	            this.deactivate();
	        }
	
	        return this;
	    },
	
	    /*
	        Start process
	        
	        @param [int]: Duration of process in ms, 0 if indefinite
	        @return [this]
	    */
	    start: function start(duration) {
	        var self = this;
	
	        this.reset();
	        this.activate();
	
	        if (duration) {
	            this.stopTimer = setTimeout(function () {
	                self.stop();
	            }, duration);
	
	            this.isStopTimerActive = true;
	        }
	
	        return this;
	    },
	
	    /*
	        Stop process
	        
	        @return [this]
	    */
	    stop: function stop() {
	        this.reset();
	        this.deactivate();
	
	        return this;
	    },
	
	    /*
	        Activate process
	        
	        @return [this]
	    */
	    activate: function activate() {
	        this.isActive = true;
	        manager.activate(this, this.id);
	
	        return this;
	    },
	
	    /*
	        Deactivate process
	        
	        @return [this]
	    */
	    deactivate: function deactivate() {
	        this.isActive = false;
	        manager.deactivate(this.id);
	
	        return this;
	    },
	
	    /*
	        Fire process every x ms
	        
	        @param [int]: Number of ms to wait between refiring process.
	        @return [this]
	    */
	    every: function every(interval) {
	        var self = this;
	
	        this.reset();
	
	        this.isInterval = true;
	
	        this.intervalTimer = setInterval(function () {
	            self.activate();
	        }, interval);
	
	        this.isIntervalTimeActive = true;
	
	        return this;
	    },
	
	    /*
	        Clear all timers
	        
	        @param 
	    */
	    reset: function reset() {
	        this.isInterval = false;
	
	        if (this.isStopTimerActive) {
	            clearTimeout(this.stopTimer);
	        }
	
	        if (this.isIntervalTimeActive) {
	            clearInterval(this.intervalTimer);
	        }
	
	        return this;
	    }
	};
	
	module.exports = Process;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(37);
	var each = utils.each;
	
	/*
	    Role class constructor
	
	    @param [object]: Optional methods and props to add:
	        name [string]:      Name of generated getter/setter method on Actor
	        _map [object]:      Map Actor values to these values for this Role
	        _typeMap [object]:  Map values to value types
	        init [function]:    Callback to run when this Role is added to an Actor
	        start [function]:   Callback to run when host Actor starts an action
	        complete [function]: Callback to run when action completes
	        frame [function]:   Callback to fire once per frame
	        update [function]:  Callback to fire when values change
	        get [function]:     Read value from actual element
	        set [function]:     Set value on actual element
	*/
	var Role = function Role(methods) {
	    var role = this;
	
	    role._map = {};
	
	    each(methods, function (name, method) {
	        role[name] = !utils.isObj(method) ? method : utils.copy(method);
	    });
	};
	
	/*
	    Create a new role
	
	    @param [object]: Optional methods and props to add
	    @param [valuesToMap]: Override existing map with these values
	    @return [Role]: New Role
	*/
	var createRole = function createRole(methods, values) {
	    var newRole = new Role(methods);
	
	    each(values, function (key, value) {
	        newRole._map[key] = value;
	    });
	
	    return newRole;
	};
	
	Role.prototype = {
	
	    /*
	        Map value keys or generate new Role with updated map
	         Getter:
	            @param [string]: Key to map
	            @return [string]: Mapped key, or key if no mapped key found
	         Setter: 
	            @param [object]: Map of Actor keys -> Role keys
	            @return [Role]: New Role with unique map
	    */
	    map: function map(values) {
	        // If this is a string, get mapped value
	        // Otherwise this is a map, duplicated role with updated map
	        return utils.isString(values) ? this._map[values] || values : createRole(this, values);
	    }
	};
	
	module.exports = Role;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Bezier = __webpack_require__(57),
	
	/*
	    Mirror easing
	    
	    Mirrors the provided easing function, used here for mirroring an
	    easeIn into an easeInOut
	    
	    @param [number]: Progress, from 0 - 1, of current shift
	    @param [function]: The easing function to mirror
	    @returns [number]: The easing-adjusted delta
	*/
	mirrorEasing = function mirrorEasing(progress, method) {
	    return progress <= 0.5 ? method(2 * progress) / 2 : (2 - method(2 * (1 - progress))) / 2;
	},
	
	/*
	    Reverse easing
	    
	    Reverses the output of the provided easing function, used for flipping easeIn
	    curve to an easeOut.
	    
	    @param [number]: Progress, from 0 - 1, of current shift
	    @param [function]: The easing function to reverse
	    @returns [number]: The easing-adjusted delta
	*/
	reverseEasing = function reverseEasing(progress, method) {
	    return 1 - method(1 - progress);
	};
	
	/*
	    Easing class
	
	    If provided easing function, returns easing function with 
	    in/out/inOut variations
	
	    If provided four arguments, returns new Bezier class instead.
	*/
	var Easing = function Easing(x1, y1, x2, y2) {
	    var method = x1,
	        easingFunction;
	
	    // If this is a bezier curve, return a bezier function
	    if (arguments.length > 1) {
	        easingFunction = new Bezier(x1, y1, x2, y2);
	    } else {
	        easingFunction = function (progress) {
	            return method(progress);
	        };
	
	        easingFunction['in'] = function (progress) {
	            return method(progress);
	        };
	
	        easingFunction.out = function (progress) {
	            return reverseEasing(progress, method);
	        };
	
	        easingFunction.inOut = function (progress) {
	            return mirrorEasing(progress, method);
	        };
	    }
	
	    return easingFunction;
	};
	
	module.exports = Easing;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var calc = __webpack_require__(31),
	    utils = __webpack_require__(37),
	    each = utils.each,
	    Controls = __webpack_require__(51);
	
	var DEFAULT_PROP = 'current';
	var PRIVATE = ['onStart', 'onFrame', 'onUpdate', 'onComplete'];
	
	var Action = (function () {
	    function Action(props) {
	        _classCallCheck(this, Action);
	
	        var action = this;
	
	        utils.each(this.getDefaultProps(), function (key, value) {
	            action[key] = value;
	        });
	
	        this.values = {};
	        this.set(props, this.getDefaultValueProp());
	    }
	
	    Action.prototype.set = function set() {
	        var _this = this;
	
	        var props = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	        var defaultProp = arguments.length <= 1 || arguments[1] === undefined ? DEFAULT_PROP : arguments[1];
	
	        each(props, function (key, prop) {
	            if (key !== 'values') {
	                _this[key] = prop;
	            }
	        });
	
	        // Merge values
	        if (props.values) {
	            (function () {
	                var currentValues = _this.values,
	                    values = props.values;
	
	                each(values, function (key, value) {
	                    var existingValue = currentValues[key],
	                        newValue = {};
	
	                    if (utils.isObj(value)) {
	                        newValue = value;
	                    } else {
	                        newValue[defaultProp] = value;
	                    }
	
	                    currentValues[key] = existingValue ? utils.merge(existingValue, newValue) : newValue;
	                });
	            })();
	        }
	
	        return this;
	    };
	
	    Action.prototype.process = function process(actor, value) {
	        return value.current;
	    };
	
	    /*
	         Has Action ended?
	         
	         Returns true to end immedietly
	         
	         @return [boolean]: true
	     */
	
	    Action.prototype.hasEnded = function hasEnded() {
	        return true;
	    };
	
	    Action.prototype.limit = function limit(output, value) {
	        var restricted = calc.restricted(output, value.min, value.max),
	            escapeAmp = value.escapeAmp !== undefined ? value.escapeAmp : 0;
	        return restricted + (output - restricted) * escapeAmp;
	    };
	
	    Action.prototype.getControls = function getControls() {
	        return Controls;
	    };
	
	    Action.prototype.getDefaultProps = function getDefaultProps() {
	        return {};
	    };
	
	    Action.prototype.getDefaultValue = function getDefaultValue() {
	        return {};
	    };
	
	    Action.prototype.getDefaultValueProp = function getDefaultValueProp() {
	        return DEFAULT_PROP;
	    };
	
	    Action.prototype.getSet = function getSet() {
	        var _this2 = this;
	
	        var set = { values: this.values };
	
	        each(this, function (key, prop) {
	            if (_this2.hasOwnProperty(key) && PRIVATE.indexOf(key) === -1) {
	                set[key] = prop;
	            }
	        });
	
	        return set;
	    };
	
	    Action.prototype.extend = function extend(props) {
	        return new this.constructor(utils.merge(this, props), this.getDefaultValueProp());
	    };
	
	    Action.prototype.getPlayable = function getPlayable() {
	        return this.extend();
	    };
	
	    Action.prototype.activate = function activate() {
	        this.isActive = true;
	        return this;
	    };
	
	    Action.prototype.deactivate = function deactivate() {
	        this.isActive = false;
	        return this;
	    };
	
	    return Action;
	})();
	
	module.exports = Action;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }
	
	var Action = __webpack_require__(27),
	    calc = __webpack_require__(31),
	    utils = __webpack_require__(37),
	    each = utils.each,
	    presetEasing = __webpack_require__(52),
	    valueOps = __webpack_require__(48),
	    TweenControls = __webpack_require__(53),
	    nextSteps = {
	    loop: 'restart',
	    yoyo: 'reverse',
	    flip: 'flipValues'
	},
	
	/*
	    Ease value within ranged parameters
	    
	    @param [number]: Progress between 0 and 1
	    @param [number]: Value of 0 progress
	    @param [number]: Value of 1 progress
	    @param [string || function]: Name of preset easing
	        to use or generated easing function
	    @return [number]: Value of eased progress in range
	*/
	ease = function ease(progress, from, to, _ease) {
	    var progressLimited = calc.restricted(progress, 0, 1),
	        easingFunction = utils.isString(_ease) ? presetEasing[_ease] : _ease;
	
	    return calc.valueEased(progressLimited, from, to, easingFunction);
	};
	
	var COUNT = 'count';
	
	var Tween = (function (_Action) {
	    _inherits(Tween, _Action);
	
	    function Tween() {
	        _classCallCheck(this, Tween);
	
	        _Action.apply(this, arguments);
	    }
	
	    Tween.prototype.getControls = function getControls() {
	        return TweenControls;
	    };
	
	    Tween.prototype.getDefaultProps = function getDefaultProps() {
	        return {
	            delay: 0,
	            dilate: 1,
	            duration: 300,
	            loop: false,
	            yoyo: false,
	            flip: false,
	            playDirection: 1,
	            ended: true,
	            elapsed: 0
	        };
	    };
	
	    Tween.prototype.getDefaultValue = function getDefaultValue() {
	        return {
	            delay: 0,
	            duration: 300,
	            ease: 'easeOut',
	            stagger: 0,
	            steps: 0,
	            to: 0,
	            round: false
	        };
	    };
	
	    Tween.prototype.getDefaultValueProp = function getDefaultValueProp() {
	        return 'to';
	    };
	
	    /*
	        Update Action elapsed time
	        
	        @param [object]: Action properties
	        @param [number]: Timestamp of current frame
	    */
	
	    Tween.prototype.onFrameStart = function onFrameStart(actor, frameDuration) {
	        this.elapsed = this.elapsed || 0;
	
	        if (frameDuration) {
	            this.elapsed += frameDuration * actor.dilate * this.playDirection;
	            this.ended = true;
	        }
	    };
	
	    /*
	        Calculate progress of value based on time elapsed,
	        value delay/duration/stagger properties
	         @param [Actor]
	        @param [object]: Value state and properties
	        @return [number]: Calculated value
	    */
	
	    Tween.prototype.process = function process(actor, value) {
	        var target = value.to,
	            progressTarget = this.playDirection === 1 ? 1 : 0,
	            newValue = value.current,
	            progress;
	
	        // If this value has a to property, otherwise we just return current value
	        if (target !== undefined) {
	            progress = calc.restricted(calc.progress(this.elapsed - value.delay, value.duration) - value.stagger, 0, 1);
	
	            // Mark Action as NOT ended if still in progress
	            if (progress !== progressTarget) {
	                this.ended = false;
	            }
	
	            // Step progress if we're stepping
	            if (value.steps) {
	                progress = utils.stepProgress(progress, value.steps);
	            }
	
	            // Ease value
	            newValue = ease(progress, value.origin, target, value.ease);
	        }
	
	        return newValue;
	    };
	
	    /*
	        If this tween has ended, check if we loop/yoyo/flip
	        
	        @return [boolean]: Has this tween really really ended?
	    */
	
	    Tween.prototype.hasEnded = function hasEnded(actor) {
	        var _this = this;
	
	        if (this.ended) {
	            each(nextSteps, function (name, methodName) {
	                if (_this.checkNextStep(actor, name, _this[methodName])) {
	                    _this.ended = false;
	                    actor.hasChanged = true;
	                    return false;
	                }
	            });
	        }
	
	        return this.ended;
	    };
	
	    Tween.prototype.checkNextStep = function checkNextStep(actor, name, method) {
	        var stepTaken = false,
	            step = this[name],
	            count = this[name + COUNT] || 0,
	            forever = step === true;
	
	        if (forever || utils.isNum(step)) {
	            ++count;
	            this[name + COUNT] = count;
	
	            if (forever || count <= step) {
	                method.call(this, actor);
	                stepTaken = true;
	            }
	        }
	
	        return stepTaken;
	    };
	
	    Tween.prototype.flipValues = function flipValues(actor) {
	        var actorValues = actor.values;
	        this.elapsed = this.duration - this.elapsed;
	
	        each(this.values, function (key) {
	            var value = actorValues[key];
	
	            if (value.children) {
	                each(value.children, function (childKey) {
	                    valueOps.flip(actorValues[key + childKey]);
	                });
	            }
	
	            valueOps.flip(value);
	        });
	    };
	
	    Tween.prototype.reverse = function reverse() {
	        this.playDirection *= -1;
	    };
	
	    Tween.prototype.restart = function restart() {
	        this.elapsed = this.playDirection === 1 ? 0 : this.duration;
	        this.started = utils.currentTime();
	    };
	
	    return Tween;
	})(Action);
	
	module.exports = Tween;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }
	
	var Action = __webpack_require__(27),
	    calc = __webpack_require__(31),
	    utils = __webpack_require__(37),
	    simulations = __webpack_require__(54);
	
	var DEFAULT_PROP = 'velocity';
	
	var Simulate = (function (_Action) {
	    _inherits(Simulate, _Action);
	
	    function Simulate() {
	        _classCallCheck(this, Simulate);
	
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }
	
	        _Action.call.apply(_Action, [this].concat(args));
	        this.calculatesVelocity = true;
	        this.inactiveFrames = 0;
	    }
	
	    Simulate.prototype.getDefaultProps = function getDefaultProps() {
	        return {
	            maxInactiveFrames: 3
	        };
	    };
	
	    Simulate.prototype.getDefaultValue = function getDefaultValue() {
	        return {
	            // [string]: Simulation to .run
	            simulate: DEFAULT_PROP,
	
	            // [number]: Deceleration to apply to value, in units per second
	            deceleration: 0,
	
	            // [number]: Acceleration to apply to value, in units per second
	            acceleration: 0,
	
	            // [number]: Factor to multiply velocity by on bounce
	            bounce: 0,
	
	            // [number]: Spring strength during 'string'
	            spring: 80,
	
	            // [number]: Timeconstant of glide
	            timeConstant: 395,
	
	            // [number]: Stop simulation under this speed
	            stopSpeed: 5,
	
	            // [boolean]: Capture with spring physics on limit breach
	            capture: false,
	
	            // [number]: Friction to apply per frame
	            friction: 0,
	
	            to: 0,
	            round: false
	        };
	    };
	
	    Simulate.prototype.getDefaultValueProp = function getDefaultValueProp() {
	        return DEFAULT_PROP;
	    };
	
	    /*
	        Simulate the Value's per-frame movement
	        
	        @param [Actor]
	        @param [Value]: Current value
	        @param [string]: Key of current value
	        @param [number]: Duration of frame in ms
	        @return [number]: Calculated value
	    */
	
	    Simulate.prototype.process = function process(actor, value, key, timeSinceLastFrame) {
	        var simulate = value.simulate,
	            simulation = utils.isString(simulate) ? simulations[simulate] : simulate,
	            newVelocity = simulation ? simulation(value, timeSinceLastFrame, actor.started) : 0;
	
	        value.velocity = Math.abs(newVelocity) >= value.stopSpeed ? newVelocity : 0;
	        return value.current + calc.speedPerFrame(value.velocity, timeSinceLastFrame);
	    };
	
	    /*
	        Has this action ended?
	        
	        Use a framecounter to see if Action has changed in the last x frames
	        and declare ended if not
	        
	        @param [Actor]
	        @param [boolean]: Has Action changed?
	        @return [boolean]: Has Action ended?
	    */
	
	    Simulate.prototype.hasEnded = function hasEnded(actor, hasChanged) {
	        this.inactiveFrames = hasChanged ? 0 : this.inactiveFrames + 1;
	        return this.inactiveFrames > actor.maxInactiveFrames;
	    };
	
	    /*
	        Limit output to value range, if any
	        
	        If velocity is at or more than range, and value has a bounce property,
	        run the bounce simulation
	        
	        @param [number]: Calculated output
	        @param [Value]: Current Value
	        @return [number]: Limit-adjusted output
	    */
	
	    Simulate.prototype.limit = function limit(output, value) {
	        var isOutsideMax = output >= value.max,
	            isOutsideMin = output <= value.min,
	            isOutsideRange = isOutsideMax || isOutsideMin;
	
	        if (isOutsideRange) {
	            output = calc.restricted(output, value.min, value.max);
	
	            if (value.bounce) {
	                value.velocity = simulations.bounce(value);
	            } else if (value.capture) {
	                simulations.capture(value, isOutsideMax ? value.max : value.min);
	            }
	        }
	
	        return output;
	    };
	
	    return Simulate;
	})(Action);
	
	module.exports = Simulate;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }
	
	var Action = __webpack_require__(27),
	    Pointer = __webpack_require__(55),
	    calc = __webpack_require__(31);
	
	var Track = (function (_Action) {
	    _inherits(Track, _Action);
	
	    function Track() {
	        _classCallCheck(this, Track);
	
	        _Action.apply(this, arguments);
	    }
	
	    /*
	        Update input offset
	    */
	
	    Track.prototype.onFrameStart = function onFrameStart(actor, frameDuration, framestamp) {
	        actor.state.input = this.input.onFrame(framestamp);
	        this.inputOffset = calc.offset(this.inputOrigin, this.input.current);
	    };
	
	    /*
	        Move Value relative to Input movement
	        
	        @param [Value]: Current value
	        @param [string]: Key of current value
	        @return [number]: Calculated value
	    */
	
	    Track.prototype.process = function process(actor, value, key) {
	        return this.inputOffset.hasOwnProperty(key) ? value.origin + this.inputOffset[key] : value.current;
	    };
	
	    /*
	        Has this Action ended? 
	        
	        @return [boolean]: False to make user manually finish .track()
	    */
	
	    Track.prototype.hasEnded = function hasEnded() {
	        return false;
	    };
	
	    Track.prototype.bindInput = function bindInput(input) {
	        this.input = !input.current ? new Pointer(input) : input;
	        this.inputOrigin = this.input.get();
	    };
	
	    Track.prototype.getDefaultValue = function getDefaultValue() {
	        return {
	            amp: 1
	        };
	    };
	
	    return Track;
	})(Action);
	
	module.exports = Track;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/*
	    Calculators
	    ----------------------------------------
	    
	    Simple I/O snippets
	*/
	"use strict";
	
	var utils = __webpack_require__(37),
	    calc = {
	
	    /*
	        Angle between points
	        
	        Translates the hypothetical line so that the 'from' coordinates
	        are at 0,0, then return the angle using .angleFromCenter()
	        
	        @param [object]: X and Y coordinates of from point
	        @param [object]: X and Y cordinates of to point
	        @return [radian]: Angle between the two points in radians
	    */
	    angle: function angle(pointA, pointB) {
	        var from = pointB ? pointA : { x: 0, y: 0 },
	            to = pointB || pointA,
	            point = {
	            x: to.x - from.x,
	            y: to.y - from.y
	        };
	
	        return this.angleFromCenter(point.x, point.y);
	    },
	
	    /*
	        Angle from center
	        
	        Returns the current angle, in radians, of a defined point
	        from a center (assumed 0,0)
	        
	        @param [number]: X coordinate of second point
	        @param [number]: Y coordinate of second point
	        @return [radian]: Angle between 0, 0 and point in radians
	    */
	    angleFromCenter: function angleFromCenter(x, y) {
	        return this.radiansToDegrees(Math.atan2(y, x));
	    },
	
	    /*
	        Convert degrees to radians
	        
	        @param [number]: Value in degrees
	        @return [number]: Value in radians
	    */
	    degreesToRadians: function degreesToRadians(degrees) {
	        return degrees * Math.PI / 180;
	    },
	
	    /*
	        Dilate
	        
	        Change the progression between a and b according to dilation.
	        
	        So dilation = 0.5 would change
	        
	        a --------- b
	        
	        to
	        
	        a ---- b
	        
	        @param [number]: Previous value
	        @param [number]: Current value
	        @param [number]: Dilate progress by x
	        @return [number]: Previous value plus the dilated difference
	    */
	    dilate: function dilate(a, b, dilation) {
	        return a + (b - a) * dilation;
	    },
	
	    /*
	        Distance
	        
	        Returns the distance between (0,0) and pointA, unless pointB
	        is provided, then we return the difference between the two.
	        
	        @param [object/number]: x and y or just x of point A
	        @param [object/number]: (optional): x and y or just x of point B
	        @return [number]: The distance between the two points
	    */
	    distance: function distance(pointA, pointB) {
	        return typeof pointA === "number" ? this.distance1D(pointA, pointB) : this.distance2D(pointA, pointB);
	    },
	
	    /*
	        Distance 1D
	        
	        Returns the distance between point A and point B
	        
	        @param [number]: Point A
	        @param [number]: (optional): Point B
	        @return [number]: The distance between the two points
	    */
	    distance1D: function distance1D(pointA, pointB) {
	        var bIsNum = typeof pointB === "number",
	            from = bIsNum ? pointA : 0,
	            to = bIsNum ? pointB : pointA;
	
	        return absolute(to - from);
	    },
	
	    /*
	        Distance 2D
	        
	        Returns the distance between (0,0) and point A, unless point B
	        is provided, then we return the difference between the two.
	        
	        @param [object]: x and y of point A
	        @param [object]: (optional): x and y of point B
	        @return [number]: The distance between the two points
	    */
	    distance2D: function distance2D(pointA, pointB) {
	        var bIsObj = typeof pointB === "object",
	            from = bIsObj ? pointA : { x: 0, y: 0 },
	            to = bIsObj ? pointB : pointA,
	            point = {
	            x: absolute(to.x - from.x),
	            y: absolute(to.y - from.y)
	        };
	
	        return this.hypotenuse(point.x, point.y);
	    },
	
	    /*
	        Hypotenuse
	        
	        Returns the hypotenuse, side C, given the lengths of sides A and B.
	        
	        @param [number]: Length of A
	        @param [number]: Length of B
	        @return [number]: Length of C
	    */
	    hypotenuse: function hypotenuse(a, b) {
	        var a2 = a * a,
	            b2 = b * b,
	            c2 = a2 + b2;
	
	        return Math.sqrt(c2);
	    },
	
	    /*
	        Offset between two inputs
	        
	        Calculate the difference between two different inputs
	        
	        @param [Point]: First input
	        @param [Point]: Second input
	        @return [Offset]: Distance metrics between two points
	    */
	    offset: function offset(a, b) {
	        var offset = {};
	
	        for (var key in b) {
	            if (b.hasOwnProperty(key)) {
	                if (a.hasOwnProperty(key)) {
	                    offset[key] = b[key] - a[key];
	                } else {
	                    offset[key] = 0;
	                }
	            }
	        }
	
	        if (isNum(offset.x) && isNum(offset.y)) {
	            offset.angle = this.angle(a, b);
	            offset.distance = this.distance2D(a, b);
	        }
	
	        return offset;
	    },
	
	    /*
	        Point from angle and distance
	        
	        @param [object]: 2D point of origin
	        @param [number]: Angle from origin
	        @param [number]: Distance from origin
	        @return [object]: Calculated 2D point
	    */
	    pointFromAngleAndDistance: function pointFromAngleAndDistance(origin, angle, distance) {
	        var point = {};
	
	        point.x = distance * Math.cos(angle) + origin.x;
	        point.y = distance * Math.sin(angle) + origin.y;
	
	        return point;
	    },
	
	    /*
	        Progress within given range
	        
	        Given a lower limit and an upper limit, we return the progress
	        (expressed as a number 0-1) represented by the given value, and
	        limit that progress to within 0-1.
	        
	        @param [number]: Value to find progress within given range
	        @param [number]: Lower limit if full range given, upper if not
	        @param [number] (optional): Upper limit of range
	        @return [number]: Progress of value within range as expressed 0-1
	    */
	    progress: function progress(value, limitA, limitB) {
	        var bIsNum = typeof limitB === "number",
	            from = bIsNum ? limitA : 0,
	            to = bIsNum ? limitB : limitA,
	            range = to - from,
	            progress = (value - from) / range;
	
	        return progress;
	    },
	
	    /*
	        Convert radians to degrees
	        
	        @param [number]: Value in radians
	        @return [number]: Value in degrees
	    */
	    radiansToDegrees: function radiansToDegrees(radians) {
	        return radians * 180 / Math.PI;
	    },
	
	    /*
	        Return random number between range
	        
	        @param [number] (optional): Output minimum
	        @param [number] (optional): Output maximum
	        @return [number]: Random number within range, or 0 and 1 if none provided
	    */
	    random: function random(min, max) {
	        min = isNum(min) ? min : 0;
	        max = isNum(max) ? max : 1;
	        return Math.random() * (max - min) + min;
	    },
	
	    /*
	        Calculate relative value
	        
	        Takes the operator and value from a string, ie "+=5", and applies
	        to the current value to resolve a new target.
	        
	        @param [number]: Current value
	        @param [string]: Relative value
	        @return [number]: New value
	    */
	    relativeValue: function relativeValue(current, rel) {
	        var newValue = current,
	            equation = rel.split("="),
	            operator = equation[0],
	            splitVal = utils.splitValUnit(equation[1]);
	
	        switch (operator) {
	            case "+":
	                newValue += splitVal.value;
	                break;
	            case "-":
	                newValue -= splitVal.value;
	                break;
	            case "*":
	                newValue *= splitVal.value;
	                break;
	            case "/":
	                newValue /= splitVal.value;
	                break;
	        }
	
	        if (splitVal.unit) {
	            newValue += splitVal.unit;
	        }
	
	        return newValue;
	    },
	
	    /*
	        Restrict value to range
	        
	        Return value within the range of lowerLimit and upperLimit
	        
	        @param [number]: Value to keep within range
	        @param [number]: Lower limit of range
	        @param [number]: Upper limit of range
	        @return [number]: Value as limited within given range
	    */
	    restricted: function restricted(value, min, max) {
	        var restricted = min !== undefined ? Math.max(value, min) : value;
	        restricted = max !== undefined ? Math.min(restricted, max) : restricted;
	
	        return restricted;
	    },
	
	    /*
	        Convert x per second to per frame velocity based on fps
	        
	        @param [number]: Unit per second
	        @param [number]: Frame duration in ms
	    */
	    speedPerFrame: function speedPerFrame(xps, frameDuration) {
	        return isNum(xps) ? xps / (1000 / frameDuration) : 0;
	    },
	
	    /*
	        Convert velocity into velicity per second
	        
	        @param [number]: Unit per frame
	        @param [number]: Frame duration in ms
	    */
	    speedPerSecond: function speedPerSecond(velocity, frameDuration) {
	        return velocity * (1000 / frameDuration);
	    },
	
	    /*
	        Value in range from progress
	        
	        Given a lower limit and an upper limit, we return the value within
	        that range as expressed by progress (a number from 0-1)
	        
	        @param [number]: The progress between lower and upper limits expressed 0-1
	        @param [number]: Lower limit of range, or upper if limit2 not provided
	        @param [number] (optional): Upper limit of range
	        @return [number]: Value as calculated from progress within range (not limited within range)
	    */
	    value: function value(progress, limitA, limitB) {
	        var bIsNum = typeof limitB === "number",
	            from = bIsNum ? limitA : 0,
	            to = bIsNum ? limitB : limitA;
	
	        return -progress * from + progress * to + from;
	    },
	
	    /*
	        Eased value in range from progress
	        
	        Given a lower limit and an upper limit, we return the value within
	        that range as expressed by progress (a number from 0-1)
	        
	        @param [number]: The progress between lower and upper limits expressed 0-1
	        @param [number]: Lower limit of range, or upper if limit2 not provided
	        @param [number]: Upper limit of range
	        @param [function]: Easing to apply to value
	        @return [number]: Value as calculated from progress within range (not limited within range)
	    */
	    valueEased: function valueEased(progress, from, to, easing) {
	        var easedProgress = easing(progress);
	
	        return this.value(easedProgress, from, to);
	    }
	},
	
	/*
	    Caching functions used multiple times to reduce filesize and increase performance
	*/
	isNum = utils.isNum,
	    absolute = Math.abs;
	
	module.exports = calc;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = function (values, terms, delimiter, chop) {
	    var combined = '',
	        key = '',
	        i = 0,
	        numTerms = terms.length;
	
	    for (; i < numTerms; i++) {
	        key = terms[i];
	
	        if (values.hasOwnProperty(key)) {
	            combined += values[key] + delimiter;
	        }
	    }
	
	    if (chop) {
	        combined = combined.slice(0, -chop);
	    }
	
	    return combined;
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var splitCommaDelimited = __webpack_require__(58),
	    functionBreak = __webpack_require__(59);
	
	module.exports = function (value, terms) {
	    var splitValue = {},
	        numTerms = terms.length,
	        colors = splitCommaDelimited(functionBreak(value)),
	        i = 0;
	
	    for (; i < numTerms; i++) {
	        splitValue[terms[i]] = colors[i] !== undefined ? colors[i] : 1;
	    }
	
	    return splitValue;
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = function (value, prefix) {
	    return prefix + '(' + value + ')';
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = {
	    color: {
	        min: 0,
	        max: 255,
	        round: true
	    },
	    opacity: {
	        min: 0,
	        max: 1
	    },
	    percent: {
	        min: 0,
	        max: 100,
	        unit: "%"
	    }
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var X = 'X',
	    Y = 'Y',
	    ALPHA = 'Alpha',
	    terms = {
	    colors: ['Red', 'Green', 'Blue', ALPHA],
	    positions: [X, Y, 'Z'],
	    dimensions: ['Top', 'Right', 'Bottom', 'Left'],
	    shadow: [X, Y, 'Radius', 'Spread', 'Color'],
	    hsl: ['Hue', 'Saturation', 'Lightness', ALPHA]
	};
	
	module.exports = terms;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/*
	    Utility functions
	*/
	'use strict';
	
	var protectedProperties = ['scope', 'dom'],
	    isProtected = function isProtected(key) {
	    return protectedProperties.indexOf(key) !== -1;
	},
	
	/*
	    Get var type as string
	    
	    @param: Variable to test
	    @return [string]: Returns, for instance 'Object' if [object Object]
	*/
	varType = function varType(variable) {
	    return Object.prototype.toString.call(variable).slice(8, -1);
	};
	
	module.exports = {
	
	    /*
	        Iterate over an object and fire a callback for every item in it
	         @param [object]: Properties
	        @param [function]: Callback to fire
	    */
	    each: function each(props, callback) {
	        var keys = Object.keys(props),
	            numKeys = keys.length;
	
	        for (var i = 0; i < numKeys; i++) {
	            var key = keys[i],
	                prop = props[key];
	
	            if (callback(key, prop) === false) {
	                break;
	            }
	        }
	    },
	
	    /*
	        Has one object changed from the other
	        
	        Compares the two provided inputs and returns true if they are different
	        
	        @param [object]: Input A
	        @param [object]: Input B
	        @return [boolean]: True if different
	    */
	    hasChanged: function hasChanged(a, b) {
	        var hasChanged = false,
	            key = '';
	
	        for (key in b) {
	            if (a.hasOwnProperty(key) && b.hasOwnProperty(key)) {
	                if (a[key] !== b[key]) {
	                    hasChanged = true;
	                }
	            } else {
	                hasChanged = true;
	            }
	        }
	
	        return hasChanged;
	    },
	
	    /*
	        Is this var a number?
	        
	        @param: Variable to test
	        @return [boolean]: Returns true if typeof === 'number'
	    */
	    isNum: function isNum(num) {
	        return typeof num === 'number';
	    },
	
	    /*
	        Is this var an object?
	        
	        @param: Variable to test
	        @return [boolean]: Returns true if typeof === 'object'
	    */
	    isObj: function isObj(obj) {
	        return typeof obj === 'object';
	    },
	
	    /*
	        Is this var a function ? 
	        
	        @param: Variable to test
	        @return [boolean]: Returns true if this.varType === 'Function'
	    */
	    isFunc: function isFunc(obj) {
	        return varType(obj) === 'Function';
	    },
	
	    /*
	        Is this var a string ? 
	        
	        @param: Variable to test
	        @return [boolean]: Returns true if typeof str === 'string'
	    */
	    isString: function isString(str) {
	        return typeof str === 'string';
	    },
	
	    /*
	        Is this a relative value assignment?
	        
	        @param [string]: Variable to test
	        @return [boolean]: If this looks like a relative value assignment
	    */
	    isRelativeValue: function isRelativeValue(value) {
	        return value && value.indexOf && value.indexOf('=') > 0;
	    },
	
	    /*
	        Is this var an array ? 
	        
	        @param: Variable to test
	        @return [boolean]: Returns true if this.varType === 'Array'
	    */
	    isArray: function isArray(arr) {
	        return varType(arr) === 'Array';
	    },
	
	    /*
	        Copy object or array
	        
	        Checks whether base is an array or object and makes
	        appropriate copy
	        
	        @param [array || object]: Array or object to copy
	        @param [array || object]: New copy of array or object
	    */
	    copy: function copy(base) {
	        return this.isArray(base) ? this.copyArray(base) : this.copyObject(base);
	    },
	
	    /*
	        Deep copy an object
	        
	        Iterates over an object and creates a new copy of every item,
	        deep copying if it finds any objects/arrays
	        
	        @param [object]: Object to copy
	        @param [object]: New copy of object
	    */
	    copyObject: function copyObject(base) {
	        var newObject = {};
	
	        for (var key in base) {
	            if (base.hasOwnProperty(key)) {
	                newObject[key] = this.isObj(base[key]) && !isProtected(key) ? this.copy(base[key]) : base[key];
	            }
	        }
	
	        return newObject;
	    },
	
	    /*
	        Deep copy an array
	        
	        Loops through an array and creates a new copy of every item,
	        deep copying if it finds any objects/arrays
	        
	        @param [array]: Array to copy
	        @return [array]: New copy of array
	    */
	    copyArray: function copyArray(base) {
	        var newArray = [],
	            length = base.length,
	            i = 0;
	
	        for (; i < length; i++) {
	            newArray[i] = this.isObj(base[i]) ? this.copy(base[i]) : base[i];
	        }
	
	        return newArray;
	    },
	
	    /*
	        Non-destructive merge of object or array
	        
	        @param [array || object]: Array or object to use as base
	        @param [array || object]: Array or object to overwrite base with
	        @return [array || object]: New array or object
	    */
	    merge: function merge(base, overwrite) {
	        return this.isArray(base) ? this.copyArray(overwrite) : this.mergeObject(base, overwrite);
	    },
	
	    /*
	        Non-destructive merge of object
	        
	        @param [object]: Object to use as base
	        @param [object]: Object to overwrite base with
	        @return [object]: New object
	    */
	    mergeObject: function mergeObject(base, overwrite) {
	        var hasBase = this.isObj(base),
	            newObject = hasBase ? this.copy(base) : this.copy(overwrite),
	            key = '';
	
	        if (hasBase) {
	            for (key in overwrite) {
	                if (overwrite.hasOwnProperty(key)) {
	                    newObject[key] = this.isObj(overwrite[key]) && !isProtected(key) ? this.merge(base[key], overwrite[key]) : overwrite[key];
	                }
	            }
	        }
	        return newObject;
	    },
	
	    /*
	        Split a value into a value/unit object
	        
	            "200px" -> { value: 200, unit: "px" }
	            
	        @param [string]: Value to split
	        @return [object]: Object with value and unit props
	    */
	    splitValUnit: function splitValUnit(value) {
	        var splitVal = value.match(/(-?\d*\.?\d*)(.*)/);
	
	        return {
	            value: splitVal[1],
	            unit: splitVal[2]
	        };
	    },
	
	    /*
	        Create stepped version of 0-1 progress
	        
	        @param [number]: Current value
	        @param [int]: Number of steps
	        @return [number]: Stepped value
	    */
	    stepProgress: function stepProgress(progress, steps) {
	        var segment = 1 / (steps - 1),
	            target = 1 - 1 / steps,
	            progressOfTarget = Math.min(progress / target, 1);
	
	        return Math.floor(progressOfTarget / segment) * segment;
	    },
	
	    /*
	        Generate current timestamp
	        
	        @return [timestamp]: Current UNIX timestamp
	    */
	    currentTime: function currentTime() {
	        return typeof performance !== 'undefined' ? performance.now() : new Date().getTime();
	    }
	
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = function (value) {
	    return typeof value === 'string' ? value.split(' ') : [value];
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var each = __webpack_require__(37).each,
	    transformDictionary = __webpack_require__(60),
	    transformProps = transformDictionary.props,
	    TRANSLATE_Z = 'translateZ';
	
	module.exports = function (output, cache) {
	    var css = {},
	        transform = '',
	        transformHasZ = false;
	
	    // Loop through output, check for transform properties
	    each(output, function (key, rule) {
	        // If this is a transform property, add to transform string
	        if (transformProps[key]) {
	            transform += key + '(' + rule + ')';
	            transformHasZ = key === TRANSLATE_Z ? true : transformHasZ;
	
	            // Or just assign directly
	        } else {
	            if (rule !== cache[key]) {
	                cache[key] = css[key] = rule;
	            }
	        }
	    });
	
	    // If we have transform properties, add translateZ
	    if (transform !== '') {
	        if (!transformHasZ) {
	            transform += ' ' + TRANSLATE_Z + '(0px)';
	        }
	
	        if (transform !== cache.transform) {
	            css.transform = transform;
	        }
	
	        cache.transform = transform;
	    }
	
	    return css;
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var TRANSLATE = 'translate';
	
	module.exports = {
	    x: TRANSLATE + 'X',
	    y: TRANSLATE + 'Y',
	    z: TRANSLATE + 'Z'
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var COLOR = 'color',
	    POSITIONS = 'positions',
	    DIMENSIONS = 'dimensions',
	    SHADOW = 'shadow',
	    ANGLE = 'angle',
	    ALPHA = 'alpha',
	    PX = 'px';
	
	module.exports = {
	    // Color properties
	    color: COLOR,
	    backgroundColor: COLOR,
	    outlineColor: COLOR,
	    fill: COLOR,
	    stroke: COLOR,
	    // Border
	    borderColor: COLOR,
	    borderTopColor: COLOR,
	    borderRightColor: COLOR,
	    borderBottomColor: COLOR,
	    borderLeftColor: COLOR,
	    borderRadius: PX,
	    // Dimensions
	    margin: DIMENSIONS,
	    padding: DIMENSIONS,
	    width: PX,
	    height: PX,
	    // Positions
	    backgroundPosition: POSITIONS,
	    perspectiveOrigin: POSITIONS,
	    transformOrigin: POSITIONS,
	    // Shadows
	    textShadow: SHADOW,
	    boxShadow: SHADOW,
	    // Transform properties
	    rotate: ANGLE,
	    rotateX: ANGLE,
	    rotateY: ANGLE,
	    rotateZ: ANGLE,
	    skewX: ANGLE,
	    skewY: ANGLE,
	    translateX: PX,
	    translateY: PX,
	    translateZ: PX,
	    perspective: PX,
	    opacity: ALPHA
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var each = __webpack_require__(37).each,
	    transformDictionary = __webpack_require__(60),
	    transformProps = transformDictionary.props,
	    zeroNotZero = 0.0001;
	
	module.exports = function (output, origin) {
	    var props = {},
	        hasTransform = false,
	        scale = output.scale !== undefined ? output.scale || zeroNotZero : output.scaleX || 1,
	        scaleY = output.scaleY !== undefined ? output.scaleY || zeroNotZero : scale || 1,
	        transformOriginX = origin.x,
	        transformOriginY = origin.y,
	        scaleTransformX = -transformOriginX * (scale * 1),
	        scaleTransformY = -transformOriginY * (scaleY * 1),
	        scaleReplaceX = transformOriginX / scale,
	        scaleReplaceY = transformOriginY / scaleY,
	        transform = {
	        translate: 'translate(' + output.translateX + ', ' + output.translateY + ') ',
	        scale: 'translate(' + scaleTransformX + ', ' + scaleTransformY + ') scale(' + scale + ', ' + scaleY + ') translate(' + scaleReplaceX + ', ' + scaleReplaceY + ') ',
	        rotate: 'rotate(' + output.rotate + ', ' + transformOriginX + ', ' + transformOriginY + ') ',
	        skewX: 'skewX(' + output.skewX + ') ',
	        skewY: 'skewY(' + output.skewY + ') '
	    };
	
	    each(output, function (key, value) {
	        if (transformProps[key]) {
	            hasTransform = true;
	        } else {
	            props[key] = value;
	        }
	    });
	
	    if (hasTransform) {
	        props.transform = '';
	
	        each(transform, function (key, value) {
	            var defaultValue = key === 'scale' ? '1' : '0';
	            props.transform += value.replace(/undefined/g, defaultValue);
	        });
	    }
	
	    return props;
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var COLOR = 'color',
	    SCALE = 'scale';
	
	module.exports = {
	    fill: COLOR,
	    stroke: COLOR,
	    scale: SCALE,
	    scaleX: SCALE,
	    scaleY: SCALE,
	    transformOrigin: 'positions',
	    d: 'complex'
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var STROKE = 'stroke';
	
	module.exports = {
	    opacity: STROKE + '-opacity',
	    width: STROKE + '-width',
	    miterlimit: STROKE + '-miterlimit'
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var ModManager = function ModManager() {
	    this._keys = [];
	    this._numKeys = 0;
	};
	
	ModManager.prototype = {
	
	    /*
	        Add module key to keys list
	         @param [string]: Key to add
	    */
	    _addKey: function _addKey(name) {
	        this._keys.push(name);
	        this._numKeys++;
	    },
	
	    /*
	        Add a new module
	         @param [string || object]: Name of new module or multiple modules
	        @param [object] (optional): Module to add
	    */
	    extend: function extend(name, mod) {
	        var multiMods = typeof name == 'object',
	            mods = multiMods ? name : {},
	            key = '';
	
	        // If we just have one module, coerce
	        if (!multiMods) {
	            mods[name] = mod;
	        }
	
	        for (key in mods) {
	            if (mods.hasOwnProperty(key)) {
	                this._addKey(key);
	                this[key] = mods[key];
	            }
	        }
	
	        return this;
	    },
	
	    each: function each(callback) {
	        var key = '';
	
	        for (var i = 0; i < this._numKeys; i++) {
	            key = this._keys[i];
	            callback(key, this[key]);
	        }
	    }
	};
	
	module.exports = ModManager;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var Queue = function Queue() {
	    this.clear();
	};
	
	Queue.prototype = {
	
	    /*
	        Add a set of arguments to queue
	    */
	    add: function add() {
	        this.queue.push([].slice.call(arguments));
	    },
	
	    /*
	        Get next set of arguments from queue
	    */
	    next: function next(direction) {
	        var queue = this.queue,
	            returnVal = false,
	            index = this.index;
	
	        direction = arguments.length ? direction : 1;
	
	        // If our index is between 0 and the queue length, return that item
	        if (index >= 0 && index < queue.length) {
	            returnVal = queue[index];
	            this.index = index + direction;
	
	            // Or clear
	        } else {
	            this.clear();
	        }
	
	        return returnVal;
	    },
	
	    /*
	        Replace queue with empty array
	    */
	    clear: function clear() {
	        this.queue = [];
	        this.index = 0;
	    }
	};
	
	module.exports = Queue;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var valueTypeManager = __webpack_require__(19),
	    calc = __webpack_require__(31),
	    utils = __webpack_require__(37),
	    each = utils.each,
	    Action = __webpack_require__(27),
	    defaultAction = new Action(),
	    Watch = __webpack_require__(61),
	    watcher = new Watch(),
	    createMapper = function createMapper(role, mappedValues) {
	    return function (name, val) {
	        mappedValues[role.map(name)] = val;
	    };
	},
	
	/*
	    Check all Actions for `onEnd`, return true if all are true
	     @param [Actor]
	    @param [boolean]
	    @returns [boolean]
	*/
	checkAndFireHasEnded = function checkAndFireHasEnded(actor, hasChanged) {
	    var hasEnded = true,
	        values = actor.state.values;
	
	    each(actor.activeActions, function (key, action) {
	        // Return if action has been deleted elsewhere
	        if (!action) {
	            return;
	        }
	
	        if (action.onFrame) {
	            action.onFrame.call(actor, values);
	        }
	
	        if (action.onUpdate && hasChanged) {
	            action.onUpdate.call(actor, values);
	        }
	
	        if (action.hasEnded && action.hasEnded(actor, hasChanged) === false) {
	            hasEnded = false;
	        } else {
	            if (action.onComplete) {
	                action.onComplete.call(actor);
	            }
	            actor.unbindAction(key);
	        }
	    });
	
	    return hasEnded;
	},
	
	/*
	    Update the Actor and its values
	     @param [int]: Timestamp of rAF call
	    @param [int]: Time since last frame
	*/
	update = function update(framestamp, frameDuration) {
	    var numActiveValues = this.activeValues.length,
	        numActiveParents = this.activeParents.length,
	        numRoles = this.roles.length,
	        state = this.state,
	        hasChanged = this.hasChanged;
	
	    // Update values
	    for (var i = 0; i < numActiveValues; i++) {
	        // Get value and key
	        var key = this.activeValues[i];
	        var value = this.values[key];
	        var action = !value.action || value.action && !value.action.isActive ? defaultAction : value.action;
	
	        // Fire action onFrameStart if not already fired
	        if (action.onFrameStart && action.lastUpdate !== framestamp) {
	            action.onFrameStart(this, frameDuration, framestamp);
	            action.lastUpdate = framestamp;
	        }
	
	        // Calculate new value
	        var updatedValue = utils.isString(value.watch) ? watcher.process(this, value) : action.process(this, value, key, frameDuration);
	
	        // Limit if this action does that kind of thing
	        if (action.limit && value.hasRange) {
	            updatedValue = action.limit(updatedValue, value);
	        }
	
	        // Round value if round is true
	        if (value.round) {
	            updatedValue = Math.round(updatedValue);
	        }
	
	        // Update frameChange
	        value.frameChange = updatedValue - value.current;
	
	        // Calculate velocity if Action hasn't
	        if (!action.calculatesVelocity) {
	            value.velocity = calc.speedPerSecond(value.frameChange, frameDuration);
	        }
	
	        // Update current speed
	        value.speed = Math.abs(value.velocity);
	
	        // Check if value's changed
	        if (value.current !== updatedValue) {
	            hasChanged = true;
	        }
	
	        // Set new current
	        value.current = updatedValue;
	        var valueState = value.unit ? updatedValue + value.unit : updatedValue;
	
	        // Put value in state if no parent
	        if (!value.parent) {
	            state.values[key] = valueState;
	
	            // Or, add to parent state to be combined later
	        } else {
	            state[value.parent] = state[value.parent] || {};
	            state[value.parent][value.propName] = valueState;
	        }
	    }
	
	    // Update parent values from calculated children
	    for (var i = 0; i < numActiveParents; i++) {
	        var key = this.activeParents[i];
	        var value = this.values[key];
	
	        // Update parent value current property
	        value.current = valueTypeManager[value.type].combine(state[key], value.template);
	
	        // Update state
	        state.values[key] = value.current;
	    }
	
	    // Fire `frame` and `update` callbacks on all Roles
	    for (var i = 0; i < numRoles; i++) {
	        var role = this.roles[i];
	        var mappedValues = {};
	
	        each(state.values, createMapper(role, mappedValues));
	
	        if (role.frame) {
	            role.frame.call(this, mappedValues);
	        }
	
	        if (role.update && (hasChanged || this.firstFrame)) {
	            role.update.call(this, mappedValues);
	        }
	    }
	
	    // Reset hasChanged before further Actions might affect this
	    this.hasChanged = false;
	
	    // Check all Actions and fire onEnd if they've ended
	    if (this.isActive && checkAndFireHasEnded(this, hasChanged)) {
	        this.isActive = false;
	
	        // Fire `complete` callback
	        for (var i = 0; i < numRoles; i++) {
	            var role = this.roles[i];
	            if (role.complete) {
	                role.complete.call(this);
	            }
	        }
	
	        // If Actor is still inactive, fire next step
	        if (!this.isActive) {
	            this.next();
	        }
	    }
	
	    this.firstFrame = false;
	    this.framestamp = framestamp;
	};
	
	module.exports = update;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var valueTypesManager = __webpack_require__(19),
	    calc = __webpack_require__(31),
	    utils = __webpack_require__(37),
	    isNum = utils.isNum,
	    each = utils.each;
	
	var numericalValues = ['current', 'to', 'min', 'max', 'velocity', 'friction', 'spring'],
	    numNumericalValues = numericalValues.length,
	    defaultValue = {
	    current: 0,
	    velocity: 0,
	    speed: 0,
	    frameChange: 0
	};
	
	function checkNumericalValue(name) {
	    return numericalValues.indexOf(name) > -1;
	}
	
	/*
	    Check Role typeMaps to see if this value name has been mapped
	    to a specific value type
	
	    @param [string]
	    @param [array]
	    @returns [string]: Value type
	*/
	function checkRoles(name, roles) {
	    var valueType;
	
	    each(roles, function (key, role) {
	        if (role._typeMap) {
	            valueType = role._typeMap[role.map(name)] || valueType;
	        }
	    });
	
	    return valueType;
	}
	
	/*
	    Check value for special type
	
	    @param [object]
	    @param [object]
	    @param [object]
	    @param [string]
	    @returns [string || false]
	*/
	function checkValueType(existingValue, newValue, scope, valueName) {
	    var valueType;
	
	    // Check existing value for type already set
	    if (existingValue && existingValue.type) {
	        valueType = existingValue.type;
	    } else {
	        // Or check Role _typeMap properties
	        if (scope.roles) {
	            valueType = checkRoles(valueName, scope.roles);
	        }
	
	        // Finally run tests
	        if (!valueType && utils.isString(newValue.current)) {
	            valueType = valueTypesManager.test(newValue.current);
	        }
	    }
	
	    return valueType;
	}
	
	/*
	    Resolve a property
	
	    @param [string]
	    @param [string || function || number]
	    @param [object]
	    @param [object]
	    @returns [number]
	*/
	function resolve(name, prop, value, scope) {
	    var isNumericalValue = checkNumericalValue(name);
	
	    // If function, resolve
	    if (utils.isFunc(prop) && isNumericalValue) {
	        prop = prop.call(scope, scope);
	    }
	
	    // If string, check for relative numbers and units
	    if (utils.isString(prop)) {
	        // If relative value
	        if (prop.indexOf('=') > 0) {
	            prop = calc.relativeValue(value.current, prop);
	        }
	
	        // If unit
	        if (isNumericalValue) {
	            splitUnit(prop, value);
	        }
	    }
	
	    if (isNumericalValue) {
	        prop = parseFloat(prop);
	    }
	
	    return prop;
	}
	
	/*
	    Split a value into sub-values
	
	    @param [string]
	    @param [object]
	    @param [object]
	    @param [valueTypeHandler]
	    @returns [object]
	*/
	function split(name, value, scope, valueTypeHandler) {
	    var splitValues = {},
	        i = 0;
	
	    var _loop = function () {
	        var propName = numericalValues[i];
	        var splitProp = {};
	
	        if (value.hasOwnProperty(propName)) {
	            var valueProp = value[propName];
	
	            // If we need to first resolve this, resolve
	            if (utils.isFunc(valueProp)) {
	                valueProp = valueProp.call(scope, scope);
	            }
	
	            if (!utils.isString(valueProp)) {
	                return 'continue';
	            }
	
	            splitProp = valueTypeHandler.split(valueProp);
	
	            // Assign split properties to each child value
	            each(splitProp, function (key, prop) {
	                // Create new value if none exists
	                splitValues[key] = splitValues[key] || utils.copy(valueTypesManager.defaultProps(value.type, key));
	                splitValues[key][propName] = prop;
	
	                if (utils.isString(splitProp[key])) {
	                    splitUnit(splitValues[key][propName], splitValues[key]);
	                }
	            });
	        }
	    };
	
	    for (; i < numNumericalValues; i++) {
	        var _ret = _loop();
	
	        if (_ret === 'continue') continue;
	    }
	
	    return splitValues;
	}
	
	/*
	    Split value into number and unit, and set unit to value
	
	    @param [string]
	    @param [object]
	*/
	function splitUnit(property, hostValue) {
	    if (utils.isNum(property)) {
	        return property;
	    }
	    var returnVal = property;
	
	    var _utils$splitValUnit = utils.splitValUnit(property);
	
	    var value = _utils$splitValUnit.value;
	    var unit = _utils$splitValUnit.unit;
	
	    if (!isNaN(value)) {
	        returnVal = value;
	        if (unit) {
	            hostValue.unit = unit;
	        }
	    }
	
	    return returnVal;
	}
	
	/*
	    Preprocess incoming values, splitting non-numerical values
	    into sub-values ie hex
	
	    @param [object]
	    @param [object]
	    @param [object]
	    @param [string]
	*/
	function preprocess(existing, incoming, scope, defaultProp) {
	    var values = {};
	
	    each(incoming, function (key, value) {
	        var existingValue = existing[key],
	            newValue = {};
	
	        if (utils.isObj(value)) {
	            newValue = value;
	        } else {
	            newValue[defaultProp] = value;
	        }
	
	        // If value doesn't have a special type, check for one
	        newValue.type = checkValueType(existingValue, newValue, scope, key);
	
	        values[key] = newValue;
	
	        // If we have a type property, split/assign default props
	        if (newValue.type) {
	            var typeHandler = valueTypesManager[newValue.type];
	
	            // If valueType handler has a split function, split this value
	            if (typeHandler.split) {
	                var splitValues = split(key, newValue, scope, typeHandler);
	                newValue.children = {};
	
	                each(splitValues, function (childName, childValue) {
	                    childValue = utils.merge(newValue, childValue);
	                    childValue.parent = childValue.name = key;
	                    childValue.propName = childName;
	
	                    delete childValue.type;
	                    delete childValue.children;
	
	                    newValue.children[childName] = values[key + childName] = childValue;
	                });
	
	                if (typeHandler.template) {
	                    newValue.template = existingValue ? existingValue.template : typeHandler.template(newValue.current);
	                }
	
	                // Or just assign default properties for this value
	            } else {
	                values[key] = utils.merge(valueTypesManager.defaultProps(newValue.type, key), newValue);
	            }
	        }
	    });
	
	    return values;
	}
	
	module.exports = {
	
	    /*
	        Flip value target/origin
	    */
	    flip: function flip(value) {
	        var target = value.target !== undefined ? value.target : value.current;
	        value.target = value.to = value.origin;
	        value.origin = target;
	    },
	
	    /*
	        Merge existing and incoming values, resolving properties
	        set as functions and splitting non-numerical values ie hex
	         @param [object]
	        @param [object]
	        @param [object]
	        @param [string] (optional)
	        @param [object]
	        @returns [object]: New values object
	    */
	    process: function process(existing, incoming, inherit, defaultProp, scope) {
	        existing = existing || {};
	        defaultProp = defaultProp || 'current';
	        var preprocessed = preprocess(existing, incoming, scope, defaultProp);
	
	        each(preprocessed, function (key, value) {
	            var newValue = existing[key] || utils.copy(defaultValue),
	                hasChildren = value.children !== undefined,
	                defaultActionValue = inherit.action ? inherit.action.getDefaultValue() : {};
	
	            value.action = inherit.action;
	
	            each(defaultActionValue, function (propName, defaultActionProp) {
	                newValue[propName] = inherit.hasOwnProperty(propName) && !value.hasOwnProperty(propName) ? inherit[propName] : defaultActionProp;
	            });
	
	            each(value, function (valueName, valueProp) {
	                // If property is not undefined or a number, resolve
	                if (valueProp !== undefined && !isNum(valueProp) && !hasChildren) {
	                    valueProp = resolve(valueName, valueProp, newValue, scope);
	                }
	
	                newValue[valueName] = valueProp;
	
	                // Set internal target if this property is 'to'
	                if (valueName === 'to') {
	                    newValue.target = newValue.to;
	                }
	            });
	
	            newValue.origin = newValue.current;
	            newValue.hasRange = isNum(newValue.min) || isNum(newValue.max) ? true : false;
	
	            existing[key] = newValue;
	            scope.updateOrder(key, utils.isString(newValue.watch), hasChildren);
	        });
	
	        return existing;
	    }
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Role = __webpack_require__(25);
	
	module.exports = new Role({
	    init: function init() {
	        if (this.init) {
	            this.init();
	        }
	    },
	
	    start: function start() {
	        if (this.onStart) {
	            this.onStart();
	        }
	    },
	
	    frame: function frame(state) {
	        if (this.onFrame) {
	            this.onFrame(state);
	        }
	    },
	
	    update: function update(state) {
	        if (this.onUpdate) {
	            this.onUpdate(state);
	        }
	    },
	
	    complete: function complete() {
	        if (this.onComplete) {
	            this.onComplete();
	        }
	    }
	});

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var // [number]: Default max size of history
	maxHistorySize = 3,
	
	/*
	    History constructor
	    
	    @param [var]: Variable to store in first history slot
	    @param [int] (optional): Maximum size of history
	*/
	History = function History(obj, max) {
	    this.max = max || maxHistorySize;
	    this.entries = [];
	    this.add(obj);
	};
	
	History.prototype = {
	
	    /*
	        Push new var to history
	        
	        Shift out oldest entry if we've reached maximum capacity
	        
	        @param [var]: Variable to push into history.entries
	    */
	    add: function add(obj) {
	        var currentSize = this.getSize();
	
	        this.entries.push(obj);
	
	        if (currentSize >= this.max) {
	            this.entries.shift();
	        }
	    },
	
	    /*
	        Get variable at specified index
	         @param [int]: Index
	        @return [var]: Var found at specified index
	    */
	    get: function get(i) {
	        i = typeof i === "number" ? i : this.getSize() - 1;
	
	        return this.entries[i];
	    },
	
	    /*
	        Get the second newest history entry
	        
	        @return [var]: Entry found at index size - 2
	    */
	    getPrevious: function getPrevious() {
	        return this.get(this.getSize() - 2);
	    },
	
	    /*
	        Get current history size
	        
	        @return [int]: Current length of entries.length
	    */
	    getSize: function getSize() {
	        return this.entries.length;
	    }
	
	};
	
	module.exports = History;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Controls = (function () {
	    function Controls(actor, action, hasStarted) {
	        _classCallCheck(this, Controls);
	
	        this.actor = actor;
	        this.action = action;
	
	        if (hasStarted) {
	            this.id = this.bindAction();
	            this.action.activate();
	        }
	    }
	
	    Controls.prototype.start = function start(input) {
	        this.id = this.bindAction();
	        this.actor.start(this.id, input);
	        this.action.activate();
	        return this;
	    };
	
	    Controls.prototype.stop = function stop() {
	        this.actor.unbindAction(this.id);
	        this.action.deactivate();
	        return this;
	    };
	
	    Controls.prototype.pause = function pause() {
	        this.action.deactivate();
	        return this;
	    };
	
	    Controls.prototype.resume = function resume() {
	        this.action.activate();
	        return this;
	    };
	
	    Controls.prototype.toggle = function toggle() {
	        var resume = this.actor.hasAction(this.id) ? this.resume : this.start;
	        return this.action.isActive ? this.pause() : resume.call(this);
	    };
	
	    Controls.prototype.then = function then() {
	        var _actor;
	
	        (_actor = this.actor).then.apply(_actor, arguments);
	        return this;
	    };
	
	    Controls.prototype.bindAction = function bindAction() {
	        return this.actor.bindAction(this.action, this.id);
	    };
	
	    return Controls;
	})();
	
	module.exports = Controls;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	/*
	    Easing functions
	    ----------------------------------------
	    
	    Generates and provides easing functions based on baseFunction definitions
	    
	    A call to easingFunction.get('functionName') returns a function that can be passed:
	        @param [number]: Progress 0-1
	        @param [number] (optional): Amp modifier, only accepted in some easing functions
	                                    and is used to adjust overall strength
	        @return [number]: Eased progress
	        
	    We can generate new functions by sending an easing function through easingFunction.extend(name, method).
	    Which will make nameIn, nameOut and nameInOut functions available to use.
	        
	    Easing functions from Robert Penner
	    http://www.robertpenner.com/easing/
	        
	    Bezier curve interpretor created from Gaëtan Renaudeau's original BezierEasing  
	    https://github.com/gre/bezier-easing/blob/master/index.js  
	    https://github.com/gre/bezier-easing/blob/master/LICENSE
	*/
	'use strict';
	
	var Easing = __webpack_require__(26),
	    easingFunction,
	
	// Generate easing function with provided power
	generatePowerEasing = function generatePowerEasing(power) {
	    return function (progress) {
	        return Math.pow(progress, power);
	    };
	},
	
	/*
	    Each of these base functions is an easeIn
	    
	    On init, we use EasingFunction.mirror and .reverse to generate easeInOut and
	    easeOut functions respectively.
	*/
	baseEasing = {
	    circ: function circ(progress) {
	        return 1 - Math.sin(Math.acos(progress));
	    },
	    back: function back(progress) {
	        var strength = 1.5;
	
	        return progress * progress * ((strength + 1) * progress - strength);
	    }
	};
	
	// Generate power easing easing
	['ease', 'cubic', 'quart', 'quint'].forEach(function (easingName, i) {
	    baseEasing[easingName] = generatePowerEasing(i + 2);
	});
	
	// Generate in/out/inOut variations
	for (var key in baseEasing) {
	    if (baseEasing.hasOwnProperty(key)) {
	        easingFunction = new Easing(baseEasing[key]);
	        baseEasing[key + 'In'] = easingFunction['in'];
	        baseEasing[key + 'Out'] = easingFunction.out;
	        baseEasing[key + 'InOut'] = easingFunction.inOut;
	    }
	}
	
	/*
	    Linear easing adjustment
	    
	    The default easing method, not added with .extend as it has no Out or InOut
	    variation.
	    
	    @param [number]: Progress, from 0-1
	    @return [number]: Unadjusted progress
	*/
	baseEasing.linear = function (progress) {
	    return progress;
	};
	
	module.exports = baseEasing;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }
	
	var Controls = __webpack_require__(51);
	
	var TweenControls = (function (_Controls) {
	    _inherits(TweenControls, _Controls);
	
	    function TweenControls() {
	        _classCallCheck(this, TweenControls);
	
	        _Controls.apply(this, arguments);
	    }
	
	    TweenControls.prototype.restart = function restart() {
	        this.action.restart();
	        return this;
	    };
	
	    TweenControls.prototype.reverse = function reverse() {
	        this.action.reverse();
	        return this;
	    };
	
	    TweenControls.prototype.seek = function seek(progress) {
	        if (!this.actor.hasAction(this.id)) {
	            this.start().pause();
	        }
	
	        this.action.elapsed = this.action.duration * progress;
	
	        if (!this.action.isActive) {
	            this.action.activate();
	            this.actor.process.fire();
	            this.action.deactivate();
	        }
	
	        return this;
	    };
	
	    return TweenControls;
	})(Controls);
	
	module.exports = TweenControls;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var calc = __webpack_require__(31),
	    utils = __webpack_require__(37),
	    speedPerFrame = calc.speedPerFrame;
	
	/*
	    Add core physics simulations
	*/
	var simulations = {
	    /*
	        Velocity
	        
	        The default .run() simulation.
	        
	        Applies any set deceleration and acceleration to existing velocity
	    */
	    velocity: function velocity(value, duration) {
	        value.velocity = value.velocity - speedPerFrame(value.deceleration, duration) + speedPerFrame(value.acceleration, duration);
	
	        return simulations.friction(value, duration);
	    },
	
	    /*
	        Glide
	        
	        Emulates touch device scrolling effects with exponential decay
	        http://ariya.ofilabs.com/2013/11/javascript-kinetic-scrolling-part-2.html
	    */
	    glide: function glide(value, duration, started) {
	        var timeUntilFinished = -utils.currentTime() - started,
	            delta = -value.to * Math.exp(timeUntilFinished / value.timeConstant);
	
	        return value.to + delta - value.current;
	    },
	
	    /*
	        Friction
	         Apply friction to the current value
	        TODO: Make this framerate-independent
	    */
	    friction: function friction(value, duration) {
	        var newVelocity = speedPerFrame(value.velocity, duration) * (1 - value.friction);
	
	        return calc.speedPerSecond(newVelocity, duration);
	    },
	
	    spring: function spring(value, duration) {
	        var distance = value.to - value.current;
	
	        value.velocity += distance * speedPerFrame(value.spring, duration);
	
	        return simulations.friction(value, duration);
	    },
	
	    bounce: function bounce(value) {
	        var distance = 0,
	            to = value.to,
	            current = value.current,
	            bounce = value.bounce;
	
	        // If we're using glide simulation we have to flip our target too
	        if (value.simulate === 'glide') {
	            distance = to - current;
	            value.to = current - distance * bounce;
	        }
	
	        return value.velocity *= -bounce;
	    },
	
	    capture: function capture(value, target) {
	        value.to = target;
	        value.simulate = 'spring';
	        value.capture = value.min = value.max = undefined;
	    }
	};
	
	module.exports = simulations;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Input = __webpack_require__(22),
	    currentPointer,
	    // Sort this out for multitouch
	
	TOUCHMOVE = 'touchmove',
	    MOUSEMOVE = 'mousemove',
	
	/*
	    Convert event into point
	    
	    Scrape the x/y coordinates from the provided event
	    
	    @param [event]: Original pointer event
	    @param [boolean]: True if touch event
	    @return [object]: x/y coordinates of event
	*/
	eventToPoint = function eventToPoint(event, isTouchEvent) {
	    var touchChanged = isTouchEvent ? event.changedTouches[0] : false;
	
	    return {
	        x: touchChanged ? touchChanged.clientX : event.pageX,
	        y: touchChanged ? touchChanged.clientY : event.pageY
	    };
	},
	
	/*
	    Get actual event
	    
	    Checks for jQuery's .originalEvent if present
	    
	    @param [event | jQuery event]
	    @return [event]: The actual JS event  
	*/
	getActualEvent = function getActualEvent(event) {
	    return event.originalEvent || event;
	},
	
	/*
	    Pointer constructor
	*/
	Pointer = function Pointer(e) {
	    var event = getActualEvent(e),
	        // In case of jQuery event
	    isTouch = event.touches ? true : false,
	        startPoint = eventToPoint(event, isTouch);
	
	    this.update(startPoint);
	    this.isTouch = isTouch;
	    this.bindEvents();
	},
	    proto = Pointer.prototype = new Input();
	
	/*
	    Bind move event
	*/
	proto.bindEvents = function () {
	    this.moveEvent = this.isTouch ? TOUCHMOVE : MOUSEMOVE;
	
	    currentPointer = this;
	
	    document.documentElement.addEventListener(this.moveEvent, this.onMove);
	};
	
	/*
	    Unbind move event
	*/
	proto.unbindEvents = function () {
	    document.documentElement.removeEventListener(this.moveEvent, this.onMove);
	};
	
	/*
	    Pointer onMove event handler
	    
	    @param [event]: Pointer move event
	*/
	proto.onMove = function (e) {
	    var newPoint = eventToPoint(e, currentPointer.isTouch);
	    e = getActualEvent(e);
	    e.preventDefault();
	    currentPointer.update(newPoint);
	};
	
	proto.stop = function () {
	    this.unbindEvents();
	};
	
	module.exports = Pointer;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var theLoop = __webpack_require__(62),
	    ProcessManager = function ProcessManager() {
	    this.activeIds = [];
	    this.activeProcesses = {};
	    this.deactivateQueue = [];
	    theLoop.setCallback(this, this.fireActive);
	};
	
	ProcessManager.prototype = {
	
	    /*
	        [int]: Used for process ID
	    */
	    processCounter: 0,
	
	    /*
	        [int]: Number of active processes
	    */
	    activeCount: 0,
	
	    /*
	        Get the process with a given index
	        
	        @param [int]: Index of process
	        @return [Process]
	    */
	    getProcess: function getProcess(i) {
	        return this.activeProcesses[i];
	    },
	
	    /*
	        Get number of active processes
	        
	        @return [int]: Number of active processes
	    */
	    getActiveCount: function getActiveCount() {
	        return this.activeCount;
	    },
	
	    /*
	        Get active tokens
	         @return [array]: Active tokens
	    */
	    getActive: function getActive() {
	        return this.activeIds;
	    },
	
	    /*
	        Get the length of the deactivate queue
	        
	        @return [int]: Length of queue
	    */
	    getQueueLength: function getQueueLength() {
	        return this.deactivateQueue.length;
	    },
	
	    /*
	        Fire all active processes
	        
	        @param [int]: Timestamp of executing frames
	        @param [int]: Time since previous frame
	        @return [boolean]: True if active processes found
	    */
	    fireActive: function fireActive(framestamp, elapsed) {
	        var process,
	            activeCount = 0,
	            activeIds = [],
	            i = 0;
	
	        // Purge and check active count before execution
	        this.purge();
	        activeCount = this.getActiveCount();
	        activeIds = this.getActive();
	
	        // Loop through active processes and fire callback
	        for (; i < activeCount; i++) {
	            process = this.getProcess(activeIds[i]);
	
	            if (process) {
	                process.fire(framestamp, elapsed);
	            }
	        }
	
	        // Repurge and recheck active count after execution
	        this.purge();
	        activeCount = this.getActiveCount();
	
	        // Return true if we still have active processes, or false if none
	        return activeCount ? true : false;
	    },
	
	    /*
	        Register a new process
	        
	        @param [Process]
	        @return [int]: Index of process to be used as ID
	    */
	    register: function register() {
	        return this.processCounter++;
	    },
	
	    /*
	        Activate a process
	        
	        @param [int]: Index of active process
	    */
	    activate: function activate(process, i) {
	        var queueIndex = this.deactivateQueue.indexOf(i),
	            isQueued = queueIndex > -1,
	            isActive = this.activeIds.indexOf(i) > -1;
	
	        // Remove from deactivateQueue if in there
	        if (isQueued) {
	            this.deactivateQueue.splice(queueIndex, 1);
	        }
	
	        // Add to active processes array if not already in there
	        if (!isActive) {
	            this.activeIds.push(i);
	            this.activeProcesses[i] = process;
	            this.activeCount++;
	            theLoop.start();
	        }
	    },
	
	    /*
	        Deactivate a process
	        
	        @param [int]: Index of process to add to deactivate queue
	    */
	    deactivate: function deactivate(i) {
	        this.deactivateQueue.push(i);
	    },
	
	    /*
	        Purge the deactivate queue
	    */
	    purge: function purge() {
	        var queueLength = this.getQueueLength(),
	            activeIdIndex = 0,
	            idToDelete = 0;
	
	        while (queueLength--) {
	            idToDelete = this.deactivateQueue[queueLength];
	            activeIdIndex = this.activeIds.indexOf(idToDelete);
	
	            // If process in active list deactivate
	            if (activeIdIndex > -1) {
	                this.activeIds.splice(activeIdIndex, 1);
	                this.activeCount--;
	                delete this.activeProcesses[idToDelete];
	            }
	        }
	
	        this.deactivateQueue = [];
	    }
	
	};
	
	module.exports = new ProcessManager();

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	/*
	    Bezier function generator
	        
	    Gaëtan Renaudeau's BezierEasing
	    https://github.com/gre/bezier-easing/blob/master/index.js  
	    https://github.com/gre/bezier-easing/blob/master/LICENSE
	    You're a hero
	    
	    Use
	    
	        var easeOut = new Bezier(.17,.67,.83,.67),
	            x = easeOut(0.5); // returns 0.627...
	*/
	"use strict";
	
	var NEWTON_ITERATIONS = 8,
	    NEWTON_MIN_SLOPE = 0.001,
	    SUBDIVISION_PRECISION = 0.0000001,
	    SUBDIVISION_MAX_ITERATIONS = 10,
	    K_SPLINE_TABLE_SIZE = 11,
	    K_SAMPLE_STEP_SIZE = 1.0 / (K_SPLINE_TABLE_SIZE - 1.0),
	    FLOAT_32_SUPPORTED = typeof Float32Array !== "undefined",
	    a = function a(a1, a2) {
	    return 1.0 - 3.0 * a2 + 3.0 * a1;
	},
	    b = function b(a1, a2) {
	    return 3.0 * a2 - 6.0 * a1;
	},
	    c = function c(a1) {
	    return 3.0 * a1;
	},
	    getSlope = function getSlope(t, a1, a2) {
	    return 3.0 * a(a1, a2) * t * t + 2.0 * b(a1, a2) * t + c(a1);
	},
	    calcBezier = function calcBezier(t, a1, a2) {
	    return ((a(a1, a2) * t + b(a1, a2)) * t + c(a1)) * t;
	},
	
	/*
	    Bezier constructor
	*/
	Bezier = function Bezier(mX1, mY1, mX2, mY2) {
	    var sampleValues = FLOAT_32_SUPPORTED ? new Float32Array(K_SPLINE_TABLE_SIZE) : new Array(K_SPLINE_TABLE_SIZE),
	        _precomputed = false,
	        binarySubdivide = function binarySubdivide(aX, aA, aB) {
	        var currentX,
	            currentT,
	            i = 0;
	
	        do {
	            currentT = aA + (aB - aA) / 2.0;
	            currentX = calcBezier(currentT, mX1, mX2) - aX;
	            if (currentX > 0.0) {
	                aB = currentT;
	            } else {
	                aA = currentT;
	            }
	        } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
	
	        return currentT;
	    },
	        newtonRaphsonIterate = function newtonRaphsonIterate(aX, aGuessT) {
	        var i = 0,
	            currentSlope = 0.0,
	            currentX;
	
	        for (; i < NEWTON_ITERATIONS; ++i) {
	            currentSlope = getSlope(aGuessT, mX1, mX2);
	
	            if (currentSlope === 0.0) {
	                return aGuessT;
	            }
	
	            currentX = calcBezier(aGuessT, mX1, mX2) - aX;
	            aGuessT -= currentX / currentSlope;
	        }
	
	        return aGuessT;
	    },
	        calcSampleValues = function calcSampleValues() {
	        for (var i = 0; i < K_SPLINE_TABLE_SIZE; ++i) {
	            sampleValues[i] = calcBezier(i * K_SAMPLE_STEP_SIZE, mX1, mX2);
	        }
	    },
	        getTForX = function getTForX(aX) {
	        var intervalStart = 0.0,
	            currentSample = 1,
	            lastSample = K_SPLINE_TABLE_SIZE - 1,
	            dist = 0.0,
	            guessForT = 0.0,
	            initialSlope = 0.0;
	
	        for (; currentSample != lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
	            intervalStart += K_SAMPLE_STEP_SIZE;
	        }
	
	        --currentSample;
	
	        dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
	        guessForT = intervalStart + dist * K_SAMPLE_STEP_SIZE;
	
	        initialSlope = getSlope(guessForT, mX1, mX2);
	
	        // If slope is greater than min
	        if (initialSlope >= NEWTON_MIN_SLOPE) {
	            return newtonRaphsonIterate(aX, guessForT);
	            // Slope is equal to min
	        } else if (initialSlope === 0.0) {
	            return guessForT;
	            // Slope is less than min
	        } else {
	            return binarySubdivide(aX, intervalStart, intervalStart + K_SAMPLE_STEP_SIZE);
	        }
	    },
	        precompute = function precompute() {
	        _precomputed = true;
	        if (mX1 != mY1 || mX2 != mY2) {
	            calcSampleValues();
	        }
	    },
	
	    /*
	        Generated function
	        
	        Returns value 0-1 based on X
	    */
	    f = function f(aX) {
	        var returnValue;
	
	        if (!_precomputed) {
	            precompute();
	        }
	
	        // If linear gradient, return X as T
	        if (mX1 === mY1 && mX2 === mY2) {
	            returnValue = aX;
	
	            // If at start, return 0
	        } else if (aX === 0) {
	            returnValue = 0;
	
	            // If at end, return 1
	        } else if (aX === 1) {
	            returnValue = 1;
	        } else {
	            returnValue = calcBezier(getTForX(aX), mY1, mY2);
	        }
	
	        return returnValue;
	    };
	
	    return f;
	};
	
	module.exports = Bezier;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = function (value) {
	    return typeof value === 'string' ? value.split(/,\s*/) : [value];
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = function (value) {
	    return value.substring(value.indexOf('(') + 1, value.lastIndexOf(')'));
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var positionTerms = __webpack_require__(36).positions,
	    numPositionTerms = positionTerms.length,
	    TRANSFORM_PERSPECTIVE = 'transformPerspective',
	    SCALE = 'scale',
	    ROTATE = 'rotate',
	    terms = {
	    funcs: ['translate', SCALE, ROTATE, 'skew', TRANSFORM_PERSPECTIVE],
	    props: {} // objects are faster at direct lookups
	};
	
	// Create transform terms
	(function () {
	    var funcs = terms.funcs,
	        props = terms.props,
	        numFuncs = funcs.length,
	        i = 0,
	        createProps = function createProps(funcName) {
	        var j = 0;
	
	        for (; j < numPositionTerms; j++) {
	            props[funcName + positionTerms[j]] = true;
	        }
	    };
	
	    // Manually add skew and transform perspective 
	    props[ROTATE] = props[SCALE] = props[TRANSFORM_PERSPECTIVE] = true;
	
	    // Loop over each function name and create function/property terms
	    for (; i < numFuncs; i++) {
	        createProps(funcs[i]);
	    }
	})();
	
	module.exports = terms;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }
	
	var Action = __webpack_require__(27),
	    calc = __webpack_require__(31),
	    STRING = 'string',
	
	/*
	    Translate our mapLink value into mapTo
	    
	    @param [number]: Calculated value from linked value
	    @param [Value || object]: Linked value or empty object if we're linking to input
	    @param [array]: List of numbers relating to linked value
	    @param [array]: List of numbers relating to this value
	*/
	findMappedValue = function findMappedValue(newValue, linkedValue, toValue, mapLink, mapTo) {
	    var mapLength = mapLink.length,
	        i = 1,
	        lastLinkValue,
	        thisLinkValue,
	        lastToValue,
	        thisToValue;
	
	    for (; i < mapLength; i++) {
	        // Assign values from array, or if they're strings, look for them in linkedValue
	        lastLinkValue = typeof mapLink[i - 1] === STRING ? linkedValue[mapLink[i - 1]] : mapLink[i - 1];
	        thisLinkValue = typeof mapLink[i] === STRING ? linkedValue[mapLink[i]] : mapLink[i];
	        lastToValue = typeof mapTo[i - 1] === STRING ? toValue[mapTo[i - 1]] : mapTo[i - 1];
	        thisToValue = typeof mapTo[i] === STRING ? toValue[mapTo[i]] : mapTo[i];
	
	        // Check if we've gone past our calculated value, or if we're at the end of the array
	        if (newValue < thisLinkValue || i === mapLength - 1) {
	            newValue = calc.value(calc.restricted(calc.progress(newValue, lastLinkValue, thisLinkValue), 0, 1), lastToValue, thisToValue);
	            break;
	        }
	    }
	
	    return newValue;
	};
	
	var Watch = (function (_Action) {
	    _inherits(Watch, _Action);
	
	    function Watch() {
	        _classCallCheck(this, Watch);
	
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }
	
	        _Action.call.apply(_Action, [this].concat(args));
	        this.isActive = true;
	    }
	
	    /*
	        Process this value
	        
	        First check if this value exists as a Value, if not
	        check within Input (if we have one)
	            
	        @param [Actor]
	        @param [Value]: Current value
	        @param [string]: Key of current value
	        @return [number]: Calculated value
	    */
	
	    Watch.prototype.process = function process(actor, value, key) {
	        var values = actor.values,
	            newValue = value.current,
	            watchedKey = value.watch,
	            watchedValue = values[watchedKey] ? values[watchedKey] : {},
	            inputOffset = value.action ? value.action.inputOffset : false;
	
	        // First look at Action and check value isn't linking itself
	        if (watchedValue.current !== undefined && key !== watchedKey) {
	            newValue = watchedValue.current;
	
	            // Then check values in Input
	        } else if (inputOffset && inputOffset.hasOwnProperty(watchedKey)) {
	            newValue = value.origin + inputOffset[watchedKey] * value.amp;
	        }
	
	        // If we have mapFrom and mapTo properties, translate the new value
	        if (value.mapFrom && value.mapTo) {
	            newValue = findMappedValue(newValue, watchedValue, value, value.mapFrom, value.mapTo);
	        }
	
	        return newValue;
	    };
	
	    return Watch;
	})(Action);
	
	module.exports = Watch;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	/*
	    The loop
	*/
	'use strict';
	
	var Timer = __webpack_require__(63),
	    tick = __webpack_require__(64),
	    Loop = function Loop() {
	    this.timer = new Timer();
	};
	
	Loop.prototype = {
	
	    /*
	        [boolean]: Current status of animation loop
	    */
	    isRunning: false,
	
	    /*
	        Fire all active processes once per frame
	    */
	    frame: function frame() {
	        var self = this;
	
	        tick(function () {
	            var framestamp = self.timer.update(),
	                // Currently just measuring in ms - will look into hi-res timestamps
	            isActive = self.callback.call(self.scope, framestamp, self.timer.getElapsed());
	
	            if (isActive) {
	                self.frame();
	            } else {
	                self.stop();
	            }
	        });
	    },
	
	    /*
	        Start loop
	    */
	    start: function start() {
	        // Make sure we're not already running a loop
	        if (!this.isRunning) {
	            this.timer.clock();
	            this.isRunning = true;
	            this.frame();
	        }
	    },
	
	    /*
	        Stop the loop
	    */
	    stop: function stop() {
	        this.isRunning = false;
	    },
	
	    /*
	        Set the callback to run every frame
	        
	        @param [Object]: Execution context
	        @param [function]: Callback to fire
	    */
	    setCallback: function setCallback(scope, callback) {
	        this.scope = scope;
	        this.callback = callback;
	    }
	
	};
	
	module.exports = new Loop();

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var utils = __webpack_require__(37),
	    maxElapsed = 33,
	    Timer = function Timer() {
	    this.elapsed = 16.7;
	    this.current = utils.currentTime();
	    this.update();
	};
	
	Timer.prototype = {
	    update: function update() {
	        this.prev = this.current;
	        this.current = utils.currentTime();
	        this.elapsed = Math.min(this.current - this.prev, maxElapsed);
	
	        return this.current;
	    },
	
	    getElapsed: function getElapsed() {
	        return this.elapsed;
	    },
	
	    clock: function clock() {
	        this.current = utils.currentTime();
	    }
	};
	
	module.exports = Timer;

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/*
	    requestAnimationFrame polyfill
	    
	    For IE8/9 Flinstones
	
	    Taken from Paul Irish. We've stripped out cancelAnimationFrame checks because we don't fox with that
	    
	    http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	    http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
	     
	    requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
	     
	    MIT license
	*/
	var tick,
	    lastTime = 0,
	    hasWindow = typeof window !== "undefined";
	
	if (!hasWindow) {
	    // Load rAF shim
	    tick = function (callback) {
	        var currTime = new Date().getTime(),
	            timeToCall = Math.max(0, 16 - (currTime - lastTime)),
	            id = setTimeout(function () {
	            callback(currTime + timeToCall);
	        }, timeToCall);
	
	        lastTime = currTime + timeToCall;
	
	        return id;
	    };
	} else {
	    tick = window.requestAnimationFrame;
	}
	
	module.exports = tick;

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYTg1ZmM2ZGI3ZDFjM2ZlZmZhMGQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvYWQvZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL3NyYy9sb2FkL21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcG9wbW90aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy92YWx1ZS10eXBlcy9hbHBoYS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdmFsdWUtdHlwZXMvYW5nbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZhbHVlLXR5cGVzL3B4LmpzIiwid2VicGFjazovLy8uL3NyYy92YWx1ZS10eXBlcy9oc2wuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZhbHVlLXR5cGVzL3JnYi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdmFsdWUtdHlwZXMvaGV4LmpzIiwid2VicGFjazovLy8uL3NyYy92YWx1ZS10eXBlcy9jb2xvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdmFsdWUtdHlwZXMvcG9zaXRpb25zLmpzIiwid2VicGFjazovLy8uL3NyYy92YWx1ZS10eXBlcy9kaW1lbnNpb25zLmpzIiwid2VicGFjazovLy8uL3NyYy92YWx1ZS10eXBlcy9zY2FsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdmFsdWUtdHlwZXMvc2hhZG93LmpzIiwid2VicGFjazovLy8uL3NyYy92YWx1ZS10eXBlcy9jb21wbGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9yb2xlcy9hdHRyL2F0dHJSb2xlLmpzIiwid2VicGFjazovLy8uL3NyYy9yb2xlcy9jc3MvY3NzUm9sZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcm9sZXMvc3ZnL3N2Z1JvbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JvbGVzL3BhdGgvZHJhd1BhdGhSb2xlLmpzIiwid2VicGFjazovLy8uL3NyYy92YWx1ZS10eXBlcy9tYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9hY3Rvci9zZWxlY3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FjdG9yL0FjdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9pbnB1dC9JbnB1dC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaXRlcmF0b3IvSXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2Nlc3MvUHJvY2Vzcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcm9sZXMvUm9sZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYWN0aW9ucy90d2Vlbi9FYXNpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FjdGlvbnMvQWN0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9hY3Rpb25zL1R3ZWVuLmpzIiwid2VicGFjazovLy8uL3NyYy9hY3Rpb25zL1NpbXVsYXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9hY3Rpb25zL1RyYWNrLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmMvY2FsYy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdmFsdWUtdHlwZXMvbWFuaXB1bGF0b3JzL2NyZWF0ZS1kZWxpbWl0ZWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZhbHVlLXR5cGVzL21hbmlwdWxhdG9ycy9nZXQtY29sb3ItdmFsdWVzLmpzIiwid2VicGFjazovLy8uL3NyYy92YWx1ZS10eXBlcy9tYW5pcHVsYXRvcnMvZnVuY3Rpb24tY3JlYXRlLmpzIiwid2VicGFjazovLy8uL3NyYy92YWx1ZS10eXBlcy9zZXR0aW5ncy9kZWZhdWx0LXByb3BzLmpzIiwid2VicGFjazovLy8uL3NyYy92YWx1ZS10eXBlcy9zZXR0aW5ncy9kaWN0aW9uYXJ5LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZhbHVlLXR5cGVzL21hbmlwdWxhdG9ycy9zcGxpdC1zcGFjZS1kZWxpbWl0ZWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JvbGVzL2Nzcy9idWlsZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcm9sZXMvY3NzL21hcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcm9sZXMvY3NzL3R5cGUtbWFwLmpzIiwid2VicGFjazovLy8uL3NyYy9yb2xlcy9zdmcvYnVpbGQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JvbGVzL3N2Zy90eXBlLW1hcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcm9sZXMvcGF0aC9tYXAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luYy9Nb2RNYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmMvUXVldWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FjdG9yL3VwZGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYWN0b3IvdmFsdWUtb3BlcmF0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcm9sZXMvZGVmYXVsdFJvbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luYy9IaXN0b3J5LmpzIiwid2VicGFjazovLy8uL3NyYy9jb250cm9scy9Db250cm9scy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYWN0aW9ucy90d2Vlbi9wcmVzZXQtZWFzaW5nLmpzIiwid2VicGFjazovLy8uL3NyYy9hY3Rpb25zL3R3ZWVuL1R3ZWVuQ29udHJvbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FjdGlvbnMvc2ltdWxhdGUvc2ltdWxhdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2lucHV0L1BvaW50ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2Nlc3MvbWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYWN0aW9ucy90d2Vlbi9CZXppZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZhbHVlLXR5cGVzL21hbmlwdWxhdG9ycy9zcGxpdC1jb21tYS1kZWxpbWl0ZWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZhbHVlLXR5cGVzL21hbmlwdWxhdG9ycy9mdW5jdGlvbi1icmVhay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcm9sZXMvY3NzL3RyYW5zZm9ybS1kaWN0aW9uYXJ5LmpzIiwid2VicGFjazovLy8uL3NyYy9hY3Rpb25zL1dhdGNoLmpzIiwid2VicGFjazovLy8uL3NyYy9wcm9jZXNzL2xvb3AuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2Nlc3MvdGltZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2Nlc3MvdGljay5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7Ozs7O0FDdENBLEtBQUksU0FBUyxHQUFHLG1CQUFPLENBQUMsQ0FBYSxDQUFDO0tBQ2xDLEtBQUssR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDOztBQUV0QixPQUFNLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDOzs7Ozs7QUFNekMsT0FBTSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEdBQUcsWUFBWTtBQUMvQixXQUFNLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQztFQUNyQixDOzs7Ozs7QUNYRCxhQUFZLENBQUM7O0FBRWIsS0FBSSxTQUFTLEdBQUcsbUJBQU8sQ0FBQyxDQUFjLENBQUMsQ0FBQzs7Ozs7QUFLeEMsVUFBUyxDQUFDLFlBQVksQ0FBQztBQUNuQixVQUFLLEVBQUUsbUJBQU8sQ0FBQyxDQUFzQixDQUFDO0FBQ3RDLFVBQUssRUFBRSxtQkFBTyxDQUFDLENBQXNCLENBQUM7QUFDdEMsT0FBRSxFQUFFLG1CQUFPLENBQUMsQ0FBbUIsQ0FBQztBQUNoQyxRQUFHLEVBQUUsbUJBQU8sQ0FBQyxDQUFvQixDQUFDO0FBQ2xDLFFBQUcsRUFBRSxtQkFBTyxDQUFDLENBQW9CLENBQUM7QUFDbEMsUUFBRyxFQUFFLG1CQUFPLENBQUMsQ0FBb0IsQ0FBQztBQUNsQyxVQUFLLEVBQUUsbUJBQU8sQ0FBQyxDQUFzQixDQUFDO0FBQ3RDLGNBQVMsRUFBRSxtQkFBTyxD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QUFFOztBQUVaLFNBQUksR0FBRyxVQUFVLFFBQVEsRUFBRTtBQUN2QixhQUFJLFFBQVEsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRTthQUMvQixVQUFVLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxJQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsQ0FBQzthQUNwRCxFQUFFLEdBQUcsVUFBVSxDQUFDLFlBQVk7QUFDeEIscUJBQVEsQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDLENBQUM7VUFDbkMsRUFBRSxVQUFVLENBQUMsQ0FBQzs7QUFFbkIsaUJBQVEsR0FBRyxRQUFRLEdBQUcsVUFBVSxDQUFDOztBQUVqQyxnQkFBTyxFQUFFLENBQUM7TUFDYixDQUFDO0VBRUwsTUFBTTtBQUNILFNBQUksR0FBRyxNQUFNLENBQUMscUJBQXFCLENBQUM7RUFDdkM7O0FBRUQsT0FBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLEMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBhODVmYzZkYjdkMWMzZmVmZmEwZFxuICoqLyIsInZhciBwb3Btb3Rpb24gPSByZXF1aXJlKCcuL21vZHVsZS5qcycpLFxuICAgIFVJcmVmID0gd2luZG93LnVpO1xuXG53aW5kb3cudWkgPSB3aW5kb3cucG9wbW90aW9uID0gcG9wbW90aW9uO1xuXG4vKlxuICAgIElmIG5vQ29uZmxpY3QgaXMgcnVuLCB0aGUgb3JpZ2luYWwgcmVmZXJlbmNlIHRvIHdpbmRvdy5VSSBpc1xuICAgIHJlc3RvcmVkIGFuZCBQb3Btb3Rpb24gaXMgbG9hZGVkIHRvIHdpbmRvdy5Qb3Btb3Rpb25cbiovXG53aW5kb3cudWkubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICB3aW5kb3cudWkgPSBVSXJlZjtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvbG9hZC9nbG9iYWwuanNcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHBvcG1vdGlvbiA9IHJlcXVpcmUoJy4uL3BvcG1vdGlvbicpO1xuXG4vKlxuICAgIEFkZCBvcHRpb25hbCBjdXN0b20gdmFsdWUgdHlwZSBzdXBwb3J0XG4qL1xucG9wbW90aW9uLmFkZFZhbHVlVHlwZSh7XG4gICAgYWxwaGE6IHJlcXVpcmUoJy4uL3ZhbHVlLXR5cGVzL2FscGhhJyksXG4gICAgYW5nbGU6IHJlcXVpcmUoJy4uL3ZhbHVlLXR5cGVzL2FuZ2xlJyksXG4gICAgcHg6IHJlcXVpcmUoJy4uL3ZhbHVlLXR5cGVzL3B4JyksXG4gICAgaHNsOiByZXF1aXJlKCcuLi92YWx1ZS10eXBlcy9oc2wnKSxcbiAgICByZ2I6IHJlcXVpcmUoJy4uL3ZhbHVlLXR5cGVzL3JnYicpLFxuICAgIGhleDogcmVxdWlyZSgnLi4vdmFsdWUtdHlwZXMvaGV4JyksXG4gICAgY29sb3I6IHJlcXVpcmUoJy4uL3ZhbHVlLXR5cGVzL2NvbG9yJyksXG4gICAgcG9zaXRpb25zOiByZXF1aXJlKCcuLi92YWx1ZS10eXBlcy9wb3NpdGlvbnMnKSxcbiAgICBkaW1lbnNpb25zOiByZXF1aXJlKCcuLi92YWx1ZS10eXBlcy9kaW1lbnNpb25zJyksXG4gICAgc2NhbGU6IHJlcXVpcmUoJy4uL3ZhbHVlLXR5cGVzL3NjYWxlJyksXG4gICAgc2hhZG93OiByZXF1aXJlKCcuLi92YWx1ZS10eXBlcy9zaGFkb3cnKSxcbiAgICBjb21wbGV4OiByZXF1aXJlKCcuLi92YWx1ZS10eXBlcy9jb21wbGV4Jylcbn0pO1xuXG4vKlxuICAgIFByZWRlZmluZWQgcm9sZXNcbiovXG5cbnBvcG1vdGlvbi5hdHRyID0gcmVxdWlyZSgnLi4vcm9sZXMvYXR0ci9hdHRyUm9sZScpO1xucG9wbW90aW9uLmNzcyA9IHJlcXVpcmUoJy4uL3JvbGVzL2Nzcy9jc3NSb2xlJyk7XG5wb3Btb3Rpb24uc3ZnID0gcmVxdWlyZSgnLi4vcm9sZXMvc3ZnL3N2Z1JvbGUnKTtcbnBvcG1vdGlvbi5kcmF3UGF0aCA9IHJlcXVpcmUoJy4uL3JvbGVzL3BhdGgvZHJhd1BhdGhSb2xlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcG9wbW90aW9uO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2xvYWQvbW9kdWxlLmpzXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciB2YWx1ZVR5cGVNYW5hZ2VyID0gcmVxdWlyZSgnLi92YWx1ZS10eXBlcy9tYW5hZ2VyJyksXG4gICAgc2VsZWN0ID0gcmVxdWlyZSgnLi9hY3Rvci9zZWxlY3QnKSxcblxuICAgIFBvcG1vdGlvbiA9IHtcblxuICAgICAgICBBY3RvcjogcmVxdWlyZSgnLi9hY3Rvci9BY3RvcicpLFxuXG4gICAgICAgIElucHV0OiByZXF1aXJlKCcuL2lucHV0L0lucHV0JyksXG5cbiAgICAgICAgSXRlcmF0b3I6IHJlcXVpcmUoJy4vaXRlcmF0b3IvSXRlcmF0b3InKSxcblxuICAgICAgICBQcm9jZXNzOiByZXF1aXJlKCcuL3Byb2Nlc3MvUHJvY2VzcycpLFxuXG4gICAgICAgIEVhc2luZzogcmVxdWlyZSgnLi9hY3Rpb25zL3R3ZWVuL0Vhc2luZycpLFxuXG4gICAgICAgIFJvbGU6IHJlcXVpcmUoJy4vcm9sZXMvUm9sZScpLFxuXG4gICAgICAgIEFjdGlvbjogcmVxdWlyZSgnLi9hY3Rpb25zL0FjdGlvbicpLFxuICAgICAgICBUd2VlbjogcmVxdWlyZSgnLi9hY3Rpb25zL1R3ZWVuJyksXG4gICAgICAgIFNpbXVsYXRlOiByZXF1aXJlKCcuL2FjdGlvbnMvU2ltdWxhdGUnKSxcbiAgICAgICAgVHJhY2s6IHJlcXVpcmUoJy4vYWN0aW9ucy9UcmFjaycpLFxuXG4gICAgICAgIC8qXG4gICAgICAgICAgICBDcmVhdGUgYW4gSXRlcmF0b3Igb2YgQWN0b3JzIHdpdGggc2VsZWN0ZWQgZG9tIGVsZW1lbnRzXG4gICAgICAgICovXG4gICAgICAgIHNlbGVjdDogZnVuY3Rpb24gKHNlbGVjdG9yLCBvcHRzID0ge30pIHtcbiAgICAgICAgICAgIHZhciBzZWxlY3Rpb24gPSBzZWxlY3Qoc2VsZWN0b3IpLFxuICAgICAgICAgICAgICAgIGFjdG9ycyA9IFtdO1xuXG4gICAgICAgICAgICBzZWxlY3Rpb24uZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICAgIG9wdHMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgYWN0b3JzLnB1c2gobmV3IHRoaXMuQWN0b3Iob3B0cykpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgdGhpcy5JdGVyYXRvcihhY3RvcnMpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGFkZFZhbHVlVHlwZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFsdWVUeXBlTWFuYWdlci5leHRlbmQuYXBwbHkodmFsdWVUeXBlTWFuYWdlciwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIGNhbGM6IHJlcXVpcmUoJy4vaW5jL2NhbGMnKVxuICAgIH07XG5cbm1vZHVsZS5leHBvcnRzID0gUG9wbW90aW9uO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3BvcG1vdGlvbi5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGRlZmF1bHRQcm9wczoge1xuICAgICAgICBtaW46IDAsXG4gICAgICAgIG1heDogMVxuICAgIH1cbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdmFsdWUtdHlwZXMvYWxwaGEuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBkZWZhdWx0UHJvcHM6IHtcbiAgICAgICAgdW5pdDogJ2RlZydcbiAgICB9XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3ZhbHVlLXR5cGVzL2FuZ2xlLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZGVmYXVsdFByb3BzOiB7XG4gICAgICAgIHVuaXQ6ICdweCdcbiAgICB9XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3ZhbHVlLXR5cGVzL3B4LmpzXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBjcmVhdGVEZWxpbWl0ZWQgPSByZXF1aXJlKCcuL21hbmlwdWxhdG9ycy9jcmVhdGUtZGVsaW1pdGVkJyksXG4gICAgZ2V0Q29sb3JWYWx1ZXMgPSByZXF1aXJlKCcuL21hbmlwdWxhdG9ycy9nZXQtY29sb3ItdmFsdWVzJyksXG4gICAgZnVuY3Rpb25DcmVhdGUgPSByZXF1aXJlKCcuL21hbmlwdWxhdG9ycy9mdW5jdGlvbi1jcmVhdGUnKSxcbiAgICBkZWZhdWx0UHJvcHMgPSByZXF1aXJlKCcuL3NldHRpbmdzL2RlZmF1bHQtcHJvcHMnKSxcbiAgICB0ZXJtcyA9IHJlcXVpcmUoJy4vc2V0dGluZ3MvZGljdGlvbmFyeScpLmhzbDtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgICBkZWZhdWx0UHJvcHM6IHtcbiAgICAgICAgSHVlOiB7XG4gICAgICAgICAgICBtaW46IDAsXG4gICAgICAgICAgICBtYXg6IDM2MFxuICAgICAgICB9LFxuICAgICAgICBTYXR1cmF0aW9uOiBkZWZhdWx0UHJvcHMucGVyY2VudCxcbiAgICAgICAgTGlnaHRuZXNzOiBkZWZhdWx0UHJvcHMucGVyY2VudCxcbiAgICAgICAgQWxwaGE6IGRlZmF1bHRQcm9wcy5vcGFjaXR5XG4gICAgfSxcblxuICAgIHRlc3Q6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gKHZhbHVlICYmIHZhbHVlLmluZGV4T2YoJ2hzbCcpID4gLTEpO1xuICAgIH0sXG4gICAgXG4gICAgc3BsaXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gZ2V0Q29sb3JWYWx1ZXModmFsdWUsIHRlcm1zKTtcbiAgICB9LFxuXG4gICAgY29tYmluZTogZnVuY3Rpb24gKHZhbHVlcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb25DcmVhdGUoY3JlYXRlRGVsaW1pdGVkKHZhbHVlcywgdGVybXMsICcsICcsIDIpLCAnaHNsYScpO1xuICAgIH1cbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdmFsdWUtdHlwZXMvaHNsLmpzXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBjcmVhdGVEZWxpbWl0ZWQgPSByZXF1aXJlKCcuL21hbmlwdWxhdG9ycy9jcmVhdGUtZGVsaW1pdGVkJyksXG4gICAgZ2V0Q29sb3JWYWx1ZXMgPSByZXF1aXJlKCcuL21hbmlwdWxhdG9ycy9nZXQtY29sb3ItdmFsdWVzJyksXG4gICAgZnVuY3Rpb25DcmVhdGUgPSByZXF1aXJlKCcuL21hbmlwdWxhdG9ycy9mdW5jdGlvbi1jcmVhdGUnKSxcbiAgICBkZWZhdWx0UHJvcHMgPSByZXF1aXJlKCcuL3NldHRpbmdzL2RlZmF1bHQtcHJvcHMnKSxcbiAgICBjb2xvckRlZmF1bHRzID0gZGVmYXVsdFByb3BzLmNvbG9yLFxuICAgIHRlcm1zID0gcmVxdWlyZSgnLi9zZXR0aW5ncy9kaWN0aW9uYXJ5JykuY29sb3JzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICAgIGRlZmF1bHRQcm9wczoge1xuICAgICAgICBSZWQ6IGNvbG9yRGVmYXVsdHMsXG4gICAgICAgIEdyZWVuOiBjb2xvckRlZmF1bHRzLFxuICAgICAgICBCbHVlOiBjb2xvckRlZmF1bHRzLFxuICAgICAgICBBbHBoYTogZGVmYXVsdFByb3BzLm9wYWNpdHlcbiAgICB9LFxuXG4gICAgdGVzdDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiAodmFsdWUgJiYgdmFsdWUuaW5kZXhPZigncmdiJykgPiAtMSk7XG4gICAgfSxcbiAgICBcbiAgICBzcGxpdDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBnZXRDb2xvclZhbHVlcyh2YWx1ZSwgdGVybXMpO1xuICAgIH0sXG5cbiAgICBjb21iaW5lOiBmdW5jdGlvbiAodmFsdWVzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbkNyZWF0ZShjcmVhdGVEZWxpbWl0ZWQodmFsdWVzLCB0ZXJtcywgJywgJywgMiksICdyZ2JhJyk7XG4gICAgfVxufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92YWx1ZS10eXBlcy9yZ2IuanNcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHJnYiA9IHJlcXVpcmUoJy4vcmdiJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gICAgZGVmYXVsdFByb3BzOiByZ2IuZGVmYXVsdFByb3BzLFxuXG4gICAgdGVzdDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiAodmFsdWUgJiYgdmFsdWUuaW5kZXhPZignIycpID4gLTEpO1xuICAgIH0sXG4gICAgXG4gICAgc3BsaXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB2YXIgciwgZywgYjtcblxuICAgICAgICAvLyBJZiB3ZSBoYXZlIDYgY2hhcmFjdGVycywgaWUgI0ZGMDAwMFxuICAgICAgICBpZiAodmFsdWUubGVuZ3RoID4gNCkge1xuICAgICAgICAgICAgciA9IHZhbHVlLnN1YnN0cigxLCAyKTtcbiAgICAgICAgICAgIGcgPSB2YWx1ZS5zdWJzdHIoMywgMik7XG4gICAgICAgICAgICBiID0gdmFsdWUuc3Vic3RyKDUsIDIpO1xuXG4gICAgICAgIC8vIE9yIHdlIGhhdmUgMyBjaGFyYWN0ZXJzLCBpZSAjRjAwXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByID0gdmFsdWUuc3Vic3RyKDEsIDEpO1xuICAgICAgICAgICAgZyA9IHZhbHVlLnN1YnN0cigyLCAxKTtcbiAgICAgICAgICAgIGIgPSB2YWx1ZS5zdWJzdHIoMywgMSk7XG4gICAgICAgICAgICByICs9IHI7XG4gICAgICAgICAgICBnICs9IGc7XG4gICAgICAgICAgICBiICs9IGI7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgUmVkOiBwYXJzZUludChyLCAxNiksXG4gICAgICAgICAgICBHcmVlbjogcGFyc2VJbnQoZywgMTYpLFxuICAgICAgICAgICAgQmx1ZTogcGFyc2VJbnQoYiwgMTYpLFxuICAgICAgICAgICAgQWxwaGE6IDFcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgY29tYmluZTogZnVuY3Rpb24gKHZhbHVlcykge1xuICAgICAgICByZXR1cm4gcmdiLmNvbWJpbmUodmFsdWVzKTtcbiAgICB9XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3ZhbHVlLXR5cGVzL2hleC5qc1xuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi9pbmMvdXRpbHMnKSxcbiAgICByZ2IgPSByZXF1aXJlKCcuL3JnYicpLFxuICAgIGhzbCA9IHJlcXVpcmUoJy4vaHNsJyksXG4gICAgaGV4ID0gcmVxdWlyZSgnLi9oZXgnKSxcbiAgICBzdXBwb3J0ZWQgPSBbcmdiLCBoc2wsIGhleF0sXG4gICAgbnVtU3VwcG9ydGVkID0gMyxcblxuICAgIHJ1blN1cHBvcnRlZCA9IGZ1bmN0aW9uIChtZXRob2QsIHZhbHVlKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtU3VwcG9ydGVkOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChzdXBwb3J0ZWRbaV0udGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3VwcG9ydGVkW2ldW21ldGhvZF0odmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgICBkZWZhdWx0UHJvcHM6IHV0aWxzLm1lcmdlKHJnYi5kZWZhdWx0UHJvcHMsIGhzbC5kZWZhdWx0UHJvcHMpLFxuXG4gICAgdGVzdDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiByZ2IudGVzdCh2YWx1ZSkgfHwgaGV4LnRlc3QodmFsdWUpIHx8IGhzbC50ZXN0KHZhbHVlKTtcbiAgICB9LFxuXG4gICAgc3BsaXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gcnVuU3VwcG9ydGVkKCdzcGxpdCcsIHZhbHVlKTtcbiAgICB9LFxuXG4gICAgY29tYmluZTogZnVuY3Rpb24gKHZhbHVlcykge1xuICAgICAgICByZXR1cm4gKHZhbHVlcy5SZWQgIT09IHVuZGVmaW5lZCkgPyByZ2IuY29tYmluZSh2YWx1ZXMpIDogaHNsLmNvbWJpbmUodmFsdWVzKTtcbiAgICB9XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3ZhbHVlLXR5cGVzL2NvbG9yLmpzXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBjcmVhdGVEZWxpbWl0ZWQgPSByZXF1aXJlKCcuL21hbmlwdWxhdG9ycy9jcmVhdGUtZGVsaW1pdGVkJyksXG4gICAgcHhEZWZhdWx0cyA9IHJlcXVpcmUoJy4vcHgnKS5kZWZhdWx0UHJvcHMsXG4gICAgc3BsaXRTcGFjZURlbGltaXRlZCA9IHJlcXVpcmUoJy4vbWFuaXB1bGF0b3JzL3NwbGl0LXNwYWNlLWRlbGltaXRlZCcpLFxuICAgIHRlcm1zID0gcmVxdWlyZSgnLi9zZXR0aW5ncy9kaWN0aW9uYXJ5JykucG9zaXRpb25zO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICAgIGRlZmF1bHRQcm9wczogcHhEZWZhdWx0cyxcbiAgICAgICAgXG4gICAgLypcbiAgICAgICAgU3BsaXQgcG9zaXRpb25zIGluIGZvcm1hdCBcIlggWSBaXCJcbiAgICAgICAgXG4gICAgICAgIEBwYXJhbSBbc3RyaW5nXTogUG9zaXRpb24gdmFsdWVzXG4gICAgICAgICAgICBcIjIwJSAzMCUgMFwiIC0+IHsyMCUsIDMwJSwgMH1cbiAgICAgICAgICAgIFwiMjAlIDMwJVwiIC0+IHsyMCUsIDMwJX1cbiAgICAgICAgICAgIFwiMjAlXCIgLT4gezIwJSwgMjAlfVxuICAgICovXG4gICAgc3BsaXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB2YXIgcG9zaXRpb25zID0gc3BsaXRTcGFjZURlbGltaXRlZCh2YWx1ZSksXG4gICAgICAgICAgICBudW1Qb3NpdGlvbnMgPSBwb3NpdGlvbnMubGVuZ3RoLFxuICAgICAgICAgICAgc3BsaXRWYWx1ZSA9IHtcbiAgICAgICAgICAgICAgICBYOiBwb3NpdGlvbnNbMF0sXG4gICAgICAgICAgICAgICAgWTogKG51bVBvc2l0aW9ucyA+IDEpID8gcG9zaXRpb25zWzFdIDogcG9zaXRpb25zWzBdXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIGlmIChudW1Qb3NpdGlvbnMgPiAyKSB7XG4gICAgICAgICAgICBzcGxpdFZhbHVlLlogPSBwb3NpdGlvbnNbMl07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3BsaXRWYWx1ZTtcbiAgICB9LFxuXG4gICAgY29tYmluZTogZnVuY3Rpb24gKHZhbHVlcykge1xuICAgICAgICByZXR1cm4gY3JlYXRlRGVsaW1pdGVkKHZhbHVlcywgdGVybXMsICcgJyk7XG4gICAgfVxufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92YWx1ZS10eXBlcy9wb3NpdGlvbnMuanNcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHRlcm1zID0gcmVxdWlyZSgnLi9zZXR0aW5ncy9kaWN0aW9uYXJ5JykuZGltZW5zaW9ucyxcbiAgICBweERlZmF1bHRzID0gcmVxdWlyZSgnLi9weCcpLmRlZmF1bHRQcm9wcyxcbiAgICBjcmVhdGVEZWxpbWl0ZWQgPSByZXF1aXJlKCcuL21hbmlwdWxhdG9ycy9jcmVhdGUtZGVsaW1pdGVkJyksXG4gICAgc3BsaXRTcGFjZURlbGltaXRlZCA9IHJlcXVpcmUoJy4vbWFuaXB1bGF0b3JzL3NwbGl0LXNwYWNlLWRlbGltaXRlZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICAgIGRlZmF1bHRQcm9wczogcHhEZWZhdWx0cyxcbiAgICBcbiAgICAvKlxuICAgICAgICBTcGxpdCBkaW1lbnNpb25zIGluIGZvcm1hdCBcIlRvcCBSaWdodCBCb3R0b20gTGVmdFwiXG4gICAgICAgIFxuICAgICAgICBAcGFyYW0gW3N0cmluZ106IERpbWVuc2lvbiB2YWx1ZXNcbiAgICAgICAgICAgIFwiMjBweCAwIDMwcHggNDBweFwiIC0+IHsyMHB4LCAwLCAzMHB4LCA0MHB4fVxuICAgICAgICAgICAgXCIyMHB4IDAgMzBweFwiIC0+IHsyMHB4LCAwLCAzMHB4LCAwfVxuICAgICAgICAgICAgXCIyMHB4IDBcIiAtPiB7MjBweCwgMCwgMjBweCwgMH1cbiAgICAgICAgICAgIFwiMjBweFwiIC0+IHsyMHB4LCAyMHB4LCAyMHB4LCAyMHB4fVxuICAgICAgICBcbiAgICAgICAgQHJldHVybiBbb2JqZWN0XTogT2JqZWN0IHdpdGggVC9SL0IvTCBtZXRyaWNzXG4gICAgKi9cbiAgICBzcGxpdDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHZhciBkaW1lbnNpb25zID0gc3BsaXRTcGFjZURlbGltaXRlZCh2YWx1ZSksXG4gICAgICAgICAgICBudW1EaW1lbnNpb25zID0gZGltZW5zaW9ucy5sZW5ndGgsXG4gICAgICAgICAgICBqdW1wQmFjayA9IChudW1EaW1lbnNpb25zICE9PSAxKSA/IDIgOiAxLFxuICAgICAgICAgICAgaSA9IDAsXG4gICAgICAgICAgICBqID0gMCxcbiAgICAgICAgICAgIHNwbGl0VmFsdWUgPSB7fTtcblxuICAgICAgICBmb3IgKDsgaSA8IDQ7IGkrKykge1xuICAgICAgICAgICAgc3BsaXRWYWx1ZVt0ZXJtc1tpXV0gPSBkaW1lbnNpb25zW2pdO1xuXG4gICAgICAgICAgICAvLyBKdW1wIGJhY2sgKHRvIHN0YXJ0KSBjb3VudGVyIGlmIHdlJ3ZlIHJlYWNoZWQgdGhlIGVuZCBvZiBvdXIgdmFsdWVzXG4gICAgICAgICAgICBqKys7XG4gICAgICAgICAgICBqID0gKGogPT09IG51bURpbWVuc2lvbnMpID8gaiAtIGp1bXBCYWNrIDogajtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzcGxpdFZhbHVlO1xuICAgIH0sXG5cbiAgICBjb21iaW5lOiBmdW5jdGlvbiAodmFsdWVzKSB7XG4gICAgICAgIHJldHVybiBjcmVhdGVEZWxpbWl0ZWQodmFsdWVzLCB0ZXJtcywgJyAnKTtcbiAgICB9XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3ZhbHVlLXR5cGVzL2RpbWVuc2lvbnMuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBkZWZhdWx0UHJvcHM6IHtcbiAgICAgICAgaW5pdDogMVxuICAgIH1cbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdmFsdWUtdHlwZXMvc2NhbGUuanNcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGNvbG9yID0gcmVxdWlyZSgnLi9jb2xvcicpLFxuICAgIHV0aWxzID0gcmVxdWlyZSgnLi4vaW5jL3V0aWxzJyksXG4gICAgcHhEZWZhdWx0cyA9IHJlcXVpcmUoJy4vcHgnKS5kZWZhdWx0UHJvcHMsXG4gICAgdGVybXMgPSByZXF1aXJlKCcuL3NldHRpbmdzL2RpY3Rpb25hcnknKS5zaGFkb3csXG4gICAgc3BsaXRTcGFjZURlbGltaXRlZCA9IHJlcXVpcmUoJy4vbWFuaXB1bGF0b3JzL3NwbGl0LXNwYWNlLWRlbGltaXRlZCcpLFxuICAgIGNyZWF0ZURlbGltaXRlZCA9IHJlcXVpcmUoJy4vbWFuaXB1bGF0b3JzL2NyZWF0ZS1kZWxpbWl0ZWQnKSxcbiAgICBzaGFkb3dUZXJtcyA9IHRlcm1zLnNsaWNlKDAsNCk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gICAgZGVmYXVsdFByb3BzOiB1dGlscy5tZXJnZShjb2xvci5kZWZhdWx0UHJvcHMsIHtcbiAgICAgICAgWDogcHhEZWZhdWx0cyxcbiAgICAgICAgWTogcHhEZWZhdWx0cyxcbiAgICAgICAgUmFkaXVzOiBweERlZmF1bHRzLFxuICAgICAgICBTcHJlYWQ6IHB4RGVmYXVsdHNcbiAgICB9KSxcblxuICAgIC8qXG4gICAgICAgIFNwbGl0IHNoYWRvdyBwcm9wZXJ0aWVzIFwiWCBZIFJhZGl1cyBTcHJlYWQgQ29sb3JcIlxuICAgICAgICBcbiAgICAgICAgQHBhcmFtIFtzdHJpbmddOiBTaGFkb3cgcHJvcGVydHlcbiAgICAgICAgQHJldHVybiBbb2JqZWN0XVxuICAgICovXG4gICAgc3BsaXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB2YXIgYml0cyA9IHNwbGl0U3BhY2VEZWxpbWl0ZWQodmFsdWUpLFxuICAgICAgICAgICAgbnVtQml0cyA9IGJpdHMubGVuZ3RoLFxuICAgICAgICAgICAgaGFzUmVhY2hlZENvbG9yID0gZmFsc2UsXG4gICAgICAgICAgICBjb2xvclByb3AgPSAnJyxcbiAgICAgICAgICAgIHRoaXNCaXQsXG4gICAgICAgICAgICBpID0gMCxcbiAgICAgICAgICAgIHNwbGl0VmFsdWUgPSB7fTtcblxuICAgICAgICBmb3IgKDsgaSA8IG51bUJpdHM7IGkrKykge1xuICAgICAgICAgICAgdGhpc0JpdCA9IGJpdHNbaV07XG5cbiAgICAgICAgICAgIC8vIElmIHdlJ3ZlIHJlYWNoZWQgdGhlIGNvbG9yIHByb3BlcnR5LCBhcHBlbmQgdG8gY29sb3Igc3RyaW5nXG4gICAgICAgICAgICBpZiAoaGFzUmVhY2hlZENvbG9yIHx8IGNvbG9yLnRlc3QodGhpc0JpdCkpIHtcbiAgICAgICAgICAgICAgICBoYXNSZWFjaGVkQ29sb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGNvbG9yUHJvcCArPSB0aGlzQml0O1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNwbGl0VmFsdWVbdGVybXNbaV1dID0gdGhpc0JpdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHV0aWxzLm1lcmdlKHNwbGl0VmFsdWUsIGNvbG9yLnNwbGl0KGNvbG9yUHJvcCkpO1xuICAgIH0sXG5cbiAgICBjb21iaW5lOiBmdW5jdGlvbiAodmFsdWVzKSB7XG4gICAgICAgIHJldHVybiBjcmVhdGVEZWxpbWl0ZWQodmFsdWVzLCBzaGFkb3dUZXJtcywgJyAnKSArIGNvbG9yLmNvbWJpbmUodmFsdWVzKTtcbiAgICB9XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3ZhbHVlLXR5cGVzL3NoYWRvdy5qc1xuICoqLyIsInZhciB1dGlscyA9IHJlcXVpcmUoJy4uL2luYy91dGlscycpLFxuICAgIGVhY2ggPSB1dGlscy5lYWNoLFxuICAgIGZsb2F0UmVnZXggPSAvKC0pPyhcXGRbXFxkXFwuXSopL2csXG5cbiAgICBnZW5lcmF0ZVRva2VuID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICByZXR1cm4gJyR7JyArIGtleSArICd9JztcbiAgICB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB0ZXN0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdmFyIG1hdGNoZXMgPSB2YWx1ZS5tYXRjaChmbG9hdFJlZ2V4KTtcbiAgICAgICAgcmV0dXJuICh1dGlscy5pc0FycmF5KG1hdGNoZXMpICYmIG1hdGNoZXMubGVuZ3RoID4gMSk7XG4gICAgfSxcblxuICAgIHRlbXBsYXRlOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdmFyIGNvdW50ZXIgPSAwO1xuICAgICAgICByZXR1cm4gdmFsdWUucmVwbGFjZShmbG9hdFJlZ2V4LCAoKSA9PiBnZW5lcmF0ZVRva2VuKGNvdW50ZXIrKykpO1xuICAgIH0sXG5cbiAgICBzcGxpdDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHZhciBzcGxpdFZhbHVlID0ge30sXG4gICAgICAgICAgICBtYXRjaGVzID0gdmFsdWUubWF0Y2goZmxvYXRSZWdleCksXG4gICAgICAgICAgICBudW1NYXRjaGVzID0gbWF0Y2hlcy5sZW5ndGg7XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bU1hdGNoZXM7IGkrKykge1xuICAgICAgICAgICAgc3BsaXRWYWx1ZVtpXSA9IG1hdGNoZXNbaV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3BsaXRWYWx1ZTtcbiAgICB9LFxuXG4gICAgY29tYmluZTogZnVuY3Rpb24gKHZhbHVlcywgdGVtcGxhdGUpIHtcbiAgICAgICAgdmFyIGNvbWJpbmVkVmFsdWUgPSB0ZW1wbGF0ZTtcblxuICAgICAgICBlYWNoKHZhbHVlcywgKGtleSwgdmFsdWUpID0+IHtcbiAgICAgICAgICAgIGNvbWJpbmVkVmFsdWUgPSBjb21iaW5lZFZhbHVlLnJlcGxhY2UoZ2VuZXJhdGVUb2tlbihrZXkpLCB2YWx1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBjb21iaW5lZFZhbHVlO1xuICAgIH1cbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdmFsdWUtdHlwZXMvY29tcGxleC5qc1xuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgUm9sZSA9IHJlcXVpcmUoJy4uL1JvbGUnKTtcbnZhciBlYWNoID0gcmVxdWlyZSgnLi4vLi4vaW5jL3V0aWxzJykuZWFjaDtcblxudmFyIGF0dHJSb2xlID0gbmV3IFJvbGUoe1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gKHN0YXRlKSB7XG4gICAgICAgIHZhciBhY3RvciA9IHRoaXM7XG5cbiAgICAgICAgZWFjaChzdGF0ZSwgZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgICAgICAgIGF0dHJSb2xlLnNldChhY3Rvci5lbGVtZW50LCBrZXksIHZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIGdldDogZnVuY3Rpb24gKGVsZW1lbnQsIGtleSkge1xuICAgICAgICByZXR1cm4gZWxlbWVudC5nZXRBdHRyaWJ1dGUoa2V5KTtcbiAgICB9LFxuXG4gICAgc2V0OiBmdW5jdGlvbiAoZWxlbWVudCwga2V5LCB2YWx1ZSkge1xuICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBhdHRyUm9sZTtcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcm9sZXMvYXR0ci9hdHRyUm9sZS5qc1xuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgUm9sZSA9IHJlcXVpcmUoJy4uL1JvbGUnKTtcbnZhciBidWlsZCA9IHJlcXVpcmUoJy4vYnVpbGQnKTtcbnZhciBlYWNoID0gcmVxdWlyZSgnLi4vLi4vaW5jL3V0aWxzJykuZWFjaDtcblxudmFyIHByZWZpeGVzID0gWydXZWJraXQnLCdNb3onLCdPJywnbXMnLCAnJ107XG52YXIgbnVtUHJlZml4ZXMgPSBwcmVmaXhlcy5sZW5ndGg7XG52YXIgcHJvcGVydHlOYW1lQ2FjaGUgPSB7fTtcbnZhciB0ZXN0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgICAgICBcbi8qXG4gICAgVGVzdCBzdHlsZSBwcm9wZXJ0eSBmb3IgcHJlZml4ZWQgdmVyc2lvblxuICAgIFxuICAgIEBwYXJhbSBbc3RyaW5nXTogU3R5bGUgcHJvcGVydHlcbiAgICBAcmV0dXJuIFtzdHJpbmddOiBDYWNoZWQgcHJvcGVydHkgbmFtZVxuKi9cbnZhciB0ZXN0UHJlZml4ID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBpZiAocHJvcGVydHlOYW1lQ2FjaGVba2V5XSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByb3BlcnR5TmFtZUNhY2hlW2tleV0gPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtUHJlZml4ZXM7IGkrKykge1xuICAgICAgICAgICAgdmFyIHByZWZpeCA9IHByZWZpeGVzW2ldLFxuICAgICAgICAgICAgICAgIHByZWZpeGVkID0gKHByZWZpeCA9PT0gJycpID8ga2V5IDogcHJlZml4ICsga2V5LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsga2V5LnNsaWNlKDEpO1xuXG4gICAgICAgICAgICBpZiAocHJlZml4ZWQgaW4gdGVzdEVsZW1lbnQuc3R5bGUpIHtcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eU5hbWVDYWNoZVtrZXldID0gcHJlZml4ZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBwcm9wZXJ0eU5hbWVDYWNoZVtrZXldO1xuICAgIH07XG5cbnZhciBjc3NSb2xlID0gbmV3IFJvbGUoe1xuICAgIF9tYXA6IHJlcXVpcmUoJy4vbWFwJyksXG4gICAgX3R5cGVNYXA6IHJlcXVpcmUoJy4vdHlwZS1tYXAnKSxcblxuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fY3NzQ2FjaGUgPSB7fTtcbiAgICB9LFxuXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgICAgICAgdmFyIGFjdG9yID0gdGhpcztcblxuICAgICAgICBlYWNoKGJ1aWxkKHN0YXRlLCBhY3Rvci5fY3NzQ2FjaGUpLCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgICAgICAgY3NzUm9sZS5zZXQoYWN0b3IuZWxlbWVudCwga2V5LCB2YWx1ZSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBnZXQ6IGZ1bmN0aW9uIChlbGVtZW50LCBrZXkpIHtcbiAgICAgICAga2V5ID0gcHJvcGVydHlOYW1lQ2FjaGVba2V5XSB8fCB0ZXN0UHJlZml4KGtleSk7XG5cbiAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQsIG51bGwpW2tleV07XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2V0OiBmdW5jdGlvbiAoZWxlbWVudCwga2V5LCB2YWx1ZSkge1xuICAgICAgICBrZXkgPSBwcm9wZXJ0eU5hbWVDYWNoZVtrZXldIHx8IHRlc3RQcmVmaXgoa2V5KTtcblxuICAgICAgICBpZiAoa2V5KSB7XG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gY3NzUm9sZTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9yb2xlcy9jc3MvY3NzUm9sZS5qc1xuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgUm9sZSA9IHJlcXVpcmUoJy4uL1JvbGUnKSxcbiAgICBhdHRyUm9sZSA9IHJlcXVpcmUoJy4uL2F0dHIvYXR0clJvbGUnKSxcbiAgICBidWlsZCA9IHJlcXVpcmUoJy4vYnVpbGQnKSxcbiAgICBlYWNoID0gcmVxdWlyZSgnLi4vLi4vaW5jL3V0aWxzJykuZWFjaDtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgUm9sZSh7XG4gICAgbmFtZTogJ3N2ZycsXG5cbiAgICBfbWFwOiByZXF1aXJlKCcuLi9jc3MvbWFwJyksXG4gICAgX3R5cGVNYXA6IHJlcXVpcmUoJy4vdHlwZS1tYXAnKSxcblxuICAgIHN0YXJ0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBib3VuZGluZ0JveCA9IHRoaXMuZWxlbWVudC5nZXRCQm94KCksXG4gICAgICAgICAgICB2YWx1ZXMgPSB0aGlzLnZhbHVlcyxcbiAgICAgICAgICAgIC8vIFRPRE86IFN1cHBvcnQgcHhcbiAgICAgICAgICAgIHRyYW5zZm9ybU9yaWdpblggPSB2YWx1ZXMudHJhbnNmb3JtT3JpZ2luWCA/IHZhbHVlcy50cmFuc2Zvcm1PcmlnaW5YLmN1cnJlbnQgOiA1MCxcbiAgICAgICAgICAgIHRyYW5zZm9ybU9yaWdpblkgPSB2YWx1ZXMudHJhbnNmb3JtT3JpZ2luWSA/IHZhbHVlcy50cmFuc2Zvcm1PcmlnaW5ZLmN1cnJlbnQgOiA1MCxcbiAgICAgICAgICAgIG9yaWdpbiA9IHtcbiAgICAgICAgICAgICAgICB4OiBib3VuZGluZ0JveC53aWR0aCAqICh0cmFuc2Zvcm1PcmlnaW5YIC8gMTAwKSArIGJvdW5kaW5nQm94LngsXG4gICAgICAgICAgICAgICAgeTogYm91bmRpbmdCb3guaGVpZ2h0ICogKHRyYW5zZm9ybU9yaWdpblkgLyAxMDApICsgYm91bmRpbmdCb3gueVxuICAgICAgICAgICAgfTtcblxuICAgICAgICB0aGlzLnN2Z09yaWdpbiA9IG9yaWdpbjtcbiAgICB9LFxuXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgICAgICAgdmFyIGFjdG9yID0gdGhpcztcbiAgICAgICAgZWFjaChidWlsZChzdGF0ZSwgdGhpcy5zdmdPcmlnaW4pLCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgICAgICAgYXR0clJvbGUuc2V0KGFjdG9yLmVsZW1lbnQsIGtleSwgdmFsdWUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3JvbGVzL3N2Zy9zdmdSb2xlLmpzXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBSb2xlID0gcmVxdWlyZSgnLi4vUm9sZScpO1xudmFyIGF0dHJSb2xlID0gcmVxdWlyZSgnLi4vYXR0ci9hdHRyUm9sZScpO1xudmFyIGVhY2ggPSByZXF1aXJlKCcuLi8uLi9pbmMvdXRpbHMnKS5lYWNoO1xuXG4vKlxuICAgIENvbnZlcnQgcGVyY2VudGFnZSB0byBwaXhlbHNcbiAgICBcbiAgICBAcGFyYW0gW251bWJlcl06IFBlcmNlbnRhZ2Ugb2YgdG90YWwgbGVuZ3RoXG4gICAgQHBhcmFtIFtudW1iZXJdOiBUb3RhbCBsZW5ndGhcbiovXG52YXIgcGVyY2VudFRvUGl4ZWxzID0gZnVuY3Rpb24gKHBlcmNlbnRhZ2UsIGxlbmd0aCkge1xuICAgIHJldHVybiAocGFyc2VGbG9hdChwZXJjZW50YWdlKSAvIDEwMCkgKiBsZW5ndGggKyAncHgnO1xufTtcblxuLypcbiAgICBDcmVhdGUgc3R5bGVzXG4gICAgXG4gICAgQHBhcmFtIFtvYmplY3RdOiBTVkcgUGF0aCBwcm9wZXJ0aWVzXG4gICAgQHBhcmFtIFtvYmplY3RdOiBMZW5ndGggb2YgcGF0aFxuICAgIEByZXR1cm5zIFtvYmplY3RdOiBLZXkvdmFsdWUgcGFpcnMgb2YgdmFsaWQgQ1NTIHByb3BlcnRpZXNcbiovXG52YXIgY3JlYXRlU3R5bGVzID0gZnVuY3Rpb24gKHByb3BzLCBsZW5ndGgpIHtcbiAgICB2YXIgaGFzRGFzaEFycmF5ID0gZmFsc2UsXG4gICAgICAgIGRhc2hBcnJheVN0eWxlcyA9IHtcbiAgICAgICAgICAgIGxlbmd0aDogMCxcbiAgICAgICAgICAgIHNwYWNpbmc6IGxlbmd0aCArICdweCdcbiAgICAgICAgfSxcbiAgICAgICAgc3R5bGVzID0ge307XG5cbiAgICBlYWNoKHByb3BzLCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgICBrZXkgPSBTVkdEcmF3UGF0aC5fbWFwW2tleV0gfHwga2V5O1xuXG4gICAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgICAgICBjYXNlICdsZW5ndGgnOlxuICAgICAgICAgICAgY2FzZSAnc3BhY2luZyc6XG4gICAgICAgICAgICAgICAgaGFzRGFzaEFycmF5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBkYXNoQXJyYXlTdHlsZXNba2V5XSA9IHBlcmNlbnRUb1BpeGVscyh2YWx1ZSwgbGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ29mZnNldCc6XG4gICAgICAgICAgICAgICAgc3R5bGVzWydzdHJva2UtZGFzaG9mZnNldCddID0gcGVyY2VudFRvUGl4ZWxzKC12YWx1ZSwgbGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgc3R5bGVzW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKGhhc0Rhc2hBcnJheSkge1xuICAgICAgICBzdHlsZXNbJ3N0cm9rZS1kYXNoYXJyYXknXSA9IGRhc2hBcnJheVN0eWxlcy5sZW5ndGggKyAnICcgKyBkYXNoQXJyYXlTdHlsZXMuc3BhY2luZztcbiAgICB9XG5cbiAgICByZXR1cm4gc3R5bGVzO1xufTtcblxuLypcbiAgICBEcmF3IFBhdGggcm9sZVxuKi9cbnZhciBTVkdEcmF3UGF0aCA9IG5ldyBSb2xlKHtcbiAgICBfbWFwOiByZXF1aXJlKCcuL21hcCcpLFxuXG4gICAgX3R5cGVNYXA6IHtcbiAgICAgICAgc3Ryb2tlOiAnY29sb3InLFxuICAgICAgICBkOiAnY29tcGxleCdcbiAgICB9LFxuXG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnBhdGhMZW5ndGggPSB0aGlzLmVsZW1lbnQuZ2V0VG90YWxMZW5ndGgoKTtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgICAgVXBkYXRlIGBwYXRoYCBzdHlsZXMgYW5kIGlmIGBlbGVtZW50YCBpcyBwcmVzZW50LCBzZXRcbiAgICAgICAgeCwgeSBhbmQgcm90YXRpb25cbiAgICAqL1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gKHN0YXRlKSB7XG4gICAgICAgIGF0dHJSb2xlLnVwZGF0ZS5jYWxsKHRoaXMsIGNyZWF0ZVN0eWxlcyhzdGF0ZSwgdGhpcy5wYXRoTGVuZ3RoKSk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gU1ZHRHJhd1BhdGg7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcm9sZXMvcGF0aC9kcmF3UGF0aFJvbGUuanNcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIE1vZE1hbmFnZXIgPSByZXF1aXJlKCcuLi9pbmMvTW9kTWFuYWdlcicpLFxuICAgIHZhbHVlVHlwZU1hbmFnZXIgPSBuZXcgTW9kTWFuYWdlcigpO1xuXG52YWx1ZVR5cGVNYW5hZ2VyLmRlZmF1bHRQcm9wcyA9IGZ1bmN0aW9uICh0eXBlLCBrZXkpIHtcbiAgICB2YXIgdmFsdWVUeXBlID0gdGhpc1t0eXBlXSxcbiAgICAgICAgZGVmYXVsdFByb3BzID0gKHZhbHVlVHlwZS5kZWZhdWx0UHJvcHMpID8gdmFsdWVUeXBlLmRlZmF1bHRQcm9wc1trZXldIHx8IHZhbHVlVHlwZS5kZWZhdWx0UHJvcHMgOiB7fTtcblxuICAgIHJldHVybiBkZWZhdWx0UHJvcHM7XG59O1xuXG52YWx1ZVR5cGVNYW5hZ2VyLnRlc3QgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICB2YXIgdHlwZSA9IGZhbHNlO1xuXG4gICAgdGhpcy5lYWNoKGZ1bmN0aW9uIChrZXksIG1vZCkge1xuICAgICAgICBpZiAobW9kLnRlc3QgJiYgbW9kLnRlc3QodmFsdWUpKSB7XG4gICAgICAgICAgICB0eXBlID0ga2V5O1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdHlwZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gdmFsdWVUeXBlTWFuYWdlcjtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92YWx1ZS10eXBlcy9tYW5hZ2VyLmpzXG4gKiovIiwiLypcbiAgICBDcmVhdGUgYW4gQWN0b3JDb2xsZWN0aW9uIGJhc2VkIG9uIGEgc2VsZWN0aW9uIG9mIERPTSBub2Rlc1xuXG4gICAgQHBhcmFtIFtzdHJpbmcgfHwgTm9kZUxpc3QgfHwgalF1ZXJ5IG9iamVjdF06XG4gICAgICAgIElmIHN0cmluZywgdHJlYXRlZCBhcyBzZWxlY3Rvci5cbiAgICAgICAgSWYgbm90LCB0cmVhdGVkIGFzIHByZWV4aXN0aW5nIE5vZGVMaXN0IHx8IGpRdWVyeSBvYmplY3QuXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICB2YXIgbm9kZXMgPSAodHlwZW9mIHNlbGVjdG9yID09PSAnc3RyaW5nJykgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSA6IHNlbGVjdG9yLFxuICAgICAgICBlbGVtZW50cyA9IFtdO1xuXG4gICAgLy8gSWYgalF1ZXJ5IHNlbGVjdGlvbiwgZ2V0IGFycmF5IG9mIEVsZW1lbnRzXG4gICAgaWYgKG5vZGVzLmdldCkge1xuICAgICAgICBlbGVtZW50cyA9IG5vZGVzLmdldCgpO1xuXG4gICAgLy8gT3IgY29udmVydCBOb2RlTGlzdCB0byBhcnJheVxuICAgIH0gZWxzZSBpZiAobm9kZXMubGVuZ3RoKSB7XG4gICAgICAgIGVsZW1lbnRzID0gW10uc2xpY2UuY2FsbChub2Rlcyk7XG5cbiAgICAvLyBPciBpZiBpdCdzIGp1c3QgYW4gRWxlbWVudCwgcHV0IGludG8gYXJyYXlcbiAgICB9IGVsc2Uge1xuICAgICAgICBlbGVtZW50cy5wdXNoKG5vZGVzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZWxlbWVudHM7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2FjdG9yL3NlbGVjdC5qc1xuICoqLyIsInZhciBQcm9jZXNzID0gcmVxdWlyZSgnLi4vcHJvY2Vzcy9Qcm9jZXNzJyksXG4gICAgUXVldWUgPSByZXF1aXJlKCcuLi9pbmMvUXVldWUnKSxcbiAgICB1dGlscyA9IHJlcXVpcmUoJy4uL2luYy91dGlscycpLFxuICAgIHVwZGF0ZSA9IHJlcXVpcmUoJy4vdXBkYXRlJyksXG4gICAgdmFsdWVPcHMgPSByZXF1aXJlKCcuL3ZhbHVlLW9wZXJhdGlvbnMnKSxcbiAgICBzZWxlY3QgPSByZXF1aXJlKCcuL3NlbGVjdCcpLFxuXG4gICAgLypcbiAgICAgICAgUm9sZSBpbXBvcnRzXG4gICAgKi9cbiAgICBkZWZhdWx0Um9sZSA9IHJlcXVpcmUoJy4uL3JvbGVzL2RlZmF1bHRSb2xlJyksXG4gICAgY3NzUm9sZSA9IHJlcXVpcmUoJy4uL3JvbGVzL2Nzcy9jc3NSb2xlJyksXG4gICAgc3ZnUm9sZSA9IHJlcXVpcmUoJy4uL3JvbGVzL3N2Zy9zdmdSb2xlJyksXG4gICAgZHJhd1BhdGhSb2xlID0gcmVxdWlyZSgnLi4vcm9sZXMvcGF0aC9kcmF3UGF0aFJvbGUnKSxcblxuICAgIEFjdGlvbiA9IHJlcXVpcmUoJy4uL2FjdGlvbnMvQWN0aW9uJyksXG4gICAgZWFjaCA9IHV0aWxzLmVhY2g7XG5cbmNsYXNzIEFjdG9yIHtcblxuICAgIC8qXG4gICAgICAgIEBwYXJhbSBbb2JqZWN0XVxuICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0cyA9IHt9KSB7XG4gICAgICAgIHZhciBwcm9wcyA9IHV0aWxzLmlzU3RyaW5nKG9wdHMpID8geyBlbGVtZW50OiBvcHRzIH0gOiBvcHRzO1xuXG4gICAgICAgIHRoaXMudmFsdWVzID0ge307XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7IHZhbHVlczoge30gfTtcbiAgICAgICAgdGhpcy5xdWV1ZSA9IG5ldyBRdWV1ZSgpO1xuICAgICAgICB0aGlzLnByb2Nlc3MgPSBuZXcgUHJvY2Vzcyh0aGlzLCB1cGRhdGUpO1xuICAgICAgICB0aGlzLmFjdGl2ZUFjdGlvbnMgPSB7fTtcbiAgICAgICAgdGhpcy5udW1BY3RpdmUgPSAwO1xuICAgICAgICB0aGlzLmFjdGlvbkNvdW50ZXIgPSAwO1xuICAgICAgICB0aGlzLmFjdGl2ZVZhbHVlcyA9IFtdO1xuICAgICAgICB0aGlzLmFjdGl2ZVBhcmVudHMgPSBbXTtcblxuICAgICAgICAvLyBHZXQgYWN0dWFsIGVsZW1lbnRzIGlmIHRoaXMgaXMgYSBzZWxlY3RvclxuICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcocHJvcHMuZWxlbWVudCkpIHtcbiAgICAgICAgICAgIHByb3BzLmVsZW1lbnQgPSBzZWxlY3QocHJvcHMuZWxlbWVudClbMF07XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFzc2lnblJvbGVzKHByb3BzLmVsZW1lbnQsIHByb3BzLmFzLCB0cnVlKTtcbiAgICAgICAgdGhpcy5zZXQocHJvcHMpO1xuICAgICAgICB0aGlzLmluaXRSb2xlcygpO1xuICAgIH1cblxuICAgIC8qXG4gICAgICAgIFNldCBBY3RvciBwcm9wZXJ0aWVzIGFuZCB2YWx1ZXNcblxuICAgICAgICBAcGFyYW0gW29iamVjdF1cbiAgICAgICAgQHJldHVybnMgW0FjdG9yXVxuICAgICovXG4gICAgc2V0KG9wdHMpIHtcbiAgICAgICAgZWFjaChvcHRzLCAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGtleSAhPT0gJ3ZhbHVlcycgJiYga2V5ICE9PSAnYWN0aW9uJykge1xuICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAob3B0cyAmJiBvcHRzLnZhbHVlcykge1xuICAgICAgICAgICAgdGhpcy52YWx1ZXMgPSB2YWx1ZU9wcy5wcm9jZXNzKHRoaXMudmFsdWVzLCBvcHRzLnZhbHVlcywgb3B0cywgJ2N1cnJlbnQnLCB0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENoZWNrIGFsbCBhY3RpdmUgYWN0aW9ucyBmb3IgYW55IHRoYXQgY2FuIGJlIHJlbW92ZWRcbiAgICAgICAgZWFjaCh0aGlzLmFjdGl2ZUFjdGlvbnMsIChpZCwgYWN0aW9uKSA9PiB7XG4gICAgICAgICAgICBsZXQgYWN0aW9uSXNBY3RpdmUgPSBmYWxzZTtcblxuICAgICAgICAgICAgZWFjaCh0aGlzLnZhbHVlcywgKGtleSwgdmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICBhY3Rpb25Jc0FjdGl2ZSA9ICh2YWx1ZS5hY3Rpb24gPT09IGFjdGlvbikgPyB0cnVlIDogYWN0aW9uSXNBY3RpdmU7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKCFhY3Rpb25Jc0FjdGl2ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMudW5iaW5kQWN0aW9uKGlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLypcbiAgICAgICAgQmluZCBBY3Rpb24tc3BlY2lmaWMgY29udHJvbHMgdG8gQWN0b3JcblxuICAgICAgICBAcmV0dXJucyBbQ29udHJvbHNdXG4gICAgKi9cbiAgICBjb250cm9scyhhY3Rpb24pIHtcbiAgICAgICAgdmFyIENvbnRyb2xzID0gYWN0aW9uLmdldENvbnRyb2xzKCk7XG4gICAgICAgIHJldHVybiBuZXcgQ29udHJvbHModGhpcywgYWN0aW9uLmdldFBsYXlhYmxlKCkpO1xuICAgIH1cblxuICAgIC8qXG4gICAgICAgIFN0YXJ0IGEgbmV3IEFjdGlvblxuXG4gICAgICAgIEBwYXJhbSBbQWN0aW9uIHx8IG51bWJlcl1cbiAgICAgICAgQHBhcmFtIFtJbnB1dCB8fCBldmVudF0gKG9wdGlvbmFsKVxuICAgICAgICBAcGFyYW0gW2Jvb2xlYW5dIChvcHRpb25hbCk6IGRlZmluZWQgYHRydWVgIGlmIHdlIHN1cnByZXNzIG1ha2luZyBuZXcgcXVldWVcbiAgICAgICAgQHJldHVybnMgW0NvbnRyb2xzXVxuICAgICovXG4gICAgc3RhcnQodG9TZXQsIGlucHV0KSB7XG4gICAgICAgIGxldCBhY3Rpb25FeGlzdHMgPSB1dGlscy5pc051bSh0b1NldCksXG4gICAgICAgICAgICBhY3Rpb24gPSAoYWN0aW9uRXhpc3RzKSA/IHRoaXMuZ2V0QWN0aW9uKHRvU2V0KSA6IHRvU2V0LmdldFBsYXlhYmxlKCksXG4gICAgICAgICAgICBvcHRzID0gYWN0aW9uLmdldFNldCgpLFxuICAgICAgICAgICAgc3VycHJlc3NRdWV1ZUNsZWFyID0gKGFyZ3VtZW50c1thcmd1bWVudHMubGVuZ3RoIC0gMV0gPT09IGZhbHNlKTtcblxuICAgICAgICBvcHRzLmFjdGlvbiA9IGFjdGlvbjtcblxuICAgICAgICB0aGlzLnNldChvcHRzKTtcblxuICAgICAgICBpZiAoaW5wdXQpIHtcbiAgICAgICAgICAgIGFjdGlvbi5iaW5kSW5wdXQoaW5wdXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFzdXJwcmVzc1F1ZXVlQ2xlYXIpIHtcbiAgICAgICAgICAgIHRoaXMucXVldWUuY2xlYXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZpcmUgYWxsIFJvbGUgb25TdGFydHMgaWYgbm90IGFscmVhZHkgYWN0aXZlXG4gICAgICAgIGlmICghdGhpcy5pc0FjdGl2ZSkge1xuICAgICAgICAgICAgbGV0IG51bVJvbGVzID0gdGhpcy5yb2xlcy5sZW5ndGg7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVJvbGVzOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgcm9sZSA9IHRoaXMucm9sZXNbaV07XG4gICAgICAgICAgICAgICAgaWYgKHJvbGUuc3RhcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcm9sZS5zdGFydC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZpcmUgbmV3IGFjdGlvbiBvblN0YXJ0XG4gICAgICAgIGlmICghYWN0aW9uLmlzQWN0aXZlICYmIGFjdGlvbi5vblN0YXJ0KSB7XG4gICAgICAgICAgICBhY3Rpb24ub25TdGFydC5jYWxsKHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hY3RpdmF0ZSgpO1xuXG4gICAgICAgIGlmICghYWN0aW9uRXhpc3RzKSB7XG4gICAgICAgICAgICBsZXQgQ29udHJvbHMgPSBhY3Rpb24uZ2V0Q29udHJvbHMoKTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ29udHJvbHModGhpcywgYWN0aW9uLCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qXG4gICAgICAgIFBhdXNlIGFsbCBhY3RpdmUgQWN0aW9uc1xuXG4gICAgICAgIEBwYXJhbSBbaW50XSAob3B0aW9uYWwpXG4gICAgICAgIEByZXR1cm5zIFtBY3Rvcl1cbiAgICAqL1xuICAgIHBhdXNlKCkge1xuICAgICAgICB0aGlzLmlzQWN0aXZlID0gZmFsc2U7XG4gICAgICAgIGVhY2godGhpcy5hY3RpdmVBY3Rpb25zLCAoaWQsIGFjdGlvbikgPT4gYWN0aW9uLmRlYWN0aXZhdGUoKSk7XG4gICAgICAgIHRoaXMucHJvY2Vzcy5zdG9wKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qXG4gICAgICAgIFJlc3VtZSBhbGwgYWN0aXZlIEFjdGlvbnNcblxuICAgICAgICBAcGFyYW0gW2ludF0gKG9wdGlvbmFsKVxuICAgICAgICBAcmV0dXJucyBbQWN0b3JdO1xuICAgICovXG4gICAgcmVzdW1lKCkge1xuICAgICAgICB0aGlzLmlzQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgZWFjaCh0aGlzLmFjdGl2ZUFjdGlvbnMsIChpZCwgYWN0aW9uKSA9PiBhY3Rpb24uYWN0aXZhdGUoKSk7XG4gICAgICAgIHRoaXMucHJvY2Vzcy5zdGFydCgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKlxuICAgICAgICBTdG9wIGFsbCBhY3RpdmUgQWN0aW9uc1xuXG4gICAgICAgIEBwYXJhbSBbaW50XSAob3B0aW9uYWwpXG4gICAgICAgIEByZXR1cm5zIFtBY3Rvcl1cbiAgICAqL1xuICAgIHN0b3AoKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlQWN0aW9ucyA9IHt9O1xuICAgICAgICB0aGlzLnBhdXNlKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qXG4gICAgICAgIFRvZ2dsZSBhbGwgYWN0aXZlIEFjdGlvbnNcblxuICAgICAgICBAcGFyYW0gW2ludF0gKG9wdGlvbmFsKVxuICAgICAgICBAcmV0dXJucyBbQWN0b3JdXG4gICAgKi9cbiAgICB0b2dnbGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzQWN0aXZlID8gdGhpcy5wYXVzZSgpIDogdGhpcy5yZXN1bWUoKTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAgICBTeW5jcyBgZWxlbWVudGAgd2l0aCBjdXJyZW50IHByb3BlcnRpZXNcblxuICAgICAgICBAcmV0dXJucyBbQWN0b3JdXG4gICAgKi9cbiAgICBzeW5jKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGFydChuZXcgQWN0aW9uKHsgdmFsdWVzOiB0aGlzLnZhbHVlcyB9KSk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgICAgQWRkIGEgbmV3IEFjdGlvbiB0byB0aGUgcXVldWVcbiAgICAqL1xuICAgIHRoZW4oKSB7XG4gICAgICAgIHRoaXMucXVldWUuYWRkLmFwcGx5KHRoaXMucXVldWUsIGFyZ3VtZW50cyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qXG4gICAgICAgIEV4ZWN1dGUgbmV4dCBpbiBxdWV1ZVxuICAgICovXG4gICAgbmV4dCgpIHtcbiAgICAgICAgdmFyIG5leHQgPSB0aGlzLnF1ZXVlLm5leHQoKTtcblxuICAgICAgICBpZiAobmV4dCkge1xuICAgICAgICAgICAgaWYgKHV0aWxzLmlzRnVuYyhuZXh0WzBdKSkge1xuICAgICAgICAgICAgICAgIG5leHRbMF0oKTtcbiAgICAgICAgICAgICAgICB0aGlzLm5leHQoKTtcbiAgICAgICAgICAgIC8vIE9yIHRoaXMgaXMgYW4gYWN0aW9uXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5leHQucHVzaChmYWxzZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydC5hcHBseSh0aGlzLCBuZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLypcbiAgICAgICAgQXNzaWduIFJvbGVzIGJhc2VkIG9uIGVsZW1lbnQgYW5kIG1hbnVhbGx5IHByb3ZpZGVkIHByb3BzXG5cbiAgICAgICAgQHBhcmFtIFtvYmplY3RdOiBFbGVtZW50XG4gICAgICAgIEBwYXJhbSBbUm9sZSB8fCBhcnJheV1cbiAgICAgICAgQHBhcmFtIFtib29sZWFuXSAob3B0aW9uYWwpXG4gICAgKi9cbiAgICBhc3NpZ25Sb2xlcyhlbGVtZW50LCBtYW51YWxSb2xlcywgc3VycHJlc3NJbml0KSB7XG4gICAgICAgIC8vIEFsbCBBY3RvcnMgZ2V0IGEgZGVmYXVsdCBSb2xlIHRoYXQgaGFuZGxlcyB1c2VyIGNhbGxiYWNrc1xuICAgICAgICB0aGlzLnJvbGVzID0gWyBkZWZhdWx0Um9sZSBdO1xuXG4gICAgICAgIC8vIEF1dG8tYXNzaWduIGlmIG5vIG1hbnVhbGx5LXNldCBSb2xlc1xuICAgICAgICBpZiAoIW1hbnVhbFJvbGVzICYmIGVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuYXV0b0Fzc2lnblJvbGVzKGVsZW1lbnQpO1xuXG4gICAgICAgIC8vIE9yIG1hbnVhbGx5IHNldCBpZiBwcm92aWRlZFxuICAgICAgICB9IGVsc2UgaWYgKG1hbnVhbFJvbGVzKSB7XG4gICAgICAgICAgICBpZiAodXRpbHMuaXNBcnJheShtYW51YWxSb2xlcykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvbGVzLnB1c2guYXBwbHkodGhpcy5yb2xlcywgbWFudWFsUm9sZXMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvbGVzLnB1c2gobWFudWFsUm9sZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFzdXJwcmVzc0luaXQpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdFJvbGVzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKlxuICAgICAgICBBdXRvbWF0aWNhbGx5IGFzc2lnbiBSb2xlcyBiYXNlZCBvbiBlbGVtZW50LCBkZXNpZ25lZFxuICAgICAgICB0byBiZSBleHRlbmRlZFxuXG4gICAgICAgIEBwYXJhbSBbb2JqZWN0XTogRWxlbWVudFxuICAgICovXG4gICAgYXV0b0Fzc2lnblJvbGVzKGVsZW1lbnQpIHtcbiAgICAgICAgLy8gQWRkIENTUyByb2xlIGlmIEhUTUxFbGVtZW50XG4gICAgICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMucm9sZXMucHVzaChjc3NSb2xlKTtcblxuICAgICAgICAvLyBBZGQgU1ZHIHJvbGUgaWYgU1ZHIGVsZW1lbnRcbiAgICAgICAgfSBlbHNlIGlmIChlbGVtZW50IGluc3RhbmNlb2YgU1ZHRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5yb2xlcy5wdXNoKHN2Z1JvbGUpO1xuXG4gICAgICAgICAgICAvLyBBZGQgRHJhdyBQYXRoIHJvbGUgaWYgcGF0aCBlbGVtZW50XG4gICAgICAgICAgICBpZiAoZWxlbWVudC50YWdOYW1lID09PSAncGF0aCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvbGVzLnB1c2goZHJhd1BhdGhSb2xlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qXG4gICAgICAgIEZpcmUgaW5pdCBjYWxsYmFja3NcbiAgICAqL1xuICAgIGluaXRSb2xlcygpIHtcbiAgICAgICAgLy8gRmlyZSBpbml0IGNhbGxiYWNrXG4gICAgICAgIHRoaXMucm9sZXMuZm9yRWFjaCgocm9sZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHJvbGUuaW5pdCkge1xuICAgICAgICAgICAgICAgIHJvbGUuaW5pdC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhY3RpdmF0ZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLmlzQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZmlyc3RGcmFtZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnByb2Nlc3Muc3RhcnQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qXG4gICAgICAgIEJpbmQgQWN0aW9uIGFuZCByZXR1cm4gaXRzIHRhYmxlIGlkXG5cbiAgICAgICAgQHBhcmFtIFtBY3Rpb25dXG4gICAgICAgIEByZXR1cm5zIFtpbnRdXG4gICAgKi9cbiAgICBiaW5kQWN0aW9uKGFjdGlvbiwgaWQpIHtcbiAgICAgICAgaWYgKGlkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlkID0gdGhpcy5hY3Rpb25Db3VudGVyKys7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuaGFzQWN0aW9uKGlkKSkge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVBY3Rpb25zW2lkXSA9IGFjdGlvbjtcbiAgICAgICAgICAgIHRoaXMubnVtQWN0aXZlKys7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaWQ7XG4gICAgfVxuXG4gICAgdW5iaW5kQWN0aW9uKGlkKSB7XG4gICAgICAgIHRoaXMubnVtQWN0aXZlLS07XG4gICAgICAgIGRlbGV0ZSB0aGlzLmFjdGl2ZUFjdGlvbnNbaWRdO1xuXG4gICAgICAgIGlmICghdGhpcy5udW1BY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0QWN0aW9uKGlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFjdGl2ZUFjdGlvbnNbaWRdO1xuICAgIH1cblxuICAgIGhhc0FjdGlvbihpZCkge1xuICAgICAgICByZXR1cm4gKHRoaXMuZ2V0QWN0aW9uKGlkKSAhPT0gdW5kZWZpbmVkKTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAgICBVcGRhdGUgcHJvY2Vzc2luZyBvcmRlclxuICAgICAgICBcbiAgICAgICAgQHBhcmFtIFtzdHJpbmddXG4gICAgICAgIEBwYXJhbSBbYm9vbGVhbl1cbiAgICAgICAgQHBhcmFtIFtib29sZWFuXVxuICAgICovXG4gICAgdXBkYXRlT3JkZXIoa2V5LCBtb3ZlVG9CYWNrLCBoYXNDaGlsZHJlbikge1xuICAgICAgICB2YXIgb3JkZXIgPSAoIWhhc0NoaWxkcmVuKSA/IHRoaXMuYWN0aXZlVmFsdWVzIDogdGhpcy5hY3RpdmVQYXJlbnRzLFxuICAgICAgICAgICAgcG9zaXRpb24gPSBvcmRlci5pbmRleE9mKGtleSk7XG5cbiAgICAgICAgLy8gSWYga2V5IGlzbid0IGxpc3Qgb3IgbW92ZVRvQmFjayBpcyBzZXQgdG8gdHJ1ZSwgYWRkIGtleVxuICAgICAgICBpZiAocG9zaXRpb24gPT09IC0xIHx8IG1vdmVUb0JhY2spIHtcbiAgICAgICAgICAgIG9yZGVyLnB1c2goa2V5KTtcblxuICAgICAgICAgICAgLy8gSWYga2V5IGFscmVhZHkgZXhpc3RzLCByZW1vdmVcbiAgICAgICAgICAgIGlmIChwb3NpdGlvbiA+IC0xKSB7XG4gICAgICAgICAgICAgICAgb3JkZXIuc3BsaWNlKHBvc2l0aW9uLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFtib29sZWFuXTogSXMgdGhpcyBBY3RvciBhY3RpdmU/XG4gICAgZ2V0IGlzQWN0aXZlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNBY3RpdmU7XG4gICAgfVxuXG4gICAgLy8gU2V0IGhhc0NoYW5nZWQgdG8gdHJ1ZSBpcyB0aGlzIGlzIG5vdyBhY3RpdmVcbiAgICBzZXQgaXNBY3RpdmUoc3RhdHVzKSB7XG4gICAgICAgIGlmIChzdGF0dXMgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMuaGFzQ2hhbmdlZCA9IHN0YXR1cztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2lzQWN0aXZlID0gc3RhdHVzO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBBY3RvcjtcblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYWN0b3IvQWN0b3IuanNcbiAqKi8iLCIvKlxuICAgIElucHV0IGNvbnRyb2xsZXJcbiovXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGNhbGMgPSByZXF1aXJlKCcuLi9pbmMvY2FsYy5qcycpLFxuICAgIHV0aWxzID0gcmVxdWlyZSgnLi4vaW5jL3V0aWxzLmpzJyksXG4gICAgSGlzdG9yeSA9IHJlcXVpcmUoJy4uL2luYy9IaXN0b3J5LmpzJyksXG5cbiAgICAvKlxuICAgICAgICBJbnB1dCBjb25zdHJ1Y3RvclxuICAgICAgICBcbiAgICAgICAgICAgIFN5bnRheFxuICAgICAgICAgICAgICAgIG5ld0lucHV0KG5hbWUsIHZhbHVlWywgcG9sbF0pXG4gICAgICAgICAgICAgICAgICAgIEBwYXJhbSBbc3RyaW5nXTogTmFtZSBvZiB0byB0cmFja1xuICAgICAgICAgICAgICAgICAgICBAcGFyYW0gW251bWJlcl06IEluaXRpYWwgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgQHBhcmFtIFtmdW5jdGlvbl0gKG9wdGlvbmFsKTogRnVuY3Rpb24gdG8gcG9sbCBJbnB1dCBkYXRhXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIG5ld0lucHV0KHByb3BzWywgcG9sbF0pXG4gICAgICAgICAgICAgICAgICAgIEBwYXJhbSBbb2JqZWN0XTogT2JqZWN0IG9mIHZhbHVlc1xuICAgICAgICAgICAgICAgICAgICBAcGFyYW0gW2Z1bmN0aW9uXSAob3B0aW9uYWwpOiBGdW5jdGlvbiB0byBwb2xsIElucHV0IGRhdGFcblxuICAgICAgICBAcmV0dXJuIFtJbnB1dF1cbiAgICAqL1xuICAgIElucHV0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcG9sbFBvcyA9IGFyZ3VtZW50cy5sZW5ndGggLSAxO1xuXG4gICAgICAgIHRoaXMuY3VycmVudCA9IHt9O1xuICAgICAgICB0aGlzLm9mZnNldCA9IHt9O1xuICAgICAgICB0aGlzLnZlbG9jaXR5ID0ge307XG4gICAgICAgIHRoaXMuaGlzdG9yeSA9IG5ldyBIaXN0b3J5KCk7XG4gICAgICAgIHRoaXMudXBkYXRlKGFyZ3VtZW50c1swXSwgYXJndW1lbnRzWzFdKTtcbiAgICAgICAgXG4gICAgICAgIGlmICh1dGlscy5pc0Z1bmMoYXJndW1lbnRzW3BvbGxQb3NdKSkge1xuICAgICAgICAgICAgdGhpcy5wb2xsID0gYXJndW1lbnRzW3BvbGxQb3NdO1xuICAgICAgICB9XG4gICAgfTtcblxuSW5wdXQucHJvdG90eXBlID0ge1xuICAgIFxuICAgIC8vIFtudW1iZXJdOiBOdW1iZXIgb2YgZnJhbWVzIG9mIGluYWN0aXZpdHkgYmVmb3JlIHZlbG9jaXR5IGlzIHR1cm5lZCB0byAwXG4gICAgbWF4SW5hY3RpdmVGcmFtZXM6IDIsXG4gICAgXG4gICAgLy8gW251bWJlcl06IE51bWJlciBvZiBmcmFtZXMgaW5wdXQgaGFzbid0IGJlZW4gdXBkYXRlZFxuICAgIGluYWN0aXZlRnJhbWVzOiAwLFxuICAgIFxuICAgIC8qXG4gICAgICAgIEdldCBsYXRlc3QgaW5wdXQgdmFsdWVzXG4gICAgICAgIFxuICAgICAgICBAcGFyYW0gW3N0cmluZ10gKG9wdGlvbmFsKTogTmFtZSBvZiBzcGVjaWZpYyBwcm9wZXJ0eSB0byByZXR1cm5cbiAgICAgICAgQHJldHVybiBbb2JqZWN0IHx8IG51bWJlcl06IExhdGVzdCBpbnB1dCB2YWx1ZXMgb3IsIGlmIHNwZWNpZmllZCwgc2luZ2xlIHZhbHVlXG4gICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgICAgIHZhciBsYXRlc3QgPSB0aGlzLmhpc3RvcnkuZ2V0KCksXG4gICAgICAgICAgICB2YWwgPSAocHJvcCAhPT0gdW5kZWZpbmVkKSA/IGxhdGVzdFtwcm9wXSA6IGxhdGVzdDtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB2YWw7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICAgIFVwZGF0ZSB0aGUgaW5wdXQgdmFsdWVzXG4gICAgICAgIFxuICAgICAgICBTeW50YXhcbiAgICAgICAgICAgIGlucHV0LnVwZGF0ZShuYW1lLCB2YWx1ZSlcbiAgICAgICAgICAgICAgICBAcGFyYW0gW3N0cmluZ106IE5hbWUgb2YgdG8gdHJhY2tcbiAgICAgICAgICAgICAgICBAcGFyYW0gW251bWJlcl06IEluaXRpYWwgdmFsdWVcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIGlucHV0LnVwZGF0ZShwcm9wcylcbiAgICAgICAgICAgICAgICBAcGFyYW0gW29iamVjdF06IE9iamVjdCBvZiB2YWx1ZXNcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgQHJldHVybiBbSW5wdXRdXG4gICAgKi9cbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChhcmcwLCBhcmcxKSB7XG4gICAgICAgIHZhciB2YWx1ZXMgPSB7fTtcblxuICAgICAgICBpZiAodXRpbHMuaXNOdW0oYXJnMSkpIHtcbiAgICAgICAgICAgIHZhbHVlc1thcmcwXSA9IGFyZzE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YWx1ZXMgPSBhcmcwO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5oaXN0b3J5LmFkZCh1dGlscy5tZXJnZSh0aGlzLmN1cnJlbnQsIHZhbHVlcykpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcbiAgICBcbiAgICAvKlxuICAgICAgICBDaGVjayBmb3IgaW5wdXQgbW92ZW1lbnQgYW5kIHVwZGF0ZSBwb2ludGVyIG9iamVjdCdzIHByb3BlcnRpZXNcbiAgICAgICAgXG4gICAgICAgIEBwYXJhbSBbbnVtYmVyXTogVGltZXN0YW1wIG9mIGZyYW1lXG4gICAgICAgIEByZXR1cm4gW0lucHV0XVxuICAgICovXG4gICAgb25GcmFtZTogZnVuY3Rpb24gKHRpbWVzdGFtcCkge1xuICAgICAgICB2YXIgbGF0ZXN0LCBoYXNDaGFuZ2VkO1xuICAgICAgICBcbiAgICAgICAgLy8gQ2hlY2sgcHJvdmlkZWQgdGltZXN0YW1wIGFnYWluc3QgbGFzdEZyYW1lIHRpbWVzdGFtcCBhbmQgcmV0dXJuIGlucHV0IGhhcyBhbHJlYWR5IGJlZW4gdXBkYXRlZFxuICAgICAgICBpZiAodGltZXN0YW1wID09PSB0aGlzLmxhc3RGcmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsYXRlc3QgPSAodGhpcy5wb2xsKSA/IHRoaXMucG9sbCgpIDogdGhpcy5oaXN0b3J5LmdldCgpO1xuICAgICAgICBoYXNDaGFuZ2VkID0gdXRpbHMuaGFzQ2hhbmdlZCh0aGlzLmN1cnJlbnQsIGxhdGVzdCk7XG5cbiAgICAgICAgLy8gSWYgaW5wdXQgaGFzIGNoYW5nZWQgYmV0d2VlbiBmcmFtZXMgIFxuICAgICAgICBpZiAoaGFzQ2hhbmdlZCkge1xuICAgICAgICAgICAgdGhpcy52ZWxvY2l0eSA9IGNhbGMub2Zmc2V0KHRoaXMuY3VycmVudCwgbGF0ZXN0KTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudCA9IGxhdGVzdDtcbiAgICAgICAgICAgIHRoaXMuaW5hY3RpdmVGcmFtZXMgPSAwO1xuXG4gICAgICAgIC8vIE9yIGl0IGhhc24ndCBtb3ZlZCBhbmQgb3VyIGZyYW1lIGxpbWl0IGhhcyBiZWVuIHJlYWNoZWRcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmluYWN0aXZlRnJhbWVzID49IHRoaXMubWF4SW5hY3RpdmVGcmFtZXMpIHtcbiAgICAgICAgICAgIHRoaXMudmVsb2NpdHkgPSBjYWxjLm9mZnNldCh0aGlzLmN1cnJlbnQsIHRoaXMuY3VycmVudCk7XG4gICAgICAgIFxuICAgICAgICAvLyBPciBpbnB1dCBoYXNuJ3QgY2hhbmdlZFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pbmFjdGl2ZUZyYW1lcysrO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmxhc3RGcmFtZSA9IHRpbWVzdGFtcDtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSW5wdXQ7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW5wdXQvSW5wdXQuanNcbiAqKi8iLCJ2YXIgQWN0b3IgPSByZXF1aXJlKCcuLi9hY3Rvci9BY3RvcicpLFxuICAgIFR3ZWVuID0gcmVxdWlyZSgnLi4vYWN0aW9ucy9Ud2VlbicpLFxuICAgIHV0aWxzID0gcmVxdWlyZSgnLi4vaW5jL3V0aWxzJyk7XG5cbmNvbnN0IERFRkFVTFRfU1RBR0dFUl9FQVNFID0gJ2xpbmVhcic7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlQ2FsbGJhY2sobWV0aG9kLCAuLi5hcmdzKSB7XG4gICAgcmV0dXJuIHV0aWxzLmlzU3RyaW5nKG1ldGhvZCkgPyBcbiAgICAgICAgZnVuY3Rpb24gKG1lbWJlcikge1xuICAgICAgICAgICAgcmV0dXJuIG1lbWJlclttZXRob2RdKC4uLmFyZ3MpO1xuICAgICAgICB9IDogbWV0aG9kO1xufVxuXG5jbGFzcyBJdGVyYXRvciB7XG4gICAgY29uc3RydWN0b3IobWVtYmVycykge1xuICAgICAgICB0aGlzLmNsZWFyKCk7XG5cbiAgICAgICAgaWYgKG1lbWJlcnMpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkKG1lbWJlcnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fc3RhZ2dlciA9IG5ldyBBY3RvcigpO1xuICAgIH1cblxuICAgIGFkZChtZW1iZXJzKSB7XG4gICAgICAgIHRoaXMubWVtYmVycyA9IHRoaXMubWVtYmVycy5jb25jYXQobWVtYmVycyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLm1lbWJlcnMgPSBbXTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZWFjaChtZXRob2QsIC4uLmFyZ3MpIHtcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gZ2VuZXJhdGVDYWxsYmFjayhtZXRob2QsIC4uLmFyZ3MpO1xuICAgICAgICB0aGlzLm1lbWJlcnMuZm9yRWFjaChjYWxsYmFjayk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGVhY2hJbnRvTmV3KG1ldGhvZCwgLi4uYXJncykge1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSBnZW5lcmF0ZUNhbGxiYWNrKG1ldGhvZCwgLi4uYXJncyksXG4gICAgICAgICAgICBuZXdJdGVyYXRvciA9IG5ldyBJdGVyYXRvcigpO1xuXG4gICAgICAgIHRoaXMubWVtYmVycy5mb3JFYWNoKChtZW1iZXIpID0+IG5ld0l0ZXJhdG9yLmFkZChjYWxsYmFjayhtZW1iZXIpKSk7XG5cbiAgICAgICAgcmV0dXJuIG5ld0l0ZXJhdG9yO1xuICAgIH1cblxuICAgIHN0YWdnZXIobWV0aG9kLCBwcm9wcywgLi4uYXJncykge1xuICAgICAgICB2YXIgbnVtTWVtYmVycyA9IHRoaXMubWVtYmVycy5sZW5ndGgsXG4gICAgICAgICAgICBwcm9wc0lzSW50ZXJ2YWwgPSB1dGlscy5pc051bShwcm9wcyksXG4gICAgICAgICAgICBpbnRlcnZhbCA9IHByb3BzSXNJbnRlcnZhbCA/IHByb3BzIDogcHJvcHMuaW50ZXJ2YWwsXG4gICAgICAgICAgICBzdGFnZ2VyUHJvcHMgPSB7fSxcbiAgICAgICAgICAgIGkgPSAtMSxcbiAgICAgICAgICAgIGNhbGxiYWNrID0gZ2VuZXJhdGVDYWxsYmFjayhtZXRob2QsIC4uLmFyZ3MpO1xuXG4gICAgICAgIHN0YWdnZXJQcm9wcy52YWx1ZXMgPSB7XG4gICAgICAgICAgICBpOiB7XG4gICAgICAgICAgICAgICAgY3VycmVudDogMCxcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogaW50ZXJ2YWwgKiBudW1NZW1iZXJzLFxuICAgICAgICAgICAgICAgIGVhc2U6IHByb3BzSXNJbnRlcnZhbCA/IERFRkFVTFRfU1RBR0dFUl9FQVNFIDogcHJvcHMuZWFzZSB8fCBERUZBVUxUX1NUQUdHRVJfRUFTRSxcbiAgICAgICAgICAgICAgICByb3VuZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0bzogbnVtTWVtYmVycyAtIDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBzdGFnZ2VyUHJvcHMub25VcGRhdGUgPSAob3V0cHV0KSA9PiB7XG4gICAgICAgICAgICB2YXIgbmV3SW5kZXggPSBvdXRwdXQuaSxcbiAgICAgICAgICAgICAgICBnYXBJbmRleCA9IGkgKyAxO1xuXG4gICAgICAgICAgICAvLyBJZiBvdXIgbmV3IGluZGV4IGlzIG9ubHkgb25lIG1vcmUgdGhhbiB0aGUgcHJldmlvdXMgaW5kZXgsIGZpcmUgaW1tZWRpZXRseVxuICAgICAgICAgICAgaWYgKG5ld0luZGV4ID09PSBpICsgMSkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHRoaXMubWVtYmVyc1tnYXBJbmRleF0sIGdhcEluZGV4KTtcblxuICAgICAgICAgICAgLy8gT3IgbG9vcCB0aHJvdWdoIHRoZSBkaXN0YW5jZSB0byBmaXJlIGFsbCBpbmRlY2llcy4gSW5jcmVhc2UgZGVsYXkuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvciAoOyBnYXBJbmRleCA8PSBuZXdJbmRleDsgZ2FwSW5kZXgrKykge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayh0aGlzLm1lbWJlcnNbZ2FwSW5kZXhdLCBnYXBJbmRleCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpID0gbmV3SW5kZXg7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5fc3RhZ2dlci5zdGFydChuZXcgVHdlZW4oc3RhZ2dlclByb3BzKSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEl0ZXJhdG9yO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2l0ZXJhdG9yL0l0ZXJhdG9yLmpzXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtYW5hZ2VyID0gcmVxdWlyZSgnLi9tYW5hZ2VyJyksXG5cbiAgICAvKlxuICAgICAgICBQcm9jZXNzIGNvbnN0cnVjdG9yXG4gICAgICAgIFxuICAgICAgICBTeW50YXhcbiAgICAgICAgICAgIHZhciBwcm9jZXNzID0gbmV3IFByb2Nlc3Moc2NvcGUsIGNhbGxiYWNrKTtcbiAgICAgICAgICAgIHZhciBwcm9jZXNzID0gbmV3IFByb2Nlc3MoY2FsbGJhY2spO1xuICAgICovXG4gICAgUHJvY2VzcyA9IGZ1bmN0aW9uIChzY29wZSwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGhhc1Njb3BlID0gKGNhbGxiYWNrICE9PSB1bmRlZmluZWQpO1xuXG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBoYXNTY29wZSA/IGNhbGxiYWNrIDogc2NvcGU7XG4gICAgICAgIHRoaXMuc2NvcGUgPSBoYXNTY29wZSA/IHNjb3BlIDogdGhpcztcbiAgICAgICAgdGhpcy5pZCA9IG1hbmFnZXIucmVnaXN0ZXIoKTtcblxuICAgICAgICAvLyBbYm9vbGVhbl06IElzIHRoaXMgcHJvY2VzcyBjdXJyZW50bHkgYWN0aXZlP1xuICAgICAgICB0aGlzLmlzQWN0aXZlID0gZmFsc2U7XG4gICAgfTtcblxuUHJvY2Vzcy5wcm90b3R5cGUgPSB7XG4gICAgLypcbiAgICAgICAgRmlyZSBjYWxsYmFja1xuICAgICAgICBcbiAgICAgICAgQHBhcmFtIFt0aW1lc3RhbXBdOiBUaW1lc3RhbXAgb2YgY3VycmVudGx5LWV4ZWN1dGVkIGZyYW1lXG4gICAgICAgIEBwYXJhbSBbbnVtYmVyXTogVGltZSBzaW5jZSBsYXN0IGZyYW1lXG4gICAgKi9cbiAgICBmaXJlOiBmdW5jdGlvbiAodGltZXN0YW1wLCBlbGFwc2VkKSB7XG4gICAgICAgIHRoaXMuY2FsbGJhY2suY2FsbCh0aGlzLnNjb3BlLCB0aW1lc3RhbXAsIGVsYXBzZWQpO1xuICAgICAgICBcbiAgICAgICAgLy8gSWYgd2UncmUgcnVubmluZyBhdCBhbiBpbnRlcnZhbCwgZGVhY3RpdmF0ZSBhZ2FpblxuICAgICAgICBpZiAodGhpcy5pc0ludGVydmFsKSB7XG4gICAgICAgICAgICB0aGlzLmRlYWN0aXZhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG4gICAgXG4gICAgLypcbiAgICAgICAgU3RhcnQgcHJvY2Vzc1xuICAgICAgICBcbiAgICAgICAgQHBhcmFtIFtpbnRdOiBEdXJhdGlvbiBvZiBwcm9jZXNzIGluIG1zLCAwIGlmIGluZGVmaW5pdGVcbiAgICAgICAgQHJldHVybiBbdGhpc11cbiAgICAqL1xuICAgIHN0YXJ0OiBmdW5jdGlvbiAoZHVyYXRpb24pIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgdGhpcy5hY3RpdmF0ZSgpO1xuICAgICAgICBcbiAgICAgICAgaWYgKGR1cmF0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnN0b3BUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGYuc3RvcCgpO1xuICAgICAgICAgICAgfSwgZHVyYXRpb24pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmlzU3RvcFRpbWVyQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG4gICAgXG4gICAgLypcbiAgICAgICAgU3RvcCBwcm9jZXNzXG4gICAgICAgIFxuICAgICAgICBAcmV0dXJuIFt0aGlzXVxuICAgICovXG4gICAgc3RvcDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgIHRoaXMuZGVhY3RpdmF0ZSgpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcbiAgICBcbiAgICAvKlxuICAgICAgICBBY3RpdmF0ZSBwcm9jZXNzXG4gICAgICAgIFxuICAgICAgICBAcmV0dXJuIFt0aGlzXVxuICAgICovXG4gICAgYWN0aXZhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5pc0FjdGl2ZSA9IHRydWU7XG4gICAgICAgIG1hbmFnZXIuYWN0aXZhdGUodGhpcywgdGhpcy5pZCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcbiAgICBcbiAgICAvKlxuICAgICAgICBEZWFjdGl2YXRlIHByb2Nlc3NcbiAgICAgICAgXG4gICAgICAgIEByZXR1cm4gW3RoaXNdXG4gICAgKi9cbiAgICBkZWFjdGl2YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgbWFuYWdlci5kZWFjdGl2YXRlKHRoaXMuaWQpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcbiAgICBcbiAgICAvKlxuICAgICAgICBGaXJlIHByb2Nlc3MgZXZlcnkgeCBtc1xuICAgICAgICBcbiAgICAgICAgQHBhcmFtIFtpbnRdOiBOdW1iZXIgb2YgbXMgdG8gd2FpdCBiZXR3ZWVuIHJlZmlyaW5nIHByb2Nlc3MuXG4gICAgICAgIEByZXR1cm4gW3RoaXNdXG4gICAgKi9cbiAgICBldmVyeTogZnVuY3Rpb24gKGludGVydmFsKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICB0aGlzLnJlc2V0KCk7XG5cbiAgICAgICAgdGhpcy5pc0ludGVydmFsID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLmludGVydmFsVGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLmFjdGl2YXRlKCk7XG4gICAgICAgIH0sIGludGVydmFsKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuaXNJbnRlcnZhbFRpbWVBY3RpdmUgPSB0cnVlO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcbiAgICBcbiAgICAvKlxuICAgICAgICBDbGVhciBhbGwgdGltZXJzXG4gICAgICAgIFxuICAgICAgICBAcGFyYW0gXG4gICAgKi9cbiAgICByZXNldDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmlzSW50ZXJ2YWwgPSBmYWxzZTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLmlzU3RvcFRpbWVyQWN0aXZlKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5zdG9wVGltZXIpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5pc0ludGVydmFsVGltZUFjdGl2ZSkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsVGltZXIpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFByb2Nlc3M7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcHJvY2Vzcy9Qcm9jZXNzLmpzXG4gKiovIiwidmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vaW5jL3V0aWxzJyk7XG52YXIgZWFjaCA9IHV0aWxzLmVhY2g7XG5cbi8qXG4gICAgUm9sZSBjbGFzcyBjb25zdHJ1Y3RvclxuXG4gICAgQHBhcmFtIFtvYmplY3RdOiBPcHRpb25hbCBtZXRob2RzIGFuZCBwcm9wcyB0byBhZGQ6XG4gICAgICAgIG5hbWUgW3N0cmluZ106ICAgICAgTmFtZSBvZiBnZW5lcmF0ZWQgZ2V0dGVyL3NldHRlciBtZXRob2Qgb24gQWN0b3JcbiAgICAgICAgX21hcCBbb2JqZWN0XTogICAgICBNYXAgQWN0b3IgdmFsdWVzIHRvIHRoZXNlIHZhbHVlcyBmb3IgdGhpcyBSb2xlXG4gICAgICAgIF90eXBlTWFwIFtvYmplY3RdOiAgTWFwIHZhbHVlcyB0byB2YWx1ZSB0eXBlc1xuICAgICAgICBpbml0IFtmdW5jdGlvbl06ICAgIENhbGxiYWNrIHRvIHJ1biB3aGVuIHRoaXMgUm9sZSBpcyBhZGRlZCB0byBhbiBBY3RvclxuICAgICAgICBzdGFydCBbZnVuY3Rpb25dOiAgIENhbGxiYWNrIHRvIHJ1biB3aGVuIGhvc3QgQWN0b3Igc3RhcnRzIGFuIGFjdGlvblxuICAgICAgICBjb21wbGV0ZSBbZnVuY3Rpb25dOiBDYWxsYmFjayB0byBydW4gd2hlbiBhY3Rpb24gY29tcGxldGVzXG4gICAgICAgIGZyYW1lIFtmdW5jdGlvbl06ICAgQ2FsbGJhY2sgdG8gZmlyZSBvbmNlIHBlciBmcmFtZVxuICAgICAgICB1cGRhdGUgW2Z1bmN0aW9uXTogIENhbGxiYWNrIHRvIGZpcmUgd2hlbiB2YWx1ZXMgY2hhbmdlXG4gICAgICAgIGdldCBbZnVuY3Rpb25dOiAgICAgUmVhZCB2YWx1ZSBmcm9tIGFjdHVhbCBlbGVtZW50XG4gICAgICAgIHNldCBbZnVuY3Rpb25dOiAgICAgU2V0IHZhbHVlIG9uIGFjdHVhbCBlbGVtZW50XG4qL1xudmFyIFJvbGUgPSBmdW5jdGlvbiAobWV0aG9kcykge1xuICAgIHZhciByb2xlID0gdGhpcztcblxuICAgIHJvbGUuX21hcCA9IHt9O1xuXG4gICAgZWFjaChtZXRob2RzLCBmdW5jdGlvbiAobmFtZSwgbWV0aG9kKSB7XG4gICAgICAgIHJvbGVbbmFtZV0gPSAoIXV0aWxzLmlzT2JqKG1ldGhvZCkpID8gbWV0aG9kIDogdXRpbHMuY29weShtZXRob2QpO1xuICAgIH0pO1xufTtcblxuLypcbiAgICBDcmVhdGUgYSBuZXcgcm9sZVxuXG4gICAgQHBhcmFtIFtvYmplY3RdOiBPcHRpb25hbCBtZXRob2RzIGFuZCBwcm9wcyB0byBhZGRcbiAgICBAcGFyYW0gW3ZhbHVlc1RvTWFwXTogT3ZlcnJpZGUgZXhpc3RpbmcgbWFwIHdpdGggdGhlc2UgdmFsdWVzXG4gICAgQHJldHVybiBbUm9sZV06IE5ldyBSb2xlXG4qL1xudmFyIGNyZWF0ZVJvbGUgPSBmdW5jdGlvbiAobWV0aG9kcywgdmFsdWVzKSB7XG4gICAgdmFyIG5ld1JvbGUgPSBuZXcgUm9sZShtZXRob2RzKTtcblxuICAgIGVhY2godmFsdWVzLCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgICBuZXdSb2xlLl9tYXBba2V5XSA9IHZhbHVlO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5ld1JvbGU7XG59O1xuXG5Sb2xlLnByb3RvdHlwZSA9IHtcblxuICAgIC8qXG4gICAgICAgIE1hcCB2YWx1ZSBrZXlzIG9yIGdlbmVyYXRlIG5ldyBSb2xlIHdpdGggdXBkYXRlZCBtYXBcblxuICAgICAgICBHZXR0ZXI6XG4gICAgICAgICAgICBAcGFyYW0gW3N0cmluZ106IEtleSB0byBtYXBcbiAgICAgICAgICAgIEByZXR1cm4gW3N0cmluZ106IE1hcHBlZCBrZXksIG9yIGtleSBpZiBubyBtYXBwZWQga2V5IGZvdW5kXG5cbiAgICAgICAgU2V0dGVyOiBcbiAgICAgICAgICAgIEBwYXJhbSBbb2JqZWN0XTogTWFwIG9mIEFjdG9yIGtleXMgLT4gUm9sZSBrZXlzXG4gICAgICAgICAgICBAcmV0dXJuIFtSb2xlXTogTmV3IFJvbGUgd2l0aCB1bmlxdWUgbWFwXG4gICAgKi9cbiAgICBtYXA6IGZ1bmN0aW9uICh2YWx1ZXMpIHtcbiAgICAgICAgLy8gSWYgdGhpcyBpcyBhIHN0cmluZywgZ2V0IG1hcHBlZCB2YWx1ZVxuICAgICAgICAvLyBPdGhlcndpc2UgdGhpcyBpcyBhIG1hcCwgZHVwbGljYXRlZCByb2xlIHdpdGggdXBkYXRlZCBtYXBcbiAgICAgICAgcmV0dXJuICh1dGlscy5pc1N0cmluZyh2YWx1ZXMpKSA/IHRoaXMuX21hcFt2YWx1ZXNdIHx8IHZhbHVlcyA6IGNyZWF0ZVJvbGUodGhpcywgdmFsdWVzKTtcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJvbGU7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcm9sZXMvUm9sZS5qc1xuICoqLyIsInZhciBCZXppZXIgPSByZXF1aXJlKCcuL0JlemllcicpLFxuXG4gICAgLypcbiAgICAgICAgTWlycm9yIGVhc2luZ1xuICAgICAgICBcbiAgICAgICAgTWlycm9ycyB0aGUgcHJvdmlkZWQgZWFzaW5nIGZ1bmN0aW9uLCB1c2VkIGhlcmUgZm9yIG1pcnJvcmluZyBhblxuICAgICAgICBlYXNlSW4gaW50byBhbiBlYXNlSW5PdXRcbiAgICAgICAgXG4gICAgICAgIEBwYXJhbSBbbnVtYmVyXTogUHJvZ3Jlc3MsIGZyb20gMCAtIDEsIG9mIGN1cnJlbnQgc2hpZnRcbiAgICAgICAgQHBhcmFtIFtmdW5jdGlvbl06IFRoZSBlYXNpbmcgZnVuY3Rpb24gdG8gbWlycm9yXG4gICAgICAgIEByZXR1cm5zIFtudW1iZXJdOiBUaGUgZWFzaW5nLWFkanVzdGVkIGRlbHRhXG4gICAgKi9cbiAgICBtaXJyb3JFYXNpbmcgPSBmdW5jdGlvbiAocHJvZ3Jlc3MsIG1ldGhvZCkge1xuICAgICAgICByZXR1cm4gKHByb2dyZXNzIDw9IDAuNSkgPyBtZXRob2QoMiAqIHByb2dyZXNzKSAvIDIgOiAoMiAtIG1ldGhvZCgyICogKDEgLSBwcm9ncmVzcykpKSAvIDI7XG4gICAgfSxcbiAgICAgICAgICAgIFxuICAgIC8qXG4gICAgICAgIFJldmVyc2UgZWFzaW5nXG4gICAgICAgIFxuICAgICAgICBSZXZlcnNlcyB0aGUgb3V0cHV0IG9mIHRoZSBwcm92aWRlZCBlYXNpbmcgZnVuY3Rpb24sIHVzZWQgZm9yIGZsaXBwaW5nIGVhc2VJblxuICAgICAgICBjdXJ2ZSB0byBhbiBlYXNlT3V0LlxuICAgICAgICBcbiAgICAgICAgQHBhcmFtIFtudW1iZXJdOiBQcm9ncmVzcywgZnJvbSAwIC0gMSwgb2YgY3VycmVudCBzaGlmdFxuICAgICAgICBAcGFyYW0gW2Z1bmN0aW9uXTogVGhlIGVhc2luZyBmdW5jdGlvbiB0byByZXZlcnNlXG4gICAgICAgIEByZXR1cm5zIFtudW1iZXJdOiBUaGUgZWFzaW5nLWFkanVzdGVkIGRlbHRhXG4gICAgKi9cbiAgICByZXZlcnNlRWFzaW5nID0gZnVuY3Rpb24gKHByb2dyZXNzLCBtZXRob2QpIHtcbiAgICAgICAgcmV0dXJuIDEgLSBtZXRob2QoMSAtIHByb2dyZXNzKTtcbiAgICB9O1xuXG4vKlxuICAgIEVhc2luZyBjbGFzc1xuXG4gICAgSWYgcHJvdmlkZWQgZWFzaW5nIGZ1bmN0aW9uLCByZXR1cm5zIGVhc2luZyBmdW5jdGlvbiB3aXRoIFxuICAgIGluL291dC9pbk91dCB2YXJpYXRpb25zXG5cbiAgICBJZiBwcm92aWRlZCBmb3VyIGFyZ3VtZW50cywgcmV0dXJucyBuZXcgQmV6aWVyIGNsYXNzIGluc3RlYWQuXG4qL1xudmFyIEVhc2luZyA9IGZ1bmN0aW9uICh4MSwgeTEsIHgyLCB5Mikge1xuICAgIHZhciBtZXRob2QgPSB4MSxcbiAgICAgICAgZWFzaW5nRnVuY3Rpb247XG5cbiAgICAvLyBJZiB0aGlzIGlzIGEgYmV6aWVyIGN1cnZlLCByZXR1cm4gYSBiZXppZXIgZnVuY3Rpb25cbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZWFzaW5nRnVuY3Rpb24gPSBuZXcgQmV6aWVyKHgxLCB5MSwgeDIsIHkyKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICAgIGVhc2luZ0Z1bmN0aW9uID0gZnVuY3Rpb24gKHByb2dyZXNzKSB7XG4gICAgICAgICAgICByZXR1cm4gbWV0aG9kKHByb2dyZXNzKTtcbiAgICAgICAgfTtcblxuICAgICAgICBlYXNpbmdGdW5jdGlvbi5pbiA9IGZ1bmN0aW9uIChwcm9ncmVzcykge1xuICAgICAgICAgICAgcmV0dXJuIG1ldGhvZChwcm9ncmVzcyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgZWFzaW5nRnVuY3Rpb24ub3V0ID0gZnVuY3Rpb24gKHByb2dyZXNzKSB7XG4gICAgICAgICAgICByZXR1cm4gcmV2ZXJzZUVhc2luZyhwcm9ncmVzcywgbWV0aG9kKTtcbiAgICAgICAgfTtcblxuICAgICAgICBlYXNpbmdGdW5jdGlvbi5pbk91dCA9IGZ1bmN0aW9uIChwcm9ncmVzcykge1xuICAgICAgICAgICAgcmV0dXJuIG1pcnJvckVhc2luZyhwcm9ncmVzcywgbWV0aG9kKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gZWFzaW5nRnVuY3Rpb247XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVhc2luZztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9hY3Rpb25zL3R3ZWVuL0Vhc2luZy5qc1xuICoqLyIsImxldCBjYWxjID0gcmVxdWlyZSgnLi4vaW5jL2NhbGMnKSxcbiAgICB1dGlscyA9IHJlcXVpcmUoJy4uL2luYy91dGlscycpLFxuICAgIGVhY2ggPSB1dGlscy5lYWNoLFxuICAgIENvbnRyb2xzID0gcmVxdWlyZSgnLi4vY29udHJvbHMvQ29udHJvbHMnKTtcblxuY29uc3QgREVGQVVMVF9QUk9QID0gJ2N1cnJlbnQnO1xuY29uc3QgUFJJVkFURSA9IFsnb25TdGFydCcsICdvbkZyYW1lJywgJ29uVXBkYXRlJywgJ29uQ29tcGxldGUnXTtcblxuY2xhc3MgQWN0aW9uIHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICB2YXIgYWN0aW9uID0gdGhpcztcblxuICAgICAgICB1dGlscy5lYWNoKHRoaXMuZ2V0RGVmYXVsdFByb3BzKCksIGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICAgICAgICBhY3Rpb25ba2V5XSA9IHZhbHVlO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnZhbHVlcyA9IHt9O1xuICAgICAgICB0aGlzLnNldChwcm9wcywgdGhpcy5nZXREZWZhdWx0VmFsdWVQcm9wKCkpO1xuICAgIH1cblxuICAgIHNldChwcm9wcyA9IHt9LCBkZWZhdWx0UHJvcCA9IERFRkFVTFRfUFJPUCkge1xuICAgICAgICBlYWNoKHByb3BzLCAoa2V5LCBwcm9wKSA9PiB7XG4gICAgICAgICAgICBpZiAoa2V5ICE9PSAndmFsdWVzJykge1xuICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IHByb3A7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIE1lcmdlIHZhbHVlc1xuICAgICAgICBpZiAocHJvcHMudmFsdWVzKSB7XG4gICAgICAgICAgICBsZXQgY3VycmVudFZhbHVlcyA9IHRoaXMudmFsdWVzLFxuICAgICAgICAgICAgICAgIHZhbHVlcyA9IHByb3BzLnZhbHVlcztcblxuICAgICAgICAgICAgZWFjaCh2YWx1ZXMsIChrZXksIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGV4aXN0aW5nVmFsdWUgPSBjdXJyZW50VmFsdWVzW2tleV0sXG4gICAgICAgICAgICAgICAgICAgIG5ld1ZhbHVlID0ge307XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHV0aWxzLmlzT2JqKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld1ZhbHVlW2RlZmF1bHRQcm9wXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGN1cnJlbnRWYWx1ZXNba2V5XSA9IGV4aXN0aW5nVmFsdWUgPyB1dGlscy5tZXJnZShleGlzdGluZ1ZhbHVlLCBuZXdWYWx1ZSkgOiBuZXdWYWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHJvY2VzcyhhY3RvciwgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlLmN1cnJlbnQ7XG4gICAgfVxuXG4gICAvKlxuICAgICAgICBIYXMgQWN0aW9uIGVuZGVkP1xuICAgICAgICBcbiAgICAgICAgUmV0dXJucyB0cnVlIHRvIGVuZCBpbW1lZGlldGx5XG4gICAgICAgIFxuICAgICAgICBAcmV0dXJuIFtib29sZWFuXTogdHJ1ZVxuICAgICovXG4gICAgaGFzRW5kZWQoKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICAgICAgXG4gICAgbGltaXQob3V0cHV0LCB2YWx1ZSkge1xuICAgICAgICB2YXIgcmVzdHJpY3RlZCA9IGNhbGMucmVzdHJpY3RlZChvdXRwdXQsIHZhbHVlLm1pbiwgdmFsdWUubWF4KSxcbiAgICAgICAgICAgIGVzY2FwZUFtcCA9IHZhbHVlLmVzY2FwZUFtcCAhPT0gdW5kZWZpbmVkID8gdmFsdWUuZXNjYXBlQW1wIDogMDtcbiAgICAgICAgcmV0dXJuIHJlc3RyaWN0ZWQgKyAoKG91dHB1dCAtIHJlc3RyaWN0ZWQpICogZXNjYXBlQW1wKTtcbiAgICB9XG5cbiAgICBnZXRDb250cm9scygpIHtcbiAgICAgICAgcmV0dXJuIENvbnRyb2xzO1xuICAgIH1cblxuICAgIGdldERlZmF1bHRQcm9wcygpIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIH1cblxuICAgIGdldERlZmF1bHRWYWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIH1cblxuICAgIGdldERlZmF1bHRWYWx1ZVByb3AoKSB7XG4gICAgICAgIHJldHVybiBERUZBVUxUX1BST1A7XG4gICAgfVxuXG4gICAgZ2V0U2V0KCkge1xuICAgICAgICB2YXIgc2V0ID0geyB2YWx1ZXM6IHRoaXMudmFsdWVzIH07XG5cbiAgICAgICAgZWFjaCh0aGlzLCAoa2V5LCBwcm9wKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIFBSSVZBVEUuaW5kZXhPZihrZXkpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHNldFtrZXldID0gcHJvcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHNldDtcbiAgICB9XG5cbiAgICBleHRlbmQocHJvcHMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyB0aGlzLmNvbnN0cnVjdG9yKHV0aWxzLm1lcmdlKHRoaXMsIHByb3BzKSwgdGhpcy5nZXREZWZhdWx0VmFsdWVQcm9wKCkpO1xuICAgIH1cblxuICAgIGdldFBsYXlhYmxlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5leHRlbmQoKTtcbiAgICB9XG5cbiAgICBhY3RpdmF0ZSgpIHtcbiAgICAgICAgdGhpcy5pc0FjdGl2ZSA9IHRydWU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGRlYWN0aXZhdGUoKSB7XG4gICAgICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEFjdGlvbjtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9hY3Rpb25zL0FjdGlvbi5qc1xuICoqLyIsImxldCBBY3Rpb24gPSByZXF1aXJlKCcuL0FjdGlvbicpLFxuICAgIGNhbGMgPSByZXF1aXJlKCcuLi9pbmMvY2FsYycpLFxuICAgIHV0aWxzID0gcmVxdWlyZSgnLi4vaW5jL3V0aWxzJyksXG4gICAgZWFjaCA9IHV0aWxzLmVhY2gsXG4gICAgcHJlc2V0RWFzaW5nID0gcmVxdWlyZSgnLi90d2Vlbi9wcmVzZXQtZWFzaW5nJyksXG4gICAgdmFsdWVPcHMgPSByZXF1aXJlKCcuLi9hY3Rvci92YWx1ZS1vcGVyYXRpb25zJyksXG4gICAgVHdlZW5Db250cm9scyA9IHJlcXVpcmUoJy4vdHdlZW4vVHdlZW5Db250cm9scycpLFxuXG4gICAgbmV4dFN0ZXBzID0ge1xuICAgICAgICBsb29wOiAncmVzdGFydCcsXG4gICAgICAgIHlveW86ICdyZXZlcnNlJyxcbiAgICAgICAgZmxpcDogJ2ZsaXBWYWx1ZXMnXG4gICAgfSxcblxuICAgIC8qXG4gICAgICAgIEVhc2UgdmFsdWUgd2l0aGluIHJhbmdlZCBwYXJhbWV0ZXJzXG4gICAgICAgIFxuICAgICAgICBAcGFyYW0gW251bWJlcl06IFByb2dyZXNzIGJldHdlZW4gMCBhbmQgMVxuICAgICAgICBAcGFyYW0gW251bWJlcl06IFZhbHVlIG9mIDAgcHJvZ3Jlc3NcbiAgICAgICAgQHBhcmFtIFtudW1iZXJdOiBWYWx1ZSBvZiAxIHByb2dyZXNzXG4gICAgICAgIEBwYXJhbSBbc3RyaW5nIHx8IGZ1bmN0aW9uXTogTmFtZSBvZiBwcmVzZXQgZWFzaW5nXG4gICAgICAgICAgICB0byB1c2Ugb3IgZ2VuZXJhdGVkIGVhc2luZyBmdW5jdGlvblxuICAgICAgICBAcmV0dXJuIFtudW1iZXJdOiBWYWx1ZSBvZiBlYXNlZCBwcm9ncmVzcyBpbiByYW5nZVxuICAgICovICBcbiAgICBlYXNlID0gZnVuY3Rpb24gKHByb2dyZXNzLCBmcm9tLCB0bywgZWFzZSkge1xuICAgICAgICB2YXIgcHJvZ3Jlc3NMaW1pdGVkID0gY2FsYy5yZXN0cmljdGVkKHByb2dyZXNzLCAwLCAxKSxcbiAgICAgICAgICAgIGVhc2luZ0Z1bmN0aW9uID0gdXRpbHMuaXNTdHJpbmcoZWFzZSkgPyBwcmVzZXRFYXNpbmdbZWFzZV0gOiBlYXNlO1xuXG4gICAgICAgIHJldHVybiBjYWxjLnZhbHVlRWFzZWQocHJvZ3Jlc3NMaW1pdGVkLCBmcm9tLCB0bywgZWFzaW5nRnVuY3Rpb24pO1xuICAgIH07XG5cbmNvbnN0IENPVU5UID0gJ2NvdW50JztcblxuY2xhc3MgVHdlZW4gZXh0ZW5kcyBBY3Rpb24ge1xuICAgIGdldENvbnRyb2xzKCkge1xuICAgICAgICByZXR1cm4gVHdlZW5Db250cm9scztcbiAgICB9XG4gICAgXG4gICAgZ2V0RGVmYXVsdFByb3BzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGVsYXk6IDAsXG4gICAgICAgICAgICBkaWxhdGU6IDEsXG4gICAgICAgICAgICBkdXJhdGlvbjogMzAwLFxuICAgICAgICAgICAgbG9vcDogZmFsc2UsXG4gICAgICAgICAgICB5b3lvOiBmYWxzZSxcbiAgICAgICAgICAgIGZsaXA6IGZhbHNlLFxuICAgICAgICAgICAgcGxheURpcmVjdGlvbjogMSxcbiAgICAgICAgICAgIGVuZGVkOiB0cnVlLFxuICAgICAgICAgICAgZWxhcHNlZDogMFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGdldERlZmF1bHRWYWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRlbGF5OiAwLFxuICAgICAgICAgICAgZHVyYXRpb246IDMwMCxcbiAgICAgICAgICAgIGVhc2U6ICdlYXNlT3V0JyxcbiAgICAgICAgICAgIHN0YWdnZXI6IDAsXG4gICAgICAgICAgICBzdGVwczogMCxcbiAgICAgICAgICAgIHRvOiAwLFxuICAgICAgICAgICAgcm91bmQ6IGZhbHNlXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZ2V0RGVmYXVsdFZhbHVlUHJvcCgpIHtcbiAgICAgICAgcmV0dXJuICd0byc7XG4gICAgfVxuXG4gICAgLypcbiAgICAgICAgVXBkYXRlIEFjdGlvbiBlbGFwc2VkIHRpbWVcbiAgICAgICAgXG4gICAgICAgIEBwYXJhbSBbb2JqZWN0XTogQWN0aW9uIHByb3BlcnRpZXNcbiAgICAgICAgQHBhcmFtIFtudW1iZXJdOiBUaW1lc3RhbXAgb2YgY3VycmVudCBmcmFtZVxuICAgICovXG4gICAgb25GcmFtZVN0YXJ0KGFjdG9yLCBmcmFtZUR1cmF0aW9uKSB7XG4gICAgICAgIHRoaXMuZWxhcHNlZCA9IHRoaXMuZWxhcHNlZCB8fCAwO1xuXG4gICAgICAgIGlmIChmcmFtZUR1cmF0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmVsYXBzZWQgKz0gKGZyYW1lRHVyYXRpb24gKiBhY3Rvci5kaWxhdGUpICogdGhpcy5wbGF5RGlyZWN0aW9uO1xuICAgICAgICAgICAgdGhpcy5lbmRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKlxuICAgICAgICBDYWxjdWxhdGUgcHJvZ3Jlc3Mgb2YgdmFsdWUgYmFzZWQgb24gdGltZSBlbGFwc2VkLFxuICAgICAgICB2YWx1ZSBkZWxheS9kdXJhdGlvbi9zdGFnZ2VyIHByb3BlcnRpZXNcblxuICAgICAgICBAcGFyYW0gW0FjdG9yXVxuICAgICAgICBAcGFyYW0gW29iamVjdF06IFZhbHVlIHN0YXRlIGFuZCBwcm9wZXJ0aWVzXG4gICAgICAgIEByZXR1cm4gW251bWJlcl06IENhbGN1bGF0ZWQgdmFsdWVcbiAgICAqL1xuICAgIHByb2Nlc3MoYWN0b3IsIHZhbHVlKSB7XG4gICAgICAgIHZhciB0YXJnZXQgPSB2YWx1ZS50byxcbiAgICAgICAgICAgIHByb2dyZXNzVGFyZ2V0ID0gKHRoaXMucGxheURpcmVjdGlvbiA9PT0gMSkgPyAxIDogMCxcbiAgICAgICAgICAgIG5ld1ZhbHVlID0gdmFsdWUuY3VycmVudCxcbiAgICAgICAgICAgIHByb2dyZXNzO1xuXG4gICAgICAgIC8vIElmIHRoaXMgdmFsdWUgaGFzIGEgdG8gcHJvcGVydHksIG90aGVyd2lzZSB3ZSBqdXN0IHJldHVybiBjdXJyZW50IHZhbHVlXG4gICAgICAgIGlmICh0YXJnZXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcHJvZ3Jlc3MgPSBjYWxjLnJlc3RyaWN0ZWQoY2FsYy5wcm9ncmVzcyh0aGlzLmVsYXBzZWQgLSB2YWx1ZS5kZWxheSwgdmFsdWUuZHVyYXRpb24pIC0gdmFsdWUuc3RhZ2dlciwgMCwgMSk7XG5cbiAgICAgICAgICAgIC8vIE1hcmsgQWN0aW9uIGFzIE5PVCBlbmRlZCBpZiBzdGlsbCBpbiBwcm9ncmVzc1xuICAgICAgICAgICAgaWYgKHByb2dyZXNzICE9PSBwcm9ncmVzc1RhcmdldCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZW5kZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gU3RlcCBwcm9ncmVzcyBpZiB3ZSdyZSBzdGVwcGluZ1xuICAgICAgICAgICAgaWYgKHZhbHVlLnN0ZXBzKSB7XG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3MgPSB1dGlscy5zdGVwUHJvZ3Jlc3MocHJvZ3Jlc3MsIHZhbHVlLnN0ZXBzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gRWFzZSB2YWx1ZVxuICAgICAgICAgICAgbmV3VmFsdWUgPSBlYXNlKHByb2dyZXNzLCB2YWx1ZS5vcmlnaW4sIHRhcmdldCwgdmFsdWUuZWFzZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3VmFsdWU7XG4gICAgfVxuXG4gICAgLypcbiAgICAgICAgSWYgdGhpcyB0d2VlbiBoYXMgZW5kZWQsIGNoZWNrIGlmIHdlIGxvb3AveW95by9mbGlwXG4gICAgICAgIFxuICAgICAgICBAcmV0dXJuIFtib29sZWFuXTogSGFzIHRoaXMgdHdlZW4gcmVhbGx5IHJlYWxseSBlbmRlZD9cbiAgICAqL1xuICAgIGhhc0VuZGVkKGFjdG9yKSB7XG4gICAgICAgIGlmICh0aGlzLmVuZGVkKSB7XG4gICAgICAgICAgICBlYWNoKG5leHRTdGVwcywgKG5hbWUsIG1ldGhvZE5hbWUpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGVja05leHRTdGVwKGFjdG9yLCBuYW1lLCB0aGlzW21ldGhvZE5hbWVdKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGFjdG9yLmhhc0NoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5lbmRlZDtcbiAgICB9XG5cbiAgICBjaGVja05leHRTdGVwKGFjdG9yLCBuYW1lLCBtZXRob2QpIHtcbiAgICAgICAgdmFyIHN0ZXBUYWtlbiA9IGZhbHNlLFxuICAgICAgICAgICAgc3RlcCA9IHRoaXNbbmFtZV0sXG4gICAgICAgICAgICBjb3VudCA9IHRoaXNbbmFtZSArIENPVU5UXSB8fCAwLFxuICAgICAgICAgICAgZm9yZXZlciA9IChzdGVwID09PSB0cnVlKTtcblxuICAgICAgICBpZiAoZm9yZXZlciB8fCB1dGlscy5pc051bShzdGVwKSkge1xuICAgICAgICAgICAgKytjb3VudDtcbiAgICAgICAgICAgIHRoaXNbbmFtZSArIENPVU5UXSA9IGNvdW50O1xuXG4gICAgICAgICAgICBpZiAoZm9yZXZlciB8fCBjb3VudCA8PSBzdGVwKSB7XG4gICAgICAgICAgICAgICAgbWV0aG9kLmNhbGwodGhpcywgYWN0b3IpO1xuICAgICAgICAgICAgICAgIHN0ZXBUYWtlbiA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3RlcFRha2VuO1xuICAgIH1cblxuICAgIGZsaXBWYWx1ZXMoYWN0b3IpIHtcbiAgICAgICAgdmFyIGFjdG9yVmFsdWVzID0gYWN0b3IudmFsdWVzO1xuICAgICAgICB0aGlzLmVsYXBzZWQgPSB0aGlzLmR1cmF0aW9uIC0gdGhpcy5lbGFwc2VkO1xuXG4gICAgICAgIGVhY2godGhpcy52YWx1ZXMsIChrZXkpID0+IHtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IGFjdG9yVmFsdWVzW2tleV07XG5cbiAgICAgICAgICAgIGlmICh2YWx1ZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIGVhY2godmFsdWUuY2hpbGRyZW4sIChjaGlsZEtleSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZU9wcy5mbGlwKGFjdG9yVmFsdWVzW2tleSArIGNoaWxkS2V5XSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhbHVlT3BzLmZsaXAodmFsdWUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXZlcnNlKCkge1xuICAgICAgICB0aGlzLnBsYXlEaXJlY3Rpb24gKj0gLTE7XG4gICAgfVxuXG4gICAgcmVzdGFydCgpIHtcbiAgICAgICAgdGhpcy5lbGFwc2VkID0gKHRoaXMucGxheURpcmVjdGlvbiA9PT0gMSkgPyAwIDogdGhpcy5kdXJhdGlvbjtcbiAgICAgICAgdGhpcy5zdGFydGVkID0gdXRpbHMuY3VycmVudFRpbWUoKTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVHdlZW47XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYWN0aW9ucy9Ud2Vlbi5qc1xuICoqLyIsImxldCBBY3Rpb24gPSByZXF1aXJlKCcuL0FjdGlvbicpLFxuICAgIGNhbGMgPSByZXF1aXJlKCcuLi9pbmMvY2FsYycpLFxuICAgIHV0aWxzID0gcmVxdWlyZSgnLi4vaW5jL3V0aWxzJyksXG4gICAgc2ltdWxhdGlvbnMgPSByZXF1aXJlKCcuL3NpbXVsYXRlL3NpbXVsYXRpb25zJyk7XG5cbmNvbnN0IERFRkFVTFRfUFJPUCA9ICd2ZWxvY2l0eSc7XG5cbmNsYXNzIFNpbXVsYXRlIGV4dGVuZHMgQWN0aW9uIHtcbiAgICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3MpO1xuICAgICAgICB0aGlzLmNhbGN1bGF0ZXNWZWxvY2l0eSA9IHRydWU7XG4gICAgICAgIHRoaXMuaW5hY3RpdmVGcmFtZXMgPSAwO1xuICAgIH1cblxuICAgIGdldERlZmF1bHRQcm9wcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG1heEluYWN0aXZlRnJhbWVzOiAzXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZ2V0RGVmYXVsdFZhbHVlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLy8gW3N0cmluZ106IFNpbXVsYXRpb24gdG8gLnJ1blxuICAgICAgICAgICAgc2ltdWxhdGU6IERFRkFVTFRfUFJPUCxcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gW251bWJlcl06IERlY2VsZXJhdGlvbiB0byBhcHBseSB0byB2YWx1ZSwgaW4gdW5pdHMgcGVyIHNlY29uZFxuICAgICAgICAgICAgZGVjZWxlcmF0aW9uOiAwLFxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBbbnVtYmVyXTogQWNjZWxlcmF0aW9uIHRvIGFwcGx5IHRvIHZhbHVlLCBpbiB1bml0cyBwZXIgc2Vjb25kXG4gICAgICAgICAgICBhY2NlbGVyYXRpb246IDAsXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIFtudW1iZXJdOiBGYWN0b3IgdG8gbXVsdGlwbHkgdmVsb2NpdHkgYnkgb24gYm91bmNlXG4gICAgICAgICAgICBib3VuY2U6IDAsXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIFtudW1iZXJdOiBTcHJpbmcgc3RyZW5ndGggZHVyaW5nICdzdHJpbmcnXG4gICAgICAgICAgICBzcHJpbmc6IDgwLFxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBbbnVtYmVyXTogVGltZWNvbnN0YW50IG9mIGdsaWRlXG4gICAgICAgICAgICB0aW1lQ29uc3RhbnQ6IDM5NSxcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gW251bWJlcl06IFN0b3Agc2ltdWxhdGlvbiB1bmRlciB0aGlzIHNwZWVkXG4gICAgICAgICAgICBzdG9wU3BlZWQ6IDUsXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIFtib29sZWFuXTogQ2FwdHVyZSB3aXRoIHNwcmluZyBwaHlzaWNzIG9uIGxpbWl0IGJyZWFjaFxuICAgICAgICAgICAgY2FwdHVyZTogZmFsc2UsXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIFtudW1iZXJdOiBGcmljdGlvbiB0byBhcHBseSBwZXIgZnJhbWVcbiAgICAgICAgICAgIGZyaWN0aW9uOiAwLFxuICAgICAgICAgICAgXG4gICAgICAgICAgICB0bzogMCxcbiAgICAgICAgICAgIHJvdW5kOiBmYWxzZVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGdldERlZmF1bHRWYWx1ZVByb3AoKSB7XG4gICAgICAgIHJldHVybiBERUZBVUxUX1BST1A7XG4gICAgfVxuICAgIFxuICAgIC8qXG4gICAgICAgIFNpbXVsYXRlIHRoZSBWYWx1ZSdzIHBlci1mcmFtZSBtb3ZlbWVudFxuICAgICAgICBcbiAgICAgICAgQHBhcmFtIFtBY3Rvcl1cbiAgICAgICAgQHBhcmFtIFtWYWx1ZV06IEN1cnJlbnQgdmFsdWVcbiAgICAgICAgQHBhcmFtIFtzdHJpbmddOiBLZXkgb2YgY3VycmVudCB2YWx1ZVxuICAgICAgICBAcGFyYW0gW251bWJlcl06IER1cmF0aW9uIG9mIGZyYW1lIGluIG1zXG4gICAgICAgIEByZXR1cm4gW251bWJlcl06IENhbGN1bGF0ZWQgdmFsdWVcbiAgICAqL1xuICAgIHByb2Nlc3MoYWN0b3IsIHZhbHVlLCBrZXksIHRpbWVTaW5jZUxhc3RGcmFtZSkge1xuICAgICAgICB2YXIgc2ltdWxhdGUgPSB2YWx1ZS5zaW11bGF0ZSxcbiAgICAgICAgICAgIHNpbXVsYXRpb24gPSB1dGlscy5pc1N0cmluZyhzaW11bGF0ZSkgPyBzaW11bGF0aW9uc1tzaW11bGF0ZV0gOiBzaW11bGF0ZSxcbiAgICAgICAgICAgIG5ld1ZlbG9jaXR5ID0gc2ltdWxhdGlvbiA/IHNpbXVsYXRpb24odmFsdWUsIHRpbWVTaW5jZUxhc3RGcmFtZSwgYWN0b3Iuc3RhcnRlZCkgOiAwO1xuXG4gICAgICAgIHZhbHVlLnZlbG9jaXR5ID0gKE1hdGguYWJzKG5ld1ZlbG9jaXR5KSA+PSB2YWx1ZS5zdG9wU3BlZWQpID8gbmV3VmVsb2NpdHkgOiAwO1xuICAgICAgICByZXR1cm4gdmFsdWUuY3VycmVudCArIGNhbGMuc3BlZWRQZXJGcmFtZSh2YWx1ZS52ZWxvY2l0eSwgdGltZVNpbmNlTGFzdEZyYW1lKTtcbiAgICB9XG4gICAgXG4gICAgLypcbiAgICAgICAgSGFzIHRoaXMgYWN0aW9uIGVuZGVkP1xuICAgICAgICBcbiAgICAgICAgVXNlIGEgZnJhbWVjb3VudGVyIHRvIHNlZSBpZiBBY3Rpb24gaGFzIGNoYW5nZWQgaW4gdGhlIGxhc3QgeCBmcmFtZXNcbiAgICAgICAgYW5kIGRlY2xhcmUgZW5kZWQgaWYgbm90XG4gICAgICAgIFxuICAgICAgICBAcGFyYW0gW0FjdG9yXVxuICAgICAgICBAcGFyYW0gW2Jvb2xlYW5dOiBIYXMgQWN0aW9uIGNoYW5nZWQ/XG4gICAgICAgIEByZXR1cm4gW2Jvb2xlYW5dOiBIYXMgQWN0aW9uIGVuZGVkP1xuICAgICovXG4gICAgaGFzRW5kZWQoYWN0b3IsIGhhc0NoYW5nZWQpIHtcbiAgICAgICAgdGhpcy5pbmFjdGl2ZUZyYW1lcyA9IGhhc0NoYW5nZWQgPyAwIDogdGhpcy5pbmFjdGl2ZUZyYW1lcyArIDE7XG4gICAgICAgIHJldHVybiAodGhpcy5pbmFjdGl2ZUZyYW1lcyA+IGFjdG9yLm1heEluYWN0aXZlRnJhbWVzKTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAgICBMaW1pdCBvdXRwdXQgdG8gdmFsdWUgcmFuZ2UsIGlmIGFueVxuICAgICAgICBcbiAgICAgICAgSWYgdmVsb2NpdHkgaXMgYXQgb3IgbW9yZSB0aGFuIHJhbmdlLCBhbmQgdmFsdWUgaGFzIGEgYm91bmNlIHByb3BlcnR5LFxuICAgICAgICBydW4gdGhlIGJvdW5jZSBzaW11bGF0aW9uXG4gICAgICAgIFxuICAgICAgICBAcGFyYW0gW251bWJlcl06IENhbGN1bGF0ZWQgb3V0cHV0XG4gICAgICAgIEBwYXJhbSBbVmFsdWVdOiBDdXJyZW50IFZhbHVlXG4gICAgICAgIEByZXR1cm4gW251bWJlcl06IExpbWl0LWFkanVzdGVkIG91dHB1dFxuICAgICovXG4gICAgbGltaXQob3V0cHV0LCB2YWx1ZSkge1xuICAgICAgICB2YXIgaXNPdXRzaWRlTWF4ID0gKG91dHB1dCA+PSB2YWx1ZS5tYXgpLFxuICAgICAgICAgICAgaXNPdXRzaWRlTWluID0gKG91dHB1dCA8PSB2YWx1ZS5taW4pLFxuICAgICAgICAgICAgaXNPdXRzaWRlUmFuZ2UgPSBpc091dHNpZGVNYXggfHwgaXNPdXRzaWRlTWluO1xuXG4gICAgICAgIGlmIChpc091dHNpZGVSYW5nZSkge1xuICAgICAgICAgICAgb3V0cHV0ID0gY2FsYy5yZXN0cmljdGVkKG91dHB1dCwgdmFsdWUubWluLCB2YWx1ZS5tYXgpO1xuXG4gICAgICAgICAgICBpZiAodmFsdWUuYm91bmNlKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUudmVsb2NpdHkgPSBzaW11bGF0aW9ucy5ib3VuY2UodmFsdWUpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlLmNhcHR1cmUpIHtcbiAgICAgICAgICAgICAgICBzaW11bGF0aW9ucy5jYXB0dXJlKHZhbHVlLCBpc091dHNpZGVNYXggPyB2YWx1ZS5tYXggOiB2YWx1ZS5taW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTaW11bGF0ZTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9hY3Rpb25zL1NpbXVsYXRlLmpzXG4gKiovIiwibGV0IEFjdGlvbiA9IHJlcXVpcmUoJy4vQWN0aW9uJyksXG4gICAgUG9pbnRlciA9IHJlcXVpcmUoJy4uL2lucHV0L1BvaW50ZXInKSxcbiAgICBjYWxjID0gcmVxdWlyZSgnLi4vaW5jL2NhbGMnKTtcblxuY2xhc3MgVHJhY2sgZXh0ZW5kcyBBY3Rpb24ge1xuICAgIC8qXG4gICAgICAgIFVwZGF0ZSBpbnB1dCBvZmZzZXRcbiAgICAqL1xuICAgIG9uRnJhbWVTdGFydChhY3RvciwgZnJhbWVEdXJhdGlvbiwgZnJhbWVzdGFtcCkge1xuICAgICAgICBhY3Rvci5zdGF0ZS5pbnB1dCA9IHRoaXMuaW5wdXQub25GcmFtZShmcmFtZXN0YW1wKTtcbiAgICAgICAgdGhpcy5pbnB1dE9mZnNldCA9IGNhbGMub2Zmc2V0KHRoaXMuaW5wdXRPcmlnaW4sIHRoaXMuaW5wdXQuY3VycmVudCk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgICAgTW92ZSBWYWx1ZSByZWxhdGl2ZSB0byBJbnB1dCBtb3ZlbWVudFxuICAgICAgICBcbiAgICAgICAgQHBhcmFtIFtWYWx1ZV06IEN1cnJlbnQgdmFsdWVcbiAgICAgICAgQHBhcmFtIFtzdHJpbmddOiBLZXkgb2YgY3VycmVudCB2YWx1ZVxuICAgICAgICBAcmV0dXJuIFtudW1iZXJdOiBDYWxjdWxhdGVkIHZhbHVlXG4gICAgKi9cbiAgICBwcm9jZXNzKGFjdG9yLCB2YWx1ZSwga2V5KSB7XG4gICAgICAgIHJldHVybiAodGhpcy5pbnB1dE9mZnNldC5oYXNPd25Qcm9wZXJ0eShrZXkpKSA/IHZhbHVlLm9yaWdpbiArIHRoaXMuaW5wdXRPZmZzZXRba2V5XSA6IHZhbHVlLmN1cnJlbnQ7XG4gICAgfVxuXG4gICAgLypcbiAgICAgICAgSGFzIHRoaXMgQWN0aW9uIGVuZGVkPyBcbiAgICAgICAgXG4gICAgICAgIEByZXR1cm4gW2Jvb2xlYW5dOiBGYWxzZSB0byBtYWtlIHVzZXIgbWFudWFsbHkgZmluaXNoIC50cmFjaygpXG4gICAgKi9cbiAgICBoYXNFbmRlZCgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGJpbmRJbnB1dChpbnB1dCkge1xuICAgICAgICB0aGlzLmlucHV0ID0gKCFpbnB1dC5jdXJyZW50KSA/IG5ldyBQb2ludGVyKGlucHV0KSA6IGlucHV0O1xuICAgICAgICB0aGlzLmlucHV0T3JpZ2luID0gdGhpcy5pbnB1dC5nZXQoKTtcbiAgICB9XG5cbiAgICBnZXREZWZhdWx0VmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhbXA6IDFcbiAgICAgICAgfTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVHJhY2s7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYWN0aW9ucy9UcmFjay5qc1xuICoqLyIsIi8qXG4gICAgQ2FsY3VsYXRvcnNcbiAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgXG4gICAgU2ltcGxlIEkvTyBzbmlwcGV0c1xuKi9cblwidXNlIHN0cmljdFwiO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzLmpzJyksXG5cbiAgICBjYWxjID0ge1xuICAgICAgICBcbiAgICAgICAgLypcbiAgICAgICAgICAgIEFuZ2xlIGJldHdlZW4gcG9pbnRzXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIFRyYW5zbGF0ZXMgdGhlIGh5cG90aGV0aWNhbCBsaW5lIHNvIHRoYXQgdGhlICdmcm9tJyBjb29yZGluYXRlc1xuICAgICAgICAgICAgYXJlIGF0IDAsMCwgdGhlbiByZXR1cm4gdGhlIGFuZ2xlIHVzaW5nIC5hbmdsZUZyb21DZW50ZXIoKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBAcGFyYW0gW29iamVjdF06IFggYW5kIFkgY29vcmRpbmF0ZXMgb2YgZnJvbSBwb2ludFxuICAgICAgICAgICAgQHBhcmFtIFtvYmplY3RdOiBYIGFuZCBZIGNvcmRpbmF0ZXMgb2YgdG8gcG9pbnRcbiAgICAgICAgICAgIEByZXR1cm4gW3JhZGlhbl06IEFuZ2xlIGJldHdlZW4gdGhlIHR3byBwb2ludHMgaW4gcmFkaWFuc1xuICAgICAgICAqL1xuICAgICAgICBhbmdsZTogZnVuY3Rpb24gKHBvaW50QSwgcG9pbnRCKSB7XG4gICAgICAgICAgICB2YXIgZnJvbSA9IHBvaW50QiA/IHBvaW50QSA6IHt4OiAwLCB5OiAwfSxcbiAgICAgICAgICAgICAgICB0byA9IHBvaW50QiB8fCBwb2ludEEsXG4gICAgICAgICAgICAgICAgcG9pbnQgPSB7XG4gICAgICAgICAgICAgICAgICAgIHg6IHRvLnggLSBmcm9tLngsXG4gICAgICAgICAgICAgICAgICAgIHk6IHRvLnkgLSBmcm9tLnlcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hbmdsZUZyb21DZW50ZXIocG9pbnQueCwgcG9pbnQueSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLypcbiAgICAgICAgICAgIEFuZ2xlIGZyb20gY2VudGVyXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIFJldHVybnMgdGhlIGN1cnJlbnQgYW5nbGUsIGluIHJhZGlhbnMsIG9mIGEgZGVmaW5lZCBwb2ludFxuICAgICAgICAgICAgZnJvbSBhIGNlbnRlciAoYXNzdW1lZCAwLDApXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIEBwYXJhbSBbbnVtYmVyXTogWCBjb29yZGluYXRlIG9mIHNlY29uZCBwb2ludFxuICAgICAgICAgICAgQHBhcmFtIFtudW1iZXJdOiBZIGNvb3JkaW5hdGUgb2Ygc2Vjb25kIHBvaW50XG4gICAgICAgICAgICBAcmV0dXJuIFtyYWRpYW5dOiBBbmdsZSBiZXR3ZWVuIDAsIDAgYW5kIHBvaW50IGluIHJhZGlhbnNcbiAgICAgICAgKi9cbiAgICAgICAgYW5nbGVGcm9tQ2VudGVyOiBmdW5jdGlvbiAoeCwgeSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmFkaWFuc1RvRGVncmVlcyhNYXRoLmF0YW4yKHksIHgpKTtcbiAgICAgICAgfSxcbiAgICAgICAgXG4gICAgICAgIC8qXG4gICAgICAgICAgICBDb252ZXJ0IGRlZ3JlZXMgdG8gcmFkaWFuc1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBAcGFyYW0gW251bWJlcl06IFZhbHVlIGluIGRlZ3JlZXNcbiAgICAgICAgICAgIEByZXR1cm4gW251bWJlcl06IFZhbHVlIGluIHJhZGlhbnNcbiAgICAgICAgKi9cbiAgICAgICAgZGVncmVlc1RvUmFkaWFuczogZnVuY3Rpb24gKGRlZ3JlZXMpIHtcbiAgICAgICAgICAgIHJldHVybiBkZWdyZWVzICogTWF0aC5QSSAvIDE4MDtcbiAgICAgICAgfSxcblxuICAgICAgICAvKlxuICAgICAgICAgICAgRGlsYXRlXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIENoYW5nZSB0aGUgcHJvZ3Jlc3Npb24gYmV0d2VlbiBhIGFuZCBiIGFjY29yZGluZyB0byBkaWxhdGlvbi5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgU28gZGlsYXRpb24gPSAwLjUgd291bGQgY2hhbmdlXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGEgLS0tLS0tLS0tIGJcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdG9cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgYSAtLS0tIGJcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgQHBhcmFtIFtudW1iZXJdOiBQcmV2aW91cyB2YWx1ZVxuICAgICAgICAgICAgQHBhcmFtIFtudW1iZXJdOiBDdXJyZW50IHZhbHVlXG4gICAgICAgICAgICBAcGFyYW0gW251bWJlcl06IERpbGF0ZSBwcm9ncmVzcyBieSB4XG4gICAgICAgICAgICBAcmV0dXJuIFtudW1iZXJdOiBQcmV2aW91cyB2YWx1ZSBwbHVzIHRoZSBkaWxhdGVkIGRpZmZlcmVuY2VcbiAgICAgICAgKi9cbiAgICAgICAgZGlsYXRlOiBmdW5jdGlvbiAoYSwgYiwgZGlsYXRpb24pIHtcbiAgICAgICAgICAgIHJldHVybiBhICsgKChiIC0gYSkgKiBkaWxhdGlvbik7XG4gICAgICAgIH0sXG4gICAgICAgICAgICBcbiAgICAgICAgLypcbiAgICAgICAgICAgIERpc3RhbmNlXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIFJldHVybnMgdGhlIGRpc3RhbmNlIGJldHdlZW4gKDAsMCkgYW5kIHBvaW50QSwgdW5sZXNzIHBvaW50QlxuICAgICAgICAgICAgaXMgcHJvdmlkZWQsIHRoZW4gd2UgcmV0dXJuIHRoZSBkaWZmZXJlbmNlIGJldHdlZW4gdGhlIHR3by5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgQHBhcmFtIFtvYmplY3QvbnVtYmVyXTogeCBhbmQgeSBvciBqdXN0IHggb2YgcG9pbnQgQVxuICAgICAgICAgICAgQHBhcmFtIFtvYmplY3QvbnVtYmVyXTogKG9wdGlvbmFsKTogeCBhbmQgeSBvciBqdXN0IHggb2YgcG9pbnQgQlxuICAgICAgICAgICAgQHJldHVybiBbbnVtYmVyXTogVGhlIGRpc3RhbmNlIGJldHdlZW4gdGhlIHR3byBwb2ludHNcbiAgICAgICAgKi9cbiAgICAgICAgZGlzdGFuY2U6IGZ1bmN0aW9uIChwb2ludEEsIHBvaW50Qikge1xuICAgICAgICAgICAgcmV0dXJuICh0eXBlb2YgcG9pbnRBID09PSBcIm51bWJlclwiKSA/IHRoaXMuZGlzdGFuY2UxRChwb2ludEEsIHBvaW50QikgOiB0aGlzLmRpc3RhbmNlMkQocG9pbnRBLCBwb2ludEIpO1xuICAgICAgICB9LFxuICAgIFxuICAgICAgICAvKlxuICAgICAgICAgICAgRGlzdGFuY2UgMURcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgUmV0dXJucyB0aGUgZGlzdGFuY2UgYmV0d2VlbiBwb2ludCBBIGFuZCBwb2ludCBCXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIEBwYXJhbSBbbnVtYmVyXTogUG9pbnQgQVxuICAgICAgICAgICAgQHBhcmFtIFtudW1iZXJdOiAob3B0aW9uYWwpOiBQb2ludCBCXG4gICAgICAgICAgICBAcmV0dXJuIFtudW1iZXJdOiBUaGUgZGlzdGFuY2UgYmV0d2VlbiB0aGUgdHdvIHBvaW50c1xuICAgICAgICAqL1xuICAgICAgICBkaXN0YW5jZTFEOiBmdW5jdGlvbiAocG9pbnRBLCBwb2ludEIpIHtcbiAgICAgICAgICAgIHZhciBiSXNOdW0gPSAodHlwZW9mIHBvaW50QiA9PT0gJ251bWJlcicpLFxuICAgICAgICAgICAgICAgIGZyb20gPSBiSXNOdW0gPyBwb2ludEEgOiAwLFxuICAgICAgICAgICAgICAgIHRvID0gYklzTnVtID8gcG9pbnRCIDogcG9pbnRBO1xuICAgIFxuICAgICAgICAgICAgcmV0dXJuIGFic29sdXRlKHRvIC0gZnJvbSk7XG4gICAgICAgIH0sXG4gICAgXG4gICAgICBcbiAgICAgICAgLypcbiAgICAgICAgICAgIERpc3RhbmNlIDJEXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIFJldHVybnMgdGhlIGRpc3RhbmNlIGJldHdlZW4gKDAsMCkgYW5kIHBvaW50IEEsIHVubGVzcyBwb2ludCBCXG4gICAgICAgICAgICBpcyBwcm92aWRlZCwgdGhlbiB3ZSByZXR1cm4gdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGUgdHdvLlxuICAgICAgICAgICAgXG4gICAgICAgICAgICBAcGFyYW0gW29iamVjdF06IHggYW5kIHkgb2YgcG9pbnQgQVxuICAgICAgICAgICAgQHBhcmFtIFtvYmplY3RdOiAob3B0aW9uYWwpOiB4IGFuZCB5IG9mIHBvaW50IEJcbiAgICAgICAgICAgIEByZXR1cm4gW251bWJlcl06IFRoZSBkaXN0YW5jZSBiZXR3ZWVuIHRoZSB0d28gcG9pbnRzXG4gICAgICAgICovXG4gICAgICAgIGRpc3RhbmNlMkQ6IGZ1bmN0aW9uIChwb2ludEEsIHBvaW50Qikge1xuICAgICAgICAgICAgdmFyIGJJc09iaiA9ICh0eXBlb2YgcG9pbnRCID09PSBcIm9iamVjdFwiKSxcbiAgICAgICAgICAgICAgICBmcm9tID0gYklzT2JqID8gcG9pbnRBIDoge3g6IDAsIHk6IDB9LFxuICAgICAgICAgICAgICAgIHRvID0gYklzT2JqID8gcG9pbnRCIDogcG9pbnRBLFxuICAgICAgICAgICAgICAgIHBvaW50ID0ge1xuICAgICAgICAgICAgICAgICAgICB4OiBhYnNvbHV0ZSh0by54IC0gZnJvbS54KSxcbiAgICAgICAgICAgICAgICAgICAgeTogYWJzb2x1dGUodG8ueSAtIGZyb20ueSlcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaHlwb3RlbnVzZShwb2ludC54LCBwb2ludC55KTtcbiAgICAgICAgfSxcbiAgICAgICAgICAgIFxuICAgICAgICAvKlxuICAgICAgICAgICAgSHlwb3RlbnVzZVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBSZXR1cm5zIHRoZSBoeXBvdGVudXNlLCBzaWRlIEMsIGdpdmVuIHRoZSBsZW5ndGhzIG9mIHNpZGVzIEEgYW5kIEIuXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIEBwYXJhbSBbbnVtYmVyXTogTGVuZ3RoIG9mIEFcbiAgICAgICAgICAgIEBwYXJhbSBbbnVtYmVyXTogTGVuZ3RoIG9mIEJcbiAgICAgICAgICAgIEByZXR1cm4gW251bWJlcl06IExlbmd0aCBvZiBDXG4gICAgICAgICovXG4gICAgICAgIGh5cG90ZW51c2U6IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICB2YXIgYTIgPSBhICogYSxcbiAgICAgICAgICAgICAgICBiMiA9IGIgKiBiLFxuICAgICAgICAgICAgICAgIGMyID0gYTIgKyBiMjtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnNxcnQoYzIpO1xuICAgICAgICB9LFxuICAgICAgICBcbiAgICAgICAgLypcbiAgICAgICAgICAgIE9mZnNldCBiZXR3ZWVuIHR3byBpbnB1dHNcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgQ2FsY3VsYXRlIHRoZSBkaWZmZXJlbmNlIGJldHdlZW4gdHdvIGRpZmZlcmVudCBpbnB1dHNcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgQHBhcmFtIFtQb2ludF06IEZpcnN0IGlucHV0XG4gICAgICAgICAgICBAcGFyYW0gW1BvaW50XTogU2Vjb25kIGlucHV0XG4gICAgICAgICAgICBAcmV0dXJuIFtPZmZzZXRdOiBEaXN0YW5jZSBtZXRyaWNzIGJldHdlZW4gdHdvIHBvaW50c1xuICAgICAgICAqL1xuICAgICAgICBvZmZzZXQ6IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICB2YXIgb2Zmc2V0ID0ge307XG4gICAgXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gYikge1xuICAgICAgICAgICAgICAgIGlmIChiLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGEuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0W2tleV0gPSBiW2tleV0gLSBhW2tleV07XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXRba2V5XSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXNOdW0ob2Zmc2V0LngpICYmIGlzTnVtKG9mZnNldC55KSkge1xuICAgICAgICAgICAgICAgIG9mZnNldC5hbmdsZSA9IHRoaXMuYW5nbGUoYSwgYik7XG4gICAgICAgICAgICAgICAgb2Zmc2V0LmRpc3RhbmNlID0gdGhpcy5kaXN0YW5jZTJEKGEsIGIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIG9mZnNldDtcbiAgICAgICAgfSxcbiAgICAgICAgXG4gICAgICAgIC8qXG4gICAgICAgICAgICBQb2ludCBmcm9tIGFuZ2xlIGFuZCBkaXN0YW5jZVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBAcGFyYW0gW29iamVjdF06IDJEIHBvaW50IG9mIG9yaWdpblxuICAgICAgICAgICAgQHBhcmFtIFtudW1iZXJdOiBBbmdsZSBmcm9tIG9yaWdpblxuICAgICAgICAgICAgQHBhcmFtIFtudW1iZXJdOiBEaXN0YW5jZSBmcm9tIG9yaWdpblxuICAgICAgICAgICAgQHJldHVybiBbb2JqZWN0XTogQ2FsY3VsYXRlZCAyRCBwb2ludFxuICAgICAgICAqL1xuICAgICAgICBwb2ludEZyb21BbmdsZUFuZERpc3RhbmNlOiBmdW5jdGlvbiAob3JpZ2luLCBhbmdsZSwgZGlzdGFuY2UpIHtcbiAgICAgICAgICAgIHZhciBwb2ludCA9IHt9O1xuICAgIFxuICAgIFx0XHRwb2ludC54ID0gZGlzdGFuY2UgKiBNYXRoLmNvcyhhbmdsZSkgKyBvcmlnaW4ueDtcbiAgICAgICAgICAgIHBvaW50LnkgPSBkaXN0YW5jZSAqIE1hdGguc2luKGFuZ2xlKSArIG9yaWdpbi55O1xuICAgIFxuICAgICAgICAgICAgcmV0dXJuIHBvaW50O1xuICAgICAgICB9LFxuICAgIFxuICAgICAgICAvKlxuICAgICAgICAgICAgUHJvZ3Jlc3Mgd2l0aGluIGdpdmVuIHJhbmdlXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIEdpdmVuIGEgbG93ZXIgbGltaXQgYW5kIGFuIHVwcGVyIGxpbWl0LCB3ZSByZXR1cm4gdGhlIHByb2dyZXNzXG4gICAgICAgICAgICAoZXhwcmVzc2VkIGFzIGEgbnVtYmVyIDAtMSkgcmVwcmVzZW50ZWQgYnkgdGhlIGdpdmVuIHZhbHVlLCBhbmRcbiAgICAgICAgICAgIGxpbWl0IHRoYXQgcHJvZ3Jlc3MgdG8gd2l0aGluIDAtMS5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgQHBhcmFtIFtudW1iZXJdOiBWYWx1ZSB0byBmaW5kIHByb2dyZXNzIHdpdGhpbiBnaXZlbiByYW5nZVxuICAgICAgICAgICAgQHBhcmFtIFtudW1iZXJdOiBMb3dlciBsaW1pdCBpZiBmdWxsIHJhbmdlIGdpdmVuLCB1cHBlciBpZiBub3RcbiAgICAgICAgICAgIEBwYXJhbSBbbnVtYmVyXSAob3B0aW9uYWwpOiBVcHBlciBsaW1pdCBvZiByYW5nZVxuICAgICAgICAgICAgQHJldHVybiBbbnVtYmVyXTogUHJvZ3Jlc3Mgb2YgdmFsdWUgd2l0aGluIHJhbmdlIGFzIGV4cHJlc3NlZCAwLTFcbiAgICAgICAgKi9cbiAgICAgICAgcHJvZ3Jlc3M6IGZ1bmN0aW9uICh2YWx1ZSwgbGltaXRBLCBsaW1pdEIpIHtcbiAgICAgICAgICAgIHZhciBiSXNOdW0gPSAodHlwZW9mIGxpbWl0QiA9PT0gJ251bWJlcicpLFxuICAgICAgICAgICAgICAgIGZyb20gPSBiSXNOdW0gPyBsaW1pdEEgOiAwLFxuICAgICAgICAgICAgICAgIHRvID0gYklzTnVtID8gbGltaXRCIDogbGltaXRBLFxuICAgICAgICAgICAgICAgIHJhbmdlID0gdG8gLSBmcm9tLFxuICAgICAgICAgICAgICAgIHByb2dyZXNzID0gKHZhbHVlIC0gZnJvbSkgLyByYW5nZTtcbiAgICBcbiAgICAgICAgICAgIHJldHVybiBwcm9ncmVzcztcbiAgICAgICAgfSxcbiAgICAgICAgXG4gICAgICAgIC8qXG4gICAgICAgICAgICBDb252ZXJ0IHJhZGlhbnMgdG8gZGVncmVlc1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBAcGFyYW0gW251bWJlcl06IFZhbHVlIGluIHJhZGlhbnNcbiAgICAgICAgICAgIEByZXR1cm4gW251bWJlcl06IFZhbHVlIGluIGRlZ3JlZXNcbiAgICAgICAgKi9cbiAgICAgICAgcmFkaWFuc1RvRGVncmVlczogZnVuY3Rpb24gKHJhZGlhbnMpIHtcbiAgICAgICAgICAgIHJldHVybiByYWRpYW5zICogMTgwIC8gTWF0aC5QSTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKlxuICAgICAgICAgICAgUmV0dXJuIHJhbmRvbSBudW1iZXIgYmV0d2VlbiByYW5nZVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBAcGFyYW0gW251bWJlcl0gKG9wdGlvbmFsKTogT3V0cHV0IG1pbmltdW1cbiAgICAgICAgICAgIEBwYXJhbSBbbnVtYmVyXSAob3B0aW9uYWwpOiBPdXRwdXQgbWF4aW11bVxuICAgICAgICAgICAgQHJldHVybiBbbnVtYmVyXTogUmFuZG9tIG51bWJlciB3aXRoaW4gcmFuZ2UsIG9yIDAgYW5kIDEgaWYgbm9uZSBwcm92aWRlZFxuICAgICAgICAqL1xuICAgICAgICByYW5kb206IGZ1bmN0aW9uIChtaW4sIG1heCkge1xuICAgICAgICAgICAgbWluID0gaXNOdW0obWluKSA/IG1pbiA6IDA7XG4gICAgICAgICAgICBtYXggPSBpc051bShtYXgpID8gbWF4IDogMTtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW47XG4gICAgICAgIH0sXG4gICAgICAgIFxuICAgICAgICAvKlxuICAgICAgICAgICAgQ2FsY3VsYXRlIHJlbGF0aXZlIHZhbHVlXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIFRha2VzIHRoZSBvcGVyYXRvciBhbmQgdmFsdWUgZnJvbSBhIHN0cmluZywgaWUgXCIrPTVcIiwgYW5kIGFwcGxpZXNcbiAgICAgICAgICAgIHRvIHRoZSBjdXJyZW50IHZhbHVlIHRvIHJlc29sdmUgYSBuZXcgdGFyZ2V0LlxuICAgICAgICAgICAgXG4gICAgICAgICAgICBAcGFyYW0gW251bWJlcl06IEN1cnJlbnQgdmFsdWVcbiAgICAgICAgICAgIEBwYXJhbSBbc3RyaW5nXTogUmVsYXRpdmUgdmFsdWVcbiAgICAgICAgICAgIEByZXR1cm4gW251bWJlcl06IE5ldyB2YWx1ZVxuICAgICAgICAqL1xuICAgICAgICByZWxhdGl2ZVZhbHVlOiBmdW5jdGlvbiAoY3VycmVudCwgcmVsKSB7XG4gICAgICAgICAgICB2YXIgbmV3VmFsdWUgPSBjdXJyZW50LFxuICAgICAgICAgICAgICAgIGVxdWF0aW9uID0gcmVsLnNwbGl0KCc9JyksXG4gICAgICAgICAgICAgICAgb3BlcmF0b3IgPSBlcXVhdGlvblswXSxcbiAgICAgICAgICAgICAgICBzcGxpdFZhbCA9IHV0aWxzLnNwbGl0VmFsVW5pdChlcXVhdGlvblsxXSk7XG5cbiAgICAgICAgICAgIHN3aXRjaCAob3BlcmF0b3IpIHtcbiAgICAgICAgICAgICAgICBjYXNlICcrJzpcbiAgICAgICAgICAgICAgICAgICAgbmV3VmFsdWUgKz0gc3BsaXRWYWwudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJy0nOlxuICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZSAtPSBzcGxpdFZhbC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnKic6XG4gICAgICAgICAgICAgICAgICAgIG5ld1ZhbHVlICo9IHNwbGl0VmFsLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICcvJzpcbiAgICAgICAgICAgICAgICAgICAgbmV3VmFsdWUgLz0gc3BsaXRWYWwudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoc3BsaXRWYWwudW5pdCkge1xuICAgICAgICAgICAgICAgIG5ld1ZhbHVlICs9IHNwbGl0VmFsLnVuaXQ7XG4gICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICByZXR1cm4gbmV3VmFsdWU7XG4gICAgICAgIH0sXG4gICAgXG4gICAgXG4gICAgICAgIC8qXG4gICAgICAgICAgICBSZXN0cmljdCB2YWx1ZSB0byByYW5nZVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBSZXR1cm4gdmFsdWUgd2l0aGluIHRoZSByYW5nZSBvZiBsb3dlckxpbWl0IGFuZCB1cHBlckxpbWl0XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIEBwYXJhbSBbbnVtYmVyXTogVmFsdWUgdG8ga2VlcCB3aXRoaW4gcmFuZ2VcbiAgICAgICAgICAgIEBwYXJhbSBbbnVtYmVyXTogTG93ZXIgbGltaXQgb2YgcmFuZ2VcbiAgICAgICAgICAgIEBwYXJhbSBbbnVtYmVyXTogVXBwZXIgbGltaXQgb2YgcmFuZ2VcbiAgICAgICAgICAgIEByZXR1cm4gW251bWJlcl06IFZhbHVlIGFzIGxpbWl0ZWQgd2l0aGluIGdpdmVuIHJhbmdlXG4gICAgICAgICovXG4gICAgICAgIHJlc3RyaWN0ZWQ6IGZ1bmN0aW9uICh2YWx1ZSwgbWluLCBtYXgpIHtcbiAgICAgICAgICAgIHZhciByZXN0cmljdGVkID0gKG1pbiAhPT0gdW5kZWZpbmVkKSA/IE1hdGgubWF4KHZhbHVlLCBtaW4pIDogdmFsdWU7XG4gICAgICAgICAgICByZXN0cmljdGVkID0gKG1heCAhPT0gdW5kZWZpbmVkKSA/IE1hdGgubWluKHJlc3RyaWN0ZWQsIG1heCkgOiByZXN0cmljdGVkO1xuICAgIFxuICAgICAgICAgICAgcmV0dXJuIHJlc3RyaWN0ZWQ7XG4gICAgICAgIH0sXG4gICAgXG4gICAgICAgIC8qXG4gICAgICAgICAgICBDb252ZXJ0IHggcGVyIHNlY29uZCB0byBwZXIgZnJhbWUgdmVsb2NpdHkgYmFzZWQgb24gZnBzXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIEBwYXJhbSBbbnVtYmVyXTogVW5pdCBwZXIgc2Vjb25kXG4gICAgICAgICAgICBAcGFyYW0gW251bWJlcl06IEZyYW1lIGR1cmF0aW9uIGluIG1zXG4gICAgICAgICovXG4gICAgICAgIHNwZWVkUGVyRnJhbWU6IGZ1bmN0aW9uICh4cHMsIGZyYW1lRHVyYXRpb24pIHtcbiAgICAgICAgICAgIHJldHVybiAoaXNOdW0oeHBzKSkgPyB4cHMgLyAoMTAwMCAvIGZyYW1lRHVyYXRpb24pIDogMDtcbiAgICAgICAgfSxcbiAgICBcbiAgICAgICAgLypcbiAgICAgICAgICAgIENvbnZlcnQgdmVsb2NpdHkgaW50byB2ZWxpY2l0eSBwZXIgc2Vjb25kXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIEBwYXJhbSBbbnVtYmVyXTogVW5pdCBwZXIgZnJhbWVcbiAgICAgICAgICAgIEBwYXJhbSBbbnVtYmVyXTogRnJhbWUgZHVyYXRpb24gaW4gbXNcbiAgICAgICAgKi9cbiAgICAgICAgc3BlZWRQZXJTZWNvbmQ6IGZ1bmN0aW9uICh2ZWxvY2l0eSwgZnJhbWVEdXJhdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIHZlbG9jaXR5ICogKDEwMDAgLyBmcmFtZUR1cmF0aW9uKTtcbiAgICAgICAgfSxcbiAgICBcbiAgICAgXG4gICAgICAgIC8qXG4gICAgICAgICAgICBWYWx1ZSBpbiByYW5nZSBmcm9tIHByb2dyZXNzXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIEdpdmVuIGEgbG93ZXIgbGltaXQgYW5kIGFuIHVwcGVyIGxpbWl0LCB3ZSByZXR1cm4gdGhlIHZhbHVlIHdpdGhpblxuICAgICAgICAgICAgdGhhdCByYW5nZSBhcyBleHByZXNzZWQgYnkgcHJvZ3Jlc3MgKGEgbnVtYmVyIGZyb20gMC0xKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBAcGFyYW0gW251bWJlcl06IFRoZSBwcm9ncmVzcyBiZXR3ZWVuIGxvd2VyIGFuZCB1cHBlciBsaW1pdHMgZXhwcmVzc2VkIDAtMVxuICAgICAgICAgICAgQHBhcmFtIFtudW1iZXJdOiBMb3dlciBsaW1pdCBvZiByYW5nZSwgb3IgdXBwZXIgaWYgbGltaXQyIG5vdCBwcm92aWRlZFxuICAgICAgICAgICAgQHBhcmFtIFtudW1iZXJdIChvcHRpb25hbCk6IFVwcGVyIGxpbWl0IG9mIHJhbmdlXG4gICAgICAgICAgICBAcmV0dXJuIFtudW1iZXJdOiBWYWx1ZSBhcyBjYWxjdWxhdGVkIGZyb20gcHJvZ3Jlc3Mgd2l0aGluIHJhbmdlIChub3QgbGltaXRlZCB3aXRoaW4gcmFuZ2UpXG4gICAgICAgICovXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiAocHJvZ3Jlc3MsIGxpbWl0QSwgbGltaXRCKSB7XG4gICAgICAgICAgICB2YXIgYklzTnVtID0gKHR5cGVvZiBsaW1pdEIgPT09ICdudW1iZXInKSxcbiAgICAgICAgICAgICAgICBmcm9tID0gYklzTnVtID8gbGltaXRBIDogMCxcbiAgICAgICAgICAgICAgICB0byA9IGJJc051bSA/IGxpbWl0QiA6IGxpbWl0QTtcbiAgICBcbiAgICAgICAgICAgIHJldHVybiAoLSBwcm9ncmVzcyAqIGZyb20pICsgKHByb2dyZXNzICogdG8pICsgZnJvbTsgXG4gICAgICAgIH0sXG4gICAgXG4gICAgXG4gICAgICAgIC8qXG4gICAgICAgICAgICBFYXNlZCB2YWx1ZSBpbiByYW5nZSBmcm9tIHByb2dyZXNzXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIEdpdmVuIGEgbG93ZXIgbGltaXQgYW5kIGFuIHVwcGVyIGxpbWl0LCB3ZSByZXR1cm4gdGhlIHZhbHVlIHdpdGhpblxuICAgICAgICAgICAgdGhhdCByYW5nZSBhcyBleHByZXNzZWQgYnkgcHJvZ3Jlc3MgKGEgbnVtYmVyIGZyb20gMC0xKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBAcGFyYW0gW251bWJlcl06IFRoZSBwcm9ncmVzcyBiZXR3ZWVuIGxvd2VyIGFuZCB1cHBlciBsaW1pdHMgZXhwcmVzc2VkIDAtMVxuICAgICAgICAgICAgQHBhcmFtIFtudW1iZXJdOiBMb3dlciBsaW1pdCBvZiByYW5nZSwgb3IgdXBwZXIgaWYgbGltaXQyIG5vdCBwcm92aWRlZFxuICAgICAgICAgICAgQHBhcmFtIFtudW1iZXJdOiBVcHBlciBsaW1pdCBvZiByYW5nZVxuICAgICAgICAgICAgQHBhcmFtIFtmdW5jdGlvbl06IEVhc2luZyB0byBhcHBseSB0byB2YWx1ZVxuICAgICAgICAgICAgQHJldHVybiBbbnVtYmVyXTogVmFsdWUgYXMgY2FsY3VsYXRlZCBmcm9tIHByb2dyZXNzIHdpdGhpbiByYW5nZSAobm90IGxpbWl0ZWQgd2l0aGluIHJhbmdlKVxuICAgICAgICAqL1xuICAgICAgICB2YWx1ZUVhc2VkOiBmdW5jdGlvbiAocHJvZ3Jlc3MsIGZyb20sIHRvLCBlYXNpbmcpIHtcbiAgICAgICAgICAgIHZhciBlYXNlZFByb2dyZXNzID0gZWFzaW5nKHByb2dyZXNzKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWUoZWFzZWRQcm9ncmVzcywgZnJvbSwgdG8pO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qXG4gICAgICAgIENhY2hpbmcgZnVuY3Rpb25zIHVzZWQgbXVsdGlwbGUgdGltZXMgdG8gcmVkdWNlIGZpbGVzaXplIGFuZCBpbmNyZWFzZSBwZXJmb3JtYW5jZVxuICAgICovXG4gICAgaXNOdW0gPSB1dGlscy5pc051bSxcbiAgICBhYnNvbHV0ZSA9IE1hdGguYWJzO1xuICAgIFxubW9kdWxlLmV4cG9ydHMgPSBjYWxjO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2luYy9jYWxjLmpzXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHZhbHVlcywgdGVybXMsIGRlbGltaXRlciwgY2hvcCkge1xuICAgIHZhciBjb21iaW5lZCA9ICcnLFxuICAgICAgICBrZXkgPSAnJyxcbiAgICAgICAgaSA9IDAsXG4gICAgICAgIG51bVRlcm1zID0gdGVybXMubGVuZ3RoO1xuXG4gICAgZm9yICg7IGkgPCBudW1UZXJtczsgaSsrKSB7XG4gICAgICAgIGtleSA9IHRlcm1zW2ldO1xuXG4gICAgICAgIGlmICh2YWx1ZXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgY29tYmluZWQgKz0gdmFsdWVzW2tleV0gKyBkZWxpbWl0ZXI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY2hvcCkge1xuICAgICAgICBjb21iaW5lZCA9IGNvbWJpbmVkLnNsaWNlKDAsIC1jaG9wKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29tYmluZWQ7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3ZhbHVlLXR5cGVzL21hbmlwdWxhdG9ycy9jcmVhdGUtZGVsaW1pdGVkLmpzXG4gKiovIiwidmFyIHNwbGl0Q29tbWFEZWxpbWl0ZWQgPSByZXF1aXJlKCcuL3NwbGl0LWNvbW1hLWRlbGltaXRlZCcpLFxuICAgIGZ1bmN0aW9uQnJlYWsgPSByZXF1aXJlKCcuL2Z1bmN0aW9uLWJyZWFrJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHZhbHVlLCB0ZXJtcykge1xuICAgIHZhciBzcGxpdFZhbHVlID0ge30sXG4gICAgICAgIG51bVRlcm1zID0gdGVybXMubGVuZ3RoLFxuICAgICAgICBjb2xvcnMgPSBzcGxpdENvbW1hRGVsaW1pdGVkKGZ1bmN0aW9uQnJlYWsodmFsdWUpKSxcbiAgICAgICAgaSA9IDA7XG5cbiAgICBmb3IgKDsgaSA8IG51bVRlcm1zOyBpKyspIHtcbiAgICAgICAgc3BsaXRWYWx1ZVt0ZXJtc1tpXV0gPSAoY29sb3JzW2ldICE9PSB1bmRlZmluZWQpID8gY29sb3JzW2ldIDogMTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3BsaXRWYWx1ZTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdmFsdWUtdHlwZXMvbWFuaXB1bGF0b3JzL2dldC1jb2xvci12YWx1ZXMuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh2YWx1ZSwgcHJlZml4KSB7XG4gICAgcmV0dXJuIHByZWZpeCArICcoJyArIHZhbHVlICsgJyknO1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92YWx1ZS10eXBlcy9tYW5pcHVsYXRvcnMvZnVuY3Rpb24tY3JlYXRlLmpzXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNvbG9yOiB7XG4gICAgICAgIG1pbjogMCxcbiAgICAgICAgbWF4OiAyNTUsXG4gICAgICAgIHJvdW5kOiB0cnVlXG4gICAgfSxcbiAgICBvcGFjaXR5OiB7XG4gICAgICAgIG1pbjogMCxcbiAgICAgICAgbWF4OiAxXG4gICAgfSxcbiAgICBwZXJjZW50OiB7XG4gICAgICAgIG1pbjogMCxcbiAgICAgICAgbWF4OiAxMDAsXG4gICAgICAgIHVuaXQ6ICclJ1xuICAgIH1cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92YWx1ZS10eXBlcy9zZXR0aW5ncy9kZWZhdWx0LXByb3BzLmpzXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBYID0gJ1gnLFxuICAgIFkgPSAnWScsXG4gICAgQUxQSEEgPSAnQWxwaGEnLFxuXG4gICAgdGVybXMgPSB7XG4gICAgICAgIGNvbG9yczogWydSZWQnLCAnR3JlZW4nLCAnQmx1ZScsIEFMUEhBXSxcbiAgICAgICAgcG9zaXRpb25zOiBbWCwgWSwgJ1onXSxcbiAgICAgICAgZGltZW5zaW9uczogWydUb3AnLCAnUmlnaHQnLCAnQm90dG9tJywgJ0xlZnQnXSxcbiAgICAgICAgc2hhZG93OiBbWCwgWSwgJ1JhZGl1cycsICdTcHJlYWQnLCAnQ29sb3InXSxcbiAgICAgICAgaHNsOiBbJ0h1ZScsICdTYXR1cmF0aW9uJywgJ0xpZ2h0bmVzcycsIEFMUEhBXVxuICAgIH07XG5cbm1vZHVsZS5leHBvcnRzID0gdGVybXM7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdmFsdWUtdHlwZXMvc2V0dGluZ3MvZGljdGlvbmFyeS5qc1xuICoqLyIsIi8qXG4gICAgVXRpbGl0eSBmdW5jdGlvbnNcbiovXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIHByb3RlY3RlZFByb3BlcnRpZXMgPSBbJ3Njb3BlJywgICdkb20nXSxcbiAgICBcbiAgICBpc1Byb3RlY3RlZCA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgcmV0dXJuIChwcm90ZWN0ZWRQcm9wZXJ0aWVzLmluZGV4T2Yoa2V5KSAhPT0gLTEpO1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAgICBHZXQgdmFyIHR5cGUgYXMgc3RyaW5nXG4gICAgICAgIFxuICAgICAgICBAcGFyYW06IFZhcmlhYmxlIHRvIHRlc3RcbiAgICAgICAgQHJldHVybiBbc3RyaW5nXTogUmV0dXJucywgZm9yIGluc3RhbmNlICdPYmplY3QnIGlmIFtvYmplY3QgT2JqZWN0XVxuICAgICovXG4gICAgdmFyVHlwZSA9IGZ1bmN0aW9uICh2YXJpYWJsZSkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhcmlhYmxlKS5zbGljZSg4LCAtMSk7XG4gICAgfTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgICAvKlxuICAgICAgICBJdGVyYXRlIG92ZXIgYW4gb2JqZWN0IGFuZCBmaXJlIGEgY2FsbGJhY2sgZm9yIGV2ZXJ5IGl0ZW0gaW4gaXRcblxuICAgICAgICBAcGFyYW0gW29iamVjdF06IFByb3BlcnRpZXNcbiAgICAgICAgQHBhcmFtIFtmdW5jdGlvbl06IENhbGxiYWNrIHRvIGZpcmVcbiAgICAqL1xuICAgIGVhY2g6IGZ1bmN0aW9uIChwcm9wcywgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhwcm9wcyksXG4gICAgICAgICAgICBudW1LZXlzID0ga2V5cy5sZW5ndGg7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1LZXlzOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBrZXkgPSBrZXlzW2ldLFxuICAgICAgICAgICAgICAgIHByb3AgPSBwcm9wc1trZXldO1xuXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2soa2V5LCBwcm9wKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgXG4gICAgLypcbiAgICAgICAgSGFzIG9uZSBvYmplY3QgY2hhbmdlZCBmcm9tIHRoZSBvdGhlclxuICAgICAgICBcbiAgICAgICAgQ29tcGFyZXMgdGhlIHR3byBwcm92aWRlZCBpbnB1dHMgYW5kIHJldHVybnMgdHJ1ZSBpZiB0aGV5IGFyZSBkaWZmZXJlbnRcbiAgICAgICAgXG4gICAgICAgIEBwYXJhbSBbb2JqZWN0XTogSW5wdXQgQVxuICAgICAgICBAcGFyYW0gW29iamVjdF06IElucHV0IEJcbiAgICAgICAgQHJldHVybiBbYm9vbGVhbl06IFRydWUgaWYgZGlmZmVyZW50XG4gICAgKi9cbiAgICBoYXNDaGFuZ2VkOiBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICB2YXIgaGFzQ2hhbmdlZCA9IGZhbHNlLFxuICAgICAgICAgICAga2V5ID0gJyc7XG5cbiAgICAgICAgZm9yIChrZXkgaW4gYikge1xuICAgICAgICAgICAgaWYgKGEuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBiLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoYVtrZXldICE9PSBiW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgaGFzQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBoYXNDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIFxuICAgICAgICByZXR1cm4gaGFzQ2hhbmdlZDtcbiAgICB9LFxuICAgIFxuICAgIC8qXG4gICAgICAgIElzIHRoaXMgdmFyIGEgbnVtYmVyP1xuICAgICAgICBcbiAgICAgICAgQHBhcmFtOiBWYXJpYWJsZSB0byB0ZXN0XG4gICAgICAgIEByZXR1cm4gW2Jvb2xlYW5dOiBSZXR1cm5zIHRydWUgaWYgdHlwZW9mID09PSAnbnVtYmVyJ1xuICAgICovXG4gICAgaXNOdW06IGZ1bmN0aW9uIChudW0pIHtcbiAgICAgICAgcmV0dXJuICh0eXBlb2YgbnVtID09PSAnbnVtYmVyJyk7XG4gICAgfSxcbiAgICBcbiAgICAvKlxuICAgICAgICBJcyB0aGlzIHZhciBhbiBvYmplY3Q/XG4gICAgICAgIFxuICAgICAgICBAcGFyYW06IFZhcmlhYmxlIHRvIHRlc3RcbiAgICAgICAgQHJldHVybiBbYm9vbGVhbl06IFJldHVybnMgdHJ1ZSBpZiB0eXBlb2YgPT09ICdvYmplY3QnXG4gICAgKi9cbiAgICBpc09iajogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICByZXR1cm4gKHR5cGVvZiBvYmogPT09ICdvYmplY3QnKTtcbiAgICB9LFxuICAgIFxuICAgIC8qXG4gICAgICAgIElzIHRoaXMgdmFyIGEgZnVuY3Rpb24gPyBcbiAgICAgICAgXG4gICAgICAgIEBwYXJhbTogVmFyaWFibGUgdG8gdGVzdFxuICAgICAgICBAcmV0dXJuIFtib29sZWFuXTogUmV0dXJucyB0cnVlIGlmIHRoaXMudmFyVHlwZSA9PT0gJ0Z1bmN0aW9uJ1xuICAgICovXG4gICAgaXNGdW5jOiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIHJldHVybiAodmFyVHlwZShvYmopID09PSAnRnVuY3Rpb24nKTsgXG4gICAgfSxcbiAgICBcbiAgICAvKlxuICAgICAgICBJcyB0aGlzIHZhciBhIHN0cmluZyA/IFxuICAgICAgICBcbiAgICAgICAgQHBhcmFtOiBWYXJpYWJsZSB0byB0ZXN0XG4gICAgICAgIEByZXR1cm4gW2Jvb2xlYW5dOiBSZXR1cm5zIHRydWUgaWYgdHlwZW9mIHN0ciA9PT0gJ3N0cmluZydcbiAgICAqL1xuICAgIGlzU3RyaW5nOiBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgIHJldHVybiAodHlwZW9mIHN0ciA9PT0gJ3N0cmluZycpOyBcbiAgICB9LFxuXG5cbiAgICAvKlxuICAgICAgICBJcyB0aGlzIGEgcmVsYXRpdmUgdmFsdWUgYXNzaWdubWVudD9cbiAgICAgICAgXG4gICAgICAgIEBwYXJhbSBbc3RyaW5nXTogVmFyaWFibGUgdG8gdGVzdFxuICAgICAgICBAcmV0dXJuIFtib29sZWFuXTogSWYgdGhpcyBsb29rcyBsaWtlIGEgcmVsYXRpdmUgdmFsdWUgYXNzaWdubWVudFxuICAgICovXG4gICAgaXNSZWxhdGl2ZVZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuICh2YWx1ZSAmJiB2YWx1ZS5pbmRleE9mICYmIHZhbHVlLmluZGV4T2YoJz0nKSA+IDApO1xuICAgIH0sXG4gICAgXG4gICAgLypcbiAgICAgICAgSXMgdGhpcyB2YXIgYW4gYXJyYXkgPyBcbiAgICAgICAgXG4gICAgICAgIEBwYXJhbTogVmFyaWFibGUgdG8gdGVzdFxuICAgICAgICBAcmV0dXJuIFtib29sZWFuXTogUmV0dXJucyB0cnVlIGlmIHRoaXMudmFyVHlwZSA9PT0gJ0FycmF5J1xuICAgICovXG4gICAgaXNBcnJheTogZnVuY3Rpb24gKGFycikge1xuICAgICAgICByZXR1cm4gKHZhclR5cGUoYXJyKSA9PT0gJ0FycmF5Jyk7XG4gICAgfSxcbiAgICBcbiAgICAvKlxuICAgICAgICBDb3B5IG9iamVjdCBvciBhcnJheVxuICAgICAgICBcbiAgICAgICAgQ2hlY2tzIHdoZXRoZXIgYmFzZSBpcyBhbiBhcnJheSBvciBvYmplY3QgYW5kIG1ha2VzXG4gICAgICAgIGFwcHJvcHJpYXRlIGNvcHlcbiAgICAgICAgXG4gICAgICAgIEBwYXJhbSBbYXJyYXkgfHwgb2JqZWN0XTogQXJyYXkgb3Igb2JqZWN0IHRvIGNvcHlcbiAgICAgICAgQHBhcmFtIFthcnJheSB8fCBvYmplY3RdOiBOZXcgY29weSBvZiBhcnJheSBvciBvYmplY3RcbiAgICAqL1xuICAgIGNvcHk6IGZ1bmN0aW9uIChiYXNlKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5pc0FycmF5KGJhc2UpKSA/IHRoaXMuY29weUFycmF5KGJhc2UpIDogdGhpcy5jb3B5T2JqZWN0KGJhc2UpO1xuICAgIH0sXG4gICAgXG4gICAgLypcbiAgICAgICAgRGVlcCBjb3B5IGFuIG9iamVjdFxuICAgICAgICBcbiAgICAgICAgSXRlcmF0ZXMgb3ZlciBhbiBvYmplY3QgYW5kIGNyZWF0ZXMgYSBuZXcgY29weSBvZiBldmVyeSBpdGVtLFxuICAgICAgICBkZWVwIGNvcHlpbmcgaWYgaXQgZmluZHMgYW55IG9iamVjdHMvYXJyYXlzXG4gICAgICAgIFxuICAgICAgICBAcGFyYW0gW29iamVjdF06IE9iamVjdCB0byBjb3B5XG4gICAgICAgIEBwYXJhbSBbb2JqZWN0XTogTmV3IGNvcHkgb2Ygb2JqZWN0XG4gICAgKi9cbiAgICBjb3B5T2JqZWN0OiBmdW5jdGlvbiAoYmFzZSkge1xuICAgICAgICB2YXIgbmV3T2JqZWN0ID0ge307XG4gICAgICAgIFxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gYmFzZSkge1xuICAgICAgICAgICAgaWYgKGJhc2UuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIG5ld09iamVjdFtrZXldID0gKHRoaXMuaXNPYmooYmFzZVtrZXldKSAmJiAhaXNQcm90ZWN0ZWQoa2V5KSkgPyB0aGlzLmNvcHkoYmFzZVtrZXldKSA6IGJhc2Vba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG5ld09iamVjdDtcbiAgICB9LFxuICAgIFxuICAgIC8qXG4gICAgICAgIERlZXAgY29weSBhbiBhcnJheVxuICAgICAgICBcbiAgICAgICAgTG9vcHMgdGhyb3VnaCBhbiBhcnJheSBhbmQgY3JlYXRlcyBhIG5ldyBjb3B5IG9mIGV2ZXJ5IGl0ZW0sXG4gICAgICAgIGRlZXAgY29weWluZyBpZiBpdCBmaW5kcyBhbnkgb2JqZWN0cy9hcnJheXNcbiAgICAgICAgXG4gICAgICAgIEBwYXJhbSBbYXJyYXldOiBBcnJheSB0byBjb3B5XG4gICAgICAgIEByZXR1cm4gW2FycmF5XTogTmV3IGNvcHkgb2YgYXJyYXlcbiAgICAqL1xuICAgIGNvcHlBcnJheTogZnVuY3Rpb24gKGJhc2UpIHtcbiAgICAgICAgdmFyIG5ld0FycmF5ID0gW10sXG4gICAgICAgICAgICBsZW5ndGggPSBiYXNlLmxlbmd0aCxcbiAgICAgICAgICAgIGkgPSAwO1xuICAgICAgICBcbiAgICAgICAgZm9yICg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbmV3QXJyYXlbaV0gPSAodGhpcy5pc09iaihiYXNlW2ldKSkgPyB0aGlzLmNvcHkoYmFzZVtpXSkgOiBiYXNlW2ldO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gbmV3QXJyYXk7XG4gICAgfSxcbiAgICBcbiAgICAvKlxuICAgICAgICBOb24tZGVzdHJ1Y3RpdmUgbWVyZ2Ugb2Ygb2JqZWN0IG9yIGFycmF5XG4gICAgICAgIFxuICAgICAgICBAcGFyYW0gW2FycmF5IHx8IG9iamVjdF06IEFycmF5IG9yIG9iamVjdCB0byB1c2UgYXMgYmFzZVxuICAgICAgICBAcGFyYW0gW2FycmF5IHx8IG9iamVjdF06IEFycmF5IG9yIG9iamVjdCB0byBvdmVyd3JpdGUgYmFzZSB3aXRoXG4gICAgICAgIEByZXR1cm4gW2FycmF5IHx8IG9iamVjdF06IE5ldyBhcnJheSBvciBvYmplY3RcbiAgICAqL1xuICAgIG1lcmdlOiBmdW5jdGlvbiAoYmFzZSwgb3ZlcndyaXRlKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5pc0FycmF5KGJhc2UpKSA/IHRoaXMuY29weUFycmF5KG92ZXJ3cml0ZSkgOiB0aGlzLm1lcmdlT2JqZWN0KGJhc2UsIG92ZXJ3cml0ZSk7XG4gICAgfSxcbiAgICBcbiAgICAvKlxuICAgICAgICBOb24tZGVzdHJ1Y3RpdmUgbWVyZ2Ugb2Ygb2JqZWN0XG4gICAgICAgIFxuICAgICAgICBAcGFyYW0gW29iamVjdF06IE9iamVjdCB0byB1c2UgYXMgYmFzZVxuICAgICAgICBAcGFyYW0gW29iamVjdF06IE9iamVjdCB0byBvdmVyd3JpdGUgYmFzZSB3aXRoXG4gICAgICAgIEByZXR1cm4gW29iamVjdF06IE5ldyBvYmplY3RcbiAgICAqL1xuICAgIG1lcmdlT2JqZWN0OiBmdW5jdGlvbiAoYmFzZSwgb3ZlcndyaXRlKSB7XG4gICAgICAgIHZhciBoYXNCYXNlID0gdGhpcy5pc09iaihiYXNlKSxcbiAgICAgICAgICAgIG5ld09iamVjdCA9IGhhc0Jhc2UgPyB0aGlzLmNvcHkoYmFzZSkgOiB0aGlzLmNvcHkob3ZlcndyaXRlKSxcbiAgICAgICAgICAgIGtleSA9ICcnO1xuXG4gICAgICAgIGlmIChoYXNCYXNlKSB7XG4gICAgICAgICAgICBmb3IgKGtleSBpbiBvdmVyd3JpdGUpIHtcbiAgICAgICAgICAgICAgICBpZiAob3ZlcndyaXRlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3T2JqZWN0W2tleV0gPSAodGhpcy5pc09iaihvdmVyd3JpdGVba2V5XSkgJiYgIWlzUHJvdGVjdGVkKGtleSkpID8gdGhpcy5tZXJnZShiYXNlW2tleV0sIG92ZXJ3cml0ZVtrZXldKSA6IG92ZXJ3cml0ZVtrZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3T2JqZWN0O1xuICAgIH0sXG4gICAgXG4gICAgLypcbiAgICAgICAgU3BsaXQgYSB2YWx1ZSBpbnRvIGEgdmFsdWUvdW5pdCBvYmplY3RcbiAgICAgICAgXG4gICAgICAgICAgICBcIjIwMHB4XCIgLT4geyB2YWx1ZTogMjAwLCB1bml0OiBcInB4XCIgfVxuICAgICAgICAgICAgXG4gICAgICAgIEBwYXJhbSBbc3RyaW5nXTogVmFsdWUgdG8gc3BsaXRcbiAgICAgICAgQHJldHVybiBbb2JqZWN0XTogT2JqZWN0IHdpdGggdmFsdWUgYW5kIHVuaXQgcHJvcHNcbiAgICAqL1xuICAgIHNwbGl0VmFsVW5pdDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGxldCBzcGxpdFZhbCA9IHZhbHVlLm1hdGNoKC8oLT9cXGQqXFwuP1xcZCopKC4qKS8pO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogc3BsaXRWYWxbMV0sXG4gICAgICAgICAgICB1bml0OiAgc3BsaXRWYWxbMl1cbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgICAgQ3JlYXRlIHN0ZXBwZWQgdmVyc2lvbiBvZiAwLTEgcHJvZ3Jlc3NcbiAgICAgICAgXG4gICAgICAgIEBwYXJhbSBbbnVtYmVyXTogQ3VycmVudCB2YWx1ZVxuICAgICAgICBAcGFyYW0gW2ludF06IE51bWJlciBvZiBzdGVwc1xuICAgICAgICBAcmV0dXJuIFtudW1iZXJdOiBTdGVwcGVkIHZhbHVlXG4gICAgKi9cbiAgICBzdGVwUHJvZ3Jlc3M6IGZ1bmN0aW9uIChwcm9ncmVzcywgc3RlcHMpIHtcbiAgICAgICAgdmFyIHNlZ21lbnQgPSAxIC8gKHN0ZXBzIC0gMSksXG4gICAgICAgICAgICB0YXJnZXQgPSAxIC0gKDEgLyBzdGVwcyksXG4gICAgICAgICAgICBwcm9ncmVzc09mVGFyZ2V0ID0gTWF0aC5taW4ocHJvZ3Jlc3MgLyB0YXJnZXQsIDEpO1xuXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKHByb2dyZXNzT2ZUYXJnZXQgLyBzZWdtZW50KSAqIHNlZ21lbnQ7XG4gICAgfSxcbiAgICBcbiAgICAvKlxuICAgICAgICBHZW5lcmF0ZSBjdXJyZW50IHRpbWVzdGFtcFxuICAgICAgICBcbiAgICAgICAgQHJldHVybiBbdGltZXN0YW1wXTogQ3VycmVudCBVTklYIHRpbWVzdGFtcFxuICAgICovXG4gICAgY3VycmVudFRpbWU6IGZ1bmN0aW9uICgpIHtcblx0ICAgIHJldHVybiAodHlwZW9mIHBlcmZvcm1hbmNlICE9PSBcInVuZGVmaW5lZFwiKSA/IHBlcmZvcm1hbmNlLm5vdygpIDogbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgfVxuICAgIFxufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbmMvdXRpbHMuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHJldHVybiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykgPyB2YWx1ZS5zcGxpdCgnICcpIDogW3ZhbHVlXTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdmFsdWUtdHlwZXMvbWFuaXB1bGF0b3JzL3NwbGl0LXNwYWNlLWRlbGltaXRlZC5qc1xuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgZWFjaCA9IHJlcXVpcmUoJy4uLy4uL2luYy91dGlscycpLmVhY2gsXG4gICAgdHJhbnNmb3JtRGljdGlvbmFyeSA9IHJlcXVpcmUoJy4vdHJhbnNmb3JtLWRpY3Rpb25hcnknKSxcbiAgICB0cmFuc2Zvcm1Qcm9wcyA9IHRyYW5zZm9ybURpY3Rpb25hcnkucHJvcHMsXG5cbiAgICBUUkFOU0xBVEVfWiA9ICd0cmFuc2xhdGVaJztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob3V0cHV0LCBjYWNoZSkge1xuICAgIHZhciBjc3MgPSB7fSxcbiAgICAgICAgdHJhbnNmb3JtID0gJycsXG4gICAgICAgIHRyYW5zZm9ybUhhc1ogPSBmYWxzZTtcbiAgICAgICAgXG4gICAgLy8gTG9vcCB0aHJvdWdoIG91dHB1dCwgY2hlY2sgZm9yIHRyYW5zZm9ybSBwcm9wZXJ0aWVzXG4gICAgZWFjaChvdXRwdXQsIGZ1bmN0aW9uIChrZXksIHJ1bGUpIHtcbiAgICAgICAgLy8gSWYgdGhpcyBpcyBhIHRyYW5zZm9ybSBwcm9wZXJ0eSwgYWRkIHRvIHRyYW5zZm9ybSBzdHJpbmdcbiAgICAgICAgaWYgKHRyYW5zZm9ybVByb3BzW2tleV0pIHtcbiAgICAgICAgICAgIHRyYW5zZm9ybSArPSBrZXkgKyAnKCcgKyBydWxlICsgJyknO1xuICAgICAgICAgICAgdHJhbnNmb3JtSGFzWiA9IChrZXkgPT09IFRSQU5TTEFURV9aKSA/IHRydWUgOiB0cmFuc2Zvcm1IYXNaO1xuICAgICAgICBcbiAgICAgICAgLy8gT3IganVzdCBhc3NpZ24gZGlyZWN0bHlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChydWxlICE9PSBjYWNoZVtrZXldKSB7XG4gICAgICAgICAgICAgICAgY2FjaGVba2V5XSA9IGNzc1trZXldID0gcnVsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gSWYgd2UgaGF2ZSB0cmFuc2Zvcm0gcHJvcGVydGllcywgYWRkIHRyYW5zbGF0ZVpcbiAgICBpZiAodHJhbnNmb3JtICE9PSAnJykge1xuICAgICAgICBpZiAoIXRyYW5zZm9ybUhhc1opIHtcbiAgICAgICAgICAgIHRyYW5zZm9ybSArPSAnICcgKyBUUkFOU0xBVEVfWiArICcoMHB4KSc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHJhbnNmb3JtICE9PSBjYWNoZS50cmFuc2Zvcm0pIHtcbiAgICAgICAgICAgIGNzcy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm07XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGNhY2hlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybTtcbiAgICB9XG5cbiAgICByZXR1cm4gY3NzO1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9yb2xlcy9jc3MvYnVpbGQuanNcbiAqKi8iLCJ2YXIgVFJBTlNMQVRFID0gJ3RyYW5zbGF0ZSc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHg6IFRSQU5TTEFURSArICdYJyxcbiAgICB5OiBUUkFOU0xBVEUgKyAnWScsXG4gICAgejogVFJBTlNMQVRFICsgJ1onXG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3JvbGVzL2Nzcy9tYXAuanNcbiAqKi8iLCJ2YXIgQ09MT1IgPSAnY29sb3InLFxuICAgIFBPU0lUSU9OUyA9ICdwb3NpdGlvbnMnLFxuICAgIERJTUVOU0lPTlMgPSAnZGltZW5zaW9ucycsXG4gICAgU0hBRE9XID0gJ3NoYWRvdycsXG4gICAgQU5HTEUgPSAnYW5nbGUnLFxuICAgIEFMUEhBID0gJ2FscGhhJyxcbiAgICBQWCA9ICdweCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIC8vIENvbG9yIHByb3BlcnRpZXNcbiAgICBjb2xvcjogQ09MT1IsXG4gICAgYmFja2dyb3VuZENvbG9yOiBDT0xPUixcbiAgICBvdXRsaW5lQ29sb3I6IENPTE9SLFxuICAgIGZpbGw6IENPTE9SLFxuICAgIHN0cm9rZTogQ09MT1IsXG4gICAgLy8gQm9yZGVyXG4gICAgYm9yZGVyQ29sb3I6IENPTE9SLFxuICAgIGJvcmRlclRvcENvbG9yOiBDT0xPUixcbiAgICBib3JkZXJSaWdodENvbG9yOiBDT0xPUixcbiAgICBib3JkZXJCb3R0b21Db2xvcjogQ09MT1IsXG4gICAgYm9yZGVyTGVmdENvbG9yOiBDT0xPUixcbiAgICBib3JkZXJSYWRpdXM6IFBYLFxuICAgIC8vIERpbWVuc2lvbnNcbiAgICBtYXJnaW46IERJTUVOU0lPTlMsXG4gICAgcGFkZGluZzogRElNRU5TSU9OUyxcbiAgICB3aWR0aDogUFgsXG4gICAgaGVpZ2h0OiBQWCwgICAgXG4gICAgLy8gUG9zaXRpb25zXG4gICAgYmFja2dyb3VuZFBvc2l0aW9uOiBQT1NJVElPTlMsXG4gICAgcGVyc3BlY3RpdmVPcmlnaW46IFBPU0lUSU9OUyxcbiAgICB0cmFuc2Zvcm1PcmlnaW46IFBPU0lUSU9OUywgICAgXG4gICAgLy8gU2hhZG93c1xuICAgIHRleHRTaGFkb3c6IFNIQURPVyxcbiAgICBib3hTaGFkb3c6IFNIQURPVywgICAgXG4gICAgLy8gVHJhbnNmb3JtIHByb3BlcnRpZXNcbiAgICByb3RhdGU6IEFOR0xFLFxuICAgIHJvdGF0ZVg6IEFOR0xFLFxuICAgIHJvdGF0ZVk6IEFOR0xFLFxuICAgIHJvdGF0ZVo6IEFOR0xFLFxuICAgIHNrZXdYOiBBTkdMRSxcbiAgICBza2V3WTogQU5HTEUsXG4gICAgdHJhbnNsYXRlWDogUFgsXG4gICAgdHJhbnNsYXRlWTogUFgsXG4gICAgdHJhbnNsYXRlWjogUFgsXG4gICAgcGVyc3BlY3RpdmU6IFBYLFxuICAgIG9wYWNpdHk6IEFMUEhBXG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3JvbGVzL2Nzcy90eXBlLW1hcC5qc1xuICoqLyIsInZhciBlYWNoID0gcmVxdWlyZSgnLi4vLi4vaW5jL3V0aWxzJykuZWFjaCxcbiAgICB0cmFuc2Zvcm1EaWN0aW9uYXJ5ID0gcmVxdWlyZSgnLi4vY3NzL3RyYW5zZm9ybS1kaWN0aW9uYXJ5JyksXG4gICAgdHJhbnNmb3JtUHJvcHMgPSB0cmFuc2Zvcm1EaWN0aW9uYXJ5LnByb3BzLFxuICAgIHplcm9Ob3RaZXJvID0gMC4wMDAxO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvdXRwdXQsIG9yaWdpbikge1xuICAgIHZhciBwcm9wcyA9IHt9LFxuICAgICAgICBoYXNUcmFuc2Zvcm0gPSBmYWxzZSxcbiAgICAgICAgc2NhbGUgPSBvdXRwdXQuc2NhbGUgIT09IHVuZGVmaW5lZCA/IG91dHB1dC5zY2FsZSB8fCB6ZXJvTm90WmVybyA6IG91dHB1dC5zY2FsZVggfHwgMSxcbiAgICAgICAgc2NhbGVZID0gb3V0cHV0LnNjYWxlWSAhPT0gdW5kZWZpbmVkID8gb3V0cHV0LnNjYWxlWSB8fCB6ZXJvTm90WmVybyA6IHNjYWxlIHx8IDEsXG4gICAgICAgIHRyYW5zZm9ybU9yaWdpblggPSBvcmlnaW4ueCxcbiAgICAgICAgdHJhbnNmb3JtT3JpZ2luWSA9IG9yaWdpbi55LFxuICAgICAgICBzY2FsZVRyYW5zZm9ybVggPSAtIHRyYW5zZm9ybU9yaWdpblggKiAoc2NhbGUgKiAxKSxcbiAgICAgICAgc2NhbGVUcmFuc2Zvcm1ZID0gLSB0cmFuc2Zvcm1PcmlnaW5ZICogKHNjYWxlWSAqIDEpLFxuICAgICAgICBzY2FsZVJlcGxhY2VYID0gdHJhbnNmb3JtT3JpZ2luWCAvIHNjYWxlLFxuICAgICAgICBzY2FsZVJlcGxhY2VZID0gdHJhbnNmb3JtT3JpZ2luWSAvIHNjYWxlWSxcbiAgICAgICAgdHJhbnNmb3JtID0ge1xuICAgICAgICAgICAgdHJhbnNsYXRlOiBgdHJhbnNsYXRlKCR7b3V0cHV0LnRyYW5zbGF0ZVh9LCAke291dHB1dC50cmFuc2xhdGVZfSkgYCxcbiAgICAgICAgICAgIHNjYWxlOiBgdHJhbnNsYXRlKCR7c2NhbGVUcmFuc2Zvcm1YfSwgJHtzY2FsZVRyYW5zZm9ybVl9KSBzY2FsZSgke3NjYWxlfSwgJHtzY2FsZVl9KSB0cmFuc2xhdGUoJHtzY2FsZVJlcGxhY2VYfSwgJHtzY2FsZVJlcGxhY2VZfSkgYCxcbiAgICAgICAgICAgIHJvdGF0ZTogYHJvdGF0ZSgke291dHB1dC5yb3RhdGV9LCAke3RyYW5zZm9ybU9yaWdpblh9LCAke3RyYW5zZm9ybU9yaWdpbll9KSBgLFxuICAgICAgICAgICAgc2tld1g6IGBza2V3WCgke291dHB1dC5za2V3WH0pIGAsXG4gICAgICAgICAgICBza2V3WTogYHNrZXdZKCR7b3V0cHV0LnNrZXdZfSkgYFxuICAgICAgICB9O1xuXG4gICAgZWFjaChvdXRwdXQsIGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICAgIGlmICh0cmFuc2Zvcm1Qcm9wc1trZXldKSB7XG4gICAgICAgICAgICBoYXNUcmFuc2Zvcm0gPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHJvcHNba2V5XSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoaGFzVHJhbnNmb3JtKSB7XG4gICAgICAgIHByb3BzLnRyYW5zZm9ybSA9ICcnO1xuXG4gICAgICAgIGVhY2godHJhbnNmb3JtLCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgICAgICAgdmFyIGRlZmF1bHRWYWx1ZSA9IChrZXkgPT09ICdzY2FsZScpID8gJzEnIDogJzAnO1xuICAgICAgICAgICAgcHJvcHMudHJhbnNmb3JtICs9IHZhbHVlLnJlcGxhY2UoL3VuZGVmaW5lZC9nLCBkZWZhdWx0VmFsdWUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvcHM7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3JvbGVzL3N2Zy9idWlsZC5qc1xuICoqLyIsInZhciBDT0xPUiA9ICdjb2xvcicsXG4gICAgU0NBTEUgPSAnc2NhbGUnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBmaWxsOiBDT0xPUixcbiAgICBzdHJva2U6IENPTE9SLFxuICAgIHNjYWxlOiBTQ0FMRSxcbiAgICBzY2FsZVg6IFNDQUxFLFxuICAgIHNjYWxlWTogU0NBTEUsXG4gICAgdHJhbnNmb3JtT3JpZ2luOiAncG9zaXRpb25zJyxcbiAgICBkOiAnY29tcGxleCdcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcm9sZXMvc3ZnL3R5cGUtbWFwLmpzXG4gKiovIiwidmFyIFNUUk9LRSA9ICdzdHJva2UnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBvcGFjaXR5OiBTVFJPS0UgKyAnLW9wYWNpdHknLFxuICAgIHdpZHRoOiBTVFJPS0UgKyAnLXdpZHRoJyxcbiAgICBtaXRlcmxpbWl0OiBTVFJPS0UgKyAnLW1pdGVybGltaXQnXG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3JvbGVzL3BhdGgvbWFwLmpzXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBNb2RNYW5hZ2VyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9rZXlzID0gW107XG4gICAgICAgIHRoaXMuX251bUtleXMgPSAwO1xuICAgIH07XG5cbk1vZE1hbmFnZXIucHJvdG90eXBlID0ge1xuXG4gICAgLypcbiAgICAgICAgQWRkIG1vZHVsZSBrZXkgdG8ga2V5cyBsaXN0XG5cbiAgICAgICAgQHBhcmFtIFtzdHJpbmddOiBLZXkgdG8gYWRkXG4gICAgKi9cbiAgICBfYWRkS2V5OiBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICB0aGlzLl9rZXlzLnB1c2gobmFtZSk7XG4gICAgICAgIHRoaXMuX251bUtleXMrKztcbiAgICB9LFxuXG4gICAgLypcbiAgICAgICAgQWRkIGEgbmV3IG1vZHVsZVxuXG4gICAgICAgIEBwYXJhbSBbc3RyaW5nIHx8IG9iamVjdF06IE5hbWUgb2YgbmV3IG1vZHVsZSBvciBtdWx0aXBsZSBtb2R1bGVzXG4gICAgICAgIEBwYXJhbSBbb2JqZWN0XSAob3B0aW9uYWwpOiBNb2R1bGUgdG8gYWRkXG4gICAgKi9cbiAgICBleHRlbmQ6IGZ1bmN0aW9uIChuYW1lLCBtb2QpIHtcbiAgICAgICAgdmFyIG11bHRpTW9kcyA9ICh0eXBlb2YgbmFtZSA9PSAnb2JqZWN0JyksXG4gICAgICAgICAgICBtb2RzID0gbXVsdGlNb2RzID8gbmFtZSA6IHt9LFxuICAgICAgICAgICAga2V5ID0gJyc7XG5cbiAgICAgICAgLy8gSWYgd2UganVzdCBoYXZlIG9uZSBtb2R1bGUsIGNvZXJjZVxuICAgICAgICBpZiAoIW11bHRpTW9kcykge1xuICAgICAgICAgICAgbW9kc1tuYW1lXSA9IG1vZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoa2V5IGluIG1vZHMpIHtcbiAgICAgICAgICAgIGlmIChtb2RzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hZGRLZXkoa2V5KTtcbiAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSBtb2RzW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgZWFjaDogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBrZXkgPSAnJztcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX251bUtleXM7IGkrKykge1xuICAgICAgICAgICAga2V5ID0gdGhpcy5fa2V5c1tpXTtcbiAgICAgICAgICAgIGNhbGxiYWNrKGtleSwgdGhpc1trZXldKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gTW9kTWFuYWdlcjtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbmMvTW9kTWFuYWdlci5qc1xuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgUXVldWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICB9O1xuXG5RdWV1ZS5wcm90b3R5cGUgPSB7XG4gICAgXG4gICAgLypcbiAgICAgICAgQWRkIGEgc2V0IG9mIGFyZ3VtZW50cyB0byBxdWV1ZVxuICAgICovXG4gICAgYWRkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMucXVldWUucHVzaChbXS5zbGljZS5jYWxsKGFyZ3VtZW50cykpO1xuICAgIH0sXG4gICAgXG4gICAgLypcbiAgICAgICAgR2V0IG5leHQgc2V0IG9mIGFyZ3VtZW50cyBmcm9tIHF1ZXVlXG4gICAgKi9cbiAgICBuZXh0OiBmdW5jdGlvbiAoZGlyZWN0aW9uKSB7XG4gICAgICAgIHZhciBxdWV1ZSA9IHRoaXMucXVldWUsXG4gICAgICAgICAgICByZXR1cm5WYWwgPSBmYWxzZSxcbiAgICAgICAgICAgIGluZGV4ID0gdGhpcy5pbmRleDtcbiAgICAgICAgICAgIFxuICAgICAgICBkaXJlY3Rpb24gPSAoYXJndW1lbnRzLmxlbmd0aCkgPyBkaXJlY3Rpb24gOiAxO1xuICAgICAgICBcbiAgICAgICAgLy8gSWYgb3VyIGluZGV4IGlzIGJldHdlZW4gMCBhbmQgdGhlIHF1ZXVlIGxlbmd0aCwgcmV0dXJuIHRoYXQgaXRlbVxuICAgICAgICBpZiAoaW5kZXggPj0gMCAmJiBpbmRleCA8IHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuVmFsID0gcXVldWVbaW5kZXhdO1xuICAgICAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4ICsgZGlyZWN0aW9uO1xuICAgICAgICBcbiAgICAgICAgLy8gT3IgY2xlYXJcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHJldHVyblZhbDtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgICAgUmVwbGFjZSBxdWV1ZSB3aXRoIGVtcHR5IGFycmF5XG4gICAgKi9cbiAgICBjbGVhcjogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnF1ZXVlID0gW107XG4gICAgICAgIHRoaXMuaW5kZXggPSAwO1xuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUXVldWU7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW5jL1F1ZXVlLmpzXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciB2YWx1ZVR5cGVNYW5hZ2VyID0gcmVxdWlyZSgnLi4vdmFsdWUtdHlwZXMvbWFuYWdlcicpLFxuICAgIGNhbGMgPSByZXF1aXJlKCcuLi9pbmMvY2FsYycpLFxuICAgIHV0aWxzID0gcmVxdWlyZSgnLi4vaW5jL3V0aWxzJyksXG4gICAgZWFjaCA9IHV0aWxzLmVhY2gsXG4gICAgQWN0aW9uID0gcmVxdWlyZSgnLi4vYWN0aW9ucy9BY3Rpb24nKSxcbiAgICBkZWZhdWx0QWN0aW9uID0gbmV3IEFjdGlvbigpLFxuICAgIFdhdGNoID0gcmVxdWlyZSgnLi4vYWN0aW9ucy9XYXRjaCcpLFxuICAgIHdhdGNoZXIgPSBuZXcgV2F0Y2goKSxcblxuICAgIGNyZWF0ZU1hcHBlciA9IGZ1bmN0aW9uIChyb2xlLCBtYXBwZWRWYWx1ZXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChuYW1lLCB2YWwpIHtcbiAgICAgICAgICAgIG1hcHBlZFZhbHVlc1tyb2xlLm1hcChuYW1lKV0gPSB2YWw7XG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIC8qXG4gICAgICAgIENoZWNrIGFsbCBBY3Rpb25zIGZvciBgb25FbmRgLCByZXR1cm4gdHJ1ZSBpZiBhbGwgYXJlIHRydWVcblxuICAgICAgICBAcGFyYW0gW0FjdG9yXVxuICAgICAgICBAcGFyYW0gW2Jvb2xlYW5dXG4gICAgICAgIEByZXR1cm5zIFtib29sZWFuXVxuICAgICovXG4gICAgY2hlY2tBbmRGaXJlSGFzRW5kZWQgPSBmdW5jdGlvbiAoYWN0b3IsIGhhc0NoYW5nZWQpIHtcbiAgICAgICAgdmFyIGhhc0VuZGVkID0gdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlcyA9IGFjdG9yLnN0YXRlLnZhbHVlcztcblxuICAgICAgICBlYWNoKGFjdG9yLmFjdGl2ZUFjdGlvbnMsIChrZXksIGFjdGlvbikgPT4ge1xuICAgICAgICAgICAgLy8gUmV0dXJuIGlmIGFjdGlvbiBoYXMgYmVlbiBkZWxldGVkIGVsc2V3aGVyZVxuICAgICAgICAgICAgaWYgKCFhY3Rpb24pIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgICAgIGlmIChhY3Rpb24ub25GcmFtZSkge1xuICAgICAgICAgICAgICAgIGFjdGlvbi5vbkZyYW1lLmNhbGwoYWN0b3IsIHZhbHVlcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChhY3Rpb24ub25VcGRhdGUgJiYgaGFzQ2hhbmdlZCkge1xuICAgICAgICAgICAgICAgIGFjdGlvbi5vblVwZGF0ZS5jYWxsKGFjdG9yLCB2YWx1ZXMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoYWN0aW9uLmhhc0VuZGVkICYmIGFjdGlvbi5oYXNFbmRlZChhY3RvciwgaGFzQ2hhbmdlZCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgaGFzRW5kZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbi5vbkNvbXBsZXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbi5vbkNvbXBsZXRlLmNhbGwoYWN0b3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhY3Rvci51bmJpbmRBY3Rpb24oa2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGhhc0VuZGVkO1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAgICBVcGRhdGUgdGhlIEFjdG9yIGFuZCBpdHMgdmFsdWVzXG5cbiAgICAgICAgQHBhcmFtIFtpbnRdOiBUaW1lc3RhbXAgb2YgckFGIGNhbGxcbiAgICAgICAgQHBhcmFtIFtpbnRdOiBUaW1lIHNpbmNlIGxhc3QgZnJhbWVcbiAgICAqL1xuICAgIHVwZGF0ZSA9IGZ1bmN0aW9uIChmcmFtZXN0YW1wLCBmcmFtZUR1cmF0aW9uKSB7XG4gICAgICAgIHZhciBudW1BY3RpdmVWYWx1ZXMgPSB0aGlzLmFjdGl2ZVZhbHVlcy5sZW5ndGgsXG4gICAgICAgICAgICBudW1BY3RpdmVQYXJlbnRzID0gdGhpcy5hY3RpdmVQYXJlbnRzLmxlbmd0aCxcbiAgICAgICAgICAgIG51bVJvbGVzID0gdGhpcy5yb2xlcy5sZW5ndGgsXG4gICAgICAgICAgICBzdGF0ZSA9IHRoaXMuc3RhdGUsXG4gICAgICAgICAgICBoYXNDaGFuZ2VkID0gdGhpcy5oYXNDaGFuZ2VkO1xuXG4gICAgICAgIC8vIFVwZGF0ZSB2YWx1ZXNcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1BY3RpdmVWYWx1ZXM7IGkrKykge1xuICAgICAgICAgICAgLy8gR2V0IHZhbHVlIGFuZCBrZXlcbiAgICAgICAgICAgIGxldCBrZXkgPSB0aGlzLmFjdGl2ZVZhbHVlc1tpXTtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHRoaXMudmFsdWVzW2tleV07XG4gICAgICAgICAgICBsZXQgYWN0aW9uID0gKCF2YWx1ZS5hY3Rpb24gfHwgdmFsdWUuYWN0aW9uICYmICF2YWx1ZS5hY3Rpb24uaXNBY3RpdmUpID8gZGVmYXVsdEFjdGlvbiA6IHZhbHVlLmFjdGlvbjtcblxuICAgICAgICAgICAgLy8gRmlyZSBhY3Rpb24gb25GcmFtZVN0YXJ0IGlmIG5vdCBhbHJlYWR5IGZpcmVkXG4gICAgICAgICAgICBpZiAoYWN0aW9uLm9uRnJhbWVTdGFydCAmJiBhY3Rpb24ubGFzdFVwZGF0ZSAhPT0gZnJhbWVzdGFtcCkge1xuICAgICAgICAgICAgICAgIGFjdGlvbi5vbkZyYW1lU3RhcnQodGhpcywgZnJhbWVEdXJhdGlvbiwgZnJhbWVzdGFtcCk7XG4gICAgICAgICAgICAgICAgYWN0aW9uLmxhc3RVcGRhdGUgPSBmcmFtZXN0YW1wO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBDYWxjdWxhdGUgbmV3IHZhbHVlXG4gICAgICAgICAgICBsZXQgdXBkYXRlZFZhbHVlID0gdXRpbHMuaXNTdHJpbmcodmFsdWUud2F0Y2gpID8gd2F0Y2hlci5wcm9jZXNzKHRoaXMsIHZhbHVlKSA6IGFjdGlvbi5wcm9jZXNzKHRoaXMsIHZhbHVlLCBrZXksIGZyYW1lRHVyYXRpb24pO1xuXG4gICAgICAgICAgICAvLyBMaW1pdCBpZiB0aGlzIGFjdGlvbiBkb2VzIHRoYXQga2luZCBvZiB0aGluZ1xuICAgICAgICAgICAgaWYgKGFjdGlvbi5saW1pdCAmJiB2YWx1ZS5oYXNSYW5nZSkge1xuICAgICAgICAgICAgICAgIHVwZGF0ZWRWYWx1ZSA9IGFjdGlvbi5saW1pdCh1cGRhdGVkVmFsdWUsIHZhbHVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gUm91bmQgdmFsdWUgaWYgcm91bmQgaXMgdHJ1ZVxuICAgICAgICAgICAgaWYgKHZhbHVlLnJvdW5kKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlZFZhbHVlID0gTWF0aC5yb3VuZCh1cGRhdGVkVmFsdWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBVcGRhdGUgZnJhbWVDaGFuZ2VcbiAgICAgICAgICAgIHZhbHVlLmZyYW1lQ2hhbmdlID0gdXBkYXRlZFZhbHVlIC0gdmFsdWUuY3VycmVudDtcblxuICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIHZlbG9jaXR5IGlmIEFjdGlvbiBoYXNuJ3RcbiAgICAgICAgICAgIGlmICghYWN0aW9uLmNhbGN1bGF0ZXNWZWxvY2l0eSkge1xuICAgICAgICAgICAgICAgIHZhbHVlLnZlbG9jaXR5ID0gY2FsYy5zcGVlZFBlclNlY29uZCh2YWx1ZS5mcmFtZUNoYW5nZSwgZnJhbWVEdXJhdGlvbik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFVwZGF0ZSBjdXJyZW50IHNwZWVkXG4gICAgICAgICAgICB2YWx1ZS5zcGVlZCA9IE1hdGguYWJzKHZhbHVlLnZlbG9jaXR5KTtcblxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgdmFsdWUncyBjaGFuZ2VkXG4gICAgICAgICAgICBpZiAodmFsdWUuY3VycmVudCAhPT0gdXBkYXRlZFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaGFzQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFNldCBuZXcgY3VycmVudCBcbiAgICAgICAgICAgIHZhbHVlLmN1cnJlbnQgPSB1cGRhdGVkVmFsdWU7XG4gICAgICAgICAgICBsZXQgdmFsdWVTdGF0ZSA9ICh2YWx1ZS51bml0KSA/IHVwZGF0ZWRWYWx1ZSArIHZhbHVlLnVuaXQgOiB1cGRhdGVkVmFsdWU7XG5cbiAgICAgICAgICAgIC8vIFB1dCB2YWx1ZSBpbiBzdGF0ZSBpZiBubyBwYXJlbnRcbiAgICAgICAgICAgIGlmICghdmFsdWUucGFyZW50KSB7XG4gICAgICAgICAgICAgICAgc3RhdGUudmFsdWVzW2tleV0gPSB2YWx1ZVN0YXRlO1xuXG4gICAgICAgICAgICAvLyBPciwgYWRkIHRvIHBhcmVudCBzdGF0ZSB0byBiZSBjb21iaW5lZCBsYXRlclxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdGF0ZVt2YWx1ZS5wYXJlbnRdID0gc3RhdGVbdmFsdWUucGFyZW50XSB8fCB7fTtcbiAgICAgICAgICAgICAgICBzdGF0ZVt2YWx1ZS5wYXJlbnRdW3ZhbHVlLnByb3BOYW1lXSA9IHZhbHVlU3RhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBVcGRhdGUgcGFyZW50IHZhbHVlcyBmcm9tIGNhbGN1bGF0ZWQgY2hpbGRyZW5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1BY3RpdmVQYXJlbnRzOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBrZXkgPSB0aGlzLmFjdGl2ZVBhcmVudHNbaV07XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLnZhbHVlc1trZXldO1xuXG4gICAgICAgICAgICAvLyBVcGRhdGUgcGFyZW50IHZhbHVlIGN1cnJlbnQgcHJvcGVydHlcbiAgICAgICAgICAgIHZhbHVlLmN1cnJlbnQgPSB2YWx1ZVR5cGVNYW5hZ2VyW3ZhbHVlLnR5cGVdLmNvbWJpbmUoc3RhdGVba2V5XSwgdmFsdWUudGVtcGxhdGUpO1xuXG4gICAgICAgICAgICAvLyBVcGRhdGUgc3RhdGVcbiAgICAgICAgICAgIHN0YXRlLnZhbHVlc1trZXldID0gdmFsdWUuY3VycmVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZpcmUgYGZyYW1lYCBhbmQgYHVwZGF0ZWAgY2FsbGJhY2tzIG9uIGFsbCBSb2xlc1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVJvbGVzOyBpKyspIHtcbiAgICAgICAgICAgIGxldCByb2xlID0gdGhpcy5yb2xlc1tpXTtcbiAgICAgICAgICAgIGxldCBtYXBwZWRWYWx1ZXMgPSB7fTtcblxuICAgICAgICAgICAgZWFjaChzdGF0ZS52YWx1ZXMsIGNyZWF0ZU1hcHBlcihyb2xlLCBtYXBwZWRWYWx1ZXMpKTtcblxuICAgICAgICAgICAgaWYgKHJvbGUuZnJhbWUpIHtcbiAgICAgICAgICAgICAgICByb2xlLmZyYW1lLmNhbGwodGhpcywgbWFwcGVkVmFsdWVzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHJvbGUudXBkYXRlICYmIChoYXNDaGFuZ2VkIHx8IHRoaXMuZmlyc3RGcmFtZSkpIHtcbiAgICAgICAgICAgICAgICByb2xlLnVwZGF0ZS5jYWxsKHRoaXMsIG1hcHBlZFZhbHVlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZXNldCBoYXNDaGFuZ2VkIGJlZm9yZSBmdXJ0aGVyIEFjdGlvbnMgbWlnaHQgYWZmZWN0IHRoaXNcbiAgICAgICAgdGhpcy5oYXNDaGFuZ2VkID0gZmFsc2U7XG5cbiAgICAgICAgLy8gQ2hlY2sgYWxsIEFjdGlvbnMgYW5kIGZpcmUgb25FbmQgaWYgdGhleSd2ZSBlbmRlZFxuICAgICAgICBpZiAodGhpcy5pc0FjdGl2ZSAmJiBjaGVja0FuZEZpcmVIYXNFbmRlZCh0aGlzLCBoYXNDaGFuZ2VkKSkge1xuICAgICAgICAgICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAvLyBGaXJlIGBjb21wbGV0ZWAgY2FsbGJhY2tcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtUm9sZXM7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCByb2xlID0gdGhpcy5yb2xlc1tpXTtcbiAgICAgICAgICAgICAgICBpZiAocm9sZS5jb21wbGV0ZSkge1xuICAgICAgICAgICAgICAgICAgICByb2xlLmNvbXBsZXRlLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBJZiBBY3RvciBpcyBzdGlsbCBpbmFjdGl2ZSwgZmlyZSBuZXh0IHN0ZXBcbiAgICAgICAgICAgIGlmICghdGhpcy5pc0FjdGl2ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMubmV4dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5maXJzdEZyYW1lID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZnJhbWVzdGFtcCA9IGZyYW1lc3RhbXA7XG4gICAgfTtcblxubW9kdWxlLmV4cG9ydHMgPSB1cGRhdGU7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYWN0b3IvdXBkYXRlLmpzXG4gKiovIiwidmFyIHZhbHVlVHlwZXNNYW5hZ2VyID0gcmVxdWlyZSgnLi4vdmFsdWUtdHlwZXMvbWFuYWdlcicpLFxuICAgIGNhbGMgPSByZXF1aXJlKCcuLi9pbmMvY2FsYycpLFxuICAgIHV0aWxzID0gcmVxdWlyZSgnLi4vaW5jL3V0aWxzJyksXG4gICAgaXNOdW0gPSB1dGlscy5pc051bSxcbiAgICBlYWNoID0gdXRpbHMuZWFjaDtcblxuY29uc3QgbnVtZXJpY2FsVmFsdWVzID0gWydjdXJyZW50JywgJ3RvJywgJ21pbicsICdtYXgnLCAndmVsb2NpdHknLCAnZnJpY3Rpb24nLCAnc3ByaW5nJ10sXG4gICAgbnVtTnVtZXJpY2FsVmFsdWVzID0gbnVtZXJpY2FsVmFsdWVzLmxlbmd0aCxcbiAgICBkZWZhdWx0VmFsdWUgPSB7XG4gICAgICAgIGN1cnJlbnQ6IDAsXG4gICAgICAgIHZlbG9jaXR5OiAwLFxuICAgICAgICBzcGVlZDogMCxcbiAgICAgICAgZnJhbWVDaGFuZ2U6IDBcbiAgICB9O1xuXG5mdW5jdGlvbiBjaGVja051bWVyaWNhbFZhbHVlKG5hbWUpIHtcbiAgICByZXR1cm4gKG51bWVyaWNhbFZhbHVlcy5pbmRleE9mKG5hbWUpID4gLTEpO1xufVxuXG4vKlxuICAgIENoZWNrIFJvbGUgdHlwZU1hcHMgdG8gc2VlIGlmIHRoaXMgdmFsdWUgbmFtZSBoYXMgYmVlbiBtYXBwZWRcbiAgICB0byBhIHNwZWNpZmljIHZhbHVlIHR5cGVcblxuICAgIEBwYXJhbSBbc3RyaW5nXVxuICAgIEBwYXJhbSBbYXJyYXldXG4gICAgQHJldHVybnMgW3N0cmluZ106IFZhbHVlIHR5cGVcbiovXG5mdW5jdGlvbiBjaGVja1JvbGVzKG5hbWUsIHJvbGVzKSB7XG4gICAgdmFyIHZhbHVlVHlwZTtcblxuICAgIGVhY2gocm9sZXMsIChrZXksIHJvbGUpID0+IHtcbiAgICAgICAgaWYgKHJvbGUuX3R5cGVNYXApIHtcbiAgICAgICAgICAgIHZhbHVlVHlwZSA9IHJvbGUuX3R5cGVNYXBbcm9sZS5tYXAobmFtZSldIHx8IHZhbHVlVHlwZTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHZhbHVlVHlwZTtcbn1cblxuLypcbiAgICBDaGVjayB2YWx1ZSBmb3Igc3BlY2lhbCB0eXBlXG5cbiAgICBAcGFyYW0gW29iamVjdF1cbiAgICBAcGFyYW0gW29iamVjdF1cbiAgICBAcGFyYW0gW29iamVjdF1cbiAgICBAcGFyYW0gW3N0cmluZ11cbiAgICBAcmV0dXJucyBbc3RyaW5nIHx8IGZhbHNlXVxuKi9cbmZ1bmN0aW9uIGNoZWNrVmFsdWVUeXBlKGV4aXN0aW5nVmFsdWUsIG5ld1ZhbHVlLCBzY29wZSwgdmFsdWVOYW1lKSB7XG4gICAgdmFyIHZhbHVlVHlwZTtcblxuICAgIC8vIENoZWNrIGV4aXN0aW5nIHZhbHVlIGZvciB0eXBlIGFscmVhZHkgc2V0XG4gICAgaWYgKGV4aXN0aW5nVmFsdWUgJiYgZXhpc3RpbmdWYWx1ZS50eXBlKSB7XG4gICAgICAgIHZhbHVlVHlwZSA9IGV4aXN0aW5nVmFsdWUudHlwZTtcbiAgICBcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBPciBjaGVjayBSb2xlIF90eXBlTWFwIHByb3BlcnRpZXNcbiAgICAgICAgaWYgKHNjb3BlLnJvbGVzKSB7XG4gICAgICAgICAgICB2YWx1ZVR5cGUgPSBjaGVja1JvbGVzKHZhbHVlTmFtZSwgc2NvcGUucm9sZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRmluYWxseSBydW4gdGVzdHNcbiAgICAgICAgaWYgKCF2YWx1ZVR5cGUgJiYgdXRpbHMuaXNTdHJpbmcobmV3VmFsdWUuY3VycmVudCkpIHtcbiAgICAgICAgICAgIHZhbHVlVHlwZSA9IHZhbHVlVHlwZXNNYW5hZ2VyLnRlc3QobmV3VmFsdWUuY3VycmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWVUeXBlO1xufVxuXG4vKlxuICAgIFJlc29sdmUgYSBwcm9wZXJ0eVxuXG4gICAgQHBhcmFtIFtzdHJpbmddXG4gICAgQHBhcmFtIFtzdHJpbmcgfHwgZnVuY3Rpb24gfHwgbnVtYmVyXVxuICAgIEBwYXJhbSBbb2JqZWN0XVxuICAgIEBwYXJhbSBbb2JqZWN0XVxuICAgIEByZXR1cm5zIFtudW1iZXJdXG4qL1xuZnVuY3Rpb24gcmVzb2x2ZShuYW1lLCBwcm9wLCB2YWx1ZSwgc2NvcGUpIHtcbiAgICBsZXQgaXNOdW1lcmljYWxWYWx1ZSA9IGNoZWNrTnVtZXJpY2FsVmFsdWUobmFtZSk7XG5cbiAgICAvLyBJZiBmdW5jdGlvbiwgcmVzb2x2ZVxuICAgIGlmICh1dGlscy5pc0Z1bmMocHJvcCkgJiYgaXNOdW1lcmljYWxWYWx1ZSkge1xuICAgICAgICBwcm9wID0gcHJvcC5jYWxsKHNjb3BlLCBzY29wZSk7XG4gICAgfVxuXG4gICAgLy8gSWYgc3RyaW5nLCBjaGVjayBmb3IgcmVsYXRpdmUgbnVtYmVycyBhbmQgdW5pdHNcbiAgICBpZiAodXRpbHMuaXNTdHJpbmcocHJvcCkpIHtcbiAgICAgICAgLy8gSWYgcmVsYXRpdmUgdmFsdWVcbiAgICAgICAgaWYgKHByb3AuaW5kZXhPZignPScpID4gMCkge1xuICAgICAgICAgICAgcHJvcCA9IGNhbGMucmVsYXRpdmVWYWx1ZSh2YWx1ZS5jdXJyZW50LCBwcm9wKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIHVuaXRcbiAgICAgICAgaWYgKGlzTnVtZXJpY2FsVmFsdWUpIHtcbiAgICAgICAgICAgIHNwbGl0VW5pdChwcm9wLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaXNOdW1lcmljYWxWYWx1ZSkge1xuICAgICAgICBwcm9wID0gcGFyc2VGbG9hdChwcm9wKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvcDtcbn1cblxuLypcbiAgICBTcGxpdCBhIHZhbHVlIGludG8gc3ViLXZhbHVlc1xuXG4gICAgQHBhcmFtIFtzdHJpbmddXG4gICAgQHBhcmFtIFtvYmplY3RdXG4gICAgQHBhcmFtIFtvYmplY3RdXG4gICAgQHBhcmFtIFt2YWx1ZVR5cGVIYW5kbGVyXVxuICAgIEByZXR1cm5zIFtvYmplY3RdXG4qL1xuZnVuY3Rpb24gc3BsaXQobmFtZSwgdmFsdWUsIHNjb3BlLCB2YWx1ZVR5cGVIYW5kbGVyKSB7XG4gICAgdmFyIHNwbGl0VmFsdWVzID0ge30sXG4gICAgICAgIGkgPSAwO1xuXG4gICAgZm9yICg7IGkgPCBudW1OdW1lcmljYWxWYWx1ZXM7IGkrKykge1xuICAgICAgICBsZXQgcHJvcE5hbWUgPSBudW1lcmljYWxWYWx1ZXNbaV07XG4gICAgICAgIGxldCBzcGxpdFByb3AgPSB7fTtcblxuICAgICAgICBpZiAodmFsdWUuaGFzT3duUHJvcGVydHkocHJvcE5hbWUpKSB7XG4gICAgICAgICAgICBsZXQgdmFsdWVQcm9wID0gdmFsdWVbcHJvcE5hbWVdO1xuXG4gICAgICAgICAgICAvLyBJZiB3ZSBuZWVkIHRvIGZpcnN0IHJlc29sdmUgdGhpcywgcmVzb2x2ZVxuICAgICAgICAgICAgaWYgKHV0aWxzLmlzRnVuYyh2YWx1ZVByb3ApKSB7XG4gICAgICAgICAgICAgICAgdmFsdWVQcm9wID0gdmFsdWVQcm9wLmNhbGwoc2NvcGUsIHNjb3BlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF1dGlscy5pc1N0cmluZyh2YWx1ZVByb3ApKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNwbGl0UHJvcCA9IHZhbHVlVHlwZUhhbmRsZXIuc3BsaXQodmFsdWVQcm9wKTtcblxuICAgICAgICAgICAgLy8gQXNzaWduIHNwbGl0IHByb3BlcnRpZXMgdG8gZWFjaCBjaGlsZCB2YWx1ZVxuICAgICAgICAgICAgZWFjaChzcGxpdFByb3AsIChrZXksIHByb3ApID0+IHtcbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgbmV3IHZhbHVlIGlmIG5vbmUgZXhpc3RzXG4gICAgICAgICAgICAgICAgc3BsaXRWYWx1ZXNba2V5XSA9IHNwbGl0VmFsdWVzW2tleV0gfHwgdXRpbHMuY29weSh2YWx1ZVR5cGVzTWFuYWdlci5kZWZhdWx0UHJvcHModmFsdWUudHlwZSwga2V5KSk7XG4gICAgICAgICAgICAgICAgc3BsaXRWYWx1ZXNba2V5XVtwcm9wTmFtZV0gPSBwcm9wO1xuXG4gICAgICAgICAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKHNwbGl0UHJvcFtrZXldKSkge1xuICAgICAgICAgICAgICAgICAgICBzcGxpdFVuaXQoc3BsaXRWYWx1ZXNba2V5XVtwcm9wTmFtZV0sIHNwbGl0VmFsdWVzW2tleV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHNwbGl0VmFsdWVzO1xufVxuXG4vKlxuICAgIFNwbGl0IHZhbHVlIGludG8gbnVtYmVyIGFuZCB1bml0LCBhbmQgc2V0IHVuaXQgdG8gdmFsdWVcblxuICAgIEBwYXJhbSBbc3RyaW5nXVxuICAgIEBwYXJhbSBbb2JqZWN0XVxuKi9cbmZ1bmN0aW9uIHNwbGl0VW5pdChwcm9wZXJ0eSwgaG9zdFZhbHVlKSB7XG4gICAgaWYgKHV0aWxzLmlzTnVtKHByb3BlcnR5KSkgeyByZXR1cm4gcHJvcGVydHk7IH1cbiAgICBsZXQgcmV0dXJuVmFsID0gcHJvcGVydHksXG4gICAgICAgIHsgdmFsdWUsIHVuaXQgfSA9IHV0aWxzLnNwbGl0VmFsVW5pdChwcm9wZXJ0eSk7XG5cbiAgICBpZiAoIWlzTmFOKHZhbHVlKSkge1xuICAgICAgICByZXR1cm5WYWwgPSB2YWx1ZTtcbiAgICAgICAgaWYgKHVuaXQpIHtcbiAgICAgICAgICAgIGhvc3RWYWx1ZS51bml0ID0gdW5pdDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXR1cm5WYWw7XG59XG5cbi8qXG4gICAgUHJlcHJvY2VzcyBpbmNvbWluZyB2YWx1ZXMsIHNwbGl0dGluZyBub24tbnVtZXJpY2FsIHZhbHVlc1xuICAgIGludG8gc3ViLXZhbHVlcyBpZSBoZXhcblxuICAgIEBwYXJhbSBbb2JqZWN0XVxuICAgIEBwYXJhbSBbb2JqZWN0XVxuICAgIEBwYXJhbSBbb2JqZWN0XVxuICAgIEBwYXJhbSBbc3RyaW5nXVxuKi9cbmZ1bmN0aW9uIHByZXByb2Nlc3MoZXhpc3RpbmcsIGluY29taW5nLCBzY29wZSwgZGVmYXVsdFByb3ApIHtcbiAgICB2YXIgdmFsdWVzID0ge307XG5cbiAgICBlYWNoKGluY29taW5nLCAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICBsZXQgZXhpc3RpbmdWYWx1ZSA9IGV4aXN0aW5nW2tleV0sXG4gICAgICAgICAgICBuZXdWYWx1ZSA9IHt9O1xuXG4gICAgICAgIGlmICh1dGlscy5pc09iaih2YWx1ZSkpIHtcbiAgICAgICAgICAgIG5ld1ZhbHVlID0gdmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXdWYWx1ZVtkZWZhdWx0UHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIHZhbHVlIGRvZXNuJ3QgaGF2ZSBhIHNwZWNpYWwgdHlwZSwgY2hlY2sgZm9yIG9uZVxuICAgICAgICBuZXdWYWx1ZS50eXBlID0gY2hlY2tWYWx1ZVR5cGUoZXhpc3RpbmdWYWx1ZSwgbmV3VmFsdWUsIHNjb3BlLCBrZXkpO1xuXG4gICAgICAgIHZhbHVlc1trZXldID0gbmV3VmFsdWU7XG5cbiAgICAgICAgLy8gSWYgd2UgaGF2ZSBhIHR5cGUgcHJvcGVydHksIHNwbGl0L2Fzc2lnbiBkZWZhdWx0IHByb3BzXG4gICAgICAgIGlmIChuZXdWYWx1ZS50eXBlKSB7XG4gICAgICAgICAgICBsZXQgdHlwZUhhbmRsZXIgPSB2YWx1ZVR5cGVzTWFuYWdlcltuZXdWYWx1ZS50eXBlXTtcblxuICAgICAgICAgICAgLy8gSWYgdmFsdWVUeXBlIGhhbmRsZXIgaGFzIGEgc3BsaXQgZnVuY3Rpb24sIHNwbGl0IHRoaXMgdmFsdWVcbiAgICAgICAgICAgIGlmICh0eXBlSGFuZGxlci5zcGxpdCkge1xuICAgICAgICAgICAgICAgIGxldCBzcGxpdFZhbHVlcyA9IHNwbGl0KGtleSwgbmV3VmFsdWUsIHNjb3BlLCB0eXBlSGFuZGxlcik7XG4gICAgICAgICAgICAgICAgbmV3VmFsdWUuY2hpbGRyZW4gPSB7fTtcblxuICAgICAgICAgICAgICAgIGVhY2goc3BsaXRWYWx1ZXMsIChjaGlsZE5hbWUsIGNoaWxkVmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRWYWx1ZSA9IHV0aWxzLm1lcmdlKG5ld1ZhbHVlLCBjaGlsZFZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRWYWx1ZS5wYXJlbnQgPSBjaGlsZFZhbHVlLm5hbWUgPSBrZXk7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkVmFsdWUucHJvcE5hbWUgPSBjaGlsZE5hbWU7XG5cbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGNoaWxkVmFsdWUudHlwZTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGNoaWxkVmFsdWUuY2hpbGRyZW47XG5cbiAgICAgICAgICAgICAgICAgICAgbmV3VmFsdWUuY2hpbGRyZW5bY2hpbGROYW1lXSA9IHZhbHVlc1trZXkgKyBjaGlsZE5hbWVdID0gY2hpbGRWYWx1ZTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlSGFuZGxlci50ZW1wbGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZS50ZW1wbGF0ZSA9IGV4aXN0aW5nVmFsdWUgPyBleGlzdGluZ1ZhbHVlLnRlbXBsYXRlIDogdHlwZUhhbmRsZXIudGVtcGxhdGUobmV3VmFsdWUuY3VycmVudCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBPciBqdXN0IGFzc2lnbiBkZWZhdWx0IHByb3BlcnRpZXMgZm9yIHRoaXMgdmFsdWVcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFsdWVzW2tleV0gPSB1dGlscy5tZXJnZSh2YWx1ZVR5cGVzTWFuYWdlci5kZWZhdWx0UHJvcHMobmV3VmFsdWUudHlwZSwga2V5KSwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdmFsdWVzO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICAgIC8qXG4gICAgICAgIEZsaXAgdmFsdWUgdGFyZ2V0L29yaWdpblxuICAgICovXG4gICAgZmxpcDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHZhciB0YXJnZXQgPSAodmFsdWUudGFyZ2V0ICE9PSB1bmRlZmluZWQpID8gdmFsdWUudGFyZ2V0IDogdmFsdWUuY3VycmVudDtcbiAgICAgICAgdmFsdWUudGFyZ2V0ID0gdmFsdWUudG8gPSB2YWx1ZS5vcmlnaW47XG4gICAgICAgIHZhbHVlLm9yaWdpbiA9IHRhcmdldDtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgICAgTWVyZ2UgZXhpc3RpbmcgYW5kIGluY29taW5nIHZhbHVlcywgcmVzb2x2aW5nIHByb3BlcnRpZXNcbiAgICAgICAgc2V0IGFzIGZ1bmN0aW9ucyBhbmQgc3BsaXR0aW5nIG5vbi1udW1lcmljYWwgdmFsdWVzIGllIGhleFxuXG4gICAgICAgIEBwYXJhbSBbb2JqZWN0XVxuICAgICAgICBAcGFyYW0gW29iamVjdF1cbiAgICAgICAgQHBhcmFtIFtvYmplY3RdXG4gICAgICAgIEBwYXJhbSBbc3RyaW5nXSAob3B0aW9uYWwpXG4gICAgICAgIEBwYXJhbSBbb2JqZWN0XVxuICAgICAgICBAcmV0dXJucyBbb2JqZWN0XTogTmV3IHZhbHVlcyBvYmplY3RcbiAgICAqL1xuICAgIHByb2Nlc3M6IGZ1bmN0aW9uIChleGlzdGluZywgaW5jb21pbmcsIGluaGVyaXQsIGRlZmF1bHRQcm9wLCBzY29wZSkge1xuICAgICAgICBleGlzdGluZyA9IGV4aXN0aW5nIHx8IHt9O1xuICAgICAgICBkZWZhdWx0UHJvcCA9IGRlZmF1bHRQcm9wIHx8ICdjdXJyZW50JztcbiAgICAgICAgbGV0IHByZXByb2Nlc3NlZCA9IHByZXByb2Nlc3MoZXhpc3RpbmcsIGluY29taW5nLCBzY29wZSwgZGVmYXVsdFByb3ApO1xuXG4gICAgICAgIGVhY2gocHJlcHJvY2Vzc2VkLCAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgbGV0IG5ld1ZhbHVlID0gZXhpc3Rpbmdba2V5XSB8fCB1dGlscy5jb3B5KGRlZmF1bHRWYWx1ZSksXG4gICAgICAgICAgICAgICAgaGFzQ2hpbGRyZW4gPSAodmFsdWUuY2hpbGRyZW4gIT09IHVuZGVmaW5lZCksXG4gICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvblZhbHVlID0gaW5oZXJpdC5hY3Rpb24gPyBpbmhlcml0LmFjdGlvbi5nZXREZWZhdWx0VmFsdWUoKSA6IHt9O1xuXG4gICAgICAgICAgICB2YWx1ZS5hY3Rpb24gPSBpbmhlcml0LmFjdGlvbjtcblxuICAgICAgICAgICAgZWFjaChkZWZhdWx0QWN0aW9uVmFsdWUsIChwcm9wTmFtZSwgZGVmYXVsdEFjdGlvblByb3ApID0+IHtcbiAgICAgICAgICAgICAgICBuZXdWYWx1ZVtwcm9wTmFtZV0gPSAoaW5oZXJpdC5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSkgJiYgIXZhbHVlLmhhc093blByb3BlcnR5KHByb3BOYW1lKSkgPyBpbmhlcml0W3Byb3BOYW1lXSA6IGRlZmF1bHRBY3Rpb25Qcm9wO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGVhY2godmFsdWUsICh2YWx1ZU5hbWUsIHZhbHVlUHJvcCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIElmIHByb3BlcnR5IGlzIG5vdCB1bmRlZmluZWQgb3IgYSBudW1iZXIsIHJlc29sdmVcbiAgICAgICAgICAgICAgICBpZiAodmFsdWVQcm9wICE9PSB1bmRlZmluZWQgJiYgIWlzTnVtKHZhbHVlUHJvcCkgJiYgIWhhc0NoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlUHJvcCA9IHJlc29sdmUodmFsdWVOYW1lLCB2YWx1ZVByb3AsIG5ld1ZhbHVlLCBzY29wZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbmV3VmFsdWVbdmFsdWVOYW1lXSA9IHZhbHVlUHJvcDtcblxuICAgICAgICAgICAgICAgIC8vIFNldCBpbnRlcm5hbCB0YXJnZXQgaWYgdGhpcyBwcm9wZXJ0eSBpcyAndG8nXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlTmFtZSA9PT0gJ3RvJykge1xuICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZS50YXJnZXQgPSBuZXdWYWx1ZS50bztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbmV3VmFsdWUub3JpZ2luID0gbmV3VmFsdWUuY3VycmVudDtcbiAgICAgICAgICAgIG5ld1ZhbHVlLmhhc1JhbmdlID0gKGlzTnVtKG5ld1ZhbHVlLm1pbikgfHwgaXNOdW0obmV3VmFsdWUubWF4KSkgPyB0cnVlIDogZmFsc2U7XG5cbiAgICAgICAgICAgIGV4aXN0aW5nW2tleV0gPSBuZXdWYWx1ZTtcbiAgICAgICAgICAgIHNjb3BlLnVwZGF0ZU9yZGVyKGtleSwgdXRpbHMuaXNTdHJpbmcobmV3VmFsdWUud2F0Y2gpLCBoYXNDaGlsZHJlbik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBleGlzdGluZztcbiAgICB9XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2FjdG9yL3ZhbHVlLW9wZXJhdGlvbnMuanNcbiAqKi8iLCJ2YXIgUm9sZSA9IHJlcXVpcmUoJy4vUm9sZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBSb2xlKHtcbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmluaXQpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHN0YXJ0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLm9uU3RhcnQpIHtcbiAgICAgICAgICAgIHRoaXMub25TdGFydCgpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGZyYW1lOiBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgICAgICAgaWYgKHRoaXMub25GcmFtZSkge1xuICAgICAgICAgICAgdGhpcy5vbkZyYW1lKHN0YXRlKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChzdGF0ZSkge1xuICAgICAgICBpZiAodGhpcy5vblVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5vblVwZGF0ZShzdGF0ZSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgY29tcGxldGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMub25Db21wbGV0ZSkge1xuICAgICAgICAgICAgdGhpcy5vbkNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9yb2xlcy9kZWZhdWx0Um9sZS5qc1xuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgLy8gW251bWJlcl06IERlZmF1bHQgbWF4IHNpemUgb2YgaGlzdG9yeVxuICAgIG1heEhpc3RvcnlTaXplID0gMyxcbiAgICBcbiAgICAvKlxuICAgICAgICBIaXN0b3J5IGNvbnN0cnVjdG9yXG4gICAgICAgIFxuICAgICAgICBAcGFyYW0gW3Zhcl06IFZhcmlhYmxlIHRvIHN0b3JlIGluIGZpcnN0IGhpc3Rvcnkgc2xvdFxuICAgICAgICBAcGFyYW0gW2ludF0gKG9wdGlvbmFsKTogTWF4aW11bSBzaXplIG9mIGhpc3RvcnlcbiAgICAqL1xuICAgIEhpc3RvcnkgPSBmdW5jdGlvbiAob2JqLCBtYXgpIHtcbiAgICAgICAgdGhpcy5tYXggPSBtYXggfHwgbWF4SGlzdG9yeVNpemU7XG4gICAgICAgIHRoaXMuZW50cmllcyA9IFtdO1xuICAgICAgICB0aGlzLmFkZChvYmopO1xuICAgIH07XG4gICAgXG5IaXN0b3J5LnByb3RvdHlwZSA9IHtcbiAgICBcbiAgICAvKlxuICAgICAgICBQdXNoIG5ldyB2YXIgdG8gaGlzdG9yeVxuICAgICAgICBcbiAgICAgICAgU2hpZnQgb3V0IG9sZGVzdCBlbnRyeSBpZiB3ZSd2ZSByZWFjaGVkIG1heGltdW0gY2FwYWNpdHlcbiAgICAgICAgXG4gICAgICAgIEBwYXJhbSBbdmFyXTogVmFyaWFibGUgdG8gcHVzaCBpbnRvIGhpc3RvcnkuZW50cmllc1xuICAgICovXG4gICAgYWRkOiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIHZhciBjdXJyZW50U2l6ZSA9IHRoaXMuZ2V0U2l6ZSgpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5lbnRyaWVzLnB1c2gob2JqKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChjdXJyZW50U2l6ZSA+PSB0aGlzLm1heCkge1xuICAgICAgICAgICAgdGhpcy5lbnRyaWVzLnNoaWZ0KCk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIFxuICAgIC8qXG4gICAgICAgIEdldCB2YXJpYWJsZSBhdCBzcGVjaWZpZWQgaW5kZXhcblxuICAgICAgICBAcGFyYW0gW2ludF06IEluZGV4XG4gICAgICAgIEByZXR1cm4gW3Zhcl06IFZhciBmb3VuZCBhdCBzcGVjaWZpZWQgaW5kZXhcbiAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgaSA9ICh0eXBlb2YgaSA9PT0gJ251bWJlcicpID8gaSA6IHRoaXMuZ2V0U2l6ZSgpIC0gMTtcblxuICAgICAgICByZXR1cm4gdGhpcy5lbnRyaWVzW2ldO1xuICAgIH0sXG4gICAgXG4gICAgLypcbiAgICAgICAgR2V0IHRoZSBzZWNvbmQgbmV3ZXN0IGhpc3RvcnkgZW50cnlcbiAgICAgICAgXG4gICAgICAgIEByZXR1cm4gW3Zhcl06IEVudHJ5IGZvdW5kIGF0IGluZGV4IHNpemUgLSAyXG4gICAgKi9cbiAgICBnZXRQcmV2aW91czogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXQodGhpcy5nZXRTaXplKCkgLSAyKTtcbiAgICB9LFxuICAgIFxuICAgIC8qXG4gICAgICAgIEdldCBjdXJyZW50IGhpc3Rvcnkgc2l6ZVxuICAgICAgICBcbiAgICAgICAgQHJldHVybiBbaW50XTogQ3VycmVudCBsZW5ndGggb2YgZW50cmllcy5sZW5ndGhcbiAgICAqL1xuICAgIGdldFNpemU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW50cmllcy5sZW5ndGg7XG4gICAgfVxuICAgIFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBIaXN0b3J5O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2luYy9IaXN0b3J5LmpzXG4gKiovIiwiY2xhc3MgQ29udHJvbHMge1xuICAgIGNvbnN0cnVjdG9yKGFjdG9yLCBhY3Rpb24sIGhhc1N0YXJ0ZWQpIHtcbiAgICAgICAgdGhpcy5hY3RvciA9IGFjdG9yO1xuICAgICAgICB0aGlzLmFjdGlvbiA9IGFjdGlvbjtcblxuICAgICAgICBpZiAoaGFzU3RhcnRlZCkge1xuICAgICAgICAgICAgdGhpcy5pZCA9IHRoaXMuYmluZEFjdGlvbigpO1xuICAgICAgICAgICAgdGhpcy5hY3Rpb24uYWN0aXZhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXJ0KGlucHV0KSB7XG4gICAgICAgIHRoaXMuaWQgPSB0aGlzLmJpbmRBY3Rpb24oKTtcbiAgICAgICAgdGhpcy5hY3Rvci5zdGFydCh0aGlzLmlkLCBpbnB1dCk7XG4gICAgICAgIHRoaXMuYWN0aW9uLmFjdGl2YXRlKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHN0b3AoKSB7XG4gICAgICAgIHRoaXMuYWN0b3IudW5iaW5kQWN0aW9uKHRoaXMuaWQpO1xuICAgICAgICB0aGlzLmFjdGlvbi5kZWFjdGl2YXRlKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHBhdXNlKCkge1xuICAgICAgICB0aGlzLmFjdGlvbi5kZWFjdGl2YXRlKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHJlc3VtZSgpIHtcbiAgICAgICAgdGhpcy5hY3Rpb24uYWN0aXZhdGUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgdG9nZ2xlKCkge1xuICAgICAgICBsZXQgcmVzdW1lID0gdGhpcy5hY3Rvci5oYXNBY3Rpb24odGhpcy5pZCkgPyB0aGlzLnJlc3VtZSA6IHRoaXMuc3RhcnQ7XG4gICAgICAgIHJldHVybiB0aGlzLmFjdGlvbi5pc0FjdGl2ZSA/IHRoaXMucGF1c2UoKSA6IHJlc3VtZS5jYWxsKHRoaXMpO1xuICAgIH1cblxuICAgIHRoZW4oLi4uYXJncykge1xuICAgICAgICB0aGlzLmFjdG9yLnRoZW4oLi4uYXJncyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGJpbmRBY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFjdG9yLmJpbmRBY3Rpb24odGhpcy5hY3Rpb24sIHRoaXMuaWQpO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDb250cm9scztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jb250cm9scy9Db250cm9scy5qc1xuICoqLyIsIi8qXG4gICAgRWFzaW5nIGZ1bmN0aW9uc1xuICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICBcbiAgICBHZW5lcmF0ZXMgYW5kIHByb3ZpZGVzIGVhc2luZyBmdW5jdGlvbnMgYmFzZWQgb24gYmFzZUZ1bmN0aW9uIGRlZmluaXRpb25zXG4gICAgXG4gICAgQSBjYWxsIHRvIGVhc2luZ0Z1bmN0aW9uLmdldCgnZnVuY3Rpb25OYW1lJykgcmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgY2FuIGJlIHBhc3NlZDpcbiAgICAgICAgQHBhcmFtIFtudW1iZXJdOiBQcm9ncmVzcyAwLTFcbiAgICAgICAgQHBhcmFtIFtudW1iZXJdIChvcHRpb25hbCk6IEFtcCBtb2RpZmllciwgb25seSBhY2NlcHRlZCBpbiBzb21lIGVhc2luZyBmdW5jdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuZCBpcyB1c2VkIHRvIGFkanVzdCBvdmVyYWxsIHN0cmVuZ3RoXG4gICAgICAgIEByZXR1cm4gW251bWJlcl06IEVhc2VkIHByb2dyZXNzXG4gICAgICAgIFxuICAgIFdlIGNhbiBnZW5lcmF0ZSBuZXcgZnVuY3Rpb25zIGJ5IHNlbmRpbmcgYW4gZWFzaW5nIGZ1bmN0aW9uIHRocm91Z2ggZWFzaW5nRnVuY3Rpb24uZXh0ZW5kKG5hbWUsIG1ldGhvZCkuXG4gICAgV2hpY2ggd2lsbCBtYWtlIG5hbWVJbiwgbmFtZU91dCBhbmQgbmFtZUluT3V0IGZ1bmN0aW9ucyBhdmFpbGFibGUgdG8gdXNlLlxuICAgICAgICBcbiAgICBFYXNpbmcgZnVuY3Rpb25zIGZyb20gUm9iZXJ0IFBlbm5lclxuICAgIGh0dHA6Ly93d3cucm9iZXJ0cGVubmVyLmNvbS9lYXNpbmcvXG4gICAgICAgIFxuICAgIEJlemllciBjdXJ2ZSBpbnRlcnByZXRvciBjcmVhdGVkIGZyb20gR2HDq3RhbiBSZW5hdWRlYXUncyBvcmlnaW5hbCBCZXppZXJFYXNpbmcgIFxuICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9ncmUvYmV6aWVyLWVhc2luZy9ibG9iL21hc3Rlci9pbmRleC5qcyAgXG4gICAgaHR0cHM6Ly9naXRodWIuY29tL2dyZS9iZXppZXItZWFzaW5nL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiovXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIEVhc2luZyA9IHJlcXVpcmUoJy4vRWFzaW5nJyksXG4gICAgZWFzaW5nRnVuY3Rpb24sXG4gICAgXG4gICAgLy8gR2VuZXJhdGUgZWFzaW5nIGZ1bmN0aW9uIHdpdGggcHJvdmlkZWQgcG93ZXJcbiAgICBnZW5lcmF0ZVBvd2VyRWFzaW5nID0gZnVuY3Rpb24gKHBvd2VyKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAocHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnBvdyhwcm9ncmVzcywgcG93ZXIpO1xuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAgICBFYWNoIG9mIHRoZXNlIGJhc2UgZnVuY3Rpb25zIGlzIGFuIGVhc2VJblxuICAgICAgICBcbiAgICAgICAgT24gaW5pdCwgd2UgdXNlIEVhc2luZ0Z1bmN0aW9uLm1pcnJvciBhbmQgLnJldmVyc2UgdG8gZ2VuZXJhdGUgZWFzZUluT3V0IGFuZFxuICAgICAgICBlYXNlT3V0IGZ1bmN0aW9ucyByZXNwZWN0aXZlbHkuXG4gICAgKi9cbiAgICBiYXNlRWFzaW5nID0ge1xuICAgICAgICBjaXJjOiBmdW5jdGlvbiAocHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgIHJldHVybiAxIC0gTWF0aC5zaW4oTWF0aC5hY29zKHByb2dyZXNzKSk7XG4gICAgICAgIH0sXG4gICAgICAgIGJhY2s6IGZ1bmN0aW9uIChwcm9ncmVzcykge1xuICAgICAgICAgICAgdmFyIHN0cmVuZ3RoID0gMS41O1xuXG4gICAgICAgICAgICByZXR1cm4gKHByb2dyZXNzICogcHJvZ3Jlc3MpICogKChzdHJlbmd0aCArIDEpICogcHJvZ3Jlc3MgLSBzdHJlbmd0aCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4vLyBHZW5lcmF0ZSBwb3dlciBlYXNpbmcgZWFzaW5nXG5bJ2Vhc2UnLCAnY3ViaWMnLCAncXVhcnQnLCAncXVpbnQnXS5mb3JFYWNoKGZ1bmN0aW9uIChlYXNpbmdOYW1lLCBpKSB7XG4gICAgYmFzZUVhc2luZ1tlYXNpbmdOYW1lXSA9IGdlbmVyYXRlUG93ZXJFYXNpbmcoaSArIDIpO1xufSk7XG5cbi8vIEdlbmVyYXRlIGluL291dC9pbk91dCB2YXJpYXRpb25zXG5mb3IgKHZhciBrZXkgaW4gYmFzZUVhc2luZykge1xuICAgIGlmIChiYXNlRWFzaW5nLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgZWFzaW5nRnVuY3Rpb24gPSBuZXcgRWFzaW5nKGJhc2VFYXNpbmdba2V5XSk7XG4gICAgICAgIGJhc2VFYXNpbmdba2V5ICsgJ0luJ10gPSBlYXNpbmdGdW5jdGlvbi5pbjtcbiAgICAgICAgYmFzZUVhc2luZ1trZXkgKyAnT3V0J10gPSBlYXNpbmdGdW5jdGlvbi5vdXQ7XG4gICAgICAgIGJhc2VFYXNpbmdba2V5ICsgJ0luT3V0J10gPSBlYXNpbmdGdW5jdGlvbi5pbk91dDtcbiAgICB9XG59XG5cbi8qXG4gICAgTGluZWFyIGVhc2luZyBhZGp1c3RtZW50XG4gICAgXG4gICAgVGhlIGRlZmF1bHQgZWFzaW5nIG1ldGhvZCwgbm90IGFkZGVkIHdpdGggLmV4dGVuZCBhcyBpdCBoYXMgbm8gT3V0IG9yIEluT3V0XG4gICAgdmFyaWF0aW9uLlxuICAgIFxuICAgIEBwYXJhbSBbbnVtYmVyXTogUHJvZ3Jlc3MsIGZyb20gMC0xXG4gICAgQHJldHVybiBbbnVtYmVyXTogVW5hZGp1c3RlZCBwcm9ncmVzc1xuKi9cbmJhc2VFYXNpbmcubGluZWFyID0gZnVuY3Rpb24gKHByb2dyZXNzKSB7XG4gICAgcmV0dXJuIHByb2dyZXNzO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlRWFzaW5nO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2FjdGlvbnMvdHdlZW4vcHJlc2V0LWVhc2luZy5qc1xuICoqLyIsInZhciBDb250cm9scyA9IHJlcXVpcmUoJy4uLy4uL2NvbnRyb2xzL0NvbnRyb2xzJyk7XG5cbmNsYXNzIFR3ZWVuQ29udHJvbHMgZXh0ZW5kcyBDb250cm9scyB7XG4gICAgcmVzdGFydCgpIHtcbiAgICAgICAgdGhpcy5hY3Rpb24ucmVzdGFydCgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICByZXZlcnNlKCkge1xuICAgICAgICB0aGlzLmFjdGlvbi5yZXZlcnNlKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNlZWsocHJvZ3Jlc3MpIHtcbiAgICAgICAgaWYgKCF0aGlzLmFjdG9yLmhhc0FjdGlvbih0aGlzLmlkKSkge1xuICAgICAgICAgICAgdGhpcy5zdGFydCgpLnBhdXNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFjdGlvbi5lbGFwc2VkID0gdGhpcy5hY3Rpb24uZHVyYXRpb24gKiBwcm9ncmVzcztcblxuICAgICAgICBpZiAoIXRoaXMuYWN0aW9uLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLmFjdGlvbi5hY3RpdmF0ZSgpO1xuICAgICAgICAgICAgdGhpcy5hY3Rvci5wcm9jZXNzLmZpcmUoKTtcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uLmRlYWN0aXZhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBUd2VlbkNvbnRyb2xzO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2FjdGlvbnMvdHdlZW4vVHdlZW5Db250cm9scy5qc1xuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgY2FsYyA9IHJlcXVpcmUoJy4uLy4uL2luYy9jYWxjJyksXG4gICAgdXRpbHMgPSByZXF1aXJlKCcuLi8uLi9pbmMvdXRpbHMnKSxcbiAgICBzcGVlZFBlckZyYW1lID0gY2FsYy5zcGVlZFBlckZyYW1lO1xuXG4vKlxuICAgIEFkZCBjb3JlIHBoeXNpY3Mgc2ltdWxhdGlvbnNcbiovXG52YXIgc2ltdWxhdGlvbnMgPSB7XG4gICAgLypcbiAgICAgICAgVmVsb2NpdHlcbiAgICAgICAgXG4gICAgICAgIFRoZSBkZWZhdWx0IC5ydW4oKSBzaW11bGF0aW9uLlxuICAgICAgICBcbiAgICAgICAgQXBwbGllcyBhbnkgc2V0IGRlY2VsZXJhdGlvbiBhbmQgYWNjZWxlcmF0aW9uIHRvIGV4aXN0aW5nIHZlbG9jaXR5XG4gICAgKi9cbiAgICB2ZWxvY2l0eTogZnVuY3Rpb24gKHZhbHVlLCBkdXJhdGlvbikge1xuICAgICAgICB2YWx1ZS52ZWxvY2l0eSA9IHZhbHVlLnZlbG9jaXR5IC0gc3BlZWRQZXJGcmFtZSh2YWx1ZS5kZWNlbGVyYXRpb24sIGR1cmF0aW9uKSArIHNwZWVkUGVyRnJhbWUodmFsdWUuYWNjZWxlcmF0aW9uLCBkdXJhdGlvbik7XG5cbiAgICAgICAgcmV0dXJuIHNpbXVsYXRpb25zLmZyaWN0aW9uKHZhbHVlLCBkdXJhdGlvbik7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICAgIEdsaWRlXG4gICAgICAgIFxuICAgICAgICBFbXVsYXRlcyB0b3VjaCBkZXZpY2Ugc2Nyb2xsaW5nIGVmZmVjdHMgd2l0aCBleHBvbmVudGlhbCBkZWNheVxuICAgICAgICBodHRwOi8vYXJpeWEub2ZpbGFicy5jb20vMjAxMy8xMS9qYXZhc2NyaXB0LWtpbmV0aWMtc2Nyb2xsaW5nLXBhcnQtMi5odG1sXG4gICAgKi9cbiAgICBnbGlkZTogZnVuY3Rpb24gKHZhbHVlLCBkdXJhdGlvbiwgc3RhcnRlZCkge1xuICAgICAgICB2YXIgdGltZVVudGlsRmluaXNoZWQgPSAtIHV0aWxzLmN1cnJlbnRUaW1lKCkgLSBzdGFydGVkLFxuICAgICAgICAgICAgZGVsdGEgPSAtIHZhbHVlLnRvICogTWF0aC5leHAodGltZVVudGlsRmluaXNoZWQgLyB2YWx1ZS50aW1lQ29uc3RhbnQpO1xuXG4gICAgICAgIHJldHVybiAodmFsdWUudG8gKyBkZWx0YSkgLSB2YWx1ZS5jdXJyZW50O1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAgICBGcmljdGlvblxuXG4gICAgICAgIEFwcGx5IGZyaWN0aW9uIHRvIHRoZSBjdXJyZW50IHZhbHVlXG4gICAgICAgIFRPRE86IE1ha2UgdGhpcyBmcmFtZXJhdGUtaW5kZXBlbmRlbnRcbiAgICAqL1xuICAgIGZyaWN0aW9uOiBmdW5jdGlvbiAodmFsdWUsIGR1cmF0aW9uKSB7XG4gICAgICAgIHZhciBuZXdWZWxvY2l0eSA9IHNwZWVkUGVyRnJhbWUodmFsdWUudmVsb2NpdHksIGR1cmF0aW9uKSAqICgxIC0gdmFsdWUuZnJpY3Rpb24pO1xuXG4gICAgICAgIHJldHVybiBjYWxjLnNwZWVkUGVyU2Vjb25kKG5ld1ZlbG9jaXR5LCBkdXJhdGlvbik7XG4gICAgfSxcblxuICAgIHNwcmluZzogZnVuY3Rpb24gKHZhbHVlLCBkdXJhdGlvbikge1xuICAgICAgICB2YXIgZGlzdGFuY2UgPSB2YWx1ZS50byAtIHZhbHVlLmN1cnJlbnQ7XG5cbiAgICAgICAgdmFsdWUudmVsb2NpdHkgKz0gZGlzdGFuY2UgKiBzcGVlZFBlckZyYW1lKHZhbHVlLnNwcmluZywgZHVyYXRpb24pO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHNpbXVsYXRpb25zLmZyaWN0aW9uKHZhbHVlLCBkdXJhdGlvbik7XG4gICAgfSxcblxuICAgIGJvdW5jZTogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHZhciBkaXN0YW5jZSA9IDAsXG4gICAgICAgICAgICB0byA9IHZhbHVlLnRvLFxuICAgICAgICAgICAgY3VycmVudCA9IHZhbHVlLmN1cnJlbnQsXG4gICAgICAgICAgICBib3VuY2UgPSB2YWx1ZS5ib3VuY2U7XG4gICAgICAgIFxuICAgICAgICAvLyBJZiB3ZSdyZSB1c2luZyBnbGlkZSBzaW11bGF0aW9uIHdlIGhhdmUgdG8gZmxpcCBvdXIgdGFyZ2V0IHRvb1xuICAgICAgICBpZiAodmFsdWUuc2ltdWxhdGUgPT09ICdnbGlkZScpIHtcbiAgICAgICAgICAgIGRpc3RhbmNlID0gdG8gLSBjdXJyZW50O1xuICAgICAgICAgICAgdmFsdWUudG8gPSBjdXJyZW50IC0gKGRpc3RhbmNlICogYm91bmNlKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHZhbHVlLnZlbG9jaXR5ICo9IC0gYm91bmNlO1xuICAgIH0sXG5cbiAgICBjYXB0dXJlOiBmdW5jdGlvbiAodmFsdWUsIHRhcmdldCkge1xuICAgICAgICB2YWx1ZS50byA9IHRhcmdldDtcbiAgICAgICAgdmFsdWUuc2ltdWxhdGUgPSAnc3ByaW5nJztcbiAgICAgICAgdmFsdWUuY2FwdHVyZSA9IHZhbHVlLm1pbiA9IHZhbHVlLm1heCA9IHVuZGVmaW5lZDtcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNpbXVsYXRpb25zO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYWN0aW9ucy9zaW11bGF0ZS9zaW11bGF0aW9ucy5qc1xuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgSW5wdXQgPSByZXF1aXJlKCcuL0lucHV0LmpzJyksXG4gICAgY3VycmVudFBvaW50ZXIsIC8vIFNvcnQgdGhpcyBvdXQgZm9yIG11bHRpdG91Y2hcbiAgICBcbiAgICBUT1VDSE1PVkUgPSAndG91Y2htb3ZlJyxcbiAgICBNT1VTRU1PVkUgPSAnbW91c2Vtb3ZlJyxcblxuICAgIC8qXG4gICAgICAgIENvbnZlcnQgZXZlbnQgaW50byBwb2ludFxuICAgICAgICBcbiAgICAgICAgU2NyYXBlIHRoZSB4L3kgY29vcmRpbmF0ZXMgZnJvbSB0aGUgcHJvdmlkZWQgZXZlbnRcbiAgICAgICAgXG4gICAgICAgIEBwYXJhbSBbZXZlbnRdOiBPcmlnaW5hbCBwb2ludGVyIGV2ZW50XG4gICAgICAgIEBwYXJhbSBbYm9vbGVhbl06IFRydWUgaWYgdG91Y2ggZXZlbnRcbiAgICAgICAgQHJldHVybiBbb2JqZWN0XTogeC95IGNvb3JkaW5hdGVzIG9mIGV2ZW50XG4gICAgKi9cbiAgICBldmVudFRvUG9pbnQgPSBmdW5jdGlvbiAoZXZlbnQsIGlzVG91Y2hFdmVudCkge1xuICAgICAgICB2YXIgdG91Y2hDaGFuZ2VkID0gaXNUb3VjaEV2ZW50ID8gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0gOiBmYWxzZTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiB0b3VjaENoYW5nZWQgPyB0b3VjaENoYW5nZWQuY2xpZW50WCA6IGV2ZW50LnBhZ2VYLFxuICAgICAgICAgICAgeTogdG91Y2hDaGFuZ2VkID8gdG91Y2hDaGFuZ2VkLmNsaWVudFkgOiBldmVudC5wYWdlWVxuICAgICAgICB9O1xuICAgIH0sXG4gICAgXG4gICAgLypcbiAgICAgICAgR2V0IGFjdHVhbCBldmVudFxuICAgICAgICBcbiAgICAgICAgQ2hlY2tzIGZvciBqUXVlcnkncyAub3JpZ2luYWxFdmVudCBpZiBwcmVzZW50XG4gICAgICAgIFxuICAgICAgICBAcGFyYW0gW2V2ZW50IHwgalF1ZXJ5IGV2ZW50XVxuICAgICAgICBAcmV0dXJuIFtldmVudF06IFRoZSBhY3R1YWwgSlMgZXZlbnQgIFxuICAgICovXG4gICAgZ2V0QWN0dWFsRXZlbnQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIGV2ZW50Lm9yaWdpbmFsRXZlbnQgfHwgZXZlbnQ7XG4gICAgfSxcblxuICAgIFxuICAgIC8qXG4gICAgICAgIFBvaW50ZXIgY29uc3RydWN0b3JcbiAgICAqL1xuICAgIFBvaW50ZXIgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICB2YXIgZXZlbnQgPSBnZXRBY3R1YWxFdmVudChlKSwgLy8gSW4gY2FzZSBvZiBqUXVlcnkgZXZlbnRcbiAgICAgICAgICAgIGlzVG91Y2ggPSAoZXZlbnQudG91Y2hlcykgPyB0cnVlIDogZmFsc2UsXG4gICAgICAgICAgICBzdGFydFBvaW50ID0gZXZlbnRUb1BvaW50KGV2ZW50LCBpc1RvdWNoKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMudXBkYXRlKHN0YXJ0UG9pbnQpO1xuICAgICAgICB0aGlzLmlzVG91Y2ggPSBpc1RvdWNoO1xuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICB9LFxuICAgIFxuICAgIHByb3RvID0gUG9pbnRlci5wcm90b3R5cGUgPSBuZXcgSW5wdXQoKTtcblxuLypcbiAgICBCaW5kIG1vdmUgZXZlbnRcbiovXG5wcm90by5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMubW92ZUV2ZW50ID0gdGhpcy5pc1RvdWNoID8gVE9VQ0hNT1ZFIDogTU9VU0VNT1ZFO1xuICAgIFxuICAgIGN1cnJlbnRQb2ludGVyID0gdGhpcztcbiAgICBcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLm1vdmVFdmVudCwgdGhpcy5vbk1vdmUpO1xufTtcblxuLypcbiAgICBVbmJpbmQgbW92ZSBldmVudFxuKi9cbnByb3RvLnVuYmluZEV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0aGlzLm1vdmVFdmVudCwgdGhpcy5vbk1vdmUpO1xufTtcblxuLypcbiAgICBQb2ludGVyIG9uTW92ZSBldmVudCBoYW5kbGVyXG4gICAgXG4gICAgQHBhcmFtIFtldmVudF06IFBvaW50ZXIgbW92ZSBldmVudFxuKi9cbnByb3RvLm9uTW92ZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyIG5ld1BvaW50ID0gZXZlbnRUb1BvaW50KGUsIGN1cnJlbnRQb2ludGVyLmlzVG91Y2gpO1xuICAgIGUgPSBnZXRBY3R1YWxFdmVudChlKTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY3VycmVudFBvaW50ZXIudXBkYXRlKG5ld1BvaW50KTtcbn07XG5cbnByb3RvLnN0b3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy51bmJpbmRFdmVudHMoKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUG9pbnRlcjtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbnB1dC9Qb2ludGVyLmpzXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciB0aGVMb29wID0gcmVxdWlyZSgnLi9sb29wLmpzJyksXG4gICAgUHJvY2Vzc01hbmFnZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlSWRzID0gW107XG4gICAgICAgIHRoaXMuYWN0aXZlUHJvY2Vzc2VzID0ge307XG4gICAgICAgIHRoaXMuZGVhY3RpdmF0ZVF1ZXVlID0gW107XG4gICAgICAgIHRoZUxvb3Auc2V0Q2FsbGJhY2sodGhpcywgdGhpcy5maXJlQWN0aXZlKTtcbiAgICB9O1xuICAgIFxuUHJvY2Vzc01hbmFnZXIucHJvdG90eXBlID0ge1xuICAgIFxuICAgIC8qXG4gICAgICAgIFtpbnRdOiBVc2VkIGZvciBwcm9jZXNzIElEXG4gICAgKi9cbiAgICBwcm9jZXNzQ291bnRlcjogMCxcbiAgICBcbiAgICAvKlxuICAgICAgICBbaW50XTogTnVtYmVyIG9mIGFjdGl2ZSBwcm9jZXNzZXNcbiAgICAqL1xuICAgIGFjdGl2ZUNvdW50OiAwLFxuICAgIFxuICAgIC8qXG4gICAgICAgIEdldCB0aGUgcHJvY2VzcyB3aXRoIGEgZ2l2ZW4gaW5kZXhcbiAgICAgICAgXG4gICAgICAgIEBwYXJhbSBbaW50XTogSW5kZXggb2YgcHJvY2Vzc1xuICAgICAgICBAcmV0dXJuIFtQcm9jZXNzXVxuICAgICovXG4gICAgZ2V0UHJvY2VzczogZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWN0aXZlUHJvY2Vzc2VzW2ldO1xuICAgIH0sXG4gICAgXG4gICAgLypcbiAgICAgICAgR2V0IG51bWJlciBvZiBhY3RpdmUgcHJvY2Vzc2VzXG4gICAgICAgIFxuICAgICAgICBAcmV0dXJuIFtpbnRdOiBOdW1iZXIgb2YgYWN0aXZlIHByb2Nlc3Nlc1xuICAgICovXG4gICAgZ2V0QWN0aXZlQ291bnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWN0aXZlQ291bnQ7XG4gICAgfSxcbiAgICBcbiAgICAvKlxuICAgICAgICBHZXQgYWN0aXZlIHRva2Vuc1xuXG4gICAgICAgIEByZXR1cm4gW2FycmF5XTogQWN0aXZlIHRva2Vuc1xuICAgICovXG4gICAgZ2V0QWN0aXZlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFjdGl2ZUlkcztcbiAgICB9LFxuICAgIFxuICAgIC8qXG4gICAgICAgIEdldCB0aGUgbGVuZ3RoIG9mIHRoZSBkZWFjdGl2YXRlIHF1ZXVlXG4gICAgICAgIFxuICAgICAgICBAcmV0dXJuIFtpbnRdOiBMZW5ndGggb2YgcXVldWVcbiAgICAqL1xuICAgIGdldFF1ZXVlTGVuZ3RoOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRlYWN0aXZhdGVRdWV1ZS5sZW5ndGg7XG4gICAgfSxcbiAgICBcbiAgICAvKlxuICAgICAgICBGaXJlIGFsbCBhY3RpdmUgcHJvY2Vzc2VzXG4gICAgICAgIFxuICAgICAgICBAcGFyYW0gW2ludF06IFRpbWVzdGFtcCBvZiBleGVjdXRpbmcgZnJhbWVzXG4gICAgICAgIEBwYXJhbSBbaW50XTogVGltZSBzaW5jZSBwcmV2aW91cyBmcmFtZVxuICAgICAgICBAcmV0dXJuIFtib29sZWFuXTogVHJ1ZSBpZiBhY3RpdmUgcHJvY2Vzc2VzIGZvdW5kXG4gICAgKi9cbiAgICBmaXJlQWN0aXZlOiBmdW5jdGlvbiAoZnJhbWVzdGFtcCwgZWxhcHNlZCkge1xuICAgICAgICB2YXIgcHJvY2VzcyxcbiAgICAgICAgICAgIGFjdGl2ZUNvdW50ID0gMCxcbiAgICAgICAgICAgIGFjdGl2ZUlkcyA9IFtdLFxuICAgICAgICAgICAgaSA9IDA7XG5cbiAgICAgICAgLy8gUHVyZ2UgYW5kIGNoZWNrIGFjdGl2ZSBjb3VudCBiZWZvcmUgZXhlY3V0aW9uXG4gICAgICAgIHRoaXMucHVyZ2UoKTtcbiAgICAgICAgYWN0aXZlQ291bnQgPSB0aGlzLmdldEFjdGl2ZUNvdW50KCk7XG4gICAgICAgIGFjdGl2ZUlkcyA9IHRoaXMuZ2V0QWN0aXZlKCk7XG5cbiAgICAgICAgLy8gTG9vcCB0aHJvdWdoIGFjdGl2ZSBwcm9jZXNzZXMgYW5kIGZpcmUgY2FsbGJhY2tcbiAgICAgICAgZm9yICg7IGkgPCBhY3RpdmVDb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBwcm9jZXNzID0gdGhpcy5nZXRQcm9jZXNzKGFjdGl2ZUlkc1tpXSk7XG5cbiAgICAgICAgICAgIGlmIChwcm9jZXNzKSB7XG4gICAgICAgICAgICAgICAgcHJvY2Vzcy5maXJlKGZyYW1lc3RhbXAsIGVsYXBzZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmVwdXJnZSBhbmQgcmVjaGVjayBhY3RpdmUgY291bnQgYWZ0ZXIgZXhlY3V0aW9uXG4gICAgICAgIHRoaXMucHVyZ2UoKTtcbiAgICAgICAgYWN0aXZlQ291bnQgPSB0aGlzLmdldEFjdGl2ZUNvdW50KCk7XG5cbiAgICAgICAgLy8gUmV0dXJuIHRydWUgaWYgd2Ugc3RpbGwgaGF2ZSBhY3RpdmUgcHJvY2Vzc2VzLCBvciBmYWxzZSBpZiBub25lXG4gICAgICAgIHJldHVybiBhY3RpdmVDb3VudCA/IHRydWUgOiBmYWxzZTtcbiAgICB9LFxuICAgIFxuICAgIC8qXG4gICAgICAgIFJlZ2lzdGVyIGEgbmV3IHByb2Nlc3NcbiAgICAgICAgXG4gICAgICAgIEBwYXJhbSBbUHJvY2Vzc11cbiAgICAgICAgQHJldHVybiBbaW50XTogSW5kZXggb2YgcHJvY2VzcyB0byBiZSB1c2VkIGFzIElEXG4gICAgKi9cbiAgICByZWdpc3RlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9jZXNzQ291bnRlcisrO1xuICAgIH0sXG4gICAgXG4gICAgLypcbiAgICAgICAgQWN0aXZhdGUgYSBwcm9jZXNzXG4gICAgICAgIFxuICAgICAgICBAcGFyYW0gW2ludF06IEluZGV4IG9mIGFjdGl2ZSBwcm9jZXNzXG4gICAgKi9cbiAgICBhY3RpdmF0ZTogZnVuY3Rpb24gKHByb2Nlc3MsIGkpIHtcbiAgICAgICAgdmFyIHF1ZXVlSW5kZXggPSB0aGlzLmRlYWN0aXZhdGVRdWV1ZS5pbmRleE9mKGkpLFxuICAgICAgICAgICAgaXNRdWV1ZWQgPSAocXVldWVJbmRleCA+IC0xKSxcbiAgICAgICAgICAgIGlzQWN0aXZlID0gKHRoaXMuYWN0aXZlSWRzLmluZGV4T2YoaSkgPiAtMSk7XG5cbiAgICAgICAgLy8gUmVtb3ZlIGZyb20gZGVhY3RpdmF0ZVF1ZXVlIGlmIGluIHRoZXJlXG4gICAgICAgIGlmIChpc1F1ZXVlZCkge1xuICAgICAgICAgICAgdGhpcy5kZWFjdGl2YXRlUXVldWUuc3BsaWNlKHF1ZXVlSW5kZXgsIDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWRkIHRvIGFjdGl2ZSBwcm9jZXNzZXMgYXJyYXkgaWYgbm90IGFscmVhZHkgaW4gdGhlcmVcbiAgICAgICAgaWYgKCFpc0FjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVJZHMucHVzaChpKTtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlUHJvY2Vzc2VzW2ldID0gcHJvY2VzcztcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlQ291bnQrKztcbiAgICAgICAgICAgIHRoZUxvb3Auc3RhcnQoKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXG4gICAgLypcbiAgICAgICAgRGVhY3RpdmF0ZSBhIHByb2Nlc3NcbiAgICAgICAgXG4gICAgICAgIEBwYXJhbSBbaW50XTogSW5kZXggb2YgcHJvY2VzcyB0byBhZGQgdG8gZGVhY3RpdmF0ZSBxdWV1ZVxuICAgICovXG4gICAgZGVhY3RpdmF0ZTogZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgdGhpcy5kZWFjdGl2YXRlUXVldWUucHVzaChpKTtcbiAgICB9LFxuICAgIFxuICAgIC8qXG4gICAgICAgIFB1cmdlIHRoZSBkZWFjdGl2YXRlIHF1ZXVlXG4gICAgKi9cbiAgICBwdXJnZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcXVldWVMZW5ndGggPSB0aGlzLmdldFF1ZXVlTGVuZ3RoKCksXG4gICAgICAgICAgICBhY3RpdmVJZEluZGV4ID0gMCxcbiAgICAgICAgICAgIGlkVG9EZWxldGUgPSAwO1xuXG4gICAgICAgIHdoaWxlIChxdWV1ZUxlbmd0aC0tKSB7XG4gICAgICAgICAgICBpZFRvRGVsZXRlID0gdGhpcy5kZWFjdGl2YXRlUXVldWVbcXVldWVMZW5ndGhdO1xuICAgICAgICAgICAgYWN0aXZlSWRJbmRleCA9IHRoaXMuYWN0aXZlSWRzLmluZGV4T2YoaWRUb0RlbGV0ZSk7XG5cbiAgICAgICAgICAgIC8vIElmIHByb2Nlc3MgaW4gYWN0aXZlIGxpc3QgZGVhY3RpdmF0ZVxuICAgICAgICAgICAgaWYgKGFjdGl2ZUlkSW5kZXggPiAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlSWRzLnNwbGljZShhY3RpdmVJZEluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUNvdW50LS07XG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuYWN0aXZlUHJvY2Vzc2VzW2lkVG9EZWxldGVdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmRlYWN0aXZhdGVRdWV1ZSA9IFtdO1xuICAgIH1cbiAgICBcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFByb2Nlc3NNYW5hZ2VyKCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcHJvY2Vzcy9tYW5hZ2VyLmpzXG4gKiovIiwiLypcbiAgICBCZXppZXIgZnVuY3Rpb24gZ2VuZXJhdG9yXG4gICAgICAgIFxuICAgIEdhw6t0YW4gUmVuYXVkZWF1J3MgQmV6aWVyRWFzaW5nXG4gICAgaHR0cHM6Ly9naXRodWIuY29tL2dyZS9iZXppZXItZWFzaW5nL2Jsb2IvbWFzdGVyL2luZGV4LmpzICBcbiAgICBodHRwczovL2dpdGh1Yi5jb20vZ3JlL2Jlemllci1lYXNpbmcvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICAgIFlvdSdyZSBhIGhlcm9cbiAgICBcbiAgICBVc2VcbiAgICBcbiAgICAgICAgdmFyIGVhc2VPdXQgPSBuZXcgQmV6aWVyKC4xNywuNjcsLjgzLC42NyksXG4gICAgICAgICAgICB4ID0gZWFzZU91dCgwLjUpOyAvLyByZXR1cm5zIDAuNjI3Li4uXG4qL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBORVdUT05fSVRFUkFUSU9OUyA9IDgsXG4gICAgTkVXVE9OX01JTl9TTE9QRSA9IDAuMDAxLFxuICAgIFNVQkRJVklTSU9OX1BSRUNJU0lPTiA9IDAuMDAwMDAwMSxcbiAgICBTVUJESVZJU0lPTl9NQVhfSVRFUkFUSU9OUyA9IDEwLFxuICAgIEtfU1BMSU5FX1RBQkxFX1NJWkUgPSAxMSxcbiAgICBLX1NBTVBMRV9TVEVQX1NJWkUgPSAxLjAgLyAoS19TUExJTkVfVEFCTEVfU0laRSAtIDEuMCksXG4gICAgRkxPQVRfMzJfU1VQUE9SVEVEID0gKHR5cGVvZiBGbG9hdDMyQXJyYXkgIT09ICd1bmRlZmluZWQnKSxcbiAgICBcbiAgICBhID0gZnVuY3Rpb24gKGExLCBhMikge1xuICAgICAgICByZXR1cm4gMS4wIC0gMy4wICogYTIgKyAzLjAgKiBhMTtcbiAgICB9LFxuICAgIFxuICAgIGIgPSBmdW5jdGlvbiAoYTEsIGEyKSB7XG4gICAgICAgIHJldHVybiAzLjAgKiBhMiAtIDYuMCAqIGExO1xuICAgIH0sXG4gICAgXG4gICAgYyA9IGZ1bmN0aW9uIChhMSkge1xuICAgICAgICByZXR1cm4gMy4wICogYTE7XG4gICAgfSxcblxuICAgIGdldFNsb3BlID0gZnVuY3Rpb24gKHQsIGExLCBhMikge1xuICAgICAgICByZXR1cm4gMy4wICogYShhMSwgYTIpICogdCAqIHQgKyAyLjAgKiBiKGExLCBhMikgKiB0ICsgYyhhMSk7XG4gICAgfSxcblxuICAgIGNhbGNCZXppZXIgPSBmdW5jdGlvbiAodCwgYTEsIGEyKSB7XG4gICAgICAgIHJldHVybiAoKGEoYTEsIGEyKSAqIHQgKyBiKGExLCBhMikpICogdCArIGMoYTEpKSAqIHQ7XG4gICAgfSxcbiAgICBcbiAgICAvKlxuICAgICAgICBCZXppZXIgY29uc3RydWN0b3JcbiAgICAqL1xuICAgIEJlemllciA9IGZ1bmN0aW9uIChtWDEsIG1ZMSwgbVgyLCBtWTIpIHtcbiAgICAgICAgdmFyIHNhbXBsZVZhbHVlcyA9IEZMT0FUXzMyX1NVUFBPUlRFRCA/IG5ldyBGbG9hdDMyQXJyYXkoS19TUExJTkVfVEFCTEVfU0laRSkgOiBuZXcgQXJyYXkoS19TUExJTkVfVEFCTEVfU0laRSksXG4gICAgICAgICAgICBfcHJlY29tcHV0ZWQgPSBmYWxzZSxcbiAgICBcbiAgICAgICAgICAgIGJpbmFyeVN1YmRpdmlkZSA9IGZ1bmN0aW9uIChhWCwgYUEsIGFCKSB7XG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRYLCBjdXJyZW50VCwgaSA9IDA7XG5cbiAgICAgICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRUID0gYUEgKyAoYUIgLSBhQSkgLyAyLjA7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRYID0gY2FsY0JlemllcihjdXJyZW50VCwgbVgxLCBtWDIpIC0gYVg7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50WCA+IDAuMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYUIgPSBjdXJyZW50VDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFBID0gY3VycmVudFQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IHdoaWxlIChNYXRoLmFicyhjdXJyZW50WCkgPiBTVUJESVZJU0lPTl9QUkVDSVNJT04gJiYgKytpIDwgU1VCRElWSVNJT05fTUFYX0lURVJBVElPTlMpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRUO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgXG4gICAgICAgICAgICBuZXd0b25SYXBoc29uSXRlcmF0ZSA9IGZ1bmN0aW9uIChhWCwgYUd1ZXNzVCkge1xuICAgICAgICAgICAgICAgIHZhciBpID0gMCxcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFNsb3BlID0gMC4wLFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50WDtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBmb3IgKDsgaSA8IE5FV1RPTl9JVEVSQVRJT05TOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFNsb3BlID0gZ2V0U2xvcGUoYUd1ZXNzVCwgbVgxLCBtWDIpO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRTbG9wZSA9PT0gMC4wKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYUd1ZXNzVDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFggPSBjYWxjQmV6aWVyKGFHdWVzc1QsIG1YMSwgbVgyKSAtIGFYO1xuICAgICAgICAgICAgICAgICAgICBhR3Vlc3NUIC09IGN1cnJlbnRYIC8gY3VycmVudFNsb3BlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICByZXR1cm4gYUd1ZXNzVDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY2FsY1NhbXBsZVZhbHVlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IEtfU1BMSU5FX1RBQkxFX1NJWkU7ICsraSkge1xuICAgICAgICAgICAgICAgICAgICBzYW1wbGVWYWx1ZXNbaV0gPSBjYWxjQmV6aWVyKGkgKiBLX1NBTVBMRV9TVEVQX1NJWkUsIG1YMSwgbVgyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGdldFRGb3JYID0gZnVuY3Rpb24gKGFYKSB7XG4gICAgICAgICAgICAgICAgdmFyIGludGVydmFsU3RhcnQgPSAwLjAsXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTYW1wbGUgPSAxLFxuICAgICAgICAgICAgICAgICAgICBsYXN0U2FtcGxlID0gS19TUExJTkVfVEFCTEVfU0laRSAtIDEsXG4gICAgICAgICAgICAgICAgICAgIGRpc3QgPSAwLjAsXG4gICAgICAgICAgICAgICAgICAgIGd1ZXNzRm9yVCA9IDAuMCxcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFNsb3BlID0gMC4wO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBmb3IgKDsgY3VycmVudFNhbXBsZSAhPSBsYXN0U2FtcGxlICYmIHNhbXBsZVZhbHVlc1tjdXJyZW50U2FtcGxlXSA8PSBhWDsgKytjdXJyZW50U2FtcGxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGludGVydmFsU3RhcnQgKz0gS19TQU1QTEVfU1RFUF9TSVpFO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAtLWN1cnJlbnRTYW1wbGU7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZGlzdCA9IChhWCAtIHNhbXBsZVZhbHVlc1tjdXJyZW50U2FtcGxlXSkgLyAoc2FtcGxlVmFsdWVzW2N1cnJlbnRTYW1wbGUrMV0gLSBzYW1wbGVWYWx1ZXNbY3VycmVudFNhbXBsZV0pO1xuICAgICAgICAgICAgICAgIGd1ZXNzRm9yVCA9IGludGVydmFsU3RhcnQgKyBkaXN0ICogS19TQU1QTEVfU1RFUF9TSVpFO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGluaXRpYWxTbG9wZSA9IGdldFNsb3BlKGd1ZXNzRm9yVCwgbVgxLCBtWDIpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIElmIHNsb3BlIGlzIGdyZWF0ZXIgdGhhbiBtaW5cbiAgICAgICAgICAgICAgICBpZiAoaW5pdGlhbFNsb3BlID49IE5FV1RPTl9NSU5fU0xPUEUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ld3RvblJhcGhzb25JdGVyYXRlKGFYLCBndWVzc0ZvclQpO1xuICAgICAgICAgICAgICAgIC8vIFNsb3BlIGlzIGVxdWFsIHRvIG1pblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5pdGlhbFNsb3BlID09PSAwLjApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGd1ZXNzRm9yVDtcbiAgICAgICAgICAgICAgICAvLyBTbG9wZSBpcyBsZXNzIHRoYW4gbWluXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJpbmFyeVN1YmRpdmlkZShhWCwgaW50ZXJ2YWxTdGFydCwgaW50ZXJ2YWxTdGFydCArIEtfU0FNUExFX1NURVBfU0laRSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcHJlY29tcHV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfcHJlY29tcHV0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmIChtWDEgIT0gbVkxIHx8IG1YMiAhPSBtWTIpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsY1NhbXBsZVZhbHVlcygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICAgR2VuZXJhdGVkIGZ1bmN0aW9uXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgUmV0dXJucyB2YWx1ZSAwLTEgYmFzZWQgb24gWFxuICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGYgPSBmdW5jdGlvbiAoYVgpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmV0dXJuVmFsdWU7XG5cbiAgICAgICAgICAgICAgICBpZiAoIV9wcmVjb21wdXRlZCkge1xuICAgICAgICAgICAgICAgICAgICBwcmVjb21wdXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIElmIGxpbmVhciBncmFkaWVudCwgcmV0dXJuIFggYXMgVFxuICAgICAgICAgICAgICAgIGlmIChtWDEgPT09IG1ZMSAmJiBtWDIgPT09IG1ZMikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZSA9IGFYO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBJZiBhdCBzdGFydCwgcmV0dXJuIDBcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFYID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVyblZhbHVlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gSWYgYXQgZW5kLCByZXR1cm4gMVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYVggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuVmFsdWUgPSAxO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuVmFsdWUgPSBjYWxjQmV6aWVyKGdldFRGb3JYKGFYKSwgbVkxLCBtWTIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICByZXR1cm4gcmV0dXJuVmFsdWU7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gZjtcbiAgICB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJlemllcjtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9hY3Rpb25zL3R3ZWVuL0Jlemllci5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgcmV0dXJuICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSA/IHZhbHVlLnNwbGl0KC8sXFxzKi8pIDogW3ZhbHVlXTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdmFsdWUtdHlwZXMvbWFuaXB1bGF0b3JzL3NwbGl0LWNvbW1hLWRlbGltaXRlZC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLnN1YnN0cmluZyh2YWx1ZS5pbmRleE9mKCcoJykgKyAxLCB2YWx1ZS5sYXN0SW5kZXhPZignKScpKTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdmFsdWUtdHlwZXMvbWFuaXB1bGF0b3JzL2Z1bmN0aW9uLWJyZWFrLmpzXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBwb3NpdGlvblRlcm1zID0gcmVxdWlyZSgnLi4vLi4vdmFsdWUtdHlwZXMvc2V0dGluZ3MvZGljdGlvbmFyeScpLnBvc2l0aW9ucyxcbiAgICBudW1Qb3NpdGlvblRlcm1zID0gcG9zaXRpb25UZXJtcy5sZW5ndGgsXG5cbiAgICBUUkFOU0ZPUk1fUEVSU1BFQ1RJVkUgPSAndHJhbnNmb3JtUGVyc3BlY3RpdmUnLFxuICAgIFNDQUxFID0gJ3NjYWxlJyxcbiAgICBST1RBVEUgPSAncm90YXRlJyxcbiAgICB0ZXJtcyA9IHtcbiAgICAgICAgZnVuY3M6IFsndHJhbnNsYXRlJywgU0NBTEUsIFJPVEFURSwgJ3NrZXcnLCBUUkFOU0ZPUk1fUEVSU1BFQ1RJVkVdLFxuICAgICAgICBwcm9wczoge30gLy8gb2JqZWN0cyBhcmUgZmFzdGVyIGF0IGRpcmVjdCBsb29rdXBzXG4gICAgfTtcblxuLy8gQ3JlYXRlIHRyYW5zZm9ybSB0ZXJtc1xuKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZnVuY3MgPSB0ZXJtcy5mdW5jcyxcbiAgICAgICAgcHJvcHMgPSB0ZXJtcy5wcm9wcyxcbiAgICAgICAgbnVtRnVuY3MgPSBmdW5jcy5sZW5ndGgsXG4gICAgICAgIGkgPSAwLFxuXG4gICAgICAgIGNyZWF0ZVByb3BzID0gZnVuY3Rpb24gKGZ1bmNOYW1lKSB7XG4gICAgICAgICAgICB2YXIgaiA9IDA7XG5cbiAgICAgICAgICAgIGZvciAoOyBqIDwgbnVtUG9zaXRpb25UZXJtczsgaisrKSB7XG4gICAgICAgICAgICAgICAgcHJvcHNbZnVuY05hbWUgKyBwb3NpdGlvblRlcm1zW2pdXSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgXG4gICAgLy8gTWFudWFsbHkgYWRkIHNrZXcgYW5kIHRyYW5zZm9ybSBwZXJzcGVjdGl2ZSAgXG4gICAgcHJvcHNbUk9UQVRFXSA9IHByb3BzW1NDQUxFXSA9IHByb3BzW1RSQU5TRk9STV9QRVJTUEVDVElWRV0gPSB0cnVlO1xuICAgIFxuICAgIC8vIExvb3Agb3ZlciBlYWNoIGZ1bmN0aW9uIG5hbWUgYW5kIGNyZWF0ZSBmdW5jdGlvbi9wcm9wZXJ0eSB0ZXJtc1xuICAgIGZvciAoOyBpIDwgbnVtRnVuY3M7IGkrKykge1xuICAgICAgICBjcmVhdGVQcm9wcyhmdW5jc1tpXSk7XG4gICAgfVxufSkoKTtcblxubW9kdWxlLmV4cG9ydHMgPSB0ZXJtcztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9yb2xlcy9jc3MvdHJhbnNmb3JtLWRpY3Rpb25hcnkuanNcbiAqKi8iLCJsZXQgQWN0aW9uID0gcmVxdWlyZSgnLi9BY3Rpb24nKSxcbiAgICBjYWxjID0gcmVxdWlyZSgnLi4vaW5jL2NhbGMnKSxcblxuICAgIFNUUklORyA9ICdzdHJpbmcnLFxuICAgIFxuICAgIC8qXG4gICAgICAgIFRyYW5zbGF0ZSBvdXIgbWFwTGluayB2YWx1ZSBpbnRvIG1hcFRvXG4gICAgICAgIFxuICAgICAgICBAcGFyYW0gW251bWJlcl06IENhbGN1bGF0ZWQgdmFsdWUgZnJvbSBsaW5rZWQgdmFsdWVcbiAgICAgICAgQHBhcmFtIFtWYWx1ZSB8fCBvYmplY3RdOiBMaW5rZWQgdmFsdWUgb3IgZW1wdHkgb2JqZWN0IGlmIHdlJ3JlIGxpbmtpbmcgdG8gaW5wdXRcbiAgICAgICAgQHBhcmFtIFthcnJheV06IExpc3Qgb2YgbnVtYmVycyByZWxhdGluZyB0byBsaW5rZWQgdmFsdWVcbiAgICAgICAgQHBhcmFtIFthcnJheV06IExpc3Qgb2YgbnVtYmVycyByZWxhdGluZyB0byB0aGlzIHZhbHVlXG4gICAgKi9cbiAgICBmaW5kTWFwcGVkVmFsdWUgPSBmdW5jdGlvbiAobmV3VmFsdWUsIGxpbmtlZFZhbHVlLCB0b1ZhbHVlLCBtYXBMaW5rLCBtYXBUbykge1xuICAgICAgICB2YXIgbWFwTGVuZ3RoID0gbWFwTGluay5sZW5ndGgsXG4gICAgICAgICAgICBpID0gMSxcbiAgICAgICAgICAgIGxhc3RMaW5rVmFsdWUsXG4gICAgICAgICAgICB0aGlzTGlua1ZhbHVlLFxuICAgICAgICAgICAgbGFzdFRvVmFsdWUsXG4gICAgICAgICAgICB0aGlzVG9WYWx1ZTtcblxuICAgICAgICBmb3IgKDsgaSA8IG1hcExlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAvLyBBc3NpZ24gdmFsdWVzIGZyb20gYXJyYXksIG9yIGlmIHRoZXkncmUgc3RyaW5ncywgbG9vayBmb3IgdGhlbSBpbiBsaW5rZWRWYWx1ZVxuICAgICAgICAgICAgbGFzdExpbmtWYWx1ZSA9ICh0eXBlb2YgbWFwTGlua1tpIC0gMV0gPT09IFNUUklORykgPyBsaW5rZWRWYWx1ZVttYXBMaW5rW2kgLSAxXV0gOiBtYXBMaW5rW2kgLSAxXTtcbiAgICAgICAgICAgIHRoaXNMaW5rVmFsdWUgPSAodHlwZW9mIG1hcExpbmtbaV0gPT09IFNUUklORykgPyBsaW5rZWRWYWx1ZVttYXBMaW5rW2ldXSA6IG1hcExpbmtbaV07XG4gICAgICAgICAgICBsYXN0VG9WYWx1ZSA9ICh0eXBlb2YgbWFwVG9baSAtIDFdID09PSBTVFJJTkcpID8gdG9WYWx1ZVttYXBUb1tpIC0gMV1dIDogbWFwVG9baSAtIDFdO1xuICAgICAgICAgICAgdGhpc1RvVmFsdWUgPSAodHlwZW9mIG1hcFRvW2ldID09PSBTVFJJTkcpID8gdG9WYWx1ZVttYXBUb1tpXV0gOiBtYXBUb1tpXTtcblxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgd2UndmUgZ29uZSBwYXN0IG91ciBjYWxjdWxhdGVkIHZhbHVlLCBvciBpZiB3ZSdyZSBhdCB0aGUgZW5kIG9mIHRoZSBhcnJheVxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlIDwgdGhpc0xpbmtWYWx1ZSB8fCBpID09PSBtYXBMZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgbmV3VmFsdWUgPSBjYWxjLnZhbHVlKGNhbGMucmVzdHJpY3RlZChjYWxjLnByb2dyZXNzKG5ld1ZhbHVlLCBsYXN0TGlua1ZhbHVlLCB0aGlzTGlua1ZhbHVlKSwgMCwgMSksIGxhc3RUb1ZhbHVlLCB0aGlzVG9WYWx1ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBuZXdWYWx1ZTtcbiAgICB9O1xuXG5jbGFzcyBXYXRjaCBleHRlbmRzIEFjdGlvbiB7XG4gICAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgICAgICBzdXBlciguLi5hcmdzKTtcbiAgICAgICAgdGhpcy5pc0FjdGl2ZSA9IHRydWU7XG4gICAgfVxuXG4gICAgLypcbiAgICAgICAgUHJvY2VzcyB0aGlzIHZhbHVlXG4gICAgICAgIFxuICAgICAgICBGaXJzdCBjaGVjayBpZiB0aGlzIHZhbHVlIGV4aXN0cyBhcyBhIFZhbHVlLCBpZiBub3RcbiAgICAgICAgY2hlY2sgd2l0aGluIElucHV0IChpZiB3ZSBoYXZlIG9uZSlcbiAgICAgICAgICAgIFxuICAgICAgICBAcGFyYW0gW0FjdG9yXVxuICAgICAgICBAcGFyYW0gW1ZhbHVlXTogQ3VycmVudCB2YWx1ZVxuICAgICAgICBAcGFyYW0gW3N0cmluZ106IEtleSBvZiBjdXJyZW50IHZhbHVlXG4gICAgICAgIEByZXR1cm4gW251bWJlcl06IENhbGN1bGF0ZWQgdmFsdWVcbiAgICAqL1xuICAgIHByb2Nlc3MoYWN0b3IsIHZhbHVlLCBrZXkpIHtcbiAgICAgICAgdmFyIHZhbHVlcyA9IGFjdG9yLnZhbHVlcyxcbiAgICAgICAgICAgIG5ld1ZhbHVlID0gdmFsdWUuY3VycmVudCxcbiAgICAgICAgICAgIHdhdGNoZWRLZXkgPSB2YWx1ZS53YXRjaCxcbiAgICAgICAgICAgIHdhdGNoZWRWYWx1ZSA9IHZhbHVlc1t3YXRjaGVkS2V5XSA/IHZhbHVlc1t3YXRjaGVkS2V5XSA6IHt9LFxuICAgICAgICAgICAgaW5wdXRPZmZzZXQgPSB2YWx1ZS5hY3Rpb24gPyB2YWx1ZS5hY3Rpb24uaW5wdXRPZmZzZXQgOiBmYWxzZTtcblxuICAgICAgICAvLyBGaXJzdCBsb29rIGF0IEFjdGlvbiBhbmQgY2hlY2sgdmFsdWUgaXNuJ3QgbGlua2luZyBpdHNlbGZcbiAgICAgICAgaWYgKHdhdGNoZWRWYWx1ZS5jdXJyZW50ICE9PSB1bmRlZmluZWQgJiYga2V5ICE9PSB3YXRjaGVkS2V5KSB7XG4gICAgICAgICAgICBuZXdWYWx1ZSA9IHdhdGNoZWRWYWx1ZS5jdXJyZW50O1xuICAgICAgICBcbiAgICAgICAgLy8gVGhlbiBjaGVjayB2YWx1ZXMgaW4gSW5wdXRcbiAgICAgICAgfSBlbHNlIGlmIChpbnB1dE9mZnNldCAmJiBpbnB1dE9mZnNldC5oYXNPd25Qcm9wZXJ0eSh3YXRjaGVkS2V5KSkge1xuICAgICAgICAgICAgbmV3VmFsdWUgPSB2YWx1ZS5vcmlnaW4gKyAoaW5wdXRPZmZzZXRbd2F0Y2hlZEtleV0gKiB2YWx1ZS5hbXApO1xuICAgICAgICB9XG5cblxuICAgICAgICAvLyBJZiB3ZSBoYXZlIG1hcEZyb20gYW5kIG1hcFRvIHByb3BlcnRpZXMsIHRyYW5zbGF0ZSB0aGUgbmV3IHZhbHVlXG4gICAgICAgIGlmICh2YWx1ZS5tYXBGcm9tICYmIHZhbHVlLm1hcFRvKSB7XG4gICAgICAgICAgICBuZXdWYWx1ZSA9IGZpbmRNYXBwZWRWYWx1ZShuZXdWYWx1ZSwgd2F0Y2hlZFZhbHVlLCB2YWx1ZSwgdmFsdWUubWFwRnJvbSwgdmFsdWUubWFwVG8pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ld1ZhbHVlO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBXYXRjaDtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9hY3Rpb25zL1dhdGNoLmpzXG4gKiovIiwiLypcbiAgICBUaGUgbG9vcFxuKi9cblwidXNlIHN0cmljdFwiO1xuXG52YXIgVGltZXIgPSByZXF1aXJlKCcuL3RpbWVyLmpzJyksXG4gICAgdGljayA9IHJlcXVpcmUoJy4vdGljay5qcycpLFxuICAgIExvb3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMudGltZXIgPSBuZXcgVGltZXIoKTtcbiAgICB9O1xuICAgIFxuTG9vcC5wcm90b3R5cGUgPSB7XG4gICAgXG4gICAgLypcbiAgICAgICAgW2Jvb2xlYW5dOiBDdXJyZW50IHN0YXR1cyBvZiBhbmltYXRpb24gbG9vcFxuICAgICovXG4gICAgaXNSdW5uaW5nOiBmYWxzZSxcbiAgICBcbiAgICAvKlxuICAgICAgICBGaXJlIGFsbCBhY3RpdmUgcHJvY2Vzc2VzIG9uY2UgcGVyIGZyYW1lXG4gICAgKi9cbiAgICBmcmFtZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgdGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZnJhbWVzdGFtcCA9IHNlbGYudGltZXIudXBkYXRlKCksIC8vIEN1cnJlbnRseSBqdXN0IG1lYXN1cmluZyBpbiBtcyAtIHdpbGwgbG9vayBpbnRvIGhpLXJlcyB0aW1lc3RhbXBzXG4gICAgICAgICAgICAgICAgaXNBY3RpdmUgPSBzZWxmLmNhbGxiYWNrLmNhbGwoc2VsZi5zY29wZSwgZnJhbWVzdGFtcCwgc2VsZi50aW1lci5nZXRFbGFwc2VkKCkpO1xuXG4gICAgICAgICAgICBpZiAoaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmZyYW1lKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGYuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIFxuICAgIC8qXG4gICAgICAgIFN0YXJ0IGxvb3BcbiAgICAqL1xuICAgIHN0YXJ0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIE1ha2Ugc3VyZSB3ZSdyZSBub3QgYWxyZWFkeSBydW5uaW5nIGEgbG9vcFxuICAgICAgICBpZiAoIXRoaXMuaXNSdW5uaW5nKSB7XG4gICAgICAgICAgICB0aGlzLnRpbWVyLmNsb2NrKCk7XG4gICAgICAgICAgICB0aGlzLmlzUnVubmluZyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmZyYW1lKCk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIFxuICAgIC8qXG4gICAgICAgIFN0b3AgdGhlIGxvb3BcbiAgICAqL1xuICAgIHN0b3A6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5pc1J1bm5pbmcgPSBmYWxzZTtcbiAgICB9LFxuICAgIFxuICAgIC8qXG4gICAgICAgIFNldCB0aGUgY2FsbGJhY2sgdG8gcnVuIGV2ZXJ5IGZyYW1lXG4gICAgICAgIFxuICAgICAgICBAcGFyYW0gW09iamVjdF06IEV4ZWN1dGlvbiBjb250ZXh0XG4gICAgICAgIEBwYXJhbSBbZnVuY3Rpb25dOiBDYWxsYmFjayB0byBmaXJlXG4gICAgKi9cbiAgICBzZXRDYWxsYmFjazogZnVuY3Rpb24gKHNjb3BlLCBjYWxsYmFjaykge1xuICAgICAgICB0aGlzLnNjb3BlID0gc2NvcGU7XG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICB9XG4gXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBMb29wKCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcHJvY2Vzcy9sb29wLmpzXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL2luYy91dGlscy5qcycpLFxuXG4gICAgbWF4RWxhcHNlZCA9IDMzLFxuICAgIFRpbWVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmVsYXBzZWQgPSAxNi43O1xuICAgICAgICB0aGlzLmN1cnJlbnQgPSB1dGlscy5jdXJyZW50VGltZSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH07XG5cblRpbWVyLnByb3RvdHlwZSA9IHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5wcmV2ID0gdGhpcy5jdXJyZW50O1xuICAgICAgICB0aGlzLmN1cnJlbnQgPSB1dGlscy5jdXJyZW50VGltZSgpO1xuICAgICAgICB0aGlzLmVsYXBzZWQgPSBNYXRoLm1pbih0aGlzLmN1cnJlbnQgLSB0aGlzLnByZXYsIG1heEVsYXBzZWQpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnQ7XG4gICAgfSxcblxuICAgIGdldEVsYXBzZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxhcHNlZDtcbiAgICB9LFxuICAgIFxuICAgIGNsb2NrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuY3VycmVudCA9IHV0aWxzLmN1cnJlbnRUaW1lKCk7XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBUaW1lcjtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9wcm9jZXNzL3RpbWVyLmpzXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKlxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSBwb2x5ZmlsbFxuICAgIFxuICAgIEZvciBJRTgvOSBGbGluc3RvbmVzXG5cbiAgICBUYWtlbiBmcm9tIFBhdWwgSXJpc2guIFdlJ3ZlIHN0cmlwcGVkIG91dCBjYW5jZWxBbmltYXRpb25GcmFtZSBjaGVja3MgYmVjYXVzZSB3ZSBkb24ndCBmb3ggd2l0aCB0aGF0XG4gICAgXG4gICAgaHR0cDovL3BhdWxpcmlzaC5jb20vMjAxMS9yZXF1ZXN0YW5pbWF0aW9uZnJhbWUtZm9yLXNtYXJ0LWFuaW1hdGluZy9cbiAgICBodHRwOi8vbXkub3BlcmEuY29tL2Vtb2xsZXIvYmxvZy8yMDExLzEyLzIwL3JlcXVlc3RhbmltYXRpb25mcmFtZS1mb3Itc21hcnQtZXItYW5pbWF0aW5nXG4gICAgIFxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSBwb2x5ZmlsbCBieSBFcmlrIE3DtmxsZXIuIGZpeGVzIGZyb20gUGF1bCBJcmlzaCBhbmQgVGlubyBaaWpkZWxcbiAgICAgXG4gICAgTUlUIGxpY2Vuc2VcbiovXG52YXIgdGljayxcbiAgICBsYXN0VGltZSA9IDAsXG4gICAgaGFzV2luZG93ID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKTtcblxuaWYgKCFoYXNXaW5kb3cpIHtcbiAgICAvLyBMb2FkIHJBRiBzaGltXG4gICAgdGljayA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICB2YXIgY3VyclRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcbiAgICAgICAgICAgIHRpbWVUb0NhbGwgPSBNYXRoLm1heCgwLCAxNiAtIChjdXJyVGltZSAtIGxhc3RUaW1lKSksXG4gICAgICAgICAgICBpZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGN1cnJUaW1lICsgdGltZVRvQ2FsbCk7XG4gICAgICAgICAgICB9LCB0aW1lVG9DYWxsKTtcblxuICAgICAgICBsYXN0VGltZSA9IGN1cnJUaW1lICsgdGltZVRvQ2FsbDtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBpZDtcbiAgICB9OyAgXG4gICAgXG59IGVsc2Uge1xuICAgIHRpY2sgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRpY2s7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcHJvY2Vzcy90aWNrLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoicG9wbW90aW9uLmdsb2JhbC5qcyJ9