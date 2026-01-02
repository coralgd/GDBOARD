const canvas = document.getElementById("gridCanvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize();
addEventListener("resize", resize);

let z = 0;

function draw() {
  ctx.fillStyle = "#050510";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  ctx.strokeStyle = "#00cfff";
  ctx.lineWidth = 1;

  for(let i=0;i<50;i++){
    let depth = (i*40 + z)%2000;
    let scale = 300/(depth+1);

    let y = canvas.height - depth*0.6;
    let w = canvas.width * scale;

    ctx.beginPath();
    ctx.moveTo(canvas.width/2 - w, y);
    ctx.lineTo(canvas.width/2 + w, y);
    ctx.stroke();
  }

  z += 8;
  requestAnimationFrame(draw);
}
draw();
