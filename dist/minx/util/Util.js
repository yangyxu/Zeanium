!function(t){var r=t.char.getUppercaseLetters();t.util=t.Class({static:!0,methods:{formatDate:function(t,r){},wordCount:function(t){var r=data.match(/[a-zA-Z0-9_\u0392-\u03c9]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/),n=0;if(null===r)return n;for(var e=0;e<r.length;e++)19968<=r[e].charCodeAt(0)?n+=r[e].length:n+=1;return n},rate:function(t){return"★★★★★☆☆☆☆☆".slice(5-t,10-t)},valueExchange:function(t,r){return t^=r,[t^=r^=t,r]},htmlspecialchars:function(t){return t.toString().replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")},getColorValue:function(){return"#"+("00000"+(16777216*Math.random()<<0).toString(16)).slice(-6)},humpToSeparator:function(t,r){return t.match(/^[a-z][a-z0-9]+|[A-Z][a-z0-9]*/g).join(r||"_").toLowerCase()},getTime:function(){return(new Date).getTime()},generateCode:function(){return this.getTime().toString().substring(1).toString()+Math.floor(100*(9*Math.random()+1))},getRandomNumber:function(){return Math.floor(10*Math.random())},getRandomChar:function(){return r[Math.floor(26*Math.random())]},getRandomNumbers:function(){return Math.floor(1e3*(9*Math.random()+1))},getRandomChars:function(){return(Math.random()/+new Date).toString(36).replace(/\d/g,"").slice(1)},randomNumbers:function(t){return Math.random().toString().slice(-(t||6))}}})}(zn);