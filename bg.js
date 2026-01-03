const c = document.getElementById("bg");
const ctx = c.getContext("2d");

function resize() { c.width = window.innerWidth; c.height = window.innerHeight; }
resize();
window.addEventListener("resize", resize);

let angle = 0;

function draw() {
  ctx.fillStyle = "#111";
  ctx.fillRect(0,0,c.width,c.height);

  ctx.save();
  ctx.translate(c.width/2, c.height/2);
  ctx.rotate(angle);

  ctx.strokeStyle = "cyan";
  ctx.lineWidth = 1;
  const size = 50;
  const max = Math.max(c.width, c.height);

  for(let i=-max;i<max;i+=size){
    ctx.beginPath();
    ctx.moveTo(i,-max);
    ctx.lineTo(i,max);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-max,i);
    ctx.lineTo(max,i);
    ctx.stroke();
  }

  ctx.restore();
  angle += 0.002;
  requestAnimationFrame(draw);
}

draw();
