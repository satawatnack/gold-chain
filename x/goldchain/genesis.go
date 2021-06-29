package goldchain

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/satawatnack/goldchain/x/goldchain/keeper"
	"github.com/satawatnack/goldchain/x/goldchain/types"
)

// InitGenesis initializes the capability module's state from a provided genesis
// state.
func InitGenesis(ctx sdk.Context, k keeper.Keeper, genState types.GenesisState) {
	// this line is used by starport scaffolding # genesis/module/init
	k.BindPort(ctx, types.PortKey)

	en_time, err := ctx.BlockHeader().Time.MarshalBinary()
	if err != nil {
		panic(err)
	}
	k.SetLatestTimeRequest(ctx, en_time)

	// this line is used by starport scaffolding # ibc/genesis/init
}

// ExportGenesis returns the capability module's exported genesis.
func ExportGenesis(ctx sdk.Context, k keeper.Keeper) *types.GenesisState {
	genesis := types.DefaultGenesis()

	// this line is used by starport scaffolding # genesis/module/export

	// this line is used by starport scaffolding # ibc/genesis/export

	return genesis
}
