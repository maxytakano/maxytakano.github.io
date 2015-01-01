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
        var centerPoint = cc.p(localSize/2, localSize/2);


        var draw = new cc.DrawNode();
        this.addChild(draw);

        // Divide the screen into board size + 2 tiles
        this.tileSize = localSize / (boardSize + 2);

        // Draw grid lines
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




        // Draw star points
        if (boardSize == 19) {
            for (var x = 0; x < 3; x++) {
                for (var y = 0; y < 3; y++) {
                    draw.drawDot(
                        cc.p( (this.tileSize * 4.5) + (this.tileSize * 6 * x) , (this.tileSize * 4.5) + (this.tileSize * 6 * y)  ),
                        3.5, cc.color(0, 0, 0, 255)
                    );
                }
            }
        } else if (boardSize == 15) {
            for (var x = 0; x < 3; x++) {
                for (var y = 0; y < 3; y++) {
                    draw.drawDot(
                        cc.p( (this.tileSize * 4.5) + (this.tileSize * 4 * x) , (this.tileSize * 4.5) + (this.tileSize * 4 * y)  ),
                        3.5, cc.color(0, 0, 0, 255)
                    );
                }
            }
        } else if (boardSize == 13) {
            for (var x = 0; x < 2; x++) {
                for (var y = 0; y < 2; y++) {
                    draw.drawDot(
                        cc.p( (this.tileSize * 4.5) + (this.tileSize * 6 * x) , (this.tileSize * 4.5) + (this.tileSize * 6 * y)  ),
                        3.5, cc.color(0, 0, 0, 255)
                    );
                }
            }
            // Draw the center point
            draw.drawDot(centerPoint, 3.5, cc.color(0, 0, 0, 255));
        } else if (boardSize == 9) {
            for (var x = 0; x < 2; x++) {
                for (var y = 0; y < 2; y++) {
                    draw.drawDot(
                        cc.p( (this.tileSize * 3.5) + (this.tileSize * 4 * x) , (this.tileSize * 3.5) + (this.tileSize * 4 * y)  ),
                        3.5, cc.color(0, 0, 0, 255)
                    );
                }
            }
            // Draw the center point
            draw.drawDot(centerPoint, 3.5, cc.color(0, 0, 0, 255));
        }


    }
});