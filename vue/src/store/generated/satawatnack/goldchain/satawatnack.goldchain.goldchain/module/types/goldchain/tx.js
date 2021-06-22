/* eslint-disable */
import { Reader, util, configure, Writer } from 'protobufjs/minimal';
import * as Long from 'long';
export const protobufPackage = 'satawatnack.goldchain.goldchain';
const baseMsgBuyGold = { n: 0, buyer: '' };
export const MsgBuyGold = {
    encode(message, writer = Writer.create()) {
        if (message.n !== 0) {
            writer.uint32(8).int64(message.n);
        }
        if (message.buyer !== '') {
            writer.uint32(18).string(message.buyer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgBuyGold };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.n = longToNumber(reader.int64());
                    break;
                case 2:
                    message.buyer = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgBuyGold };
        if (object.n !== undefined && object.n !== null) {
            message.n = Number(object.n);
        }
        else {
            message.n = 0;
        }
        if (object.buyer !== undefined && object.buyer !== null) {
            message.buyer = String(object.buyer);
        }
        else {
            message.buyer = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.n !== undefined && (obj.n = message.n);
        message.buyer !== undefined && (obj.buyer = message.buyer);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgBuyGold };
        if (object.n !== undefined && object.n !== null) {
            message.n = object.n;
        }
        else {
            message.n = 0;
        }
        if (object.buyer !== undefined && object.buyer !== null) {
            message.buyer = object.buyer;
        }
        else {
            message.buyer = '';
        }
        return message;
    }
};
const baseMsgBuyGoldResponse = {};
export const MsgBuyGoldResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgBuyGoldResponse };
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
        const message = { ...baseMsgBuyGoldResponse };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseMsgBuyGoldResponse };
        return message;
    }
};
const baseMsgSellGold = { n: 0, seller: '' };
export const MsgSellGold = {
    encode(message, writer = Writer.create()) {
        if (message.n !== 0) {
            writer.uint32(8).int64(message.n);
        }
        if (message.seller !== '') {
            writer.uint32(18).string(message.seller);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgSellGold };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.n = longToNumber(reader.int64());
                    break;
                case 2:
                    message.seller = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgSellGold };
        if (object.n !== undefined && object.n !== null) {
            message.n = Number(object.n);
        }
        else {
            message.n = 0;
        }
        if (object.seller !== undefined && object.seller !== null) {
            message.seller = String(object.seller);
        }
        else {
            message.seller = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.n !== undefined && (obj.n = message.n);
        message.seller !== undefined && (obj.seller = message.seller);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgSellGold };
        if (object.n !== undefined && object.n !== null) {
            message.n = object.n;
        }
        else {
            message.n = 0;
        }
        if (object.seller !== undefined && object.seller !== null) {
            message.seller = object.seller;
        }
        else {
            message.seller = '';
        }
        return message;
    }
};
const baseMsgSellGoldResponse = {};
export const MsgSellGoldResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgSellGoldResponse };
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
        const message = { ...baseMsgSellGoldResponse };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseMsgSellGoldResponse };
        return message;
    }
};
export class MsgClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
    }
    BuyGold(request) {
        const data = MsgBuyGold.encode(request).finish();
        const promise = this.rpc.request('satawatnack.goldchain.goldchain.Msg', 'BuyGold', data);
        return promise.then((data) => MsgBuyGoldResponse.decode(new Reader(data)));
    }
    SellGold(request) {
        const data = MsgSellGold.encode(request).finish();
        const promise = this.rpc.request('satawatnack.goldchain.goldchain.Msg', 'SellGold', data);
        return promise.then((data) => MsgSellGoldResponse.decode(new Reader(data)));
    }
}
var globalThis = (() => {
    if (typeof globalThis !== 'undefined')
        return globalThis;
    if (typeof self !== 'undefined')
        return self;
    if (typeof window !== 'undefined')
        return window;
    if (typeof global !== 'undefined')
        return global;
    throw 'Unable to locate global object';
})();
function longToNumber(long) {
    if (long.gt(Number.MAX_SAFE_INTEGER)) {
        throw new globalThis.Error('Value is larger than Number.MAX_SAFE_INTEGER');
    }
    return long.toNumber();
}
if (util.Long !== Long) {
    util.Long = Long;
    configure();
}
