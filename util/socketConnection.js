import io from "socket.io-client";
const ENDPOINT = "http://192.168.1.7:3002";
const socket = io(ENDPOINT);

export default socket;
