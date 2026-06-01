let game;
let board;
let engine;

let playerElo = 1000;

function init(){

game = new Chess();

board = Chessboard('board', {
position:'start',
draggable:true,
pieceTheme:"https://chessboardjs.com/img/chesspieces/wikipedia/{piece}.png",
onDrop:onDrop,
onSnapEnd:()=>board.position(game.fen())
});

// STOCKFISH
engine = Stockfish();

}

function onDrop(source,target){

let move = game.move({
from:source,
to:target,
promotion:'q'
});

if(!move) return 'snapback';

let comment = analyze(move,false);

document.getElementById("info").innerHTML += "🧑 "+comment+"<br>";

updateElo(move,false);

setTimeout(aiMove,400);

checkGameOver();
}

function aiMove(){

let moves = game.moves();
if(!moves.length) return;

engine.postMessage("position fen " + game.fen());
engine.postMessage("go depth 12");

engine.onmessage = function(event){

if(event.data.includes("bestmove")){

let best = event.data.split(" ")[1];

game.move(best);
board.position(game.fen());

let comment = analyze({to:best},true);

document.getElementById("info").innerHTML += "🤖 "+comment+"<br>";

updateElo(best,true);

checkGameOver();
}
};

}

function analyze(move,isAI){

if(move.captured){
return "⚠️ échange";
}

if(["e4","d4","e5","d5"].includes(move.to)){
return "✔ centre contrôlé";
}

return "♟ coup joué";
}

function updateElo(move,isGood){

if(isGood) playerElo += 5;
else playerElo -= 10;

if(playerElo < 400) playerElo = 400;

document.getElementById("elo").innerText =
"Elo estimé: " + playerElo;
}

function checkGameOver(){

if(game.in_checkmate()){
document.getElementById("info").innerHTML += "🏆 Échec et mat<br>";
}

if(game.in_draw()){
document.getElementById("info").innerHTML += "🤝 Nulle<br>";
}
}

function newGame(){
game = new Chess();
board.start();
document.getElementById("info").innerHTML="";
playerElo=1000;
}

window.onload = init;