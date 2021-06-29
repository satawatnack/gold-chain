package keeper

import (
	"encoding/binary"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	minttypes "github.com/cosmos/cosmos-sdk/x/mint/types"

	"github.com/satawatnack/goldchain/x/goldchain/types"
)

func (k Keeper) SwapUsdnToGold(ctx sdk.Context, payer sdk.AccAddress, n int64, goldPrice int64) (*sdk.Result, error) {
	var newSumGold = sdk.Coins{sdk.NewInt64Coin("gold", n)}

	var sumUsdn = n * int64(goldPrice)
	var newSumUsdn = sdk.Coins{sdk.NewInt64Coin("usdn", sumUsdn)}

	err := k.CoinKeeper.SubtractCoins(ctx, payer, newSumUsdn)
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

func (k Keeper) SwapGoldToUsdn(ctx sdk.Context, payer sdk.AccAddress, n int64, goldPrice int64) (*sdk.Result, error) {
	var newSumGold = sdk.Coins{sdk.NewInt64Coin("gold", n)}

	var sumUsdn = n * int64(goldPrice)
	var newSumUsdn = sdk.Coins{sdk.NewInt64Coin("usdn", sumUsdn)}

	err := k.CoinKeeper.SubtractCoins(ctx, payer, newSumGold)
	if err != nil {
		return nil, err
	}

	err = k.CoinKeeper.MintCoins(ctx, minttypes.ModuleName, newSumUsdn)
	if err != nil {
		fmt.Println("\n\n\n err", err.Error())
		return nil, err
	}

	err = k.CoinKeeper.SendCoinsFromModuleToAccount(ctx, minttypes.ModuleName, payer, newSumUsdn)
	if err != nil {
		fmt.Println("\n\n\n err", err.Error())
		return nil, err
	}

	return &sdk.Result{}, nil
}

func (k Keeper) GetOrderCount(ctx sdk.Context) uint64 {
	store := ctx.KVStore(k.storeKey)
	bz := store.Get(types.OrdersCountStoreKey)
	if bz == nil {
		return 0
	}
	return binary.BigEndian.Uint64(bz)
}

func (k Keeper) GetNextOrderCount(ctx sdk.Context) uint64 {
	orderCount := k.GetOrderCount(ctx)
	store := ctx.KVStore(k.storeKey)
	bz := sdk.Uint64ToBigEndian(orderCount + 1)
	store.Set(types.OrdersCountStoreKey, bz)
	return orderCount + 1
}

func (k Keeper) AddOrder(ctx sdk.Context, buyer sdk.AccAddress, amount int64, buy bool) (int64, error) {
	orderID := int64(k.GetNextOrderCount(ctx))
	order := types.Order{
		Owner:  buyer.String(),
		Amount: amount,
		Buy:    buy,
	}
	k.SetOrder(ctx, orderID, order)

	return orderID, nil
}

func (k Keeper) SetOrder(ctx sdk.Context, id int64, order types.Order) {
	store := ctx.KVStore(k.storeKey)
	store.Set(types.OrderStoreKey(id), k.cdc.MustMarshalBinaryBare(&order))
}

// GetOrder gets the given order from the store
func (k Keeper) GetOrder(ctx sdk.Context, id int64) (types.Order, error) {
	store := ctx.KVStore(k.storeKey)
	if !store.Has(types.OrderStoreKey(id)) {
		return types.Order{}, sdkerrors.Wrapf(sdkerrors.ErrKeyNotFound, "order %d not found", id)
	}
	bz := store.Get(types.OrderStoreKey(id))
	var order types.Order
	k.cdc.MustUnmarshalBinaryBare(bz, &order)
	return order, nil
}
