!function(r){var a=Array.prototype.slice,c=0,o=1,s=2,l=r.Class({events:["complete"],properties:{promise:null},methods:{init:function(t,e){this._promise=new u,t&&this.resolve(t),e&&this.reject(e)},resolve:function(){var e=a.call(arguments);try{var t=this.get("promise"),n=this;if(t.get("readyState")!=c)return;t.set("readyState",o),t.set("data",e),r.each(t.get("resolves"),function(t){t.apply(n,e)})}catch(t){h.catch(t,this)}this.fire("complete",e)},reject:function(){var t=a.call(arguments);try{var e=this.get("promise");if(e.get("readyState")!=c)return;e.set("readyState",s),e.set("reason",t);var n=e.get("rejects")[0];n&&n.apply(this,t)}catch(t){h.catch(t,this)}this.fire("complete",t)}}}),u=r.Class({statics:{isPromise:function(t){return null!=t&&"function"==typeof t.then},defer:null},properties:{resolves:null,rejects:null,data:null,reason:null,readyState:null},methods:{init:function(t){this.set("resolves",[]),this.set("rejects",[]),this.set("exceptions",[]),this.set("readyState",c)},then:function(n,t){var s=new l;function e(){var t=a.call(arguments),e=n?n.apply(this,t):t;return u.isPromise(e)?e.then(function(){s.resolve.apply(s,a.call(arguments))}):s.resolve.apply(s,e),e}if(this.get("readyState")===c)this.get("resolves").push(e),t?this.get("rejects").push(t):this.get("rejects").push(function(){s.reject.apply(s,a.call(arguments))});else if(this.get("readyState")===o){var i=this;setTimeout(function(){e.apply(i,i.get("data"))})}return s.promise},catch:function(t){return h.exception(t)},finally:function(t){return h.finally(t)},otherwise:function(t){return this.then(void 0,t)}}}),h=r.async=r.Class({static:!0,methods:{init:function(t){this._exceptions=[],this._finallys=[],this._count=0,this._currIndex=0,this._dataArray=[]},exception:function(t){return this._exceptions.push(t),this},catch:function(e,n){return r.each(this._exceptions,function(t){t.call(n,e)}),this},finally:function(t){return this._finallys.push(t),this},defer:function(t,e){var n=this,s=new l(t,e);return s.on("complete",function(t,e){n._currIndex++,n._dataArray.push(e),n._currIndex==n._count&&(r.each(n._finallys,function(t){try{t(n._dataArray)}catch(t){r.error(t.message)}}),n._finallys=[])}),n._count++,s},all:function(e){var n=h.defer(),s=0,i=[];return r.each(e,function(t){t.then(function(t){i.push(t),++s>=e.length&&n.resolve(i)})}),n.promise},any:function(t){var e=h.defer();return r.each(t,function(t){t.then(function(t){e.resolve(t)})}),e.promise}}})}(zn);