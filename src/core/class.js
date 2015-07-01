/**
 * Define Class
 */
(function (zn) {

    var CLASS_MEMBER_PREFIX = '@',
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
        var _key = CLASS_MEMBER_PREFIX + name;
        var _exist = _key in target;

        target[_key] = {
            name: name,
            type: 'event',
            meta: meta,
            descriptor: Object.defineProperty(target, 'on' + name.toLowerCase(), {
                get: function () {
                    var _listeners = this.__handlers__[name];
                    if (_listeners) {
                        return _listeners[0].handler;
                    }
                    else {
                        return null;
                    }
                },
                set: function (value) {
                    var _handlers = this.__handlers__;
                    var _listeners = _handlers[name] = _handlers[name] || [];

                    _listeners[0] = {
                        owner: this,
                        handler: value,
                        context: null
                    };
                }
            })
        };

        return _exist;
    }

    /**
     * Define a property for target
     * @param target
     * @param name
     * @param meta
     * @returns {boolean}
     */
    function defineProperty(target, name, meta) {
        var _key = CLASS_MEMBER_PREFIX + name;
        var _exist = _key in target;
        var _getter, _setter;

        if ('value' in meta) {
            var _value = meta.value;
            var _field = '_' + name;
            _getter = function () {
                if (_field in this) {
                    return this[_field];
                }
                else {
                    return zn.is(_value, 'function') ? _value.call(this) : _value;
                }
            };
            _setter = meta.readonly ?
                function (value, options) {
                    if (options && options.force) {
                        this[_field] = value;
                    }
                    else {
                        return false;
                    }
                } :
                function (value) {
                    this[_field] = value;
                };
        } else {
            _getter = meta.get || function () {
                return undefined;
            };
            _setter = meta.set || function () {
                return false;
            };
        }

        if (_exist) {
            _getter.__super__ = target[_key].getter;
            _setter.__super__ = target[_key].setter;
        }

        target[_key] = {
            name: name,
            type: 'property',
            meta: meta,
            getter: _getter,
            setter: _setter,
            descriptor: Object.defineProperty(target, name, {
                get: _getter,
                set: _setter,
                configurable: true
            })
        };

        return _exist;
    }

    /**
     * Define a method for target
     * @param target
     * @param name
     * @param meta
     * @returns {boolean}
     */
    function defineMethod(target, name, meta) {
        var _key = CLASS_MEMBER_PREFIX + name;
        var _exist = _key in target;

        target[_key] = {
            name: name,
            type: 'method',
            meta: meta
        };

        if (name in target) {
            meta.value.__super__ = target[name];
        }

        target[name] = meta.value;

        return _exist;
    }

    var sharedMethods = {
        toString: function (){
            return '[Class ' + (this.__name__ || 'Anonymous') + ' ]';
        },
        /**
         * Get specified member.
         * @param name
         * @returns {*}
         */
        member: function (name) {
            return this[CLASS_MEMBER_PREFIX + name];
        },
        /**
         * Check whether current object has specified event.
         * @method may
         * @param name {String}
         * @returns {Boolean}
         */
        may: function (name) {
            var _member = this.member(name);
            return _member && _member.type == 'event';
        },
        /**
         * Check whether current object has specified property.
         * @method has
         * @param name {String}
         * @returns {Boolean}
         */
        has: function (name) {
            var _member = this.member(name);
            return _member && _member.type == 'property';
        },
        /**
         * Check whether current object has specified method.
         * @method can
         * @param name {String}
         * @returns {Boolean}
         */
        can: function (name) {
            var _member = this.member(name);
            return _member && _member.type == 'method';
        },
        /**
         * Get specified property value.
         * @method get
         * @param name {String}
         * @param [options] {Any}
         * @returns {*}
         */
        get: function (name, options) {
            var _member = this.member(name);
            if(_member && _member.getter){
                return _member.getter.call(this, options);
            }

            return undefined;
        },
        /**
         * Set specified property value.
         * @method set
         * @param name {String}
         * @param value {*}
         * @param [options] {Any}
         */
        set: function (name, value, options) {
            var _member = this.member(name);
            if (_member && _member.setter) {
                _member.setter.call(this, value, options);
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
            var _values = {};
            zn.each(this.constructor.__properties__, function (name) {
                _values[name] = this.get(name, options);
            }, this);

            return _values;
        },
        /**
         * Set a bunch of properties.
         * @method sets
         * @param dict {Object}
         * @param [options] {Any}
         */
        sets: function (values, options) {
            if (values) {
                for (var _name in values) {
                    if (values.hasOwnProperty(_name)) {
                        this.set(_name, values[_name], options);
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
                var _handlers = this.__handlers__;
                var _listeners = _handlers[name] = _handlers[name] || [];

                _listeners[0] = zn.extend({
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
            if (_handler) {
                var _handlers = this.__handlers__;
                var _listeners = _handlers[name] = _handlers[name] || [
                    {
                        owner: null,
                        handler: null,
                        context: null
                    }
                ];

                _listeners.push(zn.extend({
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
            var _listeners = this.__handlers__[name]||[], _listener;
            var _context = options && options.context;
            if (_listeners) {
                if (handler) {
                    for (var i = _listeners.length - 1; i >= 0; i--) {
                        _listener = _listeners[i];
                        if (_listener.handler === handler && (!_context || _listener.context === _context )) {
                            _listeners.splice(i, 1);
                        }
                    }
                }
                else {
                    _listeners.length = 1;
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
            var _listeners = this.__handler__[name], _listener;
            if (_listeners) {
                for (var i = 0, length = _listeners.length; i < length; i++) {
                    _listener = _listeners[i];
                    if (_listener && _listener.handler) {
                        if (false === _listener.handler.call(_listener.context || _listener.owner, _listener.owner, data, options)) {
                            return false;
                        }
                    }
                }
            }
        },
        __is__: function (){

        },
        __clone__: function (){

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
        __sets__: function (values) {
            this.sets(values);
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
            this.__handlers__ = {};
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
            var _superMethod = this.super.caller.__super__;
            if (_superMethod) {
                return _superMethod.apply(this, arguments);
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
                } else {
                    var _mixins = this.constructor.__mixins__;
                    for (var i = 0, _len = _mixins.length; i < _len; i++) {
                        var _mixin = _mixins[i];
                        if (type === _mixin) {
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
    function __Object__() { }

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

    var __classTookit__ = {
        initArgs: function (){
            var _args = arguments,
                _argsLength = _args.length,
                _args0 = _args[0],
                _name, _super, _meta;

            var CLASS_KEYS = {
                'static': false,
                statics: [],
                partial: false,
                abstract: false,
                final: false,
                mixins: [],
                events: [],
                properties: [],
                methods: []
            };

            if (_argsLength === 3) {
                _name = _args0;
                _super = _args[1];
                _meta = _args[2];

                if (!zn.is(_super, 'function')) {
                    throw new Error('Invalid _super class.');
                }

            } else if (_argsLength === 2) {
                if (zn.is(_args0, 'string')) {
                    _name = _args0;
                    _super = null;
                } else if (zn.is(arg0, 'function')) {
                    _name = null;
                    _super = _args0;
                } else {
                    throw new Error('Invalid _super class.');
                }

                _meta = _args[1];

            } else if (_argsLength === 1) {
                _name = null;
                _super = null;
                _meta = _args0;

                if (!zn.is(_meta, 'object')) {
                    throw new Error('The meta argument must be an object.');
                }

            } else {
                throw new Error('Invalid arguments.');
            }

            _meta = zn.extend(_meta || {}, CLASS_KEYS);
            _super = _super || __Object__;

            return { name: _name, super: _super, meta: _meta };
        },
        initMeta: function (_Class, _args){
            var _name = _args.name,
                _super = _args.super,
                _meta = _args.meta,
                _prototype = _Class.prototype;

            zn.extend(_Class, sharedMethods, classMethods, {
                __id__: id++,
                __name__: _name,
                __super__: _super,
                __partial__: _meta.partial,
                __abstract__: _meta.abstract,
                __static__: _meta.static,
                __final__: _meta.final,
                __statics__: zn.extend({}, _super.__statics__, _meta.statics),
                __events__: _super.__events__.slice(0),
                __properties__: _super.__properties__.slice(0),
                __methods__: _super.__methods__.slice(0),
                __mixins__: _super.__mixins__.concat(_meta.mixins),
                __meta__: _meta
            });

            zn.extend(_Class, _Class.__statics__);

            if (_meta.static) {
                zn.each(_meta.events, function (item) {
                    defineEvent(_Class, item, {});
                });

                zn.each(_meta.properties, function (value, key) {
                    defineProperty(_Class, key, zn.is(value, 'object') ? value : { value: value });
                });

                zn.each(_meta.methods, function (value, key) {
                    defineMethod(_Class, key, zn.is(value, 'function') ? { value: value } : value);
                });

                if (_meta.methods.init) {
                    _meta.methods.init.call(_Class);
                }

            } else {
                zn.each(_meta.mixins, function (mixin) {
                    var _mixinPrototype = mixin.prototype;
                    zn.each(mixin.__events__, function (name) {
                        _Class.defineEvent(name, _mixinPrototype.member(name).meta);
                    });

                    zn.each(mixin.__properties__, function (name) {
                        _Class.defineProperty(name, _mixinPrototype.member(name).meta);
                    });

                    zn.each(mixin.__methods__, function (name) {
                        if (!sharedMethods[name] && !instanceMethods[name]) {
                            _Class.defineMethod(name, _mixinPrototype.member(name).meta);
                        }
                    });
                });

                zn.each(_meta.events, function (item) {
                    _Class.defineEvent(item, {});
                });

                zn.each(_meta.properties, function (value, key) {
                    _Class.defineProperty(key, zn.is(value, 'object') ? value : { value: value });
                });

                zn.each(_meta.methods, function (value, key) {
                    _Class.defineMethod(key, zn.is(value, 'function') ? { value: value } : value);
                });
            }

            if (_prototype.__define__) {
                _prototype.__define__.call(_Class);
            }

            if(_name){
                zn.path(GLOBAL, _name, _Class);
            }
            return _Class;
        }
    };

    /**
     * Define a class
     * @method define
     * @param [name] {String}
     * @param [super] {Function}
     * @param meta {Object}
     * @returns {Function}
     */
    function define () {
        var _args = __classTookit__.initArgs.apply(this, arguments);
        var _name = _args.name,
            _super = _args.super,
            _meta = _args.meta;
        var Class, _SuperClass, _prototype;

        if (_super.__static__) {
            throw new Error('Static class cannot be inherited.');
        }

        if (_super.__final__) {
            throw new Error('Final class cannot be inherited.');
        }

        if (_name && _meta.partial) {
            Class = zn.path(GLOBAL, _name);
        }

        if (_meta.static) {
            if (Class) {
                if (!Class.__static__) {
                    throw new Error('Partial class "' + _name + '" must be static.');
                }
            } else {
                Class = function () {
                    throw new Error('Cannot instantiate static class.');
                };
            }

            _prototype = Class.prototype;

        } else {
            if (Class) {
                if (Class.__static__) {
                    throw new Error('Partial class "' + _name + '" must not be static.');
                }

                if (Class.__super__ !== _super && Class.__super__ !== __Object__) {
                    throw new Error('Partial class "' + _name + '" must have consistent super class.');
                }

            } else {
                Class = _meta.abstract ?
                    function () {
                        throw new Error('Cannot instantiate abstract class.');
                    } :
                    function () {
                        console.log(Object.keys(Class));
                        var _mixins = Class.__mixins__;
                        this.__id__ = id++;
                        this.__handlers__ = {};
                        this.__initializing__ = true;

                        for (var i = 0, _len = _mixins.length; i < _len; i++) {
                            var _ctor = _mixins[i].prototype.__ctor__;
                            if (_ctor) {
                                _ctor.call(this);
                            }
                        }

                        if (this.__ctor__) {
                            this.__ctor__.apply(this, arguments);
                        }

                        this.__initializing__ = false;
                    };
            }

            if (Class.__super__ !== _super) {
                _SuperClass = function () { };
                _SuperClass.prototype = _super.prototype;
                _prototype = new _SuperClass();
                _prototype.constructor = Class;
                _prototype.__type__ = _name;

                Class.prototype = _prototype;
            } else {
                _prototype = Class.prototype;
            }

            if (_meta.methods.init) {
                _prototype.__ctor__ = _meta.methods.init;
            }

        };

        __classTookit__.initMeta(Class, _args);

        return Class;
    };

    zn.class = define;


})(zn);