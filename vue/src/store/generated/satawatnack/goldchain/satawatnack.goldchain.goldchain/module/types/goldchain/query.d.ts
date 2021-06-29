import { Reader, Writer } from "protobufjs/minimal";
export declare const protobufPackage = "satawatnack.goldchain.goldchain";
export interface QueryBalancesRequest {
    sender: string;
}
export interface QueryBalancesResponse {
    balance: string;
}
export interface QueryResultRequest {
    requestId: number;
}
export interface QueryResultResponse {
    result: Uint8Array;
}
export declare const QueryBalancesRequest: {
    encode(message: QueryBalancesRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryBalancesRequest;
    fromJSON(object: any): QueryBalancesRequest;
    toJSON(message: QueryBalancesRequest): unknown;
    fromPartial(object: DeepPartial<QueryBalancesRequest>): QueryBalancesRequest;
};
export declare const QueryBalancesResponse: {
    encode(message: QueryBalancesResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryBalancesResponse;
    fromJSON(object: any): QueryBalancesResponse;
    toJSON(message: QueryBalancesResponse): unknown;
    fromPartial(object: DeepPartial<QueryBalancesResponse>): QueryBalancesResponse;
};
export declare const QueryResultRequest: {
    encode(message: QueryResultRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryResultRequest;
    fromJSON(object: any): QueryResultRequest;
    toJSON(message: QueryResultRequest): unknown;
    fromPartial(object: DeepPartial<QueryResultRequest>): QueryResultRequest;
};
export declare const QueryResultResponse: {
    encode(message: QueryResultResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryResultResponse;
    fromJSON(object: any): QueryResultResponse;
    toJSON(message: QueryResultResponse): unknown;
    fromPartial(object: DeepPartial<QueryResultResponse>): QueryResultResponse;
};
/** Query defines the gRPC querier service. */
export interface Query {
    balances(request: QueryBalancesRequest): Promise<QueryBalancesResponse>;
    Result(request: QueryResultRequest): Promise<QueryResultResponse>;
}
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    constructor(rpc: Rpc);
    balances(request: QueryBalancesRequest): Promise<QueryBalancesResponse>;
    Result(request: QueryResultRequest): Promise<QueryResultResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
