class AiPlayer {
	public constructor() {
	}
	/**
	 * version1 : 先简单的随机一个位置下棋
	 * version2 : 随机棋子必须出现在敌方棋子相邻处（防守能力加强）
	 * version3 : 随机棋子即可出现在敌方棋子相邻处也可以出现在我方棋子相邻处
	 * version4 : 遍历搜索所有可以落子的点，并选择分数最高的点落子(这里先简单处理只遍历有邻居的点)
	 * version5 : 通过评估对白子最有利的点和对黑子最有利的点谁的分更高，来简单实现进攻和防守
	 * version6 : 历史启发，记录搜索分数，减少重复搜索，提高效率
	 */
	public getPoint(deep: number = Config.searchDeep): Array<number> {
		//迭代加深
		//注意这里不要比较分数的大小，因为深度越低算出来的分数越不靠谱，所以不能比较大小，而是是最高层的搜索分数为准
		this.count = 0;
		this.ABcut = 0;
		this.timeNow = Date.now();
		
		let result;
		for(let i=2;i<=deep; i+=2) {
			result = this.MaxMin(AiManager.pointArray.pointArr, i);
			console.log(result);
			//如果出现必杀，直接返回
			if(AiManager.math.greatOrEqualThan(result.score, S.FOUR)) {
				let newTime: number = (Date.now() - this.timeNow) / 1000;
				console.log("共搜索节点数：" + this.count);
				console.log("共剪枝次数：" + this.ABcut);
				console.log("本次思考耗时：" + newTime + "s");
				return result;
			}
		}
		let newTime: number = (Date.now() - this.timeNow) / 1000;
		console.log("共搜索节点数：" + this.count);
		console.log("共剪枝次数：" + this.ABcut);
		console.log("本次思考耗时：" + newTime + "s");
		return result;
	}
	private timeNow: number = 0;
	private MAX: number = S.FIVE * 10;
	private MIN: number = -1 * this.MAX;
	private count: number; //计数
	private ABcut: number; //剪枝计数
	/**
	 * 极大极小搜索
	 * 最重要的算法之一，返回选出的最优走法
	 * @param arr:Array 棋盘数组
	 * @param deep:number 搜索深度不传值就调用Config里面的配置
	 */
	public MaxMin(arr: Array<Array<number>>, deep: number): Array<number> {
		let best: number = this.MIN;
		let points: Array<Array<number>> = AiManager.pointArray.gen(arr);

		let bestPoints = [];

		for(let i = 0; i < points.length; i++) {
			let p = points[i];
			arr[p[0]][p[1]] = R.com; //模拟电脑在该点下棋
			let v = this.min(arr,deep-1,this.MAX,best > this.MIN ? best : this.MIN);

			//如果跟之前的一样好，就暂存在候选数组中
			if(AiManager.math.equal(v, best)) {
				bestPoints.push(p);
			}

			//如果找到一个更好的，就把之前存的候选全部清空
			if(AiManager.math.greatThan(v, best)) {
				best = v;
				bestPoints = [];
				bestPoints.push(p);
			}
			arr[p[0]][p[1]] = R.empty; //每次循环后再改回去
		}
		
		//从最优节点里面随机一个返回
		let result = bestPoints[Math.floor(bestPoints.length * Math.random())];

		return result;
	}
	private min(arr: Array<any>, deep: number, alpha, beta): number {
		let v: number = AiManager.score.evaluate(arr); //拿到局势分数
		this.count ++;
		if(deep <= 0 || AiManager.pointArray.win(arr)) { //如果搜索深度到底，或者可以直接赢棋，直接返回
			return v;
		}

		let best = this.MAX;
		let points: Array<any> = AiManager.pointArray.gen(arr);

		for(let i = 0; i < points.length; i++) {
			let p = points[i];
			arr[p[0]][p[1]] = R.hum;
			let v = this.max(arr,deep-1,best < alpha ? best : alpha,beta) * Config.deepDecrease; //从非初始层开始给分数打折扣
			arr[p[0]][p[1]] = R.empty;

			if(AiManager.math.littleThan(v, best)) { //找到更小分数的位置
				best =  v;
			}
			// AB剪枝
			if(Config.isAlphaBeta && AiManager.math.littleOrEqualThan(v, best)) {
				this.ABcut ++;
				return v;
			}
		}
		return best;
	}
	private max(arr :Array<any>, deep: number, alpha, beta): number {
		let v: number = AiManager.score.evaluate(arr);
		this.count ++;
		if(deep <= 0 || AiManager.pointArray.win(arr)) { //搜索到指定深度或者可以直接赢棋
			return v;
		}

		let best = this.MIN;
		let points: Array<any> = AiManager.pointArray.gen(arr);

		for(let i = 0; i < points.length; i++) {
			let p = points[i];
			arr[p[0]][p[1]] = R.com;
			let v = this.min(arr, deep-1, alpha, best > beta ? best : beta) * Config.deepDecrease; //依旧分数要做缩减
			arr[p[0]][p[1]] = R.empty;

			//找到更高分
			if(AiManager.math.greatThan(v, best)) {
				best = v;
			}
			// AB剪枝
			if(Config.isAlphaBeta && AiManager.math.greatOrEqualThan(v, best)) {
				this.ABcut ++;
				return v;
			}
		}
		return best;
	}
}