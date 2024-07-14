"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encrypt_key = void 0;
const crypto_ts_1 = require("crypto-ts");
const node1_1 = require("./Nodes/node1");
const node2_1 = require("./Nodes/node2");
async function encrypt_key(ac, data) {
    const e1_data = await (0, node1_1.encryption_Key_gen_node1)(ac, data);
    const e2_data = await (0, node2_1.encryption_Key_gen_node2)(ac, data);
    console.log("e1", e1_data);
    const mix = e1_data.sig.concat(e2_data.sig);
    const encrypted_data = crypto_ts_1.AES.encrypt(data, mix);
    console.log(encrypted_data.toString());
    if (e1_data.iD === e2_data.iD) {
        return {
            ID: e1_data.iD,
            encrypted_data: encrypted_data.toString()
        };
    }
    else {
        throw new Error("ID mismatch between node1 and node2");
    }
}
exports.encrypt_key = encrypt_key;
// async function main() {
//     const ac:AccessControlType = {
//     contractAddress:"CDG6OKHVGF5ICLPGRPRHHN5F4JKEZCMMOHG3PFY6CRFN25JI7HB6I7Y7",
//     methodName:"is_user_registered",
//     methodParams:["GCJTZ3O5ZDWAJUKG52VS42OXX324DLARMHQFV7YO7NAFIQL3KS2ONHRS"],
//     result:"true"
// } 
// const data = "hehe"
//     await encrypt_key(ac,data)
// }
// main() 
