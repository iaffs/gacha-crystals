const {app} = require('./app');

const port = process.env.PORT || 8081;

app.listen(port, () => {
    console.log('Started server on port ' + port);
});

// process error handling
process.on('uncaughtException', (err) => {
    console.error("UNCAUGHT EXCEPTION ERROR: ", err.message);
});


// websocket server (port 8000)
wss.on('connection', function connection(ws) {
    freeGacha(ws);
});

function freeGacha(ws) {
    setTimeout(() => {
        freeGacha(ws);
        ws.send("{freeGacha: 1 }");
    }, 10 * 1000) // every 10 seconds
}