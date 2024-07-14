import { AccessControlType } from "../PKP-keygen/AccessControlType";
import { generateStellarKeyPair, signMessage_decrypt, signMessage_encrypt } from "../PKP-keygen/utils";
import * as dotenv from "dotenv";
dotenv.config()


const NODE1_PVT_KEY = "SAPBSODEECCXWSNLCG7YDIVI37N4DTUME6MEQUBBL7YMCNYLM3RUELAG"

export async function encryption_Key_gen_node1(ac:AccessControlType,data:string) {
    const SecretKey = NODE1_PVT_KEY as string
    const keys = await generateStellarKeyPair(SecretKey);
    return await signMessage_encrypt(ac,data, keys.secretKey);
}

export async function decryption_Key_gen_node1(ac:AccessControlType,ID_data:string) {
    const SecretKey = NODE1_PVT_KEY as string
    return await signMessage_decrypt(ac,ID_data,SecretKey);
}


// async function main() {
// const ac:AccessControlType = {
//     contractAddress:"CAWHPCYDI6CP6DB2ZGZKYQYUP3BUZPDMBG3HUXREYVVPDRKVZ5ETYAQC",
//     methodName:"is_user_registered",
//     methodParams:[""],
//     result:"true"
// } 
// const data = "URL"
// const e_data = await encryption_Key_gen_node1(ac,data,process.env.NODE1_PVT_KEY as string);
// console.log(e_data)
// const acc:AccessControlType = {
//     contractAddress:"CAWHPCYDI6CP6DB2ZGZKYQYUP3BUZPDMBG3HUXREYVVPDRKVZ5ETYAQC",
//     methodName:"is_user_registered",
//     methodParams:["GCJTZ3O5ZDWAJUKG52VS42OXX324DLARMHQFV7YO7NAFIQL3KS2ONHRS"],
//     result:"true"
// } 
// console.log(await decryption_Key_gen_node1(acc,e_data.iD,process.env.NODE1_PVT_KEY as string));

// }
// main()

