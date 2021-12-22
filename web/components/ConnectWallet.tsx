import { Button } from "@mui/material";
import { useAccount } from "store/account";
import { useCallback } from "react";
import { useMetamask } from "store/metamask";

export default function ConnectWallet() {
  const accountId = useAccount(useCallback((state) => state.accountId, []));
  const metamask = useMetamask();

  const onRequest = useCallback(async () => {
    await metamask.request({ method: "eth_requestAccounts" });
  }, [metamask]);

  if (!accountId) {
    return (
      <Button
        onClick={onRequest}
        variant="contained"
        size="large"
        sx={{ mt: 2 }}
      >
        Connect your Wallet
      </Button>
    );
  }

  return (
    <Button component="a" variant="contained" size="large" sx={{ mt: 2 }}>
      {accountId}
    </Button>
  );
}
