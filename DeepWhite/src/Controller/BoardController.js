var BoardController = cc.Scene.extend({
	// Model
	boardModel:null,
	influenceModel:null,
	// View
	influenceLayer:null,
	gridLayer:null,
	gameLayer:null,
	clickedAtCallback:null,
	notationCallback:null,
	// Side bar
	sideGUILayer:null,
	// Selections
	selectedBoard:null,
	selectedTheme:null,
	ctor:function(selectedBoard, selectedTheme) {
		this._super();
		this.selectedTheme = selectedTheme;
		this.selectedBoard = selectedBoard;
	},
	onEnter:function () {
		this._super();

		var sizes = [9,13,15,19];

		// The side GUI notifies the controller that the grid
		// toggle button was pressed by calling back this function
		this.notationCallback = function() {
			/* toggle the view's grid */
			// 1. Update Influence Layer
			this.influenceLayer.gridToggle();

			// 2. Update Grid layer
			this.gridLayer.gridToggle();

			// 3. Update UnderFX layer
			// TODO

			// 4. Update Game Layer
			this.gameLayer.gridToggle();

			// 5. Update OverFX Layer
			// TODO

		}.bind(this);

		// The view notifies the controller of user click location,
		// by calling back this function.
		// Note: not a class, don't use new
		this.clickedAtCallback = function(x, y) {

			var playAttempt = this.boardModel.isValidWithCode(x,y,this.boardModel.turn);

			// Check if playAttempt was valid  (equals true, not a number)
			if (typeof playAttempt != "number") {
				//console.log("valid move, playing at:", x, y);
				/**
				 * Plays a move on the board, and switches the turn
				 * 3rd param is color to play (use current turn)
				 * 4th param is whether to actually play or just test the move
				 */
				this.boardModel.play(x, y, this.boardModel.turn, false);

				// Update the influence model
				this.influenceModel.update();

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
			this.update();

			// let the ai play
			var move = this.basicAI.make_move();
			this.boardModel.play(move[0], move[1], this.boardModel.turn, false);

			// Update the influence model
			this.influenceModel.update();
			this.update();
			// pause for time? or display "thinking?"

			// update board again
		}.bind(this);

		/* initialize the Model */
		// 1. Board Model
		this.boardModel = new BoardModel(sizes[this.selectedBoard], "KO");

		// 2. Influence Model
		this.influenceModel = new InfluenceModel(this.boardModel);

		/* initialize the AI */
		this.basicAI = new BasicAI(this.boardModel, this.influenceModel);

		/* Initialize the View */
		// 1. Background Layer
		this.addChild(new BackgroundLayer(this.selectedTheme));

		// 2. Influence Layer
		// TODO: draw different based on theme?
		this.influenceLayer = new InfluenceLayer(this.boardModel, this.influenceModel);
		this.addChild(this.influenceLayer);

		// 3. Grid Layer
		// Only draw the grid for traditional
		// TODO: Make it so advanced still has notation, (pass theme in instead of if statement)
		if (this.selectedTheme == "traditional") {
			this.gridLayer = new GridLayer(this.selectedBoard);
			this.addChild(this.gridLayer);
		}

		// 4. UnderFX Layer

		// 5. Game Layer
		// TODO: remove influence model once done debug
		this.gameLayer = new GameLayer(this.boardModel, this.clickedAtCallback, this.selectedTheme, this.influenceModel);
		this.addChild(this.gameLayer);

		// 6. OverFX Layer

		/* Initialize the side bar */
		// 1. Side bar Background Layer
		this.addChild(new SideBackLayer());

		// 2. Side bar GUI Layer
		this.sideGUILayer = new SideGUILayer(this.boardModel, this.notationCallback);
		this.addChild(this.sideGUILayer);

	},
	update:function () {
		this.gameLayer.update();
		this.sideGUILayer.update();
		this.influenceLayer.update();

	}


});