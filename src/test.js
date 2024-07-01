import {init} from "./fhevm_instance.js";
import {ADMINISTRATOR_PRIVATE_KEY} from "./config.js";
import {getInstance} from "./fhevm_instance.js";

// console.log(ADMINISTRATOR_PRIVATE_KEY)
//
//
// console.log(Number.MIN_SAFE_INTEGER)
// console.log(Number.MAX_SAFE_INTEGER)
//
// const myBigInt = BigInt(10);  // `10n` also works
// const myNumber = Number(myBigInt);
//
// console.log(myNumber)

function buf2hex(buffer) { // buffer is an ArrayBuffer
    return [...new Uint8Array(buffer)]
        .map(x => x.toString(16).padStart(2, '0'))
        .join('').replace("\n", "")
        ;
}

await init()

// let encryptedData = getInstance().encrypt64(99);
let encryptedData = getInstance().encryptAddress("0xDf5410EeCeF97093BE7Eb76183b692F155421c66");
console.log(encryptedData)
let x = buf2hex(encryptedData);
console.log(x)
// var string = new TextDecoder().decode(encryptedAmount);
// console.log(string)


