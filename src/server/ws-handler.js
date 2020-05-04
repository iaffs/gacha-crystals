// copied from https://github.com/arcuri82/web_development_and_api_design/blob/master/exercise-solutions/quiz-game/part-09/src/server/ws-handler.js

const express_ws = require("express-ws");

let ews;

function init(app) {
  ews = express_ws(app);

  app.ws("/", function (socket, req) {
    console.log("Established a new WS connection");

    socket.on("message", (data) => {
      processWebsocketMessage(data);
    });

    socket.on("close", () => {
      console.log("connected closed");
    });
  });
}

/*
function processWebsocketMessage() {
  // process free gift here
}
*/

module.exports = { init };
