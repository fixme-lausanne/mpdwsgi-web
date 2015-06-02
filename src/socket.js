/*jshint esnext: true*/
import {websocket} from '../config';

var socket = new WebSocket(websocket.events);

socket.onopen = (e) => {
    console.log('onOpen');
    console.log(e);
};

socket.onclose = (e) => {
    console.log('onClose');
    console.log(e);
};

socket.onerror = (e) => {
    console.log('onError');
    console.log(e);
};

socket.onmessage = (e) => {
    console.log('onMessage');
    console.log(e);
};

export {socket as default};
