package types

import (
	bandoracle "github.com/bandprotocol/chain/v2/x/oracle/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

func NewMsgBuyGold(n int64, buyer sdk.AccAddress) *MsgBuyGold {
	return &MsgBuyGold{
		N:     n,
		Buyer: buyer.String(),
	}
}

func (msg MsgBuyGold) Route() string { return RouterKey }

func (msg MsgBuyGold) Type() string { return "buy_gold" }

func (msg MsgBuyGold) ValidateBasic() error {
	buyer, err := sdk.AccAddressFromBech32(msg.Buyer)
	if err != nil {
		return err
	}
	if err := sdk.VerifyAddressFormat(buyer); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "sender: %s", msg.Buyer)
	}
	if msg.N <= 0 {
		return sdkerrors.Wrapf(ErrInvalidN, "invalid n: %d", msg.N)
	}
	return nil
}

func (msg MsgBuyGold) GetSigners() []sdk.AccAddress {
	buyer, _ := sdk.AccAddressFromBech32(msg.Buyer)
	return []sdk.AccAddress{buyer}
}

func (msg MsgBuyGold) GetSignBytes() []byte {
	return sdk.MustSortJSON(AminoCdc.MustMarshalJSON(&msg))
}

func NewMsgSellGold(n int64, seller sdk.AccAddress) *MsgSellGold {
	return &MsgSellGold{
		N:      n,
		Seller: seller.String(),
	}
}

func (msg MsgSellGold) Route() string { return RouterKey }

func (msg MsgSellGold) Type() string { return "sell_gold" }

func (msg MsgSellGold) ValidateBasic() error {
	seller, err := sdk.AccAddressFromBech32(msg.Seller)
	if err != nil {
		return err
	}
	if err := sdk.VerifyAddressFormat(seller); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "sender: %s", msg.Seller)
	}
	if msg.N <= 0 {
		return sdkerrors.Wrapf(ErrInvalidN, "invalid n: %d", msg.N)
	}
	return nil
}

func (msg MsgSellGold) GetSigners() []sdk.AccAddress {
	seller, _ := sdk.AccAddressFromBech32(msg.Seller)
	return []sdk.AccAddress{seller}
}

func (msg MsgSellGold) GetSignBytes() []byte {
	return sdk.MustSortJSON(AminoCdc.MustMarshalJSON(&msg))
}

// NewMsgRequestData creates a new MsgRequestData instance.
func NewMsgRequestData(
	oracleScriptID bandoracle.OracleScriptID,
	sourceChannel string,
	calldata []byte,
	askCount uint64,
	minCount uint64,
	feeLimit sdk.Coins,
	requestKey string,
	prepareGas uint64,
	executeGas uint64,
	sender sdk.AccAddress,
) *MsgRequestData {
	return &MsgRequestData{
		OracleScriptID: int64(oracleScriptID),
		SourceChannel:  sourceChannel,
		Calldata:       calldata,
		AskCount:       askCount,
		MinCount:       minCount,
		FeeLimit:       feeLimit,
		RequestKey:     requestKey,
		PrepareGas:     prepareGas,
		ExecuteGas:     executeGas,
		Sender:         sender.String(),
	}
}

// Route implements the sdk.Msg interface for MsgRequestData.
func (msg MsgRequestData) Route() string { return RouterKey }

// Type implements the sdk.Msg interface for MsgRequestData.
func (msg MsgRequestData) Type() string { return "consuming" }

// ValidateBasic implements the sdk.Msg interface for MsgRequestData.
func (msg MsgRequestData) ValidateBasic() error {
	sender, err := sdk.AccAddressFromBech32(msg.Sender)
	if err != nil {
		return err
	}
	if sender.Empty() {
		return sdkerrors.Wrapf(ErrInvalidBasicMsg, "MsgRequestData: Sender address must not be empty.")
	}
	if msg.OracleScriptID <= 0 {
		return sdkerrors.Wrapf(ErrInvalidBasicMsg, "MsgRequestData: Oracle script id (%d) must be positive.", msg.OracleScriptID)
	}
	if msg.AskCount <= 0 {
		return sdkerrors.Wrapf(ErrInvalidBasicMsg,
			"MsgRequestData: Sufficient validator count (%d) must be positive.",
			msg.AskCount,
		)
	}
	if msg.AskCount < msg.MinCount {
		return sdkerrors.Wrapf(ErrInvalidBasicMsg,
			"MsgRequestData: Request validator count (%d) must not be less than sufficient validator count (%d).",
			msg.AskCount,
			msg.MinCount,
		)
	}
	return nil
}

// GetSigners implements the sdk.Msg interface for MsgRequestData.
func (msg MsgRequestData) GetSigners() []sdk.AccAddress {
	sender, err := sdk.AccAddressFromBech32(msg.Sender)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{sender}
}

// GetSignBytes implements the sdk.Msg interface for MsgRequestData.
func (msg MsgRequestData) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(&msg)
	return sdk.MustSortJSON(bz)
}
