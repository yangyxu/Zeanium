(function (zn){
    /**
     * Dom Element
     */
    zn.class('zn.dom.Element',{
        properties: {
            aa: {
                set: function (content){
                    this._aa = content;
                    console.log(content);
                },
                get: function (){
                    return null;
                }
            }
        },
        methods: {
            init: function (inArgs){
                console.log(inArgs);
            }
        }
    });

    var _eDiv = new zn.dom.Element('test');
    _eDiv.aa = 'I am div';
    console.log(_eDiv);
    console.log(_eDiv.aa);
    //_eDiv.aa('xxx');

})(zn);
