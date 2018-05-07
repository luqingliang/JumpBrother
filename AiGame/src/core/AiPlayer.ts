class AiPlayer {
	public constructor() {
	}
	/**
	 * version1 : 先简单的随机一个位置下棋
	 * version2 : 随机棋子必须出现在敌方棋子相邻处（防守能力加强）
	 * version3 : 随机棋子即可出现在敌方棋子相邻处也可以出现在我方棋子相邻处
	 * version4 : 遍历搜索所有可以落子的点，并选择分数最高的点落子(这里先简单处理只遍历有邻居的点)
	 * version5 : 通过评估对白子最有利的点和对黑子最有利的点谁的分更高，来简单实现进攻和防守
	 */
	public getPoint(): Array<number> {
		// for(let i = 0; i < (15 * 15); i++) {
		// 	let x = Math.floor(Math.random() * 15);
		// 	let y = Math.floor(Math.random() * 15);
		// 	if(AiManager.pointArray.pointArr[x][y] == 0) {
		// 		if(AiManager.pointArray.getNeighbor(x,y)) {
		// 			return [x, y];
		// 		}
		// 	}
		// }
		let maxScore1: number = 0;
		let maxScore2: number = 0;
		let x: number = 0;
		let y: number = 0;
		let x1: number = 0;
		let y1: number = 0;
		for(let i = 0; i < 15; i++) {
			for(let j = 0; j < 15; j++) {
				if(AiManager.pointArray.pointArr[i][j] == 0 && AiManager.pointArray.getNeighbor(i,j)) {
					let c = AiManager.score.getScore(i,j,false);
					let d = AiManager.score.getScore(i,j,true);
					if(c > maxScore1) {
						maxScore1 = c;
						x = i;
						y = j;
					}
					if(d > maxScore2) {
						maxScore2 = d;
						x1 = i;
						y1 = j;
					}
				}
			}
		}
		console.log('白子最大分数 '+maxScore2);
		console.log('黑子最大分数 '+maxScore1);
		return [(maxScore1>=maxScore2?x:x1), (maxScore1>=maxScore2?y:y1)]; //大于等于，优先进攻
	}
}