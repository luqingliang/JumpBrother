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
    };
    return AiManager;
}());
__reflect(AiManager.prototype, "AiManager");
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
        //也在这里初始化AiManager类
        AiManager.init();
        console.log(AiManager.pointArray.pointArr);
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
    SceneManager.prototype.changeScene = function (type, data) {
        if (data === void 0) { data = null; }
        if (type != SceneManager.BEGIN_SCENE) {
            console.log(this.beginScene);
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
var AiPlayer = (function () {
    function AiPlayer() {
    }
    /**
     * version1 : 先简单的随机一个位置下棋
     * version2 : 随机棋子必须出现在敌方棋子相邻处（防守能力加强）
     * version3 : 随机棋子即可出现在敌方棋子相邻处也可以出现在我方棋子相邻处
     * version4 : 遍历搜索所有可以落子的点，并选择分数最高的点落子(这里先简单处理只遍历有邻居的点)
     * version5 : 通过评估对白子最有利的点和对黑子最有利的点谁的分更高，来简单实现进攻和防守
     */
    AiPlayer.prototype.getPoint = function () {
        // for(let i = 0; i < (15 * 15); i++) {
        // 	let x = Math.floor(Math.random() * 15);
        // 	let y = Math.floor(Math.random() * 15);
        // 	if(AiManager.pointArray.pointArr[x][y] == 0) {
        // 		if(AiManager.pointArray.getNeighbor(x,y)) {
        // 			return [x, y];
        // 		}
        // 	}
        // }
        var maxScore1 = 0;
        var maxScore2 = 0;
        var x = 0;
        var y = 0;
        var x1 = 0;
        var y1 = 0;
        for (var i = 0; i < 15; i++) {
            for (var j = 0; j < 15; j++) {
                if (AiManager.pointArray.pointArr[i][j] == 0 && AiManager.pointArray.getNeighbor(i, j)) {
                    var c = AiManager.score.getScore(i, j, false);
                    var d = AiManager.score.getScore(i, j, true);
                    if (c > maxScore1) {
                        maxScore1 = c;
                        x = i;
                        y = j;
                    }
                    if (d > maxScore2) {
                        maxScore2 = d;
                        x1 = i;
                        y1 = j;
                    }
                }
            }
        }
        console.log('白子最大分数 ' + maxScore2);
        console.log('黑子最大分数 ' + maxScore1);
        return [(maxScore1 >= maxScore2 ? x : x1), (maxScore1 >= maxScore2 ? y : y1)]; //大于等于，优先进攻
    };
    return AiPlayer;
}());
__reflect(AiPlayer.prototype, "AiPlayer");
var PointArray = (function () {
    function PointArray() {
        /**
         * 代表整个棋盘各个落子点的二维数组
         * 0 表示空
         * 1 表示白子
         * 2 表示黑子
         */
        this.pointArr = new Array();
        for (var i = 0; i < 15; i++) {
            this.pointArr[i] = new Array();
            for (var j = 0; j < 15; j++) {
                this.pointArr[i][j] = 0;
            }
        }
    }
    /**
     * 重置数组
     */
    PointArray.prototype.reSet = function () {
        for (var i = 0; i < 15; i++) {
            for (var j = 0; j < 15; j++) {
                if (this.pointArr[i][j] != 0) {
                    this.pointArr[i][j] = 0;
                }
            }
        }
    };
    /**
     * 获取某个位置是否有邻居
     */
    PointArray.prototype.getNeighbor = function (x, y) {
        if ((x > 0 && this.pointArr[x - 1][y] != 0) || (x < 14 && this.pointArr[x + 1][y] != 0)) {
            return true;
        }
        if ((y > 0 && this.pointArr[x][y - 1] != 0) || (y < 14 && this.pointArr[x][y + 1] != 0)) {
            return true;
        }
        if ((x > 0 && y > 0 && this.pointArr[x - 1][y - 1] != 0) || (x < 14 && y < 14 && this.pointArr[x + 1][y + 1] != 0)) {
            return true;
        }
        if ((x > 0 && y < 14 && this.pointArr[x - 1][y + 1] != 0) || (x < 14 && y > 0 && this.pointArr[x + 1][y - 1] != 0)) {
            return true;
        }
        return false;
    };
    /**
     * 用来判断输赢的函数
     */
    PointArray.prototype.searchWinner = function (x, y) {
        var a = 0;
        //横着是否有五连
        for (var i = y + 1; i < 15; ++i) {
            if (this.pointArr[x][i] == this.pointArr[x][y]) {
                a++;
            }
            else {
                break;
            }
        }
        for (var i = y - 1; i >= 0; --i) {
            if (this.pointArr[x][i] == this.pointArr[x][y]) {
                a++;
            }
            else {
                break;
            }
        }
        if (a + 1 >= 5) {
            return true;
        }
        //竖着是否有五连
        a = 0;
        for (var i = x + 1; i < 15; ++i) {
            if (this.pointArr[i][y] == this.pointArr[x][y]) {
                a++;
            }
            else {
                break;
            }
        }
        for (var i = x - 1; i >= 0; --i) {
            if (this.pointArr[i][y] == this.pointArr[x][y]) {
                a++;
            }
            else {
                break;
            }
        }
        if (a + 1 >= 5) {
            return true;
        }
        //正斜是否有五连
        a = 0;
        for (var i = x - 1, j = y - 1; i >= 0 && j >= 0; --i, --j) {
            if (this.pointArr[i][j] == this.pointArr[x][y]) {
                a++;
            }
            else {
                break;
            }
        }
        for (var i = x + 1, j = y + 1; i < 15 && j < 15; ++i, ++j) {
            if (this.pointArr[i][j] == this.pointArr[x][y]) {
                a++;
            }
            else {
                break;
            }
        }
        if (a + 1 >= 5) {
            return true;
        }
        //反斜是否有五连
        a = 0;
        for (var i = x - 1, j = y + 1; i >= 0 && j < 15; --i, ++j) {
            if (this.pointArr[i][j] == this.pointArr[x][y]) {
                a++;
            }
            else {
                break;
            }
        }
        for (var i = x + 1, j = y - 1; i < 15 && j >= 0; ++i, --j) {
            if (this.pointArr[i][j] == this.pointArr[x][y]) {
                a++;
            }
            else {
                break;
            }
        }
        if (a + 1 >= 5) {
            return true;
        }
        return false;
    };
    return PointArray;
}());
__reflect(PointArray.prototype, "PointArray");
var Score = (function () {
    function Score() {
        /*
        * 给单个棋形打分
        * 用一个7位数表示棋型，从高位到低位分别表示
        * 连五，活四，眠四，活三，活二/眠三，活一/眠二, 眠一
        */
        this.singleScore = {
            ONE: 10,
            TWO: 100,
            THREE: 1000,
            FOUR: 100000,
            FIVE: 1000000,
            BLOCKED_ONE: 1,
            BLOCKED_TWO: 10,
            BLOCKED_THREE: 100,
            BLOCKED_FOUR: 10000
        };
    }
    /**
     * 评分函数，返回单个位置八种可能性得分的合(原理和输赢判定函数差不多)
     * 判断的时候约定2就是电脑ai下的黑子
     * version1 : 电脑不能只考虑进攻，还要进行防守，所以这里新增一个代表黑子或者白子的标识位
     */
    Score.prototype.getScore = function (x, y, player) {
        var scoreSum = 0;
        var a = 0;
        var isBlocked = false;
        //横着是否有五连
        for (var i = y + 1; i < 15; ++i) {
            if (AiManager.pointArray.pointArr[x][i] == (player ? 1 : 2)) {
                a++;
            }
            else if (AiManager.pointArray.pointArr[x][i] == 0) {
                break;
            }
            else {
                isBlocked = true;
                break;
            }
        }
        for (var i = y - 1; i >= 0; --i) {
            if (AiManager.pointArray.pointArr[x][i] == (player ? 1 : 2)) {
                a++;
            }
            else if (AiManager.pointArray.pointArr[x][i] == 0) {
                break;
            }
            else {
                isBlocked = true;
                break;
            }
        }
        if (a + 1 >= 5) {
            scoreSum += this.matchingScore(500);
        }
        else {
            scoreSum += this.matchingScore((a + 1) * 100 + (isBlocked ? 1 : 0));
        }
        //竖着是否有五连
        a = 0;
        isBlocked = false;
        for (var i = x + 1; i < 15; ++i) {
            if (AiManager.pointArray.pointArr[i][y] == (player ? 1 : 2)) {
                a++;
            }
            else if (AiManager.pointArray.pointArr[i][y] == 0) {
                break;
            }
            else {
                isBlocked = true;
                break;
            }
        }
        for (var i = x - 1; i >= 0; --i) {
            if (AiManager.pointArray.pointArr[i][y] == (player ? 1 : 2)) {
                a++;
            }
            else if (AiManager.pointArray.pointArr[i][y] == 0) {
                break;
            }
            else {
                isBlocked = true;
                break;
            }
        }
        if (a + 1 >= 5) {
            scoreSum += this.matchingScore(500);
        }
        else {
            scoreSum += this.matchingScore((a + 1) * 100 + (isBlocked ? 1 : 0));
        }
        //正斜是否有五连
        a = 0;
        isBlocked = false;
        for (var i = x - 1, j = y - 1; i >= 0 && j >= 0; --i, --j) {
            if (AiManager.pointArray.pointArr[i][j] == (player ? 1 : 2)) {
                a++;
            }
            else if (AiManager.pointArray.pointArr[i][j] == 0) {
                break;
            }
            else {
                isBlocked = true;
                break;
            }
        }
        for (var i = x + 1, j = y + 1; i < 15 && j < 15; ++i, ++j) {
            if (AiManager.pointArray.pointArr[i][j] == (player ? 1 : 2)) {
                a++;
            }
            else if (AiManager.pointArray.pointArr[i][j] == 0) {
                break;
            }
            else {
                isBlocked = true;
                break;
            }
        }
        if (a + 1 >= 5) {
            scoreSum += this.matchingScore(500);
        }
        else {
            scoreSum += this.matchingScore((a + 1) * 100 + (isBlocked ? 1 : 0));
        }
        //反斜是否有五连
        a = 0;
        isBlocked = false;
        for (var i = x - 1, j = y + 1; i >= 0 && j < 15; --i, ++j) {
            if (AiManager.pointArray.pointArr[i][j] == (player ? 1 : 2)) {
                a++;
            }
            else if (AiManager.pointArray.pointArr[i][j] == 0) {
                break;
            }
            else {
                isBlocked = true;
                break;
            }
        }
        for (var i = x + 1, j = y - 1; i < 15 && j >= 0; ++i, --j) {
            if (AiManager.pointArray.pointArr[i][j] == (player ? 1 : 2)) {
                a++;
            }
            else if (AiManager.pointArray.pointArr[i][j] == 0) {
                break;
            }
            else {
                isBlocked = true;
                break;
            }
        }
        if (a + 1 >= 5) {
            scoreSum += this.matchingScore(500);
        }
        else {
            scoreSum += this.matchingScore((a + 1) * 100 + (isBlocked ? 1 : 0));
        }
        return scoreSum;
    };
    /**
     * 分数匹配函数（这里选择数字比较而不是字符串比较）
     */
    Score.prototype.matchingScore = function (type) {
        switch (type) {
            case 100:
                return this.singleScore.ONE;
            case 200:
                return this.singleScore.TWO;
            case 300:
                return this.singleScore.THREE;
            case 400:
                return this.singleScore.FOUR;
            case 500:
                return this.singleScore.FIVE;
            case 101:
                return this.singleScore.BLOCKED_ONE;
            case 201:
                return this.singleScore.BLOCKED_TWO;
            case 301:
                return this.singleScore.BLOCKED_THREE;
            case 401:
                return this.singleScore.BLOCKED_FOUR;
            default:
                return 0;
        }
    };
    return Score;
}());
__reflect(Score.prototype, "Score");
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
        SceneManager.Instance().changeScene(SceneManager.GAME_SCENE, true);
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
        AiManager.pointArray.pointArr[x][y] = this.blockColor ? 1 : 2;
        // 把新创建的棋子加进入blockArr里
        this.blockArr.push(blockNode);
        // 记录最新的棋子
        this.currentBlock = blockNode;
        //判断输赢
        if (AiManager.pointArray.searchWinner(x, y)) {
            //赢了显示游戏结束面板
            this.setGameOverPanel(true);
        }
        //交替回合
        this.blockColor = !this.blockColor;
        this.lab_huiHe.text = this.blockColor ? "玩家回合..." : "电脑回合...";
        if (this.blockColor == false) {
            this.blockPanel.touchEnabled = false;
            var arr = AiManager.ai.getPoint();
            this.addBlock(arr[0], arr[1]);
            console.log("电脑选择走第 " + arr[0] + " 行，第 " + arr[1] + " 列！");
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
;window.Main = Main;