const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 960;
canvas.height = 540;
let painting = false;
let draw_color = "#000000";
let draw_width = 2;
let restore_array = [];
let index = -1;

function stopPainting(){
    painting = false;

    if( event.type != "mouseout"){
      restore_array.push(ctx.getImageData(0,0,canvas.width,canvas.height));
      index += 1;
    }
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
  const x = event.offsetX;
  const y = event.offsetY;
  if(!painting){
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else{
      ctx.stroke();
      ctx.lineTo(x, y);
      ctx.lineCap = "round";
      ctx.lineJoin = "round"
      ctx.strokeStyle = draw_color;
      ctx.lineWidth = draw_width;
  }
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}

let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");
let r = 0;
let g = 0;
let b = 0;

closeBtn.addEventListener("click", ()=>{
  sidebar.classList.toggle("open");
  menuBtnChange();//calling the function(optional)
});

searchBtn.addEventListener("click", ()=>{ // Sidebar open when you click on the search iocn
  sidebar.classList.toggle("open");
  menuBtnChange(); //calling the function(optional)
});

// following are the code to change sidebar button(optional)
function menuBtnChange() {
 if(sidebar.classList.contains("open")){
   closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");//replacing the iocns class
 }else {
   closeBtn.classList.replace("bx-menu-alt-right","bx-menu");//replacing the iocns class
 }
}

function close_tab(){
    window.close();
}

function download(){
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "image.png";
  link.click();
}

function undo_last(){
  if (index <= 0 ){
    window.location.reload(true);
  }else{
    index -= 1;
    restore_array.pop();
    ctx.putImageData(restore_array[index], 0, 0);
  }
}