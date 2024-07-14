import { AccessControlType } from "../PKP-keygen/AccessControlType";
export declare function encryption_Key_gen_node2(ac: AccessControlType, data: string): Promise<{
    sig: string;
    iD: string;
}>;
export declare function decryption_Key_gen_node2(ac: AccessControlType, ID_data: string): Promise<{
    sig: string;
    iD: string;
} | undefined>;
