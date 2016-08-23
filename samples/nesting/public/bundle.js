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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(1), __webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (exports, _fableCore, _FableHelpers) {
	    "use strict";
	
	    Object.defineProperty(exports, "__esModule", {
	        value: true
	    });
	    exports.NestedAction = exports.NestedModel = exports.CounterAction = exports.initCounter = undefined;
	    exports.counterUpdate = counterUpdate;
	    exports.counterView = counterView;
	    exports.nestedUpdate = nestedUpdate;
	    exports.nestedView = nestedView;
	    exports.resetEveryTenth = resetEveryTenth;
	
	    function _classCallCheck(instance, Constructor) {
	        if (!(instance instanceof Constructor)) {
	            throw new TypeError("Cannot call a class as a function");
	        }
	    }
	
	    var _createClass = function () {
	        function defineProperties(target, props) {
	            for (var i = 0; i < props.length; i++) {
	                var descriptor = props[i];
	                descriptor.enumerable = descriptor.enumerable || false;
	                descriptor.configurable = true;
	                if ("value" in descriptor) descriptor.writable = true;
	                Object.defineProperty(target, descriptor.key, descriptor);
	            }
	        }
	
	        return function (Constructor, protoProps, staticProps) {
	            if (protoProps) defineProperties(Constructor.prototype, protoProps);
	            if (staticProps) defineProperties(Constructor, staticProps);
	            return Constructor;
	        };
	    }();
	
	    var initCounter = exports.initCounter = 0;
	
	    var CounterAction = exports.CounterAction = function () {
	        function CounterAction(caseName, fields) {
	            _classCallCheck(this, CounterAction);
	
	            this.Case = caseName;
	            this.Fields = fields;
	        }
	
	        _createClass(CounterAction, [{
	            key: "Equals",
	            value: function Equals(other) {
	                return _fableCore.Util.equalsUnions(this, other);
	            }
	        }, {
	            key: "CompareTo",
	            value: function CompareTo(other) {
	                return _fableCore.Util.compareUnions(this, other);
	            }
	        }]);
	
	        return CounterAction;
	    }();
	
	    _fableCore.Util.setInterfaces(CounterAction.prototype, ["FSharpUnion", "System.IEquatable", "System.IComparable"], "Nesting.CounterAction");
	
	    function counterUpdate(model, command) {
	        return command.Case === "Increment" ? function () {
	            var x = command.Fields[0];
	            return model + x;
	        }() : function () {
	            var x = command.Fields[0];
	            return model - x;
	        }();
	    }
	
	    function counterView(model) {
	        var bgColor = function () {
	            var x = model;
	            return x > 10;
	        }() ? function () {
	            var x = model;
	            return "red";
	        }() : function () {
	            var x = model;
	            return x < 0;
	        }() ? function () {
	            var x = model;
	            return "blue";
	        }() : "green";
	        return function () {
	            var tagName = "div";
	            return function (children) {
	                return new _FableHelpers.Html.Types.DomNode("Element", [[tagName, new _fableCore.List()], children]);
	            };
	        }()(_fableCore.List.ofArray([function () {
	            var tagName = "div";
	            return function (children) {
	                return new _FableHelpers.Html.Types.DomNode("Element", [[tagName, _fableCore.List.ofArray([new _FableHelpers.Html.Types.Attribute("Style", [_fableCore.List.ofArray([["width", "120px"], ["height", "120px"]])])])], children]);
	            };
	        }()(_fableCore.List.ofArray([function () {
	            var tagName = "svg";
	            return function (children) {
	                return new _FableHelpers.Html.Types.DomNode("Element", [[tagName, _fableCore.List.ofArray([_FableHelpers.Html.Svg.svgNS()], _fableCore.List.ofArray([new _FableHelpers.Html.Types.Attribute("Attribute", [["width", "120"]]), new _FableHelpers.Html.Types.Attribute("Attribute", [["height", "120"]]), new _FableHelpers.Html.Types.Attribute("Attribute", [["viewBox", "0 0 100 100"]])]))], children]);
	            };
	        }()(_fableCore.List.ofArray([function () {
	            var tagName = "rect";
	            return function (children) {
	                return new _FableHelpers.Html.Types.DomNode("Element", [[tagName, _fableCore.List.ofArray([_FableHelpers.Html.Svg.svgNS()], _fableCore.List.ofArray([new _FableHelpers.Html.Types.Attribute("Attribute", [["width", "110"]]), new _FableHelpers.Html.Types.Attribute("Attribute", [["height", "110"]]), new _FableHelpers.Html.Types.Attribute("Attribute", [["fill", bgColor]])]))], children]);
	            };
	        }()(new _fableCore.List())]))])), function () {
	            var tagName = "div";
	            return function (children) {
	                return new _FableHelpers.Html.Types.DomNode("Element", [[tagName, _fableCore.List.ofArray([new _FableHelpers.Html.Types.Attribute("Style", [_fableCore.List.ofArray([["border", "1px solid blue"]])]), new _FableHelpers.Html.Types.Attribute("EventHandler", [["onclick", function (x) {
	                    return new CounterAction("Increment", [1]);
	                }]]), new _FableHelpers.Html.Types.Attribute("EventHandler", [["ondblclick", function (x) {
	                    return new CounterAction("Increment", [10]);
	                }]])])], children]);
	            };
	        }()(_fableCore.List.ofArray([new _FableHelpers.Html.Types.DomNode("Text", ["Increment"])])), function () {
	            var tagName = "div";
	            return function (children) {
	                return new _FableHelpers.Html.Types.DomNode("Element", [[tagName, _fableCore.List.ofArray([new _FableHelpers.Html.Types.Attribute("Style", [_fableCore.List.ofArray([["background-color", bgColor], ["color", "white"]])])])], children]);
	            };
	        }()(_fableCore.List.ofArray([new _FableHelpers.Html.Types.DomNode("Text", [String(model)])])), function () {
	            var tagName = "div";
	            return function (children) {
	                return new _FableHelpers.Html.Types.DomNode("Element", [[tagName, _fableCore.List.ofArray([new _FableHelpers.Html.Types.Attribute("Style", [_fableCore.List.ofArray([["border", "1px solid green"], ["height", String(7 + model) + "px"]])]), new _FableHelpers.Html.Types.Attribute("EventHandler", [["onclick", function (x) {
	                    return new CounterAction("Decrement", [1]);
	                }]]), new _FableHelpers.Html.Types.Attribute("EventHandler", [["ondblclick", function (x) {
	                    return new CounterAction("Decrement", [5]);
	                }]])])], children]);
	            };
	        }()(_fableCore.List.ofArray([new _FableHelpers.Html.Types.DomNode("Text", ["Decrement"])]))]));
	    }
	
	    var NestedModel = exports.NestedModel = function () {
	        function NestedModel(top, bottom) {
	            _classCallCheck(this, NestedModel);
	
	            this.Top = top;
	            this.Bottom = bottom;
	        }
	
	        _createClass(NestedModel, [{
	            key: "Equals",
	            value: function Equals(other) {
	                return _fableCore.Util.equalsRecords(this, other);
	            }
	        }, {
	            key: "CompareTo",
	            value: function CompareTo(other) {
	                return _fableCore.Util.compareRecords(this, other);
	            }
	        }]);
	
	        return NestedModel;
	    }();
	
	    _fableCore.Util.setInterfaces(NestedModel.prototype, ["FSharpRecord", "System.IEquatable", "System.IComparable"], "Nesting.NestedModel");
	
	    var NestedAction = exports.NestedAction = function () {
	        function NestedAction(caseName, fields) {
	            _classCallCheck(this, NestedAction);
	
	            this.Case = caseName;
	            this.Fields = fields;
	        }
	
	        _createClass(NestedAction, [{
	            key: "Equals",
	            value: function Equals(other) {
	                return _fableCore.Util.equalsUnions(this, other);
	            }
	        }, {
	            key: "CompareTo",
	            value: function CompareTo(other) {
	                return _fableCore.Util.compareUnions(this, other);
	            }
	        }]);
	
	        return NestedAction;
	    }();
	
	    _fableCore.Util.setInterfaces(NestedAction.prototype, ["FSharpUnion", "System.IEquatable", "System.IComparable"], "Nesting.NestedAction");
	
	    function nestedUpdate(model, action) {
	        return action.Case === "Top" ? function () {
	            var ca = action.Fields[0];
	            var res = counterUpdate(model.Top, ca);
	            return new NestedModel(res, model.Bottom);
	        }() : action.Case === "Bottom" ? function () {
	            var ca = action.Fields[0];
	            var res = counterUpdate(model.Bottom, ca);
	            return new NestedModel(model.Top, res);
	        }() : new NestedModel(0, 0);
	    }
	
	    function nestedView(model) {
	        return function () {
	            var tagName = "div";
	            return function (children) {
	                return new _FableHelpers.Html.Types.DomNode("Element", [[tagName, new _fableCore.List()], children]);
	            };
	        }()(_fableCore.List.ofArray([_FableHelpers.Html.map(function (arg0) {
	            return new NestedAction("Top", [arg0]);
	        }, counterView(model.Top)), _FableHelpers.Html.map(function (arg0) {
	            return new NestedAction("Bottom", [arg0]);
	        }, counterView(model.Bottom)), function () {
	            var tagName = "button";
	            return function (children) {
	                return new _FableHelpers.Html.Types.DomNode("Element", [[tagName, _fableCore.List.ofArray([new _FableHelpers.Html.Types.Attribute("EventHandler", [["onclick", function (_arg1) {
	                    return new NestedAction("Reset", []);
	                }]])])], children]);
	            };
	        }()(_fableCore.List.ofArray([new _FableHelpers.Html.Types.DomNode("Text", ["Reset"])]))]));
	    }
	
	    function resetEveryTenth(h) {
	        window.setInterval(function (_arg1) {
	            return h(new NestedAction("Reset", []));
	        }, 10000);
	    }
	
	    _FableHelpers.App.start((0, _FableHelpers.renderer)(), _FableHelpers.App.withStartNodeSelector("#nested-counter", _FableHelpers.App.createSimpleApp(new NestedModel(0, 0), function (model) {
	        return nestedView(model);
	    }, function (model) {
	        return function (action) {
	            return nestedUpdate(model, action);
	        };
	    })));
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global) {(function (global, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== "undefined") {
	        factory(exports);
	    } else {
	        var mod = {
	            exports: {}
	        };
	        factory(mod.exports);
	        global.fableCore = mod.exports;
	    }
	})(this, function (exports) {
	    "use strict";
	
	    Object.defineProperty(exports, "__esModule", {
	        value: true
	    });
	    exports.Tuple = Tuple;
	    exports.Tuple3 = Tuple3;
	
	    var _slicedToArray = function () {
	        function sliceIterator(arr, i) {
	            var _arr = [];
	            var _n = true;
	            var _d = false;
	            var _e = undefined;
	
	            try {
	                for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	                    _arr.push(_s.value);
	
	                    if (i && _arr.length === i) break;
	                }
	            } catch (err) {
	                _d = true;
	                _e = err;
	            } finally {
	                try {
	                    if (!_n && _i["return"]) _i["return"]();
	                } finally {
	                    if (_d) throw _e;
	                }
	            }
	
	            return _arr;
	        }
	
	        return function (arr, i) {
	            if (Array.isArray(arr)) {
	                return arr;
	            } else if (Symbol.iterator in Object(arr)) {
	                return sliceIterator(arr, i);
	            } else {
	                throw new TypeError("Invalid attempt to destructure non-iterable instance");
	            }
	        };
	    }();
	
	    function _defineProperty(obj, key, value) {
	        if (key in obj) {
	            Object.defineProperty(obj, key, {
	                value: value,
	                enumerable: true,
	                configurable: true,
	                writable: true
	            });
	        } else {
	            obj[key] = value;
	        }
	
	        return obj;
	    }
	
	    function _possibleConstructorReturn(self, call) {
	        if (!self) {
	            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	        }
	
	        return call && (typeof call === "object" || typeof call === "function") ? call : self;
	    }
	
	    function _inherits(subClass, superClass) {
	        if (typeof superClass !== "function" && superClass !== null) {
	            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	        }
	
	        subClass.prototype = Object.create(superClass && superClass.prototype, {
	            constructor: {
	                value: subClass,
	                enumerable: false,
	                writable: true,
	                configurable: true
	            }
	        });
	        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	    }
	
	    var _createClass = function () {
	        function defineProperties(target, props) {
	            for (var i = 0; i < props.length; i++) {
	                var descriptor = props[i];
	                descriptor.enumerable = descriptor.enumerable || false;
	                descriptor.configurable = true;
	                if ("value" in descriptor) descriptor.writable = true;
	                Object.defineProperty(target, descriptor.key, descriptor);
	            }
	        }
	
	        return function (Constructor, protoProps, staticProps) {
	            if (protoProps) defineProperties(Constructor.prototype, protoProps);
	            if (staticProps) defineProperties(Constructor, staticProps);
	            return Constructor;
	        };
	    }();
	
	    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
	        return typeof obj;
	    } : function (obj) {
	        return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
	    };
	
	    function _classCallCheck(instance, Constructor) {
	        if (!(instance instanceof Constructor)) {
	            throw new TypeError("Cannot call a class as a function");
	        }
	    }
	
	    var fableGlobal = function () {
	        var globalObj = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : null;
	        if (typeof globalObj.__FABLE_CORE__ == "undefined") {
	            globalObj.__FABLE_CORE__ = {
	                types: new Map(),
	                symbols: {
	                    interfaces: Symbol("interfaces"),
	                    typeName: Symbol("typeName")
	                }
	            };
	        }
	        return globalObj.__FABLE_CORE__;
	    }();
	    var FSymbol = fableGlobal.symbols;
	    exports.Symbol = FSymbol;
	    function Tuple(x, y) {
	        return [x, y];
	    }
	    function Tuple3(x, y, z) {
	        return [x, y, z];
	    }
	
	    var Util = exports.Util = function () {
	        function Util() {
	            _classCallCheck(this, Util);
	        }
	
	        // For legacy reasons the name is kept, but this method also adds
	        // the type name to a cache. Use it after declaration:
	        // Util.setInterfaces(Foo.prototype, ["IFoo", "IBar"], "MyModule.Foo");
	        Util.setInterfaces = function setInterfaces(proto, interfaces, typeName) {
	            if (Array.isArray(interfaces) && interfaces.length > 0) {
	                var currentInterfaces = proto[FSymbol.interfaces];
	                if (Array.isArray(currentInterfaces)) {
	                    for (var i = 0; i < interfaces.length; i++) {
	                        if (currentInterfaces.indexOf(interfaces[i]) == -1) currentInterfaces.push(interfaces[i]);
	                    }
	                } else proto[FSymbol.interfaces] = interfaces;
	            }
	            if (typeName) {
	                proto[FSymbol.typeName] = typeName;
	                fableGlobal.types.set(typeName, proto.constructor);
	            }
	        };
	
	        Util.hasInterface = function hasInterface(obj) {
	            for (var _len2 = arguments.length, interfaceNames = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	                interfaceNames[_key2 - 1] = arguments[_key2];
	            }
	
	            return Array.isArray(obj[FSymbol.interfaces]) && obj[FSymbol.interfaces].some(function (x) {
	                return interfaceNames.indexOf(x) >= 0;
	            });
	        };
	
	        Util.getTypeFullName = function getTypeFullName(cons) {
	            if (cons.prototype && cons.prototype[FSymbol.typeName]) {
	                return cons.prototype[FSymbol.typeName];
	            } else {
	                return cons.name || "unknown";
	            }
	        };
	
	        Util.getTypeNamespace = function getTypeNamespace(cons) {
	            var fullName = Util.getTypeFullName(cons);
	            var i = fullName.lastIndexOf('.');
	            return i > -1 ? fullName.substr(0, i) : "";
	        };
	
	        Util.getTypeName = function getTypeName(cons) {
	            var fullName = Util.getTypeFullName(cons);
	            var i = fullName.lastIndexOf('.');
	            return fullName.substr(i + 1);
	        };
	
	        Util.getRestParams = function getRestParams(args, idx) {
	            for (var _len = args.length, restArgs = Array(_len > idx ? _len - idx : 0), _key = idx; _key < _len; _key++) {
	                restArgs[_key - idx] = args[_key];
	            }return restArgs;
	        };
	
	        Util.toString = function toString(o) {
	            return o != null && typeof o.ToString == "function" ? o.ToString() : String(o);
	        };
	
	        Util.equals = function equals(x, y) {
	            if (x == null) return y == null;else if (y == null) return false;else if (Object.getPrototypeOf(x) !== Object.getPrototypeOf(y)) return false;else if (Array.isArray(x) || ArrayBuffer.isView(x)) return x.length != y.length ? false : Seq.fold2(function (prev, v1, v2) {
	                return !prev ? prev : Util.equals(v1, v2);
	            }, true, x, y);else if (x instanceof Date) return FDate.equals(x, y);else if (Util.hasInterface(x, "System.IEquatable")) return x.Equals(y);else return x === y;
	        };
	
	        Util.compare = function compare(x, y) {
	            if (x == null) return y == null ? 0 : -1;else if (y == null) return -1;else if (Object.getPrototypeOf(x) !== Object.getPrototypeOf(y)) return -1;else if (Array.isArray(x) || ArrayBuffer.isView(x)) return x.length != y.length ? x.length < y.length ? -1 : 1 : Seq.fold2(function (prev, v1, v2) {
	                return prev !== 0 ? prev : Util.compare(v1, v2);
	            }, 0, x, y);else if (Util.hasInterface(x, "System.IComparable")) return x.CompareTo(y);else return x < y ? -1 : x > y ? 1 : 0;
	        };
	
	        Util.equalsRecords = function equalsRecords(x, y) {
	            var keys = Object.getOwnPropertyNames(x);
	            for (var i = 0; i < keys.length; i++) {
	                if (!Util.equals(x[keys[i]], y[keys[i]])) return false;
	            }
	            return true;
	        };
	
	        Util.compareRecords = function compareRecords(x, y) {
	            var keys = Object.getOwnPropertyNames(x);
	            for (var i = 0; i < keys.length; i++) {
	                var res = Util.compare(x[keys[i]], y[keys[i]]);
	                if (res !== 0) return res;
	            }
	            return 0;
	        };
	
	        Util.equalsUnions = function equalsUnions(x, y) {
	            if (x.Case !== y.Case) return false;
	            for (var i = 0; i < x.Fields.length; i++) {
	                if (!Util.equals(x.Fields[i], y.Fields[i])) return false;
	            }
	            return true;
	        };
	
	        Util.compareUnions = function compareUnions(x, y) {
	            var res = Util.compare(x.Case, y.Case);
	            if (res !== 0) return res;
	            for (var i = 0; i < x.Fields.length; i++) {
	                res = Util.compare(x.Fields[i], y.Fields[i]);
	                if (res !== 0) return res;
	            }
	            return 0;
	        };
	
	        Util.createDisposable = function createDisposable(f) {
	            var disp = { Dispose: f };
	            disp[FSymbol.interfaces] = ["System.IDisposable"];
	            return disp;
	        };
	
	        Util.createObj = function createObj(fields) {
	            return Seq.fold(function (acc, kv) {
	                acc[kv[0]] = kv[1];return acc;
	            }, {}, fields);
	        };
	
	        Util.toJson = function toJson(o) {
	            return JSON.stringify(o, function (k, v) {
	                if (ArrayBuffer.isView(v)) {
	                    return Array.from(v);
	                } else if (v != null && (typeof v === "undefined" ? "undefined" : _typeof(v)) === "object") {
	                    if (v instanceof List || v instanceof FSet || v instanceof Set) {
	                        return {
	                            $type: v[FSymbol.typeName] || "System.Collections.Generic.HashSet",
	                            $values: Array.from(v) };
	                    } else if (v instanceof FMap || v instanceof Map) {
	                        return Seq.fold(function (o, kv) {
	                            o[kv[0]] = kv[1];return o;
	                        }, { $type: v[FSymbol.typeName] || "System.Collections.Generic.Dictionary" }, v);
	                    } else if (v[FSymbol.typeName]) {
	                        if (Util.hasInterface(v, "FSharpUnion", "FSharpRecord", "FSharpException")) {
	                            return Object.assign({ $type: v[FSymbol.typeName] }, v);
	                        } else {
	                            var proto = Object.getPrototypeOf(v),
	                                props = Object.getOwnPropertyNames(proto),
	                                _o = { $type: v[FSymbol.typeName] };
	                            for (var i = 0; i < props.length; i++) {
	                                var prop = Object.getOwnPropertyDescriptor(proto, props[i]);
	                                if (prop.get) _o[props[i]] = prop.get.apply(v);
	                            }
	                            return _o;
	                        }
	                    }
	                }
	                return v;
	            });
	        };
	
	        Util.ofJson = function ofJson(json, expected) {
	            var parsed = JSON.parse(json, function (k, v) {
	                if (v == null) return v;else if ((typeof v === "undefined" ? "undefined" : _typeof(v)) === "object" && typeof v.$type === "string") {
	                    // Remove generic args and assembly info added by Newtonsoft.Json
	                    var type = v.$type.replace('+', '.'),
	                        i = type.indexOf('`');
	                    if (i > -1) {
	                        type = type.substr(0, i);
	                    } else {
	                        i = type.indexOf(',');
	                        type = i > -1 ? type.substr(0, i) : type;
	                    }
	                    if (type === "System.Collections.Generic.List" || type.indexOf("[]") === type.length - 2) {
	                        return v.$values;
	                    }
	                    if (type === "Microsoft.FSharp.Collections.FSharpList") {
	                        return List.ofArray(v.$values);
	                    } else if (type == "Microsoft.FSharp.Collections.FSharpSet") {
	                        return FSet.create(v.$values);
	                    } else if (type == "System.Collections.Generic.HashSet") {
	                        return new Set(v.$values);
	                    } else if (type == "Microsoft.FSharp.Collections.FSharpMap") {
	                        delete v.$type;
	                        return FMap.create(Object.getOwnPropertyNames(v).map(function (k) {
	                            return [k, v[k]];
	                        }));
	                    } else if (type == "System.Collections.Generic.Dictionary") {
	                        delete v.$type;
	                        return new Map(Object.getOwnPropertyNames(v).map(function (k) {
	                            return [k, v[k]];
	                        }));
	                    } else {
	                        var T = fableGlobal.types.get(type);
	                        if (T) {
	                            delete v.$type;
	                            return Object.assign(new T(), v);
	                        }
	                    }
	                } else if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:[+-]\d{2}:\d{2}|Z)$/.test(v)) return FDate.parse(v);else return v;
	            });
	            if (parsed != null && typeof expected == "function" && !(parsed instanceof expected)) {
	                throw "JSON is not of type " + expected.name + ": " + json;
	            }
	            return parsed;
	        };
	
	        return Util;
	    }();
	
	    Util.toPlainJsObj = function (source) {
	        if (source != null && source.constructor != Object) {
	            var target = {};
	            var props = Object.getOwnPropertyNames(source);
	            for (var i = 0; i < props.length; i++) {
	                target[props[i]] = source[props[i]];
	            }
	            // Copy also properties from prototype, see #192
	            var proto = Object.getPrototypeOf(source);
	            if (proto != null) {
	                props = Object.getOwnPropertyNames(proto);
	                for (var _i = 0; _i < props.length; _i++) {
	                    var prop = Object.getOwnPropertyDescriptor(proto, props[_i]);
	                    if (prop.value) {
	                        target[props[_i]] = prop.value;
	                    } else if (prop.get) {
	                        target[props[_i]] = prop.get.apply(source);
	                    }
	                }
	            }
	            return target;
	        } else {
	            return source;
	        }
	    };
	
	    var GenericComparer = exports.GenericComparer = function GenericComparer(f) {
	        _classCallCheck(this, GenericComparer);
	
	        this.Compare = f || Util.compare;
	    };
	
	    Util.setInterfaces(GenericComparer.prototype, ["System.IComparer"], "Fable.Core.GenericComparer");
	
	    var Choice = exports.Choice = function () {
	        function Choice(t, d) {
	            _classCallCheck(this, Choice);
	
	            this.Case = t;
	            this.Fields = d;
	        }
	
	        Choice.Choice1Of2 = function Choice1Of2(v) {
	            return new Choice("Choice1Of2", [v]);
	        };
	
	        Choice.Choice2Of2 = function Choice2Of2(v) {
	            return new Choice("Choice2Of2", [v]);
	        };
	
	        Choice.prototype.Equals = function Equals(other) {
	            return Util.equalsUnions(this, other);
	        };
	
	        Choice.prototype.CompareTo = function CompareTo(other) {
	            return Util.compareUnions(this, other);
	        };
	
	        _createClass(Choice, [{
	            key: "valueIfChoice1",
	            get: function get() {
	                return this.Case === "Choice1Of2" ? this.Fields[0] : null;
	            }
	        }, {
	            key: "valueIfChoice2",
	            get: function get() {
	                return this.Case === "Choice2Of2" ? this.Fields[0] : null;
	            }
	        }]);
	
	        return Choice;
	    }();
	
	    Util.setInterfaces(Choice.prototype, ["FSharpUnion", "System.IEquatable", "System.IComparable"], "Microsoft.FSharp.Core.FSharpChoice");
	
	    var TimeSpan = exports.TimeSpan = function (_Number) {
	        _inherits(TimeSpan, _Number);
	
	        function TimeSpan() {
	            _classCallCheck(this, TimeSpan);
	
	            return _possibleConstructorReturn(this, _Number.apply(this, arguments));
	        }
	
	        TimeSpan.create = function create() {
	            var d = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	            var h = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	            var m = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
	            var s = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
	            var ms = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];
	
	            switch (arguments.length) {
	                case 1:
	                    // ticks
	                    return this.fromTicks(arguments[0]);
	                case 3:
	                    // h,m,s
	                    d = 0, h = arguments[0], m = arguments[1], s = arguments[2], ms = 0;
	                    break;
	                default:
	                    // d,h,m,s,ms
	                    d = arguments[0], h = arguments[1], m = arguments[2], s = arguments[3], ms = arguments[4] || 0;
	                    break;
	            }
	            return d * 86400000 + h * 3600000 + m * 60000 + s * 1000 + ms;
	        };
	
	        TimeSpan.fromTicks = function fromTicks(ticks) {
	            return ticks / 10000;
	        };
	
	        TimeSpan.fromDays = function fromDays(d) {
	            return TimeSpan.create(d, 0, 0, 0);
	        };
	
	        TimeSpan.fromHours = function fromHours(h) {
	            return TimeSpan.create(h, 0, 0);
	        };
	
	        TimeSpan.fromMinutes = function fromMinutes(m) {
	            return TimeSpan.create(0, m, 0);
	        };
	
	        TimeSpan.fromSeconds = function fromSeconds(s) {
	            return TimeSpan.create(0, 0, s);
	        };
	
	        TimeSpan.days = function days(ts) {
	            return Math.floor(ts / 86400000);
	        };
	
	        TimeSpan.hours = function hours(ts) {
	            return Math.floor(ts % 86400000 / 3600000);
	        };
	
	        TimeSpan.minutes = function minutes(ts) {
	            return Math.floor(ts % 3600000 / 60000);
	        };
	
	        TimeSpan.seconds = function seconds(ts) {
	            return Math.floor(ts % 60000 / 1000);
	        };
	
	        TimeSpan.milliseconds = function milliseconds(ts) {
	            return Math.floor(ts % 1000);
	        };
	
	        TimeSpan.ticks = function ticks(ts) {
	            return ts * 10000;
	        };
	
	        TimeSpan.totalDays = function totalDays(ts) {
	            return ts / 86400000;
	        };
	
	        TimeSpan.totalHours = function totalHours(ts) {
	            return ts / 3600000;
	        };
	
	        TimeSpan.totalMinutes = function totalMinutes(ts) {
	            return ts / 60000;
	        };
	
	        TimeSpan.totalSeconds = function totalSeconds(ts) {
	            return ts / 1000;
	        };
	
	        TimeSpan.negate = function negate(ts) {
	            return ts * -1;
	        };
	
	        TimeSpan.add = function add(ts1, ts2) {
	            return ts1 + ts2;
	        };
	
	        TimeSpan.subtract = function subtract(ts1, ts2) {
	            return ts1 - ts2;
	        };
	
	        return TimeSpan;
	    }(Number);
	
	    TimeSpan.compare = Util.compare;
	    TimeSpan.compareTo = Util.compare;
	    TimeSpan.duration = Math.abs;
	    var DateKind = exports.DateKind = undefined;
	    (function (DateKind) {
	        DateKind[DateKind["UTC"] = 1] = "UTC";
	        DateKind[DateKind["Local"] = 2] = "Local";
	    })(DateKind || (exports.DateKind = DateKind = {}));
	
	    var FDate = function (_Date) {
	        _inherits(FDate, _Date);
	
	        function FDate() {
	            _classCallCheck(this, FDate);
	
	            return _possibleConstructorReturn(this, _Date.apply(this, arguments));
	        }
	
	        FDate.__changeKind = function __changeKind(d, kind) {
	            var d2 = void 0;
	            return d.kind == kind ? d : (d2 = new Date(d.getTime()), d2.kind = kind, d2);
	        };
	
	        FDate.__getValue = function __getValue(d, key) {
	            return d[(d.kind == DateKind.UTC ? "getUTC" : "get") + key]();
	        };
	
	        FDate.minValue = function minValue() {
	            return FDate.parse(-8640000000000000, 1);
	        };
	
	        FDate.maxValue = function maxValue() {
	            return FDate.parse(8640000000000000, 1);
	        };
	
	        FDate.parse = function parse(v, kind) {
	            var date = v == null ? new Date() : new Date(v);
	            if (isNaN(date.getTime())) throw "The string is not a valid Date.";
	            date.kind = kind || (typeof v == "string" && v.slice(-1) == "Z" ? DateKind.UTC : DateKind.Local);
	            return date;
	        };
	
	        FDate.create = function create(year, month, day) {
	            var h = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
	            var m = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];
	            var s = arguments.length <= 5 || arguments[5] === undefined ? 0 : arguments[5];
	            var ms = arguments.length <= 6 || arguments[6] === undefined ? 0 : arguments[6];
	            var kind = arguments.length <= 7 || arguments[7] === undefined ? DateKind.Local : arguments[7];
	
	            var date = kind === DateKind.UTC ? new Date(Date.UTC(year, month - 1, day, h, m, s, ms)) : new Date(year, month - 1, day, h, m, s, ms);
	            if (isNaN(date.getTime())) throw "The parameters describe an unrepresentable Date.";
	            date.kind = kind;
	            return date;
	        };
	
	        FDate.utcNow = function utcNow() {
	            return FDate.parse(null, 1);
	        };
	
	        FDate.today = function today() {
	            return FDate.date(FDate.now());
	        };
	
	        FDate.isLeapYear = function isLeapYear(year) {
	            return year % 4 == 0 && year % 100 != 0 || year % 400 == 0;
	        };
	
	        FDate.daysInMonth = function daysInMonth(year, month) {
	            return month == 2 ? FDate.isLeapYear(year) ? 29 : 28 : month >= 8 ? month % 2 == 0 ? 31 : 30 : month % 2 == 0 ? 30 : 31;
	        };
	
	        FDate.toUniversalTime = function toUniversalTime(d) {
	            return FDate.__changeKind(d, 1);
	        };
	
	        FDate.toLocalTime = function toLocalTime(d) {
	            return FDate.__changeKind(d, 2);
	        };
	
	        FDate.timeOfDay = function timeOfDay(d) {
	            return TimeSpan.create(0, FDate.hour(d), FDate.minute(d), FDate.second(d), FDate.millisecond(d));
	        };
	
	        FDate.date = function date(d) {
	            return FDate.create(FDate.year(d), FDate.month(d), FDate.day(d), 0, 0, 0, 0, d.kind);
	        };
	
	        FDate.day = function day(d) {
	            return FDate.__getValue(d, "Date");
	        };
	
	        FDate.hour = function hour(d) {
	            return FDate.__getValue(d, "Hours");
	        };
	
	        FDate.millisecond = function millisecond(d) {
	            return FDate.__getValue(d, "Milliseconds");
	        };
	
	        FDate.minute = function minute(d) {
	            return FDate.__getValue(d, "Minutes");
	        };
	
	        FDate.month = function month(d) {
	            return FDate.__getValue(d, "Month") + 1;
	        };
	
	        FDate.second = function second(d) {
	            return FDate.__getValue(d, "Seconds");
	        };
	
	        FDate.year = function year(d) {
	            return FDate.__getValue(d, "FullYear");
	        };
	
	        FDate.ticks = function ticks(d) {
	            return (d.getTime() + 6.2135604e+13 /* millisecondsJSOffset */) * 10000;
	        };
	
	        FDate.dayOfWeek = function dayOfWeek(d) {
	            return FDate.__getValue(d, "Day");
	        };
	
	        FDate.dayOfYear = function dayOfYear(d) {
	            var year = FDate.year(d);
	            var month = FDate.month(d);
	            var day = FDate.day(d);
	            for (var i = 1; i < month; i++) {
	                day += FDate.daysInMonth(year, i);
	            }return day;
	        };
	
	        FDate.add = function add(d, ts) {
	            return FDate.parse(d.getTime() + ts, d.kind);
	        };
	
	        FDate.addDays = function addDays(d, v) {
	            return FDate.parse(d.getTime() + v * 86400000, d.kind);
	        };
	
	        FDate.addHours = function addHours(d, v) {
	            return FDate.parse(d.getTime() + v * 3600000, d.kind);
	        };
	
	        FDate.addMinutes = function addMinutes(d, v) {
	            return FDate.parse(d.getTime() + v * 60000, d.kind);
	        };
	
	        FDate.addSeconds = function addSeconds(d, v) {
	            return FDate.parse(d.getTime() + v * 1000, d.kind);
	        };
	
	        FDate.addMilliseconds = function addMilliseconds(d, v) {
	            return FDate.parse(d.getTime() + v, d.kind);
	        };
	
	        FDate.addTicks = function addTicks(d, v) {
	            return FDate.parse(d.getTime() + v / 10000, d.kind);
	        };
	
	        FDate.addYears = function addYears(d, v) {
	            var newMonth = FDate.month(d);
	            var newYear = FDate.year(d) + v;
	            var daysInMonth = FDate.daysInMonth(newYear, newMonth);
	            var newDay = Math.min(daysInMonth, FDate.day(d));
	            return FDate.create(newYear, newMonth, newDay, FDate.hour(d), FDate.minute(d), FDate.second(d), FDate.millisecond(d), d.kind);
	        };
	
	        FDate.addMonths = function addMonths(d, v) {
	            var newMonth = FDate.month(d) + v;
	            var newMonth_ = 0;
	            var yearOffset = 0;
	            if (newMonth > 12) {
	                newMonth_ = newMonth % 12;
	                yearOffset = Math.floor(newMonth / 12);
	                newMonth = newMonth_;
	            } else if (newMonth < 1) {
	                newMonth_ = 12 + newMonth % 12;
	                yearOffset = Math.floor(newMonth / 12) + (newMonth_ == 12 ? -1 : 0);
	                newMonth = newMonth_;
	            }
	            var newYear = FDate.year(d) + yearOffset;
	            var daysInMonth = FDate.daysInMonth(newYear, newMonth);
	            var newDay = Math.min(daysInMonth, FDate.day(d));
	            return FDate.create(newYear, newMonth, newDay, FDate.hour(d), FDate.minute(d), FDate.second(d), FDate.millisecond(d), d.kind);
	        };
	
	        FDate.subtract = function subtract(d, that) {
	            return typeof that == "number" ? FDate.parse(d.getTime() - that, d.kind) : d.getTime() - that.getTime();
	        };
	
	        FDate.toLongDateString = function toLongDateString(d) {
	            return d.toDateString();
	        };
	
	        FDate.toShortDateString = function toShortDateString(d) {
	            return d.toLocaleDateString();
	        };
	
	        FDate.toLongTimeString = function toLongTimeString(d) {
	            return d.toLocaleTimeString();
	        };
	
	        FDate.toShortTimeString = function toShortTimeString(d) {
	            return d.toLocaleTimeString().replace(/:\d\d(?!:)/, "");
	        };
	
	        FDate.equals = function equals(d1, d2) {
	            return d1.getTime() == d2.getTime();
	        };
	
	        return FDate;
	    }(Date);
	
	    FDate.now = FDate.parse;
	    FDate.toBinary = FDate.ticks;
	    FDate.compareTo = Util.compare;
	    FDate.compare = Util.compare;
	    FDate.op_Addition = FDate.add;
	    FDate.op_Subtraction = FDate.subtract;
	    exports.Date = FDate;
	
	    var Timer = exports.Timer = function () {
	        function Timer(interval) {
	            _classCallCheck(this, Timer);
	
	            this.Interval = interval > 0 ? interval : 100;
	            this.AutoReset = true;
	            this._elapsed = new Event();
	        }
	
	        Timer.prototype.Dispose = function Dispose() {
	            this.Enabled = false;
	            this._isDisposed = true;
	        };
	
	        Timer.prototype.Close = function Close() {
	            this.Dispose();
	        };
	
	        Timer.prototype.Start = function Start() {
	            this.Enabled = true;
	        };
	
	        Timer.prototype.Stop = function Stop() {
	            this.Enabled = false;
	        };
	
	        _createClass(Timer, [{
	            key: "Elapsed",
	            get: function get() {
	                return this._elapsed;
	            }
	        }, {
	            key: "Enabled",
	            get: function get() {
	                return this._enabled;
	            },
	            set: function set(x) {
	                var _this3 = this;
	
	                if (!this._isDisposed && this._enabled != x) {
	                    if (this._enabled = x) {
	                        if (this.AutoReset) {
	                            this._intervalId = setInterval(function () {
	                                if (!_this3.AutoReset) _this3.Enabled = false;
	                                _this3._elapsed.Trigger(new Date());
	                            }, this.Interval);
	                        } else {
	                            this._timeoutId = setTimeout(function () {
	                                _this3.Enabled = false;
	                                _this3._timeoutId = 0;
	                                if (_this3.AutoReset) _this3.Enabled = true;
	                                _this3._elapsed.Trigger(new Date());
	                            }, this.Interval);
	                        }
	                    } else {
	                        if (this._timeoutId) {
	                            clearTimeout(this._timeoutId);
	                            this._timeoutId = 0;
	                        }
	                        if (this._intervalId) {
	                            clearInterval(this._intervalId);
	                            this._intervalId = 0;
	                        }
	                    }
	                }
	            }
	        }]);
	
	        return Timer;
	    }();
	
	    Util.setInterfaces(Timer.prototype, ["System.IDisposable"]);
	
	    var FString = function () {
	        function FString() {
	            _classCallCheck(this, FString);
	        }
	
	        FString.fsFormat = function fsFormat(str) {
	            function isObject(x) {
	                return x !== null && (typeof x === "undefined" ? "undefined" : _typeof(x)) === "object" && !(x instanceof Number) && !(x instanceof String) && !(x instanceof Boolean);
	            }
	            function formatOnce(str, rep) {
	                return str.replace(FString.fsFormatRegExp, function (_, prefix, flags, pad, precision, format) {
	                    switch (format) {
	                        case "f":
	                        case "F":
	                            rep = rep.toFixed(precision || 6);
	                            break;
	                        case "g":
	                        case "G":
	                            rep = rep.toPrecision(precision);
	                            break;
	                        case "e":
	                        case "E":
	                            rep = rep.toExponential(precision);
	                            break;
	                        case "A":
	                            try {
	                                rep = (rep instanceof FMap ? "map " : rep instanceof FSet ? "set " : "") + JSON.stringify(rep, function (k, v) {
	                                    return v && v[Symbol.iterator] && !Array.isArray(v) && isObject(v) ? Array.from(v) : v;
	                                });
	                            } catch (err) {
	                                // Fallback for objects with circular references
	                                rep = "{" + Object.getOwnPropertyNames(rep).map(function (k) {
	                                    return k + ": " + String(rep[k]);
	                                }).join(", ") + "}";
	                            }
	                            break;
	                    }
	                    var plusPrefix = flags.indexOf("+") >= 0 && parseInt(rep) >= 0;
	                    if (!isNaN(pad = parseInt(pad))) {
	                        var ch = pad >= 0 && flags.indexOf("0") >= 0 ? "0" : " ";
	                        rep = FString.padLeft(rep, Math.abs(pad) - (plusPrefix ? 1 : 0), ch, pad < 0);
	                    }
	                    return prefix + (plusPrefix ? "+" + rep : rep);
	                });
	            }
	            function makeFn(str) {
	                return function (rep) {
	                    var str2 = formatOnce(str, rep);
	                    return FString.fsFormatRegExp.test(str2) ? makeFn(str2) : _cont(str2.replace(/%%/g, "%"));
	                };
	            }
	            var _cont = void 0;
	            return function (cont) {
	                _cont = cont;
	                return FString.fsFormatRegExp.test(str) ? makeFn(str) : _cont(str);
	            };
	        };
	
	        FString.format = function format(str) {
	            for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	                args[_key3 - 1] = arguments[_key3];
	            }
	
	            return str.replace(FString.formatRegExp, function (match, idx, pad, format) {
	                var rep = args[idx],
	                    padSymbol = " ";
	                if (typeof rep === "number") {
	                    switch ((format || "").substring(0, 1)) {
	                        case "f":
	                        case "F":
	                            rep = format.length > 1 ? rep.toFixed(format.substring(1)) : rep.toFixed(2);
	                            break;
	                        case "g":
	                        case "G":
	                            rep = format.length > 1 ? rep.toPrecision(format.substring(1)) : rep.toPrecision();
	                            break;
	                        case "e":
	                        case "E":
	                            rep = format.length > 1 ? rep.toExponential(format.substring(1)) : rep.toExponential();
	                            break;
	                        case "p":
	                        case "P":
	                            rep = (format.length > 1 ? (rep * 100).toFixed(format.substring(1)) : (rep * 100).toFixed(2)) + " %";
	                            break;
	                        default:
	                            var m = /^(0+)(\.0+)?$/.exec(format);
	                            if (m != null) {
	                                var decs = 0;
	                                if (m[2] != null) rep = rep.toFixed(decs = m[2].length - 1);
	                                pad = "," + (m[1].length + (decs ? decs + 1 : 0)).toString();
	                                padSymbol = "0";
	                            } else if (format) {
	                                rep = format;
	                            }
	                    }
	                } else if (rep instanceof Date) {
	                    if (format.length === 1) {
	                        switch (format) {
	                            case "D":
	                                rep = rep.toDateString();
	                                break;
	                            case "T":
	                                rep = rep.toLocaleTimeString();
	                                break;
	                            case "d":
	                                rep = rep.toLocaleDateString();
	                                break;
	                            case "t":
	                                rep = rep.toLocaleTimeString().replace(/:\d\d(?!:)/, "");
	                                break;
	                            case "o":
	                            case "O":
	                                if (rep.kind === DateKind.Local) {
	                                    var offset = rep.getTimezoneOffset() * -1;
	                                    rep = FString.format("{0:yyyy-MM-dd}T{0:HH:mm}:{1:00.000}{2}{3:00}:{4:00}", rep, FDate.second(rep), offset >= 0 ? "+" : "-", ~~(offset / 60), offset % 60);
	                                } else {
	                                    rep = rep.toISOString();
	                                }
	                        }
	                    } else {
	                        rep = format.replace(/\w+/g, function (match2) {
	                            var rep2 = match2;
	                            switch (match2.substring(0, 1)) {
	                                case "y":
	                                    rep2 = match2.length < 4 ? FDate.year(rep) % 100 : FDate.year(rep);
	                                    break;
	                                case "h":
	                                    rep2 = rep.getHours() > 12 ? FDate.hour(rep) % 12 : FDate.hour(rep);
	                                    break;
	                                case "M":
	                                    rep2 = FDate.month(rep);
	                                    break;
	                                case "d":
	                                    rep2 = FDate.day(rep);
	                                    break;
	                                case "H":
	                                    rep2 = FDate.hour(rep);
	                                    break;
	                                case "m":
	                                    rep2 = FDate.minute(rep);
	                                    break;
	                                case "s":
	                                    rep2 = FDate.second(rep);
	                                    break;
	                            }
	                            if (rep2 !== match2 && rep2 < 10 && match2.length > 1) {
	                                rep2 = "0" + rep2;
	                            }
	                            return rep2;
	                        });
	                    }
	                }
	                if (!isNaN(pad = parseInt((pad || "").substring(1)))) {
	                    rep = FString.padLeft(rep, Math.abs(pad), padSymbol, pad < 0);
	                }
	                return rep;
	            });
	        };
	
	        FString.endsWith = function endsWith(str, search) {
	            var idx = str.lastIndexOf(search);
	            return idx >= 0 && idx == str.length - search.length;
	        };
	
	        FString.initialize = function initialize(n, f) {
	            if (n < 0) throw "String length must be non-negative";
	            var xs = new Array(n);
	            for (var i = 0; i < n; i++) {
	                xs[i] = f(i);
	            }return xs.join("");
	        };
	
	        FString.isNullOrEmpty = function isNullOrEmpty(str) {
	            return typeof str !== "string" || str.length == 0;
	        };
	
	        FString.isNullOrWhiteSpace = function isNullOrWhiteSpace(str) {
	            return typeof str !== "string" || /^\s*$/.test(str);
	        };
	
	        FString.join = function join(delimiter, xs) {
	            xs = typeof xs == "string" ? Util.getRestParams(arguments, 1) : xs;
	            return (Array.isArray(xs) ? xs : Array.from(xs)).join(delimiter);
	        };
	
	        FString.newGuid = function newGuid() {
	            var uuid = "";
	            for (var i = 0; i < 32; i++) {
	                var random = Math.random() * 16 | 0;
	                if (i === 8 || i === 12 || i === 16 || i === 20) uuid += "-";
	                uuid += (i === 12 ? 4 : i === 16 ? random & 3 | 8 : random).toString(16);
	            }
	            return uuid;
	        };
	
	        FString.padLeft = function padLeft(str, len, ch, isRight) {
	            ch = ch || " ";
	            str = String(str);
	            len = len - str.length;
	            for (var i = -1; ++i < len;) {
	                str = isRight ? str + ch : ch + str;
	            }return str;
	        };
	
	        FString.padRight = function padRight(str, len, ch) {
	            return FString.padLeft(str, len, ch, true);
	        };
	
	        FString.replace = function replace(str, search, _replace) {
	            return str.replace(new RegExp(FRegExp.escape(search), "g"), _replace);
	        };
	
	        FString.replicate = function replicate(n, x) {
	            return FString.initialize(n, function () {
	                return x;
	            });
	        };
	
	        FString.split = function split(str, splitters, count, removeEmpty) {
	            count = typeof count == "number" ? count : null;
	            removeEmpty = typeof removeEmpty == "number" ? removeEmpty : null;
	            if (count < 0) throw "Count cannot be less than zero";
	            if (count === 0) return [];
	            splitters = Array.isArray(splitters) ? splitters : Util.getRestParams(arguments, 1);
	            splitters = splitters.map(function (x) {
	                return FRegExp.escape(x);
	            });
	            splitters = splitters.length > 0 ? splitters : [" "];
	            var m = void 0;
	            var i = 0;
	            var splits = [];
	            var reg = new RegExp(splitters.join("|"), "g");
	            while ((count == null || count > 1) && (m = reg.exec(str)) !== null) {
	                if (!removeEmpty || m.index - i > 0) {
	                    count = count != null ? count - 1 : count;
	                    splits.push(str.substring(i, m.index));
	                }
	                i = reg.lastIndex;
	            }
	            if (!removeEmpty || str.length - i > 0) splits.push(str.substring(i));
	            return splits;
	        };
	
	        FString.trim = function trim(str, side) {
	            for (var _len4 = arguments.length, chars = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
	                chars[_key4 - 2] = arguments[_key4];
	            }
	
	            if (side == "both" && chars.length == 0) return str.trim();
	            if (side == "start" || side == "both") {
	                var reg = chars.length == 0 ? /^\s+/ : new RegExp("^[" + FRegExp.escape(chars.join("")) + "]+");
	                str = str.replace(reg, "");
	            }
	            if (side == "end" || side == "both") {
	                var _reg = chars.length == 0 ? /\s+$/ : new RegExp("[" + FRegExp.escape(chars.join("")) + "]+$");
	                str = str.replace(_reg, "");
	            }
	            return str;
	        };
	
	        return FString;
	    }();
	
	    FString.fsFormatRegExp = /(^|[^%])%([0+ ]*)(-?\d+)?(?:\.(\d+))?(\w)/;
	    FString.formatRegExp = /\{(\d+)(,-?\d+)?(?:\:(.+?))?\}/g;
	    exports.String = FString;
	
	    var FRegExp = function () {
	        function FRegExp() {
	            _classCallCheck(this, FRegExp);
	        }
	
	        FRegExp.create = function create(pattern, options) {
	            var flags = "g";
	            flags += options & 1 ? "i" : "";
	            flags += options & 2 ? "m" : "";
	            return new RegExp(pattern, flags);
	        };
	
	        FRegExp.escape = function escape(str) {
	            return str.replace(/[\-\[\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
	        };
	
	        FRegExp.unescape = function unescape(str) {
	            return str.replace(/\\([\-\[\/\{\}\(\)\*\+\?\.\\\^\$\|])/g, "$1");
	        };
	
	        FRegExp.isMatch = function isMatch(str, pattern) {
	            var options = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
	
	            var reg = str instanceof RegExp ? (reg = str, str = pattern, reg.lastIndex = options, reg) : reg = FRegExp.create(pattern, options);
	            return reg.test(str);
	        };
	
	        FRegExp.match = function match(str, pattern) {
	            var options = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
	
	            var reg = str instanceof RegExp ? (reg = str, str = pattern, reg.lastIndex = options, reg) : reg = FRegExp.create(pattern, options);
	            return reg.exec(str);
	        };
	
	        FRegExp.matches = function matches(str, pattern) {
	            var options = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
	
	            var reg = str instanceof RegExp ? (reg = str, str = pattern, reg.lastIndex = options, reg) : reg = FRegExp.create(pattern, options);
	            if (!reg.global) throw "Non-global RegExp"; // Prevent infinite loop
	            var m = void 0;
	            var matches = [];
	            while ((m = reg.exec(str)) !== null) {
	                matches.push(m);
	            }return matches;
	        };
	
	        FRegExp.options = function options(reg) {
	            var options = 256; // ECMAScript
	            options |= reg.ignoreCase ? 1 : 0;
	            options |= reg.multiline ? 2 : 0;
	            return options;
	        };
	
	        FRegExp.replace = function replace(reg, input, replacement, limit) {
	            var offset = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];
	
	            function replacer() {
	                var res = arguments[0];
	                if (limit !== 0) {
	                    limit--;
	                    var match = [];
	                    var len = arguments.length;
	                    for (var i = 0; i < len - 2; i++) {
	                        match.push(arguments[i]);
	                    }match.index = arguments[len - 2];
	                    match.input = arguments[len - 1];
	                    res = replacement(match);
	                }
	                return res;
	            }
	            if (typeof reg == "string") {
	                var tmp = reg;
	                reg = FRegExp.create(input, limit);
	                input = tmp;
	                limit = undefined;
	            }
	            if (typeof replacement == "function") {
	                limit = limit == null ? -1 : limit;
	                return input.substring(0, offset) + input.substring(offset).replace(reg, replacer);
	            } else {
	                if (limit != null) {
	                    var m = void 0;
	                    var sub1 = input.substring(offset);
	                    var matches = FRegExp.matches(reg, sub1);
	                    var sub2 = matches.length > limit ? (m = matches[limit - 1], sub1.substring(0, m.index + m[0].length)) : sub1;
	                    return input.substring(0, offset) + sub2.replace(reg, replacement) + input.substring(offset + sub2.length);
	                } else {
	                    return input.replace(reg, replacement);
	                }
	            }
	        };
	
	        FRegExp.split = function split(reg, input, limit) {
	            var offset = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
	
	            if (typeof reg == "string") {
	                var tmp = reg;
	                reg = FRegExp.create(input, limit);
	                input = tmp;
	                limit = undefined;
	            }
	            input = input.substring(offset);
	            return input.split(reg, limit);
	        };
	
	        return FRegExp;
	    }();
	
	    exports.RegExp = FRegExp;
	
	    var FArray = function () {
	        function FArray() {
	            _classCallCheck(this, FArray);
	        }
	
	        FArray.addRangeInPlace = function addRangeInPlace(range, xs) {
	            Seq.iterate(function (x) {
	                return xs.push(x);
	            }, range);
	        };
	
	        FArray.copyTo = function copyTo(source, sourceIndex, target, targetIndex, count) {
	            while (count--) {
	                target[targetIndex++] = source[sourceIndex++];
	            }
	        };
	
	        FArray.partition = function partition(f, xs) {
	            var ys = [],
	                zs = [],
	                j = 0,
	                k = 0;
	            for (var i = 0; i < xs.length; i++) {
	                if (f(xs[i])) ys[j++] = xs[i];else zs[k++] = xs[i];
	            }return Tuple(ys, zs);
	        };
	
	        FArray.permute = function permute(f, xs) {
	            // Keep the type of the array
	            var ys = xs.map(function () {
	                return null;
	            });
	            var checkFlags = new Array(xs.length);
	            for (var i = 0; i < xs.length; i++) {
	                var j = f(i);
	                if (j < 0 || j >= xs.length) throw "Not a valid permutation";
	                ys[j] = xs[i];
	                checkFlags[j] = 1;
	            }
	            for (var _i2 = 0; _i2 < xs.length; _i2++) {
	                if (checkFlags[_i2] != 1) throw "Not a valid permutation";
	            }return ys;
	        };
	
	        FArray.removeInPlace = function removeInPlace(item, xs) {
	            var i = xs.indexOf(item);
	            if (i > -1) {
	                xs.splice(i, 1);
	                return true;
	            }
	            return false;
	        };
	
	        FArray.setSlice = function setSlice(target, lower, upper, source) {
	            var length = (upper || target.length - 1) - lower;
	            if (ArrayBuffer.isView(target) && source.length <= length) target.set(source, lower);else for (var i = lower | 0, j = 0; j <= length; i++, j++) {
	                target[i] = source[j];
	            }
	        };
	
	        FArray.sortInPlaceBy = function sortInPlaceBy(f, xs) {
	            var dir = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];
	
	            return xs.sort(function (x, y) {
	                x = f(x);
	                y = f(y);
	                return (x < y ? -1 : x == y ? 0 : 1) * dir;
	            });
	        };
	
	        FArray.unzip = function unzip(xs) {
	            var bs = new Array(xs.length),
	                cs = new Array(xs.length);
	            for (var i = 0; i < xs.length; i++) {
	                bs[i] = xs[i][0];
	                cs[i] = xs[i][1];
	            }
	            return Tuple(bs, cs);
	        };
	
	        FArray.unzip3 = function unzip3(xs) {
	            var bs = new Array(xs.length),
	                cs = new Array(xs.length),
	                ds = new Array(xs.length);
	            for (var i = 0; i < xs.length; i++) {
	                bs[i] = xs[i][0];
	                cs[i] = xs[i][1];
	                ds[i] = xs[i][2];
	            }
	            return Tuple3(bs, cs, ds);
	        };
	
	        return FArray;
	    }();
	
	    exports.Array = FArray;
	
	    var List = exports.List = function () {
	        function List(head, tail) {
	            _classCallCheck(this, List);
	
	            this.head = head;
	            this.tail = tail;
	        }
	
	        List.prototype.ToString = function ToString() {
	            return "[" + Array.from(this).map(Util.toString).join("; ") + "]";
	        };
	
	        List.prototype.Equals = function Equals(x) {
	            var iter1 = this[Symbol.iterator](),
	                iter2 = x[Symbol.iterator]();
	            for (var i = 0;; i++) {
	                var cur1 = iter1.next(),
	                    cur2 = iter2.next();
	                if (cur1.done) return cur2.done ? true : false;else if (cur2.done) return false;else if (!Util.equals(cur1.value, cur2.value)) return false;
	            }
	        };
	
	        List.prototype.CompareTo = function CompareTo(x) {
	            var acc = 0;
	            var iter1 = this[Symbol.iterator](),
	                iter2 = x[Symbol.iterator]();
	            for (var i = 0;; i++) {
	                var cur1 = iter1.next(),
	                    cur2 = iter2.next();
	                if (cur1.done) return cur2.done ? acc : -1;else if (cur2.done) return 1;else {
	                    acc = Util.compare(cur1.value, cur2.value);
	                    if (acc != 0) return acc;
	                }
	            }
	        };
	
	        List.ofArray = function ofArray(args, base) {
	            var acc = base || new List();
	            for (var i = args.length - 1; i >= 0; i--) {
	                acc = new List(args[i], acc);
	            }
	            return acc;
	        };
	
	        List.prototype[Symbol.iterator] = function () {
	            var cur = this;
	            return {
	                next: function next() {
	                    var tmp = cur;
	                    cur = cur.tail;
	                    return { done: tmp.tail == null, value: tmp.head };
	                }
	            };
	        };
	
	        List.prototype.append = function append(ys) {
	            return List.append(this, ys);
	        };
	
	        List.append = function append(xs, ys) {
	            return Seq.fold(function (acc, x) {
	                return new List(x, acc);
	            }, ys, List.reverse(xs));
	        };
	
	        List.prototype.choose = function choose(f, xs) {
	            return List.choose(f, this);
	        };
	
	        List.choose = function choose(f, xs) {
	            var r = Seq.fold(function (acc, x) {
	                var y = f(x);
	                return y != null ? new List(y, acc) : acc;
	            }, new List(), xs);
	            return List.reverse(r);
	        };
	
	        List.prototype.collect = function collect(f) {
	            return List.collect(f, this);
	        };
	
	        List.collect = function collect(f, xs) {
	            return Seq.fold(function (acc, x) {
	                return acc.append(f(x));
	            }, new List(), xs);
	        };
	        // TODO: should be xs: Iterable<List<T>>
	
	
	        List.concat = function concat(xs) {
	            return List.collect(function (x) {
	                return x;
	            }, xs);
	        };
	
	        List.prototype.filter = function filter(f) {
	            return List.filter(f, this);
	        };
	
	        List.filter = function filter(f, xs) {
	            return List.reverse(Seq.fold(function (acc, x) {
	                return f(x) ? new List(x, acc) : acc;
	            }, new List(), xs));
	        };
	
	        List.prototype.where = function where(f) {
	            return List.filter(f, this);
	        };
	
	        List.where = function where(f, xs) {
	            return List.filter(f, xs);
	        };
	
	        List.initialize = function initialize(n, f) {
	            if (n < 0) {
	                throw "List length must be non-negative";
	            }
	            var xs = new List();
	            for (var i = 1; i <= n; i++) {
	                xs = new List(f(n - i), xs);
	            }
	            return xs;
	        };
	
	        List.prototype.map = function map(f) {
	            return List.map(f, this);
	        };
	
	        List.map = function map(f, xs) {
	            return List.reverse(Seq.fold(function (acc, x) {
	                return new List(f(x), acc);
	            }, new List(), xs));
	        };
	
	        List.prototype.mapIndexed = function mapIndexed(f) {
	            return List.mapIndexed(f, this);
	        };
	
	        List.mapIndexed = function mapIndexed(f, xs) {
	            return List.reverse(Seq.fold(function (acc, x, i) {
	                return new List(f(i, x), acc);
	            }, new List(), xs));
	        };
	
	        List.prototype.partition = function partition(f) {
	            return List.partition(f, this);
	        };
	
	        List.partition = function partition(f, xs) {
	            return Seq.fold(function (acc, x) {
	                var lacc = acc[0],
	                    racc = acc[1];
	                return f(x) ? Tuple(new List(x, lacc), racc) : Tuple(lacc, new List(x, racc));
	            }, Tuple(new List(), new List()), List.reverse(xs));
	        };
	
	        List.replicate = function replicate(n, x) {
	            return List.initialize(n, function () {
	                return x;
	            });
	        };
	
	        List.prototype.reverse = function reverse() {
	            return List.reverse(this);
	        };
	
	        List.reverse = function reverse(xs) {
	            return Seq.fold(function (acc, x) {
	                return new List(x, acc);
	            }, new List(), xs);
	        };
	
	        List.singleton = function singleton(x) {
	            return new List(x, new List());
	        };
	
	        List.prototype.slice = function slice(lower, upper) {
	            return List.slice(lower, upper, this);
	        };
	
	        List.slice = function slice(lower, upper, xs) {
	            var noLower = lower == null;
	            var noUpper = upper == null;
	            return List.reverse(Seq.fold(function (acc, x, i) {
	                return (noLower || lower <= i) && (noUpper || i <= upper) ? new List(x, acc) : acc;
	            }, new List(), xs));
	        };
	        /* ToDo: instance unzip() */
	
	
	        List.unzip = function unzip(xs) {
	            return Seq.foldBack(function (xy, acc) {
	                return Tuple(new List(xy[0], acc[0]), new List(xy[1], acc[1]));
	            }, xs, Tuple(new List(), new List()));
	        };
	        /* ToDo: instance unzip3() */
	
	
	        List.unzip3 = function unzip3(xs) {
	            return Seq.foldBack(function (xyz, acc) {
	                return Tuple3(new List(xyz[0], acc[0]), new List(xyz[1], acc[1]), new List(xyz[2], acc[2]));
	            }, xs, Tuple3(new List(), new List(), new List()));
	        };
	
	        _createClass(List, [{
	            key: "length",
	            get: function get() {
	                return Seq.fold(function (acc, x) {
	                    return acc + 1;
	                }, 0, this);
	            }
	        }]);
	
	        return List;
	    }();
	
	    Util.setInterfaces(List.prototype, ["System.IEquatable", "System.IComparable"], "Microsoft.FSharp.Collections.FSharpList");
	
	    var Seq = exports.Seq = function () {
	        function Seq() {
	            _classCallCheck(this, Seq);
	        }
	
	        Seq.__failIfNone = function __failIfNone(res) {
	            if (res == null) throw "Seq did not contain any matching element";
	            return res;
	        };
	
	        Seq.toList = function toList(xs) {
	            return Seq.foldBack(function (x, acc) {
	                return new List(x, acc);
	            }, xs, new List());
	        };
	
	        Seq.ofList = function ofList(xs) {
	            return Seq.delay(function () {
	                return Seq.unfold(function (x) {
	                    return x.tail != null ? [x.head, x.tail] : null;
	                }, xs);
	            });
	        };
	
	        Seq.ofArray = function ofArray(xs) {
	            return Seq.delay(function () {
	                return Seq.unfold(function (i) {
	                    return i < xs.length ? [xs[i], i + 1] : null;
	                }, 0);
	            });
	        };
	
	        Seq.append = function append(xs, ys) {
	            return Seq.delay(function () {
	                var firstDone = false;
	                var i = xs[Symbol.iterator]();
	                var iters = Tuple(i, null);
	                return Seq.unfold(function () {
	                    var cur = void 0;
	                    if (!firstDone) {
	                        cur = iters[0].next();
	                        if (!cur.done) {
	                            return [cur.value, iters];
	                        } else {
	                            firstDone = true;
	                            iters = [null, ys[Symbol.iterator]()];
	                        }
	                    }
	                    cur = iters[1].next();
	                    return !cur.done ? [cur.value, iters] : null;
	                }, iters);
	            });
	        };
	
	        Seq.average = function average(xs) {
	            var count = 1;
	            var sum = Seq.reduce(function (acc, x) {
	                count++;
	                return acc + x;
	            }, xs);
	            return sum / count;
	        };
	
	        Seq.averageBy = function averageBy(f, xs) {
	            var count = 1;
	            var sum = Seq.reduce(function (acc, x) {
	                count++;
	                return (count === 2 ? f(acc) : acc) + f(x);
	            }, xs);
	            return sum / count;
	        };
	
	        Seq.countBy = function countBy(f, xs) {
	            return Seq.map(function (kv) {
	                return Tuple(kv[0], Seq.count(kv[1]));
	            }, Seq.groupBy(f, xs));
	        };
	
	        Seq.concat = function concat(xs) {
	            return Seq.delay(function () {
	                var iter = xs[Symbol.iterator]();
	                var output = null;
	                return Seq.unfold(function (innerIter) {
	                    var hasFinished = false;
	                    while (!hasFinished) {
	                        if (innerIter == null) {
	                            var cur = iter.next();
	                            if (!cur.done) {
	                                innerIter = cur.value[Symbol.iterator]();
	                            } else {
	                                hasFinished = true;
	                            }
	                        } else {
	                            var _cur = innerIter.next();
	                            if (!_cur.done) {
	                                output = _cur.value;
	                                hasFinished = true;
	                            } else {
	                                innerIter = null;
	                            }
	                        }
	                    }
	                    return innerIter != null && output != null ? [output, innerIter] : null;
	                }, null);
	            });
	        };
	
	        Seq.collect = function collect(f, xs) {
	            return Seq.concat(Seq.map(f, xs));
	        };
	
	        Seq.choose = function choose(f, xs) {
	            var trySkipToNext = function trySkipToNext(iter) {
	                var cur = iter.next();
	                if (!cur.done) {
	                    var y = f(cur.value);
	                    return y != null ? Tuple(y, iter) : trySkipToNext(iter);
	                }
	                return void 0;
	            };
	            return Seq.delay(function () {
	                return Seq.unfold(function (iter) {
	                    return trySkipToNext(iter);
	                }, xs[Symbol.iterator]());
	            });
	        };
	
	        Seq.compareWith = function compareWith(f, xs, ys) {
	            var nonZero = Seq.tryFind(function (i) {
	                return i != 0;
	            }, Seq.map2(function (x, y) {
	                return f(x, y);
	            }, xs, ys));
	            return nonZero != null ? nonZero : Seq.count(xs) - Seq.count(ys);
	        };
	
	        Seq.delay = function delay(f) {
	            return _defineProperty({}, Symbol.iterator, function () {
	                return f()[Symbol.iterator]();
	            });
	        };
	
	        Seq.distinctBy = function distinctBy(f, xs) {
	            return Seq.choose(function (tup) {
	                return tup[0];
	            }, Seq.scan(function (tup, x) {
	                var acc = tup[1];
	                var k = f(x);
	                return acc.has(k) ? Tuple(null, acc) : Tuple(x, FSet.add(k, acc));
	            }, Tuple(null, FSet.create()), xs));
	        };
	
	        Seq.distinct = function distinct(xs) {
	            return Seq.distinctBy(function (x) {
	                return x;
	            }, xs);
	        };
	
	        Seq.empty = function empty() {
	            return Seq.unfold(function () {
	                return void 0;
	            });
	        };
	
	        Seq.enumerateWhile = function enumerateWhile(cond, xs) {
	            return Seq.concat(Seq.unfold(function () {
	                return cond() ? [xs, true] : null;
	            }));
	        };
	
	        Seq.enumerateThenFinally = function enumerateThenFinally(xs, finalFn) {
	            return Seq.delay(function () {
	                var iter = void 0;
	                try {
	                    iter = xs[Symbol.iterator]();
	                } finally {
	                    finalFn();
	                }
	                return Seq.unfold(function (iter) {
	                    try {
	                        var cur = iter.next();
	                        return !cur.done ? [cur.value, iter] : null;
	                    } finally {
	                        finalFn();
	                    }
	                    return void 0;
	                }, iter);
	            });
	        };
	
	        Seq.enumerateUsing = function enumerateUsing(disp, work) {
	            var isDisposed = false;
	            var disposeOnce = function disposeOnce() {
	                if (!isDisposed) {
	                    isDisposed = true;
	                    disp.Dispose();
	                }
	            };
	            try {
	                return Seq.enumerateThenFinally(work(disp), disposeOnce);
	            } finally {
	                disposeOnce();
	            }
	            return void 0;
	        };
	
	        Seq.exactlyOne = function exactlyOne(xs) {
	            var iter = xs[Symbol.iterator]();
	            var fst = iter.next();
	            if (fst.done) throw "Seq was empty";
	            var snd = iter.next();
	            if (!snd.done) throw "Seq had multiple items";
	            return fst.value;
	        };
	
	        Seq.exists = function exists(f, xs) {
	            function aux(iter) {
	                var cur = iter.next();
	                return !cur.done && (f(cur.value) || aux(iter));
	            }
	            return aux(xs[Symbol.iterator]());
	        };
	
	        Seq.exists2 = function exists2(f, xs, ys) {
	            function aux(iter1, iter2) {
	                var cur1 = iter1.next(),
	                    cur2 = iter2.next();
	                return !cur1.done && !cur2.done && (f(cur1.value, cur2.value) || aux(iter1, iter2));
	            }
	            return aux(xs[Symbol.iterator](), ys[Symbol.iterator]());
	        };
	
	        Seq.filter = function filter(f, xs) {
	            function trySkipToNext(iter) {
	                var cur = iter.next();
	                if (!cur.done) return f(cur.value) ? [cur.value, iter] : trySkipToNext(iter);
	                return void 0;
	            }
	            return Seq.delay(function () {
	                return Seq.unfold(trySkipToNext, xs[Symbol.iterator]());
	            });
	        };
	
	        Seq.where = function where(f, xs) {
	            return Seq.filter(f, xs);
	        };
	
	        Seq.fold = function fold(f, acc, xs) {
	            if (Array.isArray(xs) || ArrayBuffer.isView(xs)) {
	                return xs.reduce(f, acc);
	            } else {
	                var cur = void 0;
	                for (var i = 0, iter = xs[Symbol.iterator]();; i++) {
	                    cur = iter.next();
	                    if (cur.done) break;
	                    acc = f(acc, cur.value, i);
	                }
	                return acc;
	            }
	        };
	
	        Seq.foldBack = function foldBack(f, xs, acc) {
	            var arr = Array.isArray(xs) || ArrayBuffer.isView(xs) ? xs : Array.from(xs);
	            for (var i = arr.length - 1; i >= 0; i--) {
	                acc = f(arr[i], acc, i);
	            }
	            return acc;
	        };
	
	        Seq.fold2 = function fold2(f, acc, xs, ys) {
	            var iter1 = xs[Symbol.iterator](),
	                iter2 = ys[Symbol.iterator]();
	            var cur1 = void 0,
	                cur2 = void 0;
	            for (var i = 0;; i++) {
	                cur1 = iter1.next();
	                cur2 = iter2.next();
	                if (cur1.done || cur2.done) {
	                    break;
	                }
	                acc = f(acc, cur1.value, cur2.value, i);
	            }
	            return acc;
	        };
	
	        Seq.foldBack2 = function foldBack2(f, xs, ys, acc) {
	            var ar1 = Array.isArray(xs) || ArrayBuffer.isView(xs) ? xs : Array.from(xs);
	            var ar2 = Array.isArray(ys) || ArrayBuffer.isView(ys) ? ys : Array.from(ys);
	            for (var i = ar1.length - 1; i >= 0; i--) {
	                acc = f(ar1[i], ar2[i], acc, i);
	            }
	            return acc;
	        };
	
	        Seq.forAll = function forAll(f, xs) {
	            return Seq.fold(function (acc, x) {
	                return acc && f(x);
	            }, true, xs);
	        };
	
	        Seq.forAll2 = function forAll2(f, xs, ys) {
	            return Seq.fold2(function (acc, x, y) {
	                return acc && f(x, y);
	            }, true, xs, ys);
	        };
	        // TODO: Should return a Iterable<Tuple<K, Iterable<T>>> instead of a Map<K, Iterable<T>>
	        // Seq.groupBy : ('T -> 'Key) -> seq<'T> -> seq<'Key * seq<'T>>
	
	
	        Seq.groupBy = function groupBy(f, xs) {
	            return Seq.fold(function (acc, x) {
	                var k = f(x),
	                    vs = acc.get(k);
	                return vs != null ? acc.set(k, new List(x, vs)) : acc.set(k, List.singleton(x));
	            }, new Map(), xs);
	        };
	
	        Seq.tryHead = function tryHead(xs) {
	            var iter = xs[Symbol.iterator]();
	            var cur = iter.next();
	            return cur.done ? null : cur.value;
	        };
	
	        Seq.head = function head(xs) {
	            return Seq.__failIfNone(Seq.tryHead(xs));
	        };
	
	        Seq.initialize = function initialize(n, f) {
	            return Seq.delay(function () {
	                return Seq.unfold(function (i) {
	                    return i < n ? [f(i), i + 1] : null;
	                }, 0);
	            });
	        };
	
	        Seq.initializeInfinite = function initializeInfinite(f) {
	            return Seq.delay(function () {
	                return Seq.unfold(function (i) {
	                    return [f(i), i + 1];
	                }, 0);
	            });
	        };
	
	        Seq.tryItem = function tryItem(i, xs) {
	            if (i < 0) return null;
	            if (Array.isArray(xs) || ArrayBuffer.isView(xs)) return i < xs.length ? xs[i] : null;
	            for (var j = 0, iter = xs[Symbol.iterator]();; j++) {
	                var cur = iter.next();
	                if (cur.done) return null;
	                if (j === i) return cur.value;
	            }
	        };
	
	        Seq.item = function item(i, xs) {
	            return Seq.__failIfNone(Seq.tryItem(i, xs));
	        };
	
	        Seq.iterate = function iterate(f, xs) {
	            Seq.fold(function (_, x) {
	                return f(x);
	            }, null, xs);
	        };
	
	        Seq.iterate2 = function iterate2(f, xs, ys) {
	            Seq.fold2(function (_, x, y) {
	                return f(x, y);
	            }, null, xs, ys);
	        };
	
	        Seq.iterateIndexed = function iterateIndexed(f, xs) {
	            Seq.fold(function (_, x, i) {
	                return f(i, x);
	            }, null, xs);
	        };
	
	        Seq.iterateIndexed2 = function iterateIndexed2(f, xs, ys) {
	            Seq.fold2(function (_, x, y, i) {
	                return f(i, x, y);
	            }, null, xs, ys);
	        };
	
	        Seq.isEmpty = function isEmpty(xs) {
	            var i = xs[Symbol.iterator]();
	            return i.next().done;
	        };
	
	        Seq.tryLast = function tryLast(xs) {
	            try {
	                return Seq.reduce(function (_, x) {
	                    return x;
	                }, xs);
	            } catch (err) {
	                return null;
	            }
	        };
	
	        Seq.last = function last(xs) {
	            return Seq.__failIfNone(Seq.tryLast(xs));
	        };
	        // A static 'length' method causes problems in JavaScript -- https://github.com/Microsoft/TypeScript/issues/442
	
	
	        Seq.count = function count(xs) {
	            return Array.isArray(xs) || ArrayBuffer.isView(xs) ? xs.length : Seq.fold(function (acc, x) {
	                return acc + 1;
	            }, 0, xs);
	        };
	
	        Seq.map = function map(f, xs) {
	            return Seq.delay(function () {
	                return Seq.unfold(function (iter) {
	                    var cur = iter.next();
	                    return !cur.done ? [f(cur.value), iter] : null;
	                }, xs[Symbol.iterator]());
	            });
	        };
	
	        Seq.mapIndexed = function mapIndexed(f, xs) {
	            return Seq.delay(function () {
	                var i = 0;
	                return Seq.unfold(function (iter) {
	                    var cur = iter.next();
	                    return !cur.done ? [f(i++, cur.value), iter] : null;
	                }, xs[Symbol.iterator]());
	            });
	        };
	
	        Seq.map2 = function map2(f, xs, ys) {
	            return Seq.delay(function () {
	                var iter1 = xs[Symbol.iterator]();
	                var iter2 = ys[Symbol.iterator]();
	                return Seq.unfold(function () {
	                    var cur1 = iter1.next(),
	                        cur2 = iter2.next();
	                    return !cur1.done && !cur2.done ? [f(cur1.value, cur2.value), null] : null;
	                });
	            });
	        };
	
	        Seq.mapIndexed2 = function mapIndexed2(f, xs, ys) {
	            return Seq.delay(function () {
	                var i = 0;
	                var iter1 = xs[Symbol.iterator]();
	                var iter2 = ys[Symbol.iterator]();
	                return Seq.unfold(function () {
	                    var cur1 = iter1.next(),
	                        cur2 = iter2.next();
	                    return !cur1.done && !cur2.done ? [f(i++, cur1.value, cur2.value), null] : null;
	                });
	            });
	        };
	
	        Seq.map3 = function map3(f, xs, ys, zs) {
	            return Seq.delay(function () {
	                var iter1 = xs[Symbol.iterator]();
	                var iter2 = ys[Symbol.iterator]();
	                var iter3 = zs[Symbol.iterator]();
	                return Seq.unfold(function () {
	                    var cur1 = iter1.next(),
	                        cur2 = iter2.next(),
	                        cur3 = iter3.next();
	                    return !cur1.done && !cur2.done && !cur3.done ? [f(cur1.value, cur2.value, cur3.value), null] : null;
	                });
	            });
	        };
	
	        Seq.mapFold = function mapFold(f, acc, xs) {
	            var result = [];
	            var r = void 0;
	            var cur = void 0;
	            for (var i = 0, iter = xs[Symbol.iterator]();; i++) {
	                cur = iter.next();
	                if (cur.done) break;
	
	                var _f = f(acc, cur.value);
	
	                var _f2 = _slicedToArray(_f, 2);
	
	                r = _f2[0];
	                acc = _f2[1];
	
	                result.push(r);
	            }
	            return Tuple(result, acc);
	        };
	
	        Seq.mapFoldBack = function mapFoldBack(f, xs, acc) {
	            var arr = Array.isArray(xs) || ArrayBuffer.isView(xs) ? xs : Array.from(xs);
	            var result = [];
	            var r = void 0;
	            for (var i = arr.length - 1; i >= 0; i--) {
	                var _f3 = f(arr[i], acc);
	
	                var _f4 = _slicedToArray(_f3, 2);
	
	                r = _f4[0];
	                acc = _f4[1];
	
	                result.push(r);
	            }
	            return Tuple(result, acc);
	        };
	
	        Seq.max = function max(xs) {
	            return Seq.reduce(function (acc, x) {
	                return Util.compare(acc, x) === 1 ? acc : x;
	            }, xs);
	        };
	
	        Seq.maxBy = function maxBy(f, xs) {
	            return Seq.reduce(function (acc, x) {
	                return Util.compare(f(acc), f(x)) === 1 ? acc : x;
	            }, xs);
	        };
	
	        Seq.min = function min(xs) {
	            return Seq.reduce(function (acc, x) {
	                return Util.compare(acc, x) === -1 ? acc : x;
	            }, xs);
	        };
	
	        Seq.minBy = function minBy(f, xs) {
	            return Seq.reduce(function (acc, x) {
	                return Util.compare(f(acc), f(x)) === -1 ? acc : x;
	            }, xs);
	        };
	
	        Seq.pairwise = function pairwise(xs) {
	            return Seq.skip(1, Seq.scan(function (last, next) {
	                return Tuple(last[1], next);
	            }, Tuple(0, 0), xs));
	        };
	
	        Seq.permute = function permute(f, xs) {
	            return Seq.ofArray(FArray.permute(f, Array.from(xs)));
	        };
	
	        Seq.rangeStep = function rangeStep(first, step, last) {
	            if (step === 0) throw "Step cannot be 0";
	            return Seq.unfold(function (x) {
	                return step > 0 && x <= last || step < 0 && x >= last ? [x, x + step] : null;
	            }, first);
	        };
	
	        Seq.rangeChar = function rangeChar(first, last) {
	            return Seq.unfold(function (x) {
	                return x <= last ? [x, String.fromCharCode(x.charCodeAt(0) + 1)] : null;
	            }, first);
	        };
	
	        Seq.range = function range(first, last) {
	            return Seq.rangeStep(first, 1, last);
	        };
	
	        Seq.readOnly = function readOnly(xs) {
	            return Seq.map(function (x) {
	                return x;
	            }, xs);
	        };
	
	        Seq.reduce = function reduce(f, xs) {
	            if (Array.isArray(xs) || ArrayBuffer.isView(xs)) return xs.reduce(f);
	            var iter = xs[Symbol.iterator]();
	            var cur = iter.next();
	            if (cur.done) throw "Seq was empty";
	            var acc = cur.value;
	            for (;;) {
	                cur = iter.next();
	                if (cur.done) break;
	                acc = f(acc, cur.value);
	            }
	            return acc;
	        };
	
	        Seq.reduceBack = function reduceBack(f, xs) {
	            var ar = Array.isArray(xs) || ArrayBuffer.isView(xs) ? xs : Array.from(xs);
	            if (ar.length === 0) throw "Seq was empty";
	            var acc = ar[ar.length - 1];
	            for (var i = ar.length - 2; i >= 0; i--) {
	                acc = f(ar[i], acc, i);
	            }return acc;
	        };
	
	        Seq.replicate = function replicate(n, x) {
	            return Seq.initialize(n, function () {
	                return x;
	            });
	        };
	
	        Seq.reverse = function reverse(xs) {
	            var ar = Array.isArray(xs) || ArrayBuffer.isView(xs) ? xs.slice(0) : Array.from(xs);
	            return Seq.ofArray(ar.reverse());
	        };
	
	        Seq.scan = function scan(f, seed, xs) {
	            return Seq.delay(function () {
	                var iter = xs[Symbol.iterator]();
	                return Seq.unfold(function (acc) {
	                    if (acc == null) return [seed, seed];
	                    var cur = iter.next();
	                    if (!cur.done) {
	                        acc = f(acc, cur.value);
	                        return [acc, acc];
	                    }
	                    return void 0;
	                }, null);
	            });
	        };
	
	        Seq.scanBack = function scanBack(f, xs, seed) {
	            return Seq.reverse(Seq.scan(function (acc, x) {
	                return f(x, acc);
	            }, seed, Seq.reverse(xs)));
	        };
	
	        Seq.singleton = function singleton(x) {
	            return Seq.unfold(function (x) {
	                return x != null ? [x, null] : null;
	            }, x);
	        };
	
	        Seq.skip = function skip(n, xs) {
	            return _defineProperty({}, Symbol.iterator, function () {
	                var iter = xs[Symbol.iterator]();
	                for (var i = 1; i <= n; i++) {
	                    if (iter.next().done) throw "Seq has not enough elements";
	                }return iter;
	            });
	        };
	
	        Seq.skipWhile = function skipWhile(f, xs) {
	            return Seq.delay(function () {
	                var hasPassed = false;
	                return Seq.filter(function (x) {
	                    return hasPassed || (hasPassed = !f(x));
	                }, xs);
	            });
	        };
	
	        Seq.sortWith = function sortWith(f, xs) {
	            var ys = Array.from(xs);
	            return Seq.ofArray(ys.sort(f));
	        };
	
	        Seq.sum = function sum(xs) {
	            return Seq.fold(function (acc, x) {
	                return acc + x;
	            }, 0, xs);
	        };
	
	        Seq.sumBy = function sumBy(f, xs) {
	            return Seq.fold(function (acc, x) {
	                return acc + f(x);
	            }, 0, xs);
	        };
	
	        Seq.tail = function tail(xs) {
	            var iter = xs[Symbol.iterator]();
	            var cur = iter.next();
	            if (cur.done) throw "Seq was empty";
	            return _defineProperty({}, Symbol.iterator, function () {
	                return iter;
	            });
	        };
	
	        Seq.take = function take(n, xs) {
	            var truncate = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
	
	            return Seq.delay(function () {
	                var iter = xs[Symbol.iterator]();
	                return Seq.unfold(function (i) {
	                    if (i < n) {
	                        var cur = iter.next();
	                        if (!cur.done) return [cur.value, i + 1];
	                        if (!truncate) throw "Seq has not enough elements";
	                    }
	                    return void 0;
	                }, 0);
	            });
	        };
	
	        Seq.truncate = function truncate(n, xs) {
	            return Seq.take(n, xs, true);
	        };
	
	        Seq.takeWhile = function takeWhile(f, xs) {
	            return Seq.delay(function () {
	                var iter = xs[Symbol.iterator]();
	                return Seq.unfold(function (i) {
	                    var cur = iter.next();
	                    if (!cur.done && f(cur.value)) return [cur.value, null];
	                    return void 0;
	                }, 0);
	            });
	        };
	
	        Seq.tryFind = function tryFind(f, xs) {
	            for (var i = 0, iter = xs[Symbol.iterator]();; i++) {
	                var cur = iter.next();
	                if (cur.done) return null;
	                if (f(cur.value, i)) return cur.value;
	            }
	        };
	
	        Seq.find = function find(f, xs) {
	            return Seq.__failIfNone(Seq.tryFind(f, xs));
	        };
	
	        Seq.tryFindBack = function tryFindBack(f, xs) {
	            var match = null;
	            for (var i = 0, iter = xs[Symbol.iterator]();; i++) {
	                var cur = iter.next();
	                if (cur.done) return match;
	                if (f(cur.value, i)) match = cur.value;
	            }
	        };
	
	        Seq.findBack = function findBack(f, xs) {
	            return Seq.__failIfNone(Seq.tryFindBack(f, xs));
	        };
	
	        Seq.tryFindIndex = function tryFindIndex(f, xs) {
	            for (var i = 0, iter = xs[Symbol.iterator]();; i++) {
	                var cur = iter.next();
	                if (cur.done) return null;
	                if (f(cur.value, i)) return i;
	            }
	        };
	
	        Seq.findIndex = function findIndex(f, xs) {
	            return Seq.__failIfNone(Seq.tryFindIndex(f, xs));
	        };
	
	        Seq.tryFindIndexBack = function tryFindIndexBack(f, xs) {
	            var match = 0;
	            for (var i = 0, iter = xs[Symbol.iterator]();; i++) {
	                var cur = iter.next();
	                if (cur.done) return match;
	                if (f(cur.value, i)) match = i;
	            }
	        };
	
	        Seq.findIndexBack = function findIndexBack(f, xs) {
	            return Seq.__failIfNone(Seq.tryFindIndexBack(f, xs));
	        };
	
	        Seq.tryPick = function tryPick(f, xs) {
	            for (var i = 0, iter = xs[Symbol.iterator]();; i++) {
	                var cur = iter.next();
	                if (cur.done) break;
	                var y = f(cur.value, i);
	                if (y != null) return y;
	            }
	            return void 0;
	        };
	
	        Seq.pick = function pick(f, xs) {
	            return Seq.__failIfNone(Seq.tryPick(f, xs));
	        };
	
	        Seq.unfold = function unfold(f, acc) {
	            return _defineProperty({}, Symbol.iterator, function () {
	                return {
	                    next: function next() {
	                        var res = f(acc);
	                        if (res != null) {
	                            acc = res[1];
	                            return { done: false, value: res[0] };
	                        }
	                        return { done: true };
	                    }
	                };
	            });
	        };
	
	        Seq.zip = function zip(xs, ys) {
	            return Seq.map2(function (x, y) {
	                return [x, y];
	            }, xs, ys);
	        };
	
	        Seq.zip3 = function zip3(xs, ys, zs) {
	            return Seq.map3(function (x, y, z) {
	                return [x, y, z];
	            }, xs, ys, zs);
	        };
	
	        return Seq;
	    }();
	
	    var SetTree = function () {
	        function SetTree(caseName, fields) {
	            _classCallCheck(this, SetTree);
	
	            this.Case = caseName;
	            this.Fields = fields;
	        }
	
	        SetTree.countAux = function countAux(s, acc) {
	            return s.Case === "SetOne" ? acc + 1 : s.Case === "SetEmpty" ? acc : SetTree.countAux(s.Fields[1], SetTree.countAux(s.Fields[2], acc + 1));
	        };
	
	        SetTree.count = function count(s) {
	            return SetTree.countAux(s, 0);
	        };
	
	        SetTree.SetOne = function SetOne(n) {
	            return new SetTree("SetOne", [n]);
	        };
	
	        SetTree.SetNode = function SetNode(x, l, r, h) {
	            return new SetTree("SetNode", [x, l, r, h]);
	        };
	
	        SetTree.height = function height(t) {
	            return t.Case === "SetOne" ? 1 : t.Case === "SetNode" ? t.Fields[3] : 0;
	        };
	
	        SetTree.mk = function mk(l, k, r) {
	            var matchValue = [l, r];
	            var $target1 = function $target1() {
	                var hl = SetTree.height(l);
	                var hr = SetTree.height(r);
	                var m = hl < hr ? hr : hl;
	                return SetTree.SetNode(k, l, r, m + 1);
	            };
	            if (matchValue[0].Case === "SetEmpty") {
	                if (matchValue[1].Case === "SetEmpty") {
	                    return SetTree.SetOne(k);
	                } else {
	                    return $target1();
	                }
	            } else {
	                return $target1();
	            }
	        };
	
	        SetTree.rebalance = function rebalance(t1, k, t2) {
	            var t1h = SetTree.height(t1);
	            var t2h = SetTree.height(t2);
	            if (t2h > t1h + SetTree.tolerance) {
	                if (t2.Case === "SetNode") {
	                    if (SetTree.height(t2.Fields[1]) > t1h + 1) {
	                        if (t2.Fields[1].Case === "SetNode") {
	                            return SetTree.mk(SetTree.mk(t1, k, t2.Fields[1].Fields[1]), t2.Fields[1].Fields[0], SetTree.mk(t2.Fields[1].Fields[2], t2.Fields[0], t2.Fields[2]));
	                        } else {
	                            throw "rebalance";
	                        }
	                    } else {
	                        return SetTree.mk(SetTree.mk(t1, k, t2.Fields[1]), t2.Fields[0], t2.Fields[2]);
	                    }
	                } else {
	                    throw "rebalance";
	                }
	            } else {
	                if (t1h > t2h + SetTree.tolerance) {
	                    if (t1.Case === "SetNode") {
	                        if (SetTree.height(t1.Fields[2]) > t2h + 1) {
	                            if (t1.Fields[2].Case === "SetNode") {
	                                return SetTree.mk(SetTree.mk(t1.Fields[1], t1.Fields[0], t1.Fields[2].Fields[1]), t1.Fields[2].Fields[0], SetTree.mk(t1.Fields[2].Fields[2], k, t2));
	                            } else {
	                                throw "rebalance";
	                            }
	                        } else {
	                            return SetTree.mk(t1.Fields[1], t1.Fields[0], SetTree.mk(t1.Fields[2], k, t2));
	                        }
	                    } else {
	                        throw "rebalance";
	                    }
	                } else {
	                    return SetTree.mk(t1, k, t2);
	                }
	            }
	        };
	
	        SetTree.add = function add(comparer, k, t) {
	            return t.Case === "SetOne" ? function () {
	                var c = comparer.Compare(k, t.Fields[0]);
	                if (c < 0) {
	                    return SetTree.SetNode(k, new SetTree("SetEmpty", []), t, 2);
	                } else {
	                    if (c === 0) {
	                        return t;
	                    } else {
	                        return SetTree.SetNode(k, t, new SetTree("SetEmpty", []), 2);
	                    }
	                }
	            }() : t.Case === "SetEmpty" ? SetTree.SetOne(k) : function () {
	                var c = comparer.Compare(k, t.Fields[0]);
	                if (c < 0) {
	                    return SetTree.rebalance(SetTree.add(comparer, k, t.Fields[1]), t.Fields[0], t.Fields[2]);
	                } else {
	                    if (c === 0) {
	                        return t;
	                    } else {
	                        return SetTree.rebalance(t.Fields[1], t.Fields[0], SetTree.add(comparer, k, t.Fields[2]));
	                    }
	                }
	            }();
	        };
	
	        SetTree.balance = function balance(comparer, t1, k, t2) {
	            var matchValue = [t1, t2];
	            var $target1 = function $target1(t1_1) {
	                return SetTree.add(comparer, k, t1_1);
	            };
	            var $target2 = function $target2(k1, t2_1) {
	                return SetTree.add(comparer, k, SetTree.add(comparer, k1, t2_1));
	            };
	            if (matchValue[0].Case === "SetOne") {
	                if (matchValue[1].Case === "SetEmpty") {
	                    return $target1(matchValue[0]);
	                } else {
	                    if (matchValue[1].Case === "SetOne") {
	                        return $target2(matchValue[0].Fields[0], matchValue[1]);
	                    } else {
	                        return $target2(matchValue[0].Fields[0], matchValue[1]);
	                    }
	                }
	            } else {
	                if (matchValue[0].Case === "SetNode") {
	                    if (matchValue[1].Case === "SetOne") {
	                        var k2 = matchValue[1].Fields[0];
	                        var t1_1 = matchValue[0];
	                        return SetTree.add(comparer, k, SetTree.add(comparer, k2, t1_1));
	                    } else {
	                        if (matchValue[1].Case === "SetNode") {
	                            var h1 = matchValue[0].Fields[3];
	                            var h2 = matchValue[1].Fields[3];
	                            var k1 = matchValue[0].Fields[0];
	                            var k2 = matchValue[1].Fields[0];
	                            var t11 = matchValue[0].Fields[1];
	                            var t12 = matchValue[0].Fields[2];
	                            var t21 = matchValue[1].Fields[1];
	                            var t22 = matchValue[1].Fields[2];
	                            if (h1 + SetTree.tolerance < h2) {
	                                return SetTree.rebalance(SetTree.balance(comparer, t1, k, t21), k2, t22);
	                            } else {
	                                if (h2 + SetTree.tolerance < h1) {
	                                    return SetTree.rebalance(t11, k1, SetTree.balance(comparer, t12, k, t2));
	                                } else {
	                                    return SetTree.mk(t1, k, t2);
	                                }
	                            }
	                        } else {
	                            return $target1(matchValue[0]);
	                        }
	                    }
	                } else {
	                    var t2_1 = matchValue[1];
	                    return SetTree.add(comparer, k, t2_1);
	                }
	            }
	        };
	
	        SetTree.split = function split(comparer, pivot, t) {
	            return t.Case === "SetOne" ? function () {
	                var c = comparer.Compare(t.Fields[0], pivot);
	                if (c < 0) {
	                    return [t, false, new SetTree("SetEmpty", [])];
	                } else {
	                    if (c === 0) {
	                        return [new SetTree("SetEmpty", []), true, new SetTree("SetEmpty", [])];
	                    } else {
	                        return [new SetTree("SetEmpty", []), false, t];
	                    }
	                }
	            }() : t.Case === "SetEmpty" ? [new SetTree("SetEmpty", []), false, new SetTree("SetEmpty", [])] : function () {
	                var c = comparer.Compare(pivot, t.Fields[0]);
	                if (c < 0) {
	                    var patternInput = SetTree.split(comparer, pivot, t.Fields[1]);
	                    var t11Lo = patternInput[0];
	                    var t11Hi = patternInput[2];
	                    var havePivot = patternInput[1];
	                    return [t11Lo, havePivot, SetTree.balance(comparer, t11Hi, t.Fields[0], t.Fields[2])];
	                } else {
	                    if (c === 0) {
	                        return [t.Fields[1], true, t.Fields[2]];
	                    } else {
	                        var patternInput = SetTree.split(comparer, pivot, t.Fields[2]);
	                        var t12Lo = patternInput[0];
	                        var t12Hi = patternInput[2];
	                        var havePivot = patternInput[1];
	                        return [SetTree.balance(comparer, t.Fields[1], t.Fields[0], t12Lo), havePivot, t12Hi];
	                    }
	                }
	            }();
	        };
	
	        SetTree.spliceOutSuccessor = function spliceOutSuccessor(t) {
	            return t.Case === "SetOne" ? [t.Fields[0], new SetTree("SetEmpty", [])] : t.Case === "SetNode" ? t.Fields[1].Case === "SetEmpty" ? [t.Fields[0], t.Fields[2]] : function () {
	                var patternInput = SetTree.spliceOutSuccessor(t.Fields[1]);
	                var l_ = patternInput[1];
	                var k3 = patternInput[0];
	                return [k3, SetTree.mk(l_, t.Fields[0], t.Fields[2])];
	            }() : function () {
	                throw "internal error: Map.spliceOutSuccessor";
	            }();
	        };
	
	        SetTree.remove = function remove(comparer, k, t) {
	            return t.Case === "SetOne" ? function () {
	                var c = comparer.Compare(k, t.Fields[0]);
	                if (c === 0) {
	                    return new SetTree("SetEmpty", []);
	                } else {
	                    return t;
	                }
	            }() : t.Case === "SetNode" ? function () {
	                var c = comparer.Compare(k, t.Fields[0]);
	                if (c < 0) {
	                    return SetTree.rebalance(SetTree.remove(comparer, k, t.Fields[1]), t.Fields[0], t.Fields[2]);
	                } else {
	                    if (c === 0) {
	                        var matchValue = [t.Fields[1], t.Fields[2]];
	                        if (matchValue[0].Case === "SetEmpty") {
	                            return t.Fields[2];
	                        } else {
	                            if (matchValue[1].Case === "SetEmpty") {
	                                return t.Fields[1];
	                            } else {
	                                var patternInput = SetTree.spliceOutSuccessor(t.Fields[2]);
	                                var sk = patternInput[0];
	                                var r_ = patternInput[1];
	                                return SetTree.mk(t.Fields[1], sk, r_);
	                            }
	                        }
	                    } else {
	                        return SetTree.rebalance(t.Fields[1], t.Fields[0], SetTree.remove(comparer, k, t.Fields[2]));
	                    }
	                }
	            }() : t;
	        };
	
	        SetTree.mem = function mem(comparer, k, t) {
	            return t.Case === "SetOne" ? comparer.Compare(k, t.Fields[0]) === 0 : t.Case === "SetEmpty" ? false : function () {
	                var c = comparer.Compare(k, t.Fields[0]);
	                if (c < 0) {
	                    return SetTree.mem(comparer, k, t.Fields[1]);
	                } else {
	                    if (c === 0) {
	                        return true;
	                    } else {
	                        return SetTree.mem(comparer, k, t.Fields[2]);
	                    }
	                }
	            }();
	        };
	
	        SetTree.iter = function iter(f, t) {
	            if (t.Case === "SetOne") {
	                f(t.Fields[0]);
	            } else {
	                if (t.Case === "SetEmpty") {} else {
	                    SetTree.iter(f, t.Fields[1]);
	                    f(t.Fields[0]);
	                    SetTree.iter(f, t.Fields[2]);
	                }
	            }
	        };
	
	        SetTree.foldBack = function foldBack(f, m, x) {
	            return m.Case === "SetOne" ? f(m.Fields[0], x) : m.Case === "SetEmpty" ? x : SetTree.foldBack(f, m.Fields[1], f(m.Fields[0], SetTree.foldBack(f, m.Fields[2], x)));
	        };
	
	        SetTree.fold = function fold(f, x, m) {
	            return m.Case === "SetOne" ? f(x, m.Fields[0]) : m.Case === "SetEmpty" ? x : function () {
	                var x_1 = SetTree.fold(f, x, m.Fields[1]);
	                var x_2 = f(x_1, m.Fields[0]);
	                return SetTree.fold(f, x_2, m.Fields[2]);
	            }();
	        };
	
	        SetTree.forall = function forall(f, m) {
	            return m.Case === "SetOne" ? f(m.Fields[0]) : m.Case === "SetEmpty" ? true : (f(m.Fields[0]) ? SetTree.forall(f, m.Fields[1]) : false) ? SetTree.forall(f, m.Fields[2]) : false;
	        };
	
	        SetTree.exists = function exists(f, m) {
	            return m.Case === "SetOne" ? f(m.Fields[0]) : m.Case === "SetEmpty" ? false : (f(m.Fields[0]) ? true : SetTree.exists(f, m.Fields[1])) ? true : SetTree.exists(f, m.Fields[2]);
	        };
	
	        SetTree.isEmpty = function isEmpty(m) {
	            return m.Case === "SetEmpty" ? true : false;
	        };
	
	        SetTree.subset = function subset(comparer, a, b) {
	            return SetTree.forall(function (x) {
	                return SetTree.mem(comparer, x, b);
	            }, a);
	        };
	
	        SetTree.psubset = function psubset(comparer, a, b) {
	            return SetTree.forall(function (x) {
	                return SetTree.mem(comparer, x, b);
	            }, a) ? SetTree.exists(function (x) {
	                return !SetTree.mem(comparer, x, a);
	            }, b) : false;
	        };
	
	        SetTree.filterAux = function filterAux(comparer, f, s, acc) {
	            return s.Case === "SetOne" ? f(s.Fields[0]) ? SetTree.add(comparer, s.Fields[0], acc) : acc : s.Case === "SetEmpty" ? acc : function () {
	                var acc_1 = f(s.Fields[0]) ? SetTree.add(comparer, s.Fields[0], acc) : acc;
	                return SetTree.filterAux(comparer, f, s.Fields[1], SetTree.filterAux(comparer, f, s.Fields[2], acc_1));
	            }();
	        };
	
	        SetTree.filter = function filter(comparer, f, s) {
	            return SetTree.filterAux(comparer, f, s, new SetTree("SetEmpty", []));
	        };
	
	        SetTree.diffAux = function diffAux(comparer, m, acc) {
	            return m.Case === "SetOne" ? SetTree.remove(comparer, m.Fields[0], acc) : m.Case === "SetEmpty" ? acc : SetTree.diffAux(comparer, m.Fields[1], SetTree.diffAux(comparer, m.Fields[2], SetTree.remove(comparer, m.Fields[0], acc)));
	        };
	
	        SetTree.diff = function diff(comparer, a, b) {
	            return SetTree.diffAux(comparer, b, a);
	        };
	
	        SetTree.union = function union(comparer, t1, t2) {
	            var matchValue = [t1, t2];
	            var $target2 = function $target2(t) {
	                return t;
	            };
	            var $target3 = function $target3(k1, t2_1) {
	                return SetTree.add(comparer, k1, t2_1);
	            };
	            if (matchValue[0].Case === "SetEmpty") {
	                var t = matchValue[1];
	                return t;
	            } else {
	                if (matchValue[0].Case === "SetOne") {
	                    if (matchValue[1].Case === "SetEmpty") {
	                        return $target2(matchValue[0]);
	                    } else {
	                        if (matchValue[1].Case === "SetOne") {
	                            return $target3(matchValue[0].Fields[0], matchValue[1]);
	                        } else {
	                            return $target3(matchValue[0].Fields[0], matchValue[1]);
	                        }
	                    }
	                } else {
	                    if (matchValue[1].Case === "SetEmpty") {
	                        return $target2(matchValue[0]);
	                    } else {
	                        if (matchValue[1].Case === "SetOne") {
	                            var k2 = matchValue[1].Fields[0];
	                            var t1_1 = matchValue[0];
	                            return SetTree.add(comparer, k2, t1_1);
	                        } else {
	                            var h1 = matchValue[0].Fields[3];
	                            var h2 = matchValue[1].Fields[3];
	                            var k1 = matchValue[0].Fields[0];
	                            var k2 = matchValue[1].Fields[0];
	                            var t11 = matchValue[0].Fields[1];
	                            var t12 = matchValue[0].Fields[2];
	                            var t21 = matchValue[1].Fields[1];
	                            var t22 = matchValue[1].Fields[2];
	                            if (h1 > h2) {
	                                var patternInput = SetTree.split(comparer, k1, t2);
	                                var lo = patternInput[0];
	                                var hi = patternInput[2];
	                                return SetTree.balance(comparer, SetTree.union(comparer, t11, lo), k1, SetTree.union(comparer, t12, hi));
	                            } else {
	                                var patternInput = SetTree.split(comparer, k2, t1);
	                                var lo = patternInput[0];
	                                var hi = patternInput[2];
	                                return SetTree.balance(comparer, SetTree.union(comparer, t21, lo), k2, SetTree.union(comparer, t22, hi));
	                            }
	                        }
	                    }
	                }
	            }
	        };
	
	        SetTree.intersectionAux = function intersectionAux(comparer, b, m, acc) {
	            return m.Case === "SetOne" ? SetTree.mem(comparer, m.Fields[0], b) ? SetTree.add(comparer, m.Fields[0], acc) : acc : m.Case === "SetEmpty" ? acc : function () {
	                var acc_1 = SetTree.intersectionAux(comparer, b, m.Fields[2], acc);
	                var acc_2 = SetTree.mem(comparer, m.Fields[0], b) ? SetTree.add(comparer, m.Fields[0], acc_1) : acc_1;
	                return SetTree.intersectionAux(comparer, b, m.Fields[1], acc_2);
	            }();
	        };
	
	        SetTree.intersection = function intersection(comparer, a, b) {
	            return SetTree.intersectionAux(comparer, b, a, new SetTree("SetEmpty", []));
	        };
	
	        SetTree.partition1 = function partition1(comparer, f, k, acc1, acc2) {
	            return f(k) ? [SetTree.add(comparer, k, acc1), acc2] : [acc1, SetTree.add(comparer, k, acc2)];
	        };
	
	        SetTree.partitionAux = function partitionAux(comparer, f, s, acc_0, acc_1) {
	            var acc = [acc_0, acc_1];
	            if (s.Case === "SetOne") {
	                var acc1 = acc[0];
	                var acc2 = acc[1];
	                return SetTree.partition1(comparer, f, s.Fields[0], acc1, acc2);
	            } else {
	                if (s.Case === "SetEmpty") {
	                    return acc;
	                } else {
	                    var acc_2 = function () {
	                        var arg30_ = acc[0];
	                        var arg31_ = acc[1];
	                        return SetTree.partitionAux(comparer, f, s.Fields[2], arg30_, arg31_);
	                    }();
	                    var acc_3 = function () {
	                        var acc1 = acc_2[0];
	                        var acc2 = acc_2[1];
	                        return SetTree.partition1(comparer, f, s.Fields[0], acc1, acc2);
	                    }();
	                    var arg30_ = acc_3[0];
	                    var arg31_ = acc_3[1];
	                    return SetTree.partitionAux(comparer, f, s.Fields[1], arg30_, arg31_);
	                }
	            }
	        };
	
	        SetTree.partition = function partition(comparer, f, s) {
	            var seed = [new SetTree("SetEmpty", []), new SetTree("SetEmpty", [])];
	            var arg30_ = seed[0];
	            var arg31_ = seed[1];
	            return SetTree.partitionAux(comparer, f, s, arg30_, arg31_);
	        };
	
	        SetTree.minimumElementAux = function minimumElementAux(s, n) {
	            return s.Case === "SetOne" ? s.Fields[0] : s.Case === "SetEmpty" ? n : SetTree.minimumElementAux(s.Fields[1], s.Fields[0]);
	        };
	
	        SetTree.minimumElementOpt = function minimumElementOpt(s) {
	            return s.Case === "SetOne" ? s.Fields[0] : s.Case === "SetEmpty" ? null : SetTree.minimumElementAux(s.Fields[1], s.Fields[0]);
	        };
	
	        SetTree.maximumElementAux = function maximumElementAux(s, n) {
	            return s.Case === "SetOne" ? s.Fields[0] : s.Case === "SetEmpty" ? n : SetTree.maximumElementAux(s.Fields[2], s.Fields[0]);
	        };
	
	        SetTree.maximumElementOpt = function maximumElementOpt(s) {
	            return s.Case === "SetOne" ? s.Fields[0] : s.Case === "SetEmpty" ? null : SetTree.maximumElementAux(s.Fields[2], s.Fields[0]);
	        };
	
	        SetTree.minimumElement = function minimumElement(s) {
	            var matchValue = SetTree.minimumElementOpt(s);
	            if (matchValue == null) {
	                throw "Set contains no elements";
	            } else {
	                return matchValue;
	            }
	        };
	
	        SetTree.maximumElement = function maximumElement(s) {
	            var matchValue = SetTree.maximumElementOpt(s);
	            if (matchValue == null) {
	                throw "Set contains no elements";
	            } else {
	                return matchValue;
	            }
	        };
	
	        SetTree.collapseLHS = function collapseLHS(stack) {
	            return stack.tail != null ? stack.head.Case === "SetOne" ? stack : stack.head.Case === "SetNode" ? SetTree.collapseLHS(List.ofArray([stack.head.Fields[1], SetTree.SetOne(stack.head.Fields[0]), stack.head.Fields[2]], stack.tail)) : SetTree.collapseLHS(stack.tail) : new List();
	        };
	
	        SetTree.mkIterator = function mkIterator(s) {
	            return { stack: SetTree.collapseLHS(new List(s, new List())), started: false };
	        };
	
	        SetTree.moveNext = function moveNext(i) {
	            function current(i) {
	                if (i.stack.tail == null) {
	                    return null;
	                } else if (i.stack.head.Case === "SetOne") {
	                    return i.stack.head.Fields[0];
	                }
	                throw "Please report error: Set iterator, unexpected stack for current";
	            }
	            if (i.started) {
	                if (i.stack.tail == null) {
	                    return { done: true };
	                } else {
	                    if (i.stack.head.Case === "SetOne") {
	                        i.stack = SetTree.collapseLHS(i.stack.tail);
	                        return {
	                            done: i.stack.tail == null,
	                            value: current(i)
	                        };
	                    } else {
	                        throw "Please report error: Set iterator, unexpected stack for moveNext";
	                    }
	                }
	            } else {
	                i.started = true;
	                return {
	                    done: i.stack.tail == null,
	                    value: current(i)
	                };
	            }
	            ;
	        };
	
	        SetTree.compareStacks = function compareStacks(comparer, l1, l2) {
	            var $target8 = function $target8(n1k, t1) {
	                return SetTree.compareStacks(comparer, List.ofArray([new SetTree("SetEmpty", []), SetTree.SetOne(n1k)], t1), l2);
	            };
	            var $target9 = function $target9(n1k, n1l, n1r, t1) {
	                return SetTree.compareStacks(comparer, List.ofArray([n1l, SetTree.SetNode(n1k, new SetTree("SetEmpty", []), n1r, 0)], t1), l2);
	            };
	            var $target11 = function $target11(n2k, n2l, n2r, t2) {
	                return SetTree.compareStacks(comparer, l1, List.ofArray([n2l, SetTree.SetNode(n2k, new SetTree("SetEmpty", []), n2r, 0)], t2));
	            };
	            if (l1.tail != null) {
	                if (l2.tail != null) {
	                    if (l2.head.Case === "SetOne") {
	                        if (l1.head.Case === "SetOne") {
	                            var n1k = l1.head.Fields[0],
	                                n2k = l2.head.Fields[0],
	                                t1 = l1.tail,
	                                t2 = l2.tail,
	                                c = comparer.Compare(n1k, n2k);
	                            if (c !== 0) {
	                                return c;
	                            } else {
	                                return SetTree.compareStacks(comparer, t1, t2);
	                            }
	                        } else {
	                            if (l1.head.Case === "SetNode") {
	                                if (l1.head.Fields[1].Case === "SetEmpty") {
	                                    var emp = l1.head.Fields[1],
	                                        _n1k = l1.head.Fields[0],
	                                        n1r = l1.head.Fields[2],
	                                        _n2k = l2.head.Fields[0],
	                                        _t = l1.tail,
	                                        _t2 = l2.tail,
	                                        _c = comparer.Compare(_n1k, _n2k);
	                                    if (_c !== 0) {
	                                        return _c;
	                                    } else {
	                                        return SetTree.compareStacks(comparer, List.ofArray([n1r], _t), List.ofArray([emp], _t2));
	                                    }
	                                } else {
	                                    return $target9(l1.head.Fields[0], l1.head.Fields[1], l1.head.Fields[2], l1.tail);
	                                }
	                            } else {
	                                var _n2k2 = l2.head.Fields[0],
	                                    _t3 = l2.tail;
	                                return SetTree.compareStacks(comparer, l1, List.ofArray([new SetTree("SetEmpty", []), SetTree.SetOne(_n2k2)], _t3));
	                            }
	                        }
	                    } else {
	                        if (l2.head.Case === "SetNode") {
	                            if (l2.head.Fields[1].Case === "SetEmpty") {
	                                if (l1.head.Case === "SetOne") {
	                                    var _n1k2 = l1.head.Fields[0],
	                                        _n2k3 = l2.head.Fields[0],
	                                        n2r = l2.head.Fields[2],
	                                        _t4 = l1.tail,
	                                        _t5 = l2.tail,
	                                        _c2 = comparer.Compare(_n1k2, _n2k3);
	                                    if (_c2 !== 0) {
	                                        return _c2;
	                                    } else {
	                                        return SetTree.compareStacks(comparer, List.ofArray([new SetTree("SetEmpty", [])], _t4), List.ofArray([n2r], _t5));
	                                    }
	                                } else {
	                                    if (l1.head.Case === "SetNode") {
	                                        if (l1.head.Fields[1].Case === "SetEmpty") {
	                                            var _n1k3 = l1.head.Fields[0],
	                                                _n1r = l1.head.Fields[2],
	                                                _n2k4 = l2.head.Fields[0],
	                                                _n2r = l2.head.Fields[2],
	                                                _t6 = l1.tail,
	                                                _t7 = l2.tail,
	                                                _c3 = comparer.Compare(_n1k3, _n2k4);
	                                            if (_c3 !== 0) {
	                                                return _c3;
	                                            } else {
	                                                return SetTree.compareStacks(comparer, List.ofArray([_n1r], _t6), List.ofArray([_n2r], _t7));
	                                            }
	                                        } else {
	                                            return $target9(l1.head.Fields[0], l1.head.Fields[1], l1.head.Fields[2], l1.tail);
	                                        }
	                                    } else {
	                                        return $target11(l2.head.Fields[0], l2.head.Fields[1], l2.head.Fields[2], l2.tail);
	                                    }
	                                }
	                            } else {
	                                if (l1.head.Case === "SetOne") {
	                                    return $target8(l1.head.Fields[0], l1.tail);
	                                } else {
	                                    if (l1.head.Case === "SetNode") {
	                                        return $target9(l1.head.Fields[0], l1.head.Fields[1], l1.head.Fields[2], l1.tail);
	                                    } else {
	                                        return $target11(l2.head.Fields[0], l2.head.Fields[1], l2.head.Fields[2], l2.tail);
	                                    }
	                                }
	                            }
	                        } else {
	                            if (l1.head.Case === "SetOne") {
	                                return $target8(l1.head.Fields[0], l1.tail);
	                            } else {
	                                if (l1.head.Case === "SetNode") {
	                                    return $target9(l1.head.Fields[0], l1.head.Fields[1], l1.head.Fields[2], l1.tail);
	                                } else {
	                                    return SetTree.compareStacks(comparer, l1.tail, l2.tail);
	                                }
	                            }
	                        }
	                    }
	                } else {
	                    return 1;
	                }
	            } else {
	                if (l2.tail != null) {
	                    return -1;
	                } else {
	                    return 0;
	                }
	            }
	        };
	
	        SetTree.compare = function compare(comparer, s1, s2) {
	            if (s1.Case === "SetEmpty") {
	                if (s2.Case === "SetEmpty") {
	                    return 0;
	                } else {
	                    return -1;
	                }
	            } else {
	                if (s2.Case === "SetEmpty") {
	                    return 1;
	                } else {
	                    return SetTree.compareStacks(comparer, List.ofArray([s1]), List.ofArray([s2]));
	                }
	            }
	        };
	
	        SetTree.mkFromEnumerator = function mkFromEnumerator(comparer, acc, e) {
	            var cur = e.next();
	            while (!cur.done) {
	                acc = SetTree.add(comparer, cur.value, acc);
	                cur = e.next();
	            }
	            return acc;
	        };
	
	        SetTree.ofSeq = function ofSeq(comparer, c) {
	            var ie = c[Symbol.iterator]();
	            return SetTree.mkFromEnumerator(comparer, new SetTree("SetEmpty", []), ie);
	        };
	
	        return SetTree;
	    }();
	
	    SetTree.tolerance = 2;
	
	    var FSet = function () {
	        /** Do not call, use Set.create instead. */
	        function FSet() {
	            _classCallCheck(this, FSet);
	        }
	
	        FSet.from = function from(comparer, tree) {
	            var s = new FSet();
	            s.tree = tree;
	            s.comparer = comparer || new GenericComparer();
	            return s;
	        };
	
	        FSet.create = function create(ie, comparer) {
	            comparer = comparer || new GenericComparer();
	            return FSet.from(comparer, ie ? SetTree.ofSeq(comparer, ie) : new SetTree("SetEmpty", []));
	        };
	
	        FSet.prototype.ToString = function ToString() {
	            return "set [" + Array.from(this).map(Util.toString).join("; ") + "]";
	        };
	
	        FSet.prototype.Equals = function Equals(s2) {
	            return this.CompareTo(s2) === 0;
	        };
	
	        FSet.prototype.CompareTo = function CompareTo(s2) {
	            return SetTree.compare(this.comparer, this.tree, s2.tree);
	        };
	
	        FSet.prototype[Symbol.iterator] = function () {
	            var i = SetTree.mkIterator(this.tree);
	            return {
	                next: function next() {
	                    return SetTree.moveNext(i);
	                }
	            };
	        };
	
	        FSet.prototype.values = function values() {
	            return this[Symbol.iterator]();
	        };
	
	        FSet.prototype.has = function has(v) {
	            return SetTree.mem(this.comparer, v, this.tree);
	        };
	
	        FSet.prototype.add = function add(v) {
	            throw "not supported";
	        };
	
	        FSet.prototype.delete = function _delete(v) {
	            throw "not supported";
	        };
	
	        FSet.prototype.clear = function clear() {
	            throw "not supported";
	        };
	
	        FSet.isEmpty = function isEmpty(s) {
	            return SetTree.isEmpty(s.tree);
	        };
	
	        FSet.add = function add(item, s) {
	            return FSet.from(s.comparer, SetTree.add(s.comparer, item, s.tree));
	        };
	
	        FSet.addInPlace = function addInPlace(item, s) {
	            return s.has(item) ? false : (s.add(item), true);
	        };
	
	        FSet.remove = function remove(item, s) {
	            return FSet.from(s.comparer, SetTree.remove(s.comparer, item, s.tree));
	        };
	
	        FSet.union = function union(set1, set2) {
	            return set2.tree.Case === "SetEmpty" ? set1 : set1.tree.Case === "SetEmpty" ? set2 : FSet.from(set1.comparer, SetTree.union(set1.comparer, set1.tree, set2.tree));
	        };
	
	        FSet.unionInPlace = function unionInPlace(set1, set2) {
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;
	
	            try {
	                for (var _iterator = set2[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var x = _step.value;
	
	                    set1.add(x);
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	        };
	
	        FSet.unionMany = function unionMany(sets) {
	            // Pass args as FSet.union(s, acc) instead of FSet.union(acc, s)
	            // to discard the comparer of the first empty set 
	            return Seq.fold(function (acc, s) {
	                return FSet.union(s, acc);
	            }, FSet.create(), sets);
	        };
	
	        FSet.difference = function difference(set1, set2) {
	            return set1.tree.Case === "SetEmpty" ? set1 : set2.tree.Case === "SetEmpty" ? set1 : FSet.from(set1.comparer, SetTree.diff(set1.comparer, set1.tree, set2.tree));
	        };
	
	        FSet.differenceInPlace = function differenceInPlace(set1, set2) {
	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;
	
	            try {
	                for (var _iterator2 = set2[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var x = _step2.value;
	
	                    set1.delete(x);
	                }
	            } catch (err) {
	                _didIteratorError2 = true;
	                _iteratorError2 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                        _iterator2.return();
	                    }
	                } finally {
	                    if (_didIteratorError2) {
	                        throw _iteratorError2;
	                    }
	                }
	            }
	        };
	
	        FSet.intersect = function intersect(set1, set2) {
	            return set2.tree.Case === "SetEmpty" ? set2 : set1.tree.Case === "SetEmpty" ? set1 : FSet.from(set1.comparer, SetTree.intersection(set1.comparer, set1.tree, set2.tree));
	        };
	
	        FSet.intersectInPlace = function intersectInPlace(set1, set2) {
	            var set2_ = set2 instanceof Set ? set2 : new Set(set2);
	            var _iteratorNormalCompletion3 = true;
	            var _didIteratorError3 = false;
	            var _iteratorError3 = undefined;
	
	            try {
	                for (var _iterator3 = set1[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                    var x = _step3.value;
	
	                    if (!set2_.has(x)) {
	                        set1.delete(x);
	                    }
	                }
	            } catch (err) {
	                _didIteratorError3 = true;
	                _iteratorError3 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                        _iterator3.return();
	                    }
	                } finally {
	                    if (_didIteratorError3) {
	                        throw _iteratorError3;
	                    }
	                }
	            }
	        };
	
	        FSet.intersectMany = function intersectMany(sets) {
	            return Seq.reduce(function (s1, s2) {
	                return FSet.intersect(s1, s2);
	            }, sets);
	        };
	
	        FSet.isProperSubsetOf = function isProperSubsetOf(set1, set2) {
	            if (set1 instanceof FSet && set2 instanceof FSet) {
	                return SetTree.psubset(set1.comparer, set1.tree, set2.tree);
	            } else {
	                set2 = set2 instanceof Set ? set2 : new Set(set2);
	                return Seq.forAll(function (x) {
	                    return set2.has(x);
	                }, set1) && Seq.exists(function (x) {
	                    return !set1.has(x);
	                }, set2);
	            }
	        };
	
	        FSet.isSubsetOf = function isSubsetOf(set1, set2) {
	            if (set1 instanceof FSet && set2 instanceof FSet) {
	                return SetTree.subset(set1.comparer, set1.tree, set2.tree);
	            } else {
	                set2 = set2 instanceof Set ? set2 : new Set(set2);
	                return Seq.forAll(function (x) {
	                    return set2.has(x);
	                }, set1);
	            }
	        };
	
	        FSet.isProperSupersetOf = function isProperSupersetOf(set1, set2) {
	            if (set1 instanceof FSet && set2 instanceof FSet) {
	                return SetTree.psubset(set1.comparer, set2.tree, set1.tree);
	            } else {
	                return FSet.isProperSubset(set2 instanceof Set ? set2 : new Set(set2), set1);
	            }
	        };
	
	        FSet.isSupersetOf = function isSupersetOf(set1, set2) {
	            if (set1 instanceof FSet && set2 instanceof FSet) {
	                return SetTree.subset(set1.comparer, set2.tree, set1.tree);
	            } else {
	                return FSet.isSubset(set2 instanceof Set ? set2 : new Set(set2), set1);
	            }
	        };
	
	        FSet.copyTo = function copyTo(xs, arr, arrayIndex, count) {
	            if (!Array.isArray(arr) && !ArrayBuffer.isView(arr)) throw "Array is invalid";
	            count = count || arr.length;
	            var i = arrayIndex || 0;
	            var iter = xs[Symbol.iterator]();
	            while (count--) {
	                var el = iter.next();
	                if (el.done) break;
	                arr[i++] = el.value;
	            }
	        };
	
	        FSet.partition = function partition(f, s) {
	            if (s.tree.Case === "SetEmpty") {
	                return [s, s];
	            } else {
	                var tuple = SetTree.partition(s.comparer, f, s.tree);
	                return [FSet.from(s.comparer, tuple[0]), FSet.from(s.comparer, tuple[1])];
	            }
	        };
	
	        FSet.filter = function filter(f, s) {
	            if (s.tree.Case === "SetEmpty") {
	                return s;
	            } else {
	                return FSet.from(s.comparer, SetTree.filter(s.comparer, f, s.tree));
	            }
	        };
	
	        FSet.map = function map(f, s) {
	            var comparer = new GenericComparer();
	            return FSet.from(comparer, SetTree.fold(function (acc, k) {
	                return SetTree.add(comparer, f(k), acc);
	            }, new SetTree("SetEmpty", []), s.tree));
	        };
	
	        FSet.exists = function exists(f, s) {
	            return SetTree.exists(f, s.tree);
	        };
	
	        FSet.forAll = function forAll(f, s) {
	            return SetTree.forall(f, s.tree);
	        };
	
	        FSet.fold = function fold(f, seed, s) {
	            return SetTree.fold(f, seed, s.tree);
	        };
	
	        FSet.foldBack = function foldBack(f, s, seed) {
	            return SetTree.foldBack(f, s.tree, seed);
	        };
	
	        FSet.iterate = function iterate(f, s) {
	            SetTree.iter(f, s.tree);
	        };
	
	        FSet.minimumElement = function minimumElement(s) {
	            return SetTree.minimumElement(s.tree);
	        };
	
	        FSet.maximumElement = function maximumElement(s) {
	            return SetTree.maximumElement(s.tree);
	        };
	
	        _createClass(FSet, [{
	            key: "size",
	            get: function get() {
	                return SetTree.count(this.tree);
	            }
	        }]);
	
	        return FSet;
	    }();
	
	    FSet.op_Addition = FSet.union;
	    FSet.op_Subtraction = FSet.difference;
	    FSet.isProperSubset = FSet.isProperSubsetOf;
	    FSet.isSubset = FSet.isSubsetOf;
	    FSet.isProperSuperset = FSet.isProperSupersetOf;
	    FSet.isSuperset = FSet.isSupersetOf;
	    FSet.minElement = FSet.minimumElement;
	    FSet.maxElement = FSet.maximumElement;
	    Util.setInterfaces(FSet.prototype, ["System.IEquatable", "System.IComparable"], "Microsoft.FSharp.Collections.FSharpSet");
	    exports.Set = FSet;
	
	    var MapTree = function () {
	        function MapTree(caseName, fields) {
	            _classCallCheck(this, MapTree);
	
	            this.Case = caseName;
	            this.Fields = fields;
	        }
	
	        MapTree.sizeAux = function sizeAux(acc, m) {
	            return m.Case === "MapOne" ? acc + 1 : m.Case === "MapNode" ? MapTree.sizeAux(MapTree.sizeAux(acc + 1, m.Fields[2]), m.Fields[3]) : acc;
	        };
	
	        MapTree.size = function size(x) {
	            return MapTree.sizeAux(0, x);
	        };
	
	        MapTree.empty = function empty() {
	            return new MapTree("MapEmpty", []);
	        };
	
	        MapTree.height = function height(_arg1) {
	            return _arg1.Case === "MapOne" ? 1 : _arg1.Case === "MapNode" ? _arg1.Fields[4] : 0;
	        };
	
	        MapTree.isEmpty = function isEmpty(m) {
	            return m.Case === "MapEmpty" ? true : false;
	        };
	
	        MapTree.mk = function mk(l, k, v, r) {
	            var matchValue = [l, r];
	            var $target1 = function $target1() {
	                var hl = MapTree.height(l);
	                var hr = MapTree.height(r);
	                var m = hl < hr ? hr : hl;
	                return new MapTree("MapNode", [k, v, l, r, m + 1]);
	            };
	            if (matchValue[0].Case === "MapEmpty") {
	                if (matchValue[1].Case === "MapEmpty") {
	                    return new MapTree("MapOne", [k, v]);
	                } else {
	                    return $target1();
	                }
	            } else {
	                return $target1();
	            }
	        };
	
	        MapTree.rebalance = function rebalance(t1, k, v, t2) {
	            var t1h = MapTree.height(t1);
	            var t2h = MapTree.height(t2);
	            if (t2h > t1h + 2) {
	                if (t2.Case === "MapNode") {
	                    if (MapTree.height(t2.Fields[2]) > t1h + 1) {
	                        if (t2.Fields[2].Case === "MapNode") {
	                            return MapTree.mk(MapTree.mk(t1, k, v, t2.Fields[2].Fields[2]), t2.Fields[2].Fields[0], t2.Fields[2].Fields[1], MapTree.mk(t2.Fields[2].Fields[3], t2.Fields[0], t2.Fields[1], t2.Fields[3]));
	                        } else {
	                            throw "rebalance";
	                        }
	                    } else {
	                        return MapTree.mk(MapTree.mk(t1, k, v, t2.Fields[2]), t2.Fields[0], t2.Fields[1], t2.Fields[3]);
	                    }
	                } else {
	                    throw "rebalance";
	                }
	            } else {
	                if (t1h > t2h + 2) {
	                    if (t1.Case === "MapNode") {
	                        if (MapTree.height(t1.Fields[3]) > t2h + 1) {
	                            if (t1.Fields[3].Case === "MapNode") {
	                                return MapTree.mk(MapTree.mk(t1.Fields[2], t1.Fields[0], t1.Fields[1], t1.Fields[3].Fields[2]), t1.Fields[3].Fields[0], t1.Fields[3].Fields[1], MapTree.mk(t1.Fields[3].Fields[3], k, v, t2));
	                            } else {
	                                throw "rebalance";
	                            }
	                        } else {
	                            return MapTree.mk(t1.Fields[2], t1.Fields[0], t1.Fields[1], MapTree.mk(t1.Fields[3], k, v, t2));
	                        }
	                    } else {
	                        throw "rebalance";
	                    }
	                } else {
	                    return MapTree.mk(t1, k, v, t2);
	                }
	            }
	        };
	
	        MapTree.add = function add(comparer, k, v, m) {
	            if (m.Case === "MapOne") {
	                var c = comparer.Compare(k, m.Fields[0]);
	                if (c < 0) {
	                    return new MapTree("MapNode", [k, v, new MapTree("MapEmpty", []), m, 2]);
	                } else if (c === 0) {
	                    return new MapTree("MapOne", [k, v]);
	                }
	                return new MapTree("MapNode", [k, v, m, new MapTree("MapEmpty", []), 2]);
	            } else if (m.Case === "MapNode") {
	                var c = comparer.Compare(k, m.Fields[0]);
	                if (c < 0) {
	                    return MapTree.rebalance(MapTree.add(comparer, k, v, m.Fields[2]), m.Fields[0], m.Fields[1], m.Fields[3]);
	                } else if (c === 0) {
	                    return new MapTree("MapNode", [k, v, m.Fields[2], m.Fields[3], m.Fields[4]]);
	                }
	                return MapTree.rebalance(m.Fields[2], m.Fields[0], m.Fields[1], MapTree.add(comparer, k, v, m.Fields[3]));
	            }
	            return new MapTree("MapOne", [k, v]);
	        };
	
	        MapTree.find = function find(comparer, k, m) {
	            var res = MapTree.tryFind(comparer, k, m);
	            if (res != null) return res;
	            throw "key not found";
	        };
	
	        MapTree.tryFind = function tryFind(comparer, k, m) {
	            if (m.Case === "MapOne") {
	                var c = comparer.Compare(k, m.Fields[0]);
	                return c === 0 ? m.Fields[1] : null;
	            } else if (m.Case === "MapNode") {
	                var c = comparer.Compare(k, m.Fields[0]);
	                if (c < 0) {
	                    return MapTree.tryFind(comparer, k, m.Fields[2]);
	                } else {
	                    if (c === 0) {
	                        return m.Fields[1];
	                    } else {
	                        return MapTree.tryFind(comparer, k, m.Fields[3]);
	                    }
	                }
	            }
	            return null;
	        };
	
	        MapTree.partition1 = function partition1(comparer, f, k, v, acc1, acc2) {
	            return f(k, v) ? [MapTree.add(comparer, k, v, acc1), acc2] : [acc1, MapTree.add(comparer, k, v, acc2)];
	        };
	
	        MapTree.partitionAux = function partitionAux(comparer, f, s, acc_0, acc_1) {
	            var acc = [acc_0, acc_1];
	            if (s.Case === "MapOne") {
	                return MapTree.partition1(comparer, f, s.Fields[0], s.Fields[1], acc[0], acc[1]);
	            } else if (s.Case === "MapNode") {
	                var acc_2 = MapTree.partitionAux(comparer, f, s.Fields[3], acc[0], acc[1]);
	                var acc_3 = MapTree.partition1(comparer, f, s.Fields[0], s.Fields[1], acc_2[0], acc_2[1]);
	                return MapTree.partitionAux(comparer, f, s.Fields[2], acc_3[0], acc_3[1]);
	            }
	            return acc;
	        };
	
	        MapTree.partition = function partition(comparer, f, s) {
	            return MapTree.partitionAux(comparer, f, s, MapTree.empty(), MapTree.empty());
	        };
	
	        MapTree.filter1 = function filter1(comparer, f, k, v, acc) {
	            return f(k, v) ? MapTree.add(comparer, k, v, acc) : acc;
	        };
	
	        MapTree.filterAux = function filterAux(comparer, f, s, acc) {
	            return s.Case === "MapOne" ? MapTree.filter1(comparer, f, s.Fields[0], s.Fields[1], acc) : s.Case === "MapNode" ? function () {
	                var acc_1 = MapTree.filterAux(comparer, f, s.Fields[2], acc);
	                var acc_2 = MapTree.filter1(comparer, f, s.Fields[0], s.Fields[1], acc_1);
	                return MapTree.filterAux(comparer, f, s.Fields[3], acc_2);
	            }() : acc;
	        };
	
	        MapTree.filter = function filter(comparer, f, s) {
	            return MapTree.filterAux(comparer, f, s, MapTree.empty());
	        };
	
	        MapTree.spliceOutSuccessor = function spliceOutSuccessor(m) {
	            if (m.Case === "MapOne") {
	                return [m.Fields[0], m.Fields[1], new MapTree("MapEmpty", [])];
	            } else if (m.Case === "MapNode") {
	                if (m.Fields[2].Case === "MapEmpty") {
	                    return [m.Fields[0], m.Fields[1], m.Fields[3]];
	                } else {
	                    var kvl = MapTree.spliceOutSuccessor(m.Fields[2]);
	                    return [kvl[0], kvl[1], MapTree.mk(kvl[2], m.Fields[0], m.Fields[1], m.Fields[3])];
	                }
	            }
	            throw "internal error: Map.spliceOutSuccessor";
	        };
	
	        MapTree.remove = function remove(comparer, k, m) {
	            if (m.Case === "MapOne") {
	                var c = comparer.Compare(k, m.Fields[0]);
	                if (c === 0) {
	                    return new MapTree("MapEmpty", []);
	                } else {
	                    return m;
	                }
	            } else if (m.Case === "MapNode") {
	                var c = comparer.Compare(k, m.Fields[0]);
	                if (c < 0) {
	                    return MapTree.rebalance(MapTree.remove(comparer, k, m.Fields[2]), m.Fields[0], m.Fields[1], m.Fields[3]);
	                } else {
	                    if (c === 0) {
	                        var matchValue = [m.Fields[2], m.Fields[3]];
	                        if (matchValue[0].Case === "MapEmpty") {
	                            return m.Fields[3];
	                        } else {
	                            if (matchValue[1].Case === "MapEmpty") {
	                                return m.Fields[2];
	                            } else {
	                                var patternInput = MapTree.spliceOutSuccessor(m.Fields[3]);
	                                var sv = patternInput[1];
	                                var sk = patternInput[0];
	                                var r_ = patternInput[2];
	                                return MapTree.mk(m.Fields[2], sk, sv, r_);
	                            }
	                        }
	                    } else {
	                        return MapTree.rebalance(m.Fields[2], m.Fields[0], m.Fields[1], MapTree.remove(comparer, k, m.Fields[3]));
	                    }
	                }
	            } else {
	                return MapTree.empty();
	            }
	        };
	
	        MapTree.mem = function mem(comparer, k, m) {
	            return m.Case === "MapOne" ? comparer.Compare(k, m.Fields[0]) === 0 : m.Case === "MapNode" ? function () {
	                var c = comparer.Compare(k, m.Fields[0]);
	                if (c < 0) {
	                    return MapTree.mem(comparer, k, m.Fields[2]);
	                } else {
	                    if (c === 0) {
	                        return true;
	                    } else {
	                        return MapTree.mem(comparer, k, m.Fields[3]);
	                    }
	                }
	            }() : false;
	        };
	
	        MapTree.iter = function iter(f, m) {
	            if (m.Case === "MapOne") {
	                f(m.Fields[0], m.Fields[1]);
	            } else if (m.Case === "MapNode") {
	                MapTree.iter(f, m.Fields[2]);
	                f(m.Fields[0], m.Fields[1]);
	                MapTree.iter(f, m.Fields[3]);
	            }
	        };
	
	        MapTree.tryPick = function tryPick(f, m) {
	            return m.Case === "MapOne" ? f(m.Fields[0], m.Fields[1]) : m.Case === "MapNode" ? function () {
	                var matchValue = MapTree.tryPick(f, m.Fields[2]);
	                if (matchValue == null) {
	                    var matchValue_1 = f(m.Fields[0], m.Fields[1]);
	                    if (matchValue_1 == null) {
	                        return MapTree.tryPick(f, m.Fields[3]);
	                    } else {
	                        var res = matchValue_1;
	                        return res;
	                    }
	                } else {
	                    var res = matchValue;
	                    return res;
	                }
	            }() : null;
	        };
	
	        MapTree.exists = function exists(f, m) {
	            return m.Case === "MapOne" ? f(m.Fields[0], m.Fields[1]) : m.Case === "MapNode" ? (MapTree.exists(f, m.Fields[2]) ? true : f(m.Fields[0], m.Fields[1])) ? true : MapTree.exists(f, m.Fields[3]) : false;
	        };
	
	        MapTree.forall = function forall(f, m) {
	            return m.Case === "MapOne" ? f(m.Fields[0], m.Fields[1]) : m.Case === "MapNode" ? (MapTree.forall(f, m.Fields[2]) ? f(m.Fields[0], m.Fields[1]) : false) ? MapTree.forall(f, m.Fields[3]) : false : true;
	        };
	
	        MapTree.mapi = function mapi(f, m) {
	            return m.Case === "MapOne" ? new MapTree("MapOne", [m.Fields[0], f(m.Fields[0], m.Fields[1])]) : m.Case === "MapNode" ? function () {
	                var l2 = MapTree.mapi(f, m.Fields[2]);
	                var v2 = f(m.Fields[0], m.Fields[1]);
	                var r2 = MapTree.mapi(f, m.Fields[3]);
	                return new MapTree("MapNode", [m.Fields[0], v2, l2, r2, m.Fields[4]]);
	            }() : MapTree.empty();
	        };
	
	        MapTree.foldBack = function foldBack(f, m, x) {
	            return m.Case === "MapOne" ? f(m.Fields[0], m.Fields[1], x) : m.Case === "MapNode" ? function () {
	                var x_1 = MapTree.foldBack(f, m.Fields[3], x);
	                var x_2 = f(m.Fields[0], m.Fields[1], x_1);
	                return MapTree.foldBack(f, m.Fields[2], x_2);
	            }() : x;
	        };
	
	        MapTree.fold = function fold(f, x, m) {
	            return m.Case === "MapOne" ? f(x, m.Fields[0], m.Fields[1]) : m.Case === "MapNode" ? function () {
	                var x_1 = MapTree.fold(f, x, m.Fields[2]);
	                var x_2 = f(x_1, m.Fields[0], m.Fields[1]);
	                return MapTree.fold(f, x_2, m.Fields[3]);
	            }() : x;
	        };
	
	        MapTree.mkFromEnumerator = function mkFromEnumerator(comparer, acc, e) {
	            var cur = e.next();
	            while (!cur.done) {
	                acc = MapTree.add(comparer, cur.value[0], cur.value[1], acc);
	                cur = e.next();
	            }
	            return acc;
	        };
	
	        MapTree.ofSeq = function ofSeq(comparer, c) {
	            var ie = c[Symbol.iterator]();
	            return MapTree.mkFromEnumerator(comparer, MapTree.empty(), ie);
	        };
	
	        MapTree.collapseLHS = function collapseLHS(stack) {
	            if (stack.tail != null) {
	                if (stack.head.Case === "MapOne") {
	                    return stack;
	                } else if (stack.head.Case === "MapNode") {
	                    return MapTree.collapseLHS(List.ofArray([stack.head.Fields[2], new MapTree("MapOne", [stack.head.Fields[0], stack.head.Fields[1]]), stack.head.Fields[3]], stack.tail));
	                } else {
	                    return MapTree.collapseLHS(stack.tail);
	                }
	            } else {
	                return new List();
	            }
	        };
	
	        MapTree.mkIterator = function mkIterator(s) {
	            return { stack: MapTree.collapseLHS(new List(s, new List())), started: false };
	        };
	
	        MapTree.moveNext = function moveNext(i) {
	            function current(i) {
	                if (i.stack.tail == null) {
	                    return null;
	                } else if (i.stack.head.Case === "MapOne") {
	                    return [i.stack.head.Fields[0], i.stack.head.Fields[1]];
	                }
	                throw "Please report error: Map iterator, unexpected stack for current";
	            }
	            if (i.started) {
	                if (i.stack.tail == null) {
	                    return { done: true };
	                } else {
	                    if (i.stack.head.Case === "MapOne") {
	                        i.stack = MapTree.collapseLHS(i.stack.tail);
	                        return {
	                            done: i.stack.tail == null,
	                            value: current(i)
	                        };
	                    } else {
	                        throw "Please report error: Map iterator, unexpected stack for moveNext";
	                    }
	                }
	            } else {
	                i.started = true;
	                return {
	                    done: i.stack.tail == null,
	                    value: current(i)
	                };
	            }
	            ;
	        };
	
	        return MapTree;
	    }();
	
	    var FMap = function () {
	        /** Do not call, use Map.create instead. */
	        function FMap() {
	            _classCallCheck(this, FMap);
	        }
	
	        FMap.from = function from(comparer, tree) {
	            var map = new FMap();
	            map.tree = tree;
	            map.comparer = comparer || new GenericComparer();
	            return map;
	        };
	
	        FMap.create = function create(ie, comparer) {
	            comparer = comparer || new GenericComparer();
	            return FMap.from(comparer, ie ? MapTree.ofSeq(comparer, ie) : MapTree.empty());
	        };
	
	        FMap.prototype.ToString = function ToString() {
	            return "map [" + Array.from(this).map(Util.toString).join("; ") + "]";
	        };
	
	        FMap.prototype.Equals = function Equals(m2) {
	            return this.CompareTo(m2) === 0;
	        };
	
	        FMap.prototype.CompareTo = function CompareTo(m2) {
	            var _this4 = this;
	
	            return Seq.compareWith(function (kvp1, kvp2) {
	                var c = _this4.comparer.Compare(kvp1[0], kvp2[0]);
	                return c !== 0 ? c : Util.compare(kvp1[1], kvp2[1]);
	            }, this, m2);
	        };
	
	        FMap.prototype[Symbol.iterator] = function () {
	            var i = MapTree.mkIterator(this.tree);
	            return {
	                next: function next() {
	                    return MapTree.moveNext(i);
	                }
	            };
	        };
	
	        FMap.prototype.entries = function entries() {
	            return this[Symbol.iterator]();
	        };
	
	        FMap.prototype.keys = function keys() {
	            return Seq.map(function (kv) {
	                return kv[0];
	            }, this);
	        };
	
	        FMap.prototype.values = function values() {
	            return Seq.map(function (kv) {
	                return kv[1];
	            }, this);
	        };
	
	        FMap.prototype.get = function get(k) {
	            return MapTree.find(this.comparer, k, this.tree);
	        };
	
	        FMap.prototype.has = function has(k) {
	            return MapTree.mem(this.comparer, k, this.tree);
	        };
	
	        FMap.prototype.set = function set(k, v) {
	            throw "not supported";
	        };
	
	        FMap.prototype.delete = function _delete(k) {
	            throw "not supported";
	        };
	
	        FMap.prototype.clear = function clear() {
	            throw "not supported";
	        };
	
	        FMap.add = function add(k, v, map) {
	            return FMap.from(map.comparer, MapTree.add(map.comparer, k, v, map.tree));
	        };
	
	        FMap.remove = function remove(item, map) {
	            return FMap.from(map.comparer, MapTree.remove(map.comparer, item, map.tree));
	        };
	
	        FMap.containsValue = function containsValue(v, map) {
	            return Seq.fold(function (acc, k) {
	                return acc || Util.equals(map.get(k), v);
	            }, false, map.keys());
	        };
	
	        FMap.exists = function exists(f, map) {
	            return MapTree.exists(f, map.tree);
	        };
	
	        FMap.find = function find(k, map) {
	            return MapTree.find(map.comparer, k, map.tree);
	        };
	
	        FMap.tryFind = function tryFind(k, map) {
	            return MapTree.tryFind(map.comparer, k, map.tree);
	        };
	
	        FMap.filter = function filter(f, map) {
	            return FMap.from(map.comparer, MapTree.filter(map.comparer, f, map.tree));
	        };
	
	        FMap.fold = function fold(f, seed, map) {
	            return MapTree.fold(f, seed, map.tree);
	        };
	
	        FMap.foldBack = function foldBack(f, map, seed) {
	            return MapTree.foldBack(f, map.tree, seed);
	        };
	
	        FMap.forAll = function forAll(f, map) {
	            return MapTree.forall(f, map.tree);
	        };
	
	        FMap.isEmpty = function isEmpty(map) {
	            return MapTree.isEmpty(map.tree);
	        };
	
	        FMap.iterate = function iterate(f, map) {
	            MapTree.iter(f, map.tree);
	        };
	
	        FMap.map = function map(f, _map) {
	            return FMap.from(_map.comparer, MapTree.mapi(f, _map.tree));
	        };
	
	        FMap.partition = function partition(f, map) {
	            var rs = MapTree.partition(map.comparer, f, map.tree);
	            return [FMap.from(map.comparer, rs[0]), FMap.from(map.comparer, rs[1])];
	        };
	
	        FMap.findKey = function findKey(f, map) {
	            return Seq.pick(function (kv) {
	                return f(kv[0], kv[1]) ? kv[0] : null;
	            }, map);
	        };
	
	        FMap.tryFindKey = function tryFindKey(f, map) {
	            return Seq.tryPick(function (kv) {
	                return f(kv[0], kv[1]) ? kv[0] : null;
	            }, map);
	        };
	
	        FMap.pick = function pick(f, map) {
	            var res = FMap.tryPick(f, map);
	            if (res != null) return res;
	            throw "key not found";
	        };
	
	        FMap.tryPick = function tryPick(f, map) {
	            return MapTree.tryPick(f, map.tree);
	        };
	
	        _createClass(FMap, [{
	            key: "size",
	            get: function get() {
	                return MapTree.size(this.tree);
	            }
	        }]);
	
	        return FMap;
	    }();
	
	    Util.setInterfaces(FMap.prototype, ["System.IEquatable", "System.IComparable"], "Microsoft.FSharp.Collections.FSharpMap");
	    exports.Map = FMap;
	    var Nothing = exports.Nothing = void 0;
	    var maxTrampolineCallCount = 2000;
	
	    var Trampoline = exports.Trampoline = function () {
	        function Trampoline() {
	            _classCallCheck(this, Trampoline);
	
	            this.callCount = 0;
	        }
	
	        Trampoline.prototype.incrementAndCheck = function incrementAndCheck() {
	            return this.callCount++ > maxTrampolineCallCount;
	        };
	
	        Trampoline.prototype.hijack = function hijack(f) {
	            this.callCount = 0;
	            setTimeout(f, 0);
	        };
	
	        return Trampoline;
	    }();
	
	    var AsyncImpl = {
	        protectedCont: function protectedCont(f) {
	            return function (ctx) {
	                if (ctx.cancelToken.isCancelled) ctx.onCancel("cancelled");else if (ctx.trampoline.incrementAndCheck()) ctx.trampoline.hijack(function () {
	                    try {
	                        return f(ctx);
	                    } catch (err) {
	                        ctx.onError(err);
	                    }
	                });else try {
	                    return f(ctx);
	                } catch (err) {
	                    ctx.onError(err);
	                }
	            };
	        },
	        bind: function bind(computation, binder) {
	            return AsyncImpl.protectedCont(function (ctx) {
	                computation({
	                    onSuccess: function onSuccess(x) {
	                        return binder(x)(ctx);
	                    },
	                    onError: ctx.onError,
	                    onCancel: ctx.onCancel,
	                    cancelToken: ctx.cancelToken,
	                    trampoline: ctx.trampoline
	                });
	            });
	        },
	        return: function _return(value) {
	            return AsyncImpl.protectedCont(function (ctx) {
	                return ctx.onSuccess(value);
	            });
	        }
	    };
	
	    var AsyncBuilder = exports.AsyncBuilder = function () {
	        function AsyncBuilder() {
	            _classCallCheck(this, AsyncBuilder);
	        }
	
	        AsyncBuilder.prototype.Bind = function Bind(computation, binder) {
	            return AsyncImpl.bind(computation, binder);
	        };
	
	        AsyncBuilder.prototype.Combine = function Combine(computation1, computation2) {
	            return this.Bind(computation1, function () {
	                return computation2;
	            });
	        };
	
	        AsyncBuilder.prototype.Delay = function Delay(generator) {
	            return AsyncImpl.protectedCont(function (ctx) {
	                return generator()(ctx);
	            });
	        };
	
	        AsyncBuilder.prototype.For = function For(sequence, body) {
	            var iter = sequence[Symbol.iterator]();
	            var cur = iter.next();
	            return this.While(function () {
	                return !cur.done;
	            }, this.Delay(function () {
	                var res = body(cur.value);
	                cur = iter.next();
	                return res;
	            }));
	        };
	
	        AsyncBuilder.prototype.Return = function Return(value) {
	            return AsyncImpl.return(value);
	        };
	
	        AsyncBuilder.prototype.ReturnFrom = function ReturnFrom(computation) {
	            return computation;
	        };
	
	        AsyncBuilder.prototype.TryFinally = function TryFinally(computation, compensation) {
	            return AsyncImpl.protectedCont(function (ctx) {
	                computation({
	                    onSuccess: function onSuccess(x) {
	                        compensation();
	                        ctx.onSuccess(x);
	                    },
	                    onError: function onError(x) {
	                        compensation();
	                        ctx.onError(x);
	                    },
	                    onCancel: function onCancel(x) {
	                        compensation();
	                        ctx.onCancel(x);
	                    },
	                    cancelToken: ctx.cancelToken,
	                    trampoline: ctx.trampoline
	                });
	            });
	        };
	
	        AsyncBuilder.prototype.TryWith = function TryWith(computation, catchHandler) {
	            return AsyncImpl.protectedCont(function (ctx) {
	                computation({
	                    onSuccess: ctx.onSuccess,
	                    onCancel: ctx.onCancel,
	                    cancelToken: ctx.cancelToken,
	                    trampoline: ctx.trampoline,
	                    onError: function onError(ex) {
	                        return catchHandler(ex)(ctx);
	                    }
	                });
	            });
	        };
	
	        AsyncBuilder.prototype.Using = function Using(resource, binder) {
	            return this.TryFinally(binder(resource), function () {
	                return resource.Dispose();
	            });
	        };
	
	        AsyncBuilder.prototype.While = function While(guard, computation) {
	            var _this5 = this;
	
	            if (guard()) return this.Bind(computation, function () {
	                return _this5.While(guard, computation);
	            });else return this.Return(Nothing);
	        };
	
	        AsyncBuilder.prototype.Zero = function Zero() {
	            return AsyncImpl.protectedCont(function (ctx) {
	                return ctx.onSuccess(Nothing);
	            });
	        };
	
	        return AsyncBuilder;
	    }();
	
	    var defaultAsyncBuilder = exports.defaultAsyncBuilder = new AsyncBuilder();
	
	    var Async = exports.Async = function () {
	        function Async() {
	            _classCallCheck(this, Async);
	        }
	
	        Async.awaitPromise = function awaitPromise(p) {
	            return Async.fromContinuations(function (conts) {
	                return p.then(conts[0]).catch(function (err) {
	                    return (err == "cancelled" ? conts[2] : conts[1])(err);
	                });
	            });
	        };
	
	        Async.catch = function _catch(work) {
	            return AsyncImpl.protectedCont(function (ctx) {
	                work({
	                    onSuccess: function onSuccess(x) {
	                        return ctx.onSuccess(Choice.Choice1Of2(x));
	                    },
	                    onError: function onError(ex) {
	                        return ctx.onSuccess(Choice.Choice2Of2(ex));
	                    },
	                    onCancel: ctx.onCancel,
	                    cancelToken: ctx.cancelToken,
	                    trampoline: ctx.trampoline
	                });
	            });
	        };
	
	        Async.fromContinuations = function fromContinuations(f) {
	            return AsyncImpl.protectedCont(function (ctx) {
	                return f([ctx.onSuccess, ctx.onError, ctx.onCancel]);
	            });
	        };
	
	        Async.ignore = function ignore(computation) {
	            return AsyncImpl.bind(computation, function (x) {
	                return AsyncImpl.return(Nothing);
	            });
	        };
	
	        Async.parallel = function parallel(computations) {
	            return Async.awaitPromise(Promise.all(Seq.map(function (w) {
	                return Async.startAsPromise(w);
	            }, computations)));
	        };
	
	        Async.sleep = function sleep(millisecondsDueTime) {
	            return AsyncImpl.protectedCont(function (ctx) {
	                setTimeout(function () {
	                    return ctx.cancelToken.isCancelled ? ctx.onCancel("cancelled") : ctx.onSuccess(Nothing);
	                }, millisecondsDueTime);
	            });
	        };
	
	        Async.start = function start(computation, cancellationToken) {
	            return Async.startWithContinuations(computation, cancellationToken);
	        };
	
	        Async.emptyContinuation = function emptyContinuation(x) {
	            // NOP
	        };
	
	        Async.startWithContinuations = function startWithContinuations(computation, continuation, exceptionContinuation, cancellationContinuation, cancelToken) {
	            if (typeof continuation !== "function") {
	                cancelToken = continuation;
	                continuation = null;
	            }
	            var trampoline = new Trampoline();
	            computation({
	                onSuccess: continuation ? continuation : Async.emptyContinuation,
	                onError: exceptionContinuation ? exceptionContinuation : Async.emptyContinuation,
	                onCancel: cancellationContinuation ? cancellationContinuation : Async.emptyContinuation,
	                cancelToken: cancelToken ? cancelToken : Async.defaultCancellationToken,
	                trampoline: trampoline
	            });
	        };
	
	        Async.startAsPromise = function startAsPromise(computation, cancellationToken) {
	            return new Promise(function (resolve, reject) {
	                return Async.startWithContinuations(computation, resolve, reject, reject, cancellationToken ? cancellationToken : Async.defaultCancellationToken);
	            });
	        };
	
	        _createClass(Async, null, [{
	            key: "cancellationToken",
	            get: function get() {
	                return AsyncImpl.protectedCont(function (ctx) {
	                    return ctx.onSuccess(ctx.cancelToken);
	                });
	            }
	        }]);
	
	        return Async;
	    }();
	
	    Async.defaultCancellationToken = {
	        isCancelled: false
	    };
	    Async.startImmediate = Async.start;
	
	    var QueueCell = function QueueCell(message) {
	        _classCallCheck(this, QueueCell);
	
	        this.value = message;
	    };
	
	    var MailboxQueue = function () {
	        function MailboxQueue() {
	            _classCallCheck(this, MailboxQueue);
	        }
	
	        MailboxQueue.prototype.add = function add(message) {
	            var itCell = new QueueCell(message);
	            if (this.firstAndLast) {
	                this.firstAndLast[1].next = itCell;
	                this.firstAndLast = [this.firstAndLast[0], itCell];
	            } else this.firstAndLast = [itCell, itCell];
	        };
	
	        MailboxQueue.prototype.tryGet = function tryGet() {
	            if (this.firstAndLast) {
	                var value = this.firstAndLast[0].value;
	                if (this.firstAndLast[0].next) this.firstAndLast = [this.firstAndLast[0].next, this.firstAndLast[1]];else delete this.firstAndLast;
	                return value;
	            }
	            return void 0;
	        };
	
	        return MailboxQueue;
	    }();
	
	    var MailboxProcessor = exports.MailboxProcessor = function () {
	        function MailboxProcessor(body, cancellationToken) {
	            _classCallCheck(this, MailboxProcessor);
	
	            this.body = body;
	            this.cancellationToken = cancellationToken || Async.defaultCancellationToken;
	            this.messages = new MailboxQueue();
	        }
	
	        MailboxProcessor.start = function start(body, cancellationToken) {
	            var mbox = new MailboxProcessor(body, cancellationToken);
	            mbox.start();
	            return mbox;
	        };
	
	        MailboxProcessor.prototype.__processEvents = function __processEvents() {
	            if (this.continuation) {
	                var value = this.messages.tryGet();
	                if (value) {
	                    var cont = this.continuation;
	                    delete this.continuation;
	                    cont(value);
	                }
	            }
	        };
	
	        MailboxProcessor.prototype.start = function start() {
	            Async.startImmediate(this.body(this), this.cancellationToken);
	        };
	
	        MailboxProcessor.prototype.receive = function receive() {
	            var _this6 = this;
	
	            return Async.fromContinuations(function (conts) {
	                if (_this6.continuation) throw "Receive can only be called once!";
	                _this6.continuation = conts[0];
	                _this6.__processEvents();
	            });
	        };
	
	        MailboxProcessor.prototype.post = function post(message) {
	            this.messages.add(message);
	            this.__processEvents();
	        };
	
	        MailboxProcessor.prototype.postAndAsyncReply = function postAndAsyncReply(buildMessage) {
	            var result = void 0;
	            var continuation = void 0;
	            function checkCompletion() {
	                if (result && continuation) continuation(result);
	            }
	            var reply = {
	                reply: function reply(res) {
	                    result = res;
	                    checkCompletion();
	                }
	            };
	            this.messages.add(buildMessage(reply));
	            this.__processEvents();
	            return Async.fromContinuations(function (conts) {
	                continuation = conts[0];
	                checkCompletion();
	            });
	        };
	
	        return MailboxProcessor;
	    }();
	
	    var Observer = function Observer(onNext, onError, onCompleted) {
	        _classCallCheck(this, Observer);
	
	        this.OnNext = onNext;
	        this.OnError = onError || function (e) {};
	        this.OnCompleted = onCompleted || function () {};
	    };
	
	    Util.setInterfaces(Observer.prototype, ["System.IObserver"]);
	
	    var Observable = function Observable(subscribe) {
	        _classCallCheck(this, Observable);
	
	        this.Subscribe = subscribe;
	    };
	
	    Util.setInterfaces(Observable.prototype, ["System.IObservable"]);
	
	    var FObservable = function () {
	        function FObservable() {
	            _classCallCheck(this, FObservable);
	        }
	
	        FObservable.__protect = function __protect(f, succeed, fail) {
	            try {
	                return succeed(f());
	            } catch (e) {
	                fail(e);
	            }
	        };
	
	        FObservable.add = function add(callback, source) {
	            source.Subscribe(new Observer(callback));
	        };
	
	        FObservable.choose = function choose(chooser, source) {
	            return new Observable(function (observer) {
	                return source.Subscribe(new Observer(function (t) {
	                    return FObservable.__protect(function () {
	                        return chooser(t);
	                    }, function (u) {
	                        if (u != null) observer.OnNext(u);
	                    }, observer.OnError);
	                }, observer.OnError, observer.OnCompleted));
	            });
	        };
	
	        FObservable.filter = function filter(predicate, source) {
	            return FObservable.choose(function (x) {
	                return predicate(x) ? x : null;
	            }, source);
	        };
	
	        FObservable.map = function map(mapping, source) {
	            return new Observable(function (observer) {
	                return source.Subscribe(new Observer(function (t) {
	                    FObservable.__protect(function () {
	                        return mapping(t);
	                    }, observer.OnNext, observer.OnError);
	                }, observer.OnError, observer.OnCompleted));
	            });
	        };
	
	        FObservable.merge = function merge(source1, source2) {
	            return new Observable(function (observer) {
	                var stopped = false,
	                    completed1 = false,
	                    completed2 = false;
	                var h1 = source1.Subscribe(new Observer(function (v) {
	                    if (!stopped) observer.OnNext(v);
	                }, function (e) {
	                    if (!stopped) {
	                        stopped = true;
	                        observer.OnError(e);
	                    }
	                }, function () {
	                    if (!stopped) {
	                        completed1 = true;
	                        if (completed2) {
	                            stopped = true;
	                            observer.OnCompleted();
	                        }
	                    }
	                }));
	                var h2 = source2.Subscribe(new Observer(function (v) {
	                    if (!stopped) {
	                        observer.OnNext(v);
	                    }
	                }, function (e) {
	                    if (!stopped) {
	                        stopped = true;
	                        observer.OnError(e);
	                    }
	                }, function () {
	                    if (!stopped) {
	                        completed2 = true;
	                        if (completed1) {
	                            stopped = true;
	                            observer.OnCompleted();
	                        }
	                    }
	                }));
	                return Util.createDisposable(function () {
	                    h1.Dispose();
	                    h2.Dispose();
	                });
	            });
	        };
	
	        FObservable.pairwise = function pairwise(source) {
	            return new Observable(function (observer) {
	                var last = null;
	                return source.Subscribe(new Observer(function (next) {
	                    if (last != null) observer.OnNext([last, next]);
	                    last = next;
	                }, observer.OnError, observer.OnCompleted));
	            });
	        };
	
	        FObservable.partition = function partition(predicate, source) {
	            return Tuple(FObservable.filter(predicate, source), FObservable.filter(function (x) {
	                return !predicate(x);
	            }, source));
	        };
	
	        FObservable.scan = function scan(collector, state, source) {
	            return new Observable(function (observer) {
	                return source.Subscribe(new Observer(function (t) {
	                    FObservable.__protect(function () {
	                        return collector(state, t);
	                    }, function (u) {
	                        state = u;observer.OnNext(u);
	                    }, observer.OnError);
	                }, observer.OnError, observer.OnCompleted));
	            });
	        };
	
	        FObservable.split = function split(splitter, source) {
	            return Tuple(FObservable.choose(function (v) {
	                return splitter(v).valueIfChoice1;
	            }, source), FObservable.choose(function (v) {
	                return splitter(v).valueIfChoice2;
	            }, source));
	        };
	
	        FObservable.subscribe = function subscribe(callback, source) {
	            return source.Subscribe(new Observer(callback));
	        };
	
	        return FObservable;
	    }();
	
	    exports.Observable = FObservable;
	
	    var Event = exports.Event = function () {
	        function Event(_subscriber, delegates) {
	            _classCallCheck(this, Event);
	
	            this._subscriber = _subscriber;
	            this.delegates = delegates || new Array();
	        }
	
	        Event.prototype.Add = function Add(f) {
	            this._addHandler(f);
	        };
	        // IEvent<T> methods
	
	
	        Event.prototype.Trigger = function Trigger(value) {
	            Seq.iterate(function (f) {
	                return f(value);
	            }, this.delegates);
	        };
	        // IDelegateEvent<T> methods
	
	
	        Event.prototype._addHandler = function _addHandler(f) {
	            this.delegates.push(f);
	        };
	
	        Event.prototype._removeHandler = function _removeHandler(f) {
	            var index = this.delegates.findIndex(function (el) {
	                return "" + el == "" + f;
	            }); // Special dedication to Chet Husk.
	            if (index > -1) this.delegates.splice(index, 1);
	        };
	
	        Event.prototype.AddHandler = function AddHandler(handler) {
	            this._addHandler(function (x) {
	                return handler(undefined, x);
	            });
	        };
	
	        Event.prototype.RemoveHandler = function RemoveHandler(handler) {
	            this._removeHandler(function (x) {
	                return handler(undefined, x);
	            });
	        };
	        // IObservable<T> methods
	
	
	        Event.prototype._subscribeFromObserver = function _subscribeFromObserver(observer) {
	            var _this7 = this;
	
	            if (this._subscriber) return this._subscriber(observer);
	            var callback = observer.OnNext;
	            this._addHandler(callback);
	            return Util.createDisposable(function () {
	                return _this7._removeHandler(callback);
	            });
	        };
	
	        Event.prototype._subscribeFromCallback = function _subscribeFromCallback(callback) {
	            var _this8 = this;
	
	            this._addHandler(callback);
	            return Util.createDisposable(function () {
	                return _this8._removeHandler(callback);
	            });
	        };
	
	        Event.prototype.Subscribe = function Subscribe(arg) {
	            return typeof arg == "function" ? this._subscribeFromCallback(arg) : this._subscribeFromObserver(arg);
	        };
	
	        Event.add = function add(callback, sourceEvent) {
	            sourceEvent.Subscribe(new Observer(callback));
	        };
	
	        Event.choose = function choose(chooser, sourceEvent) {
	            var source = sourceEvent;
	            return new Event(function (observer) {
	                return source.Subscribe(new Observer(function (t) {
	                    return FObservable.__protect(function () {
	                        return chooser(t);
	                    }, function (u) {
	                        if (u != null) observer.OnNext(u);
	                    }, observer.OnError);
	                }, observer.OnError, observer.OnCompleted));
	            }, source.delegates);
	        };
	
	        Event.filter = function filter(predicate, sourceEvent) {
	            return Event.choose(function (x) {
	                return predicate(x) ? x : null;
	            }, sourceEvent);
	        };
	
	        Event.map = function map(mapping, sourceEvent) {
	            var source = sourceEvent;
	            return new Event(function (observer) {
	                return source.Subscribe(new Observer(function (t) {
	                    return FObservable.__protect(function () {
	                        return mapping(t);
	                    }, observer.OnNext, observer.OnError);
	                }, observer.OnError, observer.OnCompleted));
	            }, source.delegates);
	        };
	
	        Event.merge = function merge(event1, event2) {
	            var source1 = event1;
	            var source2 = event2;
	            return new Event(function (observer) {
	                var stopped = false,
	                    completed1 = false,
	                    completed2 = false;
	                var h1 = source1.Subscribe(new Observer(function (v) {
	                    if (!stopped) observer.OnNext(v);
	                }, function (e) {
	                    if (!stopped) {
	                        stopped = true;
	                        observer.OnError(e);
	                    }
	                }, function () {
	                    if (!stopped) {
	                        completed1 = true;
	                        if (completed2) {
	                            stopped = true;
	                            observer.OnCompleted();
	                        }
	                    }
	                }));
	                var h2 = source2.Subscribe(new Observer(function (v) {
	                    if (!stopped) observer.OnNext(v);
	                }, function (e) {
	                    if (!stopped) {
	                        stopped = true;
	                        observer.OnError(e);
	                    }
	                }, function () {
	                    if (!stopped) {
	                        completed2 = true;
	                        if (completed1) {
	                            stopped = true;
	                            observer.OnCompleted();
	                        }
	                    }
	                }));
	                return Util.createDisposable(function () {
	                    h1.Dispose();
	                    h2.Dispose();
	                });
	            }, source1.delegates.concat(source2.delegates));
	        };
	
	        Event.pairwise = function pairwise(sourceEvent) {
	            var source = sourceEvent;
	            return new Event(function (observer) {
	                var last = null;
	                return source.Subscribe(new Observer(function (next) {
	                    if (last != null) observer.OnNext([last, next]);
	                    last = next;
	                }, observer.OnError, observer.OnCompleted));
	            }, source.delegates);
	        };
	
	        Event.partition = function partition(predicate, sourceEvent) {
	            return Tuple(Event.filter(predicate, sourceEvent), Event.filter(function (x) {
	                return !predicate(x);
	            }, sourceEvent));
	        };
	
	        Event.scan = function scan(collector, state, sourceEvent) {
	            var source = sourceEvent;
	            return new Event(function (observer) {
	                return source.Subscribe(new Observer(function (t) {
	                    FObservable.__protect(function () {
	                        return collector(state, t);
	                    }, function (u) {
	                        state = u;observer.OnNext(u);
	                    }, observer.OnError);
	                }, observer.OnError, observer.OnCompleted));
	            }, source.delegates);
	        };
	
	        Event.split = function split(splitter, sourceEvent) {
	            return Tuple(Event.choose(function (v) {
	                return splitter(v).valueIfChoice1;
	            }, sourceEvent), Event.choose(function (v) {
	                return splitter(v).valueIfChoice2;
	            }, sourceEvent));
	        };
	
	        _createClass(Event, [{
	            key: "Publish",
	            get: function get() {
	                return this;
	            }
	        }]);
	
	        return Event;
	    }();
	
	    var Lazy = exports.Lazy = function () {
	        function Lazy(factory) {
	            _classCallCheck(this, Lazy);
	
	            this.factory = factory;
	            this.isValueCreated = false;
	        }
	
	        Lazy.createFromValue = function createFromValue(v) {
	            return new Lazy(function () {
	                return v;
	            });
	        };
	
	        _createClass(Lazy, [{
	            key: "value",
	            get: function get() {
	                if (!this.isValueCreated) {
	                    this.createdValue = this.factory();
	                    this.isValueCreated = true;
	                }
	                return this.createdValue;
	            }
	        }]);
	
	        return Lazy;
	    }();
	});
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(1), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (exports, _fableCore, _virtualDom) {
	    "use strict";
	
	    Object.defineProperty(exports, "__esModule", {
	        value: true
	    });
	    exports.App = exports.Html = undefined;
	    exports.createTree = createTree;
	    exports.render = render;
	    exports.renderer = renderer;
	
	    var _createClass = function () {
	        function defineProperties(target, props) {
	            for (var i = 0; i < props.length; i++) {
	                var descriptor = props[i];
	                descriptor.enumerable = descriptor.enumerable || false;
	                descriptor.configurable = true;
	                if ("value" in descriptor) descriptor.writable = true;
	                Object.defineProperty(target, descriptor.key, descriptor);
	            }
	        }
	
	        return function (Constructor, protoProps, staticProps) {
	            if (protoProps) defineProperties(Constructor.prototype, protoProps);
	            if (staticProps) defineProperties(Constructor, staticProps);
	            return Constructor;
	        };
	    }();
	
	    function _classCallCheck(instance, Constructor) {
	        if (!(instance instanceof Constructor)) {
	            throw new TypeError("Cannot call a class as a function");
	        }
	    }
	
	    var Html = exports.Html = function ($exports) {
	        var Types = $exports.Types = function ($exports) {
	            var Attribute = $exports.Attribute = function Attribute(caseName, fields) {
	                _classCallCheck(this, Attribute);
	
	                this.Case = caseName;
	                this.Fields = fields;
	            };
	
	            _fableCore.Util.setInterfaces(Attribute.prototype, ["FSharpUnion"], "Fable.Helpers.Virtualdom.Html.Types.Attribute");
	
	            var DomNode = $exports.DomNode = function DomNode(caseName, fields) {
	                _classCallCheck(this, DomNode);
	
	                this.Case = caseName;
	                this.Fields = fields;
	            };
	
	            _fableCore.Util.setInterfaces(DomNode.prototype, ["FSharpUnion"], "Fable.Helpers.Virtualdom.Html.Types.DomNode");
	
	            return $exports;
	        }({});
	
	        var mapEventHandler = $exports.mapEventHandler = function mapEventHandler(mapping, e, f) {
	            return new Types.Attribute("EventHandler", [[e, function ($var1) {
	                return mapping(f($var1));
	            }]]);
	        };
	
	        var mapAttributes = $exports.mapAttributes = function mapAttributes(mapping, attribute) {
	            return attribute.Case === "Style" ? function () {
	                var s = attribute.Fields[0];
	                return new Types.Attribute("Style", [s]);
	            }() : attribute.Case === "Property" ? function () {
	                var kv = attribute.Fields[0];
	                return new Types.Attribute("Property", [kv]);
	            }() : attribute.Case === "Attribute" ? function () {
	                var kv = attribute.Fields[0];
	                return new Types.Attribute("Attribute", [kv]);
	            }() : function () {
	                var eb = attribute.Fields[0];
	                var e = eb[0];
	                var f = eb[1];
	                return mapEventHandler(mapping, e, f);
	            }();
	        };
	
	        var mapElem = $exports.mapElem = function mapElem(mapping, node_0, node_1) {
	            var node = [node_0, node_1];
	            var tag = node[0];
	            var attrs = node[1];
	            return [tag, _fableCore.List.map(function (attribute) {
	                return mapAttributes(mapping, attribute);
	            }, attrs)];
	        };
	
	        var mapVoidElem = $exports.mapVoidElem = function mapVoidElem(mapping, node_0, node_1) {
	            var node = [node_0, node_1];
	            var tag = node[0];
	            var attrs = node[1];
	            return [tag, _fableCore.List.map(function (attribute) {
	                return mapAttributes(mapping, attribute);
	            }, attrs)];
	        };
	
	        var map = $exports.map = function map(mapping, node) {
	            return node.Case === "VoidElement" ? function () {
	                var ve = node.Fields[0];
	                return new Types.DomNode("VoidElement", [function () {
	                    var arg10_ = ve[0];
	                    var arg11_ = ve[1];
	                    return mapVoidElem(mapping, arg10_, arg11_);
	                }()]);
	            }() : node.Case === "Text" ? function () {
	                var s = node.Fields[0];
	                return new Types.DomNode("Text", [s]);
	            }() : node.Case === "WhiteSpace" ? function () {
	                var ws = node.Fields[0];
	                return new Types.DomNode("WhiteSpace", [ws]);
	            }() : node.Case === "Svg" ? function () {
	                var ns = node.Fields[1];
	                var e = node.Fields[0];
	                return new Types.DomNode("Element", [function () {
	                    var arg10_ = e[0];
	                    var arg11_ = e[1];
	                    return mapElem(mapping, arg10_, arg11_);
	                }(), _fableCore.List.map(function (node_1) {
	                    return map(mapping, node_1);
	                }, ns)]);
	            }() : function () {
	                var ns = node.Fields[1];
	                var e = node.Fields[0];
	                return new Types.DomNode("Element", [function () {
	                    var arg10_ = e[0];
	                    var arg11_ = e[1];
	                    return mapElem(mapping, arg10_, arg11_);
	                }(), _fableCore.List.map(function (node_1) {
	                    return map(mapping, node_1);
	                }, ns)]);
	            }();
	        };
	
	        var Tags = $exports.Tags = function ($exports) {
	            return $exports;
	        }({});
	
	        var Attributes = $exports.Attributes = function ($exports) {
	            return $exports;
	        }({});
	
	        var Events = $exports.Events = function ($exports) {
	            return $exports;
	        }({});
	
	        var Svg = $exports.Svg = function ($exports) {
	            var svgNS = $exports.svgNS = function svgNS() {
	                return new Types.Attribute("Property", [["namespace", "http://www.w3.org/2000/svg"]]);
	            };
	
	            return $exports;
	        }({});
	
	        return $exports;
	    }({});
	
	    var App = exports.App = function ($exports) {
	        var mapAction = $exports.mapAction = function mapAction(mapping, action, x) {
	            action(function ($var2) {
	                return x(mapping($var2));
	            });
	        };
	
	        var mapActions = $exports.mapActions = function mapActions(m) {
	            var mapping = function mapping(action) {
	                return function (x) {
	                    mapAction(m, action, x);
	                };
	            };
	
	            return function (list) {
	                return _fableCore.List.map(mapping, list);
	            };
	        };
	
	        var toActionList = $exports.toActionList = function toActionList(a) {
	            return _fableCore.List.ofArray([a]);
	        };
	
	        var AppEvents = $exports.AppEvents = function () {
	            function AppEvents(caseName, fields) {
	                _classCallCheck(this, AppEvents);
	
	                this.Case = caseName;
	                this.Fields = fields;
	            }
	
	            _createClass(AppEvents, [{
	                key: "Equals",
	                value: function Equals(other) {
	                    return _fableCore.Util.equalsUnions(this, other);
	                }
	            }, {
	                key: "CompareTo",
	                value: function CompareTo(other) {
	                    return _fableCore.Util.compareUnions(this, other);
	                }
	            }]);
	
	            return AppEvents;
	        }();
	
	        _fableCore.Util.setInterfaces(AppEvents.prototype, ["FSharpUnion", "System.IEquatable", "System.IComparable"], "Fable.Helpers.Virtualdom.App.AppEvents");
	
	        var RenderState = $exports.RenderState = function () {
	            function RenderState(caseName, fields) {
	                _classCallCheck(this, RenderState);
	
	                this.Case = caseName;
	                this.Fields = fields;
	            }
	
	            _createClass(RenderState, [{
	                key: "Equals",
	                value: function Equals(other) {
	                    return _fableCore.Util.equalsUnions(this, other);
	                }
	            }, {
	                key: "CompareTo",
	                value: function CompareTo(other) {
	                    return _fableCore.Util.compareUnions(this, other);
	                }
	            }]);
	
	            return RenderState;
	        }();
	
	        _fableCore.Util.setInterfaces(RenderState.prototype, ["FSharpUnion", "System.IEquatable", "System.IComparable"], "Fable.Helpers.Virtualdom.App.RenderState");
	
	        var App = $exports.App = function App(model, view, update, initMessage, actions, producers, node, currentTree, subscribers, nodeSelector, renderState) {
	            _classCallCheck(this, App);
	
	            this.Model = model;
	            this.View = view;
	            this.Update = update;
	            this.InitMessage = initMessage;
	            this.Actions = actions;
	            this.Producers = producers;
	            this.Node = node;
	            this.CurrentTree = currentTree;
	            this.Subscribers = subscribers;
	            this.NodeSelector = nodeSelector;
	            this.RenderState = renderState;
	        };
	
	        _fableCore.Util.setInterfaces(App.prototype, ["FSharpRecord"], "Fable.Helpers.Virtualdom.App.App");
	
	        var ScheduleMessage = $exports.ScheduleMessage = function ScheduleMessage(caseName, fields) {
	            _classCallCheck(this, ScheduleMessage);
	
	            this.Case = caseName;
	            this.Fields = fields;
	        };
	
	        _fableCore.Util.setInterfaces(ScheduleMessage.prototype, ["FSharpUnion"], "Fable.Helpers.Virtualdom.App.ScheduleMessage");
	
	        var AppMessage = $exports.AppMessage = function AppMessage(caseName, fields) {
	            _classCallCheck(this, AppMessage);
	
	            this.Case = caseName;
	            this.Fields = fields;
	        };
	
	        _fableCore.Util.setInterfaces(AppMessage.prototype, ["FSharpUnion"], "Fable.Helpers.Virtualdom.App.AppMessage");
	
	        var Renderer = $exports.Renderer = function Renderer(render, diff, patch, createElement) {
	            _classCallCheck(this, Renderer);
	
	            this.Render = render;
	            this.Diff = diff;
	            this.Patch = patch;
	            this.CreateElement = createElement;
	        };
	
	        _fableCore.Util.setInterfaces(Renderer.prototype, ["FSharpRecord"], "Fable.Helpers.Virtualdom.App.Renderer");
	
	        var createApp = $exports.createApp = function createApp(model, view, update) {
	            var NodeSelector = null;
	            var InitMessage = null;
	            var Producers = new _fableCore.List();
	
	            var Subscribers = _fableCore.Map.create(null, new _fableCore.GenericComparer(function (x, y) {
	                return x < y ? -1 : x > y ? 1 : 0;
	            }));
	
	            var CurrentTree = null;
	            var RenderState_1 = new RenderState("NoRequest", []);
	            return new App(model, view, update, InitMessage, new _fableCore.List(), Producers, null, CurrentTree, Subscribers, NodeSelector, RenderState_1);
	        };
	
	        var createSimpleApp = $exports.createSimpleApp = function createSimpleApp(model, view, update) {
	            return createApp(model, view, function (x) {
	                return function (y) {
	                    return [update(x)(y), new _fableCore.List()];
	                };
	            });
	        };
	
	        var withStartNodeSelector = $exports.withStartNodeSelector = function withStartNodeSelector(selector, app) {
	            var NodeSelector = selector;
	            return new App(app.Model, app.View, app.Update, app.InitMessage, app.Actions, app.Producers, app.Node, app.CurrentTree, app.Subscribers, NodeSelector, app.RenderState);
	        };
	
	        var withInitMessage = $exports.withInitMessage = function withInitMessage(msg, app) {
	            var InitMessage = msg;
	            return new App(app.Model, app.View, app.Update, InitMessage, app.Actions, app.Producers, app.Node, app.CurrentTree, app.Subscribers, app.NodeSelector, app.RenderState);
	        };
	
	        var withProducer = $exports.withProducer = function withProducer(p, app) {
	            var Producers = _fableCore.List.ofArray([p], app.Producers);
	
	            return new App(app.Model, app.View, app.Update, app.InitMessage, app.Actions, Producers, app.Node, app.CurrentTree, app.Subscribers, app.NodeSelector, app.RenderState);
	        };
	
	        var withSubscriber = $exports.withSubscriber = function withSubscriber(subscriberId, subscriber, app) {
	            var subsribers = function (table) {
	                return _fableCore.Map.add(subscriberId, subscriber, table);
	            }(app.Subscribers);
	
	            return new App(app.Model, app.View, app.Update, app.InitMessage, app.Actions, app.Producers, app.Node, app.CurrentTree, subsribers, app.NodeSelector, app.RenderState);
	        };
	
	        var createScheduler = $exports.createScheduler = function createScheduler() {
	            return _fableCore.MailboxProcessor.start(function (inbox) {
	                var loop = function loop(unitVar0) {
	                    return function (builder_) {
	                        return builder_.Delay(function (unitVar) {
	                            return builder_.Bind(inbox.receive(), function (_arg1) {
	                                var message = _arg1;
	                                var milliseconds = message.Fields[0];
	                                var cb = message.Fields[1];
	                                window.setTimeout(cb, milliseconds);
	                                return builder_.ReturnFrom(loop());
	                            });
	                        });
	                    }(_fableCore.defaultAsyncBuilder);
	                };
	
	                return loop();
	            });
	        };
	
	        var createFirstLoopState = $exports.createFirstLoopState = function createFirstLoopState(renderTree, startElem, post, renderer, state) {
	            var tree = renderTree(state.View)(post)(state.Model);
	            var rootNode = renderer.CreateElement(tree);
	            startElem.appendChild(rootNode);
	            {
	                var matchValue = state.InitMessage;
	
	                if (matchValue != null) {
	                    var init = matchValue;
	                    init(post);
	                }
	            }
	            var CurrentTree = tree;
	            var _Node = rootNode;
	            return new App(state.Model, state.View, state.Update, state.InitMessage, state.Actions, state.Producers, _Node, CurrentTree, state.Subscribers, state.NodeSelector, state.RenderState);
	        };
	
	        var handleMessage = $exports.handleMessage = function handleMessage(msg, notify, schedule, state) {
	            notify(state.Subscribers)(new AppEvents("ActionReceived", [msg]));
	            var patternInput = state.Update(state.Model)(msg);
	            var model_ = patternInput[0];
	            var actions = patternInput[1];
	
	            var renderState = function () {
	                var matchValue = state.RenderState;
	
	                if (matchValue.Case === "InProgress") {
	                    return new RenderState("InProgress", []);
	                } else {
	                    schedule();
	                    return new RenderState("InProgress", []);
	                }
	            }();
	
	            var Actions = _fableCore.List.append(state.Actions, actions);
	
	            return new App(model_, state.View, state.Update, state.InitMessage, Actions, state.Producers, state.Node, state.CurrentTree, state.Subscribers, state.NodeSelector, renderState);
	        };
	
	        var handleDraw = $exports.handleDraw = function handleDraw(renderTree, renderer, post, notify, rootNode, currentTree, state) {
	            var matchValue = state.RenderState;
	
	            if (matchValue.Case === "NoRequest") {
	                throw "Shouldn't happen";
	            } else {
	                notify(state.Subscribers)(new AppEvents("DrawStarted", []));
	                var model = state.Model;
	                var tree = renderTree(state.View)(post)(model);
	                var patches = renderer.Diff(currentTree)(tree);
	                renderer.Patch(rootNode)(patches);
	
	                _fableCore.Seq.iterate(function (i) {
	                    i(post);
	                }, state.Actions);
	
	                notify(state.Subscribers)(new AppEvents("ModelChanged", [model, state.Model]));
	                var RenderState_1 = new RenderState("NoRequest", []);
	                var CurrentTree = tree;
	                var Actions = new _fableCore.List();
	                return new App(state.Model, state.View, state.Update, state.InitMessage, Actions, state.Producers, state.Node, CurrentTree, state.Subscribers, state.NodeSelector, RenderState_1);
	            }
	        };
	
	        var start = $exports.start = function start(renderer, app) {
	            var renderTree = function renderTree(view) {
	                return function (handler) {
	                    return function (model) {
	                        return renderer.Render(handler)(view(model));
	                    };
	                };
	            };
	
	            var startElem = function () {
	                var matchValue = app.NodeSelector;
	
	                if (matchValue != null) {
	                    var sel = matchValue;
	                    return document.body.querySelector(sel);
	                } else {
	                    return document.body;
	                }
	            }();
	
	            var scheduler = createScheduler();
	            return _fableCore.MailboxProcessor.start(function (inbox) {
	                var post = function post(message) {
	                    inbox.post(new AppMessage("Message", [message]));
	                };
	
	                var notifySubscribers = function notifySubscribers(subs) {
	                    return function (model) {
	                        _fableCore.Map.iterate(function (key, handler) {
	                            handler(model);
	                        }, subs);
	                    };
	                };
	
	                _fableCore.Seq.iterate(function (p) {
	                    p(post);
	                }, app.Producers);
	
	                var schedule = function schedule(unitVar0) {
	                    scheduler.post(new ScheduleMessage("PingIn", [1000 / 60, function (unitVar0_1) {
	                        inbox.post(new AppMessage("Draw", []));
	                    }]));
	                };
	
	                var loop = function loop(state) {
	                    return function (builder_) {
	                        return builder_.Delay(function (unitVar) {
	                            var matchValue = [state.Node, state.CurrentTree];
	
	                            if (matchValue[0] != null) {
	                                if (matchValue[1] != null) {
	                                    var currentTree = matchValue[1];
	                                    var rootNode = matchValue[0];
	                                    return builder_.Bind(inbox.receive(), function (_arg1) {
	                                        var message = _arg1;
	
	                                        if (message.Case === "Message") {
	                                            var msg = message.Fields[0];
	                                            var state_ = handleMessage(msg, notifySubscribers, schedule, state);
	                                            return builder_.ReturnFrom(loop(state_));
	                                        } else {
	                                            if (message.Case === "Draw") {
	                                                var state_ = handleDraw(renderTree, renderer, post, notifySubscribers, rootNode, currentTree, state);
	                                                return builder_.ReturnFrom(loop(state_));
	                                            } else {
	                                                return builder_.ReturnFrom(loop(state));
	                                            }
	                                        }
	                                    });
	                                } else {
	                                    throw "Shouldn't happen";
	                                    return builder_.Zero();
	                                }
	                            } else {
	                                var state_ = createFirstLoopState(renderTree, startElem, post, renderer, state);
	                                return builder_.ReturnFrom(loop(state_));
	                            }
	                        });
	                    }(_fableCore.defaultAsyncBuilder);
	                };
	
	                return loop(app);
	            });
	        };
	
	        return $exports;
	    }({});
	
	    function createTree(handler, tag, attributes, children) {
	        var toAttrs = function toAttrs(attrs) {
	            var elAttributes = function (_arg2) {
	                return _arg2.tail == null ? null : function () {
	                    var v = _arg2;
	                    return ["attributes", _fableCore.Util.createObj(v)];
	                }();
	            }(_fableCore.List.choose(function (x) {
	                return x;
	            }, _fableCore.List.map(function (_arg1) {
	                return _arg1.Case === "Attribute" ? function () {
	                    var v = _arg1.Fields[0][1];
	                    var k = _arg1.Fields[0][0];
	                    return [k, v];
	                }() : null;
	            }, attrs)));
	
	            var props = _fableCore.List.map(function (_arg4) {
	                return _arg4.Case === "Style" ? function () {
	                    var style = _arg4.Fields[0];
	                    return ["style", _fableCore.Util.createObj(style)];
	                }() : _arg4.Case === "Property" ? function () {
	                    var v = _arg4.Fields[0][1];
	                    var k = _arg4.Fields[0][0];
	                    return [k, v];
	                }() : _arg4.Case === "EventHandler" ? function () {
	                    var f = _arg4.Fields[0][1];
	                    var ev = _arg4.Fields[0][0];
	                    return [ev, function ($var3) {
	                        return handler(f($var3));
	                    }];
	                }() : function () {
	                    throw "Shouldn't happen";
	                }();
	            }, _fableCore.List.filter(function (_arg3) {
	                return _arg3.Case === "Attribute" ? false : true;
	            }, attrs));
	
	            return _fableCore.Util.createObj(elAttributes != null ? function () {
	                var x = elAttributes;
	                return _fableCore.List.ofArray([x], props);
	            }() : props);
	        };
	
	        var elem = (0, _virtualDom.h)(tag, toAttrs(attributes), Array.from(children));
	        return elem;
	    }
	
	    function render(handler, node) {
	        var $target0 = function $target0(attrs, nodes, tag) {
	            return createTree(handler, tag, attrs, _fableCore.List.map(function (node_1) {
	                return render(handler, node_1);
	            }, nodes));
	        };
	
	        if (node.Case === "Svg") {
	            return $target0(node.Fields[0][1], node.Fields[1], node.Fields[0][0]);
	        } else {
	            if (node.Case === "VoidElement") {
	                var tag = node.Fields[0][0];
	                var attrs = node.Fields[0][1];
	                return createTree(handler, tag, attrs, new _fableCore.List());
	            } else {
	                if (node.Case === "Text") {
	                    var str = node.Fields[0];
	                    return str;
	                } else {
	                    if (node.Case === "WhiteSpace") {
	                        var str = node.Fields[0];
	                        return str;
	                    } else {
	                        return $target0(node.Fields[0][1], node.Fields[1], node.Fields[0][0]);
	                    }
	                }
	            }
	        }
	    }
	
	    function renderer() {
	        return new App.Renderer(function (handler) {
	            return function (node) {
	                return render(handler, node);
	            };
	        }, function (tree1) {
	            return function (tree2) {
	                return (0, _virtualDom.diff)(tree1, tree2);
	            };
	        }, function (node) {
	            return function (patches) {
	                return (0, _virtualDom.patch)(node, patches);
	            };
	        }, function (e) {
	            return (0, _virtualDom.create)(e);
	        });
	    }
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var diff = __webpack_require__(4)
	var patch = __webpack_require__(17)
	var h = __webpack_require__(26)
	var create = __webpack_require__(37)
	var VNode = __webpack_require__(28)
	var VText = __webpack_require__(29)
	
	module.exports = {
	    diff: diff,
	    patch: patch,
	    h: h,
	    create: create,
	    VNode: VNode,
	    VText: VText
	}


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var diff = __webpack_require__(5)
	
	module.exports = diff


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(6)
	
	var VPatch = __webpack_require__(7)
	var isVNode = __webpack_require__(9)
	var isVText = __webpack_require__(10)
	var isWidget = __webpack_require__(11)
	var isThunk = __webpack_require__(12)
	var handleThunk = __webpack_require__(13)
	
	var diffProps = __webpack_require__(14)
	
	module.exports = diff
	
	function diff(a, b) {
	    var patch = { a: a }
	    walk(a, b, patch, 0)
	    return patch
	}
	
	function walk(a, b, patch, index) {
	    if (a === b) {
	        return
	    }
	
	    var apply = patch[index]
	    var applyClear = false
	
	    if (isThunk(a) || isThunk(b)) {
	        thunks(a, b, patch, index)
	    } else if (b == null) {
	
	        // If a is a widget we will add a remove patch for it
	        // Otherwise any child widgets/hooks must be destroyed.
	        // This prevents adding two remove patches for a widget.
	        if (!isWidget(a)) {
	            clearState(a, patch, index)
	            apply = patch[index]
	        }
	
	        apply = appendPatch(apply, new VPatch(VPatch.REMOVE, a, b))
	    } else if (isVNode(b)) {
	        if (isVNode(a)) {
	            if (a.tagName === b.tagName &&
	                a.namespace === b.namespace &&
	                a.key === b.key) {
	                var propsPatch = diffProps(a.properties, b.properties)
	                if (propsPatch) {
	                    apply = appendPatch(apply,
	                        new VPatch(VPatch.PROPS, a, propsPatch))
	                }
	                apply = diffChildren(a, b, patch, apply, index)
	            } else {
	                apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b))
	                applyClear = true
	            }
	        } else {
	            apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b))
	            applyClear = true
	        }
	    } else if (isVText(b)) {
	        if (!isVText(a)) {
	            apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b))
	            applyClear = true
	        } else if (a.text !== b.text) {
	            apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b))
	        }
	    } else if (isWidget(b)) {
	        if (!isWidget(a)) {
	            applyClear = true
	        }
	
	        apply = appendPatch(apply, new VPatch(VPatch.WIDGET, a, b))
	    }
	
	    if (apply) {
	        patch[index] = apply
	    }
	
	    if (applyClear) {
	        clearState(a, patch, index)
	    }
	}
	
	function diffChildren(a, b, patch, apply, index) {
	    var aChildren = a.children
	    var orderedSet = reorder(aChildren, b.children)
	    var bChildren = orderedSet.children
	
	    var aLen = aChildren.length
	    var bLen = bChildren.length
	    var len = aLen > bLen ? aLen : bLen
	
	    for (var i = 0; i < len; i++) {
	        var leftNode = aChildren[i]
	        var rightNode = bChildren[i]
	        index += 1
	
	        if (!leftNode) {
	            if (rightNode) {
	                // Excess nodes in b need to be added
	                apply = appendPatch(apply,
	                    new VPatch(VPatch.INSERT, null, rightNode))
	            }
	        } else {
	            walk(leftNode, rightNode, patch, index)
	        }
	
	        if (isVNode(leftNode) && leftNode.count) {
	            index += leftNode.count
	        }
	    }
	
	    if (orderedSet.moves) {
	        // Reorder nodes last
	        apply = appendPatch(apply, new VPatch(
	            VPatch.ORDER,
	            a,
	            orderedSet.moves
	        ))
	    }
	
	    return apply
	}
	
	function clearState(vNode, patch, index) {
	    // TODO: Make this a single walk, not two
	    unhook(vNode, patch, index)
	    destroyWidgets(vNode, patch, index)
	}
	
	// Patch records for all destroyed widgets must be added because we need
	// a DOM node reference for the destroy function
	function destroyWidgets(vNode, patch, index) {
	    if (isWidget(vNode)) {
	        if (typeof vNode.destroy === "function") {
	            patch[index] = appendPatch(
	                patch[index],
	                new VPatch(VPatch.REMOVE, vNode, null)
	            )
	        }
	    } else if (isVNode(vNode) && (vNode.hasWidgets || vNode.hasThunks)) {
	        var children = vNode.children
	        var len = children.length
	        for (var i = 0; i < len; i++) {
	            var child = children[i]
	            index += 1
	
	            destroyWidgets(child, patch, index)
	
	            if (isVNode(child) && child.count) {
	                index += child.count
	            }
	        }
	    } else if (isThunk(vNode)) {
	        thunks(vNode, null, patch, index)
	    }
	}
	
	// Create a sub-patch for thunks
	function thunks(a, b, patch, index) {
	    var nodes = handleThunk(a, b)
	    var thunkPatch = diff(nodes.a, nodes.b)
	    if (hasPatches(thunkPatch)) {
	        patch[index] = new VPatch(VPatch.THUNK, null, thunkPatch)
	    }
	}
	
	function hasPatches(patch) {
	    for (var index in patch) {
	        if (index !== "a") {
	            return true
	        }
	    }
	
	    return false
	}
	
	// Execute hooks when two nodes are identical
	function unhook(vNode, patch, index) {
	    if (isVNode(vNode)) {
	        if (vNode.hooks) {
	            patch[index] = appendPatch(
	                patch[index],
	                new VPatch(
	                    VPatch.PROPS,
	                    vNode,
	                    undefinedKeys(vNode.hooks)
	                )
	            )
	        }
	
	        if (vNode.descendantHooks || vNode.hasThunks) {
	            var children = vNode.children
	            var len = children.length
	            for (var i = 0; i < len; i++) {
	                var child = children[i]
	                index += 1
	
	                unhook(child, patch, index)
	
	                if (isVNode(child) && child.count) {
	                    index += child.count
	                }
	            }
	        }
	    } else if (isThunk(vNode)) {
	        thunks(vNode, null, patch, index)
	    }
	}
	
	function undefinedKeys(obj) {
	    var result = {}
	
	    for (var key in obj) {
	        result[key] = undefined
	    }
	
	    return result
	}
	
	// List diff, naive left to right reordering
	function reorder(aChildren, bChildren) {
	    // O(M) time, O(M) memory
	    var bChildIndex = keyIndex(bChildren)
	    var bKeys = bChildIndex.keys
	    var bFree = bChildIndex.free
	
	    if (bFree.length === bChildren.length) {
	        return {
	            children: bChildren,
	            moves: null
	        }
	    }
	
	    // O(N) time, O(N) memory
	    var aChildIndex = keyIndex(aChildren)
	    var aKeys = aChildIndex.keys
	    var aFree = aChildIndex.free
	
	    if (aFree.length === aChildren.length) {
	        return {
	            children: bChildren,
	            moves: null
	        }
	    }
	
	    // O(MAX(N, M)) memory
	    var newChildren = []
	
	    var freeIndex = 0
	    var freeCount = bFree.length
	    var deletedItems = 0
	
	    // Iterate through a and match a node in b
	    // O(N) time,
	    for (var i = 0 ; i < aChildren.length; i++) {
	        var aItem = aChildren[i]
	        var itemIndex
	
	        if (aItem.key) {
	            if (bKeys.hasOwnProperty(aItem.key)) {
	                // Match up the old keys
	                itemIndex = bKeys[aItem.key]
	                newChildren.push(bChildren[itemIndex])
	
	            } else {
	                // Remove old keyed items
	                itemIndex = i - deletedItems++
	                newChildren.push(null)
	            }
	        } else {
	            // Match the item in a with the next free item in b
	            if (freeIndex < freeCount) {
	                itemIndex = bFree[freeIndex++]
	                newChildren.push(bChildren[itemIndex])
	            } else {
	                // There are no free items in b to match with
	                // the free items in a, so the extra free nodes
	                // are deleted.
	                itemIndex = i - deletedItems++
	                newChildren.push(null)
	            }
	        }
	    }
	
	    var lastFreeIndex = freeIndex >= bFree.length ?
	        bChildren.length :
	        bFree[freeIndex]
	
	    // Iterate through b and append any new keys
	    // O(M) time
	    for (var j = 0; j < bChildren.length; j++) {
	        var newItem = bChildren[j]
	
	        if (newItem.key) {
	            if (!aKeys.hasOwnProperty(newItem.key)) {
	                // Add any new keyed items
	                // We are adding new items to the end and then sorting them
	                // in place. In future we should insert new items in place.
	                newChildren.push(newItem)
	            }
	        } else if (j >= lastFreeIndex) {
	            // Add any leftover non-keyed items
	            newChildren.push(newItem)
	        }
	    }
	
	    var simulate = newChildren.slice()
	    var simulateIndex = 0
	    var removes = []
	    var inserts = []
	    var simulateItem
	
	    for (var k = 0; k < bChildren.length;) {
	        var wantedItem = bChildren[k]
	        simulateItem = simulate[simulateIndex]
	
	        // remove items
	        while (simulateItem === null && simulate.length) {
	            removes.push(remove(simulate, simulateIndex, null))
	            simulateItem = simulate[simulateIndex]
	        }
	
	        if (!simulateItem || simulateItem.key !== wantedItem.key) {
	            // if we need a key in this position...
	            if (wantedItem.key) {
	                if (simulateItem && simulateItem.key) {
	                    // if an insert doesn't put this key in place, it needs to move
	                    if (bKeys[simulateItem.key] !== k + 1) {
	                        removes.push(remove(simulate, simulateIndex, simulateItem.key))
	                        simulateItem = simulate[simulateIndex]
	                        // if the remove didn't put the wanted item in place, we need to insert it
	                        if (!simulateItem || simulateItem.key !== wantedItem.key) {
	                            inserts.push({key: wantedItem.key, to: k})
	                        }
	                        // items are matching, so skip ahead
	                        else {
	                            simulateIndex++
	                        }
	                    }
	                    else {
	                        inserts.push({key: wantedItem.key, to: k})
	                    }
	                }
	                else {
	                    inserts.push({key: wantedItem.key, to: k})
	                }
	                k++
	            }
	            // a key in simulate has no matching wanted key, remove it
	            else if (simulateItem && simulateItem.key) {
	                removes.push(remove(simulate, simulateIndex, simulateItem.key))
	            }
	        }
	        else {
	            simulateIndex++
	            k++
	        }
	    }
	
	    // remove all the remaining nodes from simulate
	    while(simulateIndex < simulate.length) {
	        simulateItem = simulate[simulateIndex]
	        removes.push(remove(simulate, simulateIndex, simulateItem && simulateItem.key))
	    }
	
	    // If the only moves we have are deletes then we can just
	    // let the delete patch remove these items.
	    if (removes.length === deletedItems && !inserts.length) {
	        return {
	            children: newChildren,
	            moves: null
	        }
	    }
	
	    return {
	        children: newChildren,
	        moves: {
	            removes: removes,
	            inserts: inserts
	        }
	    }
	}
	
	function remove(arr, index, key) {
	    arr.splice(index, 1)
	
	    return {
	        from: index,
	        key: key
	    }
	}
	
	function keyIndex(children) {
	    var keys = {}
	    var free = []
	    var length = children.length
	
	    for (var i = 0; i < length; i++) {
	        var child = children[i]
	
	        if (child.key) {
	            keys[child.key] = i
	        } else {
	            free.push(i)
	        }
	    }
	
	    return {
	        keys: keys,     // A hash of key name to index
	        free: free      // An array of unkeyed item indices
	    }
	}
	
	function appendPatch(apply, patch) {
	    if (apply) {
	        if (isArray(apply)) {
	            apply.push(patch)
	        } else {
	            apply = [apply, patch]
	        }
	
	        return apply
	    } else {
	        return patch
	    }
	}


