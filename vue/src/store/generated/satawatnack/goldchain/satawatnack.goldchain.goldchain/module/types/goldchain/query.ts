/* eslint-disable */
import { Reader, util, configure, Writer } from "protobufjs/minimal";
import * as Long from "long";

export const protobufPackage = "satawatnack.goldchain.goldchain";

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

const baseQueryBalancesRequest: object = { sender: "" };

export const QueryBalancesRequest = {
  encode(
    message: QueryBalancesRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryBalancesRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryBalancesRequest } as QueryBalancesRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryBalancesRequest {
    const message = { ...baseQueryBalancesRequest } as QueryBalancesRequest;
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = String(object.sender);
    } else {
      message.sender = "";
    }
    return message;
  },

  toJSON(message: QueryBalancesRequest): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryBalancesRequest>): QueryBalancesRequest {
    const message = { ...baseQueryBalancesRequest } as QueryBalancesRequest;
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    } else {
      message.sender = "";
    }
    return message;
  },
};

const baseQueryBalancesResponse: object = { balance: "" };

export const QueryBalancesResponse = {
  encode(
    message: QueryBalancesResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.balance !== "") {
      writer.uint32(10).string(message.balance);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryBalancesResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryBalancesResponse } as QueryBalancesResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.balance = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryBalancesResponse {
    const message = { ...baseQueryBalancesResponse } as QueryBalancesResponse;
    if (object.balance !== undefined && object.balance !== null) {
      message.balance = String(object.balance);
    } else {
      message.balance = "";
    }
    return message;
  },

  toJSON(message: QueryBalancesResponse): unknown {
    const obj: any = {};
    message.balance !== undefined && (obj.balance = message.balance);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryBalancesResponse>
  ): QueryBalancesResponse {
    const message = { ...baseQueryBalancesResponse } as QueryBalancesResponse;
    if (object.balance !== undefined && object.balance !== null) {
      message.balance = object.balance;
    } else {
      message.balance = "";
    }
    return message;
  },
};

const baseQueryResultRequest: object = { requestId: 0 };

export const QueryResultRequest = {
  encode(
    message: QueryResultRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.requestId !== 0) {
      writer.uint32(8).int64(message.requestId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryResultRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryResultRequest } as QueryResultRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.requestId = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryResultRequest {
    const message = { ...baseQueryResultRequest } as QueryResultRequest;
    if (object.requestId !== undefined && object.requestId !== null) {
      message.requestId = Number(object.requestId);
    } else {
      message.requestId = 0;
    }
    return message;
  },

  toJSON(message: QueryResultRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryResultRequest>): QueryResultRequest {
    const message = { ...baseQueryResultRequest } as QueryResultRequest;
    if (object.requestId !== undefined && object.requestId !== null) {
      message.requestId = object.requestId;
    } else {
      message.requestId = 0;
    }
    return message;
  },
};

const baseQueryResultResponse: object = {};

export const QueryResultResponse = {
  encode(
    message: QueryResultResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.result.length !== 0) {
      writer.uint32(10).bytes(message.result);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryResultResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryResultResponse } as QueryResultResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.result = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryResultResponse {
    const message = { ...baseQueryResultResponse } as QueryResultResponse;
    if (object.result !== undefined && object.result !== null) {
      message.result = bytesFromBase64(object.result);
    }
    return message;
  },

  toJSON(message: QueryResultResponse): unknown {
    const obj: any = {};
    message.result !== undefined &&
      (obj.result = base64FromBytes(
        message.result !== undefined ? message.result : new Uint8Array()
      ));
    return obj;
  },

  fromPartial(object: DeepPartial<QueryResultResponse>): QueryResultResponse {
    const message = { ...baseQueryResultResponse } as QueryResultResponse;
    if (object.result !== undefined && object.result !== null) {
      message.result = object.result;
    } else {
      message.result = new Uint8Array();
    }
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  balances(request: QueryBalancesRequest): Promise<QueryBalancesResponse>;
  Result(request: QueryResultRequest): Promise<QueryResultResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  balances(request: QueryBalancesRequest): Promise<QueryBalancesResponse> {
    const data = QueryBalancesRequest.encode(request).finish();
    const promise = this.rpc.request(
      "satawatnack.goldchain.goldchain.Query",
      "balances",
      data
    );
    return promise.then((data) =>
      QueryBalancesResponse.decode(new Reader(data))
    );
  }

  Result(request: QueryResultRequest): Promise<QueryResultResponse> {
    const data = QueryResultRequest.encode(request).finish();
    const promise = this.rpc.request(
      "satawatnack.goldchain.goldchain.Query",
      "Result",
      data
    );
    return promise.then((data) => QueryResultResponse.decode(new Reader(data)));
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

declare var self: any | undefined;
declare var window: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

const atob: (b64: string) => string =
  globalThis.atob ||
  ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

const btoa: (bin: string) => string =
  globalThis.btoa ||
  ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  for (let i = 0; i < arr.byteLength; ++i) {
    bin.push(String.fromCharCode(arr[i]));
  }
  return btoa(bin.join(""));
}

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
