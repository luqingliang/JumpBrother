class Config {
	/**
	 * 是否是玩家对战
	 */
	public static isPVP: boolean = false;
	/**
	 * 搜索深度
	 */
	public static searchDeep: number = 4;
	/**
	 * gen函数返回的节点数量上限，超过之后将会按照分数进行截断
	 */
	public static countLimit: number = 60;
	/**
	 * 搜索每深入一层，同样的分数会打一个折扣（因为你不知道玩家会怎么走，也就是说这步棋不一定会出现）
	 */
	public static deepDecrease: number = 0.8;
	/**
	 * 是否进行启发搜索
	 */
	public static isGen: boolean = true;
	/**
	 * 是否进行预估排序
	 */
	public static isOmen: boolean = true;
	/**
	 * 是否进行剪枝
	 */
	public static isAlphaBeta: boolean = true;
}