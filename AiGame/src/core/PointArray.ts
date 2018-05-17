class PointArray {
	/**
	 * 代表整个棋盘各个落子点的二维数组
	 * 0 表示空
	 * 1 表示白子
	 * 2 表示黑子
	 */
	public pointArr:any = new Array();
	public constructor() {
		for(var i = 0; i < 15; i++) {
			this.pointArr[i] = new Array();
			for(var j = 0; j < 15; j++) {
				this.pointArr[i][j] = R.empty;
			}
		}
	}
	/**
	 * generator 函数
	 * @param arr:Array 棋盘数组 (目前就这一个参数，传入要分析的棋盘数组)
	 * 比较重要的一个函数,用来返回可以落子的位置的数组
	 * 这个数组是优化重点，因为去掉一些没必要的位置可以大幅提升性能
	 * 注意排序，会对之后的算法效率产生很大影响
	 */
	public gen(arr: Array<Array<number>>):Array<Array<number>> {
		let fives = []; //连五
  		let fours=[]; //连四
  		let twoThrees=[]; //双三
  		let threes = []; //连三
  		let twos = []; //连二
  		let neighbors = []; //紧挨相邻
  		let nextNeighbors = []; //隔空相邻

		for(let i = 0; i < arr.length; i++) {
			for(let j = 0; j < arr[i].length; j++) {
				if(arr[i][j] == R.empty) {
					if(this.getNeighbor(arr,i,j,1)) { //判断是否有紧邻的邻居
						let scoreHum: number = AiManager.score.getScore(arr,i,j,R.hum);
						let scoreCom: number = AiManager.score.getScore(arr,i,j,R.com);
						//如果电脑可以连五，直接返回
						if(scoreCom >= S.FIVE) {
							return [[i,j]];
						} else if(scoreHum >= S.FIVE) {
							//玩家可以连5，先不要着急返回，因为没有遍历完的话电脑还是有可能连5的
							fives.push([i,j]);
						} else if(scoreCom >= S.FOUR) {
							fours.unshift([i,j]);
						} else if(scoreHum >= S.FOUR) {
							fours.push([i,j]);
						} else if(scoreCom >= 2*S.THREE) {
							twoThrees.unshift([i,j]);
						} else if(scoreHum >= 2*S.THREE) {
							twoThrees.push([i,j]);
						} else if(scoreCom >= S.THREE) {
							threes.unshift([i,j]);
						} else if(scoreHum >= S.THREE) {
							threes.push([i,j]);
						} else if(scoreCom >= S.TWO) {
							twos.unshift([i,j]);
						} else if(scoreHum >= S.TWO) {
							twos.push([i,j]);
						} else {
							neighbors.push([i,j]);
						}
					} else if(this.getNeighbor(arr,i,j,2)) { //没有相邻的情况下判断两步之内是否有邻居，为了提高效率最多考虑到这样
						nextNeighbors.push([i,j]);
					}
				}
			}
		}

		//连5是必杀，直接返回
		if(fives.length) return [fives[0]];
		if(fours.length) return fours;
		if(twoThrees.length) return twoThrees;
		//以上三种优先级最高，如果出现直接返回，不用向下再考虑

		//按照  连3>连2>紧挨相邻>隔空相邻  的顺序拼接其他情况的数组
		let result: Array<Array<number>> = threes.concat(
			twos.concat(
				neighbors.concat(nextNeighbors)
			)
		);
		//如果结果数组的长度超过我们设定的限制，则截取分数更高的相应长度（测试阶段先不生效）
		if(result.length > Config.countLimit) {
			return result.slice(0,Config.countLimit);
		}
		return result;
	}
	/**
	 * 将传入的二维棋盘数组一维化
	 * @param arr:Array 棋盘数组
	 * @returns
	 */
	public flat(arr: Array<Array<number>>):any {
		let result = [];
		let len: number = arr.length;

		//横向
		for(let i = 0; i < len; i++) {
			result.push(arr[i]);
		}
		//竖向
		for(let i = 0; i < len; i++) {
			let col = [];
			for(let j = 0; j < len; j++) {
				col.push(arr[i][j]);
			}
			result.push(col);
		}
		//  / 左斜
		for(let i = 0; i < len*2; i++) {
   			let line = [];
			for(let j = 0; j <= i && j < len; j++) {
				if(i-j < len) line.push(arr[i-j][j]);
			}
    		if(line.length) result.push(line);
  		}
		//  \ 右斜
		for(let i = -1*len + 1; i < len; i++) {
    		let line = [];
    		for(let j = 0; j < len; j++) {
      			if(j+i >= 0 && j+i < len) line.push(arr[j+i][j]);
    		}
    		if(line.length) result.push(line);
 		}

		return result;
	}
	/**
	 * 重置数组
	 */
	public reSet() {
		for(let i = 0; i < 15; i++) {
			for(let j = 0; j < 15; j++) {
				if(this.pointArr[i][j] != R.empty) {
					this.pointArr[i][j] = R.empty;
				}
			}
		}
	}
	/**
	 * 下棋（更新棋盘中的一个位置）
	 */
	public put(x: number, y: number, type: boolean) {
		if(this.pointArr[x][y] == 0) {
			this.pointArr[x][y] = (type?R.hum:R.com);
		} else {
			console.log("棋盘数组插入棋子错误！！！");
		}
	}
	/**
	 * 悔棋
	 */
	public regret(x: number, y: number) {
		if(this.pointArr[x][y] != 0) {
			this.pointArr[x][y] = 0;
			console.log('悔棋成功！');
		}
	}
	/**
	 * 获取传入的棋盘中，某个位置是否有邻居
	 * @param arr:Array 棋盘数组
	 * @param x:number 行
	 * @param y:number 列
	 * @param margin:number 搜索第几步上是否有邻居
	 */
	public getNeighbor(arr: Array<Array<number>>, x: number, y: number, margin: number): boolean {
		if(((x-margin)>=0 && arr[x-margin][y] != R.empty) || (x<=(14-margin) && arr[x+margin][y] != R.empty)) {
			return true;
		}
		if(((y-margin)>=0 && arr[x][y-margin] != R.empty) || (y<=(14-margin) && arr[x][y+margin] != R.empty)) {
			return true;
		}
		if(((x-margin)>=0 && (y-margin)>=0 && arr[x-margin][y-margin] != R.empty) || (x<=(14-margin) && y<=(14-margin) && arr[x+margin][y+margin] != R.empty)) {
			return true;
		}
		if(((x-margin)>=0 && y<=(14-margin) && arr[x-margin][y+margin] != R.empty) || (x<=(14-margin) && (y-margin)>=0 && arr[x+margin][y-margin] != R.empty)) {
			return true;
		}
		return false;
	}
	/**
	 * 判断传入的棋局是否有连五
	 * @param arr:Array 棋盘数组
	 * @return 如果有连五则返回连五的是电脑还是玩家，否则返回false
	 */
	public win(arr: Array<Array<number>>): any {
		for(let i = 0; i < arr.length; i++) {
			for(let j = 0; j < arr.length; j++) {
				let r: number = arr[i][j];
				if(r != R.empty) {
					if(this.searchWinner(arr,i,j)) { //有连五
						return r;
					}
				}
			}
		}

		return false;
	}
	/**
	 * 用来判断某个点是否能连五的函数
	 * @param arr:Array 棋盘数组
	 * @param x:number
	 * @param y:number
	 */
	public searchWinner(arr: Array<Array<number>>, x: number, y: number): boolean {
		let a: number = 0;
		//横着是否有五连
		for(let i = y+1; i < 15; ++i) {
			if(arr[x][i] == arr[x][y]) {
				a ++;
			} else {
				break;
			}
		}
		for(let i = y-1; i >= 0; --i) {
			if(arr[x][i] == arr[x][y]) {
				a ++;
			} else {
				break;
			}
		}
		if(a + 1 >= 5) {
			return true;
		}
		//竖着是否有五连
		a = 0;
		for(let i = x+1; i < 15; ++i) {
			if(arr[i][y] == arr[x][y]) {
				a ++;
			} else {
				break;
			}
		}
		for(let i = x-1; i >= 0; --i) {
			if(arr[i][y] == arr[x][y]) {
				a ++;
			} else {
				break;
			}
		}
		if(a + 1 >= 5) {
			return true;
		}
		//正斜是否有五连
		a = 0;
		for(let i = x-1,j = y-1; i >= 0 && j >= 0; --i,--j) {
			if(arr[i][j] == arr[x][y]) {
				a ++;
			} else {
				break;
			}
		}
		for(let i = x+1, j = y+1; i < 15 && j < 15; ++i,++j) {
			if(arr[i][j] == arr[x][y]) {
				a ++;
			} else {
				break;
			}
		}
		if(a + 1 >= 5) {
			return true;
		}
		//反斜是否有五连
		a = 0;
		for(let i = x-1,j = y+1; i >= 0 && j < 15; --i,++j) {
			if(arr[i][j] == arr[x][y]) {
				a ++;
			} else {
				break;
			}
		}
		for(let i = x+1, j = y-1; i < 15 && j >= 0; ++i,--j) {
			if(arr[i][j] == arr[x][y]) {
				a ++;
			} else {
				break;
			}
		}
		if(a + 1 >= 5) {
			return true;
		}

		return false;
	}
}