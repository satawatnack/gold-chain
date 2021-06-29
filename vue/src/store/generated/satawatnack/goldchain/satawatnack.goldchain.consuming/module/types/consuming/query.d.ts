import { Reader, Writer } from "protobufjs/minimal";
export declare const protobufPackage = "satawatnack.goldchain.consuming";
/** QueryResultRequest is the request type for the Query/Result RPC method */
export interface QueryResultRequest {
    requestId: number;
}
/** QueryResultResponse is the response type for the Query/Result RPC method */
export interface QueryResultResponse {
    /** pagination defines an optional pagination for the request. */
    result: Uint8Array;
}
/** QueryLatestRequestIDRequest */
export interface QueryLatestRequestIDRequest {
}
/** QueryLatestRequestIDResponse */
export interface QueryLatestRequestIDResponse {
    requestId: number;
}
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
export declare const QueryLatestRequestIDRequest: {
    encode(_: QueryLatestRequestIDRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryLatestRequestIDRequest;
    fromJSON(_: any): QueryLatestRequestIDRequest;
    toJSON(_: QueryLatestRequestIDRequest): unknown;
    fromPartial(_: DeepPartial<QueryLatestRequestIDRequest>): QueryLatestRequestIDRequest;
};
export declare const QueryLatestRequestIDResponse: {
    encode(message: QueryLatestRequestIDResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryLatestRequestIDResponse;
    fromJSON(object: any): QueryLatestRequestIDResponse;
    toJSON(message: QueryLatestRequestIDResponse): unknown;
    fromPartial(object: DeepPartial<QueryLatestRequestIDResponse>): QueryLatestRequestIDResponse;
};
/** Query provides defines the gRPC querier service. */
export interface Query {
    /** Request defines a rpc handler method for MsgRequestData. */
    Result(request: QueryResultRequest): Promise<QueryResultResponse>;
    /** LatestRequestID */
    LatestRequestId(request: QueryLatestRequestIDRequest): Promise<QueryLatestRequestIDResponse>;
}
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    constructor(rpc: Rpc);
    Result(request: QueryResultRequest): Promise<QueryResultResponse>;
    LatestRequestId(request: QueryLatestRequestIDRequest): Promise<QueryLatestRequestIDResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
