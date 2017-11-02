var __isServer="[object process]"===Object.prototype.toString.call("undefined"!=typeof process?process:0),zn={VERSION:"0.0.1",DEBUG:!0,ZN_PATH:"",PATH:"",GLOBAL:function(){return __isServer?global:window}.call(null),isServer:__isServer,plugin:{}};if(zn.GLOBAL.zn=zn,__isServer)zn.ZN_PATH=__dirname,zn.PATH=process.cwd(),module.exports=zn;else{var _zn_url="";try{__a__=__b__}catch(e){e.fileName?_zn_url=e.fileName:e.sourceURL?_zn_url=e.sourceURL:e.stacktrace?console.log(e.stacktrace):e.stack?(_zn_url=e.stack.split("\n")[1],_zn_url=_zn_url.replace(/\s/g,""),_zn_url=_zn_url.substring(2,_zn_url.length)):console.log(e.toString())}if(!_zn_url)for(var _scripts=document.getElementsByTagName("script"),_src="",_node,i=0,_len=scripts.length;_len>i;i++)if(_node=scripts[i],_node.getAttribute&&(_src=_node.getAttribute("src")||"","zn.js"===_src.slice(-5)||"zn.minx.js"===_src.slice(-10))){_zn_url=_src;break}if(!_zn_url)throw new Error("zn.js has not been included, please do it first.");zn.ZN_PATH=_zn_url.substring(0,_zn_url.lastIndexOf("/")+1)}!function(a){var b=Object.prototype.toString,c={isNull:function(a){return null===a||void 0===a},isNotNull:function(a){return null!==a&&void 0!==a},idle:function(){},idleArray:function(){return[]},idleObject:function(){return{}},format:function(){var a=arguments,b=null,c=null;return a.length<2?a[0]:(b=a[0],b=b.toString?b.toString():b,c=a[1],d.each(c,function(a,c){null!==a&&void 0!==a&&(a=d.is(a,"object")?JSON.stringify(a):a.toString?a.toString():a,b=b.replace(new RegExp("\\{"+c+"\\}","gi"),a))}),b)},uuid:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(a){var b=16*Math.random()|0,c="x"==a?b:3&b|8;return c.toString(16)}).toUpperCase()},serializeJSON:function(a){return Object.keys(a).map(function(b){return encodeURIComponent(b)+"="+encodeURIComponent(a[b])}).join("&")},fix:function(a){for(var b=a||{},c=1,d=arguments.length;d>c;c++){var e=arguments[c];for(var f in e)e.hasOwnProperty(f)&&"function"!=typeof b[f]&&(b[f]=e[f])}return b},extend:function(a){for(var b=a||{},c=1,d=arguments.length;d>c;c++){var e=arguments[c];for(var f in e)e.hasOwnProperty(f)&&(b[f]=e[f])}return b},overwrite:function(a){for(var b=a||{},c=1,d=arguments.length;d>c;c++){var e=arguments[c];for(var f in e)e.hasOwnProperty(f)&&void 0===b[f]&&(b[f]=e[f])}return b},path:function(a,b,c){var d=a||{};if(b){var e,f=b.split("."),g=f.length,h=0;if(arguments.length<3)for(;d&&g>h;h++)e=f[h],d=d.__get__?d.__get__(e):d[e];else{for(g-=1;d&&g>h;h++)e=f[h],d=d.__get__?d.__get__(e):d[e]=d[e]||{};e=f[h],d&&(d.__set__?d.__set__(e,c):d[e]=c,d=c)}}return d},invoke:function(b,c,d){if(b&&c){var e,f,g=c.lastIndexOf(".");g>0?(e=a.path(b,c.substring(0,g)),e&&(f=e[c.substring(g+1)])):(e=b,f=b[c]),f&&f.apply(e,d)}},deepEachObject:function(a,b,c){if(d.is(a,"object")){var e,f=null;for(var g in a)f=a[g],d.is(f,"object")?this.deepEachObject(f,b,c):(e=b&&b.call(c,f,g,a),void 0!==e&&null!==e&&(a[g]=e))}return a},arrayValueToObject:function(a,b,c){if(d.is(a,"array")){for(var e,f=null,g={},h=0,i=a.length;i>h;h++)f=a[h],e=b&&b.call(c,f,h,a),void 0!==e&&null!==e&&(g[f]=e);a=g}return a}},d={toString:function(a){return a&&a.toString?a.toString():b.call(a)},each:function(a,c,d){if(a&&c)if(a.__each__)a.__each__(c,d);else{var e=a.length,f=null;if(e>0&&"[object Array]"===b.call(a)){for(var g=0;e>g;g++)if(f=c.call(d,a[g],g),f===!1)return!1}else for(var h in a)if(a.hasOwnProperty(h)){if(f=c.call(d,a[h],h),f===!1)return!1;if(-1===f)continue}}},clone:function(b){if(b){if(b.__clone__)return b.__clone__();if(a.is(b,"array"))return b.slice(0);var c={};for(var d in b)b.hasOwnProperty(d)&&(c[d]=b[d]);return c}return b},type:function(a){return a&&a.__type__?a.__type__:b.call(a).slice(8,-1).toLowerCase()},is:function(a,b){if(a&&a.__is__)return a.__is__(b);if("string"==typeof b)switch(b.toLowerCase()){case"plain":return a&&a.constructor===Object;default:return this.type(a)===b}else if("function"==typeof b)return a instanceof b},may:function(a,b){return a?a.__may__?a.__may__(b):a.hasOwnProperty("on"+b):!1},can:function(a,b){return a?a.__can__?a.__can__(b):"function"==typeof a[b]:!1},has:function(a,b){return a?a.__has__?a.__has__(b):a.hasOwnProperty(b):!1},get:function(a,b){return a?a.__get__?a.__get__(b):a[b]:void 0},set:function(a,b,c){a&&(a.__set__?a.__set__(b,c):a[b]=c)},gets:function(a){if(a){if(a.__gets__)return a.__gets__();var b={};for(var c in a)a.hasOwnProperty(c)&&(b[c]=a[c]);return b}},sets:function(a,b){if(a&&b)if(a.__sets__)a.__sets__(b);else for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c])}};c.extend(a,c),c.extend(a,d)}(zn),function(a){var b=Array.prototype.slice,c=Object.prototype.hasOwnProperty,d=Object.prototype.toString,e={format:function(){var b=arguments,c=this;return 1==b.length&&"object"==typeof b[0]&&(b=b[0]),a.each(b,function(b,d){null!==b&&void 0!==b&&(b="object"==a.type(b)?JSON.stringify(b):b.toString?b.toString():b,c=c.replace(new RegExp("\\{"+d+"\\}","gi"),b))}),c.toString()},firstUpperCase:function(a){return a.replace(/\b(\w)(\w*)/g,function(a,b,c){return b.toUpperCase()+c})}},f={isArray:function(b){return b&&"[object Array]"===a.toString(b)&&b.constructor===Array}},g={forEach:function(a,b){if(!a)return!1;for(var c=0,d=this.length;d>c;c++)a.call(b,this[c],c);return this},indexOf:function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},lastIndexOf:function(a){for(var b=this.length-1;b>=0;b--)if(this[b]===a)return b;return-1}},h={format:function(a,b){var c="\\d(?=(\\d{"+(b||3)+"})+"+(a>0?"\\.":"$")+")";return this.toFixed(Math.max(0,~~a)).replace(new RegExp(c,"g"),"$&,")},sectionThree:function(){return this.toString().replace(/(\d)(?=(\d{3})+\.)/g,"$1,")},price:function(b){var c=a.extend({unit:1e4,unitText:"\u4e07",prefix:"",decimal:2,sections:3},b);return this/c.unit>1&&this%100==0?(this/c.unit).sectionThree()+c.unitText:this.format(c.decimal,c.sections)}},i={bind:function(a){var c=this;return function(){return c.apply(a,b.call(arguments,1))}}},j={toArray:function(a){return b.call(a)},keys:function(a){if(a!==Object(a))throw new TypeError("Object.keys called on a non-object");var b,d=[];for(b in a)c.call(a,b)&&d.push(b);return d},values:function(a){if(a!==Object(a))throw new TypeError("Object.keys called on a non-object");var b,d=[];for(b in a)c.call(a,b)&&d.push(a[b]);return d},create:function(){var b=function(){};return function(c,d){if(null===c)throw new Error("Cannot set a null [[Prototype]]");if("object"!=typeof c)throw new TypeError("Argument must be an object");return a.each(d,function(a,b){j.defineProperty(c,a,b)}),b.prototype=c,new b}}(),defineProperty:function(a,b,c){return a&&b&&c&&c.hasOwnProperty("value")&&(a[b]=c.value),a}},k=({parse:function(){return""},stringify:function(){var a=d,b=Array.isArray,c={'"':'\\"',"\\":"\\\\","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","	":"\\t"},e=function(a){return c[a]||"\\u"+(a.charCodeAt(0)+65536).toString(16).substr(1)},f=/[\\"\u0000-\u001F\u2028\u2029]/g;return function g(c){if(null==c)return"null";if("number"==typeof c)return isFinite(c)?c.toString():"null";if("boolean"==typeof c)return c.toString();if("object"==typeof c){var d;if("function"==typeof c.toJSON)return g(c.toJSON());if(b(c)){d="[";for(var h=0;h<c.length;h++)d+=(h?", ":"")+g(c[h]);return d+"]"}if("[object Object]"===a.call(c)){d=[];for(var i in c)c.hasOwnProperty(i)&&d.push(g(i)+": "+g(c[i]));return"{"+d.join(", ")+"}"}}return'"'+c.toString().replace(f,e)+'"'}}()},{format:function(a){var b={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds()};/(y+)/.test(a)&&(a=a.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length)));for(var c in b)new RegExp("("+c+")").test(a)&&(a=a.replace(RegExp.$1,1==RegExp.$1.length?b[c]:("00"+b[c]).substr((""+b[c]).length)));return a}});a.fix(Array,f),a.fix(Array.prototype,g),a.fix(Function.prototype,i),a.fix(String.prototype,e),a.fix(Number.prototype,h),a.fix(Date.prototype,k)}(zn),function(a){function b(){}function c(){var c=l._arguments.apply(this,arguments),e=c.name,f=c.super,h=c.meta,i=h.methods.init;h.properties=h.properties||h.props,h.props=null,delete h.props;var j,k,n;if(f._static_)throw new Error("Static class cannot be inherited.");if(f._final_)throw new Error("Final class cannot be inherited.");if(e&&h.partial&&(j=a.path(d,e)),h.static){if(j){if(!j._static_)throw new Error('Partial class "'+e+'" must be static.')}else j=function(){throw new Error("Cannot instantiate static class.")};n=j.prototype}else{if(j){if(j._static_)throw new Error('Partial class "'+e+'" must not be static.');if(j._super_!==f&&j._super_!==b)throw new Error('Partial class "'+e+'" must have consistent super class.')}else j=h.abstract?function(){throw new Error("Cannot instantiate abstract class.")}:function(){var b=j._mixins_||[],c=j._ctors_||[],d=null,e=arguments;this.__id__=g++,this.__handlers__={},this.__initializing__=!0,this.__afters__=[];for(var f=null,h=null,i=0,k=b.length;k>i;i++)f=b[i],f["@init"]?(h=f["@init"].meta,h=a.is(h,"function")?h:h.value,m(f.prototype.__super__,this,e),h&&h.call(this)):m(f.prototype.__super__,this,e);m(this.__super__,this,e);for(var l=0,n=c.length;n>l;l++)d=c[l],d=a.is(d,"function")?d:d.value,d&&d.apply(this,e);for(;this.__afters__.length>0;){var o=this.__afters__.pop();o.handler.apply(o.context,e)}this.__afters__=null,delete this.__afters__,this.__initializing__=!1},j._ctors_=[];j._super_!==f?(k=function(){},k.prototype=f.prototype,n=new k,n.constructor=j,n.__type__=e||"Anonymous",n.__super__=f,j.prototype=n):n=j.prototype,n.class=n.constructor,i&&(j._ctors_.push(i),n.__ctor__||(n.__ctor__=i))}return l._meta(j,c),n.__define__&&n.__define__.call(j),e&&a.path(d,e,j),j}var d=a.GLOBAL,e="@",f=1,g=1,h={fixTargetCtor:function(a){return a instanceof b?a.constructor:a},fixTargetKey:function(a){return e+a},defineEvent:function(a,b,c){var d=h.fixTargetCtor(a),e=h.fixTargetKey(b),f=e in d,g={};return f||(g=Object.defineProperty(a,"on"+b.toLowerCase(),{get:function(){var a=this.__handlers__[b];return a?a[0].handler:null},set:function(a){var c=this.__handlers__,d=c[b]=c[b]||[];d[0]={owner:this,handler:a,context:null}}})),d[e]={name:b,type:"event",meta:c,descriptor:g},f},defineProperty:function(b,c,d){var e,f,g=h.fixTargetCtor(b),i=h.fixTargetKey(c),j=i in g,k={};if("value"in d){var l=d.value,m="_"+c,n=d.get,o=d.set;e=n||function(){return m in this?this[m]:a.is(l,"function")?l.call(this):l},f=d.readonly?function(a,b){return b&&b.force?void(this[m]=a):!1}:o||function(a){this[m]=a}}else e=d.get||function(){return void 0},f=d.set||function(){return!1};return j&&(e.__super__=g[i].getter,f.__super__=g[i].setter),k=Object.defineProperty(b,c,{get:e,set:f,configurable:!0}),g[i]={name:c,type:"property",meta:d,getter:e,setter:f,descriptor:k},j},defineMethod:function(a,b,c){var d=h.fixTargetCtor(a),e=h.fixTargetKey(b),f=e in d;return d[e]={name:b,type:"method",meta:c},b in a&&(c.value||(c.value=function(){}),c.value.__super__=a[b]),a[b]=c.value,f}},i={__handlers__:{},member:function(a,c){var d=h.fixTargetCtor(c||this),e=d[h.fixTargetKey(a)];return e||d===b?e:this.member(a,d._super_)},may:function(a){var b=this.member(a);return b&&"event"==b.type},has:function(a){var b=this.member(a);return b&&"property"==b.type},can:function(a){var b=this.member(a);return b&&"method"==b.type},get:function(a,b){var c=this.member(a);return c&&c.getter?c.getter.call(this,b):void 0},set:function(a,b,c){var d=this.member(a);return d&&d.setter&&d.setter.call(this,b,c),this},gets:function(b){var c={},d=h.fixTargetCtor(this)._properties_;return a.each(d,function(a){c[a]=this.get(a,b)},this),c},sets:function(a,b,c){if(a){var d=null;for(var e in a)a.hasOwnProperty(e)&&(d=a[e],(c&&c(d,e,b))!==!1&&this.set(e,d,b))}return this},each:function(a,b){for(var c=h.fixTargetCtor(this)._properties_,d=0,e=c.length;e>d;d++){var f=c[d],g=a.call(b,f,d,this.member(f),this.get(f));if(g===!1)return!1}return this},__may__:function(a){return this.may(a)},__has__:function(a){return this.has(a)},__can__:function(a){return this.can(a)},__get__:function(a){return this.get(a)},__gets__:function(){return this.gets()},__set__:function(a,b){this.set(a,b)},__sets__:function(a){this.sets(a)},__each__:function(a,b){return this.each(a,b)}},j={toString:function(){return JSON.stringify({ClassName:this._name_||"Anonymous",ClassID:this._id_})},createSelf:function(){return new this.constructor.apply(this,Array.prototype.slice.call(arguments))},getProperties:function(b,c){var d={};if(!this.getMeta||"ZNObject"==this._name_)return d;var e=this._super_,f=this._mixins_;return e&&a.extend(d,e.getProperties(b,c)),f&&f.length&&a.each(f,function(e){a.extend(d,e.getProperties(b,c))}),a.each(this.getMeta("properties"),function(a,e){var f=b&&b.call(c||this,a,e,d);return f===!1||-1===f?f:void(a.hidden||(d[e]=a))},this),d},getProperty:function(a){var b=null;return a&&this.getProperties(function(c,d){return a==d&&(b=field),-1}),b},existProperty:function(a){return!!this.getProperty(a)},getMeta:function(a){return a?this._meta_[a]:this._meta_},setMeta:function(a,b){return a&&b&&(this._meta_[a]=b),this},defineEvent:function(a,b,c){return h.defineEvent(c||this.prototype,a,b)||this._events_.push(a),this},defineProperty:function(a,b,c){return h.defineProperty(c||this.prototype,a,b)||this._properties_.push(a),this},defineMethod:function(a,b,c){return h.defineMethod(c||this.prototype,a,b)||this._methods_.push(a),this}},k={toString:function(){var a={ClassName:this.__name__||"Anonymous",InstanceID:this.__id__,Meta:this.constructor._meta_};return JSON.stringify(a)},toJson:function(){var b={};return a.each(this.constructor.getProperties(),function(a,c){b[c]=this.get(c)},this),b},getProperties:function(){return this.constructor.getProperties.apply(this,arguments)},getPropertie:function(a){return this.constructor.getPropertie(a)},upon:function(b,c,d){if(c){var e=this.__handlers__,f=e[b]=e[b]||[];f[0]=a.extend({owner:this,handler:c},d)}return this},on:function(b,c,d){if(c){var e=this.__handlers__,f=e[b]=e[b]||[{owner:null,handler:null,context:null}];f.push(a.extend({owner:this,handler:c},d))}return this},off:function(a,b,c){var d,e=this.__handlers__[a]||[],f=c&&c.context;if(b)for(var g=e.length-1;g>=0;g--)d=e[g],d.handler!==b||f&&d.context!==f||this.__handlers__[a].splice(g,1);else this.__handlers__[a]=[{owner:null,handler:null,context:null}];return this},offs:function(){var b=Array.prototype.slice.call(arguments);return b.length?a.each(b,function(a){this.__handlers__[a]&&(this.__handlers__[a]=[{owner:null,handler:null,context:null}])}.bind(this)):this.__handlers__={},this},fire:function(a,b,c){var d,e=this.__handlers__[a],f=null;if(e)for(var g=0,h=e.length;h>g;g++)if(d=e[g],d&&d.handler&&(f=c&&"apply"==c.method?d.handler.apply(d.context||d.owner,b):d.handler.call(d.context||d.owner,d.owner,b,c),!1===f))return!1;return this},dispose:function(){return this.__handlers__={},this},destroy:function(){return this.dispose()},"super":function(){var a=this.super.caller.__super__;return a?a.apply(this,arguments):void 0},is:function(b){if("string"==typeof b&&(b=a.path(d,b)),b){if(this instanceof b)return!0;for(var c=this.constructor._mixins_,e=0,f=c.length;f>e;e++){var g=c[e];if(b===g)return!0}}return!1},__is__:function(a){return this.is(a)},__clone__:function(){}};a.extend(b,i,j,{_id_:0,_name_:"ZNObject",_statics_:{},_events_:[],_properties_:[],_methods_:[],_mixins_:[],_meta_:{}}),a.extend(b.prototype,i,k),a.isZNObject=function(a){return a instanceof b};var l={_arguments:function(){var c,d,e,f=arguments,g=f.length,h=f[0],i={"static":!1,statics:[],partial:!1,"abstract":!1,"final":!1,mixins:[],events:[],properties:[],methods:[]};if(3===g){if(c=h,d=f[1],e=f[2],!a.is(d,"function"))throw new Error("Invalid _super class.")}else if(2===g){if(a.is(h,"string"))c=h,d=null;else{if(!a.is(h,"function"))throw new Error("Invalid _super class.");c=null,d=h}e=f[1]}else{if(1!==g)throw new Error("Invalid arguments.");if(c=null,d=null,e=h,!a.is(e,"object"))throw new Error("The meta argument must be an object.")}return c=c||"",e=a.overwrite(e||{},i),d=d||b,{name:c,"super":d,meta:e}},_meta:function(b,c){var d=c.name,e=c.super,g=c.meta;return a.extend(b,i,j,{_id_:f++,_name_:d,_super_:e,_partial_:g.partial,_abstract_:g.abstract,_static_:g.static,_final_:g.final,_statics_:a.extend({},e._statics_,g.statics),_events_:e._events_.slice(0),_properties_:e._properties_.slice(0),_methods_:e._methods_.slice(0),_mixins_:e._mixins_.concat(g.mixins),_meta_:g}),a.extend(b,b._statics_),g.static?(a.each(g.events,function(a){b.defineEvent(a,{},b)}),a.each(g.properties,function(c,d){b.defineProperty(d,a.is(c,"object")?c:{value:c},b)}),a.each(g.methods,function(c,d){b.defineMethod(d,a.is(c,"function")?{value:c}:c,b)}),g.methods.init&&g.methods.init.call(b,b)):(a.each(g.mixins,function(c){var d=c.prototype;a.each(c._events_,function(a){b.defineEvent(a,d.member(a).meta)}),a.each(c._properties_,function(a){b.defineProperty(a,d.member(a).meta)}),a.each(c._methods_,function(a){i[a]||k[a]||b.defineMethod(a,d.member(a).meta)})}),a.each(g.events,function(a){b.defineEvent(a,{})}),a.each(g.properties,function(c,d){b.defineProperty(d,a.is(c,"object")?c:{value:c})}),a.each(g.methods,function(c,d){b.defineMethod(d,a.is(c,"function")?{value:c}:c)})),b}},m=function(c,d,e){if(c&&c!==b){var f=c.member("init"),g=c._mixins_,h=null;return f&&f.meta.after&&d.__afters__.push({context:d,handler:f.meta.after}),g.length&&a.each(g,function(b){b["@init"]&&(h=b["@init"].meta,h=a.is(h,"function")?h:h.value,m(b.prototype.__super__,b.prototype,e),h&&h.call(d))}),f&&f.meta.auto&&f.meta.value.apply(d,e),arguments.callee(c._super_,d)}};a.Class=c}(zn),function(a){var b={lower:[97,123],upper:[65,91]};a.char=a.Class({"static":!0,methods:{lowercase:function(b){return a.is(b,"string")?b.replace(/[A-Z]/g,function(a){return String.fromCharCode(32|a.charCodeAt(0))}):b},uppercase:function(b){return a.is(b,"string")?b.replace(/[a-z]/g,function(a){return String.fromCharCode(-33&a.charCodeAt(0))}):b},toUnicode:function(a){for(var b=[],c=0,d=a.length;d>c;c++)b.push(a.charCodeAt(c));return b},toChar:function(a,b){for(var c=[],d=a;b>d;d++)c.push(String.fromCharCode(d));return c},getLowercaseLetters:function(){var a=b.lower;return this.toChar(a[0],a[1])},getUppercaseLetters:function(){var a=b.upper;return this.toChar(a[0],a[1])},getStringFromChar:function(a,b){for(var c=a||"A",d=b||26,e=[],f=0;d>f;f++)e.push(String.fromCharCode(c.charCodeAt(0)+f));return e.join("")}}})}(zn),function(a){var b={ISO8601:"yyyy-MM-dd hh:mm:ss.SSS",ISO8601_WITH_TZ_OFFSET:"yyyy-MM-ddThh:mm:ssO",DATETIME:"dd MM yyyy hh:mm:ss.SSS",ABSOLUTETIME:"hh:mm:ss.SSS"};a.date=a.Class({"static":!0,methods:{format:function(){},getSecond:function(a){var b=1*a.substring(1,a.length);switch(a.substring(0,1)){case"s":return 1e3*b;case"h":return 60*b*60*1e3;case"d":return 24*b*60*60*1e3}},asString:function(a){var c=b.ISO8601;"string"==typeof a&&(c=arguments[0],a=arguments[1]);var d=this.__addZero(a.getDate()),e=this.__addZero(a.getMonth()+1),f=this.__addZero(a.getFullYear()),g=this.__addZero(a.getFullYear().toString().substring(2,4)),h=c.indexOf("yyyy")>-1?f:g,i=this.__addZero(a.getHours()),j=this.__addZero(a.getMinutes()),k=this.__addZero(a.getSeconds()),l=this.__padWithZeros(a.getMilliseconds(),3),m=this.__offset(a),n=c.replace(/dd/g,d).replace(/MM/g,e).replace(/y{1,4}/g,h).replace(/hh/g,i).replace(/mm/g,j).replace(/ss/g,k).replace(/SSS/g,l).replace(/O/g,m);return n},__padWithZeros:function(a,b){for(var c=a+"";c.length<b;)c="0"+c;return c},__addZero:function(a){return this.__padWithZeros(a,2)},__offset:function(a){var b=Math.abs(a.getTimezoneOffset()),c=String(Math.floor(b/60)),d=String(b%60);return 1==c.length&&(c="0"+c),1==d.length&&(d="0"+d),a.getTimezoneOffset()<0?"+"+c+d:"-"+c+d}}})}(zn),function(a){var b=Array.prototype.slice,c={PENDING:0,CANCLE:1,PAUSE:2,FINISHED:3},d=a.Class({events:["init","finished"],properties:{status:{value:c.PENDING,get:function(){return this._status}}},methods:{init:function(){},doTask:function(a,b){if(a){var c=b||[];c.unshift(this),a.handler.apply(a.context,c)}},done:function(){this._status=c.FINISHED,this._data=b.call(arguments),this.fire("finished",this._data),this.off("finished")}}}),e=a.Class({events:["clear","insert","pause","resume","exception","every","finally"],properties:{count:{get:function(){return this._tasks.length}}},methods:{init:function(a){this._exceptions=[],this._finallys=[],this._everys=[],this._tasks=[],this._taskProcessor=[],this._lastTask=null,this._data=[],this._max=(a||{}).max||1},destroy:function(){this._everys=[],this._tasks=[],this._taskProcessor=[],this.fire("finally",this._data,{method:"apply"}),this.super()},clear:function(){this._tasks=[]},pause:function(a){return this._paused=!0,a>0&&(this._pauseTimer=setTimeout(function(){this.resume()}.bind(this),a)),this.fire("pause"),this},resume:function(){return this._pauseTimer&&clearTimeout(this._pauseTimer),this._paused=!1,this.fire("resume"),this.doTask(),this},exception:function(a,b){return this.on("exception",a,b||this),this},"catch":function(a){return this.fire("exception",a),this},"finally":function(a,b){return this.on("finally",a,b||this),this},every:function(a,b){return this.on("every",a,b||this),this},unshift:function(a,b){return this.insert(a,b,0),this},push:function(a,b){return this.insert(a,b,-1),this},inserts:function(a,b,c){var d=a||[],e=c||0,f=this._tasks[0],g=null,h=null;return d=d.map(function(a){return h={handler:a,context:b||this},g&&(h.previous=g,g.next=h),g=h,h}.bind(this)),f&&(g.next=f,f.previous=g),d.unshift(0),d.unshift(e),this._tasks.splice.apply(this._tasks,d),this},insert:function(a,b,c){var d={handler:a,context:b||this},e=c||-1;switch(e){case-1:this._lastTask&&(d.previous=d,this._lastTask.next=d),this._lastTask=d,this._tasks.push(d);break;case 0:var f=this._tasks[0];f&&(d.next=f,f.previous=d),this._tasks.unshift(d);break;default:this._tasks.splice(e,0,d)}return this.fire("insert",d),this},getTaskProcessor:function(){for(var a=null,b=this._taskProcessor.length,e=0;b>e;e++)if(a=this._taskProcessor[e],a.status==c.FINISHED)return a;if(!a&&this._max>b){var f=new d;return f.queue=this,f.on("finished",this.__onProcessorFinished.bind(this),this),f}},start:function(){return this._data=[],this.doTask()},doTask:function(a){var b=this._tasks.shift();if(b){var c=this.getTaskProcessor();c&&(b.previousResult=a,c.doTask(b,a))}else this.destroy();return this},__onProcessorFinished:function(a,b){this._data.push(b),this.fire("every",b,{method:"apply"}),this.doTask(b)}}});a.queue=function(a){return new e(a)}}(zn),function(a){var b=["INFO","DEBUG","WARN","ERROR","TRACE","ALL"],c=["#100000","#2125a0","#a82c2c","#c045b7","1cb131","#100000"],d=[38,34,35,31,32,36,33],e={INFO:0,DEBUG:1,WARN:2,ERROR:3,TRACE:4,ALL:6},f=a.Class({events:["info","debug","warn","error","trace","all"],methods:{init:function(){this._config={only:null,levels:["info","debug","warn","error","trace","all"]}},config:function(b){this._config=a.overwrite(b,this._config)},info:function(){this.__log.call(this,e.INFO,arguments)},debug:function(){this.__log.call(this,e.DEBUG,arguments)},warn:function(){this.__log.call(this,e.WARN,arguments)},trace:function(){this.__log.call(this,e.TRACE,arguments)},error:function(){this.__log.call(this,e.ERROR,arguments)},all:function(){this.__log.call(this,e.ALL,arguments)},__getDateString:function(b){return a.date.asString(b||new Date)},__getPosition:function(){try{throw new Error}catch(b){return a.DEBUG&&a.CONSOLE_ERROR&&console.log(b.stack),b.stack.split("\n")[5].replace(/\(/g,"").replace(/\)/g,"").split("/").pop()}},__formatLog4Server:function(a,c){var e="",f="",g="";return c&&(f="[",g="[0m",e=d[5]+"m",c=d[a.type]+"m"),[a.time," [",f,c,b[a.type],g,"] [",f,e,a.pos,g,"] ",a.message].join("")},__formatLog4Client:function(a){return["%c"+a.time," [",b[a.type],"] "].join("")},__log:function(d,e){var f=Array.prototype.slice.call(e),g=f.slice(0),h=b[d].toLowerCase(),i=this.__getDateString(),j=this.__getPosition();if(g.unshift(j),g.unshift(h),g.unshift(i),"undefined"!=typeof module&&module.exports?f.unshift(this.__formatLog4Server({type:d,time:i,pos:j},!0)):(f.unshift("color:"+c[d]),f.unshift(this.__formatLog4Client({type:d,time:i,pos:j},!0))),this.__isOk(h)){var k=this.fire(h,g);k!==!1&&a.DEBUG&&console.log.apply(this,f)}},__isOk:function(a){if(this._config.only){if(this._config.only===a)return!0}else{var b=-1!==this._config.levels.indexOf(a);if(b)return!0}return!1}}});a.logger=new f;var g={info:function(){a.logger.info.apply(a.logger,arguments)},debug:function(){a.logger.debug.apply(a.logger,arguments)},warn:function(){a.logger.warn.apply(a.logger,arguments)},trace:function(){a.logger.trace.apply(a.logger,arguments)},error:function(){a.logger.error.apply(a.logger,arguments)}};a.extend(a,g)}(zn),function(a){var b=Array.prototype.slice,c={PENDING:0,FULFILLED:1,REJECTED:2},d=a.Class({events:["complete"],properties:{promise:null},methods:{init:function(a,b){this._promise=new e,a&&this.resolve(a),b&&this.reject(b)},resolve:function(){var d=b.call(arguments);try{var e=this.get("promise"),g=this;if(e.get("readyState")!=c.PENDING)return;e.set("readyState",c.FULFILLED),e.set("data",d),a.each(e.get("resolves"),function(a){a.apply(g,d)})}catch(h){f.catch(h,this)}this.fire("complete",d)},reject:function(){var a=b.call(arguments);try{var d=this.get("promise");if(d.get("readyState")!=c.PENDING)return;d.set("readyState",c.REJECTED),d.set("reason",a);var e=d.get("rejects")[0];e&&e.apply(this,a)}catch(g){f.catch(g,this)}this.fire("complete",a)}}}),e=a.Class({statics:{isPromise:function(a){return null!==a&&void 0!==a&&"function"==typeof a.then},defer:null},properties:{resolves:null,rejects:null,data:null,reason:null,readyState:null},methods:{init:function(){this.set("resolves",[]),this.set("rejects",[]),this.set("exceptions",[]),this.set("readyState",c.PENDING)},then:function(a,f){function g(){var c=b.call(arguments),d=a?a.apply(this,c):c;return e.isPromise(d)?d.then(function(){h.resolve.apply(h,b.call(arguments))}):h.resolve.apply(h,d),d}var h=new d;if(this.get("readyState")===c.PENDING)this.get("resolves").push(g),this.get("rejects").push(f?f:function(){h.reject.apply(h,b.call(arguments))});else if(this.get("readyState")===c.FULFILLED){var i=this;setTimeout(function(){g.apply(i,i.get("data"))})}return h.promise},"catch":function(a){return f.exception(a)},"finally":function(a){return f.finally(a)},otherwise:function(a){return this.then(void 0,a)}}}),f=a.async=a.Class({"static":!0,methods:{init:function(){this._exceptions=[],this._finallys=[],this._count=0,this._currIndex=0,this._dataArray=[]},exception:function(a){return this._exceptions.push(a),this},"catch":function(b,c){return a.each(this._exceptions,function(a){a.call(c,b)}),this},"finally":function(a){return this._finallys.push(a),this},defer:function(b,c){var e=this,f=new d(b,c);return f.on("complete",function(b,c){e._currIndex++,e._dataArray.push(c),e._currIndex==e._count&&(a.each(e._finallys,function(b){try{b(e._dataArray)}catch(c){a.error(c.message)}}),e._finallys=[])}),e._count++,f},all:function(b){var c=f.defer(),d=0,e=[];return a.each(b,function(a){a.then(function(a){e.push(a),d++,d>=b.length&&c.resolve(e)})}),c.promise},any:function(b){var c=f.defer();return a.each(b,function(a){a.then(function(a){c.resolve(a)})}),c.promise}}})}(zn),function(){zn.querystring=zn.Class({"static":!0,properties:{config:{get:function(){}}},methods:{init:function(){this._config={separator:"&",equal:"=",minIndex:0,maxIndex:1e3}},config:function(a){return this.overwrite(this._config,a),this},parse:function(a,b){if("object"==typeof a)return a;var c=zn.extend({},this._config,b),d={},e=c.equal,f=a.split(c.separator),g=f.length;c.maxIndex>0&&g>c.maxIndex&&(g=c.maxIndex);for(var h=c.minIndex;g>h;h++){var i=f[h].replace(/\+/g,"%20"),j=i.indexOf(e),k=null,l=null;j>=0?(k=i.substr(0,j),l=i.substr(j+1)):(k=i,l=""),k=decodeURIComponent(k),l=decodeURIComponent(l),d.hasOwnProperty(k)?zn.is(d[k],"array")?d[k].push(l):d[k]=[d[k],l]:d[k]=l}return d},stringify:function(a,b){if("string"==typeof a)return a;var c=zn.extend({},this._config,b),d=[],e=c.equal,f={};if(f=zn.isZNObject(a)?a.gets():a,!zn.is(f,"object"))throw new Error("Agrument Error.");for(var g in a){var h=a[g],i=encodeURIComponent(this.__stringifyValue(g));h=encodeURIComponent(this.__stringifyValue(h)),d.push(i+e+h)}return d.join(c.separator)},__stringifyValue:function(a){switch(zn.type(a)){case"string":return a;case"boolean":return a?"true":"false";case"object":case"array":return JSON.stringify(a);case"number":return isFinite(a)?a:"0";default:return""}}}})}(zn),function(a){a.data=a.Class({"static":!0,methods:{arrayToTree:function(b,c){var d={},e={},f=[],g=null,h=null,i=a.extend({id:"id",pid:"pid"},c),j=i.id,k=i.pid;for(h in b)g=b[h],d[g[k]]||(d[g[k]]=[]),d[g[k]].push(g),e[g[j]]=g;for(h in b)d[b[h][j]]&&(b[h].children=d[b[h][j]]);for(var l in d)if(!e[l]){f=d[l];break}return f}}})}(zn),function(a){var b=(a.Class({events:["init","start","stop","cancle","goNext","goPre"],properties:{pre:null,next:null,delay:null,action:null,args:[],context:this,taskList:null,status:{value:"",get:function(){return this._status}}},methods:{init:function(a){this.sets(a),this.fire("init",this)},start:function(){"started"!=this._status&&(this._action?(this._action.apply(this._context,this._args),this._status="started"):this.goNext(),this.fire("start",this))},stop:function(){this._status="stoped",this.fire("stop",this)},cancle:function(){this._status="cancle",this.fire("cancle",this)},goNext:function(){this._next&&this._next.start(),this.fire("goNext",this)},goPre:function(){this._pre&&this._pre.start(),this.fire("goPre",this)}}}),a.Class({properties:{url:"",data:{set:function(a){this._data=a},get:function(){return a.is(this._data,"object")?JSON.stringify(this._data):this._data}},method:"GET",asyns:!0,username:null,password:null,withCredentials:!1,headers:{get:function(){return a.overwrite({"X-Requested-With":"XMLHttpRequest","Content-type":"application/json"},this._headers)},set:function(a){this._headers=a}},timeout:{get:function(){return this._timeout||2e4},set:function(a){this._timeout=a}}},events:["before","after","success","error","complete","timeout"],methods:{init:function(a){this.sets(a),this._isRunning=!1},__initXMLHttpRequest:function(){if(this._XMLHttpRequest)return this._XMLHttpRequest;if(!window.ActiveXObject)return this._XMLHttpRequest=new XMLHttpRequest,this._XMLHttpRequest;for(var a="MSXML2.XMLHTTP",b=["Microsoft.XMLHTTP",a,a+".3.0",a+".4.0",a+".5.0",a+".6.0"],c=b.length-1;c>-1;c--)try{return this._XMLHttpRequest=new ActiveXObject(b[c]),this._XMLHttpRequest}catch(d){continue}},__onComplete:function(a,b){clearTimeout(this._timeoutID),a.abort(),this._isRunning=!1,this.fire("complete",a,b),this.fire("after",a,b),this.offs()},__initRequestHeader:function(a,b){for(var c in b)a.setRequestHeader(c,b[c])},resetEvents:function(){this.offs()},send:function(b){if(this._isRunning)return!1;this.sets(b);var c=this.__initXMLHttpRequest(),d=this,e=a.async.defer();if(this._isRunning=!0,this.timeout&&(this._timeoutID=setTimeout(function(){d._isRunning&&(d.fire("timeout",d),d.__onComplete(c,"timeout"))},this.timeout)),this.fire("before",this)===!1||!this.url)return this.__onComplete(c),e.promise;var f=this.url,g=this.data,h=this._method.toUpperCase();return"GET"===h&&(g&&(f=f+"?"+a.querystring.stringify(g)),g=null),this.get("withCredentials")&&(c.withCredentials=!0),c.open(h,f,this.asyns),c.onreadystatechange=function(a){var b=a.currentTarget;if(4==b.readyState){var c=b.status,d=b.responseText,f=b.getResponseHeader("Content-Type");if(c>=200&&300>c){try{d=f&&f.indexOf("application/json")>=0?JSON.parse(d):d}catch(g){d=d}this.fire("success",d),e.resolve(d,b)}else this.fire("error",b),e.reject(b,d);return this.__onComplete(b,d),d}}.bind(this),this.__initRequestHeader(c,this.headers),c.send(g),this.asyns||this.__onComplete(c),e.promise},abort:function(){this._XMLHttpRequest&&this._XMLHttpRequest.abort()}}})),c=a.Class({"static":!0,properties:{max:3,count:{get:function(){return this._data.length
}}},methods:{init:function(){this._data=[]},getInstance:function(){for(var a=0,c=this._data.length;c>a;a++)if(!this._data[a]._isRunning)return this._data[a].resetEvents(),this._data[a];return function(a){var c=new b;return a._data.push(c),c}(this)}}});a.http=a.Class({"static":!0,methods:{init:function(){this._config={host:window.location.origin,port:null}},setHost:function(b,c){return a.extend(this._config,{host:b,port:c})},getURL:function(){return this._config.port?this._config.host.split(":")[0]+this._config.port:this._config.host},fixURL:function(a){return a?(!a||-1!=a.indexOf("http://")&&-1!=a.indexOf("https://")||(a=this.getURL()+a),a):""},request:function(b,d,e){var f=c.getInstance();return b.url&&(b.url=this.fixURL(b.url)),e&&(b.method=e),a.each(b,function(a,b){"function"==typeof a&&f.on(b,a,this)},this),d&&d(f),f.send(b)},fixArguments:function(){var a=Array.prototype.slice.call(arguments),b={};return b=1==a.length&&"object"==typeof a[0]?a[0]:{url:a[0],data:a[1],headers:a[2]}},get:function(){return this.request(this.fixArguments.apply(this,arguments),null,"GET")},post:function(){return this.request(this.fixArguments.apply(this,arguments),null,"POST")},put:function(){return this.request(this.fixArguments.apply(this,arguments),null,"PUT")},"delete":function(){return this.request(this.fixArguments.apply(this,arguments),null,"DELETE")}}})}(zn),function(a){var b=a.Class({events:["init","validate","before","success","error","complete","after"],properties:{url:null,data:null,method:"POST",headers:null},methods:{init:function(a,b,c,d){this.sets({url:a,data:b,method:c,headers:d}),this.fire("init",this.gets())},validateArgv:function(a,b,c,d){var e=a||this._url||"",f=b||this._data||{},g=c||this._method||"POST",h=d||this._headers||{},i={url:e,data:f,method:g,headers:h};return i},exec:function(b,c,d,e){var f=this.validateArgv(b,c,d,e),g=a.store.fire("before",f);return g===!1?!1:(g=this.fire("before",f),g===!1?!1:f)},__onComplete:function(b){var c=a.store.fire("after",b);return c===!1?!1:(c=this.fire("complete",b),c===!1?!1:void 0)},__onSuccess:function(b,c){var d=a.store.fire("success",b,c);return d===!1?!1:(d=this.fire("success",b,c),d===!1?!1:void 0)},__onError:function(b){var c=a.store.fire("success",b);return c===!1?!1:(c=this.fire("success",b),c===!1?!1:void 0)},refresh:function(a,b,c,d){return this.exec(a,b,c,d)},clone:function(b){var c=this._data;return c="object"==typeof c?a.extend(JSON.parse(JSON.stringify(c)),b):b,new this.constructor(this._url,c,this._method,this._headers)},extend:function(b){return this._data=a.extend(this._data,b),this},overwrite:function(b){return this._data=a.overwrite(this._data,b),this}}}),c=a.Class(b,{methods:{init:function(a,b,c,d){this.sets({url:a,data:b,method:c,headers:d}),this.fire("init",this.gets())},exec:function(b,c,d,e){var f=this.validateArgv(b,c,d,e),g=a.store.fire("before",f);return g===!1?!1:(g=this.fire("before",f),g===!1?!1:f===!1?!1:a.http[f.method.toLowerCase()]({url:f.url,data:f.data,headers:f.headers,success:function(a,b,c){this.__onSuccess(b,c)}.bind(this),error:function(a,b){this.__onError(b)}.bind(this),complete:function(a,b){this.__onComplete(b)}.bind(this)}))}}}),d=a.Class(b,{methods:{init:function(a,b,c,d){this.sets({url:a,data:b,method:c,headers:d}),this.fire("init",this.gets())},exec:function(b,c,d,e){var f=this.validateArgv(b,c,d,e),g=a.store.fire("before",f);if(g===!1)return!1;if(g=this.fire("before",f),g===!1)return!1;if(f===!1)return!1;var h=f.url,i=f.method,j=f.data,k=f.headers,l=this,m={method:i.toUpperCase()};switch(i.toUpperCase()){case"POST":var n=new FormData;for(var o in j)n.append(o,j[o]);m.body=n,m.headers=a.overwrite(k,{Accept:"multipart/form-data","Content-Type":"multipart/form-data; charset=UTF-8"});break;case"GET":var p=[];a.each(j,function(a,b){p.push(b+"="+a)}),h+="?"+p.join("&");break;case"JSON":m.body=JSON.stringify(j),m.method="POST",m.headers=a.overwrite(k,{Accept:"multipart/form-data","Content-Type":"multipart/form-data; charset=UTF-8"})}return new Promise(function(b,c){fetch(a.http.fixURL(h),m).then(function(a){return a.json()}).then(function(a){l.__onSuccess(a),l.__onComplete(a),b(a)}).catch(function(a){l.__onError(a),l.__onComplete(a),c(a)})})}}}),e=a.Class({events:["init","before","after"],properties:{data:null,argv:{set:function(a){this._argv=a},get:function(){return this._argv||{}}}},methods:{init:function(a,b){this.reset(a,b),this.fire("init",this)},reset:function(a,b){return a&&(this._data=a),b&&(this._argv=b),this._argv&&this._argv.autoLoad&&this.exec(),this},refresh:function(){return this.exec(),this},exec:function(){var b=this._data,c=this;if(!b)return!1;if((this._argv.onExec&&this._argv.onExec(b))===!1)return!1;var d=this.fire("before",b);return d===!1?!1:b.__id__?void b.on("success",function(a,b){b=c._argv.dataHandler&&c._argv.dataHandler(b)||b,c._argv.onSuccess&&c._argv.onSuccess(b)}).on("error",function(a,b){c._argv.onError&&c._argv.onError(b)}).on("complete",function(a,b){c._argv.onComplete&&c._argv.onComplete(b)}).exec():new Promise(function(d,e){if(b){if(b=c._argv.dataHandler&&c._argv.dataHandler(b)||b,a.store.fire("success",b)===!1)return!1;c._argv.onSuccess&&c._argv.onSuccess(b),c._argv.onComplete&&c._argv.onComplete(b),d(b)}else{if(b="this._data is undefined.",a.store.fire("error",b)===!1)return!1;c._argv.onError&&c._argv.onError(b),c._argv.onComplete&&c._argv.onComplete(b),e(b)}})}}}),f=a.Class({events:["before","success","error","complete","after"],properties:{engine:{set:function(a){this._engine=a},get:function(){return"Fetcher"==this._engine?d:c}}},methods:{fixURL:function(b){return a.http.fixURL(b)},dataSource:function(a,b){return new e(a,b)},request:function(a,b,c,d){var e=this.engine;return new e(a,b,c,d)},post:function(a,b,c){return this.request(a,b,"POST",c)},"delete":function(a,b,c){return this.request(a,b,"DELETE",c)},put:function(a,b,c){return this.request(a,b,"PUT",c)},get:function(a,b,c){return this.request(a,b,"GET",c)}}});a.store=a.GLOBAL.Store=new f}(zn),function(a){a.cookie=a.Class({"static":!0,methods:{setItem:function(a,b,c){var d=a+"="+encodeURIComponent(b);c&&(d+="; expires="+new Date(+new Date+36e5*c).toGMTString()),document.cookie=d},getItem:function(a){var b=new RegExp("(?:; )?"+a+"=([^;]*);?");return b.test(document.cookie)?decodeURIComponent(RegExp.$1):null},removeItem:function(a){this.setItem(a,null,-9999)},clear:function(){document.cookie=null}}})}(zn);