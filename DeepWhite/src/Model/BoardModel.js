/*
* MIT LICENSE
* Copyright (c) 2013 Jan Prokop
*
* Permission is hereby granted, free of charge, to any person obtaining a copy of this
* software and associated documentation files (the "Software"), to deal in the Software
* without restriction, including without limitation the rights to use, copy, modify, merge,
* publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons
* to whom the Software is furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all copies or
* substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
* BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
* DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/*
 * Go Rules used for the Model from Jan Prokop's wgo js library.
 * Translated into a cc.Class to integrate with cocos2d-js by Max Takano.
 */
var scripts= document.getElementsByTagName('script');
var path= scripts[scripts.length-1].src.split('?')[0];      // remove any ?query
var mydir= path.split('/').slice(0, -1).join('/')+'/';


var WGo = {
    // basic information
    version: "2.0",

    // constants for colors (rather use WGo.B or WGo.W)
    B: 1,
    W: -1,

    // if true errors will be shown in dialog window, otherwise they will be ignored
    ERROR_REPORT: true,
    DIR: mydir,

    // Language of player, you can change this global variable any time. Object WGo.i18n.<your lang> must exist.
    lang: "en",

    // Add terms for each language here
    i18n: {
        en: {}
    }
};

// browser detection - can be handy
WGo.opera = navigator.userAgent.search(/(opera)(?:.*version)?[ \/]([\w.]+)/i) != -1;
WGo.webkit = navigator.userAgent.search(/(webkit)[ \/]([\w.]+)/i) != -1;
WGo.msie = navigator.userAgent.search(/(msie) ([\w.]+)/i) != -1;
WGo.mozilla = navigator.userAgent.search(/(mozilla)(?:.*? rv:([\w.]+))?/i) != -1 && !WGo.webkit && !WGo.msie;

// translating function
WGo.t = function(str) {
    var loc = WGo.i18n[WGo.lang][str] || WGo.i18n.en[str];
    if(loc) {
        for(var i = 1; i < arguments.length; i++) {
            loc = loc.replace("$", arguments[i]);
        }
        return loc;
    }
    return str;
};

// helping function for class inheritance
WGo.extendClass = function(parent, child) {
    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = child;
    child.prototype.super = parent;

    return child;
};

// helping function for class inheritance
WGo.abstractMethod = function() {
    throw Error('unimplemented abstract method');
};

// helping function for deep cloning of simple objects,
WGo.clone = function(obj) {
    if(obj && typeof obj == "object") {
        var n_obj = obj.constructor == Array ? [] : {};

        for(var key in obj) {
            if(obj[key] == obj) {
                n_obj[key] = obj;
            }
            else {
                n_obj[key] = WGo.clone(obj[key]);
            }
        }

        return n_obj;
    }
    else {
        return obj;
    }
};

// filter html to avoid XSS
WGo.filterHTML = function(text) {
    if(!text || typeof text != "string") return text;
    return text.replace("<", "&lt;").replace(">", "&gt;");
};


/**
* Creates instance of position object.
*
* @class
* <p>WGo.Position is simple object storing position of go game. It is implemented as matrix <em>size</em> x <em>size</em> with values WGo.BLACK, WGo.WHITE or 0. It can be used by any extension.</p>
*
* @param {number} size of the board
*/

var Position = function(size) {
    this.size = size;
    this.schema = [];
    for(var i = 0; i < size*size; i++) {
        this.schema[i] = 0;
    }
};

Position.prototype = {
    constructor: WGo.Position,

    /*
     * Returns value of given coordinates.
     *
     * @param {number} x coordinate
     * @param {number} y coordinate
     * @return {(WGo.BLACK|WGo.WHITE| 0asd)} color
     */

    get: function(x,y) {
        if(x < 0 || y < 0 || x >= this.size || y >= this.size) return undefined;
        return this.schema[x*this.size+y];
    },

    /*
     * Sets value of given coordinates.
     *
     * @param {number} x coordinate
     * @param {number} y coordinate
     * @param {(WGo.B|WGo.W|0)} c color
     */

    set: function(x,y,c) {
        this.schema[x*this.size+y] = c;
        return this;
    },

    /**
     * Clears the whole position (every value is set to 0).
     */

    clear: function() {
        for(var i = 0; i < this.size*this.size; i++) this.schema[i] = 0;
        return this;
    },

    /*
     * Clones the whole position.
     *
     * @return {WGo.Position} copy of position
     */

    clone: function() {
        var clone = new Position(this.size);
        clone.schema = this.schema.slice(0);
        return clone;
    }
};

WGo.Position = Position;

/**
* Creates instance of game class.
*
* @class
* This class implements game logic. It basically analyses given moves and returns capture stones.
* WGo.Game also stores every position from beginning, so it has ability to check repeating positions
* and it can effectively restore old positions.</p>
*
* @param {number} size of the board
* @param {"KO"|"ALL"|"NONE"} repeat (optional, default is "KO") - how to handle repeated position:
*
* KO - ko is properly handled - position cannot be same like previous position
* ALL - position cannot be same like any previous position - e.g. it forbids triple ko
* NONE - position can be repeated
*/

