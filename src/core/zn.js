/**
 * Global Var
 */
var zn = {
    VERSION: '0.0.1',
    DEBUG: false,
    GLOBAL: (function () { return this; }).call(null)
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = zn;
    zn.znPath = __dirname;
}

zn.GLOBAL.zn = zn;  //set global zn var