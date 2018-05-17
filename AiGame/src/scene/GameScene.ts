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
	//悔棋按钮
	public btn_regret:eui.Button;
	//更改计算机棋力的按钮
	public btn_changePower:eui.Button;
	//更改棋力的面板
	public changePowerPanel:eui.Group;
	//搜索深度减少
	public btn_down1:eui.Button;
	//搜索广度减少
	public btn_down2:eui.Button;
	//搜索广度增加
	public btn_up2:eui.Button;
	//搜索深度增加
	public btn_up1:eui.Button;
	//确认改变按钮
	public btn_confirm:eui.Button;
	//深度lable
	public lab_deeps:eui.Label;
	//广度lable
	public lab_long:eui.Label;
	//警告提示框
	public lab_notice:eui.Label;
	//选择先手的面板
	public whoFirstPanel:eui.Group;
	//电脑先手
	public btn_comFirst:eui.Button;
	//玩家先手
	public btn_humanFirst:eui.Button;


	// 所有方块资源的数组
    private blockSourceNames: Array<string> = [];
    // 所有方块的数组
    private blockArr: Array<eui.Image> = [];
    // 最新出现的黑（对方）子
    private currentBlock1: eui.Image;
	//最新出现的白（我方）子
	private currentBlock2: eui.Image;
	// 对方最新下棋的位置
	private pointNow1: any = {x:0, y:0};
	//我方最新下棋的位置
	private pointNow2: any = {x:0, y:0};
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
		this.btn_regret.visible = !Config.isPVP;
		this.btn_changePower.visible = !Config.isPVP;
		this.lab_notice.visible = false;

		this.blockSourceNames = ["img_GoBang_white_png", "img_GoBang_black_png","img_GoBang_bg_png"];
		//添加触摸点击事件
		this.blockPanel.touchEnabled = true;
		this.blockPanel.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickHandler,this);
		this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP,this.backHandler,this);
		if(!Config.isPVP) {
			this.btn_regret.addEventListener(egret.TouchEvent.TOUCH_TAP,this.regretHandler,this);
			this.btn_changePower.addEventListener(egret.TouchEvent.TOUCH_TAP,this.changePowerHandler,this);
			this.setWhoFirst(true);
		}
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
		if(this.blockColor) {
			this.currentBlock2 = blockNode;
			this.pointNow2.x = x;
			this.pointNow2.y = y;
		} else {
			this.currentBlock1 = blockNode;	
			this.pointNow1.x = x;
			this.pointNow1.y = y;
		}

		//PVP模式发送我方下的位置
		if(Config.isPVP && this.blockColor) {
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
	 * 悔棋模块
	 */
	private regret() {
		this.blockPanel.removeChild(this.currentBlock1);
		this.blockPanel.removeChild(this.currentBlock2);

		AiManager.pointArray.regret(this.pointNow1.x, this.pointNow1.y);
		AiManager.pointArray.regret(this.pointNow2.x, this.pointNow2.y);
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
	 * 控制更改棋力面板
	 */
	private setChangePower(type: boolean) {
		this.changePowerPanel.visible = type;
		if(type) {
			this.lab_deeps.text = Config.searchDeep.toString();
			this.lab_long.text = Config.countLimit.toString();
			this.changePowerPanel.addEventListener(egret.TouchEvent.TOUCH_TAP,this.changePowerPanelHandler,this);
		} else {
			if(this.changePowerPanel.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
				this.changePowerPanel.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.changePowerPanelHandler,this);
			}
		}
	}
	/**
	 * 控制警告提示框的显示
	 */
	public showNoticeLable(texts: string) {
		this.lab_notice.visible = true;
		this.lab_notice.text = texts;
		let tw = egret.Tween.get(this.lab_notice);
		tw.to({visible:false}, 1000);
	}
	/**
	 * 控制选择先手面板
	 */
	private setWhoFirst(type: boolean) {
		this.whoFirstPanel.visible = type;
		if(type) {
			this.whoFirstPanel.addEventListener(egret.TouchEvent.TOUCH_TAP,this.whoFirstHandler,this);
		} else {
			if(this.whoFirstPanel.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
				this.whoFirstPanel.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.whoFirstHandler,this);
			}
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
	private whoFirstHandler(e: egret.TouchEvent) {
		switch(e.target) {
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
	private regretHandler() {
		this.regret();
	}
	private changePowerHandler() {
		this.setChangePower(true);
	}
	private changePowerPanelHandler(e: egret.TouchEvent) {
		switch(e.target) {
			case this.btn_confirm: {
				this.setChangePower(false);
				break;
			}
			case this.btn_down1: {
				if(Config.searchDeep > 2) {
					Config.searchDeep --;
				}
				break;
			}
			case this.btn_down2: {
				if(Config.countLimit > 10) {
					Config.countLimit --;
				}
				break;
			}
			case this.btn_up1: {
				if(Config.searchDeep < 8) {
					Config.searchDeep ++;
				}
				break;
			}
			case this.btn_up2: {
				if(Config.countLimit < 30) {
					Config.countLimit ++;
				}
				break;
			}
		}
		this.lab_deeps.text = Config.searchDeep.toString();
		this.lab_long.text = Config.countLimit.toString();
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