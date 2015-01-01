/**
 * Created by mtakano on 12/31/14.
 */

var GridLayer = cc.Layer.extend({
    ctor:function (boardSize) {
        this._super();
        this.init(boardSize);
    },

    init:function (boardSize) {
        this._super();
        var winSize = cc.director.getWinSize();
        var localSize = (winSize.width * 0.75);

        var draw = new cc.DrawNode();
        this.addChild(draw);

        // Divide the screen into board size + 2 tiles
        this.tileSize = localSize / (boardSize + 2);

        for (var x = 0; x < boardSize; x++) {
            draw.drawSegment(
                cc.p((this.tileSize * x) + (this.tileSize * 1.5), (this.tileSize * 1.5)),
                cc.p((this.tileSize * x) + (this.tileSize * 1.5), localSize - (this.tileSize * 1.5)),
                1.1, cc.color(0, 0, 0, 255)
            );
        }

        for (var y = 0; y < boardSize; y++) {
            draw.drawSegment(
                cc.p( (this.tileSize * 1.5), (this.tileSize * y) + (this.tileSize * 1.5)),
                cc.p( localSize - (this.tileSize * 1.5),  (this.tileSize * y) + (this.tileSize * 1.5)),
                1.1, cc.color(0, 0, 0, 255)
            );
        }





    }
});