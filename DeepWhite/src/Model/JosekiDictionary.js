/**
 * Created by mtakano on 6/12/15.
 */

function TreeNode (location, next) {
    this.location = location;
    this.next = next;
}

var JosekiDictionary = cc.Class.extend({

    root:null,

    ctor:function(model) {
        // initialize the joseki dictionary

        // joseki 1
        var x3y3_aaaaaa = new TreeNode({x: 9, y: 2}, []);
        var x3y3_aaaaa = new TreeNode({x: 2, y: 8}, [x3y3_aaaaaa]);
        var x3y3_aaaa = new TreeNode({x: 2, y: 2}, [x3y3_aaaaa]);
        var x3y3_aaa = new TreeNode({x: 1, y: 3}, [x3y3_aaaa]);
        var x3y3_aa = new TreeNode({x: 5, y: 3}, [x3y3_aaa]);
        var x3y3_a = new TreeNode({x: 2, y: 5}, [x3y3_aa]);
        var x3y3 = new TreeNode({x: 3, y: 3}, [x3y3_a]);

        // joseki 2-a
        var x2y3_aaaaa = new TreeNode({x: 10, y: 2}, []);
        var x2y3_aaaa = new TreeNode({x: 2, y: 9}, [x2y3_aaaaa]);
        var x2y3_aaa = new TreeNode({x: 6, y: 3}, [x2y3_aaaa]);
        var x2y3_aa = new TreeNode({x: 3, y: 4}, [x2y3_aaa]);
        var x2y3_a = new TreeNode({x: 4, y: 2}, [x2y3_aa]);
        // joseki 2-b
        var x2y3_baaaaa = new TreeNode({x: 8, y: 2}, []);
        var x2y3_baaaa = new TreeNode({x: 1, y: 4}, [x2y3_baaaaa]);
        var x2y3_baaa = new TreeNode({x: 1, y: 2}, [x2y3_baaaa]);
        var x2y3_baa = new TreeNode({x: 2, y: 2}, [x2y3_baaa]);
        var x2y3_ba = new TreeNode({x: 3, y: 6}, [x2y3_baa]);
        var x2y3_b = new TreeNode({x: 4, y: 3}, [x2y3_ba]);
        var x2y3 = new TreeNode({x: 2, y: 3}, [x2y3_a, x2y3_b]);

        this.root = new TreeNode(null, [x3y3, x2y3]);
    },
    update:function() {

    }

});