var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AiPlayer = (function () {
    function AiPlayer() {
        this.timeNow = 0;
        this.MAX = S.FIVE * 10;
        this.MIN = -1 * this.MAX;
    }
    /**
     * version1 : 先简单的随机一个位置下棋
     * version2 : 随机棋子必须出现在敌方棋子相邻处（防守能力加强）
     * version3 : 随机棋子即可出现在敌方棋子相邻处也可以出现在我方棋子相邻处
     * version4 : 遍历搜索所有可以落子的点，并选择分数最高的点落子(这里先简单处理只遍历有邻居的点)
     * version5 : 通过评估对白子最有利的点和对黑子最有利的点谁的分更高，来简单实现进攻和防守
     * version6 : 历史启发，记录搜索分数，减少重复搜索，提高效率
     */
    AiPlayer.prototype.getPoint = function (deep) {
        if (deep === void 0) { deep = Config.searchDeep; }
        //迭代加深
        //注意这里不要比较分数的大小，因为深度越低算出来的分数越不靠谱，所以不能比较大小，而是是最高层的搜索分数为准
        this.count = 0;
        this.ABcut = 0;
        this.timeNow = Date.now();
        var result;
        for (var i = 2; i <= deep; i += 2) {
            result = this.MaxMin(AiManager.pointArray.pointArr, i);
            console.log(result);
            //如果出现必杀，直接返回
            if (AiManager.math.greatOrEqualThan(result.score, S.FOUR)) {
                var newTime_1 = (Date.now() - this.timeNow) / 1000;
                console.log("共搜索节点数：" + this.count);
                console.log("共剪枝次数：" + this.ABcut);
                console.log("本次思考耗时：" + newTime_1 + "s");
                return result;
            }
        }
        var newTime = (Date.now() - this.timeNow) / 1000;
        console.log("共搜索节点数：" + this.count);
        console.log("共剪枝次数：" + this.ABcut);
        console.log("本次思考耗时：" + newTime + "s");
        return result;
    };
    /**
     * 极大极小搜索
     * 最重要的算法之一，返回选出的最优走法
     * @param arr:Array 棋盘数组
     * @param deep:number 搜索深度不传值就调用Config里面的配置
     */
    AiPlayer.prototype.MaxMin = function (arr, deep) {
        var best = this.MIN;
        var points = AiManager.pointArray.gen(arr);
        var bestPoints = [];
        for (var i = 0; i < points.length; i++) {
            var p = points[i];
            arr[p[0]][p[1]] = R.com; //模拟电脑在该点下棋
            var v = this.min(arr, deep - 1, this.MAX, best > this.MIN ? best : this.MIN);
            //如果跟之前的一样好，就暂存在候选数组中
            if (AiManager.math.equal(v, best)) {
                bestPoints.push(p);
            }
            //如果找到一个更好的，就把之前存的候选全部清空
            if (AiManager.math.greatThan(v, best)) {
                best = v;
                bestPoints = [];
                bestPoints.push(p);
            }
            arr[p[0]][p[1]] = R.empty; //每次循环后再改回去
        }
        //从最优节点里面随机一个返回
        var result = bestPoints[Math.floor(bestPoints.length * Math.random())];
        return result;
    };
    AiPlayer.prototype.min = function (arr, deep, alpha, beta) {
        var v = AiManager.score.evaluate(arr); //拿到局势分数
        this.count++;
        if (deep <= 0 || AiManager.pointArray.win(arr)) {
            return v;
        }
        var best = this.MAX;
        var points = AiManager.pointArray.gen(arr);
        for (var i = 0; i < points.length; i++) {
            var p = points[i];
            arr[p[0]][p[1]] = R.hum;
            var v_1 = this.max(arr, deep - 1, best < alpha ? best : alpha, beta) * Config.deepDecrease; //从非初始层开始给分数打折扣
            arr[p[0]][p[1]] = R.empty;
            if (AiManager.math.littleThan(v_1, best)) {
                best = v_1;
            }
            // AB剪枝
            if (Config.isAlphaBeta && AiManager.math.littleOrEqualThan(v_1, best)) {
                this.ABcut++;
                return v_1;
            }
        }
        return best;
    };
    AiPlayer.prototype.max = function (arr, deep, alpha, beta) {
        var v = AiManager.score.evaluate(arr);
        this.count++;
        if (deep <= 0 || AiManager.pointArray.win(arr)) {
            return v;
        }
        var best = this.MIN;
        var points = AiManager.pointArray.gen(arr);
        for (var i = 0; i < points.length; i++) {
            var p = points[i];
            arr[p[0]][p[1]] = R.com;
            var v_2 = this.min(arr, deep - 1, alpha, best > beta ? best : beta) * Config.deepDecrease; //依旧分数要做缩减
            arr[p[0]][p[1]] = R.empty;
            //找到更高分
            if (AiManager.math.greatThan(v_2, best)) {
                best = v_2;
            }
            // AB剪枝
            if (Config.isAlphaBeta && AiManager.math.greatOrEqualThan(v_2, best)) {
                this.ABcut++;
                return v_2;
            }
        }
        return best;
    };
    return AiPlayer;
}());
__reflect(AiPlayer.prototype, "AiPlayer");
