/**
 * Global Var
 */
var zn = {
    version: '0.0.1',
    debug: false,
    global: (function () { return this; }).call(null)
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = zn;
}
/**
 * Builtin Functions
 */
(function (zn) {

    var __builtin_functions__ = {
        toString: function (target){
            return Object.prototype.toString.call(target);
        },
        fix: function (target, fixs){
            for(var key in fixs){
                if(typeof target[key] !== 'function'){
                    target[key] = fixs[key];
                }
            }

            return this;
        },
        extend: function (target){
            for (var i = 1, length = arguments.length; i < length; i++) {
                var arg = arguments[i];
                for (var key in arg) {
                    if (arg.hasOwnProperty(key)) {
                        target[key] = arg[key];
                    }
                }
            }

            return target;
        },
        overwrite: function (target){
            var _target = target||{};
            for(var i= 1, _len = arguments.length; i<_len; i++){
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
        },
        each: function (target, callback, context) {
            if (target && callback) {
                if (target.__class__ && target.__each__) {
                    target.__each__(callback, context);
                }
                else {
                    var length = target.length;
                    if (length >= 0&&Object.prototype.toString.call(target) === '[object Array]') {
                        for (var i = 0; i < length; i++) {
                            callback.call(context, target[i], i);
                        }
                    }
                    else {
                        for (var key in target) {
                            if (target.hasOwnProperty(key)) {
                                callback.call(context, target[key], key);
                            }
                        }
                    }
                }
            }
        },
        clone: function (target) {
            if (target) {
                if (target.__clone__) {
                    return target.__clone__();
                }
                else {
                    if (zn.is(target, 'array')) {
                        return target.slice(0);
                    }
                    else {
                        var result = {};
                        for (var key in target) {
                            if (target.hasOwnProperty(key)) {
                                result[key] = target[key];
                            }
                        }

                        return result;
                    }
                }
            }
            else {
                return target;
            }
        },
        type: function (target) {
            if (target && target.__type__) {
                return target.__type__;
            }
            else {
                return Object.prototype.toString.call(target).slice(8, -1).toLowerCase();
            }
        },
        is: function (target, type) {
            if (target && target.__is__) {
                return target.__is__(type);
            }
            else {
                if (typeof type === 'string') {
                    type = type.toLowerCase();
                    var _targetType = Object.prototype.toString.call(target).slice(8, -1).toLowerCase();
                    switch (type) {
                        case 'plain':
                            return target && target.constructor === Object;
                        default:
                            return _targetType === type;
                    }
                }
                else if (typeof type === 'function') {
                    return target instanceof type;
                }
            }
        },
        may: function (target, name) {
            if (target) {
                if (target.__may__) {
                    return target.__may__(name);
                }
                else {
                    return target.hasOwnProperty('on' + name);
                }
            }
            else {
                return false;
            }
        },
        can: function (target, name) {
            if (target) {
                if (target.__can__) {
                    return target.__can__(name);
                }
                else {
                    return typeof target[name] === 'function';
                }
            }
            else {
                return false;
            }
        },
        has: function (target, name) {
            if (target) {
                if (target.__has__) {
                    return target.__has__(name);
                }
                else {
                    return target.hasOwnProperty(name);
                }
            }
            else {
                return false;
            }
        },
        get: function (target, name) {
            if (target) {
                if (target.__get__) {
                    return target.__get__(name);
                }
                else {
                    return target[name];
                }
            }
        },
        set: function (target, name, value) {
            if (target) {
                if (target.__set__) {
                    target.__set__(name);
                }
                else {
                    target[name] = value;
                }
            }
        },
        gets: function (target) {
            if (target) {
                if (target.__gets__) {
                    return target.__gets__();
                }
                else {
                    var result = {};
                    for (var key in target) {
                        if (target.hasOwnProperty(key)) {
                            result[key] = target[key];
                        }
                    }
                    return result;
                }
            }
        },
        sets: function (target, dict) {
            if (target && dict) {
                if (target.__sets__) {
                    target.__sets__(dict);
                }
                else {
                    for (var key in dict) {
                        if (dict.hasOwnProperty(key)) {
                            target[key] = dict[key];
                        }
                    }
                }
            }
        },
        path: function (target, path, value) {
            var result = target;
            if (path) {
                var tokens = path.split('.'), token,
                    i = 0, length = tokens.length;

                if (arguments.length < 3) {
                    for (; result && i < length; i++) {
                        token = tokens[i];
                        if (result.__get__) {
                            result = result.__get__(token);
                        }
                        else {
                            result = result[token];
                        }
                    }
                }
                else {
                    length -= 1;
                    for (; result && i < length; i++) {
                        token = tokens[i];
                        if (result.__get__) {
                            result = result.__get__(token);
                        }
                        else {
                            result = result[token] = result[token] || {};
                        }
                    }

                    token = tokens[i];
                    if (result) {
                        if (result.__set__) {
                            result.__set__(token, value);
                        }
                        else {
                            result[token] = value;
                        }

                        result = value;
                    }
                }
            }

            return result;
        },
        invoke: function (target, path, args) {
            if (target && path) {
                var index = path.lastIndexOf('.');
                var context, method;

                if (index > 0) {
                    context = zn.path(target, path.substring(0, index));
                    if (context) {
                        method = context[path.substring(index + 1)];
                    }
                }
                else {
                    context = target;
                    method = target[path];
                }

                if (method) {
                    method.apply(context, args);
                }
            }
        }
    };

    __builtin_functions__.extend(zn, __builtin_functions__);

})(zn);
/**
 * Fix Javascript Object Functions
 */
(function (zn){

    var __fixArray__ = {
        isArray: function (target){
            /*
             * Two solution of fix Array function
             * 1, return Object.prototype.toString.call(target) === '[object Array]';
             * 2, return target&&target.constructor === Array;
             * */
            return Object.prototype.toString.call(target) === '[object Array]';
        }
    };

    var __fixArrayPrototype__ = {
        forEach: function (iterator, context){
            if(!iterator){ return false; }
            for(var i= 0, _len = this.length; i < _len; i++){
                iterator.call(context, this[i], i);
            }

            return this;
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
    };

    var __fixFunction__ = {
        bind: function (context){
            var _self = this;
            return function (){
                return _self.apply(context, Array.prototype.slice.call(arguments));
            };
        }
    };

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
            console.log(this);
            return _keys;
        },
        create: (function (){
            var _object = function (){}, _self = this;
            return function (obj, properties){
                if (obj === null){
                    throw new Error('Cannot set a null [[Prototype]]');
                }

                if (typeof obj !== 'object'){
                    throw new TypeError('Argument must be an object');
                }

                _self.defineProperties(obj, properties);
                _object.prototype = obj;
                return new _object();
            };
        })(),
        defineProperty: function (obj, propertyName, descriptor){
            if (obj && propertyName && descriptor && descriptor.hasOwnProperty('value')) {
                obj[propertyName] = descriptor.value;
            }

            return obj;
        }
    };

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
 * Class Mechanism
 */
(function (zn) {

    var MEMBER_PREFIX = '@',
        id = 1,
        GLOBAL = zn.global;

    /**
     * Define an event for target
     * @param target
     * @param name
     * @param meta
     * @returns {boolean}
     */
    function defineEvent(target, name, meta) {
        var key = MEMBER_PREFIX + name;
        var overridden = key in target;

        target[key] = {
            name: name,
            type: 'event',
            meta: meta,
            descriptor: Object.defineProperty(target, 'on' + name.toLowerCase(), {
                get: function () {
                    var listeners = this.__handler__[name];
                    if (listeners) {
                        return listeners[0].handler;
                    }
                    else {
                        return null;
                    }
                },
                set: function (value) {
                    var map = this.__handler__;
                    var listeners = map[name] = map[name] || [];

                    listeners[0] = {
                        owner: this,
                        handler: value,
                        context: null
                    };
                }
            })
        };

        return overridden;
    }

    /**
     * Define a property for target
     * @param target
     * @param name
     * @param meta
     * @returns {boolean}
     */
    function defineProperty(target, name, meta) {
        var key = MEMBER_PREFIX + name;
        var overridden = key in target;
        var getter, setter;

        if ('value' in meta) {
            var value = meta.value;
            var field = '_' + name;
            getter = function () {
                if (field in this) {
                    return this[field];
                }
                else {
                    return zn.is(value, 'function') ? value.call(this) : value;
                }
            };
            setter = meta.readonly ?
                function (value, options) {
                    if (options && options.force) {
                        this[field] = value;
                    }
                    else {
                        return false;
                    }
                } :
                function (value) {
                    this[field] = value;
                };
        }
        else {
            getter = meta.get || function () {
                return undefined;
            };
            setter = meta.set || function () {
                return false;
            };
        }

        if (overridden) {
            getter.__super__ = target[key].getter;
            setter.__super__ = target[key].setter;
        }

        target[key] = {
            name: name,
            type: 'property',
            meta: meta,
            getter: getter,
            setter: setter,
            descriptor: Object.defineProperty(target, name, {
                get: getter,
                set: setter,
                configurable: true
            })
        };

        return overridden;
    }

    /**
     * Define a method for target
     * @param target
     * @param name
     * @param meta
     * @returns {boolean}
     */
    function defineMethod(target, name, meta) {
        var key = MEMBER_PREFIX + name;
        var overridden = key in target;

        target[key] = {
            name: name,
            type: 'method',
            meta: meta
        };

        if (name in target) {
            meta.value.__super__ = target[name];
        }

        target[name] = meta.value;

        return overridden;
    }

    var sharedMethods = {
        /**
         * Get specified member.
         * @param name
         * @returns {*}
         */
        member: function (name) {
            return this[MEMBER_PREFIX + name];
        },
        /**
         * Check whether current object has specified event.
         * @method may
         * @param name {String}
         * @returns {Boolean}
         */
        may: function (name) {
            var member = this.member(name);
            return member && member.type == 'event';
        },
        /**
         * Check whether current object has specified property.
         * @method has
         * @param name {String}
         * @returns {Boolean}
         */
        has: function (name) {
            var member = this.member(name);
            return member && member.type == 'property';
        },
        /**
         * Check whether current object has specified method.
         * @method can
         * @param name {String}
         * @returns {Boolean}
         */
        can: function (name) {
            var member = this.member(name);
            return member && member.type == 'method';
        },
        /**
         * Get specified property value.
         * @method get
         * @param name {String}
         * @param [options] {Any}
         * @returns {*}
         */
        get: function (name, options) {
            var member = this.member(name);
            return member && member.getter.call(this, options);
        },
        /**
         * Set specified property value.
         * @method set
         * @param name {String}
         * @param value {*}
         * @param [options] {Any}
         */
        set: function (name, value, options) {
            var member = this.member(name);
            if (member && member.setter) {
                member.setter.call(this, value, options);
            }

            return this;
        },
        /**
         * Get all properties.
         * @method gets
         * @returns {Object}
         * @param [options] {Any}
         */
        gets: function (options) {
            var result = {};
            zn.each(this.constructor.__properties__, function (name) {
                result[name] = this.get(name, options);
            }, this);

            return result;
        },
        /**
         * Set a bunch of properties.
         * @method sets
         * @param dict {Object}
         * @param [options] {Any}
         */
        sets: function (dict, options) {
            if (dict) {
                for (var name in dict) {
                    if (dict.hasOwnProperty(name)) {
                        this.set(name, dict[name], options);
                    }
                }
            }

            return this;
        },
        /**
         * Add a single event handler.
         * @method upon
         * @param name {String}
         * @param handler {Function}
         * @param [options] {Object}
         */
        upon: function (name, handler, options) {
            if (handler) {
                var map = this.__handler__;
                var listeners = map[name] = map[name] || [];

                listeners[0] = zn.extend({
                    owner: this,
                    handler: handler
                }, options);
            }

            return this;
        },
        /**
         * Add an event handler.
         * @method on
         * @param name {String}
         * @param handler {Function}
         * @param [options] {Object}
         */
        on: function (name, handler, options) {
            if (handler) {
                var map = this.__handler__;
                var listeners = map[name] = map[name] || [
                    {owner: null, handler: null, context: null}
                ];

                listeners.push(zn.extend({
                    owner: this,
                    handler: handler
                }, options));
            }

            return this;
        },
        /**
         * Remove an event handler.
         * @method off
         * @param name {String}
         * @param [handler] {Function}
         * @param [options] {Object}
         */
        off: function (name, handler, options) {
            var listeners = this.__handler__[name], listener;
            var context = options && options.context;
            if (listeners) {
                if (handler) {
                    for (var i = listeners.length - 1; i >= 0; i--) {
                        listener = listeners[i];
                        if (listener.handler === handler && (!context || listener.context === context )) {
                            listeners.splice(i, 1);
                        }
                    }
                }
                else {
                    listeners.length = 1;
                }
            }

            return this;
        },
        /**
         * Trigger an event.
         * @method fire
         * @param name {String}
         * @param [data] {*}
         * @param [options] {Object}
         */
        fire: function (name, data, options) {
            var listeners = this.__handler__[name], listener;
            if (listeners) {
                for (var i = 0, length = listeners.length; i < length; i++) {
                    listener = listeners[i];
                    if (listener && listener.handler) {
                        if (false === listener.handler.call(listener.context || listener.owner, listener.owner, data, options)) {
                            return false;
                        }
                    }
                }
            }
        },
        __may__: function (name) {
            return this.may(name);
        },
        __can__: function (name) {
            return this.can(name);
        },
        __has__: function (name) {
            return this.has(name);
        },
        __get__: function (name) {
            return this.get(name);
        },
        __set__: function (name, value) {
            this.set(name, value);
        },
        __gets__: function () {
            return this.gets();
        },
        __sets__: function (dict) {
            this.sets(dict);
        }
    };

    var classMethods = {
        /**
         * Get the meta data of the class.
         * @param name
         * @returns {*}
         */
        getMeta: function (name) {
            return this.__meta__[name];
        },
        /**
         * Get the meta data of the class.
         * @param name
         * @param value
         * @returns {*}
         */
        setMeta: function (name, value) {
            this.__meta__[name] = value;
            return this;
        },
        /**
         * Define an event.
         * @method defineEvent
         * @static
         * @param name {String}
         * @param [meta] {Object}
         * @param [target] {Object}
         */
        defineEvent: function (name, meta, target) {
            if (!defineEvent(target || this.prototype, name, meta)) {
                this.__events__.push(name);
            }

            return this;
        },
        /**
         * Define a property.
         * @method defineProperty
         * @static
         * @param name {String}
         * @param [meta] {Object}
         * @param [target] {Object}
         */
        defineProperty: function (name, meta, target) {
            if (!defineProperty(target || this.prototype, name, meta)) {
                this.__properties__.push(name);
            }

            return this;
        },
        /**
         * Define a method.
         * @method defineMethod
         * @static
         * @param name {String}
         * @param meta {Object}
         * @param [target] {Object}
         */
        defineMethod: function (name, meta, target) {
            if (!defineMethod(target || this.prototype, name, meta)) {
                this.__methods__.push(name);
            }

            return this;
        }
    };

    var instanceMethods = {
        /**
         * Dispose current object.
         * @method dispose
         */
        dispose: function () {
            this.__handler__ = {};
        },
        /**
         * Destroy current object.
         * @method destroy
         */
        destroy: function () {
            this.dispose();
        },
        /**
         * Call overridden method from super class
         * @method super
         */
        super: function () {
            var superMethod = this.super.caller.__super__;
            if (superMethod) {
                return superMethod.apply(this, arguments);
            }
        },
        /**
         * Check whether current object is specified type.
         * @method is
         * @param type {String|Function}
         * @returns {Boolean}
         */
        is: function (type) {
            if (typeof type === 'string') {
                type = zn.path(GLOBAL, type);
            }

            if (type) {
                if (this instanceof type) {
                    return true;
                }
                else {
                    var mixins = this.constructor.__mixins__;
                    for (var i = 0, len = mixins.length; i < len; i++) {
                        var mixin = mixins[i];
                        if (type === mixin) {
                            return true;
                        }
                    }
                }
            }

            return false;
        },
        __is__: function (type) {
            return this.is(type);
        }
    };

    /**
     * The default super class for all classes defined in znJS.
     * @private
     */
    function __Object__() {
    }

    zn.extend(__Object__, sharedMethods, classMethods, {
        __id__: 0,
        __statics__: {},
        __events__: [],
        __properties__: [],
        __methods__: [],
        __mixins__: [],
        __meta__: {}
    });

    zn.extend(__Object__.prototype, sharedMethods, instanceMethods);

    /**
     * Define a class
     * @method define
     * @param [name] {String}
     * @param [super] {Function}
     * @param meta {Object}
     * @returns {Function}
     */
    zn.class = function () {
        var args = arguments;
        var nArgs = args.length;
        var arg0 = args[0];
        var name, _super, meta;

        if (nArgs === 3) {
            name = arg0;
            _super = args[1];
            meta = args[2];

            if (!zn.is(_super, 'function')) {
                throw new Error('Invalid _super class.');
            }
        }
        else if (nArgs === 2) {
            if (zn.is(arg0, 'string')) {
                name = arg0;
                _super = null;
            }
            else if (zn.is(arg0, 'function')) {
                name = null;
                _super = arg0;
            }
            else {
                throw new Error('Invalid _super class.');
            }
            meta = args[1];
        }
        else if (nArgs === 1) {
            name = null;
            _super = null;
            meta = arg0;
            if (!zn.is(meta, 'object')) {
                throw new Error('The meta argument must be an object.');
            }
        }
        else {
            throw new Error('Invalid arguments.');
        }

        meta = meta || {};
        _super = _super || __Object__;

        var static = meta.static || false;
        var partial = meta.partial || false;
        var abstract = meta.abstract || false;
        var final = meta.final || false;
        var mixins = meta.mixins || [];
        var statics = meta.statics || {};
        var events = meta.events || [];
        var props = meta.properties || {};
        var methods = meta.methods || {};
        var prototype;
        var Class, SuperClass;

        if (_super.__static__) {
            throw new Error('Static class cannot be inherited.');
        }

        if (_super.__final__) {
            throw new Error('Final class cannot be inherited.');
        }

        if (name && partial) {
            Class = zn.path(GLOBAL, name);
        }

        if (static) {
            if (Class) {
                if (!Class.__static__) {
                    throw new Error('Partial class "' + name + '" must be static.');
                }
            }
            else {
                Class = function () {
                    throw new Error('Cannot instantiate static class.');
                };
            }

            prototype = Class.prototype;
        }
        else {
            if (Class) {
                if (Class.__static__) {
                    throw new Error('Partial class "' + name + '" must not be static.');
                }

                if (Class.__super__ !== _super && Class.__super__ !== __Object__) {
                    throw new Error('Partial class "' + name + '" must have consistent super class.');
                }
            }
            else {
                Class = abstract ?
                    function () {
                        throw new Error('Cannot instantiate abstract class.');
                    } :
                    function () {
                        var mixins = Class.__mixins__;
                        this.__id__ = id++;
                        this.__handler__ = {};

                        this.__initializing__ = true;


                        for (var i = 0, length = mixins.length; i < length; i++) {
                            var ctor = mixins[i].prototype.__ctor__;
                            if (ctor) {
                                ctor.call(this);
                            }
                        }

                        if (this.__ctor__) {
                            this.__ctor__.apply(this, arguments);
                        }

                        this.__initializing__ = false;
                    };
            }

            if (Class.__super__ !== _super) {
                SuperClass = function () {
                };

                SuperClass.prototype = _super.prototype;
                prototype = new SuperClass();
                prototype.constructor = Class;
                prototype.__type__ = name;

                Class.prototype = prototype;
            }
            else {
                prototype = Class.prototype;
            }

            if (methods.init) {
                prototype.__ctor__ = methods.init;
            }
        }

        zn.extend(Class, sharedMethods, classMethods, {
            __id__: id++,
            __name__: name,
            __super__: _super,
            __partial__: partial,
            __abstract__: abstract,
            __static__: static,
            __final__: final,
            __statics__: zn.extend({}, _super.__statics__, statics),
            __events__: _super.__events__.slice(0),
            __properties__: _super.__properties__.slice(0),
            __methods__: _super.__methods__.slice(0),
            __mixins__: _super.__mixins__.concat(mixins),
            __meta__: meta,
            toString: function () {
                return '[Class ' + (this.__name__ || 'Anonymous') + ']';
            }
        });

        zn.extend(Class, Class.__statics__);

        if (static) {
            zn.each(events, function (item) {
                defineEvent(Class, item, {});
            });

            zn.each(props, function (value, key) {
                defineProperty(Class, key, zn.is(value, 'object') ? value : {value: value});
            });

            zn.each(methods, function (value, key) {
                defineMethod(Class, key, zn.is(value, 'function') ? {value: value} : value);
            });

            if (methods.init) {
                methods.init.call(Class);
            }
        }
        else {
            zn.each(mixins, function (mixin) {
                var mixinPrototype = mixin.prototype;
                zn.each(mixin.__events__, function (name) {
                    Class.defineEvent(name, mixinPrototype.member(name).meta);
                });

                zn.each(mixin.__properties__, function (name) {
                    Class.defineProperty(name, mixinPrototype.member(name).meta);
                });

                zn.each(mixin.__methods__, function (name) {
                    if (!sharedMethods[name] && !instanceMethods[name]) {
                        Class.defineMethod(name, mixinPrototype.member(name).meta);
                    }
                });
            });

            zn.each(events, function (item) {
                Class.defineEvent(item, {});
            });

            zn.each(props, function (value, key) {
                Class.defineProperty(key, zn.is(value, 'object') ? value : {value: value});
            });

            zn.each(methods, function (value, key) {
                Class.defineMethod(key, zn.is(value, 'function') ? {value: value} : value);
            });
        }

        if (prototype.__define__) {
            prototype.__define__.call(Class);
        }

        if(name){
            zn.path(GLOBAL, name, Class);
        }

        return Class;
    };

})(zn);