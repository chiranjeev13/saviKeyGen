import { AccessControlType } from "../PKP-keygen/AccessControlType";
import { generateStellarKeyPair, signMessage } from "../PKP-keygen/utils";
import * as dotenv from "dotenv";
dotenv.config()
export async function signature1(ac:AccessControlType,data:string,SecretKey:string) {
    const keys = generateStellarKeyPair(SecretKey);
    return await signMessage(ac,data,(await keys).secretKey);
}

async function main() {
    
const ac:AccessControlType = {
    contractAddress:"CAWHPCYDI6CP6DB2ZGZKYQYUP3BUZPDMBG3HUXREYVVPDRKVZ5ETYAQC",
    methodName:"is_user_registered",
    methodParams:["GCJTZ3O5ZDWAJUKG52VS42OXX324DLARMHQFV7YO7NAFIQL3KS2ONHRS"],
    result:"true"
} 
const data = "URL"
console.log(await signature1(ac,data,process.env.NODE1_PVT_KEY as string));
}
main()