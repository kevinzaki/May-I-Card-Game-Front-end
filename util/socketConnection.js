import io from "socket.io-client";
const ENDPOINT = "http://192.168.1.5:3000";
const socket = io(ENDPOINT);

export default socket;
