package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"

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

	_, err = k.swapUsdnToGold(ctx, payer, int64(msg.N))
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

	_, err = k.swapGoldToUsdn(ctx, payer, int64(msg.N))
	if err != nil {
		return nil, err
	}

	return &types.MsgSellGoldResponse{}, nil
}
