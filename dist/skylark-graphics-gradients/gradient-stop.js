/**
 * skylark-graphics-gradients - The skylark gradient class library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.1
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-graphics-colors/color","./gradients"],function(t,o,n){var r=t.klass({klassName:"GradientStop",offset:{get:function(){return this._.offset}},color:{get:function(){return this._.color}},equal:function(t){return!this.notEqual(t)},notEqual:function(t){return!t||t.offset!=this.offset||t.color.notEqual(this.color)},_construct:function(o,n){if(t.isString(o)){var r=Number.parsePercent(o);null!=r&&(o=r)}this._={offset:o,color:n}}});return n.GradientStop=r});
//# sourceMappingURL=sourcemaps/gradient-stop.js.map
