let board = [];
let selected = null;

/* 🔥 PIÈCES EN IMAGES (ULTRA CLAIR, CROSS-BROWSER) */
const pieces = {
"r":"https://images.chesscomfiles.com/chess-themes/pieces/neo/150/br.png",
"n":"https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bn.png",
"b":"https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bb.png",
"q":"https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bq.png",
"k":"https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bk.png",
"p":"https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bp.png",

"R":"https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wr.png",
"N":"https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wn.png",
"B":"https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wb.png",
"Q":"https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wq.png",
"K":"https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wk.png",
"P":"https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wp.png"
};

function start(){
document.getElementById("menu").style.display="none";
document.getElementById("game").style.display="block";
init();
}

function init(){

board = [
["r","n","b","q","k","b","n","r"],
["p","p","p","p","p","p","p","p"],
["","","","","","","",""],
["","","","","","","",""],
["","","","","","","",""],
["","","","","","","",""],
["P","P","P","P","P","P","P","P"],
["R","N","B","Q","K","B","N","R"]
];

render();
}

function render(){

let html="";

for(let r=0;r<8;r++){
for(let c=0;c<8;c++){

let color = (r+c)%2===0 ? "white" : "black";
let p = board[r][c];

html += `
<div class="square ${color}" onclick="clickSquare(${r},${c})">
${p ? `<img src="${pieces[p]}" />` : ""}
</div>`;
}
}

document.getElementById("board").innerHTML = html;
}

function clickSquare(r,c){

if(selected){
let [sr,sc]=selected;

board[r][c]=board[sr][sc];
board[sr][sc]="";

selected=null;
render();
}else{
selected=[r,c];
}
}

function reset(){
init();
}