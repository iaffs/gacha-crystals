const express_ws = require('express-ws');


let ews;

function init(app) {

    ews = express_ws(app);

    app.ws('/', function (socket, req) {
        console.log('Established a new WS connection');


        socket.on('message', (data) => {
            processWebsocketMessage(data);
         });

        //close is treated specially
        socket.on('close', () => {
           console.log('connected closed');
        });
    });
}

function processWebsocketMessage() {
   // process free gift here
}


module.exports = {init};