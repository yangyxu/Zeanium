/**
 * Created by yangyxu on 2014/9/16.
 * TList
 */
(function (zn){

    /**
     * TList
     * @class TList
     * @namespace zn.util
     **/

    zn.class('zn.data.TList', {
        statics: {
            getInstance: function (args){
                return new this(args);
            }
        },
        properties: {
            min: 0,
            max: 100,
            T: null,
            TArgs: {}
        },
        methods: {
            init: function (inArgs) {
                this.sets(inArgs);
                this.reset();
            },
            reset: function (){
                this._data = [];
                for(var i= 0; i < (this.min||0); i++){
                    this.push(this.TArgs);
                }
            },
            push: function (tArgs){
                if(this.T){
                    var _t = new this.T(tArgs||this.TArgs);
                    return this._data.push(_t), _t;
                }
            },
            findOneT: function (filter){
                var _one = null,
                    _filter = filter || zn.idle;
                zn.each(this._data, function (one, index){
                    if(_filter(one, index)){
                        _one = one;
                        return -1;
                    }
                });

                return _one;
            },
            findAllT: function (filter){
                var _ones = [],
                    _filter = filter || zn.idle;
                zn.each(this._data, function (one, index){
                    if(_filter(one, index)){
                        _ones.push(one);
                    }
                });

                return _ones;
            }
        }
    });

})(zn);