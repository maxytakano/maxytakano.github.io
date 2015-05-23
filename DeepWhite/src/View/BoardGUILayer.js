/**
 * Created by mtakano on 4/19/15.
 */

var BoardGUILayer = cc.Layer.extend({
    boardController:null,
    spriteArray:null,
    tileSize:null,
    gridOn:null,
    boardSize:null,
    winSize:null,
    move_number:null,

    // Models
    boardModel:null,

    ctor:function (model) {
        this._super();
        this.init(model);
    },
    init:function (model) {
        this._super();

        this.gridOn = true;

        // Get the screen size
        this.winSize = cc.director.getWinSize();

        this.boardModel = model;
        this.boardSize = this.boardModel.size;


        // Divide the screen into board size + 2 tiles
        this.tileSize = this.winSize.height / (this.boardSize + 2);

        // Initialize the 2d sprite tile array
        this.spriteArray = new Array(this.boardSize);
        for (var i = 0; i < this.boardSize; i++) {
            this.spriteArray[i] = new Array(this.boardSize);
        }

        //var blackColor = cc.color(0, 0, 0);
        //var greenColor = cc.color(0, 255, 0);

        // Initialize each sprite tile to be empty and assign its position/scale
        // Finally add it as a child
        for (var x = 0; x < this.boardSize; x++) {
            for (var y = 0; y < this.boardSize; y++) {

                this.spriteArray[x][y] = new cc.Sprite(res.influence_png);
                this.spriteArray[x][y] = new cc.LabelTTF("", "Helvetica", 15);
                //this.spriteArray[x][y].enableStroke(greenColor, 2);

                this.spriteArray[x][y].setPosition( (this.tileSize * x) + (this.tileSize * 1.5), (this.tileSize * y) + (this.tileSize * 1.5));
                this.addChild(this.spriteArray[x][y]);

            }
        }

        this.move_number = 0;

    },
    // TODO: fix the grid toggle to work for this layer
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
    add_number:function(x, y, color) {
        this.move_number += 1;
        this.spriteArray[x][y].setFontFillColor(color);
        this.spriteArray[x][y].setString(this.move_number);
    },
    // Update the view
    update:function() {

        for (var x = 0; x < this.boardModel.size; x++) {
            for (var y = 0; y < this.boardModel.size; y++) {

                // check if stone is there, if not remove the number
                // order will go update, then add next number


            }
        }
    }


});