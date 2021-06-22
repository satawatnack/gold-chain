package keeper

import (
	"fmt"

	"github.com/tendermint/tendermint/libs/log"

	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	bankkeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"

	"github.com/satawatnack/goldchain/x/goldchain/types"
)

type (
	Keeper struct {
		CoinKeeper bankkeeper.Keeper
		cdc        codec.Marshaler
		storeKey   sdk.StoreKey
		memKey     sdk.StoreKey
		// this line is used by starport scaffolding # ibc/keeper/attribute
	}
)

func NewKeeper(
	coinKeeper bankkeeper.Keeper,
	cdc codec.Marshaler,
	storeKey,
	memKey sdk.StoreKey,
	// this line is used by starport scaffolding # ibc/keeper/parameter
) *Keeper {
	return &Keeper{
		CoinKeeper: coinKeeper,
		cdc:        cdc,
		storeKey:   storeKey,
		memKey:     memKey,
		// this line is used by starport scaffolding # ibc/keeper/return
	}
}

func (k Keeper) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("module", fmt.Sprintf("x/%s", types.ModuleName))
}
