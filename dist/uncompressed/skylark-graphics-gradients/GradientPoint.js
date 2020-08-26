define([
	"skylark-langx/langx",
	"./gradients"
], function(langx, gradients) {

	var GradientPoint = langx.klass({
		"klassName"	:	"GradientPoint",

		"x" : {
			get : function() {
				return this._.x;
			}
		},

		"y" : {
			get : function() {
				return this._.y;
			}
		},
		
		"clone"	: function(){
			var _ = this._;
			return new GradientPoint(_.x,_.y);
		
		},
		
		"notEqual"	:	function(/*GradientPoint*/gp) {
			return !gp || gp.x && gp.x.notEqual(this.width) || gp.y && gp.y.notEqual(this.height);
		},
		
		"equal"	:	function(/*GradientPoint*/gp){
			return  !this.notEqual(gp);
		},

		"toString" : function(){
			var xs,ys,x = this.x,y= this.y;
			xs = x.toString();
			if (xs == "min") {
				xs = "left";
			} else if (xs == "mid") {
				xs = "center";
			} else if (xs == "max") {
				xs = "right";
			}

			ys = y.toString();
			if (ys == "min") {
				ys = "top";
			} else if (xs == "mid") {
				ys = "center";
			} else if (xs == "max") {
				ys = "bottom";
			}

			return xs + " " + ys;
		},	
		
		"_construct" : function(x,y){
			var props = {};
			if (x != undefined) {
				if (Type.isString(x)) {
					if (x == "left") {
						x = "min";
					} else if (x == "center") {
						x = "mid";
					} else if (x == "right") {
						x = "max";
					}
				}
				props.x = x;
			}
			if (y != undefined) {
				if (Type.isString(y)) {
					if (y == "top") {
						y = "min";
					} else if (y == "center") {
						y = "mid";
					} else if (y == "bottom") {
						y = "max";
					}
				}
				props.y = y;
			}
			this._ = props;
		}		
	});

	GradientPoint.fromString = function(s) {
		var a = s.split(" ");
        return GradientPoint.fromArray(a)
	};

	GradientPoint.fromPlain = function(o) {
		return new GradientPoint(o.x,o.y);
	};

	GradientPoint.fromArray = function(a) {
		return new GradientPoint(a[0],a.length>1?a[1]:"center");
	};


	return gradients.GradientPoint = GradientPoint;
	
});	

