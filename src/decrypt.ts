import { AES } from "crypto-ts";
var CryptoTS = require("crypto-ts");
import { decryption_Key_gen_node1 } from "./Nodes/node1";
import { decryption_Key_gen_node2 } from "./Nodes/node2";
import { AccessControlType } from "./PKP-keygen/AccessControlType";

export async function decrypt_Key(ac:AccessControlType,iD:string,encrypted_data:string):Promise<string> {

const e1_data = await decryption_Key_gen_node1(ac,iD) as { sig: string, iD: string };
const e2_data = await decryption_Key_gen_node2(ac,iD) as { sig: string, iD: string };

if(e1_data && e2_data !== undefined)
{
const mix = e1_data.sig.concat(e2_data.sig)
const decrypted_data =  AES.decrypt(encrypted_data,mix)
var plaintext = decrypted_data.toString(CryptoTS.enc.Utf8);
return plaintext;
}
return "Failed";
}

// async function main() {
//     const ac:AccessControlType = {
//     contractAddress:"CDG6OKHVGF5ICLPGRPRHHN5F4JKEZCMMOHG3PFY6CRFN25JI7HB6I7Y7",
//     methodName:"is_user_registered",
//     methodParams:["GCJLZ3O5ZDWAJUKG52VS42OXX324DLARMHQFV7YO7NAFIQL3KS2ONHRS"],
//     result:"true"
// } 
// const data = "0ebe2eca800cf7bd9d9d9f9f4aafbc0c77ae155f43bbbeca69cb256a24c7f9bb"
//     console.log(await decrypt_Key(ac,data,"U2FsdGVkX19IB8vKOScOEboQ9ndmdE2h/Nncx6O26t4="))
// }
// main() 