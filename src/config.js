

export const ADMINISTRATOR_PRIVATE_KEY = process.env.ADMINISTRATOR_PRIVATE_KEY? process.env.ADMINISTRATOR_PRIVATE_KEY:"b009e7bbd3b2103dc8f7f3ba14a6704fa929eaa9a490c005c479bae902c131bb";
export const ABI = [
    "function transfer(address to, bytes calldata encryptedAmount) returns (bool)",
    "function balanceOf(address wallet, bytes32 publicKey, bytes calldata signature) view returns (bytes memory)",
    "function mint(uint64 amount, address to)"
]

export const CONTRACT_ADDRESS = "0xe2962b0eADb0B2b62Ebf73AFF534Aa76A56f1c6c"

export const SERVER_PORT = process.env.SERVER_PORT? process.env.SERVER_PORT:8081


console.log(SERVER_PORT)