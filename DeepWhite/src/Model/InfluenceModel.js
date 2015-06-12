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
    influenceMap:null,
    tensionMap:null,
    vulnerabilityMap:null,
    boardModel:null,
    boardSize:null,
    // this is the current influence array (showing the selected map)
    influenceArray:null,
    selectedMap:null,

    ctor:function(model){
        // initialize the maps
        this.influenceMap = new InfluenceMap(model);
        this.tensionMap = new TensionMap(model);
        this.vulnerabilityMap = new VulnerabilityMap(model, this.influenceMap, this.tensionMap);

        this.selectedMap = 0;

        // create the maps array
        var number_maps = 3;
        this.maps = new Array(number_maps);
        this.maps[0] = this.influenceMap;
        this.maps[1] = this.tensionMap;
        this.maps[2] = this.vulnerabilityMap;

        // Create the master influence array
        // TODO: check if this stuff can be commented out
        this.boardModel = model;
        this.boardSize = this.boardModel.size;
        this.total_influence = 0.0;

        // Initialize the 2D influenceArray
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
        // update function first update the three separate maps
        // then

        // TODO: dont need this, each clears itself.
        // 1. Clear each influence map ??
        //for (var x = 0; x < this.boardModel.size; x++) {
        //    for (var y = 0; y < this.boardModel.size; y++) {
        //        this.influenceArray[x][y] = 0.0;
        //    }
        //}

        // this is where I recalculate each map
        // influence map
        this.maps[0].update();
        // tension map
        this.maps[1].update();
        // vulnerability map
        this.maps[2].update();

        this.select_map(this.selectedMap);



        this.total_influence = 0.0;

        // update influence totals
        for (var x = 0; x < this.boardModel.size; x++) {
            for (var y = 0; y < this.boardModel.size; y++) {
                this.total_influence += this.influenceArray[x][y];
            }
        }

    },
    select_map:function(selected_map) {
        // 0 selects influence map
        // 1 selects tension map
        // 2 selections vulnerability map
        console.log(selected_map);

        // set the influence array to the correct map
        this.influenceArray = this.maps[selected_map].influenceArray;
        this.selectedMap = selected_map;

        //for (var x = 0; x < this.boardModel.size; x++) {
        //    for (var y = 0; y < this.boardModel.size; y++) {
        //
        //        // TODO Change 1, 0, -1 to constants
        //        if (this.boardModel.getStone(x, y) == 1) {
        //            // black stone, multiply influence by 1.0
        //            this.addInfluence(x, y, 1.0)
        //        } else if (this.boardModel.getStone(x, y) == -1) {
        //            // white stone, multiply influence by -1.0
        //            this.addInfluence(x, y, -1.0)
        //        }
        //
        //    }
        //}
    },
    get_total_influence:function() {
        return this.total_influence;
    }

});