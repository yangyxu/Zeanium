var zn={VERSION:"0.0.1",DEBUG:!1,ZN_PATH:"",PATH:"",GLOBAL:function(){return this}.call(null)};if(zn.GLOBAL&&(zn.GLOBAL.zn=zn),"undefined"!=typeof module&&module.exports)module.exports=zn,zn.ZN_PATH=__dirname,zn.PATH=process.cwd();else{window&&(window.zn=zn);var _zn_url="";try{__a__=__b__}catch(e){e.fileName?_zn_url=e.fileName:e.sourceURL?_zn_url=e.sourceURL:e.stacktrace?console.log(e.stacktrace):e.stack?(_zn_url=e.stack.split("\n")[1],_zn_url=_zn_url.replace(/\s/g,""),_zn_url=_zn_url.substring(2,_zn_url.length)):console.log(e.toString())}if(!_zn_url)for(var _scripts=document.getElementsByTagName("script"),_src="",_node,i=0,_len=scripts.length;_len>i;i++)if(_node=scripts[i],_node.getAttribute&&(_src=_node.getAttribute("src")||"","zn.js"===_src.slice(-5)||"zn.minx.js"===_src.slice(-10))){_zn_url=_src;break}if(!_zn_url)throw new Error("zn.js has not been included, please do it first.");zn.ZN_PATH=_zn_url.substring(0,_zn_url.lastIndexOf("/")+1)}!function(a){var b=Object.prototype.toString,c={idle:function(){},idleArray:function(){return[]},idleObject:function(){return{}},format:function(){var a=arguments,b=null,c=null;return a.length<2?a[0]:(b=a[0].toString(),c=a[1],d.each(c,function(a,c){a=d.is(a,"object")?JSON.stringify(a):a.toString(),b=b.replace(new RegExp("\\{"+c+"\\}","gi"),a)}),b)},uuid:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(a){var b=16*Math.random()|0,c="x"==a?b:3&b|8;return c.toString(16)}).toUpperCase()},fix:function(a){for(var b=a||{},c=1,d=arguments.length;d>c;c++){var e=arguments[c];for(var f in e)e.hasOwnProperty(f)&&"function"!=typeof b[f]&&(b[f]=e[f])}return b},extend:function(a){for(var b=a||{},c=1,d=arguments.length;d>c;c++){var e=arguments[c];for(var f in e)e.hasOwnProperty(f)&&(b[f]=e[f])}return b},overwrite:function(a){for(var b=a||{},c=1,d=arguments.length;d>c;c++){var e=arguments[c];for(var f in e)e.hasOwnProperty(f)&&void 0===b[f]&&(b[f]=e[f])}return b},path:function(a,b,c){var d=a||{};if(b){var e,f=b.split("."),g=f.length,h=0;if(arguments.length<3)for(;d&&g>h;h++)e=f[h],d=d.__get__?d.__get__(e):d[e];else{for(g-=1;d&&g>h;h++)e=f[h],d=d.__get__?d.__get__(e):d[e]=d[e]||{};e=f[h],d&&(d.__set__?d.__set__(e,c):d[e]=c,d=c)}}return d},invoke:function(b,c,d){if(b&&c){var e,f,g=c.lastIndexOf(".");g>0?(e=a.path(b,c.substring(0,g)),e&&(f=e[c.substring(g+1)])):(e=b,f=b[c]),f&&f.apply(e,d)}},deepEachObject:function(a,b,c){if(d.is(a,"object")){var e,f=null;for(var g in a)f=a[g],d.is(f,"object")?this.deepEachObject(f,b,c):(e=b&&b.call(c,f,g,a),void 0!==e&&null!==e&&(a[g]=e))}return a},arrayValueToObject:function(a,b,c){if(d.is(a,"array")){for(var e,f=null,g={},h=0,i=a.length;i>h;h++)f=a[h],e=b&&b.call(c,f,h,a),void 0!==e&&null!==e&&(g[f]=e);a=g}return a}},d={toString:function(a){return a&&a.toString?a.toString():b.call(a)},each:function(a,c,d){if(a&&c)if(a.__each__)a.__each__(c,d);else{var e=a.length,f=null;if(e>0&&"[object Array]"===b.call(a)){for(var g=0;e>g;g++)if(f=c.call(d,a[g],g),f===!1)return!1}else for(var h in a)if(a.hasOwnProperty(h)){if(f=c.call(d,a[h],h),f===!1)return!1;if(-1===f)continue}}},clone:function(b){if(b){if(b.__clone__)return b.__clone__();if(a.is(b,"array"))return b.slice(0);var c={};for(var d in b)b.hasOwnProperty(d)&&(c[d]=b[d]);return c}return b},type:function(a){return a&&a.__type__?a.__type__:b.call(a).slice(8,-1).toLowerCase()},is:function(a,b){if(a&&a.__is__)return a.__is__(b);if("string"==typeof b)switch(b.toLowerCase()){case"plain":return a&&a.constructor===Object;default:return this.type(a)===b}else if("function"==typeof b)return a instanceof b},may:function(a,b){return a?a.__may__?a.__may__(b):a.hasOwnProperty("on"+b):!1},can:function(a,b){return a?a.__can__?a.__can__(b):"function"==typeof a[b]:!1},has:function(a,b){return a?a.__has__?a.__has__(b):a.hasOwnProperty(b):!1},get:function(a,b){return a?a.__get__?a.__get__(b):a[b]:void 0},set:function(a,b,c){a&&(a.__set__?a.__set__(b,c):a[b]=c)},gets:function(a){if(a){if(a.__gets__)return a.__gets__();var b={};for(var c in a)a.hasOwnProperty(c)&&(b[c]=a[c]);return b}},sets:function(a,b){if(a&&b)if(a.__sets__)a.__sets__(b);else for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c])}};c.extend(a,c),c.extend(a,d)}(zn),function(a){{var b=Array.prototype.slice,c=Object.prototype.hasOwnProperty,d=Object.prototype.toString,e={format:function(){var b=arguments,c=this;return 1==b.length&&"object"==typeof b[0]&&(b=b[0]),a.each(b,function(b,d){b="object"==a.type(b)?JSON.stringify(b):b.toString(),c=c.replace(new RegExp("\\{"+d+"\\}","gi"),b)}),c.toString()}},f={isArray:function(b){return b&&"[object Array]"===a.toString(b)&&b.constructor===Array}},g={forEach:function(a,b){if(!a)return!1;for(var c=0,d=this.length;d>c;c++)a.call(b,this[c],c);return this},indexOf:function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},lastIndexOf:function(a){for(var b=this.length-1;b>=0;b--)if(this[b]===a)return b;return-1}},h={bind:function(a){var c=this;return function(){return c.apply(a,b.call(arguments,1))}}},i={toArray:function(a){return b.call(a)},keys:function(a){if(a!==Object(a))throw new TypeError("Object.keys called on a non-object");var b,d=[];for(b in a)c.call(a,b)&&d.push(b);return d},values:function(a){if(a!==Object(a))throw new TypeError("Object.keys called on a non-object");var b,d=[];for(b in a)c.call(a,b)&&d.push(a[b]);return d},create:function(){var b=function(){};return function(c,d){if(null===c)throw new Error("Cannot set a null [[Prototype]]");if("object"!=typeof c)throw new TypeError("Argument must be an object");return a.each(d,function(a,b){i.defineProperty(c,a,b)}),b.prototype=c,new b}}(),defineProperty:function(a,b,c){return a&&b&&c&&c.hasOwnProperty("value")&&(a[b]=c.value),a}};({parse:function(){return""},stringify:function(){var a=d,b=Array.isArray,c={'"':'\\"',"\\":"\\\\","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","	":"\\t"},e=function(a){return c[a]||"\\u"+(a.charCodeAt(0)+65536).toString(16).substr(1)},f=/[\\"\u0000-\u001F\u2028\u2029]/g;return function g(c){if(null==c)return"null";if("number"==typeof c)return isFinite(c)?c.toString():"null";if("boolean"==typeof c)return c.toString();if("object"==typeof c){var d;if("function"==typeof c.toJSON)return g(c.toJSON());if(b(c)){d="[";for(var h=0;h<c.length;h++)d+=(h?", ":"")+g(c[h]);return d+"]"}if("[object Object]"===a.call(c)){d=[];for(var i in c)c.hasOwnProperty(i)&&d.push(g(i)+": "+g(c[i]));return"{"+d.join(", ")+"}"}}return'"'+c.toString().replace(f,e)+'"'}}()})}a.fix(Array,f),a.fix(Array.prototype,g),a.fix(Function.prototype,h),a.fix(String.prototype,e)}(zn),function(a){function b(){}function c(){var c,e,f,h=l._arguments.apply(this,arguments),i=h.name,j=h.super,k=h.meta,n=k.methods.init;if(j._static_)throw new Error("Static class cannot be inherited.");if(j._final_)throw new Error("Final class cannot be inherited.");if(i&&k.partial&&(c=a.path(d,i)),k.static){if(c){if(!c._static_)throw new Error('Partial class "'+i+'" must be static.')}else c=function(){throw new Error("Cannot instantiate static class.")};f=c.prototype}else{if(c){if(c._static_)throw new Error('Partial class "'+i+'" must not be static.');if(c._super_!==j&&c._super_!==b)throw new Error('Partial class "'+i+'" must have consistent super class.')}else c=k.abstract?function(){throw new Error("Cannot instantiate abstract class.")}:function(){var b=c._mixins_||[],d=c._ctors_||[],e=null,f=arguments;this.__id__=g++,this.__handlers__={},this.__initializing__=!0,this.__afters__=[];for(var h=null,i=null,j=0,k=b.length;k>j;j++)h=b[j],h["@init"]?(i=h["@init"].meta,i=a.is(i,"function")?i:i.value,m(h.prototype.__super__,this,f),i&&i.call(this)):m(h.prototype.__super__,this,f);m(this.__super__,this,f);for(var l=0,n=d.length;n>l;l++)e=d[l],e=a.is(e,"function")?e:e.value,e&&e.apply(this,f);for(;this.__afters__.length>0;){var o=this.__afters__.pop();o.handler.apply(o.context,f)}this.__afters__=null,delete this.__afters__,this.__initializing__=!1},c._ctors_=[];c._super_!==j?(e=function(){},e.prototype=j.prototype,f=new e,f.constructor=c,f.__type__=i||"Anonymous",f.__super__=j,c.prototype=f):f=c.prototype,f.class=f.constructor,n&&(c._ctors_.push(n),f.__ctor__||(f.__ctor__=n))}return l._meta(c,h),f.__define__&&f.__define__.call(c),i&&a.path(d,i,c),c}var d=a.GLOBAL,e="@",f=1,g=1,h={fixTargetCtor:function(a){return a instanceof b?a.constructor:a},fixTargetKey:function(a){return e+a},defineEvent:function(a,b,c){var d=h.fixTargetCtor(a),e=h.fixTargetKey(b),f=e in d,g={};return f||(g=Object.defineProperty(a,"on"+b.toLowerCase(),{get:function(){var a=this.__handlers__[b];return a?a[0].handler:null},set:function(a){var c=this.__handlers__,d=c[b]=c[b]||[];d[0]={owner:this,handler:a,context:null}}})),d[e]={name:b,type:"event",meta:c,descriptor:g},f},defineProperty:function(b,c,d){var e,f,g=h.fixTargetCtor(b),i=h.fixTargetKey(c),j=i in g,k={};if("value"in d){var l=d.value,m="_"+c,n=d.get,o=d.set;e=n||function(){return m in this?this[m]:a.is(l,"function")?l.call(this):l},f=d.readonly?function(a,b){return b&&b.force?void(this[m]=a):!1}:o||function(a){this[m]=a}}else e=d.get||function(){return void 0},f=d.set||function(){return!1};return j&&(e.__super__=g[i].getter,f.__super__=g[i].setter),k=Object.defineProperty(b,c,{get:e,set:f,configurable:!0}),g[i]={name:c,type:"property",meta:d,getter:e,setter:f,descriptor:k},j},defineMethod:function(a,b,c){var d=h.fixTargetCtor(a),e=h.fixTargetKey(b),f=e in d;return d[e]={name:b,type:"method",meta:c},b in a&&(c.value.__super__=a[b]),a[b]=c.value,f}},i={__handlers__:{},member:function(a,c){var d=h.fixTargetCtor(c||this),e=d[h.fixTargetKey(a)];return e||d===b?e:this.member(a,d._super_)},may:function(a){var b=this.member(a);return b&&"event"==b.type},has:function(a){var b=this.member(a);return b&&"property"==b.type},can:function(a){var b=this.member(a);return b&&"method"==b.type},get:function(a,b){var c=this.member(a);return c&&c.getter?c.getter.call(this,b):void 0},set:function(a,b,c){var d=this.member(a);return d&&d.setter&&d.setter.call(this,b,c),this},gets:function(b){var c={},d=h.fixTargetCtor(this)._properties_;return a.each(d,function(a){c[a]=this.get(a,b)},this),c},sets:function(a,b){if(a)for(var c in a)a.hasOwnProperty(c)&&this.set(c,a[c],b);return this},each:function(a,b){for(var c=h.fixTargetCtor(this)._properties_,d=0,e=c.length;e>d;d++){var f=c[d],g=a.call(b,f,d,this.member(f),this.get(f));if(g===!1)return!1}return this},__may__:function(a){return this.may(a)},__has__:function(a){return this.has(a)},__can__:function(a){return this.can(a)},__get__:function(a){return this.get(a)},__gets__:function(){return this.gets()},__set__:function(a,b){this.set(a,b)},__sets__:function(a){this.sets(a)},__each__:function(a,b){return this.each(a,b)}},j={toString:function(){return"{ ClassName: "+(this._name_||"Anonymous")+", ClassID: "+this._id_+" }"},getProperties:function(b){var c={};if(!this.getMeta||"ZNObject"==this._name_)return c;var d=this._super_,e=this._mixins_;return d&&a.extend(c,d.getProperties(b)),e&&e.length&&a.each(e,function(d){a.extend(c,d.getProperties(b))}),a.each(this.getMeta("properties"),function(a,d){var e=b&&b(d,a)===!1;e||a.hidden||(c[d]=a)}),c},getPropertie:function(b){var c=null;return b&&a.each(this.getProperties(),function(a,d){return b==d&&(c=a),-1}),c},getMeta:function(a){return a?this._meta_[a]:this._meta_},setMeta:function(a,b){return this._meta_[a]=b,this},defineEvent:function(a,b,c){return h.defineEvent(c||this.prototype,a,b)||this._events_.push(a),this},defineProperty:function(a,b,c){return h.defineProperty(c||this.prototype,a,b)||this._properties_.push(a),this},defineMethod:function(a,b,c){return h.defineMethod(c||this.prototype,a,b)||this._methods_.push(a),this}},k={toString:function(){var a={ClassName:this.__name__||"Anonymous",InstanceID:this.__id__,Meta:this.constructor._meta_};return JSON.stringify(a)},toJson:function(){var b={};return a.each(this.constructor.getProperties(),function(a,c){b[c]=this.get(c)},this),b},getProperties:function(){return this.constructor.getProperties()},getPropertie:function(a){return this.constructor.getPropertie(a)},upon:function(b,c,d){if(c){var e=this.__handlers__,f=e[b]=e[b]||[];f[0]=a.extend({owner:this,handler:c},d)}return this},on:function(b,c,d){if(c){var e=this.__handlers__,f=e[b]=e[b]||[{owner:null,handler:null,context:null}];f.push(a.extend({owner:this,handler:c},d))}return this},off:function(a,b,c){var d,e=this.__handlers__[a]||[],f=c&&c.context;if(b)for(var g=e.length-1;g>=0;g--)d=e[g],d.handler!==b||f&&d.context!==f||this.__handlers__[a].splice(g,1);else this.__handlers__[a]=[{owner:null,handler:null,context:null}];return this},fire:function(a,b,c){var d,e=this.__handlers__[a],f=null;if(e)for(var g=0,h=e.length;h>g;g++)if(d=e[g],d&&d.handler&&(f=c&&"apply"==c.method?d.handler.apply(d.context||d.owner,b):d.handler.call(d.context||d.owner,d.owner,b,c),!1===f))return this;return this},dispose:function(){return this.__handlers__={},this},destroy:function(){return this.dispose()},"super":function(){var a=this.super.caller.__super__;return a?a.apply(this,arguments):void 0},is:function(b){if("string"==typeof b&&(b=a.path(d,b)),b){if(this instanceof b)return!0;for(var c=this.constructor._mixins_,e=0,f=c.length;f>e;e++){var g=c[e];if(b===g)return!0}}return!1},__is__:function(a){return this.is(a)},__clone__:function(){}};a.extend(b,i,j,{_id_:0,_name_:"ZNObject",_statics_:{},_events_:[],_properties_:[],_methods_:[],_mixins_:[],_meta_:{}}),a.extend(b.prototype,i,k),a.isZNObject=function(a){return a instanceof b};var l={_arguments:function(){var c,d,e,f=arguments,g=f.length,h=f[0],i={"static":!1,statics:[],partial:!1,"abstract":!1,"final":!1,mixins:[],events:[],properties:[],methods:[]};if(3===g){if(c=h,d=f[1],e=f[2],!a.is(d,"function"))throw new Error("Invalid _super class.")}else if(2===g){if(a.is(h,"string"))c=h,d=null;else{if(!a.is(h,"function"))throw new Error("Invalid _super class.");c=null,d=h}e=f[1]}else{if(1!==g)throw new Error("Invalid arguments.");if(c=null,d=null,e=h,!a.is(e,"object"))throw new Error("The meta argument must be an object.")}return c=c||"",e=a.overwrite(e||{},i),d=d||b,{name:c,"super":d,meta:e}},_meta:function(b,c){var d=c.name,e=c.super,g=c.meta;return a.extend(b,i,j,{_id_:f++,_name_:d,_super_:e,_partial_:g.partial,_abstract_:g.abstract,_static_:g.static,_final_:g.final,_statics_:a.extend({},e._statics_,g.statics),_events_:e._events_.slice(0),_properties_:e._properties_.slice(0),_methods_:e._methods_.slice(0),_mixins_:e._mixins_.concat(g.mixins),_meta_:g}),a.extend(b,b._statics_),g.static?(a.each(g.events,function(a){b.defineEvent(a,{},b)}),a.each(g.properties||g.props,function(c,d){b.defineProperty(d,a.is(c,"object")?c:{value:c},b)}),a.each(g.methods,function(c,d){b.defineMethod(d,a.is(c,"function")?{value:c}:c,b)}),g.methods.init&&g.methods.init.call(b,b)):(a.each(g.mixins,function(c){var d=c.prototype;a.each(c._events_,function(a){b.defineEvent(a,d.member(a).meta)}),a.each(c._properties_,function(a){b.defineProperty(a,d.member(a).meta)}),a.each(c._methods_,function(a){i[a]||k[a]||b.defineMethod(a,d.member(a).meta)})}),a.each(g.events,function(a){b.defineEvent(a,{})}),a.each(g.properties,function(c,d){b.defineProperty(d,a.is(c,"object")?c:{value:c})}),a.each(g.methods,function(c,d){b.defineMethod(d,a.is(c,"function")?{value:c}:c)})),b}},m=function(c,d,e){if(c&&c!==b){var f=c.member("init"),g=c._mixins_,h=null;return f&&f.meta.after&&d.__afters__.push({context:d,handler:f.meta.after}),g.length&&a.each(g,function(b){b["@init"]&&(h=b["@init"].meta,h=a.is(h,"function")?h:h.value,h&&h.call(d))}),f&&f.meta.auto&&f.meta.value.apply(d,e),arguments.callee(c._super_,d)}};a.Class=c}(zn);