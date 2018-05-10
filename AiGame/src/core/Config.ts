class Config {
	/**
	 * 搜索深度
	 */
	public static searchDeep: number = 2;
	/**
	 * gen函数返回的节点数量上限，超过之后将会按照分数进行截断
	 */
	public static countLimit: number = 16;
	/**
	 * 算杀深度
	 */
	public static checkmateDeep: number = 5;
	/**
	 * 是否使用效率不高的置换表
	 */
	public static cache: boolean = false;
	/**
	 * 在vcx中使用置换表
	 */
	public static vcxCache: boolean = true;
	/**
	 * 搜索每深入一层，同样的分数会打一个折扣（因为你不知道玩家会怎么走，也就是说这步棋不一定会出现）
	 */
	public static deepDecrease: number = 0.8;
}