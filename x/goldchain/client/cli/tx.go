package cli

import (
	"fmt"
	"strconv"
	"strings"
	"time"

	"github.com/spf13/cobra"

	bandoracle "github.com/bandprotocol/chain/v2/x/oracle/types"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/version"

	"github.com/satawatnack/goldchain/x/goldchain/types"
)

var (
	DefaultRelativePacketTimeoutTimestamp = uint64((time.Duration(10) * time.Minute).Nanoseconds())
)

const (
	flagPacketTimeoutTimestamp = "packet-timeout-timestamp"
	flagName                   = "name"
	flagCalldata               = "calldata"
	flagAskCount               = "ask-count"
	flagMinCount               = "min-count"
	flagChannel                = "channel"
	flagPrepareGas             = "prepare-gas"
	flagExecuteGas             = "execute-gas"
	flagFeeLimit               = "fee-limit"
	flagRequestkey             = "request-key"
)

// GetTxCmd returns the transaction commands for this module
func GetTxCmd() *cobra.Command {
	txCmd := &cobra.Command{
		Use:                        types.ModuleName,
		Short:                      fmt.Sprintf("%s transactions subcommands", types.ModuleName),
		DisableFlagParsing:         true,
		SuggestionsMinimumDistance: 2,
		RunE:                       client.ValidateCmd,
	}

	// this line is used by starport scaffolding # 1
	txCmd.AddCommand(
		GetCmdBuyGold(),
		GetCmdSellGold(),
		NewRequestTxCmd(),
	)
	return txCmd
}

func GetCmdBuyGold() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "buy-gold [n]",
		Short: "Buys gold",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			argsN, err := strconv.ParseInt(args[0], 10, 64)
			if err != nil {
				return err
			}

			msg := types.NewMsgBuyGold(argsN, clientCtx.GetFromAddress())
			err = msg.ValidateBasic()
			if err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}
	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func GetCmdSellGold() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "sell-gold [n]",
		Short: "sells gold",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			argsN, err := strconv.ParseInt(args[0], 10, 64)
			if err != nil {
				return err
			}

			msg := types.NewMsgSellGold(argsN, clientCtx.GetFromAddress())
			err = msg.ValidateBasic()
			if err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}
	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func NewRequestTxCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "request [oracle-script-id] [requested-validator-count] [sufficient-validator-count] (-c [calldata])  (-x [expiration]) (-w [prepare-gas]) (-g [execute-gas]) (-r [request-key])",
		Short: "Make a new data request via an existing oracle script",
		Args:  cobra.ExactArgs(3),
		Long: strings.TrimSpace(
			fmt.Sprintf(`Make a new request via an existing oracle script with the configuration flags.
Example:
$ %s tx consuming request 1 -c 1234abcdef -r 4 -v 3 -x 20 -w 50 -g 5000 -r requestkey --from mykey
$ %s tx consuming request 1 --calldata 1234abcdef --requested-validator-count 4 --sufficient-validator-count 3 --expiration 20 --prepare-gas 50 --execute-gas 5000 --request-key requestkey --from mykey
`,
				version.AppName, version.AppName,
			),
		),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			int64OracleScriptID, err := strconv.ParseInt(args[0], 10, 64)
			if err != nil {
				return err
			}
			oracleScriptID := bandoracle.OracleScriptID(int64OracleScriptID)

			askCount, err := strconv.ParseUint(args[1], 10, 64)
			if err != nil {
				return err
			}
			minCount, err := strconv.ParseUint(args[2], 10, 64)
			if err != nil {
				return err
			}

			calldata, err := cmd.Flags().GetBytesHex(flagCalldata)
			if err != nil {
				return err
			}

			channel, err := cmd.Flags().GetString(flagChannel)
			if err != nil {
				return err
			}

			prepareGas, err := cmd.Flags().GetUint64(flagPrepareGas)
			if err != nil {
				return err
			}

			executeGas, err := cmd.Flags().GetUint64(flagExecuteGas)
			if err != nil {
				return err
			}

			requestKey, err := cmd.Flags().GetString(flagRequestkey)
			if err != nil {
				return err
			}

			coinStr, err := cmd.Flags().GetString(flagFeeLimit)
			if err != nil {
				return err
			}

			feeLimit, err := sdk.ParseCoinsNormalized(coinStr)
			if err != nil {
				return err
			}

			msg := types.NewMsgRequestData(
				oracleScriptID,
				channel,
				calldata,
				askCount,
				minCount,
				feeLimit,
				requestKey,
				prepareGas,
				executeGas,
				clientCtx.GetFromAddress(),
			)

			err = msg.ValidateBasic()
			if err != nil {
				return err
			}

			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	cmd.Flags().BytesHexP(flagCalldata, "c", nil, "Calldata used in calling the oracle script")
	cmd.Flags().String(flagChannel, "", "The channel id.")
	cmd.MarkFlagRequired(flagChannel)
	cmd.Flags().Uint64(flagPrepareGas, 50000, "Prepare gas used in fee counting for prepare request")
	cmd.Flags().Uint64(flagExecuteGas, 300000, "Execute gas used in fee counting for execute request")
	cmd.Flags().String(flagFeeLimit, "", "the maximum tokens that will be paid to all data source providers")
	cmd.Flags().String(flagRequestkey, "", "Key for generating escrow address")
	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
