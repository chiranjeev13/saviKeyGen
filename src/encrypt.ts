import { AES } from "crypto-ts";
import { encryption_Key_gen_node1 } from "./Nodes/node1";
import { encryption_Key_gen_node2 } from "./Nodes/node2";
import { AccessControlType } from "./PKP-keygen/AccessControlType";

export async function encrypt_key(ac: AccessControlType, data: string): Promise<{
    ID: string,
    encrypted_data: string
}> {
    const e1_data = await encryption_Key_gen_node1(ac, data);
    const e2_data = await encryption_Key_gen_node2(ac, data);

    console.log("e1",e1_data)

    const mix = e1_data.sig.concat(e2_data.sig);
    const encrypted_data = AES.encrypt(data, mix);
    console.log(encrypted_data.toString());

    if (e1_data.iD === e2_data.iD) {
        return {
            ID: e1_data.iD,
            encrypted_data: encrypted_data.toString()
        };
    } else {
        throw new Error("ID mismatch between node1 and node2");
    }
}

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