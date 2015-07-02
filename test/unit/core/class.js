/**
 * Created by yangyxu on 3/20/15.
 */
module("class");

var MyBaseClass = zn.class('test.MyBaseClass', {
    events: ['event1', 'event2', 'event3'],
    statics: {
        static1: 'test'
    },
    properties: {
        prop1: 1,
        prop2: {
            value: 'foo'
        },
        prop3: {
            get: function () {
                return 'bar';
            }
        },
        prop4: {
            value: false
        },
        prop5: {
            get: function () {
                return this._prop5;
            },
            set: function (value) {
                this._prop5 = value;
            }
        },
        prop6: {
            get: function () {
                return this._prop5 + '!';
            }
        }
    },
    methods: {
        init: function (v) {
            this._value = v;
        },
        method1: function () {
            return 'hello';
        },
        method2: function () {
            return this.prop2();
        },
        method3: function () {
            return this.get('prop3');
        },
        method4: function (val) {
            this.prop4(val);
        },
        method5: function (val) {
            this.set('prop5', val);
        }
    }
});

var _myClass = new MyBaseClass();

//console.log(MyBaseClass);
console.log(_myClass);
console.log(_myClass.prop1);

/*
test("define class", function () {

    var Person = zn.class('Person', {
        properties: {
            name: 'name',
            age: 20
        }
    });
    console.log(Person);
    var user = new Person();
    console.log(user);
    ok(Person, 'The Person is exist.');

});*/

