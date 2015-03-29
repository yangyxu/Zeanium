/**
 * Created by yangyxu on 3/20/15.
 */
module("builtin");

//zn.fix: fix
test("builtin zn.fix", function () {
    var _target = {
        add: function (x, y){
            return x + y;
        }
    };
    ok(zn.fix(), 'zn.fix is exist.');
    var _fix1 = {
        plus: function(a, b){
            return a + b;
        },
        add: function (a) {
            return a + 5;
        }
    };
    var _fix2 = {
        create: function (a){
            return 'create: ' + a;
        }
    };
    zn.fix(_target, _fix1);
    equal(_target.plus, 'yangyxu', "The value of target's name is yangyxu.");
    equal(_target.email, 'yangyxu@cisco.com', "The value of target's email is yangyxu@cisco.com.");
});

//zn.extend: extend target by argument which start with index 1.
test("builtin zn.extend", function () {
    var _target = {};
    ok(zn.extend, 'zn.extend is exist.');
    zn.extend(_target, { name: 'yangyxu', email: 'yangyxu@cisco.com' });
    equal(_target.name, 'yangyxu', "The value of target's name is yangyxu after extend target object.");
    equal(_target.email, 'yangyxu@cisco.com', "The value of target's email is yangyxu@cisco.com after extend target object.");
});