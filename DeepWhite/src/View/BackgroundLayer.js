var BackgroundLayer = cc.Layer.extend({
	ctor:function () {
		this._super();
		this.init();
	},

	init:function () {
		this._super();
		var winSize = cc.director.getWinSize();
		var localSize = winSize.height;

		//// Textured background of n depth
		var n = 1;
		for (var x = 0; x < n; x++ ) {
			for (var y = 0; y < n; y ++) {
				//create the background image and position it at the center of screen
				var centerPos = cc.p(
					(localSize / (2*n)) + ((localSize / n) * x),
					(localSize / (2*n)) + ((localSize / n) * y)
				);


				var spriteBG = new cc.Sprite(res.woodBackground_png);

				spriteBG.setScaleX( (localSize / spriteBG.getContentSize().width) / n);
				spriteBG.setScaleY( (localSize / spriteBG.getContentSize().height) / n);

				spriteBG.setPosition(centerPos);
				this.addChild(spriteBG);
			}
		}

		// Plain one color background
		//var Background = cc.LayerColor.create(new cc.Color(255,255,255,255));
		//Background.changeWidth(localSize);
		//this.addChild(Background);

		
	}
});