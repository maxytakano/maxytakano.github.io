/**
 * Created by mtakano on 1/2/15.
 */

var SideGUILayer = cc.Layer.extend({
    boardModel:null,
    whiteLabel:null,
    blackLabel:null,
    toggleCallback:null,
    ctor:function (model, toggleCallback) {
        this._super();
        this.init(model, toggleCallback);
    },
    init:function (model, toggleCallback) {
        this._super();

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
        cc.MenuItemFont.setFontSize(60);

        //Create a menu and assign onPlay event callback to it
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

        var menu = new cc.Menu(notationToggle);  //7. create the menu
        menu.setPosition(centerPos);
        this.addChild(menu);

    },
    update:function() {
        var whiteCaptures = this.boardModel.getCaptureCount(1);
        this.whiteLabel.setString("x    " + whiteCaptures);

        var blackCaptures = this.boardModel.getCaptureCount(-1);
        this.blackLabel.setString("x    " + blackCaptures);
    }
});