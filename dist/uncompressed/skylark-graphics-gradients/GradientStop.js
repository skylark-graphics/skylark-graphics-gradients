define([
	"skylark-langx/langx",
	"skylark-graphics-colors/Color",
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
		
		"_construct"	 :	function(offset,color){
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
