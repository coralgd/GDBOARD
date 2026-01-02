const canvas = document.getElementById("gridCanvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize();
addEventListener("resize", resize);

const stars = [];
const STAR_COUNT = 400;

for (let i = 0; i < STAR_COUNT; i++) {
  stars.push({
    x: Math.random() * canvas.width - canvas.width / 2,
    y: Math.random() * canvas.height - canvas.height / 2,
    z: Math.random() * canvas.width
  });
}

function draw() {
  ctx.fillStyle = "rgba(5,5,16,0.4)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.translate(canvas.width / 2, canvas.height / 2);

  for (const s of stars) {
    s.z -= 15;

    if (s.z < 1) {
      s.z = canvas.width;
      s.x = Math.random() * canvas.width - canvas.width / 2;
      s.y = Math.random() * canvas.height - canvas.height / 2;
    }

    const k = 128 / s.z;
    const px = s.x * k;
    const py = s.y * k;

    ctx.strokeStyle = "#00cfff";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(px * 1.1, py * 1.1);
    ctx.stroke();
  }

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  requestAnimationFrame(draw);
}

draw();
