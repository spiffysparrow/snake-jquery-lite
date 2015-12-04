var Board = require("./board.js");

function SnakeView($el){
  this.$el = $el;
  this.board = new Board();
  window.addEventListener("keydown", this.handleKeyDown.bind(this));
  this.setupGrid();
  setInterval(this.step.bind(this), 500);
}

var arrowKeys = {
  38: "N",
  39: "E",
  40: "S",
  37: "W"
};

SnakeView.prototype.handleKeyDown = function(e){
  var dir = arrowKeys[e.keyCode];
  this.board.snake.turn(dir);
};

SnakeView.prototype.step = function(){
  this.board.snake.move();
};

var gridSize = 10;

SnakeView.prototype.setupGrid = function(){
  var thisSnake = this;
  for (var i = 0; i < gridSize; i++) {
    var $row = $l("<div>");
    $row.addClass("row");
    for (var j = 0; j < gridSize; j++) {
      var $square = $l("<div>");
      $square.addClass("square");
      $square.attr("pos", [i,j]);
      console.log($square);
      $row.append($square);
    }
    this.$el.append($row);
  }
};

module.exports = SnakeView;
