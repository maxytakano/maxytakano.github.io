var BoardController = cc.Scene.extend({
	// Model
	boardModel:null,
	//influenceMap:null,
	influenceModel:null,
	// View
	boardGUILayer:null,
	influenceLayer:null,
	gridLayer:null,
	gameLayer:null,
	clickedAtCallback:null,
	notationCallback:null,
	influenceCallback:null,
	testingCallback:null,
	// Side bar
	sideGUILayer:null,
	// Selections
	selectedBoard:null,
	selectedTheme:null,
	// testing state
	testMode:null,
	number_test_moves:null,


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

		// call back for picking influence maps
		this.influenceCallback = function(selected_map) {
			this.influenceModel.select_map(selected_map);

			// update the view?
			this.update();
		}.bind(this);

		// call back entering testing mode
		this.testingCallback = function() {
			if (this.testMode == true) {
				this.testMode = false;

				// pop x number times where x was number moves played
				// in the test mode.
				for (var i = 0; i < this.number_test_moves; i++) {
					this.boardModel.popPosition();
				}

				// reset the influence model
				this.influenceModel.update();
				this.update();
			} else {
				// start counting test moves so we can reset back
				this.testMode = true;
				this.number_test_moves = 0;
			}
		}.bind(this);


		// The view notifies the controller of user click location,
		// by calling back this function.
		// Note: not a class, don't use new
		this.clickedAtCallback = function(x, y) {

			var blackColor = cc.color(0, 0, 0);
			var whiteColor = cc.color(255, 255, 255);

			var playAttempt = this.boardModel.isValidWithCode(x,y,this.boardModel.turn);

			// Check if playAttempt was valid  (equals true, not a number)
			if (typeof playAttempt != "number") {

				// if normal mode, play the piece and add a number otherwise
				// save the board state and set the board to that one after clicking the button again
				// also add an undo button while in this state
				if (this.testMode == true) {
					this.number_test_moves += 1;
					this.boardModel.play(x, y, this.boardModel.turn, false);
					this.influenceModel.update();
				} else {
					// Plays a move on the board, and switches the turn
					// 3rd param is color to play (use current turn)
					// 4th param is whether to actually play or just test the move
					this.boardModel.play(x, y, this.boardModel.turn, false);

					// TODO: this seems hacky and doesn't follow normal gui pattern
					// TODO: model should keep track of order pieces played and draw them all each update
					this.boardGUILayer.add_number(x, y, whiteColor);

					// Update the influence model
					this.influenceModel.update();
				}

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


			// update the view
			// TODO: (should this happen via notification from model?)
			// TODO: make a function to update all relevant parts of the view (fx, hud)
			//this.update();

			///// AI MOVE SECTION /////
			// new
			//var move = this.basicAI.make_move();
			//this.boardGUILayer.markBest(move[0], move[1]);
			//// Update the influence model
			//this.influenceModel.update();
			//// update the view
			//this.update();

			// old
			//var move = this.basicAI.make_move();
			//
			//// white plays using the x and y from the move.
			//this.boardModel.play(move[0], move[1], this.boardModel.turn, false);
            //
			//// TODO: this seems hacky and doesn't follow normal gui pattern
			//// TODO: model should keep track of order pieces played and draw them all each update
			//this.boardGUILayer.add_number(move[0], move[1], blackColor);
            //
			//// Update the influence model
			//this.influenceModel.update();
            //
			//// update the view
			this.update();

		}.bind(this);

		///// Initialization /////

		///// Model section /////
		// 1. Board Model
		this.boardModel = new BoardModel(sizes[this.selectedBoard], "KO");

		///// 2. Influence Model /////
		// 1. Influence Map
		//this.influenceMap = new InfluenceMap(this.boardModel);
		// 2. Tension Map
		// 3. Vulnerability Map
		//this.influenceModel = new InfluenceModel(this.boardModel, this.influenceMap);
		this.influenceModel = new InfluenceModel(this.boardModel);


		///// AI section /////
		this.basicAI = new BasicAI(this.boardModel, this.influenceModel);

		///// View section /////
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

		// 7. ??? not sure about this Board GUI Layer
		this.boardGUILayer = new BoardGUILayer(this.boardModel);
		this.addChild(this.boardGUILayer);

		/* Initialize the side bar */
		// 1. Side bar Background Layer
		this.addChild(new SideBackLayer());

		// 2. Side bar GUI Layer
		this.sideGUILayer = new SideGUILayer(this.boardModel, this.notationCallback,
			this.influenceCallback, this.testingCallback);
		this.addChild(this.sideGUILayer);



	},
	update:function () {
		this.gameLayer.update();
		//this.sideGUILayer.update();
		this.influenceLayer.update();
		this.boardGUILayer.update();
	}


});