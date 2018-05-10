var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Score = (function () {
    function Score() {
    }
    /**
     * 比较重要的评估函数
     * @param arr:Array 棋盘二维数组
     * @return 当前局势的总分数（即电脑总得分减去玩家总得分）
     */
    Score.prototype.evaluate = function (arr) {
        var rows = AiManager.pointArray.flat(arr);
        var humScore = this.getScoreSum(rows, R.hum);
        var comScore = this.getScoreSum(rows, R.com);
        return comScore - humScore;
    };
    Score.prototype.getScoreSum = function (rows, player) {
        var s = 0;
        for (var i = 0; i < rows.length; i++) {
            s += this.calculateScore(rows[i], player);
        }
        return s;
    };
    Score.prototype.calculateScore = function (lineArr, player) {
        var count = 0; //连子数
        var block = 0; //封堵数
        var value = 0; //分数
        for (var i = 0; i < lineArr.length; i++) {
            if (lineArr[i] == player) {
                count = 1;
                block = 0;
                //判断左边界
                if (i == 0) {
                    block = 1;
                }
                else {
                    block = lineArr[i] == R.empty ? 0 : 1;
                }
                //计算己方连续的棋子数
                for (i = i + 1; i < lineArr.length; i++) {
                    if (lineArr[i] == player) {
                        count++;
                    }
                    else if (lineArr[i] == R.empty) {
                        break;
                    }
                    else {
                        block++;
                    }
                }
                if (block <= 1) {
                    value += this.matchingScore(count * 100 + block);
                }
            }
        }
        return value;
    };
    /**
     * 对单个位置进行评分，返回单个位置八种可能性得分的合(原理和输赢判定函数差不多)
     * 判断的时候约定2就是电脑ai下的黑子
     * version1 : 电脑不能只考虑进攻，还要进行防守，所以这里新增一个代表黑子或者白子的标识位
     * version2 : 考虑到之后要进行深度搜索预测，所以使用传入的棋盘数组进行评分
     */
    Score.prototype.getScore = function (arr, x, y, player) {
        var scoreSum = 0;
        var a = 0;
        var isBlockedLeft = false;
        var isBlockedRight = false;
        //横着连线
        for (var i = y + 1; i < 15; ++i) {
            if (arr[x][i] == player) {
                a++;
            }
            else if (arr[x][i] == R.empty) {
                break;
            }
            else {
                isBlockedLeft = true;
                break;
            }
        }
        for (var i = y - 1; i >= 0; --i) {
            if (arr[x][i] == player) {
                a++;
            }
            else if (arr[x][i] == R.empty) {
                break;
            }
            else {
                isBlockedRight = true;
                break;
            }
        }
        if (a + 1 >= 5) {
            scoreSum += this.matchingScore(500);
        }
        else {
            if (isBlockedLeft && isBlockedRight) {
                scoreSum += 0;
            }
            else {
                scoreSum += this.matchingScore((a + 1) * 100 + (isBlockedLeft || isBlockedRight ? 1 : 0));
            }
        }
        //竖着连线
        a = 0;
        isBlockedLeft = false;
        isBlockedRight = false;
        for (var i = x + 1; i < 15; ++i) {
            if (arr[i][y] == player) {
                a++;
            }
            else if (arr[i][y] == R.empty) {
                break;
            }
            else {
                isBlockedLeft = true;
                break;
            }
        }
        for (var i = x - 1; i >= 0; --i) {
            if (arr[i][y] == player) {
                a++;
            }
            else if (arr[i][y] == R.empty) {
                break;
            }
            else {
                isBlockedRight = true;
                break;
            }
        }
        if (a + 1 >= 5) {
            scoreSum += this.matchingScore(500);
        }
        else {
            if (isBlockedLeft && isBlockedRight) {
                scoreSum += 0;
            }
            else {
                scoreSum += this.matchingScore((a + 1) * 100 + (isBlockedLeft || isBlockedRight ? 1 : 0));
            }
        }
        //正斜方向连线
        a = 0;
        isBlockedLeft = false;
        isBlockedRight = false;
        for (var i = x - 1, j = y - 1; i >= 0 && j >= 0; --i, --j) {
            if (arr[i][j] == player) {
                a++;
            }
            else if (arr[i][j] == R.empty) {
                break;
            }
            else {
                isBlockedLeft = true;
                break;
            }
        }
        for (var i = x + 1, j = y + 1; i < 15 && j < 15; ++i, ++j) {
            if (arr[i][j] == player) {
                a++;
            }
            else if (arr[i][j] == R.empty) {
                break;
            }
            else {
                isBlockedRight = true;
                break;
            }
        }
        if (a + 1 >= 5) {
            scoreSum += this.matchingScore(500);
        }
        else {
            if (isBlockedLeft && isBlockedRight) {
                scoreSum += 0;
            }
            else {
                scoreSum += this.matchingScore((a + 1) * 100 + (isBlockedLeft || isBlockedRight ? 1 : 0));
            }
        }
        //反斜方向连线
        a = 0;
        isBlockedLeft = false;
        isBlockedRight = false;
        for (var i = x - 1, j = y + 1; i >= 0 && j < 15; --i, ++j) {
            if (arr[i][j] == player) {
                a++;
            }
            else if (arr[i][j] == R.empty) {
                break;
            }
            else {
                isBlockedLeft = true;
                break;
            }
        }
        for (var i = x + 1, j = y - 1; i < 15 && j >= 0; ++i, --j) {
            if (arr[i][j] == player) {
                a++;
            }
            else if (arr[i][j] == R.empty) {
                break;
            }
            else {
                isBlockedRight = true;
                break;
            }
        }
        if (a + 1 >= 5) {
            scoreSum += this.matchingScore(500);
        }
        else {
            if (isBlockedLeft && isBlockedRight) {
                scoreSum += 0;
            }
            else {
                scoreSum += this.matchingScore((a + 1) * 100 + (isBlockedLeft || isBlockedRight ? 1 : 0));
            }
        }
        return scoreSum;
    };
    /**
     * 分数匹配函数（这里选择数字比较而不是字符串比较）
     */
    Score.prototype.matchingScore = function (type) {
        switch (type) {
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
    };
    return Score;
}());
__reflect(Score.prototype, "Score");
