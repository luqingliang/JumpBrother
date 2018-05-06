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
	//重置数组
	public reSet() {
		for(let i = 0; i < 15; i++) {
			for(let j = 0; j < 15; j++) {
				if(this.pointArr[i][j] != 0) {
					this.pointArr[i][j] = 0;
				}
			}
		}
	}
	//用来判断输赢的函数
	public searchWinner(x: number, y: number): boolean {
		let a: number = 0;
		//横着是否有五连
		for(let i = y+1; i < 15; ++i) {
			if(this.pointArr[x][i] == this.pointArr[x][y]) {
				a ++;
			} else {
				break;
			}
		}
		for(let i = y-1; i >= 0; --i) {
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
		for(let i = x+1; i < 15; ++i) {
			if(this.pointArr[i][y] == this.pointArr[x][y]) {
				a ++;
			} else {
				break;
			}
		}
		for(let i = x-1; i >= 0; --i) {
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
		a = 0;
		for(let i = x-1,j = y-1; i >= 0 && j >= 0; --i,--j) {
			if(this.pointArr[i][j] == this.pointArr[x][y]) {
				a ++;
			} else {
				break;
			}
		}
		for(let i = x+1, j = y+1; i < 15 && j < 15; ++i,++j) {
			if(this.pointArr[i][j] == this.pointArr[x][y]) {
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
			if(this.pointArr[i][j] == this.pointArr[x][y]) {
				a ++;
			} else {
				break;
			}
		}
		for(let i = x+1, j = y-1; i < 15 && j >= 0; ++i,--j) {
			if(this.pointArr[i][j] == this.pointArr[x][y]) {
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