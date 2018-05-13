class Sockets {
	private socket: any;
	public constructor() {
	}
	/**
	 * 建立连接
	 */
	public getConnect() {
		this.socket = io.connect("http://localhost:8080/",{"reconnection":false}); //跟的参数的意思是不自动重连
	}
	/**
	 * 断开连接
	 */
	public disConnect() {
		this.socket.disconnect();
	}
}