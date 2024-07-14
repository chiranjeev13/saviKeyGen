"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signMessage_decrypt = exports.signMessage_encrypt = exports.Hash = exports.generateStellarKeyPair = exports.contractCall = void 0;
const stellar_sdk_1 = require("@stellar/stellar-sdk");
const crypto_js_1 = __importDefault(require("crypto-js"));
async function contractCall(account, secretKey, accessControl) {
    const server = new stellar_sdk_1.SorobanRpc.Server("https://soroban-testnet.stellar.org:443");
    const contract = new stellar_sdk_1.Contract(accessControl.contractAddress);
    const sourceAccount = await server.getAccount(account);
    const scValParams = accessControl.methodParams.map(param => {
        if (typeof param === 'string') {
            return stellar_sdk_1.xdr.ScVal.scvString(param);
        }
        else if (typeof param === 'number') {
            return stellar_sdk_1.xdr.ScVal.scvU32(param);
        }
        else {
            throw new Error(`Unsupported parameter type: ${typeof param}`);
        }
    });
    //console.log(scValParams)
    const transaction = new stellar_sdk_1.TransactionBuilder(sourceAccount, {
        fee: stellar_sdk_1.BASE_FEE,
        networkPassphrase: stellar_sdk_1.Networks.TESTNET
    })
        .addOperation(contract.call(accessControl.methodName, ...scValParams))
        .setTimeout(30)
        .build();
    let preparedTransaction = await server.prepareTransaction(transaction);
    preparedTransaction.sign(stellar_sdk_1.Keypair.fromSecret(secretKey));
    const transactionResult = await server.sendTransaction(preparedTransaction);
    let res = "";
    while (true) {
        res = (await server.getTransaction(transactionResult.hash)).status;
        if (res == "SUCCESS") {
            break;
        }
        if (res == "ERROR") {
            return false;
        }
    }
    console.log('Transaction hash:', JSON.parse(JSON.stringify(await server.getTransaction(transactionResult.hash))).returnValue._value);
    const val = JSON.parse(JSON.stringify(await server.getTransaction(transactionResult.hash))).returnValue._value;
    if (val.toString() !== accessControl.result) {
        return false;
    }
    return true;
}
exports.contractCall = contractCall;
async function generateStellarKeyPair(SecretKey) {
    const pair = stellar_sdk_1.Keypair.fromSecret(SecretKey);
    const publicKey = pair.publicKey();
    const secretKey = pair.secret();
    return {
        publicKey,
        secretKey,
    };
}
exports.generateStellarKeyPair = generateStellarKeyPair;
// async function main(contractAddress:string,functionName:string,functionParams:any,accessControl:AccessControlType) {
//     console.log("Generating Stellar wallet key pair...");
//     try {
//         const keys = await generateStellarKeyPair();
//         console.log('Public Key (Base32):', keys.publicKey);
//         console.log('Secret Key (Base32):', keys.secretKey);
//         await contractCall("GCJTZ3O5ZDWAJUKG52VS42OXX324DLARMHQFV7YO7NAFIQL3KS2ONHRS", contractAddress, keys.secretKey, functionName, functionParams);
//     } catch (error) {
//         console.error('Error in main function:', error);
//     }
// }
async function Hash(data) {
    const hash_data = crypto_js_1.default.SHA256(data).toString(crypto_js_1.default.enc.Hex);
    return hash_data;
}
exports.Hash = Hash;
async function signMessage_encrypt(accessControl, data, secretKey) {
    const mod_accessControl = {
        contractAddress: accessControl.contractAddress,
        methodName: accessControl.methodName,
        result: accessControl.result
    };
    const iD = (await Hash(data)).toString();
    const h_A = (await Hash(JSON.stringify(mod_accessControl))).toString();
    const D = iD.concat(h_A);
    const F = stellar_sdk_1.Keypair.fromSecret(secretKey);
    const bufferD = Buffer.from(D);
    const r = F.sign(bufferD);
    return { sig: r.toString("hex"), iD: iD };
}
exports.signMessage_encrypt = signMessage_encrypt;
async function signMessage_decrypt(accessControl, iD, secretKey) {
    const res = await contractCall((await generateStellarKeyPair(secretKey)).publicKey, secretKey, accessControl);
    if (res === true) {
        const mod_accessControl = {
            contractAddress: accessControl.contractAddress,
            methodName: accessControl.methodName,
            result: accessControl.result
        };
        const h_A = (await Hash(JSON.stringify(mod_accessControl))).toString();
        const D = iD.concat(h_A);
        const F = stellar_sdk_1.Keypair.fromSecret(secretKey);
        const bufferD = Buffer.from(D);
        const r = F.sign(bufferD);
        return { sig: r.toString("hex"), iD: iD };
    }
    else {
        return undefined;
    }
}
exports.signMessage_decrypt = signMessage_decrypt;
// main("CAWHPCYDI6CP6DB2ZGZKYQYUP3BUZPDMBG3HUXREYVVPDRKVZ5ETYAQC","is_user_registered",["GCJTZ3O5ZDWAJUKG52VS42OXX324DLARMHQFV7YO7NAFIQL3KS2ONHRS"])
// .catch(error => console.error('Unhandled error:', error));
// const ac:AccessControlType = {
//     contractAddress:"CAWHPCYDI6CP6DB2ZGZKYQYUP3BUZPDMBG3HUXREYVVPDRKVZ5ETYAQC",
//     methodName:"is_user_registered",
//     methodParams:["GCJTZ3O5ZDWAJUKG52VS42OXX324DLARMHQFV7YO7NAFIQL3KS2ONHRS"],
//     result:"true"
// } 
