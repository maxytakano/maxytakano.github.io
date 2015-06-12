/**
 * Created by mtakano on 12/31/14.
 */

var GridLayer = cc.Layer.extend({
    gridOn:null,
    spriteBG:null,
    gridBoardString:null,
    boardString:null,
    ctor:function (selectedBoard) {
        this._super();
        this.init(selectedBoard);
    },

    init:function (selectedBoard) {
        this._super();
        // Possible boards
        var boards = ["9x9","13x13","15x15","19x19"];
        this.gridBoardString = "res/boards/grid" + boards[selectedBoard] + ".png";
        this.boardString = "res/boards/board" + boards[selectedBoard] + ".png";


        this.gridOn = true;

        var winSize = cc.director.getWinSize();
        var localSize = winSize.height;


        //create the background image and position it at the center of screen
        var centerPos = cc.p(localSize/2, localSize/2);
        //this.spriteBG = new cc.Sprite(res.grid9x9_png);
        this.spriteBG = new cc.Sprite(this.gridBoardString);

        this.spriteBG.setScaleX( localSize / this.spriteBG.getContentSize().width );
        this.spriteBG.setScaleY( localSize / this.spriteBG.getContentSize().height );

        this.spriteBG.setPosition(centerPos);

        this.addChild(this.spriteBG);


    },
    gridToggle:function() {
        if (this.gridOn) {
            // Turn grid off
            this.spriteBG.setTexture(this.boardString);
            this.gridOn = false;
        } else {
            // Turn grid on
            this.spriteBG.setTexture(this.gridBoardString);
            this.gridOn = true;
        }
    }
});