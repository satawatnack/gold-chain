package keeper

import (
	"context"
	"encoding/binary"
	"encoding/hex"
	"fmt"
	"strconv"
	"time"

	bandtypes "github.com/bandprotocol/chain/v2/x/oracle/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	clienttypes "github.com/cosmos/cosmos-sdk/x/ibc/core/02-client/types"
	channeltypes "github.com/cosmos/cosmos-sdk/x/ibc/core/04-channel/types"
	host "github.com/cosmos/cosmos-sdk/x/ibc/core/24-host"

	"github.com/satawatnack/goldchain/x/goldchain/types"
)

type msgServer struct {
	Keeper
}

// NewMsgServerImpl returns an implementation of the MsgServer interface
// for the provided Keeper.
func NewMsgServerImpl(keeper Keeper) types.MsgServer {
	return &msgServer{Keeper: keeper}
}

var _ types.MsgServer = msgServer{}

func (k msgServer) BuyGold(goCtx context.Context, msg *types.MsgBuyGold) (*types.MsgBuyGoldResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	payer, err := sdk.AccAddressFromBech32(msg.Buyer)
	if err != nil {
		return nil, err
	}

	orderID, err := k.AddOrder(ctx, payer, msg.N, true)
	if err != nil {
		return nil, err
	}

	fmt.Println("\n lastest requestID \n", k.GetLatestRequestID(ctx))

	err = k.RequestGoldPrice(orderID, ctx)
	if err != nil {
		return nil, err
	}

	return &types.MsgBuyGoldResponse{}, nil
}

func (k msgServer) SellGold(goCtx context.Context, msg *types.MsgSellGold) (*types.MsgSellGoldResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	payer, err := sdk.AccAddressFromBech32(msg.Seller)
	if err != nil {
		return nil, err
	}

	orderID, err := k.AddOrder(ctx, payer, msg.N, false)
	if err != nil {
		return nil, err
	}

	err = k.RequestGoldPrice(orderID, ctx)
	if err != nil {
		return nil, err
	}

	return &types.MsgSellGoldResponse{}, nil
}

func (k msgServer) RequestData(goCtx context.Context, msg *types.MsgRequestData) (*types.MsgRequestDataResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	sourceChannelEnd, found := k.channelKeeper.GetChannel(ctx, types.PortKey, msg.SourceChannel)
	if !found {
		return nil, sdkerrors.Wrapf(
			sdkerrors.ErrUnknownRequest,
			"unknown channel %s port %s",
			msg.SourceChannel,
			types.PortKey,
		)
	}
	destinationPort := sourceChannelEnd.Counterparty.PortId
	destinationChannel := sourceChannelEnd.Counterparty.ChannelId
	sequence, found := k.channelKeeper.GetNextSequenceSend(
		ctx, types.PortKey, msg.SourceChannel,
	)
	if !found {
		return nil, sdkerrors.Wrapf(
			sdkerrors.ErrUnknownRequest,
			"unknown sequence number for channel %s port oracle",
			msg.SourceChannel,
		)
	}
	sourcePort := types.PortKey
	packet := bandtypes.NewOracleRequestPacketData(
		types.PortKey,
		bandtypes.OracleScriptID(msg.OracleScriptID),
		msg.Calldata,
		msg.AskCount,
		msg.MinCount,
		msg.FeeLimit,
		msg.RequestKey,
		msg.PrepareGas,
		msg.ExecuteGas,
	)

	channelCap, ok := k.scopedKeeper.GetCapability(ctx, host.ChannelCapabilityPath(sourcePort, msg.SourceChannel))
	if !ok {
		return nil, sdkerrors.Wrap(channeltypes.ErrChannelCapabilityNotFound, "module does not own channel capability")
	}
	err := k.channelKeeper.SendPacket(ctx, channelCap, channeltypes.NewPacket(
		packet.GetBytes(),
		sequence,
		sourcePort,
		msg.SourceChannel,
		destinationPort,
		destinationChannel,
		clienttypes.NewHeight(0, 0),
		uint64(ctx.BlockTime().UnixNano()+int64(20*time.Minute)), // Arbitrarily high timeout for now
	))
	if err != nil {
		return nil, err
	}
	return &types.MsgRequestDataResponse{}, nil
}

func (k Keeper) RequestGoldPrice(orderID int64, ctx sdk.Context) error {
	sourceChannel := "channel-0"
	oracleScriptID := bandtypes.OracleScriptID(33)
	calldata := make([]byte, 8)
	binary.LittleEndian.PutUint64(calldata, 1)
	askCount := uint64(3)
	minCount := uint64(3)

	sourceChannelEnd, found := k.channelKeeper.GetChannel(ctx, types.PortKey, sourceChannel)
	if !found {
		return sdkerrors.Wrapf(
			sdkerrors.ErrUnknownRequest,
			"unknown channel %s port %s",
			sourceChannel,
			types.PortKey,
		)
	}
	destinationPort := sourceChannelEnd.Counterparty.PortId
	destinationChannel := sourceChannelEnd.Counterparty.ChannelId
	sequence, found := k.channelKeeper.GetNextSequenceSend(
		ctx, types.PortKey, sourceChannel,
	)
	if !found {
		return sdkerrors.Wrapf(
			sdkerrors.ErrUnknownRequest,
			"unknown sequence number for channel %s port oracle",
			sourceChannel,
		)
	}
	sourcePort := types.PortKey
	packet := bandtypes.NewOracleRequestPacketData(
		strconv.FormatInt(orderID, 10),
		oracleScriptID,
		mustDecodeString("0000000000000001"),
		askCount,
		minCount,
		sdk.NewCoins(sdk.NewCoin("uband", sdk.NewInt(10000))),
		"band-laozi-testnet1",
		200000,
		200000,
	)

	channelCap, ok := k.scopedKeeper.GetCapability(ctx, host.ChannelCapabilityPath(sourcePort, sourceChannel))
	if !ok {
		return sdkerrors.Wrap(channeltypes.ErrChannelCapabilityNotFound, "module does not own channel capability")
	}
	err := k.channelKeeper.SendPacket(ctx, channelCap, channeltypes.NewPacket(
		packet.GetBytes(),
		sequence,
		sourcePort,
		sourceChannel,
		destinationPort,
		destinationChannel,
		clienttypes.NewHeight(0, 0),
		uint64(ctx.BlockTime().UnixNano()+int64(20*time.Minute)), // Arbitrarily high timeout for now
	))
	if err != nil {
		return err
	}
	return nil
}

func mustDecodeString(hexstr string) []byte {
	b, err := hex.DecodeString(hexstr)
	if err != nil {
		panic(err)
	}
	return b
}
