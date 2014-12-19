(function () {
	if (typeof Minesweeper === "undefined") {
		window.Minesweeper = {};
	}
	
	var Tile = Minesweeper.Tile = function (board, coords) {
		this.mark = "|_|";
		this.bombed = false;
		this.revealed = false;
		this.flagged = false;
		this.board = board;
		this.coords = coords;
	}
	
	Tile.prototype.validCoords = function (coords) {
		if ((coords[0] < 0) || (coords[0] >= this.board.boardSize)) {
			return false;
		}
		if ((coords[1] < 0) || (coords[1] >= this.board.boardSize)) {
			return false;
		}
		return true;
	}
	
	Tile.prototype.neighbors = function () {
		var deltas = [[1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1], [0, 1]];
		var neighbors = [];
		
		deltas.forEach( function (delta) {
			if (this.validCoords([this.coords[0] + delta[0],this.coords[1] + delta[1]])) {
				var neighbor = this.board.gameBoard[this.coords[0] + delta[0]][this.coords[1] + delta[1]];
				neighbors.push(neighbor)
			}
		}.bind(this))
		
		return neighbors;
	}
	
	Tile.prototype.neighborBombCount = function () {
		var count = 0;
		
		this.neighbors().forEach( function (neighbor) {
			if (neighbor.bombed) {
				count += 1;
			}
		})
		
		return count;
	}
	
	Tile.prototype.reveal = function () {
		if (!this.flagged) {
			this.revealed = true;
		
			if (this.bombed) {
				this.board.gameLoss();
			} else {
				if (this.board.checkForWin()) {
					this.board.gameWin();
				}
			}
		
			if (this.neighborBombCount() === 0) {
				this.neighbors().forEach( function (neighbor) {
					if (neighbor.revealed === false) {
						neighbor.reveal();
					}
				})
			}
		}
	}
	
	Tile.prototype.flag = function () {
		if (!this.revealed) {
			if (this.flagged) {
				this.flagged = false;
			} else {
				this.flagged = true;
			}
		}
	}
	
})();