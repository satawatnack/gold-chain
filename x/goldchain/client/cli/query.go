package cli

import (
	"context"
	"fmt"
	"strconv"

	"github.com/spf13/cobra"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"

	"github.com/satawatnack/goldchain/x/goldchain/types"
)

// GetQueryCmd returns the cli query commands for this module
func GetQueryCmd(queryRoute string) *cobra.Command {
	// Group goldchain queries under a subcommand
	cmd := &cobra.Command{
		Use:                        types.ModuleName,
		Short:                      fmt.Sprintf("Querying commands for the %s module", types.ModuleName),
		DisableFlagParsing:         true,
		SuggestionsMinimumDistance: 2,
		RunE:                       client.ValidateCmd,
	}

	cmd.AddCommand(
		GetQueryBalancesRequest(),
		GetCmdReadResult(),
	)

	return cmd
}

func GetQueryBalancesRequest() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "request-balances [account]",
		Short: "Get balances",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx, err := client.GetClientQueryContext(cmd)
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)
			r, err := queryClient.Balances(
				context.Background(),
				&types.QueryBalancesRequest{Sender: args[0]},
			)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(r)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)
	return cmd
}

func GetCmdReadResult() *cobra.Command {
	cmd := &cobra.Command{
		Use:  "result",
		Args: cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx, err := client.GetClientQueryContext(cmd)
			if err != nil {
				return err
			}
			id, err := strconv.ParseInt(args[0], 10, 64)
			if err != nil {
				return err
			}
			queryClient := types.NewQueryClient(clientCtx)
			r, err := queryClient.Result(context.Background(), &types.QueryResultRequest{RequestId: id})
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(r)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
