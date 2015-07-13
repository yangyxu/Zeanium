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

    var __path = {
        normalizePath: function (path){
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
        },
        formatCurrentPath: function (currPath, parent){
            var _currPath = currPath,
                _parentPath = parent ? (parent.get('path')||''): zn.PATH,
                _slashIndex = _currPath.indexOf(SLASH);
            if (_slashIndex > 0) {
                _currPath = _parentPath ? (_parentPath.substring(0, _parentPath.lastIndexOf(SLASH) + 1) + _currPath) : _currPath;
                _currPath = this.normalizePath(_currPath);
            }
            else if (_slashIndex === 0) {
                _currPath = this.normalizePath(zn.PATH ? (zn.PATH.substring(0, zn.PATH.lastIndexOf(SLASH)) + _currPath) : _currPath);
            }
            else {
                if (_doc) {
                    var _znPath = zn.ZN_JS_PATH;
                    if(!_znPath){
                        var _src = '';
                        if (!_doc.getElementById('zn-js')) {
                            zn.each(_doc.getElementsByTagName('script'), function (node) {
                                if(node.getAttribute){
                                    _src = node.getAttribute('src') || '';
                                    if (_src.slice(-5) === 'zn.js') {
                                        return false;
                                    }
                                }
                            });
                        }

                        if(_src){
                            _znPath = zn.ZN_JS_PATH =_src;
                        }else {
                            throw new Error('zn.js has not been included, please do it first.');
                        }
                    }

                    _slashIndex = _znPath.lastIndexOf(SLASH);
                    _currPath = _znPath.slice(0, _slashIndex >= 0 ? (_slashIndex + 1) : 0) + _currPath; // + '/';
                }
                else {
                    _currPath = './' + _currPath + '/';
                }
            }

            return _currPath;
        }
    };

    var Module = zn.class('zn.Module', {
        events: [
            'pending',
            'loading',
            'waiting',
            'loaded'
        ],
        statics: {
            all: {},
            current: null,
            counter: 0,
            preLoadedPackage: {},
            loadModule: function (path, callback, parent){
                if (path.substring(0, 5) === 'node:') {
                    return callback(require(path.substring(5)));
                }
                var _path = __path.formatCurrentPath(path, parent);
                if(_path.slice(-1) === '/'){
                    _path += 'index.js';
                }
                var _module = Module.all[_path];
                if (_module) {
                    _module.load(callback);
                }
                else {
                    _module = Module.all[_path] = new Module(_path);
                    Module.counter++;
                    if (_doc) {
                        this.__webModule(_path, function (err){
                            Module.counter--;

                            if (err) {
                                throw new Error('Failed to load module:' + path);
                            }
                            else {
                                _module.sets({
                                    parent: parent,
                                    path: _path,
                                    dependencies: Module.current.get('dependencies'),
                                    factory: Module.current.get('factory'),
                                    status: MODULE_STATUS.LOADING
                                });
                                _module.load(callback);
                            }
                        });
                    }
                    else {
                        this.__nodeModule(_path, function (mod){
                            Module.counter--;

                            _module.sets({
                                parent: parent,
                                path: _path,
                                dependencies: Module.current.get('dependencies'),
                                factory: Module.current.get('factory'),
                                status: MODULE_STATUS.LOADING
                            });
                            _module.load(callback);
                        });
                    }
                }
            },
            __nodeModule: function (path, callback){
                var _path = path,
                    _callback = callback || zn.idle;
                _callback(require(_path));
            },
            __webModule: function (path, callback){
                var _head = _doc.head || _doc.getElementsByTagName('head')[0],
                    _script = _doc.createElement('script'),
                    _path = path,
                    _callback = callback || zn.idle;

                var _handler = function (err) {
                    _script.onload = null;
                    _script.onerror = null;
                    _callback(err);
                };

                _path = _path.slice(-1) === '/' ? _path + 'index.js' : _path;
                _path = _path.slice(-3).toLowerCase() === '.js' ? _path : _path + '.js';
                _script.src = _path;
                //_script.async = false;

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
                    };
                }

                _script.onerror = function (e) {
                    _handler(e);
                };

                _head.appendChild(_script);
            }
        },
        properties: {
            parent: null,
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
            exec: function (callback){
                var _argv = process.argv,
                    _currPath = _argv[1];

                this.sets({
                    path: _currPath,
                    status: MODULE_STATUS.LOADING
                });

                return this.load(callback), this;
            },
            __pending: function (callback){
                this._callbacks.push(callback);
            },
            __loading: function (callback){
                var _path = this.get('path'),
                    _deps = this.get('dependencies'),
                    _factory = this.get('factory'),
                    _value = this.get('value');


                this.set('status', MODULE_STATUS.WAITING);
                this._callbacks.push(callback);

                var _depLength = _deps.length;
                if (_depLength === 0) {
                    _value = _factory.call(_value) || _value;
                    this.set('value', _value);
                    this.set('status', MODULE_STATUS.LOADING);

                    zn.each(this._callbacks, function (cb) {
                        cb(_value);
                    });
                }
                else {
                    var _params = [],
                        _self = this;
                    zn.each(_deps, function (_dep, _index){
                        Module.loadModule(_dep, function (_param){
                            _params[_index] = _param;
                            _depLength--;
                            if(_depLength === 0){
                                _value = _factory.apply(_value, _params) || _value;
                                _self.set('value', _value);
                                _self.set('status', MODULE_STATUS.LOADED);

                                zn.each(_self._callbacks, function (cb) {
                                    cb(_value);
                                });
                            }
                        }, _self);

                    });

                }
            },
            __waiting: function (callback){
                var _self = this;
                setTimeout(function () {
                    if (Module.counter === 0) {
                        _self.set('status', MODULE_STATUS.LOADING);
                    }
                    _self.load(callback);
                });
            },
            __loaded: function (callback){
                callback(this.get('value'));
            },
            load: function (callback) {
                var _status = this.get('status'),
                    _callback = callback || zn.idle;

                switch(_status){
                    case MODULE_STATUS.PENDING:
                        this.__pending(_callback);
                        break;
                    case MODULE_STATUS.LOADING:
                        this.__loading(_callback);
                        break;
                    case MODULE_STATUS.WAITING:
                        this.__waiting(_callback);
                        break;
                    case MODULE_STATUS.LOADED:
                        this.__loaded(_callback);
                        break;
                }

                return this;
            }
        }
    });

    /**
     * Define a module
     * @param deps
     * @param callback
     * @returns {object}
     */
    zn.define = function () {
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
                    var _values = {};
                    zn.each(arguments, function (_module) {
                        if (_module._name_) {
                            _values[_module._name_] = _module;
                        }
                        else {
                            zn.extend(_values, _module);
                        }
                    });

                    return _values;
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

        if(_deps && zn.is(_deps, 'string')){
            _deps = [_deps];
        }

        return Module.current = new Module('', _deps, _factory), Module.current;
    };

    var Loader = zn.class('zn.Loader', {
        static: true,
        properties: {
            preLoadPackages: []
        },
        methods: {
            init: function () {
                var _packages = this.preLoadPackages;
                for(var i= 0, _len = _packages.length; i<_len; i++){
                    this.loadPackage(_packages[i]);
                }
            },
            loadPackage: function (_package){
                this.load(_package+'index.js', function (value){
                    zn.extend(Module.preLoadedPackage, value);
                });
            },
            load: function (path, callback, parent) {
                if (zn.is(path, Module)) {
                    path.load(callback);
                }else if (zn.is(path, 'string')) {
                    var _currPath = path;

                    if (_currPath.substring(0, 5) === 'node:') {
                        if (callback) {
                            callback(require(_currPath.substring(5)));
                        }
                        return true;
                    }

                    Module.loadModule(_currPath, callback, parent);
                }
            }
        }
    });

    zn.load = Loader.load;

})(zn);