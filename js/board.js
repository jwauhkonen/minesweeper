(function () {
	if (typeof Minesweeper === "undefined") {
		window.Minesweeper = {};
	}
	
	var Board = Minesweeper.Board = function (boardSize, bombCount) {
		this.boardSize = boardSize;
		this.bombCount = bombCount;
		this.gameBoard = this.generateBoard();
		this.seededCoords = this.seedBombs();
		this.render();
	}
	
	Board.prototype.seedBombs = function () {
		var seededCoords = [];

		while (seededCoords.length < this.bombCount) {
			var newCoord = [Math.floor(Math.random() * this.boardSize), Math.floor(Math.random() * this.boardSize)];
			if (seededCoords.indexOf(newCoord) === -1) {
				seededCoords.push(newCoord);
			}
		}
		
		seededCoords.forEach( function (coord) {
			this.gameBoard[coord[0]][coord[1]].bombed = true;
			this.gameBoard[coord[0]][coord[1]].mark = "|b|";
		}.bind(this))
		
		return seededCoords;
	}
	
	Board.prototype.render = function () {
		var boardString = "";
		
		for (var i = 0; i < this.boardSize; i++) {
			for (var j = 0; j < this.boardSize; j++) {
				boardString += this.gameBoard[i][j].mark
			}
			boardString += '\n';
		}
		
		console.log(boardString);
	}
	
	Board.prototype.generateBoard = function () {
		var gameBoard = new Array(this.boardSize);
		
		for (var i = 0; i < this.boardSize; i++) {
			gameBoard[i] = new Array(this.boardSize);
		}
		
		for (var j = 0; j < this.boardSize; j++) {
			for (var k = 0; k < this.boardSize; k++) {
				gameBoard[j][k] = new Minesweeper.Tile();
			}
		}
		
		return gameBoard;
	}
	
})();