/**
 * sketch
 */
var s = function(sketch) {
  // #region settings
  const framerate = 60;
  const w = window.innerWidth;
  const h = window.innerHeight;
  // #endregion

  var sky;

  // #region p5
  sketch.setup = function() {
    const p5canvas = sketch.createCanvas(w, h);
    const dim = sketch.min(w, h);
    sky = new Sky(dim * .8, dim * .8, 0.05, sketch.color(175, 200, 255));
    canvas = p5canvas.canvas;
    sketch.frameRate(framerate);
  }

  sketch.draw = function() {
    // sketch.background(235, 245, 255);
    sketch.background(255);
    sky.run(sketch);
  }
  // #endregion
};

var sketch = new p5(s, document.getElementById('sketch'));