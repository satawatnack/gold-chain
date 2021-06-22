package types

import (
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
