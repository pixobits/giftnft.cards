import { Avatar, Button, Stack, Typography } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <Stack justifyContent="center" alignItems="center" sx={{ height: "100vh" }}>
      <Avatar
        sx={{
          width: 180,
          height: 180,
          fontSize: 96,
          bgcolor: "grey.100",
        }}
      >
        🎉
      </Avatar>
      <Typography variant="h4" fontWeight={200} sx={{ mt: 3 }}>
        Send your friends NFT Gift Cards
      </Typography>
      <Link href="/mint-a-gift" passHref>
        <Button component="a" variant="contained" size="large" sx={{ mt: 2 }}>
          Connect your Wallet
        </Button>
      </Link>
    </Stack>
  );
}
