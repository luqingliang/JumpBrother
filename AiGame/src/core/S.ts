/**
 * 分数类 给单个棋形打分
 * 用一个7位数表示棋（这样表示的原因是，不管这一步可以带来多少种连击得分，加起来也超不过他的上一级），从高位到低位分别表示
 * 连五，活四，眠四，活三，活二/眠三，活一/眠二, 眠一
 */
class S {
	/**
	 * 活1
	 */
	public static ONE: number =  10;
	/**
	 * 活2
	 */
  	public static TWO: number =  100;
	/**
	 * 活3
	 */
  	public static THREE: number =  1000;
	/**
	 * 活4
	 */
  	public static FOUR: number = 100000;
	/**
	 * 连5
	 */
  	public static FIVE: number = 1000000;
	/**
	 * 眠1
	 */
  	public static BLOCKED_ONE: number = 1;
	/**
	 * 眠2
	 */
  	public static BLOCKED_TWO: number = 10;
	/**
	 * 眠3
	 */
  	public static BLOCKED_THREE: number = 100;
	/**
	 * 眠4
	 */
  	public static BLOCKED_FOUR: number = 10000;
}