// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY.

import { StdFee } from "@cosmjs/launchpad";
import { SigningStargateClient } from "@cosmjs/stargate";
import { Registry, OfflineSigner, EncodeObject, DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgBuyGold } from "./types/goldchain/tx";
import { MsgSellGold } from "./types/goldchain/tx";
import { MsgRequestData } from "./types/goldchain/tx";


const types = [
  ["/satawatnack.goldchain.goldchain.MsgBuyGold", MsgBuyGold],
  ["/satawatnack.goldchain.goldchain.MsgSellGold", MsgSellGold],
  ["/satawatnack.goldchain.goldchain.MsgRequestData", MsgRequestData],
  
];
export const MissingWalletError = new Error("wallet is required");

const registry = new Registry(<any>types);

const defaultFee = {
  amount: [],
  gas: "200000",
};

interface TxClientOptions {
  addr: string
}

interface SignAndBroadcastOptions {
  fee: StdFee,
  memo?: string
}

const txClient = async (wallet: OfflineSigner, { addr: addr }: TxClientOptions = { addr: "http://localhost:26657" }) => {
  if (!wallet) throw MissingWalletError;

  const client = await SigningStargateClient.connectWithSigner(addr, wallet, { registry });
  const { address } = (await wallet.getAccounts())[0];

  return {
    signAndBroadcast: (msgs: EncodeObject[], { fee, memo }: SignAndBroadcastOptions = {fee: defaultFee, memo: ""}) => client.signAndBroadcast(address, msgs, fee,memo),
    msgBuyGold: (data: MsgBuyGold): EncodeObject => ({ typeUrl: "/satawatnack.goldchain.goldchain.MsgBuyGold", value: data }),
    msgSellGold: (data: MsgSellGold): EncodeObject => ({ typeUrl: "/satawatnack.goldchain.goldchain.MsgSellGold", value: data }),
    msgRequestData: (data: MsgRequestData): EncodeObject => ({ typeUrl: "/satawatnack.goldchain.goldchain.MsgRequestData", value: data }),
    
  };
};

interface QueryClientOptions {
  addr: string
}

const queryClient = async ({ addr: addr }: QueryClientOptions = { addr: "http://localhost:1317" }) => {
  return new Api({ baseUrl: addr });
};

export {
  txClient,
  queryClient,
};
