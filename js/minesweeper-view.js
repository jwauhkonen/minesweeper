(function () {
	if (typeof Minesweeper === "undefined") {
		window.Minesweeper = {};
	}
	
	var View = Minesweeper.View = function ($el) {
		this.$el = $el;
		this.boardSize = 20;
		this.bombCount = 10;
		this.board = new Minesweeper.Board(this.boardSize, this.bombCount);
		this.render();
	}
	
	View.prototype.render = function () {
		this.$el.empty()
		
		for (var i = 0; i < this.boardSize; i++) {
			$row = $("<div class='row'></div>");
			for (var j = 0; j < this.boardSize; j++) {
				$tile = $("<div class='tile hidden'></div>");
				
				if (this.board.gameBoard[i][j].bombed) {
					$tile.addClass("bombed");
				}
				
				if (this.board.gameBoard[i][j].revealed) {
					$tile.removeClass("hidden");
				}
				
				$tile.html(this.board.gameBoard[i][j].neighborBombCount());
				
				$row.append($tile);
			}
			
			this.$el.append($row);
		}
	}
	
})();