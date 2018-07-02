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
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        // 所有方块资源的数组
        _this.blockSourceNames = [];
        // 所有方块的数组
        _this.blockArr = [];
        // 对方最新下棋的位置
        _this.pointNow1 = { x: 0, y: 0 };
        //我方最新下棋的位置
        _this.pointNow2 = { x: 0, y: 0 };
        //每一格之间的间隔(准确的应该是38.5，测试逐渐修改)
        _this.intervalNum = 38.5;
        //点击事件容差
        _this.clickMarginNum = 10;
        //左上角第一个落点的X和Y坐标（是相对棋盘而非整个舞台）
        _this.numberOneX = 30;
        _this.numberOneY = 30;
        //黑白交替，玩家白，对手黑（true白，false黑）
        _this.blockColor = true;
        return _this;
    }
    GameScene.prototype.update = function (playerFirst) {
        this.blockColor = playerFirst;
    };
    GameScene.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    GameScene.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
        this.reset();
        if (Config.isPVP) {
            this.lab_huiHe.text = this.blockColor ? "我方回合..." : "对方回合...";
        }
        else {
            this.lab_huiHe.text = this.blockColor ? "玩家回合..." : "电脑正在思考...";
        }
    };
    GameScene.prototype.init = function () {
        this.setGameOverPanel(false);
        this.showNotice();
        this.lab_playerNum.visible = Config.isPVP;
        this.lab_timeDown.visible = Config.isPVP;
        this.btn_regret.visible = !Config.isPVP;
        this.btn_changePower.visible = !Config.isPVP;
        this.lab_notice.visible = false;
        this.blockSourceNames = ["img_GoBang_white_png", "img_GoBang_black_png", "img_GoBang_bg_png"];
        //添加触摸点击事件
        this.blockPanel.touchEnabled = true;
        this.blockPanel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backHandler, this);
        if (!Config.isPVP) {
            this.btn_regret.addEventListener(egret.TouchEvent.TOUCH_TAP, this.regretHandler, this);
            this.btn_changePower.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changePowerHandler, this);
            this.setWhoFirst(true);
        }
        console.log(AiManager.pointArray.pointArr);
    };
    //触摸点击事件的回调
    GameScene.prototype.clickHandler = function (e) {
        //定义最终的行和列
        var finalX = 0;
        var finalY = 0;
        //首先拿到点击位置的坐标(经特殊处理的)
        var x = e.localX + this.clickMarginNum;
        var y = e.localY + this.clickMarginNum;
        //首先排除点击在外部边缘的情况
        if (x < (this.numberOneX - this.clickMarginNum) || y < (this.numberOneY - this.clickMarginNum)) {
            return;
        }
        //在第几列
        if (x % this.intervalNum <= this.clickMarginNum || x % this.intervalNum >= (this.intervalNum - this.clickMarginNum)) {
            finalY = Math.floor(x / this.intervalNum) - (x % this.intervalNum <= this.clickMarginNum ? 1 : 0);
        }
        else {
            return;
        }
        //在第几行
        if (y % this.intervalNum <= this.clickMarginNum || y % this.intervalNum >= (this.intervalNum - this.clickMarginNum)) {
            finalX = Math.floor(y / this.intervalNum) - (y % this.intervalNum <= this.clickMarginNum ? 1 : 0);
        }
        else {
            return;
        }
        this.addBlock(finalX, finalY);
    };
    // 添加一个方块
    GameScene.prototype.addBlock = function (x, y) {
        //先检查这个位置上是否有有棋子
        if (AiManager.pointArray.pointArr[x][y] != 0) {
            return;
        }
        // 创建一个方块
        var blockNode = this.createBlock();
        this.blockPanel.addChild(blockNode);
        // 设置方块的锚点
        blockNode.anchorOffsetX = 16;
        blockNode.anchorOffsetY = 16;
        //设置添加的位置
        blockNode.x = y * this.intervalNum + this.numberOneX;
        blockNode.y = x * this.intervalNum + this.numberOneY;
        //更新棋盘数组
        AiManager.pointArray.put(x, y, this.blockColor);
        // 把新创建的棋子加进入blockArr里
        this.blockArr.push(blockNode);
        // 记录最新的棋子
        if (this.blockColor) {
            this.currentBlock2 = blockNode;
            this.pointNow2.x = x;
            this.pointNow2.y = y;
        }
        else {
            this.currentBlock1 = blockNode;
            this.pointNow1.x = x;
            this.pointNow1.y = y;
        }
        //PVP模式发送我方下的位置
        if (Config.isPVP && this.blockColor) {
            AiManager.webSocket.sendPoint({ x: x, y: y });
        }
        //判断输赢
        if (AiManager.pointArray.searchWinner(AiManager.pointArray.pointArr, x, y)) {
            //赢了显示游戏结束面板
            this.setGameOverPanel(true);
        }
        //交替回合
        this.blockColor = !this.blockColor;
        if (Config.isPVP) {
            this.lab_huiHe.text = this.blockColor ? "我方回合..." : "对方回合...";
        }
        else {
            this.lab_huiHe.text = this.blockColor ? "玩家回合..." : "电脑正在思考...";
        }
        var timer = new egret.Timer(100, 1);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerHandler, this);
        timer.start();
    };
    GameScene.prototype.timerHandler = function () {
        if (this.blockColor == false) {
            this.blockPanel.touchEnabled = false;
            if (Config.isPVP) {
            }
            else {
                var arr = AiManager.ai.getPoint();
                this.addBlock(arr[0], arr[1]);
                console.log("电脑选择走第 " + arr[0] + " 行，第 " + arr[1] + " 列！");
            }
        }
        else {
            this.blockPanel.touchEnabled = true;
        }
    };
    // 工厂方法，创建一个棋子image对象并返回。
    GameScene.prototype.createBlock = function () {
        var blockNode = new eui.Image();
        // 根据是谁的回合来确定背景图
        if (this.blockColor) {
            blockNode.source = this.blockSourceNames[0];
        }
        else {
            blockNode.source = this.blockSourceNames[1];
        }
        return blockNode;
    };
    // 重置游戏
    GameScene.prototype.reset = function () {
        this.blockPanel.removeChildren();
        //重置棋盘落子数组
        AiManager.pointArray.reSet();
        this.blockArr.length = 0;
        this.blockColor = true;
    };
    /**
     * 悔棋模块
     */
    GameScene.prototype.regret = function () {
        this.blockPanel.removeChild(this.currentBlock1);
        this.blockPanel.removeChild(this.currentBlock2);
        AiManager.pointArray.regret(this.pointNow1.x, this.pointNow1.y);
        AiManager.pointArray.regret(this.pointNow2.x, this.pointNow2.y);
    };
    /**
     * 控制游戏结束面板的显示隐藏
     * @param type:boolean
     */
    GameScene.prototype.setGameOverPanel = function (type, timeOut) {
        if (timeOut === void 0) { timeOut = false; }
        this.GameOverPanel.visible = type;
        if (type) {
            if (timeOut) {
                this.lab_overWinner.text = this.blockColor ? "我方超时" : "对方超时";
            }
            else {
                if (Config.isPVP) {
                    this.lab_overWinner.text = this.blockColor ? "我方胜利" : "对方胜利";
                }
                else {
                    this.lab_overWinner.text = this.blockColor ? "我方胜利" : "电脑胜利";
                }
            }
            this.btn_reStart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.reStartHandler, this);
            if (Config.isPVP) {
                AiManager.webSocket.sendGameOver();
            }
        }
        else {
            if (this.btn_reStart.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
                this.btn_reStart.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.reStartHandler, this);
            }
        }
    };
    /**
     * 控制警告面板
     */
    GameScene.prototype.showNotice = function (obj) {
        if (obj === void 0) { obj = null; }
        if (obj == null) {
            this.noticePanel.visible = false;
            if (this.btn_ok.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
                this.btn_ok.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.okHandler, this);
            }
            if (this.btn_cancel.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
                this.btn_cancel.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.cancelHandler, this);
            }
        }
        else {
            this.noticePanel.visible = true;
            this.lab_title.text = obj.title;
            this.lab_body.text = obj.body;
            this.btn_ok.addEventListener(egret.TouchEvent.TOUCH_TAP, this.okHandler, this);
            this.btn_cancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.cancelHandler, this);
        }
    };
    /**
     * 控制更改棋力面板
     */
    GameScene.prototype.setChangePower = function (type) {
        this.changePowerPanel.visible = type;
        if (type) {
            this.lab_deeps.text = Config.searchDeep.toString();
            this.lab_long.text = Config.countLimit.toString();
            this.changePowerPanel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changePowerPanelHandler, this);
        }
        else {
            if (this.changePowerPanel.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
                this.changePowerPanel.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.changePowerPanelHandler, this);
            }
        }
    };
    /**
     * 控制警告提示框的显示
     */
    GameScene.prototype.showNoticeLable = function (texts) {
        this.lab_notice.visible = true;
        this.lab_notice.text = texts;
        var tw = egret.Tween.get(this.lab_notice);
        tw.to({ visible: false }, 1000);
    };
    /**
     * 控制选择先手面板
     */
    GameScene.prototype.setWhoFirst = function (type) {
        this.whoFirstPanel.visible = type;
        if (type) {
            this.whoFirstPanel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.whoFirstHandler, this);
        }
        else {
            if (this.whoFirstPanel.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
                this.whoFirstPanel.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.whoFirstHandler, this);
            }
        }
    };
    /**
     * 控制文字的显示
     */
    GameScene.prototype.updateText = function (texts) {
        this.lab_huiHe.text = texts;
    };
    /**
     * 控制是否接收鼠标事件
     */
    GameScene.prototype.setTouchEnabled = function (status) {
        this.blockPanel.touchEnabled = status;
        this.blockColor = status;
    };
    /**
     * 更新在线玩家数量
     */
    GameScene.prototype.updatePlayerNum = function (num) {
        this.lab_playerNum.text = "当前在线玩家人数：" + num;
    };
    /**
     * 更新PVP回合倒计时显示
     */
    GameScene.prototype.updateTimeDown = function (num) {
        this.lab_timeDown.text = num.toString();
    };
    GameScene.prototype.whoFirstHandler = function (e) {
        switch (e.target) {
            case this.btn_humanFirst: {
                this.setWhoFirst(false);
                break;
            }
            case this.btn_comFirst: {
                this.setWhoFirst(false);
                this.blockColor = false;
                this.blockPanel.touchEnabled = false;
                this.addBlock(7, 7);
                break;
            }
        }
    };
    GameScene.prototype.cancelHandler = function () {
        this.showNotice();
    };
    GameScene.prototype.okHandler = function () {
        this.showNotice();
        this.reset();
        SceneManager.Instance().changeScene(SceneManager.BEGIN_SCENE);
    };
    GameScene.prototype.reStartHandler = function () {
        this.reset();
        this.setGameOverPanel(false);
        if (Config.isPVP) {
            AiManager.webSocket.getRival();
        }
    };
    GameScene.prototype.backHandler = function () {
        this.reset();
        SceneManager.Instance().changeScene(SceneManager.BEGIN_SCENE);
    };
    GameScene.prototype.regretHandler = function () {
        this.regret();
    };
    GameScene.prototype.changePowerHandler = function () {
        this.setChangePower(true);
    };
    GameScene.prototype.changePowerPanelHandler = function (e) {
        switch (e.target) {
            case this.btn_confirm: {
                this.setChangePower(false);
                break;
            }
            case this.btn_down1: {
                if (Config.searchDeep > 2) {
                    Config.searchDeep--;
                }
                break;
            }
            case this.btn_down2: {
                if (Config.countLimit > 10) {
                    Config.countLimit--;
                }
                break;
            }
            case this.btn_up1: {
                if (Config.searchDeep < 8) {
                    Config.searchDeep++;
                }
                break;
            }
            case this.btn_up2: {
                if (Config.countLimit < 30) {
                    Config.countLimit++;
                }
                break;
            }
        }
        this.lab_deeps.text = Config.searchDeep.toString();
        this.lab_long.text = Config.countLimit.toString();
    };
    GameScene.prototype.release = function () {
        this.reset();
        if (this.btn_reStart.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            this.btn_reStart.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.reStartHandler, this);
        }
        if (this.btn_back.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            this.btn_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.backHandler, this);
        }
    };
    return GameScene;
}(eui.Component));
__reflect(GameScene.prototype, "GameScene", ["eui.UIComponent", "egret.DisplayObject"]);
