/**
 * require method
 */
(function (zn){

    var DOT = '.',
        DOUBLE_DOT = '..',
        SLASH = '/',
        MODULE_STATUS = {
            PENDING: 0,
            LOADING: 1,
            WAITING: 2,
            LOADED: 3
        };
    var _doc = zn.GLOBAL.document;

    function formatPath(path) {
        var _paths = path.split(SLASH);
        var _values = [_paths[0]], _path;

        for (var i = 1, _len = _paths.length; i < _len; i++) {
            _path = _paths[i];
            switch(_path){
                case DOT:
                    //ignore
                    break;
                case DOUBLE_DOT:
                    var _last = _values[_values.length - 1];
                    //console.log('last: '+_last);
                    if (_last === DOT || _last === DOUBLE_DOT) {
                        _values.push(DOUBLE_DOT);
                    }
                    else {
                        _values.pop();
                    }
                    break;
                default:
                    _values.push(_path);
                    break;
            }
        }

        return _values.join(SLASH);
    }

    var __module = {
        _arguments: function (){

        },
        _meta: function (){

        }
    };

    var Module = zn.class('zn.Module', {
        statics: {
            all: {},
            current: null,
            counter: 0
        },
        properties: {
            status: MODULE_STATUS.PENDING,
            path: '',
            dependencies: null,
            factory: null,
            value: null
        },
        methods: {
            init: function (path, dependencies, factory) {
                this.sets({
                    path: path,
                    dependencies: dependencies || [],
                    factory: factory,
                    value: {}
                });

                this._callbacks = [];
            },
            load: function (callback) {
                var _status = this.get('status'),
                    _callback = callback || zn.idle,
                    _self = this;

                switch(_status){
                    case MODULE_STATUS.PENDING:
                        this._callbacks.push(_callback);
                        break;
                    case MODULE_STATUS.LOADING:
                        var _path = this.get('path'),
                            _deps = this.get('dependencies'),
                            _factory = this.get('factory'),
                            _value = this.get('value');

                        var _depLength = deps.length,
                            _params = [];

                        this.set('status', MODULE_STATUS.WAITING);
                        this._callbacks.push(_callback);

                        if (_depLength === 0) {
                            _value = factory.call(_value) || _value;
                            this.set('value', _value);
                            this.set('status', MODULE_STATUS.LOADING);

                            zn.each(this._callbacks, function (cb) {
                                cb(_value);
                            });
                        }
                        else {
                            zn.each(_deps, function (dep, index) {
                                zn.load(dep, function (param) {
                                    _params[index] = param;
                                    _depLength--;
                                    if (_depLength === 0) {
                                        _value = factory.apply(_value, _params) || _value;
                                        _self.set('value', _value);
                                        _self.set('status', MODULE_STATUS.LOADED);

                                        zn.each(_self._callbacks, function (cb) {
                                            cb(_value);
                                        });
                                    }
                                }, _self);
                            });
                        }
                        break;
                    case MODULE_STATUS.WAITING:
                        setTimeout(function () {
                            if (Module.counter === 0) {
                                _self.set('status', MODULE_STATUS.LOADING);
                            }
                            _self.load(_callback);
                        });
                        break;
                    case MODULE_STATUS.LOADED:
                        _callback(this.get('value'));
                        break;
                }
            }
        }
    });

    /**
     * Define a module
     * @param deps
     * @param callback
     * @returns {object}
     */
    zn.module = function () {
        var _args = arguments,
            _len = _args.length,
            _arg0 = _args[0],
            _deps = [],
            _factory = null;

        if (_len === 2) {
            _deps = _arg0;
            _factory = _args[1];
        }
        else if (_len === 1) {
            if (zn.is(_arg0, 'function')) {
                _factory = _arg0;
            }
            else if (zn.is(_arg0, 'array')) {
                _deps = _arg0;
                _factory = function () {
                    /*
                     var result = {};
                     line.each(arguments, function (mod) {
                     if (mod.__name__) {
                     result[mod.__name__] = mod;
                     }
                     else {
                     line.extend(result, mod);
                     }
                     });

                     return result;*/
                };
            }
            else {
                _factory = function () {
                    return _arg0;
                };
            }
        }
        else {
            throw new Error('Invalid arguments.');
        }

        if(zn.is(_deps, 'string')){
            _deps = [_deps];
        }

        return Module.current = new Module('', _deps, _factory);
    };


    zn.load = function (path, callback, parent) {
        if (zn.is(path, Module)) {
            path.load(callback);
        }else if (zn.is(path, 'string')) {
            var _currPath = path,
                _currModule,
                _parentPath,
                _slashIndex,
                _src = '';

            if (!zn.PATH) {
                _slashIndex = path.lastIndexOf(SLASH);
                //_currPath = './' + path.substring(_slashIndex + 1);
                //zn.PATH = path.substring(0, _slashIndex + 1);
            }

            _parentPath = parent ? parent.get('path') : zn.PATH;

            if (_currPath.substring(0, 5) === 'node:') {
                if (callback) {
                    callback(require(_currPath.substring(5)));
                }

                return true;
            }

            _slashIndex = _currPath.indexOf(SLASH);

            if (_slashIndex > 0) {
                _currPath = formatPath(_parentPath ? (_parentPath.substring(0, _parentPath.lastIndexOf(SLASH) + 1) + _currPath) : _currPath);
            }
            else if (_slashIndex == 0) {
                _currPath = formatPath(zn.PATH ? (zn.PATH.substring(0, zn.PATH.lastIndexOf(SLASH)) + _currPath) : _currPath);
            }
            else {
                if (_doc) {
                    var _znjs = _doc.getElementById('zn-js');
                    if (!_znjs) {
                        zn.each(_doc.getElementsByTagName('script'), function (node) {
                            if(node.getAttribute){
                                _src = node.getAttribute('src') || '';
                                if (_src.slice(-5) === 'zn.js') {
                                    _znjs = node;
                                }
                            }
                        });
                    }

                    if (_znjs) {
                        _src = _znjs.getAttribute('src');
                        _slashIndex = _src.lastIndexOf(SLASH);
                        _currPath = _src.slice(0, _slashIndex >= 0 ? (_slashIndex + 1) : 0) + _currPath; // + '/';
                    }
                }
                else {
                    _currPath = './' + _currPath + '/';
                }
            }

            _currModule = Module.all[_currPath];

            if (_currModule) {
                _currModule.load(callback);
            }
            else {
                _currModule = Module.all[_currPath] = new Module(_currPath);

                if (_doc) {
                    var _head = _doc.head || _doc.getElementsByTagName('head')[0];
                    var _script = _doc.createElement('script');
                    var _handler = function (err) {
                        _script.onload = null;
                        _script.onerror = null;
                        Module.counter--;

                        if (err) {
                            throw new Error('Failed to load module:' + _currPath);
                        }
                        else {
                            _currModule.sets({
                                path: _currPath,
                                dependencies: Module.current.get('dependencies'),
                                factory: Module.current.get('factory'),
                                status: MODULE_STATUS.LOADED
                            });

                            _currModule.load(callback);
                        }
                    };

                    _src = _currPath.slice(-1) === '/' ? _currPath + 'index.js' : _currPath;
                    _src = _src.slice(-3).toLowerCase() === '.js' ? _src : _src + '.js';

                    console.log(_src);
                    _script.src = _src;
//                  script.async = false;
                    Module.counter++;

                    _head.appendChild(_script);

                    if ('onload' in _script) {
                        _script.onload = function () {
                            _handler(null);
                        };
                    }
                    else {
                        _script.onreadystatechange = function (e) {
                            var _state = _script.readyState;
                            if (_state === 'loaded' || _state === 'complete') {
                                _handler(null);
                            }
                            else {
                                _handler(e);
                            }
                        }
                    }

                    _script.onerror = function (e) {
                        _handler(e);
                    }
                }
                else {
                    require(_currPath);
                    _currModule.sets({
                        path: _currPath,
                        dependencies: Module.current.get('dependencies'),
                        factory: Module.current.get('factory'),
                        status: MODULE_STATUS.LOADED
                    });
                    _currModule.load(callback);
                }
            }
        }
    };




})(zn);