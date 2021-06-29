package keeper

import (
	"fmt"

	"github.com/tendermint/tendermint/libs/log"

	oracletypes "github.com/bandprotocol/chain/v2/x/oracle/types"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	bankkeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
	capabilitykeeper "github.com/cosmos/cosmos-sdk/x/capability/keeper"
	capabilitytypes "github.com/cosmos/cosmos-sdk/x/capability/types"
	host "github.com/cosmos/cosmos-sdk/x/ibc/core/24-host"
	gogotypes "github.com/gogo/protobuf/types"

	"github.com/satawatnack/goldchain/x/goldchain/types"
)

type (
	Keeper struct {
		CoinKeeper     bankkeeper.Keeper
		CoinKeeperView bankkeeper.ViewKeeper

		cdc      codec.Marshaler
		storeKey sdk.StoreKey
		memKey   sdk.StoreKey

		channelKeeper types.ChannelKeeper
		portKeeper    types.PortKeeper
		scopedKeeper  capabilitykeeper.ScopedKeeper
	}
)

func NewKeeper(
	coinKeeper bankkeeper.Keeper,
	coinKeeperView bankkeeper.ViewKeeper,
	cdc codec.Marshaler,
	storeKey,
	memKey sdk.StoreKey,
	channelKeeper types.ChannelKeeper,
	portKeeper types.PortKeeper,
	scopedKeeper capabilitykeeper.ScopedKeeper,
	// this line is used by starport scaffolding # ibc/keeper/parameter
) *Keeper {
	return &Keeper{
		CoinKeeper:     coinKeeper,
		CoinKeeperView: coinKeeperView,
		cdc:            cdc,
		storeKey:       storeKey,
		memKey:         memKey,
		channelKeeper:  channelKeeper,
		portKeeper:     portKeeper,
		scopedKeeper:   scopedKeeper,
		// this line is used by starport scaffolding # ibc/keeper/return
	}
}

func (k Keeper) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("module", fmt.Sprintf("x/%s", types.ModuleName))
}

func (k Keeper) SetResult(ctx sdk.Context, requestID oracletypes.RequestID, result []byte) {
	store := ctx.KVStore(k.storeKey)
	store.Set(types.ResultStoreKey(requestID), result)
}

func (k Keeper) GetResult(ctx sdk.Context, requestID oracletypes.RequestID) ([]byte, error) {
	if !k.HasResult(ctx, requestID) {
		return nil, sdkerrors.Wrapf(types.ErrItemNotFound,
			"GetResult: Result for request ID %d is not available.", requestID,
		)
	}
	store := ctx.KVStore(k.storeKey)
	return store.Get(types.ResultStoreKey(requestID)), nil
}

func (k Keeper) HasResult(ctx sdk.Context, requestID oracletypes.RequestID) bool {
	store := ctx.KVStore(k.storeKey)
	return store.Has(types.ResultStoreKey(requestID))
}

func (k Keeper) GetLatestRequestID(ctx sdk.Context) int64 {
	bz := ctx.KVStore(k.storeKey).Get(types.LatestRequestIDKey)
	intV := gogotypes.Int64Value{}
	k.cdc.MustUnmarshalBinaryLengthPrefixed(bz, &intV)
	return intV.GetValue()
}

func (k Keeper) SetLatestRequestID(ctx sdk.Context, id oracletypes.RequestID) {
	ctx.KVStore(k.storeKey).Set(types.LatestRequestIDKey, k.cdc.MustMarshalBinaryLengthPrefixed(&gogotypes.Int64Value{Value: int64(id)}))
}

func (k Keeper) SetLatestTimeRequest(ctx sdk.Context, time []byte) {
	ctx.KVStore(k.storeKey).Set(types.LatestTimeRequestKey, time)
}

func (k Keeper) GetLatestTimeRequest(ctx sdk.Context) []byte {
	store := ctx.KVStore(k.storeKey).Get(types.LatestTimeRequestKey)
	return store
}

// AuthenticateCapability wraps the scopedKeeper's AuthenticateCapability function
func (k Keeper) AuthenticateCapability(ctx sdk.Context, cap *capabilitytypes.Capability, name string) bool {
	return k.scopedKeeper.AuthenticateCapability(ctx, cap, name)
}

// ClaimCapability allows the transfer module that can claim a capability that IBC module
// passes to it
func (k Keeper) ClaimCapability(ctx sdk.Context, cap *capabilitytypes.Capability, name string) error {
	return k.scopedKeeper.ClaimCapability(ctx, cap, name)
}

// BindPort defines a wrapper function for the ort Keeper's function in
// order to expose it to module's InitGenesis function
func (k Keeper) BindPort(ctx sdk.Context, portID string) error {
	fmt.Println(portID)
	cap := k.portKeeper.BindPort(ctx, portID)
	return k.ClaimCapability(ctx, cap, host.PortPath(portID))
}
