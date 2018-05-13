var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Sockets = (function () {
    function Sockets() {
        this.timeNum = 30;
    }
    /**
     * 建立连接
     */
    Sockets.prototype.getConnect = function () {
        this.socket = io.connect("http://localhost:8080/", { "reconnection": false }); //跟的参数的意思是不自动重连
        this.socket.on('connect', function () {
            console.log("连接成功！");
            //切换到游戏中场景
            SceneManager.Instance().changeScene(SceneManager.GAME_SCENE, true);
            AiManager.webSocket.getRival();
        });
        this.socket.on('disconnect', function (data) {
            console.log("断开连接！");
            SceneManager.Instance()._gameScene.showNotice({ title: "警告", body: "与服务器断开连接，是否重连？" });
        });
        //游戏开始
        this.socket.on('Game-Start', function (data) {
            console.log(data);
            SceneManager.Instance()._gameScene.updateText("匹配成功，游戏开始！");
            if (data.isFirst) {
                SceneManager.Instance()._gameScene.setTouchEnabled(true);
                SceneManager.Instance()._gameScene.updateText("我方回合...");
            }
            else {
                SceneManager.Instance()._gameScene.setTouchEnabled(false);
                SceneManager.Instance()._gameScene.updateText("对方回合...");
            }
            AiManager.webSocket.timeDown(); //开始倒计时
        });
        //监听在线玩家数量
        this.socket.on('playerNum', function (data) {
            SceneManager.Instance()._gameScene.updatePlayerNum(data.num);
        });
        //监听对手下棋
        this.socket.on('Game-Receive', function (data) {
            console.log("对方选择的下棋位置： " + data.x + "," + data.y);
            SceneManager.Instance()._gameScene.addBlock(data.x, data.y);
            AiManager.webSocket.timeDown();
        });
    };
    /**
     * 请求匹配对手
     */
    Sockets.prototype.getRival = function () {
        SceneManager.Instance()._gameScene.updateText("正在匹配对手...");
        this.socket.emit("Game-Matching");
    };
    /**
     * 发送下棋位置
     */
    Sockets.prototype.sendPoint = function (obj) {
        this.socket.emit("Game-SendPoint", obj);
        AiManager.webSocket.timeDown();
    };
    /**
     * 发送对局结束
     */
    Sockets.prototype.sendGameOver = function () {
        this.socket.emit("Game-GameOver");
        this.timer.stop();
    };
    /**
     * 回合定时器
     */
    Sockets.prototype.timeDown = function () {
        if (this.timeNum > 0 && this.timeNum < 30) {
            this.timer.stop();
            this.timeNum = 30;
        }
        else {
            this.timer = new egret.Timer(1000, 0);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerHandler, this);
        }
        this.timer.start();
    };
    Sockets.prototype.timerHandler = function () {
        SceneManager.Instance()._gameScene.updateTimeDown(this.timeNum);
        if (this.timeNum > 0) {
            this.timeNum--;
        }
        else {
            this.timer.stop();
            this.timeNum = 30;
            SceneManager.Instance()._gameScene.setGameOverPanel(true, true);
        }
    };
    return Sockets;
}());
__reflect(Sockets.prototype, "Sockets");
