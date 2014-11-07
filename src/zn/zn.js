/**
 * Global Var
 */
var zn = {
    version: '0.0.1',
    debug: false,
    path: '',
    global: (function () { return this; }).call(null)
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = zn;
}