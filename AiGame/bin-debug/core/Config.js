var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config = (function () {
    function Config() {
    }
    /**
     * 搜索深度
     */
    Config.searchDeep = 6;
    /**
     * gen函数返回的节点数量上限，超过之后将会按照分数进行截断
     */
    Config.countLimit = 16;
    /**
     * 算杀深度
     */
    Config.checkmateDeep = 5;
    /**
     * 是否使用效率不高的置换表
     */
    Config.cache = false;
    /**
     * 在vcx中使用置换表
     */
    Config.vcxCache = true;
    /**
     * 搜索每深入一层，同样的分数会打一个折扣（因为你不知道玩家会怎么走，也就是说这步棋不一定会出现）
     */
    Config.deepDecrease = 0.8;
    return Config;
}());
__reflect(Config.prototype, "Config");
