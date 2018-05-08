class MathTool {
	private threshold: number;
	public constructor() {
		this.threshold = 1.2;
	}

	/**
	 * 判断传入的分数是否是平等的，因为深度不同所以有 阈值
	 */
	public equal(a: number, b: number): boolean {
		return (a * this.threshold > b) && (a < b * this.threshold);
	}
	/**
	 * 判断是否是更好的分数
	 */
	public greatThan(a: number, b: number): boolean {
		return a > b * this.threshold;
	}
	/**
	 * 判断是否是更小的分数
	 */
	public littleThan(a: number, b: number): boolean {
		return a * this.threshold < b;
	}
	/**
	 * 判断小于等于关系
	 */
	public littleOrEqualThan(a: number, b: number): boolean {
		return a < b * this.threshold;
	}
	/**
	 * 判断大于等于关系
	 */
	public greatOrEqualThan(a: number, b: number): boolean {
		return a * this.threshold > b;
	}
}