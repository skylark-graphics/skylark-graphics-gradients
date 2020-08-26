/**
 * skylark-graphics-gradients - The skylark gradient class library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.1
 * @link www.skylarkjs.org
 * @license MIT
 */
(function(factory,globals) {
  var define = globals.define,
      require = globals.require,
      isAmd = (typeof define === 'function' && define.amd),
      isCmd = (!isAmd && typeof exports !== 'undefined');

  if (!isAmd && !define) {
    var map = {};
    function absolute(relative, base) {
        if (relative[0]!==".") {
          return relative;
        }
        var stack = base.split("/"),
            parts = relative.split("/");
        stack.pop(); 
        for (var i=0; i<parts.length; i++) {
            if (parts[i] == ".")
                continue;
            if (parts[i] == "..")
                stack.pop();
            else
                stack.push(parts[i]);
        }
        return stack.join("/");
    }
    define = globals.define = function(id, deps, factory) {
        if (typeof factory == 'function') {
            map[id] = {
                factory: factory,
                deps: deps.map(function(dep){
                  return absolute(dep,id);
                }),
                resolved: false,
                exports: null
            };
            require(id);
        } else {
            map[id] = {
                factory : null,
                resolved : true,
                exports : factory
            };
        }
    };
    require = globals.require = function(id) {
        if (!map.hasOwnProperty(id)) {
            throw new Error('Module ' + id + ' has not been defined');
        }
        var module = map[id];
        if (!module.resolved) {
            var args = [];

            module.deps.forEach(function(dep){
                args.push(require(dep));
            })

            module.exports = module.factory.apply(globals, args) || null;
            module.resolved = true;
        }
        return module.exports;
    };
  }
  
  if (!define) {
     throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");
  }

  factory(define,require);

  if (!isAmd) {
    var skylarkjs = require("skylark-langx-ns");

    if (isCmd) {
      module.exports = skylarkjs;
    } else {
      globals.skylarkjs  = skylarkjs;
    }
  }

})(function(define,require) {

define('skylark-graphics-gradients/gradients',[
	"skylark-langx/skylark"
],function(skylark){
	return skylark.attach("graphics.gradients",{});
});


define('skylark-graphics-gradients/GradientPoint',[
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


define('skylark-graphics-gradients/GradientStop',[
	"skylark-langx/langx",
	"skylark-graphics-color",
	"./gradients",
],function(langx,Color,gradients) {
	var GradientStop = langx.klass({
		"klassName": "GradientStop",
		"offset" : {
			get : function() {
				return this._.offset;
			}		
		},
		
		"color" : {
			get : function() {
				return this._.color;
			}		
		},
        
        equal: function(target) {
            return !this.notEqual(target);
        },

        notEqual: function(target) {
			return !target || 
					target.offset != this.offset || 
					target.color.notEqual(this.color);
        },
		
		"construct"	 :	function(offset,color){
			if (langx.isString(offset)) {
				var parsed = Number.parsePercent(offset);
				if (parsed != null) {
					offset = parsed;
				}
			}
			this._ = {
				"offset"	:	offset,
				"color"		:	color
			};
		}
	});

	
	return gradients.GradientStop = GradientStop;
});

define('skylark-graphics-gradients/Gradient',[
	"skylark-langx/langx",
	"skylark-graphics-color",
	"./gradients",
	"./GradientPoint",
	"./GradientStop"
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


define('skylark-graphics-gradients/LinearGradient',[
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

define('skylark-graphics-gradients/RadialGradient',[
	"skylark-langx/langx",
	"skylark-graphics-color",
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

define('skylark-graphics-gradients/main',[
	"./gradients",
	"./Gradient",
	"./GradientPoint",
	"./GradientStop",
	"./LinearGradient",
	"./RadialGradient"
],function(gradients){
	return gradients;
});


define('skylark-graphics-gradients', ['skylark-graphics-gradients/main'], function (main) { return main; });


},this);
//# sourceMappingURL=sourcemaps/skylark-graphics-gradients.js.map
