import {getInstance, getSignature, init, provider} from "./fhevm_instance.js";
import {ethers} from "ethers";
import {ABI, ADMINISTRATOR_PRIVATE_KEY, CONTRACT_ADDRESS} from "./config.js";

/**
 * 返回目标账户的xbtc余额
 * @param {string} private_key 账户私钥
 */
export async function balanceOf(private_key) {
    const wallet = new ethers.Wallet(private_key, provider);

    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet)

    let {publicKey, signature} = await getSignature(CONTRACT_ADDRESS, private_key)

    // console.log("publicKey:",publicKey)
    // console.log("signature:",signature)

    // 查询余额
    return getInstance().decrypt(CONTRACT_ADDRESS, await contract.balanceOf(wallet.address, publicKey, signature))
}

/**
 * 向目标地址转账xbtc
 * @param {string} private_key 账户私钥
 * @param {string} to
 * @param {int} amount
 */
export async function transfer(private_key, to, amount) {
    const wallet = new ethers.Wallet(private_key, provider);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet)
    let encryptedAmount = getInstance().encrypt64(amount);
    let flag = false
    try {
        flag = await contract.transfer(to, encryptedAmount)
    } catch (e) {
        console.error(e)
    }
    if (flag) {
        let transferXbtcAmount = amount / 100000000
        console.log(`成功转账 ${transferXbtcAmount} xbtc`)
    } else {
        console.log(`转账失败`)
    }
    return flag
}

/**
 * 向目标地址转账xbtc
 * @param {string} address
 * @param {int} amount
 */
export async function administratorTransfer(address, amount) {
    return transfer(ADMINISTRATOR_PRIVATE_KEY, address, amount)
}

/**
 * 返回目标账户的xbtc余额
 * @param {string} address
 * @param {int} amount
 */
export async function mint(address, amount) {
    const wallet = new ethers.Wallet(ADMINISTRATOR_PRIVATE_KEY, provider);

    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet)

    try {
        let response = await contract.mint(amount, address)
        console.log("mint成功:" + response.hash)
        return true
    } catch (e) {
        console.log("mint失败")
        console.error(e)
    }
    return false

}


async function test() {
    await init()
    let testBalnace = async () => {
        let balance = await balanceOf(ADMINISTRATOR_PRIVATE_KEY)
        console.log(balance)
    }

    let testTransfer = async () => {
        await transfer(ADMINISTRATOR_PRIVATE_KEY, "0x6D8a1b1Ba7ce3844704c67b45f6B05E0bB4e536e", 5)
    }

    let testMint = async () => {
        await mint("0x6D8a1b1Ba7ce3844704c67b45f6B05E0bB4e536e", 5)
    }

    testBalnace()
    testMint()
    testTransfer()
}