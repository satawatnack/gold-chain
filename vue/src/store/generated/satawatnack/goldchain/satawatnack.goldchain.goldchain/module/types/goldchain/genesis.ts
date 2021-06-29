/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "satawatnack.goldchain.goldchain";

/** GenesisState defines the goldchain module's genesis state. */
export interface GenesisState {}

export interface Order {
  Owner: string;
  Amount: number;
  buy: boolean;
}

const baseGenesisState: object = {};

export const GenesisState = {
  encode(_: GenesisState, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGenesisState } as GenesisState;
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

  fromJSON(_: any): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
    return message;
  },

  toJSON(_: GenesisState): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<GenesisState>): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
    return message;
  },
};

const baseOrder: object = { Owner: "", Amount: 0, buy: false };

export const Order = {
  encode(message: Order, writer: Writer = Writer.create()): Writer {
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

  decode(input: Reader | Uint8Array, length?: number): Order {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseOrder } as Order;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Owner = reader.string();
          break;
        case 2:
          message.Amount = longToNumber(reader.int64() as Long);
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

  fromJSON(object: any): Order {
    const message = { ...baseOrder } as Order;
    if (object.Owner !== undefined && object.Owner !== null) {
      message.Owner = String(object.Owner);
    } else {
      message.Owner = "";
    }
    if (object.Amount !== undefined && object.Amount !== null) {
      message.Amount = Number(object.Amount);
    } else {
      message.Amount = 0;
    }
    if (object.buy !== undefined && object.buy !== null) {
      message.buy = Boolean(object.buy);
    } else {
      message.buy = false;
    }
    return message;
  },

  toJSON(message: Order): unknown {
    const obj: any = {};
    message.Owner !== undefined && (obj.Owner = message.Owner);
    message.Amount !== undefined && (obj.Amount = message.Amount);
    message.buy !== undefined && (obj.buy = message.buy);
    return obj;
  },

  fromPartial(object: DeepPartial<Order>): Order {
    const message = { ...baseOrder } as Order;
    if (object.Owner !== undefined && object.Owner !== null) {
      message.Owner = object.Owner;
    } else {
      message.Owner = "";
    }
    if (object.Amount !== undefined && object.Amount !== null) {
      message.Amount = object.Amount;
    } else {
      message.Amount = 0;
    }
    if (object.buy !== undefined && object.buy !== null) {
      message.buy = object.buy;
    } else {
      message.buy = false;
    }
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

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
