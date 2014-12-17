(function () {
	if (typeof Minesweeper === "undefined") {
		window.Minesweeper = {};
	}
	
	var BOARD_SIZE = 20;
	var BOMB_COUNT = 10;
	
	var Board = Minesweeper.Board = function () {
		this.seedBombs();
	}
	
	Board.prototype.seedBombs = function() {
		
	}
	
	Board.prototype.render = function() {
		var boardString = "";
		
		for (var i = 0; i < BOARD_SIZE; i++) {
			for (var j = 0; j < BOARD_SIZE; j++) {
				
			}
		}
	}
	
})();