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
				this.pointArr[i][j] = 0;
			}
		}
	}
	//用来判断输赢的函数
	public searchWinner(x: number, y: number): boolean {
		let a: number = 0;
		//横着是否有五连
		for(let i = y; i < 15; i ++) {
			if(this.pointArr[x][i] == this.pointArr[x][y]) {
				a ++;
			} else {
				break;
			}
		}
		for(let i = y; i > 0; i --) {
			if(this.pointArr[x][i] == this.pointArr[x][y]) {
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
		for(let i = x; i < 15; i ++) {
			if(this.pointArr[i][y] == this.pointArr[x][y]) {
				a ++;
			} else {
				break;
			}
		}
		for(let i = x; i > 0; i --) {
			if(this.pointArr[i][y] == this.pointArr[x][y]) {
				a ++;
			} else {
				break;
			}
		}
		if(a + 1 >= 5) {
			return true;
		}
		//正斜是否有五连
		//反斜是否有五连

		return false;
	}
}