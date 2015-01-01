var BoardController = cc.Scene.extend({
	boardModel:null,
	boardView:null,
	clickedAtCallback:null,
	onEnter:function () {
		this._super();

		// Initialize variables
		//this.playing = {
		//	'BLACK': 1,
		//	'WHITE': -1
		//};
		//this.turn = this.playing.BLACK;

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
				// Handle invalid move based on error code
				console.log("invalid move at:", x, y);
				

				return;
			}





			// after updating the board, update the view
			// TODO: (should happen via notification from model?)
			this.boardView.update();
		}.bind(this);


		// initialize the Model
		this.boardModel = new BoardModel(19, "KO");

		// initialize the View
		this.addChild(new BackgroundLayer());
		this.boardView = new GameLayer(this.boardModel, this.clickedAtCallback);
		this.addChild(this.boardView);
		//this.addChild(new GUILayer());

	}


});