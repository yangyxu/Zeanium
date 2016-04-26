(function (zn) {

    var Task = zn.Class({
        events: [ 'init', 'start', 'stop', 'cancle', 'goNext', 'goPre' ],
        properties: {
            pre: null,
            next: null,
            delay: null,
            action: null,
            args: [],
            context: this,
            taskList: null,
            status: {
                value: '',
                get: function () { return this._status; }
            }
        },
        methods: {
            init: function (config) {
                this.sets(config);
                this.fire('init', this);
            },
            start: function (){
                if (this._status=='started'){ return; }
                if (this._action){
                    this._action.apply(this._context, this._args);
                    this._status = 'started';
                }else {
                    this.goNext();
                }
                this.fire('start', this);
            },
            stop: function (){
                this._status = 'stoped';
                this.fire('stop', this);
            },
            cancle: function (){
                this._status = 'cancle';
                this.fire('cancle', this);
            },
            goNext: function (){
                if (this._next){
                    this._next.start();
                }
                this.fire('goNext', this);
            },
            goPre: function (){
                if (this._pre){
                    this._pre.start();
                }
                this.fire('goPre', this);
            }
        }
    });

    /**
     * XHR: XmlHttpRequest
     * @class XHR
     * @constructor
     */
    var XHR = zn.Class({
        properties: {
            url: '',
            data: {
                value: '',
                set: function (value){
                    this._data = value;
                },
                get: function (){
                    return zn.is(this._data,'object') ? JSON.stringify(this._data) : this._data;
                }
            },
            method: 'GET',
            asyns: true,
            username: null,
            password: null,
            headers: {
                value: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-type': 'application/json'
                },
                get: function(){
                    return this._headers;
                },
                set: function (value){
                    this._headers = value;
                }
            },
            timeout: 2e4
        },
        events: ['before', 'after', 'success', 'error', 'complete', 'timeout' ],
        methods: {
            init: function (argv){
                this.sets(argv);
                this._isRunning = false;
            },
            __initXMLHttpRequest: function (){
                if (this._XMLHttpRequest){
                    return this._XMLHttpRequest;
                }
                if (!zn.GLOBAL.ActiveXObject){
                    return this._XMLHttpRequest= new XMLHttpRequest();
                }
                var e = "MSXML2.XMLHTTP",
                    t = ["Microsoft.XMLHTTP", e, e + ".3.0", e + ".4.0", e + ".5.0", e + ".6.0"],
                    _len = t.length;
                for (var n = _len - 1; n > -1; n--) {
                    try {
                        return this._XMLHttpRequest = new ActiveXObject(t[n]);
                    } catch (r) {
                        continue;
                    }
                }
            },
            __onComplete: function(data){
                clearTimeout(this._timeoutID);
                this._isRunning = false;
                this.fire('complete', data);
            },
            __initRequestHeader: function (RH, args){
                for(var k in args){
                    RH.setRequestHeader(k, args[k]);
                };
            },
            resetEvents: function(){
                this.off('before');
                this.off('after');
                this.off('success');
                this.off('error');
                this.off('complete');
                this.off('timeout');
            },
            send: function (config){
                if (this._isRunning){
                    return;
                }
                this._isRunning = true;
                this.sets(config);
                var _XHR = this.__initXMLHttpRequest(),
                    _self = this,
                    _defer = ;
                this._timeoutID = setTimeout(function(){
                    if(_self._isRunning){
                        _XHR.abort();
                        _self.fire('timeout', _self);
                        _self.__onComplete('timeout');
                    }
                }, this._timeout);
                if (this.fire('before', this) != false && this.url){
                    var _url = this.url,
                        _data = this.data,
                        _method = this._method.toUpperCase();
                    if(_method !== 'POST'){
                        _url = _url + '?' + _data;
                        _data = null;
                    }
                    _XHR.open(_method, _url, this.asyns);
                    _XHR.onreadystatechange = function (event){
                        var _XHR = event.currentTarget;
                        if (_XHR.readyState == 4) {
                            var e = _XHR.status,
                                t = _XHR.responseText,
                                _ct = _XHR.getResponseHeader('Content-Type');
                            if (e >= 400 && e < 500) {
                                this.fire('error', 'Client Error Code: '+e);
                                return;
                            }
                            if (e >= 500) {
                                this.fire('error', 'Server Error code: '+e);
                                return;
                            }
                            t = (_ct&&_ct.indexOf('application/json')>=0)?JSON.parse(t):t;
                            if (e == 200) {
                                this.fire('success', t);
                            } else {
                                this.fire('error', t);
                            }
                            this.__onComplete(_XHR);
                            return t;
                        }
                    }.bind(this);
                    this.__initRequestHeader(_XHR, this.headers);
                    _XHR.send(_data);
                    if(!this.asyns){
                        this.__onComplete(_XHR);
                    }
                }else {
                    this.__onComplete(_XHR);
                }
            },
            abort: function (){
                if(this._XMLHttpRequest){
                    this._XMLHttpRequest.abort();
                }
            }
        }
    });

    /**
     * XHRPool: XmlHttpRequestPool
     * @class nx.http.XHRPool
     * @constructor
     */
    var XHRPool = zn.Class({
        static: true,
        properties: {
            max: 3,
            count: {
                get: function (){ return this._data.length;  }
            }
        },
        methods: {
            init: function (){
                this._data = [];
            },
            getInstance: function (){
                for(var i= 0, _len = this._data.length; i<_len; i++){
                    if(!this._data[i]._isRunning){
                        return this._data[i].resetEvents(), this._data[i];
                    }
                }
                if(this.count >= this.max){
                    return null;
                } else {
                    return (function(context){
                        var _xhr = new XHR();
                        context._data.push(_xhr);
                        return _xhr;
                    })(this);
                }
            }
        }
    });

    /**
     * HttpClient: HttpClient
     * @class nx.http.HttpClient
     * @namespace nx.task
     */
    var HttpClient = zn.Class({
        properties: {
            timeout: 1000
        },
        methods: {
            init: function(config){
                this.sets(config);
            },
            request: function (value, callback){
                var _xhr = XHRPool.getInstance();
                if (_xhr){
                    zn.each(value, function(v, k){
                        if(typeof v=='function'){
                            _xhr.on(k, v, this);
                        }
                    }, this);
                    callback ? callback(_xhr) : void(0);
                    return _xhr.send(value);
                }else {
                    var _self = this;
                    setTimeout(function (){
                        _self.request(value, callback);
                    }, _self._timeout);
                }
            },
            get: function (value){
                return value.method = 'GET', this.request(value);
            },
            post: function (value){
                return value.method = 'POST', this.request(value);
            },
            put: function (value){
                return value.method = 'PUT', this.request(value);
            },
            delete: function (value){
                return value.method = 'DELETE', this.request(value);
            }
        }
    });

    var _http = new HttpClient();

    zn.extend(zn, {
        $get: _http.get.bind(_http),
        $post: _http.post.bind(_http),
        $put: _http.put.bind(_http),
        $delete: _http.delete.bind(_http)
    });

})(zn);
