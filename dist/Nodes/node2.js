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
exports.decryption_Key_gen_node2 = exports.encryption_Key_gen_node2 = void 0;
const utils_1 = require("../PKP-keygen/utils");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const NODE2_PVT_KEY = "SB7SSQXIUPFX34COCBXUBHOUGG7VIMWETYIAKTA5JXHKVM6N5A4F3UV2";
async function encryption_Key_gen_node2(ac, data) {
    const SecretKey = NODE2_PVT_KEY;
    const keys = await (0, utils_1.generateStellarKeyPair)(SecretKey);
    return await (0, utils_1.signMessage_encrypt)(ac, data, keys.secretKey);
}
exports.encryption_Key_gen_node2 = encryption_Key_gen_node2;
async function decryption_Key_gen_node2(ac, ID_data) {
    const SecretKey = NODE2_PVT_KEY;
    return await (0, utils_1.signMessage_decrypt)(ac, ID_data, SecretKey);
}
exports.decryption_Key_gen_node2 = decryption_Key_gen_node2;