/* BMC board model class */
var BoardModel = cc.Class.extend({
    size:null,
    repeating:String,
    stack:Array,
    turn:Number,

    ctor:function(size, repeat){
        this.size = size || 19;
        this.repeating = repeat === undefined ? "KO" : repeat; // possible values: KO, ALL or nothing
        this.stack = [];
        this.stack[0] = new Position(size);
        this.stack[0].capCount = {black:0, white:0};
        this.turn = WGo.B;

        Object.defineProperty(this, "position", {
            get : function(){ return this.stack[this.stack.length-1]; },
            set : function(pos){ this[this.stack.length-1] = pos; }
        });
    },

    // function for stone capturing
    do_capture:function(position, captured, x, y, c) {
        if(x >= 0 && x < position.size && y >= 0 && y < position.size && position.get(x,y) == c) {
            position.set(x,y,0);
            captured.push({x:x, y:y});

            this.do_capture(position, captured, x, y-1, c);
            this.do_capture(position, captured, x, y+1, c);
            this.do_capture(position, captured, x-1, y, c);
            this.do_capture(position, captured, x+1, y, c);
        }
    },

    check_liberties:function(position, testing, x, y, c) {
        // out of the board there aren't liberties
        if(x < 0 || x >= position.size || y < 0 || y >= position.size) return true;
        // however empty field means liberty
        if(position.get(x,y) == 0) return false;
        // already tested field or stone of enemy isn't giving us a liberty.
        if(testing.get(x,y) == true || position.get(x,y) == -c) return true;

        // set this field as tested
        testing.set(x,y,true);

        // in this case we are checking our stone, if we get 4 trues, it has no liberty
        return 	this.check_liberties(position, testing, x, y-1, c) &&
            this.check_liberties(position, testing, x, y+1, c) &&
            this.check_liberties(position, testing, x-1, y, c) &&
            this.check_liberties(position, testing, x+1, y, c);
    },

    // analysing function - modifies original position, if there are some capturing, and returns array of captured stones
    check_capturing:function(position, x, y, c) {
        var captured = [];
        // is there a stone possible to capture?
        if(x >= 0 && x < position.size && y >= 0 && y < position.size && position.get(x,y) == c) {
            // create testing map
            var testing = new Position(position.size);
            // if it has zero liberties capture it
            if(this.check_liberties(position, testing, x, y, c)) {
                // capture stones from game
                this.do_capture(position, captured, x, y, c);
            }
        }
        return captured;
    },

    // analysing history
    checkHistory:function(position, x, y) {
        var flag, stop;

        if(this.repeating == "KO" && this.stack.length-2 >= 0) stop = this.stack.length-2;
        else if(this.repeating == "ALL") stop = 0;
        else return true;

        for(var i = this.stack.length-2; i >= stop; i--) {
            if(this.stack[i].get(x,y) == position.get(x,y)) {
                flag = true;
                for(var j = 0; j < this.size*this.size; j++) {
                    if(this.stack[i].schema[j] != position.schema[j]) {
                        flag = false;
                        break;
                    }
                }
                if(flag) return false;
            }
        }

        return true;
    },
    getPosition: function() {
        return this.stack[this.stack.length-1];
    },

    /*
     * Play move.
     *
     * @param {number} x coordinate
     * @param {number} y coordinate
     * @param {(WGo.B|WGo.W)} c color
     * @param {boolean} noplay - if true, move isn't played. Used by WGo.Game.isValid.
     * @return {number} code of error, if move isn't valid. If it is valid, function returns array of captured stones.
     *
     * Error codes:
     * 1 - given coordinates are not on board
     * 2 - on given coordinates already is a stone
     * 3 - suicide (currently they are forbbiden)
     * 4 - repeated position
     */

    play: function(x,y,c,noplay) {
        //check coordinates validity
        if(!this.isOnBoard(x,y)) return 1;
        if(this.position.get(x,y) != 0) return 2;

        // clone position
        if(!c) c = this.turn;

        var new_pos = this.position.clone();
        new_pos.set(x,y,c);

        // check capturing
        var captured = this.check_capturing(new_pos, x-1, y, -c).concat(this.check_capturing(new_pos, x+1, y, -c), this.check_capturing(new_pos, x, y-1, -c), this.check_capturing(new_pos, x, y+1, -c));

        // check suicide
        if(!captured.length) {
            var testing = new Position(this.size);
            if(this.check_liberties(new_pos, testing, x, y, c)) return 3;
        }

        // check history
        if(this.repeating && !this.checkHistory.call(this, new_pos, x, y)) {
            return 4;
        }

        if(noplay) {
            return true;
        }


        // update position info
        new_pos.color = c;
        new_pos.capCount = {
            black: this.position.capCount.black,
            white: this.position.capCount.white
        };
        if(c == WGo.B) new_pos.capCount.black += captured.length;
        else new_pos.capCount.white += captured.length;

        // save position
        this.pushPosition(new_pos);

        // reverse turn
        this.turn = -c;

        return captured;

    },

    /*
     * Play pass.
     *
     * @param {(WGo.B|WGo.W)} c color
     */

    pass: function(c) {
        if(c) this.turn = -c;
        else this.turn = -this.turn;

        this.pushPosition();
        this.position.color = -this.position.color;
    },

    /*
     * Added by Max
     * checks validity of the move, returns true if the move is valid
     * otherwise returns the error code of the invalid move
     */
    isValidWithCode: function(x,y,c) {
        return this.play(x,y,c,true);
    },

    /*
     * Finds out validity of the move.
     *
     * @param {number} x coordinate
     * @param {number} y coordinate
     * @param {(WGo.B|WGo.W)} c color
     * @return {boolean} true if move can be played.
     */
    isValid: function(x,y,c) {
        return typeof this.play(x,y,c,true) != "number";
    },

    /*
     * Controls position of the move.
     *
     * @param {number} x coordinate
     * @param {number} y coordinate
     * @return {boolean} true if move is on board.
     */

    isOnBoard: function(x,y) {
        return x >= 0 && y >= 0 && x < this.size && y < this.size;
    },

    /*
     * Inserts move into current position. Use for setting position, for example in handicap game. Field must be empty.
     *
     * @param {number} x coordinate
     * @param {number} y coordinate
     * @param {(WGo.B|WGo.W)} c color
     * @return {boolean} true if operation is successfull.
     */

    addStone: function(x,y,c) {
        if(this.isOnBoard(x,y) && this.position.get(x,y) == 0) {
            this.position.set(x,y,c || 0);
            return true;
        }
        return false;
    },

    /*
     * Removes move from current position.
     *
     * @param {number} x coordinate
     * @param {number} y coordinate
     * @return {boolean} true if operation is successfull.
     */

    removeStone: function(x,y) {
        if(this.isOnBoard(x,y) && this.position.get(x,y) != 0) {
            this.position.set(x,y,0);
            return true;
        }
        return false;
    },

    /*
     * Set or insert move of current position.
     *
     * @param {number} x coordinate
     * @param {number} y coordinate
     * @param {(WGo.B|WGo.W)} c color
     * @return {boolean} true if operation is successfull.
     */

    setStone: function(x,y,c) {
        if(this.isOnBoard(x,y)) {
            this.position.set(x,y,c || 0);
            return true;
        }
        return false;
    },

    /*
     * Get stone on given position.
     *
     * @param {number} x coordinate
     * @param {number} y coordinate
     * @return {(WGo.B|WGo.W|0)} color
     */

    getStone: function(x,y) {
        if(this.isOnBoard(x,y)) {
            return this.position.get(x,y);
        }
        return 0;
    },

    /*
     * Add position to stack. If position isn't specified current position is cloned and stacked.
     * Pointer of actual position is moved to the new position.
     *
     * @param pos
     */

    pushPosition: function(pos) {
        if(!pos) {
            var pos2 = this.position.clone();
            pos2.capCount = {
                black: this.position.capCount.black,
                white: this.position.capCount.white
            };
            pos2.color = this.position.color;
            this.stack.push(pos);
            return this;
        } else {
            this.stack.push(pos);
            return this;
        }

    },

    /*
     * Remove current position from stack. Pointer of actual position is moved to the previous position.
     */

    popPosition: function() {
        var old = null;
        if(this.stack.length > 0) {
            old = this.stack.pop();

            if(this.stack.length == 0) this.turn = WGo.B;
            else if(this.position.color) this.turn = -this.position.color;
            else this.turn = -this.turn;
        }
        return old;
    },

    /*
     * Removes all positions.
     */

    firstPosition: function() {
        this.stack = [];
        this.stack[0] = new Position(this.size);
        this.stack[0].capCount = {black:0, white:0};
        this.turn = WGo.B;
        return this;
    },

    /*
     * Gets count of captured stones.
     *
     * @param {(WGo.BLACK|WGo.WHITE)} color
     * @return {number} count
     */

    getCaptureCount: function(color) {
        return color == WGo.B ? this.position.capCount.black : this.position.capCount.white;
    },

    /*
     * Validate postion. Position is tested from 0:0 to size:size, if there are some moves, that should be captured, they will be removed.
     * You can use this, after insertion of more stones.
     *
     * @return array removed stones
     */

    validatePosition: function() {
        var c, p,
            white = 0,
            black = 0,
            captured = [],
            new_pos = this.position.clone();

        for(var x = 0; x < this.size; x++) {
            for(var y = 0; y < this.size; y++) {
                c = this.position.get(x,y);
                if(c) {
                    p = captured.length;
                    captured = captured.concat(check_capturing(new_pos, x-1, y, -c),
                        check_capturing(new_pos, x+1, y, -c),
                        check_capturing(new_pos, x, y-1, -c),
                        check_capturing(new_pos, x, y+1, -c));

                    if(c == WGo.B) black += captured-p;
                    else white += captured-p;
                }
            }
        }
        this.position.capCount.black += black;
        this.position.capCount.white += white;
        this.position.schema = new_pos.schema;

        return captured;
    }

});
