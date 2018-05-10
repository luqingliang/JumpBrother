var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 分数类 给单个棋形打分
 * 用一个7位数表示棋（这样表示的原因是，不管这一步可以带来多少种连击得分，加起来也超不过他的上一级），从高位到低位分别表示
 * 连五，活四，眠四，活三，活二/眠三，活一/眠二, 眠一
 */
var S = (function () {
    function S() {
    }
    /**
     * 活1
     */
    S.ONE = 10;
    /**
     * 活2
     */
    S.TWO = 100;
    /**
     * 活3
     */
    S.THREE = 1000;
    /**
     * 活4
     */
    S.FOUR = 100000;
    /**
     * 连5
     */
    S.FIVE = 1000000;
    /**
     * 眠1
     */
    S.BLOCKED_ONE = 1;
    /**
     * 眠2
     */
    S.BLOCKED_TWO = 10;
    /**
     * 眠3
     */
    S.BLOCKED_THREE = 100;
    /**
     * 眠4
     */
    S.BLOCKED_FOUR = 10000;
    return S;
}());
__reflect(S.prototype, "S");
