var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config = (function () {
    function Config() {
    }
    /**
     * 是否是玩家对战
     */
    Config.isPVP = false;
    /**
     * 搜索深度
     */
    Config.searchDeep = 4;
    /**
     * gen函数返回的节点数量上限，超过之后将会按照分数进行截断
     */
    Config.countLimit = 60;
    /**
     * 搜索每深入一层，同样的分数会打一个折扣（因为你不知道玩家会怎么走，也就是说这步棋不一定会出现）
     */
    Config.deepDecrease = 0.8;
    /**
     * 是否进行启发搜索
     */
    Config.isGen = true;
    /**
     * 是否进行预估排序
     */
    Config.isOmen = true;
    /**
     * 是否进行剪枝
     */
    Config.isAlphaBeta = true;
    return Config;
}());
__reflect(Config.prototype, "Config");
