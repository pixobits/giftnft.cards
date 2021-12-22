import { Box, Button, Stack } from "@mui/material";
import { useAccount } from "store/account";
import { useCallback } from "react";
import { useMetamask } from "store/metamask";
import MetamaskIcon from "components/MetamaskIcon";
import Link from "next/link";

export default function ConnectWallet() {
  const accountId = useAccount(useCallback((state) => state.accountId, []));
  const metamask = useMetamask();

  const onRequest = useCallback(async () => {
    await metamask.request({ method: "eth_requestAccounts" });
  }, [metamask]);

  if (!metamask) {
    return (
      <Button
        component="a"
        href="https://metamask.io/"
        target="_blank"
        rel="noopener noreferrer"
        variant="contained"
      >
        Install Metamask
      </Button>
    );
  }

  if (!accountId) {
    return (
      <Button
        onClick={onRequest}
        variant="contained"
        size="large"
        sx={{ mt: 2 }}
      >
        <Box sx={{ width: 28, height: 28, mr: 2 }}>
          <MetamaskIcon />
        </Box>
        Connect your Wallet
      </Button>
    );
  }

  return (
    <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
      <Button size="large">
        {accountId.substring(0, 8)}...
        {accountId.substring(accountId.length - 6)}
      </Button>
      <Link href="/account/mint-gift-card" passHref>
        <Button component="a" variant="contained" size="large">
          View Account
        </Button>
      </Link>
    </Stack>
  );
}
