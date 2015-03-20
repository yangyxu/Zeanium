/**
 * Created by yangyxu on 3/11/15.
 */
module("zn");


test("zn", function () {

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