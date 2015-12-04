var directions = {"N": [-1,0], "E": [0,-1], "S": [1,0], "W": [0,1]};

function Snake(){
  this.direction = "S";
  this.segments = [[50,50]];

}

Snake.prototype.move = function(){
  var moveDir = directions[this.direction];
  var head = this.segments[this.segments.length-1];
  var newSegment = [(head[0] + moveDir[0]), (head[1] + moveDir[1])];
  this.segments.push(newSegment);
  this.segments.shift();
};

Snake.prototype.turn = function(newDir){
  this.direction = newDir;
};



var mySnake = new Snake();

console.log(mySnake.segments);
mySnake.move();
console.log(mySnake.segments);

module.exports = Snake;
