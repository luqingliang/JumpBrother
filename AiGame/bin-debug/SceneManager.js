var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var SceneManager = (function (_super) {
    __extends(SceneManager, _super);
    function SceneManager() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    SceneManager.prototype.init = function () {
        this.beginScene = new BeginScene();
        this.gameScene = new GameScene();
        //也在这里初始化AiManager类
        AiManager.init();
        this.addChild(this.beginScene);
    };
    /**
     * 获取场景管理类的单例
     */
    SceneManager.Instance = function () {
        if (!SceneManager._instance) {
            SceneManager._instance = new SceneManager();
        }
        return SceneManager._instance;
    };
    Object.defineProperty(SceneManager.prototype, "_gameScene", {
        get: function () {
            return this.gameScene;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 切换场景
     */
    SceneManager.prototype.changeScene = function (type, data) {
        if (data === void 0) { data = null; }
        if (type != SceneManager.BEGIN_SCENE) {
            this.beginScene.release();
        }
        if (type != SceneManager.GAME_SCENE) {
            this.gameScene.release();
        }
        if (data != null) {
            this[type].update(data);
        }
        this.removeChildren();
        this.addChild(this[type]);
        this[type].init();
    };
    /**
     * 开始游戏场景名
     */
    SceneManager.BEGIN_SCENE = "beginScene";
    /**
     * 游戏中场景名
     */
    SceneManager.GAME_SCENE = "gameScene";
    return SceneManager;
}(egret.Sprite));
__reflect(SceneManager.prototype, "SceneManager");
