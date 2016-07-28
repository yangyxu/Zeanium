/**
 * Created by yangyxu on 8/20/14.
 */
(function (zn){

    var DATE_FORMAT = {
        ISO8601: "yyyy-MM-dd hh:mm:ss.SSS",
        ISO8601_WITH_TZ_OFFSET: "yyyy-MM-ddThh:mm:ssO",
        DATETIME: "dd MM yyyy hh:mm:ss.SSS",
        ABSOLUTETIME: "hh:mm:ss.SSS"
    };

    /**
     * Date: Date
     * @class Date
     * @namespace zn.util
     **/
    var DateUtil = zn.Class('zn.util.DateUtil', {
        static: true,
        properties: {

        },
        methods: {
            init: function (args){

            },
            asString: function (date){
                var format = DATE_FORMAT.ISO8601;
                if (typeof(date) === "string") {
                    format = arguments[0];
                    date = arguments[1];
                }
                var vDay = this.__addZero(date.getDate());
                var vMonth = this.__addZero(date.getMonth()+1);
                var vYearLong = this.__addZero(date.getFullYear());
                var vYearShort = this.__addZero(date.getFullYear().toString().substring(2,4));
                var vYear = (format.indexOf("yyyy") > -1 ? vYearLong : vYearShort);
                var vHour  = this.__addZero(date.getHours());
                var vMinute = this.__addZero(date.getMinutes());
                var vSecond = this.__addZero(date.getSeconds());
                var vMillisecond = this.__padWithZeros(date.getMilliseconds(), 3);
                var vTimeZone = this.__offset(date);
                var formatted = format
                    .replace(/dd/g, vDay)
                    .replace(/MM/g, vMonth)
                    .replace(/y{1,4}/g, vYear)
                    .replace(/hh/g, vHour)
                    .replace(/mm/g, vMinute)
                    .replace(/ss/g, vSecond)
                    .replace(/SSS/g, vMillisecond)
                    .replace(/O/g, vTimeZone);
                return formatted;
            },
            __padWithZeros: function (vNumber, width){
                var numAsString = vNumber + "";
                while (numAsString.length < width) {
                    numAsString = "0" + numAsString;
                }
                return numAsString;
            },
            __addZero: function(vNumber){
                return this.__padWithZeros(vNumber, 2);
            },
            __offset: function (date){
                // Difference to Greenwich time (GMT) in hours
                var os = Math.abs(date.getTimezoneOffset());
                var h = String(Math.floor(os/60));
                var m = String(os%60);
                if (h.length == 1) {
                    h = "0" + h;
                }
                if (m.length == 1) {
                    m = "0" + m;
                }
                return date.getTimezoneOffset() < 0 ? "+"+h+m : "-"+h+m;
            }
        }
    });

    var TYPES = ['INFO', 'DEBUG', 'WARNING', 'ERROR', 'TRACE', '', 'INIT'];
    var COLORS_VALUE = ['#100000', '#2125a0', '#a82c2c', '#c045b7', '1cb131', '', '#100000'];
    var COLORS = [38, 34, 35, 31, 32, 36, 33];
    var LEVELS = {
        INFO: 0,
        DEBUG: 1,
        WARNING: 2,
        ERROR: 3,
        TRACE: 4,
        INIT: 6
    };

    /**
     * Logger: Logger
     * @class Logger
     * @namespace zn.util
     **/
    var Logger = zn.Class({
        static: true,
        properties: {

        },
        methods: {
            init: function (args){

            },
            info: function (obj) {
                this.__log(LEVELS.INFO, obj);
            },
            debug: function (obj) {
                this.__log(LEVELS.DEBUG, obj);
            },
            warn: function (obj) {
                this.__log(LEVELS.WARNING, obj);
            },
            trace: function (obj) {
                this.__log(LEVELS.TRACE, obj);
            },
            error: function (obj) {
                this.__log(LEVELS.ERROR, obj);
            },
            __getDateString: function (date) {
                return DateUtil.asString(date||new Date());
            },
            __getPosition: function (){
                try {
                    throw new Error();
                } catch(e) {
                    //console.log(e.stack);
                    var _pos = e.stack.split('\n')[4].replace(/\(/g, '').replace(/\)/g, '').split('/').pop();
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

                return [
                    log.time,
                    ' [',
                    _head,
                    color,
                    TYPES[log.type],
                    _foot,
                    '] ',
                    log.message
                ].join('');

                /*
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
                */
            },
            __formatLog4Client: function (log, color) {
                return [
                    '%c'+log.time,
                    ' [',
                    TYPES[log.type],
                    //'] [', //'] [',
                    //log.pos,
                    '] ',
                    log.message
                ].join('');
            },
            __log: function (type, message) {
                var _log = {
                    type: type,
                    message: typeof message=='object'?JSON.stringify(message): message,
                    time: this.__getDateString(),
                    pos: this.__getPosition()
                };
                if (!zn.GLOBAL.document){
                    console.log(this.__formatLog4Server(_log, true));
                }else {
                    console.log(this.__formatLog4Client(_log, true), 'color:'+COLORS_VALUE[type]);
                }
            }
        }
    });

    var __console = {
        info: function (){
            Logger.info.apply(Logger, arguments);
        },
        debug: function (){
            Logger.debug.apply(Logger, arguments);
        },
        warn: function (){
            Logger.warn.apply(Logger, arguments);
        },
        trace: function (){
            Logger.trace.apply(Logger, arguments);
        },
        error: function (){
            Logger.error.apply(Logger, arguments);
        },
    };

    zn.extend(zn, __console);

})(zn);
