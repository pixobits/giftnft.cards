import { Alert, Snackbar } from "@mui/material";
import { useCallback } from "react";
import config from "utils/config";
import { useAccount } from "store/account";

/**
 * Notifies via a snackbar if the wallet is not connected to the Metis Stardust Testnet. Prompts the user to
 * switch the network.
 */
export default function InvalidChainNotifier() {
  const isInvalid = useAccount(
    useCallback((state) => state.chainId !== config.CHAIN_ID, [])
  );

  return (
    <Snackbar open={isInvalid}>
      <Alert severity="warning">
        You are not connected to the correct network.
        <br />
        Please switch to Metis Stardust Testnet in your wallet.
      </Alert>
    </Snackbar>
  );
}
