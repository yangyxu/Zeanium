/**
 * Created by yangyxu on 8/20/14.
 */
(function (zn){

    var __slice = Array.prototype.slice;

    /**
     * String: String
     * @class String
     * @namespace zn.format
     **/
    var StringFormatter = zn.class('zn.format.String', {
        static: true,
        properties: {

        },
        methods: {
            init: function (args){

            },
            formatString: function (){
                var _argv = __slice.call(arguments);

                switch(_argv.length){
                    case 1:
                        return _argv[0];
                    case 2:
                        var _data = {};
                        switch(zn.type(_argv[1])){
                            case 'string':
                                _data[0] = _argv[1];
                                break;
                            case 'array':
                                _data = _argv[1].toJSON();
                                break;
                            case 'object':
                                _data = _argv[1];
                                break;
                        }

                        return this.__formatSql(_argv[0], _data);
                    default:
                        var _sql = _argv.shift();

                        return this.__formatSql(_sql, _argv.toJSON());
                }
            },
            __formatSql: function (sql, data){
                var _reg = null;
                zn.each(data, function (value, index){
                    _reg = new RegExp('\\{'+index+'\\}', 'gi');
                    sql = sql.replace(_reg, value);
                });
                _reg = null;

                return sql;
            }
        }
    });

})(zn);