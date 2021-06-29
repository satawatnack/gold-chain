package types

// DONTCOVER

import (
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

// x/goldchain module sentinel errors
var (
	ErrInvalidBasicMsg = sdkerrors.Register(ModuleName, 1, "InvalidBasicMsg")
	ErrInvalidN        = sdkerrors.Register(ModuleName, 2, "Invalid n")
	ErrItemNotFound    = sdkerrors.Register(ModuleName, 5, "ItemNotFound")
	ErrSample          = sdkerrors.Register(ModuleName, 1100, "sample error")
	ErrInvalidVersion  = sdkerrors.Register(ModuleName, 8, "invalid ICS20 version")
)
