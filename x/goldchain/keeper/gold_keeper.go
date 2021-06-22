package keeper

import (
	sdk "github.com/cosmos/cosmos-sdk/types"

	minttypes "github.com/cosmos/cosmos-sdk/x/mint/types"

	goldchaintypes "github.com/satawatnack/goldchain/x/goldchain/types"
)

func (k Keeper) swapUsdnToGold(ctx sdk.Context, payer sdk.AccAddress, n int64) (*sdk.Result, error) {
	var goldPrice = 100

	var newSumGold = sdk.Coins{sdk.NewInt64Coin("gold", n)}

	var sumUsdn = n * int64(goldPrice)
	var newSumUsdn = sdk.Coins{sdk.NewInt64Coin("usdn", sumUsdn)}

	err := k.CoinKeeper.SendCoinsFromAccountToModule(ctx, payer, goldchaintypes.ModuleName, newSumUsdn)
	if err != nil {
		return nil, err
	}

	err = k.CoinKeeper.MintCoins(ctx, minttypes.ModuleName, newSumGold)
	if err != nil {
		return nil, err
	}

	err = k.CoinKeeper.SendCoinsFromModuleToAccount(ctx, minttypes.ModuleName, payer, newSumGold)
	if err != nil {
		return nil, err
	}

	return &sdk.Result{}, nil
}

func (k Keeper) swapGoldToUsdn(ctx sdk.Context, payer sdk.AccAddress, n int64) (*sdk.Result, error) {
	var goldPrice = 100

	var newSumGold = sdk.Coins{sdk.NewInt64Coin("gold", n)}

	var sumUsdn = n * int64(goldPrice)
	var newSumUsdn = sdk.Coins{sdk.NewInt64Coin("usdn", sumUsdn)}

	err := k.CoinKeeper.SubtractCoins(ctx, payer, newSumGold)
	if err != nil {
		return nil, err
	}

	err = k.CoinKeeper.SendCoinsFromModuleToAccount(ctx, goldchaintypes.ModuleName, payer, newSumUsdn)
	if err != nil {
		return nil, err
	}

	return &sdk.Result{}, nil
}
