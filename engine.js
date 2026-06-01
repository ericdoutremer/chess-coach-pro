let engine = Stockfish();

function aiMove(game, callback){

engine.postMessage("position fen " + game.fen());
engine.postMessage("go depth 12");

engine.onmessage = function(event){

let line = event.data;

if(line.includes("bestmove")){
let move = line.split(" ")[1];
callback(move);
}
};
}