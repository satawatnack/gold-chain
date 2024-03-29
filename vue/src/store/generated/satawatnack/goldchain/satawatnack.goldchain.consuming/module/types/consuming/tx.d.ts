import { Reader, Writer } from "protobufjs/minimal";
import { Coin } from "../cosmos/base/v1beta1/coin";
export declare const protobufPackage = "satawatnack.goldchain.consuming";
/** MsgRequestData defines a SDK message for requesting data from BandChain. */
export interface MsgRequestData {
    oracleScriptId: number;
    sourceChannel: string;
    calldata: Uint8Array;
    askCount: number;
    minCount: number;
    feeLimit: Coin[];
    requestKey: string;
    /** PrepareGas is amount of gas to pay to prepare raw requests */
    prepareGas: number;
    /** ExecuteGas is amount of gas to reserve for executing */
    executeGas: number;
    sender: string;
}
/** MsgRequestDataResponse defines the Msg/RequestData response type. */
export interface MsgRequestDataResponse {
}
export declare const MsgRequestData: {
    encode(message: MsgRequestData, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRequestData;
    fromJSON(object: any): MsgRequestData;
    toJSON(message: MsgRequestData): unknown;
    fromPartial(object: DeepPartial<MsgRequestData>): MsgRequestData;
};
export declare const MsgRequestDataResponse: {
    encode(_: MsgRequestDataResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRequestDataResponse;
    fromJSON(_: any): MsgRequestDataResponse;
    toJSON(_: MsgRequestDataResponse): unknown;
    fromPartial(_: DeepPartial<MsgRequestDataResponse>): MsgRequestDataResponse;
};
/** Msg defines the consuming Msg service. */
export interface Msg {
    /** Request defines a rpc handler method for MsgRequestData. */
    RequestData(request: MsgRequestData): Promise<MsgRequestDataResponse>;
}
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    constructor(rpc: Rpc);
    RequestData(request: MsgRequestData): Promise<MsgRequestDataResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
