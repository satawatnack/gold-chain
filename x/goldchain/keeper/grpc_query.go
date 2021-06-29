package keeper

import (
	"context"
	"encoding/binary"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"

	bandoracle "github.com/bandprotocol/chain/v2/x/oracle/types"
	"github.com/satawatnack/goldchain/x/goldchain/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// Querier is used as Keeper will have duplicate methods if used directly, and gRPC names take precedence over keeper
type Querier struct {
	Keeper
}

var _ types.QueryServer = Querier{}

func (k Querier) Balances(c context.Context, req *types.QueryBalancesRequest) (*types.QueryBalancesResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "empty request")
	}
	ctx := sdk.UnwrapSDKContext(c)

	sender, err := sdk.AccAddressFromBech32(req.Sender)
	if err != nil {
		return nil, err
	}

	b := k.CoinKeeperView.GetAllBalances(ctx, sender).String()
	return &types.QueryBalancesResponse{Balance: b}, nil
}

func (q Keeper) Result(c context.Context, req *types.QueryResultRequest) (*types.QueryResultResponse, error) {
	ctx := sdk.UnwrapSDKContext(c)
	bz, err := q.GetResult(ctx, bandoracle.RequestID(req.RequestId))
	if err != nil {
		return nil, err
	}
	fmt.Println("\n\n\n\n\n\n", int64(binary.BigEndian.Uint64(bz)))
	return &types.QueryResultResponse{Result: bz}, nil
}
