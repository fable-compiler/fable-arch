(function (exports) {
'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};



function unwrapExports (x) {
	return x && x.__esModule ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

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

var $export = _export;
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !_descriptors, 'Object', {defineProperty: _objectDp.f});

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
            : (typeof self !== "undefined" ? self : null));
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
function Option(t) {
    return new NonDeclaredType("Option", null, t);
}
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
        var keys = Object.getOwnPropertyNames(x);
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
        var keys = Object.getOwnPropertyNames(x);
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

function create(pattern, options) {
    var flags = "g";
    flags += options & 1 ? "i" : "";
    flags += options & 2 ? "m" : "";
    return new RegExp(pattern, flags);
}
function escape(str) {
    return str.replace(/[\-\[\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}


function match(str, pattern, options) {
    if (options === void 0) { options = 0; }
    var reg = str instanceof RegExp
        ? (reg = str, str = pattern, reg.lastIndex = options, reg)
        : reg = create(pattern, options);
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


function now() {
    return parse();
}









function day(d) {
    return d.kind === 2 ? d.getDate() : d.getUTCDate();
}
function hour(d) {
    return d.kind === 2 ? d.getHours() : d.getUTCHours();
}

function minute(d) {
    return d.kind === 2 ? d.getMinutes() : d.getUTCMinutes();
}
function month(d) {
    return (d.kind === 2 ? d.getMonth() : d.getUTCMonth()) + 1;
}
function second(d) {
    return d.kind === 2 ? d.getSeconds() : d.getUTCSeconds();
}
function year(d) {
    return d.kind === 2 ? d.getFullYear() : d.getUTCFullYear();
}

var fsFormatRegExp = /(^|[^%])%([0+ ]*)(-?\d+)?(?:\.(\d+))?(\w)/;
var formatRegExp = /\{(\d+)(,-?\d+)?(?:\:(.+?))?\}/g;



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
function format(str) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return str.replace(formatRegExp, function (match$$1, idx, pad, format) {
        var rep = args[idx], padSymbol = " ";
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
                case "x":
                    rep = toHex(Number(rep));
                    break;
                case "X":
                    rep = toHex(Number(rep)).toUpperCase();
                    break;
                default:
                    var m = /^(0+)(\.0+)?$/.exec(format);
                    if (m != null) {
                        var decs = 0;
                        if (m[2] != null)
                            rep = rep.toFixed(decs = m[2].length - 1);
                        pad = "," + (m[1].length + (decs ? decs + 1 : 0)).toString();
                        padSymbol = "0";
                    }
                    else if (format) {
                        rep = format;
                    }
            }
        }
        else if (rep instanceof Date) {
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
                        if (rep.kind === 2) {
                            var offset = rep.getTimezoneOffset() * -1;
                            rep = format("{0:yyyy-MM-dd}T{0:HH:mm}:{1:00.000}{2}{3:00}:{4:00}", rep, second(rep), offset >= 0 ? "+" : "-", ~~(offset / 60), offset % 60);
                        }
                        else {
                            rep = rep.toISOString();
                        }
                }
            }
            else {
                rep = format.replace(/\w+/g, function (match2) {
                    var rep2 = match2;
                    switch (match2.substring(0, 1)) {
                        case "y":
                            rep2 = match2.length < 4 ? year(rep) % 100 : year(rep);
                            break;
                        case "h":
                            rep2 = rep.getHours() > 12 ? hour(rep) % 12 : hour(rep);
                            break;
                        case "M":
                            rep2 = month(rep);
                            break;
                        case "d":
                            rep2 = day(rep);
                            break;
                        case "H":
                            rep2 = hour(rep);
                            break;
                        case "m":
                            rep2 = minute(rep);
                            break;
                        case "s":
                            rep2 = second(rep);
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
            rep = padLeft(rep, Math.abs(pad), padSymbol, pad < 0);
        }
        return rep;
    });
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




function split$$1(str, splitters, count, removeEmpty) {
    count = typeof count == "number" ? count : null;
    removeEmpty = typeof removeEmpty == "number" ? removeEmpty : null;
    if (count < 0)
        throw new Error("Count cannot be less than zero");
    if (count === 0)
        return [];
    splitters = Array.isArray(splitters) ? splitters : getRestParams(arguments, 1);
    splitters = splitters.map(function (x) { return escape(x); });
    splitters = splitters.length > 0 ? splitters : [" "];
    var m;
    var i = 0;
    var splits = [];
    var reg = new RegExp(splitters.join("|"), "g");
    while ((count == null || count > 1) && (m = reg.exec(str)) !== null) {
        if (!removeEmpty || (m.index - i) > 0) {
            count = count != null ? count - 1 : count;
            splits.push(str.substring(i, m.index));
        }
        i = reg.lastIndex;
    }
    if (!removeEmpty || (str.length - i) > 0)
        splits.push(str.substring(i));
    return splits;
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
function find(f, xs) {
    return __failIfNone(tryFind(f, xs));
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
function tree_spliceOutSuccessor(m) {
    if (m.Case === "MapOne") {
        return [m.Fields[0], m.Fields[1], new MapTree("MapEmpty", [])];
    }
    else if (m.Case === "MapNode") {
        if (m.Fields[2].Case === "MapEmpty") {
            return [m.Fields[0], m.Fields[1], m.Fields[3]];
        }
        else {
            var kvl = tree_spliceOutSuccessor(m.Fields[2]);
            return [kvl[0], kvl[1], tree_mk(kvl[2], m.Fields[0], m.Fields[1], m.Fields[3])];
        }
    }
    throw new Error("internal error: Map.spliceOutSuccessor");
}
function tree_remove(comparer, k, m) {
    if (m.Case === "MapOne") {
        var c = comparer.Compare(k, m.Fields[0]);
        if (c === 0) {
            return new MapTree("MapEmpty", []);
        }
        else {
            return m;
        }
    }
    else if (m.Case === "MapNode") {
        var c = comparer.Compare(k, m.Fields[0]);
        if (c < 0) {
            return tree_rebalance(tree_remove(comparer, k, m.Fields[2]), m.Fields[0], m.Fields[1], m.Fields[3]);
        }
        else {
            if (c === 0) {
                var matchValue = [m.Fields[2], m.Fields[3]];
                if (matchValue[0].Case === "MapEmpty") {
                    return m.Fields[3];
                }
                else {
                    if (matchValue[1].Case === "MapEmpty") {
                        return m.Fields[2];
                    }
                    else {
                        var patternInput = tree_spliceOutSuccessor(m.Fields[3]);
                        var sv = patternInput[1];
                        var sk = patternInput[0];
                        var r_ = patternInput[2];
                        return tree_mk(m.Fields[2], sk, sv, r_);
                    }
                }
            }
            else {
                return tree_rebalance(m.Fields[2], m.Fields[0], m.Fields[1], tree_remove(comparer, k, m.Fields[3]));
            }
        }
    }
    else {
        return tree_empty();
    }
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
function create$3(ie, comparer) {
    comparer = comparer || new GenericComparer();
    return from(comparer, ie ? tree_ofSeq(comparer, ie) : tree_empty());
}
function add$2(k, v, map$$1) {
    return from(map$$1.comparer, tree_add(map$$1.comparer, k, v, map$$1.tree));
}
function remove$1(item$$1, map$$1) {
    return from(map$$1.comparer, tree_remove(map$$1.comparer, item$$1, map$$1.tree));
}




function tryFind$1(k, map$$1) {
    return tree_tryFind(map$$1.comparer, k, map$$1.tree);
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
function mapIndexed$$1(f, xs) {
    return reverse$$1(fold(function (acc, x, i) { return new List$1(f(i, x), acc); }, new List$1(), xs));
}


function reverse$$1(xs) {
    return fold(function (acc, x) { return new List$1(x, acc); }, new List$1(), xs);
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
function mapEventHandler(mapping, e, f) {
    return new Types.Attribute("EventHandler", [[e, function ($var1) {
        return mapping(f($var1));
    }]]);
}
function mapAttributes(mapping, attribute) {
    return attribute.Case === "Style" ? new Types.Attribute("Style", [attribute.Fields[0]]) : attribute.Case === "Property" ? new Types.Attribute("Property", [attribute.Fields[0]]) : attribute.Case === "Attribute" ? new Types.Attribute("Attribute", [attribute.Fields[0]]) : mapEventHandler(mapping, attribute.Fields[0][0], attribute.Fields[0][1]);
}
function mapElem(mapping, node_0, node_1) {
    var node = [node_0, node_1];
    return [node[0], map$1(function (attribute) {
        return mapAttributes(mapping, attribute);
    }, node[1])];
}
function mapVoidElem(mapping, node_0, node_1) {
    var node = [node_0, node_1];
    return [node[0], map$1(function (attribute) {
        return mapAttributes(mapping, attribute);
    }, node[1])];
}
function map$$1(mapping, node) {
    return node.Case === "VoidElement" ? new Types.DomNode("VoidElement", [mapVoidElem(mapping, node.Fields[0][0], node.Fields[0][1])]) : node.Case === "Text" ? new Types.DomNode("Text", [node.Fields[0]]) : node.Case === "WhiteSpace" ? new Types.DomNode("WhiteSpace", [node.Fields[0]]) : node.Case === "Svg" ? new Types.DomNode("Element", [mapElem(mapping, node.Fields[0][0], node.Fields[0][1]), map$1(function (node_1) {
        return map$$1(mapping, node_1);
    }, node.Fields[1])]) : new Types.DomNode("Element", [mapElem(mapping, node.Fields[0][0], node.Fields[0][1]), map$1(function (node_1) {
        return map$$1(mapping, node_1);
    }, node.Fields[1])]);
}
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
        var h = function h(e) {
            e.stopPropagation();
            e.preventDefault();
            return f(e);
        };

        return new Types.Attribute("EventHandler", [[eventType, h]]);
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

var UserApi = function (__exports) {
  var Route = __exports.Route = function () {
    function Route(caseName, fields) {
      _classCallCheck(this, Route);

      this.Case = caseName;
      this.Fields = fields;
    }

    _createClass(Route, [{
      key: _Symbol.reflection,
      value: function () {
        return {
          type: "WebApp.Common.UserApi.Route",
          interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
          cases: {
            Create: [],
            Edit: ["number"],
            Index: [],
            Show: ["number"]
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

    return Route;
  }();

  setType("WebApp.Common.UserApi.Route", Route);
  return __exports;
}({});
var DocsApi = function (__exports) {
  var Route = __exports.Route = function () {
    function Route(caseName, fields) {
      _classCallCheck(this, Route);

      this.Case = caseName;
      this.Fields = fields;
    }

    _createClass(Route, [{
      key: _Symbol.reflection,
      value: function () {
        return {
          type: "WebApp.Common.DocsApi.Route",
          interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
          cases: {
            Index: [],
            Viewer: ["string"]
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

    return Route;
  }();

  setType("WebApp.Common.DocsApi.Route", Route);
  return __exports;
}({});
var SampleApi = function (__exports) {
  var Route = __exports.Route = function () {
    function Route(caseName, fields) {
      _classCallCheck(this, Route);

      this.Case = caseName;
      this.Fields = fields;
    }

    _createClass(Route, [{
      key: _Symbol.reflection,
      value: function () {
        return {
          type: "WebApp.Common.SampleApi.Route",
          interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
          cases: {
            Clock: [],
            Counter: [],
            HelloWorld: [],
            NestedCounter: []
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

    return Route;
  }();

  setType("WebApp.Common.SampleApi.Route", Route);
  return __exports;
}({});
var Route = function () {
  function Route(caseName, fields) {
    _classCallCheck(this, Route);

    this.Case = caseName;
    this.Fields = fields;
  }

  _createClass(Route, [{
    key: _Symbol.reflection,
    value: function () {
      return {
        type: "WebApp.Common.Route",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: {
          About: [],
          Docs: [DocsApi.Route],
          Index: [],
          Sample: [SampleApi.Route]
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

  return Route;
}();
setType("WebApp.Common.Route", Route);
function resolveRoutesToUrl(r) {
  if (r.Case === "Docs") {
    if (r.Fields[0].Case === "Viewer") {
      return fsFormat("/docs?fileName=%s")(function (x) {
        return x;
      })(r.Fields[0].Fields[0]);
    } else {
      return "/docs";
    }
  } else if (r.Case === "Sample") {
    if (r.Fields[0].Case === "Counter") {
      return "/sample/counter";
    } else if (r.Fields[0].Case === "HelloWorld") {
      return "/sample/hello-world";
    } else if (r.Fields[0].Case === "NestedCounter") {
      return "/sample/nested-counter";
    } else {
      return "/sample/clock";
    }
  } else if (r.Case === "About") {
    return "/about";
  } else {
    return "/";
  }
}
function voidLinkAction() {
  return Attributes.property("href", "javascript:void(0)");
}
var VDom = function (__exports) {
  var Types$$1 = __exports.Types = function (__exports) {
    var LabelInfo = __exports.LabelInfo = function () {
      function LabelInfo(refId, text) {
        _classCallCheck(this, LabelInfo);

        this.RefId = refId;
        this.Text = text;
      }

      _createClass(LabelInfo, [{
        key: _Symbol.reflection,
        value: function () {
          return {
            type: "WebApp.Common.VDom.Types.LabelInfo",
            interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
            properties: {
              RefId: "string",
              Text: "string"
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
      }, {
        key: "fRefId",
        get: function () {
          return fsFormat("f%s")(function (x) {
            return x;
          })(this.RefId);
        }
      }], [{
        key: "Create",
        value: function (refId, txt) {
          return new LabelInfo(refId, txt);
        }
      }]);

      return LabelInfo;
    }();

    setType("WebApp.Common.VDom.Types.LabelInfo", LabelInfo);

    var InputInfo = __exports.InputInfo = function () {
      function InputInfo(refId, placeholder, value, action) {
        _classCallCheck(this, InputInfo);

        this.RefId = refId;
        this.Placeholder = placeholder;
        this.Value = value;
        this.Action = action;
      }

      _createClass(InputInfo, [{
        key: _Symbol.reflection,
        value: function () {
          return {
            type: "WebApp.Common.VDom.Types.InputInfo",
            interfaces: ["FSharpRecord"],
            properties: {
              RefId: "string",
              Placeholder: "string",
              Value: "string",
              Action: "function"
            }
          };
        }
      }, {
        key: "ToLabelInfo",
        value: function (txt) {
          return new LabelInfo(this.RefId, txt);
        }
      }, {
        key: "fRefId",
        get: function () {
          return fsFormat("f%s")(function (x) {
            return x;
          })(this.RefId);
        }
      }], [{
        key: "Create",
        value: function (refId, placeholder, value, action) {
          return new InputInfo(refId, placeholder, value, action);
        }
      }]);

      return InputInfo;
    }();

    setType("WebApp.Common.VDom.Types.InputInfo", InputInfo);
    return __exports;
  }({});

  var Html = __exports.Html = function (__exports) {
    var onInput = __exports.onInput = function (x) {
      return Events.onEvent("oninput", function (e) {
        return x(e.target.value);
      });
    };

    var controlLabel = __exports.controlLabel = function (info) {
      return Tags.label(ofArray([Attributes.classy("label"), Attributes.attribute("for", info.fRefId)]))(ofArray([Tags.text(info.Text)]));
    };

    var formInput = __exports.formInput = function (info) {
      return Tags.div(new List$1())(ofArray([controlLabel(info.ToLabelInfo("Firstname")), Tags.p(ofArray([Attributes.classy("control")]))(ofArray([Tags.input(ofArray([Attributes.classy("input"), Attributes.attribute("id", info.fRefId), Attributes.attribute("type", "text"), Attributes.attribute("placeholder", info.Placeholder), Attributes.property("value", info.Value), onInput(function (x) {
        return info.Action(x);
      })]))]))]));
    };

    var column = __exports.column = function () {
      return Tags.div(ofArray([Attributes.classy("column")]))(new List$1());
    };

    var sampleView = __exports.sampleView = function (title, sampleDemoView, markdownText) {
      var markdownHTML = markdownText === "" ? Tags.div(ofArray([Attributes.classy("has-text-centered")]))(ofArray([Tags.i(ofArray([Attributes.classy("fa fa-spinner fa-pulse fa-3x fa-fw")]))(new List$1())])) : Tags.div(ofArray([Attributes.classy("content"), Attributes.property("innerHTML", markdownText)]))(new List$1());
      return Tags.div(ofArray([Attributes.classy("section")]))(ofArray([Tags.div(ofArray([Attributes.classy("content")]))(ofArray([Tags.h1(new List$1())(ofArray([Tags.text(title)]))])), Tags.div(ofArray([Attributes.classy("columns")]))(ofArray([Tags.div(ofArray([Attributes.classy("column is-half is-offset-one-quarter")]))(ofArray([sampleDemoView]))])), Tags.div(ofArray([Attributes.classy("content")]))(ofArray([Tags.h1(new List$1())(ofArray([Tags.text("Explanations")])), markdownHTML]))]));
    };

    return __exports;
  }({});

  return __exports;
}({});

var Model$1 = function () {
  function Model(currentPage) {
    _classCallCheck(this, Model);

    this.CurrentPage = currentPage;
  }

  _createClass(Model, [{
    key: _Symbol.reflection,
    value: function () {
      return {
        type: "WebApp.Navbar.Model",
        interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
        properties: {
          CurrentPage: Route
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
    key: "Initial",
    value: function (page) {
      return new Model(page);
    }
  }, {
    key: "CurrentPage_",
    get: function () {
      return [function (r) {
        return r.CurrentPage;
      }, function (v) {
        return function (r) {
          return new Model(v);
        };
      }];
    }
  }]);

  return Model;
}();
setType("WebApp.Navbar.Model", Model$1);
var Actions$1 = function () {
  function Actions(caseName, fields) {
    _classCallCheck(this, Actions);

    this.Case = caseName;
    this.Fields = fields;
  }

  _createClass(Actions, [{
    key: _Symbol.reflection,
    value: function () {
      return {
        type: "WebApp.Navbar.Actions",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: {
          NavigateTo: [Route],
          NoOp: []
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
setType("WebApp.Navbar.Actions", Actions$1);
var NavLink = function () {
  function NavLink(text, route) {
    _classCallCheck(this, NavLink);

    this.Text = text;
    this.Route = route;
  }

  _createClass(NavLink, [{
    key: _Symbol.reflection,
    value: function () {
      return {
        type: "WebApp.Navbar.NavLink",
        interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
        properties: {
          Text: "string",
          Route: Route
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
    key: "Create",
    value: function (text, route) {
      return new NavLink(text, route);
    }
  }]);

  return NavLink;
}();
setType("WebApp.Navbar.NavLink", NavLink);
function update$1(model, action) {
  if (action.Case === "NavigateTo") {
    var message = ofArray([function (_arg1) {
      var url = resolveRoutesToUrl(action.Fields[0]);

      if (url == null) {
        throw new Error("Cannot be reached. Route should always be resolve");
      } else {
        location.hash = url;
      }
    }]);
    return [model, message];
  } else {
    return [model, new List$1()];
  }
}

function navButton(id, href, faClass, txt) {
  return Tags.a(ofArray([Attributes.classy("button"), Attributes.property("id", id), Attributes.property("href", href), Attributes.property("target", "_blank")]))(ofArray([Tags.span(ofArray([Attributes.classy("icon")]))(ofArray([Tags.i(ofArray([Attributes.classy(fsFormat("fa %s")(function (x) {
    return x;
  })(faClass))]))(new List$1())])), Tags.span(new List$1())(ofArray([Tags.text(txt)]))]));
}
var navButtons = Tags.span(ofArray([Attributes.classy("nav-item")]))(ofArray([navButton("twitter", "https://twitter.com/FableCompiler", "fa-twitter", "Twitter"), navButton("github", "https://github.com/fable-compiler/fable-arch", "fa-github", "Fork me"), navButton("github", "https://gitter.im/fable-compiler/Fable", "fa-comments", "Gitter")]));
function view$1(model) {
  return Tags.nav(ofArray([Attributes.classy("nav")]))(ofArray([Tags.div(ofArray([Attributes.classy("nav-left")]))(ofArray([Tags.h1(ofArray([Attributes.classy("nav-item is-brand title is-4"), voidLinkAction()]))(ofArray([Tags.text("Fable-Arch")]))])), navButtons]));
}

var Model$2 = function () {
  function Model(currentPage) {
    _classCallCheck(this, Model);

    this.CurrentPage = currentPage;
  }

  _createClass(Model, [{
    key: _Symbol.reflection,
    value: function () {
      return {
        type: "WebApp.Header.Model",
        interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
        properties: {
          CurrentPage: Route
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
    key: "Initial",
    value: function (page) {
      return new Model(page);
    }
  }, {
    key: "CurrentPage_",
    get: function () {
      return [function (r) {
        return r.CurrentPage;
      }, function (v) {
        return function (r) {
          return new Model(v);
        };
      }];
    }
  }]);

  return Model;
}();
setType("WebApp.Header.Model", Model$2);
var Actions$2 = function () {
  function Actions(caseName, fields) {
    _classCallCheck(this, Actions);

    this.Case = caseName;
    this.Fields = fields;
  }

  _createClass(Actions, [{
    key: _Symbol.reflection,
    value: function () {
      return {
        type: "WebApp.Header.Actions",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: {
          NavigateTo: [Route],
          NoOp: []
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
setType("WebApp.Header.Actions", Actions$2);
var HeroLink = function () {
  function HeroLink(text, route) {
    _classCallCheck(this, HeroLink);

    this.Text = text;
    this.Route = route;
  }

  _createClass(HeroLink, [{
    key: _Symbol.reflection,
    value: function () {
      return {
        type: "WebApp.Header.HeroLink",
        interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
        properties: {
          Text: "string",
          Route: Route
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
    key: "Create",
    value: function (text, route) {
      return new HeroLink(text, route);
    }
  }]);

  return HeroLink;
}();
setType("WebApp.Header.HeroLink", HeroLink);
function update$2(model, action) {
  if (action.Case === "NavigateTo") {
    var message = ofArray([function (h) {
      var url = resolveRoutesToUrl(action.Fields[0]);

      if (url == null) {
        throw new Error("Cannot be reached. Route should always be resolve");
      } else {
        location.hash = url;
      }
    }]);
    return [model, message];
  } else {
    return [model, new List$1()];
  }
}
function footerLinkItem(menuLink, currentPage) {
  var isCurrentPage = function () {
    var _target0 = function _target0() {
      return menuLink.Route.Equals(currentPage);
    };

    if (currentPage.Case === "About") {
      return _target0();
    } else if (currentPage.Case === "Sample") {
      if (menuLink.Route.Case === "Sample") {
        return true;
      } else {
        return false;
      }
    } else if (currentPage.Case === "Docs") {
      if (menuLink.Route.Case === "Docs") {
        return true;
      } else {
        return false;
      }
    } else {
      return _target0();
    }
  }();

  return Tags.li(ofArray([Attributes.classList(ofArray([["is-active", isCurrentPage]]))]))(ofArray([Tags.a(ofArray([voidLinkAction(), Events.onMouseClick(function (_arg1) {
    return new Actions$2("NavigateTo", [menuLink.Route]);
  })]))(ofArray([Tags.text(menuLink.Text)]))]));
}
function footerLinks(items, currentPage) {
  return Tags.ul(new List$1())(map$1(function (x) {
    return footerLinkItem(x, currentPage);
  }, items));
}
function footer(model) {
  return Tags.div(ofArray([Attributes.classy("hero-foot")]))(ofArray([Tags.div(ofArray([Attributes.classy("container")]))(ofArray([Tags.nav(ofArray([Attributes.classy("tabs is-boxed")]))(ofArray([footerLinks(ofArray([HeroLink.Create("Home", new Route("Index", [])), HeroLink.Create("Docs", new Route("Docs", [new DocsApi.Route("Index", [])])), HeroLink.Create("Samples", new Route("Sample", [new SampleApi.Route("HelloWorld", [])])), HeroLink.Create("About", new Route("About", []))]), model.CurrentPage)]))]))]));
}
function view$2(model) {
  return Tags.section(ofArray([Attributes.classy("hero is-primary")]))(ofArray([Tags.div(ofArray([Attributes.classy("hero-body")]))(ofArray([Tags.div(ofArray([Attributes.classy("container")]))(ofArray([Tags.div(ofArray([Attributes.classy("columns is-vcentered")]))(ofArray([Tags.div(ofArray([Attributes.classy("column")]))(ofArray([Tags.h1(ofArray([Attributes.classy("title")]))(ofArray([Tags.text("Documentation")])), Tags.h2(ofArray([Attributes.classy("subtitle"), Attributes.property("innerHTML", "Everything you need to create a website using <strong>Fable Arch<strong>")]))(new List$1())]))]))]))])), footer(model)]));
}

var _createClass$3 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$3(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Result = function () {
    function Result(caseName, fields) {
        _classCallCheck$3(this, Result);

        this.Case = caseName;
        this.Fields = fields;
    }

    _createClass$3(Result, [{
        key: _Symbol.reflection,
        value: function value() {
            return {
                type: "Fable.PowerPack.Result.Result",
                interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
                cases: {
                    Error: [GenericParam("B")],
                    Ok: [GenericParam("A")]
                }
            };
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            return equalsUnions(this, other);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return compareUnions(this, other);
        }
    }]);

    return Result;
}();
setType("Fable.PowerPack.Result.Result", Result);

function map$4(fn, a) {
    return a.Case === "Error" ? new Result("Error", [a.Fields[0]]) : new Result("Ok", [fn(a.Fields[0])]);
}
function bind(fn, a) {
    return a.Case === "Error" ? new Result("Error", [a.Fields[0]]) : fn(a.Fields[0]);
}
var ResultBuilder = function () {
    _createClass$3(ResultBuilder, [{
        key: _Symbol.reflection,
        value: function value() {
            return {
                type: "Fable.PowerPack.Result.ResultBuilder",
                properties: {}
            };
        }
    }]);

    function ResultBuilder() {
        _classCallCheck$3(this, ResultBuilder);
    }

    _createClass$3(ResultBuilder, [{
        key: "Bind",
        value: function Bind(m, f) {
            return bind(f, m);
        }
    }, {
        key: "Return",
        value: function Return(a) {
            return new Result("Ok", [a]);
        }
    }, {
        key: "ReturnFrom",
        value: function ReturnFrom(m) {
            return m;
        }
    }, {
        key: "Combine",
        value: function Combine(left, right) {
            return this.Bind(left, function () {
                return right;
            });
        }
    }, {
        key: "Zero",
        get: function get() {
            var _this = this;

            return function (arg00) {
                return _this.Return(arg00);
            };
        }
    }]);

    return ResultBuilder;
}();
setType("Fable.PowerPack.Result.ResultBuilder", ResultBuilder);
var result = new ResultBuilder();

var _createClass$2 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _Promise = function (__exports) {
    var result$$1 = __exports.result = function result$$1(a) {
        return a.then(function (arg0) {
            return new Result("Ok", [arg0]);
        }, function (arg0) {
            return new Result("Error", [arg0]);
        });
    };

    var mapResult = __exports.mapResult = function mapResult(fn, a) {
        return a.then(function (a_1) {
            return map$4(fn, a_1);
        });
    };

    var bindResult = __exports.bindResult = function bindResult(fn, a) {
        return a.then(function (a_1) {
            return a_1.Case === "Error" ? Promise.resolve(new Result("Error", [a_1.Fields[0]])) : result$$1(fn(a_1.Fields[0]));
        });
    };

    var PromiseBuilder = __exports.PromiseBuilder = function () {
        _createClass$2(PromiseBuilder, [{
            key: _Symbol.reflection,
            value: function value() {
                return {
                    type: "Fable.PowerPack.Promise.PromiseBuilder",
                    properties: {}
                };
            }
        }]);

        function PromiseBuilder() {
            _classCallCheck$2(this, PromiseBuilder);
        }

        _createClass$2(PromiseBuilder, [{
            key: "For",
            value: function For(seq, body) {
                var p = Promise.resolve();
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    var _loop = function _loop() {
                        var a = _step.value;
                        p = p.then(function () {
                            return body(a);
                        });
                    };

                    for (var _iterator = seq[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        _loop();
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

                return p;
            }
        }, {
            key: "While",
            value: function While(guard, p) {
                var _this = this;

                return guard() ? p.then(function () {
                    return _this.While(guard, p);
                }) : Promise.resolve();
            }
        }, {
            key: "TryFinally",
            value: function TryFinally(p, compensation) {
                return p.then(function (x) {
                    compensation();
                    return x;
                }, function (er) {
                    compensation();
                    throw er;
                });
            }
        }, {
            key: "Delay",
            value: function Delay(generator) {
                return {
                    then: function then(f1, f2) {
                        try {
                            return generator().then(f1, f2);
                        } catch (er) {
                            if (f2 == null) {
                                return Promise.reject(er);
                            } else {
                                try {
                                    return Promise.resolve(f2(er));
                                } catch (er_1) {
                                    return Promise.reject(er_1);
                                }
                            }
                        }
                    },
                    catch: function _catch(f) {
                        try {
                            return generator().catch(f);
                        } catch (er) {
                            try {
                                return Promise.resolve(f(er));
                            } catch (er_1) {
                                return Promise.reject(er_1);
                            }
                        }
                    }
                };
            }
        }, {
            key: "Using",
            value: function Using(resource, binder) {
                return this.TryFinally(binder(resource), function () {
                    resource.Dispose();
                });
            }
        }]);

        return PromiseBuilder;
    }();

    setType("Fable.PowerPack.Promise.PromiseBuilder", PromiseBuilder);
    return __exports;
}({});

var PromiseImpl = function (__exports) {
    var promise = __exports.promise = new _Promise.PromiseBuilder();
    return __exports;
}({});

var SetTree = (function () {
    function SetTree(caseName, fields) {
        this.Case = caseName;
        this.Fields = fields;
    }
    return SetTree;
}());
function tree_countAux(s, acc) {
    return s.Case === "SetOne" ? acc + 1 : s.Case === "SetEmpty" ? acc : tree_countAux(s.Fields[1], tree_countAux(s.Fields[2], acc + 1));
}
function tree_count(s) {
    return tree_countAux(s, 0);
}
function tree_SetOne(n) {
    return new SetTree("SetOne", [n]);
}
function tree_SetNode(x, l, r, h) {
    return new SetTree("SetNode", [x, l, r, h]);
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

function _fetch(url, init) {
    return fetch(url, init).then(function (response) {
        return response.ok ? response : function () {
            throw new Error(String(response.status) + " " + response.statusText + " for URL " + response.url);
        }();
    });
}

var sampleSourceDirectory = "src/Pages/Sample";
var docFilesDirectory = "doc_files";
var rawUrl = "https://raw.githubusercontent.com/fable-compiler/fable-arch/gh-pages/";
function createSampleURL(file) {
  return fsFormat("%s/%s/%s")(function (x) {
    return x;
  })(rawUrl)(sampleSourceDirectory)(file);
}
function createDocFilesDirectoryURL(fileName) {
  return fsFormat("%s/%s/%s.md")(function (x) {
    return x;
  })(rawUrl)(docFilesDirectory)(fileName);
}
function createDocURL(fileName) {
  return fsFormat("#/docs?fileName=%s")(function (x) {
    return x;
  })(fileName);
}
var CaptureState = function () {
  function CaptureState(caseName, fields) {
    _classCallCheck(this, CaptureState);

    this.Case = caseName;
    this.Fields = fields;
  }

  _createClass(CaptureState, [{
    key: _Symbol.reflection,
    value: function () {
      return {
        type: "WebApp.DocGen.CaptureState",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: {
          Block: ["string"],
          Content: [],
          Nothing: []
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

  return CaptureState;
}();
setType("WebApp.DocGen.CaptureState", CaptureState);
var Block = function () {
  function Block(key, text) {
    _classCallCheck(this, Block);

    this.Key = key;
    this.Text = text;
  }

  _createClass(Block, [{
    key: _Symbol.reflection,
    value: function () {
      return {
        type: "WebApp.DocGen.Block",
        interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
        properties: {
          Key: "string",
          Text: "string"
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
    key: "Create",
    value: function (key, content) {
      return new Block(key, content);
    }
  }]);

  return Block;
}();
setType("WebApp.DocGen.Block", Block);
var ParserResult = function () {
  function ParserResult(text, blocks, captureState, offset) {
    _classCallCheck(this, ParserResult);

    this.Text = text;
    this.Blocks = blocks;
    this.CaptureState = captureState;
    this.Offset = offset;
  }

  _createClass(ParserResult, [{
    key: _Symbol.reflection,
    value: function () {
      return {
        type: "WebApp.DocGen.ParserResult",
        interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
        properties: {
          Text: "string",
          Blocks: makeGeneric(List$1, {
            T: Block
          }),
          CaptureState: CaptureState,
          Offset: "number"
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
    key: "Initial",
    get: function () {
      return new ParserResult("", new List$1(), new CaptureState("Nothing", []), 0);
    }
  }]);

  return ParserResult;
}();
setType("WebApp.DocGen.ParserResult", ParserResult);

function _Contains___(p, s) {
  if (s.indexOf(p) >= 0) {
    return s;
  }
}

function _IsBeginBlock___(input) {
  var pattern = ".*\\[BeginBlock:([a-z0-9]*)\\]";
  var m = match(input, pattern, 1);

  if (m != null) {
    return m[1];
  }
}

function _IsEndBlock___(input) {
  var pattern = ".*\\[EndBlock\\]";
  var m = match(input, pattern, 1);

  if (m != null) {
    return true;
  }
}

function _IsBlock___(input) {
  var pattern = ".*\\[Block:([a-z0-9]*)\\]";
  var m = match(input, pattern, 1);

  if (m != null) {
    return m[1];
  }
}

function _IsFsharpBlock___(input) {
  var pattern = ".*\\[FsharpBlock:([a-z0-9]*)\\]";
  var m = match(input, pattern, 1);

  if (m != null) {
    return m[1];
  }
}

function countStart(chars, index) {
  if (chars.tail == null) {
    return index;
  } else if (chars.head === " ") {
    return countStart(chars.tail, index + 1);
  } else {
    return index;
  }
}
function generateBlock(result, blockName, format$$1) {
  var exist = exists(function (x) {
    return x.Key === blockName;
  }, result.Blocks);
  var blockText = exist ? function (x) {
    return x.Text;
  }(filter$$1(function (x) {
    return x.Key === blockName;
  }, result.Blocks).head) : "";
  return new ParserResult(format$$1(function (x) {
    return x;
  })(result.Text)(blockText), result.Blocks, result.CaptureState, result.Offset);
}
function generateDocumentation(text) {
  var lines = toList(split$$1(text, "\n"));

  var parseSample = function parseSample(lines_1) {
    return function (result) {
      if (lines_1.tail == null) {
        return result;
      } else {
        var newResult = function () {
          var activePatternResult561 = _Contains___("[BeginDocs]", lines_1.head);

          if (activePatternResult561 != null) {
            var line = activePatternResult561;
            var CaptureState_1 = new CaptureState("Content", []);
            var Offset = countStart(toList(line.split("")), 0);
            return new ParserResult(result.Text, result.Blocks, CaptureState_1, Offset);
          } else {
            var activePatternResult559 = _Contains___("[EndDocs]", lines_1.head);

            if (activePatternResult559 != null) {
              var _line = activePatternResult559;

              var _CaptureState_ = new CaptureState("Nothing", []);

              var _Offset = 0;
              return new ParserResult(result.Text, result.Blocks, _CaptureState_, _Offset);
            } else {
              var activePatternResult557 = _IsBeginBlock___(lines_1.head);

              if (activePatternResult557 != null) {
                var groupName = activePatternResult557;

                var _CaptureState_2 = new CaptureState("Block", [groupName]);

                var _Offset2 = countStart(toList(lines_1.head.split("")), 0);

                return new ParserResult(result.Text, result.Blocks, _CaptureState_2, _Offset2);
              } else {
                var activePatternResult556 = _IsEndBlock___(lines_1.head);

                if (activePatternResult556 != null) {
                  var _CaptureState_3 = new CaptureState("Nothing", []);

                  var _Offset3 = 0;
                  return new ParserResult(result.Text, result.Blocks, _CaptureState_3, _Offset3);
                } else if (result.CaptureState.Case === "Block") {
                  var exist = exists(function (x) {
                    return x.Key === result.CaptureState.Fields[0];
                  }, result.Blocks);
                  var blocks_ = exist ? map$1(function (x) {
                    if (x.Key === result.CaptureState.Fields[0]) {
                      var _Text = fsFormat("%s\n%s")(function (x) {
                        return x;
                      })(x.Text)(lines_1.head.substr(result.Offset));

                      return new Block(x.Key, _Text);
                    } else {
                      return x;
                    }
                  }, result.Blocks) : new List$1(function (arg00) {
                    return function (arg10) {
                      return Block.Create(arg00, arg10);
                    };
                  }(result.CaptureState.Fields[0])(lines_1.head.substr(result.Offset)), result.Blocks);
                  return new ParserResult(result.Text, blocks_, result.CaptureState, result.Offset);
                } else if (result.CaptureState.Case === "Nothing") {
                  return result;
                } else {
                  var activePatternResult551 = _IsBlock___(lines_1.head);

                  if (activePatternResult551 != null) {
                    var name = activePatternResult551;
                    return generateBlock(result, name, fsFormat("%s\n%s"));
                  } else {
                    var activePatternResult550 = _IsFsharpBlock___(lines_1.head);

                    if (activePatternResult550 != null) {
                      var _name = activePatternResult550;
                      return generateBlock(result, _name, fsFormat("%s\n```fsharp\n%s```"));
                    } else {
                      return new ParserResult(fsFormat("%s\n%s")(function (x) {
                        return x;
                      })(result.Text)(lines_1.head.substr(result.Offset)), result.Blocks, result.CaptureState, result.Offset);
                    }
                  }
                }
              }
            }
          }
        }();

        return parseSample(lines_1.tail)(newResult);
      }
    };
  };

  var result = parseSample(lines)(ParserResult.Initial);
  return result.Text;
}
var Documentation = function () {
  _createClass(Documentation, [{
    key: _Symbol.reflection,
    value: function () {
      return {
        type: "WebApp.DocGen.Documentation",
        properties: {
          Html: "string"
        }
      };
    }
  }]);

  function Documentation(url) {
    _classCallCheck(this, Documentation);

    this.generated = false;
    this.html = "";
    this.sourceFile = createSampleURL(url);
  }

  _createClass(Documentation, [{
    key: "RetrieveFile",
    value: function () {
      var _this = this;

      _fetch(this.sourceFile, {}).then(function (res) {
        return res.text();
      }).then(function (text) {
        _this.html = function () {
          var objectArg = marked;
          return function (arg00) {
            return objectArg.parse(arg00);
          };
        }()(generateDocumentation(text));

        _this.generated = true;
      });
    }
  }, {
    key: "Html",
    get: function () {
      if (!this.generated) {
        this.RetrieveFile();
      }

      return this.html;
    }
  }]);

  return Documentation;
}();
setType("WebApp.DocGen.Documentation", Documentation);

var State = function () {
  function State(caseName, fields) {
    _classCallCheck(this, State);

    this.Case = caseName;
    this.Fields = fields;
  }

  _createClass(State, [{
    key: _Symbol.reflection,
    value: function () {
      return {
        type: "WebApp.Pages.Docs.Viewer.State",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: {
          Available: [],
          Pending: []
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

  return State;
}();
setType("WebApp.Pages.Docs.Viewer.State", State);
var DocHTML = function () {
  function DocHTML(fileName, html, state) {
    _classCallCheck(this, DocHTML);

    this.FileName = fileName;
    this.Html = html;
    this.State = state;
  }

  _createClass(DocHTML, [{
    key: _Symbol.reflection,
    value: function () {
      return {
        type: "WebApp.Pages.Docs.Viewer.DocHTML",
        interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
        properties: {
          FileName: "string",
          Html: "string",
          State: State
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
    key: "Initial",
    value: function (fileName) {
      return new DocHTML(fileName, "", new State("Pending", []));
    }
  }]);

  return DocHTML;
}();
setType("WebApp.Pages.Docs.Viewer.DocHTML", DocHTML);
var Model$4 = function () {
  function Model(currentFile, docsHTML) {
    _classCallCheck(this, Model);

    this.CurrentFile = currentFile;
    this.DocsHTML = docsHTML;
  }

  _createClass(Model, [{
    key: _Symbol.reflection,
    value: function () {
      return {
        type: "WebApp.Pages.Docs.Viewer.Model",
        interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
        properties: {
          CurrentFile: "string",
          DocsHTML: makeGeneric(List$1, {
            T: DocHTML
          })
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
    key: "Initial",
    get: function () {
      return new Model("", new List$1());
    }
  }]);

  return Model;
}();
setType("WebApp.Pages.Docs.Viewer.Model", Model$4);
var Actions$4 = function () {
  function Actions(caseName, fields) {
    _classCallCheck(this, Actions);

    this.Case = caseName;
    this.Fields = fields;
  }

  _createClass(Actions, [{
    key: _Symbol.reflection,
    value: function () {
      return {
        type: "WebApp.Pages.Docs.Viewer.Actions",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: {
          SetDoc: ["string"],
          SetDocHTML: ["string", "string"]
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
setType("WebApp.Pages.Docs.Viewer.Actions", Actions$4);
function update$4(model, action) {
  if (action.Case === "SetDocHTML") {
    var docs = map$1(function (doc) {
      if (doc.FileName === action.Fields[0]) {
        var State_1 = new State("Available", []);
        return new DocHTML(doc.FileName, action.Fields[1], State_1);
      } else {
        return doc;
      }
    }, model.DocsHTML);
    return [new Model$4(model.CurrentFile, docs), new List$1()];
  } else {
    var exist = exists(function (x) {
      return x.FileName === action.Fields[0];
    }, model.DocsHTML);

    if (exist) {
      return [new Model$4(action.Fields[0], model.DocsHTML), new List$1()];
    } else {
      var m_ = new Model$4(action.Fields[0], new List$1(DocHTML.Initial(action.Fields[0]), model.DocsHTML));
      var message = ofArray([function (h) {
        _fetch(createDocFilesDirectoryURL(action.Fields[0]), {}).then(function (res) {
          return res.text();
        }).then(function (text) {
          return h(new Actions$4("SetDocHTML", [action.Fields[0], marked.parse(text)]));
        });
      }]);
      return [m_, message];
    }
  }
}
function view$4(model) {
  var doc = function () {
    try {
      return find(function (x) {
        return x.FileName === model.CurrentFile;
      }, model.DocsHTML);
    } catch (matchValue) {
      return null;
    }
  }();

  var html = (function () {
    return doc != null;
  }(null) ? doc.State.Equals(new State("Available", [])) : false) ? Tags.div(ofArray([Attributes.property("innerHTML", doc.Html)]))(new List$1()) : Tags.div(ofArray([Attributes.classy("has-text-centered")]))(ofArray([Tags.i(ofArray([Attributes.classy("fa fa-spinner fa-pulse fa-3x fa-fw")]))(new List$1())]));
  return Tags.div(ofArray([Attributes.classy("section")]))(ofArray([Tags.div(ofArray([Attributes.classy("content")]))(ofArray([Tags.div(ofArray([Attributes.classy("container")]))(ofArray([html]))]))]));
}

var _createClass$4 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$4(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Types$1 = function (__exports) {
    var ModelChanged = __exports.ModelChanged = function () {
        function ModelChanged(previousState, message, currentState) {
            _classCallCheck$4(this, ModelChanged);

            this.PreviousState = previousState;
            this.Message = message;
            this.CurrentState = currentState;
        }

        _createClass$4(ModelChanged, [{
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
            _classCallCheck$4(this, AppEvent);

            this.Case = caseName;
            this.Fields = fields;
        }

        _createClass$4(AppEvent, [{
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
            _classCallCheck$4(this, AppMessage);

            this.Case = caseName;
            this.Fields = fields;
        }

        _createClass$4(AppMessage, [{
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
            _classCallCheck$4(this, Plugin);

            this.Producer = producer;
            this.Subscriber = subscriber;
        }

        _createClass$4(Plugin, [{
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
            _classCallCheck$4(this, AppSpecification);

            this.InitState = initState;
            this.View = view;
            this.Update = update;
            this.InitMessage = initMessage;
            this.CreateRenderer = createRenderer;
            this.NodeSelector = nodeSelector;
            this.Producers = producers;
            this.Subscribers = subscribers;
        }

        _createClass$4(AppSpecification, [{
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
            _classCallCheck$4(this, App);

            this.Model = model;
            this.Actions = actions;
            this.Render = render;
            this.Subscribers = subscribers;
        }

        _createClass$4(App, [{
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
                x();
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
        return _arg1.Case === "Replay" ? new Types$1.AppMessage("Replay", [_arg1.Fields[0], map$1(function (tupledArg) {
            return [tupledArg[0], map$$1(tupledArg[1])];
        }, _arg1.Fields[1])]) : new Types$1.AppMessage("Message", [map$$1(_arg1.Fields[0])]);
    };

    var mapProducer = __exports.mapProducer = function (map$$1, p) {
        return function (x) {
            mapAction(map$$1, p, x);
        };
    };

    var mapSubscriber = __exports.mapSubscriber = function (mapModelChanged, mapAction_1, sub, _arg1) {
        if (_arg1.Case === "ActionReceived") {
            (function (option) {
                iterate(sub, function () {
                    var $var6 = option;

                    if ($var6 != null) {
                        return [$var6];
                    } else {
                        return [];
                    }
                }());
            })(function () {
                var $var7 = mapAction_1(function (x) {
                    return x;
                })(_arg1.Fields[0]);

                if ($var7 != null) {
                    return function (arg0) {
                        return new Types$1.AppEvent("ActionReceived", [arg0]);
                    }($var7);
                } else {
                    return $var7;
                }
            }());
        } else {
            if (_arg1.Case === "Replayed") {
                sub(new Types$1.AppEvent("Replayed", [_arg1.Fields[0]]));
            } else {
                (function (option) {
                    iterate(sub, function () {
                        var $var8 = option;

                        if ($var8 != null) {
                            return [$var8];
                        } else {
                            return [];
                        }
                    }());
                })(function () {
                    var $var9 = mapModelChanged(_arg1.Fields[0]);

                    if ($var9 != null) {
                        return function (arg0) {
                            return new Types$1.AppEvent("ModelChanged", [arg0]);
                        }($var9);
                    } else {
                        return $var9;
                    }
                }());
            }
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
        var lift = function lift(h) {
            return function ($var10) {
                return h(function (arg0) {
                    return new Types$1.AppMessage("Message", [arg0]);
                }($var10));
            };
        };

        var producer_ = function producer_($var11) {
            return producer(lift($var11));
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
        return function ($var12) {
            return withInstrumentationProducer(plugin.Producer, withInstrumentationSubscriber(plugin.Subscriber, $var12));
        };
    };

    var configureProducers = __exports.configureProducers = function (producers, post) {
        iterate(function (p) {
            p(post);
        }, producers);
    };

    var start = __exports.start = function (appSpec) {
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

    return __exports;
}({});

var Model$3 = function () {
  function Model$$1(viewer) {
    _classCallCheck(this, Model$$1);

    this.Viewer = viewer;
  }

  _createClass(Model$$1, [{
    key: _Symbol.reflection,
    value: function () {
      return {
        type: "WebApp.Pages.Docs.Dispatcher.Model",
        interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
        properties: {
          Viewer: Model$4
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
    key: "Generate",
    value: function () {
      return new Model$$1(Model$4.Initial);
    }
  }, {
    key: "Initial",
    value: function (currentPage) {
      if (currentPage.Case === "Viewer") {
        return Model$$1.Generate();
      } else {
        return Model$$1.Generate();
      }
    }
  }]);

  return Model$$1;
}();
setType("WebApp.Pages.Docs.Dispatcher.Model", Model$3);
var Actions$3 = function () {
  function Actions$$1(caseName, fields) {
    _classCallCheck(this, Actions$$1);

    this.Case = caseName;
    this.Fields = fields;
  }

  _createClass(Actions$$1, [{
    key: _Symbol.reflection,
    value: function () {
      return {
        type: "WebApp.Pages.Docs.Dispatcher.Actions",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: {
          NoOp: [],
          ViewerActions: [Actions$4]
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

  return Actions$$1;
}();
setType("WebApp.Pages.Docs.Dispatcher.Actions", Actions$3);
function update$3(model, action) {
  if (action.Case === "ViewerActions") {
    var patternInput = update$4(model.Viewer, action.Fields[0]);
    var action_ = AppApi.mapActions(function (arg0) {
      return new Actions$3("ViewerActions", [arg0]);
    })(patternInput[1]);
    return [new Model$3(patternInput[0]), action_];
  } else {
    return [model, new List$1()];
  }
}
var TileDocs = function () {
  function TileDocs(title, subTitle, fileName) {
    _classCallCheck(this, TileDocs);

    this.Title = title;
    this.SubTitle = subTitle;
    this.FileName = fileName;
  }

  _createClass(TileDocs, [{
    key: _Symbol.reflection,
    value: function () {
      return {
        type: "WebApp.Pages.Docs.Dispatcher.TileDocs",
        interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
        properties: {
          Title: "string",
          SubTitle: "string",
          FileName: "string"
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

  return TileDocs;
}();
setType("WebApp.Pages.Docs.Dispatcher.TileDocs", TileDocs);
function tileDocs(info) {
  return Tags.div(ofArray([Attributes.classy("tile is-parent is-vertical")]))(ofArray([Tags.article(ofArray([Attributes.classy("tile is-child notification")]))(ofArray([Tags.p(ofArray([Attributes.classy("title")]))(ofArray([Tags.a(ofArray([voidLinkAction(), Attributes.property("href", createDocURL(info.FileName))]))(ofArray([Tags.text(info.Title)]))])), Tags.p(ofArray([Attributes.classy("subtitle")]))(ofArray([Tags.text(info.SubTitle)]))]))]));
}
function tileVertical(tiles) {
  return Tags.div(ofArray([Attributes.classy("tile is-vertical is-6")]))(function (list) {
    return map$1(function (info) {
      return tileDocs(info);
    }, list);
  }(tiles));
}
var indexView = Tags.div(ofArray([Attributes.classy("container")]))(ofArray([Tags.div(ofArray([Attributes.classy("section")]))(ofArray([Tags.div(ofArray([Attributes.classy("tile is-ancestor")]))(ofArray([tileVertical(ofArray([new TileDocs("Hot Module Replacement (HMR)", "Hot Module Reloading, or Replacement, is a feature where you inject update modules in a running application.\r\n                                  This opens up the possibility to time travel in the application without loosing context.\r\n                                  It also makes it easier to try out changes in the functionality while retaining the state of the application.", "hmr")])), tileVertical(ofArray([new TileDocs("Subscriber", "A subscriber is a function attach to an application. This subscriber will be notify every time an event/message\r\n                                  is being handle by the application.", "subscriber")]))]))]))]));
function view$3(model, subRoute) {
  if (subRoute.Case === "Viewer") {
    return map$$1(function (arg0) {
      return new Actions$3("ViewerActions", [arg0]);
    }, view$4(model.Viewer));
  } else {
    return indexView;
  }
}

// 7.1.4 ToInteger
var ceil  = Math.ceil;
var floor = Math.floor;
var _toInteger = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

var toInteger = _toInteger;
var defined   = _defined;
// true  -> String#at
// false -> String#codePointAt
var _stringAt = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

var _library = true;

var _redefine = _hide;

var hasOwnProperty = {}.hasOwnProperty;
var _has = function(it, key){
  return hasOwnProperty.call(it, key);
};

var _iterators = {};

var toString$1 = {}.toString;

var _cof = function(it){
  return toString$1.call(it).slice(8, -1);
};

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = _cof;
var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = _iobject;
var defined$1 = _defined;
var _toIobject = function(it){
  return IObject(defined$1(it));
};

// 7.1.15 ToLength
var toInteger$1 = _toInteger;
var min$1       = Math.min;
var _toLength = function(it){
  return it > 0 ? min$1(toInteger$1(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

var toInteger$2 = _toInteger;
var max$1       = Math.max;
var min$2       = Math.min;
var _toIndex = function(index, length){
  index = toInteger$2(index);
  return index < 0 ? max$1(index + length, 0) : min$2(index, length);
};

// false -> Array#indexOf
// true  -> Array#includes
var toIObject$1 = _toIobject;
var toLength  = _toLength;
var toIndex   = _toIndex;
var _arrayIncludes = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject$1($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var global$2 = _global;
var SHARED = '__core-js_shared__';
var store  = global$2[SHARED] || (global$2[SHARED] = {});
var _shared = function(key){
  return store[key] || (store[key] = {});
};

var id = 0;
var px = Math.random();
var _uid = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

var shared = _shared('keys');
var uid    = _uid;
var _sharedKey = function(key){
  return shared[key] || (shared[key] = uid(key));
};

var has$1          = _has;
var toIObject    = _toIobject;
var arrayIndexOf = _arrayIncludes(false);
var IE_PROTO$1     = _sharedKey('IE_PROTO');

var _objectKeysInternal = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO$1)has$1(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has$1(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

// IE 8- don't enum bug keys
var _enumBugKeys = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = _objectKeysInternal;
var enumBugKeys$1 = _enumBugKeys;

var _objectKeys = Object.keys || function keys(O){
  return $keys(O, enumBugKeys$1);
};

var dP$2       = _objectDp;
var anObject$2 = _anObject;
var getKeys  = _objectKeys;

var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties){
  anObject$2(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP$2.f(O, P = keys[i++], Properties[P]);
  return O;
};

var _html = _global.document && document.documentElement;

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject$1    = _anObject;
var dPs         = _objectDps;
var enumBugKeys = _enumBugKeys;
var IE_PROTO    = _sharedKey('IE_PROTO');
var Empty       = function(){ /* empty */ };
var PROTOTYPE$1   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = _domCreate('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  _html.appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE$1][enumBugKeys[i]];
  return createDict();
};

var _objectCreate = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE$1] = anObject$1(O);
    result = new Empty;
    Empty[PROTOTYPE$1] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

var _wks = createCommonjsModule(function (module) {
var store      = _shared('wks')
  , uid        = _uid
  , Symbol     = _global.Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;
});

var def = _objectDp.f;
var has$2 = _has;
var TAG = _wks('toStringTag');

var _setToStringTag = function(it, tag, stat){
  if(it && !has$2(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

var create$5         = _objectCreate;
var descriptor     = _propertyDesc;
var setToStringTag$1 = _setToStringTag;
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
_hide(IteratorPrototype, _wks('iterator'), function(){ return this; });

var _iterCreate = function(Constructor, NAME, next){
  Constructor.prototype = create$5(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag$1(Constructor, NAME + ' Iterator');
};

// 7.1.13 ToObject(argument)
var defined$2 = _defined;
var _toObject = function(it){
  return Object(defined$2(it));
};

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has$3         = _has;
var toObject    = _toObject;
var IE_PROTO$2    = _sharedKey('IE_PROTO');
var ObjectProto = Object.prototype;

var _objectGpo = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has$3(O, IE_PROTO$2))return O[IE_PROTO$2];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

var LIBRARY        = _library;
var $export$2        = _export;
var redefine       = _redefine;
var hide$1           = _hide;
var has            = _has;
var Iterators      = _iterators;
var $iterCreate    = _iterCreate;
var setToStringTag = _setToStringTag;
var getPrototypeOf = _objectGpo;
var ITERATOR       = _wks('iterator');
var BUGGY          = !([].keys && 'next' in [].keys());
var FF_ITERATOR    = '@@iterator';
var KEYS           = 'keys';
var VALUES         = 'values';

var returnThis = function(){ return this; };

var _iterDefine = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide$1(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide$1(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export$2($export$2.P + $export$2.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

var $at  = _stringAt(true);

// 21.1.3.27 String.prototype[@@iterator]()
_iterDefine(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

var _addToUnscopables = function(){ /* empty */ };

var _iterStep = function(done, value){
  return {value: value, done: !!done};
};

var addToUnscopables = _addToUnscopables;
var step             = _iterStep;
var Iterators$2        = _iterators;
var toIObject$2        = _toIobject;

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
var es6_array_iterator = _iterDefine(Array, 'Array', function(iterated, kind){
  this._t = toIObject$2(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators$2.Arguments = Iterators$2.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

var global$3        = _global;
var hide$2          = _hide;
var Iterators$1     = _iterators;
var TO_STRING_TAG = _wks('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global$3[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide$2(proto, TO_STRING_TAG, NAME);
  Iterators$1[NAME] = Iterators$1.Array;
}

var f$1 = _wks;

var _wksExt = {
	f: f$1
};

var iterator$2 = _wksExt.f('iterator');

var iterator = createCommonjsModule(function (module) {
module.exports = { "default": iterator$2, __esModule: true };
});

var _meta = createCommonjsModule(function (module) {
var META     = _uid('meta')
  , isObject = _isObject
  , has      = _has
  , setDesc  = _objectDp.f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !_fails(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};
});

var global$5         = _global;
var core$1           = _core;
var LIBRARY$1        = _library;
var wksExt$1         = _wksExt;
var defineProperty$4 = _objectDp.f;
var _wksDefine = function(name){
  var $Symbol = core$1.Symbol || (core$1.Symbol = LIBRARY$1 ? {} : global$5.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty$4($Symbol, name, {value: wksExt$1.f(name)});
};

var getKeys$1   = _objectKeys;
var toIObject$4 = _toIobject;
var _keyof = function(object, el){
  var O      = toIObject$4(object)
    , keys   = getKeys$1(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};

var f$2 = Object.getOwnPropertySymbols;

var _objectGops = {
	f: f$2
};

var f$3 = {}.propertyIsEnumerable;

var _objectPie = {
	f: f$3
};

// all enumerable object keys, includes symbols
var getKeys$2 = _objectKeys;
var gOPS    = _objectGops;
var pIE     = _objectPie;
var _enumKeys = function(it){
  var result     = getKeys$2(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};

// 7.2.2 IsArray(argument)
var cof$1 = _cof;
var _isArray = Array.isArray || function isArray(arg){
  return cof$1(arg) == 'Array';
};

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys$2      = _objectKeysInternal;
var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

var f$5 = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys$2(O, hiddenKeys);
};

var _objectGopn = {
	f: f$5
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject$5 = _toIobject;
var gOPN$1      = _objectGopn.f;
var toString$2  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN$1(it);
  } catch(e){
    return windowNames.slice();
  }
};

var f$4 = function getOwnPropertyNames(it){
  return windowNames && toString$2.call(it) == '[object Window]' ? getWindowNames(it) : gOPN$1(toIObject$5(it));
};

var _objectGopnExt = {
	f: f$4
};

var pIE$1            = _objectPie;
var createDesc$2     = _propertyDesc;
var toIObject$6      = _toIobject;
var toPrimitive$2    = _toPrimitive;
var has$5            = _has;
var IE8_DOM_DEFINE$1 = _ie8DomDefine;
var gOPD$1           = Object.getOwnPropertyDescriptor;

var f$6 = _descriptors ? gOPD$1 : function getOwnPropertyDescriptor(O, P){
  O = toIObject$6(O);
  P = toPrimitive$2(P, true);
  if(IE8_DOM_DEFINE$1)try {
    return gOPD$1(O, P);
  } catch(e){ /* empty */ }
  if(has$5(O, P))return createDesc$2(!pIE$1.f.call(O, P), O[P]);
};

var _objectGopd = {
	f: f$6
};

// ECMAScript 6 symbols shim
var global$4         = _global;
var has$4            = _has;
var DESCRIPTORS    = _descriptors;
var $export$3        = _export;
var redefine$1       = _redefine;
var META           = _meta.KEY;
var $fails         = _fails;
var shared$1         = _shared;
var setToStringTag$2 = _setToStringTag;
var uid$1            = _uid;
var wks            = _wks;
var wksExt         = _wksExt;
var wksDefine      = _wksDefine;
var keyOf          = _keyof;
var enumKeys       = _enumKeys;
var isArray$1        = _isArray;
var anObject$3       = _anObject;
var toIObject$3      = _toIobject;
var toPrimitive$1    = _toPrimitive;
var createDesc$1     = _propertyDesc;
var _create        = _objectCreate;
var gOPNExt        = _objectGopnExt;
var $GOPD          = _objectGopd;
var $DP            = _objectDp;
var $keys$1          = _objectKeys;
var gOPD           = $GOPD.f;
var dP$3             = $DP.f;
var gOPN           = gOPNExt.f;
var $Symbol        = global$4.Symbol;
var $JSON          = global$4.JSON;
var _stringify     = $JSON && $JSON.stringify;
var PROTOTYPE$2      = 'prototype';
var HIDDEN         = wks('_hidden');
var TO_PRIMITIVE   = wks('toPrimitive');
var isEnum         = {}.propertyIsEnumerable;
var SymbolRegistry = shared$1('symbol-registry');
var AllSymbols     = shared$1('symbols');
var OPSymbols      = shared$1('op-symbols');
var ObjectProto$1    = Object[PROTOTYPE$2];
var USE_NATIVE     = typeof $Symbol == 'function';
var QObject        = global$4.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP$3({}, 'a', {
    get: function(){ return dP$3(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto$1, key);
  if(protoDesc)delete ObjectProto$1[key];
  dP$3(it, key, D);
  if(protoDesc && it !== ObjectProto$1)dP$3(ObjectProto$1, key, protoDesc);
} : dP$3;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE$2]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto$1)$defineProperty(OPSymbols, key, D);
  anObject$3(it);
  key = toPrimitive$1(key, true);
  anObject$3(D);
  if(has$4(AllSymbols, key)){
    if(!D.enumerable){
      if(!has$4(it, HIDDEN))dP$3(it, HIDDEN, createDesc$1(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has$4(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc$1(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP$3(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject$3(it);
  var keys = enumKeys(P = toIObject$3(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive$1(key, true));
  if(this === ObjectProto$1 && has$4(AllSymbols, key) && !has$4(OPSymbols, key))return false;
  return E || !has$4(this, key) || !has$4(AllSymbols, key) || has$4(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject$3(it);
  key = toPrimitive$1(key, true);
  if(it === ObjectProto$1 && has$4(AllSymbols, key) && !has$4(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has$4(AllSymbols, key) && !(has$4(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject$3(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has$4(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto$1
    , names  = gOPN(IS_OP ? OPSymbols : toIObject$3(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has$4(AllSymbols, key = names[i++]) && (IS_OP ? has$4(ObjectProto$1, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid$1(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto$1)$set.call(OPSymbols, value);
      if(has$4(this, HIDDEN) && has$4(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc$1(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto$1, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine$1($Symbol[PROTOTYPE$2], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  _objectGopn.f = gOPNExt.f = $getOwnPropertyNames;
  _objectPie.f  = $propertyIsEnumerable;
  _objectGops.f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !_library){
    redefine$1(ObjectProto$1, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  };
}

$export$3($export$3.G + $export$3.W + $export$3.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i$1 = 0; symbols.length > i$1; )wks(symbols[i$1++]);

for(var symbols = $keys$1(wks.store), i$1 = 0; symbols.length > i$1; )wksDefine(symbols[i$1++]);

$export$3($export$3.S + $export$3.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has$4(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export$3($export$3.S + $export$3.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export$3($export$3.S + $export$3.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray$1(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE$2][TO_PRIMITIVE] || _hide($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag$2($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag$2(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag$2(global$4.JSON, 'JSON', true);

_wksDefine('asyncIterator');

_wksDefine('observable');

var index = _core.Symbol;

var symbol = createCommonjsModule(function (module) {
module.exports = { "default": index, __esModule: true };
});

var _typeof_1 = createCommonjsModule(function (module, exports) {
"use strict";

exports.__esModule = true;

var _iterator = iterator;

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = symbol;

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};
});

var _typeof = unwrapExports(_typeof_1);

var Actions$6 = function () {
  function Actions(caseName, fields) {
    _classCallCheck(this, Actions);

    this.Case = caseName;
    this.Fields = fields;
  }

  _createClass(Actions, [{
    key: _Symbol.reflection,
    value: function () {
      return {
        type: "WebApp.Pages.Sample.Clock.Actions",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: {
          Tick: [Date]
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
setType("WebApp.Pages.Sample.Clock.Actions", Actions$6);
var Model$6 = function () {
  function Model(time, date$$1) {
    _classCallCheck(this, Model);

    this.Time = time;
    this.Date = date$$1;
  }

  _createClass(Model, [{
    key: _Symbol.reflection,
    value: function () {
      return {
        type: "WebApp.Pages.Sample.Clock.Model",
        interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
        properties: {
          Time: "string",
          Date: "string"
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
    key: "Initial",
    get: function () {
      return new Model("00:00:00", "01/01/1970");
    }
  }]);

  return Model;
}();
setType("WebApp.Pages.Sample.Clock.Model", Model$6);
function normalizeNumber(x) {
  if (x < 10) {
    return fsFormat("0%i")(function (x) {
      return x;
    })(x);
  } else {
    return String(x);
  }
}
function update$6(model, action) {
  var patternInput = function () {
    var day$$1 = normalizeNumber(day(action.Fields[0]));
    var month$$1 = normalizeNumber(month(action.Fields[0]));
    var date$$1 = fsFormat("%s/%s/%i")(function (x) {
      return x;
    })(month$$1)(day$$1)(year(action.Fields[0]));
    return [new Model$6(format("{0:HH:mm:ss}", action.Fields[0]), date$$1), new List$1()];
  }();

  return [patternInput[0], patternInput[1]];
}
function sampleDemo(model) {
  return Tags.div(ofArray([Attributes.classy("content has-text-centered")]))(ofArray([Tags.h1(ofArray([Attributes.classy("is-marginless")]))(ofArray([Tags.text(fsFormat("%s %s")(function (x) {
    return x;
  })(model.Date)(model.Time))]))]));
}
var docs = new Documentation("Sample_Clock.fs");
function view$6(model) {
  return VDom.Html.sampleView("Clock sample", sampleDemo(model), docs.Html);
}

var Actions$7 = function () {
  function Actions(caseName, fields) {
    _classCallCheck(this, Actions);

    this.Case = caseName;
    this.Fields = fields;
  }

  _createClass(Actions, [{
    key: _Symbol.reflection,
    value: function () {
      return {
        type: "WebApp.Pages.Sample.Counter.Actions",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: {
          Add: [],
          Reset: [],
          Sub: []
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
setType("WebApp.Pages.Sample.Counter.Actions", Actions$7);
var Model$7 = function () {
  function Model(value) {
    _classCallCheck(this, Model);

    this.Value = value;
  }

  _createClass(Model, [{
    key: _Symbol.reflection,
    value: function () {
      return {
        type: "WebApp.Pages.Sample.Counter.Model",
        interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
        properties: {
          Value: "number"
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
    key: "Initial",
    get: function () {
      return new Model(0);
    }
  }]);

  return Model;
}();
setType("WebApp.Pages.Sample.Counter.Model", Model$7);
function update$7(model, action) {
  if (action.Case === "Sub") {
    return [new Model$7(model.Value - 1), new List$1()];
  } else if (action.Case === "Reset") {
    return [new Model$7(0), new List$1()];
  } else {
    return [new Model$7(model.Value + 1), new List$1()];
  }
}
function simpleButton(txt, action) {
  return Tags.div(ofArray([Attributes.classy("column is-narrow")]))(ofArray([Tags.a(ofArray([Attributes.classy("button"), voidLinkAction(), Events.onMouseClick(function (_arg1) {
    return action;
  })]))(ofArray([Tags.text(txt)]))]));
}
function sampleDemo$1(model) {
  return Tags.div(ofArray([Attributes.classy("columns is-vcentered")]))(ofArray([Tags.div(ofArray([Attributes.classy("column is-narrow"), new Types.Attribute("Style", [ofArray([["width", "170px"]])])]))(ofArray([Tags.text(fsFormat("Counter value: %i")(function (x) {
    return x;
  })(model.Value))])), simpleButton("+1", new Actions$7("Add", [])), simpleButton("-1", new Actions$7("Sub", [])), simpleButton("Reset", new Actions$7("Reset", []))]));
}
var docs$1 = new Documentation("Sample_Counter.fs");
function view$7(model) {
  return VDom.Html.sampleView("Counter sample", sampleDemo$1(model), docs$1.Html);
}

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof$2 = _cof;
var TAG$1 = _wks('toStringTag');
var ARG = cof$2(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

var _classof = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T
    // builtinTag case
    : ARG ? cof$2(O)
    // ES3 arguments fallback
    : (B = cof$2(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

var classof   = _classof;
var ITERATOR$1  = _wks('iterator');
var Iterators$3 = _iterators;
var core_getIteratorMethod = _core.getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR$1]
    || it['@@iterator']
    || Iterators$3[classof(it)];
};

var anObject$4 = _anObject;
var get      = core_getIteratorMethod;
var core_getIterator = _core.getIterator = function(it){
  var iterFn = get(it);
  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
  return anObject$4(iterFn.call(it));
};

var getIterator$1 = core_getIterator;

var getIterator = createCommonjsModule(function (module) {
module.exports = { "default": getIterator$1, __esModule: true };
});

var _getIterator = unwrapExports(getIterator);

var Actions$8 = function () {
  function Actions$$1(caseName, fields) {
    _classCallCheck(this, Actions$$1);

    this.Case = caseName;
    this.Fields = fields;
  }

  _createClass(Actions$$1, [{
    key: _Symbol.reflection,
    value: function () {
      return {
        type: "WebApp.Pages.Sample.NestedCounter.Actions",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: {
          CounterActions: ["number", Model$7, Actions$7],
          CreateCounter: [],
          DeleteCounter: ["number"],
          ResetAll: []
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

  return Actions$$1;
}();
setType("WebApp.Pages.Sample.NestedCounter.Actions", Actions$8);
var Model$8 = function () {
  function Model$$1(counters, nextId) {
    _classCallCheck(this, Model$$1);

    this.Counters = counters;
    this.NextId = nextId;
  }

  _createClass(Model$$1, [{
    key: _Symbol.reflection,
    value: function () {
      return {
        type: "WebApp.Pages.Sample.NestedCounter.Model",
        interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
        properties: {
          Counters: makeGeneric(List$1, {
            T: Tuple(["number", Model$7])
          }),
          NextId: "number"
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
    key: "Initial",
    get: function () {
      return new Model$$1(new List$1(), 0);
    }
  }]);

  return Model$$1;
}();
setType("WebApp.Pages.Sample.NestedCounter.Model", Model$8);
function update$8(model, action) {
  if (action.Case === "DeleteCounter") {
    var counters = filter$$1(function (tupledArg) {
      return tupledArg[0] !== action.Fields[0];
    }, model.Counters);
    return [new Model$8(counters, model.NextId), new List$1()];
  } else if (action.Case === "ResetAll") {
    var message = ofArray([function (h) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _getIterator(model.Counters), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var forLoopVar = _step.value;
          h(new Actions$8("CounterActions", [forLoopVar[0], forLoopVar[1], new Actions$7("Reset", [])]));
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
    }]);
    return [model, message];
  } else if (action.Case === "CounterActions") {
    var _ret = function () {
      var patternInput = update$7(action.Fields[1], action.Fields[2]);
      var mActions = AppApi.mapActions(function (tupledArg) {
        return new Actions$8("CounterActions", [tupledArg[0], tupledArg[1], tupledArg[2]]);
      })(patternInput[1]);
      var counters = map$1(function (tupledArg) {
        if (tupledArg[0] === action.Fields[0]) {
          return [tupledArg[0], patternInput[0]];
        } else {
          return [tupledArg[0], tupledArg[1]];
        }
      }, model.Counters);
      return {
        v: [new Model$8(counters, model.NextId), mActions]
      };
    }();

    if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
  } else {
    return [new Model$8(append$$1(model.Counters, ofArray([[model.NextId, Model$7.Initial]])), model.NextId + 1), new List$1()];
  }
}
function simpleButton$1(txt, action) {
  return Tags.div(ofArray([Attributes.classy("column is-narrow")]))(ofArray([Tags.a(ofArray([Attributes.classy("button"), voidLinkAction(), Events.onMouseClick(function (_arg1) {
    return action;
  })]))(ofArray([Tags.text(txt)]))]));
}
function counterRow(id, counter) {
  return Tags.div(ofArray([Attributes.classy("columns is-vcentered")]))(ofArray([VDom.Html.column(), Tags.div(ofArray([Attributes.classy("column")]))(ofArray([Tags.a(ofArray([Attributes.classy("button"), voidLinkAction(), Events.onMouseClick(function (_arg1) {
    return new Actions$8("DeleteCounter", [id]);
  })]))(ofArray([Tags.i(ofArray([Attributes.classy("fa fa-trash")]))(new List$1())]))])), Tags.div(new List$1())(ofArray([map$$1(function (act) {
    return new Actions$8("CounterActions", [id, counter, act]);
  }, sampleDemo$1(counter))])), VDom.Html.column()]));
}
function sampleDemo$2(model) {
  var countersView = map$1(function (tupledArg) {
    return counterRow(tupledArg[0], tupledArg[1]);
  }, model.Counters);
  return Tags.div(new List$1())(new List$1(Tags.div(ofArray([Attributes.classy("columns is-vcentered")]))(ofArray([VDom.Html.column(), simpleButton$1("Create a new counter", new Actions$8("CreateCounter", [])), simpleButton$1("Reset all", new Actions$8("ResetAll", [])), VDom.Html.column()])), countersView));
}
var docs$2 = new Documentation("Sample_NestedCounter.fs");
function view$8(model) {
  return VDom.Html.sampleView("Nested counter sample", sampleDemo$2(model), docs$2.Html);
}

var Actions$9 = function () {
  function Actions(caseName, fields) {
    _classCallCheck(this, Actions);

    this.Case = caseName;
    this.Fields = fields;
  }

  _createClass(Actions, [{
    key: _Symbol.reflection,
    value: function () {
      return {
        type: "WebApp.Pages.Sample.HelloWorld.Actions",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: {
          ChangeInput: ["string"]
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
setType("WebApp.Pages.Sample.HelloWorld.Actions", Actions$9);
function update$9(model, action) {
  return [action.Fields[0], new List$1()];
}
function sampleDemo$3(model) {
  return Tags.div(new List$1())(ofArray([Tags.label(ofArray([Attributes.classy("label")]))(ofArray([Tags.text("Enter your name:")])), Tags.p(ofArray([Attributes.classy("control")]))(ofArray([Tags.input(ofArray([Attributes.classy("input"), Attributes.property("type", "text"), Attributes.property("placeholder", "Ex: Joe Doe"), Attributes.property("value", model), VDom.Html.onInput(function (arg0) {
    return new Actions$9("ChangeInput", [arg0]);
  })]))])), Tags.span(new List$1())(ofArray([Tags.text(fsFormat("Hello %s")(function (x) {
    return x;
  })(model))]))]));
}
var docs$3 = new Documentation("Sample_HelloWorld.fs");
function view$9(model) {
  return VDom.Html.sampleView("Hello world sample", sampleDemo$3(model), docs$3.Html);
}

var Model$5 = function () {
  function Model$$1(clock, counter, helloWorld, nestedCounter) {
    _classCallCheck(this, Model$$1);

    this.Clock = clock;
    this.Counter = counter;
    this.HelloWorld = helloWorld;
    this.NestedCounter = nestedCounter;
  }

  _createClass(Model$$1, [{
    key: _Symbol.reflection,
    value: function () {
      return {
        type: "WebApp.Pages.Sample.Dispatcher.Model",
        interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
        properties: {
          Clock: Option(Model$6),
          Counter: Option(Model$7),
          HelloWorld: Option("string"),
          NestedCounter: Option(Model$8)
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
    key: "Generate",
    value: function (index, counter, helloWorld, nestedCounter) {
      return new Model$$1(index, counter, helloWorld, nestedCounter);
    }
  }, {
    key: "Initial",
    value: function (currentPage) {
      if (currentPage.Case === "Counter") {
        return Model$$1.Generate(null, Model$7.Initial);
      } else if (currentPage.Case === "HelloWorld") {
        return Model$$1.Generate(null, null, "");
      } else if (currentPage.Case === "NestedCounter") {
        return Model$$1.Generate(null, null, null, Model$8.Initial);
      } else {
        return Model$$1.Generate(Model$6.Initial);
      }
    }
  }]);

  return Model$$1;
}();
setType("WebApp.Pages.Sample.Dispatcher.Model", Model$5);
var NavbarLink = function () {
  function NavbarLink(text, route) {
    _classCallCheck(this, NavbarLink);

    this.Text = text;
    this.Route = route;
  }

  _createClass(NavbarLink, [{
    key: _Symbol.reflection,
    value: function () {
      return {
        type: "WebApp.Pages.Sample.Dispatcher.NavbarLink",
        interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
        properties: {
          Text: "string",
          Route: SampleApi.Route
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
    key: "Create",
    value: function (text, route) {
      return new NavbarLink(text, route);
    }
  }]);

  return NavbarLink;
}();
setType("WebApp.Pages.Sample.Dispatcher.NavbarLink", NavbarLink);
var Actions$5 = function () {
  function Actions$$1(caseName, fields) {
    _classCallCheck(this, Actions$$1);

    this.Case = caseName;
    this.Fields = fields;
  }

  _createClass(Actions$$1, [{
    key: _Symbol.reflection,
    value: function () {
      return {
        type: "WebApp.Pages.Sample.Dispatcher.Actions",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: {
          ClockActions: [Actions$6],
          CounterActions: [Actions$7],
          HelloWorldActions: [Actions$9],
          NavigateTo: [SampleApi.Route],
          NestedCounterActions: [Actions$8]
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

  return Actions$$1;
}();
setType("WebApp.Pages.Sample.Dispatcher.Actions", Actions$5);
function update$5(model, action) {
  if (action.Case === "CounterActions") {
    var _ret = function () {
      var patternInput = update$7(model.Counter, action.Fields[0]);
      var action_ = AppApi.mapActions(function (arg0) {
        return new Actions$5("CounterActions", [arg0]);
      })(patternInput[1]);
      return {
        v: [function () {
          var Counter = patternInput[0];
          return new Model$5(model.Clock, Counter, model.HelloWorld, model.NestedCounter);
        }(), action_]
      };
    }();

    if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
  } else if (action.Case === "HelloWorldActions") {
    var _ret2 = function () {
      var patternInput = update$9(model.HelloWorld, action.Fields[0]);
      var action_ = AppApi.mapActions(function (arg0) {
        return new Actions$5("HelloWorldActions", [arg0]);
      })(patternInput[1]);
      return {
        v: [function () {
          var HelloWorld = patternInput[0];
          return new Model$5(model.Clock, model.Counter, HelloWorld, model.NestedCounter);
        }(), action_]
      };
    }();

    if ((typeof _ret2 === "undefined" ? "undefined" : _typeof(_ret2)) === "object") return _ret2.v;
  } else if (action.Case === "NestedCounterActions") {
    var _ret3 = function () {
      var patternInput = update$8(model.NestedCounter, action.Fields[0]);
      var action_ = AppApi.mapActions(function (arg0) {
        return new Actions$5("NestedCounterActions", [arg0]);
      })(patternInput[1]);
      return {
        v: [function () {
          var NestedCounter = patternInput[0];
          return new Model$5(model.Clock, model.Counter, model.HelloWorld, NestedCounter);
        }(), action_]
      };
    }();

    if ((typeof _ret3 === "undefined" ? "undefined" : _typeof(_ret3)) === "object") return _ret3.v;
  } else if (action.Case === "NavigateTo") {
    var message = ofArray([function (h) {
      var url = resolveRoutesToUrl(new Route("Sample", [action.Fields[0]]));

      if (url == null) {
        throw new Error("Cannot be reached. Route should always be resolve");
      } else {
        location.hash = url;
      }
    }]);
    return [model, message];
  } else {
    var patternInput = update$6(model.Clock, action.Fields[0]);
    var action_ = AppApi.mapActions(function (arg0) {
      return new Actions$5("ClockActions", [arg0]);
    })(patternInput[1]);
    return [new Model$5(patternInput[0], model.Counter, model.HelloWorld, model.NestedCounter), action_];
  }
}
function navItem$1(item, currentPage) {
  return Tags.a(ofArray([Attributes.classList(ofArray([["is-active", item.Route.Equals(currentPage)], ["nav-item is-tab", true]])), voidLinkAction(), Events.onMouseClick(function (_arg1) {
    return new Actions$5("NavigateTo", [item.Route]);
  })]))(ofArray([Tags.text(item.Text)]));
}
function navbar(items, currentPage) {
  return Tags.div(ofArray([Attributes.classy("nav-left")]))(map$1(function (item) {
    return navItem$1(item, currentPage);
  }, items));
}
function view$5(model, subRoute) {
  var htmlContent = subRoute.Case === "Counter" ? map$$1(function (arg0) {
    return new Actions$5("CounterActions", [arg0]);
  }, view$7(model.Counter)) : subRoute.Case === "HelloWorld" ? map$$1(function (arg0) {
    return new Actions$5("HelloWorldActions", [arg0]);
  }, view$9(model.HelloWorld)) : subRoute.Case === "NestedCounter" ? map$$1(function (arg0) {
    return new Actions$5("NestedCounterActions", [arg0]);
  }, view$8(model.NestedCounter)) : map$$1(function (arg0) {
    return new Actions$5("ClockActions", [arg0]);
  }, view$6(model.Clock));
  return Tags.div(new List$1())(ofArray([Tags.nav(ofArray([Attributes.classy("nav has-shadow")]))(ofArray([Tags.div(ofArray([Attributes.classy("container")]))(ofArray([navbar(ofArray([NavbarLink.Create("Hello world", new SampleApi.Route("HelloWorld", [])), NavbarLink.Create("Counter", new SampleApi.Route("Counter", [])), NavbarLink.Create("Nested counter", new SampleApi.Route("NestedCounter", [])), NavbarLink.Create("Clock", new SampleApi.Route("Clock", []))]), subRoute)]))])), Tags.div(ofArray([Attributes.classy("container")]))(ofArray([htmlContent]))]));
}

// call something on iterator step with safe closing on error
var anObject$5 = _anObject;
var _iterCall = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject$5(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject$5(ret.call(iterator));
    throw e;
  }
};

// check on default Array iterator
var Iterators$4  = _iterators;
var ITERATOR$2   = _wks('iterator');
var ArrayProto = Array.prototype;

var _isArrayIter = function(it){
  return it !== undefined && (Iterators$4.Array === it || ArrayProto[ITERATOR$2] === it);
};

var $defineProperty$1 = _objectDp;
var createDesc$3      = _propertyDesc;

var _createProperty = function(object, index, value){
  if(index in object)$defineProperty$1.f(object, index, createDesc$3(0, value));
  else object[index] = value;
};

var ITERATOR$3     = _wks('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR$3]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

var _iterDetect = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR$3]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR$3] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};

var ctx$1            = _ctx;
var $export$4        = _export;
var toObject$1       = _toObject;
var call           = _iterCall;
var isArrayIter    = _isArrayIter;
var toLength$1       = _toLength;
var createProperty = _createProperty;
var getIterFn      = core_getIteratorMethod;

$export$4($export$4.S + $export$4.F * !_iterDetect(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject$1(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx$1(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength$1(O.length);
      for(result = new C(length); length > index; index++){
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

var from$3 = _core.Array.from;

var from$2 = createCommonjsModule(function (module) {
module.exports = { "default": from$3, __esModule: true };
});

var _Array$from = unwrapExports(from$2);

var Choice = (function () {
    function Choice(t, d) {
        this.Case = t;
        this.Fields = d;
    }
    Object.defineProperty(Choice.prototype, "valueIfChoice1", {
        get: function () {
            return this.Case === "Choice1Of2" ? this.Fields[0] : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Choice.prototype, "valueIfChoice2", {
        get: function () {
            return this.Case === "Choice2Of2" ? this.Fields[0] : null;
        },
        enumerable: true,
        configurable: true
    });
    Choice.prototype.Equals = function (other) {
        return equalsUnions(this, other);
    };
    Choice.prototype.CompareTo = function (other) {
        return compareUnions(this, other);
    };
    Choice.prototype[_Symbol.reflection] = function () {
        return {
            type: "Microsoft.FSharp.Core.FSharpChoice",
            interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"]
        };
    };
    return Choice;
}());

var Compose = function (__exports) {
  var Lens = __exports.Lens = function () {
    function Lens(caseName, fields) {
      _classCallCheck(this, Lens);

      this.Case = caseName;
      this.Fields = fields;
    }

    _createClass(Lens, [{
      key: _Symbol.reflection,
      value: function () {
        return {
          type: "Aether.Compose.Lens",
          interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
          cases: {
            Lens: []
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
    }], [{
      key: "op_GreaterMinusGreater_0",
      value: function (_arg1, _arg2) {
        return function (_arg1_1) {
          return [function (a) {
            return _arg2[0](_arg1_1[0](a));
          }, function (c) {
            return function (a) {
              return _arg1_1[1](_arg2[1](c)(_arg1_1[0](a)))(a);
            };
          }];
        };
      }
    }, {
      key: "op_GreaterMinusGreater_1",
      value: function (_arg3, _arg4) {
        return function (_arg2) {
          return [function (a) {
            return _arg4[0](_arg2[0](a));
          }, function (c) {
            return function (a) {
              return _arg2[1](_arg4[1](c)(_arg2[0](a)))(a);
            };
          }];
        };
      }
    }, {
      key: "op_GreaterMinusGreater_2",
      value: function (_arg5, _arg6) {
        return function (_arg3) {
          return [function (a) {
            return _arg6[0](_arg3[0](a));
          }, function (c) {
            return function (a) {
              return _arg3[1](_arg6[1](c))(a);
            };
          }];
        };
      }
    }, {
      key: "op_GreaterMinusGreater_3",
      value: function (_arg7, _arg8) {
        return function (_arg4) {
          return [function (a) {
            return _arg8[0](_arg4[0](a));
          }, function (c) {
            return function (a) {
              return _arg4[1](_arg8[1](c))(a);
            };
          }];
        };
      }
    }]);

    return Lens;
  }();

  setType("Aether.Compose.Lens", Lens);

  var Prism = __exports.Prism = function () {
    function Prism(caseName, fields) {
      _classCallCheck(this, Prism);

      this.Case = caseName;
      this.Fields = fields;
    }

    _createClass(Prism, [{
      key: _Symbol.reflection,
      value: function () {
        return {
          type: "Aether.Compose.Prism",
          interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
          cases: {
            Prism: []
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
    }], [{
      key: "op_GreaterQmarkGreater_0",
      value: function (_arg1, _arg2) {
        return function (_arg1_1) {
          return [function (a) {
            return defaultArg(_arg1_1[0](a), null, _arg2[0]);
          }, function (c) {
            return function (a) {
              return function (_arg9) {
                if (_arg9 != null) {
                  return _arg1_1[1](_arg9)(a);
                } else {
                  return a;
                }
              }(defaultArg(_arg1_1[0](a), null, _arg2[1](c)));
            };
          }];
        };
      }
    }, {
      key: "op_GreaterQmarkGreater_1",
      value: function (_arg3, _arg4) {
        return function (_arg2) {
          return [function (a) {
            return defaultArg(_arg2[0](a), null, _arg4[0]);
          }, function (c) {
            return function (a) {
              return function (_arg10) {
                if (_arg10 != null) {
                  return _arg2[1](_arg10)(a);
                } else {
                  return a;
                }
              }(defaultArg(_arg2[0](a), null, _arg4[1](c)));
            };
          }];
        };
      }
    }, {
      key: "op_GreaterQmarkGreater_2",
      value: function (_arg5, _arg6) {
        return function (_arg3) {
          return [function (a) {
            return defaultArg(_arg3[0](a), null, _arg6[0]);
          }, function (c) {
            return function (a) {
              return _arg3[1](_arg6[1](c))(a);
            };
          }];
        };
      }
    }, {
      key: "op_GreaterQmarkGreater_3",
      value: function (_arg7, _arg8) {
        return function (_arg4) {
          return [function (a) {
            return defaultArg(_arg4[0](a), null, _arg8[0]);
          }, function (c) {
            return function (a) {
              return _arg4[1](_arg8[1](c))(a);
            };
          }];
        };
      }
    }]);

    return Prism;
  }();

  setType("Aether.Compose.Prism", Prism);
  return __exports;
}({});
var Optic = function (__exports) {
  var Get = __exports.Get = function () {
    function Get(caseName, fields) {
      _classCallCheck(this, Get);

      this.Case = caseName;
      this.Fields = fields;
    }

    _createClass(Get, [{
      key: _Symbol.reflection,
      value: function () {
        return {
          type: "Aether.Optic.Get",
          interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
          cases: {
            Get: []
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
    }], [{
      key: "op_HatDot_0",
      value: function (_arg1, _arg2) {
        return function (a) {
          return _arg2[0](a);
        };
      }
    }, {
      key: "op_HatDot_1",
      value: function (_arg3, _arg4) {
        return function (a) {
          return _arg4[0](a);
        };
      }
    }]);

    return Get;
  }();

  setType("Aether.Optic.Get", Get);

  var _Set = __exports.Set = function () {
    function _Set(caseName, fields) {
      _classCallCheck(this, _Set);

      this.Case = caseName;
      this.Fields = fields;
    }

    _createClass(_Set, [{
      key: _Symbol.reflection,
      value: function () {
        return {
          type: "Aether.Optic.Set",
          interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
          cases: {
            Set: []
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
    }], [{
      key: "op_HatEquals_0",
      value: function (_arg1, _arg2) {
        return function (b) {
          return _arg2[1](b);
        };
      }
    }, {
      key: "op_HatEquals_1",
      value: function (_arg3, _arg4) {
        return function (b) {
          return _arg4[1](b);
        };
      }
    }]);

    return _Set;
  }();

  setType("Aether.Optic.Set", _Set);

  var _Map = __exports.Map = function () {
    function _Map(caseName, fields) {
      _classCallCheck(this, _Map);

      this.Case = caseName;
      this.Fields = fields;
    }

    _createClass(_Map, [{
      key: _Symbol.reflection,
      value: function () {
        return {
          type: "Aether.Optic.Map",
          interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
          cases: {
            Map: []
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
    }], [{
      key: "op_HatPercent_0",
      value: function (_arg1, _arg2) {
        return function (f) {
          return function (a) {
            return _arg2[1](f(_arg2[0](a)))(a);
          };
        };
      }
    }, {
      key: "op_HatPercent_1",
      value: function (_arg3, _arg4) {
        return function (f) {
          return function (a) {
            return function (_arg5) {
              if (_arg5 != null) {
                return _arg4[1](_arg5)(a);
              } else {
                return a;
              }
            }(defaultArg(_arg4[0](a), null, f));
          };
        };
      }
    }]);

    return _Map;
  }();

  setType("Aether.Optic.Map", _Map);
  return __exports;
}({});
var LensModule = function (__exports) {
  var ofIsomorphism = __exports.ofIsomorphism = function (_arg1_0, _arg1_1) {
    var _arg1 = [_arg1_0, _arg1_1];
    return [_arg1[0], function (b) {
      return function (_arg1_2) {
        return _arg1[1](b);
      };
    }];
  };

  return __exports;
}({});
var PrismModule = function (__exports) {
  var ofEpimorphism = __exports.ofEpimorphism = function (_arg1_0, _arg1_1) {
    var _arg1 = [_arg1_0, _arg1_1];
    return [_arg1[0], function (b) {
      return function (_arg1_2) {
        return _arg1[1](b);
      };
    }];
  };

  return __exports;
}({});
var Optics = function (__exports) {
  var id_ = __exports.id_ = function () {
    return [function (x) {
      return x;
    }, function (x) {
      return function (_arg1) {
        return x;
      };
    }];
  };

  var box_ = __exports.box_ = function () {
    return [function (value) {
      return value;
    }, function (value) {
      return value;
    }];
  };

  var fst_ = __exports.fst_ = function () {
    return [function (tuple) {
      return tuple[0];
    }, function (a) {
      return function (t) {
        return [a, t[1]];
      };
    }];
  };

  var snd_ = __exports.snd_ = function () {
    return [function (tuple) {
      return tuple[1];
    }, function (b) {
      return function (t) {
        return [t[0], b];
      };
    }];
  };

  var _Array = __exports.Array = function (__exports) {
    var list_ = __exports.list_ = function () {
      return [function (array) {
        return toList(array);
      }, function (list) {
        return _Array$from(list);
      }];
    };

    return __exports;
  }({});

  var Choice$$1 = __exports.Choice = function (__exports) {
    var choice1Of2_ = __exports.choice1Of2_ = function () {
      return [function (x) {
        if (x.Case === "Choice1Of2") {
          return x.Fields[0];
        }
      }, function (v) {
        return function (x) {
          if (x.Case === "Choice1Of2") {
            return new Choice("Choice1Of2", [v]);
          } else {
            return x;
          }
        };
      }];
    };

    var choice2Of2_ = __exports.choice2Of2_ = function () {
      return [function (x) {
        if (x.Case === "Choice2Of2") {
          return x.Fields[0];
        }
      }, function (v) {
        return function (x) {
          if (x.Case === "Choice2Of2") {
            return new Choice("Choice2Of2", [v]);
          } else {
            return x;
          }
        };
      }];
    };

    return __exports;
  }({});

  var List = __exports.List = function (__exports) {
    var head_ = __exports.head_ = function () {
      return [function (_arg1) {
        if (_arg1.tail != null) {
          return _arg1.head;
        }
      }, function (v) {
        return function (_arg2) {
          if (_arg2.tail != null) {
            return new List$1(v, _arg2.tail);
          } else {
            return _arg2;
          }
        };
      }];
    };

    var pos_ = __exports.pos_ = function (i) {
      return [function (_arg1) {
        if (_arg1.length > i) {
          return item(i, _arg1);
        }
      }, function (v) {
        return function (l) {
          return mapIndexed$$1(function (i_, x) {
            if (i === i_) {
              return v;
            } else {
              return x;
            }
          }, l);
        };
      }];
    };

    var tail_ = __exports.tail_ = function () {
      return [function (_arg1) {
        if (_arg1.tail != null) {
          return _arg1.tail;
        }
      }, function (t) {
        return function (_arg2) {
          if (_arg2.tail == null) {
            return new List$1();
          } else {
            return new List$1(_arg2.head, t);
          }
        };
      }];
    };

    var array_ = __exports.array_ = function () {
      return [function (list) {
        return _Array$from(list);
      }, function (array) {
        return ofArray(array);
      }];
    };

    return __exports;
  }({});

  var _Map = __exports.Map = function (__exports) {
    var key_ = __exports.key_ = function (k) {
      return [function (table) {
        return tryFind$1(k, table);
      }, function (v) {
        return function (x) {
          if (x.has(k)) {
            return add$2(k, v, x);
          } else {
            return x;
          }
        };
      }];
    };

    var value_ = __exports.value_ = function (k) {
      return [function (table) {
        return tryFind$1(k, table);
      }, function (v) {
        return function (x) {
          if (v != null) {
            return add$2(k, v, x);
          } else {
            return remove$1(k, x);
          }
        };
      }];
    };

    var array_ = __exports.array_ = function () {
      return [function (table) {
        return _Array$from(table);
      }, function (elements) {
        return create$3(elements, new GenericComparer(compare));
      }];
    };

    var list_ = __exports.list_ = function () {
      return [function (table) {
        return toList(table);
      }, function (elements) {
        return create$3(elements, new GenericComparer(compare));
      }];
    };

    return __exports;
  }({});

  var Option$$1 = __exports.Option = function (__exports) {
    var value_ = __exports.value_ = function () {
      return [function (x) {
        return x;
      }, function (v) {
        return function (_arg1) {
          if (_arg1 == null) {
            return null;
          } else {
            return v;
          }
        };
      }];
    };

    return __exports;
  }({});

  return __exports;
}({});

var markdownText = "\r\n# About\n\nThis website is written with:\n\n- [Fable](http://fable.io/) a transpiler F# to Javascript\n- [Fable-arch](https://github.com/fable-compiler/fable-arch) a set of tools for building modern web applications inspired by the [elm architecture](http://guide.elm-lang.org/architecture/index.html).\n- [Bulma](http://bulma.io/) a modern CSS framework based on Flexbox\n- [Marked](https://github.com/chjj/marked) a markdown parser and compiler. Built for speed\n- [PrismJS](http://prismjs.com/) a lightweight, extensible syntax highlighter\n    ";
function view$10() {
  return Tags.div(ofArray([Attributes.classy("section")]))(ofArray([Tags.div(ofArray([Attributes.classy("container")]))(ofArray([Tags.div(ofArray([Attributes.classy("content"), Attributes.property("innerHTML", marked.parse(markdownText))]))(new List$1())]))]));
}

var markdownText$1 = "\r\n# Fable-arch samples\r\n\r\nFable-arch is a set of tools for building modern web applications inspired by the [elm architecture](http://guide.elm-lang.org/architecture/index.html).\r\n\r\nFable-arch use [Fable](http://fable.io/) which allow you to write your code using F# and compile in JavaScript.\r\n\r\nIt is implemented around a set of abstractions which makes it possible to implement custom renderers if there is a need.\r\nFable-arch comes with a HTML Dsl and a renderer built on top of [virtual-dom](https://github.com/Matt-Esch/virtual-dom) and all\r\nthe samples here are using those two tools.\r\nHopefully the samples here show you how to get started and gives you some inspiration about how to build your application using Fable-arch.\r\n\r\nYou can also contribute more examples by sending us a pull request.\n    ";
function view$11() {
  return Tags.div(ofArray([Attributes.classy("section")]))(ofArray([Tags.div(ofArray([Attributes.classy("container")]))(ofArray([Tags.div(ofArray([Attributes.classy("content"), Attributes.property("innerHTML", marked.parse(markdownText$1))]))(new List$1())]))]));
}

var _createClass$5 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$5(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Parsing = function (__exports) {
    var Result = __exports.Result = function () {
        function Result(caseName, fields) {
            _classCallCheck$5(this, Result);

            this.Case = caseName;
            this.Fields = fields;
        }

        _createClass$5(Result, [{
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
            _classCallCheck$5(this, Parser);

            this.parseFn = parseFn;
            this.label = label;
        }

        _createClass$5(Parser, [{
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
            return isNullOrEmpty(input) ? new Result("Failure", [[label, "No more input"]]) : function () {
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
            }();
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
        var f_1 = function f_1($var15) {
            return function (x) {
                return returnP(x);
            }(f($var15));
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
        return reduce(function ($var16, $var17) {
            return op_LessBarGreater()($var16)($var17);
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
            return input === "" ? new Result("Success", [["", ""]]) : run(parser, input);
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
                        return count_ === 0 ? new Result("Success", [[reverse$$1(acc), input_]]) : function () {
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
                        }();
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
        var none = returnP();
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
            _classCallCheck$5(this, LocationHandler);

            this.SubscribeToChange = subscribeToChange;
            this.PushChange = pushChange;
        }

        _createClass$5(LocationHandler, [{
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
            _classCallCheck$5(this, Router);

            this.Parse = parse;
            this.Route = route;
        }

        _createClass$5(Router, [{
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

var nativeIsArray = Array.isArray;
var toString$3 = Object.prototype.toString;

var index$4 = nativeIsArray || isArray$3;

function isArray$3(obj) {
    return toString$3.call(obj) === "[object Array]"
}

var version$1 = "2";

var version = version$1;

VirtualPatch.NONE = 0;
VirtualPatch.VTEXT = 1;
VirtualPatch.VNODE = 2;
VirtualPatch.WIDGET = 3;
VirtualPatch.PROPS = 4;
VirtualPatch.ORDER = 5;
VirtualPatch.INSERT = 6;
VirtualPatch.REMOVE = 7;
VirtualPatch.THUNK = 8;

var vpatch = VirtualPatch;

function VirtualPatch(type, vNode, patch) {
    this.type = Number(type);
    this.vNode = vNode;
    this.patch = patch;
}

VirtualPatch.prototype.version = version;
VirtualPatch.prototype.type = "VirtualPatch";

var version$3 = version$1;

var isVnode = isVirtualNode;

function isVirtualNode(x) {
    return x && x.type === "VirtualNode" && x.version === version$3
}

var version$4 = version$1;

var isVtext = isVirtualText;

function isVirtualText(x) {
    return x && x.type === "VirtualText" && x.version === version$4
}

var isWidget_1 = isWidget$1;

function isWidget$1(w) {
    return w && w.type === "Widget"
}

var isThunk_1 = isThunk$1;

function isThunk$1(t) {
    return t && t.type === "Thunk"
}

var isVNode$1 = isVnode;
var isVText$1 = isVtext;
var isWidget$2 = isWidget_1;
var isThunk$2 = isThunk_1;

var handleThunk_1 = handleThunk$1;

function handleThunk$1(a, b) {
    var renderedA = a;
    var renderedB = b;

    if (isThunk$2(b)) {
        renderedB = renderThunk(b, a);
    }

    if (isThunk$2(a)) {
        renderedA = renderThunk(a, null);
    }

    return {
        a: renderedA,
        b: renderedB
    }
}

function renderThunk(thunk, previous) {
    var renderedThunk = thunk.vnode;

    if (!renderedThunk) {
        renderedThunk = thunk.vnode = thunk.render(previous);
    }

    if (!(isVNode$1(renderedThunk) ||
            isVText$1(renderedThunk) ||
            isWidget$2(renderedThunk))) {
        throw new Error("thunk did not return a valid node");
    }

    return renderedThunk
}

var index$6 = function isObject(x) {
	return typeof x === "object" && x !== null;
};

var isVhook = isHook$1;

function isHook$1(hook) {
    return hook &&
      (typeof hook.hook === "function" && !hook.hasOwnProperty("hook") ||
       typeof hook.unhook === "function" && !hook.hasOwnProperty("unhook"))
}

var isObject$3 = index$6;
var isHook = isVhook;

var diffProps_1 = diffProps$1;

function diffProps$1(a, b) {
    var diff;

    for (var aKey in a) {
        if (!(aKey in b)) {
            diff = diff || {};
            diff[aKey] = undefined;
        }

        var aValue = a[aKey];
        var bValue = b[aKey];

        if (aValue === bValue) {
            continue
        } else if (isObject$3(aValue) && isObject$3(bValue)) {
            if (getPrototype(bValue) !== getPrototype(aValue)) {
                diff = diff || {};
                diff[aKey] = bValue;
            } else if (isHook(bValue)) {
                 diff = diff || {};
                 diff[aKey] = bValue;
            } else {
                var objectDiff = diffProps$1(aValue, bValue);
                if (objectDiff) {
                    diff = diff || {};
                    diff[aKey] = objectDiff;
                }
            }
        } else {
            diff = diff || {};
            diff[aKey] = bValue;
        }
    }

    for (var bKey in b) {
        if (!(bKey in a)) {
            diff = diff || {};
            diff[bKey] = b[bKey];
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

var isArray$2 = index$4;

var VPatch = vpatch;
var isVNode = isVnode;
var isVText = isVtext;
var isWidget = isWidget_1;
var isThunk = isThunk_1;
var handleThunk = handleThunk_1;

var diffProps = diffProps_1;

var diff_1$2 = diff$2;

function diff$2(a, b) {
    var patch = { a: a };
    walk(a, b, patch, 0);
    return patch
}

function walk(a, b, patch, index) {
    if (a === b) {
        return
    }

    var apply = patch[index];
    var applyClear = false;

    if (isThunk(a) || isThunk(b)) {
        thunks(a, b, patch, index);
    } else if (b == null) {

        // If a is a widget we will add a remove patch for it
        // Otherwise any child widgets/hooks must be destroyed.
        // This prevents adding two remove patches for a widget.
        if (!isWidget(a)) {
            clearState(a, patch, index);
            apply = patch[index];
        }

        apply = appendPatch(apply, new VPatch(VPatch.REMOVE, a, b));
    } else if (isVNode(b)) {
        if (isVNode(a)) {
            if (a.tagName === b.tagName &&
                a.namespace === b.namespace &&
                a.key === b.key) {
                var propsPatch = diffProps(a.properties, b.properties);
                if (propsPatch) {
                    apply = appendPatch(apply,
                        new VPatch(VPatch.PROPS, a, propsPatch));
                }
                apply = diffChildren(a, b, patch, apply, index);
            } else {
                apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b));
                applyClear = true;
            }
        } else {
            apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b));
            applyClear = true;
        }
    } else if (isVText(b)) {
        if (!isVText(a)) {
            apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b));
            applyClear = true;
        } else if (a.text !== b.text) {
            apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b));
        }
    } else if (isWidget(b)) {
        if (!isWidget(a)) {
            applyClear = true;
        }

        apply = appendPatch(apply, new VPatch(VPatch.WIDGET, a, b));
    }

    if (apply) {
        patch[index] = apply;
    }

    if (applyClear) {
        clearState(a, patch, index);
    }
}

function diffChildren(a, b, patch, apply, index) {
    var aChildren = a.children;
    var orderedSet = reorder(aChildren, b.children);
    var bChildren = orderedSet.children;

    var aLen = aChildren.length;
    var bLen = bChildren.length;
    var len = aLen > bLen ? aLen : bLen;

    for (var i = 0; i < len; i++) {
        var leftNode = aChildren[i];
        var rightNode = bChildren[i];
        index += 1;

        if (!leftNode) {
            if (rightNode) {
                // Excess nodes in b need to be added
                apply = appendPatch(apply,
                    new VPatch(VPatch.INSERT, null, rightNode));
            }
        } else {
            walk(leftNode, rightNode, patch, index);
        }

        if (isVNode(leftNode) && leftNode.count) {
            index += leftNode.count;
        }
    }

    if (orderedSet.moves) {
        // Reorder nodes last
        apply = appendPatch(apply, new VPatch(
            VPatch.ORDER,
            a,
            orderedSet.moves
        ));
    }

    return apply
}

function clearState(vNode, patch, index) {
    // TODO: Make this a single walk, not two
    unhook(vNode, patch, index);
    destroyWidgets(vNode, patch, index);
}

// Patch records for all destroyed widgets must be added because we need
// a DOM node reference for the destroy function
function destroyWidgets(vNode, patch, index) {
    if (isWidget(vNode)) {
        if (typeof vNode.destroy === "function") {
            patch[index] = appendPatch(
                patch[index],
                new VPatch(VPatch.REMOVE, vNode, null)
            );
        }
    } else if (isVNode(vNode) && (vNode.hasWidgets || vNode.hasThunks)) {
        var children = vNode.children;
        var len = children.length;
        for (var i = 0; i < len; i++) {
            var child = children[i];
            index += 1;

            destroyWidgets(child, patch, index);

            if (isVNode(child) && child.count) {
                index += child.count;
            }
        }
    } else if (isThunk(vNode)) {
        thunks(vNode, null, patch, index);
    }
}

// Create a sub-patch for thunks
function thunks(a, b, patch, index) {
    var nodes = handleThunk(a, b);
    var thunkPatch = diff$2(nodes.a, nodes.b);
    if (hasPatches(thunkPatch)) {
        patch[index] = new VPatch(VPatch.THUNK, null, thunkPatch);
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
            );
        }

        if (vNode.descendantHooks || vNode.hasThunks) {
            var children = vNode.children;
            var len = children.length;
            for (var i = 0; i < len; i++) {
                var child = children[i];
                index += 1;

                unhook(child, patch, index);

                if (isVNode(child) && child.count) {
                    index += child.count;
                }
            }
        }
    } else if (isThunk(vNode)) {
        thunks(vNode, null, patch, index);
    }
}

function undefinedKeys(obj) {
    var result = {};

    for (var key in obj) {
        result[key] = undefined;
    }

    return result
}

// List diff, naive left to right reordering
function reorder(aChildren, bChildren) {
    // O(M) time, O(M) memory
    var bChildIndex = keyIndex(bChildren);
    var bKeys = bChildIndex.keys;
    var bFree = bChildIndex.free;

    if (bFree.length === bChildren.length) {
        return {
            children: bChildren,
            moves: null
        }
    }

    // O(N) time, O(N) memory
    var aChildIndex = keyIndex(aChildren);
    var aKeys = aChildIndex.keys;
    var aFree = aChildIndex.free;

    if (aFree.length === aChildren.length) {
        return {
            children: bChildren,
            moves: null
        }
    }

    // O(MAX(N, M)) memory
    var newChildren = [];

    var freeIndex = 0;
    var freeCount = bFree.length;
    var deletedItems = 0;

    // Iterate through a and match a node in b
    // O(N) time,
    for (var i = 0 ; i < aChildren.length; i++) {
        var aItem = aChildren[i];
        var itemIndex;

        if (aItem.key) {
            if (bKeys.hasOwnProperty(aItem.key)) {
                // Match up the old keys
                itemIndex = bKeys[aItem.key];
                newChildren.push(bChildren[itemIndex]);

            } else {
                // Remove old keyed items
                itemIndex = i - deletedItems++;
                newChildren.push(null);
            }
        } else {
            // Match the item in a with the next free item in b
            if (freeIndex < freeCount) {
                itemIndex = bFree[freeIndex++];
                newChildren.push(bChildren[itemIndex]);
            } else {
                // There are no free items in b to match with
                // the free items in a, so the extra free nodes
                // are deleted.
                itemIndex = i - deletedItems++;
                newChildren.push(null);
            }
        }
    }

    var lastFreeIndex = freeIndex >= bFree.length ?
        bChildren.length :
        bFree[freeIndex];

    // Iterate through b and append any new keys
    // O(M) time
    for (var j = 0; j < bChildren.length; j++) {
        var newItem = bChildren[j];

        if (newItem.key) {
            if (!aKeys.hasOwnProperty(newItem.key)) {
                // Add any new keyed items
                // We are adding new items to the end and then sorting them
                // in place. In future we should insert new items in place.
                newChildren.push(newItem);
            }
        } else if (j >= lastFreeIndex) {
            // Add any leftover non-keyed items
            newChildren.push(newItem);
        }
    }

    var simulate = newChildren.slice();
    var simulateIndex = 0;
    var removes = [];
    var inserts = [];
    var simulateItem;

    for (var k = 0; k < bChildren.length;) {
        var wantedItem = bChildren[k];
        simulateItem = simulate[simulateIndex];

        // remove items
        while (simulateItem === null && simulate.length) {
            removes.push(remove$3(simulate, simulateIndex, null));
            simulateItem = simulate[simulateIndex];
        }

        if (!simulateItem || simulateItem.key !== wantedItem.key) {
            // if we need a key in this position...
            if (wantedItem.key) {
                if (simulateItem && simulateItem.key) {
                    // if an insert doesn't put this key in place, it needs to move
                    if (bKeys[simulateItem.key] !== k + 1) {
                        removes.push(remove$3(simulate, simulateIndex, simulateItem.key));
                        simulateItem = simulate[simulateIndex];
                        // if the remove didn't put the wanted item in place, we need to insert it
                        if (!simulateItem || simulateItem.key !== wantedItem.key) {
                            inserts.push({key: wantedItem.key, to: k});
                        }
                        // items are matching, so skip ahead
                        else {
                            simulateIndex++;
                        }
                    }
                    else {
                        inserts.push({key: wantedItem.key, to: k});
                    }
                }
                else {
                    inserts.push({key: wantedItem.key, to: k});
                }
                k++;
            }
            // a key in simulate has no matching wanted key, remove it
            else if (simulateItem && simulateItem.key) {
                removes.push(remove$3(simulate, simulateIndex, simulateItem.key));
            }
        }
        else {
            simulateIndex++;
            k++;
        }
    }

    // remove all the remaining nodes from simulate
    while(simulateIndex < simulate.length) {
        simulateItem = simulate[simulateIndex];
        removes.push(remove$3(simulate, simulateIndex, simulateItem && simulateItem.key));
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

function remove$3(arr, index, key) {
    arr.splice(index, 1);

    return {
        from: index,
        key: key
    }
}

function keyIndex(children) {
    var keys = {};
    var free = [];
    var length = children.length;

    for (var i = 0; i < length; i++) {
        var child = children[i];

        if (child.key) {
            keys[child.key] = i;
        } else {
            free.push(i);
        }
    }

    return {
        keys: keys,     // A hash of key name to index
        free: free      // An array of unkeyed item indices
    }
}

function appendPatch(apply, patch) {
    if (apply) {
        if (isArray$2(apply)) {
            apply.push(patch);
        } else {
            apply = [apply, patch];
        }

        return apply
    } else {
        return patch
    }
}

var diff$1 = diff_1$2;

var diff_1 = diff$1;

var slice$1 = Array.prototype.slice;

var index$10 = iterativelyWalk;

function iterativelyWalk(nodes, cb) {
    if (!('length' in nodes)) {
        nodes = [nodes];
    }
    
    nodes = slice$1.call(nodes);

    while(nodes.length) {
        var node = nodes.shift(),
            ret = cb(node);

        if (ret) {
            return ret
        }

        if (node.childNodes && node.childNodes.length) {
            nodes = slice$1.call(node.childNodes).concat(nodes);
        }
    }
}

var domComment = Comment$1;

function Comment$1(data, owner) {
    if (!(this instanceof Comment$1)) {
        return new Comment$1(data, owner)
    }

    this.data = data;
    this.nodeValue = data;
    this.length = data.length;
    this.ownerDocument = owner || null;
}

Comment$1.prototype.nodeType = 8;
Comment$1.prototype.nodeName = "#comment";

Comment$1.prototype.toString = function _Comment_toString() {
    return "[object Comment]"
};

var domText = DOMText$1;

function DOMText$1(value, owner) {
    if (!(this instanceof DOMText$1)) {
        return new DOMText$1(value)
    }

    this.data = value || "";
    this.length = this.data.length;
    this.ownerDocument = owner || null;
}

DOMText$1.prototype.type = "DOMTextNode";
DOMText$1.prototype.nodeType = 3;
DOMText$1.prototype.nodeName = "#text";

DOMText$1.prototype.toString = function _Text_toString() {
    return this.data
};

DOMText$1.prototype.replaceData = function replaceData(index, length, value) {
    var current = this.data;
    var left = current.substring(0, index);
    var right = current.substring(index + length, current.length);
    this.data = left + value + right;
    this.length = this.data.length;
};

var dispatchEvent_1 = dispatchEvent$2;

function dispatchEvent$2(ev) {
    var elem = this;
    var type = ev.type;

    if (!ev.target) {
        ev.target = elem;
    }

    if (!elem.listeners) {
        elem.listeners = {};
    }

    var listeners = elem.listeners[type];

    if (listeners) {
        return listeners.forEach(function (listener) {
            ev.currentTarget = elem;
            if (typeof listener === 'function') {
                listener(ev);
            } else {
                listener.handleEvent(ev);
            }
        })
    }

    if (elem.parentNode) {
        elem.parentNode.dispatchEvent(ev);
    }
}

var addEventListener_1 = addEventListener$2;

function addEventListener$2(type, listener) {
    var elem = this;

    if (!elem.listeners) {
        elem.listeners = {};
    }

    if (!elem.listeners[type]) {
        elem.listeners[type] = [];
    }

    if (elem.listeners[type].indexOf(listener) === -1) {
        elem.listeners[type].push(listener);
    }
}

var removeEventListener_1 = removeEventListener$2;

function removeEventListener$2(type, listener) {
    var elem = this;

    if (!elem.listeners) {
        return
    }

    if (!elem.listeners[type]) {
        return
    }

    var list = elem.listeners[type];
    var index = list.indexOf(listener);
    if (index !== -1) {
        list.splice(index, 1);
    }
}

var serialize = serializeNode$1;

var voidElements = ["area","base","br","col","embed","hr","img","input","keygen","link","menuitem","meta","param","source","track","wbr"];

function serializeNode$1(node) {
    switch (node.nodeType) {
        case 3:
            return escapeText(node.data)
        case 8:
            return "<!--" + node.data + "-->"
        default:
            return serializeElement(node)
    }
}

function serializeElement(elem) {
    var strings = [];

    var tagname = elem.tagName;

    if (elem.namespaceURI === "http://www.w3.org/1999/xhtml") {
        tagname = tagname.toLowerCase();
    }

    strings.push("<" + tagname + properties(elem) + datasetify(elem));

    if (voidElements.indexOf(tagname) > -1) {
        strings.push(" />");
    } else {
        strings.push(">");

        if (elem.childNodes.length) {
            strings.push.apply(strings, elem.childNodes.map(serializeNode$1));
        } else if (elem.textContent || elem.innerText) {
            strings.push(escapeText(elem.textContent || elem.innerText));
        } else if (elem.innerHTML) {
            strings.push(elem.innerHTML);
        }

        strings.push("</" + tagname + ">");
    }

    return strings.join("")
}

function isProperty(elem, key) {
    var type = typeof elem[key];

    if (key === "style" && Object.keys(elem.style).length > 0) {
      return true
    }

    return elem.hasOwnProperty(key) &&
        (type === "string" || type === "boolean" || type === "number") &&
        key !== "nodeName" && key !== "className" && key !== "tagName" &&
        key !== "textContent" && key !== "innerText" && key !== "namespaceURI" &&  key !== "innerHTML"
}

function stylify(styles) {
    if (typeof styles === 'string') return styles
    var attr = "";
    Object.keys(styles).forEach(function (key) {
        var value = styles[key];
        key = key.replace(/[A-Z]/g, function(c) {
            return "-" + c.toLowerCase();
        });
        attr += key + ":" + value + ";";
    });
    return attr
}

function datasetify(elem) {
    var ds = elem.dataset;
    var props = [];

    for (var key in ds) {
        props.push({ name: "data-" + key, value: ds[key] });
    }

    return props.length ? stringify(props) : ""
}

function stringify(list) {
    var attributes = [];
    list.forEach(function (tuple) {
        var name = tuple.name;
        var value = tuple.value;

        if (name === "style") {
            value = stylify(value);
        }

        attributes.push(name + "=" + "\"" + escapeAttributeValue(value) + "\"");
    });

    return attributes.length ? " " + attributes.join(" ") : ""
}

function properties(elem) {
    var props = [];
    for (var key in elem) {
        if (isProperty(elem, key)) {
            props.push({ name: key, value: elem[key] });
        }
    }

    for (var ns in elem._attributes) {
      for (var attribute in elem._attributes[ns]) {
        var prop = elem._attributes[ns][attribute];
        var name = (prop.prefix ? prop.prefix + ":" : "") + attribute;
        props.push({ name: name, value: prop.value });
      }
    }

    if (elem.className) {
        props.push({ name: "class", value: elem.className });
    }

    return props.length ? stringify(props) : ""
}

function escapeText(s) {
    var str = '';

    if (typeof(s) === 'string') { 
        str = s; 
    } else if (s) {
        str = s.toString();
    }

    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
}

function escapeAttributeValue(str) {
    return escapeText(str).replace(/"/g, "&quot;")
}

var domWalk$1 = index$10;
var dispatchEvent$1 = dispatchEvent_1;
var addEventListener$1 = addEventListener_1;
var removeEventListener$1 = removeEventListener_1;
var serializeNode = serialize;

var htmlns = "http://www.w3.org/1999/xhtml";

var domElement = DOMElement$1;

function DOMElement$1(tagName, owner, namespace) {
    if (!(this instanceof DOMElement$1)) {
        return new DOMElement$1(tagName)
    }

    var ns = namespace === undefined ? htmlns : (namespace || null);

    this.tagName = ns === htmlns ? String(tagName).toUpperCase() : tagName;
    this.nodeName = this.tagName;
    this.className = "";
    this.dataset = {};
    this.childNodes = [];
    this.parentNode = null;
    this.style = {};
    this.ownerDocument = owner || null;
    this.namespaceURI = ns;
    this._attributes = {};

    if (this.tagName === 'INPUT') {
      this.type = 'text';
    }
}

DOMElement$1.prototype.type = "DOMElement";
DOMElement$1.prototype.nodeType = 1;

DOMElement$1.prototype.appendChild = function _Element_appendChild(child) {
    if (child.parentNode) {
        child.parentNode.removeChild(child);
    }

    this.childNodes.push(child);
    child.parentNode = this;

    return child
};

DOMElement$1.prototype.replaceChild =
    function _Element_replaceChild(elem, needle) {
        // TODO: Throw NotFoundError if needle.parentNode !== this

        if (elem.parentNode) {
            elem.parentNode.removeChild(elem);
        }

        var index = this.childNodes.indexOf(needle);

        needle.parentNode = null;
        this.childNodes[index] = elem;
        elem.parentNode = this;

        return needle
    };

DOMElement$1.prototype.removeChild = function _Element_removeChild(elem) {
    // TODO: Throw NotFoundError if elem.parentNode !== this

    var index = this.childNodes.indexOf(elem);
    this.childNodes.splice(index, 1);

    elem.parentNode = null;
    return elem
};

DOMElement$1.prototype.insertBefore =
    function _Element_insertBefore(elem, needle) {
        // TODO: Throw NotFoundError if referenceElement is a dom node
        // and parentNode !== this

        if (elem.parentNode) {
            elem.parentNode.removeChild(elem);
        }

        var index = needle === null || needle === undefined ?
            -1 :
            this.childNodes.indexOf(needle);

        if (index > -1) {
            this.childNodes.splice(index, 0, elem);
        } else {
            this.childNodes.push(elem);
        }

        elem.parentNode = this;
        return elem
    };

DOMElement$1.prototype.setAttributeNS =
    function _Element_setAttributeNS(namespace, name, value) {
        var prefix = null;
        var localName = name;
        var colonPosition = name.indexOf(":");
        if (colonPosition > -1) {
            prefix = name.substr(0, colonPosition);
            localName = name.substr(colonPosition + 1);
        }
        if (this.tagName === 'INPUT' && name === 'type') {
          this.type = value;
        }
        else {
          var attributes = this._attributes[namespace] || (this._attributes[namespace] = {});
          attributes[localName] = {value: value, prefix: prefix};
        }
    };

DOMElement$1.prototype.getAttributeNS =
    function _Element_getAttributeNS(namespace, name) {
        var attributes = this._attributes[namespace];
        var value = attributes && attributes[name] && attributes[name].value;
        if (this.tagName === 'INPUT' && name === 'type') {
          return this.type;
        }
        if (typeof value !== "string") {
            return null
        }
        return value
    };

DOMElement$1.prototype.removeAttributeNS =
    function _Element_removeAttributeNS(namespace, name) {
        var attributes = this._attributes[namespace];
        if (attributes) {
            delete attributes[name];
        }
    };

DOMElement$1.prototype.hasAttributeNS =
    function _Element_hasAttributeNS(namespace, name) {
        var attributes = this._attributes[namespace];
        return !!attributes && name in attributes;
    };

DOMElement$1.prototype.setAttribute = function _Element_setAttribute(name, value) {
    return this.setAttributeNS(null, name, value)
};

DOMElement$1.prototype.getAttribute = function _Element_getAttribute(name) {
    return this.getAttributeNS(null, name)
};

DOMElement$1.prototype.removeAttribute = function _Element_removeAttribute(name) {
    return this.removeAttributeNS(null, name)
};

DOMElement$1.prototype.hasAttribute = function _Element_hasAttribute(name) {
    return this.hasAttributeNS(null, name)
};

DOMElement$1.prototype.removeEventListener = removeEventListener$1;
DOMElement$1.prototype.addEventListener = addEventListener$1;
DOMElement$1.prototype.dispatchEvent = dispatchEvent$1;

// Un-implemented
DOMElement$1.prototype.focus = function _Element_focus() {
    return void 0
};

DOMElement$1.prototype.toString = function _Element_toString() {
    return serializeNode(this)
};

DOMElement$1.prototype.getElementsByClassName = function _Element_getElementsByClassName(classNames) {
    var classes = classNames.split(" ");
    var elems = [];

    domWalk$1(this, function (node) {
        if (node.nodeType === 1) {
            var nodeClassName = node.className || "";
            var nodeClasses = nodeClassName.split(" ");

            if (classes.every(function (item) {
                return nodeClasses.indexOf(item) !== -1
            })) {
                elems.push(node);
            }
        }
    });

    return elems
};

DOMElement$1.prototype.getElementsByTagName = function _Element_getElementsByTagName(tagName) {
    tagName = tagName.toLowerCase();
    var elems = [];

    domWalk$1(this.childNodes, function (node) {
        if (node.nodeType === 1 && (tagName === '*' || node.tagName.toLowerCase() === tagName)) {
            elems.push(node);
        }
    });

    return elems
};

DOMElement$1.prototype.contains = function _Element_contains(element) {
    return domWalk$1(this, function (node) {
        return element === node
    }) || false
};

var DOMElement$2 = domElement;

var domFragment = DocumentFragment$1;

function DocumentFragment$1(owner) {
    if (!(this instanceof DocumentFragment$1)) {
        return new DocumentFragment$1()
    }

    this.childNodes = [];
    this.parentNode = null;
    this.ownerDocument = owner || null;
}

DocumentFragment$1.prototype.type = "DocumentFragment";
DocumentFragment$1.prototype.nodeType = 11;
DocumentFragment$1.prototype.nodeName = "#document-fragment";

DocumentFragment$1.prototype.appendChild  = DOMElement$2.prototype.appendChild;
DocumentFragment$1.prototype.replaceChild = DOMElement$2.prototype.replaceChild;
DocumentFragment$1.prototype.removeChild  = DOMElement$2.prototype.removeChild;

DocumentFragment$1.prototype.toString =
    function _DocumentFragment_toString() {
        return this.childNodes.map(function (node) {
            return String(node)
        }).join("")
    };

var event = Event$2;

function Event$2(family) {}

Event$2.prototype.initEvent = function _Event_initEvent(type, bubbles, cancelable) {
    this.type = type;
    this.bubbles = bubbles;
    this.cancelable = cancelable;
};

Event$2.prototype.preventDefault = function _Event_preventDefault() {
    
};

var domWalk = index$10;

var Comment = domComment;
var DOMText = domText;
var DOMElement = domElement;
var DocumentFragment = domFragment;
var Event$1 = event;
var dispatchEvent = dispatchEvent_1;
var addEventListener = addEventListener_1;
var removeEventListener = removeEventListener_1;

var document$3 = Document$1;

function Document$1() {
    if (!(this instanceof Document$1)) {
        return new Document$1();
    }

    this.head = this.createElement("head");
    this.body = this.createElement("body");
    this.documentElement = this.createElement("html");
    this.documentElement.appendChild(this.head);
    this.documentElement.appendChild(this.body);
    this.childNodes = [this.documentElement];
    this.nodeType = 9;
}

var proto$1 = Document$1.prototype;
proto$1.createTextNode = function createTextNode(value) {
    return new DOMText(value, this)
};

proto$1.createElementNS = function createElementNS(namespace, tagName) {
    var ns = namespace === null ? null : String(namespace);
    return new DOMElement(tagName, this, ns)
};

proto$1.createElement = function createElement(tagName) {
    return new DOMElement(tagName, this)
};

proto$1.createDocumentFragment = function createDocumentFragment() {
    return new DocumentFragment(this)
};

proto$1.createEvent = function createEvent(family) {
    return new Event$1(family)
};

proto$1.createComment = function createComment(data) {
    return new Comment(data, this)
};

proto$1.getElementById = function getElementById(id) {
    id = String(id);

    var result = domWalk(this.childNodes, function (node) {
        if (String(node.id) === id) {
            return node
        }
    });

    return result || null
};

proto$1.getElementsByClassName = DOMElement.prototype.getElementsByClassName;
proto$1.getElementsByTagName = DOMElement.prototype.getElementsByTagName;
proto$1.contains = DOMElement.prototype.contains;

proto$1.removeEventListener = removeEventListener;
proto$1.addEventListener = addEventListener;
proto$1.dispatchEvent = dispatchEvent;

var Document = document$3;

var index$8 = new Document();

var document_1 = createCommonjsModule(function (module) {
var topLevel = typeof commonjsGlobal !== 'undefined' ? commonjsGlobal :
    typeof window !== 'undefined' ? window : {};
var minDoc = index$8;

if (typeof document !== 'undefined') {
    module.exports = document;
} else {
    var doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }

    module.exports = doccy;
}
});

var isObject$4 = index$6;
var isHook$2 = isVhook;

var applyProperties_1 = applyProperties$1;

function applyProperties$1(node, props, previous) {
    for (var propName in props) {
        var propValue = props[propName];

        if (propValue === undefined) {
            removeProperty(node, propName, propValue, previous);
        } else if (isHook$2(propValue)) {
            removeProperty(node, propName, propValue, previous);
            if (propValue.hook) {
                propValue.hook(node,
                    propName,
                    previous ? previous[propName] : undefined);
            }
        } else {
            if (isObject$4(propValue)) {
                patchObject(node, props, previous, propName, propValue);
            } else {
                node[propName] = propValue;
            }
        }
    }
}

function removeProperty(node, propName, propValue, previous) {
    if (previous) {
        var previousValue = previous[propName];

        if (!isHook$2(previousValue)) {
            if (propName === "attributes") {
                for (var attrName in previousValue) {
                    node.removeAttribute(attrName);
                }
            } else if (propName === "style") {
                for (var i in previousValue) {
                    node.style[i] = "";
                }
            } else if (typeof previousValue === "string") {
                node[propName] = "";
            } else {
                node[propName] = null;
            }
        } else if (previousValue.unhook) {
            previousValue.unhook(node, propName, propValue);
        }
    }
}

function patchObject(node, props, previous, propName, propValue) {
    var previousValue = previous ? previous[propName] : undefined;

    // Set attributes
    if (propName === "attributes") {
        for (var attrName in propValue) {
            var attrValue = propValue[attrName];

            if (attrValue === undefined) {
                node.removeAttribute(attrName);
            } else {
                node.setAttribute(attrName, attrValue);
            }
        }

        return
    }

    if(previousValue && isObject$4(previousValue) &&
        getPrototype$1(previousValue) !== getPrototype$1(propValue)) {
        node[propName] = propValue;
        return
    }

    if (!isObject$4(node[propName])) {
        node[propName] = {};
    }

    var replacer = propName === "style" ? "" : undefined;

    for (var k in propValue) {
        var value = propValue[k];
        node[propName][k] = (value === undefined) ? replacer : value;
    }
}

function getPrototype$1(value) {
    if (Object.getPrototypeOf) {
        return Object.getPrototypeOf(value)
    } else if (value.__proto__) {
        return value.__proto__
    } else if (value.constructor) {
        return value.constructor.prototype
    }
}

var document$5 = document_1;

var applyProperties = applyProperties_1;

var isVNode$2 = isVnode;
var isVText$2 = isVtext;
var isWidget$3 = isWidget_1;
var handleThunk$2 = handleThunk_1;

var createElement_1 = createElement;

function createElement(vnode, opts) {
    var doc = opts ? opts.document || document$5 : document$5;
    var warn = opts ? opts.warn : null;

    vnode = handleThunk$2(vnode).a;

    if (isWidget$3(vnode)) {
        return vnode.init()
    } else if (isVText$2(vnode)) {
        return doc.createTextNode(vnode.text)
    } else if (!isVNode$2(vnode)) {
        if (warn) {
            warn("Item is not a valid virtual dom node", vnode);
        }
        return null
    }

    var node = (vnode.namespace === null) ?
        doc.createElement(vnode.tagName) :
        doc.createElementNS(vnode.namespace, vnode.tagName);

    var props = vnode.properties;
    applyProperties(node, props);

    var children = vnode.children;

    for (var i = 0; i < children.length; i++) {
        var childNode = createElement(children[i], opts);
        if (childNode) {
            node.appendChild(childNode);
        }
    }

    return node
}

// Maps a virtual DOM tree onto a real DOM tree in an efficient manner.
// We don't want to read all of the DOM nodes in the tree so we use
// the in-order tree indexing to eliminate recursion down certain branches.
// We only recurse into a DOM node if we know that it contains a child of
// interest.

var noChild = {};

var domIndex_1 = domIndex$1;

function domIndex$1(rootNode, tree, indices, nodes) {
    if (!indices || indices.length === 0) {
        return {}
    } else {
        indices.sort(ascending);
        return recurse(rootNode, tree, indices, nodes, 0)
    }
}

function recurse(rootNode, tree, indices, nodes, rootIndex) {
    nodes = nodes || {};


    if (rootNode) {
        if (indexInRange(indices, rootIndex, rootIndex)) {
            nodes[rootIndex] = rootNode;
        }

        var vChildren = tree.children;

        if (vChildren) {

            var childNodes = rootNode.childNodes;

            for (var i = 0; i < tree.children.length; i++) {
                rootIndex += 1;

                var vChild = vChildren[i] || noChild;
                var nextIndex = rootIndex + (vChild.count || 0);

                // skip recursion down the tree if there are no nodes down here
                if (indexInRange(indices, rootIndex, nextIndex)) {
                    recurse(childNodes[i], vChild, indices, nodes, rootIndex);
                }

                rootIndex = nextIndex;
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

    var minIndex = 0;
    var maxIndex = indices.length - 1;
    var currentIndex;
    var currentItem;

    while (minIndex <= maxIndex) {
        currentIndex = ((maxIndex + minIndex) / 2) >> 0;
        currentItem = indices[currentIndex];

        if (minIndex === maxIndex) {
            return currentItem >= left && currentItem <= right
        } else if (currentItem < left) {
            minIndex = currentIndex + 1;
        } else  if (currentItem > right) {
            maxIndex = currentIndex - 1;
        } else {
            return true
        }
    }

    return false;
}

function ascending(a, b) {
    return a > b ? 1 : -1
}

var isWidget$5 = isWidget_1;

var updateWidget_1 = updateWidget$1;

function updateWidget$1(a, b) {
    if (isWidget$5(a) && isWidget$5(b)) {
        if ("name" in a && "name" in b) {
            return a.id === b.id
        } else {
            return a.init === b.init
        }
    }

    return false
}

var applyProperties$2 = applyProperties_1;

var isWidget$4 = isWidget_1;
var VPatch$1 = vpatch;

var updateWidget = updateWidget_1;

var patchOp$1 = applyPatch$1;

function applyPatch$1(vpatch$$1, domNode, renderOptions) {
    var type = vpatch$$1.type;
    var vNode = vpatch$$1.vNode;
    var patch = vpatch$$1.patch;

    switch (type) {
        case VPatch$1.REMOVE:
            return removeNode(domNode, vNode)
        case VPatch$1.INSERT:
            return insertNode(domNode, patch, renderOptions)
        case VPatch$1.VTEXT:
            return stringPatch(domNode, vNode, patch, renderOptions)
        case VPatch$1.WIDGET:
            return widgetPatch(domNode, vNode, patch, renderOptions)
        case VPatch$1.VNODE:
            return vNodePatch(domNode, vNode, patch, renderOptions)
        case VPatch$1.ORDER:
            reorderChildren(domNode, patch);
            return domNode
        case VPatch$1.PROPS:
            applyProperties$2(domNode, patch, vNode.properties);
            return domNode
        case VPatch$1.THUNK:
            return replaceRoot(domNode,
                renderOptions.patch(domNode, patch, renderOptions))
        default:
            return domNode
    }
}

function removeNode(domNode, vNode) {
    var parentNode = domNode.parentNode;

    if (parentNode) {
        parentNode.removeChild(domNode);
    }

    destroyWidget(domNode, vNode);

    return null
}

function insertNode(parentNode, vNode, renderOptions) {
    var newNode = renderOptions.render(vNode, renderOptions);

    if (parentNode) {
        parentNode.appendChild(newNode);
    }

    return parentNode
}

function stringPatch(domNode, leftVNode, vText, renderOptions) {
    var newNode;

    if (domNode.nodeType === 3) {
        domNode.replaceData(0, domNode.length, vText.text);
        newNode = domNode;
    } else {
        var parentNode = domNode.parentNode;
        newNode = renderOptions.render(vText, renderOptions);

        if (parentNode && newNode !== domNode) {
            parentNode.replaceChild(newNode, domNode);
        }
    }

    return newNode
}

function widgetPatch(domNode, leftVNode, widget, renderOptions) {
    var updating = updateWidget(leftVNode, widget);
    var newNode;

    if (updating) {
        newNode = widget.update(leftVNode, domNode) || domNode;
    } else {
        newNode = renderOptions.render(widget, renderOptions);
    }

    var parentNode = domNode.parentNode;

    if (parentNode && newNode !== domNode) {
        parentNode.replaceChild(newNode, domNode);
    }

    if (!updating) {
        destroyWidget(domNode, leftVNode);
    }

    return newNode
}

function vNodePatch(domNode, leftVNode, vNode, renderOptions) {
    var parentNode = domNode.parentNode;
    var newNode = renderOptions.render(vNode, renderOptions);

    if (parentNode && newNode !== domNode) {
        parentNode.replaceChild(newNode, domNode);
    }

    return newNode
}

function destroyWidget(domNode, w) {
    if (typeof w.destroy === "function" && isWidget$4(w)) {
        w.destroy(domNode);
    }
}

function reorderChildren(domNode, moves) {
    var childNodes = domNode.childNodes;
    var keyMap = {};
    var node;
    var remove;
    var insert;

    for (var i = 0; i < moves.removes.length; i++) {
        remove = moves.removes[i];
        node = childNodes[remove.from];
        if (remove.key) {
            keyMap[remove.key] = node;
        }
        domNode.removeChild(node);
    }

    var length = childNodes.length;
    for (var j = 0; j < moves.inserts.length; j++) {
        insert = moves.inserts[j];
        node = keyMap[insert.key];
        // this is the weirdest bug i've ever seen in webkit
        domNode.insertBefore(node, insert.to >= length++ ? null : childNodes[insert.to]);
    }
}

function replaceRoot(oldRoot, newRoot) {
    if (oldRoot && newRoot && oldRoot !== newRoot && oldRoot.parentNode) {
        oldRoot.parentNode.replaceChild(newRoot, oldRoot);
    }

    return newRoot;
}

var document$2 = document_1;
var isArray$4 = index$4;

var render$1 = createElement_1;
var domIndex = domIndex_1;
var patchOp = patchOp$1;
var patch_1$2 = patch$2;

function patch$2(rootNode, patches, renderOptions) {
    renderOptions = renderOptions || {};
    renderOptions.patch = renderOptions.patch && renderOptions.patch !== patch$2
        ? renderOptions.patch
        : patchRecursive;
    renderOptions.render = renderOptions.render || render$1;

    return renderOptions.patch(rootNode, patches, renderOptions)
}

function patchRecursive(rootNode, patches, renderOptions) {
    var indices = patchIndices(patches);

    if (indices.length === 0) {
        return rootNode
    }

    var index = domIndex(rootNode, patches.a, indices);
    var ownerDocument = rootNode.ownerDocument;

    if (!renderOptions.document && ownerDocument !== document$2) {
        renderOptions.document = ownerDocument;
    }

    for (var i = 0; i < indices.length; i++) {
        var nodeIndex = indices[i];
        rootNode = applyPatch(rootNode,
            index[nodeIndex],
            patches[nodeIndex],
            renderOptions);
    }

    return rootNode
}

function applyPatch(rootNode, domNode, patchList, renderOptions) {
    if (!domNode) {
        return rootNode
    }

    var newNode;

    if (isArray$4(patchList)) {
        for (var i = 0; i < patchList.length; i++) {
            newNode = patchOp(patchList[i], domNode, renderOptions);

            if (domNode === rootNode) {
                rootNode = newNode;
            }
        }
    } else {
        newNode = patchOp(patchList, domNode, renderOptions);

        if (domNode === rootNode) {
            rootNode = newNode;
        }
    }

    return rootNode
}

function patchIndices(patches) {
    var indices = [];

    for (var key in patches) {
        if (key !== "a") {
            indices.push(Number(key));
        }
    }

    return indices
}

var patch$1 = patch_1$2;

var patch_1 = patch$1;

var version$5 = version$1;
var isVNode$4 = isVnode;
var isWidget$7 = isWidget_1;
var isThunk$3 = isThunk_1;
var isVHook = isVhook;

var vnode = VirtualNode;

var noProperties = {};
var noChildren = [];

function VirtualNode(tagName, properties, children, key, namespace) {
    this.tagName = tagName;
    this.properties = properties || noProperties;
    this.children = children || noChildren;
    this.key = key != null ? String(key) : undefined;
    this.namespace = (typeof namespace === "string") ? namespace : null;

    var count = (children && children.length) || 0;
    var descendants = 0;
    var hasWidgets = false;
    var hasThunks = false;
    var descendantHooks = false;
    var hooks;

    for (var propName in properties) {
        if (properties.hasOwnProperty(propName)) {
            var property = properties[propName];
            if (isVHook(property) && property.unhook) {
                if (!hooks) {
                    hooks = {};
                }

                hooks[propName] = property;
            }
        }
    }

    for (var i = 0; i < count; i++) {
        var child = children[i];
        if (isVNode$4(child)) {
            descendants += child.count || 0;

            if (!hasWidgets && child.hasWidgets) {
                hasWidgets = true;
            }

            if (!hasThunks && child.hasThunks) {
                hasThunks = true;
            }

            if (!descendantHooks && (child.hooks || child.descendantHooks)) {
                descendantHooks = true;
            }
        } else if (!hasWidgets && isWidget$7(child)) {
            if (typeof child.destroy === "function") {
                hasWidgets = true;
            }
        } else if (!hasThunks && isThunk$3(child)) {
            hasThunks = true;
        }
    }

    this.count = count + descendants;
    this.hasWidgets = hasWidgets;
    this.hasThunks = hasThunks;
    this.hooks = hooks;
    this.descendantHooks = descendantHooks;
}

VirtualNode.prototype.version = version$5;
VirtualNode.prototype.type = "VirtualNode";

var version$6 = version$1;

var vtext = VirtualText;

function VirtualText(text) {
    this.text = String(text);
}

VirtualText.prototype.version = version$6;
VirtualText.prototype.type = "VirtualText";

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
var index$14 = (function split(undef) {

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

var split$2 = index$14;

var classIdSplit = /([\.#]?[a-zA-Z0-9\u007F-\uFFFF_:-]+)/;
var notClassId = /^\.|#/;

var parseTag_1 = parseTag$1;

function parseTag$1(tag, props) {
    if (!tag) {
        return 'DIV';
    }

    var noId = !(props.hasOwnProperty('id'));

    var tagParts = split$2(tag, classIdSplit);
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

var softSetHook$1 = SoftSetHook;

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

/*global window, global*/

var root = typeof window !== 'undefined' ?
    window : typeof commonjsGlobal !== 'undefined' ?
    commonjsGlobal : {};

var index$18 = Individual$1;

function Individual$1(key, value) {
    if (key in root) {
        return root[key];
    }

    root[key] = value;

    return value;
}

var Individual = index$18;

var oneVersion = OneVersion;

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

var OneVersionConstraint = oneVersion;

var MY_VERSION = '7';
OneVersionConstraint('ev-store', MY_VERSION);

var hashKey = '__EV_STORE_KEY@' + MY_VERSION;

var index$16 = EvStore$1;

function EvStore$1(elem) {
    var hash = elem[hashKey];

    if (!hash) {
        hash = elem[hashKey] = {};
    }

    return hash;
}

var EvStore = index$16;

var evHook$1 = EvHook;

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

var isArray$5 = index$4;

var VNode$1 = vnode;
var VText$1 = vtext;
var isVNode$3 = isVnode;
var isVText$3 = isVtext;
var isWidget$6 = isWidget_1;
var isHook$3 = isVhook;
var isVThunk = isThunk_1;

var parseTag = parseTag_1;
var softSetHook = softSetHook$1;
var evHook = evHook$1;

var index$12 = h$2;

function h$2(tagName, properties, children) {
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
        !isHook$3(props.value)
    ) {
        props.value = softSetHook(props.value);
    }

    transformProperties(props);

    if (children !== undefined && children !== null) {
        addChild(children, childNodes, tag, props);
    }


    return new VNode$1(tag, props, childNodes, key, namespace);
}

function addChild(c, childNodes, tag, props) {
    if (typeof c === 'string') {
        childNodes.push(new VText$1(c));
    } else if (typeof c === 'number') {
        childNodes.push(new VText$1(String(c)));
    } else if (isChild(c)) {
        childNodes.push(c);
    } else if (isArray$5(c)) {
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

            if (isHook$3(value)) {
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
    return isVNode$3(x) || isVText$3(x) || isWidget$6(x) || isVThunk(x);
}

function isChildren(x) {
    return typeof x === 'string' || isArray$5(x) || isChild(x);
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
        errorString(data.parentVnode);
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

var h$1 = index$12;

var h_1 = h$1;

var createElement$1 = createElement_1;

var createElement_1$2 = createElement$1;

var diff = diff_1;
var patch = patch_1;
var h = h_1;
var create$6 = createElement_1$2;
var VNode = vnode;
var VText = vtext;

var index$2 = {
    diff: diff,
    patch: patch,
    h: h,
    create: create$6,
    VNode: VNode,
    VText: VText
};

var index_1 = index$2.h;
var index_2 = index$2.create;
var index_3 = index$2.diff;
var index_4 = index$2.patch;

var _createClass$6 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$6(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function createTree(handler, tag, attributes, children) {
    var toAttrs = function toAttrs(attrs) {
        var elAttributes = function (_arg2) {
            return _arg2.tail == null ? null : ["attributes", createObj(_arg2)];
        }(choose$$1(function (x) {
            return x;
        }, map$1(function (_arg1) {
            return _arg1.Case === "Attribute" ? function () {
                var v = _arg1.Fields[0][1];
                var k = _arg1.Fields[0][0];
                return [k, v];
            }() : null;
        }, attrs)));

        var props = map$1(function (_arg4) {
            return _arg4.Case === "Style" ? ["style", createObj(_arg4.Fields[0])] : _arg4.Case === "Property" ? function () {
                var v = _arg4.Fields[0][1];
                var k = _arg4.Fields[0][0];
                return [k, v];
            }() : _arg4.Case === "EventHandler" ? function () {
                var f = _arg4.Fields[0][1];
                var ev = _arg4.Fields[0][0];
                return [ev, function ($var13) {
                    return handler(f($var13));
                }];
            }() : function () {
                throw new Error("Shouldn't happen");
            }();
        }, filter$$1(function (_arg3) {
            return _arg3.Case === "Attribute" ? false : true;
        }, attrs));
        return createObj(elAttributes != null ? new List$1(elAttributes, props) : props);
    };

    var elem = index_1(tag, toAttrs(attributes), Array.from(children));
    return elem;
}
var RenderState = function () {
    function RenderState(caseName, fields) {
        _classCallCheck$6(this, RenderState);

        this.Case = caseName;
        this.Fields = fields;
    }

    _createClass$6(RenderState, [{
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
        _classCallCheck$6(this, ViewState);

        this.CurrentTree = currentTree;
        this.NextTree = nextTree;
        this.Node = node;
        this.RenderState = renderState;
    }

    _createClass$6(ViewState, [{
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
    } else {
        if (node.Case === "VoidElement") {
            var tag = node.Fields[0][0];
            var attrs = node.Fields[0][1];
            return createTree(handler, tag, attrs, new List$1());
        } else {
            if (node.Case === "Text") {
                return node.Fields[0];
            } else {
                if (node.Case === "WhiteSpace") {
                    return node.Fields[0];
                } else {
                    return _target0(node.Fields[0][1], node.Fields[1], node.Fields[0][0]);
                }
            }
        }
    }
}
function render(handler, view, viewState) {
    var tree = renderSomething(handler, view);
    return new ViewState(viewState.CurrentTree, tree, viewState.Node, viewState.RenderState);
}
function createRender(selector, handler, view) {
    var node = document.body.querySelector(selector);
    var tree = renderSomething(handler, view);
    var vdomNode = index_2(tree);
    node.appendChild(vdomNode);
    var viewState = new ViewState(tree, tree, vdomNode, new RenderState("NoRequest", []));

    var raf = function raf(cb) {
        return window.requestAnimationFrame(function (fb) {
            cb();
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
                } else {
                    if (matchValue.Case === "NoRequest") {
                        throw new Error("Shouldn't happen");
                    } else {
                        raf(callBack);
                        {
                            var _RenderState_ = new RenderState("ExtraRequest", []);

                            viewState = new ViewState(viewState.CurrentTree, viewState.NextTree, viewState.Node, _RenderState_);
                        }
                        var patches = index_3(viewState.CurrentTree, viewState.NextTree);
                        index_4(viewState.Node, patches);
                        viewState = new ViewState(viewState.NextTree, viewState.NextTree, viewState.Node, viewState.RenderState);
                    }
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

var SubModels = function () {
  function SubModels(navbar$$1, header, docs$$1, sample) {
    _classCallCheck(this, SubModels);

    this.Navbar = navbar$$1;
    this.Header = header;
    this.Docs = docs$$1;
    this.Sample = sample;
  }

  _createClass(SubModels, [{
    key: _Symbol.reflection,
    value: function () {
      return {
        type: "WebApp.Main.SubModels",
        interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
        properties: {
          Navbar: Model$1,
          Header: Model$2,
          Docs: Model$3,
          Sample: Option(Model$5)
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
    key: "Initial",
    get: function () {
      return new SubModels(Model$1.Initial(new Route("Index", [])), Model$2.Initial(new Route("Index", [])), Model$3.Initial(new DocsApi.Route("Index", [])), null);
    }
  }, {
    key: "Header_",
    get: function () {
      return [function (r) {
        return r.Header;
      }, function (v) {
        return function (r) {
          return new SubModels(r.Navbar, v, r.Docs, r.Sample);
        };
      }];
    }
  }, {
    key: "Docs_",
    get: function () {
      return [function (r) {
        return r.Docs;
      }, function (v) {
        return function (r) {
          return new SubModels(r.Navbar, r.Header, v, r.Sample);
        };
      }];
    }
  }, {
    key: "Sample_",
    get: function () {
      return [function (r) {
        return r.Sample;
      }, function (v) {
        return function (r) {
          var Sample = v;
          return new SubModels(r.Navbar, r.Header, r.Docs, Sample);
        };
      }];
    }
  }, {
    key: "Navbar_",
    get: function () {
      return [function (r) {
        return r.Navbar;
      }, function (v) {
        return function (r) {
          return new SubModels(v, r.Header, r.Docs, r.Sample);
        };
      }];
    }
  }]);

  return SubModels;
}();
setType("WebApp.Main.SubModels", SubModels);
var Model$$1 = function () {
  function Model$$1(currentPage, subModels) {
    _classCallCheck(this, Model$$1);

    this.CurrentPage = currentPage;
    this.SubModels = subModels;
  }

  _createClass(Model$$1, [{
    key: _Symbol.reflection,
    value: function () {
      return {
        type: "WebApp.Main.Model",
        interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
        properties: {
          CurrentPage: Route,
          SubModels: SubModels
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
    key: "Initial",
    get: function () {
      return new Model$$1(new Route("Index", []), SubModels.Initial);
    }
  }, {
    key: "SubModels_",
    get: function () {
      return [function (r) {
        return r.SubModels;
      }, function (v) {
        return function (r) {
          return new Model$$1(r.CurrentPage, v);
        };
      }];
    }
  }, {
    key: "CurrentPage_",
    get: function () {
      return [function (r) {
        return r.CurrentPage;
      }, function (v) {
        return function (r) {
          return new Model$$1(v, r.SubModels);
        };
      }];
    }
  }]);

  return Model$$1;
}();
setType("WebApp.Main.Model", Model$$1);
var Actions$$1 = function () {
  function Actions$$1(caseName, fields) {
    _classCallCheck(this, Actions$$1);

    this.Case = caseName;
    this.Fields = fields;
  }

  _createClass(Actions$$1, [{
    key: _Symbol.reflection,
    value: function () {
      return {
        type: "WebApp.Main.Actions",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: {
          DocsDispatcherAction: [Actions$3],
          HeaderActions: [Actions$2],
          NavbarActions: [Actions$1],
          NavigateTo: [Route],
          NoOp: [],
          SampleDispatcherAction: [Actions$5]
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

  return Actions$$1;
}();
setType("WebApp.Main.Actions", Actions$$1);
function update$$1(model, action) {
  if (action.Case === "DocsDispatcherAction") {
    var patternInput = update$3(model.SubModels.Docs, action.Fields[0]);
    var action_ = AppApi.mapActions(function (arg0) {
      return new Actions$$1("DocsDispatcherAction", [arg0]);
    })(patternInput[1]);

    var m_ = function (arg0) {
      return function (arg1) {
        return Optic.Set.op_HatEquals_0(arg0, arg1);
      };
    }(new Optic.Set("Set", []))(function (arg0) {
      return function (arg1) {
        return Compose.Lens.op_GreaterMinusGreater_0(arg0, arg1);
      };
    }(new Compose.Lens("Lens", []))(SubModels.Docs_)(Model$$1.SubModels_))(patternInput[0])(model);

    return [m_, action_];
  } else if (action.Case === "SampleDispatcherAction") {
    if (function () {
      return model.SubModels.Sample != null;
    }(null)) {
      var _patternInput = update$5(model.SubModels.Sample, action.Fields[0]);

      var _action_ = AppApi.mapActions(function (arg0) {
        return new Actions$$1("SampleDispatcherAction", [arg0]);
      })(_patternInput[1]);

      var _m_ = function (arg0) {
        return function (arg1) {
          return Optic.Set.op_HatEquals_1(arg0, arg1);
        };
      }(new Optic.Set("Set", []))(function (arg0) {
        return function (arg1) {
          return Compose.Lens.op_GreaterMinusGreater_1(arg0, arg1);
        };
      }(new Compose.Lens("Lens", []))(SubModels.Sample_)(Model$$1.SubModels_))(_patternInput[0])(model);

      return [_m_, _action_];
    } else {
      return [model, new List$1()];
    }
  } else if (action.Case === "NavbarActions") {
    var _patternInput2 = update$1(model.SubModels.Navbar, action.Fields[0]);

    var _action_2 = AppApi.mapActions(function (arg0) {
      return new Actions$$1("NavbarActions", [arg0]);
    })(_patternInput2[1]);

    var _m_2 = function (arg0) {
      return function (arg1) {
        return Optic.Set.op_HatEquals_0(arg0, arg1);
      };
    }(new Optic.Set("Set", []))(function (arg0) {
      return function (arg1) {
        return Compose.Lens.op_GreaterMinusGreater_0(arg0, arg1);
      };
    }(new Compose.Lens("Lens", []))(SubModels.Navbar_)(Model$$1.SubModels_))(_patternInput2[0])(model);

    return [_m_2, _action_2];
  } else if (action.Case === "HeaderActions") {
    var _patternInput3 = update$2(model.SubModels.Header, action.Fields[0]);

    var _action_3 = AppApi.mapActions(function (arg0) {
      return new Actions$$1("HeaderActions", [arg0]);
    })(_patternInput3[1]);

    var _m_3 = function (arg0) {
      return function (arg1) {
        return Optic.Set.op_HatEquals_0(arg0, arg1);
      };
    }(new Optic.Set("Set", []))(function (arg0) {
      return function (arg1) {
        return Compose.Lens.op_GreaterMinusGreater_0(arg0, arg1);
      };
    }(new Compose.Lens("Lens", []))(SubModels.Header_)(Model$$1.SubModels_))(_patternInput3[0])(model);

    return [_m_3, _action_3];
  } else if (action.Case === "NoOp") {
    return [model, new List$1()];
  } else if (action.Fields[0].Case === "About") {
    var _m_4 = function (arg0) {
      return function (arg1) {
        return Optic.Set.op_HatEquals_0(arg0, arg1);
      };
    }(new Optic.Set("Set", []))(Model$$1.CurrentPage_)(action.Fields[0])(function (arg0) {
      return function (arg1) {
        return Optic.Set.op_HatEquals_0(arg0, arg1);
      };
    }(new Optic.Set("Set", []))(function (arg0) {
      return function (arg1) {
        return Compose.Lens.op_GreaterMinusGreater_0(arg0, arg1);
      };
    }(new Compose.Lens("Lens", []))(Model$1.CurrentPage_)(function (arg0) {
      return function (arg1) {
        return Compose.Lens.op_GreaterMinusGreater_0(arg0, arg1);
      };
    }(new Compose.Lens("Lens", []))(SubModels.Navbar_)(Model$$1.SubModels_)))(action.Fields[0])(function (arg0) {
      return function (arg1) {
        return Optic.Set.op_HatEquals_0(arg0, arg1);
      };
    }(new Optic.Set("Set", []))(function (arg0) {
      return function (arg1) {
        return Compose.Lens.op_GreaterMinusGreater_0(arg0, arg1);
      };
    }(new Compose.Lens("Lens", []))(Model$2.CurrentPage_)(function (arg0) {
      return function (arg1) {
        return Compose.Lens.op_GreaterMinusGreater_0(arg0, arg1);
      };
    }(new Compose.Lens("Lens", []))(SubModels.Header_)(Model$$1.SubModels_)))(action.Fields[0])(model)));

    return [_m_4, new List$1()];
  } else if (action.Fields[0].Case === "Docs") {
    var _m_5 = function (arg0) {
      return function (arg1) {
        return Optic.Set.op_HatEquals_0(arg0, arg1);
      };
    }(new Optic.Set("Set", []))(Model$$1.CurrentPage_)(action.Fields[0])(function (arg0) {
      return function (arg1) {
        return Optic.Set.op_HatEquals_0(arg0, arg1);
      };
    }(new Optic.Set("Set", []))(function (arg0) {
      return function (arg1) {
        return Compose.Lens.op_GreaterMinusGreater_0(arg0, arg1);
      };
    }(new Compose.Lens("Lens", []))(Model$1.CurrentPage_)(function (arg0) {
      return function (arg1) {
        return Compose.Lens.op_GreaterMinusGreater_0(arg0, arg1);
      };
    }(new Compose.Lens("Lens", []))(SubModels.Navbar_)(Model$$1.SubModels_)))(action.Fields[0])(function (arg0) {
      return function (arg1) {
        return Optic.Set.op_HatEquals_0(arg0, arg1);
      };
    }(new Optic.Set("Set", []))(function (arg0) {
      return function (arg1) {
        return Compose.Lens.op_GreaterMinusGreater_0(arg0, arg1);
      };
    }(new Compose.Lens("Lens", []))(Model$2.CurrentPage_)(function (arg0) {
      return function (arg1) {
        return Compose.Lens.op_GreaterMinusGreater_0(arg0, arg1);
      };
    }(new Compose.Lens("Lens", []))(SubModels.Header_)(Model$$1.SubModels_)))(action.Fields[0])(model)));

    var message = action.Fields[0].Fields[0].Case === "Viewer" ? ofArray([function (h) {
      h(new Actions$$1("DocsDispatcherAction", [new Actions$3("ViewerActions", [new Actions$4("SetDoc", [action.Fields[0].Fields[0].Fields[0]])])]));
    }]) : new List$1();
    return [_m_5, message];
  } else if (action.Fields[0].Case === "Sample") {
    var _m_6 = function (arg0) {
      return function (arg1) {
        return Optic.Set.op_HatEquals_0(arg0, arg1);
      };
    }(new Optic.Set("Set", []))(Model$$1.CurrentPage_)(action.Fields[0])(function (arg0) {
      return function (arg1) {
        return Optic.Set.op_HatEquals_0(arg0, arg1);
      };
    }(new Optic.Set("Set", []))(function (arg0) {
      return function (arg1) {
        return Compose.Lens.op_GreaterMinusGreater_0(arg0, arg1);
      };
    }(new Compose.Lens("Lens", []))(Model$1.CurrentPage_)(function (arg0) {
      return function (arg1) {
        return Compose.Lens.op_GreaterMinusGreater_0(arg0, arg1);
      };
    }(new Compose.Lens("Lens", []))(SubModels.Navbar_)(Model$$1.SubModels_)))(action.Fields[0])(function (arg0) {
      return function (arg1) {
        return Optic.Set.op_HatEquals_0(arg0, arg1);
      };
    }(new Optic.Set("Set", []))(function (arg0) {
      return function (arg1) {
        return Compose.Lens.op_GreaterMinusGreater_0(arg0, arg1);
      };
    }(new Compose.Lens("Lens", []))(Model$2.CurrentPage_)(function (arg0) {
      return function (arg1) {
        return Compose.Lens.op_GreaterMinusGreater_0(arg0, arg1);
      };
    }(new Compose.Lens("Lens", []))(SubModels.Header_)(Model$$1.SubModels_)))(action.Fields[0])(function (arg0) {
      return function (arg1) {
        return Optic.Set.op_HatEquals_1(arg0, arg1);
      };
    }(new Optic.Set("Set", []))(function (arg0) {
      return function (arg1) {
        return Compose.Lens.op_GreaterMinusGreater_1(arg0, arg1);
      };
    }(new Compose.Lens("Lens", []))(SubModels.Sample_)(Model$$1.SubModels_))(Model$5.Initial(action.Fields[0].Fields[0]))(model))));

    return [_m_6, new List$1()];
  } else {
    var _m_7 = function (arg0) {
      return function (arg1) {
        return Optic.Set.op_HatEquals_0(arg0, arg1);
      };
    }(new Optic.Set("Set", []))(Model$$1.CurrentPage_)(action.Fields[0])(function (arg0) {
      return function (arg1) {
        return Optic.Set.op_HatEquals_0(arg0, arg1);
      };
    }(new Optic.Set("Set", []))(function (arg0) {
      return function (arg1) {
        return Compose.Lens.op_GreaterMinusGreater_0(arg0, arg1);
      };
    }(new Compose.Lens("Lens", []))(Model$1.CurrentPage_)(function (arg0) {
      return function (arg1) {
        return Compose.Lens.op_GreaterMinusGreater_0(arg0, arg1);
      };
    }(new Compose.Lens("Lens", []))(SubModels.Navbar_)(Model$$1.SubModels_)))(action.Fields[0])(function (arg0) {
      return function (arg1) {
        return Optic.Set.op_HatEquals_0(arg0, arg1);
      };
    }(new Optic.Set("Set", []))(function (arg0) {
      return function (arg1) {
        return Compose.Lens.op_GreaterMinusGreater_0(arg0, arg1);
      };
    }(new Compose.Lens("Lens", []))(Model$2.CurrentPage_)(function (arg0) {
      return function (arg1) {
        return Compose.Lens.op_GreaterMinusGreater_0(arg0, arg1);
      };
    }(new Compose.Lens("Lens", []))(SubModels.Header_)(Model$$1.SubModels_)))(action.Fields[0])(model)));

    return [_m_7, new List$1()];
  }
}
function view$$1(model) {
  var pageHtml = model.CurrentPage.Case === "Docs" ? map$$1(function (arg0) {
    return new Actions$$1("DocsDispatcherAction", [arg0]);
  }, view$3(model.SubModels.Docs, model.CurrentPage.Fields[0])) : model.CurrentPage.Case === "Sample" ? map$$1(function (arg0) {
    return new Actions$$1("SampleDispatcherAction", [arg0]);
  }, view$5(model.SubModels.Sample, model.CurrentPage.Fields[0])) : model.CurrentPage.Case === "About" ? view$10() : view$11();
  var navbarHtml = map$$1(function (arg0) {
    return new Actions$$1("NavbarActions", [arg0]);
  }, view$1(model.SubModels.Navbar));
  var headerHtml = map$$1(function (arg0) {
    return new Actions$$1("HeaderActions", [arg0]);
  }, view$2(model.SubModels.Header));
  return Tags.div(new List$1())(ofArray([Tags.div(ofArray([Attributes.classy("navbar-bg")]))(ofArray([Tags.div(ofArray([Attributes.classy("container")]))(ofArray([navbarHtml]))])), headerHtml, pageHtml]));
}
function op_LessQmarkGreater(p1, p2) {
  return Parsing.op_DotGreaterGreaterDot()(Parsing.op_DotGreaterGreater(p1, Parsing.pchar("?")))(p2);
}
function op_LessEqualsDotGreater(p1, p2) {
  return Parsing.op_GreaterGreaterDot(Parsing.op_GreaterGreaterDot(p1, Parsing.pchar("=")), p2);
}
var routes = ofArray([function () {
  var map$$1 = new Actions$$1("NavigateTo", [new Route("Index", [])]);

  var route = function ($var1) {
    return Parsing._end(Parsing.drop($var1));
  }(Parsing.pStaticStr("/"));

  return function (str) {
    return Parsing.runM(map$$1, route, str);
  };
}(), function () {
  var map$$1 = new Actions$$1("NavigateTo", [new Route("Docs", [new DocsApi.Route("Index", [])])]);

  var route = function ($var2) {
    return Parsing._end(Parsing.drop($var2));
  }(Parsing.pStaticStr("/docs"));

  return function (str) {
    return Parsing.runM(map$$1, route, str);
  };
}(), function () {
  var map$$1 = function map$$1(fileName) {
    return new Actions$$1("NavigateTo", [new Route("Docs", [new DocsApi.Route("Viewer", [fileName])])]);
  };

  var route = op_LessEqualsDotGreater(op_LessQmarkGreater(Parsing.pStaticStr("/docs"), Parsing.pStaticStr("fileName")), Parsing.pString);
  return function (str) {
    return Parsing.runM1(map$$1, route, str);
  };
}(), function () {
  var map$$1 = new Actions$$1("NavigateTo", [new Route("Sample", [new SampleApi.Route("Clock", [])])]);

  var route = function ($var3) {
    return Parsing._end(Parsing.drop($var3));
  }(Parsing.pStaticStr("/sample/clock"));

  return function (str) {
    return Parsing.runM(map$$1, route, str);
  };
}(), function () {
  var map$$1 = new Actions$$1("NavigateTo", [new Route("Sample", [new SampleApi.Route("Counter", [])])]);

  var route = function ($var4) {
    return Parsing._end(Parsing.drop($var4));
  }(Parsing.pStaticStr("/sample/counter"));

  return function (str) {
    return Parsing.runM(map$$1, route, str);
  };
}(), function () {
  var map$$1 = new Actions$$1("NavigateTo", [new Route("Sample", [new SampleApi.Route("HelloWorld", [])])]);

  var route = function ($var5) {
    return Parsing._end(Parsing.drop($var5));
  }(Parsing.pStaticStr("/sample/hello-world"));

  return function (str) {
    return Parsing.runM(map$$1, route, str);
  };
}(), function () {
  var map$$1 = new Actions$$1("NavigateTo", [new Route("Sample", [new SampleApi.Route("NestedCounter", [])])]);

  var route = function ($var6) {
    return Parsing._end(Parsing.drop($var6));
  }(Parsing.pStaticStr("/sample/nested-counter"));

  return function (str) {
    return Parsing.runM(map$$1, route, str);
  };
}(), function () {
  var map$$1 = new Actions$$1("NavigateTo", [new Route("About", [])]);

  var route = function ($var7) {
    return Parsing._end(Parsing.drop($var7));
  }(Parsing.pStaticStr("/about"));

  return function (str) {
    return Parsing.runM(map$$1, route, str);
  };
}()]);
function mapToRoute(route) {
  if (route.Case === "NavigateTo") {
    return resolveRoutesToUrl(route.Fields[0]);
  }
}
var router = RouteParser.createRouter(routes, function (route) {
  return mapToRoute(route);
});
var locationHandler = new RouteParser.LocationHandler(function (h) {
  window.addEventListener('hashchange', function (_arg1) {
    h(location.hash.substr(1));
    return null;
  });
}, function (s) {
  location.hash = s;
});
function routerF(m) {
  return router.Route(m.Message);
}
function tickProducer(push) {
  window.setInterval(function (_arg1) {
    push(new Actions$$1("SampleDispatcherAction", [new Actions$5("ClockActions", [new Actions$6("Tick", [now()])])]));
    return null;
  }, 1000);
  push(new Actions$$1("SampleDispatcherAction", [new Actions$5("ClockActions", [new Actions$6("Tick", [now()])])]));
}
AppApi.start(AppApi.withSubscriber(function () {
  var router_1 = function router_1(m) {
    return routerF(m);
  };

  return function (message) {
    RouteParser.routeSubscriber(locationHandler, router_1, message);
  };
}(), function (app) {
  return AppApi.withProducer(function (push) {
    tickProducer(push);
  }, app);
}(AppApi.withProducer(function (handler) {
  RouteParser.routeProducer(locationHandler, router, handler);
}, AppApi.withStartNodeSelector("#app", AppApi.createApp(Model$$1.Initial, function (model) {
  return view$$1(model);
}, function (model) {
  return function (action) {
    return update$$1(model, action);
  };
}, function (selector) {
  return function (handler) {
    return function (view_1) {
      return createRender(selector, handler, view_1);
    };
  };
}))))));

if (location.hash === "") {
  location.hash = "/";
} else {
  window.dispatchEvent(new Event("hashchange"));
}

var options = {
  highlight: function highlight(code) {
    return Prism.highlight(code, Prism.languages.fsharp);
  },
  langPrefix: "language-"
};
marked.setOptions(options);

exports.SubModels = SubModels;
exports.Model = Model$$1;
exports.Actions = Actions$$1;
exports.update = update$$1;
exports.view = view$$1;
exports.op_LessQmarkGreater = op_LessQmarkGreater;
exports.op_LessEqualsDotGreater = op_LessEqualsDotGreater;
exports.routes = routes;
exports.mapToRoute = mapToRoute;
exports.router = router;
exports.locationHandler = locationHandler;
exports.routerF = routerF;
exports.tickProducer = tickProducer;
exports.options = options;

}((this.WebApp = this.WebApp || {})));
