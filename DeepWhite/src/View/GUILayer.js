var GUILayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        this.init();
    },

    init:function () {
        this._super();
        var winSize = cc.director.getWinSize();

        var centerPos = cc.p(winSize.width / 2, winSize.height / 2);

        var spriteBG = new cc.Sprite(res.BasicBoard_png);

        spriteBG.setScaleX(winSize.width / spriteBG.getContentSize().width);
        spriteBG.setScaleY(winSize.height / spriteBG.getContentSize().height);


        spriteBG.setPosition(centerPos);
        this.addChild(spriteBG);
        //// 1. Divide the screen into board size + 2 tiles
        //var tileSize = winSize.width / 21.0;
        //var centerPos = cc.p(winSize.width / 2, winSize.height / 2);
        //
        //
        //// Test model
        ////4. create a background image and set it's position at the center of the screen
        //var testing = new cc.Sprite(res.whiteStone_png);
        //testing.setPosition(centerPos);
        //testing.z = -10;
        //this.addChild(testing);


        //
        //var testPiece;
        //
        //// 2. Render the model
        //for (i = 0; i < 21; i++) {
        //    for (j = 0; j < 21; j++) {
        //        if (j % 2 == 0) {
        //            testPiece = new cc.Sprite(res.whiteStone_png);
        //        } else {
        //            testPiece = new cc.Sprite(res.blackStone_png);
        //        }
        //
        //        testPiece.setPosition( (tileSize * i) + (tileSize / 2.0), (tileSize * j) + (tileSize / 2.0));
        //        testPiece.setScale( tileSize / testPiece.getContentSize().width );
        //        this.addChild(testPiece);
        //    }
        //}


    }
});