/**
 * Created by mtakano on 12/31/14.
 */

var GridLayer = cc.Layer.extend({
    gridOn:null,
    ctor:function (boardSize) {
        this._super();
        this.init(boardSize);
    },

    init:function (boardSize) {
        this._super();

        //copy9x9

        var winSize = cc.director.getWinSize();
        var localSize = winSize.height;

        // Textured background of n depth
        var n = 1;
        for (var x = 0; x < n; x++ ) {
        	for (var y = 0; y < n; y ++) {
        		//create the background image and position it at the center of screen
        		var centerPos = cc.p(
        			(localSize / (2*n)) + ((localSize / n) * x),
        			(localSize / (2*n)) + ((localSize / n) * y)
        		);


        		var spriteBG = new cc.Sprite(res.board9x9_png);

        		spriteBG.setScaleX( (localSize / spriteBG.getContentSize().width) / n);
        		spriteBG.setScaleY( (localSize / spriteBG.getContentSize().height) / n);

        		spriteBG.setPosition(centerPos);
        		this.addChild(spriteBG);
        	}
        }

    }
});