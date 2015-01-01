var BoardController = cc.Scene.extend({
	boardModel:null,
	boardView:null,
	clickedAtCallback:null,
	onEnter:function () {
		this._super();

		// The view notifies the controller of user click location,
		// by calling back this function.
		// Note: not a class, don't use new
		this.clickedAtCallback = function(x, y) {

			var playAttempt = this.boardModel.isValidWithCode(x,y,this.boardModel.turn);

			// Check if playAttempt was valid  (equals true, not a number)
			if (typeof playAttempt != "number") {
				console.log("valid move, playing at:", x, y);
				// Plays a move on the board, and switches the turn
				// 3rd param is color to play (use current turn)
				// 4th param is whether to actually play or just test the move
				this.boardModel.play(x, y, this.boardModel.turn, false);
			} else {
				// Handle invalid move based on error code and return
				if (playAttempt == 1) {
					console.log("invalid move: off the board");
				} else if (playAttempt == 2) {
					console.log("invalid move: already a stone there!");
				} else if (playAttempt == 3) {
					console.log("invalid move: suicide is not allowed");
				} else if (playAttempt == 4) {
					console.log("invalid move: KO! (repeating positions not allowed)");
				}
				return;
			}


			// after updating the board, update the view
			// TODO: (should happen via notification from model?)
			// TODO: make a function to update all relevant parts of the view (fx, hud)
			this.boardView.update();
		}.bind(this);

		// initialize the Model
		this.boardModel = new BoardModel(9, "KO");

		/* Initialize the View */
		// 1. Background Layer
		this.addChild(new BackgroundLayer());

		// 2. Influence Layer

		// 3. Grid Layer
		this.addChild(new GridLayer(this.boardModel.size));

		// 4. UnderFX Layer

		// 5. Game Layer
		this.boardView = new GameLayer(this.boardModel, this.clickedAtCallback);
		this.addChild(this.boardView);

		// 6. OverFX Layer

		/* Initialize the GUI */
		// 1. GUI Background Layer

		// 2. GUI Layer
		//this.addChild(new GUILayer());

	}


});