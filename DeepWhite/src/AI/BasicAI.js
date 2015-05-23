/**
 * Created by mtakano on 3/28/15.
 */

var BasicAI = cc.Class.extend({
    boardModel:null,
    boardSize:null,
    influenceModel:null,

    ctor:function(model, influence_model){
        this.boardModel = model;
        this.boardSize = this.boardModel.size;
        this.influenceModel = influence_model;
    },
    make_move:function() {
        // try each move on the board and check the overall influence of black and white
        // for each move.  Save the current best move.  finally return the x,y of that best move.
        var best_move = null;
        var smallest_influence = 9007199254740991;
        var current_influence = null;


        for (var x = 0; x < this.boardModel.size; x++) {
            for (var y = 0; y < this.boardModel.size; y++) {
                var playAttempt = this.boardModel.isValidWithCode(x,y,this.boardModel.turn);

                // Check if playAttempt was valid  (equals true, not a number)
                if (typeof playAttempt != "number") {
                    this.boardModel.play(x, y, this.boardModel.turn, false);

                     //Update the influence model
                    this.influenceModel.update();

                     //do influence calculation
                    current_influence = this.influenceModel.get_total_influence();
                    if (current_influence < smallest_influence) {
                        smallest_influence = current_influence;
                        best_move = [x, y];
                    }

                     //pop that position
                    this.boardModel.popPosition()
                }
            }
        }
        return best_move;

    }

});