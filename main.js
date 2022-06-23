function init(){
    window.setInterval(draw, 1000/fps);
}

function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
     let phis = update_phi(phi1, phi_der1, function1, phi2, phi_der2, function2, dx);
     phi1 = phis[0];
     phi_der1 = phis[1];
     phi2 = phis[2];
     phi_der2 = phis[3];
     var x1 = point_x + 100*L1*Math.sin(phi1);
     var y1 = point_y - 100*L1*Math.cos(phi1);
     var x2 = x1 + 100*L2*Math.sin(phi2);
     var y2 = y1 - 100*L2*Math.cos(phi2);

     ctx.fillStyle = BLACK;
     ctx.fillRect(0, 0, 3000, 3000);
     ctx.fillStyle = RED;
     ctx.strokeStyle = RED;

    if (lasts.length > 1){
         x_first = lasts[0][0];
         y_first = lasts[0][1];
         ctx.beginPath();
         ctx.moveTo(x_first, y_first);
         for (var i = 1; i < lasts.length;i++){
            cur_x = lasts[i][0];
            cur_y = lasts[i][1];
            ctx.lineTo(cur_x, cur_y);
         }
         ctx.stroke();
     }


     ctx.beginPath();
     ctx.moveTo(point_x, point_y);
     ctx.lineTo(x1, y1);
     ctx.stroke();

     ctx.fillStyle = BLUE;
     ctx.strokeStyle = BLUE;
     ctx.beginPath();
     ctx.moveTo(x1, y1);
     ctx.lineTo(x2, y2);
     ctx.stroke();
     ctx.beginPath();
     ctx.arc(x2, y2, r2, 0, Math.PI*2);
     ctx.fill();

     ctx.fillStyle = RED;
     ctx.strokeStyle = RED;
     ctx.beginPath();
     ctx.arc(x1, y1, r1, 0, Math.PI*2);
     ctx.fill();

     lasts.push([x2, y2]);
     if (lasts.length > number_of_last) lasts.shift();
  }
}

function function1(phi1, phi_der1, phi2, phi_der2){
    var first = -M2/(M1 + M2*Math.sin(phi1 - phi2)**2);
    var second = Math.sin(phi1 - phi2) * (phi_der1**2 * Math.cos(phi1 - phi2) + L2/L1*phi_der2**2);
    var third = -g/L1 * (Math.sin(phi2)*Math.cos(phi1 - phi2) - (M2 + M1)/M2*Math.sin(phi1));
    return first*(second - third);
}
function function2(phi1, phi_der1, phi2, phi_der2){
    var first = (M1 + M2)/(M1 + M2*Math.sin(phi1 - phi2)**2);
    var second = Math.sin(phi1 - phi2) * (M2/(M2 + M1) * phi_der2**2 * Math.cos(phi1 - phi2) + L1/L2*phi_der1 ** 2);
    var third = -g/L2*(Math.sin(phi1) * Math.cos(phi1 - phi2) - Math.sin(phi2));
    return first * (second + third);
}
function update_phi(cur_phi, cur_phi_der, func1, cur_phi2, cur_der_phi2, func2, delta_x){
    var phi_der = cur_phi_der;
    var phi = cur_phi;
    var phi3 = cur_phi2;
    var phi_der3 = cur_der_phi2;
    for (var i = 0; i < 25;i++){
        phi_der = phi_der + func1(phi, phi_der, phi3, phi_der3) * delta_x / 2;
        phi = phi + phi_der * delta_x;
        phi_der3 = phi_der3 + func2(phi, phi_der, phi3, phi_der3) * delta_x / 2;
        phi3 = phi3 + phi_der3 * delta_x;
    }
    return [phi, phi_der, phi3, phi_der3];
}
var time = 0;
var phi1 = Math.PI - 3*Math.PI/4;
var phi2 = Math.PI - Math.PI/4;
var phi_der1 = 0;
var phi_der2 = 0;
var g = 9.8;
var L1 = 1;
var r1 = 15;
var r2 = 15;
var point_x = 500;
var point_y = 300;
var fps = 60;
var RED = "#FF0000";
var BLUE = "#0000FF";
var BLACK = "#000000";
var L2 = 1;
var M1 = 1.5;
var M2 = 1.5;
var dx = 1/1000;
var number_of_last = 1000;
var lasts = [];
init()
