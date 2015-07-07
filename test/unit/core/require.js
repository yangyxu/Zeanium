/**
 * Created by yangyxu on 7/6/15.
 */
module("require");

zn.load('../../../test', function (a, b, c){
    console.log(a, b, c);
});