import { Box, IconButton, Stack, Typography } from "@mui/material";
import { NextSeo } from "next-seo";
import { MdArrowBack, MdArrowForward } from "react-icons/all";

export default function MintAGift() {
  return (
    <>
      <NextSeo title="Mint a Gift Card" />
      <Typography variant="h5" textAlign="center" sx={{ mt: 4 }}>
        Mint a Gift Card
      </Typography>

      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ mt: 4 }}
      >
        <IconButton>
          <MdArrowBack />
        </IconButton>
        <Box sx={{ width: 400, height: 500, boxShadow: 2, borderRadius: 2 }} />
        <IconButton>
          <MdArrowForward />
        </IconButton>
      </Stack>
    </>
  );
}
