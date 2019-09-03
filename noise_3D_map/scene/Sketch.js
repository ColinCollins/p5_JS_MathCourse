var cols, rows = 0;
var scl = 20;
var width = 1920;
var height = 720;

var terrain = [];
var flying = 0;
function setup() {
    createCanvas(720, 640, WEBGL);
    perspective(PI / 2.0, 0.6, 1, 1000);
    cols = width / scl;
    rows = height / scl;
}

function draw () {
    background(0);

    translate(-width / 2, -height / 2);
    rotateX (Math.PI / 3);
    translate(0, 0, - height / 2);

    frameRate(60);
    flying -= 0.1;

    var yoffset = flying;
    for (var y = 0; y < rows; y++) {
        var xoffset = 0;
        for (var x = 0; x < cols; x++) {
            terrain[y * cols + x] = map(noise(xoffset, yoffset), 0, 1, -100, 100);
            xoffset += 0.2;
        }
        yoffset += 0.2;
    }


    stroke(255);
    noFill();
    push();
    for (var y = 0; y < rows - 1; y++) {

        beginShape(TRIANGLE_STRIP);

        for (var x = 0; x < cols; x++) {
            vertex(x * scl, y * scl, terrain[y * cols + x]);
            vertex(x * scl, (y + 1) * scl, terrain[(y + 1) * cols + x]);
        }

        endShape()
    }
    pop();
}