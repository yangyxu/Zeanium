/**
 * zn
 */
var zn = {
    version: '0.0.1',
    debug: false,
    toString: function (target){
        return Object.prototype.toString.call(target);
    },
    global: (function () {
        return this;
    }).call(null)
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = zn;
}


/**
 * Fix Javascript Object Function
 */
(function (zn){

    zn.fix = function (target, fixs){
        for(var key in fixs){
            if(typeof target[key] !== 'function'){
                target[key] = fixs[key];
            }
        }
        return this;
    }

    var __fixArray__ = {
        isArray: function (target){
            return zn.toString(target) === '[object Array]';
        }
    }

    var __fixArrayPrototype__ = {
        forEach: function (iterator, context){
            if(!iterator){ return false; }
            for(var i= 0, _len = this.length; i < _len; i++){
                iterator.call(context, this[i], i);
            }
        },
        indexOf: function (item){
            for(var i= 0, _len = this.length; i < _len; i++){
                if (this[i] === item){
                    return i;
                }
            }

            return -1;
        },
        lastIndexOf: function (item){
            for(var i= this.length - 1; i >= 0; i--){
                if (this[i] === item){
                    return i;
                }
            }

            return -1;
        }
    }

    var __fixFunction__ = {
        bind: function (context){
            var _self = this;
            return function (){
                return _self.apply(context, Array.prototype.slice.call(arguments));
            };
        }
    }

    var __fixObject__ = {
        keys: function (obj){
            if(obj !== Object(obj)){
                throw new TypeError('Object.keys called on a non-object');
            }
            var _keys = [], _property;
            for (_property in obj){
                if(Object.prototype.hasOwnProperty.call(obj,_property)){
                    _keys.push(_property);
                }
            }
            return _keys;
        },
        create: (function (){
            var __object = function (){};
            return function (obj, properties){
                if (obj === null){
                    throw new Error('Cannot set a null [[Prototype]]');
                };
                if (typeof obj !== 'object'){
                    throw new TypeError('Argument must be an object');
                }
                __fixObject.defineProperties(obj, properties);
                __object.prototype = obj;
                return new __object();
            }
        })(),
        defineProperty: function (obj, propertyName, descriptor){
            if (obj && propertyName && descriptor && descriptor.hasOwnProperty('value')) {
                obj[propertyName] = descriptor.value;
            }
            return obj;
        }
    }

    zn.fix(Array, __fixArray__);
    zn.fix(Array.prototype, __fixArrayPrototype__);
    zn.fix(Function.prototype, __fixFunction__);
    zn.fix(Object, __fixObject__);

    try {
        Object.defineProperty({}, 'zn', {});
    }
    catch (ex) {
        Object.defineProperty = function (obj, propertyName, descriptor) {
            return __fixObject__.defineProperty(obj, propertyName, descriptor);
        };
    }

})(zn);

/**
 * zn tool function
 */

(function (zn) {

    zn.extend = function (target){
        var _target = target||{};
        for(var i= 1,_len = arguments.length; i<_len; i++){
            var _args = arguments[i];
            for(var key in _args){
                if(_args.hasOwnProperty(key)){
                    _target[key] = _args[key];
                }
            }
        }
        return _target;
    }

    zn.overwrite = function (target){
        var _target = target||{};
        for(var i= 1,_len = arguments.length; i<_len; i++){
            var _args = arguments[i];
            for(var key in _args){
                if(_args.hasOwnProperty(key)){
                    if(_target[key]===undefined){
                        _target[key] = _args[key];
                    }
                }
            }
        }
        return _target;
    }

    zn.type = function (target){
        if (target && target.__type__) {
            return target.__type__;
        }
        else {
            return zn.toString(target).slice(8, -1).toLowerCase();
        }
    }

    zn.is = function (target, type){
        if (target && target.__is__){
            return target.__is__(type);
        }
        if (typeof type === 'string') {
            type = type.toLowerCase();
            switch (type) {
                case 'undefined':
                    return target === undefined;
                case 'null':
                    return target === null;
                case 'plain':
                    return target && target.constructor === Object;
                default:
                    return zn.type(target) === type;
            }
        }
        else if (typeof type === 'function') {
            return target instanceof type;
        }
    }

    zn.path = function (context, path, value){
        var _return = context||zn.global;
        if(!path){
            throw new Error('Invalid path.');
        }
        var _pathAry = path.split('.'), _temp, _len = _pathAry.length;
        if(value){
            for(var i=0; i<_len-1; i++){
                _temp = _pathAry[i];
                _return = _return[_temp] = _return[_temp]||{};
            }
            if(_return){
                _temp = _pathAry[i];
                _return[_temp] = value;
                _return = value;
            }
        }else {
            for(var i=0; _return && i<_len; i++){
                _temp = _pathAry[i];
                _return = _return[_temp];
            }
        }
        return _return;
    }

    zn.each = function (target, callback, context){
        if(target && callback){
            if (target.__class__&&target.__each__){
                target.__each__(callback, content);
            }else {
                if(zn.type(target)==='array'){
                    for(var i= 0, _len = target.length; i<_len; i++){
                        callback.call(context, target[i], i);
                    }
                }else {
                    for(var key in target){
                        if(target.hasOwnProperty(key)){
                            callback.call(context, target[key], key);
                        }
                    }
                }
            }
        }
    }

    zn.get = function (target, name){
        if (!target){ return; }
        if(target.__get__){
            return target.__get__(name);
        }else {
            return target[name];
        }
    }

    zn.gets = function (target){
        if (!target){ return; }
        if(target.__gets__){
            return target.__gets__();
        }else {
            var _result = {};
            for (var key in target){
                if(target.hasOwnProperty(key)){
                    _result[key] = target[key];
                }
            }
            return _result;
        }
    }

    zn.set = function (target, name, value){
        if (!target){ return; }
        if (target.__set__){
            target.__set__(name, value);
        }else {
            target[name] = value;
        }
    }

    zn.sets = function (target, obj){
        if(target&&obj){
            if(target.__sets__){
                target.__sets__(obj);
            }else {
                for(var key in obj){
                    if(obj.hasOwnProperty(key)){
                        target[key] = obj[key];
                    }
                }
            }
        }
    };

})(zn);

