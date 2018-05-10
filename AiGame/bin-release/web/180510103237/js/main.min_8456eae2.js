var __reflect=this&&this.__reflect||function(e,t,r){e.__class__=t,r?r.push(t):r=[t],e.__types__=e.__types__?r.concat(e.__types__):r},__extends=this&&this.__extends||function(e,t){function r(){this.constructor=e}for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);r.prototype=t.prototype,e.prototype=new r},__awaiter=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))(function(i,o){function a(e){try{s(n.next(e))}catch(t){o(t)}}function c(e){try{s(n["throw"](e))}catch(t){o(t)}}function s(e){e.done?i(e.value):new r(function(t){t(e.value)}).then(a,c)}s((n=n.apply(e,t||[])).next())})},__generator=this&&this.__generator||function(e,t){function r(e){return function(t){return n([e,t])}}function n(r){if(i)throw new TypeError("Generator is already executing.");for(;s;)try{if(i=1,o&&(a=o[2&r[0]?"return":r[0]?"throw":"next"])&&!(a=a.call(o,r[1])).done)return a;switch(o=0,a&&(r=[0,a.value]),r[0]){case 0:case 1:a=r;break;case 4:return s.label++,{value:r[1],done:!1};case 5:s.label++,o=r[1],r=[0];continue;case 7:r=s.ops.pop(),s.trys.pop();continue;default:if(a=s.trys,!(a=a.length>0&&a[a.length-1])&&(6===r[0]||2===r[0])){s=0;continue}if(3===r[0]&&(!a||r[1]>a[0]&&r[1]<a[3])){s.label=r[1];break}if(6===r[0]&&s.label<a[1]){s.label=a[1],a=r;break}if(a&&s.label<a[2]){s.label=a[2],s.ops.push(r);break}a[2]&&s.ops.pop(),s.trys.pop();continue}r=t.call(e,s)}catch(n){r=[6,n],o=0}finally{i=a=0}if(5&r[0])throw r[1];return{value:r[0]?r[1]:void 0,done:!0}}var i,o,a,c,s={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return c={next:r(0),"throw":r(1),"return":r(2)},"function"==typeof Symbol&&(c[Symbol.iterator]=function(){return this}),c},Config=function(){function e(){}return e.searchDeep=6,e.countLimit=16,e.checkmateDeep=5,e.cache=!1,e.vcxCache=!0,e.deepDecrease=.8,e}();__reflect(Config.prototype,"Config");var AssetAdapter=function(){function e(){}return e.prototype.getAsset=function(e,t,r){function n(n){t.call(r,n,e)}if(RES.hasRes(e)){var i=RES.getRes(e);i?n(i):RES.getResAsync(e,n,this)}else RES.getResByUrl(e,n,this,RES.ResourceItem.TYPE_IMAGE)},e}();__reflect(AssetAdapter.prototype,"AssetAdapter",["eui.IAssetAdapter"]);var Main=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t.prototype.createChildren=function(){e.prototype.createChildren.call(this),egret.lifecycle.addLifecycleListener(function(e){}),egret.lifecycle.onPause=function(){egret.ticker.pause()},egret.lifecycle.onResume=function(){egret.ticker.resume()};var t=new AssetAdapter;egret.registerImplementation("eui.IAssetAdapter",t),egret.registerImplementation("eui.IThemeAdapter",new ThemeAdapter),this.runGame()["catch"](function(e){console.log(e)})},t.prototype.runGame=function(){return __awaiter(this,void 0,void 0,function(){var e,t;return __generator(this,function(r){switch(r.label){case 0:return[4,this.loadResource()];case 1:return r.sent(),this.createGameScene(),[4,RES.getResAsync("description_json")];case 2:return e=r.sent(),this.startAnimation(e),[4,platform.login()];case 3:return r.sent(),[4,platform.getUserInfo()];case 4:return t=r.sent(),console.log(t),[2]}})})},t.prototype.loadResource=function(){return __awaiter(this,void 0,void 0,function(){var e,t;return __generator(this,function(r){switch(r.label){case 0:return r.trys.push([0,4,,5]),e=new LoadingUI,this.stage.addChild(e),[4,RES.loadConfig("resource/default.res.json","resource/")];case 1:return r.sent(),[4,this.loadTheme()];case 2:return r.sent(),[4,RES.loadGroup("preload",0,e)];case 3:return r.sent(),this.stage.removeChild(e),[3,5];case 4:return t=r.sent(),console.error(t),[3,5];case 5:return[2]}})})},t.prototype.loadTheme=function(){var e=this;return new Promise(function(t,r){var n=new eui.Theme("resource/default.thm.json",e.stage);n.addEventListener(eui.UIEvent.COMPLETE,function(){t()},e)})},t.prototype.createGameScene=function(){this.addChild(SceneManager.Instance())},t.prototype.createBitmapByName=function(e){var t=new egret.Bitmap,r=RES.getRes(e);return t.texture=r,t},t.prototype.startAnimation=function(e){var t=this,r=new egret.HtmlTextParser,n=e.map(function(e){return r.parse(e)}),i=this.textfield,o=-1,a=function(){o++,o>=n.length&&(o=0);var e=n[o];i.textFlow=e;var r=egret.Tween.get(i);r.to({alpha:1},200),r.wait(2e3),r.to({alpha:0},200),r.call(a,t)};a()},t.prototype.onButtonClick=function(e){var t=new eui.Panel;t.title="Title",t.horizontalCenter=0,t.verticalCenter=0,this.addChild(t)},t}(eui.UILayer);__reflect(Main.prototype,"Main");var DebugPlatform=function(){function e(){}return e.prototype.getUserInfo=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){return[2,{nickName:"username"}]})})},e.prototype.login=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){return[2]})})},e}();__reflect(DebugPlatform.prototype,"DebugPlatform",["Platform"]),window.platform||(window.platform=new DebugPlatform);var SceneManager=function(e){function t(){var t=e.call(this)||this;return t.init(),t}return __extends(t,e),t.prototype.init=function(){this.beginScene=new BeginScene,this.gameScene=new GameScene,AiManager.init(),console.log(AiManager.pointArray.pointArr),this.addChild(this.beginScene)},t.Instance=function(){return t._instance||(t._instance=new t),t._instance},t.prototype.changeScene=function(e,r){void 0===r&&(r=null),e!=t.BEGIN_SCENE&&(console.log(this.beginScene),this.beginScene.release()),e!=t.GAME_SCENE&&this.gameScene.release(),null!=r&&this[e].update(r),this.removeChildren(),this.addChild(this[e])},t.BEGIN_SCENE="beginScene",t.GAME_SCENE="gameScene",t}(egret.Sprite);__reflect(SceneManager.prototype,"SceneManager");var ThemeAdapter=function(){function e(){}return e.prototype.getTheme=function(e,t,r,n){function i(e){t.call(n,e)}function o(t){t.resItem.url==e&&(RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,o,null),r.call(n))}"undefined"!=typeof generateEUI?egret.callLater(function(){t.call(n,generateEUI)},this):(RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,o,null),RES.getResByUrl(e,i,this,RES.ResourceItem.TYPE_TEXT))},e}();__reflect(ThemeAdapter.prototype,"ThemeAdapter",["eui.IThemeAdapter"]);var AiManager=function(){function e(){}return e.init=function(){this.pointArray=new PointArray,this.score=new Score,this.ai=new AiPlayer,this.math=new MathTool},e}();__reflect(AiManager.prototype,"AiManager");var AiPlayer=function(){function e(){this.MAX=10*S.FIVE,this.MIN=-1*this.MAX}return e.prototype.getPoint=function(){var e=this.MaxMin(AiManager.pointArray.pointArr);return e},e.prototype.MaxMin=function(e,t){void 0===t&&(t=Config.searchDeep);var r=this.MIN,n=AiManager.pointArray.gen(e);console.log("要遍历的落子点："),console.log(n);var i=[];this.count=0,this.ABcut=0;for(var o=0;o<n.length;o++){var a=n[o];e[a[0]][a[1]]=R.com;var c=this.min(e,t-1,this.MAX,r>this.MIN?r:this.MIN);AiManager.math.equal(c,r)&&i.push(a),AiManager.math.greatThan(c,r)&&(r=c,i=[],i.push(a)),e[a[0]][a[1]]=R.empty}var s=i[Math.floor(i.length*Math.random())];return console.log("共搜索 "+this.count+"个节点！"),s},e.prototype.min=function(e,t,r,n){var i=AiManager.score.evaluate(e);if(this.count++,0>=t||AiManager.pointArray.win(e))return i;for(var o=this.MAX,a=AiManager.pointArray.gen(e),c=0;c<a.length;c++){var s=a[c];e[s[0]][s[1]]=R.hum;var u=this.max(e,t-1,r>o?o:r,n)*Config.deepDecrease;e[s[0]][s[1]]=R.empty,AiManager.math.littleThan(u,o)&&(o=u)}return o},e.prototype.max=function(e,t,r,n){var i=AiManager.score.evaluate(e);if(this.count++,0>=t||AiManager.pointArray.win(e))return i;for(var o=this.MIN,a=AiManager.pointArray.gen(e),c=0;c<a.length;c++){var s=a[c];e[s[0]][s[1]]=R.com;var u=this.min(e,t-1,r,o>n?o:n)*Config.deepDecrease;e[s[0]][s[1]]=R.empty,AiManager.math.greatThan(u,o)&&(o=u)}return o},e}();__reflect(AiPlayer.prototype,"AiPlayer");var LoadingUI=function(e){function t(){var t=e.call(this)||this;return t.createView(),t}return __extends(t,e),t.prototype.createView=function(){this.textField=new egret.TextField,this.addChild(this.textField),this.textField.y=300,this.textField.width=480,this.textField.height=100,this.textField.textAlign="center"},t.prototype.onProgress=function(e,t){this.textField.text="Loading..."+e+"/"+t},t}(egret.Sprite);__reflect(LoadingUI.prototype,"LoadingUI",["RES.PromiseTaskReporter"]);var MathTool=function(){function e(){this.threshold=1.2}return e.prototype.equal=function(e,t){return e*this.threshold>t&&e<t*this.threshold},e.prototype.greatThan=function(e,t){return e>t*this.threshold},e.prototype.littleThan=function(e,t){return e*this.threshold<t},e.prototype.littleOrEqualThan=function(e,t){return e<t*this.threshold},e.prototype.greatOrEqualThan=function(e,t){return e*this.threshold>t},e}();__reflect(MathTool.prototype,"MathTool");var PointArray=function(){function e(){this.pointArr=new Array;for(var e=0;15>e;e++){this.pointArr[e]=new Array;for(var t=0;15>t;t++)this.pointArr[e][t]=R.empty}}return e.prototype.gen=function(e){for(var t=[],r=[],n=[],i=[],o=[],a=[],c=[],s=0;s<e.length;s++)for(var u=0;u<e[s].length;u++)if(e[s][u]==R.empty)if(this.getNeighbor(e,s,u,1)){var h=AiManager.score.getScore(e,s,u,R.hum),l=AiManager.score.getScore(e,s,u,R.com);if(l>=S.FIVE)return[[s,u]];h>=S.FIVE?t.push([s,u]):l>=S.FOUR?r.unshift([s,u]):h>=S.FOUR?r.push([s,u]):l>=2*S.THREE?n.unshift([s,u]):h>=2*S.THREE?n.push([s,u]):l>=S.THREE?i.unshift([s,u]):h>=S.THREE?i.push([s,u]):l>=S.TWO?o.unshift([s,u]):h>=S.TWO?o.push([s,u]):a.push([s,u])}else this.getNeighbor(e,s,u,2)&&c.push([s,u]);if(t.length)return[t[0]];if(r.length)return r;if(n.length)return n;var p=i.concat(o.concat(a.concat(c)));return p},e.prototype.flat=function(e){for(var t=[],r=e.length,n=0;r>n;n++)t.push(e[n]);for(var n=0;r>n;n++){for(var i=[],o=0;r>o;o++)i.push(e[n][o]);t.push(i)}for(var n=0;2*r>n;n++){for(var a=[],o=0;n>=o&&r>o;o++)r>n-o&&a.push(e[n-o][o]);a.length&&t.push(a)}for(var n=-1*r+1;r>n;n++){for(var a=[],o=0;r>o;o++)o+n>=0&&r>o+n&&a.push(e[o+n][o]);a.length&&t.push(a)}return t},e.prototype.reSet=function(){for(var e=0;15>e;e++)for(var t=0;15>t;t++)this.pointArr[e][t]!=R.empty&&(this.pointArr[e][t]=R.empty)},e.prototype.put=function(e,t,r){this.pointArr[e][t]=r?R.hum:R.com},e.prototype.getNeighbor=function(e,t,r,n){return t-n>=0&&e[t-n][r]!=R.empty||14-n>=t&&e[t+n][r]!=R.empty?!0:r-n>=0&&e[t][r-n]!=R.empty||14-n>=r&&e[t][r+n]!=R.empty?!0:t-n>=0&&r-n>=0&&e[t-n][r-n]!=R.empty||14-n>=t&&14-n>=r&&e[t+n][r+n]!=R.empty?!0:t-n>=0&&14-n>=r&&e[t-n][r+n]!=R.empty||14-n>=t&&r-n>=0&&e[t+n][r-n]!=R.empty?!0:!1},e.prototype.win=function(e){for(var t=0;t<e.length;t++)for(var r=0;r<e.length;r++){var n=e[t][r];if(n!=R.empty&&this.searchWinner(e,t,r))return n}return!1},e.prototype.searchWinner=function(e,t,r){for(var n=0,i=r+1;15>i&&e[t][i]==e[t][r];++i)n++;for(var i=r-1;i>=0&&e[t][i]==e[t][r];--i)n++;if(n+1>=5)return!0;n=0;for(var i=t+1;15>i&&e[i][r]==e[t][r];++i)n++;for(var i=t-1;i>=0&&e[i][r]==e[t][r];--i)n++;if(n+1>=5)return!0;n=0;for(var i=t-1,o=r-1;i>=0&&o>=0&&e[i][o]==e[t][r];--i,--o)n++;for(var i=t+1,o=r+1;15>i&&15>o&&e[i][o]==e[t][r];++i,++o)n++;if(n+1>=5)return!0;n=0;for(var i=t-1,o=r+1;i>=0&&15>o&&e[i][o]==e[t][r];--i,++o)n++;for(var i=t+1,o=r-1;15>i&&o>=0&&e[i][o]==e[t][r];++i,--o)n++;return n+1>=5?!0:!1},e}();__reflect(PointArray.prototype,"PointArray");var R=function(){function e(){}return e.hum=1,e.com=2,e.empty=0,e}();__reflect(R.prototype,"R");var S=function(){function e(){}return e.ONE=10,e.TWO=100,e.THREE=1e3,e.FOUR=1e5,e.FIVE=1e6,e.BLOCKED_ONE=1,e.BLOCKED_TWO=10,e.BLOCKED_THREE=100,e.BLOCKED_FOUR=1e4,e}();__reflect(S.prototype,"S");var Score=function(){function e(){}return e.prototype.evaluate=function(e){var t=AiManager.pointArray.flat(e),r=this.getScoreSum(t,R.hum),n=this.getScoreSum(t,R.com);return n-r},e.prototype.getScoreSum=function(e,t){for(var r=0,n=0;n<e.length;n++)r+=this.calculateScore(e[n],t);return r},e.prototype.calculateScore=function(e,t){for(var r=0,n=0,i=0,o=0;o<e.length;o++)if(e[o]==t){for(r=1,n=0,n=0==o?1:e[o]==R.empty?0:1,o+=1;o<e.length;o++)if(e[o]==t)r++;else{if(e[o]==R.empty)break;n++}return i+=n>1?0:this.matchingScore(100*r+n)}},e.prototype.getScore=function(e,t,r,n){for(var i=0,o=0,a=!1,c=!1,s=r+1;15>s;++s){if(e[t][s]!=n){if(e[t][s]==R.empty)break;a=!0;break}o++}for(var s=r-1;s>=0;--s){if(e[t][s]!=n){if(e[t][s]==R.empty)break;c=!0;break}o++}i+=o+1>=5?this.matchingScore(500):a&&c?0:this.matchingScore(100*(o+1)+(a||c?1:0)),o=0,a=!1,c=!1;for(var s=t+1;15>s;++s){if(e[s][r]!=n){if(e[s][r]==R.empty)break;a=!0;break}o++}for(var s=t-1;s>=0;--s){if(e[s][r]!=n){if(e[s][r]==R.empty)break;c=!0;break}o++}i+=o+1>=5?this.matchingScore(500):a&&c?0:this.matchingScore(100*(o+1)+(a||c?1:0)),o=0,a=!1,c=!1;for(var s=t-1,u=r-1;s>=0&&u>=0;--s,--u){if(e[s][u]!=n){if(e[s][u]==R.empty)break;a=!0;break}o++}for(var s=t+1,u=r+1;15>s&&15>u;++s,++u){if(e[s][u]!=n){if(e[s][u]==R.empty)break;c=!0;break}o++}i+=o+1>=5?this.matchingScore(500):a&&c?0:this.matchingScore(100*(o+1)+(a||c?1:0)),o=0,a=!1,c=!1;for(var s=t-1,u=r+1;s>=0&&15>u;--s,++u){if(e[s][u]!=n){if(e[s][u]==R.empty)break;a=!0;break}o++}for(var s=t+1,u=r-1;15>s&&u>=0;++s,--u){if(e[s][u]!=n){if(e[s][u]==R.empty)break;c=!0;break}o++}return i+=o+1>=5?this.matchingScore(500):a&&c?0:this.matchingScore(100*(o+1)+(a||c?1:0))},e.prototype.matchingScore=function(e){switch(e){case 100:return S.ONE;case 200:return S.TWO;case 300:return S.THREE;case 400:return S.FOUR;case 500:return S.FIVE;case 101:return S.BLOCKED_ONE;case 201:return S.BLOCKED_TWO;case 301:return S.BLOCKED_THREE;case 401:return S.BLOCKED_FOUR;default:return 0}},e}();__reflect(Score.prototype,"Score");var BeginScene=function(e){function t(){return e.call(this)||this}return __extends(t,e),t.prototype.partAdded=function(t,r){e.prototype.partAdded.call(this,t,r)},t.prototype.childrenCreated=function(){e.prototype.childrenCreated.call(this),this.init()},t.prototype.init=function(){this.btn_begin.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tapHandler,this)},t.prototype.tapHandler=function(){SceneManager.Instance().changeScene(SceneManager.GAME_SCENE,!0)},t.prototype.release=function(){this.btn_begin.hasEventListener(egret.TouchEvent.TOUCH_TAP)&&this.btn_begin.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.tapHandler,this)},t}(eui.Component);__reflect(BeginScene.prototype,"BeginScene",["eui.UIComponent","egret.DisplayObject"]);var GameScene=function(e){function t(){var t=e.call(this)||this;return t.blockSourceNames=[],t.blockArr=[],t.intervalNum=38.5,t.clickMarginNum=10,t.numberOneX=30,t.numberOneY=30,t.blockColor=!0,t}return __extends(t,e),t.prototype.update=function(e){this.blockColor=e},t.prototype.partAdded=function(t,r){e.prototype.partAdded.call(this,t,r)},t.prototype.childrenCreated=function(){e.prototype.childrenCreated.call(this),this.init(),this.reset(),this.lab_huiHe.text=this.blockColor?"玩家回合...":"电脑回合..."},t.prototype.init=function(){this.setGameOverPanel(!1),this.blockSourceNames=["img_GoBang_white_png","img_GoBang_black_png","img_GoBang_bg_png"],this.blockPanel.touchEnabled=!0,this.blockPanel.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickHandler,this)},t.prototype.clickHandler=function(e){var t=0,r=0,n=e.localX+this.clickMarginNum,i=e.localY+this.clickMarginNum;n<this.numberOneX-this.clickMarginNum||i<this.numberOneY-this.clickMarginNum||(n%this.intervalNum<=this.clickMarginNum||n%this.intervalNum>=this.intervalNum-this.clickMarginNum)&&(r=Math.floor(n/this.intervalNum)-(n%this.intervalNum<=this.clickMarginNum?1:0),(i%this.intervalNum<=this.clickMarginNum||i%this.intervalNum>=this.intervalNum-this.clickMarginNum)&&(t=Math.floor(i/this.intervalNum)-(i%this.intervalNum<=this.clickMarginNum?1:0),this.addBlock(t,r)))},t.prototype.addBlock=function(e,t){if(0==AiManager.pointArray.pointArr[e][t]){var r=this.createBlock();if(this.blockPanel.addChild(r),r.anchorOffsetX=16,r.anchorOffsetY=16,r.x=t*this.intervalNum+this.numberOneX,r.y=e*this.intervalNum+this.numberOneY,AiManager.pointArray.put(e,t,this.blockColor),this.blockArr.push(r),this.currentBlock=r,AiManager.pointArray.searchWinner(AiManager.pointArray.pointArr,e,t)&&this.setGameOverPanel(!0),this.blockColor=!this.blockColor,this.lab_huiHe.text=this.blockColor?"玩家回合...":"电脑回合...",0==this.blockColor){this.blockPanel.touchEnabled=!1;var n=AiManager.ai.getPoint();this.addBlock(n[0],n[1]),console.log("电脑选择走第 "+n[0]+" 行，第 "+n[1]+" 列！")}else this.blockPanel.touchEnabled=!0}},t.prototype.createBlock=function(){var e=new eui.Image;return this.blockColor?e.source=this.blockSourceNames[0]:e.source=this.blockSourceNames[1],e},t.prototype.reset=function(){this.blockPanel.removeChildren(),AiManager.pointArray.reSet(),this.blockArr.length=0,this.blockColor=!0},t.prototype.setGameOverPanel=function(e){this.GameOverPanel.visible=e,e?(this.lab_overWinner.text=this.blockColor?"白方胜利":"黑方胜利",this.btn_reStart.addEventListener(egret.TouchEvent.TOUCH_TAP,this.reStartHandler,this)):this.btn_reStart.hasEventListener(egret.TouchEvent.TOUCH_TAP)&&this.btn_reStart.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.reStartHandler,this)},t.prototype.reStartHandler=function(){this.reset(),this.setGameOverPanel(!1)},t.prototype.release=function(){this.reset(),this.btn_reStart.hasEventListener(egret.TouchEvent.TOUCH_TAP)&&this.btn_reStart.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.reStartHandler,this)},t}(eui.Component);__reflect(GameScene.prototype,"GameScene",["eui.UIComponent","egret.DisplayObject"]);