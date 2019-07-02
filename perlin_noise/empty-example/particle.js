function Particle () {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);

    this.maxSpeed = 2;
    this.prevPos = this.pos.copy();
}

let prop = Particle.prototype;

prop.follow = function (vectors) {
    var x = floor(this.pos.x / scl);
    var y = floor(this.pos.y / scl);
    var index = x +  (y - 1) * cols;
    // addForce means add angular
    var force = vectors[index];
    this.applyForce(force);
}

prop.update = function () {
    this.vel.add(this.acc);
    // 特殊函数
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
}

prop.applyForce = function (force) {
    this.acc.add(force);
}

prop.updatePrev = function () {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
}

prop.show = function () {
    stroke(0);
    strokeWeight(0.5);
    // point(this.pos.x, this.pos.y);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.updatePrev();
}

prop.edges = function () {
    if (this.pos.x >= width) {
        this.pos.x = 0;
        this.updatePrev();
    }
    if (this.pos.x < 0) {
        this.pos.x = width;
        this.updatePrev();
    }
    if (this.pos.y >= height) {
        this.pos.y = 0;
        this.updatePrev();
    }
    if (this.pos.y < 0) {
        this.pos.y = height;
        this.updatePrev();
    }
}