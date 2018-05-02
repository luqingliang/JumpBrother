var egret = window.egret;var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var AssetAdapter = (function () {
    function AssetAdapter() {
    }
    /**
     * @language zh_CN
     * 解析素材
     * @param source 待解析的新素材标识符
     * @param compFunc 解析完成回调函数，示例：callBack(content:any,source:string):void;
     * @param thisObject callBack的 this 引用
     */
    AssetAdapter.prototype.getAsset = function (source, compFunc, thisObject) {
        function onGetRes(data) {
            compFunc.call(thisObject, data, source);
        }
        if (RES.hasRes(source)) {
            var data = RES.getRes(source);
            if (data) {
                onGetRes(data);
            }
            else {
                RES.getResAsync(source, onGetRes, this);
            }
        }
        else {
            RES.getResByUrl(source, onGetRes, this, RES.ResourceItem.TYPE_IMAGE);
        }
    };
    return AssetAdapter;
}());
__reflect(AssetAdapter.prototype, "AssetAdapter", ["eui.IAssetAdapter"]);
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.createView();
        return _this;
    }
    LoadingUI.prototype.createView = function () {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = 300;
        this.textField.width = 480;
        this.textField.height = 100;
        this.textField.textAlign = "center";
    };
    LoadingUI.prototype.onProgress = function (current, total) {
        this.textField.text = "Loading..." + current + "/" + total;
    };
    return LoadingUI;
}(egret.Sprite));
__reflect(LoadingUI.prototype, "LoadingUI", ["RES.PromiseTaskReporter"]);
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, userInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        return [4 /*yield*/, RES.getResAsync("description_json")];
                    case 2:
                        result = _a.sent();
                        this.startAnimation(result);
                        return [4 /*yield*/, platform.login()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, platform.getUserInfo()];
                    case 4:
                        userInfo = _a.sent();
                        console.log(userInfo);
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.loadTheme()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 3:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadTheme = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            var theme = new eui.Theme("resource/default.thm.json", _this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                resolve();
            }, _this);
        });
    };
    /**
     * 创建场景界面
     * Create scene interface
     */
    Main.prototype.createGameScene = function () {
        this.addChild(SceneManager.Instance());
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Main.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    Main.prototype.startAnimation = function (result) {
        var _this = this;
        var parser = new egret.HtmlTextParser();
        var textflowArr = result.map(function (text) { return parser.parse(text); });
        var textfield = this.textfield;
        var count = -1;
        var change = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var textFlow = textflowArr[count];
            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            var tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, _this);
        };
        change();
    };
    /**
     * 点击按钮
     * Click the button
     */
    Main.prototype.onButtonClick = function (e) {
        var panel = new eui.Panel();
        panel.title = "Title";
        panel.horizontalCenter = 0;
        panel.verticalCenter = 0;
        this.addChild(panel);
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
var DebugPlatform = (function () {
    function DebugPlatform() {
    }
    DebugPlatform.prototype.getUserInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, { nickName: "username" }];
            });
        });
    };
    DebugPlatform.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return DebugPlatform;
}());
__reflect(DebugPlatform.prototype, "DebugPlatform", ["Platform"]);
if (!window.platform) {
    window.platform = new DebugPlatform();
}
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
    /**
     * 切换场景
     */
    SceneManager.prototype.changeScene = function (type) {
        if (type != SceneManager.BEGIN_SCENE) {
            console.log(this.beginScene);
            this.beginScene.release();
        }
        if (type != SceneManager.GAME_SCENE) {
            this.gameScene.release();
        }
        this.removeChildren();
        this.addChild(this[type]);
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
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var ThemeAdapter = (function () {
    function ThemeAdapter() {
    }
    /**
     * 解析主题
     * @param url 待解析的主题url
     * @param onSuccess 解析完成回调函数，示例：compFunc(e:egret.Event):void;
     * @param onError 解析失败回调函数，示例：errorFunc():void;
     * @param thisObject 回调的this引用
     */
    ThemeAdapter.prototype.getTheme = function (url, onSuccess, onError, thisObject) {
        function onResGet(e) {
            onSuccess.call(thisObject, e);
        }
        function onResError(e) {
            if (e.resItem.url == url) {
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
                onError.call(thisObject);
            }
        }
        if (typeof generateEUI !== 'undefined') {
            egret.callLater(function () {
                onSuccess.call(thisObject, generateEUI);
            }, this);
        }
        else {
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
            RES.getResByUrl(url, onResGet, this, RES.ResourceItem.TYPE_TEXT);
        }
    };
    return ThemeAdapter;
}());
__reflect(ThemeAdapter.prototype, "ThemeAdapter", ["eui.IThemeAdapter"]);
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
        this.btn_begin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapHandler, this);
    };
    BeginScene.prototype.tapHandler = function () {
        //切换到游戏中场景
        SceneManager.Instance().changeScene(SceneManager.GAME_SCENE);
    };
    BeginScene.prototype.release = function () {
        if (this.btn_begin.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            this.btn_begin.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tapHandler, this);
        }
    };
    return BeginScene;
}(eui.Component));
__reflect(BeginScene.prototype, "BeginScene", ["eui.UIComponent", "egret.DisplayObject"]);
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
        this.setGameOverPanel(false);
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
        //屏蔽鼠标事件（防止反复点按）
        this.blockPanel.touchEnabled = false;
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
    GameScene.prototype.judgeResult = function () {
        var _this = this;
        // 根据this.jumpDistance来判断跳跃是否成功
        if (Math.pow(this.currentBlock.x - this.img_player.x, 2) + Math.pow(this.currentBlock.y - this.img_player.y, 2) <= 70 * 70) {
            // 更新积分
            this.score++;
            this.lab_score.text = this.score.toString();
            //放开面板的点击事件
            this.blockPanel.touchEnabled = true;
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
            }, 500).call(function () {
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
            this.lab_score.text = "0";
            this.setGameOverPanel(true);
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
                }, 500);
            }
        }
        console.log(this.blockArr);
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
        this.score = 0;
        this.blockPanel.addChild(this.lab_score);
        // 添加下一个方块
        this.addBlock();
        //放开舞台的点击事件
        this.blockPanel.touchEnabled = true;
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
    /**
     * 控制游戏结束面板的显示隐藏
     * @param type:boolean
     */
    GameScene.prototype.setGameOverPanel = function (type) {
        this.GameOverPanel.visible = type;
        if (type) {
            this.btn_reStart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.reStartHandler, this);
            this.lab_overScore.text = this.score.toString();
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
        if (this.blockPanel.hasEventListener(egret.TouchEvent.TOUCH_BEGIN)) {
            this.blockPanel.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.keyDownHandler, this);
        }
        if (this.blockPanel.hasEventListener(egret.TouchEvent.TOUCH_END)) {
            this.blockPanel.removeEventListener(egret.TouchEvent.TOUCH_END, this.keyUpHandler, this);
        }
    };
    return GameScene;
}(eui.Component));
__reflect(GameScene.prototype, "GameScene", ["eui.UIComponent", "egret.DisplayObject"]);
;window.Main = Main;