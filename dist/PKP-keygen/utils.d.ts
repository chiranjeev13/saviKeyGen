import type { AccessControlType } from './AccessControlType';
export declare function contractCall(account: string, secretKey: string, accessControl: AccessControlType): Promise<boolean>;
export declare function generateStellarKeyPair(SecretKey: string): Promise<{
    publicKey: string;
    secretKey: string;
}>;
export declare function Hash(data: any): Promise<any>;
export declare function signMessage_encrypt(accessControl: AccessControlType, data: any, secretKey: string): Promise<{
    sig: string;
    iD: string;
}>;
export declare function signMessage_decrypt(accessControl: AccessControlType, iD: string, secretKey: string): Promise<{
    sig: string;
    iD: string;
} | undefined>;
