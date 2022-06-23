function init(){
    window.setInterval(draw, 1000/fps);
}

function draw() {
  time += 500*fps;
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    var phi = update_phi(time);
    console.log(time);
    var x = x0 + L*100*Math.sin(phi);
    var y = y0 + L*100*Math.cos(phi);
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#FF0000";
    ctx.clearRect(0, 0, 800, 800);
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function update_phi(time){
    var phi = phi0 * Math.cos(Math.sqrt(g/L)*time);
    return phi;
}
var time = 0;
var phi0 = Math.PI/2;
var g = 9.8;
var L = 1;
var x0 = 400;
var y0 = 300;
var fps = 60;
init()
