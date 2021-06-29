/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";
export const protobufPackage = "satawatnack.goldchain.goldchain";
const baseGenesisState = {};
export const GenesisState = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseGenesisState };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        const message = { ...baseGenesisState };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseGenesisState };
        return message;
    },
};
const baseOrder = { Owner: "", Amount: 0, buy: false };
export const Order = {
    encode(message, writer = Writer.create()) {
        if (message.Owner !== "") {
            writer.uint32(10).string(message.Owner);
        }
        if (message.Amount !== 0) {
            writer.uint32(16).int64(message.Amount);
        }
        if (message.buy === true) {
            writer.uint32(24).bool(message.buy);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseOrder };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.Owner = reader.string();
                    break;
                case 2:
                    message.Amount = longToNumber(reader.int64());
                    break;
                case 3:
                    message.buy = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseOrder };
        if (object.Owner !== undefined && object.Owner !== null) {
            message.Owner = String(object.Owner);
        }
        else {
            message.Owner = "";
        }
        if (object.Amount !== undefined && object.Amount !== null) {
            message.Amount = Number(object.Amount);
        }
        else {
            message.Amount = 0;
        }
        if (object.buy !== undefined && object.buy !== null) {
            message.buy = Boolean(object.buy);
        }
        else {
            message.buy = false;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.Owner !== undefined && (obj.Owner = message.Owner);
        message.Amount !== undefined && (obj.Amount = message.Amount);
        message.buy !== undefined && (obj.buy = message.buy);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseOrder };
        if (object.Owner !== undefined && object.Owner !== null) {
            message.Owner = object.Owner;
        }
        else {
            message.Owner = "";
        }
        if (object.Amount !== undefined && object.Amount !== null) {
            message.Amount = object.Amount;
        }
        else {
            message.Amount = 0;
        }
        if (object.buy !== undefined && object.buy !== null) {
            message.buy = object.buy;
        }
        else {
            message.buy = false;
        }
        return message;
    },
};
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
