/* eslint-disable */
import { Reader, util, configure, Writer } from 'protobufjs/minimal'
import * as Long from 'long'

export const protobufPackage = 'satawatnack.goldchain.goldchain'

/** this line is used by starport scaffolding # proto/tx/message */
export interface MsgBuyGold {
  n: number
  buyer: string
}

export interface MsgBuyGoldResponse {}

export interface MsgSellGold {
  n: number
  seller: string
}

export interface MsgSellGoldResponse {}

const baseMsgBuyGold: object = { n: 0, buyer: '' }

export const MsgBuyGold = {
  encode(message: MsgBuyGold, writer: Writer = Writer.create()): Writer {
    if (message.n !== 0) {
      writer.uint32(8).int64(message.n)
    }
    if (message.buyer !== '') {
      writer.uint32(18).string(message.buyer)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgBuyGold {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgBuyGold } as MsgBuyGold
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.n = longToNumber(reader.int64() as Long)
          break
        case 2:
          message.buyer = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgBuyGold {
    const message = { ...baseMsgBuyGold } as MsgBuyGold
    if (object.n !== undefined && object.n !== null) {
      message.n = Number(object.n)
    } else {
      message.n = 0
    }
    if (object.buyer !== undefined && object.buyer !== null) {
      message.buyer = String(object.buyer)
    } else {
      message.buyer = ''
    }
    return message
  },

  toJSON(message: MsgBuyGold): unknown {
    const obj: any = {}
    message.n !== undefined && (obj.n = message.n)
    message.buyer !== undefined && (obj.buyer = message.buyer)
    return obj
  },

  fromPartial(object: DeepPartial<MsgBuyGold>): MsgBuyGold {
    const message = { ...baseMsgBuyGold } as MsgBuyGold
    if (object.n !== undefined && object.n !== null) {
      message.n = object.n
    } else {
      message.n = 0
    }
    if (object.buyer !== undefined && object.buyer !== null) {
      message.buyer = object.buyer
    } else {
      message.buyer = ''
    }
    return message
  }
}

const baseMsgBuyGoldResponse: object = {}

export const MsgBuyGoldResponse = {
  encode(_: MsgBuyGoldResponse, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgBuyGoldResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgBuyGoldResponse } as MsgBuyGoldResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(_: any): MsgBuyGoldResponse {
    const message = { ...baseMsgBuyGoldResponse } as MsgBuyGoldResponse
    return message
  },

  toJSON(_: MsgBuyGoldResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<MsgBuyGoldResponse>): MsgBuyGoldResponse {
    const message = { ...baseMsgBuyGoldResponse } as MsgBuyGoldResponse
    return message
  }
}

const baseMsgSellGold: object = { n: 0, seller: '' }

export const MsgSellGold = {
  encode(message: MsgSellGold, writer: Writer = Writer.create()): Writer {
    if (message.n !== 0) {
      writer.uint32(8).int64(message.n)
    }
    if (message.seller !== '') {
      writer.uint32(18).string(message.seller)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgSellGold {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgSellGold } as MsgSellGold
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.n = longToNumber(reader.int64() as Long)
          break
        case 2:
          message.seller = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgSellGold {
    const message = { ...baseMsgSellGold } as MsgSellGold
    if (object.n !== undefined && object.n !== null) {
      message.n = Number(object.n)
    } else {
      message.n = 0
    }
    if (object.seller !== undefined && object.seller !== null) {
      message.seller = String(object.seller)
    } else {
      message.seller = ''
    }
    return message
  },

  toJSON(message: MsgSellGold): unknown {
    const obj: any = {}
    message.n !== undefined && (obj.n = message.n)
    message.seller !== undefined && (obj.seller = message.seller)
    return obj
  },

  fromPartial(object: DeepPartial<MsgSellGold>): MsgSellGold {
    const message = { ...baseMsgSellGold } as MsgSellGold
    if (object.n !== undefined && object.n !== null) {
      message.n = object.n
    } else {
      message.n = 0
    }
    if (object.seller !== undefined && object.seller !== null) {
      message.seller = object.seller
    } else {
      message.seller = ''
    }
    return message
  }
}

const baseMsgSellGoldResponse: object = {}

export const MsgSellGoldResponse = {
  encode(_: MsgSellGoldResponse, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgSellGoldResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgSellGoldResponse } as MsgSellGoldResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(_: any): MsgSellGoldResponse {
    const message = { ...baseMsgSellGoldResponse } as MsgSellGoldResponse
    return message
  },

  toJSON(_: MsgSellGoldResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<MsgSellGoldResponse>): MsgSellGoldResponse {
    const message = { ...baseMsgSellGoldResponse } as MsgSellGoldResponse
    return message
  }
}

/** Msg defines the Msg service. */
export interface Msg {
  /** this line is used by starport scaffolding # proto/tx/rpc */
  BuyGold(request: MsgBuyGold): Promise<MsgBuyGoldResponse>
  SellGold(request: MsgSellGold): Promise<MsgSellGoldResponse>
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc
  constructor(rpc: Rpc) {
    this.rpc = rpc
  }
  BuyGold(request: MsgBuyGold): Promise<MsgBuyGoldResponse> {
    const data = MsgBuyGold.encode(request).finish()
    const promise = this.rpc.request('satawatnack.goldchain.goldchain.Msg', 'BuyGold', data)
    return promise.then((data) => MsgBuyGoldResponse.decode(new Reader(data)))
  }

  SellGold(request: MsgSellGold): Promise<MsgSellGoldResponse> {
    const data = MsgSellGold.encode(request).finish()
    const promise = this.rpc.request('satawatnack.goldchain.goldchain.Msg', 'SellGold', data)
    return promise.then((data) => MsgSellGoldResponse.decode(new Reader(data)))
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>
}

declare var self: any | undefined
declare var window: any | undefined
var globalThis: any = (() => {
  if (typeof globalThis !== 'undefined') return globalThis
  if (typeof self !== 'undefined') return self
  if (typeof window !== 'undefined') return window
  if (typeof global !== 'undefined') return global
  throw 'Unable to locate global object'
})()

type Builtin = Date | Function | Uint8Array | string | number | undefined
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error('Value is larger than Number.MAX_SAFE_INTEGER')
  }
  return long.toNumber()
}

if (util.Long !== Long) {
  util.Long = Long as any
  configure()
}
