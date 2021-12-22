import { AppBar, Box, Button, ButtonGroup, Toolbar } from "@mui/material";
import { useAccount } from "store/account";
import { useCallback } from "react";
import MetamaskIcon from "components/MetamaskIcon";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Navigation() {
  const { pathname } = useRouter();
  const accountId = useAccount(useCallback((state) => state.accountId, []));

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{
        borderBottom: "1px solid",
        borderColor: "grey.300",
      }}
    >
      <Toolbar sx={{ justifyContent: "center" }}>
        <ButtonGroup>
          <Link href="/account/mint-gift-card" passHref>
            <Button
              component="a"
              variant={
                pathname === "/account/mint-gift-card"
                  ? "contained"
                  : "outlined"
              }
            >
              Mint a Gift Card
            </Button>
          </Link>
          <Link href="/account/my-gifts" passHref>
            <Button
              component="a"
              variant={
                pathname === "/account/my-gifts" ? "contained" : "outlined"
              }
            >
              My Gift Cards
            </Button>
          </Link>
        </ButtonGroup>

        {accountId && (
          <Button sx={{ position: "absolute", right: 24 }}>
            <Box sx={{ width: 18, height: 18, mr: 2 }}>
              <MetamaskIcon />
            </Box>
            {accountId.substring(0, 6)}...
            {accountId.substring(accountId.length - 4)}
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
