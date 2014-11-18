(function (zn){
    /**
     * Dom Element
     */
    zn.class('zn.dom.Element',{
        partial: true,
        properties: {

        },
        methods: {
            addClass: function (inClassName){
                console.log(this._dom);
                console.log(inClassName);
            },
            deleteClass: function (inClassName){

            },
            ec: function (inClassName){

            },
            tc: function (inClassName){

            }
        }
    });

    var _eDiv = new zn.dom.Element('test');
    console.log(_eDiv.ac('body'));

})(zn);
