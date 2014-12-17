(function () {
	if (typeof Minesweeper === "undefined") {
		window.Minesweeper = {};
	}
	
	var View = Minesweeper.View = function ($el) {
		this.$el = $el;
		
		this.board = new Minesweeper.Board();
	}
	
})();