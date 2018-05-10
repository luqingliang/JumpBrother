    class GameScene extends eui.Component implements  eui.UIComponent {

	//游戏场景组
	public blockPanel:eui.Group;
    //游戏结束面板
    public GameOverPanel:eui.Group;
    //再来一次按钮
    public btn_reStart:eui.Button;
    //结束游戏计分
    public lab_overScore:eui.Label;
	//棋盘
	public img_bg:eui.Image;
	//回合的显示
	public lab_huiHe:eui.Label;
	//结束界面显示输赢情况
	public lab_overWinner:eui.Label;

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
		this.lab_huiHe.text = this.blockColor?"玩家回合...":"电脑回合...";
	}
	private init() {
        this.setGameOverPanel(false);

		this.blockSourceNames = ["img_GoBang_white_png", "img_GoBang_black_png","img_GoBang_bg_png"];
		//添加触摸点击事件
		this.blockPanel.touchEnabled = true;
		this.blockPanel.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickHandler,this);
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
	private addBlock(x: number, y: number) {
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
		//判断输赢
		if(AiManager.pointArray.searchWinner(AiManager.pointArray.pointArr,x,y)) {
			//赢了显示游戏结束面板
			this.setGameOverPanel(true);
		} 
		//交替回合
		this.blockColor = !this.blockColor;
		this.lab_huiHe.text = this.blockColor?"玩家回合...":"电脑回合...";
		if(this.blockColor == false) { //AI下棋
			this.blockPanel.touchEnabled = false;
			let arr: Array<number> = AiManager.ai.getPoint();
			this.addBlock(arr[0], arr[1]);
			console.log("电脑选择走第 "+arr[0]+" 行，第 "+arr[1]+" 列！")
		} else {
			this.blockPanel.touchEnabled = true;
		}
	}
	// 工厂方法，创建一个方块并返回。
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
    private setGameOverPanel(type: boolean) {
        this.GameOverPanel.visible = type;
        if(type) {
			this.lab_overWinner.text = this.blockColor?"白方胜利":"黑方胜利";
            this.btn_reStart.addEventListener(egret.TouchEvent.TOUCH_TAP,this.reStartHandler,this);
        } else {
            if(this.btn_reStart.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
                this.btn_reStart.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.reStartHandler,this);
            }
        }
    }
    private reStartHandler() {
        this.reset();
        this.setGameOverPanel(false);
    }
	public release() {
        this.reset();

		if(this.btn_reStart.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            this.btn_reStart.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.reStartHandler,this);
        }
	}
}