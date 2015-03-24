/**
 * Created by yangyxu on 3/20/15.
 */
module("builtin");

test("builtin function", function () {
    ok(zn, 'window.zn global var is exist.');
    ok(zn.version, "zn's version is exist.");
});