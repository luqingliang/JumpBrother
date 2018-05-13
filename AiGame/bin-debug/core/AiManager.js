var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AiManager = (function () {
    function AiManager() {
    }
    /**
     * 初始化
     */
    AiManager.init = function () {
        this.pointArray = new PointArray();
        this.score = new Score();
        this.ai = new AiPlayer();
        this.math = new MathTool();
        this.webSocket = new Sockets();
    };
    return AiManager;
}());
__reflect(AiManager.prototype, "AiManager");
