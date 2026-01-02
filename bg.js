const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function initParticles(){
  particles = [];
  for(let i=0;i<100;i++){
    particles.push({
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height,
      size: Math.random()*3+1,
      speedX: Math.random()*2-1,
      speedY: Math.random()*2-1,
      color: `hsl(${Math.random()*360},100%,50%)`
    });
  }
}

initParticles();

window.addEventListener("resize", ()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

function animate(){
  ctx.fillStyle = "#111";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  particles.forEach(p=>{
    p.x += p.speedX;
    p.y += p.speedY;

    if(p.x<0) p.x=canvas.width;
    if(p.x>canvas.width) p.x=0;
    if(p.y<0) p.y=canvas.height;
    if(p.y>canvas.height) p.y=0;

    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
    ctx.fill();
  });

  requestAnimationFrame(animate);
}

animate();
