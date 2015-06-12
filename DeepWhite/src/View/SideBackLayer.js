/**
 * Created by mtakano on 1/2/15.
 */

var SideBackLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        this.init();
    },

    init:function () {
        this._super();

        var winSize = cc.director.getWinSize();
        var localSize = winSize.width / 4;


        //create the background image and position it at the center of screen
        var centerPos = cc.p(localSize * 3.5, winSize.height/2);
        var spriteBG = new cc.Sprite(res.bamboo_png);

        spriteBG.setScaleX( localSize / spriteBG.getContentSize().width );
        spriteBG.setScaleY( winSize.height / spriteBG.getContentSize().height );

        spriteBG.setPosition(centerPos);
        spriteBG.setColor(new cc.Color(100,100,100,0));
        this.addChild(spriteBG);

    }
});