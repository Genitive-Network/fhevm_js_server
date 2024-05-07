import "express";
import express from "express";
import {getInstance, getSignature, init, provider} from "./instance.js"
import {ethers} from "ethers";

let app = express();

//  主页输出 "Hello World"
app.get('/', function (req, res) {
    console.log("主页 GET 请求");
    res.send('Hello GET');
})


//  POST 请求
app.post('/', function (req, res) {
    console.log("主页 POST 请求");
    res.send('Hello POST');
})

//  /del_user 页面响应
app.get('/del_user', function (req, res) {
    console.log("/del_user 响应 DELETE 请求");
    res.send('删除页面');
})

//  /list_user 页面 GET 请求
app.get('/list_user', function (req, res) {
    console.log("/list_user GET 请求");
    res.send('用户列表页面');
})

// 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求
app.get('/ab*cd', function (req, res) {
    console.log("/ab*cd GET 请求");
    res.send('正则匹配');
})


let server = app.listen(8081, function () {

    let host = "localhost"
    let port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)


})

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
    // let counter = 0
    // while(true) {
    //     console.log(`counter= ${counter++}`);
    //     await sleep(1000);
    // }
    await init()

    let instance = getInstance()

    // console.log("instance:", instance)

    const contractAddress = "0xe2962b0eADb0B2b62Ebf73AFF534Aa76A56f1c6c"

    let privateKey1 = "b009e7bbd3b2103dc8f7f3ba14a6704fa929eaa9a490c005c479bae902c131bb";
    const wallet1 = new ethers.Wallet(privateKey1, provider);
    let userAddress = wallet1.address;
    console.log("userAddress:", userAddress)

    // console.log(encryptedParam64)

    const abi = [
        "function transfer(address to, bytes calldata encryptedAmount) returns (bool)",
        "function balanceOf(address wallet, bytes32 publicKey, bytes calldata signature) view returns (bytes memory)"
    ]

    const EncryptedERC20Contract = new ethers.Contract(contractAddress, abi, wallet1)

    let {publicKey, signature} = await getSignature(contractAddress, privateKey1)

    console.log("publicKey:",publicKey)
    console.log("signature:",signature)

    // 查询余额
    let balanceOf = await EncryptedERC20Contract.balanceOf(wallet1.address, publicKey, signature)

    console.log(`encrypted balance:${balanceOf}`)

    balanceOf = instance.decrypt(contractAddress, balanceOf)
    console.log(`decrypted balance:${balanceOf}`)

    // 转账
    let privateKey2 = "504e87cfd8b223acf62fa4d626462e7a855337b98bec55a709ea9f915b008458";
    const wallet2 = new ethers.Wallet(privateKey2, provider);
    const EncryptedERC20Contract2 = new ethers.Contract(contractAddress, abi, wallet2)
    let encryptedParam64 = instance.encrypt64(5);
    let flag = await EncryptedERC20Contract2.transfer(wallet1.address, encryptedParam64)
    if (flag) {
        console.log(`成功转账 5 xbtc`)
    } else {
        console.log(`转账失败`)
    }

    // 查询余额
    balanceOf = await EncryptedERC20Contract.balanceOf(wallet1.address, publicKey, signature)

    console.log(`encrypted balance:${balanceOf}`)

    balanceOf = instance.decrypt(contractAddress, balanceOf)
    console.log(`decrypted balance:${balanceOf}`)
}

demo()