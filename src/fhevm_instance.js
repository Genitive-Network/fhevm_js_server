import {ethers, JsonRpcProvider} from "ethers";
import {initFhevm, createInstance, getPublicKeyCallParams} from "fhevmjs";

let fhevm_instance;


export const provider = new JsonRpcProvider(`https://devnet.zama.ai/`);


export const createFhevmInstance = async () => {
    // 1. Get the chain id
    const network = await provider.getNetwork();
    const chainId = +network.chainId.toString();
    // 2. Fetch the FHE public key from the blockchain
    const ret = await provider.call(getPublicKeyCallParams());
    const decoded = ethers.AbiCoder.defaultAbiCoder().decode(["bytes"], ret);
    const publicKey = decoded[0];

    // 3. Create the fhevm_instance
    fhevm_instance = await createInstance({chainId, publicKey});
};

export const init = async () => {
    await initFhevm(); // Load TFHE
    await createFhevmInstance();
};

export const getInstance = () => {
    return fhevm_instance
}

export const getSignature = async (contractAddress, privateKey) => {
    if (getInstance().hasKeypair(contractAddress)) {
        return getInstance().getPublicKey(contractAddress);
    } else {
        const {publicKey, eip712} = getInstance().generatePublicKey({verifyingContract: contractAddress});
        // const params = [userAddress, JSON.stringify(eip712)];
        const wallet = new ethers.Wallet(privateKey, provider);

        let types = {"Reencrypt": eip712.types.Reencrypt}
        const signature = await wallet.signTypedData(eip712.domain, types, eip712.message)

        getInstance().setSignature(contractAddress, signature);

        return {signature, publicKey}

    }
};