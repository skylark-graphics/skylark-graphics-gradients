/**
 * skylark-graphics-gradients - The skylark gradient class library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.1
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","./gradients"],function(t,n){var r=t.klass({klassName:"GradientPoint",x:{get:function(){return this._.x}},y:{get:function(){return this._.y}},clone:function(){var t=this._;return new r(t.x,t.y)},notEqual:function(t){return!t||t.x&&t.x.notEqual(this.width)||t.y&&t.y.notEqual(this.height)},equal:function(t){return!this.notEqual(t)},toString:function(){var t,n,r=this.x,i=this.y;return"min"==(t=r.toString())?t="left":"mid"==t?t="center":"max"==t&&(t="right"),"min"==(n=i.toString())?n="top":"mid"==t?n="center":"max"==t&&(n="bottom"),t+" "+n},_construct:function(t,n){var r={};void 0!=t&&(Type.isString(t)&&("left"==t?t="min":"center"==t?t="mid":"right"==t&&(t="max")),r.x=t),void 0!=n&&(Type.isString(n)&&("top"==n?n="min":"center"==n?n="mid":"bottom"==n&&(n="max")),r.y=n),this._=r}});return r.fromString=function(t){var n=t.split(" ");return r.fromArray(n)},r.fromPlain=function(t){return new r(t.x,t.y)},r.fromArray=function(t){return new r(t[0],t.length>1?t[1]:"center")},n.GradientPoint=r});
//# sourceMappingURL=sourcemaps/gradient-point.js.map