/**
 * Class Definition
 */

(function (zn){

    var __MEMBER_PREFIX__ = '$', __CLASS_ID__ = 0;

    var __defineProperty__ = function (target, name, meta){
        var _key = __MEMBER_PREFIX__ + name;

    }



    var __superClass__  = function (){ };

    var __commonMethods__ = {
        keys: function (){
            return Object.keys(this);
        },
        get: function (name, options){
            var _member = this.__get__(name);
            return _member && _member.getter.call(this, options);
        },
        set: function (name, options){
            var _member = this.__get__(name);
            if (_member && _member.setter){
                _member.setter.call(this, options);
            };
            return this;
        },
        gets: function (){

        },
        sets: function (){

        },
        __get__: function (name){
            return this[__MEMBER_PREFIX__+name];
        },
        __set__: function (name, value){
            this[__MEMBER_PREFIX__+name] = value;
        }
    };

    var __classMethods__ = {
        getMeta: function (name){
            return this.__meta__[name];
        },
        setMeta: function (name, value){
            return this.__meta__[name] = value, this;
        },
        defineEvent: function (){

        },
        defineProperty: function (){

        },
        defineMethod: function (){

        }
    };

    var __classProperties__ = {
        __id__: 0,
        __statics__: {},
        __events__: [],
        __properties__: [],
        __methods__: [],
        __mixins__: [],
        __meta__: {}
    };

    var __instanceMethods__ = {
        dispose: function (){

        },
        destroy: function (){

        },
        super: function (){

        },
        is: function (){

        },
        upon: function (){

        },
        on: function (){

        },
        off: function (){

        },
        fire: function (){

        },
        watch: function (){

        },
        unwatch: function (){

        }
    };

    zn.extend(__superClass__, __commonMethods__, __classMethods__, __classProperties__);

    zn.extend(__superClass__.prototype, __commonMethods__, __instanceMethods__);

    zn.class = function (){
        var _args = arguments, _argsLen = _args.length;
        if(!_argsLen){
            throw Error('Invalid arguments.');
        }
        var _name, _meta;
        var ZNClass, _super, _prototype;
        if(zn.is(_args[0], 'string')){
            _name = _args[0];
            _meta = _args[1];
        }else {
            _meta = _args[0];
        }
        _meta = zn.overwrite(_meta, {
            super: __superClass__,
            static: false,
            define: function (){},
            partial: false,
            abstract: false,
            mixins: [],
            statics: {},
            events: [],
            properties: {},
            methods: {}
        });

        var _super = _meta.super;
        if (_super.__static__){
            throw new Error('Static class cannot be inherited.');
        };
        if (_name&&_meta.partial){
            ZNClass = zn.path(zn.global, _name);
        };
        if (_meta.static){
            if (ZNClass){
                if(!ZNClass.__static__){
                    throw new Error('Partial class must be static.');
                }
            }else {
                ZNClass = function (){
                    throw new Error('Static class cannot be instantiated.');
                };
            }
            _prototype = ZNClass.prototype;
        }else {
            if (!ZNClass){
                ZNClass = _meta.abstract ?
                    function (){
                        throw new Error('Abstract class cannot be instantiated.');
                    }:
                    function (){

                    }
            }
            if (ZNClass.__super__!==_super){
                _prototype = Object.create(_super.prototype);
                _prototype.constructor = ZNClass;
                ZNClass.prototype = _prototype;
            }else {
                _prototype = ZNClass.prototype;
            }

            if(_meta.methods.init){
                _prototype.__ctor__ = _meta.methods.init;
            }
        };

        zn.extend(ZNClass, __commonMethods__, __classMethods__, {
            __id__: ++__CLASS_ID__,
            __define__: _meta.define,
            __type__: _name||'Anonymous',
            __name__: _name,
            __super__: _super,
            __partial__: _meta.partial,
            __abstract__: _meta.abstract,
            __static__: _meta.static,
            __statics__: zn.extend({}, _super.__statics__, _meta.statics),
            __events__: _meta.events.concat(_super.__events__),
            __properties__: Object.keys(_meta.properties).concat(_super.__properties__),
            __methods__: Object.keys(_meta.methods).concat(_super.__methods__),
            __mixins__: _meta.mixins.concat(_super.__mixins__),
            __meta__: _meta,
            toString: function () {
                return '[class ' + this.__type__ + ']';
            }
        });

        zn.extend(ZNClass, ZNClass.__statics__);

        if(ZNClass.__static__){

        } else {

        }


        if(ZNClass.__define__){
            ZNClass.__define__.call(ZNClass);
        }

        return ZNClass;
    }

    var myClass = zn.class({
        controller: 'aaa',
        define: function (){
            console.log(this.__type__);
        },
        events: ['click','mouse'],
        methods: {
            request: function (){

            }
        }
    });

    var test = new myClass();
    var _ary = myClass.keys();
    for(var i =0; i <_ary.length; i++){
        //console.log(_ary[i]);
        //console.log(myClass[_ary[i]]);
    }

    console.log(myClass.getMeta('controller'));

    console.log(test);








})(zn);