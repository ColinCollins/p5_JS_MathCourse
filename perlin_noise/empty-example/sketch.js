
let inc = 0.01;
var start = 0;

// sketch 草稿
function setup() {
    // put setup code here
    createCanvas(960, 640);
}

function draw() {
    // background(51);
    TwoDimension();
    noLoop();
}

function TwoDimension () {
    let yoff = 0;
    loadPixels();
    for (let x = 0; x < width; x ++) {
        // 这边是为了获取下一行开始，2D noise 类似于图示，是有坐标数值的若不 xoff = 0, 那么行与行之间就缺失了关联
        let xoff = 0;
        for (let y = 0; y < height; y++) {
            let index = (x + y * width) * 4;
            let r = noise(xoff, yoff) * 255;
            pixels[index + 0] = r;
            pixels[index + 1] = r;
            pixels[index + 2] = r;
            pixels[index + 3] = 255;
            xoff += inc;
        }
        yoff += inc;
    }
    // window 需要手动调用 updatePixels 才能显示更新效果
    updatePixels();
}

function OneDimension () {
    /* let xoff = 0;
    let yoff = 10000; */

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