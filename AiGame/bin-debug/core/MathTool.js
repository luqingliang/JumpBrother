var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MathTool = (function () {
    function MathTool() {
        this.threshold = 1.2;
    }
    /**
     * 判断传入的分数是否是平等的，因为深度不同所以有 阈值
     */
    MathTool.prototype.equal = function (a, b) {
        return (a * this.threshold > b) && (a < b * this.threshold);
    };
    /**
     * 判断是否是更好的分数
     */
    MathTool.prototype.greatThan = function (a, b) {
        return a > b * this.threshold;
    };
    /**
     * 判断是否是更小的分数
     */
    MathTool.prototype.littleThan = function (a, b) {
        return a * this.threshold < b;
    };
    /**
     * 判断小于等于关系
     */
    MathTool.prototype.littleOrEqualThan = function (a, b) {
        return a < b * this.threshold;
    };
    /**
     * 判断大于等于关系
     */
    MathTool.prototype.greatOrEqualThan = function (a, b) {
        return a * this.threshold > b;
    };
    return MathTool;
}());
__reflect(MathTool.prototype, "MathTool");
