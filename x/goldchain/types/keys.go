package types

import (
	"encoding/binary"

	oracletypes "github.com/bandprotocol/chain/v2/x/oracle/types"
)

const (
	// ModuleName defines the module name
	ModuleName = "goldchain"

	// StoreKey defines the primary module store key
	StoreKey = ModuleName

	// RouterKey is the message route for slashing
	RouterKey = ModuleName

	// QuerierRoute defines the module's query routing key
	QuerierRoute = ModuleName

	// MemStoreKey defines the in-memory store key
	MemStoreKey = "mem_goldchain"

	// PortKey
	PortKey = ModuleName

	// Version
	Version = "ics20-1"
)

var (
	// ResultStoreKeyPrefix is a prefix for storing result
	ResultStoreKeyPrefix = []byte{0xff}

	GlobalStoreKeyPrefix = []byte{0x00}

	// LatestRequestIDKey
	LatestRequestIDKey = []byte{0x01}

	LatestTimeRequestKey = []byte{0x02}

	OrdersCountStoreKey = append(GlobalStoreKeyPrefix, []byte("OrdersCount")...)

	OrderStoreKeyPrefix = []byte{0x03}
)

func KeyPrefix(p string) []byte {
	return []byte(p)
}

// ResultStoreKey is a function to generate key for each result in store
func ResultStoreKey(requestID oracletypes.RequestID) []byte {
	return append(ResultStoreKeyPrefix, int64ToBytes(int64(requestID))...)
}

func OrderStoreKey(orderID int64) []byte {
	return append(OrderStoreKeyPrefix, int64ToBytes(orderID)...)
}

func int64ToBytes(num int64) []byte {
	result := make([]byte, 8)
	binary.BigEndian.PutUint64(result, uint64(num))
	return result
}
