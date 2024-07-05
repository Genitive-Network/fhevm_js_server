import {getSignature, init, provider} from "./fhevm_instance.js";
import {getInstance} from "./fhevm_instance.js";
import {ethers} from "ethers";

export const ABI = [
    "function getDecryptedBalanceOf(address tokenAddr, address addr,bytes32 publicKey, bytes calldata signature) public view returns (bytes memory)"
]

function buf2hex(buffer) { // buffer is an ArrayBuffer
    return [...new Uint8Array(buffer)]
        .map(x => x.toString(16).padStart(2, '0'))
        .join('').replace("\n", "")
        ;
}

await init()

const instance = getInstance();
const CONTRACT_ADDRESS = '0x7AEDFB1c4F1aAA9EFe53204da494deeb7e898E2d';
const USER_ADDRESS = '0xa729df77A3250C44647cCE2326db74Ca89e0905a';
const TOKEN_ADDRESS = '0x82a1D39277B179C5C5120E70b77b886e29345b8C';
const PRIVATE_KEY = 'fd1405cbb040f7ab2f14ba17f31e2abdbbfab3a5932d576f70309761c9def148'

export async function getDecryptedBalanceOf(private_key, token_addr) {
    const wallet = new ethers.Wallet(private_key, provider);

    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet)

    let {signature, publicKey} = await getSignature(CONTRACT_ADDRESS, private_key)

    // console.log("publicKey:",publicKey)
    console.log("publicKey:",buf2hex(publicKey))
    console.log("signature:",signature)

    // reencrypt结果
    let reencrypt_result = await contract.getDecryptedBalanceOf(token_addr, wallet.address, publicKey, signature)
    console.log("reencrypt_result: ", reencrypt_result)
    // decrypt结果
    let decrypt_result = getInstance().decrypt(CONTRACT_ADDRESS, reencrypt_result)
    console.log("decrypt_result: ", decrypt_result)
}

// await getDecryptedBalanceOf(PRIVATE_KEY, TOKEN_ADDRESS)
let private_key = PRIVATE_KEY;
let token_addr = TOKEN_ADDRESS;
const wallet = new ethers.Wallet(private_key, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet)
let {signature, publicKey} = await getSignature(CONTRACT_ADDRESS, private_key)

console.log("publicKey:",buf2hex(publicKey))
console.log("signature:",signature)


console.log("publicKey:",buf2hex(publicKey))
console.log("signature:",signature)