/**
 * Created by yangyxu on 3/11/15.
 */
module("BasicStage / Stage");


test("nx.graphic.svg.Stage", function () {

    var stage = new nx.graphic.svg.Stage({
        adaptive: true
    });
    ok(stage, 'stage is exist');

    stage.size(new nx.graphic.svg.data.Size(400, 500));

    equal(400, stage.size().width(), 'width is same.');
    equal(500, stage.size().height(), 'height is same.');

    equal(true, stage.adaptive(), 'adaptive getter ok.');

    stage.adaptive(false);
    equal(false, stage.adaptive(), 'adaptive setter ok.');



});

test("adaptive", function (assert) {
    // QUnit: asynchronize test case completed
    var done = assert.async();
    var Container = nx.define(nx.ui.Component, {
        view: {
            props: {
                style: {
                    position: "relative",
                    width: "100px",
                    height: "100px"
                }
            },
            content: {
                name: "stage",
                type: "nx.graphic.svg.Stage",
                props: {
                    adaptive: true,
                    scanDelay: 30
                }
            }
        }
    });
    var container = new Container();
    var stage = container.view("stage");
    setTimeout(function () {
        deepEqual(stage.size(), {
            width: 0,
            height: 0
        }, "Size is zero until append to page");
        document.body.appendChild(container.dom().$dom);
        setTimeout(function () {
            deepEqual(stage.size(), {
                width: 100,
                height: 100
            }, "Size is correct after append to page");
            container.dom().setStyle("width:200px");
            setTimeout(function () {
                deepEqual(stage.size(), {
                    width: 200,
                    height: 100
                }, "Size is correct after resize container");
                // remove container after test
                document.body.removeChild(container.dom().$dom);
                // QUnit: asynchronize test case completed
                done();
            }, 60); // the size must be updated in 60ms
        }, 60); // the size must be updated in 60ms
    }, 60); // the size must be updated in 60ms
    // Human will not feel lag if redraw in 60ms
});
