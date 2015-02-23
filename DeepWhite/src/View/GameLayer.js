
// TODO: clean up board swapping, create a function that redoes the sprite array
// TODO: and call that instead in the init and in the swap function.
var GameLayer = cc.Layer.extend({
    boardModel:null,
    boardController:null,
    clickCallback:null,
    spriteArray:null,
    tileSize:null,
    gridOn:null,
    boardSize:null,
    winSize:null,
    emptySprite:null,

    // labels
    labelArray:null,

    // TODO: temp
    influenceMap:null,

    ctor:function (model, callback, theme, influence) {
        this._super();
        this.init(model, callback, theme, influence);
    },
    init:function (model, callback, theme, influence) {
        this._super();
        // this might work?
        cc.$("#gameCanvas").style.cursor = "default";

        this.gridOn = true;
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
        this.winSize = cc.director.getWinSize();


        this.boardModel = model;
        this.boardSize = this.boardModel.size;

        //TODO Temp: remove
        this.influenceMap = influence;

        // Divide the screen into board size + 2 tiles

        this.tileSize = this.winSize.height / (this.boardSize + 2);
        //this.tileSize = winSize.height / boardSize;


        // Initialize the 2d sprite tile array
        this.spriteArray = new Array(this.boardSize);
        for (var i = 0; i < this.boardSize; i++) {
            this.spriteArray[i] = new Array(this.boardSize);
        }

        // Initialize the 2d label  array
        this.labelArray = new Array(this.boardSize);
        for (var i = 0; i < this.boardSize; i++) {
            this.labelArray[i] = new Array(this.boardSize);
        }

        // Initialize the tile sprite based on theme
        // Needed to show the board in advanced mode!
        if (theme == "advanced") {
            this.emptySprite = res.influ_png;
        } else if (theme == "traditional") {
            this.emptySprite = res.emptyTile_png;
        }

        // Initialize each sprite tile to be empty and assign its position/scale
        // Finally add it as a child
        for (var x = 0; x < this.boardSize; x++) {
            for (var y = 0; y < this.boardSize; y++) {
                this.spriteArray[x][y] = new cc.Sprite(this.emptySprite);
                this.spriteArray[x][y].setPosition( (this.tileSize * x) + (this.tileSize * 1.5), (this.tileSize * y) + (this.tileSize * 1.5));
                this.spriteArray[x][y].setScale( this.tileSize / this.spriteArray[x][y].getContentSize().width );

                // debug label
                var redColor = cc.color(255, 0, 0);
                var labelString = x + ", " + y;
                this.labelArray[x][y] = new cc.LabelTTF(labelString, "Helvetica", 10);
                this.labelArray[x][y].setFontFillColor(redColor);
                this.labelArray[x][y].setPosition( (this.tileSize * x) + (this.tileSize * 1.5), (this.tileSize * y) + (this.tileSize * 1.65));
                //this.addChild(this.labelArray[x][y]);

                this.addChild(this.spriteArray[x][y]);
            }
        }

    },
    gridToggle:function() {
        this.clearView();
        if (this.gridOn) {
            // turn grid off
            this.tileSize = this.winSize.height / this.boardSize;
            // Initialize the 2d sprite tile array
            this.spriteArray = new Array(this.boardSize);
            for (var i = 0; i < this.boardSize; i++) {
                this.spriteArray[i] = new Array(this.boardSize);
            }
            for (var x = 0; x < this.boardSize; x++) {
                for (var y = 0; y < this.boardSize; y++) {
                    this.spriteArray[x][y] = new cc.Sprite(this.emptySprite);
                    this.spriteArray[x][y].setPosition( (this.tileSize * x) + (this.tileSize * 0.5), (this.tileSize * y) + (this.tileSize * 0.5));
                    this.spriteArray[x][y].setScale( this.tileSize / this.spriteArray[x][y].getContentSize().width );
                    this.addChild(this.spriteArray[x][y]);
                }
            }
            this.gridOn = false;
        } else {
            // turn grid on
            this.tileSize = this.winSize.height / (this.boardSize + 2);
            // Initialize the 2d sprite tile array
            this.spriteArray = new Array(this.boardSize);
            for (var i = 0; i < this.boardSize; i++) {
                this.spriteArray[i] = new Array(this.boardSize);
            }
            // Initialize each sprite tile to be empty and assign its position/scale
            // Finally add it as a child
            for (var x = 0; x < this.boardSize; x++) {
                for (var y = 0; y < this.boardSize; y++) {
                    this.spriteArray[x][y] = new cc.Sprite(this.emptySprite);
                    this.spriteArray[x][y].setPosition( (this.tileSize * x) + (this.tileSize * 1.5), (this.tileSize * y) + (this.tileSize * 1.5));
                    this.spriteArray[x][y].setScale( this.tileSize / this.spriteArray[x][y].getContentSize().width );
                    this.addChild(this.spriteArray[x][y]);
                }
            }
            this.gridOn = true;
        }
        this.update();
    },
    // Set all of the tiles to empty (useful for modifying and repainting board)
    clearView:function() {
        for (var x = 0; x < this.boardModel.size; x++) {
            for (var y = 0; y < this.boardModel.size; y++) {
                this.spriteArray[x][y].setTexture(this.emptySprite);
            }
        }
    },
    // Update the view
    update:function() {

        for (var x = 0; x < this.boardModel.size; x++) {
            for (var y = 0; y < this.boardModel.size; y++) {

                this.labelArray[x][y].setString(this.influenceMap.influenceArray[x][y].toFixed(1));

                // TODO Change 1, 0, -1 to constants
                //if (this.boardModel.getStone(x, y) == 1) {
                //    this.spriteArray[x][y].setTexture(res.blackStone_png);
                //} else if (this.boardModel.getStone(x, y) == -1) {
                //    this.spriteArray[x][y].setTexture(res.whiteStone_png);
                //} else if (this.boardModel.getStone(x, y) == 0) {
                //    this.spriteArray[x][y].setTexture(this.emptySprite);
                //}

                if (this.boardModel.getStone(x, y) == 1) {
                    this.spriteArray[x][y].setTexture(res.future_black_png);
                } else if (this.boardModel.getStone(x, y) == -1) {
                    this.spriteArray[x][y].setTexture(res.future_white_png);
                } else if (this.boardModel.getStone(x, y) == 0) {
                    this.spriteArray[x][y].setTexture(this.emptySprite);
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

        // Check if the grid is on or off
        var offset;
        if (target.gridOn) {
            offset = 1;
        } else {
            offset = 0;
        }

        var x = Math.floor(touch.getLocation().x / target.tileSize) - offset;
        var y = Math.floor(touch.getLocation().y / target.tileSize) - offset;

        // Notify the controller of the click's location
        target.clickCallback(x, y);
    }
});