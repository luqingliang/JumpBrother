var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.send("welcome");  //在浏览器打开时显示在页面上的信息..  
});
//所有连接的用户
var playerList = [];
//记录以匹配成功的玩家的对象组
var gameingList = [];

io.on('connection', function (socket) {
    console.log('a user connected');
    playerList.push({player:socket, isGameing:false});

    //向所有在线用户广播当前总在线人数
    io.emit('playerNum',{num:playerList.length});

    //断开连接的处理
    socket.on('disconnect', function () {
        //从当前连接的玩家数组中删除断线的
        for (i = 0; i < playerList.length; i++) {
            if (playerList[i].id == socket.id) {
                playerList.splice(i, 1);
                console.log('玩家离线成功！');
                break;
            }
        }
    });
    //监听匹配对手
    socket.on('Game-Matching',function () {
        updatePlayerList(socket, false); //既然又匹配对手，那么先把状态置为空闲
        var newArr = [];
        for(i = 0; i < playerList.length; i++) {
            if(playerList[i].player.id != socket.id && playerList[i].isGameing == false) {
                newArr.push(playerList[i]);
            }
        }
        var obj = newArr[Math.floor(newArr.length * Math.random())];
        if(!obj) return;
        var newNumber = Math.floor(2 * Math.random()); //用来随机先手
        obj.player.broadcast.emit('Game-Start',{isFirst:(newNumber == 1 ? false : true)});
        socket.broadcast.emit('Game-Start', {isFirst:(newNumber == 1 ? true : false)});
        updatePlayerList(obj.player, true);
        updatePlayerList(socket, true);
        gameingList.push({p1:socket, p2:obj.player});
    })
    //监听发送下棋点
    socket.on('Game-SendPoint', function (data) {
        for(i = 0; i < gameingList.length; i ++) {
            if(gameingList[i].p2.id == socket.id) {
                gameingList[i].p2.broadcast.emit('Game-Receive',data);
                break;
            }
            if(gameingList[i].p1.id == socket.id) {
                gameingList[i].p1.broadcast.emit('Game-Receive', data);
                break;
            }
        }
    });
    //监听对局结束
    socket.on('Game-GameOver', function () {
        for(i = 0; i < gameingList.length; i++) {
            if (gameingList[i].p1.id == socket.id) {
                gameingList.splice(i,1);
                console.log('对局结束，解散匹配玩家成功');
                break;
            }
            if (gameingList[i].p2.id == socket.id) {
                gameingList.splice(i, 1);
                console.log('对局结束，解散匹配玩家成功');
                break;
            }
        }
    });
});
//更新在线玩家列表数据
function updatePlayerList(socket, type) {
    for (i = 0; i < playerList.length; i++) {
        if (playerList[i].player.id == socket.id) {
            playerList[i].isGameing = type;
            break;
        }
    }
}
http.listen(8080, function () {
    console.log('listening on *:8080');
});  