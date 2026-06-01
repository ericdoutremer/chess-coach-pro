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

setTimeout(()=>{
let ai = aiMove(game);
if(ai) game.move(ai);
board.position(game.fen());
},400);

checkGameOver();

}

function checkGameOver(){

if(game.in_checkmate()){
gameOver=true;
document.getElementById("info").innerText="🏆 Échec et mat";
}

if(game.in_draw()){
gameOver=true;
document.getElementById("info").innerText="🤝 Nulle";
}

}

function newGame(){
game = new Chess();
board.start();
gameOver=false;
document.getElementById("info").innerText="";
}

init();