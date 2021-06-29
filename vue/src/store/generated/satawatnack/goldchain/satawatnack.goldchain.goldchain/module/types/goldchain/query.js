/* eslint-disable */
import { Reader, util, configure, Writer } from "protobufjs/minimal";
import * as Long from "long";
export const protobufPackage = "satawatnack.goldchain.goldchain";
const baseQueryBalancesRequest = { sender: "" };
export const QueryBalancesRequest = {
    encode(message, writer = Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryBalancesRequest };
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
    fromJSON(object) {
        const message = { ...baseQueryBalancesRequest };
        if (object.sender !== undefined && object.sender !== null) {
            message.sender = String(object.sender);
        }
        else {
            message.sender = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined && (obj.sender = message.sender);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryBalancesRequest };
        if (object.sender !== undefined && object.sender !== null) {
            message.sender = object.sender;
        }
        else {
            message.sender = "";
        }
        return message;
    },
};
const baseQueryBalancesResponse = { balance: "" };
export const QueryBalancesResponse = {
    encode(message, writer = Writer.create()) {
        if (message.balance !== "") {
            writer.uint32(10).string(message.balance);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryBalancesResponse };
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
    fromJSON(object) {
        const message = { ...baseQueryBalancesResponse };
        if (object.balance !== undefined && object.balance !== null) {
            message.balance = String(object.balance);
        }
        else {
            message.balance = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.balance !== undefined && (obj.balance = message.balance);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryBalancesResponse };
        if (object.balance !== undefined && object.balance !== null) {
            message.balance = object.balance;
        }
        else {
            message.balance = "";
        }
        return message;
    },
};
const baseQueryResultRequest = { requestId: 0 };
export const QueryResultRequest = {
    encode(message, writer = Writer.create()) {
        if (message.requestId !== 0) {
            writer.uint32(8).int64(message.requestId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryResultRequest };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.requestId = longToNumber(reader.int64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryResultRequest };
        if (object.requestId !== undefined && object.requestId !== null) {
            message.requestId = Number(object.requestId);
        }
        else {
            message.requestId = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.requestId !== undefined && (obj.requestId = message.requestId);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryResultRequest };
        if (object.requestId !== undefined && object.requestId !== null) {
            message.requestId = object.requestId;
        }
        else {
            message.requestId = 0;
        }
        return message;
    },
};
const baseQueryResultResponse = {};
export const QueryResultResponse = {
    encode(message, writer = Writer.create()) {
        if (message.result.length !== 0) {
            writer.uint32(10).bytes(message.result);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryResultResponse };
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
    fromJSON(object) {
        const message = { ...baseQueryResultResponse };
        if (object.result !== undefined && object.result !== null) {
            message.result = bytesFromBase64(object.result);
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.result !== undefined &&
            (obj.result = base64FromBytes(message.result !== undefined ? message.result : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryResultResponse };
        if (object.result !== undefined && object.result !== null) {
            message.result = object.result;
        }
        else {
            message.result = new Uint8Array();
        }
        return message;
    },
};
export class QueryClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
    }
    balances(request) {
        const data = QueryBalancesRequest.encode(request).finish();
        const promise = this.rpc.request("satawatnack.goldchain.goldchain.Query", "balances", data);
        return promise.then((data) => QueryBalancesResponse.decode(new Reader(data)));
    }
    Result(request) {
        const data = QueryResultRequest.encode(request).finish();
        const promise = this.rpc.request("satawatnack.goldchain.goldchain.Query", "Result", data);
        return promise.then((data) => QueryResultResponse.decode(new Reader(data)));
    }
}
var globalThis = (() => {
    if (typeof globalThis !== "undefined")
        return globalThis;
    if (typeof self !== "undefined")
        return self;
    if (typeof window !== "undefined")
        return window;
    if (typeof global !== "undefined")
        return global;
    throw "Unable to locate global object";
})();
const atob = globalThis.atob ||
    ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
function bytesFromBase64(b64) {
    const bin = atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
        arr[i] = bin.charCodeAt(i);
    }
    return arr;
}
const btoa = globalThis.btoa ||
    ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
function base64FromBytes(arr) {
    const bin = [];
    for (let i = 0; i < arr.byteLength; ++i) {
        bin.push(String.fromCharCode(arr[i]));
    }
    return btoa(bin.join(""));
}
function longToNumber(long) {
    if (long.gt(Number.MAX_SAFE_INTEGER)) {
        throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
    }
    return long.toNumber();
}
if (util.Long !== Long) {
    util.Long = Long;
    configure();
}
