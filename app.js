let game;
let board;
let engine;

let playerElo = 1000;
let trainStep = 0;

function startGame(){

game = new Chess();

board = Chessboard('board', {
position:'start',
draggable:true,
pieceTheme:"https://chessboardjs.com/img/chesspieces/wikipedia/{piece}.png",
onDrop:onDrop,
onSnapEnd:()=>board.position(game.fen())
});

engine = Stockfish();

playerElo = 1000;
trainStep = 0;

document.getElementById("info").innerText = "";

}

function onDrop(source,target){

let move = game.move({
from:source,
to:target,
promotion:'q'
});

if(!move) return 'snapback';

// MODE TRAINING
if(document.getElementById("mode").value === "train"){
return trainingCheck(move);
}

// MODE PLAY
analyze(move,false);
updateElo(false);

setTimeout(aiMove,400);

checkGameOver();

}

function aiMove(){

let moves = game.moves();
if(!moves.length) return;

engine.postMessage("position fen " + game.fen());
engine.postMessage("go depth 12");

engine.onmessage = function(e){

if(e.data.includes("bestmove")){

let best = e.data.split(" ")[1];

game.move(best);
board.position(game.fen());

analyze({to:best},true);

updateElo(true);

checkGameOver();
}
};

}

function analyze(move,isAI){

let text="";

if(move.captured){
text="⚠️ échange";
}
else if(["e4","d4","e5","d5"].includes(move.to)){
text="✔ centre contrôlé";
}
else if(move.piece !== "p"){
text="♞ développement";
}
else{
text="♟ coup standard";
}

document.getElementById("info").innerText +=
(isAI?"🤖 ":"🧑 ")+text+"\n";

}

function updateElo(good){

if(good) playerElo += 5;
else playerElo -= 10;

if(playerElo < 400) playerElo = 400;

document.getElementById("eloDisplay").innerText =
"Elo joueur: " + playerElo;

}

function trainingCheck(move){

let opening = document.getElementById("opening").value;
let line = OPENINGS[opening];

let expected = line[trainStep];

if(game.fen().includes(expected.split(" ").pop())){
trainStep++;
document.getElementById("info").innerText =
"✔ bon coup ouverture ("+trainStep+"/"+line.length+")";
}
else{
document.getElementById("info").innerText =
"❌ hors répertoire";
}

}

function checkGameOver(){

if(game.in_checkmate()){
document.getElementById("info").innerText += "\n🏆 échec et mat";
}

if(game.in_draw()){
document.getElementById("info").innerText += "\n🤝 nulle";
}

}