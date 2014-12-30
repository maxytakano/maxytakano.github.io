var res = {
    HelloWorld_png : "res/HelloWorld.png",
    CloseNormal_png : "res/CloseNormal.png",
    CloseSelected_png : "res/CloseSelected.png",
    BasicBoard_png : "res/space.png",
    blackStone_png : "res/blackStone.png",
    whiteStone_png : "res/whiteStone.png",
    emptyTile_png : "res/emptyTile.png"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}