let game;
let board;
let gameOver=false;

function init(){

game = new Chess();

board = Chessboard('board', {
position:'start',
draggable:true,
pieceTheme:"https://chessboardjs.com/img/chesspieces/wikipedia/{piece}.png",
onDrop:onDrop,
onSnapEnd:()=>board.position(game.fen())
});

}

function onDrop(source,target){

if(gameOver) return 'snapback';

let move = game.move({
from:source,
to:target,
promotion:'q'
});

if(!move) return 'snapback';

coach(move,false);

checkGameOver();

setTimeout(aiMove,400);
}

function aiMove(){

if(gameOver) return;

let moves = game.moves({verbose:true});
if(!moves.length) return;

let elo = parseInt(document.getElementById("elo").value);

let move;

// 🟢 800 random
if(elo <= 800){
move = moves[Math.floor(Math.random()*moves.length)];
}

// 🟡 1000 centre
else if(elo <= 1000){
move = moves.find(m=>["e4","d4","e5","d5","c4"].includes(m.to))
|| moves[0];
}

// 🟠 1200 mix
else if(elo <= 1200){
move = moves[Math.floor(Math.random()*moves.length)];
}

// 🔵 1500 captures prioritaires
else if(elo <= 1500){
move = moves.sort((a,b)=>(b.captured?1:0)-(a.captured?1:0))[0];
}

// 🔴 1800 plus stable
else{
move = moves[Math.floor(Math.random()*moves.length)];
}

game.move(move);

board.position(game.fen());

coach(move,true);

checkGameOver();
}

function coach(move,isAI){

let text="";

if(move.captured){
text="⚠️ capture";
}
else if(["e4","d4","e5","d5"].includes(move.to)){
text="✔ contrôle du centre";
}
else if(move.piece !== 'p'){
text="♞ développement";
}
else{
text="♟ coup de pion";
}

document.getElementById("info").innerHTML +=
(isAI?"🤖 IA: ":"🧑 Vous: ")+text+"<br>";
}

function checkGameOver(){

if(game.in_checkmate()){
gameOver=true;
document.getElementById("info").innerHTML+="🏆 Échec et mat<br>";
}

if(game.in_draw()){
gameOver=true;
document.getElementById("info").innerHTML+="🤝 Nulle<br>";
}
}

function newGame(){

game=new Chess();
board.start();
gameOver=false;
document.getElementById("info").innerHTML="";
}

function hint(){

let moves = game.moves();

let best = moves.find(m=>["e4","d4","e5","d5"].includes(m.slice(-2)))
|| moves[0];

document.getElementById("info").innerHTML +=
"💡 Meilleur coup: "+best+"<br>";
}

init();