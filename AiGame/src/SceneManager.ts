class SceneManager extends egret.Sprite {

	/**
	 * 开始游戏场景名
	 */
	public static BEGIN_SCENE: string = "beginScene";
	/**
	 * 游戏中场景名
	 */
	public static GAME_SCENE: string = "gameScene";

	//开始游戏场景对象
	private beginScene: BeginScene;
	//游戏中场景对象
	private gameScene: GameScene;

	public constructor() {
		super();
		this.init();
	}
	private init(){
		this.beginScene = new BeginScene();
		this.gameScene = new GameScene();
		//也在这里初始化AiManager类
		AiManager.init();

		this.addChild(this.beginScene);
	}
	//场景管理类的实例
	private static _instance: SceneManager;
	/**
	 * 获取场景管理类的单例
	 */
	public static Instance(): SceneManager {
		if(!SceneManager._instance)
		{
			SceneManager._instance = new SceneManager();
		}
		return SceneManager._instance;
	}
	public get _gameScene(): GameScene {
		return this.gameScene;
	}
	/**
	 * 切换场景
	 */
	public changeScene(type, data:any = null) {
		if(type != SceneManager.BEGIN_SCENE) {
			this.beginScene.release();
		}
		if(type != SceneManager.GAME_SCENE) {
			this.gameScene.release();
		}
		if(data != null){
			this[type].update(data);
		}
		this.removeChildren();
		this.addChild(this[type]);
		this[type].init();
	}
}