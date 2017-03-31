/**
 * Created by yangyxu on 8/20/14.
 */
(function (zn){

    var TYPES = ['INFO', 'DEBUG', 'WARN', 'ERROR', 'TRACE', 'ALL'];
    var COLORS_VALUE = ['#100000', '#2125a0', '#a82c2c', '#c045b7', '1cb131', '#100000'];
    var COLORS = [38, 34, 35, 31, 32, 36, 33];
    var LEVELS = {
        INFO: 0,
        DEBUG: 1,
        WARN: 2,
        ERROR: 3,
        TRACE: 4,
        ALL: 6
    };

    /**
     * Logger: Logger
     * @class Logger
     * @namespace zn.util
     **/
    var Logger = zn.Class({
        events: [
            'info',
            'debug',
            'warn',
            'error',
            'trace',
            'all'
        ],
        methods: {
            init: function (){
                this._config = {
                    only: null,
                    levels: ['info', 'debug', 'warn', 'error', 'trace', 'all']
                };
            },
            config: function (value){
                this._config = zn.overwrite(value, this._config);
            },
            info: function () {
                this.__log.call(this, LEVELS.INFO, arguments);
            },
            debug: function () {
                this.__log.call(this, LEVELS.DEBUG, arguments);
            },
            warn: function () {
                this.__log.call(this, LEVELS.WARN, arguments);
            },
            trace: function () {
                this.__log.call(this, LEVELS.TRACE, arguments);
            },
            error: function (obj) {
                this.__log.call(this, LEVELS.ERROR, arguments);
            },
            all: function (obj) {
                this.__log.call(this, LEVELS.ALL, arguments);
            },
            __getDateString: function (date) {
                return zn.date.asString(date||new Date());
            },
            __getPosition: function (){
                try {
                    throw new Error();
                } catch(e) {
                    //console.log(e.stack);
                    var _pos = e.stack.split('\n')[5].replace(/\(/g, '').replace(/\)/g, '').split('/').pop();
                    return _pos;
                }
            },
            __formatLog4Server: function (log, color) {
                var _tag = '', _head = '', _foot = '';
                if (color) {
                    _head = '\x1B[';
                    _foot = '\x1B[0m';
                    _tag = COLORS[5]+'m';
                    color = COLORS[log.type]+'m';
                }

                /*
                return [
                    log.time,
                    ' [',
                    _head,
                    color,
                    TYPES[log.type],
                    _foot,
                    '] '
                ].join('');*/


                return [
                    log.time,
                    ' [',
                    _head,
                    color,
                    TYPES[log.type],
                    _foot,
                    '] [',
                    _head,
                    _tag,
                    log.pos,
                    _foot,
                    '] ',
                    log.message
                ].join('');
            },
            __formatLog4Client: function (log, color) {
                return [
                    '%c'+log.time,
                    ' [',
                    TYPES[log.type],
                    //'] [', //'] [',
                    //log.pos,
                    '] '
                ].join('');
            },
            __log: function (type, argv) {
                var _argv = Array.prototype.slice.call(argv),
                    _data = _argv.slice(0),
                    _type = TYPES[type].toLowerCase(),
                    _time = this.__getDateString(),
                    _pos = this.__getPosition();

                _data.unshift(_pos);
                _data.unshift(_type);
                _data.unshift(_time);
                if (typeof module !== 'undefined' && module.exports){
                    _argv.unshift(this.__formatLog4Server({
                        type: type,
                        time: _time,
                        pos: _pos
                    }, true));
                }else {
                    _argv.unshift(this.__formatLog4Client({
                        type: type,
                        time: _time,
                        pos: _pos
                    }, true));
                    _argv.unshift('color:' + COLORS_VALUE[type]);
                }

                if(this.__isOk(_type)){
                    var _result = this.fire(_type, _data);
                    if(_result !== false){
                        console.log.apply(this, _argv);
                    }
                }
            },
            __isOk: function (type){
                if(this._config.only){
                    if(this._config.only === type){
                        return true;
                    }
                }else {
                    var _include = (this._config.levels.indexOf(type) !== -1 );
                    if(_include){
                        return true;
                    }
                }

                return false;
            }
        }
    });

    zn.logger = new Logger();

    var __console = {
        info: function (){
            zn.logger.info.apply(zn.logger, arguments);
        },
        debug: function (){
            zn.logger.debug.apply(zn.logger, arguments);
        },
        warn: function (){
            zn.logger.warn.apply(zn.logger, arguments);
        },
        trace: function (){
            zn.logger.trace.apply(zn.logger, arguments);
        },
        error: function (){
            zn.logger.error.apply(zn.logger, arguments);
        }
    };

    zn.extend(zn, __console);

})(zn);
