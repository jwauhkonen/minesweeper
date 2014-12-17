(function () {
	if (typeof Minesweeper === "undefined") {
		window.Minesweeper = {};
	}
	
	var Tile = Minesweeper.Tile = function () {
		this.mark = "_";
	}
})();