/**
 * skylark-graphics-gradients - The skylark gradient class library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.1
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-graphics-colors/color","./gradients","./gradient","./gradient-point","./gradient-stop"],function(t,o,s,r,i,a){var n=r.inherit({klassName:"RadialGradient",startRadius:{type:Number},endRadius:{type:Number},toString:function(){var t={type:"radial",webkitGradType:"radial",stops:[],webKitPosn1:this.startPoint.toString(),webKitPosn2:this.endPoint.toString(),webKitRadius1:this.startRadius&&this.startRadius.toString(),webKitRadius2:this.endRadius&&this.endRadius.toString()};t.stops.push({color:o.toCss(this.fromColor)});for(var s=this.stops,r=0;r<s.length;r++){var i=s[r];t.stops.push({pos:i.offset.toString(),color:i.color.toString()})}return t.stops.push({color:o.toCss(this.toColor)}),CssUtils.buildBackgroundImage(t)[0]},_construct:function(t){if(this._={startPoint:t.startPoint,endPoint:t.endPoint,fromColor:t.fromColor,toColor:t.toColor,startRadius:t.startRadius,endRadius:t.endRadius},t.stops)for(var o=t.stops,s=0;s<o.length;s++){var r=o[s];this.addColorStop(r.offset,r.color)}}});return n.fromString=function(t){var o=CssUtils.parseBackgroundImage(t);return"radial"==o.type?new n({startPoint:o.webKitPosn1,endPoint:o.webKitPosn2,startRadius:o.webKitRadius1,endRadius:o.webKitRadius2,fromColor:o.stops[0].color,toColor:o.stops[o.stops.length-1].color,stops:o.stops.slice(1,o.stops.length-1).map(function(t){return{offset:t.pos,color:t.color}})}):null},s.RadialGradient=n});
//# sourceMappingURL=sourcemaps/radial-gradient.js.map
