"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt_Key = void 0;
const crypto_ts_1 = require("crypto-ts");
var CryptoTS = require("crypto-ts");
const node1_1 = require("./Nodes/node1");
const node2_1 = require("./Nodes/node2");
async function decrypt_Key(ac, iD, encrypted_data) {
    const e1_data = await (0, node1_1.decryption_Key_gen_node1)(ac, iD);
    const e2_data = await (0, node2_1.decryption_Key_gen_node2)(ac, iD);
    if (e1_data && e2_data !== undefined) {
        const mix = e1_data.sig.concat(e2_data.sig);
        const decrypted_data = crypto_ts_1.AES.decrypt(encrypted_data, mix);
        var plaintext = decrypted_data.toString(CryptoTS.enc.Utf8);
        return plaintext;
    }
    return "Failed";
}
exports.decrypt_Key = decrypt_Key;
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
