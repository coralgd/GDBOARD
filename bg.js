const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let lines = [];
for(let i=0;i<30;i++){
  lines.push({x:Math.random()*canvas.width, y:Math.random()*canvas.height, speed: Math.random()*1+0.5});
}

function animate(){
  ctx.fillStyle = "#111";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  ctx.strokeStyle = "cyan";
  lines.forEach(l=>{
    l.y += l.speed;
    if(l.y>canvas.height) l.y=0;
    ctx.beginPath();
    ctx.moveTo(l.x,l.y);
    ctx.lineTo(l.x+50,l.y+50);
    ctx.stroke();
  });

  requestAnimationFrame(animate);
}

animate();
