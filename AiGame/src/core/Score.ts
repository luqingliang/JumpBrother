class Score {
	public constructor() {
	}
	/*
	* 给单个棋形打分
	* 用一个7位数表示棋型，从高位到低位分别表示
	* 连五，活四，眠四，活三，活二/眠三，活一/眠二, 眠一
	*/
	public singleScore = {
		ONE: 10,
  		TWO: 100,
  		THREE: 1000,
  		FOUR: 100000,
  		FIVE: 1000000,
  		BLOCKED_ONE: 1,
  		BLOCKED_TWO: 10,
  		BLOCKED_THREE: 100,
  		BLOCKED_FOUR: 10000
	}
	/**
	 * 评分函数，返回单个位置八种可能性得分的合(原理和输赢判定函数差不多)
	 * 判断的时候约定2就是电脑ai下的黑子
	 * version1 : 电脑不能只考虑进攻，还要进行防守，所以这里新增一个代表黑子或者白子的标识位
	 */
	public getScore(x: number, y: number, player: boolean): number {
		let scoreSum: number = 0;
		let a: number = 0;
		let isBlocked: boolean = false;
		//横着是否有五连
		for(let i = y+1; i < 15; ++i) {
			if(AiManager.pointArray.pointArr[x][i] == (player?1:2)) {
				a ++;
			} else if(AiManager.pointArray.pointArr[x][i] == 0) {
				break;
			} else {
				isBlocked = true;
				break;
			}
		}
		for(let i = y-1; i >= 0; --i) {
			if(AiManager.pointArray.pointArr[x][i] == (player?1:2)) {
				a ++;
			} else if(AiManager.pointArray.pointArr[x][i] == 0) {
				break;
			} else {
				isBlocked = true;
				break;
			}
		}
		if(a + 1 >= 5) {
			scoreSum += this.matchingScore(500);
		} else {
			scoreSum += this.matchingScore((a+1)*100 + (isBlocked?1:0));
		}
		//竖着是否有五连
		a = 0;
		isBlocked = false;
		for(let i = x+1; i < 15; ++i) {
			if(AiManager.pointArray.pointArr[i][y] == (player?1:2)) {
				a ++;
			} else if(AiManager.pointArray.pointArr[i][y] == 0){
				break;
			} else {
				isBlocked = true;
				break;
			}
		}
		for(let i = x-1; i >= 0; --i) {
			if(AiManager.pointArray.pointArr[i][y] == (player?1:2)) {
				a ++;
			} else if(AiManager.pointArray.pointArr[i][y] == 0) {
				break;
			} else {
				isBlocked = true;
				break;
			}
		}
		if(a + 1 >= 5) {
			scoreSum += this.matchingScore(500);
		} else {
			scoreSum += this.matchingScore((a+1)*100 + (isBlocked?1:0));
		}
		//正斜是否有五连
		a = 0;
		isBlocked = false;
		for(let i = x-1,j = y-1; i >= 0 && j >= 0; --i,--j) {
			if(AiManager.pointArray.pointArr[i][j] == (player?1:2)) {
				a ++;
			} else if(AiManager.pointArray.pointArr[i][j] == 0) {
				break;
			} else {
				isBlocked = true;
				break;
			}
		}
		for(let i = x+1, j = y+1; i < 15 && j < 15; ++i,++j) {
			if(AiManager.pointArray.pointArr[i][j] == (player?1:2)) {
				a ++;
			} else if(AiManager.pointArray.pointArr[i][j] == 0) {
				break;
			} else {
				isBlocked = true;
				break;
			}
		}
		if(a + 1 >= 5) {
			scoreSum += this.matchingScore(500);
		} else {
			scoreSum += this.matchingScore((a+1)*100 + (isBlocked?1:0));
		}
		//反斜是否有五连
		a = 0;
		isBlocked = false;
		for(let i = x-1,j = y+1; i >= 0 && j < 15; --i,++j) {
			if(AiManager.pointArray.pointArr[i][j] == (player?1:2)) {
				a ++;
			} else if(AiManager.pointArray.pointArr[i][j] == 0) {
				break;
			} else {
				isBlocked = true;
				break;
			}
		}
		for(let i = x+1, j = y-1; i < 15 && j >= 0; ++i,--j) {
			if(AiManager.pointArray.pointArr[i][j] == (player?1:2)) {
				a ++;
			} else if(AiManager.pointArray.pointArr[i][j] == 0) {
				break;
			} else {
				isBlocked = true;
				break;
			}
		}
		if(a + 1 >= 5) {
			scoreSum += this.matchingScore(500);
		} else {
			scoreSum += this.matchingScore((a+1)*100 + (isBlocked?1:0));
		}
		return scoreSum;
	}
	/**
	 * 分数匹配函数（这里选择数字比较而不是字符串比较）
	 */
	private matchingScore(type: number): number {
		switch(type) {
			case 100:
				return this.singleScore.ONE;
			case 200:
				return this.singleScore.TWO;
			case 300:
				return this.singleScore.THREE;
			case 400:
				return this.singleScore.FOUR;
			case 500:
				return this.singleScore.FIVE;
			case 101:
				return this.singleScore.BLOCKED_ONE;
			case 201:
				return this.singleScore.BLOCKED_TWO;
			case 301:
				return this.singleScore.BLOCKED_THREE;
			case 401:
				return this.singleScore.BLOCKED_FOUR;
			default:
				return 0;
		}
	}
}