import { encryption_Key_gen_node1 } from "./Nodes/node1";
import { encryption_Key_gen_node2 } from "./Nodes/node2";
import { AccessControlType } from "./PKP-keygen/AccessControlType";

export async function encrypt_key(ac:AccessControlType,data:string,) {
const e1_data = await encryption_Key_gen_node1(ac,data);
const e2_data = await encryption_Key_gen_node2(ac,data);

const mix = e1_data.sig.concat(e2_data.sig)
return mix
}

// async function main() {
//     const ac:AccessControlType = {
//     contractAddress:"CAWHPCYDI6CP6DB2ZGZKYQYUP3BUZPDMBG3HUXREYVVPDRKVZ5ETYAQC",
//     methodName:"is_user_registered",
//     methodParams:[""],
//     result:"true"
// } 
// const data = "URL"
//     await encrypt_key(ac,data);
// }
// main() 