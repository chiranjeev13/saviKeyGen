"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryption_Key_gen_node1 = exports.encryption_Key_gen_node1 = void 0;
const utils_1 = require("../PKP-keygen/utils");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const NODE1_PVT_KEY = "SAPBSODEECCXWSNLCG7YDIVI37N4DTUME6MEQUBBL7YMCNYLM3RUELAG";
async function encryption_Key_gen_node1(ac, data) {
    const SecretKey = NODE1_PVT_KEY;
    const keys = await (0, utils_1.generateStellarKeyPair)(SecretKey);
    return await (0, utils_1.signMessage_encrypt)(ac, data, keys.secretKey);
}
exports.encryption_Key_gen_node1 = encryption_Key_gen_node1;
async function decryption_Key_gen_node1(ac, ID_data) {
    const SecretKey = NODE1_PVT_KEY;
    return await (0, utils_1.signMessage_decrypt)(ac, ID_data, SecretKey);
}
exports.decryption_Key_gen_node1 = decryption_Key_gen_node1;
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
