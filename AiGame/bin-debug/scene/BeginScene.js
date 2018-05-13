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
var BeginScene = (function (_super) {
    __extends(BeginScene, _super);
    function BeginScene() {
        return _super.call(this) || this;
    }
    BeginScene.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    BeginScene.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        //注意要在页面加载完成后调用初始化方法，在构造函数中会报错
        this.init();
    };
    //初始化，并绑定事件
    BeginScene.prototype.init = function () {
        this.showPanel(false);
        this.btn_begin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapHandler, this);
    };
    BeginScene.prototype.tapHandler = function () {
        this.showPanel(true);
    };
    BeginScene.prototype.showPanel = function (status) {
        if (status) {
            this.selectPanel.visible = true;
            this.btn_playWithAi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickPlayWithAi, this);
            this.btn_playWithPlayer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickPlayWithPlayer, this);
        }
        else {
            this.selectPanel.visible = false;
            if (this.btn_playWithAi.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
                this.btn_playWithAi.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickPlayWithAi, this);
            }
            if (this.btn_playWithPlayer.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
                this.btn_playWithPlayer.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickPlayWithPlayer, this);
            }
        }
    };
    BeginScene.prototype.clickPlayWithAi = function () {
        this.showPanel(false);
        Config.isPVP = false;
        //切换到游戏中场景
        SceneManager.Instance().changeScene(SceneManager.GAME_SCENE, true);
    };
    BeginScene.prototype.clickPlayWithPlayer = function () {
        this.showPanel(false);
        Config.isPVP = true;
        //建立socket连接
        AiManager.webSocket.getConnect();
    };
    BeginScene.prototype.release = function () {
        if (this.btn_begin.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            this.btn_begin.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tapHandler, this);
        }
    };
    return BeginScene;
}(eui.Component));
__reflect(BeginScene.prototype, "BeginScene", ["eui.UIComponent", "egret.DisplayObject"]);
