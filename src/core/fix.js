/**
 * Fix Javascript Object Functions
 */
(function (zn){

    var __fixArray__ = {
        isArray: function (target){
            /*
             * Two solution of fix Array function
             * 1, return Object.prototype.toString.call(target) === '[object Array]';
             * 2, return target&&target.constructor === Array;
             * */
            return Object.prototype.toString.call(target) === '[object Array]';
        }
    };

    var __fixArrayPrototype__ = {
        forEach: function (iterator, context){
            if(!iterator){ return false; }
            for(var i= 0, _len = this.length; i < _len; i++){
                iterator.call(context, this[i], i);
            }

            return this;
        },
        indexOf: function (item){
            for(var i= 0, _len = this.length; i < _len; i++){
                if (this[i] === item){
                    return i;
                }
            }

            return -1;
        },
        lastIndexOf: function (item){
            for(var i= this.length - 1; i >= 0; i--){
                if (this[i] === item){
                    return i;
                }
            }

            return -1;
        }
    };

    var __fixFunction__ = {
        bind: function (context){
            var _self = this;
            return function (){
                return _self.apply(context, Array.prototype.slice.call(arguments));
            };
        }
    };

    var __fixObject__ = {
        keys: function (obj){
            if(obj !== Object(obj)){
                throw new TypeError('Object.keys called on a non-object');
            }
            var _keys = [], _property;
            for (_property in obj){
                if(Object.prototype.hasOwnProperty.call(obj,_property)){
                    _keys.push(_property);
                }
            }

            return _keys;
        },
        create: (function (){
            var _object = function (){}, _self = this;
            return function (obj, properties){
                if (obj === null){
                    throw new Error('Cannot set a null [[Prototype]]');
                }

                if (typeof obj !== 'object'){
                    throw new TypeError('Argument must be an object');
                }

                _self.defineProperties(obj, properties);
                _object.prototype = obj;
                return new _object();
            };
        })(),
        defineProperty: function (obj, propertyName, descriptor){
            if (obj && propertyName && descriptor && descriptor.hasOwnProperty('value')) {
                obj[propertyName] = descriptor.value;
            }

            return obj;
        }
    };

    zn.fix(Array, __fixArray__);
    zn.fix(Array.prototype, __fixArrayPrototype__);
    zn.fix(Function.prototype, __fixFunction__);
    zn.fix(Object, __fixObject__);

    try {
        Object.defineProperty({}, 'zn', {});
    }
    catch (ex) {
        Object.defineProperty = function (obj, propertyName, descriptor) {
            return __fixObject__.defineProperty(obj, propertyName, descriptor);
        };
    }

})(zn);