/**
 * Created by yangyxu on 1/14/15.
 */
$(function (){
    console.log('xx');
    var _fn = function (a,b,c){
        console.log(a, b, c);
    };
    $.ajax({
        url: 'http://www.zgwlsc.net/lstore/public/service/proxy.jsp',
        data: {
            webID: 'F34DAB94-4B25-4E13-8C69-2074DC18C4D9',
            billCode: '15010225'
        },
        async: true,
        dataType: 'json',
        onSuccess: _fn,
        onError: _fn
    });
});