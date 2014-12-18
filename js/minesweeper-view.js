(function () {
	if (typeof Minesweeper === "undefined") {
		window.Minesweeper = {};
	}
	
	var View = Minesweeper.View = function ($el) {
		this.$el = $el;
		this.$gameBoard = $("#game-board");
		this.$sidePanel = $("#side-panel");
		this.boardSize = 20;
		this.bombCount = 10;
		this.board = new Minesweeper.Board(this.boardSize, this.bombCount);
		
		this.renderBoard();
		this.renderSidePanel();
		this.$gameBoard.on("click", this.handleClick.bind(this));
	}
	
	View.prototype.renderBoard = function () {
		this.$gameBoard.empty()
		
		for (var i = 0; i < this.boardSize; i++) {
			$row = $("<div class='row'></div>");
			for (var j = 0; j < this.boardSize; j++) {
				var $tile = $("<div class='tile hidden'></div>");
				$tile.attr("coords", [i, j]);
				
				$tile.html(this.board.gameBoard[i][j].neighborBombCount());
				
				if (this.board.gameBoard[i][j].bombed) {
					$tile.empty();
					$tile.addClass("bombed");
				}
				
				if (this.board.gameBoard[i][j].revealed) {
					$tile.removeClass("hidden");
				}
				
				$row.append($tile);
			}
			
			this.$gameBoard.append($row);
		}
	}
	
	View.prototype.renderSidePanel = function () {
		
	}
	
	View.prototype.handleClick = function (event) {
		var tileCoords = $(event.target).attr("coords").split(",");
		
		this.board.gameBoard[tileCoords[0]][tileCoords[1]].reveal();
		this.renderBoard();
	}
	
})();