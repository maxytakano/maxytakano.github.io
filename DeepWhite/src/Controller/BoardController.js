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
			if (x == 0 || y == 0 || x == this.boardModel.size + 1 || y == this.boardModel.size + 1) {
				//console.log("off the board");
			}

			//this.boardModel.play(x,y,1,false);

			this.boardModel.play(x-1,y-1,1,false);
			//console.log("clicked at", x, y)

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