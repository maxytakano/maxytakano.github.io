var MenuLayer = cc.Layer.extend({
	buttons:null,
	buttonSprites:null,
	selectedBoard:null,
	boardNames:null,
	selectedNames:null,
	ctor : function(){
		//1. call super class's ctor function
		this._super();
	},
	init:function(){
		//call super class's super function
		this._super();

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

				for (var i = 0; i < 4; i++) {
					if (cc.rectContainsPoint(target.buttonRectangles[i], location)) {
						target.selectBoard(i);
					}
				}
			}
		}), this);



		//4. create a background image and set it's position at the center of the screen
		var spriteBG = new cc.Sprite(res.menuBack1_png);
		spriteBG.setPosition(centerpos);
		this.addChild(spriteBG);

		//5.
		//cc.MenuItemFont.setFontSize(60);

		//6.create a menu and assign onPlay event callback to it
		var menuItemPlay = new cc.MenuItemSprite(
				new cc.Sprite(res.menuPlay_png), // normal state image
				new cc.Sprite(res.menuPlayS_png), // select state image
				this.onPlay, this);
		var menu = new cc.Menu(menuItemPlay);  //7. create the menu
		menu.setPosition(cc.p(winsize.width * 0.5, winsize.height * 0.75));
		this.addChild(menu);

		//7. Add board selection label
		// font definition
		var greenColor = cc.color(132, 182, 121);
		var blackColor = cc.color(0, 0, 0);



		// old
		var selectLabel = new cc.LabelTTF("Select A Board Size", "Helvetica", 48);
		selectLabel.setFontFillColor(blackColor);
		selectLabel.setPosition(cc.p(winsize.width/2, winsize.height * 0.57));
		selectLabel.enableStroke(greenColor, 3);
		this.addChild(selectLabel);


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

		var setupSprite = new cc.Sprite(res.select13x13_n_png);
		setupSprite.setScale(0.7);
		var scaleFactor = setupSprite.getScale();

		var sizeX = setupSprite.width * scaleFactor;
		var spacing = sizeX / 2;
		var splitNumber = (boards / 2) - 0.5;
		var start = (splitNumber * sizeX) + (splitNumber * spacing);

		for (var i = 0; i < boards; i++) {
			var testSprite = new cc.Sprite(this.boardNames[i]);		// TODO try set this equal to setupSprite

			testSprite.setPosition(winsize.width/2 - start + ((sizeX + spacing) * i), winsize.height * 0.4);
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


	},
	selectBoard:function(boardNumber) {

		for (var buttonSprite in this.buttonSprites) {
			this.buttonSprites[buttonSprite].setTexture(this.boardNames[buttonSprite]);
		}
		this.buttonSprites[boardNumber].setTexture(this.selectedNames[boardNumber]);
		this.selectedBoard = boardNumber;
	},
	onPlay : function(){
		// Scene to run from the menu scene, not yet set up
		cc.director.runScene(new BoardController(this.selectedBoard));
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


