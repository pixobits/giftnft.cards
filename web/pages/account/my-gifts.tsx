import { Typography } from "@mui/material";
import { NextSeo } from "next-seo";
import Navigation from "components/Navigation";

export default function MyGifts() {
  return (
    <>
      <NextSeo title="My Gifts" />
      <Navigation />
      <Typography variant="h5" textAlign="center" sx={{ mt: 4 }}>
        My Gifts
      </Typography>
    </>
  );
}
