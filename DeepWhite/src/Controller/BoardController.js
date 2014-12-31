var BoardController = cc.Scene.extend({
	boardModel:null,
	boardView:null,
	clickedAtCallback:null,
	turn:null,
	playing:null,
	onEnter:function () {
		this._super();

		// Initialize variables
		this.playing = {
			'BLACK': 1,
			'WHITE': -1
		};
		this.turn = this.playing.BLACK;

		// The view notifies the controller of user click location,
		// by calling back this function.
		// Note: not a class, don't use new
		this.clickedAtCallback = function(x, y) {
			// handle off board clicks (do nothing)
			if (x == 0 || y == 0 || x == this.boardModel.size + 1 || y == this.boardModel.size + 1) {
				console.log("off the board");
				return;
			}
			// handle stone and suicide clicks (do nothing)
			if (this.boardModel.getStone(x-1,y-1) != 0) {
				console.log("clicking a stone");
				return;
			}

			// Check who is playing (white or black)
			if (this.turn == this.playing.BLACK) {
				this.boardModel.play(x-1,y-1,1,false);
				this.turn = this.playing.WHITE;
			} else if (this.turn == this.playing.WHITE) {
				this.boardModel.play(x-1,y-1,-1,false);
				this.turn = this.playing.BLACK;
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