zn,zn.querystring=zn.Class({static:!0,properties:{config:{get:function(){}}},methods:{init:function(){this._config={separator:"&",equal:"=",minIndex:0,maxIndex:1e3}},config:function(n){return this.overwrite(this._config,n),this},parse:function(n,e){if("object"==typeof n)return n;var r=zn.extend({},this._config,e),t={},i=r.equal,s=n.split(r.separator),o=s.length;0<r.maxIndex&&o>r.maxIndex&&(o=r.maxIndex);for(var a=r.minIndex;a<o;a++){var u=s[a].replace(/\+/g,"%20"),c=u.indexOf(i),f=null,g=null;g=0<=c?(f=u.substr(0,c),u.substr(c+1)):(f=u,""),f=decodeURIComponent(f),g=decodeURIComponent(g),t.hasOwnProperty(f)?zn.is(t[f],"array")?t[f].push(g):t[f]=[t[f],g]:t[f]=g}return t},stringify:function(n,e){if("string"==typeof n)return n;var r=zn.extend({},this._config,e),t=[],i=r.equal,s={};if(s=zn.isZNObject(n)?n.gets():n,!zn.is(s,"object"))throw new Error("Agrument Error.");for(var o in n){var a=n[o],u=encodeURIComponent(this.__stringifyValue(o));a=encodeURIComponent(this.__stringifyValue(a)),t.push(u+i+a)}return t.join(r.separator)},__stringifyValue:function(n){switch(zn.type(n)){case"string":return n;case"boolean":return n?"true":"false";case"object":case"array":return JSON.stringify(n);case"number":return isFinite(n)?n:"0";default:return""}}}});