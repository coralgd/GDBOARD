const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initIcons();
});

let icons = [];

function initIcons() {
  icons = [];
  const colors = ["#00ffff","#ff00ff","#ffff00","#00ff00","#ff5500"];
  for(let i=0;i<50;i++){
    icons.push({
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height,
      size: Math.random()*30+20,
      speed: Math.random()*2+1,
      color: colors[Math.floor(Math.random()*colors.length)]
    });
  }
}

initIcons();

function draw() {
  ctx.fillStyle = "#111";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  icons.forEach(icon=>{
    icon.y += icon.speed;
    if(icon.y>canvas.height) icon.y=-icon.size;

    ctx.fillStyle = icon.color;
    // рисуем кубик, как GD иконка
    ctx.fillRect(icon.x, icon.y, icon.size, icon.size);

    // можно добавить глаз или градиент для шарма GD
    ctx.strokeStyle = "#000";
    ctx.strokeRect(icon.x, icon.y, icon.size, icon.size);
  });

  requestAnimationFrame(draw);
}

draw();
