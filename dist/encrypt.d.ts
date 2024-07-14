import { AccessControlType } from "./PKP-keygen/AccessControlType";
export declare function encrypt_key(ac: AccessControlType, data: string): Promise<{
    ID: string;
    encrypted_data: string;
}>;
