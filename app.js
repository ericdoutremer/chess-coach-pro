let game;
let board;
let engine;
let mode="play";

function initMenu(){
document.getElementById("menu").style.display="block";
document.getElementById("gameArea").style.display="none";
}

function startGame(m){

mode = m;

document.getElementById("menu").style.display="none";
document.getElementById("gameArea").style.display="block";

setTimeout(initBoard,200);
}

function initBoard(){

game = new Chess();

board = Chessboard('board', {
position:'start',
draggable:true,
pieceTheme:"https://chessboardjs.com/img/chesspieces/wikipedia/{piece}.png",
onDrop:onDrop,
onSnapEnd:()=>board.position(game.fen())
});

engine = Stockfish();

document.getElementById("info").innerText="";
}

function onDrop(source,target){

let move = game.move({
from:source,
to:target,
promotion:'q'
});

if(!move) return 'snapback';

setTimeout(aiMove,400);
}

function aiMove(){

engine.postMessage("position fen " + game.fen());
engine.postMessage("go depth 10");

engine.onmessage = function(e){

if(e.data.includes("bestmove")){

let best = e.data.split(" ")[1];

game.move(best);
board.position(game.fen());
}
};
}

function newGame(){
initBoard();
}