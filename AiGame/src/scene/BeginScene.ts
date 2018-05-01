class BeginScene extends eui.Component implements  eui.UIComponent {

	//开始按钮
	public btn_begin:eui.Button;

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
		//注意要在页面加载完成后调用初始化方法，在构造函数中会报错
		this.init();
	}
	//初始化，并绑定事件
	private init() {
		this.btn_begin.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tapHandler,this);
	}
	private tapHandler() {
		//切换到游戏中场景
		SceneManager.Instance().changeScene(SceneManager.GAME_SCENE);
	}	
	public release() {
		if(this.btn_begin.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
			this.btn_begin.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.tapHandler,this);
		}
	}
}