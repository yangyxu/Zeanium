/**
 * Builtin Functions
 */
(function (zn) {

    var __builtin_functions__ = {
        toString: function (target){
            return Object.prototype.toString.call(target);
        },
        fix: function (target, fixs){
            for(var key in fixs){
                if(typeof target[key] !== 'function'){
                    target[key] = fixs[key];
                }
            }

            return this;
        },
        extend: function (target){
            for (var i = 1, length = arguments.length; i < length; i++) {
                var arg = arguments[i];
                for (var key in arg) {
                    if (arg.hasOwnProperty(key)) {
                        target[key] = arg[key];
                    }
                }
            }

            return target;
        },
        overwrite: function (target){
            var _target = target||{};
            for(var i= 1, _len = arguments.length; i<_len; i++){
                var _args = arguments[i];
                for(var key in _args){
                    if(_args.hasOwnProperty(key)){
                        if(_target[key]===undefined){
                            _target[key] = _args[key];
                        }
                    }
                }
            }
            return _target;
        },
        each: function (target, callback, context) {
            if (target && callback) {
                if (target.__class__ && target.__each__) {
                    target.__each__(callback, context);
                }
                else {
                    var length = target.length;
                    if (length >= 0&&Object.prototype.toString.call(target) === '[object Array]') {
                        for (var i = 0; i < length; i++) {
                            callback.call(context, target[i], i);
                        }
                    }
                    else {
                        for (var key in target) {
                            if (target.hasOwnProperty(key)) {
                                callback.call(context, target[key], key);
                            }
                        }
                    }
                }
            }
        },
        clone: function (target) {
            if (target) {
                if (target.__clone__) {
                    return target.__clone__();
                }
                else {
                    if (zn.is(target, 'array')) {
                        return target.slice(0);
                    }
                    else {
                        var result = {};
                        for (var key in target) {
                            if (target.hasOwnProperty(key)) {
                                result[key] = target[key];
                            }
                        }

                        return result;
                    }
                }
            }
            else {
                return target;
            }
        },
        type: function (target) {
            if (target && target.__type__) {
                return target.__type__;
            }
            else {
                return Object.prototype.toString.call(target).slice(8, -1).toLowerCase();
            }
        },
        is: function (target, type) {
            if (target && target.__is__) {
                return target.__is__(type);
            }
            else {
                if (typeof type === 'string') {
                    type = type.toLowerCase();
                    var _targetType = Object.prototype.toString.call(target).slice(8, -1).toLowerCase();
                    switch (type) {
                        case 'plain':
                            return target && target.constructor === Object;
                        default:
                            return _targetType === type;
                    }
                }
                else if (typeof type === 'function') {
                    return target instanceof type;
                }
            }
        },
        may: function (target, name) {
            if (target) {
                if (target.__may__) {
                    return target.__may__(name);
                }
                else {
                    return target.hasOwnProperty('on' + name);
                }
            }
            else {
                return false;
            }
        },
        can: function (target, name) {
            if (target) {
                if (target.__can__) {
                    return target.__can__(name);
                }
                else {
                    return typeof target[name] === 'function';
                }
            }
            else {
                return false;
            }
        },
        has: function (target, name) {
            if (target) {
                if (target.__has__) {
                    return target.__has__(name);
                }
                else {
                    return target.hasOwnProperty(name);
                }
            }
            else {
                return false;
            }
        },
        get: function (target, name) {
            if (target) {
                if (target.__get__) {
                    return target.__get__(name);
                }
                else {
                    return target[name];
                }
            }
        },
        set: function (target, name, value) {
            if (target) {
                if (target.__set__) {
                    target.__set__(name);
                }
                else {
                    target[name] = value;
                }
            }
        },
        gets: function (target) {
            if (target) {
                if (target.__gets__) {
                    return target.__gets__();
                }
                else {
                    var result = {};
                    for (var key in target) {
                        if (target.hasOwnProperty(key)) {
                            result[key] = target[key];
                        }
                    }
                    return result;
                }
            }
        },
        sets: function (target, dict) {
            if (target && dict) {
                if (target.__sets__) {
                    target.__sets__(dict);
                }
                else {
                    for (var key in dict) {
                        if (dict.hasOwnProperty(key)) {
                            target[key] = dict[key];
                        }
                    }
                }
            }
        },
        path: function (target, path, value) {
            var result = target;
            if (path) {
                var tokens = path.split('.'), token,
                    i = 0, length = tokens.length;

                if (arguments.length < 3) {
                    for (; result && i < length; i++) {
                        token = tokens[i];
                        if (result.__get__) {
                            result = result.__get__(token);
                        }
                        else {
                            result = result[token];
                        }
                    }
                }
                else {
                    length -= 1;
                    for (; result && i < length; i++) {
                        token = tokens[i];
                        if (result.__get__) {
                            result = result.__get__(token);
                        }
                        else {
                            result = result[token] = result[token] || {};
                        }
                    }

                    token = tokens[i];
                    if (result) {
                        if (result.__set__) {
                            result.__set__(token, value);
                        }
                        else {
                            result[token] = value;
                        }

                        result = value;
                    }
                }
            }

            return result;
        },
        invoke: function (target, path, args) {
            if (target && path) {
                var index = path.lastIndexOf('.');
                var context, method;

                if (index > 0) {
                    context = zn.path(target, path.substring(0, index));
                    if (context) {
                        method = context[path.substring(index + 1)];
                    }
                }
                else {
                    context = target;
                    method = target[path];
                }

                if (method) {
                    method.apply(context, args);
                }
            }
        }
    };

    __builtin_functions__.extend(zn, __builtin_functions__);

})(zn);