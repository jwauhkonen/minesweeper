(function () {
	if (typeof Minesweeper === "undefined") {
		window.Minesweeper = {};
	}
	
	var BOARD_SIZE = 20;
	var BOMB_COUNT = 10;
	
	var Board = Minesweeper.Board = function () {
		this.gameBoard = this.generateBoard();
		// this.seedBombs();
		this.render();
	}
	
	// Board.prototype.seedBombs = function () {
	// 	var seededCoords = [];
	//
	// 	while (seededCoords.length < BOMB_COUNT) {
	// 		var newCoord = [Math.floor(Math.random() * BOARD_SIZE), Math.floor(Math.random() * BOARD_SIZE)];
	// 		if (seededCoords.indexOf(newCoord) === -1) {
	// 			seededCoords.push(newCoord);
	// 		}
	// 	}
	//
	// 	seededC
	// }
	
	Board.prototype.render = function () {
		var boardString = "";
		
		for (var i = 0; i < BOARD_SIZE; i++) {
			for (var j = 0; j < BOARD_SIZE; j++) {
				boardString += this.gameBoard[i][j].mark
			}
			boardString += '\n';
		}
		
		console.log(boardString);
	}
	
	Board.prototype.generateBoard = function () {
		var gameBoard = new Array(BOARD_SIZE);
		
		for (var i = 0; i < BOARD_SIZE; i++) {
			gameBoard[i] = new Array(BOARD_SIZE);
		}
		
		for (var j = 0; j < BOARD_SIZE; j++) {
			for (var k = 0; k < BOARD_SIZE; k++) {
				gameBoard[j][k] = new Minesweeper.Tile();
			}
		}
		
		return gameBoard;
	}
	
})();