import {administratorTransfer, balanceOf, mint} from "./contract_call.js";
import {ADMINISTRATOR_PRIVATE_KEY} from "./config.js";


export async function balanceGetHandler(req, res) {
    console.log("/balance GET 请求")
    const data = {
        balance : Number(await balanceOf(ADMINISTRATOR_PRIVATE_KEY))
    }
    res.json(data)
}

export async function mintPostHandler(req, res) {
    console.log("/mint POST 请求");

    try {
        let address = req.body.address
        let amount = req.body.amount
        await mint(address, amount)
        res.json({status:true});
    } catch (e) {
        console.error(e)
        res.json({status:false});
    }
}

export async function transferPostHandler(req, res) {
    console.log("/transfer POST 请求");

    try {
        let address = req.body.address
        let amount = req.body.amount
        await administratorTransfer(address, amount)
        res.json({status:true});
    } catch (e) {
        console.error(e)
        res.json({status:false});
    }
}
