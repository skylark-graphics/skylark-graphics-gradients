/**
 * skylark-graphics-gradients - The skylark gradient class library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.1
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-graphics-color","./gradients","./GradientPoint","./GradientStop"],function(t,n,o,r,i){var s=t.klass({klassName:"Gradient",endPoint:{get:function(){return this._.endPoint}},fromColor:{get:function(){return this._.fromColor}},startPoint:{get:function(){return this._.startPoint}},stops:{get:function(){return this._.stops}},toColor:{get:function(){return this._.toColor}},addColorStop:function(t,n){this._.stops.push(new i(t,n))},_construct:function(){this._={stops:[]}}});return o.Gradient=s});
//# sourceMappingURL=sourcemaps/Gradient.js.map
