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
        this.lab_huiHe.text = this.blockColor ? "玩家回合..." : "电脑回合...";
    };
    GameScene.prototype.init = function () {
        this.setGameOverPanel(false);
        this.blockSourceNames = ["img_GoBang_white_png", "img_GoBang_black_png", "img_GoBang_bg_png"];
        //添加触摸点击事件
        this.blockPanel.touchEnabled = true;
        this.blockPanel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
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
        this.currentBlock = blockNode;
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
    // 工厂方法，创建一个方块并返回。
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
     * 控制游戏结束面板的显示隐藏
     * @param type:boolean
     */
    GameScene.prototype.setGameOverPanel = function (type) {
        this.GameOverPanel.visible = type;
        if (type) {
            this.lab_overWinner.text = this.blockColor ? "白方胜利" : "黑方胜利";
            this.btn_reStart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.reStartHandler, this);
        }
        else {
            if (this.btn_reStart.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
                this.btn_reStart.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.reStartHandler, this);
            }
        }
    };
    GameScene.prototype.reStartHandler = function () {
        this.reset();
        this.setGameOverPanel(false);
    };
    GameScene.prototype.release = function () {
        this.reset();
        if (this.btn_reStart.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            this.btn_reStart.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.reStartHandler, this);
        }
    };
    return GameScene;
}(eui.Component));
__reflect(GameScene.prototype, "GameScene", ["eui.UIComponent", "egret.DisplayObject"]);
