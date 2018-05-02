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
        // 所有回收方块的数组
        _this.reBackBlockArr = [];
        // 下一个盒子方向(1靠右侧出现/-1靠左侧出现)
        _this.direction = 1;
        // 随机盒子距离跳台的距离
        _this.minDistance = 240;
        _this.maxDistance = 400;
        // tanθ角度值
        _this.tanAngle = 0.556047197640118;
        // 跳的距离
        _this.jumpDistance = 0;
        // 判断是否是按下状态
        _this.isReadyJump = false;
        // 左侧跳跃点
        _this.leftOrigin = { "x": 180, "y": 350 };
        // 右侧跳跃点
        _this.rightOrigin = { "x": 505, "y": 350 };
        // 游戏中得分
        _this.score = 0;
        return _this;
    }
    GameScene.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    GameScene.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
        this.reset();
    };
    GameScene.prototype.init = function () {
        this.blockSourceNames = ["block1_png", "block2_png", "block3_png"];
        //初始化音频
        this.pushVoice = RES.getRes('push_mp3');
        this.jumpVoice = RES.getRes('jump_mp3');
        //添加触摸事件
        this.blockPanel.touchEnabled = true;
        this.blockPanel.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.keyDownHandler, this);
        this.blockPanel.addEventListener(egret.TouchEvent.TOUCH_END, this.keyUpHandler, this);
        //设置玩家的锚点在中下中心
        this.img_player.anchorOffsetX = this.img_player.width / 2;
        this.img_player.anchorOffsetY = this.img_player.height - 20;
        // 心跳计时器
        egret.Ticker.getInstance().register(function (dt) {
            dt /= 1000;
            if (this.isReadyJump) {
                this.jumpDistance += 300 * dt;
            }
        }, this);
    };
    GameScene.prototype.keyDownHandler = function () {
        // 播放按下的音频
        this.pushSoundChannel = this.pushVoice.play(0, 1);
        // 变形
        egret.Tween.get(this.img_player).to({
            scaleY: 0.5
        }, 3000);
        this.isReadyJump = true;
    };
    GameScene.prototype.keyUpHandler = function () {
        var _this = this;
        // 判断是否是在按下状态
        if (!this.isReadyJump) {
            return;
        }
        // 声明落点坐标
        if (!this.targetPos) {
            this.targetPos = new egret.Point();
        }
        // 立刻让屏幕不可点,等小人落下后重新可点
        this.blockPanel.touchEnabled = false;
        // 停止播放按压音频,并且播放弹跳音频
        this.pushSoundChannel.stop();
        this.jumpVoice.play(0, 1);
        // 清楚所有动画
        egret.Tween.removeAllTweens();
        this.blockPanel.addChild(this.img_player);
        // 结束跳跃状态
        this.isReadyJump = false;
        // 落点坐标
        this.targetPos.x = this.img_player.x + this.jumpDistance * this.direction;
        // 根据落点重新计算斜率,确保小人往目标中心跳跃
        this.targetPos.y = this.img_player.y + this.jumpDistance * (this.currentBlock.y - this.img_player.y) / (this.currentBlock.x - this.img_player.x) * this.direction;
        // 执行跳跃动画
        egret.Tween.get(this).to({ factor: 1 }, 500).call(function () {
            _this.img_player.scaleY = 1;
            _this.jumpDistance = 0;
            // 判断跳跃是否成功
            _this.judgeResult();
        });
        // 执行小人空翻动画
        this.img_player.anchorOffsetY = this.img_player.height / 2;
        egret.Tween.get(this.img_player).to({ rotation: this.direction > 0 ? 360 : -360 }, 200).call(function () {
            _this.img_player.rotation = 0;
        }).call(function () {
            _this.img_player.anchorOffsetY = _this.img_player.height - 20;
        });
    };
    // 重置游戏
    GameScene.prototype.reset = function () {
        // 清空舞台
        this.blockPanel.removeChildren();
        this.blockArr = [];
        // 添加一个方块
        var blockNode = this.createBlock();
        blockNode.touchEnabled = false;
        // 设置方块的起始位置
        blockNode.x = 200;
        blockNode.y = this.height / 2 + blockNode.height;
        this.currentBlock = blockNode;
        // 摆正小人的位置
        this.img_player.y = this.currentBlock.y;
        this.img_player.x = this.currentBlock.x;
        this.blockPanel.addChild(this.img_player);
        this.direction = 1;
        // 添加积分
        this.blockPanel.addChild(this.lab_score);
        // 添加下一个方块
        this.addBlock();
    };
    // 添加一个方块
    GameScene.prototype.addBlock = function () {
        // 随机一个方块
        var blockNode = this.createBlock();
        // 设置随机位置
        var distance = this.minDistance + Math.random() * (this.maxDistance - this.minDistance);
        if (this.direction > 0) {
            blockNode.x = this.currentBlock.x + distance;
            blockNode.y = this.currentBlock.y - distance * this.tanAngle;
        }
        else {
            blockNode.x = this.currentBlock.x - distance;
            blockNode.y = this.currentBlock.y - distance * this.tanAngle;
        }
        // 记录最新的方块
        this.currentBlock = blockNode;
    };
    // 工厂方法，创建一个方块并返回。
    GameScene.prototype.createBlock = function () {
        var blockNode = null;
        if (this.reBackBlockArr.length) {
            // 回收池里面有，则直接取
            blockNode = this.reBackBlockArr.splice(0, 1)[0];
        }
        else {
            // 回收池里面没有，则重新创建
            blockNode = new eui.Image();
        }
        // 使用随机背景图
        var n = Math.floor(Math.random() * this.blockSourceNames.length);
        blockNode.source = this.blockSourceNames[n];
        this.blockPanel.addChild(blockNode);
        // 设置方块的锚点
        blockNode.anchorOffsetX = 222;
        blockNode.anchorOffsetY = 78;
        // 把新创建的block添加进入blockArr里
        this.blockArr.push(blockNode);
        return blockNode;
    };
    GameScene.prototype.judgeResult = function () {
        var _this = this;
        // 根据this.jumpDistance来判断跳跃是否成功
        if (Math.pow(this.currentBlock.x - this.img_player.x, 2) + Math.pow(this.currentBlock.y - this.img_player.y, 2) <= 70 * 70) {
            // 更新积分
            this.score++;
            this.lab_score.text = this.score.toString();
            // 随机下一个方块出现的位置
            this.direction = Math.random() > 0.5 ? 1 : -1;
            // 当前方块要移动到相应跳跃点的距离
            var blockX, blockY;
            blockX = this.direction > 0 ? this.leftOrigin.x : this.rightOrigin.x;
            blockY = this.height / 2 + this.currentBlock.height;
            // 小人要移动到的点.
            var playerX, PlayerY;
            playerX = this.img_player.x - (this.currentBlock.x - blockX);
            PlayerY = this.img_player.y - (this.currentBlock.y - blockY);
            // 更新页面
            this.update(this.currentBlock.x - blockX, this.currentBlock.y - blockY);
            // 更新小人的位置
            egret.Tween.get(this.img_player).to({
                x: playerX,
                y: PlayerY
            }, 1000).call(function () {
                // 开始创建下一个方块
                _this.addBlock();
                // 让屏幕重新可点;
                _this.blockPanel.touchEnabled = true;
            });
            // console.log('x' + x);
            console.log(this.currentBlock.x);
        }
        else {
            // 失败,弹出重新开始的panel
            console.log('游戏失败!');
        }
    };
    // 更新整个舞台(位移动画)
    GameScene.prototype.update = function (x, y) {
        egret.Tween.removeAllTweens();
        for (var i = this.blockArr.length - 1; i >= 0; i--) {
            var blockNode = this.blockArr[i];
            if (blockNode.x + (blockNode.width - 222) < 0 || blockNode.x - 222 > this.width || blockNode.y - 78 > this.height) {
                // 方块超出屏幕,从显示列表中移除
                this.blockPanel.removeChild(blockNode);
                this.blockArr.splice(i, 1);
                // 添加到回收数组中
                this.reBackBlockArr.push(blockNode);
            }
            else {
                // 没有超出屏幕的话,则移动
                egret.Tween.get(blockNode).to({
                    x: blockNode.x - x,
                    y: blockNode.y - y
                }, 1000);
            }
        }
        console.log(this.blockArr);
    };
    Object.defineProperty(GameScene.prototype, "factor", {
        //添加factor的set,get方法,注意用public  
        get: function () {
            return 0;
        },
        //计算方法参考 二次贝塞尔公式  
        set: function (value) {
            this.img_player.x = (1 - value) * (1 - value) * this.img_player.x + 2 * value * (1 - value) * (this.img_player.x + this.targetPos.x) / 2 + value * value * (this.targetPos.x);
            this.img_player.y = (1 - value) * (1 - value) * this.img_player.y + 2 * value * (1 - value) * (this.targetPos.y - 300) + value * value * (this.targetPos.y);
        },
        enumerable: true,
        configurable: true
    });
    GameScene.prototype.release = function () {
    };
    return GameScene;
}(eui.Component));
__reflect(GameScene.prototype, "GameScene", ["eui.UIComponent", "egret.DisplayObject"]);