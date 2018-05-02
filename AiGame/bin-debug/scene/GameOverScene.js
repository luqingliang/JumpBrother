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
var GameOverScene = (function (_super) {
    __extends(GameOverScene, _super);
    function GameOverScene() {
        return _super.call(this) || this;
    }
    GameOverScene.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    GameOverScene.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    GameOverScene.prototype.init = function () {
        this.btn_reStart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.reStartHandler, this);
    };
    GameOverScene.prototype.reStartHandler = function () {
        SceneManager.Instance().changeScene(SceneManager.GAME_SCENE);
    };
    GameOverScene.prototype.release = function () {
        if (this.btn_reStart.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            this.btn_reStart.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.reStartHandler, this);
        }
    };
    return GameOverScene;
}(eui.Component));
__reflect(GameOverScene.prototype, "GameOverScene", ["eui.UIComponent", "egret.DisplayObject"]);
