const canvas = document.getElementById("gridCanvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const particles = [];
const COUNT = 160;

for (let i = 0; i < COUNT; i++) {
  particles.push(createParticle());
}

function createParticle() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: -0.5 + Math.random(),
    vy: -0.5 + Math.random(),
    size: 1 + Math.random() * 2,
    alpha: 0.3 + Math.random() * 0.7
  };
}

function draw() {
  // мягкое затухание (НЕ мигание)
  ctx.fillStyle = "rgba(6, 10, 20, 0.25)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (const p of particles) {
    ctx.fillStyle = `rgba(0, 200, 255, ${p.alpha})`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();

    p.x += p.vx;
    p.y += p.vy;

    // лёгкое «течение»
    p.vx += (Math.random() - 0.5) * 0.05;
    p.vy += (Math.random() - 0.5) * 0.05;

    // ограничение скорости
    p.vx = Math.max(-1.2, Math.min(1.2, p.vx));
    p.vy = Math.max(-1.2, Math.min(1.2, p.vy));

    // возврат если улетела
    if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
      Object.assign(p, createParticle());
    }
  }

  requestAnimationFrame(draw);
}

draw();
