/**
 * Created by mtakano on 5/11/15.
 */

var TensionMap = cc.Class.extend({
    boardModel:null,
    boardSize:null,
    influenceArray:null,

    ctor:function(model) {
        this.boardModel = model;
        this.boardSize = this.boardModel.size;
        this.total_influence = 0.0;

        // Initialize the influence map array
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
        // 1. Clear the influence map
        for (var x = 0; x < this.boardModel.size; x++) {
            for (var y = 0; y < this.boardModel.size; y++) {
                this.influenceArray[x][y] = 0.0;
            }
        }

        // Read each stone and add appropriate influence to the map
        for (var x = 0; x < this.boardModel.size; x++) {
            for (var y = 0; y < this.boardModel.size; y++) {

                // TODO Change 1, 0, -1 to constants
                if (this.boardModel.getStone(x, y) == 1) {
                    // black stone, multiply influence by 1.0
                    this.addInfluence(x, y, 1.0)
                } else if (this.boardModel.getStone(x, y) == -1) {
                    // white stone, multiply influence by -1.0
                    this.addInfluence(x, y, 1.0)
                }

            }
        }

        // update influence totals
        for (var x = 0; x < this.boardModel.size; x++) {
            for (var y = 0; y < this.boardModel.size; y++) {
                this.total_influence += this.influenceArray[x][y];
            }
        }

    },
    get_total_influence:function() {
        return this.total_influence;
    },
    addInfluence:function(x, y, color) {
        // 1. add influence around the stone, don't add influence to tiles holding a stone.

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
        //var baseline = 255.0;
        //var falloff = 40.0;
        var baseline = 315.0;
        var falloff = 40.0;

        //var rightLerp = 0.0;
        //var topLerp = 0.0;
        //var leftLerp = 0.0;
        //var botLerp = 0.0;

        var cur_x, cur_y;
        var i, j;

        //this.influenceArray[x][y] = (baseline*1.5) * color;

        for (i = 0; i < distanceRight; i++) {
            for (j = 0; j <= distanceTop; j++) {
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

                // only add influence to tiles without stones
                cur_x = i + (x + 1);
                cur_y = j + (y + 0);
                //if (this.boardModel.getStone(cur_x, cur_y) == 0) {
                //    this.influenceArray[cur_x][cur_y] += value;
                //}
                this.influenceArray[cur_x][cur_y] += value;
            }
        }

        for (i = 0; i < distanceTop; i++) {
            for (j = 0; j <= distanceLeft; j++) {
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

                // only add influence to tiles without stones
                cur_x = (x - 0) - j;
                cur_y = i + (y + 1);
                //if (this.boardModel.getStone(cur_x, cur_y) == 0) {
                //    this.influenceArray[cur_x][cur_y] += value;
                //}
                this.influenceArray[cur_x][cur_y] += value;

            }
        }

        for (i = 0; i < distanceLeft; i++) {
            for (j = 0; j <= distanceBot; j++) {
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

                // only add influence to tiles without stones
                cur_x = (x - 1) - i;
                cur_y = (y - 0) - j;
                //if (this.boardModel.getStone(cur_x, cur_y) == 0) {
                //    this.influenceArray[cur_x][cur_y] += value;
                //}
                this.influenceArray[cur_x][cur_y] += value;

            }
        }

        for (i = 0; i < distanceBot; i++) {
            for (j = 0; j <= distanceRight; j++) {
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

                // only add influence to tiles without stones
                cur_x = (x + 0) + j;
                cur_y = (y - 1) - i;
                //if (this.boardModel.getStone(cur_x, cur_y) == 0) {
                //    this.influenceArray[cur_x][cur_y] += value;
                //}
                this.influenceArray[cur_x][cur_y] += value;

            }
        }



        // TODO: need to determine the value of a stone in terms of influence
        //var stone_value = 1000.0;
        //// subtract value from side/corner stones
        //if (x < 1 || x > 17) {
        //    stone_value -= 400.0;
        //}
        //if (y < 1 || y > 17) {
        //    stone_value -= 400.0;
        //}

        // 2. add set the influnece of the stone tile, set less influence for side and corner pieces
        //this.influenceArray[x][y] = color * stone_value;
        this.influenceArray[x][y] += (baseline * 1.5) * color;

    }

});