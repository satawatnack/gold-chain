package keeper

import (
	"github.com/satawatnack/goldchain/x/goldchain/types"
)

var _ types.QueryServer = Keeper{}
