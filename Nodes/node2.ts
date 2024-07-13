import { AccessControlType } from "../PKP-keygen/AccessControlType";
import { generateStellarKeyPair, signMessage_decrypt, signMessage_encrypt } from "../PKP-keygen/utils";
import * as dotenv from "dotenv";
dotenv.config()



export async function encryption_Key_gen_node2(ac:AccessControlType,data:string) {
    const SecretKey = process.env.NODE2_PVT_KEY as string
    const keys = await generateStellarKeyPair(SecretKey);
    return await signMessage_encrypt(ac,data, keys.secretKey);
}

export async function decryption_Key_gen_node2(ac:AccessControlType,ID_data:string) {
    const SecretKey = process.env.NODE2_PVT_KEY as string
    return await signMessage_decrypt(ac,ID_data,SecretKey);
}




