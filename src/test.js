import {ADMINISTRATOR_PRIVATE_KEY} from "./config.js";

console.log(ADMINISTRATOR_PRIVATE_KEY)


console.log(Number.MIN_SAFE_INTEGER)
console.log(Number.MAX_SAFE_INTEGER)

const myBigInt = BigInt(10);  // `10n` also works
const myNumber = Number(myBigInt);

console.log(myNumber)