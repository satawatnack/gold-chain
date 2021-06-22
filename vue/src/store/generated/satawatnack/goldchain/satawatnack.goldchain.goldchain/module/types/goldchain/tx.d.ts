import { Reader, Writer } from 'protobufjs/minimal';
export declare const protobufPackage = "satawatnack.goldchain.goldchain";
/** this line is used by starport scaffolding # proto/tx/message */
export interface MsgBuyGold {
    n: number;
    buyer: string;
}
export interface MsgBuyGoldResponse {
}
export interface MsgSellGold {
    n: number;
    seller: string;
}
export interface MsgSellGoldResponse {
}
export declare const MsgBuyGold: {
    encode(message: MsgBuyGold, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgBuyGold;
    fromJSON(object: any): MsgBuyGold;
    toJSON(message: MsgBuyGold): unknown;
    fromPartial(object: DeepPartial<MsgBuyGold>): MsgBuyGold;
};
export declare const MsgBuyGoldResponse: {
    encode(_: MsgBuyGoldResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgBuyGoldResponse;
    fromJSON(_: any): MsgBuyGoldResponse;
    toJSON(_: MsgBuyGoldResponse): unknown;
    fromPartial(_: DeepPartial<MsgBuyGoldResponse>): MsgBuyGoldResponse;
};
export declare const MsgSellGold: {
    encode(message: MsgSellGold, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgSellGold;
    fromJSON(object: any): MsgSellGold;
    toJSON(message: MsgSellGold): unknown;
    fromPartial(object: DeepPartial<MsgSellGold>): MsgSellGold;
};
export declare const MsgSellGoldResponse: {
    encode(_: MsgSellGoldResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgSellGoldResponse;
    fromJSON(_: any): MsgSellGoldResponse;
    toJSON(_: MsgSellGoldResponse): unknown;
    fromPartial(_: DeepPartial<MsgSellGoldResponse>): MsgSellGoldResponse;
};
/** Msg defines the Msg service. */
export interface Msg {
    /** this line is used by starport scaffolding # proto/tx/rpc */
    BuyGold(request: MsgBuyGold): Promise<MsgBuyGoldResponse>;
    SellGold(request: MsgSellGold): Promise<MsgSellGoldResponse>;
}
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    constructor(rpc: Rpc);
    BuyGold(request: MsgBuyGold): Promise<MsgBuyGoldResponse>;
    SellGold(request: MsgSellGold): Promise<MsgSellGoldResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
