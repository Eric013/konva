suite('Line', function() {
    // ======================================================
    test('add line', function() {
        var stage = addStage();
        var layer = new Konva.Layer();

        var line = new Konva.Line({
            stroke: 'blue',
            strokeWidth: 20,
            lineCap: 'round',
            lineJoin: 'round',
            draggable: true,
            tension: 0
        });

        layer.add(line);
        stage.add(layer);

        line.setPoints([1, 2, 3, 4]);
        assert.equal(line.getPoints()[0], 1);

        line.setPoints([5,6,7,8]);
        assert.equal(line.getPoints()[0], 5);

        line.setPoints([73, 160, 340, 23, 340, 80]);
        assert.equal(line.getPoints()[0], 73);
        
        assert.equal(line.getClassName(), 'Line');

        layer.draw();
        showHit(layer);
    });

    // ======================================================
    test('test default ponts array for two lines', function() {
        var stage = addStage();
        var layer = new Konva.Layer();

        var line = new Konva.Line({
            stroke: 'blue',
            strokeWidth: 20,
            lineCap: 'round',
            lineJoin: 'round',
            draggable: true
        });

        var redLine = new Konva.Line({
            x: 50,
            stroke: 'red',
            strokeWidth: 20,
            lineCap: 'round',
            lineJoin: 'round',
            draggable: true
        });

        line.setPoints([0,1,2,3]);
        redLine.setPoints([4,5,6,7]);

        layer.add(line).add(redLine);
        stage.add(layer);

        assert.equal(line.getPoints()[0], 0);
        assert.equal(redLine.getPoints()[0], 4);
        
    });

    // ======================================================
    test('add dashed line', function() {
        var stage = addStage();
        var layer = new Konva.Layer();

        /*
         var points = [{
         x: 73,
         y: 160
         }, {
         x: 340,
         y: 23
         }, {
         x: 500,
         y: 109
         }, {
         x: 500,
         y: 180
         }];
         */

        var line = new Konva.Line({
            points: [73, 160, 340, 23, 500, 109, 500, 180],
            stroke: 'blue',

            strokeWidth: 10,
            lineCap: 'round',
            lineJoin: 'round',
            draggable: true,
            dash: [30, 10, 0, 10, 10, 20],
            shadowColor: '#aaa',
            shadowBlur: 10,
            shadowOffset: {x:20, y:20}
            //opacity: 0.2
        });

        layer.add(line);
        stage.add(layer);

        assert.equal(line.dash().length, 6);
        line.dash([10, 10]);
        assert.equal(line.dash().length, 2);

        assert.equal(line.getPoints().length, 8);

    });

   // ======================================================
    test('add line with shadow', function() {
        var stage = addStage();
        var layer = new Konva.Layer();

        var line = new Konva.Line({
            points: [73,160,340,23],
            stroke: 'blue',
            strokeWidth: 20,
            lineCap: 'round',
            lineJoin: 'round',
            shadowColor: 'black',
            shadowBlur: 20,
            shadowOffset: {x: 10, y: 10},
            shadowOpacity: 0.5,
            draggable: true
        });

        layer.add(line);
        stage.add(layer);


        var trace = layer.getContext().getTrace();
        //console.log(trace);
        assert.equal(trace, 'clearRect(0,0,578,200);save();lineJoin=round;transform(1,0,0,1,0,0);save();globalAlpha=0.5;shadowColor=black;shadowBlur=20;shadowOffsetX=10;shadowOffsetY=10;beginPath();moveTo(73,160);lineTo(340,23);lineCap=round;lineWidth=20;strokeStyle=blue;stroke();restore();beginPath();moveTo(73,160);lineTo(340,23);lineCap=round;lineWidth=20;strokeStyle=blue;stroke();restore();');

    });

    test('line hit test with strokeScaleEnabled = false', function() {
        var stage = addStage();
        var scale = 0.1;
        var layer = new Konva.Layer();

        var group = new Konva.Group({
            scale: {
                x :scale,
                y : scale
            }
        });

        var line1 = new Konva.Line({
            points: [0, 0, 300, 0],
            stroke: 'red',
            strokeScaleEnabled: false,
            strokeWidth: 10,
            y : 0
        });
        group.add(line1);

        var line2 = new Konva.Line({
            points: [0, 0, 300, 0],
            stroke: 'green',
            strokeWidth: 40 / scale,
            y : 60 / scale
        });
        group.add(line2);

        layer.add(group);
        stage.add(layer);
        showHit(layer);

        var shape = layer.getIntersection({
            x : 10,
            y : 60
        });
        assert.equal(shape, line2, 'second line detected');

        shape = layer.getIntersection({
            x : 10,
            y : 4
        });
        assert.equal(shape, line1, 'first line detected');
    });
});