/***/ },
/* 6 */
/***/ function(module, exports) {

	var nativeIsArray = Array.isArray
	var toString = Object.prototype.toString
	
	module.exports = nativeIsArray || isArray
	
	function isArray(obj) {
	    return toString.call(obj) === "[object Array]"
	}


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var version = __webpack_require__(8)
	
	VirtualPatch.NONE = 0
	VirtualPatch.VTEXT = 1
	VirtualPatch.VNODE = 2
	VirtualPatch.WIDGET = 3
	VirtualPatch.PROPS = 4
	VirtualPatch.ORDER = 5
	VirtualPatch.INSERT = 6
	VirtualPatch.REMOVE = 7
	VirtualPatch.THUNK = 8
	
	module.exports = VirtualPatch
	
	function VirtualPatch(type, vNode, patch) {
	    this.type = Number(type)
	    this.vNode = vNode
	    this.patch = patch
	}
	
	VirtualPatch.prototype.version = version
	VirtualPatch.prototype.type = "VirtualPatch"


/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = "2"


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var version = __webpack_require__(8)
	
	module.exports = isVirtualNode
	
	function isVirtualNode(x) {
	    return x && x.type === "VirtualNode" && x.version === version
	}


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var version = __webpack_require__(8)
	
	module.exports = isVirtualText
	
	function isVirtualText(x) {
	    return x && x.type === "VirtualText" && x.version === version
	}


/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = isWidget
	
	function isWidget(w) {
	    return w && w.type === "Widget"
	}


/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = isThunk
	
	function isThunk(t) {
	    return t && t.type === "Thunk"
	}


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var isVNode = __webpack_require__(9)
	var isVText = __webpack_require__(10)
	var isWidget = __webpack_require__(11)
	var isThunk = __webpack_require__(12)
	
	module.exports = handleThunk
	
	function handleThunk(a, b) {
	    var renderedA = a
	    var renderedB = b
	
	    if (isThunk(b)) {
	        renderedB = renderThunk(b, a)
	    }
	
	    if (isThunk(a)) {
	        renderedA = renderThunk(a, null)
	    }
	
	    return {
	        a: renderedA,
	        b: renderedB
	    }
	}
	
	function renderThunk(thunk, previous) {
	    var renderedThunk = thunk.vnode
	
	    if (!renderedThunk) {
	        renderedThunk = thunk.vnode = thunk.render(previous)
	    }
	
	    if (!(isVNode(renderedThunk) ||
	            isVText(renderedThunk) ||
	            isWidget(renderedThunk))) {
	        throw new Error("thunk did not return a valid node");
	    }
	
	    return renderedThunk
	}


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(15)
	var isHook = __webpack_require__(16)
	
	module.exports = diffProps
	
	function diffProps(a, b) {
	    var diff
	
	    for (var aKey in a) {
	        if (!(aKey in b)) {
	            diff = diff || {}
	            diff[aKey] = undefined
	        }
	
	        var aValue = a[aKey]
	        var bValue = b[aKey]
	
	        if (aValue === bValue) {
	            continue
	        } else if (isObject(aValue) && isObject(bValue)) {
	            if (getPrototype(bValue) !== getPrototype(aValue)) {
	                diff = diff || {}
	                diff[aKey] = bValue
	            } else if (isHook(bValue)) {
	                 diff = diff || {}
	                 diff[aKey] = bValue
	            } else {
	                var objectDiff = diffProps(aValue, bValue)
	                if (objectDiff) {
	                    diff = diff || {}
	                    diff[aKey] = objectDiff
	                }
	            }
	        } else {
	            diff = diff || {}
	            diff[aKey] = bValue
	        }
	    }
	
	    for (var bKey in b) {
	        if (!(bKey in a)) {
	            diff = diff || {}
	            diff[bKey] = b[bKey]
	        }
	    }
	
	    return diff
	}
	
	function getPrototype(value) {
	  if (Object.getPrototypeOf) {
	    return Object.getPrototypeOf(value)
	  } else if (value.__proto__) {
	    return value.__proto__
	  } else if (value.constructor) {
	    return value.constructor.prototype
	  }
	}


/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function isObject(x) {
		return typeof x === "object" && x !== null;
	};


/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = isHook
	
	function isHook(hook) {
	    return hook &&
	      (typeof hook.hook === "function" && !hook.hasOwnProperty("hook") ||
	       typeof hook.unhook === "function" && !hook.hasOwnProperty("unhook"))
	}


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var patch = __webpack_require__(18)
	
	module.exports = patch


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var document = __webpack_require__(19)
	var isArray = __webpack_require__(6)
	
	var render = __webpack_require__(21)
	var domIndex = __webpack_require__(23)
	var patchOp = __webpack_require__(24)
	module.exports = patch
	
	function patch(rootNode, patches, renderOptions) {
	    renderOptions = renderOptions || {}
	    renderOptions.patch = renderOptions.patch && renderOptions.patch !== patch
	        ? renderOptions.patch
	        : patchRecursive
	    renderOptions.render = renderOptions.render || render
	
	    return renderOptions.patch(rootNode, patches, renderOptions)
	}
	
	function patchRecursive(rootNode, patches, renderOptions) {
	    var indices = patchIndices(patches)
	
	    if (indices.length === 0) {
	        return rootNode
	    }
	
	    var index = domIndex(rootNode, patches.a, indices)
	    var ownerDocument = rootNode.ownerDocument
	
	    if (!renderOptions.document && ownerDocument !== document) {
	        renderOptions.document = ownerDocument
	    }
	
	    for (var i = 0; i < indices.length; i++) {
	        var nodeIndex = indices[i]
	        rootNode = applyPatch(rootNode,
	            index[nodeIndex],
	            patches[nodeIndex],
	            renderOptions)
	    }
	
	    return rootNode
	}
	
	function applyPatch(rootNode, domNode, patchList, renderOptions) {
	    if (!domNode) {
	        return rootNode
	    }
	
	    var newNode
	
	    if (isArray(patchList)) {
	        for (var i = 0; i < patchList.length; i++) {
	            newNode = patchOp(patchList[i], domNode, renderOptions)
	
	            if (domNode === rootNode) {
	                rootNode = newNode
	            }
	        }
	    } else {
	        newNode = patchOp(patchList, domNode, renderOptions)
	
	        if (domNode === rootNode) {
	            rootNode = newNode
	        }
	    }
	
	    return rootNode
	}
	
	function patchIndices(patches) {
	    var indices = []
	
	    for (var key in patches) {
	        if (key !== "a") {
	            indices.push(Number(key))
	        }
	    }
	
	    return indices
	}


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var topLevel = typeof global !== 'undefined' ? global :
	    typeof window !== 'undefined' ? window : {}
	var minDoc = __webpack_require__(20);
	
	if (typeof document !== 'undefined') {
	    module.exports = document;
	} else {
	    var doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];
	
	    if (!doccy) {
	        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
	    }
	
	    module.exports = doccy;
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 20 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var document = __webpack_require__(19)
	
	var applyProperties = __webpack_require__(22)
	
	var isVNode = __webpack_require__(9)
	var isVText = __webpack_require__(10)
	var isWidget = __webpack_require__(11)
	var handleThunk = __webpack_require__(13)
	
	module.exports = createElement
	
	function createElement(vnode, opts) {
	    var doc = opts ? opts.document || document : document
	    var warn = opts ? opts.warn : null
	
	    vnode = handleThunk(vnode).a
	
	    if (isWidget(vnode)) {
	        return vnode.init()
	    } else if (isVText(vnode)) {
	        return doc.createTextNode(vnode.text)
	    } else if (!isVNode(vnode)) {
	        if (warn) {
	            warn("Item is not a valid virtual dom node", vnode)
	        }
	        return null
	    }
	
	    var node = (vnode.namespace === null) ?
	        doc.createElement(vnode.tagName) :
	        doc.createElementNS(vnode.namespace, vnode.tagName)
	
	    var props = vnode.properties
	    applyProperties(node, props)
	
	    var children = vnode.children
	
	    for (var i = 0; i < children.length; i++) {
	        var childNode = createElement(children[i], opts)
	        if (childNode) {
	            node.appendChild(childNode)
	        }
	    }
	
	    return node
	}


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(15)
	var isHook = __webpack_require__(16)
	
	module.exports = applyProperties
	
	function applyProperties(node, props, previous) {
	    for (var propName in props) {
	        var propValue = props[propName]
	
	        if (propValue === undefined) {
	            removeProperty(node, propName, propValue, previous);
	        } else if (isHook(propValue)) {
	            removeProperty(node, propName, propValue, previous)
	            if (propValue.hook) {
	                propValue.hook(node,
	                    propName,
	                    previous ? previous[propName] : undefined)
	            }
	        } else {
	            if (isObject(propValue)) {
	                patchObject(node, props, previous, propName, propValue);
	            } else {
	                node[propName] = propValue
	            }
	        }
	    }
	}
	
	function removeProperty(node, propName, propValue, previous) {
	    if (previous) {
	        var previousValue = previous[propName]
	
	        if (!isHook(previousValue)) {
	            if (propName === "attributes") {
	                for (var attrName in previousValue) {
	                    node.removeAttribute(attrName)
	                }
	            } else if (propName === "style") {
	                for (var i in previousValue) {
	                    node.style[i] = ""
	                }
	            } else if (typeof previousValue === "string") {
	                node[propName] = ""
	            } else {
	                node[propName] = null
	            }
	        } else if (previousValue.unhook) {
	            previousValue.unhook(node, propName, propValue)
	        }
	    }
	}
	
	function patchObject(node, props, previous, propName, propValue) {
	    var previousValue = previous ? previous[propName] : undefined
	
	    // Set attributes
	    if (propName === "attributes") {
	        for (var attrName in propValue) {
	            var attrValue = propValue[attrName]
	
	            if (attrValue === undefined) {
	                node.removeAttribute(attrName)
	            } else {
	                node.setAttribute(attrName, attrValue)
	            }
	        }
	
	        return
	    }
	
	    if(previousValue && isObject(previousValue) &&
	        getPrototype(previousValue) !== getPrototype(propValue)) {
	        node[propName] = propValue
	        return
	    }
	
	    if (!isObject(node[propName])) {
	        node[propName] = {}
	    }
	
	    var replacer = propName === "style" ? "" : undefined
	
	    for (var k in propValue) {
	        var value = propValue[k]
	        node[propName][k] = (value === undefined) ? replacer : value
	    }
	}
	
	function getPrototype(value) {
	    if (Object.getPrototypeOf) {
	        return Object.getPrototypeOf(value)
	    } else if (value.__proto__) {
	        return value.__proto__
	    } else if (value.constructor) {
	        return value.constructor.prototype
	    }
	}


/***/ },
/* 23 */
/***/ function(module, exports) {

	// Maps a virtual DOM tree onto a real DOM tree in an efficient manner.
	// We don't want to read all of the DOM nodes in the tree so we use
	// the in-order tree indexing to eliminate recursion down certain branches.
	// We only recurse into a DOM node if we know that it contains a child of
	// interest.
	
	var noChild = {}
	
	module.exports = domIndex
	
	function domIndex(rootNode, tree, indices, nodes) {
	    if (!indices || indices.length === 0) {
	        return {}
	    } else {
	        indices.sort(ascending)
	        return recurse(rootNode, tree, indices, nodes, 0)
	    }
	}
	
	function recurse(rootNode, tree, indices, nodes, rootIndex) {
	    nodes = nodes || {}
	
	
	    if (rootNode) {
	        if (indexInRange(indices, rootIndex, rootIndex)) {
	            nodes[rootIndex] = rootNode
	        }
	
	        var vChildren = tree.children
	
	        if (vChildren) {
	
	            var childNodes = rootNode.childNodes
	
	            for (var i = 0; i < tree.children.length; i++) {
	                rootIndex += 1
	
	                var vChild = vChildren[i] || noChild
	                var nextIndex = rootIndex + (vChild.count || 0)
	
	                // skip recursion down the tree if there are no nodes down here
	                if (indexInRange(indices, rootIndex, nextIndex)) {
	                    recurse(childNodes[i], vChild, indices, nodes, rootIndex)
	                }
	
	                rootIndex = nextIndex
	            }
	        }
	    }
	
	    return nodes
	}
	
	// Binary search for an index in the interval [left, right]
	function indexInRange(indices, left, right) {
	    if (indices.length === 0) {
	        return false
	    }
	
	    var minIndex = 0
	    var maxIndex = indices.length - 1
	    var currentIndex
	    var currentItem
	
	    while (minIndex <= maxIndex) {
	        currentIndex = ((maxIndex + minIndex) / 2) >> 0
	        currentItem = indices[currentIndex]
	
	        if (minIndex === maxIndex) {
	            return currentItem >= left && currentItem <= right
	        } else if (currentItem < left) {
	            minIndex = currentIndex + 1
	        } else  if (currentItem > right) {
	            maxIndex = currentIndex - 1
	        } else {
	            return true
	        }
	    }
	
	    return false;
	}
	
	function ascending(a, b) {
	    return a > b ? 1 : -1
	}


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var applyProperties = __webpack_require__(22)
	
	var isWidget = __webpack_require__(11)
	var VPatch = __webpack_require__(7)
	
	var updateWidget = __webpack_require__(25)
	
	module.exports = applyPatch
	
	function applyPatch(vpatch, domNode, renderOptions) {
	    var type = vpatch.type
	    var vNode = vpatch.vNode
	    var patch = vpatch.patch
	
	    switch (type) {
	        case VPatch.REMOVE:
	            return removeNode(domNode, vNode)
	        case VPatch.INSERT:
	            return insertNode(domNode, patch, renderOptions)
	        case VPatch.VTEXT:
	            return stringPatch(domNode, vNode, patch, renderOptions)
	        case VPatch.WIDGET:
	            return widgetPatch(domNode, vNode, patch, renderOptions)
	        case VPatch.VNODE:
	            return vNodePatch(domNode, vNode, patch, renderOptions)
	        case VPatch.ORDER:
	            reorderChildren(domNode, patch)
	            return domNode
	        case VPatch.PROPS:
	            applyProperties(domNode, patch, vNode.properties)
	            return domNode
	        case VPatch.THUNK:
	            return replaceRoot(domNode,
	                renderOptions.patch(domNode, patch, renderOptions))
	        default:
	            return domNode
	    }
	}
	
	function removeNode(domNode, vNode) {
	    var parentNode = domNode.parentNode
	
	    if (parentNode) {
	        parentNode.removeChild(domNode)
	    }
	
	    destroyWidget(domNode, vNode);
	
	    return null
	}
	
	function insertNode(parentNode, vNode, renderOptions) {
	    var newNode = renderOptions.render(vNode, renderOptions)
	
	    if (parentNode) {
	        parentNode.appendChild(newNode)
	    }
	
	    return parentNode
	}
	
	function stringPatch(domNode, leftVNode, vText, renderOptions) {
	    var newNode
	
	    if (domNode.nodeType === 3) {
	        domNode.replaceData(0, domNode.length, vText.text)
	        newNode = domNode
	    } else {
	        var parentNode = domNode.parentNode
	        newNode = renderOptions.render(vText, renderOptions)
	
	        if (parentNode && newNode !== domNode) {
	            parentNode.replaceChild(newNode, domNode)
	        }
	    }
	
	    return newNode
	}
	
	function widgetPatch(domNode, leftVNode, widget, renderOptions) {
	    var updating = updateWidget(leftVNode, widget)
	    var newNode
	
	    if (updating) {
	        newNode = widget.update(leftVNode, domNode) || domNode
	    } else {
	        newNode = renderOptions.render(widget, renderOptions)
	    }
	
	    var parentNode = domNode.parentNode
	
	    if (parentNode && newNode !== domNode) {
	        parentNode.replaceChild(newNode, domNode)
	    }
	
	    if (!updating) {
	        destroyWidget(domNode, leftVNode)
	    }
	
	    return newNode
	}
	
	function vNodePatch(domNode, leftVNode, vNode, renderOptions) {
	    var parentNode = domNode.parentNode
	    var newNode = renderOptions.render(vNode, renderOptions)
	
	    if (parentNode && newNode !== domNode) {
	        parentNode.replaceChild(newNode, domNode)
	    }
	
	    return newNode
	}
	
	function destroyWidget(domNode, w) {
	    if (typeof w.destroy === "function" && isWidget(w)) {
	        w.destroy(domNode)
	    }
	}
	
	function reorderChildren(domNode, moves) {
	    var childNodes = domNode.childNodes
	    var keyMap = {}
	    var node
	    var remove
	    var insert
	
	    for (var i = 0; i < moves.removes.length; i++) {
	        remove = moves.removes[i]
	        node = childNodes[remove.from]
	        if (remove.key) {
	            keyMap[remove.key] = node
	        }
	        domNode.removeChild(node)
	    }
	
	    var length = childNodes.length
	    for (var j = 0; j < moves.inserts.length; j++) {
	        insert = moves.inserts[j]
	        node = keyMap[insert.key]
	        // this is the weirdest bug i've ever seen in webkit
	        domNode.insertBefore(node, insert.to >= length++ ? null : childNodes[insert.to])
	    }
	}
	
	function replaceRoot(oldRoot, newRoot) {
	    if (oldRoot && newRoot && oldRoot !== newRoot && oldRoot.parentNode) {
	        oldRoot.parentNode.replaceChild(newRoot, oldRoot)
	    }
	
	    return newRoot;
	}


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var isWidget = __webpack_require__(11)
	
	module.exports = updateWidget
	
	function updateWidget(a, b) {
	    if (isWidget(a) && isWidget(b)) {
	        if ("name" in a && "name" in b) {
	            return a.id === b.id
	        } else {
	            return a.init === b.init
	        }
	    }
	
	    return false
	}


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var h = __webpack_require__(27)
	
	module.exports = h


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var isArray = __webpack_require__(6);
	
	var VNode = __webpack_require__(28);
	var VText = __webpack_require__(29);
	var isVNode = __webpack_require__(9);
	var isVText = __webpack_require__(10);
	var isWidget = __webpack_require__(11);
	var isHook = __webpack_require__(16);
	var isVThunk = __webpack_require__(12);
	
	var parseTag = __webpack_require__(30);
	var softSetHook = __webpack_require__(32);
	var evHook = __webpack_require__(33);
	
	module.exports = h;
	
	function h(tagName, properties, children) {
	    var childNodes = [];
	    var tag, props, key, namespace;
	
	    if (!children && isChildren(properties)) {
	        children = properties;
	        props = {};
	    }
	
	    props = props || properties || {};
	    tag = parseTag(tagName, props);
	
	    // support keys
	    if (props.hasOwnProperty('key')) {
	        key = props.key;
	        props.key = undefined;
	    }
	
	    // support namespace
	    if (props.hasOwnProperty('namespace')) {
	        namespace = props.namespace;
	        props.namespace = undefined;
	    }
	
	    // fix cursor bug
	    if (tag === 'INPUT' &&
	        !namespace &&
	        props.hasOwnProperty('value') &&
	        props.value !== undefined &&
	        !isHook(props.value)
	    ) {
	        props.value = softSetHook(props.value);
	    }
	
	    transformProperties(props);
	
	    if (children !== undefined && children !== null) {
	        addChild(children, childNodes, tag, props);
	    }
	
	
	    return new VNode(tag, props, childNodes, key, namespace);
	}
	
	function addChild(c, childNodes, tag, props) {
	    if (typeof c === 'string') {
	        childNodes.push(new VText(c));
	    } else if (typeof c === 'number') {
	        childNodes.push(new VText(String(c)));
	    } else if (isChild(c)) {
	        childNodes.push(c);
	    } else if (isArray(c)) {
	        for (var i = 0; i < c.length; i++) {
	            addChild(c[i], childNodes, tag, props);
	        }
	    } else if (c === null || c === undefined) {
	        return;
	    } else {
	        throw UnexpectedVirtualElement({
	            foreignObject: c,
	            parentVnode: {
	                tagName: tag,
	                properties: props
	            }
	        });
	    }
	}
	
	function transformProperties(props) {
	    for (var propName in props) {
	        if (props.hasOwnProperty(propName)) {
	            var value = props[propName];
	
	            if (isHook(value)) {
	                continue;
	            }
	
	            if (propName.substr(0, 3) === 'ev-') {
	                // add ev-foo support
	                props[propName] = evHook(value);
	            }
	        }
	    }
	}
	
	function isChild(x) {
	    return isVNode(x) || isVText(x) || isWidget(x) || isVThunk(x);
	}
	
	function isChildren(x) {
	    return typeof x === 'string' || isArray(x) || isChild(x);
	}
	
	function UnexpectedVirtualElement(data) {
	    var err = new Error();
	
	    err.type = 'virtual-hyperscript.unexpected.virtual-element';
	    err.message = 'Unexpected virtual child passed to h().\n' +
	        'Expected a VNode / Vthunk / VWidget / string but:\n' +
	        'got:\n' +
	        errorString(data.foreignObject) +
	        '.\n' +
	        'The parent vnode is:\n' +
	        errorString(data.parentVnode)
	        '\n' +
	        'Suggested fix: change your `h(..., [ ... ])` callsite.';
	    err.foreignObject = data.foreignObject;
	    err.parentVnode = data.parentVnode;
	
	    return err;
	}
	
	function errorString(obj) {
	    try {
	        return JSON.stringify(obj, null, '    ');
	    } catch (e) {
	        return String(obj);
	    }
	}


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var version = __webpack_require__(8)
	var isVNode = __webpack_require__(9)
	var isWidget = __webpack_require__(11)
	var isThunk = __webpack_require__(12)
	var isVHook = __webpack_require__(16)
	
	module.exports = VirtualNode
	
	var noProperties = {}
	var noChildren = []
	
	function VirtualNode(tagName, properties, children, key, namespace) {
	    this.tagName = tagName
	    this.properties = properties || noProperties
	    this.children = children || noChildren
	    this.key = key != null ? String(key) : undefined
	    this.namespace = (typeof namespace === "string") ? namespace : null
	
	    var count = (children && children.length) || 0
	    var descendants = 0
	    var hasWidgets = false
	    var hasThunks = false
	    var descendantHooks = false
	    var hooks
	
	    for (var propName in properties) {
	        if (properties.hasOwnProperty(propName)) {
	            var property = properties[propName]
	            if (isVHook(property) && property.unhook) {
	                if (!hooks) {
	                    hooks = {}
	                }
	
	                hooks[propName] = property
	            }
	        }
	    }
	
	    for (var i = 0; i < count; i++) {
	        var child = children[i]
	        if (isVNode(child)) {
	            descendants += child.count || 0
	
	            if (!hasWidgets && child.hasWidgets) {
	                hasWidgets = true
	            }
	
	            if (!hasThunks && child.hasThunks) {
	                hasThunks = true
	            }
	
	            if (!descendantHooks && (child.hooks || child.descendantHooks)) {
	                descendantHooks = true
	            }
	        } else if (!hasWidgets && isWidget(child)) {
	            if (typeof child.destroy === "function") {
	                hasWidgets = true
	            }
	        } else if (!hasThunks && isThunk(child)) {
	            hasThunks = true;
	        }
	    }
	
	    this.count = count + descendants
	    this.hasWidgets = hasWidgets
	    this.hasThunks = hasThunks
	    this.hooks = hooks
	    this.descendantHooks = descendantHooks
	}
	
	VirtualNode.prototype.version = version
	VirtualNode.prototype.type = "VirtualNode"


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var version = __webpack_require__(8)
	
	module.exports = VirtualText
	
	function VirtualText(text) {
	    this.text = String(text)
	}
	
	VirtualText.prototype.version = version
	VirtualText.prototype.type = "VirtualText"


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var split = __webpack_require__(31);
	
	var classIdSplit = /([\.#]?[a-zA-Z0-9\u007F-\uFFFF_:-]+)/;
	var notClassId = /^\.|#/;
	
	module.exports = parseTag;
	
	function parseTag(tag, props) {
	    if (!tag) {
	        return 'DIV';
	    }
	
	    var noId = !(props.hasOwnProperty('id'));
	
	    var tagParts = split(tag, classIdSplit);
	    var tagName = null;
	
	    if (notClassId.test(tagParts[1])) {
	        tagName = 'DIV';
	    }
	
	    var classes, part, type, i;
	
	    for (i = 0; i < tagParts.length; i++) {
	        part = tagParts[i];
	
	        if (!part) {
	            continue;
	        }
	
	        type = part.charAt(0);
	
	        if (!tagName) {
	            tagName = part;
	        } else if (type === '.') {
	            classes = classes || [];
	            classes.push(part.substring(1, part.length));
	        } else if (type === '#' && noId) {
	            props.id = part.substring(1, part.length);
	        }
	    }
	
	    if (classes) {
	        if (props.className) {
	            classes.push(props.className);
	        }
	
	        props.className = classes.join(' ');
	    }
	
	    return props.namespace ? tagName : tagName.toUpperCase();
	}


/***/ },
/* 31 */
/***/ function(module, exports) {

	/*!
	 * Cross-Browser Split 1.1.1
	 * Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
	 * Available under the MIT License
	 * ECMAScript compliant, uniform cross-browser split method
	 */
	
	/**
	 * Splits a string into an array of strings using a regex or string separator. Matches of the
	 * separator are not included in the result array. However, if `separator` is a regex that contains
	 * capturing groups, backreferences are spliced into the result each time `separator` is matched.
	 * Fixes browser bugs compared to the native `String.prototype.split` and can be used reliably
	 * cross-browser.
	 * @param {String} str String to split.
	 * @param {RegExp|String} separator Regex or string to use for separating the string.
	 * @param {Number} [limit] Maximum number of items to include in the result array.
	 * @returns {Array} Array of substrings.
	 * @example
	 *
	 * // Basic use
	 * split('a b c d', ' ');
	 * // -> ['a', 'b', 'c', 'd']
	 *
	 * // With limit
	 * split('a b c d', ' ', 2);
	 * // -> ['a', 'b']
	 *
	 * // Backreferences in result array
	 * split('..word1 word2..', /([a-z]+)(\d+)/i);
	 * // -> ['..', 'word', '1', ' ', 'word', '2', '..']
	 */
	module.exports = (function split(undef) {
	
	  var nativeSplit = String.prototype.split,
	    compliantExecNpcg = /()??/.exec("")[1] === undef,
	    // NPCG: nonparticipating capturing group
	    self;
	
	  self = function(str, separator, limit) {
	    // If `separator` is not a regex, use `nativeSplit`
	    if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
	      return nativeSplit.call(str, separator, limit);
	    }
	    var output = [],
	      flags = (separator.ignoreCase ? "i" : "") + (separator.multiline ? "m" : "") + (separator.extended ? "x" : "") + // Proposed for ES6
	      (separator.sticky ? "y" : ""),
	      // Firefox 3+
	      lastLastIndex = 0,
	      // Make `global` and avoid `lastIndex` issues by working with a copy
	      separator = new RegExp(separator.source, flags + "g"),
	      separator2, match, lastIndex, lastLength;
	    str += ""; // Type-convert
	    if (!compliantExecNpcg) {
	      // Doesn't need flags gy, but they don't hurt
	      separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags);
	    }
	    /* Values for `limit`, per the spec:
	     * If undefined: 4294967295 // Math.pow(2, 32) - 1
	     * If 0, Infinity, or NaN: 0
	     * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
	     * If negative number: 4294967296 - Math.floor(Math.abs(limit))
	     * If other: Type-convert, then use the above rules
	     */
	    limit = limit === undef ? -1 >>> 0 : // Math.pow(2, 32) - 1
	    limit >>> 0; // ToUint32(limit)
	    while (match = separator.exec(str)) {
	      // `separator.lastIndex` is not reliable cross-browser
	      lastIndex = match.index + match[0].length;
	      if (lastIndex > lastLastIndex) {
	        output.push(str.slice(lastLastIndex, match.index));
	        // Fix browsers whose `exec` methods don't consistently return `undefined` for
	        // nonparticipating capturing groups
	        if (!compliantExecNpcg && match.length > 1) {
	          match[0].replace(separator2, function() {
	            for (var i = 1; i < arguments.length - 2; i++) {
	              if (arguments[i] === undef) {
	                match[i] = undef;
	              }
	            }
	          });
	        }
	        if (match.length > 1 && match.index < str.length) {
	          Array.prototype.push.apply(output, match.slice(1));
	        }
	        lastLength = match[0].length;
	        lastLastIndex = lastIndex;
	        if (output.length >= limit) {
	          break;
	        }
	      }
	      if (separator.lastIndex === match.index) {
	        separator.lastIndex++; // Avoid an infinite loop
	      }
	    }
	    if (lastLastIndex === str.length) {
	      if (lastLength || !separator.test("")) {
	        output.push("");
	      }
	    } else {
	      output.push(str.slice(lastLastIndex));
	    }
	    return output.length > limit ? output.slice(0, limit) : output;
	  };
	
	  return self;
	})();


/***/ },
/* 32 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = SoftSetHook;
	
	function SoftSetHook(value) {
	    if (!(this instanceof SoftSetHook)) {
	        return new SoftSetHook(value);
	    }
	
	    this.value = value;
	}
	
	SoftSetHook.prototype.hook = function (node, propertyName) {
	    if (node[propertyName] !== this.value) {
	        node[propertyName] = this.value;
	    }
	};


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var EvStore = __webpack_require__(34);
	
	module.exports = EvHook;
	
	function EvHook(value) {
	    if (!(this instanceof EvHook)) {
	        return new EvHook(value);
	    }
	
	    this.value = value;
	}
	
	EvHook.prototype.hook = function (node, propertyName) {
	    var es = EvStore(node);
	    var propName = propertyName.substr(3);
	
	    es[propName] = this.value;
	};
	
	EvHook.prototype.unhook = function(node, propertyName) {
	    var es = EvStore(node);
	    var propName = propertyName.substr(3);
	
	    es[propName] = undefined;
	};


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var OneVersionConstraint = __webpack_require__(35);
	
	var MY_VERSION = '7';
	OneVersionConstraint('ev-store', MY_VERSION);
	
	var hashKey = '__EV_STORE_KEY@' + MY_VERSION;
	
	module.exports = EvStore;
	
	function EvStore(elem) {
	    var hash = elem[hashKey];
	
	    if (!hash) {
	        hash = elem[hashKey] = {};
	    }
	
	    return hash;
	}


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Individual = __webpack_require__(36);
	
	module.exports = OneVersion;
	
	function OneVersion(moduleName, version, defaultValue) {
	    var key = '__INDIVIDUAL_ONE_VERSION_' + moduleName;
	    var enforceKey = key + '_ENFORCE_SINGLETON';
	
	    var versionValue = Individual(enforceKey, version);
	
	    if (versionValue !== version) {
	        throw new Error('Can only have one copy of ' +
	            moduleName + '.\n' +
	            'You already have version ' + versionValue +
	            ' installed.\n' +
	            'This means you cannot install version ' + version);
	    }
	
	    return Individual(key, defaultValue);
	}


/***/ },
/* 36 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	/*global window, global*/
	
	var root = typeof window !== 'undefined' ?
	    window : typeof global !== 'undefined' ?
	    global : {};
	
	module.exports = Individual;
	
	function Individual(key, value) {
	    if (key in root) {
	        return root[key];
	    }
	
	    root[key] = value;
	
	    return value;
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var createElement = __webpack_require__(21)
	
	module.exports = createElement


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map