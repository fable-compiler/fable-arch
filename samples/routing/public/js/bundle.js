(function (exports,virtualDom) {
'use strict';

function unwrapExports (x) {
	return x && x.__esModule ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _global = createCommonjsModule(function (module) {
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
});

var _core = createCommonjsModule(function (module) {
var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
});

var _aFunction = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

// optional / simple context binding
var aFunction = _aFunction;
var _ctx = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

var _isObject = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var isObject = _isObject;
var _anObject = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

var _fails = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var _descriptors = !_fails(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

var isObject$1 = _isObject;
var document$1 = _global.document;
var is = isObject$1(document$1) && isObject$1(document$1.createElement);
var _domCreate = function(it){
  return is ? document$1.createElement(it) : {};
};

var _ie8DomDefine = !_descriptors && !_fails(function(){
  return Object.defineProperty(_domCreate('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject$2 = _isObject;
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive = function(it, S){
  if(!isObject$2(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject$2(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject$2(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject$2(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

var anObject       = _anObject;
var IE8_DOM_DEFINE = _ie8DomDefine;
var toPrimitive    = _toPrimitive;
var dP$1             = Object.defineProperty;

var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP$1(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

var _objectDp = {
	f: f
};

var _propertyDesc = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

var dP         = _objectDp;
var createDesc = _propertyDesc;
var _hide = _descriptors ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

var global$1    = _global;
var core      = _core;
var ctx       = _ctx;
var hide      = _hide;
var PROTOTYPE = 'prototype';

var $export$1 = function(type, name, source){
  var IS_FORCED = type & $export$1.F
    , IS_GLOBAL = type & $export$1.G
    , IS_STATIC = type & $export$1.S
    , IS_PROTO  = type & $export$1.P
    , IS_BIND   = type & $export$1.B
    , IS_WRAP   = type & $export$1.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global$1 : IS_STATIC ? global$1[name] : (global$1[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global$1)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export$1.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export$1.F = 1;   // forced
$export$1.G = 2;   // global
$export$1.S = 4;   // static
$export$1.P = 8;   // proto
$export$1.B = 16;  // bind
$export$1.W = 32;  // wrap
$export$1.U = 64;  // safe
$export$1.R = 128; // real proto method for `library` 
var _export = $export$1;

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

var _stringWs = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

var $export$2 = _export;
var defined = _defined;
var fails   = _fails;
var spaces  = _stringWs;
var space   = '[' + spaces + ']';
var non     = '\u200b\u0085';
var ltrim   = RegExp('^' + space + space + '*');
var rtrim   = RegExp(space + space + '*$');

var exporter = function(KEY, exec, ALIAS){
  var exp   = {};
  var FORCE = fails(function(){
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if(ALIAS)exp[ALIAS] = fn;
  $export$2($export$2.P + $export$2.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function(string, TYPE){
  string = String(defined(string));
  if(TYPE & 1)string = string.replace(ltrim, '');
  if(TYPE & 2)string = string.replace(rtrim, '');
  return string;
};

var _stringTrim = exporter;

var $parseInt$1 = _global.parseInt;
var $trim     = _stringTrim.trim;
var ws        = _stringWs;
var hex       = /^[\-+]?0[xX]/;

var _parseInt$3 = $parseInt$1(ws + '08') !== 8 || $parseInt$1(ws + '0x16') !== 22 ? function parseInt(str, radix){
  var string = $trim(String(str), 3);
  return $parseInt$1(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt$1;

var $export   = _export;
var $parseInt = _parseInt$3;
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', {parseInt: $parseInt});

var _parseInt$1 = parseInt;

var _parseInt = createCommonjsModule(function (module) {
module.exports = { "default": _parseInt$1, __esModule: true };
});

var _Number$parseInt = unwrapExports(_parseInt);

var classCallCheck = createCommonjsModule(function (module, exports) {
"use strict";

exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
});

var _classCallCheck = unwrapExports(classCallCheck);

var $export$3 = _export;
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export$3($export$3.S + $export$3.F * !_descriptors, 'Object', {defineProperty: _objectDp.f});

var $Object = _core.Object;
var defineProperty$2 = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};

var defineProperty = createCommonjsModule(function (module) {
module.exports = { "default": defineProperty$2, __esModule: true };
});

var createClass = createCommonjsModule(function (module, exports) {
"use strict";

exports.__esModule = true;

var _defineProperty = defineProperty;

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
});

var _createClass = unwrapExports(createClass);

var fableGlobal = function () {
    var globalObj = typeof window !== "undefined" ? window
        : (typeof global !== "undefined" ? global
            : (typeof self !== "undefined" ? self : {}));
    if (typeof globalObj.__FABLE_CORE__ === "undefined") {
        globalObj.__FABLE_CORE__ = {
            types: new Map(),
            symbols: {
                reflection: Symbol("reflection"),
            }
        };
    }
    return globalObj.__FABLE_CORE__;
}();
function setType(fullName, cons) {
    fableGlobal.types.set(fullName, cons);
}

var _Symbol = (fableGlobal.symbols);

var NonDeclaredType = (function () {
    function NonDeclaredType(kind, definition, generics) {
        this.kind = kind;
        this.definition = definition;
        this.generics = generics;
    }
    NonDeclaredType.prototype.Equals = function (other) {
        if (this.kind === other.kind && this.definition === other.definition) {
            return typeof this.generics === "object"
                ? equalsRecords(this.generics, other.generics)
                : this.generics === other.generics;
        }
        return false;
    };
    return NonDeclaredType;
}());
var Any = new NonDeclaredType("Any");
var Unit = new NonDeclaredType("Unit");

function Tuple(ts) {
    return new NonDeclaredType("Tuple", null, ts);
}
function GenericParam(definition) {
    return new NonDeclaredType("GenericParam", definition);
}
function Interface(definition) {
    return new NonDeclaredType("Interface", definition);
}
function makeGeneric(typeDef, genArgs) {
    return new NonDeclaredType("GenericType", typeDef, genArgs);
}



function hasInterface(obj, interfaceName) {
    if (interfaceName === "System.Collections.Generic.IEnumerable") {
        return typeof obj[Symbol.iterator] === "function";
    }
    else if (typeof obj[_Symbol.reflection] === "function") {
        var interfaces = obj[_Symbol.reflection]().interfaces;
        return Array.isArray(interfaces) && interfaces.indexOf(interfaceName) > -1;
    }
    return false;
}
function getPropertyNames(obj) {
    if (obj == null) {
        return [];
    }
    var propertyMap = typeof obj[_Symbol.reflection] === "function" ? obj[_Symbol.reflection]().properties : obj;
    return Object.getOwnPropertyNames(propertyMap);
}

function getRestParams(args, idx) {
    for (var _len = args.length, restArgs = Array(_len > idx ? _len - idx : 0), _key = idx; _key < _len; _key++)
        restArgs[_key - idx] = args[_key];
    return restArgs;
}
function toString(o) {
    return o != null && typeof o.ToString == "function" ? o.ToString() : String(o);
}

function equals(x, y) {
    if (x === y)
        return true;
    else if (x == null)
        return y == null;
    else if (y == null)
        return false;
    else if (Object.getPrototypeOf(x) !== Object.getPrototypeOf(y))
        return false;
    else if (typeof x.Equals === "function")
        return x.Equals(y);
    else if (Array.isArray(x)) {
        if (x.length != y.length)
            return false;
        for (var i = 0; i < x.length; i++)
            if (!equals(x[i], y[i]))
                return false;
        return true;
    }
    else if (ArrayBuffer.isView(x)) {
        if (x.byteLength !== y.byteLength)
            return false;
        var dv1 = new DataView(x.buffer), dv2 = new DataView(y.buffer);
        for (var i = 0; i < x.byteLength; i++)
            if (dv1.getUint8(i) !== dv2.getUint8(i))
                return false;
        return true;
    }
    else if (x instanceof Date)
        return x.getTime() == y.getTime();
    else
        return false;
}
function compare(x, y) {
    if (x === y)
        return 0;
    if (x == null)
        return y == null ? 0 : -1;
    else if (y == null)
        return 1;
    else if (Object.getPrototypeOf(x) !== Object.getPrototypeOf(y))
        return -1;
    else if (typeof x.CompareTo === "function")
        return x.CompareTo(y);
    else if (Array.isArray(x)) {
        if (x.length != y.length)
            return x.length < y.length ? -1 : 1;
        for (var i = 0, j = 0; i < x.length; i++)
            if ((j = compare(x[i], y[i])) !== 0)
                return j;
        return 0;
    }
    else if (ArrayBuffer.isView(x)) {
        if (x.byteLength != y.byteLength)
            return x.byteLength < y.byteLength ? -1 : 1;
        var dv1 = new DataView(x.buffer), dv2 = new DataView(y.buffer);
        for (var i = 0, b1 = 0, b2 = 0; i < x.byteLength; i++) {
            b1 = dv1.getUint8(i), b2 = dv2.getUint8(i);
            if (b1 < b2)
                return -1;
            if (b1 > b2)
                return 1;
        }
        return 0;
    }
    else if (x instanceof Date)
        return compare(x.getTime(), y.getTime());
    else
        return x < y ? -1 : 1;
}
function equalsRecords(x, y) {
    if (x === y) {
        return true;
    }
    else {
        var keys = getPropertyNames(x);
        for (var i = 0; i < keys.length; i++) {
            if (!equals(x[keys[i]], y[keys[i]]))
                return false;
        }
        return true;
    }
}
function compareRecords(x, y) {
    if (x === y) {
        return 0;
    }
    else {
        var keys = getPropertyNames(x);
        for (var i = 0; i < keys.length; i++) {
            var res = compare(x[keys[i]], y[keys[i]]);
            if (res !== 0)
                return res;
        }
        return 0;
    }
}
function equalsUnions(x, y) {
    if (x === y) {
        return true;
    }
    else if (x.Case !== y.Case) {
        return false;
    }
    else {
        for (var i = 0; i < x.Fields.length; i++) {
            if (!equals(x.Fields[i], y.Fields[i]))
                return false;
        }
        return true;
    }
}
function compareUnions(x, y) {
    if (x === y) {
        return 0;
    }
    else {
        var res = compare(x.Case, y.Case);
        if (res !== 0)
            return res;
        for (var i = 0; i < x.Fields.length; i++) {
            res = compare(x.Fields[i], y.Fields[i]);
            if (res !== 0)
                return res;
        }
        return 0;
    }
}

function createObj(fields) {
    var iter = fields[Symbol.iterator]();
    var cur = iter.next(), o = {};
    while (!cur.done) {
        o[cur.value[0]] = cur.value[1];
        cur = iter.next();
    }
    return o;
}



function defaultArg(arg, defaultValue, f) {
    return arg == null ? defaultValue : (f != null ? f(arg) : arg);
}

function ofArray(args, base) {
    var acc = base || new List$1();
    for (var i = args.length - 1; i >= 0; i--) {
        acc = new List$1(args[i], acc);
    }
    return acc;
}
var List$1 = (function () {
    function List(head, tail) {
        this.head = head;
        this.tail = tail;
    }
    List.prototype.ToString = function () {
        return "[" + Array.from(this).map(toString).join("; ") + "]";
    };
    List.prototype.Equals = function (x) {
        if (this === x) {
            return true;
        }
        else {
            var iter1 = this[Symbol.iterator](), iter2 = x[Symbol.iterator]();
            for (;;) {
                var cur1 = iter1.next(), cur2 = iter2.next();
                if (cur1.done)
                    return cur2.done ? true : false;
                else if (cur2.done)
                    return false;
                else if (!equals(cur1.value, cur2.value))
                    return false;
            }
        }
    };
    List.prototype.CompareTo = function (x) {
        if (this === x) {
            return 0;
        }
        else {
            var acc = 0;
            var iter1 = this[Symbol.iterator](), iter2 = x[Symbol.iterator]();
            for (;;) {
                var cur1 = iter1.next(), cur2 = iter2.next();
                if (cur1.done)
                    return cur2.done ? acc : -1;
                else if (cur2.done)
                    return 1;
                else {
                    acc = compare(cur1.value, cur2.value);
                    if (acc != 0)
                        return acc;
                }
            }
        }
    };
    Object.defineProperty(List.prototype, "length", {
        get: function () {
            var cur = this, acc = 0;
            while (cur.tail != null) {
                cur = cur.tail;
                acc++;
            }
            return acc;
        },
        enumerable: true,
        configurable: true
    });
    List.prototype[Symbol.iterator] = function () {
        var cur = this;
        return {
            next: function () {
                var tmp = cur;
                cur = cur.tail;
                return { done: tmp.tail == null, value: tmp.head };
            }
        };
    };
    List.prototype[_Symbol.reflection] = function () {
        return {
            type: "Microsoft.FSharp.Collections.FSharpList",
            interfaces: ["System.IEquatable", "System.IComparable"]
        };
    };
    return List;
}());

var Enumerator = (function () {
    function Enumerator(iter) {
        this.iter = iter;
    }
    Enumerator.prototype.MoveNext = function () {
        var cur = this.iter.next();
        this.current = cur.value;
        return !cur.done;
    };
    Object.defineProperty(Enumerator.prototype, "Current", {
        get: function () {
            return this.current;
        },
        enumerable: true,
        configurable: true
    });
    Enumerator.prototype.Reset = function () {
        throw new Error("JS iterators cannot be reset");
    };
    Enumerator.prototype.Dispose = function () { };
    return Enumerator;
}());


function __failIfNone(res) {
    if (res == null)
        throw new Error("Seq did not contain any matching element");
    return res;
}
function toList(xs) {
    return foldBack(function (x, acc) {
        return new List$1(x, acc);
    }, xs, new List$1());
}








function compareWith(f, xs, ys) {
    var nonZero = tryFind(function (i) { return i != 0; }, map2(function (x, y) { return f(x, y); }, xs, ys));
    return nonZero != null ? nonZero : count(xs) - count(ys);
}
function delay(f) {
    return _a = {},
        _a[Symbol.iterator] = function () { return f()[Symbol.iterator](); },
        _a;
    var _a;
}






function exists(f, xs) {
    function aux(iter) {
        var cur = iter.next();
        return !cur.done && (f(cur.value) || aux(iter));
    }
    return aux(xs[Symbol.iterator]());
}

function filter$1(f, xs) {
    function trySkipToNext(iter) {
        var cur = iter.next();
        while (!cur.done) {
            if (f(cur.value)) {
                return [cur.value, iter];
            }
            cur = iter.next();
        }
        return void 0;
    }
    return delay(function () { return unfold(trySkipToNext, xs[Symbol.iterator]()); });
}

function fold(f, acc, xs) {
    if (Array.isArray(xs) || ArrayBuffer.isView(xs)) {
        return xs.reduce(f, acc);
    }
    else {
        var cur = void 0;
        for (var i = 0, iter = xs[Symbol.iterator]();; i++) {
            cur = iter.next();
            if (cur.done)
                break;
            acc = f(acc, cur.value, i);
        }
        return acc;
    }
}
function foldBack(f, xs, acc) {
    var arr = Array.isArray(xs) || ArrayBuffer.isView(xs) ? xs : Array.from(xs);
    for (var i = arr.length - 1; i >= 0; i--) {
        acc = f(arr[i], acc, i);
    }
    return acc;
}








function tryItem(i, xs) {
    if (i < 0)
        return null;
    if (Array.isArray(xs) || ArrayBuffer.isView(xs))
        return i < xs.length ? xs[i] : null;
    for (var j = 0, iter = xs[Symbol.iterator]();; j++) {
        var cur = iter.next();
        if (cur.done)
            return null;
        if (j === i)
            return cur.value;
    }
}
function item(i, xs) {
    return __failIfNone(tryItem(i, xs));
}
function iterate(f, xs) {
    fold(function (_, x) { return f(x); }, null, xs);
}






function count(xs) {
    return Array.isArray(xs) || ArrayBuffer.isView(xs)
        ? xs.length
        : fold(function (acc, x) { return acc + 1; }, 0, xs);
}
function map$2(f, xs) {
    return delay(function () { return unfold(function (iter) {
        var cur = iter.next();
        return !cur.done ? [f(cur.value), iter] : null;
    }, xs[Symbol.iterator]()); });
}

function map2(f, xs, ys) {
    return delay(function () {
        var iter1 = xs[Symbol.iterator]();
        var iter2 = ys[Symbol.iterator]();
        return unfold(function () {
            var cur1 = iter1.next(), cur2 = iter2.next();
            return !cur1.done && !cur2.done ? [f(cur1.value, cur2.value), null] : null;
        });
    });
}











function rangeChar(first, last) {
    return delay(function () { return unfold(function (x) { return x <= last ? [x, String.fromCharCode(x.charCodeAt(0) + 1)] : null; }, first); });
}


function reduce(f, xs) {
    if (Array.isArray(xs) || ArrayBuffer.isView(xs))
        return xs.reduce(f);
    var iter = xs[Symbol.iterator]();
    var cur = iter.next();
    if (cur.done)
        throw new Error("Seq was empty");
    var acc = cur.value;
    for (;;) {
        cur = iter.next();
        if (cur.done)
            break;
        acc = f(acc, cur.value);
    }
    return acc;
}















function tryFind(f, xs, defaultValue) {
    for (var i = 0, iter = xs[Symbol.iterator]();; i++) {
        var cur = iter.next();
        if (cur.done)
            return defaultValue === void 0 ? null : defaultValue;
        if (f(cur.value, i))
            return cur.value;
    }
}







function tryPick(f, xs) {
    for (var i = 0, iter = xs[Symbol.iterator]();; i++) {
        var cur = iter.next();
        if (cur.done)
            break;
        var y = f(cur.value, i);
        if (y != null)
            return y;
    }
    return void 0;
}

function unfold(f, acc) {
    return _a = {},
        _a[Symbol.iterator] = function () {
            return {
                next: function () {
                    var res = f(acc);
                    if (res != null) {
                        acc = res[1];
                        return { done: false, value: res[0] };
                    }
                    return { done: true };
                }
            };
        },
        _a;
    var _a;
}

var GenericComparer = (function () {
    function GenericComparer(f) {
        this.Compare = f || compare;
    }
    GenericComparer.prototype[_Symbol.reflection] = function () {
        return { interfaces: ["System.IComparer"] };
    };
    return GenericComparer;
}());

var MapTree = (function () {
    function MapTree(caseName, fields) {
        this.Case = caseName;
        this.Fields = fields;
    }
    return MapTree;
}());
function tree_sizeAux(acc, m) {
    return m.Case === "MapOne"
        ? acc + 1
        : m.Case === "MapNode"
            ? tree_sizeAux(tree_sizeAux(acc + 1, m.Fields[2]), m.Fields[3])
            : acc;
}
function tree_size(x) {
    return tree_sizeAux(0, x);
}
function tree_empty() {
    return new MapTree("MapEmpty", []);
}
function tree_height(_arg1) {
    return _arg1.Case === "MapOne" ? 1 : _arg1.Case === "MapNode" ? _arg1.Fields[4] : 0;
}
function tree_mk(l, k, v, r) {
    var matchValue = [l, r];
    var $target1 = function () {
        var hl = tree_height(l);
        var hr = tree_height(r);
        var m = hl < hr ? hr : hl;
        return new MapTree("MapNode", [k, v, l, r, m + 1]);
    };
    if (matchValue[0].Case === "MapEmpty") {
        if (matchValue[1].Case === "MapEmpty") {
            return new MapTree("MapOne", [k, v]);
        }
        else {
            return $target1();
        }
    }
    else {
        return $target1();
    }
}

function tree_rebalance(t1, k, v, t2) {
    var t1h = tree_height(t1);
    var t2h = tree_height(t2);
    if (t2h > t1h + 2) {
        if (t2.Case === "MapNode") {
            if (tree_height(t2.Fields[2]) > t1h + 1) {
                if (t2.Fields[2].Case === "MapNode") {
                    return tree_mk(tree_mk(t1, k, v, t2.Fields[2].Fields[2]), t2.Fields[2].Fields[0], t2.Fields[2].Fields[1], tree_mk(t2.Fields[2].Fields[3], t2.Fields[0], t2.Fields[1], t2.Fields[3]));
                }
                else {
                    throw new Error("rebalance");
                }
            }
            else {
                return tree_mk(tree_mk(t1, k, v, t2.Fields[2]), t2.Fields[0], t2.Fields[1], t2.Fields[3]);
            }
        }
        else {
            throw new Error("rebalance");
        }
    }
    else {
        if (t1h > t2h + 2) {
            if (t1.Case === "MapNode") {
                if (tree_height(t1.Fields[3]) > t2h + 1) {
                    if (t1.Fields[3].Case === "MapNode") {
                        return tree_mk(tree_mk(t1.Fields[2], t1.Fields[0], t1.Fields[1], t1.Fields[3].Fields[2]), t1.Fields[3].Fields[0], t1.Fields[3].Fields[1], tree_mk(t1.Fields[3].Fields[3], k, v, t2));
                    }
                    else {
                        throw new Error("rebalance");
                    }
                }
                else {
                    return tree_mk(t1.Fields[2], t1.Fields[0], t1.Fields[1], tree_mk(t1.Fields[3], k, v, t2));
                }
            }
            else {
                throw new Error("rebalance");
            }
        }
        else {
            return tree_mk(t1, k, v, t2);
        }
    }
}
function tree_add(comparer, k, v, m) {
    if (m.Case === "MapOne") {
        var c = comparer.Compare(k, m.Fields[0]);
        if (c < 0) {
            return new MapTree("MapNode", [k, v, new MapTree("MapEmpty", []), m, 2]);
        }
        else if (c === 0) {
            return new MapTree("MapOne", [k, v]);
        }
        return new MapTree("MapNode", [k, v, m, new MapTree("MapEmpty", []), 2]);
    }
    else if (m.Case === "MapNode") {
        var c = comparer.Compare(k, m.Fields[0]);
        if (c < 0) {
            return tree_rebalance(tree_add(comparer, k, v, m.Fields[2]), m.Fields[0], m.Fields[1], m.Fields[3]);
        }
        else if (c === 0) {
            return new MapTree("MapNode", [k, v, m.Fields[2], m.Fields[3], m.Fields[4]]);
        }
        return tree_rebalance(m.Fields[2], m.Fields[0], m.Fields[1], tree_add(comparer, k, v, m.Fields[3]));
    }
    return new MapTree("MapOne", [k, v]);
}
function tree_find(comparer, k, m) {
    var res = tree_tryFind(comparer, k, m);
    if (res != null)
        return res;
    throw new Error("key not found");
}
function tree_tryFind(comparer, k, m) {
    if (m.Case === "MapOne") {
        var c = comparer.Compare(k, m.Fields[0]);
        return c === 0 ? m.Fields[1] : null;
    }
    else if (m.Case === "MapNode") {
        var c = comparer.Compare(k, m.Fields[0]);
        if (c < 0) {
            return tree_tryFind(comparer, k, m.Fields[2]);
        }
        else {
            if (c === 0) {
                return m.Fields[1];
            }
            else {
                return tree_tryFind(comparer, k, m.Fields[3]);
            }
        }
    }
    return null;
}
function tree_mem(comparer, k, m) {
    if (m.Case === "MapOne") {
        return comparer.Compare(k, m.Fields[0]) === 0;
    }
    else if (m.Case === "MapNode") {
        var c = comparer.Compare(k, m.Fields[0]);
        if (c < 0) {
            return tree_mem(comparer, k, m.Fields[2]);
        }
        else {
            if (c === 0) {
                return true;
            }
            else {
                return tree_mem(comparer, k, m.Fields[3]);
            }
        }
    }
    else {
        return false;
    }
}
function tree_mkFromEnumerator(comparer, acc, e) {
    var cur = e.next();
    while (!cur.done) {
        acc = tree_add(comparer, cur.value[0], cur.value[1], acc);
        cur = e.next();
    }
    return acc;
}
function tree_ofSeq(comparer, c) {
    var ie = c[Symbol.iterator]();
    return tree_mkFromEnumerator(comparer, tree_empty(), ie);
}
function tree_collapseLHS(stack) {
    if (stack.tail != null) {
        if (stack.head.Case === "MapOne") {
            return stack;
        }
        else if (stack.head.Case === "MapNode") {
            return tree_collapseLHS(ofArray([
                stack.head.Fields[2],
                new MapTree("MapOne", [stack.head.Fields[0], stack.head.Fields[1]]),
                stack.head.Fields[3]
            ], stack.tail));
        }
        else {
            return tree_collapseLHS(stack.tail);
        }
    }
    else {
        return new List$1();
    }
}
function tree_mkIterator(s) {
    return { stack: tree_collapseLHS(new List$1(s, new List$1())), started: false };
}
function tree_moveNext(i) {
    function current(i) {
        if (i.stack.tail == null) {
            return null;
        }
        else if (i.stack.head.Case === "MapOne") {
            return [i.stack.head.Fields[0], i.stack.head.Fields[1]];
        }
        throw new Error("Please report error: Map iterator, unexpected stack for current");
    }
    if (i.started) {
        if (i.stack.tail == null) {
            return { done: true, value: null };
        }
        else {
            if (i.stack.head.Case === "MapOne") {
                i.stack = tree_collapseLHS(i.stack.tail);
                return {
                    done: i.stack.tail == null,
                    value: current(i)
                };
            }
            else {
                throw new Error("Please report error: Map iterator, unexpected stack for moveNext");
            }
        }
    }
    else {
        i.started = true;
        return {
            done: i.stack.tail == null,
            value: current(i)
        };
    }
    
}
var FableMap = (function () {
    function FableMap() {
    }
    FableMap.prototype.ToString = function () {
        return "map [" + Array.from(this).map(toString).join("; ") + "]";
    };
    FableMap.prototype.Equals = function (m2) {
        return this.CompareTo(m2) === 0;
    };
    FableMap.prototype.CompareTo = function (m2) {
        var _this = this;
        return this === m2 ? 0 : compareWith(function (kvp1, kvp2) {
            var c = _this.comparer.Compare(kvp1[0], kvp2[0]);
            return c !== 0 ? c : compare(kvp1[1], kvp2[1]);
        }, this, m2);
    };
    FableMap.prototype[Symbol.iterator] = function () {
        var i = tree_mkIterator(this.tree);
        return {
            next: function () { return tree_moveNext(i); }
        };
    };
    FableMap.prototype.entries = function () {
        return this[Symbol.iterator]();
    };
    FableMap.prototype.keys = function () {
        return map$2(function (kv) { return kv[0]; }, this);
    };
    FableMap.prototype.values = function () {
        return map$2(function (kv) { return kv[1]; }, this);
    };
    FableMap.prototype.get = function (k) {
        return tree_find(this.comparer, k, this.tree);
    };
    FableMap.prototype.has = function (k) {
        return tree_mem(this.comparer, k, this.tree);
    };
    FableMap.prototype.set = function (k, v) {
        throw new Error("not supported");
    };
    FableMap.prototype.delete = function (k) {
        throw new Error("not supported");
    };
    FableMap.prototype.clear = function () {
        throw new Error("not supported");
    };
    Object.defineProperty(FableMap.prototype, "size", {
        get: function () {
            return tree_size(this.tree);
        },
        enumerable: true,
        configurable: true
    });
    FableMap.prototype[_Symbol.reflection] = function () {
        return {
            type: "Microsoft.FSharp.Collections.FSharpMap",
            interfaces: ["System.IEquatable", "System.IComparable", "System.Collections.Generic.IDictionary"]
        };
    };
    return FableMap;
}());
function from(comparer, tree) {
    var map$$1 = new FableMap();
    map$$1.tree = tree;
    map$$1.comparer = comparer || new GenericComparer();
    return map$$1;
}
function create$1(ie, comparer) {
    comparer = comparer || new GenericComparer();
    return from(comparer, ie ? tree_ofSeq(comparer, ie) : tree_empty());
}

function append$$1(xs, ys) {
    return fold(function (acc, x) { return new List$1(x, acc); }, ys, reverse$$1(xs));
}
function choose$$1(f, xs) {
    var r = fold(function (acc, x) {
        var y = f(x);
        return y != null ? new List$1(y, acc) : acc;
    }, new List$1(), xs);
    return reverse$$1(r);
}
function collect$$1(f, xs) {
    return fold(function (acc, x) { return append$$1(acc, f(x)); }, new List$1(), xs);
}
function concat$$1(xs) {
    return collect$$1(function (x) { return x; }, xs);
}
function filter$$1(f, xs) {
    return reverse$$1(fold(function (acc, x) { return f(x) ? new List$1(x, acc) : acc; }, new List$1(), xs));
}


function map$1(f, xs) {
    return reverse$$1(fold(function (acc, x) { return new List$1(f(x), acc); }, new List$1(), xs));
}



function reverse$$1(xs) {
    return fold(function (acc, x) { return new List$1(x, acc); }, new List$1(), xs);
}

function create$2(pattern, options) {
    var flags = "g";
    flags += options & 1 ? "i" : "";
    flags += options & 2 ? "m" : "";
    return new RegExp(pattern, flags);
}



function match(str, pattern, options) {
    if (options === void 0) { options = 0; }
    var reg = str instanceof RegExp
        ? (reg = str, str = pattern, reg.lastIndex = options, reg)
        : reg = create$2(pattern, options);
    return reg.exec(str);
}

var Long = (function () {
    function Long(low, high, unsigned) {
        this.eq = this.equals;
        this.neq = this.notEquals;
        this.lt = this.lessThan;
        this.lte = this.lessThanOrEqual;
        this.gt = this.greaterThan;
        this.gte = this.greaterThanOrEqual;
        this.comp = this.compare;
        this.neg = this.negate;
        this.abs = this.absolute;
        this.sub = this.subtract;
        this.mul = this.multiply;
        this.div = this.divide;
        this.mod = this.modulo;
        this.shl = this.shiftLeft;
        this.shr = this.shiftRight;
        this.shru = this.shiftRightUnsigned;
        this.Equals = this.equals;
        this.CompareTo = this.compare;
        this.ToString = this.toString;
        this.low = low | 0;
        this.high = high | 0;
        this.unsigned = !!unsigned;
    }
    Long.prototype.toInt = function () {
        return this.unsigned ? this.low >>> 0 : this.low;
    };
    Long.prototype.toNumber = function () {
        if (this.unsigned)
            return ((this.high >>> 0) * TWO_PWR_32_DBL) + (this.low >>> 0);
        return this.high * TWO_PWR_32_DBL + (this.low >>> 0);
    };
    Long.prototype.toString = function (radix) {
        if (radix === void 0) { radix = 10; }
        radix = radix || 10;
        if (radix < 2 || 36 < radix)
            throw RangeError('radix');
        if (this.isZero())
            return '0';
        if (this.isNegative()) {
            if (this.eq(MIN_VALUE)) {
                var radixLong = fromNumber(radix), div = this.div(radixLong), rem1 = div.mul(radixLong).sub(this);
                return div.toString(radix) + rem1.toInt().toString(radix);
            }
            else
                return '-' + this.neg().toString(radix);
        }
        var radixToPower = fromNumber(pow_dbl(radix, 6), this.unsigned), rem = this;
        var result = '';
        while (true) {
            var remDiv = rem.div(radixToPower), intval = rem.sub(remDiv.mul(radixToPower)).toInt() >>> 0, digits = intval.toString(radix);
            rem = remDiv;
            if (rem.isZero())
                return digits + result;
            else {
                while (digits.length < 6)
                    digits = '0' + digits;
                result = '' + digits + result;
            }
        }
    };
    Long.prototype.getHighBits = function () {
        return this.high;
    };
    Long.prototype.getHighBitsUnsigned = function () {
        return this.high >>> 0;
    };
    Long.prototype.getLowBits = function () {
        return this.low;
    };
    Long.prototype.getLowBitsUnsigned = function () {
        return this.low >>> 0;
    };
    Long.prototype.getNumBitsAbs = function () {
        if (this.isNegative())
            return this.eq(MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
        var val = this.high != 0 ? this.high : this.low;
        for (var bit = 31; bit > 0; bit--)
            if ((val & (1 << bit)) != 0)
                break;
        return this.high != 0 ? bit + 33 : bit + 1;
    };
    Long.prototype.isZero = function () {
        return this.high === 0 && this.low === 0;
    };
    Long.prototype.isNegative = function () {
        return !this.unsigned && this.high < 0;
    };
    Long.prototype.isPositive = function () {
        return this.unsigned || this.high >= 0;
    };
    Long.prototype.isOdd = function () {
        return (this.low & 1) === 1;
    };
    Long.prototype.isEven = function () {
        return (this.low & 1) === 0;
    };
    Long.prototype.equals = function (other) {
        if (!isLong(other))
            other = fromValue(other);
        if (this.unsigned !== other.unsigned && (this.high >>> 31) === 1 && (other.high >>> 31) === 1)
            return false;
        return this.high === other.high && this.low === other.low;
    };
    Long.prototype.notEquals = function (other) {
        return !this.eq(other);
    };
    Long.prototype.lessThan = function (other) {
        return this.comp(other) < 0;
    };
    Long.prototype.lessThanOrEqual = function (other) {
        return this.comp(other) <= 0;
    };
    Long.prototype.greaterThan = function (other) {
        return this.comp(other) > 0;
    };
    Long.prototype.greaterThanOrEqual = function (other) {
        return this.comp(other) >= 0;
    };
    Long.prototype.compare = function (other) {
        if (!isLong(other))
            other = fromValue(other);
        if (this.eq(other))
            return 0;
        var thisNeg = this.isNegative(), otherNeg = other.isNegative();
        if (thisNeg && !otherNeg)
            return -1;
        if (!thisNeg && otherNeg)
            return 1;
        if (!this.unsigned)
            return this.sub(other).isNegative() ? -1 : 1;
        return (other.high >>> 0) > (this.high >>> 0) || (other.high === this.high && (other.low >>> 0) > (this.low >>> 0)) ? -1 : 1;
    };
    Long.prototype.negate = function () {
        if (!this.unsigned && this.eq(MIN_VALUE))
            return MIN_VALUE;
        return this.not().add(ONE);
    };
    Long.prototype.absolute = function () {
        if (!this.unsigned && this.isNegative())
            return this.negate();
        else
            return this;
    };
    Long.prototype.add = function (addend) {
        if (!isLong(addend))
            addend = fromValue(addend);
        var a48 = this.high >>> 16;
        var a32 = this.high & 0xFFFF;
        var a16 = this.low >>> 16;
        var a00 = this.low & 0xFFFF;
        var b48 = addend.high >>> 16;
        var b32 = addend.high & 0xFFFF;
        var b16 = addend.low >>> 16;
        var b00 = addend.low & 0xFFFF;
        var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
        c00 += a00 + b00;
        c16 += c00 >>> 16;
        c00 &= 0xFFFF;
        c16 += a16 + b16;
        c32 += c16 >>> 16;
        c16 &= 0xFFFF;
        c32 += a32 + b32;
        c48 += c32 >>> 16;
        c32 &= 0xFFFF;
        c48 += a48 + b48;
        c48 &= 0xFFFF;
        return fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
    };
    Long.prototype.subtract = function (subtrahend) {
        if (!isLong(subtrahend))
            subtrahend = fromValue(subtrahend);
        return this.add(subtrahend.neg());
    };
    Long.prototype.multiply = function (multiplier) {
        if (this.isZero())
            return ZERO;
        if (!isLong(multiplier))
            multiplier = fromValue(multiplier);
        if (multiplier.isZero())
            return ZERO;
        if (this.eq(MIN_VALUE))
            return multiplier.isOdd() ? MIN_VALUE : ZERO;
        if (multiplier.eq(MIN_VALUE))
            return this.isOdd() ? MIN_VALUE : ZERO;
        if (this.isNegative()) {
            if (multiplier.isNegative())
                return this.neg().mul(multiplier.neg());
            else
                return this.neg().mul(multiplier).neg();
        }
        else if (multiplier.isNegative())
            return this.mul(multiplier.neg()).neg();
        if (this.lt(TWO_PWR_24) && multiplier.lt(TWO_PWR_24))
            return fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned);
        var a48 = this.high >>> 16;
        var a32 = this.high & 0xFFFF;
        var a16 = this.low >>> 16;
        var a00 = this.low & 0xFFFF;
        var b48 = multiplier.high >>> 16;
        var b32 = multiplier.high & 0xFFFF;
        var b16 = multiplier.low >>> 16;
        var b00 = multiplier.low & 0xFFFF;
        var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
        c00 += a00 * b00;
        c16 += c00 >>> 16;
        c00 &= 0xFFFF;
        c16 += a16 * b00;
        c32 += c16 >>> 16;
        c16 &= 0xFFFF;
        c16 += a00 * b16;
        c32 += c16 >>> 16;
        c16 &= 0xFFFF;
        c32 += a32 * b00;
        c48 += c32 >>> 16;
        c32 &= 0xFFFF;
        c32 += a16 * b16;
        c48 += c32 >>> 16;
        c32 &= 0xFFFF;
        c32 += a00 * b32;
        c48 += c32 >>> 16;
        c32 &= 0xFFFF;
        c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
        c48 &= 0xFFFF;
        return fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
    };
    Long.prototype.divide = function (divisor) {
        if (!isLong(divisor))
            divisor = fromValue(divisor);
        if (divisor.isZero())
            throw Error('division by zero');
        if (this.isZero())
            return this.unsigned ? UZERO : ZERO;
        var approx = 0, rem = ZERO, res = ZERO;
        if (!this.unsigned) {
            if (this.eq(MIN_VALUE)) {
                if (divisor.eq(ONE) || divisor.eq(NEG_ONE))
                    return MIN_VALUE;
                else if (divisor.eq(MIN_VALUE))
                    return ONE;
                else {
                    var halfThis = this.shr(1);
                    var approx_1 = halfThis.div(divisor).shl(1);
                    if (approx_1.eq(ZERO)) {
                        return divisor.isNegative() ? ONE : NEG_ONE;
                    }
                    else {
                        rem = this.sub(divisor.mul(approx_1));
                        res = approx_1.add(rem.div(divisor));
                        return res;
                    }
                }
            }
            else if (divisor.eq(MIN_VALUE))
                return this.unsigned ? UZERO : ZERO;
            if (this.isNegative()) {
                if (divisor.isNegative())
                    return this.neg().div(divisor.neg());
                return this.neg().div(divisor).neg();
            }
            else if (divisor.isNegative())
                return this.div(divisor.neg()).neg();
            res = ZERO;
        }
        else {
            if (!divisor.unsigned)
                divisor = divisor.toUnsigned();
            if (divisor.gt(this))
                return UZERO;
            if (divisor.gt(this.shru(1)))
                return UONE;
            res = UZERO;
        }
        rem = this;
        while (rem.gte(divisor)) {
            approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber()));
            var log2 = Math.ceil(Math.log(approx) / Math.LN2), delta = (log2 <= 48) ? 1 : pow_dbl(2, log2 - 48), approxRes = fromNumber(approx), approxRem = approxRes.mul(divisor);
            while (approxRem.isNegative() || approxRem.gt(rem)) {
                approx -= delta;
                approxRes = fromNumber(approx, this.unsigned);
                approxRem = approxRes.mul(divisor);
            }
            if (approxRes.isZero())
                approxRes = ONE;
            res = res.add(approxRes);
            rem = rem.sub(approxRem);
        }
        return res;
    };
    Long.prototype.modulo = function (divisor) {
        if (!isLong(divisor))
            divisor = fromValue(divisor);
        return this.sub(this.div(divisor).mul(divisor));
    };
    
    Long.prototype.not = function () {
        return fromBits(~this.low, ~this.high, this.unsigned);
    };
    
    Long.prototype.and = function (other) {
        if (!isLong(other))
            other = fromValue(other);
        return fromBits(this.low & other.low, this.high & other.high, this.unsigned);
    };
    Long.prototype.or = function (other) {
        if (!isLong(other))
            other = fromValue(other);
        return fromBits(this.low | other.low, this.high | other.high, this.unsigned);
    };
    Long.prototype.xor = function (other) {
        if (!isLong(other))
            other = fromValue(other);
        return fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
    };
    Long.prototype.shiftLeft = function (numBits) {
        if (isLong(numBits))
            numBits = numBits.toInt();
        numBits = numBits & 63;
        if (numBits === 0)
            return this;
        else if (numBits < 32)
            return fromBits(this.low << numBits, (this.high << numBits) | (this.low >>> (32 - numBits)), this.unsigned);
        else
            return fromBits(0, this.low << (numBits - 32), this.unsigned);
    };
    Long.prototype.shiftRight = function (numBits) {
        if (isLong(numBits))
            numBits = numBits.toInt();
        numBits = numBits & 63;
        if (numBits === 0)
            return this;
        else if (numBits < 32)
            return fromBits((this.low >>> numBits) | (this.high << (32 - numBits)), this.high >> numBits, this.unsigned);
        else
            return fromBits(this.high >> (numBits - 32), this.high >= 0 ? 0 : -1, this.unsigned);
    };
    Long.prototype.shiftRightUnsigned = function (numBits) {
        if (isLong(numBits))
            numBits = numBits.toInt();
        numBits = numBits & 63;
        if (numBits === 0)
            return this;
        else {
            var high = this.high;
            if (numBits < 32) {
                var low = this.low;
                return fromBits((low >>> numBits) | (high << (32 - numBits)), high >>> numBits, this.unsigned);
            }
            else if (numBits === 32)
                return fromBits(high, 0, this.unsigned);
            else
                return fromBits(high >>> (numBits - 32), 0, this.unsigned);
        }
    };
    Long.prototype.toSigned = function () {
        if (!this.unsigned)
            return this;
        return fromBits(this.low, this.high, false);
    };
    Long.prototype.toUnsigned = function () {
        if (this.unsigned)
            return this;
        return fromBits(this.low, this.high, true);
    };
    Long.prototype.toBytes = function (le) {
        return le ? this.toBytesLE() : this.toBytesBE();
    };
    Long.prototype.toBytesLE = function () {
        var hi = this.high, lo = this.low;
        return [
            lo & 0xff,
            (lo >>> 8) & 0xff,
            (lo >>> 16) & 0xff,
            (lo >>> 24) & 0xff,
            hi & 0xff,
            (hi >>> 8) & 0xff,
            (hi >>> 16) & 0xff,
            (hi >>> 24) & 0xff
        ];
    };
    Long.prototype.toBytesBE = function () {
        var hi = this.high, lo = this.low;
        return [
            (hi >>> 24) & 0xff,
            (hi >>> 16) & 0xff,
            (hi >>> 8) & 0xff,
            hi & 0xff,
            (lo >>> 24) & 0xff,
            (lo >>> 16) & 0xff,
            (lo >>> 8) & 0xff,
            lo & 0xff
        ];
    };
    Long.prototype[_Symbol.reflection] = function () {
        return {
            type: "System.Int64",
            interfaces: ["FSharpRecord", "System.IComparable"],
            properties: {
                low: "number",
                high: "number",
                unsigned: "boolean"
            }
        };
    };
    return Long;
}());
var INT_CACHE = {};
var UINT_CACHE = {};
function isLong(obj) {
    return (obj && obj instanceof Long);
}
function fromInt(value, unsigned) {
    if (unsigned === void 0) { unsigned = false; }
    var obj, cachedObj, cache;
    if (unsigned) {
        value >>>= 0;
        if (cache = (0 <= value && value < 256)) {
            cachedObj = UINT_CACHE[value];
            if (cachedObj)
                return cachedObj;
        }
        obj = fromBits(value, (value | 0) < 0 ? -1 : 0, true);
        if (cache)
            UINT_CACHE[value] = obj;
        return obj;
    }
    else {
        value |= 0;
        if (cache = (-128 <= value && value < 128)) {
            cachedObj = INT_CACHE[value];
            if (cachedObj)
                return cachedObj;
        }
        obj = fromBits(value, value < 0 ? -1 : 0, false);
        if (cache)
            INT_CACHE[value] = obj;
        return obj;
    }
}
function fromNumber(value, unsigned) {
    if (unsigned === void 0) { unsigned = false; }
    if (isNaN(value) || !isFinite(value))
        return unsigned ? UZERO : ZERO;
    if (unsigned) {
        if (value < 0)
            return UZERO;
        if (value >= TWO_PWR_64_DBL)
            return MAX_UNSIGNED_VALUE;
    }
    else {
        if (value <= -TWO_PWR_63_DBL)
            return MIN_VALUE;
        if (value + 1 >= TWO_PWR_63_DBL)
            return MAX_VALUE;
    }
    if (value < 0)
        return fromNumber(-value, unsigned).neg();
    return fromBits((value % TWO_PWR_32_DBL) | 0, (value / TWO_PWR_32_DBL) | 0, unsigned);
}
function fromBits(lowBits, highBits, unsigned) {
    return new Long(lowBits, highBits, unsigned);
}
var pow_dbl = Math.pow;
function fromString(str, unsigned, radix) {
    if (unsigned === void 0) { unsigned = false; }
    if (radix === void 0) { radix = 10; }
    if (str.length === 0)
        throw Error('empty string');
    if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity")
        return ZERO;
    if (typeof unsigned === 'number') {
        radix = unsigned,
            unsigned = false;
    }
    else {
        unsigned = !!unsigned;
    }
    radix = radix || 10;
    if (radix < 2 || 36 < radix)
        throw RangeError('radix');
    var p = str.indexOf('-');
    if (p > 0)
        throw Error('interior hyphen');
    else if (p === 0) {
        return fromString(str.substring(1), unsigned, radix).neg();
    }
    var radixToPower = fromNumber(pow_dbl(radix, 8));
    var result = ZERO;
    for (var i = 0; i < str.length; i += 8) {
        var size = Math.min(8, str.length - i), value = parseInt(str.substring(i, i + size), radix);
        if (size < 8) {
            var power = fromNumber(pow_dbl(radix, size));
            result = result.mul(power).add(fromNumber(value));
        }
        else {
            result = result.mul(radixToPower);
            result = result.add(fromNumber(value));
        }
    }
    result.unsigned = unsigned;
    return result;
}
function fromValue(val) {
    if (val instanceof Long)
        return val;
    if (typeof val === 'number')
        return fromNumber(val);
    if (typeof val === 'string')
        return fromString(val);
    return fromBits(val.low, val.high, val.unsigned);
}
var TWO_PWR_16_DBL = 1 << 16;
var TWO_PWR_24_DBL = 1 << 24;
var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;
var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;
var TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;
var TWO_PWR_24 = fromInt(TWO_PWR_24_DBL);
var ZERO = fromInt(0);
var UZERO = fromInt(0, true);
var ONE = fromInt(1);
var UONE = fromInt(1, true);
var NEG_ONE = fromInt(-1);
var MAX_VALUE = fromBits(0xFFFFFFFF | 0, 0x7FFFFFFF | 0, false);
var MAX_UNSIGNED_VALUE = fromBits(0xFFFFFFFF | 0, 0xFFFFFFFF | 0, true);
var MIN_VALUE = fromBits(0, 0x80000000 | 0, false);

function parse(v, kind) {
    if (kind == null) {
        kind = typeof v == "string" && v.slice(-1) == "Z" ? 1 : 2;
    }
    var date = (v == null) ? new Date() : new Date(v);
    if (kind === 2) {
        date.kind = kind;
    }
    if (isNaN(date.getTime())) {
        throw new Error("The string is not a valid Date.");
    }
    return date;
}

var fsFormatRegExp = /(^|[^%])%([0+ ]*)(-?\d+)?(?:\.(\d+))?(\w)/;



function toHex(value) {
    return value < 0
        ? "ff" + (16777215 - (Math.abs(value) - 1)).toString(16)
        : value.toString(16);
}
function fsFormat(str) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var _cont;
    function isObject(x) {
        return x !== null && typeof x === "object" && !(x instanceof Number) && !(x instanceof String) && !(x instanceof Boolean);
    }
    function formatOnce(str, rep) {
        return str.replace(fsFormatRegExp, function (_, prefix, flags, pad, precision, format) {
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
                case "O":
                    rep = toString(rep);
                    break;
                case "A":
                    try {
                        rep = JSON.stringify(rep, function (k, v) {
                            return v && v[Symbol.iterator] && !Array.isArray(v) && isObject(v) ? Array.from(v)
                                : v && typeof v.ToString === "function" ? toString(v) : v;
                        });
                    }
                    catch (err) {
                        rep = "{" + Object.getOwnPropertyNames(rep).map(function (k) { return k + ": " + String(rep[k]); }).join(", ") + "}";
                    }
                    break;
                case "x":
                    rep = toHex(Number(rep));
                    break;
                case "X":
                    rep = toHex(Number(rep)).toUpperCase();
                    break;
            }
            var plusPrefix = flags.indexOf("+") >= 0 && parseInt(rep) >= 0;
            if (!isNaN(pad = parseInt(pad))) {
                var ch = pad >= 0 && flags.indexOf("0") >= 0 ? "0" : " ";
                rep = padLeft(rep, Math.abs(pad) - (plusPrefix ? 1 : 0), ch, pad < 0);
            }
            var once = prefix + (plusPrefix ? "+" + rep : rep);
            return once.replace(/%/g, "%%");
        });
    }
    function makeFn(str) {
        return function (rep) {
            var str2 = formatOnce(str, rep);
            return fsFormatRegExp.test(str2)
                ? makeFn(str2) : _cont(str2.replace(/%%/g, "%"));
        };
    }
    if (args.length === 0) {
        return function (cont) {
            _cont = cont;
            return fsFormatRegExp.test(str) ? makeFn(str) : _cont(str);
        };
    }
    else {
        for (var i = 0; i < args.length; i++) {
            str = formatOnce(str, args[i]);
        }
        return str.replace(/%%/g, "%");
    }
}




function isNullOrEmpty(str) {
    return typeof str !== "string" || str.length == 0;
}

function join(delimiter, xs) {
    xs = typeof xs == "string" ? getRestParams(arguments, 1) : xs;
    return (Array.isArray(xs) ? xs : Array.from(xs)).join(delimiter);
}

function padLeft(str, len, ch, isRight) {
    ch = ch || " ";
    str = String(str);
    len = len - str.length;
    for (var i = -1; ++i < len;)
        str = isRight ? str + ch : ch + str;
    return str;
}

var _createClass$1 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Types = function (__exports) {
    var Attribute = __exports.Attribute = function () {
        function Attribute(caseName, fields) {
            _classCallCheck$1(this, Attribute);

            this.Case = caseName;
            this.Fields = fields;
        }

        _createClass$1(Attribute, [{
            key: _Symbol.reflection,
            value: function () {
                return {
                    type: "Fable.Arch.Html.Types.Attribute",
                    interfaces: ["FSharpUnion"],
                    cases: {
                        Attribute: [Tuple(["string", "string"])],
                        EventHandler: [Tuple(["string", "function"])],
                        Property: [Tuple(["string", "string"])],
                        Style: [makeGeneric(List$1, {
                            T: Tuple(["string", "string"])
                        })]
                    }
                };
            }
        }]);

        return Attribute;
    }();

    setType("Fable.Arch.Html.Types.Attribute", Attribute);

    var DomNode = __exports.DomNode = function () {
        function DomNode(caseName, fields) {
            _classCallCheck$1(this, DomNode);

            this.Case = caseName;
            this.Fields = fields;
        }

        _createClass$1(DomNode, [{
            key: _Symbol.reflection,
            value: function () {
                return {
                    type: "Fable.Arch.Html.Types.DomNode",
                    interfaces: ["FSharpUnion"],
                    cases: {
                        Element: [Tuple(["string", makeGeneric(List$1, {
                            T: makeGeneric(Attribute, {
                                TMessage: GenericParam("TMessage")
                            })
                        })]), makeGeneric(List$1, {
                            T: makeGeneric(DomNode, {
                                TMessage: GenericParam("TMessage")
                            })
                        })],
                        Svg: [Tuple(["string", makeGeneric(List$1, {
                            T: makeGeneric(Attribute, {
                                TMessage: GenericParam("TMessage")
                            })
                        })]), makeGeneric(List$1, {
                            T: makeGeneric(DomNode, {
                                TMessage: GenericParam("TMessage")
                            })
                        })],
                        Text: ["string"],
                        VoidElement: [Tuple(["string", makeGeneric(List$1, {
                            T: makeGeneric(Attribute, {
                                TMessage: GenericParam("TMessage")
                            })
                        })])],
                        WhiteSpace: ["string"]
                    }
                };
            }
        }]);

        return DomNode;
    }();

    setType("Fable.Arch.Html.Types.DomNode", DomNode);
    return __exports;
}({});





var Tags = function (__exports) {
    var elem = __exports.elem = function (tagName, attrs, children) {
        return new Types.DomNode("Element", [[tagName, attrs], children]);
    };

    var voidElem = __exports.voidElem = function (tagName, attrs) {
        return new Types.DomNode("VoidElement", [[tagName, attrs]]);
    };

    var whiteSpace = __exports.whiteSpace = function (x) {
        return new Types.DomNode("WhiteSpace", [x]);
    };

    var text = __exports.text = function (x) {
        return new Types.DomNode("Text", [x]);
    };

    var br = __exports.br = function (x) {
        return voidElem("br", x);
    };

    var area = __exports.area = function (x) {
        return voidElem("area", x);
    };

    var baseHtml = __exports.baseHtml = function (x) {
        return voidElem("base", x);
    };

    var col = __exports.col = function (x) {
        return voidElem("col", x);
    };

    var embed = __exports.embed = function (x) {
        return voidElem("embed", x);
    };

    var hr = __exports.hr = function (x) {
        return voidElem("hr", x);
    };

    var img = __exports.img = function (x) {
        return voidElem("img", x);
    };

    var input = __exports.input = function (x) {
        return voidElem("input", x);
    };

    var link = __exports.link = function (x) {
        return voidElem("link", x);
    };

    var meta = __exports.meta = function (x) {
        return voidElem("meta", x);
    };

    var param = __exports.param = function (x) {
        return voidElem("param", x);
    };

    var source = __exports.source = function (x) {
        return voidElem("source", x);
    };

    var track = __exports.track = function (x) {
        return voidElem("track", x);
    };

    var wbr = __exports.wbr = function (x) {
        return voidElem("wbr", x);
    };

    var head$$1 = __exports.head = function (x) {
        var tagName = "head";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var style = __exports.style = function (x) {
        var tagName = "style";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var title = __exports.title = function (x) {
        var tagName = "title";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var address = __exports.address = function (x) {
        var tagName = "address";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var article = __exports.article = function (x) {
        var tagName = "article";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var aside = __exports.aside = function (x) {
        var tagName = "aside";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var footer = __exports.footer = function (x) {
        var tagName = "footer";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var header = __exports.header = function (x) {
        var tagName = "header";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var h1 = __exports.h1 = function (x) {
        var tagName = "h1";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var h2 = __exports.h2 = function (x) {
        var tagName = "h2";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var h3 = __exports.h3 = function (x) {
        var tagName = "h3";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var h4 = __exports.h4 = function (x) {
        var tagName = "h4";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var h5 = __exports.h5 = function (x) {
        var tagName = "h5";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var h6 = __exports.h6 = function (x) {
        var tagName = "h6";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var hgroup = __exports.hgroup = function (x) {
        var tagName = "hgroup";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var nav = __exports.nav = function (x) {
        var tagName = "nav";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var dd = __exports.dd = function (x) {
        var tagName = "dd";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var div = __exports.div = function (x) {
        var tagName = "div";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var dl = __exports.dl = function (x) {
        var tagName = "dl";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var dt = __exports.dt = function (x) {
        var tagName = "dt";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var figcaption = __exports.figcaption = function (x) {
        var tagName = "figcaption";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var figure = __exports.figure = function (x) {
        var tagName = "figure";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var li = __exports.li = function (x) {
        var tagName = "li";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var main = __exports.main = function (x) {
        var tagName = "main";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var ol = __exports.ol = function (x) {
        var tagName = "ol";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var p = __exports.p = function (x) {
        var tagName = "p";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var pre = __exports.pre = function (x) {
        var tagName = "pre";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var section = __exports.section = function (x) {
        var tagName = "section";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var ul = __exports.ul = function (x) {
        var tagName = "ul";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var a = __exports.a = function (x) {
        var tagName = "a";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var abbr = __exports.abbr = function (x) {
        var tagName = "abbr";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var b = __exports.b = function (x) {
        var tagName = "b";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var bdi = __exports.bdi = function (x) {
        var tagName = "bdi";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var bdo = __exports.bdo = function (x) {
        var tagName = "bdo";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var cite = __exports.cite = function (x) {
        var tagName = "cite";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var code = __exports.code = function (x) {
        var tagName = "code";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var data = __exports.data = function (x) {
        var tagName = "data";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var dfn = __exports.dfn = function (x) {
        var tagName = "dfn";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var em = __exports.em = function (x) {
        var tagName = "em";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var i = __exports.i = function (x) {
        var tagName = "i";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var kbd = __exports.kbd = function (x) {
        var tagName = "kbd";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var mark = __exports.mark = function (x) {
        var tagName = "mark";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var q = __exports.q = function (x) {
        var tagName = "q";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var rp = __exports.rp = function (x) {
        var tagName = "rp";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var rt = __exports.rt = function (x) {
        var tagName = "rt";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var rtc = __exports.rtc = function (x) {
        var tagName = "rtc";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var ruby = __exports.ruby = function (x) {
        var tagName = "ruby";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var s = __exports.s = function (x) {
        var tagName = "s";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var samp = __exports.samp = function (x) {
        var tagName = "samp";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var small = __exports.small = function (x) {
        var tagName = "small";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var span = __exports.span = function (x) {
        var tagName = "span";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var strong = __exports.strong = function (x) {
        var tagName = "strong";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var sub = __exports.sub = function (x) {
        var tagName = "sub";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var sup = __exports.sup = function (x) {
        var tagName = "sup";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var time = __exports.time = function (x) {
        var tagName = "time";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var u = __exports.u = function (x) {
        var tagName = "u";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var _var = __exports.var = function (x) {
        var tagName = "var";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var audio = __exports.audio = function (x) {
        var tagName = "audio";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var map_1 = __exports.map = function (x) {
        var tagName = "map";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var video = __exports.video = function (x) {
        var tagName = "video";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var objectHtml = __exports.objectHtml = function (x) {
        var tagName = "object";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var del = __exports.del = function (x) {
        var tagName = "del";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var ins = __exports.ins = function (x) {
        var tagName = "ins";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var caption = __exports.caption = function (x) {
        var tagName = "caption";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var colgroup = __exports.colgroup = function (x) {
        var tagName = "colgroup";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var table = __exports.table = function (x) {
        var tagName = "table";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var tbody = __exports.tbody = function (x) {
        var tagName = "tbody";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var td = __exports.td = function (x) {
        var tagName = "td";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var tfoot = __exports.tfoot = function (x) {
        var tagName = "tfoot";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var th = __exports.th = function (x) {
        var tagName = "th";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var thead = __exports.thead = function (x) {
        var tagName = "thead";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var tr = __exports.tr = function (x) {
        var tagName = "tr";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var button = __exports.button = function (x) {
        var tagName = "button";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var datalist = __exports.datalist = function (x) {
        var tagName = "datalist";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var fieldset = __exports.fieldset = function (x) {
        var tagName = "fieldset";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var form = __exports.form = function (x) {
        var tagName = "form";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var label = __exports.label = function (x) {
        var tagName = "label";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var legend = __exports.legend = function (x) {
        var tagName = "legend";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var meter = __exports.meter = function (x) {
        var tagName = "meter";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var optgroup = __exports.optgroup = function (x) {
        var tagName = "optgroup";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var option = __exports.option = function (x) {
        var tagName = "option";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var output = __exports.output = function (x) {
        var tagName = "output";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var progress = __exports.progress = function (x) {
        var tagName = "progress";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var select = __exports.select = function (x) {
        var tagName = "select";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var textarea = __exports.textarea = function (x) {
        var tagName = "textarea";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var details = __exports.details = function (x) {
        var tagName = "details";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var dialog = __exports.dialog = function (x) {
        var tagName = "dialog";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var menu = __exports.menu = function (x) {
        var tagName = "menu";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var menuitem = __exports.menuitem = function (x) {
        var tagName = "menuitem";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    var summary = __exports.summary = function (x) {
        var tagName = "summary";
        return function (children) {
            return elem(tagName, x, children);
        };
    };

    return __exports;
}({});
var Attributes = function (__exports) {
    var attribute = __exports.attribute = function (key, value) {
        return new Types.Attribute("Attribute", [[key, value]]);
    };

    var property = __exports.property = function (key, value) {
        return new Types.Attribute("Property", [[key, value]]);
    };

    var classy = __exports.classy = function (value) {
        return attribute("class", value);
    };

    var classList = __exports.classList = function (list) {
        return classy(join(" ", map$2(function (tupledArg) {
            return tupledArg[0];
        }, filter$1(function (tupledArg) {
            return tupledArg[1];
        }, list))));
    };

    var classBaseList = __exports.classBaseList = function (b, list) {
        return classy(fsFormat("%s %s")(function (x) {
            return x;
        })(b)(join(" ", map$2(function (tupledArg) {
            return tupledArg[0];
        }, filter$1(function (tupledArg) {
            return tupledArg[1];
        }, list)))));
    };

    var boolAttribute = __exports.boolAttribute = function (name, value) {
        return attribute(name, String(value));
    };

    return __exports;
}({});
var Events = function (__exports) {
    var onMouseEvent = __exports.onMouseEvent = function (eventType, f) {
        var h$$1 = function h$$1(e) {
            e.stopPropagation();
            e.preventDefault();
            return f(e);
        };

        return new Types.Attribute("EventHandler", [[eventType, h$$1]]);
    };

    var onMouseClick = __exports.onMouseClick = function (x) {
        return onMouseEvent("onclick", x);
    };

    var onContextMenu = __exports.onContextMenu = function (x) {
        return onMouseEvent("oncontextmenu", x);
    };

    var onDblClick = __exports.onDblClick = function (x) {
        return onMouseEvent("ondblclick", x);
    };

    var onMouseDown = __exports.onMouseDown = function (x) {
        return onMouseEvent("onmousedown", x);
    };

    var onMouseEnter = __exports.onMouseEnter = function (x) {
        return onMouseEvent("onmouseenter", x);
    };

    var onMouseLeave = __exports.onMouseLeave = function (x) {
        return onMouseEvent("onmouseleave", x);
    };

    var onMouseMove = __exports.onMouseMove = function (x) {
        return onMouseEvent("onmousemove", x);
    };

    var onMouseOut = __exports.onMouseOut = function (x) {
        return onMouseEvent("onmouseout", x);
    };

    var onMouseOver = __exports.onMouseOver = function (x) {
        return onMouseEvent("onmouseover", x);
    };

    var onMouseUp = __exports.onMouseUp = function (x) {
        return onMouseEvent("onmouseup", x);
    };

    var onShow = __exports.onShow = function (x) {
        return onMouseEvent("onshow", x);
    };

    var onKeyboardEvent = __exports.onKeyboardEvent = function (eventType, f) {
        return new Types.Attribute("EventHandler", [[eventType, f]]);
    };

    var onKeydown = __exports.onKeydown = function (x) {
        return onKeyboardEvent("onkeydown", x);
    };

    var onKeypress = __exports.onKeypress = function (x) {
        return onKeyboardEvent("onkeypress", x);
    };

    var onKeyup = __exports.onKeyup = function (x) {
        return onKeyboardEvent("onkeyup", x);
    };

    var onEvent = __exports.onEvent = function (eventType, f) {
        return new Types.Attribute("EventHandler", [[eventType, f]]);
    };

    var onAbort = __exports.onAbort = function (x) {
        return onEvent("onabort", x);
    };

    var onAfterPrint = __exports.onAfterPrint = function (x) {
        return onEvent("onafterprint", x);
    };

    var onAudioEnd = __exports.onAudioEnd = function (x) {
        return onEvent("onaudioend", x);
    };

    var onAudioStart = __exports.onAudioStart = function (x) {
        return onEvent("onaudiostart", x);
    };

    var onBeforePrint = __exports.onBeforePrint = function (x) {
        return onEvent("onbeforeprint", x);
    };

    var onCached = __exports.onCached = function (x) {
        return onEvent("oncached", x);
    };

    var onCanPlay = __exports.onCanPlay = function (x) {
        return onEvent("oncanplay", x);
    };

    var onCanPlayThrough = __exports.onCanPlayThrough = function (x) {
        return onEvent("oncanplaythrough", x);
    };

    var onChange = __exports.onChange = function (x) {
        return onEvent("onchange", x);
    };

    var onChargingChange = __exports.onChargingChange = function (x) {
        return onEvent("onchargingchange", x);
    };

    var onChargingTimeChange = __exports.onChargingTimeChange = function (x) {
        return onEvent("onchargingtimechange", x);
    };

    var onChecking = __exports.onChecking = function (x) {
        return onEvent("onchecking", x);
    };

    var onClose = __exports.onClose = function (x) {
        return onEvent("onclose", x);
    };

    var onDischargingTimeChange = __exports.onDischargingTimeChange = function (x) {
        return onEvent("ondischargingtimechange", x);
    };

    var onDOMContentLoaded = __exports.onDOMContentLoaded = function (x) {
        return onEvent("onDOMContentLoaded", x);
    };

    var onDownloading = __exports.onDownloading = function (x) {
        return onEvent("ondownloading", x);
    };

    var onDurationchange = __exports.onDurationchange = function (x) {
        return onEvent("ondurationchange", x);
    };

    var onEmptied = __exports.onEmptied = function (x) {
        return onEvent("onemptied", x);
    };

    var onEnd = __exports.onEnd = function (x) {
        return onEvent("onend", x);
    };

    var onEnded = __exports.onEnded = function (x) {
        return onEvent("onended", x);
    };

    var onError = __exports.onError = function (x) {
        return onEvent("onerror", x);
    };

    var onCullScreenChange = __exports.onCullScreenChange = function (x) {
        return onEvent("onfullscreenchange", x);
    };

    var onCullScreenError = __exports.onCullScreenError = function (x) {
        return onEvent("onfullscreenerror", x);
    };

    var onInput = __exports.onInput = function (x) {
        return onEvent("oninput", x);
    };

    var onInvalid = __exports.onInvalid = function (x) {
        return onEvent("oninvalid", x);
    };

    var onLanguageChange = __exports.onLanguageChange = function (x) {
        return onEvent("onlanguagechange", x);
    };

    var onLevelChange = __exports.onLevelChange = function (x) {
        return onEvent("onlevelchange", x);
    };

    var onLoadedData = __exports.onLoadedData = function (x) {
        return onEvent("onloadeddata", x);
    };

    var onLoadedMetaData = __exports.onLoadedMetaData = function (x) {
        return onEvent("onloadedmetadata", x);
    };

    var onNoUpdate = __exports.onNoUpdate = function (x) {
        return onEvent("onnoupdate", x);
    };

    var onObsolete = __exports.onObsolete = function (x) {
        return onEvent("onobsolete", x);
    };

    var onOffline = __exports.onOffline = function (x) {
        return onEvent("onoffline", x);
    };

    var onOnline = __exports.onOnline = function (x) {
        return onEvent("ononline", x);
    };

    var onOpen = __exports.onOpen = function (x) {
        return onEvent("onopen", x);
    };

    var onOrientationChange = __exports.onOrientationChange = function (x) {
        return onEvent("onorientationchange", x);
    };

    var onPause = __exports.onPause = function (x) {
        return onEvent("onpause", x);
    };

    var onPointerlockchange = __exports.onPointerlockchange = function (x) {
        return onEvent("onpointerlockchange", x);
    };

    var onPointerlockerror = __exports.onPointerlockerror = function (x) {
        return onEvent("onpointerlockerror", x);
    };

    var onPlay = __exports.onPlay = function (x) {
        return onEvent("onplay", x);
    };

    var onPlaying = __exports.onPlaying = function (x) {
        return onEvent("onplaying", x);
    };

    var onRateChange = __exports.onRateChange = function (x) {
        return onEvent("onratechange", x);
    };

    var onReadyStateChange = __exports.onReadyStateChange = function (x) {
        return onEvent("onreadystatechange", x);
    };

    var onReset = __exports.onReset = function (x) {
        return onEvent("onreset", x);
    };

    var onSeeked = __exports.onSeeked = function (x) {
        return onEvent("onseeked", x);
    };

    var onSeeking = __exports.onSeeking = function (x) {
        return onEvent("onseeking", x);
    };

    var onSelectStart = __exports.onSelectStart = function (x) {
        return onEvent("onselectstart", x);
    };

    var onSelectionChange = __exports.onSelectionChange = function (x) {
        return onEvent("onselectionchange", x);
    };

    var onSoundEnd = __exports.onSoundEnd = function (x) {
        return onEvent("onsoundend", x);
    };

    var onSoundStart = __exports.onSoundStart = function (x) {
        return onEvent("onsoundstart", x);
    };

    var onSpeechEnd = __exports.onSpeechEnd = function (x) {
        return onEvent("onspeechend", x);
    };

    var onSpeechStart = __exports.onSpeechStart = function (x) {
        return onEvent("onspeechstart", x);
    };

    var onStalled = __exports.onStalled = function (x) {
        return onEvent("onstalled", x);
    };

    var onStart = __exports.onStart = function (x) {
        return onEvent("onstart", x);
    };

    var onSubmit = __exports.onSubmit = function (x) {
        return onEvent("onsubmit", x);
    };

    var onSuccess = __exports.onSuccess = function (x) {
        return onEvent("onsuccess", x);
    };

    var onSuspend = __exports.onSuspend = function (x) {
        return onEvent("onsuspend", x);
    };

    var onTimeUpdate = __exports.onTimeUpdate = function (x) {
        return onEvent("ontimeupdate", x);
    };

    var onUpdateReady = __exports.onUpdateReady = function (x) {
        return onEvent("onupdateready", x);
    };

    var onVoicesChanged = __exports.onVoicesChanged = function (x) {
        return onEvent("onvoiceschanged", x);
    };

    var onVisibilityChange = __exports.onVisibilityChange = function (x) {
        return onEvent("onvisibilitychange", x);
    };

    var onVolumeChange = __exports.onVolumeChange = function (x) {
        return onEvent("onvolumechange", x);
    };

    var onVrdisplayConnected = __exports.onVrdisplayConnected = function (x) {
        return onEvent("onvrdisplayconnected", x);
    };

    var onVrdisplayDisconnected = __exports.onVrdisplayDisconnected = function (x) {
        return onEvent("onvrdisplaydisconnected", x);
    };

    var onVrdisplayPresentChange = __exports.onVrdisplayPresentChange = function (x) {
        return onEvent("onvrdisplaypresentchange", x);
    };

    var onWaiting = __exports.onWaiting = function (x) {
        return onEvent("onwaiting", x);
    };

    var onBlur = __exports.onBlur = function (x) {
        return onEvent("onblur", x);
    };

    var onFocus = __exports.onFocus = function (x) {
        return onEvent("onfocus", x);
    };

    return __exports;
}({});
var Svg = function (__exports) {
    var svgNS = __exports.svgNS = function () {
        return new Types.Attribute("Property", [["namespace", "http://www.w3.org/2000/svg"]]);
    };

    var svgElem = __exports.svgElem = function (tagName, attrs, children) {
        return new Types.DomNode("Element", [[tagName, new List$1(svgNS(), attrs)], children]);
    };

    var svg = __exports.svg = function (x) {
        var tagName = "svg";
        return function (children) {
            return svgElem(tagName, x, children);
        };
    };

    var circle = __exports.circle = function (x) {
        var tagName = "circle";
        return function (children) {
            return svgElem(tagName, x, children);
        };
    };

    var rect = __exports.rect = function (x) {
        var tagName = "rect";
        return function (children) {
            return svgElem(tagName, x, children);
        };
    };

    var width = __exports.width = function (x) {
        return Attributes.attribute("width", x);
    };

    var height = __exports.height = function (x) {
        return Attributes.attribute("height", x);
    };

    var viewBox = __exports.viewBox = function (x) {
        return Attributes.attribute("viewBox", x);
    };

    var cx = __exports.cx = function (x) {
        return Attributes.attribute("cx", x);
    };

    var cy = __exports.cy = function (x) {
        return Attributes.attribute("cy", x);
    };

    var r = __exports.r = function (x) {
        return Attributes.attribute("r", x);
    };

    var stroke = __exports.stroke = function (x) {
        return Attributes.attribute("stroke", x);
    };

    var strokeWidth = __exports.strokeWidth = function (x) {
        return Attributes.attribute("stroke-width", x);
    };

    var fill = __exports.fill = function (x) {
        return Attributes.attribute("fill", x);
    };

    return __exports;
}({});

var _createClass$2 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Parsing = function (__exports) {
    var Result = __exports.Result = function () {
        function Result(caseName, fields) {
            _classCallCheck$2(this, Result);

            this.Case = caseName;
            this.Fields = fields;
        }

        _createClass$2(Result, [{
            key: _Symbol.reflection,
            value: function () {
                return {
                    type: "Fable.Arch.RouteParser.Parsing.Result",
                    interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
                    cases: {
                        Failure: [GenericParam("b")],
                        Success: [GenericParam("a")]
                    }
                };
            }
        }, {
            key: "Equals",
            value: function (other) {
                return equalsUnions(this, other);
            }
        }, {
            key: "CompareTo",
            value: function (other) {
                return compareUnions(this, other);
            }
        }]);

        return Result;
    }();

    setType("Fable.Arch.RouteParser.Parsing.Result", Result);

    var Parser = __exports.Parser = function () {
        function Parser(parseFn, label) {
            _classCallCheck$2(this, Parser);

            this.parseFn = parseFn;
            this.label = label;
        }

        _createClass$2(Parser, [{
            key: _Symbol.reflection,
            value: function () {
                return {
                    type: "Fable.Arch.RouteParser.Parsing.Parser",
                    interfaces: ["FSharpRecord"],
                    properties: {
                        parseFn: "function",
                        label: "string"
                    }
                };
            }
        }]);

        return Parser;
    }();

    setType("Fable.Arch.RouteParser.Parsing.Parser", Parser);

    var printResult = __exports.printResult = function (result) {
        if (result.Case === "Failure") {
            var label = result.Fields[0][0];
            var error = result.Fields[0][1];
            fsFormat("Error parsing %s\n%s")(function (x) {
                console.log(x);
            })(label)(error);
        } else {
            var value = result.Fields[0][0];
            var input = result.Fields[0][1];
            fsFormat("%A")(function (x) {
                console.log(x);
            })(value);
        }
    };

    var satisfy = __exports.satisfy = function (predicate, label) {
        var innerFn = function innerFn(input) {
            if (isNullOrEmpty(input)) {
                return new Result("Failure", [[label, "No more input"]]);
            } else {
                var first = input[0];

                if (predicate(first)) {
                    var remainingInput = input.substr(1);
                    return new Result("Success", [[first, remainingInput]]);
                } else {
                    var err = fsFormat("Unexpected '%c'")(function (x) {
                        return x;
                    })(first);
                    return new Result("Failure", [[label, err]]);
                }
            }
        };

        return new Parser(innerFn, label);
    };

    var pchar = __exports.pchar = function (charToMatch) {
        var predicate = function predicate(ch) {
            return ch === charToMatch;
        };

        var label = fsFormat("%c")(function (x) {
            return x;
        })(charToMatch);
        return satisfy(predicate, label);
    };

    var digitChar = __exports.digitChar = function () {
        var predicate = function predicate(c) {
            return function (source) {
                return exists(function (x) {
                    return equals(c, x);
                }, source);
            }(toList(rangeChar("0", "9")));
        };

        var label = "digit";
        return satisfy(predicate, label);
    }();

    var run = __exports.run = function (parser, input) {
        return parser.parseFn(input);
    };

    var getLabel = __exports.getLabel = function (parser) {
        return parser.label;
    };

    var setLabel = __exports.setLabel = function (parser, newLabel) {
        var newInnerFn = function newInnerFn(input) {
            var result = parser.parseFn(input);

            if (result.Case === "Failure") {
                var oldLabel = result.Fields[0][0];
                var err = result.Fields[0][1];
                return new Result("Failure", [[newLabel, err]]);
            } else {
                return new Result("Success", [result.Fields[0]]);
            }
        };

        return new Parser(newInnerFn, newLabel);
    };

    var op_LessQmarkGreater = __exports.op_LessQmarkGreater = function () {
        return function (parser) {
            return function (newLabel) {
                return setLabel(parser, newLabel);
            };
        };
    };

    var bindP = __exports.bindP = function (f, p) {
        var label = "unknown";

        var innerFn = function innerFn(input) {
            var result1 = run(p, input);

            if (result1.Case === "Success") {
                var value1 = result1.Fields[0][0];
                var remainingInput = result1.Fields[0][1];
                var p2 = f(value1);
                return run(p2, remainingInput);
            } else {
                var label_1 = result1.Fields[0][0];
                var err = result1.Fields[0][1];
                return new Result("Failure", [[label_1, err]]);
            }
        };

        return new Parser(innerFn, label);
    };

    var op_GreaterGreaterEquals = __exports.op_GreaterGreaterEquals = function (p, f) {
        return bindP(f, p);
    };

    var returnP = __exports.returnP = function (x) {
        var label = fsFormat("%A")(function (x) {
            return x;
        })(x);

        var innerFn = function innerFn(input) {
            return new Result("Success", [[x, input]]);
        };

        return new Parser(innerFn, label);
    };

    var mapP = __exports.mapP = function (f) {
        var f_1 = function f_1($var10) {
            return function (x) {
                return returnP(x);
            }(f($var10));
        };

        return function (p) {
            return bindP(f_1, p);
        };
    };

    var op_LessBangGreater = __exports.op_LessBangGreater = function () {
        return function (f) {
            return mapP(f);
        };
    };

    var op_BarGreaterGreater = __exports.op_BarGreaterGreater = function (x, f) {
        return mapP(f)(x);
    };

    var applyP = __exports.applyP = function (fP, xP) {
        return op_GreaterGreaterEquals(fP, function (f) {
            return op_GreaterGreaterEquals(xP, function (x) {
                return returnP(f(x));
            });
        });
    };

    var op_LessMultiplyGreater = __exports.op_LessMultiplyGreater = function () {
        return function (fP) {
            return function (xP) {
                return applyP(fP, xP);
            };
        };
    };

    var lift2 = __exports.lift2 = function (f, xP, yP) {
        return op_LessMultiplyGreater()(op_LessMultiplyGreater()(returnP(f))(xP))(yP);
    };

    var andThen = __exports.andThen = function (p1, p2) {
        var label = fsFormat("%s andThen %s")(function (x) {
            return x;
        })(getLabel(p1))(getLabel(p2));
        return op_LessQmarkGreater()(op_GreaterGreaterEquals(p1, function (p1Result) {
            return op_GreaterGreaterEquals(p2, function (p2Result) {
                return returnP([p1Result, p2Result]);
            });
        }))(label);
    };

    var op_DotGreaterGreaterDot = __exports.op_DotGreaterGreaterDot = function () {
        return function (p1) {
            return function (p2) {
                return andThen(p1, p2);
            };
        };
    };

    var orElse = __exports.orElse = function (parser1, parser2) {
        var label = fsFormat("%s orElse %s")(function (x) {
            return x;
        })(getLabel(parser1))(getLabel(parser2));

        var innerFn = function innerFn(input) {
            var result1 = run(parser1, input);

            if (result1.Case === "Failure") {
                var err = result1.Fields[0][1];
                var result2 = run(parser2, input);

                if (result2.Case === "Failure") {
                    var err_1 = result2.Fields[0][1];
                    return new Result("Failure", [[label, err_1]]);
                } else {
                    return result2;
                }
            } else {
                return result1;
            }
        };

        return new Parser(innerFn, label);
    };

    var op_LessBarGreater = __exports.op_LessBarGreater = function () {
        return function (parser1) {
            return function (parser2) {
                return orElse(parser1, parser2);
            };
        };
    };

    var choice = __exports.choice = function (listOfParsers) {
        return reduce(function ($var11, $var12) {
            return op_LessBarGreater()($var11)($var12);
        }, listOfParsers);
    };

    var anyOf = __exports.anyOf = function (listOfChars) {
        var label = fsFormat("any of %A")(function (x) {
            return x;
        })(listOfChars);
        return op_LessQmarkGreater()(choice(function (list) {
            return map$1(function (charToMatch) {
                return pchar(charToMatch);
            }, list);
        }(listOfChars)))(label);
    };

    var zeroOrOne = __exports.zeroOrOne = function (parser) {
        var innerFn = function innerFn(input) {
            if (input === "") {
                return new Result("Success", [["", ""]]);
            } else {
                return run(parser, input);
            }
        };

        return new Parser(innerFn, "zeroOrOne");
    };

    var parseZeroOrMore = __exports.parseZeroOrMore = function (parser, input) {
        var firstResult = run(parser, input);

        if (firstResult.Case === "Success") {
            var inputAfterFirstParse = firstResult.Fields[0][1];
            var firstValue = firstResult.Fields[0][0];
            var patternInput = parseZeroOrMore(parser, inputAfterFirstParse);
            var values = new List$1(firstValue, patternInput[0]);
            return [values, patternInput[1]];
        } else {
            return [new List$1(), input];
        }
    };

    var parseXTimes = __exports.parseXTimes = function (count$$1, parser) {
        var innerFn = function innerFn(input) {
            var innerParse = function innerParse(count_) {
                return function (input_) {
                    return function (acc) {
                        if (count_ === 0) {
                            return new Result("Success", [[reverse$$1(acc), input_]]);
                        } else {
                            var matchValue = run(parser, input_);

                            if (matchValue.Case === "Success") {
                                var v = matchValue.Fields[0][0];
                                var rest = matchValue.Fields[0][1];
                                return innerParse(count_ - 1)(rest)(new List$1(v, acc));
                            } else {
                                var _label = matchValue.Fields[0][0];
                                var error = matchValue.Fields[0][1];
                                var label_1 = fsFormat("Failed to parse \"%s\" %i number of times ")(function (x) {
                                    return x;
                                })(_label)(count$$1);
                                return new Result("Failure", [[label_1, error]]);
                            }
                        }
                    };
                };
            };

            return innerParse(count$$1)(input)(new List$1());
        };

        var label = fsFormat("Failed to parse \"%s\" %i number of times ")(function (x) {
            return x;
        })(getLabel(parser))(count$$1);
        return new Parser(innerFn, label);
    };

    var many = __exports.many = function (parser) {
        var label = fsFormat("many %s")(function (x) {
            return x;
        })(getLabel(parser));

        var innerFn = function innerFn(input) {
            return new Result("Success", [parseZeroOrMore(parser, input)]);
        };

        return new Parser(innerFn, label);
    };

    var many1 = __exports.many1 = function (p) {
        var label = fsFormat("many1 %s")(function (x) {
            return x;
        })(getLabel(p));
        return op_LessQmarkGreater()(op_GreaterGreaterEquals(p, function (head$$1) {
            return op_GreaterGreaterEquals(many(p), function (tail$$1) {
                return returnP(new List$1(head$$1, tail$$1));
            });
        }))(label);
    };

    var op_DotGreaterGreater = __exports.op_DotGreaterGreater = function (p1, p2) {
        return mapP(function (tupledArg) {
            return tupledArg[0];
        })(op_DotGreaterGreaterDot()(p1)(p2));
    };

    var op_GreaterGreaterDot = __exports.op_GreaterGreaterDot = function (p1, p2) {
        return mapP(function (tupledArg) {
            return tupledArg[1];
        })(op_DotGreaterGreaterDot()(p1)(p2));
    };

    var drop = __exports.drop = function (p) {
        var innerFn = function innerFn(input) {
            var matchValue = run(p, input);

            if (matchValue.Case === "Failure") {
                var label = matchValue.Fields[0][0];
                var error = matchValue.Fields[0][1];
                return new Result("Failure", [[label, error]]);
            } else {
                var rest = matchValue.Fields[0][1];
                return new Result("Success", [[null, rest]]);
            }
        };

        return new Parser(innerFn, "drop");
    };

    var opt = __exports.opt = function (p) {
        var label = fsFormat("opt %s")(function (x) {
            return x;
        })(getLabel(p));
        var some = op_BarGreaterGreater(p, function (arg0) {
            return arg0;
        });
        var none = returnP(null);
        return op_LessQmarkGreater()(op_LessBarGreater()(some)(none))(label);
    };

    var charListToStr = __exports.charListToStr = function (charList) {
        return Array.from(charList).join('');
    };

    var manyChars = __exports.manyChars = function (cp) {
        return op_BarGreaterGreater(many(cp), function (charList) {
            return charListToStr(charList);
        });
    };

    var manyChars1 = __exports.manyChars1 = function (cp) {
        return op_BarGreaterGreater(many1(cp), function (charList) {
            return charListToStr(charList);
        });
    };

    var pint = __exports.pint = function () {
        var label = "integer";

        var resultToInt = function resultToInt(tupledArg) {
            var i = Number.parseInt(tupledArg[1]);

            if (tupledArg[0] == null) {
                return i;
            } else {
                return -i;
            }
        };

        var digits = manyChars1(digitChar);
        return op_LessQmarkGreater()(mapP(resultToInt)(op_DotGreaterGreaterDot()(opt(pchar("-")))(digits)))(label);
    }();

    var pfloat = __exports.pfloat = function () {
        var label = "float";

        var resultToFloat = function resultToFloat(tupledArg) {
            var sign = tupledArg[0][0][0];
            var digits1 = tupledArg[0][0][1];
            var fl = Number.parseFloat(fsFormat("%s.%s")(function (x) {
                return x;
            })(digits1)(tupledArg[1]));

            if (sign == null) {
                return fl;
            } else {
                return -fl;
            }
        };

        var digits = manyChars1(digitChar);
        return op_LessQmarkGreater()(mapP(resultToFloat)(op_DotGreaterGreaterDot()(op_DotGreaterGreaterDot()(op_DotGreaterGreaterDot()(opt(pchar("-")))(digits))(pchar(".")))(digits)))(label);
    }();

    var sequence = __exports.sequence = function (parserList) {
        var cons = function cons(head$$1) {
            return function (tail$$1) {
                return new List$1(head$$1, tail$$1);
            };
        };

        var consP = function () {
            var f = cons;
            return function (xP) {
                return function (yP) {
                    return lift2(f, xP, yP);
                };
            };
        }();

        if (parserList.tail != null) {
            return consP(parserList.head)(sequence(parserList.tail));
        } else {
            return returnP(new List$1());
        }
    };

    var pStaticStr = __exports.pStaticStr = function (str) {
        return op_LessQmarkGreater()(mapP(function (charList) {
            return charListToStr(charList);
        })(sequence(function (list) {
            return map$1(function (charToMatch) {
                return pchar(charToMatch);
            }, list);
        }(toList(str)))))(str);
    };

    var pString = __exports.pString = function () {
        var label = "string";

        var predicate = function predicate(_arg1) {
            return true;
        };

        return mapP(function (charList) {
            return charListToStr(charList);
        })(many(satisfy(predicate, "string")));
    }();

    var pStringTo = __exports.pStringTo = function (endingChar) {
        var label = fsFormat("string up to char %c")(function (x) {
            return x;
        })(endingChar);
        var ending = pchar(endingChar);

        var predicate = function predicate(c) {
            return c !== endingChar;
        };

        var stringParser = mapP(function (charList) {
            return charListToStr(charList);
        })(many(satisfy(predicate, "string")));
        return op_DotGreaterGreater(stringParser, ending);
    };

    var phexdigit = __exports.phexdigit = function () {
        var label = "hexadecimal";
        var hexChars = concat$$1(ofArray([toList(rangeChar("a", "f")), toList(rangeChar("A", "F")), toList(rangeChar("0", "9"))]));
        return op_LessQmarkGreater()(anyOf(hexChars))("Expected valid hex digit");
    }();

    var pguid = __exports.pguid = function () {
        var resultToGuid = function resultToGuid(tupledArg) {
            var guidStr = fsFormat("%s-%s-%s-%s-%s")(function (x) {
                return x;
            })(tupledArg[0][0])(item(0, tupledArg[0][1]))(item(1, tupledArg[0][1]))(item(2, tupledArg[0][1]))(tupledArg[1]);
            return guidStr;
        };

        var parseMiddlePart = mapP(function (charList) {
            return charListToStr(charList);
        })(op_GreaterGreaterDot(pchar("-"), parseXTimes(4, phexdigit)));
        return op_LessQmarkGreater()(mapP(resultToGuid)(op_DotGreaterGreaterDot()(op_DotGreaterGreater(op_DotGreaterGreaterDot()(mapP(function (charList) {
            return charListToStr(charList);
        })(parseXTimes(8, phexdigit)))(parseXTimes(3, parseMiddlePart)), pchar("-")))(mapP(function (charList) {
            return charListToStr(charList);
        })(parseXTimes(12, phexdigit)))))("guid");
    }();

    var op_LessDivideGreater = __exports.op_LessDivideGreater = function (p1, p2) {
        return op_DotGreaterGreaterDot()(op_DotGreaterGreater(p1, pchar("/")))(p2);
    };

    var op_LessDotDivideGreater = __exports.op_LessDotDivideGreater = function (p1, p2) {
        return op_DotGreaterGreater(op_DotGreaterGreater(p1, pchar("/")), p2);
    };

    var op_LessDivideDotGreater = __exports.op_LessDivideDotGreater = function (p1, p2) {
        return op_GreaterGreaterDot(op_GreaterGreaterDot(p1, pchar("/")), p2);
    };

    var _end = __exports._end = function (parser) {
        var label = "End of input";

        var innerFn = function innerFn(input) {
            var matchValue = run(parser, input);

            if (matchValue.Case === "Failure") {
                var label_1 = matchValue.Fields[0][0];
                var err = matchValue.Fields[0][1];
                return new Result("Failure", [[label_1, err]]);
            } else {
                var x = matchValue.Fields[0][0];
                var rest = matchValue.Fields[0][1];

                if (isNullOrEmpty(rest)) {
                    return new Result("Success", [[x, rest]]);
                } else {
                    return new Result("Failure", [[label, fsFormat("Expected rest of input to be empty, got %s")(function (x) {
                        return x;
                    })(rest)]]);
                }
            }
        };

        return new Parser(innerFn, label);
    };

    var choose$$1 = __exports.choose = function (routes, input) {
        return tryPick(function (r) {
            var matchValue = r(input);

            if (matchValue.Case === "Failure") {
                return null;
            } else {
                return matchValue.Fields[0];
            }
        }, routes);
    };

    var runM = __exports.runM = function (map$$1, route, str) {
        var matchValue = run(route, str);

        if (matchValue.Case === "Failure") {
            var y = matchValue.Fields[0][1];
            var x = matchValue.Fields[0][0];
            return new Result("Failure", [[x, y]]);
        } else {
            return new Result("Success", [map$$1]);
        }
    };

    var runM1 = __exports.runM1 = function (map$$1, route, str) {
        var matchValue = run(route, str);

        if (matchValue.Case === "Failure") {
            var y = matchValue.Fields[0][1];
            var x = matchValue.Fields[0][0];
            return new Result("Failure", [[x, y]]);
        } else {
            var _x = matchValue.Fields[0][0];
            return new Result("Success", [map$$1(_x)]);
        }
    };

    var runM2 = __exports.runM2 = function () {
        return function (map$$1) {
            return function (route) {
                return function (str) {
                    return runM1(map$$1, route, str);
                };
            };
        };
    };

    var runM3 = __exports.runM3 = function (map$$1, route, str) {
        var matchValue = run(route, str);

        if (matchValue.Case === "Failure") {
            var y = matchValue.Fields[0][1];
            var x = matchValue.Fields[0][0];
            return new Result("Failure", [[x, y]]);
        } else {
            var z = matchValue.Fields[0][0][1];
            var _y = matchValue.Fields[0][0][0][1];
            var _x2 = matchValue.Fields[0][0][0][0];
            return new Result("Success", [map$$1([_x2, _y, z])]);
        }
    };

    var runM4 = __exports.runM4 = function (map$$1, route, str) {
        var matchValue = run(route, str);

        if (matchValue.Case === "Failure") {
            var y = matchValue.Fields[0][1];
            var x = matchValue.Fields[0][0];
            return new Result("Failure", [[x, y]]);
        } else {
            var z = matchValue.Fields[0][0][0][1];
            var _y2 = matchValue.Fields[0][0][0][0][1];
            var _x3 = matchValue.Fields[0][0][0][0][0];
            var v = matchValue.Fields[0][0][1];
            return new Result("Success", [map$$1([_x3, _y2, z, v])]);
        }
    };

    var runM5 = __exports.runM5 = function (map$$1, route, str) {
        var matchValue = run(route, str);

        if (matchValue.Case === "Failure") {
            var y = matchValue.Fields[0][1];
            var x = matchValue.Fields[0][0];
            return new Result("Failure", [[x, y]]);
        } else {
            var z = matchValue.Fields[0][0][0][0][1];
            var _y3 = matchValue.Fields[0][0][0][0][0][1];
            var _x4 = matchValue.Fields[0][0][0][0][0][0];
            var w = matchValue.Fields[0][0][1];
            var v = matchValue.Fields[0][0][0][1];
            return new Result("Success", [map$$1([_x4, _y3, z, v, w])]);
        }
    };

    var runM6 = __exports.runM6 = function (map$$1, route, str) {
        var matchValue = run(route, str);

        if (matchValue.Case === "Failure") {
            var y = matchValue.Fields[0][1];
            var x = matchValue.Fields[0][0];
            return new Result("Failure", [[x, y]]);
        } else {
            var z = matchValue.Fields[0][0][0][0][0][1];
            var _y4 = matchValue.Fields[0][0][0][0][0][0][1];
            var _x5 = matchValue.Fields[0][0][0][0][0][0][0];
            var w = matchValue.Fields[0][0][0][1];
            var v = matchValue.Fields[0][0][0][0][1];
            var u = matchValue.Fields[0][0][1];
            return new Result("Success", [map$$1([_x5, _y4, z, v, w, u])]);
        }
    };

    return __exports;
}({});
var RouteParser = function (__exports) {
    var LocationHandler = __exports.LocationHandler = function () {
        function LocationHandler(subscribeToChange, pushChange) {
            _classCallCheck$2(this, LocationHandler);

            this.SubscribeToChange = subscribeToChange;
            this.PushChange = pushChange;
        }

        _createClass$2(LocationHandler, [{
            key: _Symbol.reflection,
            value: function () {
                return {
                    type: "Fable.Arch.RouteParser.RouteParser.LocationHandler",
                    interfaces: ["FSharpRecord"],
                    properties: {
                        SubscribeToChange: "function",
                        PushChange: "function"
                    }
                };
            }
        }]);

        return LocationHandler;
    }();

    setType("Fable.Arch.RouteParser.RouteParser.LocationHandler", LocationHandler);

    var Router = __exports.Router = function () {
        function Router(parse, route) {
            _classCallCheck$2(this, Router);

            this.Parse = parse;
            this.Route = route;
        }

        _createClass$2(Router, [{
            key: _Symbol.reflection,
            value: function () {
                return {
                    type: "Fable.Arch.RouteParser.RouteParser.Router",
                    interfaces: ["FSharpRecord"],
                    properties: {
                        Parse: "function",
                        Route: "function"
                    }
                };
            }
        }]);

        return Router;
    }();

    setType("Fable.Arch.RouteParser.RouteParser.Router", Router);

    var createRouter = __exports.createRouter = function (routes, mapRoute) {
        return new Router(function (input) {
            return Parsing.choose(routes, input);
        }, mapRoute);
    };

    var routeProducer = __exports.routeProducer = function (locationHandler, router, handler) {
        var changeHandler = function changeHandler(str) {
            var matchValue = router.Parse(str);

            if (matchValue == null) {} else {
                handler(matchValue);
            }
        };

        locationHandler.SubscribeToChange(changeHandler);
    };

    var routeSubscriber = __exports.routeSubscriber = function (locationHandler, router, message) {
        (function (_arg1) {
            if (_arg1 == null) {} else {
                locationHandler.PushChange(_arg1);
            }
        })(router(message));
    };

    return __exports;
}({});

var SetTree = (function () {
    function SetTree(caseName, fields) {
        this.Case = caseName;
        this.Fields = fields;
    }
    return SetTree;
}());
var tree_tolerance = 2;
function tree_countAux(s, acc) {
    return s.Case === "SetOne" ? acc + 1 : s.Case === "SetEmpty" ? acc : tree_countAux(s.Fields[1], tree_countAux(s.Fields[2], acc + 1));
}
function tree_count(s) {
    return tree_countAux(s, 0);
}
function tree_SetOne(n) {
    return new SetTree("SetOne", [n]);
}
function tree_SetNode(x, l, r, h$$1) {
    return new SetTree("SetNode", [x, l, r, h$$1]);
}
function tree_height$1(t) {
    return t.Case === "SetOne" ? 1 : t.Case === "SetNode" ? t.Fields[3] : 0;
}
function tree_mk$1(l, k, r) {
    var matchValue = [l, r];
    var $target1 = function () {
        var hl = tree_height$1(l);
        var hr = tree_height$1(r);
        var m = hl < hr ? hr : hl;
        return tree_SetNode(k, l, r, m + 1);
    };
    if (matchValue[0].Case === "SetEmpty") {
        if (matchValue[1].Case === "SetEmpty") {
            return tree_SetOne(k);
        }
        else {
            return $target1();
        }
    }
    else {
        return $target1();
    }
}
function tree_rebalance$1(t1, k, t2) {
    var t1h = tree_height$1(t1);
    var t2h = tree_height$1(t2);
    if (t2h > t1h + tree_tolerance) {
        if (t2.Case === "SetNode") {
            if (tree_height$1(t2.Fields[1]) > t1h + 1) {
                if (t2.Fields[1].Case === "SetNode") {
                    return tree_mk$1(tree_mk$1(t1, k, t2.Fields[1].Fields[1]), t2.Fields[1].Fields[0], tree_mk$1(t2.Fields[1].Fields[2], t2.Fields[0], t2.Fields[2]));
                }
                else {
                    throw new Error("rebalance");
                }
            }
            else {
                return tree_mk$1(tree_mk$1(t1, k, t2.Fields[1]), t2.Fields[0], t2.Fields[2]);
            }
        }
        else {
            throw new Error("rebalance");
        }
    }
    else {
        if (t1h > t2h + tree_tolerance) {
            if (t1.Case === "SetNode") {
                if (tree_height$1(t1.Fields[2]) > t2h + 1) {
                    if (t1.Fields[2].Case === "SetNode") {
                        return tree_mk$1(tree_mk$1(t1.Fields[1], t1.Fields[0], t1.Fields[2].Fields[1]), t1.Fields[2].Fields[0], tree_mk$1(t1.Fields[2].Fields[2], k, t2));
                    }
                    else {
                        throw new Error("rebalance");
                    }
                }
                else {
                    return tree_mk$1(t1.Fields[1], t1.Fields[0], tree_mk$1(t1.Fields[2], k, t2));
                }
            }
            else {
                throw new Error("rebalance");
            }
        }
        else {
            return tree_mk$1(t1, k, t2);
        }
    }
}
function tree_add$1(comparer, k, t) {
    if (t.Case === "SetOne") {
        var c = comparer.Compare(k, t.Fields[0]);
        if (c < 0) {
            return tree_SetNode(k, new SetTree("SetEmpty", []), t, 2);
        }
        else if (c === 0) {
            return t;
        }
        else {
            return tree_SetNode(k, t, new SetTree("SetEmpty", []), 2);
        }
    }
    else if (t.Case === "SetEmpty") {
        return tree_SetOne(k);
    }
    else {
        var c = comparer.Compare(k, t.Fields[0]);
        if (c < 0) {
            return tree_rebalance$1(tree_add$1(comparer, k, t.Fields[1]), t.Fields[0], t.Fields[2]);
        }
        else if (c === 0) {
            return t;
        }
        else {
            return tree_rebalance$1(t.Fields[1], t.Fields[0], tree_add$1(comparer, k, t.Fields[2]));
        }
    }
}
function tree_mem$1(comparer, k, t) {
    if (t.Case === "SetOne") {
        return comparer.Compare(k, t.Fields[0]) === 0;
    }
    else if (t.Case === "SetEmpty") {
        return false;
    }
    else {
        var c = comparer.Compare(k, t.Fields[0]);
        if (c < 0) {
            return tree_mem$1(comparer, k, t.Fields[1]);
        }
        else if (c === 0) {
            return true;
        }
        else {
            return tree_mem$1(comparer, k, t.Fields[2]);
        }
    }
}
function tree_collapseLHS$1(stack) {
    return stack.tail != null
        ? stack.head.Case === "SetOne"
            ? stack
            : stack.head.Case === "SetNode"
                ? tree_collapseLHS$1(ofArray([
                    stack.head.Fields[1],
                    tree_SetOne(stack.head.Fields[0]),
                    stack.head.Fields[2]
                ], stack.tail))
                : tree_collapseLHS$1(stack.tail)
        : new List$1();
}
function tree_mkIterator$1(s) {
    return { stack: tree_collapseLHS$1(new List$1(s, new List$1())), started: false };
}

function tree_moveNext$1(i) {
    function current(i) {
        if (i.stack.tail == null) {
            return null;
        }
        else if (i.stack.head.Case === "SetOne") {
            return i.stack.head.Fields[0];
        }
        throw new Error("Please report error: Set iterator, unexpected stack for current");
    }
    if (i.started) {
        if (i.stack.tail == null) {
            return { done: true, value: null };
        }
        else {
            if (i.stack.head.Case === "SetOne") {
                i.stack = tree_collapseLHS$1(i.stack.tail);
                return {
                    done: i.stack.tail == null,
                    value: current(i)
                };
            }
            else {
                throw new Error("Please report error: Set iterator, unexpected stack for moveNext");
            }
        }
    }
    else {
        i.started = true;
        return {
            done: i.stack.tail == null,
            value: current(i)
        };
    }
    
}
function tree_compareStacks(comparer, l1, l2) {
    var $target8 = function (n1k, t1) { return tree_compareStacks(comparer, ofArray([new SetTree("SetEmpty", []), tree_SetOne(n1k)], t1), l2); };
    var $target9 = function (n1k, n1l, n1r, t1) { return tree_compareStacks(comparer, ofArray([n1l, tree_SetNode(n1k, new SetTree("SetEmpty", []), n1r, 0)], t1), l2); };
    var $target11 = function (n2k, n2l, n2r, t2) { return tree_compareStacks(comparer, l1, ofArray([n2l, tree_SetNode(n2k, new SetTree("SetEmpty", []), n2r, 0)], t2)); };
    if (l1.tail != null) {
        if (l2.tail != null) {
            if (l2.head.Case === "SetOne") {
                if (l1.head.Case === "SetOne") {
                    var n1k = l1.head.Fields[0], n2k = l2.head.Fields[0], t1 = l1.tail, t2 = l2.tail, c = comparer.Compare(n1k, n2k);
                    if (c !== 0) {
                        return c;
                    }
                    else {
                        return tree_compareStacks(comparer, t1, t2);
                    }
                }
                else {
                    if (l1.head.Case === "SetNode") {
                        if (l1.head.Fields[1].Case === "SetEmpty") {
                            var emp = l1.head.Fields[1], n1k = l1.head.Fields[0], n1r = l1.head.Fields[2], n2k = l2.head.Fields[0], t1 = l1.tail, t2 = l2.tail, c = comparer.Compare(n1k, n2k);
                            if (c !== 0) {
                                return c;
                            }
                            else {
                                return tree_compareStacks(comparer, ofArray([n1r], t1), ofArray([emp], t2));
                            }
                        }
                        else {
                            return $target9(l1.head.Fields[0], l1.head.Fields[1], l1.head.Fields[2], l1.tail);
                        }
                    }
                    else {
                        var n2k = l2.head.Fields[0], t2 = l2.tail;
                        return tree_compareStacks(comparer, l1, ofArray([new SetTree("SetEmpty", []), tree_SetOne(n2k)], t2));
                    }
                }
            }
            else {
                if (l2.head.Case === "SetNode") {
                    if (l2.head.Fields[1].Case === "SetEmpty") {
                        if (l1.head.Case === "SetOne") {
                            var n1k = l1.head.Fields[0], n2k = l2.head.Fields[0], n2r = l2.head.Fields[2], t1 = l1.tail, t2 = l2.tail, c = comparer.Compare(n1k, n2k);
                            if (c !== 0) {
                                return c;
                            }
                            else {
                                return tree_compareStacks(comparer, ofArray([new SetTree("SetEmpty", [])], t1), ofArray([n2r], t2));
                            }
                        }
                        else {
                            if (l1.head.Case === "SetNode") {
                                if (l1.head.Fields[1].Case === "SetEmpty") {
                                    var n1k = l1.head.Fields[0], n1r = l1.head.Fields[2], n2k = l2.head.Fields[0], n2r = l2.head.Fields[2], t1 = l1.tail, t2 = l2.tail, c = comparer.Compare(n1k, n2k);
                                    if (c !== 0) {
                                        return c;
                                    }
                                    else {
                                        return tree_compareStacks(comparer, ofArray([n1r], t1), ofArray([n2r], t2));
                                    }
                                }
                                else {
                                    return $target9(l1.head.Fields[0], l1.head.Fields[1], l1.head.Fields[2], l1.tail);
                                }
                            }
                            else {
                                return $target11(l2.head.Fields[0], l2.head.Fields[1], l2.head.Fields[2], l2.tail);
                            }
                        }
                    }
                    else {
                        if (l1.head.Case === "SetOne") {
                            return $target8(l1.head.Fields[0], l1.tail);
                        }
                        else {
                            if (l1.head.Case === "SetNode") {
                                return $target9(l1.head.Fields[0], l1.head.Fields[1], l1.head.Fields[2], l1.tail);
                            }
                            else {
                                return $target11(l2.head.Fields[0], l2.head.Fields[1], l2.head.Fields[2], l2.tail);
                            }
                        }
                    }
                }
                else {
                    if (l1.head.Case === "SetOne") {
                        return $target8(l1.head.Fields[0], l1.tail);
                    }
                    else {
                        if (l1.head.Case === "SetNode") {
                            return $target9(l1.head.Fields[0], l1.head.Fields[1], l1.head.Fields[2], l1.tail);
                        }
                        else {
                            return tree_compareStacks(comparer, l1.tail, l2.tail);
                        }
                    }
                }
            }
        }
        else {
            return 1;
        }
    }
    else {
        if (l2.tail != null) {
            return -1;
        }
        else {
            return 0;
        }
    }
}
function tree_compare(comparer, s1, s2) {
    if (s1.Case === "SetEmpty") {
        if (s2.Case === "SetEmpty") {
            return 0;
        }
        else {
            return -1;
        }
    }
    else {
        if (s2.Case === "SetEmpty") {
            return 1;
        }
        else {
            return tree_compareStacks(comparer, ofArray([s1]), ofArray([s2]));
        }
    }
}
function tree_mkFromEnumerator$1(comparer, acc, e) {
    var cur = e.next();
    while (!cur.done) {
        acc = tree_add$1(comparer, cur.value, acc);
        cur = e.next();
    }
    return acc;
}
function tree_ofSeq$1(comparer, c) {
    var ie = c[Symbol.iterator]();
    return tree_mkFromEnumerator$1(comparer, new SetTree("SetEmpty", []), ie);
}
var FableSet = (function () {
    function FableSet() {
    }
    FableSet.prototype.ToString = function () {
        return "set [" + Array.from(this).map(toString).join("; ") + "]";
    };
    FableSet.prototype.Equals = function (s2) {
        return this.CompareTo(s2) === 0;
    };
    FableSet.prototype.CompareTo = function (s2) {
        return this === s2 ? 0 : tree_compare(this.comparer, this.tree, s2.tree);
    };
    FableSet.prototype[Symbol.iterator] = function () {
        var i = tree_mkIterator$1(this.tree);
        return {
            next: function () { return tree_moveNext$1(i); }
        };
    };
    FableSet.prototype.values = function () {
        return this[Symbol.iterator]();
    };
    FableSet.prototype.has = function (v) {
        return tree_mem$1(this.comparer, v, this.tree);
    };
    FableSet.prototype.add = function (v) {
        throw new Error("not supported");
    };
    FableSet.prototype.delete = function (v) {
        throw new Error("not supported");
    };
    FableSet.prototype.clear = function () {
        throw new Error("not supported");
    };
    Object.defineProperty(FableSet.prototype, "size", {
        get: function () {
            return tree_count(this.tree);
        },
        enumerable: true,
        configurable: true
    });
    FableSet.prototype[_Symbol.reflection] = function () {
        return {
            type: "Microsoft.FSharp.Collections.FSharpSet",
            interfaces: ["System.IEquatable", "System.IComparable"]
        };
    };
    return FableSet;
}());
function from$1(comparer, tree) {
    var s = new FableSet();
    s.tree = tree;
    s.comparer = comparer || new GenericComparer();
    return s;
}
function create$5(ie, comparer) {
    comparer = comparer || new GenericComparer();
    return from$1(comparer, ie ? tree_ofSeq$1(comparer, ie) : new SetTree("SetEmpty", []));
}

function resolveGeneric(idx, enclosing) {
    try {
        var t = enclosing.head;
        if (t.generics == null) {
            return resolveGeneric(idx, enclosing.tail);
        }
        else {
            var name_1 = typeof idx === "string"
                ? idx : Object.getOwnPropertyNames(t.generics)[idx];
            var resolved = t.generics[name_1];
            if (resolved == null) {
                return resolveGeneric(idx, enclosing.tail);
            }
            else if (resolved instanceof NonDeclaredType && resolved.kind === "GenericParam") {
                return resolveGeneric(resolved.definition, enclosing.tail);
            }
            else {
                return new List$1(resolved, enclosing);
            }
        }
    }
    catch (err) {
        throw new Error("Cannot resolve generic argument " + idx + ": " + err);
    }
}

function getTypeFullName(typ, option) {
    function trim(fullName, option) {
        if (typeof fullName !== "string") {
            return "unknown";
        }
        if (option === "name") {
            var i = fullName.lastIndexOf('.');
            return fullName.substr(i + 1);
        }
        if (option === "namespace") {
            var i = fullName.lastIndexOf('.');
            return i > -1 ? fullName.substr(0, i) : "";
        }
        return fullName;
    }
    if (typeof typ === "string") {
        return typ;
    }
    else if (typ instanceof NonDeclaredType) {
        switch (typ.kind) {
            case "Unit":
                return "unit";
            case "Option":
                return getTypeFullName(typ.generics, option) + " option";
            case "Array":
                return getTypeFullName(typ.generics, option) + "[]";
            case "Tuple":
                return typ.generics.map(function (x) { return getTypeFullName(x, option); }).join(" * ");
            case "GenericParam":
            case "Interface":
                return typ.definition;
            case "Any":
            default:
                return "unknown";
        }
    }
    else {
        var proto = typ.prototype;
        return trim(typeof proto[_Symbol.reflection] === "function"
            ? proto[_Symbol.reflection]().type : null, option);
    }
}

function toJson(o) {
    return JSON.stringify(o, function (k, v) {
        if (ArrayBuffer.isView(v)) {
            return Array.from(v);
        }
        else if (v != null && typeof v === "object") {
            var properties = typeof v[_Symbol.reflection] === "function" ? v[_Symbol.reflection]().properties : null;
            if (v instanceof List$1 || v instanceof FableSet || v instanceof Set) {
                return Array.from(v);
            }
            else if (v instanceof FableMap || v instanceof Map) {
                var stringKeys_1 = null;
                return fold(function (o, kv) {
                    if (stringKeys_1 === null) {
                        stringKeys_1 = typeof kv[0] === "string";
                    }
                    o[stringKeys_1 ? kv[0] : toJson(kv[0])] = kv[1];
                    return o;
                }, {}, v);
            }
            else if (!hasInterface(v, "FSharpRecord") && properties) {
                return fold(function (o, prop) {
                    return o[prop] = v[prop], o;
                }, {}, Object.getOwnPropertyNames(properties));
            }
            else if (hasInterface(v, "FSharpUnion")) {
                if (!v.Fields || !v.Fields.length) {
                    return v.Case;
                }
                else if (v.Fields.length === 1) {
                    var fieldValue = typeof v.Fields[0] === 'undefined' ? null : v.Fields[0];
                    return _a = {}, _a[v.Case] = fieldValue, _a;
                }
                else {
                    return _b = {}, _b[v.Case] = v.Fields, _b;
                }
            }
        }
        return v;
        var _a, _b;
    });
}
function combine(path1, path2) {
    return typeof path2 === "number"
        ? path1 + "[" + path2 + "]"
        : (path1 ? path1 + "." : "") + path2;
}
function isNullable(typ) {
    if (typeof typ === "string") {
        return typ !== "boolean" && typ !== "number";
    }
    else if (typ instanceof NonDeclaredType) {
        return typ.kind !== "Array" && typ.kind !== "Tuple";
    }
    else {
        var info = typeof typ.prototype[_Symbol.reflection] === "function"
            ? typ.prototype[_Symbol.reflection]() : null;
        return info ? info.nullable : true;
    }
}
function invalidate(val, typ, path) {
    throw new Error(fsFormat("%A", val) + " " + (path ? "(" + path + ")" : "") + " is not of type " + getTypeFullName(typ));
}
function needsInflate(enclosing) {
    var typ = enclosing.head;
    if (typeof typ === "string") {
        return false;
    }
    if (typ instanceof NonDeclaredType) {
        switch (typ.kind) {
            case "Option":
            case "Array":
                return typ.definition != null || needsInflate(new List$1(typ.generics, enclosing));
            case "Tuple":
                return typ.generics.some(function (x) {
                    return needsInflate(new List$1(x, enclosing));
                });
            case "GenericParam":
                return needsInflate(resolveGeneric(typ.definition, enclosing.tail));
            case "GenericType":
                return true;
            default:
                return false;
        }
    }
    return true;
}
function inflateArray(arr, enclosing, path) {
    if (!Array.isArray) {
        invalidate(arr, "array", path);
    }
    return needsInflate(enclosing)
        ? arr.map(function (x, i) { return inflate(x, enclosing, combine(path, i)); })
        : arr;
}
function inflateMap(obj, keyEnclosing, valEnclosing, path) {
    var inflateKey = keyEnclosing.head !== "string";
    var inflateVal = needsInflate(valEnclosing);
    return Object
        .getOwnPropertyNames(obj)
        .map(function (k) {
        var key = inflateKey ? inflate(JSON.parse(k), keyEnclosing, combine(path, k)) : k;
        var val = inflateVal ? inflate(obj[k], valEnclosing, combine(path, k)) : obj[k];
        return [key, val];
    });
}
function inflateList(val, enclosing, path) {
    var ar = [], li = new List$1(), cur = val, inf = needsInflate(enclosing);
    while (cur.tail != null) {
        ar.push(inf ? inflate(cur.head, enclosing, path) : cur.head);
        cur = cur.tail;
    }
    ar.reverse();
    for (var i = 0; i < ar.length; i++) {
        li = new List$1(ar[i], li);
    }
    return li;
}
function inflate(val, typ, path) {
    var enclosing = null;
    if (typ instanceof List$1) {
        enclosing = typ;
        typ = typ.head;
    }
    else {
        enclosing = new List$1(typ, new List$1());
    }
    if (val == null) {
        if (!isNullable(typ)) {
            invalidate(val, typ, path);
        }
        return val;
    }
    else if (typeof typ === "string") {
        if ((typ === "boolean" || typ === "number" || typ === "string") && (typeof val !== typ)) {
            invalidate(val, typ, path);
        }
        return val;
    }
    else if (typ instanceof NonDeclaredType) {
        switch (typ.kind) {
            case "Unit":
                return null;
            case "Option":
                return inflate(val, new List$1(typ.generics, enclosing), path);
            case "Array":
                if (typ.definition != null) {
                    return new typ.definition(val);
                }
                else {
                    return inflateArray(val, new List$1(typ.generics, enclosing), path);
                }
            case "Tuple":
                return typ.generics.map(function (x, i) {
                    return inflate(val[i], new List$1(x, enclosing), combine(path, i));
                });
            case "GenericParam":
                return inflate(val, resolveGeneric(typ.definition, enclosing.tail), path);
            case "GenericType":
                var def = typ.definition;
                if (def === List$1) {
                    return Array.isArray(val)
                        ? ofArray(inflateArray(val, resolveGeneric(0, enclosing), path))
                        : inflateList(val, resolveGeneric(0, enclosing), path);
                }
                if (def === FableSet) {
                    return create$5(inflateArray(val, resolveGeneric(0, enclosing), path));
                }
                if (def === Set) {
                    return new Set(inflateArray(val, resolveGeneric(0, enclosing), path));
                }
                if (def === FableMap) {
                    return create$1(inflateMap(val, resolveGeneric(0, enclosing), resolveGeneric(1, enclosing), path));
                }
                if (def === Map) {
                    return new Map(inflateMap(val, resolveGeneric(0, enclosing), resolveGeneric(1, enclosing), path));
                }
                return inflate(val, new List$1(typ.definition, enclosing), path);
            default:
                return val;
        }
    }
    else if (typeof typ === "function") {
        if (typ === Date) {
            return parse(val);
        }
        var info = typeof typ.prototype[_Symbol.reflection] === "function" ? typ.prototype[_Symbol.reflection]() : {};
        if (info.cases) {
            var uCase = void 0, uFields = [];
            if (typeof val === "string") {
                uCase = val;
            }
            else if (typeof val.Case === "string" && Array.isArray(val.Fields)) {
                uCase = val.Case;
                uFields = val.Fields;
            }
            else {
                var caseName = Object.getOwnPropertyNames(val)[0];
                var fieldTypes = info.cases[caseName];
                if (Array.isArray(fieldTypes)) {
                    var fields = fieldTypes.length > 1 ? val[caseName] : [val[caseName]];
                    uCase = caseName;
                    path = combine(path, caseName);
                    for (var i = 0; i < fieldTypes.length; i++) {
                        uFields.push(inflate(fields[i], new List$1(fieldTypes[i], enclosing), combine(path, i)));
                    }
                }
            }
            if (uCase in info.cases === false) {
                invalidate(val, typ, path);
            }
            return new typ(uCase, uFields);
        }
        if (info.properties) {
            var newObj = new typ();
            var properties = info.properties;
            var ks = Object.getOwnPropertyNames(properties);
            for (var i = 0; i < ks.length; i++) {
                var k = ks[i];
                newObj[k] = inflate(val[k], new List$1(properties[k], enclosing), combine(path, k));
            }
            return newObj;
        }
        return val;
    }
    throw new Error("Unexpected type when deserializing JSON: " + typ);
}
function ofJson(json, genArgs) {
    return inflate(JSON.parse(json), genArgs ? genArgs.T : null, "");
}

var _createClass$3 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$3(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Types$1 = function (__exports) {
    var ModelChanged = __exports.ModelChanged = function () {
        function ModelChanged(previousState, message, currentState) {
            _classCallCheck$3(this, ModelChanged);

            this.PreviousState = previousState;
            this.Message = message;
            this.CurrentState = currentState;
        }

        _createClass$3(ModelChanged, [{
            key: _Symbol.reflection,
            value: function () {
                return {
                    type: "Fable.Arch.App.Types.ModelChanged",
                    interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
                    properties: {
                        PreviousState: GenericParam("TModel"),
                        Message: GenericParam("TMessage"),
                        CurrentState: GenericParam("TModel")
                    }
                };
            }
        }, {
            key: "Equals",
            value: function (other) {
                return equalsRecords(this, other);
            }
        }, {
            key: "CompareTo",
            value: function (other) {
                return compareRecords(this, other);
            }
        }]);

        return ModelChanged;
    }();

    setType("Fable.Arch.App.Types.ModelChanged", ModelChanged);

    var AppEvent = __exports.AppEvent = function () {
        function AppEvent(caseName, fields) {
            _classCallCheck$3(this, AppEvent);

            this.Case = caseName;
            this.Fields = fields;
        }

        _createClass$3(AppEvent, [{
            key: _Symbol.reflection,
            value: function () {
                return {
                    type: "Fable.Arch.App.Types.AppEvent",
                    interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
                    cases: {
                        ActionReceived: [GenericParam("TMessage")],
                        ModelChanged: [makeGeneric(ModelChanged, {
                            TMessage: GenericParam("TMessage"),
                            TModel: GenericParam("TModel")
                        })],
                        Replayed: [makeGeneric(List$1, {
                            T: Tuple(["string", GenericParam("TModel")])
                        })]
                    }
                };
            }
        }, {
            key: "Equals",
            value: function (other) {
                return equalsUnions(this, other);
            }
        }, {
            key: "CompareTo",
            value: function (other) {
                return compareUnions(this, other);
            }
        }]);

        return AppEvent;
    }();

    setType("Fable.Arch.App.Types.AppEvent", AppEvent);

    var AppMessage = __exports.AppMessage = function () {
        function AppMessage(caseName, fields) {
            _classCallCheck$3(this, AppMessage);

            this.Case = caseName;
            this.Fields = fields;
        }

        _createClass$3(AppMessage, [{
            key: _Symbol.reflection,
            value: function () {
                return {
                    type: "Fable.Arch.App.Types.AppMessage",
                    interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
                    cases: {
                        Message: [GenericParam("TMessage")],
                        Replay: [GenericParam("TModel"), makeGeneric(List$1, {
                            T: Tuple(["string", GenericParam("TMessage")])
                        })]
                    }
                };
            }
        }, {
            key: "Equals",
            value: function (other) {
                return equalsUnions(this, other);
            }
        }, {
            key: "CompareTo",
            value: function (other) {
                return compareUnions(this, other);
            }
        }]);

        return AppMessage;
    }();

    setType("Fable.Arch.App.Types.AppMessage", AppMessage);

    var Plugin = __exports.Plugin = function () {
        function Plugin(producer, subscriber) {
            _classCallCheck$3(this, Plugin);

            this.Producer = producer;
            this.Subscriber = subscriber;
        }

        _createClass$3(Plugin, [{
            key: _Symbol.reflection,
            value: function () {
                return {
                    type: "Fable.Arch.App.Types.Plugin",
                    interfaces: ["FSharpRecord"],
                    properties: {
                        Producer: "function",
                        Subscriber: "function"
                    }
                };
            }
        }]);

        return Plugin;
    }();

    setType("Fable.Arch.App.Types.Plugin", Plugin);

    var AppSpecification = __exports.AppSpecification = function () {
        function AppSpecification(initState, view, update, initMessage, createRenderer, nodeSelector, producers, subscribers) {
            _classCallCheck$3(this, AppSpecification);

            this.InitState = initState;
            this.View = view;
            this.Update = update;
            this.InitMessage = initMessage;
            this.CreateRenderer = createRenderer;
            this.NodeSelector = nodeSelector;
            this.Producers = producers;
            this.Subscribers = subscribers;
        }

        _createClass$3(AppSpecification, [{
            key: _Symbol.reflection,
            value: function () {
                return {
                    type: "Fable.Arch.App.Types.AppSpecification",
                    interfaces: ["FSharpRecord"],
                    properties: {
                        InitState: GenericParam("TModel"),
                        View: "function",
                        Update: "function",
                        InitMessage: "function",
                        CreateRenderer: "function",
                        NodeSelector: "string",
                        Producers: makeGeneric(List$1, {
                            T: "function"
                        }),
                        Subscribers: makeGeneric(List$1, {
                            T: "function"
                        })
                    }
                };
            }
        }]);

        return AppSpecification;
    }();

    setType("Fable.Arch.App.Types.AppSpecification", AppSpecification);

    var App = __exports.App = function () {
        function App(model, actions, render, subscribers) {
            _classCallCheck$3(this, App);

            this.Model = model;
            this.Actions = actions;
            this.Render = render;
            this.Subscribers = subscribers;
        }

        _createClass$3(App, [{
            key: _Symbol.reflection,
            value: function () {
                return {
                    type: "Fable.Arch.App.Types.App",
                    interfaces: ["FSharpRecord"],
                    properties: {
                        Model: GenericParam("TModel"),
                        Actions: makeGeneric(List$1, {
                            T: "function"
                        }),
                        Render: "function",
                        Subscribers: makeGeneric(List$1, {
                            T: "function"
                        })
                    }
                };
            }
        }]);

        return App;
    }();

    setType("Fable.Arch.App.Types.App", App);

    var application = __exports.application = function (initMessage, handleMessage, handleReplay, configureProducers, createInitApp) {
        var state = null;

        var notifySubs = function notifySubs(msg) {
            if (state == null) {} else {
                var s = state;
                iterate(function (sub) {
                    sub(msg);
                }, s.Subscribers);
            }
        };

        var handleEvent = function handleEvent(evt) {
            var patternInput = evt.Case === "Replay" ? handleReplay(handleEvent)(notifySubs)([evt.Fields[0], evt.Fields[1]])(state) : handleMessage(handleEvent)(notifySubs)(evt.Fields[0])(state);
            state = patternInput[0];
            iterate(function (x) {
                x(null);
            }, patternInput[1]);
        };

        var post = function post($var2) {
            return handleEvent(function (arg0) {
                return new AppMessage("Message", [arg0]);
            }($var2));
        };

        state = createInitApp(post);
        initMessage(post);
        configureProducers(handleEvent);
        return handleEvent;
    };

    var render = __exports.render = function (post, viewFn, app) {
        var view = viewFn(app.Model);
        app.Render(function ($var3) {
            return post(function (arg0) {
                return new AppMessage("Message", [arg0]);
            }($var3));
        })(view);
        return app;
    };

    var createActions = __exports.createActions = function (post) {
        var mapping = function mapping(a) {
            return function () {
                return a(function ($var4) {
                    return post(function (arg0) {
                        return new AppMessage("Message", [arg0]);
                    }($var4));
                });
            };
        };

        return function (list) {
            return map$1(mapping, list);
        };
    };

    var handleMessage = __exports.handleMessage = function (update, viewFn, post, notifySubs, message, app) {
        notifySubs(new AppEvent("ActionReceived", [message]));
        var patternInput = update(app.Model)(message);
        var modelChanged = new AppEvent("ModelChanged", [new ModelChanged(app.Model, message, patternInput[0])]);
        var actions = createActions(post)(patternInput[1]);

        var app_ = function (app_1) {
            return render(post, viewFn, app_1);
        }(new App(patternInput[0], app.Actions, app.Render, app.Subscribers));

        return [app_, new List$1(function () {
            notifySubs(modelChanged);
        }, actions)];
    };

    var calculateModelChanges = __exports.calculateModelChanges = function (initState, update, actions) {
        var execUpdate = function execUpdate(r) {
            return function (a) {
                var m = r.tail != null ? r.head[1] : initState;
                var msg = a[1];
                var patternInput = update(m)(a[1]);
                var id = a[0];
                return [id, patternInput[0]];
            };
        };

        return fold(function (s, a) {
            return new List$1(execUpdate(s)(a), s);
        }, new List$1(), actions);
    };

    var handleReplay = __exports.handleReplay = function (viewFn, updateFn, post, notifySubs, fromModel, actions, app) {
        var result = calculateModelChanges(fromModel, updateFn, actions);
        var model = result.tail == null ? fromModel : result.head[1];

        var app_ = function (app_1) {
            return render(post, viewFn, app_1);
        }(new App(model, app.Actions, app.Render, app.Subscribers));

        return [app_, ofArray([function () {
            return notifySubs(new AppEvent("Replayed", [result]));
        }])];
    };

    return __exports;
}({});
var AppApi = function (__exports) {
    var mapAction = __exports.mapAction = function (mapping, action, x) {
        action(function ($var5) {
            return x(mapping($var5));
        });
    };

    var mapAppMessage = __exports.mapAppMessage = function (map$$1, _arg1) {
        if (_arg1.Case === "Replay") {
            return new Types$1.AppMessage("Replay", [_arg1.Fields[0], map$1(function (tupledArg) {
                return [tupledArg[0], map$$1(tupledArg[1])];
            }, _arg1.Fields[1])]);
        } else {
            return new Types$1.AppMessage("Message", [map$$1(_arg1.Fields[0])]);
        }
    };

    var mapProducer = __exports.mapProducer = function (map$$1, p) {
        return function (x) {
            mapAction(map$$1, p, x);
        };
    };

    var mapSubscriber = __exports.mapSubscriber = function (mapModelChanged, mapAction_1, sub, _arg1) {
        if (_arg1.Case === "ActionReceived") {
            (function (option) {
                iterate(sub, defaultArg(option, [], function (x) {
                    return [x];
                }));
            })(defaultArg(mapAction_1(function (x) {
                return x;
            })(_arg1.Fields[0]), null, function (arg0) {
                return new Types$1.AppEvent("ActionReceived", [arg0]);
            }));
        } else if (_arg1.Case === "Replayed") {
            sub(new Types$1.AppEvent("Replayed", [_arg1.Fields[0]]));
        } else {
            (function (option) {
                iterate(sub, defaultArg(option, [], function (x) {
                    return [x];
                }));
            })(defaultArg(mapModelChanged(_arg1.Fields[0]), null, function (arg0) {
                return new Types$1.AppEvent("ModelChanged", [arg0]);
            }));
        }
    };

    var mapActions = __exports.mapActions = function (m) {
        var mapping = function mapping(action) {
            return function (x) {
                mapAction(m, action, x);
            };
        };

        return function (list) {
            return map$1(mapping, list);
        };
    };

    var toActionList = __exports.toActionList = function (a) {
        return ofArray([a]);
    };

    var createApp = __exports.createApp = function (state, view, update, createRenderer) {
        return new Types$1.AppSpecification(state, view, update, function (_arg1) {}, createRenderer, "body", new List$1(), new List$1());
    };

    var createSimpleApp = __exports.createSimpleApp = function (model, view, update) {
        var update_1 = function update_1(x) {
            return function (y) {
                return [update(x)(y), new List$1()];
            };
        };

        return function (createRenderer) {
            return createApp(model, view, update_1, createRenderer);
        };
    };

    var withStartNodeSelector = __exports.withStartNodeSelector = function (selector, app) {
        return new Types$1.AppSpecification(app.InitState, app.View, app.Update, app.InitMessage, app.CreateRenderer, selector, app.Producers, app.Subscribers);
    };

    var withInitMessage = __exports.withInitMessage = function (msg, app) {
        return new Types$1.AppSpecification(app.InitState, app.View, app.Update, msg, app.CreateRenderer, app.NodeSelector, app.Producers, app.Subscribers);
    };

    var withInstrumentationProducer = function withInstrumentationProducer(p, app) {
        var Producers = new List$1(p, app.Producers);
        return new Types$1.AppSpecification(app.InitState, app.View, app.Update, app.InitMessage, app.CreateRenderer, app.NodeSelector, Producers, app.Subscribers);
    };

    var withProducer = __exports.withProducer = function (producer, app) {
        var lift = function lift(h$$1) {
            return function ($var6) {
                return h$$1(function (arg0) {
                    return new Types$1.AppMessage("Message", [arg0]);
                }($var6));
            };
        };

        var producer_ = function producer_($var7) {
            return producer(lift($var7));
        };

        return withInstrumentationProducer(producer_, app);
    };

    var withInstrumentationSubscriber = __exports.withInstrumentationSubscriber = function (subscriber, app) {
        var Subscribers = new List$1(subscriber, app.Subscribers);
        return new Types$1.AppSpecification(app.InitState, app.View, app.Update, app.InitMessage, app.CreateRenderer, app.NodeSelector, app.Producers, Subscribers);
    };

    var withSubscriber = __exports.withSubscriber = function (subscriber, app) {
        var subscriber_ = function subscriber_(_arg1) {
            if (_arg1.Case === "ModelChanged") {
                subscriber(_arg1.Fields[0]);
            }
        };

        return withInstrumentationSubscriber(subscriber_, app);
    };

    var withPlugin = __exports.withPlugin = function (plugin) {
        return function ($var8) {
            return withInstrumentationProducer(plugin.Producer, withInstrumentationSubscriber(plugin.Subscriber, $var8));
        };
    };

    var configureProducers = __exports.configureProducers = function (producers, post) {
        iterate(function (p) {
            p(post);
        }, producers);
    };

    var startAndExposeMessageSink = __exports.startAndExposeMessageSink = function (appSpec) {
        var createInitApp = function createInitApp(post) {
            var view = appSpec.View(appSpec.InitState);
            var render = appSpec.CreateRenderer(appSpec.NodeSelector)(post)(view);
            return new Types$1.App(appSpec.InitState, new List$1(), render, appSpec.Subscribers);
        };

        var handleMessage_ = function handleMessage_(post) {
            return function (notifySubs) {
                return function (message) {
                    return function (app) {
                        return Types$1.handleMessage(appSpec.Update, appSpec.View, post, notifySubs, message, app);
                    };
                };
            };
        };

        var handleReplay_ = function handleReplay_(post) {
            return function (notifySubs) {
                return function (tupledArg) {
                    return function (app) {
                        return Types$1.handleReplay(appSpec.View, appSpec.Update, post, notifySubs, tupledArg[0], tupledArg[1], app);
                    };
                };
            };
        };

        var configureProducers_ = function configureProducers_(post) {
            configureProducers(appSpec.Producers, post);
        };

        return Types$1.application(appSpec.InitMessage, handleMessage_, handleReplay_, configureProducers_, createInitApp);
    };

    var start = __exports.start = function (appSpec) {
        startAndExposeMessageSink(appSpec);
    };

    return __exports;
}({});

var _createClass$4 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$4(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function createTree(handler, tag, attributes, children) {
    var toAttrs = function toAttrs(attrs) {
        var elAttributes = function (_arg2) {
            if (_arg2.tail == null) {
                return null;
            } else {
                return ["attributes", createObj(_arg2)];
            }
        }(choose$$1(function (x) {
            return x;
        }, map$1(function (_arg1) {
            if (_arg1.Case === "Attribute") {
                var v = _arg1.Fields[0][1];
                var k = _arg1.Fields[0][0];
                return [k, v];
            }
        }, attrs)));

        var props = map$1(function (_arg4) {
            if (_arg4.Case === "Style") {
                return ["style", createObj(_arg4.Fields[0])];
            } else if (_arg4.Case === "Property") {
                var v = _arg4.Fields[0][1];
                var k = _arg4.Fields[0][0];
                return [k, v];
            } else if (_arg4.Case === "EventHandler") {
                var f = _arg4.Fields[0][1];
                var ev = _arg4.Fields[0][0];
                return [ev, function ($var9) {
                    return handler(f($var9));
                }];
            } else {
                throw new Error("Shouldn't happen");
            }
        }, filter$$1(function (_arg3) {
            if (_arg3.Case === "Attribute") {
                return false;
            } else {
                return true;
            }
        }, attrs));
        return createObj(elAttributes != null ? new List$1(elAttributes, props) : props);
    };

    var elem = virtualDom.h(tag, toAttrs(attributes), Array.from(children));
    return elem;
}
var RenderState = function () {
    function RenderState(caseName, fields) {
        _classCallCheck$4(this, RenderState);

        this.Case = caseName;
        this.Fields = fields;
    }

    _createClass$4(RenderState, [{
        key: _Symbol.reflection,
        value: function () {
            return {
                type: "Fable.Arch.Virtualdom.RenderState",
                interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
                cases: {
                    ExtraRequest: [],
                    NoRequest: [],
                    PendingRequest: []
                }
            };
        }
    }, {
        key: "Equals",
        value: function (other) {
            return equalsUnions(this, other);
        }
    }, {
        key: "CompareTo",
        value: function (other) {
            return compareUnions(this, other);
        }
    }]);

    return RenderState;
}();
setType("Fable.Arch.Virtualdom.RenderState", RenderState);
var ViewState = function () {
    function ViewState(currentTree, nextTree, node, renderState) {
        _classCallCheck$4(this, ViewState);

        this.CurrentTree = currentTree;
        this.NextTree = nextTree;
        this.Node = node;
        this.RenderState = renderState;
    }

    _createClass$4(ViewState, [{
        key: _Symbol.reflection,
        value: function () {
            return {
                type: "Fable.Arch.Virtualdom.ViewState",
                interfaces: ["FSharpRecord", "System.IEquatable"],
                properties: {
                    CurrentTree: Any,
                    NextTree: Any,
                    Node: Interface("Fable.Import.Browser.Node"),
                    RenderState: RenderState
                }
            };
        }
    }, {
        key: "Equals",
        value: function (other) {
            return equalsRecords(this, other);
        }
    }]);

    return ViewState;
}();
setType("Fable.Arch.Virtualdom.ViewState", ViewState);
function renderSomething(handler, node) {
    var _target0 = function _target0(attrs, nodes, tag) {
        return createTree(handler, tag, attrs, map$1(function (node_1) {
            return renderSomething(handler, node_1);
        }, nodes));
    };

    if (node.Case === "Svg") {
        return _target0(node.Fields[0][1], node.Fields[1], node.Fields[0][0]);
    } else if (node.Case === "VoidElement") {
        var tag = node.Fields[0][0];
        var attrs = node.Fields[0][1];
        return createTree(handler, tag, attrs, new List$1());
    } else if (node.Case === "Text") {
        return node.Fields[0];
    } else if (node.Case === "WhiteSpace") {
        return node.Fields[0];
    } else {
        return _target0(node.Fields[0][1], node.Fields[1], node.Fields[0][0]);
    }
}
function render(handler, view, viewState) {
    var tree = renderSomething(handler, view);
    return new ViewState(viewState.CurrentTree, tree, viewState.Node, viewState.RenderState);
}
function createRender(selector, handler, view) {
    var node = document.body.querySelector(selector);
    var tree = renderSomething(handler, view);
    var vdomNode = virtualDom.create(tree);
    node.appendChild(vdomNode);
    var viewState = new ViewState(tree, tree, vdomNode, new RenderState("NoRequest", []));

    var raf = function raf(cb) {
        return window.requestAnimationFrame(function (fb) {
            cb(null);
        });
    };

    var render_ = function render_(handler_1) {
        return function (view_1) {
            var viewState_ = render(handler_1, view_1, viewState);
            viewState = viewState_;

            var callBack = function callBack() {
                var matchValue = viewState.RenderState;

                if (matchValue.Case === "ExtraRequest") {
                    {
                        var RenderState_1 = new RenderState("NoRequest", []);
                        viewState = new ViewState(viewState.CurrentTree, viewState.NextTree, viewState.Node, RenderState_1);
                    }
                } else if (matchValue.Case === "NoRequest") {
                    throw new Error("Shouldn't happen");
                } else {
                    raf(callBack);
                    {
                        var _RenderState_ = new RenderState("ExtraRequest", []);

                        viewState = new ViewState(viewState.CurrentTree, viewState.NextTree, viewState.Node, _RenderState_);
                    }
                    var patches = virtualDom.diff(viewState.CurrentTree, viewState.NextTree);
                    virtualDom.patch(viewState.Node, patches);
                    viewState = new ViewState(viewState.NextTree, viewState.NextTree, viewState.Node, viewState.RenderState);
                }
            };

            {
                var matchValue = viewState.RenderState;

                if (matchValue.Case === "NoRequest") {
                    raf(callBack);
                }
            }
            {
                var RenderState_1 = new RenderState("PendingRequest", []);
                viewState = new ViewState(viewState.CurrentTree, viewState.NextTree, viewState.Node, RenderState_1);
            }
        };
    };

    return render_;
}

var VDom = function (__exports) {
  var onInput = __exports.onInput = function (x) {
    return Events.onEvent("oninput", function (e) {
      return x(e.target.value);
    });
  };

  return __exports;
}({});
var Actions = function () {
  function Actions(caseName, fields) {
    _classCallCheck(this, Actions);

    this.Case = caseName;
    this.Fields = fields;
  }

  _createClass(Actions, [{
    key: _Symbol.reflection,
    value: function () {
      return {
        type: "Sample.Actions",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: {
          ChangeNumberA: ["string"],
          ChangeNumberB: ["string"],
          ChangeOperator: [Operator],
          NavigateTo: [Page]
        }
      };
    }
  }, {
    key: "Equals",
    value: function (other) {
      return equalsUnions(this, other);
    }
  }, {
    key: "CompareTo",
    value: function (other) {
      return compareUnions(this, other);
    }
  }]);

  return Actions;
}();
setType("Sample.Actions", Actions);
var Operator = function () {
  function Operator(caseName, fields) {
    _classCallCheck(this, Operator);

    this.Case = caseName;
    this.Fields = fields;
  }

  _createClass(Operator, [{
    key: _Symbol.reflection,
    value: function () {
      return {
        type: "Sample.Operator",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: {
          Divide: [],
          Mul: [],
          Sub: [],
          Sum: [],
          Unknown: []
        }
      };
    }
  }, {
    key: "Equals",
    value: function (other) {
      return equalsUnions(this, other);
    }
  }, {
    key: "CompareTo",
    value: function (other) {
      return compareUnions(this, other);
    }
  }]);

  return Operator;
}();
setType("Sample.Operator", Operator);
var Page = function () {
  function Page(caseName, fields) {
    _classCallCheck(this, Page);

    this.Case = caseName;
    this.Fields = fields;
  }

  _createClass(Page, [{
    key: _Symbol.reflection,
    value: function () {
      return {
        type: "Sample.Page",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: {
          Divide: ["number", "number"],
          Index: [],
          Mul: ["number", "number"],
          Sub: ["number", "number"],
          Sum: ["number", "number"],
          Unknown: ["number", "number"]
        }
      };
    }
  }, {
    key: "Equals",
    value: function (other) {
      return equalsUnions(this, other);
    }
  }, {
    key: "CompareTo",
    value: function (other) {
      return compareUnions(this, other);
    }
  }]);

  return Page;
}();
setType("Sample.Page", Page);
var routes = ofArray([function () {
  var map$$1 = new Actions("NavigateTo", [new Page("Index", [])]);

  var route = function ($var1) {
    return Parsing._end(Parsing.drop($var1));
  }(Parsing.pStaticStr("/"));

  return function (str) {
    return Parsing.runM(map$$1, route, str);
  };
}(), function () {
  var map_1 = function map_1(numbers) {
    return new Actions("NavigateTo", [function (tupledArg) {
      return new Page("Unknown", [tupledArg[0], tupledArg[1]]);
    }(numbers)]);
  };

  var route_1 = Parsing._end(Parsing.op_LessDivideGreater(Parsing.op_LessDivideDotGreater(Parsing.pStaticStr("/unknown"), Parsing.pint), Parsing.pint));

  return function (str_1) {
    return Parsing.runM1(map_1, route_1, str_1);
  };
}(), function () {
  var map_2 = function map_2(numbers_1) {
    return new Actions("NavigateTo", [function (tupledArg_1) {
      return new Page("Sum", [tupledArg_1[0], tupledArg_1[1]]);
    }(numbers_1)]);
  };

  var route_2 = Parsing._end(Parsing.op_LessDivideGreater(Parsing.op_LessDivideDotGreater(Parsing.pStaticStr("/sum"), Parsing.pint), Parsing.pint));

  return function (str_2) {
    return Parsing.runM1(map_2, route_2, str_2);
  };
}(), function () {
  var map_3 = function map_3(numbers_2) {
    return new Actions("NavigateTo", [function (tupledArg_2) {
      return new Page("Sub", [tupledArg_2[0], tupledArg_2[1]]);
    }(numbers_2)]);
  };

  var route_3 = Parsing._end(Parsing.op_LessDivideGreater(Parsing.op_LessDivideDotGreater(Parsing.pStaticStr("/sub"), Parsing.pint), Parsing.pint));

  return function (str_3) {
    return Parsing.runM1(map_3, route_3, str_3);
  };
}(), function () {
  var map_4 = function map_4(numbers_3) {
    return new Actions("NavigateTo", [function (tupledArg_3) {
      return new Page("Mul", [tupledArg_3[0], tupledArg_3[1]]);
    }(numbers_3)]);
  };

  var route_4 = Parsing._end(Parsing.op_LessDivideGreater(Parsing.op_LessDivideDotGreater(Parsing.pStaticStr("/mul"), Parsing.pint), Parsing.pint));

  return function (str_4) {
    return Parsing.runM1(map_4, route_4, str_4);
  };
}(), function () {
  var map_5 = function map_5(numbers_4) {
    return new Actions("NavigateTo", [function (tupledArg_4) {
      return new Page("Divide", [tupledArg_4[0], tupledArg_4[1]]);
    }(numbers_4)]);
  };

  var route_5 = Parsing._end(Parsing.op_LessDivideGreater(Parsing.op_LessDivideDotGreater(Parsing.pStaticStr("/divide"), Parsing.pint), Parsing.pint));

  return function (str_5) {
    return Parsing.runM1(map_5, route_5, str_5);
  };
}()]);
function resolveRoutesToUrl(r) {
  if (r.Case === "Sum") {
    return fsFormat("/sum/%i/%i")(function (x) {
      return x;
    })(r.Fields[0])(r.Fields[1]);
  } else if (r.Case === "Sub") {
    return fsFormat("/sub/%i/%i")(function (x) {
      return x;
    })(r.Fields[0])(r.Fields[1]);
  } else if (r.Case === "Mul") {
    return fsFormat("/mul/%i/%i")(function (x) {
      return x;
    })(r.Fields[0])(r.Fields[1]);
  } else if (r.Case === "Divide") {
    return fsFormat("/divide/%i/%i")(function (x) {
      return x;
    })(r.Fields[0])(r.Fields[1]);
  } else if (r.Case === "Unknown") {
    return fsFormat("/unknown/%i/%i")(function (x) {
      return x;
    })(r.Fields[0])(r.Fields[1]);
  } else {
    return "/";
  }
}
function mapToRoute(route) {
  if (route.Case === "NavigateTo") {
    return resolveRoutesToUrl(route.Fields[0]);
  } else {
    return null;
  }
}
var router = RouteParser.createRouter(routes, function (route) {
  return mapToRoute(route);
});
var locationHandler = new RouteParser.LocationHandler(function (h$$1) {
  window.addEventListener('hashchange', function (_arg1) {
    h$$1(location.hash.substr(1));
    return null;
  });
}, function (s) {
  location.hash = s;
});
function routerF(m) {
  return router.Route(m.Message);
}
var Model = function () {
  function Model(operator, numberA, numberB, result) {
    _classCallCheck(this, Model);

    this.Operator = operator;
    this.NumberA = numberA;
    this.NumberB = numberB;
    this.Result = result;
  }

  _createClass(Model, [{
    key: _Symbol.reflection,
    value: function () {
      return {
        type: "Sample.Model",
        interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
        properties: {
          Operator: Operator,
          NumberA: "number",
          NumberB: "number",
          Result: "number"
        }
      };
    }
  }, {
    key: "Equals",
    value: function (other) {
      return equalsRecords(this, other);
    }
  }, {
    key: "CompareTo",
    value: function (other) {
      return compareRecords(this, other);
    }
  }], [{
    key: "CreateFromPage",
    value: function (page) {
      if (page.Case === "Sub") {
        return new Model(new Operator("Sub", []), page.Fields[0], page.Fields[1], page.Fields[0] - page.Fields[1]);
      } else if (page.Case === "Mul") {
        return new Model(new Operator("Mul", []), page.Fields[0], page.Fields[1], page.Fields[0] * page.Fields[1]);
      } else if (page.Case === "Divide") {
        return new Model(new Operator("Divide", []), page.Fields[0], page.Fields[1], page.Fields[0] / page.Fields[1]);
      } else if (page.Case === "Unknown") {
        return new Model(new Operator("Unknown", []), page.Fields[0], page.Fields[1], NaN);
      } else if (page.Case === "Index") {
        return Model.Initial;
      } else {
        return new Model(new Operator("Sum", []), page.Fields[0], page.Fields[1], page.Fields[0] + page.Fields[1]);
      }
    }
  }, {
    key: "Initial",
    get: function () {
      return new Model(new Operator("Unknown", []), 0, 0, 0);
    }
  }]);

  return Model;
}();
setType("Sample.Model", Model);
function isValidNumber(input) {
  return match(input, "(^\\d+$){0,1}") != null;
}
function saveIntoURL(model) {
  return ofArray([function (_arg1) {
    (function (_arg1_1) {
      if (_arg1_1 == null) {} else {
        locationHandler.PushChange(fsFormat("#%s")(function (x) {
          return x;
        })(_arg1_1));
      }
    })(resolveRoutesToUrl(model.Operator.Case === "Sum" ? new Page("Sum", [model.NumberA, model.NumberB]) : model.Operator.Case === "Sub" ? new Page("Sub", [model.NumberA, model.NumberB]) : model.Operator.Case === "Mul" ? new Page("Mul", [model.NumberA, model.NumberB]) : model.Operator.Case === "Unknown" ? new Page("Unknown", [model.NumberA, model.NumberB]) : new Page("Divide", [model.NumberA, model.NumberB])));
  }]);
}
function update(model, action) {
  if (action.Case === "ChangeNumberA") {
    if (isValidNumber(action.Fields[0])) {
      var m = void 0;

      var NumberA = _Number$parseInt(action.Fields[0]);

      m = new Model(model.Operator, NumberA, model.NumberB, model.Result);
      return [m, saveIntoURL(m)];
    } else {
      return [model, new List$1()];
    }
  } else if (action.Case === "ChangeNumberB") {
    if (isValidNumber(action.Fields[0])) {
      var m_1 = void 0;

      var NumberB = _Number$parseInt(action.Fields[0]);

      m_1 = new Model(model.Operator, model.NumberA, NumberB, model.Result);
      return [m_1, saveIntoURL(m_1)];
    } else {
      return [model, new List$1()];
    }
  } else if (action.Case === "NavigateTo") {
    return [Model.CreateFromPage(action.Fields[0]), new List$1()];
  } else {
    var m_2 = new Model(action.Fields[0], model.NumberA, model.NumberB, model.Result);
    return [m_2, saveIntoURL(m_2)];
  }
}
var NumberAreaInfo = function () {
  function NumberAreaInfo(onInputAction, value) {
    _classCallCheck(this, NumberAreaInfo);

    this.OnInputAction = onInputAction;
    this.Value = value;
  }

  _createClass(NumberAreaInfo, [{
    key: _Symbol.reflection,
    value: function () {
      return {
        type: "Sample.NumberAreaInfo",
        interfaces: ["FSharpRecord"],
        properties: {
          OnInputAction: "function",
          Value: "number"
        }
      };
    }
  }]);

  return NumberAreaInfo;
}();
setType("Sample.NumberAreaInfo", NumberAreaInfo);
function numberArea(areaInfo) {
  return Tags.input(ofArray([Attributes.classy("input"), VDom.onInput(areaInfo.OnInputAction), Attributes.property("type", "number"), Attributes.property("value", String(areaInfo.Value)), new Types.Attribute("Style", [ofArray([["width", "100px"]])])]));
}
function isSelected(value, ref) {
  if (equals(value, ref)) {
    return Attributes.property("selected", "selected");
  } else {
    return Attributes.property("", "");
  }
}
function view(model) {
  return Tags.div(ofArray([Attributes.classy("columns is-flex-mobile")]))(ofArray([Tags.div(ofArray([Attributes.classy("column")]))(new List$1()), Tags.p(ofArray([Attributes.classy("control has-addons")]))(ofArray([numberArea(new NumberAreaInfo(function (x) {
    return new Actions("ChangeNumberA", [x]);
  }, model.NumberA)), Tags.div(ofArray([Attributes.classy("select")]))(ofArray([Tags.select(ofArray([Events.onChange(function (ev) {
    return new Actions("ChangeOperator", [ofJson(ev.target.value, {
      T: Operator
    })]);
  })]))(ofArray([Tags.option(ofArray([Attributes.property("disabled", "disabled"), isSelected(model.Operator, new Operator("Unknown", [])), Attributes.property("value", "Unknown")]))(ofArray([Tags.text("")])), Tags.option(ofArray([isSelected(model.Operator, new Operator("Sum", [])), Attributes.property("value", toJson(new Operator("Sum", [])))]))(ofArray([Tags.text("+")])), Tags.option(ofArray([isSelected(model.Operator, new Operator("Sub", [])), Attributes.property("value", toJson(new Operator("Sub", [])))]))(ofArray([Tags.text("-")])), Tags.option(ofArray([isSelected(model.Operator, new Operator("Mul", [])), Attributes.property("value", toJson(new Operator("Mul", [])))]))(ofArray([Tags.text("*")])), Tags.option(ofArray([isSelected(model.Operator, new Operator("Divide", [])), Attributes.property("value", toJson(new Operator("Divide", [])))]))(ofArray([Tags.text("/")]))]))])), numberArea(new NumberAreaInfo(function (x_1) {
    return new Actions("ChangeNumberB", [x_1]);
  }, model.NumberB)), Tags.span(ofArray([Attributes.classy("control is-vcentered")]))(ofArray([Tags.div(ofArray([Attributes.classy("button is-primary")]))(ofArray([Tags.text(fsFormat("= %.2f")(function (x) {
    return x;
  })(model.Result))]))]))])), Tags.div(ofArray([Attributes.classy("column")]))(new List$1())]));
}
AppApi.start(AppApi.withSubscriber(function () {
  var router_1 = function router_1(m) {
    return routerF(m);
  };

  return function (message) {
    RouteParser.routeSubscriber(locationHandler, router_1, message);
  };
}(), AppApi.withProducer(function (handler) {
  RouteParser.routeProducer(locationHandler, router, handler);
}, AppApi.withStartNodeSelector("#sample", AppApi.createApp(Model.Initial, function (model) {
  return view(model);
}, function (model) {
  return function (action) {
    return update(model, action);
  };
}, function (selector) {
  return function (handler) {
    return function (view_1) {
      return createRender(selector, handler, view_1);
    };
  };
})))));

if (location.hash === "") {
  location.hash = "/";
} else {
  window.dispatchEvent(new Event("hashchange"));
}

exports.VDom = VDom;
exports.Actions = Actions;
exports.Operator = Operator;
exports.Page = Page;
exports.routes = routes;
exports.resolveRoutesToUrl = resolveRoutesToUrl;
exports.mapToRoute = mapToRoute;
exports.router = router;
exports.locationHandler = locationHandler;
exports.routerF = routerF;
exports.Model = Model;
exports.isValidNumber = isValidNumber;
exports.saveIntoURL = saveIntoURL;
exports.update = update;
exports.NumberAreaInfo = NumberAreaInfo;
exports.numberArea = numberArea;
exports.isSelected = isSelected;
exports.view = view;

}((this.sample = this.sample || {}),virtualDom));
