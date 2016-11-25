(function (zn) {

    var MIME = {
        text: 'text/plain; charset=UTF-8',
        html: 'text/html; charset=UTF-8',
        xml: 'text/xml; charset=UTF-8',
        form: 'application/x-www-form-urlencoded; charset=UTF-8',
        json: 'application/json; charset=UTF-8',
        javascript: 'text/javascript; charset=UTF-8'
    };

    var HttpRequest = zn.Class({
        events: [ 'init' ],
        properties: {
            url: null,
            data: null,
            method: 'POST',
            headers: null,
            onExec: null,
            success: null,
            error: null,
            timeout: null
        },
        methods: {
            init: function (url, data, method, headers) {
                this.sets({
                    url: url,
                    data: data,
                    method: method,
                    headers: headers
                });
                this.fire('init', this);
            },
            exec: function (url, data, method, headers){
                var _url = url || this._url,
                    _data = data || this._data || {},
                    _method = method || this._method,
                    _headers = headers || this._headers || {};

                var _result = this._onExec && this._onExec(this);
                if(_result===false){
                    return false;
                }

                return zn['$' + _method.toLowerCase()]({
                    url: Store.fixURL(_url),
                    data: _data,
                    success: this._success,
                    error: this._error,
                    timeout: this._timeout,
                    headers: _headers
                });
            },
            refresh: function (){
                this.exec();
            },
            copyAndExt: function (data){
                var _data = this._data;
                if(typeof _data === 'object'){
                    _data = JSON.parse(JSON.stringify(_data));
                    for(var key in data){
                        _data[key] = data[key];
                    }
                }else {
                    _data = data;
                }

                return new HttpRequest(this._url, _data, this._method);
            },
            ext: function (){
                var _data = this._data;
                for(var key in data){
                    _data[key] = data[key];
                }

                return this;
            }
        }
    });

    var Fetcher = zn.Class({
        events: [ 'init' ],
        properties: {
            url: null,
            data: null,
            method: 'POST',
            headers: null,
            onExec: null,
            success: null,
            error: null
        },
        methods: {
            init: function (url, data, method, headers) {
                this.sets({
                    url: url,
                    data: data,
                    method: method,
                    headers: headers
                });
                this.fire('init', this);
            },
            exec: function (url, data, method, headers){
                var _self = this,
                    _url = url || this._url,
                    _data = data || this._data || {},
                    _method = method || this._method,
                    _headers = headers || this._headers || {};

                var _result = this._onExec && this._onExec(this);
                if(_result===false){
                    return false;
                }

                switch (_method.toUpperCase()) {
                    case "POST":
                        var _temp = new FormData();
                        for(var key in _data){
                            _temp.append(key, _data[key]);
                        }
                        _data = _temp;
                        _headers = zn.overwrite(_headers, {
                            'Accept': 'multipart/form-data',
                            'Content-Type': 'multipart/form-data; charset=UTF-8'
                        });
                        break;
                    case "GET":

                        break;
                    case "JSON":
                        _data = JSON.stringify(_data);
                        _method = 'POST';
                        _headers = zn.overwrite(_headers, {
                            'Accept': 'multipart/form-data',
                            'Content-Type': 'multipart/form-data; charset=UTF-8'
                        });
                        break;
                }

                return new Promise(function (resolve, reject) {
                    fetch(_url, {
                        method: _method.toUpperCase(),
                        body: _data,
                        headers: _headers
                    })
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (responseData) {
                        if(_self._success){
                            _self._success(responseData);
                        }
                        resolve(responseData);
                    })
                    .catch(function (error) {
                        if(_self._error){
                            _self._error(error);
                        }
                        reject(error);
                    });
                });
            },
            refresh: function (){
                this.exec();
            },
            copyAndExt: function (data){
                var _data = this._data;
                if(typeof _data === 'object'){
                    _data = JSON.parse(JSON.stringify(_data));
                    for(var key in data){
                        _data[key] = data[key];
                    }
                }else {
                    _data = data;
                }

                return new Fetcher(this._url, _data, this._method);
            },
            ext: function (){
                var _data = this._data;
                for(var key in data){
                    _data[key] = data[key];
                }

                return this;
            }
        }
    });


    var DataSource = zn.Class({
        events: [ 'init', 'exec' ],
        properties: {
            data: null,
            argv: {
                set: function (value){
                    this._argv = value;
                },
                get: function (){
                    return this._argv || {};
                }
            }
        },
        methods: {
            init: function (data, argv) {
                this.reset(data, argv);
                this.fire('init', this);
            },
            reset: function (data, argv){
                this.sets({
                    data: data,
                    argv: argv
                });
            },
            refresh: function (){
                this.exec();
            },
            exec: function (){
                var _data = this._data;
            	if(!_data){
                    return;
                }
                var _temp = this._argv.onSubmitBefore && this._argv.onSubmitBefore(_data, this._argv);
                if(_temp===false){
                    return;
                }
                if(_temp!==undefined){
                    _data = _temp;
                }

            	if(_data.__id__){
                    if(!_data._onExec){
                        _data._onExec = this._argv.onExec;
                    }
                    _data._success = function (sender, data){
                        var _temp = (Store._success && Store._success(data));
                        if(_temp!==false){
                            if(this._argv.onSuccess){
                                this._argv.onSuccess(data);
                            }
                        }
            		}.bind(this);
                    _data._error = function (sender, data){
                        var _temp = (Store._error && Store._error(data));
                        if(_temp!==false){
                            if(this._argv.onError){
                                this._argv.onError(data);
                            }
                        }
            		}.bind(this);
            		_data.exec();
            	} else {
                    if((this._argv.onExec && this._argv.onExec(_data))===false){
                        return false;
                    }
                    if(this._argv.onSuccess){
                        this._argv.onSuccess(data);
                    }
            	}
            }
        }
    });

    zn.GLOBAL.Store = zn.Class({
        static: true,
        properties: {
            HOST: 'http://0.0.0.0:8080/'
        },
        methods: {
            requestHandler: function (success, error){
                this._success = success;
                this._error = error;
            },
            request: function (url, data, method, headers){
                return new HttpRequest(url, data, method, headers);
            },
            post: function (url, data, headers){
                return new HttpRequest(url, data, "POST", headers);
            },
            delete: function (url, data, headers){
                return new HttpRequest(url, data, "DELETE", headers);
            },
            put: function (url, data, headers){
                return new HttpRequest(url, data, "PUT", headers);
            },
            get: function (url, data, headers){
                return new HttpRequest(this.formatURL(url, data), data, "GET", headers);
            },
            fetch: function (url, data, method, headers){
                return new Fetcher(url, data, method, headers);
            },
            fetchPost: function (url, data, headers){
                return new Fetcher(url, data, "POST", headers);
            },
            fetchGet: function (url, data, headers){
                return new Fetcher(this.formatURL(url, data), data, "GET", headers);
            },
            setHost: function (value){
                this._HOST = value;
            },
            getHost: function (){
                return this._HOST;
            },
            fixURL: function (url) {
                if(!url){
                    return '';
                }
                if(url && url.indexOf('http://') === -1){
                    url = this._HOST + url;
                }

                return url;
            },
            formatURL: function (url, data){
                for(var key in data){
                    url = url.replace(new RegExp('{' + key + '}', 'gi'), data[key]||'');
                }

                return url;
            },
            dataSource: function (data, argv) {
                return new DataSource(data, argv);
            }
        }
    });

})(zn);
