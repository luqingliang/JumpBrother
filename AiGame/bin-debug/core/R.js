var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 角色类
 */
var R = (function () {
    function R() {
    }
    /**
     * 人类
     */
    R.hum = 1;
    /**
     * 电脑
     */
    R.com = 2;
    /**
     * 空位置
     */
    R.empty = 0;
    return R;
}());
__reflect(R.prototype, "R");
