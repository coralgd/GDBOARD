const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initLines();
});

let lines = [];

function initLines() {
  lines = [];
  for (let i = 0; i < 50; i++) {
    lines.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      length: Math.random() * 150 + 50,
      speed: Math.random() * 2 + 1,
      angle: Math.random() * Math.PI / 3 - Math.PI / 6
    });
  }
}

initLines();

function draw() {
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "cyan";
  ctx.lineWidth = 2;

  lines.forEach(l => {
    l.x -= Math.cos(l.angle) * l.speed;
    l.y += Math.sin(l.angle) * l.speed;

    ctx.beginPath();
    ctx.moveTo(l.x, l.y);
    ctx.lineTo(l.x + Math.cos(l.angle) * l.length, l.y - Math.sin(l.angle) * l.length);
    ctx.stroke();

    if (l.x < -l.length || l.y > canvas.height + l.length) {
      l.x = canvas.width + Math.random() * 100;
      l.y = -Math.random() * 100;
    }
  });

  requestAnimationFrame(draw);
}

draw();
