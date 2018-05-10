class Score {
	public constructor() {
	}

	/**
	 * 比较重要的评估函数
	 * @param arr:Array 棋盘二维数组
	 * @return 当前局势的总分数（即电脑总得分减去玩家总得分）
	 */
	public evaluate(arr: Array<Array<number>>): number {
		let rows = AiManager.pointArray.flat(arr);
		let humScore = this.getScoreSum(rows, R.hum);
		let comScore = this.getScoreSum(rows, R.com);
		return comScore - humScore;
	}
	private getScoreSum(rows: Array<any>, player:number): number {
		let s: number = 0;
		for(let i = 0; i < rows.length; i++) {
			s += this.calculateScore(rows[i], player);
		}
		return s;
	}
	private calculateScore(lineArr:Array<any>, player: number): number {
		let count = 0; //连子数
		let block = 0; //封堵数
		let value = 0; //分数

		for(let i = 0; i < lineArr.length; i++) {
			if(lineArr[i] == player) { //发现第一个己方棋子
				count = 1;
				block = 0;
				//判断左边界
				if(i == 0) {
					block = 1;
				} else {
					block = lineArr[i]==R.empty?0:1;
				}

				//计算己方连续的棋子数
				for(i = i+1; i < lineArr.length; i++) {
					if(lineArr[i] == player) {
						count ++;
					} else if(lineArr[i] == R.empty) {
						break;
					} else {
						block ++;
					}
				}

				if(block > 1) {
					value += 0;
				} else {
					value += this.matchingScore(count*100 + block);
				}
			}

			return value;
		}
	}
	/**
	 * 对单个位置进行评分，返回单个位置八种可能性得分的合(原理和输赢判定函数差不多)
	 * 判断的时候约定2就是电脑ai下的黑子
	 * version1 : 电脑不能只考虑进攻，还要进行防守，所以这里新增一个代表黑子或者白子的标识位
	 * version2 : 考虑到之后要进行深度搜索预测，所以使用传入的棋盘数组进行评分
	 */
	public getScore(arr: Array<Array<number>>,x: number, y: number, player: number): number {
		let scoreSum: number = 0;
		let a: number = 0;
		let isBlockedLeft: boolean = false;
		let isBlockedRight: boolean = false;
		//横着连线
		for(let i = y+1; i < 15; ++i) {
			if(arr[x][i] == player) {
				a ++;
			} else if(arr[x][i] == R.empty) {
				break;
			} else {
				isBlockedLeft = true;
				break;
			}
		}
		for(let i = y-1; i >= 0; --i) {
			if(arr[x][i] == player) {
				a ++;
			} else if(arr[x][i] == R.empty) {
				break;
			} else {
				isBlockedRight = true;
				break;
			}
		}
		if(a + 1 >= 5) {
			scoreSum += this.matchingScore(500);
		} else {
			if(isBlockedLeft && isBlockedRight) { //两边全被堵住并且这个这个位置也不能连五则不考虑
				scoreSum += 0;
			} else {
				scoreSum += this.matchingScore((a+1)*100 + (isBlockedLeft||isBlockedRight?1:0));
			}
		}
		//竖着连线
		a = 0;
		isBlockedLeft = false;
		isBlockedRight = false;
		for(let i = x+1; i < 15; ++i) {
			if(arr[i][y] == player) {
				a ++;
			} else if(arr[i][y] == R.empty){
				break;
			} else {
				isBlockedLeft = true;
				break;
			}
		}
		for(let i = x-1; i >= 0; --i) {
			if(arr[i][y] == player) {
				a ++;
			} else if(arr[i][y] == R.empty) {
				break;
			} else {
				isBlockedRight = true;
				break;
			}
		}
		if(a + 1 >= 5) {
			scoreSum += this.matchingScore(500);
		} else {
			if(isBlockedLeft && isBlockedRight) { //两边全被堵住并且这个这个位置也不能连五则不考虑
				scoreSum += 0;
			} else {
				scoreSum += this.matchingScore((a+1)*100 + (isBlockedLeft||isBlockedRight?1:0));
			}
		}
		//正斜方向连线
		a = 0;
		isBlockedLeft = false;
		isBlockedRight = false;
		for(let i = x-1,j = y-1; i >= 0 && j >= 0; --i,--j) {
			if(arr[i][j] == player) {
				a ++;
			} else if(arr[i][j] == R.empty) {
				break;
			} else {
				isBlockedLeft = true;
				break;
			}
		}
		for(let i = x+1, j = y+1; i < 15 && j < 15; ++i,++j) {
			if(arr[i][j] == player) {
				a ++;
			} else if(arr[i][j] == R.empty) {
				break;
			} else {
				isBlockedRight = true;
				break;
			}
		}
		if(a + 1 >= 5) {
			scoreSum += this.matchingScore(500);
		} else {
			if(isBlockedLeft && isBlockedRight) { //两边全被堵住并且这个这个位置也不能连五则不考虑
				scoreSum += 0;
			} else {
				scoreSum += this.matchingScore((a+1)*100 + (isBlockedLeft||isBlockedRight?1:0));
			}
		}
		//反斜方向连线
		a = 0;
		isBlockedLeft = false;
		isBlockedRight = false;
		for(let i = x-1,j = y+1; i >= 0 && j < 15; --i,++j) {
			if(arr[i][j] == player) {
				a ++;
			} else if(arr[i][j] == R.empty) {
				break;
			} else {
				isBlockedLeft = true;
				break;
			}
		}
		for(let i = x+1, j = y-1; i < 15 && j >= 0; ++i,--j) {
			if(arr[i][j] == player) {
				a ++;
			} else if(arr[i][j] == R.empty) {
				break;
			} else {
				isBlockedRight = true;
				break;
			}
		}
		if(a + 1 >= 5) {
			scoreSum += this.matchingScore(500);
		} else {
			if(isBlockedLeft && isBlockedRight) { //两边全被堵住并且这个这个位置也不能连五则不考虑
				scoreSum += 0;
			} else {
				scoreSum += this.matchingScore((a+1)*100 + (isBlockedLeft||isBlockedRight?1:0));
			}
		}
		return scoreSum;
	}
	/**
	 * 分数匹配函数（这里选择数字比较而不是字符串比较）
	 */
	private matchingScore(type: number): number {
		switch(type) {
			case 100:
				return S.ONE;
			case 200:
				return S.TWO;
			case 300:
				return S.THREE;
			case 400:
				return S.FOUR;
			case 500:
				return S.FIVE;
			case 101:
				return S.BLOCKED_ONE;
			case 201:
				return S.BLOCKED_TWO;
			case 301:
				return S.BLOCKED_THREE;
			case 401:
				return S.BLOCKED_FOUR;
			default:
				return 0;
		}
	}
}