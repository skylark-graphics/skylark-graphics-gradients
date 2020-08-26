define([
	"skylark-langx/langx",
	"skylark-graphics-color",
	"./gradients",
	"./Gradient",
	"./GradientPoint",
	"./GradientStop"
],function(langx,Color,gradients,Gradient,GradientPoint,GradientStop) {
	
	var LinearGradient = Gradient.inherit({
		"klassName"	:	"LinearGradient",

		"angle" : {
			get : function() {
				return this._.angle;
			}
		},

		"toString" : function() {
			var props = {
				type : "linear",
				webkitGradType : "linear",
				stops : [],
				webKitPosn1 : this.startPoint.toString(),
				webKitPosn2 : this.endPoint.toString(),
			};

			props.stops.push({
				color : Color.toCss(this.fromColor)
			});

			var stops = this.stops;
			for (var i=0;i<stops.length;i++){
				var stop = stops[i];
				props.stops.push({
					pos : stop.offset.toString(),
					color :stop.color.toString()
				});

			}

			props.stops.push({
				color : this.toColor.toString()
			});

			return CssUtils.buildBackgroundImage(props)[0];
		},
		
		"_construct"	:	function(params) {
			this._ = {
				"startPoint":	params.startPoint,
				"endPoint"	:	params.endPoint,
				"fromColor"	:	params.fromColor,
				"toColor"	:	params.toColor,
				"angle"		:   params.angle
			};

			if (params.stops) {
				var stops = params.stops;
				for (var i = 0;i<stops.length;i++) {
					var stop = stops[i];
					this.addColorStop(stop.offset,stop.color);
				}
			}
		}

	});

	LinearGradient.fromString = function(s) {
		var p = CssUtils.parseBackgroundImage(s);
		if (p.type == "linear" ) {
			return new LinearGradient({
				startPoint : p.webKitPosn1,
				endPoint   : p.webKitPosn2,
				fromColor  : p.stops[0].color,
				toColor    : p.stops[p.stops.length-1].color,
				stops      : p.stops.slice(1,p.stops.length-1).map(function(item){
					return {
						offset : item.pos,
						color : item.color
					}
				})

			});
		} else {
			return null;
		}
	};

	return gradients.LinearGradient = LinearGradient;
	
});	
