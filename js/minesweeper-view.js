(function () {
	if (typeof Minesweeper === "undefined") {
		window.Minesweeper = {};
	}
	
	var View = Minesweeper.View = function ($el) {
		this.$el = $el;
		this.$gameBoard = $("#game-board");
		this.$sidePanel = $("#side-panel");
		this.boardSize = 15;
		this.bombCount = 20;
		this.bombsLeft = this.bombCount;
		this.board = new Minesweeper.Board(this.boardSize, this.bombCount);
		
		this.renderBoard();
		this.renderSidePanel();
		this.$gameBoard.on("click", this.handleClick.bind(this));
		this.$gameBoard.on("contextmenu", this.handleRightClick.bind(this));
	}
	
	View.prototype.renderBoard = function () {
		this.$gameBoard.empty()
		
		for (var i = 0; i < this.boardSize; i++) {
			$row = $("<div class='row'></div>");
			for (var j = 0; j < this.boardSize; j++) {
				var $tile = $("<div class='tile hidden'></div>");
				$tile.attr("coords", [i, j]);
				
				if (this.board.gameBoard[i][j].neighborBombCount() === 0) {
					$tile.empty();
				} else {
					$tile.html(this.board.gameBoard[i][j].neighborBombCount());
				}
				
				if (this.board.gameBoard[i][j].bombed) {
					$tile.empty();
					$tile.addClass("bombed");
				}
				
				if (this.board.gameBoard[i][j].revealed) {
					$tile.removeClass("hidden");
				}
				
				if (this.board.gameBoard[i][j].flagged) {
					$tile.addClass("flagged");
				}
				
				$row.append($tile);
			}
			this.$gameBoard.append($row);
		}
		
		var boardWidth = (this.boardSize * 20)
		$("#side-panel").css("width", boardWidth);
		$("#game-board").css("width", boardWidth);
		$("#bomb-count").html(this.bombCount);
	}
	
	View.prototype.renderSidePanel = function () {
		
	}
	
	View.prototype.handleClick = function (event) {
		var tileCoords = $(event.target).attr("coords").split(",");
		
		this.board.gameBoard[tileCoords[0]][tileCoords[1]].reveal();
		this.renderBoard();
	}
	
	View.prototype.handleRightClick = function (event) {
		event.preventDefault();
		var tileCoords = $(event.target).attr("coords").split(",");
		var tile = this.board.gameBoard[tileCoords[0]][tileCoords[1]];
		
		if (!tile.revealed) {
			if (tile.flagged) {
				tile.flagged = false;
				this.bombCount += 1;
			} else {
				tile.flagged = true;
				this.bombCount -= 1;
			}
		}
		
		this.renderBoard();
	}
	
})();