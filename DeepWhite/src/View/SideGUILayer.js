/**
 * Created by mtakano on 1/2/15.
 */

var SideGUILayer = cc.Layer.extend({
    boardModel:null,
    whiteLabel:null,
    blackLabel:null,
    toggleCallback:null,
    //buttonRectangles:null,
    //buttonSprites:null,
    //buttonNames:null,
    //selectedNames:null,
    ctor:function (model, toggleCallback) {
        this._super();
        this.init(model, toggleCallback);
    },
    init:function (model, toggleCallback) {
        this._super();

        // TODO: figure something different out, can only have one listener in the view
        // TODO: for clicks, need to do all in one layer or use menu or figure something
        // TODO: else out
        // Setup touch handling
        //cc.eventManager.addListener(cc.EventListener.create({
        //    event: cc.EventListener.TOUCH_ALL_AT_ONCE,
        //    onTouchesEnded: function(touches, event){
        //        var target = event.getCurrentTarget();
        //
        //        console.log("how");
        //
        //        //Add a new body/atlas sprite at the touched location
        //        var touch = touches[0];
        //        var location = touch.getLocation();
        //
        //        for (var buttonRectangle in target.buttonRectangles) {
        //            console.log("hueeeadsfe");
        //            if (cc.rectContainsPoint(target.buttonRectangles[buttonRectangle], location)) {
        //                console.log("hueeee");
        //            }
        //        }
        //
        //    }
        //}), this);


        this.boardModel = model;
        this.toggleCallback = toggleCallback;

        var winSize = cc.director.getWinSize();
        var localSize = winSize.width / 4;


        // center of side GUI
        var centerPos = cc.p(localSize * 3.5, winSize.height * 0.5);

        // Black capture indicator
        var blackStone = new cc.Sprite(res.blackStone_png);
        blackStone.setScale((localSize / blackStone.getContentSize().width) / 5);
        blackStone.setPosition(cc.p(localSize * 3.25, winSize.height * 0.925));
        this.addChild(blackStone);

        var blackString = "x    " + 0;
        this.blackLabel = new cc.LabelTTF(blackString,
                "Helvetica", 20, cc.size(this.tileSize, this.tileSize), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_TOP);

        this.blackLabel.x = (localSize * 3.6);
        this.blackLabel.y = (winSize.height * 0.925);
        this. blackLabel.color = cc.color(0, 0, 0);

        this.addChild(this.blackLabel);


        // White capture indicator
        var whiteStone = new cc.Sprite(res.whiteStone_png);
        whiteStone.setScale((localSize / whiteStone.getContentSize().width) / 5);
        whiteStone.setPosition(cc.p(localSize * 3.25, winSize.height * 0.85));
        this.addChild(whiteStone);

        var whiteString = "x    " + 0;
        this.whiteLabel = new cc.LabelTTF(whiteString,
            "Helvetica", 20, cc.size(this.tileSize, this.tileSize), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_TOP);

        this.whiteLabel.x = (localSize * 3.6);
        this.whiteLabel.y = (winSize.height * 0.85);
        this.whiteLabel.color = cc.color(0, 0, 0);

        this.addChild(this.whiteLabel);


        // Grid toggle button
        var notationOn = new cc.MenuItemSprite(
            new cc.Sprite(res.notationON_png), // normal state image
            new cc.Sprite(res.notationON_png) //select state image
        );
        notationOn.setScale(0.5);
        var notationOff = new cc.MenuItemSprite(
            new cc.Sprite(res.notationOFF_png), // normal state image
            new cc.Sprite(res.notationOFF_png) //select state image
        );
        notationOff.setScale(0.5);

        var notationToggle = new cc.MenuItemToggle( notationOn, notationOff, this.toggleCallback, this)
        notationToggle.setPosition(cc.p(localSize * 3.5, winSize.height * 0.5));

        // Menu button
        var menuButton = new cc.MenuItemSprite(
            new cc.Sprite(res.menuButton_png), // normal state image
            new cc.Sprite(res.menuButton_s_png), //select state image
            this.toMenu, this
        );
        menuButton.setScale(0.5);
        menuButton.setPosition(cc.p(localSize * 3.5, winSize.height * 0.3));

        var menu = new cc.Menu(notationToggle, menuButton);  //7. create the menu
        menu.setPosition(cc.p(0,0));
        this.addChild(menu);



        //// TODO: figure something different out, can only have one listener in the view
        //// TODO: for clicks, need to do all in one layer or use menu or figure something
        //// TODO: else out
        //// New button system
        //// Create board selection Sprites
        //this.buttonSprites = [];	// Array to hold board button sprites
        //this.buttonRectangles = [];			// Array to hold board button bounding rectangles
        //
        //
        //this.buttonNames = [
        //    "res/menuButtons/select9x9_n.png",
        //];
        //this.selectedNames = [
        //    "res/menuButtons/select9x9_s.png",
        //];
        //
        //
        //var testSprite = new cc.Sprite(res.select13x13_n_png);
        //var scaleFactor = 0.7;
        //
        //testSprite.setPosition(cc.p(localSize * 3.5, winSize.height * 0.3));
        //testSprite.setScale(scaleFactor);
        //this.buttonSprites.push(testSprite);
        //this.addChild(testSprite);
        //
        //var boxX = testSprite.getPosition().x;
        //var boxY = testSprite.getPosition().y;
        //var boxWidth = testSprite.width * scaleFactor;
        //var boxHeight = testSprite.height * scaleFactor;
        //
        //// Rectangle to act as the button for testSprite
        //this.buttonRectangles.push(cc.rect(boxX - boxWidth / 2, boxY - boxHeight / 2, boxWidth, boxHeight));




    },
    toMenu:function() {
        // Scene to run from the menu scene, not yet set up
        cc.director.runScene(new MenuScene());
    },
    update:function() {
        var whiteCaptures = this.boardModel.getCaptureCount(1);
        this.whiteLabel.setString("x    " + whiteCaptures);

        var blackCaptures = this.boardModel.getCaptureCount(-1);
        this.blackLabel.setString("x    " + blackCaptures);
    }
});