import { Avatar, Stack, Typography } from "@mui/material";
import ConnectWallet from "components/ConnectWallet";

export default function ConnectView() {
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
      <ConnectWallet />
    </Stack>
  );
}
