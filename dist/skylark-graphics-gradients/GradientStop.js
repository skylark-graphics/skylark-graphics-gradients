/**
 * skylark-graphics-gradients - The skylark gradient class library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.1
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-graphics-color","./gradients"],function(t,n,o){var r=t.klass({klassName:"GradientStop",offset:{get:function(){return this._.offset}},color:{get:function(){return this._.color}},equal:function(t){return!this.notEqual(t)},notEqual:function(t){return!t||t.offset!=this.offset||t.color.notEqual(this.color)},_construct:function(n,o){if(t.isString(n)){var r=Number.parsePercent(n);null!=r&&(n=r)}this._={offset:n,color:o}}});return o.GradientStop=r});
//# sourceMappingURL=sourcemaps/GradientStop.js.map
