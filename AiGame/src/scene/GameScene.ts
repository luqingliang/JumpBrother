class GameScene extends eui.Component implements  eui.UIComponent {

	//游戏场景组
	public blockPanel:eui.Group;
	//小 i
	public img_player:eui.Image;
	//计分lable
	public lab_score:eui.Label;

	// 所有方块资源的数组
    private blockSourceNames: Array<string> = [];
    // 按下的音频
    private pushVoice: egret.Sound;
    // 按下音频的SoundChannel对象，用来暂停该音频
    private pushSoundChannel: egret.SoundChannel;
    // 弹跳的音频
    private jumpVoice: egret.Sound;
	// 所有方块EUI的数组
	private blockArr: Array<eui.Image> = [];
	// 所有回收方块EUI的数组
	private reBackBlockArr: Array<eui.Image> = [];
	
	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		this.init();
	}
	
	private init() {
		this.blockSourceNames = ["block1_png", "block2_png", "block3_png"];
		//初始化音频
		this.pushVoice = RES.getRes('push_mp3');
		this.jumpVoice = RES.getRes('jump_mp3');
		//添加触摸事件
		this.blockPanel.touchEnabled = true;
		this.blockPanel.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.keyDownHandler,this);
		this.blockPanel.addEventListener(egret.TouchEvent.TOUCH_END,this.keyUpHandler,this);
		//设置玩家的锚点在中下中心
		this.img_player.anchorOffsetX = this.img_player.width / 2;
		this.img_player.anchorOffsetY = this.img_player.height - 20;
	}
	private keyDownHandler() {

	}
	private keyUpHandler() {

	}
}