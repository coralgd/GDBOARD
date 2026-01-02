const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize();
addEventListener("resize", resize);

let t = 0;

function draw() {
  ctx.fillStyle = "#05070d";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "rgba(0,200,255,0.45)";
  ctx.lineWidth = 2;

  for (let i = 0; i < 50; i++) {
    ctx.beginPath();
    const y = i * 35 + (t % 35);
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y - 80);
    ctx.stroke();
  }

  t += 1.4;
  requestAnimationFrame(draw);
}
draw();
