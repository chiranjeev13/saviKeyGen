import {
    Keypair,
    Contract,
    SorobanRpc,
    TransactionBuilder,
    Networks,
    BASE_FEE,
    xdr,
} from "@stellar/stellar-sdk";
import type { AccessControlType } from './AccessControlType';
import { hash } from "crypto";
import CryptoJS from "crypto-js";

export async function contractCall(account: string, secretKey: string, accessControl:AccessControlType) : Promise<boolean> {
        const server = new SorobanRpc.Server("https://soroban-testnet.stellar.org:443");
        const contract = new Contract(accessControl.contractAddress);
        
        const sourceAccount = await server.getAccount(account)

        const scValParams = accessControl.methodParams.map(param => {
            if (typeof param === 'string') {
                return xdr.ScVal.scvString(param);
            } else if (typeof param === 'number') {
                return xdr.ScVal.scvU32(param);
            } else {
                throw new Error(`Unsupported parameter type: ${typeof param}`);
            }
        });
        //console.log(scValParams)
        const transaction = new TransactionBuilder(sourceAccount, {
            fee: BASE_FEE,
            networkPassphrase: Networks.TESTNET
        })
        .addOperation(
            contract.call(accessControl.methodName,...scValParams)
        )
        .setTimeout(30)
        .build();

        let preparedTransaction = await server.prepareTransaction(transaction);
        preparedTransaction.sign(Keypair.fromSecret(secretKey));

        const transactionResult = await server.sendTransaction(preparedTransaction);
        let res:string = "";
        while(true)
        {
            res = (await server.getTransaction(transactionResult.hash)).status;
            if(res == "SUCCESS")
            {
                break;
            }
            if(res == "ERROR")
            {
                return false;
            }
        }
        console.log('Transaction hash:',JSON.parse(JSON.stringify(await server.getTransaction(transactionResult.hash))).returnValue._value);
        const val = JSON.parse(JSON.stringify(await server.getTransaction(transactionResult.hash))).returnValue._value
        if(val.toString() !== accessControl.result)
        {
            return false;
        }
        return true;
}

export async function generateStellarKeyPair(SecretKey:string): Promise<{ publicKey: string, secretKey: string }> {
    const pair = Keypair.fromSecret(SecretKey)
    const publicKey = pair.publicKey();
    const secretKey = pair.secret();
    return {
        publicKey,
        secretKey,
    };
}

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

export async function Hash(data:any): Promise<any>
{
    const hash_data = CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex)
    return hash_data
}

export async function signMessage_encrypt(accessControl:AccessControlType,data:any,secretKey:string):Promise<{ sig: string, iD: string }> {
    const mod_accessControl = {
    contractAddress: accessControl.contractAddress,
    methodName: accessControl.methodName,
    result: accessControl.result
    }
    const iD = (await Hash(data)).toString();
    const h_A = (await Hash(JSON.stringify(mod_accessControl))).toString();

    const D = iD.concat(h_A);
    const F = Keypair.fromSecret(secretKey)
    const bufferD = Buffer.from(D);
    const r = F.sign(bufferD);
    return { sig: r.toString("hex"), iD: iD };

}
export async function signMessage_decrypt(accessControl:AccessControlType,iD:string,secretKey:string):Promise<{ sig: string, iD: string } | undefined> {
    const res = await contractCall((await generateStellarKeyPair(secretKey)).publicKey,secretKey,accessControl);
    if(res === true){
    const mod_accessControl = {
        contractAddress: accessControl.contractAddress,
        methodName: accessControl.methodName,
        result: accessControl.result
        }
        const h_A = (await Hash(JSON.stringify(mod_accessControl))).toString();

    const D = iD.concat(h_A);
    const F =  Keypair.fromSecret(secretKey)
    const bufferD = Buffer.from(D);
    const r = F.sign(bufferD);
    return { sig: r.toString("hex"), iD: iD };
    }
    else {
        return undefined
    }
}
// main("CAWHPCYDI6CP6DB2ZGZKYQYUP3BUZPDMBG3HUXREYVVPDRKVZ5ETYAQC","is_user_registered",["GCJTZ3O5ZDWAJUKG52VS42OXX324DLARMHQFV7YO7NAFIQL3KS2ONHRS"])
// .catch(error => console.error('Unhandled error:', error));

// const ac:AccessControlType = {
//     contractAddress:"CAWHPCYDI6CP6DB2ZGZKYQYUP3BUZPDMBG3HUXREYVVPDRKVZ5ETYAQC",
//     methodName:"is_user_registered",
//     methodParams:["GCJTZ3O5ZDWAJUKG52VS42OXX324DLARMHQFV7YO7NAFIQL3KS2ONHRS"],
//     result:"true"
// } 

