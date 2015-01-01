var GameLayer = cc.Layer.extend({
    boardModel:null,
    boardController:null,
    clickCallback:null,
    spriteArray:null,
    tileSize:null,
    ctor:function (model, callback) {
        this._super();
        this.init(model, callback);
    },
    init:function (model, callback) {
        this._super();

        // Initialize the click handler
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        }, this);

        // Initialize the click callback
        this.clickCallback = callback;

        // Get the screen size
        var winSize = cc.director.getWinSize();


        this.boardModel = model;
        var boardSize = this.boardModel.size;
        // Divide the screen into board size + 2 tiles
        this.tileSize = (winSize.width * 0.75) / (boardSize + 2);


        // Initialize the 2d sprite tile array
        this.spriteArray = new Array(boardSize);
        for (var i = 0; i < boardSize; i++) {
            this.spriteArray[i] = new Array(boardSize);
        }


        // Initialize each sprite tile to be empty and assign its position/scale
        // Finally add it as a child
        for (var x = 0; x < boardSize; x++) {
            for (var y = 0; y < boardSize; y++) {
                this.spriteArray[x][y] = new cc.Sprite(res.emptyTile_png);
                this.spriteArray[x][y].setPosition( (this.tileSize * x) + (this.tileSize * 1.5), (this.tileSize * y) + (this.tileSize * 1.5));
                this.spriteArray[x][y].setScale( this.tileSize / this.spriteArray[x][y].getContentSize().width );
                this.addChild(this.spriteArray[x][y]);
            }
        }



    },

    // Update the view
    update:function() {

        for (var x = 0; x < this.boardModel.size; x++) {
            for (var y = 0; y < this.boardModel.size; y++) {

                // TODO Change 1, 0, -1 to constants
                if (this.boardModel.getStone(x, y) == 1) {
                    this.spriteArray[x][y].setTexture(res.blackStone_png);
                } else if (this.boardModel.getStone(x, y) == -1) {
                    this.spriteArray[x][y].setTexture(res.whiteStone_png);
                } else if (this.boardModel.getStone(x, y) == 0) {
                    this.spriteArray[x][y].setTexture(res.emptyTile_png);
                }

            }
        }
    },
    onTouchBegan:function (touch, event) {
        //var target = event.getCurrentTarget();
        //if (target._state != PADDLE_STATE_UNGRABBED) return false;
        //if (!target.containsTouchLocation(touch)) return false;
        //
        //target._state = PADDLE_STATE_GRABBED;

        return true;
    },
    onTouchMoved:function (touch, event) {
        //var target = event.getCurrentTarget();
        //cc.assert(target._state == PADDLE_STATE_GRABBED, "Paddle - Unexpected state!");
        //var touchPoint = touch.getLocation();
        //target.x = touchPoint.x;
    },
    // Called when click/touch is lifted
    onTouchEnded:function (touch, event) {
        var target = event.getCurrentTarget();
        //cc.assert(target._state == PADDLE_STATE_GRABBED, "Paddle - Unexpected state!");
        //target._state = PADDLE_STATE_UNGRABBED;


        var x = Math.floor(touch.getLocation().x / target.tileSize) - 1;
        var y = Math.floor(touch.getLocation().y / target.tileSize) - 1;

        // TODO: try to find a better way of detecting which tile is clicked/touched
        //for (x = 0; x < target.boardModel.size; x++) {
        //    for (y = 0; y < target.boardModel.size; y++) {
        //        //if ( cc.rectContainsPoint(target.spriteArray[x][y].rect(), touch.getLocation()) ) {
        //        //    console.log("position", x, y);
        //        //}
        //        //console.log(cc.rectContainsPoint(), cc.p(100, 300)));
        //
        //        console.log(target.spriteArray[x][y].getPosition().x);
        //        if ( cc.rectContainsPoint(target.spriteArray[x][y].getTextureRect(),touch.getLocation()) ) {
        //            console.log("position", x, y);
        //        }
        //    }
        //}

        // Notify the controller of the click's location
        target.clickCallback(x, y);
    }
});