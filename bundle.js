/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var SnakeView = __webpack_require__(2);
	
	$l(function(){
	  var $el = $l(".snake-game");
	  var snakeView = new SnakeView($el);
	});


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Board = __webpack_require__(3);
	
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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Snake = __webpack_require__(4);
	
	function Board(){
	  this.snake = new Snake();
	}
	
	
	module.exports = Board;


/***/ },
/* 4 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map