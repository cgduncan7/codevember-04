function Sky(width, height, cloudChance, color) {
  this.width = width;
  this.height = height;
  this.cloudChance = cloudChance;
  this.color = color;
  this.clouds = [];
}

Sky.prototype.map = function(v, vi, vx, ri, rx) {
  const vd = Math.abs(vx - vi);
  const vr = Math.abs(v - vi);
  const rd = Math.abs(rx - ri);
  return ((vr / vd) * rd) + ri;
};

Sky.prototype.run = function() {
  sketch.translate(sketch.width/2, sketch.height/2);
  sketch.blendMode(sketch.BLEND);
  sketch.fill(this.color);
  sketch.stroke(0);
  sketch.strokeWeight(10);
  sketch.ellipseMode(sketch.center);
  sketch.ellipse(0, 0, this.width, this.height);
  sketch.blendMode(sketch.OVERLAY);

  const cc = Math.random();
  if (cc <= this.cloudChance) {
    const d = this.map(Math.random(), 0, 1, this.width * .1, this.width * .6);
    const a = this.map(Math.random(), 0, 1, 0, Math.PI*2);
    const x = Math.cos(a) * (this.width / 2 + d/2);
    const y = Math.sin(a) * (this.height / 2 + d/2);
    let vel = this.map(Math.random(), 0, 1, 0.05, 1.25);
    if (x >= 0) {
      vel *= -1; 
    }
    const newCloud = new Cloud(x, y, vel, d, sketch.color(255,255,255,200));
    this.clouds.push(newCloud);
  }

  for (let cloud of this.clouds) {
    cloud.update();
    cloud.draw(sketch);
  }
}

function Cloud(x, y, v, d, c) {
  this.pos = [x, y];
  this.velX = v;
  this.diameter = d;
  this.col = c;
  this.yOffset = 0;
  this.age = 0;
}

Cloud.prototype.update = function() {
  this.yOffset = Math.sin(this.age) * this.diameter * .125;
  this.pos = [this.pos[0] + this.velX, this.pos[1]];
  this.age += 0.01;
}

Cloud.prototype.draw = function(sketch) {
  sketch.noStroke();
  sketch.fill(this.col);
  sketch.ellipse(this.pos[0], this.pos[1] + this.yOffset, this.diameter, this.diameter);
  return this.pos;
}