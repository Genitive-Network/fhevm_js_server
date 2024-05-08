import express from "express";
import {balanceGetHandler, mintPostHandler, transferPostHandler} from "./handler.js";
import {SERVER_PORT} from "./config.js";

let app = express();

app.use(express.json())

app.get('/', function (req, res) {
    console.log("主页 GET 请求");
    res.send('Hello xBTC');
})

app.get('/api/balance', balanceGetHandler)
app.post('/api/mint', mintPostHandler)
app.post('/api/transfer', transferPostHandler)

export let server = app.listen(SERVER_PORT, function () {

    let host = server.address().address
    let port = server.address().port

    console.log("Server Up At http://%s:%s", host, port)
})

