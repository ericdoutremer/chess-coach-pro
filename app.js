alert("APP JS CHARGÉ");
let board = [];
let selected = null;

const pieces = {
"r":"♜","n":"♞","b":"♝","q":"♛","k":"♚","p":"♟",
"R":"♖","N":"♘","B":"♗","Q":"♕","K":"♔","P":"♙"
};

function start(){
document.getElementById("menu").style.display="none";
document.getElementById("game").style.display="flex";
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
${pieces[p] ? pieces[p] : ""}
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