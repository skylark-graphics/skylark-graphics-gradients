define([
	"skylark-langx/langx",
	"skylark-graphics-colors/color",
	"./gradients",
	"./gradient-point",
	"./gradient-stop"
],function(langx,Color,gradients,GradientPoint,GradientStop) {

	var Gradient = langx.klass({

		"klassName"	:	"Gradient",

		"endPoint" : {
			get : function() {
				return this._.endPoint;
			}
		},

		"fromColor" : {
			get : function() {
				return this._.fromColor;
			}
		},

		"startPoint" : {
			get : function() {
				return this._.startPoint;
			}
		},

		"stops" : {
			get : function() {
				return this._.stops;
			}
		},
		
		"toColor" : {
			get : function() {
				return this._.toColor;
			}
		},

		addColorStop : function(offset,color) {
			this._.stops.push(new GradientStop(offset,color));
		},	
	
		"_construct"	:	function(){
			this._ =  {
            		stops : []
            	}
		}
		
	});

	return gradients.Gradient = Gradient;
	
});	

