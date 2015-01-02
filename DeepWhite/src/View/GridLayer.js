/**
 * Created by mtakano on 12/31/14.
 */

var GridLayer = cc.Layer.extend({
    gridOn:null,
    spriteBG:null,
    ctor:function (boardSize) {
        this._super();
        this.init(boardSize);
    },

    init:function (boardSize) {
        this._super();
        this.gridOn = true;

        var winSize = cc.director.getWinSize();
        var localSize = winSize.height;


        //create the background image and position it at the center of screen
        var centerPos = cc.p(localSize/2, localSize/2);
        this.spriteBG = new cc.Sprite(res.grid9x9_png);

        this.spriteBG.setScaleX( localSize / this.spriteBG.getContentSize().width );
        this.spriteBG.setScaleY( localSize / this.spriteBG.getContentSize().height );

        this.spriteBG.setPosition(centerPos);
        this.addChild(this.spriteBG);


    },
    gridToggle:function() {
        if (this.gridOn) {
            // Turn grid off
            this.spriteBG.setTexture(res.board9x9_png);
            this.gridOn = false;
        } else {
            // Turn grid on
            this.spriteBG.setTexture(res.grid9x9_png);
            this.gridOn = true;
        }
    }
});