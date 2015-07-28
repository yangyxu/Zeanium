(function (zn){

    var User = zn.class('zn.model.User', {
        properties: {
            firstName: '',
            lastName: '',
            fullName: {
                binding: {
                    sourcePath: '#firstName'
                }
            },
            age: 0,
            sex: '男'
        },
        methods: {
            init: function (inArgs) {
                this.sets(inArgs);
            }
        }
    });

    var yangyxu = new User({
        firstName: 'xu',
        lastName: 'yangyang',
        age: 25,
        sex: '男'
    });

    var binding = new zn.data.Binding(yangyxu, 'fullName');

    console.log(binding);

})(zn);