(function () {
	if (typeof Minesweeper === "undefined") {
		window.Minesweeper = {};
	}
	
	var Board = Minesweeper.Board = function (boardSize, bombCount) {
		this.boardSize = boardSize;
		this.bombCount = bombCount;
		this.gameBoard = this.generateBoard();
		this.seededCoords = this.seedBombs();
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
	
	
	Board.prototype.generateBoard = function () {
		var gameBoard = new Array(this.boardSize);
		
		for (var i = 0; i < this.boardSize; i++) {
			gameBoard[i] = new Array(this.boardSize);
		}
		
		for (var j = 0; j < this.boardSize; j++) {
			for (var k = 0; k < this.boardSize; k++) {
				gameBoard[j][k] = new Minesweeper.Tile(this, [j, k]);
			}
		}
		
		return gameBoard;
	}
	
	Board.prototype.checkForWin = function () {
		for (var i = 0; i < this.boardSize; i++) {
			for (var j = 0; j < this.boardSize; j++) {
				var tile = this.gameBoard[i][j];
				
				if ((tile.revealed === false) && (tile.bombed === false)) {
					return false;
				}
			}
		}
		
		return true;
	}
	
	Board.prototype.gameLoss = function () {
		console.log("You Lose!!!!!!");
		
		for (var i = 0; i < this.boardSize; i++) {
			for (var j = 0; j < this.boardSize; j++) {
				this.gameBoard[i][j].revealed = true;
			}
		}
		
		$("#side-panel").html("<h1>You Lose!</h1>");
	}
	
	Board.prototype.gameWin = function () {
		console.log("You Win!!!!!!");
		
		for (var i = 0; i < this.boardSize; i++) {
			for (var j = 0; j < this.boardSize; j++) {
				this.gameBoard[i][j].revealed = true;
			}
		}
		
		$("#side-panel").html("<h1>You Win!</h1>");
	}
	
})();