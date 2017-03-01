(function (exports,virtualDom) {
'use strict';

function unwrapExports (x) {
	return x && x.__esModule ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
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
var hide$1      = _hide;
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
      if(type & $export$1.R && expProto && !expProto[key])hide$1(expProto, key, out);
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

var _redefine = _hide;

var hasOwnProperty = {}.hasOwnProperty;
var _has = function(it, key){
  return hasOwnProperty.call(it, key);
};

var _iterators = {};

var toString = {}.toString;

var _cof = function(it){
  return toString.call(it).slice(8, -1);
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
var min       = Math.min;
var _toLength = function(it){
  return it > 0 ? min(toInteger$1(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

var toInteger$2 = _toInteger;
var max       = Math.max;
var min$1       = Math.min;
var _toIndex = function(index, length){
  index = toInteger$2(index);
  return index < 0 ? max(index + length, 0) : min$1(index, length);
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

var _objectCreate = Object.create || function create$$1(O, Properties){
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

var create$1         = _objectCreate;
var descriptor     = _propertyDesc;
var setToStringTag$1 = _setToStringTag;
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
_hide(IteratorPrototype, _wks('iterator'), function(){ return this; });

var _iterCreate = function(Constructor, NAME, next){
  Constructor.prototype = create$1(IteratorPrototype, {next: descriptor(1, next)});
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
var $export        = _export;
var redefine       = _redefine;
var hide           = _hide;
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
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
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
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
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
var fastKey = function(it, create$$1){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create$$1)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create$$1){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create$$1)return false;
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
var defineProperty = _objectDp.f;
var _wksDefine = function(name){
  var $Symbol = core$1.Symbol || (core$1.Symbol = LIBRARY$1 ? {} : global$5.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt$1.f(name)});
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
var toString$1  = {}.toString;

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
  return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : gOPN$1(toIObject$5(it));
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
var $export$2        = _export;
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
var isArray        = _isArray;
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
var $create = function create$$1(it, P){
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

$export$2($export$2.G + $export$2.W + $export$2.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i$1 = 0; symbols.length > i$1; )wks(symbols[i$1++]);

for(var symbols = $keys$1(wks.store), i$1 = 0; symbols.length > i$1; )wksDefine(symbols[i$1++]);

$export$2($export$2.S + $export$2.F * !USE_NATIVE, 'Symbol', {
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

$export$2($export$2.S + $export$2.F * !USE_NATIVE, 'Object', {
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
$JSON && $export$2($export$2.S + $export$2.F * (!USE_NATIVE || $fails(function(){
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
    if($replacer || !isArray(replacer))replacer = function(key, value){
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
var defineProperty$3 = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};

var defineProperty$1 = createCommonjsModule(function (module) {
module.exports = { "default": defineProperty$3, __esModule: true };
});

var createClass = createCommonjsModule(function (module, exports) {
"use strict";

exports.__esModule = true;

var _defineProperty = defineProperty$1;

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
function toString$2(o) {
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
        return "[" + Array.from(this).map(toString$2).join("; ") + "]";
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






























function tryFind(f, xs, defaultValue) {
    for (var i = 0, iter = xs[Symbol.iterator]();; i++) {
        var cur = iter.next();
        if (cur.done)
            return defaultValue === void 0 ? null : defaultValue;
        if (f(cur.value, i))
            return cur.value;
    }
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
        return "map [" + Array.from(this).map(toString$2).join("; ") + "]";
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


function filter$$1(f, xs) {
    return reverse$$1(fold(function (acc, x) { return f(x) ? new List$1(x, acc) : acc; }, new List$1(), xs));
}


function map$1(f, xs) {
    return reverse$$1(fold(function (acc, x) { return new List$1(f(x), acc); }, new List$1(), xs));
}



function reverse$$1(xs) {
    return fold(function (acc, x) { return new List$1(x, acc); }, new List$1(), xs);
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
                    rep = toString$2(rep);
                    break;
                case "A":
                    try {
                        rep = JSON.stringify(rep, function (k, v) {
                            return v && v[Symbol.iterator] && !Array.isArray(v) && isObject(v) ? Array.from(v)
                                : v && typeof v.ToString === "function" ? toString$2(v) : v;
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
function mapEventHandler(mapping, e, f) {
    return new Types.Attribute("EventHandler", [[e, function ($var1) {
        return mapping(f($var1));
    }]]);
}
function mapAttributes(mapping, attribute) {
    if (attribute.Case === "Style") {
        return new Types.Attribute("Style", [attribute.Fields[0]]);
    } else if (attribute.Case === "Property") {
        return new Types.Attribute("Property", [attribute.Fields[0]]);
    } else if (attribute.Case === "Attribute") {
        return new Types.Attribute("Attribute", [attribute.Fields[0]]);
    } else {
        return mapEventHandler(mapping, attribute.Fields[0][0], attribute.Fields[0][1]);
    }
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
    if (node.Case === "VoidElement") {
        return new Types.DomNode("VoidElement", [mapVoidElem(mapping, node.Fields[0][0], node.Fields[0][1])]);
    } else if (node.Case === "Text") {
        return new Types.DomNode("Text", [node.Fields[0]]);
    } else if (node.Case === "WhiteSpace") {
        return new Types.DomNode("WhiteSpace", [node.Fields[0]]);
    } else if (node.Case === "Svg") {
        return new Types.DomNode("Element", [mapElem(mapping, node.Fields[0][0], node.Fields[0][1]), map$1(function (node_1) {
            return map$$1(mapping, node_1);
        }, node.Fields[1])]);
    } else {
        return new Types.DomNode("Element", [mapElem(mapping, node.Fields[0][0], node.Fields[0][1]), map$1(function (node_1) {
            return map$$1(mapping, node_1);
        }, node.Fields[1])]);
    }
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

var Types$1 = function (__exports) {
    var ModelChanged = __exports.ModelChanged = function () {
        function ModelChanged(previousState, message, currentState) {
            _classCallCheck$2(this, ModelChanged);

            this.PreviousState = previousState;
            this.Message = message;
            this.CurrentState = currentState;
        }

        _createClass$2(ModelChanged, [{
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
            _classCallCheck$2(this, AppEvent);

            this.Case = caseName;
            this.Fields = fields;
        }

        _createClass$2(AppEvent, [{
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
            _classCallCheck$2(this, AppMessage);

            this.Case = caseName;
            this.Fields = fields;
        }

        _createClass$2(AppMessage, [{
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
            _classCallCheck$2(this, Plugin);

            this.Producer = producer;
            this.Subscriber = subscriber;
        }

        _createClass$2(Plugin, [{
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
            _classCallCheck$2(this, AppSpecification);

            this.InitState = initState;
            this.View = view;
            this.Update = update;
            this.InitMessage = initMessage;
            this.CreateRenderer = createRenderer;
            this.NodeSelector = nodeSelector;
            this.Producers = producers;
            this.Subscribers = subscribers;
        }

        _createClass$2(AppSpecification, [{
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
            _classCallCheck$2(this, App);

            this.Model = model;
            this.Actions = actions;
            this.Render = render;
            this.Subscribers = subscribers;
        }

        _createClass$2(App, [{
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

var _createClass$3 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$3(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
        _classCallCheck$3(this, RenderState);

        this.Case = caseName;
        this.Fields = fields;
    }

    _createClass$3(RenderState, [{
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
        _classCallCheck$3(this, ViewState);

        this.CurrentTree = currentTree;
        this.NextTree = nextTree;
        this.Node = node;
        this.RenderState = renderState;
    }

    _createClass$3(ViewState, [{
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
  var voidLinkAction = __exports.voidLinkAction = function () {
    return Attributes.property("href", "javascript:void(0)");
  };

  var column = __exports.column = function () {
    return Tags.div(ofArray([Attributes.classy("column")]))(new List$1());
  };

  return __exports;
}({});
var Counter = function (__exports) {
  var Actions = __exports.Actions = function () {
    function Actions(caseName, fields) {
      _classCallCheck(this, Actions);

      this.Case = caseName;
      this.Fields = fields;
    }

    _createClass(Actions, [{
      key: _Symbol.reflection,
      value: function () {
        return {
          type: "Sample.Counter.Actions",
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

  setType("Sample.Counter.Actions", Actions);

  var Model = __exports.Model = function () {
    function Model(value) {
      _classCallCheck(this, Model);

      this.Value = value;
    }

    _createClass(Model, [{
      key: _Symbol.reflection,
      value: function () {
        return {
          type: "Sample.Counter.Model",
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

  setType("Sample.Counter.Model", Model);

  var update = __exports.update = function (model, action) {
    if (action.Case === "Sub") {
      return [new Model(model.Value - 1), new List$1()];
    } else if (action.Case === "Reset") {
      return [new Model(0), new List$1()];
    } else {
      return [new Model(model.Value + 1), new List$1()];
    }
  };

  var simpleButton = __exports.simpleButton = function (txt, action) {
    return Tags.div(ofArray([Attributes.classy("column is-narrow is-narrow-mobile")]))(ofArray([Tags.a(ofArray([Attributes.classy("button"), VDom.voidLinkAction(), Events.onMouseClick(function (_arg1) {
      return action;
    })]))(ofArray([Tags.text(txt)]))]));
  };

  var view = __exports.view = function (model) {
    return Tags.div(ofArray([Attributes.classy("columns is-vcentered is-flex-mobile")]))(ofArray([Tags.div(ofArray([Attributes.classy("column is-narrow is-narrow-mobile"), new Types.Attribute("Style", [ofArray([["width", "170px"]])])]))(ofArray([Tags.text(fsFormat("Counter value: %i")(function (x) {
      return x;
    })(model.Value))])), simpleButton("+1", new Actions("Add", [])), simpleButton("-1", new Actions("Sub", [])), simpleButton("Reset", new Actions("Reset", []))]));
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
          CounterActions: ["number", Counter.Model, Counter.Actions],
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

  return Actions;
}();
setType("Sample.Actions", Actions);
var Model = function () {
  function Model(counters, nextId) {
    _classCallCheck(this, Model);

    this.Counters = counters;
    this.NextId = nextId;
  }

  _createClass(Model, [{
    key: _Symbol.reflection,
    value: function () {
      return {
        type: "Sample.Model",
        interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
        properties: {
          Counters: makeGeneric(List$1, {
            T: Tuple(["number", Counter.Model])
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
      return new Model(new List$1(), 0);
    }
  }]);

  return Model;
}();
setType("Sample.Model", Model);
function update(model, action) {
  if (action.Case === "DeleteCounter") {
    var counters = filter$$1(function (tupledArg) {
      return tupledArg[0] !== action.Fields[0];
    }, model.Counters);
    return [new Model(counters, model.NextId), new List$1()];
  } else if (action.Case === "ResetAll") {
    var message = ofArray([function (h$$1) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _getIterator(model.Counters), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var forLoopVar = _step.value;
          h$$1(new Actions("CounterActions", [forLoopVar[0], forLoopVar[1], new Counter.Actions("Reset", [])]));
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
      var patternInput = Counter.update(action.Fields[1], action.Fields[2]);
      var mActions = AppApi.mapActions(function (tupledArg_1) {
        return new Actions("CounterActions", [tupledArg_1[0], tupledArg_1[1], tupledArg_1[2]]);
      })(patternInput[1]);
      var counters_1 = map$1(function (tupledArg_2) {
        return tupledArg_2[0] === action.Fields[0] ? [tupledArg_2[0], patternInput[0]] : [tupledArg_2[0], tupledArg_2[1]];
      }, model.Counters);
      return {
        v: [new Model(counters_1, model.NextId), mActions]
      };
    }();

    if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
  } else {
    return [new Model(append$$1(model.Counters, ofArray([[model.NextId, Counter.Model.Initial]])), model.NextId + 1), new List$1()];
  }
}
function simpleButton(txt, action) {
  return Tags.div(ofArray([Attributes.classy("column is-narrow")]))(ofArray([Tags.a(ofArray([Attributes.classy("button"), VDom.voidLinkAction(), Events.onMouseClick(function (_arg1) {
    return action;
  })]))(ofArray([Tags.text(txt)]))]));
}
function counterRow(id, counter) {
  return Tags.div(ofArray([Attributes.classy("columns is-vcentered is-flex-mobile")]))(ofArray([VDom.column(), Tags.div(ofArray([Attributes.classy("column is-narrow")]))(ofArray([Tags.a(ofArray([Attributes.classy("button"), VDom.voidLinkAction(), Events.onMouseClick(function (_arg1) {
    return new Actions("DeleteCounter", [id]);
  })]))(ofArray([Tags.i(ofArray([Attributes.classy("fa fa-trash")]))(new List$1())]))])), Tags.div(new List$1())(ofArray([map$$1(function (act) {
    return new Actions("CounterActions", [id, counter, act]);
  }, Counter.view(counter))])), VDom.column()]));
}
function view(model) {
  var countersView = map$1(function (tupledArg) {
    return counterRow(tupledArg[0], tupledArg[1]);
  }, model.Counters);
  return Tags.div(new List$1())(new List$1(Tags.div(ofArray([Attributes.classy("columns is-vcentered is-flex-mobile")]))(ofArray([VDom.column(), simpleButton("Create a new counter", new Actions("CreateCounter", [])), simpleButton("Reset all", new Actions("ResetAll", [])), VDom.column()])), countersView));
}
AppApi.start(AppApi.withStartNodeSelector("#sample", AppApi.createApp(Model.Initial, function (model) {
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
})));

exports.VDom = VDom;
exports.Counter = Counter;
exports.Actions = Actions;
exports.Model = Model;
exports.update = update;
exports.simpleButton = simpleButton;
exports.counterRow = counterRow;
exports.view = view;

}((this.sample = this.sample || {}),virtualDom));
