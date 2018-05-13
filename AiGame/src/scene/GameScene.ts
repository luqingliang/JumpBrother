    class GameScene extends eui.Component implements  eui.UIComponent {

	//游戏场景组
	public blockPanel:eui.Group;
	//返回按钮
	public btn_back:eui.Button;
	//游戏当前在线人数
	public lab_playerNum:eui.Label;
	//PVP回合倒计时
	public lab_timeDown:eui.Label;
    //游戏结束面板
    public GameOverPanel:eui.Group;
    //再来一次按钮
    public btn_reStart:eui.Button;
	//棋盘
	public img_bg:eui.Image;
	//回合的显示
	public lab_huiHe:eui.Label;
	//结束界面显示输赢情况
	public lab_overWinner:eui.Label;
	//警告面板
	public noticePanel:eui.Group;
	//警告标题
	public lab_title:eui.Label;
	//警告内容
	public lab_body:eui.Label;
	//取消按钮
	public btn_cancel:eui.Button;
	//确认按钮
	public btn_ok:eui.Button;


	// 所有方块资源的数组
    private blockSourceNames: Array<string> = [];
    // 所有方块的数组
    private blockArr: Array<eui.Image> = [];
    // 当前的盒子（最新出现的盒子）
    private currentBlock: eui.Image;
	//每一格之间的间隔(准确的应该是38.5，测试逐渐修改)
	private intervalNum: number = 38.5;
	//点击事件容差
	private clickMarginNum: number = 10;
	//左上角第一个落点的X和Y坐标（是相对棋盘而非整个舞台）
	private numberOneX: number = 30;
	private numberOneY: number = 30;
	//黑白交替，玩家白，对手黑（true白，false黑）
	private blockColor: boolean = true;

	public constructor() {
		super();
	}
	public update(playerFirst: boolean) {
		this.blockColor = playerFirst;
	}
	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}
	protected childrenCreated():void
	{
		super.childrenCreated();
		this.init();
		this.reset();
		if(Config.isPVP) {
			this.lab_huiHe.text = this.blockColor?"我方回合...":"对方回合...";
		} else {
			this.lab_huiHe.text = this.blockColor?"玩家回合...":"电脑正在思考...";
		}
	}
	public init() {
        this.setGameOverPanel(false);
		this.showNotice();

		this.lab_playerNum.visible = Config.isPVP;
		this.lab_timeDown.visible = Config.isPVP;

		this.blockSourceNames = ["img_GoBang_white_png", "img_GoBang_black_png","img_GoBang_bg_png"];
		//添加触摸点击事件
		this.blockPanel.touchEnabled = true;
		this.blockPanel.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickHandler,this);
		this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP,this.backHandler,this);
	}
	//触摸点击事件的回调
	private clickHandler(e:egret.TouchEvent) {
		//定义最终的行和列
		let finalX = 0;
		let finalY = 0;
		//首先拿到点击位置的坐标(经特殊处理的)
		let x = e.localX + this.clickMarginNum;
		let y = e.localY + this.clickMarginNum;
		//首先排除点击在外部边缘的情况
		if(x < (this.numberOneX - this.clickMarginNum) || y < (this.numberOneY - this.clickMarginNum)){
			return;
		}
		//在第几列
		if(x % this.intervalNum <= this.clickMarginNum || x % this.intervalNum >= (this.intervalNum - this.clickMarginNum)) {
			finalY = Math.floor(x / this.intervalNum) - (x % this.intervalNum <= this.clickMarginNum ? 1 : 0);
		} else {
			return;
		}
		//在第几行
		if(y % this.intervalNum <= this.clickMarginNum || y % this.intervalNum >= (this.intervalNum - this.clickMarginNum)) {
			finalX = Math.floor(y / this.intervalNum) - (y % this.intervalNum <= this.clickMarginNum ? 1 : 0);
		} else {
			return;
		}

		this.addBlock(finalX, finalY);
	}
	// 添加一个方块
	public addBlock(x: number, y: number) {
		//先检查这个位置上是否有有棋子
		if(AiManager.pointArray.pointArr[x][y] != 0) {
			return;
		}
		// 创建一个方块
		let blockNode = this.createBlock();
		this.blockPanel.addChild(blockNode);
		// 设置方块的锚点
		blockNode.anchorOffsetX = 16;
		blockNode.anchorOffsetY = 16;
		//设置添加的位置
		blockNode.x = y * this.intervalNum + this.numberOneX;
		blockNode.y = x * this.intervalNum + this.numberOneY;
		//更新棋盘数组
		AiManager.pointArray.put(x,y,this.blockColor);
		// 把新创建的棋子加进入blockArr里
		this.blockArr.push(blockNode);
		// 记录最新的棋子
		this.currentBlock = blockNode;
		//发送我方下的位置
		if(this.blockColor) {
			AiManager.webSocket.sendPoint({x:x,y:y});
		}
		//判断输赢
		if(AiManager.pointArray.searchWinner(AiManager.pointArray.pointArr,x,y)) {
			//赢了显示游戏结束面板
			this.setGameOverPanel(true);
		} 
		//交替回合
		this.blockColor = !this.blockColor;
		if(Config.isPVP) {
			this.lab_huiHe.text = this.blockColor?"我方回合...":"对方回合...";
		} else {
			this.lab_huiHe.text = this.blockColor?"玩家回合...":"电脑正在思考...";
		}
		let timer: egret.Timer = new egret.Timer(100,1);
		timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerHandler,this);
		timer.start();
	}
	private timerHandler() {
		if(this.blockColor == false) { //AI下棋或者对方下棋
			this.blockPanel.touchEnabled = false;
			if(Config.isPVP) {

			} else {
				let arr: Array<number> = AiManager.ai.getPoint();
				this.addBlock(arr[0], arr[1]);
				console.log("电脑选择走第 "+arr[0]+" 行，第 "+arr[1]+" 列！")
			}
		} else {
			this.blockPanel.touchEnabled = true;
		}
	}
	// 工厂方法，创建一个棋子image对象并返回。
	private createBlock(): eui.Image {
		var blockNode = new eui.Image();
		// 根据是谁的回合来确定背景图
		if(this.blockColor) {
			blockNode.source = this.blockSourceNames[0];
		} else {
			blockNode.source = this.blockSourceNames[1];
		}
		return blockNode;
	}
	// 重置游戏
	private reset() {
		this.blockPanel.removeChildren();
		//重置棋盘落子数组
		AiManager.pointArray.reSet();
		this.blockArr.length = 0;
		this.blockColor = true;
	}

    /**
     * 控制游戏结束面板的显示隐藏
     * @param type:boolean
     */
    public setGameOverPanel(type: boolean, timeOut: boolean = false) {
        this.GameOverPanel.visible = type;
        if(type) {
			if(timeOut) {
				this.lab_overWinner.text = this.blockColor?"我方超时":"对方超时";
			} else {
				this.lab_overWinner.text = this.blockColor?"我方胜利":"对方胜利";
			}
            this.btn_reStart.addEventListener(egret.TouchEvent.TOUCH_TAP,this.reStartHandler,this);
			if(Config.isPVP) {
				AiManager.webSocket.sendGameOver();
			}
        } else {
            if(this.btn_reStart.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
                this.btn_reStart.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.reStartHandler,this);
            }
        }
    }
	/**
	 * 控制警告面板
	 */
	public showNotice(obj: any = null) {
		if(obj == null) {
			this.noticePanel.visible = false;
			if(this.btn_ok.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
				this.btn_ok.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.okHandler,this);
			}
			if(this.btn_cancel.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
				this.btn_cancel.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.cancelHandler,this);
			}
		} else {
			this.noticePanel.visible = true;
			this.lab_title.text = obj.title;
			this.lab_body.text = obj.body;
			this.btn_ok.addEventListener(egret.TouchEvent.TOUCH_TAP,this.okHandler,this);
			this.btn_cancel.addEventListener(egret.TouchEvent.TOUCH_TAP,this.cancelHandler,this);
		}
	}
	/**
	 * 控制文字的显示
	 */
	public updateText(texts: string) {
		this.lab_huiHe.text = texts;
	}
	/**
	 * 控制是否接收鼠标事件
	 */
	public setTouchEnabled(status: boolean) {
		this.blockPanel.touchEnabled = status;
		this.blockColor = status;
	}
	/**
	 * 更新在线玩家数量
	 */
	public updatePlayerNum(num: number) {
		this.lab_playerNum.text = "当前在线玩家人数：" + num;
	}
	/**
	 * 更新PVP回合倒计时显示
	 */
	public updateTimeDown(num: number) {
		this.lab_timeDown.text = num.toString();
	}
	private cancelHandler() {
		this.showNotice();
	}
	private okHandler() {
		this.showNotice();
		this.reset();
		SceneManager.Instance().changeScene(SceneManager.BEGIN_SCENE);
	}
    private reStartHandler() {
        this.reset();
        this.setGameOverPanel(false);
		if(Config.isPVP) {
			AiManager.webSocket.getRival();
		}
    }
	private backHandler() {
		this.reset();
		SceneManager.Instance().changeScene(SceneManager.BEGIN_SCENE);
	}
	public release() {
        this.reset();

		if(this.btn_reStart.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            this.btn_reStart.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.reStartHandler,this);
        }
		if(this.btn_back.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
			this.btn_back.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.backHandler,this);
		}
	}
}