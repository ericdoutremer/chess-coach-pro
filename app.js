let board = [];
let selected = null;

const pieces = {
"r":"♜","n":"♞","b":"♝","q":"♛","k":"♚","p":"♟",
"R":"♖","N":"♘","B":"♗","Q":"♕","K":"♔","P":"♙"
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
<div class="square ${color}" onclick="move(${r},${c})">
${pieces[p] || ""}
</div>`;
}
}

document.getElementById("board").innerHTML = html;
}

function move(r,c){

if(selected){
let [sr,sc]=selected;

board[r][c]=board[sr][sc];
board[sr][sc]="";

selected=null;

render();

// 🤖 IA joue après toi
setTimeout(aiMove,300);

}else{
selected=[r,c];
}
}

function aiMove(){

let moves=[];

// IA très simple : cherche pièces noires
for(let r=0;r<8;r++){
for(let c=0;c<8;c++){

let p = board[r][c];
if(!p) continue;

// IA joue les noirs
if(p !== p.toLowerCase()) continue;

let dirs = [[1,0],[-1,0],[0,1],[0,-1]];

for(let d of dirs){
let nr=r+d[0], nc=c+d[1];

if(nr>=0 && nr<8 && nc>=0 && nc<8){

moves.push({fr:r,fc:c,tr:nr,tc:nc});
}
}
}
}

if(moves.length===0) return;

let m = moves[Math.floor(Math.random()*moves.length)];

board[m.tr][m.tc]=board[m.fr][m.fc];
board[m.fr][m.fc]="";

render();
}

function reset(){
init();
}