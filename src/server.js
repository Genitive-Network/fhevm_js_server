import express from "express";
import {balanceGetHandler, mintPostHandler, transferPostHandler} from "./handler.js";
import {SERVER_PORT} from "./config.js";

import morgan from "morgan"


let app = express();

app.use(express.json())
// 使用morgan中间件,默认格式直接打印日志
app.use(morgan('short'));
// 自定义格式打印日志 具体格式类型可以去查看文档
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer"'));
app.get('/', function (req, res) {
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

