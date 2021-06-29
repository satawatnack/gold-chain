// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY.
import { SigningStargateClient } from "@cosmjs/stargate";
import { Registry } from "@cosmjs/proto-signing";
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
const registry = new Registry(types);
const defaultFee = {
    amount: [],
    gas: "200000",
};
const txClient = async (wallet, { addr: addr } = { addr: "http://localhost:26657" }) => {
    if (!wallet)
        throw MissingWalletError;
    const client = await SigningStargateClient.connectWithSigner(addr, wallet, { registry });
    const { address } = (await wallet.getAccounts())[0];
    return {
        signAndBroadcast: (msgs, { fee, memo } = { fee: defaultFee, memo: "" }) => client.signAndBroadcast(address, msgs, fee, memo),
        msgBuyGold: (data) => ({ typeUrl: "/satawatnack.goldchain.goldchain.MsgBuyGold", value: data }),
        msgSellGold: (data) => ({ typeUrl: "/satawatnack.goldchain.goldchain.MsgSellGold", value: data }),
        msgRequestData: (data) => ({ typeUrl: "/satawatnack.goldchain.goldchain.MsgRequestData", value: data }),
    };
};
const queryClient = async ({ addr: addr } = { addr: "http://localhost:1317" }) => {
    return new Api({ baseUrl: addr });
};
export { txClient, queryClient, };
