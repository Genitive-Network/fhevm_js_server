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
let encryptedData = getInstance().encryptAddress("0x5E4ac25605b79C9cfE3F7cECBA0c78Ff7455DF84");
console.log(encryptedData)
let x = buf2hex(encryptedData);
console.log(x)
// var string = new TextDecoder().decode(encryptedAmount);
// console.log(string)


