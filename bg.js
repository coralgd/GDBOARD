const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let grid = {
  size: 50,  // размер клеток
  offsetX: 0,
  offsetY: 0,
  speed: 1
};

window.addEventListener("resize", ()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

function drawGrid(){
  ctx.fillStyle = "#111";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  ctx.strokeStyle = "cyan";
  ctx.lineWidth = 1;

  const diag = Math.sqrt(canvas.width**2 + canvas.height**2);

  // смещение для движения
  grid.offsetX += grid.speed;
  grid.offsetY += grid.speed;

  ctx.save();
  ctx.translate(-grid.offsetX, -grid.offsetY);
  ctx.rotate(Math.PI/4);

  for(let x=-diag; x<diag; x+=grid.size){
    ctx.beginPath();
    ctx.moveTo(x, -diag);
    ctx.lineTo(x, diag);
    ctx.stroke();
  }

  for(let y=-diag; y<diag; y+=grid.size){
    ctx.beginPath();
    ctx.moveTo(-diag, y);
    ctx.lineTo(diag, y);
    ctx.stroke();
  }

  ctx.restore();
  requestAnimationFrame(drawGrid);
}

drawGrid();
