class AiManager {
	public constructor() {
	}
	/**
	 * 代表棋盘的15*15的二维数组（棋盘模块）
	 */
	public static pointArray: PointArray;
	/**
	 * 包含评分函数的评分模块
	 */
	public static score: Score;
	/**
	 * 电脑Ai模块
	 */
	public static ai: AiPlayer;
	/**
	 * Math工具模块
	 */
	public static math: MathTool;

	/**
	 * 初始化
	 */
	public static init() {
		this.pointArray = new PointArray();
		this.score = new Score();
		this.ai = new AiPlayer();
		this.math = new MathTool();
	}
}