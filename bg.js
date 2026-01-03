const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let offset = 0;

function drawGrid() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = 1;
    
    for(let i=0;i<canvas.width;i+=40){
        ctx.beginPath();
        ctx.moveTo(i+offset,0);
        ctx.lineTo(i+offset,canvas.height);
        ctx.stroke();
    }
    for(let j=0;j<canvas.height;j+=40){
        ctx.beginPath();
        ctx.moveTo(0,j+offset);
        ctx.lineTo(canvas.width,j+offset);
        ctx.stroke();
    }
    offset += 0.5;
    requestAnimationFrame(drawGrid);
}
drawGrid();

window.addEventListener('resize', ()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
