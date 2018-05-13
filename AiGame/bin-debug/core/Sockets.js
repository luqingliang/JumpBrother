var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Sockets = (function () {
    function Sockets() {
    }
    /**
     * 建立连接
     */
    Sockets.prototype.getConnect = function () {
        this.socket = io.connect("http://localhost:8080/", { "reconnection": false }); //跟的参数的意思是不自动重连
    };
    /**
     * 断开连接
     */
    Sockets.prototype.disConnect = function () {
        this.socket.disconnect();
    };
    return Sockets;
}());
__reflect(Sockets.prototype, "Sockets");
