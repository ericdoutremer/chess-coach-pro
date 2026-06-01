function aiMove(game){

let moves = game.moves();

if(!moves.length) return null;

// IA simple mais stable (style Chess.com débutant)
let center = ["e4","d4","e5","d5","c4"];

let good = moves.find(m =>
center.includes(m.slice(-2))
);

if(good) return good;

return moves[Math.floor(Math.random()*moves.length)];
}