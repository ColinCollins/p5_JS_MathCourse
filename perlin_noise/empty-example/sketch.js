

let inc = 0.05;
var start = 0;
let scl = 20;
var cols, rows;
let zoff = 0;
var fr;

let particles = [];

let flowfield;

// sketch 草稿
function setup() {
    // put setup code here
    createCanvas(960, 640);
    // Math.floor
    cols = floor(width / scl);
    rows = floor(height / scl);
    fr = createP("");

    flowfield = new Array(cols * rows);

    for (let i = 0; i < 200; i++) {
        particles[i] = new Particle();
    }
    background(255);
}

function draw() {
    TwoDimension();
    // noLoop();
}

function TwoDimension () {
    // loadPixels();
    let yoff = 0;
    for (let x = 0; x < cols; x ++) {
        // 这边是为了获取下一行开始，2D noise 类似于图示，是有坐标数值的若不 xoff = 0, 那么行与行之间就缺失了关联
        let xoff = 0;
        for (let y = 0; y < rows; y++) {
            let index = (x + y * cols);
            let angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
            var v = p5.Vector.fromAngle(angle);
            v.setMag(0.5);
            flowfield[index] = v;
            xoff += inc;
            stroke(0, 50)
           /*
            strokeWeight(1);
            push();
            // origin point in the left top, move the draw start point position
            translate(x * scl, y * scl);
            rotate(v.heading());
            // draw a line (x, y, width, height)
            line(0 , 0, scl, 0);
           pop(); */
        }
        yoff += inc;

        zoff += 0.0001;
    }
    // window 需要手动调用 updatePixels 才能显示更新效果
    // updatePixels();

    for (let i = 0; i < particles.length; i++) {
        particles[i].follow(flowfield);
        particles[i].update();
        particles[i].edges();
        particles[i].show();
    }

    fr.html(floor(frameRate()));
}

function OneDimension () {
    /*
        let xoff = 0;
        let yoff = 10000;
    */
    // 笔画颜色
    stroke(255);
    noFill();
    // OneDimension();
    // 如果没有 shape 声明绘制记录，那么就不能进行通常绘制，比如线面等多边形图像
    beginShape();
    // flow
    let xoff = start;
    for (let x = 0; x < width; x++) {
        stroke(255);
        // draw line
        let n = map(noise(xoff), 0, 1, 0, height);
        let s = map(sin(xoff), -1, 1, -50, 50);
        let y = n + s;
        vertex(x, y);
        xoff += inc;
    }
    endShape();
    start += inc;
}

function example() {
    // convert into 转换 -> 转换 xoff 数据以 range （0，1） 为比例的 (0, width) 的值
    // p5 中的 noise 是一维 noise
    let x = map(noise(xoff), 0, 1, 0, width);
    let y = map(noise(yoff), 0, 1, 0, height);
    xoff += 0.02;
    yoff += 0.02;
    ellipse (x, y, 30, 30);
}

