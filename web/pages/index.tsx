import { Avatar, Button, Stack, Typography } from "@mui/material";

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
      <Button variant="contained" size="large" sx={{ mt: 2 }}>
        Connect your Wallet
      </Button>
    </Stack>
  );
}
