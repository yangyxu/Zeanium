/**
 * Created by yangyxu on 2015/7/28.
 * Observable
 */
(function (zn){

    var Binding = zn.class('zn.data.Binding', zn.data.Observable, {
        properties: {
            direction: {
                value: 'oneway',
                readonly: true
            },
            target: {
                value: null,
                readonly: true
            },
            targetPath: {
                value: '',
                readonly: true
            },
            source: {
                get: function () {
                    return this._ownerBinding ? this._owner : this._source;
                },
                set: function (value) {
                    this._source = value;
                    this._rebind();
                }
            },
            sourcePath: {
                get: function () {
                    return this._sourcePath;
                },
                set: function (value) {
                    this._sourcePath = value;
                    if (!this._ownerBinding) {
                        this._rebind();
                    }
                }
            },
            owner: {
                get: function () {
                    return this._owner;
                }
            },
            converter: {
                value: null
            },
            async: {
                value: false
            }
        },
        methods: {
            init: function (target, targetPath, options) {
                var _options = options || {},
                    _member = target.member(targetPath),
                    _bindingMeta = (_member && _member.meta.binding) || {};

                zn.overwrite(_options, _bindingMeta, {
                    direction: 'oneway',
                    converter: null,
                    sourcePath: ''
                });

                var _direction = this._direction = _options.direction;
                this._converter = _options.converter;
                this._source = _options.source;
                this._sourcePath = _options.sourcePath;
                this._owner = _options.owner;
                this._target = target;
                this._targetPath = targetPath;

                if (this._sourcePath.charAt(0) === '#') {
                    this._sourcePath = this._sourcePath.substring(1);
                    this._ownerBinding = true;
                }

                if (zn.is(this._converter, 'string')) {
                    this._converterPath = this._converter;
                }

                if (_direction === 'twoway' || _direction === 'oneway') {
                    this.__rebind();
                }
                if (_direction === 'twoway' || _direction === 'inverse') {
                    target.watch(targetPath, function (value) {
                        zn.path(this._ownerBinding ? this._owner : this._source, this._sourcePath, value);
                    }, this);
                }
            },
            dispose: function () {
                this._source = null;
                this.__rebind();
            },
            __rebind: function () {
                var _owner = this._owner,
                    _source = this._ownerBinding ? _owner : this._source,
                    _sourcePath = this._sourcePath,
                    _target = this._target,
                    _targetPath = this._targetPath,
                    _converter = this._converterPath;

                var _watcher = this._watcher,
                    _handler, _index, _key, _subPath, _context;

                if (_watcher) {
                    _watcher.source.unwatch(_watcher.path, _watcher.handler);
                    this._watcher = null;
                }

                if (_converter) {
                    _index = _converter.lastIndexOf('.');
                    _key = _converter;
                    _context = _owner;
                    if (_index >= 0) {
                        _subPath = _sourcePath.slice(0, _index);
                        _key = _sourcePath.slice(_index + 1);
                        _context = zn.path(_source, _subPath);
                    }
                    _converter = _context && _context[_key];
                }
                else {
                    _converter = this._converter;
                }

                if (zn.is(_converter, 'function')) {
                    _converter = {
                        context: _context,
                        convert: _converter,
                        convertBack: function (value) {
                            return value;
                        }
                    };
                }

                _handler = _converter ? function (value) {
                    var _value = _converter.convert.call(_converter.context, zn.is(value, 'function') ? value.bind(_owner) : value);
                    _target.set(_targetPath, _value);
                } : function (value) {
                    _target.set(_targetPath, zn.is(value, 'function') ? value.bind(_owner) : value);
                };

                if (zn.can(_source, 'watch')) {
                    _source.watch(_sourcePath, _handler);
                    this._watcher = {
                        source: _source,
                        path: _sourcePath,
                        handler: _handler
                    };
                }

                _handler(zn.path(_source, _sourcePath));
            }
        }
    });


    var Bindable = zn.class('zn.data.Bindable', zn.data.Observable, {
        statics: {
            parseOptions: function (value, owner) {
                var result = null;
                if (typeof value === 'string'
                    && value.charAt(0) === '{'
                    && value.charAt(value.length - 1) === '}') {

                    var expr = value.slice(1, -1);
                    var tokens = expr.split(',');
                    result = {
                        $binding: true,
                        owner: owner,
                        sourcePath: tokens.shift()
                    };

                    line.each(tokens, function (token) {
                        var option = token.split('=');
                        result[option[0]] = option[1];
                    });
                }
                else if (typeof value === 'object' && value.$binding) {
                    result = value;
                }

                return result;
            }
        },
        properties: {
            model: {
                get: function () {
                    return this._model;
                },
                set: function (value) {
                    this._model = value;
                    zn.each(this.__bindings__, function (binding) {
                        binding.set('source', value);
                    });
                }
            }
        },
        methods: {
            init: function () {
                this.__bindings__ = {};
            },
            dispose: function () {
                this.super();
                zn.each(this.__bindings__, function (binding) {
                    binding.dispose();
                });
                this.__bindings__ = null;
            },
            let: function (name, value) {
                var binding = Bindable.parseOptions(value);
                if (binding) {
                    this.setBinding(name, binding);
                }
                else {
                    this.set(name, value);
                }
            },
            getBinding: function (name) {
                return this.__bindings__[name];
            },
            setBinding: function (name, options) {
                this.clearBinding(name);
                var binding = this.__bindings__[name] = new Binding(this, name, options);
                binding.set('source', this.get('model'));
            },
            clearBinding: function (name) {
                var binding = this.__bindings__[name];
                if (binding) {
                    binding.dispose();
                    delete this.__bindings__[name];
                }
            }
        }
    });

})(zn);