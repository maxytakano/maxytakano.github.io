/**
 * Created by mtakano on 2/22/15.
 */

/**
 * Reads the board model and determines influence
 */
// TODO: plan different sub maps that influence model uses?
// for now just do it here, later will have a reference to each.
// map and then this class aggregates the maps into a final one.
// for now just do the final one.
var InfluenceModel = cc.Class.extend({
    boardModel:null,
    boardSize:null,
    influenceArray:null,

    ctor:function(model){
        this.boardModel = model;
        this.boardSize = this.boardModel.size;

        // Initialize the 2d influenceArray
        this.influenceArray = new Array(this.boardSize);
        for (var i = 0; i < this.boardSize; i++) {
            this.influenceArray[i] = new Array(this.boardSize);
        }

        // Initialize influence values to 0
        for (var x = 0; x < this.boardModel.size; x++) {
            for (var y = 0; y < this.boardModel.size; y++) {
                this.influenceArray[x][y] = 0.0;
            }
        }

    },
    update:function() {
        // this is where I could recalculate each map

        // 1. Clear each influence map
        for (var x = 0; x < this.boardModel.size; x++) {
            for (var y = 0; y < this.boardModel.size; y++) {
                this.influenceArray[x][y] = 0.0;
            }
        }


        // influence map
        // vulnerability map
        // opportunity map

        // read the stones here for now
        // Read each stone and add appropriate influence to the map
        for (var x = 0; x < this.boardModel.size; x++) {
            for (var y = 0; y < this.boardModel.size; y++) {

                // TODO Change 1, 0, -1 to constants
                if (this.boardModel.getStone(x, y) == 1) {
                    // black stone, multiply influence by 1.0
                    this.addInfluence(x, y, 1.0)
                } else if (this.boardModel.getStone(x, y) == -1) {
                    // white stone, multiply influence by -1.0
                    this.addInfluence(x, y, -1.0)
                }

            }
        }
    },
    addInfluence:function(x, y, color) {
        // 1. add influence at the stone
        this.influenceArray[x][y] += color * 100.0;

        // 2. add influence at the sides
        var size = this.boardModel.size;

        // TODO: try to do this in one loop, iterating over each tile once
        // TODO: in a single i < size j < size loop.
        // Using a windmill pattern to fill in influence.
        // goes right and up, up and left, left and down, then down and right
        //         <<<<<<<<|^^^^^^^^^
        //         <<<<<<<<|^^^^^^^^^
        //         <<<<<<<<|^^^^^^^^^
        //         ------------------
        //         vvvvvvvv|>>>>>>>>>
        //         vvvvvvvv|>>>>>>>>>
        //         vvvvvvvv|>>>>>>>>>

        // 1. right then up.
        // distance to the right side
        //var distanceRight = size - (x + 1);
        //var distanceTop = size - (y + 1);

        var distanceRight = (size - 1) - x;
        var distanceTop = (size - 1) - y;
        var distanceLeft = x;
        var distanceBot = y;

        var value = 0.0;
        var baseline = 100.0;
        var falloff = 20.0;
        //var rightLerp = 0.0;
        //var topLerp = 0.0;
        //var leftLerp = 0.0;
        //var botLerp = 0.0;

        for (var i = 0; i < distanceRight; i++) {
            for (var j = 0; j <= distanceTop; j++) {
                // try exponential or other falloff (gaussian?)
                value = (baseline - (i * falloff) - (j * falloff)) * color;

                // TODO: put into clamp function
                if (color == 1.0) {
                    // black
                    if (value < 0) {
                        break;
                    }
                } else if (color == -1.0) {
                    // white
                    if (value > 0) {
                        break;
                    }
                }

                this.influenceArray[i + (x + 1)][j + (y + 0)] += value;
            }
        }

        for (var i = 0; i < distanceTop; i++) {
            for (var j = 0; j <= distanceLeft; j++) {
                value = (baseline - (i * falloff) - (j * falloff)) * color;

                if (color == 1.0) {
                    // black
                    if (value < 0) {
                        break;
                    }
                } else if (color == -1.0) {
                    // white
                    if (value > 0) {
                        break;
                    }
                }

                this.influenceArray[(x - 0) - j][i + (y + 1)] += value;
            }
        }

        for (var i = 0; i < distanceLeft; i++) {
            for (var j = 0; j <= distanceBot; j++) {
                value = (baseline - (i * falloff) - (j * falloff)) * color;

                if (color == 1.0) {
                    // black
                    if (value < 0) {
                        break;
                    }
                } else if (color == -1.0) {
                    // white
                    if (value > 0) {
                        break;
                    }
                }

                this.influenceArray[(x - 1) - i][(y - 0) - j] += value;
            }
        }

        for (var i = 0; i < distanceBot; i++) {
            for (var j = 0; j <= distanceRight; j++) {
                value = (baseline - (i * falloff) - (j * falloff)) * color;

                if (color == 1.0) {
                    // black
                    if (value < 0) {
                        break;
                    }
                } else if (color == -1.0) {
                    // white
                    if (value > 0) {
                        break;
                    }
                }

                this.influenceArray[(x + 0) + j][(y - 1) - i] += value;
            }
        }

        // Lerp based method of influence

        //for (var i = 0; i < distanceRight; i++) {
        //    rightLerp = (distanceRight - i) / distanceRight;
        //    for (var j = 0; j < distanceTop; j++) {
        //        topLerp = 1.0 - ((distanceTop - j) / distanceTop);
        //        value = 50.0 * (rightLerp - topLerp) * color;
        //
        //        // TODO: make sure not itering after this, come up with something better
        //        if (color == 1.0) {
        //            // black
        //            if (value < 0) {
        //                break;
        //            }
        //        } else if (color == -1.0) {
        //            // white
        //            if (value > 0) {
        //                break;
        //            }
        //        }
        //        this.influenceArray[i + (x + 1)][j + (y + 1)] = value;
        //
        //    }
        //}

        //for (var i = 0; i < distanceTop; i++) {
        //    topLerp = (distanceTop - i) / distanceTop;
        //    for (var j = 0; j < distanceLeft; j++) {
        //        leftLerp = 1.0 - ((distanceLeft - j) / distanceLeft);
        //        value = 50.0 * (topLerp - leftLerp) * color;
        //
        //        // TODO: make sure not itering after this, come up with something better
        //        if (color == 1.0) {
        //            // black
        //            if (value < 0) {
        //                break;
        //            }
        //        } else if (color == -1.0) {
        //            // white
        //            if (value > 0) {
        //                break;
        //            }
        //        }
        //        this.influenceArray[(x - 1) - j][i + (y + 1)] = value;
        //    }
        //}
        //
        //for (var i = 0; i < distanceLeft; i++) {
        //    leftLerp = (distanceLeft - i) / distanceLeft;
        //    for (var j = 0; j < distanceBot; j++) {
        //        botLerp = 1.0 - ((distanceBot - j) / distanceBot);
        //        value = 50.0 * (leftLerp - botLerp) * color;
        //
        //        // TODO: make sure not itering after this, come up with something better
        //        if (color == 1.0) {
        //            // black
        //            if (value < 0) {
        //                break;
        //            }
        //        } else if (color == -1.0) {
        //            // white
        //            if (value > 0) {
        //                break;
        //            }
        //        }
        //        this.influenceArray[(x - 1) - i][(y - 1) - j] = value;
        //    }
        //}
        //
        //for (var i = 0; i < distanceBot; i++) {
        //    botLerp = (distanceBot - i) / distanceBot;
        //    for (var j = 0; j < distanceRight; j++) {
        //        rightLerp = 1.0 - ((distanceRight - j) / distanceRight);
        //        value = 50.0 * (botLerp - rightLerp) * color;
        //
        //        // TODO: make sure not itering after this, come up with something better
        //        if (color == 1.0) {
        //            // black
        //            if (value < 0) {
        //                break;
        //            }
        //        } else if (color == -1.0) {
        //            // white
        //            if (value > 0) {
        //                break;
        //            }
        //        }
        //        this.influenceArray[(x + 1) + j][(y - 1) - i] = value;
        //    }
        //}


        // 3. Lerp over the sides to add more


    }

});