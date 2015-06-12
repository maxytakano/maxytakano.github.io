var MenuLayer = cc.Layer.extend({
	buttonSprites:null,
	buttonRectangles:null,
	themeSprites:null,
	themeRectangles:null,
	selectedBoard:null,
	selectedTheme:null,
	boardNames:null,
	selectedNames:null,
	themeNames:null,
	themeSelectNames:null,

	// associative maps
	themeMap:null,
	ctor : function(){
		//1. call super class's ctor function
		this._super();
	},
	init:function(){
		//call super class's super function
		this._super();

		this.themeMap = {
			0 : "advanced",
			1 : "traditional"
		};

		//2. get the screen size of your game canvas
		var winsize = cc.director.getWinSize();

		//3. calculate the center point
		var centerpos = cc.p(winsize.width / 2, winsize.height / 2);

		cc.eventManager.addListener(cc.EventListener.create({
			event: cc.EventListener.TOUCH_ALL_AT_ONCE,
			onTouchesEnded: function(touches, event){
				var target = event.getCurrentTarget();

				//Add a new body/atlas sprite at the touched location
				var touch = touches[0];
				var location = touch.getLocation();

				// Board selection button checks
				for (var i = 0; i < 4; i++) {
					if (cc.rectContainsPoint(target.buttonRectangles[i], location)) {
						target.selectBoard(i);
					}
				}

				// Theme selection button checks
				for (var i = 0; i < 2; i++) {
					if (cc.rectContainsPoint(target.themeRectangles[i], location)) {
						target.selectTheme(i);
					}
				}
			}
		}), this);

		//4. create a background image and set it's position at the center of the screen
		var spriteBG = new cc.Sprite(res.menuBack1_png);
		spriteBG.setPosition(centerpos);
		this.addChild(spriteBG);

		//7. Add title label
		var greenColor = cc.color(132, 182, 121);
		var whiteColor = cc.color(255, 255, 255);
		var selectLabel = new cc.LabelTTF("DeepWhite", "Helvetica", 70);
		selectLabel.setFontFillColor(whiteColor);
		selectLabel.setPosition(cc.p(winsize.width/2, winsize.height * 0.87));
		selectLabel.enableStroke(greenColor, 3);
		this.addChild(selectLabel);

		//7. Add board selection label
		var greenColor = cc.color(132, 182, 121);
		var blackColor = cc.color(0, 0, 0);
		var selectLabel = new cc.LabelTTF("Select A Board Size", "Helvetica", 48);
		selectLabel.setFontFillColor(blackColor);
		selectLabel.setPosition(cc.p(winsize.width/2, winsize.height * 0.67));
		selectLabel.enableStroke(greenColor, 3);
		this.addChild(selectLabel);

		//6.create a menu and assign onPlay event callback to it
		var menuItemPlay = new cc.MenuItemSprite(
				new cc.Sprite(res.menuPlay_png), // normal state image
				new cc.Sprite(res.menuPlayS_png), // select state image
				this.onPlay, this);
		var menu = new cc.Menu(menuItemPlay);  //7. create the menu
		menu.setPosition(cc.p(winsize.width * 0.70, winsize.height * 0.20));
		this.addChild(menu);



		// 8. Board selection buttons
		// Create board selection Sprites
		this.buttonSprites = [];	// Array to hold board button sprites
		this.buttonRectangles = [];			// Array to hold board button bounding rectangles


		this.boardNames = [
			"res/menuButtons/select9x9_n.png",
			"res/menuButtons/select13x13_n.png",
			"res/menuButtons/select15x15_n.png",
			"res/menuButtons/select19x19_n.png"
		];
		this.selectedNames = [
			"res/menuButtons/select9x9_s.png",
			"res/menuButtons/select13x13_s.png",
			"res/menuButtons/select15x15_s.png",
			"res/menuButtons/select19x19_s.png"
		];
		var boards = 4;		// Number of board options

		// Temporary sprite to make correct size buttons.
		var setupSprite = new cc.Sprite(res.select13x13_n_png);
		setupSprite.setScale(0.7);
		var scaleFactor = setupSprite.getScale();

		var sizeX = setupSprite.width * scaleFactor;
		var spacing = sizeX / 2;
		var splitNumber = (boards / 2) - 0.5;
		var start = (splitNumber * sizeX) + (splitNumber * spacing);

		for (var i = 0; i < boards; i++) {
			var testSprite = new cc.Sprite(this.boardNames[i]);

			testSprite.setPosition(winsize.width/2 - start + ((sizeX + spacing) * i), winsize.height * 0.45);
			testSprite.setScale(scaleFactor);
			this.buttonSprites[i] = testSprite;
			this.addChild(testSprite);

			var boxX = testSprite.getPosition().x;
			var boxY = testSprite.getPosition().y;
			var boxWidth = testSprite.width * scaleFactor;
			var boxHeight = testSprite.height * scaleFactor;

			// Rectangle to act as the button for testSprite
			this.buttonRectangles[i] = cc.rect(boxX - boxWidth / 2, boxY - boxHeight / 2, boxWidth, boxHeight);
		}

		this.selectBoard(3);

		// 9. Theme selection label
		// 10. Theme selection buttons
		// Create board selection Sprites
		this.themeSprites = [];	// Array to hold board button sprites
		this.themeRectangles = [];			// Array to hold board button bounding rectangles


		this.themeNames = [
			"res/menuButtons/future_n.png",
			"res/menuButtons/classic_n.png"
		];
		this.themeSelectNames = [
			"res/menuButtons/future_s.png",
			"res/menuButtons/classic_s.png"
		];
		var themes = 2;		// Number of board options


		for (var i = 0; i < themes; i++) {
			var testSprite = new cc.Sprite(this.themeNames[i]);

			testSprite.setPosition(winsize.width/2 - start + ((sizeX + spacing) * i), winsize.height * 0.2);
			testSprite.setScale(scaleFactor);
			this.themeSprites[i] = testSprite;
			this.addChild(testSprite);

			var boxX = testSprite.getPosition().x;
			var boxY = testSprite.getPosition().y;
			var boxWidth = testSprite.width * scaleFactor;
			var boxHeight = testSprite.height * scaleFactor;

			// Rectangle to act as the button for testSprite
			this.themeRectangles[i] = cc.rect(boxX - boxWidth / 2, boxY - boxHeight / 2, boxWidth, boxHeight);
		}

		this.selectTheme(0);


	},
	selectBoard:function(boardNumber) {

		for (var buttonSprite in this.buttonSprites) {
			this.buttonSprites[buttonSprite].setTexture(this.boardNames[buttonSprite]);
		}
		this.buttonSprites[boardNumber].setTexture(this.selectedNames[boardNumber]);
		this.selectedBoard = boardNumber;
	},
	selectTheme:function(themeNumber) {

		for (var themeSprite in this.themeSprites) {
			this.themeSprites[themeSprite].setTexture(this.themeNames[themeSprite]);
		}
		this.themeSprites[themeNumber].setTexture(this.themeSelectNames[themeNumber]);
		this.selectedTheme = themeNumber;
	},
	onPlay : function(){
		// Scene to run from the menu scene, not yet set up
		// Selected board 0-3, selected theme 0-1
		var theme = this.themeMap[this.selectedTheme];
		cc.director.runScene(new BoardController(this.selectedBoard, theme));
	}
});

var MenuScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new MenuLayer();
		layer.init();
		this.addChild(layer);
	}
});


