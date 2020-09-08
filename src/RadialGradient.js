define([
	"skylark-langx/langx",
	"skylark-graphics-colors/Color",
	"./gradients",
	"./Gradient",
	"./GradientPoint",
	"./GradientStop"
],function(langx,Color,gradients,Gradient,GradientPoint,GradientStop) {


	var RadialGradient = Gradient.inherit({
		
		"klassName"	:	"RadialGradient",

		"startRadius" : {
			type : Number,
		},
		"endRadius" : {
			type : Number,
		},
			
		"toString" : function() {
			var props = {
				type : "radial",
				webkitGradType : "radial",
				stops : [],
				webKitPosn1 : this.startPoint.toString(),
				webKitPosn2 : this.endPoint.toString(),
				webKitRadius1 : this.startRadius && this.startRadius.toString(),
				webKitRadius2 : this.endRadius && this.endRadius.toString()
			};

			props.stops.push({
				color : Color.toCss(this.fromColor)
			});

			var stops = this.stops;
			for (var i=0;i<stops.length;i++){
				var stop = stops[i];
				props.stops.push({
					pos : stop.offset.toString(),
					color : stop.color.toString()
				});

			}

			props.stops.push({
				color : Color.toCss(this.toColor)
			});

			return CssUtils.buildBackgroundImage(props)[0];
		},	
		
		"_construct"	:	function(params) {
			this._ = {
				"startPoint":	params.startPoint,
				"endPoint"	:	params.endPoint,
				"fromColor"	:	params.fromColor,
				"toColor"	:	params.toColor,
				"startRadius"	:   params.startRadius,
				"endRadius"		:   params.endRadius,
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

	RadialGradient.fromString = function(s) {
		var p = CssUtils.parseBackgroundImage(s);
		if (p.type == "radial" ) {
			return new RadialGradient({
				startPoint : p.webKitPosn1,
				endPoint   : p.webKitPosn2,
				startRadius: p.webKitRadius1,
				endRadius  : p.webKitRadius2,
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

	return gradients.RadialGradient = RadialGradient;
	
});	
