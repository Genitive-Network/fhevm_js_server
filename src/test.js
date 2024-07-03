import {init} from "./fhevm_instance.js";
import {getInstance} from "./fhevm_instance.js";

function buf2hex(buffer) { // buffer is an ArrayBuffer
    return [...new Uint8Array(buffer)]
        .map(x => x.toString(16).padStart(2, '0'))
        .join('').replace("\n", "")
        ;
}

await init()

// let encryptedData = getInstance().encrypt64(99);
let encryptedData = getInstance().encryptAddress("0xDbb6F44FA2bDb55c45A4B4119C163f9c42Ac5630");
console.log(encryptedData)
let x = buf2hex(encryptedData);
console.log(x)
// var string = new TextDecoder().decode(encryptedAmount);
// console.log(string)


