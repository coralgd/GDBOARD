const canvas = document.createElement("canvas");
canvas.id = "hud-canvas";
document.body.prepend(canvas);

const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

let t = 0;
const GRID = 64;

function draw() {
  t += 0.25;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "rgba(0,180,255,0.12)";
  ctx.lineWidth = 1;

  const ox = t % GRID;
  const oy = t % GRID;

  for (let x = -GRID; x < canvas.width + GRID; x += GRID) {
    ctx.beginPath();
    ctx.moveTo(x + ox, 0);
    ctx.lineTo(x + ox, canvas.height);
    ctx.stroke();
  }

  for (let y = -GRID; y < canvas.height + GRID; y += GRID) {
    ctx.beginPath();
    ctx.moveTo(0, y + oy);
    ctx.lineTo(canvas.width, y + oy);
    ctx.stroke();
  }

  requestAnimationFrame(draw);
}

draw();
