(function (zn){

    /**
     * Dom Element
     */
    zn.class('zn.dom.Element',{
        properties: {
            dom: {
                readonly: true,
                get: function (){
                    return this._dom;
                }
            }
        },
        methods: {
            init: function (inDom){
                this._dom = inDom;
            }
        }
    });

})(zn);
