/**
 * Created by mtakano on 2/21/15.
 */

/**
 * This Layer should update each time a move is played, and redraw
 * the influence of every tile.
 */

var InfluenceLayer = cc.Layer.extend({
    boardController:null,
    spriteArray:null,
    tileSize:null,
    gridOn:null,
    boardSize:null,
    winSize:null,

    // Models
    boardModel:null,
    influenceMode:null,

    ctor:function (model, influenceModel) {
        this._super();
        this.init(model, influenceModel);
    },
    init:function (model, influenceModel) {
        this._super();
        // this might work?
        //cc.$("#gameCanvas").style.cursor = "default";

        this.gridOn = true;

        // Get the screen size
        this.winSize = cc.director.getWinSize();

        this.boardModel = model;
        this.boardSize = this.boardModel.size;

        this.influenceModel = influenceModel;

        // Divide the screen into board size + 2 tiles

        this.tileSize = this.winSize.height / (this.boardSize + 2);
        //this.tileSize = winSize.height / boardSize;



        // Initialize the 2d sprite tile array
        this.spriteArray = new Array(this.boardSize);
        for (var i = 0; i < this.boardSize; i++) {
            this.spriteArray[i] = new Array(this.boardSize);
        }

        // Initialize each sprite tile to be empty and assign its position/scale
        // Finally add it as a child
        for (var x = 0; x < this.boardSize; x++) {
            for (var y = 0; y < this.boardSize; y++) {

                this.spriteArray[x][y] = new cc.Sprite(res.influence_png);
                //this.spriteArray[x][y].setColor(new cc.Color(0,0,0,200));
                //this.spriteArray[x][y].setColor(cc.color(255,255,255,255));
                this.spriteArray[x][y].setOpacity(0);

                this.spriteArray[x][y].setPosition( (this.tileSize * x) + (this.tileSize * 1.5), (this.tileSize * y) + (this.tileSize * 1.5));
                this.spriteArray[x][y].setScale( this.tileSize / this.spriteArray[x][y].getContentSize().width );
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
                    this.spriteArray[x][y] = new cc.Sprite(res.influence_png);
                    this.spriteArray[x][y].setColor(new cc.Color(0,0,0,0));
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
                    this.spriteArray[x][y] = new cc.Sprite(res.influence_png);
                    this.spriteArray[x][y].setColor(new cc.Color(0,0,0,0));
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
                this.spriteArray[x][y].setTexture(res.emptyTile_png);
            }
        }
    },
    // Update the view
    update:function() {

        var influence_map = this.influenceModel.influenceArray;
        var influence = 0.0;
        var influence_color = null;
        for (var x = 0; x < this.boardModel.size; x++) {
            for (var y = 0; y < this.boardModel.size; y++) {

                // read the influence map and paint tiles appropriately

                // TODO Change 1, 0, -1 to constants
                influence = influence_map[x][y];

                if (influence >= 0) {
                    if (influence >= 255.0) {
                        influence = 255.0
                    }
                    //influence_color = cc.color(influence, influence/2.0, 0);
                    influence_color = cc.color(255, 128, 0);
                    this.spriteArray[x][y].setOpacity(influence);
                } else if (influence < 0) {
                    influence *= -1.0;
                    if (influence >= 255.0) {
                        influence = 255.0
                    }
                    //influence_color = cc.color(0, influence/2.0, influence);
                    influence_color = cc.color(0, 128, 255);
                    this.spriteArray[x][y].setOpacity(influence);
                }

                //if (influence != 0) {
                //    this.spriteArray[x][y].setOpacity(128);
                //}

                this.spriteArray[x][y].setColor(influence_color);


            }
        }
    }
});