import { decryption_Key_gen_node1 } from "./Nodes/node1";
import { decryption_Key_gen_node2 } from "./Nodes/node2";
import { AccessControlType } from "./PKP-keygen/AccessControlType";

export async function decrypt_Key(ac:AccessControlType,iD:string) {
const e1_data = await decryption_Key_gen_node1(ac,iD);
const e2_data = await decryption_Key_gen_node2(ac,iD);

const mix = e1_data.sig.concat(e2_data.sig)
return mix
}